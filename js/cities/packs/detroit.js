SB.Cities.register('detroit', {
  v: 1,
  slug: 'detroit',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['wayne state university', 'university of detroit mercy', 'university of michigan', 'michigan state', 'eastern michigan university', 'oakland university',
           'detroit free press', 'detroit news', 'metro times', 'hour detroit', 'wdet', 'wxyz', 'wjr', 'detroit lions', 'detroit tigers', 'detroit red wings', 'detroit pistons',
           'general motors', 'chrysler', 'stellantis', 'fiat chrysler', 'henry ford health', 'little caesars', 'quicken loans', 'rocket mortgage', 'ilitch', 'comerica',
           'greektown casino', 'motorcity casino', 'mgm grand detroit', 'north american international auto show', 'auto show', 'woodward dream cruise', 'detroit grand prix',
           'ford fireworks', 'thanksgiving parade', 'selfridge air national guard base', 'motown', 'detroit lions', 'tigers', 'red wings', 'ambassador bridge', 'detroit-windsor tunnel',
           'hamtramck labor day festival', 'polish day parade', 'russell industrial center', 'michigan state fair', 'arts beats and eats', 'angels\' night',
           'clickondetroit', 'fox 2', 'cbs detroit', 'michigan public', 'impact 89fm', 'model d', 'deadline detroit', 'michigan chronicle', 'stereogum'],
  blocklist: ['metro times*', 'detroit free press*', 'motown*', 'little caesars*', 'greektown*', 'rocket mortgage*', 'dream cruise*', 'michigan chronicle*', 'deadline detroit*', 'arts beats and eats*'],

  blurb: ['A huge, shrunken factory city with blocks of empty lots between everything. Deep punk and hardcore roots run through the Hamtramck bars and the basements in the southwest.',
          'Nobody lives close to anybody, but houses cost almost nothing and space is everywhere, so the scene runs on cars, old halls and a lot of nerve.'],
  hard: 'Everything is far apart, and bars hold the age rules so all-ages rooms are rare.',
  region: 'the Great Lakes',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69 },
    { name: 'Toronto', state: 'ON', lat: 43.65, lon: -79.38 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'The hardcore legacy comes from the old basement-and-hall days, and the basements are still going.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Detroit' },
    { id: 'ferndale', kind: 'FEEDER', name: 'Ferndale', minutes: 20, bearing: 350, note: 'An inner suburb where a lot of bands live.' },
    { id: 'dearborn', kind: 'FEEDER', name: 'Dearborn', minutes: 20, bearing: 250, note: 'A big suburb by the factory complex.' },
    { id: 'warren', kind: 'FEEDER', name: 'Warren', minutes: 25, bearing: 5, note: 'A blue-collar suburb with metal and punk kids.' },
    { id: 'royal-oak', kind: 'FEEDER', name: 'Royal Oak', minutes: 25, bearing: 340, note: 'A bar-heavy suburb.' },
    { id: 'taylor', kind: 'FEEDER', name: 'Taylor', minutes: 30, bearing: 215, note: 'A south suburb with garage bands.' },
    { id: 'livonia', kind: 'FEEDER', name: 'Livonia', minutes: 30, bearing: 270, note: 'A west suburb.' },
    { id: 'mount-clemens', kind: 'FEEDER', name: 'Mount Clemens', minutes: 35, bearing: 25, note: 'A small bar circuit to the northeast.' },
    { id: 'pontiac', kind: 'FEEDER', name: 'Pontiac', minutes: 40, bearing: 335, note: 'An old auto town with cheap rooms.' },
    { id: 'ann-arbor', kind: 'PEER', name: 'Ann Arbor', minutes: 45, bearing: 265, slug: 'ann-arbor-mi', note: 'A campus scene with steady house shows.' },
    { id: 'toledo', kind: 'PEER', name: 'Toledo', state: 'OH', minutes: 60, bearing: 185, slug: 'toledo-oh', note: 'A smaller scene to the south.' },
    { id: 'flint', kind: 'PEER', name: 'Flint', minutes: 70, bearing: 335, slug: 'flint-mi', note: 'Smaller and tough.' },
    { id: 'lansing', kind: 'PEER', name: 'Lansing', minutes: 90, bearing: 295, slug: 'lansing-mi', note: 'A mid-size scene up the highway.' }
  ],

  hoods: [
    { id: 'hamtramck', name: 'Hamtramck', route: 'old-side', note: 'An independent enclave of old two-family houses and lots of bars, ringed by the city. The center of the punk bar scene.' },
    { id: 'corktown', name: 'Corktown', route: 'downtown', note: 'The oldest neighborhood, west of downtown: bars and old houses, and rents on the way up.' },
    { id: 'southwest', name: 'Southwest Detroit', route: 'work-side', note: 'A Mexican neighborhood by the rail yards. A house here hosts basement punk shows.' },
    { id: 'cass', name: 'Cass Corridor and Midtown', route: 'campus', note: 'A gritty strip with an art-space legacy and the early hardcore roots.' },
    { id: 'delray', name: 'Delray', route: 'work-side', note: 'A heavy-industry pocket by the river that once held an all-ages hall.' },
    { id: 'eastern-market', name: 'Eastern Market', route: 'downtown', note: 'Market sheds and warehouses with a few loft spaces.' },
    { id: 'ferndale', name: 'Ferndale', route: 'old-side', note: 'An inner suburb of bars and nightlife. More expensive than the city.' },
    { id: 'east-side', name: 'the East Side and Jefferson Chalmers', route: 'work-side', note: 'Cheap houses on a grid by the river.' },
    { id: 'hazel-park', name: 'Hazel Park', route: 'old-side', note: 'Just over Eight Mile: small ranch houses, a county road and the old suburban answer to the all-ages hall problem.' }
  ],

  rooms: [
    { id: 'southwest-house', kind: 'HOUSE', hood: 'southwest', cap: 60, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 25, standing: [70, 60, 45],
      pressure: 45, start: true, note: 'A basement under an ordinary house on a side street. It has run shows since the long lockdown, and a summer storm can flood it.' },
    { id: 'collective-house', kind: 'HOUSE', hood: 'corktown', cap: 120, hostCut: 0, pa: .5, curfew: 1440, ac: false, outdoor: false, sketch: 30, standing: [65, 60, 45],
      pressure: 50, note: 'An old frame collective house with a long all-ages calendar and a donation jar. The upkeep and the fire code are the worry.' },
    { id: 'rail-warehouse', kind: 'DIY', hood: 'southwest', cap: 400, rent: 120, deposit: 0, pa: .7, curfew: 1410, ac: false, sketch: 35, standing: [55, 60, 50],
      pressure: 50, note: 'A professionally run warehouse room with street art on every wall and all-ages bills. Rent keeps nudging it toward bigger shows.' },
    { id: 'caniff-room', kind: 'DIY', hood: 'hamtramck', cap: 150, rent: 80, deposit: 0, pa: .6, curfew: 1380, ac: false, sketch: 40, standing: [60, 60, 45],
      pressure: 55, needs: ['VOUCH'], note: 'Hardcore, emo and metal in a former bar. Leases are short and the bar-room fire code is long.' },
    { id: 'midtown-space', kind: 'DIY', hood: 'cass', cap: 100, rent: 60, deposit: 0, pa: .5, curfew: 1380, ac: false, sketch: 45, standing: [55, 60, 45],
      pressure: 55, needs: ['VOUCH'], note: 'A noise and experimental space in an old building. Hard to find and gone before the next season.' },
    { id: 'corner-shop', kind: 'SHOP', hood: 'hamtramck', cap: 40, pa: .4, curfew: 1290, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'A record shop with a performance corner. Small, early and over by half past nine.' },
    { id: 'campau-bar', kind: 'BAR', hood: 'hamtramck', cap: 120, soundFee: 50, pa: .7, ages: ['ALL', 'A18'], matinee: true, curfew: 1590, ac: true, following: .4, sketch: 20,
      standing: [50, 65, 70], note: 'A back-room stage on the main strip with an 18-plus night and a few all-ages afternoons. The license sets the age.' },
    { id: 'hall-club', kind: 'CLUB', hood: 'hamtramck', cap: 300, houseCosts: 150, split: .8, pa: .85, ages: ['ALL'], curfew: 1380, ac: true, following: .5, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A bar-hall that runs all-ages punk on certain nights. Case by case, and one bad bar night can end the policy.' },
    { id: 'market-gallery', kind: 'CLUB', hood: 'eastern-market', cap: 500, houseCosts: 200, split: .8, pa: .9, ages: ['ALL'], curfew: 1380, ac: true, following: .6, sketch: 10,
      standing: [40, 70, 70], owner: 'TALENT_BUYER', notice: 56, needs: ['FULL_BILL'], note: 'A gallery-style room for touring hardcore, all ages. It sells out for names, and it is too big for a first show.' },
    { id: 'ferndale-bar', kind: 'BAR', hood: 'ferndale', cap: 200, soundFee: 60, pa: .75, ages: ['A21'], curfew: 1590, ac: true, following: .3, sketch: 15,
      standing: [45, 65, 70], note: 'A bar north of Eight Mile. They check IDs, and it is a long drive from anywhere.' },
    { id: 'county-road-club', kind: 'CLUB', hood: 'hazel-park', cap: 250, houseCosts: 150, split: .8, pa: .8, ages: ['ALL'], curfew: 1380, ac: true, following: .4, sketch: 20,
      standing: [50, 65, 65], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'An all-ages music club and gallery on a county road. The old suburban answer to the hall problem.' },
    { id: 'industrial-hall', kind: 'BIG', hood: 'eastern-market', cap: 1500, pa: 1, ages: ['A18'], curfew: 1380, ac: true, following: .7, sketch: 5,
      standing: [35, 70, 70], note: 'A warehouse-sized room in an old industrial complex. It holds a yearly hardcore weekend, and the rent is for later.' }
  ],

  calendar: [
    { id: 'polish-fest', label: 'the street festival in Hamtramck', tag: 'festival', month: 9, week: 1, dows: [5, 6, 0], can: [.85, .80, .85], hoods: ['hamtramck'], elsewhere: [1, .97, .97] },
    { id: 'river-fireworks', label: 'the river fireworks night', tag: 'holiday', month: 6, week: 4, dows: [0], can: [.88, .88, .88], hoods: ['corktown', 'eastern-market'], elsewhere: [1, 1, 1] },
    { id: 'hardcore-weekend', label: 'the big hardcore weekend', tag: 'festival', month: 9, week: 2, dows: [5, 6], can: [.85, .88, .90] },
    { id: 'avenue-cruise', label: 'the big cruise on the main avenue', tag: 'festival', month: 8, week: 3, dows: [5], can: [.90, .90, .90], hoods: ['ferndale'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [6], can: [.88, .95, .95] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 5], dows: [6], can: [.88, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend and the youth curfew eve', tag: 'holiday', month: 10, weeks: [4, 5], dows: [3, 4, 5], can: [.92, .95, .95] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1320, weekend: 1320, inForce: true } },

  contacts: ['ann-arbor-mi', 'toledo-oh', 'flint-mi', 'lansing-mi', 'cleveland', 'chicago'],

  points: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 9500000 },
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69, pop: 2000000 },
    { name: 'Toronto', state: 'ON', lat: 43.65, lon: -79.38, pop: 6200000 },
    { name: 'Windsor', state: 'ON', lat: 42.31, lon: -83.04, pop: 330000 }
  ],
  roads: ['I-75', 'I-94', 'I-96', 'M-10', 'Woodward'],

  words: {
    street: ['Woodward', 'Michigan Avenue', 'Gratiot', 'Joseph Campau', 'Caniff', 'Jefferson'],
    water: ['the Detroit River'],
    hood: ['Hamtramck', 'Corktown', 'Delray', 'Cass Corridor', 'Springwells', 'Jefferson Chalmers', 'Eastern Market'],
    thing: ['empty lot', 'pothole', 'rail crossing', 'road salt', 'Polish bakery', 'flooded basement'],
    weather: ['lake-effect snow', 'summer storm']
  },

  events: [
    { id: 'DETROIT_BASEMENT_FLOOD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [6, 7, 8, 9] },
      telegraph: 'A line of violent storms is headed across the county.',
      title: 'The basement is under water',
      body: 'The storm dumped hours of rain on the block, and the basement is standing in four inches of water. The host has a shop vac and not much hope.',
      options: [
        { id: 'MOVE', label: 'Move it a day, once it drains', likely: 'It breaks the date, and everybody trusts you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could make it came.' },
        { id: 'UP', label: 'Move it up to the first floor', likely: 'It\'s smaller and louder, with the neighbors right there.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'The whole bill played in a living room, and people stood on the stairs.' },
        { id: 'VAC', label: 'Pump it out and play on', likely: 'It costs forty dollars, and most of the crowd stays home.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The water went down by eight, and the floor was damp and the room was half full.' }
      ] },

    { id: 'DETROIT_STREET_FESTIVAL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 4], months: [9], calendar: 'festival' },
      telegraph: 'The big street festival is on Labor Day weekend, and Joseph Campau is closed for a parade.',
      title: 'The parade is on the load-in',
      body: 'Half a million people are on the main street, the bars are packed, and the van can\'t get within four blocks of the back door, so the show has to load in on foot over the parade route.',
      options: [
        { id: 'EARLY', label: 'Load in at dawn before the barricades go up', likely: 'It\'s a long day, but the gear is in.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'The gear was in by nine in the morning, and then you sat in the room all day and waited for the street to fill.' },
        { id: 'CART', label: 'Hand-cart the gear in and play late', likely: 'It\'s a mess, and the crowd comes in drunk.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.15 }],
          result: 'Amps went down the sidewalk on hand trucks, and the room was packed and loud with festival people.' },
        { id: 'MOVE', label: 'Move the bill to a house', likely: 'It\'s smaller and quieter, and off the street.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A basement across town took the bill, and the crowd followed the van.' }
      ] },

    { id: 'DETROIT_YOUTH_CURFEW_EVE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 4], months: [10], calendar: 'holiday' },
      telegraph: 'Police posted the Halloween-eve curfew, and everyone under eighteen is off the street from six.',
      title: 'Everyone under eighteen is home by six',
      body: 'The curfew has taken the youngest half of your all-ages crowd before the first band, but the older ones are still coming.',
      options: [
        { id: 'LATE', label: 'Keep the full bill and let the older crowd fill it', likely: 'It\'s a smaller, older room.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The kids were home by six, and the older heads filled the room anyway and stayed late.' },
        { id: 'MATINEE', label: 'Start at four and finish before the curfew', likely: 'It\'s short, early and tight.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -150 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'You opened doors at four and finished by half past five, and the kids ran for their rides.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and the bands trust you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could make it came.' }
      ] }
  ]
});
