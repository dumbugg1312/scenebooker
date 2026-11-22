SB.Cities.register('pensacola', {
  v: 1,
  slug: 'pensacola',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['blue angels', 'blue wahoos', 'ice flyers', 'pensacola news journal', 'inweekly', 'wuwf', 'wear tv', 'university of west florida', 'uwf',
           'pensacola state college', 'pensacola christian college', 'snowball derby', 'interstate fair', 'fiesta of five flags', 'city of five flags', 'five flags',
           'seafood festival downtown', 'pensacola seafood festival', 'hurricane ivan', 'hurricane dennis', 'hurricane sally', 'naval air station', 'nas pensacola',
           'corry station', 'saufley', 'whiting field', 'cradle of naval aviation', 'eglin', 'hurlburt', 'flora-bama', 'flora bama', 'poarch band of creek indians',
           'vfw', 'american legion', 'ecat', 'seville quarter', 'palafox pawn room', 'hill street hardware', 'texar tackle', 'garcon grange', 'brownsville feed',
           'bayou chico boat barn', 'scenic bluff garage', 'old cannery annex', 'the mullet shed', 'warrington welding', 'ninth avenue armory'],
  /* The dossier's own invented venue names are in banned too: they are research, not content, and are unchecked. WEAR (the TV station) is written 'wear tv'
     because the bare word is a common verb. */
  blocklist: ['handlebar*', 'vinyl music hall*', 'seville quarter*', 'wild gregs*', 'flora bama*', 'trader jons*', '1216 north*', 'loft on sabine bay*',
              'cordova lanes*', 'five flags*', 'blue angels*', 'blue wahoos*', 'ice flyers*'],   // real Pensacola names a generated name must never be or contain; never shown

  blurb: ['A Navy town and a church town on the Gulf, with a loud hardcore scene that never left. The kids are back at the house shows.',
          'A small scene that keeps its own history on the wall, in a town where storms and landlords decide which rooms last.'],
  hard: 'Under-18s have nowhere legal but the house; hurricane season; one bridge to the beach crowd.',
  region: 'the Gulf',
  missing: 'A safe, legal, all-ages room.',
  houseType: 'LIVING_ROOM',
  whereGo: [
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Gainesville', state: 'FL', lat: 29.65, lon: -82.32 },
    { name: 'Tallahassee', state: 'FL', lat: 30.45, lon: -84.25 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 }
  ],

  scene: {
    size: 2400,
    gens: [.2917, .4583, .25],                 // 700 kids, 1,100 middle, 600 old heads
    genreShares: [
      [.20, .17, .16, .03, .04, .05, .12, .10, .05, .05, .02, .01],
      [.18, .10, .10, .07, .09, .09, .13, .12, .03, .04, .03, .02],
      [.15, .08, .03, .09, .14, .08, .07, .13, .10, .02, .02, .09]
    ],
    stack: .60, roomTau: 1.0, trendLag: 20, glutAt: 4, traffic: 6, wordStart: 22,
    kidIntake: 120, memberChurn: .0015, transit: false
  },

  money: {
    comfort: [7, 10, 12],
    bills: { RENT: 650, UTILITIES: 160, CAR: 290, FOOD: 350 },
    shiftPay: 88, startCash: 700, priceIndex: 1.0
  },

  night: [                                     // Monday to Sunday
    [.45, .50, .55, .65, 1.00, 1.00, .70],     // kids
    [.60, .55, .65, .80, .92, .88, .75],       // middle: half of them work Friday and Saturday nights in kitchens and bars
    [.35, .40, .50, .65, .90, 1.00, .60]       // old heads
  ],

  tilt: [
    { fan: 'metal', band: 'hardcore', d: .10, reason: 'A heavy town. The base and the church are what both are kicking against.' },
    { fan: 'hardcore', band: 'metal', d: .10, reason: 'A heavy town. The base and the church are what both are kicking against.' },
    { fan: 'ska', band: 'street-punk', d: .15, gen: 2, reason: 'The nineties never left the beach.' },
    { fan: 'ska', band: 'pop-punk', d: .15, gen: 2, reason: 'The nineties never left the beach.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Pensacola' },
    { id: 'gulf-breeze', kind: 'FEEDER', name: 'Gulf Breeze', minutes: 20, bearing: 140, scene: 90, gens: [.50, .35, .15], lean: ['pop-punk', 'metal'],
      beyond: 'bay-bridge', bands: 1, note: 'Kids with cars and nothing to do. One bridge.',
      rooms: [{ id: 'gb-house', kind: 'HOUSE', hood: 'gulf-breeze', cap: 30, curfew: 1320, sketch: 10, standing: [70, 55, 50], note: 'A parents\' house. Deeply conservative about noise.' }] },
    { id: 'pace', kind: 'FEEDER', name: 'Pace', minutes: 30, bearing: 15, scene: 80, beyond: 'i10-bay', bands: 1, note: 'Drives in for everything.' },
    { id: 'cantonment', kind: 'FEEDER', name: 'Cantonment', minutes: 30, bearing: 335, scene: 70, gens: [.20, .55, .25], lean: ['metal', 'hardcore'],
      bands: 1, note: 'Mill town. Heavy music; shift workers.' },
    { id: 'milton', kind: 'FEEDER', name: 'Milton', minutes: 30, bearing: 40, scene: 110, beyond: 'i10-bay', bands: 3, note: 'Its own backyard shows and three bands.',
      rooms: [{ id: 'milton-lodge', kind: 'HALL', hood: 'milton', cap: 90, rent: 100, deposit: 0, pa: .5, curfew: 1380, note: 'A lodge hall. The manager has never heard of you.' },
              { id: 'milton-yard', kind: 'OUTDOOR', hood: 'milton', cap: 50, rent: 10, curfew: 1320, sketch: 30, note: 'A backyard by the river.' }] },
    { id: 'navarre', kind: 'FEEDER', name: 'Navarre', minutes: 40, bearing: 100, scene: 60, beyond: 'bay-bridge', note: 'Beach and military retirees; a few band kids.' },
    { id: 'century', kind: 'FEEDER', name: 'Century', minutes: 45, bearing: 355, scene: 15, note: 'A few kids drive in.' },
    { id: 'atmore', kind: 'FEEDER', name: 'Atmore', state: 'AL', minutes: 50, bearing: 340, scene: 30, note: 'Not much for teens; a few bands.' },
    { id: 'foley', kind: 'FEEDER', name: 'Foley', state: 'AL', minutes: 55, bearing: 265, scene: 50, note: 'Growing fast on the road to the beach.' },
    { id: 'gulf-shores', kind: 'FEEDER', name: 'Gulf Shores and Orange Beach', state: 'AL', minutes: 60, bearing: 245, scene: 70, gens: [.20, .60, .20],
      season: { months: [5, 6, 7, 8], mul: 1.5 }, note: 'Seasonal workers; summer.' },
    { id: 'brewton', kind: 'FEEDER', name: 'Brewton', state: 'AL', minutes: 60, bearing: 15, scene: 20, note: 'Timber town. A little band activity.' },
    { id: 'crestview', kind: 'FEEDER', name: 'Crestview', minutes: 60, bearing: 60, scene: 60, beyond: 'i10-bay', note: 'Teens drive to Pensacola or Fort Walton.' },
    { id: 'fairhope', kind: 'FEEDER', name: 'Fairhope and Daphne', state: 'AL', minutes: 65, bearing: 280, scene: 90, note: 'Look to Mobile first.' },
    { id: 'mobile', kind: 'PEER', name: 'Mobile', state: 'AL', minutes: 60, bearing: 290, scene: 2100, slug: 'mobile-al',
      note: 'A peer scene with its own bookers and rooms. Friendly, and a rival.' },
    { id: 'fort-walton', kind: 'PEER', name: 'Fort Walton Beach', minutes: 70, bearing: 90, scene: 420, slug: 'fort-walton-beach-fl', beyond: 'i10-bay',
      note: 'A small scene of its own; the first stop east.' }     // a peer: flyers can go there (route town:fort-walton) and a contact lives there, but the player books no room there
  ],

  chokepoints: [                                // which zones each one cuts is said by the zones' `beyond`, above
    { id: 'bay-bridge', name: 'the Three Mile Bridge', p: .025 },
    { id: 'i10-bay', name: 'the I-10 bridge over Escambia Bay', p: .015 }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Palafox and the old squares: bars with stages, condos above them, festival crowds and no parking.' },
    { id: 'north-hill', name: 'North Hill', route: 'hills', note: 'Old frame houses on the rise; quiet, organized neighbors; the house-show tradition started here.' },
    { id: 'east-hill', name: 'East Hill', route: 'hills', note: 'Bungalows, coffee shops and porches toward Bayou Texar. Priced up.' },
    { id: 'belmont', name: 'Belmont-DeVilliers', route: 'downtown', note: 'A historic Black business and music district northwest of downtown; small bars and halls.' },
    { id: 'west-side', name: 'the west side', route: 'work-side', note: 'Brownsville and Bayou Chico: cheap, industrial, warehouses and backyards, working families. Floods.' },
    { id: 'warrington', name: 'Warrington', route: 'work-side', note: 'The base side, along Navy Boulevard: sailors, tattoo shops, halls and working bars.' },
    { id: 'north', name: 'the north side', route: 'campus', note: 'Ferry Pass and the university: students, apartments, church halls, suburbs.' },
    { id: 'gulf-breeze', name: 'across the bay', route: 'town:gulf-breeze', note: 'Gulf Breeze: schools, boats and parents\' houses.' },
    { id: 'milton', name: 'Milton', route: 'town:milton', note: 'An old river town with backyards.' }
  ],

  routes: [
    { id: 'downtown', name: 'Downtown', zone: 'city', ceil: [.06, .16, .18], hours: 2,
      spots: [{ kind: 'POLE', label: 'the poles on Palafox' }, { kind: 'COFFEE_BOARD', label: 'the coffee place boards downtown' }, { kind: 'BAR_WALL', label: 'the bar bathrooms' }] },
    { id: 'hills', name: 'The Hills', zone: 'city', ceil: [.05, .12, .14], hours: 2,
      spots: [{ kind: 'RECORD_SHOP', label: 'the record store' }, { kind: 'COFFEE_BOARD', label: 'the coffee place on 9th' }, { kind: 'POLE', label: 'the poles on Cervantes' }] },
    { id: 'work-side', name: 'West side', zone: 'city', ceil: [.10, .10, .10], hours: 2,
      spots: [{ kind: 'LAUNDROMAT', label: 'the laundromat on Fairfield' }, { kind: 'TATTOO_SHOP', label: 'both tattoo shops on Navy Boulevard' }, { kind: 'PRACTICE_DOOR', label: 'the practice units by Bayou Chico' }] },
    { id: 'campus', name: 'North and campus', zone: 'city', ceil: [.16, .09, .03], hours: 2,
      spots: [{ kind: 'COLLEGE_BOARD', label: 'the union board at the university' }, { kind: 'SKATE_SHOP', label: 'the skate shop counter' }, { kind: 'POLE', label: 'the poles on Nine Mile Road' }] }
  ],

  rooms: [
    { id: 'carport', kind: 'HOUSE', hood: 'west-side', cap: 45, name: 'the Fairfield Carport', hostCut: 20, pa: .4, curfew: 1350, outdoor: true,
      sketch: 25, standing: [65, 60, 50], pressure: 45, start: true, note: 'A carport house. Quiet by 10:30, no exceptions.' },
    { id: 'cul-de-sac', kind: 'HOUSE', hood: 'north', cap: 35, hostCut: 0, pa: .3, curfew: 1320, outdoor: false,       // no name: one is generated
      sketch: 10, standing: [75, 50, 35], pressure: 55, note: 'A kids\' room in the north suburbs. Parents nearby.' },
    { id: 'shed', kind: 'OUTDOOR', hood: 'west-side', cap: 70, rent: 15, pa: .4, curfew: 1350, sketch: 35, standing: [60, 55, 40],                     // no name: one is generated
      note: 'A backyard with a shed in Brownsville. Fuel for the generator.' },
    { id: 'barn', kind: 'DIY', hood: 'west-side', cap: 120, name: 'the Rope Walk on Bayou Chico', rent: 60, pa: .6, curfew: 1440, ac: false, lowLying: true,
      sketch: 45, standing: [55, 60, 45], pressure: 60, needs: ['VOUCH'], note: 'A warehouse space by the bayou. No air conditioning. It floods.' },
    { id: 'lodge', kind: 'HALL', hood: 'west-side', cap: 160, name: 'the Mariners\' Lodge', rent: 225, deposit: 100, pa: .8, curfew: 1380, ac: true,
      sketch: 15, standing: [60, 65, 75], owner: 'HALL_MANAGER', note: 'A lodge hall. Its own bar opens for members after. Done by 11.' },
    { id: 'fellowship', kind: 'HALL', hood: 'north', cap: 120, rent: 120, deposit: 40, pa: .5, curfew: 1320, ac: true,                                  // no name: one is generated
      sketch: 5, standing: [70, 55, 60], owner: 'CHURCH_CONTACT', pressure: 55, note: 'No alcohol, done by 10, and the office decides what is acceptable.' },
    { id: 'lanes', kind: 'HALL', hood: 'warrington', cap: 110, rent: 150, deposit: 50, pa: .6, curfew: 1410, ac: true,                                 // no name: one is generated
      sketch: 30, standing: [55, 60, 60], note: 'A side room at the lanes, near the base.' },
    { id: 'cleat', kind: 'BAR', hood: 'east-hill', cap: 80, name: 'the Rusty Cleat', soundFee: 50, pa: .7, ages: ['A21'], matinee: true, curfew: 1560, ac: true, seated: false,
      following: .3, sketch: 20, standing: [40, 65, 70], note: 'A bar back room. 21 and over; Sunday matinees are possible.' },
    { id: 'club', kind: 'CLUB', hood: 'downtown', cap: 300, name: 'the Second Watch', houseCosts: 150, split: .8, pa: .9, ages: ['A21', 'A18'], curfew: 1560, ac: true,
      following: .6, sketch: 15, standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The long-running club downtown. Wants six weeks and a name.' },
    { id: 'records', kind: 'SHOP', hood: 'north-hill', cap: 40, name: 'Stylus Tray Records', pa: .4, curfew: 1140, ac: true,
      sketch: 5, standing: [70, 70, 80], following: .2, note: 'The record shop on the Hill. Afternoons; over by 7.' },
    { id: 'big-room', kind: 'BIG', hood: 'downtown', cap: 850, rent: 1800, deposit: 500, pa: 1.0, ages: ['ALL', 'A21'], curfew: 1500, ac: true,
      following: .8, sketch: 5, standing: [60, 65, 65], notice: 90, note: 'The big room downtown. Anyone with the deposit and three months can have it.' }
  ],

  bookers: [
    { kind: 'GENRE', genres: ['hardcore', 'metal'], homeRooms: ['lodge'], name: 45, showsPerMonth: 2, nights: [5], style: { reliable: .9, pays: .8, promotes: .7 } },
    { kind: 'TALENT_BUYER', genres: ['indie', 'garage', 'post-punk'], homeRooms: ['club'], name: 55, showsPerMonth: 3, nights: [4, 5], style: { reliable: .85, pays: .9, promotes: .5 } },
    { kind: 'ANYWHERE', genres: ['pop-punk', 'emo', 'indie'], homeRooms: ['cleat', 'lanes'], name: 35, showsPerMonth: 1.5, nights: [3, 4, 5], style: { reliable: .6, pays: .6, promotes: .6 } },
    { kind: 'KID', genres: ['emo', 'pop-punk', 'hardcore'], homeRooms: ['cul-de-sac', 'shed'], name: 20, showsPerMonth: 1, nights: [4, 5, 6], style: { reliable: .7, pays: .9, promotes: .9 } },
    { kind: 'OLD', genres: ['garage', 'street-punk', 'ska'], homeRooms: ['lanes'], name: 30, showsPerMonth: .3, nights: [5], style: { reliable: .9, pays: .9, promotes: .3 } }
  ],
  contacts: ['mobile-al', 'fort-walton-beach-fl', 'tallahassee-fl', 'gulfport-ms'],
  cast: { soundRate: 80 },

  weather: {
    preset: 'GULF',
    rain: [.25, .25, .25, .20, .25, .40, .45, .45, .35, .20, .20, .25],
    heat: [0, 0, 0, 0, .15, .50, .70, .70, .40, .05, 0, 0],
    cold: [.25, .15, .03, 0, 0, 0, 0, 0, 0, 0, .05, .20],
    fineMonths: [3, 4], coolMonths: [10],
    storm: { months: [6, 7, 8, 9, 10, 11], peak: [8, 9, 10], perWeek: .01, perWeekPeak: .04 }
  },

  calendar: [
    { id: 'parade', label: 'Mardi Gras parade weekend', tag: 'parade', month: 2, week: 2, dows: [4, 5, 6], can: [.80, .75, .70], hoods: ['downtown', 'belmont'], elsewhere: [.95, .90, .90] },
    { id: 'beach-airshow', label: 'the beach air show', tag: 'airshow', month: 7, week: 3, dows: [5], can: [.92, .90, .90] },
    { id: 'seafood', label: 'the seafood festival', tag: 'festival', month: 9, week: 4, dows: [4, 5, 6], can: [.90, .85, .80], hoods: ['downtown'], elsewhere: [.97, .95, .95] },
    { id: 'fair-1', label: 'the county fair', tag: 'fair', month: 10, weeks: [4, 5], dows: [3, 4, 5, 6], can: [.90, .95, .97] },
    { id: 'fair-2', label: 'the county fair', tag: 'fair', month: 11, week: 1, dows: [6], can: [.95, .97, 1] },
    { id: 'airshow', label: 'air show weekend', tag: 'airshow', month: 11, week: 1, dows: [4, 5], can: [.80, .75, .75], hoods: ['downtown', 'warrington', 'west-side'], elsewhere: [.92, .90, .90] },
    { id: 'race', label: 'race weekend', tag: 'race', month: 12, week: 1, dows: [3, 4, 5, 6], can: [.97, .92, .88] },
    { id: 'xmas-parade', label: 'the Christmas parade', tag: 'parade', month: 12, week: 2, dows: [5], can: [.90, .88, .85], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'football', label: 'high school football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.90, 1, .97] },
    { id: 'football-oct', label: 'high school football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.90, 1, .97] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1440, inForce: false }, quiet: 1350 },

  points: [
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07, pop: 1000000 },
    { name: 'Hattiesburg', state: 'MS', lat: 31.33, lon: -89.29, pop: 170000 },
    { name: 'Panama City', state: 'FL', lat: 30.16, lon: -85.66, pop: 200000 },
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.80, pop: 1100000 },
    { name: 'Jacksonville', state: 'FL', lat: 30.33, lon: -81.66, pop: 1700000 },
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37, pop: 7500000 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78, pop: 2100000 }
  ],
  roads: ['I-10', 'I-110', 'US 98', 'US 90', 'Highway 29', 'Nine Mile Road'],

  style: {
    inks: ['bayouTeal', 'fluorPink', 'fluorYellow'], papers: ['goldenrod', 'pastelBlue'],
    motifs: ['palm', 'oyster', 'mullet', 'hurricane', 'bridgeTruss', 'jet', 'routeShield', 'barbedWire', 'anchor'], avoid: ['snowflake', 'cactus', 'mountain', 'corn'],
    pictures: ['palmSky', 'carport', 'bridgeSpan', 'storm', 'bayou'],
    seasonal: [{ months: [8, 9, 10], motifs: ['hurricane'], pictures: ['storm'], x: 3 }, { months: [2], motifs: ['starburst'], pictures: [], x: 2 }],
    cityInks: ['bayouTeal', 'fluorYellow'], cityPaper: 'goldenrod', dateStyle: 'FRI_NOV_20'
  },

  words: {
    street: ['Fairfield', 'Cervantes', 'Palafox', 'Ninth Avenue', 'Navy Boulevard', 'Scenic Highway', 'Nine Mile', 'Mobile Highway', 'Garden Street', 'D Street', 'Davis Highway', 'Garcon Point Road'],
    water: ['Bayou Chico', 'Bayou Texar', 'Bayou Grande', 'Escambia Bay', 'the Sound', 'Perdido', 'the Gulf'],
    hood: ['Brownsville', 'Warrington', 'East Hill', 'North Hill', 'Ferry Pass', 'Bayou Chico', 'Gulf Breeze', 'Belmont'],
    thing: ['carport', 'satsuma tree', 'boat launch', 'hurricane shutter', 'blue tarp', 'cast net', 'mullet', 'oyster knife', 'pine straw', 'box fan',
            'sandbag', 'shrimp boat', 'bait shop', 'seawall', 'pontoon', 'johnboat', 'causeway', 'sandspur', 'lovebug', 'window unit',
            'punk house', 'flyer wall', 'zine shelf', 'corsage'],
    weather: ['humidity', 'heat lightning', 'pollen', 'low pressure', 'storm shutter', 'heat index', 'rip current', 'hard freeze'],
    order: ['Mariners\'', 'Oystermen\'s', 'Netmenders\'', 'Bayou Grande'],                 // invented trades and a bayou; never a real society
    surnames: ['Pruitt', 'Castillo', 'McCants', 'Nguyen', 'Hollinger', 'Ortiz', 'Tran', 'Fairley', 'Ladner', 'Washington', 'Delgado', 'Spears', 'Boudreaux',
               'Henley', 'Pham', 'Cobb', 'Rivas', 'Godwin', 'Mabry', 'Truong', 'Sellers', 'Peaden', 'Jernigan', 'Montoya', 'Hough', 'Bradley', 'Le', 'Strickland', 'Odom'],
    bands: {                                   // the local bands of content/bandNames.js (its pensacola list), by style; OLD = older-generation acts
      'hardcore': ['Short Leash', 'Clear Cut', 'Holdout', 'Iron Shore', 'Last Ward'],
      'pop-punk': ['Bad Sleepers', 'Halfway Kids', 'Porch Season', 'Sunbleached'],
      'emo': ['Kept Lights', 'Year of Rain', 'the tall pines', 'Bayfront Rooms', 'Kitchen Lights'],
      'crust': ['Ash Rite', 'Bleak Coast', 'Scorched Pine'],
      'garage': ['The Wet Matches', 'Hot Shade', 'The Rattlecans'],
      'post-punk': ['Rotary', 'Sodium Coast', 'Grey Ferry'],
      'indie': ['Pale Pier', 'Soft Weather', 'Little Bay', 'Oleander'],
      'metal': ['Grave Pine', 'Black Current', 'Wrathborn'],
      'ska': ['The Downtowners', 'The Ferry Boys', 'The Brass Hands'],
      'folk-punk': ['Live Oak Choir', 'Pecan Hymn', 'Saltgrass'],
      'noise': ['Hum Ward', 'Transformer', 'Clangor'],
      'street-punk': ['Shipfitters', 'The Bosuns', 'Hull Patch'],
      'powerviolence': ['Sand Burn', 'Splitlip', 'Sick Air'],
      'sludge': ['Swamp Lung', 'Lowwater', 'Tar Creek'],
      'shoegaze': ['Haze Season', 'Low Bloom', 'Soft Harbor'],
      'math-rock': ['pelican hour', 'fig wasp', 'paper heron'],
      'surf': ['The Breakers Club', 'The Sand Kings', 'The Seawalkers'],
      'darkwave': ['Hurricane Lace', 'Cold Gulf', 'Pale Bayou'],
      'OLD': ['The Whiskey Saints', 'Rust Belt Choir', 'The Loose Screws', 'Gravel Kings', 'The Long Hauls', 'Old Tackle', 'The Bay Rats', 'Iron Harbor', 'The Brine Brothers', 'Lowtide Union']
    }
  },

  events: [
    { id: 'PENSACOLA_BRIDGE_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Repairs are scheduled on the Three Mile Bridge this week.',
      title: 'The Three Mile Bridge is closed',
      body: 'Repairs close the Three Mile Bridge the night of your show. The Gulf Breeze kids can\'t get across without the long drive around.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can take the long way', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people from across the bay.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The bridge stayed closed. The beach side stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads went the long way around the bay. They\'ll remember that.' }
      ] },

    { id: 'PENSACOLA_STORM_WATCH', replaces: 'STORM_WATCH', when: 'WEEK', tier: 'HARD', weight: 3, cooldown: 30, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'There\'s a storm in the Gulf. Nobody knows yet where it goes.',
      title: 'Hurricane watch on show day',
      body: 'A storm\'s in the Gulf. The bridges may close tonight. Some of the bill lives on the beach side.',
      options: [
        { id: 'CANCEL', label: 'Cancel and reschedule', likely: 'Everyone understands. Trust holds.',
          effects: [{ op: 'CANCEL_SHOW', why: 'STORM' },
                    { op: 'CHANCE', p: .5, then: [{ op: 'FLAG', key: 'storm_hit', v: true }], thenText: 'You called it. The storm came in that night and the west side lost power for a week.',
                      else: [], elseText: 'You called it. The storm turned east. Clear skies by morning, and nobody held it against you.' }],
          result: 'You called it.' },
        { id: 'MAINLAND', label: 'Go ahead with whoever is on this side of the bay', likely: 'A smaller night that people will bring up later.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: 0, beyond: true }, { op: 'SHOW_MOD', key: 'headsMul', v: .7 }, { op: 'MEMORY', detail: 'STORM', rarity: .9 },
                    { op: 'CHANCE', p: .25, then: [{ op: 'SHOW_MOD', key: 'endEarly', v: true }, { op: 'SHOW_MOD', key: 'qMul', v: .7 }, { op: 'FLAG', key: 'storm_hit', v: true }], thenText: 'The power went at 9:40. You finished by flashlight.',
                      else: [{ op: 'SHOW_MOD', key: 'qAdd', v: 6 }], elseText: 'The rain held off till load-out. Everyone who came knew why they came.' }],
          result: 'You went ahead.' },
        { id: 'EARLY', label: 'Move it earlier and finish by 7', likely: 'Half the crowd, home before the weather.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .55 }, { op: 'SHOW_MOD', key: 'lateMin', v: -180 }, { op: 'MEMORY', detail: 'STORM', rarity: .7 },
                    { op: 'CHANCE', p: .4, then: [{ op: 'FLAG', key: 'storm_hit', v: true }], thenText: 'A matinee under a grey sky. Done by 7. The storm came in at midnight.',
                      else: [], elseText: 'A matinee under a grey sky. Done by 7. The storm never came.' }],
          result: 'A matinee under a grey sky.' }
      ] },

    { id: 'PENSACOLA_GENERATOR_SHOW', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 60, bind: ['owner'],
      if: { months: [7, 8, 9, 10, 11], flag: 'storm_hit', stage: [1, 4] },
      telegraph: null,
      title: 'The generator show',
      body: 'Half the west side has had no power for a week. {owner} has a yard, a generator and a gas can. "People need something normal."',
      options: [
        { id: 'DO_IT', label: 'Do it Saturday', likely: 'Gas money, short sets, and people who badly want a night out.',
          effects: [{ op: 'MONEY', amount: -30, cat: 'EVENT' }, { op: 'REGULARS', pct: .04 }, { op: 'NAME', d: 1.5 }, { op: 'STRESS', d: 4 }, { op: 'REL', who: '$owner', d: 3 },
                    { op: 'FLAG', key: 'storm_hit', v: false },
                    { op: 'NOTE', text: 'After a storm, a generator show is the first normal thing. People come.', conf: 1 }],
          result: 'Three bands on one generator and a string of work lights. Sixty people stood in a yard and nobody wanted to leave.' },
        { id: 'WAIT', label: 'Wait for the power', likely: 'Nothing lost.', effects: [{ op: 'FLAG', key: 'storm_hit', v: false }], result: 'You waited. The power came back Thursday.' },
        { id: 'ACOUSTIC', label: 'Do it without the generator', likely: 'Smaller and quieter. The neighbors won\'t mind.',
          effects: [{ op: 'REGULARS', pct: .02 }, { op: 'STRESS', d: 2 }, { op: 'FLAG', key: 'storm_hit', v: false }],
          result: 'Two guitars and a bucket for a kick drum. It was enough.' }
      ] },

    { id: 'PENSACOLA_JETS_OVER', when: 'NIGHT', tier: 'GENTLE', weight: 2, cooldown: 30, bind: ['show', 'opener'], at: 'SET:1',
      if: { slot: 'MATINEE', calendar: 'airshow' }, risk: { base: .8 },
      title: 'Jets over the matinee',
      body: '{t}. The practice flights are going over the bay. Nobody can hear {opener}.',
      options: [
        { id: 'BETWEEN', label: 'Stop between passes', likely: 'The set runs long.', effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 10 }], result: '{opener} played four songs in six pieces.' },
        { id: 'THROUGH', label: 'Play through it', likely: 'A mess. People will post about it.', effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -2 }, { op: 'FOLLOWERS', d: 8 }, { op: 'MEMORY', detail: 'INCIDENT', rarity: .5 }],
          result: '{opener} played straight through a flyover. Half the room filmed the ceiling.' },
        { id: 'LATER', label: 'Start an hour later', likely: 'Clean sets; the kids\' rides leave on time anyway.', effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }], result: 'You waited them out.' }
      ] },

    { id: 'PENSACOLA_AIR_SHOW_TRAFFIC', when: 'NIGHT', tier: 'REAL', weight: 2, cooldown: 30, bind: ['show', 'touring'], at: 'DOORS',
      if: { calendar: 'airshow' }, risk: { base: .7 },
      title: 'Air show weekend',
      body: '{t}. Downtown is full and {touring} is stuck in the air show traffic, backed up from the base to the interstate. "An hour. Maybe more."',
      options: [
        { id: 'PUSH_LAST', label: 'Push them last', likely: 'They play to whoever stays.', effects: [{ op: 'SWAP_ORDER', touringTo: 'LAST' }], result: '{touring} loaded in during the closer\'s last song and played anyway.' },
        { id: 'HOLD', label: 'Start with locals and hold the room', likely: 'The night runs late.', effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 30 }], result: 'You stretched every changeover. They made it.' },
        { id: 'HAT', label: 'Tell the crowd and ask for gas money at the door', likely: 'People are kind about it.', effects: [{ op: 'SHOW_MOD', key: 'hatBonus', v: 1 }, { op: 'SHOW_MOD', key: 'lateMin', v: 20 }, { op: 'TRUST', who: '$touring', d: 2 }],
          result: 'You said it from the front. The door did well after that.' }
      ] },

    { id: 'PENSACOLA_SAILORS', when: 'NIGHT', tier: 'GENTLE', weight: 1, cooldown: 20, bind: ['show'], at: 'SET:1',
      if: { roomKind: ['BAR', 'CLUB', 'HALL'], trait: 'MILITARY' }, risk: { base: .06, mul: [{ if: { roomKind: ['BAR'] }, x: 2 }] },
      title: 'Sailors on liberty',
      body: '{t}. A ship\'s in. A dozen sailors heard there was a punk show on Navy Boulevard and found this one instead.',
      options: [
        { id: 'LET_IN', label: 'Let them in', likely: 'More heads. Mostly fine.', effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.08 },
            { op: 'CHANCE', p: .15, then: [{ op: 'SHOW_MOD', key: 'qAdd', v: -4 }], thenText: 'One of them wanted a different kind of night. It took a while to explain.', else: [{ op: 'REGULARS', pct: .01 }], elseText: 'Two of them asked when the next one is.' }],
          result: 'They paid at the door like everyone else.' },
        { id: 'WATCH', label: 'Let them in and put someone near them', likely: 'Safe.', needs: { hasCrew: 'floor' }, effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.08 }, { op: 'REGULARS', pct: .01 }], result: '{floor} stood by them for a set. They were the politest people in the room.' }
      ] },

    { id: 'PENSACOLA_PARADE_SATURDAY', when: 'WEEK', tier: 'REAL', weight: 3, cooldown: 40, bind: ['show'],
      if: { daysOut: [2, 9], calendar: 'parade' },
      telegraph: 'Your show is on the parade weekend.',
      title: 'Parade Saturday',
      body: 'The parade route blocks the road to the room. Nobody will be able to park, and everybody will already have been out since noon.',
      options: [
        { id: 'SUNDAY', label: 'Move it to Sunday', likely: 'A day\'s notice lost; a room people can reach.', effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: true }], result: 'Sunday. The bands were fine with it.' },
        { id: 'PARADE_BILL', label: 'Start after the parade and catch the crowd on its way home', likely: 'A gamble.',
          effects: [{ op: 'CHANCE', p: .4, then: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.25 }], thenText: 'The parade let out and forty strangers followed the noise.', else: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }], elseText: 'Everyone went home to sleep it off.' }],
          result: 'You moved doors to the end of the parade.' },
        { id: 'CANCEL', label: 'Cancel', likely: 'What cancelling costs.', effects: [{ op: 'CANCEL_SHOW', why: 'PLAYER' }], result: 'You cancelled.' }
      ] },

    { id: 'PENSACOLA_MILL_SHIFT', when: 'NIGHT', tier: 'GENTLE', weight: 1, cooldown: 30, bind: ['show'], at: 'SET:PEAK',
      if: { notFlag: 'mill_shift_seen' }, risk: { base: .05, mul: [{ if: { roomKind: ['HALL', 'DIY', 'OUTDOOR'] }, x: 2 }] },
      title: 'The mill shift',
      body: '{t}. A crew from the Cantonment mill came straight from the shift change, smelling like the mill. They are the best crowd of the night.',
      options: [
        { id: 'GOOD', label: 'Good', likely: 'Nothing to decide.', effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: 3 }, { op: 'FLAG', key: 'mill_shift_seen', v: true }, { op: 'NOTE', text: 'Cantonment comes out on Fridays after second shift.', conf: 2 }],
          result: 'Cantonment comes out on Fridays after second shift.' },
        { id: 'TALK', label: 'Go say hello', likely: 'You miss half a set.', effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: 3 }, { op: 'FLAG', key: 'mill_shift_seen', v: true }, { op: 'REGULARS', pct: .02 }, { op: 'NOTE', text: 'Cantonment comes out on Fridays after second shift.', conf: 2 }],
          result: 'They said nobody ever books anything they can get to after work. You said Fridays.' }
      ] },

    { id: 'PENSACOLA_FLOODED_WAREHOUSE', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 60, bind: ['show', 'room'],
      if: { daysOut: [1, 7], roomKind: ['DIY'], months: [6, 7, 8, 9, 10, 11], chance: .3 },
      telegraph: 'A lot of rain is forecast, and that room floods.',
      title: 'The flooded warehouse',
      body: '{room} took water in the storm and has been declared unsafe. Your show there is {dow}.',
      options: [
        { id: 'CARPORT', label: 'Move it to a house overnight', likely: 'Capacity halves. Neighbors.', effects: [{ op: 'MOVE_SHOW', toKind: 'HOUSE', dayShift: 0, respect: true }, { op: 'ROOM_PRESSURE', d: 20 }], result: 'Same night, somebody\'s living room. You spent the day telling everyone.' },
        { id: 'HALL', label: 'Move it to a hall', likely: 'Costs rent you did not plan for.', effects: [{ op: 'MOVE_SHOW', toKind: 'HALL', dayShift: 0, respect: true }, { op: 'ROOM_PRESSURE', d: 20 }], result: 'The hall had the night. It cost what halls cost.' },
        { id: 'CANCEL', label: 'Cancel', likely: 'People understand.', effects: [{ op: 'CANCEL_SHOW', why: 'RESPECTED' }, { op: 'ROOM_PRESSURE', d: 20 }], result: 'Nobody blamed you. Nobody\'s going back in that building for a while.' }
      ] },

    { id: 'PENSACOLA_SIX_PM_STORM', when: 'NIGHT', tier: 'REAL', weight: 2, cooldown: 8, bind: ['show'], at: 'DOORS',
      if: { outdoor: true, months: [6, 7, 8, 9] }, risk: { base: .35 },
      title: 'The 6 p.m. storm',
      body: '{t}. The afternoon thunderstorm arrived exactly at doors.',
      options: [
        { id: 'WAIT', label: 'Wait forty minutes. It\'ll pass', likely: 'It usually does. Set times slide.',
          effects: [{ op: 'CHANCE', p: .8, then: [{ op: 'SHOW_MOD', key: 'lateMin', v: 40 }], thenText: 'It passed. Everything is wet and it\'s ten degrees cooler.', else: [{ op: 'SHOW_MOD', key: 'lateMin', v: 40 }, { op: 'SHOW_MOD', key: 'headsMul', v: .7 }, { op: 'INCIDENT', kind: 'RAINED_OUT', q: -6 }], elseText: 'It did not pass.' }],
          result: 'You waited.' },
        { id: 'UNDER', label: 'Move under cover and pack it tight', likely: 'Loud, close and over capacity.', effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .6 }, { op: 'SHOW_MOD', key: 'qAdd', v: 3 }], result: 'Everyone under one roof. The rain was louder than the opener.' },
        { id: 'CALL', label: 'Call it', likely: 'Everyone gets paid from what\'s there.', effects: [{ op: 'SHOW_MOD', key: 'endEarly', v: true }, { op: 'INCIDENT', kind: 'RAINED_OUT', q: -15 }], result: 'You called it at 6:40.' }
      ] },

    { id: 'PENSACOLA_AC_DIED', when: 'NIGHT', tier: 'REAL', weight: 1, cooldown: 20, bind: ['show', 'room'], at: 'SET:1',
      if: { roomKind: ['HALL', 'BAR', 'CLUB'], months: [6, 7, 8, 9] }, risk: { base: .06 },
      title: 'The AC died',
      body: '{t}. The air conditioning at {room} is out and it\'s 92 degrees at nine o\'clock.',
      options: [
        { id: 'WATER', label: 'Doors open, fans, water by the case', likely: 'The water is on you.', effects: [{ op: 'MONEY', amount: -25, cat: 'EVENT' }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }], result: 'You bought every case the gas station had.' },
        { id: 'SHORT', label: 'Shorter sets', likely: 'Out earlier. Bands understand.', effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -4 }, { op: 'SHOW_MOD', key: 'lateMin', v: -20 }], result: 'Twenty minutes each. Nobody complained.' },
        { id: 'THROUGH', label: 'Play through it', likely: 'People leave between sets.', effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -7 }, { op: 'SHOW_MOD', key: 'genMul', gen: 2, v: .8 }], result: 'The old heads went home after the second band.' }
      ] },

    { id: 'PENSACOLA_ORDERS', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 50, bind: ['band'],
      if: { trait: 'MILITARY', trust: { who: '$band', min: 50 }, weekMin: 20 },
      telegraph: null,
      title: 'Orders',
      body: '{band}\'s drummer got orders. Six weeks. "We don\'t know what we\'re going to do."',
      options: [
        { id: 'FAREWELL', label: 'Book them a farewell show', likely: 'It will draw, and it may be one people remember.', effects: [{ op: 'TRUST', who: '$band', d: 5 },
                    { op: 'MESSAGE', from: '$band', text: 'ok. a last show. any saturday before he ships out. we\'ll play first, last, whatever.', delay: 2, localAsk: 'LAST_SHOW' }],
          result: 'You told them to pick a Saturday.' },
        { id: 'FIND', label: 'Help them find a drummer', likely: 'An evening of asking around.', effects: [{ op: 'HOURS', d: -2, when: 'WEEK' }, { op: 'TRUST', who: '$band', d: 4 },
            { op: 'CHANCE', p: .5, then: [{ op: 'TRUST', who: '$band', d: 4 }], thenText: 'A kid from Pace can play. They start practicing Tuesday.', else: [], elseText: 'Nobody yet. They said thanks for trying.' }],
          result: 'You asked everyone you know who owns sticks.' },
        { id: 'LET', label: 'Let it happen', likely: 'Bands end.', effects: [{ op: 'NOTHING' }], result: 'You said you were sorry to hear it.' }
      ] },

    { id: 'PENSACOLA_COLD_SNAP', when: 'NIGHT', tier: 'GENTLE', weight: 1, cooldown: 20, bind: ['show', 'owner'], at: 'DOORS',
      if: { outdoor: true, months: [12, 1, 2], weather: 'COLD' }, risk: { base: .9 },
      title: 'Cold snap',
      body: '{t}. It is 36 degrees for a backyard show and nobody here owns a real coat.',
      options: [
        { id: 'FIRE', label: 'Fire pit', likely: 'People stay.', effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: 2 }], result: '{owner} had a fire pit. Half the room stood around it all night.' },
        { id: 'PACK', label: 'Pack everyone under the carport', likely: 'Warm, and too many people in one place.', effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .7 }, { op: 'SHOW_MOD', key: 'qAdd', v: 3 }], result: 'Body heat. It worked.' },
        { id: 'SHORT', label: 'Shorter sets', likely: 'Home by 9:30.', effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -3 }, { op: 'SHOW_MOD', key: 'lateMin', v: -20 }], result: 'Fast and cold.' }
      ] },

    { id: 'PENSACOLA_RACE_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show', 'touring'],
      if: { daysOut: [1, 6], calendar: 'race', jobNotDone: 'LODGING' },
      telegraph: 'Race weekend: every room in town is booked.',
      title: 'Race weekend',
      body: 'The race has filled every hotel between here and Milton, and {touring} needs somewhere to sleep.',
      options: [
        { id: 'FLOOR', label: 'Your floor', likely: 'An hour of your morning and a little of your nerves.',
          effects: [{ op: 'CREW', role: 'lodging', to: 'PLAYER' }, { op: 'JOB', type: 'LODGING', set: 'DONE' }, { op: 'TRUST', who: '$touring', d: 2 }], result: 'Four people on your floor. One of them did the dishes.' },
        { id: 'REGULAR', label: 'Ask a regular', likely: 'A favor owed.', needs: { regularsMin: 10 },
          effects: [{ op: 'JOB', type: 'LODGING', set: 'DONE' }, { op: 'REGULARS', pct: .01 }], result: 'Somebody who comes to everything has a spare room and said yes before you finished asking.' },
        { id: 'MOTEL', label: 'Book them a room in Milton', likely: 'Expensive, and a drive.', effects: [{ op: 'MONEY', amount: -110, cat: 'MOTEL' }, { op: 'JOB', type: 'LODGING', set: 'DONE' }], result: 'The last room in the county, and it cost like it.' }
      ] },

    { id: 'PENSACOLA_PUNK_PROM', when: 'WEEK', tier: 'GENTLE', weight: 1, cooldown: 300, bind: ['show'],
      if: { daysOut: [4, 12], months: [4, 5] },
      telegraph: null,
      title: 'Punk prom',
      body: 'It\'s prom season. A couple of the kids want your show {dow} to be a punk prom: thrift-store suits, corsages, and a hardcore band.',
      options: [
        { id: 'PROM', label: 'Make it a prom', likely: 'More kids, more photos, an afternoon of streamers.',
          effects: [{ op: 'SHOW_MOD', key: 'genMul', gen: 0, v: 1.25 }, { op: 'SHOW_MOD', key: 'qAdd', v: 3 }, { op: 'HOURS', d: -2, when: 'WEEK' }, { op: 'FOLLOWERS', d: 10 },
                    { op: 'NOTE', text: 'A punk prom brings out kids who never come to a regular show.', conf: 2 }],
          result: 'Somebody crowned a prom king mid-set. The corsages did not survive the pit.' },
        { id: 'PLAIN', label: 'Keep it a regular show', likely: 'Nothing lost.', effects: [{ op: 'NOTHING' }], result: 'They said they\'d throw one themselves next year.' }
      ] },

    { id: 'PENSACOLA_ARCHIVE_CAMERA', when: 'NIGHT', tier: 'GENTLE', weight: 1, cooldown: 40, bind: ['show'], at: 'SET:PEAK',
      if: { roomKind: ['HOUSE', 'DIY', 'OUTDOOR'] }, risk: { base: .08 },
      title: 'Someone from the archive',
      body: '{t}. Someone from the punk archive is shooting the whole night for the wall. Every flyer from here goes on the shelf with the old zines.',
      options: [
        { id: 'GOOD', label: 'Let them shoot', likely: 'Nothing to decide.', effects: [{ op: 'FOLLOWERS', d: 6 }, { op: 'NAME', d: .5 },
            { op: 'NOTE', text: 'The scene here keeps its own history. Your shows are in it now.', conf: 1 }],
          result: 'Somebody will find these photos in twenty years.' },
        { id: 'FLYER', label: 'Hand them a stack of your flyers', likely: 'A few minutes.', effects: [{ op: 'FOLLOWERS', d: 6 }, { op: 'NAME', d: 1 }, { op: 'REGULARS', pct: .01 }],
          result: 'Your flyer is on the wall now, between two from before you were born.' }
      ] }
  ]
});
