SB.Cities.register('charlotte', {
  v: 1,
  slug: 'charlotte',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of north carolina at charlotte', 'unc charlotte', 'uncc', 'queens university of charlotte', 'johnson c smith university',
           'central piedmont community college', 'davidson college', 'charlotte observer', 'queen city nerve', 'qc nerve', 'creative loafing',
           'axios charlotte', 'charlotte magazine', 'wfae', 'wbtv', 'wsoc', 'wcnc', 'carolina panthers', 'charlotte hornets', 'charlotte fc',
           'charlotte knights', 'bank of america', 'wells fargo', 'truist', 'duke energy', 'lowe\'s', 'charlotte douglas international airport',
           'charlotte motor speedway', 'coca-cola 600', 'nascar', 'carowinds', 'fort mill', 'carolina renaissance festival', 'hurricane hugo',
           'hurricane helene', 'lynx', 'bojangles', 'waffle house', 'amtrak',
           'bank of america stadium', 'spectrum center', 'treasure fest', 'recess fest', 'reverb fest', 'pride charlotte', 'fya fest', 'river jam', 'carolina headbangers ball', 'we rock charlotte', 'clt weekly', 'charlotte ledger', 'q-notes', 'cmpd', 'charlotte-mecklenburg police', 'charlotte city council', 'uncg', 'wknc', 'wxyc'],
  blocklist: ['charlotte observer*', 'queen city nerve*', 'creative loafing*', 'carowinds*', 'bank of america*', 'coca-cola 600*', 'treasure fest*', 'recess fest*', 'reverb fest*', 'spectrum center*'],

  blurb: ['A banking skyline sitting on top of a punk scene that keeps losing its rooms to condos.',
          'The all-ages kids still find each other.'],
  hard: 'Redevelopment keeps erasing rooms and the sprawl scatters the crowd.',
  region: 'the Carolinas',
  whereGo: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Charlotte' },
    { id: 'gastonia', kind: 'FEEDER', name: 'Gastonia', minutes: 30, bearing: 270, note: 'A working-class textile town with bands and kids.' },
    { id: 'concord', kind: 'FEEDER', name: 'Concord and Kannapolis', minutes: 30, bearing: 40, note: 'A racetrack town to the northeast.' },
    { id: 'rock-hill', kind: 'FEEDER', name: 'Rock Hill', state: 'SC', minutes: 30, bearing: 190, note: 'Across the line, with some DIY.' },
    { id: 'mooresville', kind: 'FEEDER', name: 'Mooresville and Huntersville', minutes: 35, bearing: 345, note: 'Lake suburbs.' },
    { id: 'monroe', kind: 'FEEDER', name: 'Monroe and Matthews', minutes: 35, bearing: 125, note: 'East suburbs.' },
    { id: 'salisbury', kind: 'FEEDER', name: 'Salisbury', minutes: 50, bearing: 20, note: 'A small old town.' },
    { id: 'shelby', kind: 'FEEDER', name: 'Shelby and Kings Mountain', minutes: 55, bearing: 270, note: 'Small towns to the west.' },
    { id: 'greenville', kind: 'PEER', name: 'Greenville', state: 'SC', minutes: 100, bearing: 220, slug: 'greenville-sc', note: 'Its own DIY scene.' },
    { id: 'winston-salem', kind: 'PEER', name: 'Winston-Salem', minutes: 90, bearing: 40, slug: 'winston-salem-nc', note: 'Its own scene up I-77 and I-40.' },
    { id: 'columbia', kind: 'PEER', name: 'Columbia', state: 'SC', minutes: 95, bearing: 175, slug: 'columbia-sc', note: 'A college-town scene.' }
  ],

  hoods: [
    { id: 'uptown', name: 'Uptown', route: 'downtown', note: 'Towers, arenas and bars. Nothing DIY.' },
    { id: 'noda', name: 'NoDa', route: 'downtown', note: 'An arts district of old mill houses. Clubs and bars, and condos rising where rooms closed.' },
    { id: 'plaza-midwood', name: 'Plaza Midwood', route: 'old-side', note: 'Older bungalows and bars. House-show territory.' },
    { id: 'south-end', name: 'South End', route: 'work-side', note: 'An old rail corridor full of apartments now. A big all-ages club closed here.' },
    { id: 'elizabeth', name: 'Elizabeth and Villa Heights', route: 'old-side', note: 'Old houses and renters.' },
    { id: 'belmont', name: 'Belmont and Optimist Park', route: 'old-side', note: 'Cheaper old houses near NoDa.' },
    { id: 'west-charlotte', name: 'West Charlotte and Wilkinson Boulevard', route: 'work-side', note: 'Warehouses and cheap space near the airport.' },
    { id: 'university-city', name: 'University City', route: 'campus', note: 'Students and suburban sprawl to the northeast.' },
    { id: 'matthews', name: 'Matthews and Pineville', route: 'campus', note: 'Suburbs where kids drive in.' },
    { id: 'dilworth', name: 'Dilworth and Myers Park', route: 'old-side', note: 'Wealthy. Not a scene base.' }
  ],

  rooms: [
    { id: 'plaza-bungalow', kind: 'HOUSE', hood: 'plaza-midwood', cap: 50, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 55, start: true, note: 'A front room in an old bungalow in a fast-changing neighborhood. The neighbors have new money and a short fuse.' },
    { id: 'belmont-house', kind: 'HOUSE', hood: 'belmont', cap: 40, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [65, 60, 45],
      pressure: 50, note: 'A cheap old house near the arts district. The rents are climbing and a condo is going up across the street.' },
    { id: 'elizabeth-yard', kind: 'HOUSE', hood: 'elizabeth', cap: 60, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 25, standing: [65, 60, 50],
      pressure: 45, note: 'A backyard behind an old rental house. Warm nights, a generator, and renters who might be gone by spring.' },
    { id: 'backhouse-space', kind: 'DIY', hood: 'noda', cap: 80, rent: 60, pa: .5, curfew: 1350, ac: false, sketch: 35, standing: [60, 60, 50],
      pressure: 50, note: 'A renovated space behind a house run by a music-lesson nonprofit. All ages, punk and metal on the calendar, and nobody is sure how long.' },
    { id: 'airport-warehouse', kind: 'DIY', hood: 'west-charlotte', cap: 150, rent: 90, pa: .6, curfew: 1380, ac: false, sketch: 50, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'A bay in a warehouse near the airport. Cheap and loud, with a fire marshal and a developer both circling.' },
    { id: 'strip-rock-bar', kind: 'BAR', hood: 'plaza-midwood', cap: 200, soundFee: 60, pa: .8, ages: ['A21'], curfew: 1500, ac: true, following: .4, sketch: 20, standing: [50, 65, 70],
      note: 'A neighborhood bar bought and turned into a rock room. It books local and regional bands, and it leans 21 and over.' },
    { id: 'sticker-dive', kind: 'CLUB', hood: 'elizabeth', cap: 250, houseCosts: 150, split: .8, pa: .8, ages: ['A18', 'A21'], curfew: 1500, ac: true, following: .5, sketch: 20, standing: [45, 70, 75],
      pressure: 55, note: 'A sticker-covered dive that has run punk and hardcore for decades, with mixed-age nights. The rent and the building are always one lease away from the end.' },
    { id: 'noda-stage', kind: 'CLUB', hood: 'noda', cap: 250, houseCosts: 150, split: .8, pa: .8, ages: ['A18', 'A21'], curfew: 1470, ac: true, following: .4, sketch: 15, standing: [45, 70, 70],
      note: 'A bar with a stage on the arts strip. Post-hardcore, benefit nights, and condos rising on every side.' },
    { id: 'basement-stage', kind: 'CLUB', hood: 'uptown', cap: 600, houseCosts: 250, split: .8, pa: .9, ages: ['ALL', 'A21'], curfew: 1410, ac: true, following: .6, sketch: 10, standing: [40, 70, 65],
      owner: 'TALENT_BUYER', notice: 56, needs: ['FULL_BILL'], note: 'A basement-level stage in a big entertainment complex. Some nights all ages, some 21 and over, and the usual step up for a Charlotte bill.' },
    { id: 'rail-arena', kind: 'BIG', hood: 'south-end', cap: 1000, pa: 1, ages: ['ALL'], curfew: 1380, ac: true, following: .8, sketch: 5, standing: [40, 70, 60],
      note: 'The big rooms by the rail line and the arenas uptown. Touring punk and emo land here, and it is the place a local band hopes to open for.' },
    { id: 'fest-porch', kind: 'OUTDOOR', hood: 'plaza-midwood', cap: 100, rent: 15, pa: .4, curfew: 1260, ac: false, outdoor: true, sketch: 30, standing: [60, 55, 45],
      note: 'Porches and yards along the strip on festival weekend. Good for an afternoon, and over by nine.' },
    { id: 'suburb-hall', kind: 'HALL', hood: 'matthews', cap: 150, rent: 160, deposit: 75, pa: .5, curfew: 1320, ac: true, sketch: 10, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'A rented hall in the suburbs where the kids drive in. All ages, a flat fee, and out by ten.' }
  ],

  contacts: ['greenville-sc', 'winston-salem-nc', 'columbia-sc', 'spartanburg-sc', 'asheville-nc'],

  calendar: [
    { id: 'diy-weekend', label: 'the multi-venue DIY weekend', tag: 'festival', month: 5, weeks: [3, 4], dows: [4, 5], can: [0.85, 0.85, 0.82], hoods: ['plaza-midwood'], elsewhere: [0.95, 0.95, 0.95] },
    { id: 'river-music', label: 'the river music weekend', tag: 'festival', month: 5, weeks: [1, 2], dows: [5, 6], can: [0.92, 0.9, 0.9], hoods: ['uptown'], elsewhere: [1, 1, 1] },
    { id: 'race-may', label: 'Memorial Day race weekend', tag: 'race', month: 5, week: 5, dows: [5, 6, 0], can: [0.9, 0.88, 0.88] },
    { id: 'pride-parade', label: 'Pride weekend', tag: 'parade', month: 8, week: 3, dows: [5, 6], can: [0.88, 0.88, 0.85], hoods: ['uptown'], elsewhere: [0.97, 0.95, 0.95] },
    { id: 'race-fall', label: 'the fall race weekend', tag: 'race', month: 10, weeks: [2, 3], dows: [5, 6], can: [0.92, 0.9, 0.9] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 4], dows: [6], can: [0.88, 0.95, 0.95], hoods: ['uptown', 'south-end'], elsewhere: [1, 1, 1] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 3], dows: [6], can: [0.88, 0.95, 0.95], hoods: ['uptown', 'south-end'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.1] }
  ],

  rules: { curfewMinors: { weeknight: 1320, weekend: 1320, inForce: true } },
  points: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 500000 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64, pop: 470000 },
    { name: 'Asheville', state: 'NC', lat: 35.6, lon: -82.55, pop: 95000 },
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44, pop: 230000 }
  ],
  roads: ['I-77', 'I-85', 'I-485', 'I-277', 'Independence Boulevard', 'Tryon Street'],

  words: {
    street: ['Tryon Street', 'Independence Boulevard', 'North Davidson Street', 'Central Avenue', 'Wilkinson Boulevard', 'South Boulevard'],
    water: ['Lake Norman', 'Lake Wylie', 'Sugar Creek'],
    hood: ['NoDa', 'Plaza Midwood', 'South End', 'Elizabeth', 'Villa Heights', 'Optimist Park'],
    thing: ['light rail', 'mill house', 'speedway', 'sweet tea', 'condo tower'],
    weather: ['afternoon thunderstorm', 'ice storm']
  },

  events: [
    { id: 'CHARLOTTE_CURFEW_NINE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], months: [11, 12, 1, 2, 3, 4, 5, 6, 7, 8] },
      telegraph: 'The new youth curfew is on every news show, and the police say they mean it.',
      title: 'Home by ten',
      body: 'The city has a curfew for everyone under eighteen, ten to six, every night. Your all-ages bill is booked for eight, and the kids have to be home before it ends.',
      options: [
        { id: 'EARLY', label: 'Start early and put the headliner on first', likely: 'Most of the kids get home on time. A short, tight night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors early, headliner first, and the kids walked out at nine-forty.' },
        { id: 'ACCEPT', label: 'Run the bill as planned', likely: 'The younger kids stay home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Half the kids left before the last band. The ones left stayed to the end.' },
        { id: 'MOVE', label: 'Move it to a 21-and-over bar', likely: 'A smaller, older crowd.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'BAR', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'A bar took the bill. The kids were not allowed.' }
      ] },

    { id: 'CHARLOTTE_RACE_VANS', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'race' },
      telegraph: 'Race weekend has every hotel room in town booked, and the DIY weekend falls on the same days.',
      title: 'Every hotel is full',
      body: 'Race weekend and a local festival share the same dates. The touring band cannot find a room and asks to sleep on a porch in the neighborhood.',
      options: [
        { id: 'PORCH', label: 'Put them up on a porch', likely: 'A packed floor, a few noise complaints.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .95 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'They slept on a porch and played like it was a hotel.' },
        { id: 'MOTEL', label: 'Pay for a room an hour out', likely: 'Costs forty dollars. They arrive late.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'SHOW_MOD', key: 'lateMin', v: 45 }],
          result: 'A motel an hour out. They made it by doors.' },
        { id: 'ACCEPT', label: 'Let them find their own way', likely: 'Risky. They may not come at all.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The band got in late and played a short set to a thin room.' }
      ] },

    { id: 'CHARLOTTE_SUNDAY_GAME', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'A home game on Sunday has the bars and the lots on the south side full by noon.',
      title: 'The football lot is full',
      body: 'The stadium crowd has taken the parking and the south-side bars. One night to move an uptown-adjacent show to a yard in Elizabeth.',
      options: [
        { id: 'YARD', label: 'Move the show to a backyard', likely: 'Smaller, looser, and nobody can tow a yard.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A yard took the whole bill, and the floor was packed.' },
        { id: 'LATE', label: 'Push doors back until the game is over', likely: 'The night starts late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. The crowd came in loud.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the game.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The lot stayed full. The regulars came.' }
      ] }
  ]
});
