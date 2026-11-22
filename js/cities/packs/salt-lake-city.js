SB.Cities.register('salt-lake-city', {
  v: 1,
  slug: 'salt-lake-city',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of utah', 'utah utes', 'brigham young university', 'byu', 'utah state university', 'utah jazz', 'real salt lake', 'salt lake tribune',
           'deseret news', 'city weekly', 'slug magazine', 'ksl', 'kutv', 'kslx', 'kxrk', 'latter-day saints', 'lds', 'temple square', 'salt lake temple',
           'delta center', 'vivint', 'energysolutions', 'intermountain health', 'intermountain', 'zions bank', 'delta air lines', 'utah transit authority',
           'trax', 'sundance film festival', 'sundance', 'crucialfest', 'dark arts festival', 'pioneer day', 'pioneer day parade', 'hill air force base',
           'hill afb', 'utah jazz arena', 'wasatch front', 'great salt lake', 'olympic', 'olympics', 'powder mountain', 'snowbird', 'alta', 'solitude', 'brighton',
           'gateway mall', 'the depot', 'kilby court', 'club sound', 'bar deluxe', 'the urban lounge',
           'rice-eccles stadium', 'rice-eccles', 'utah state fair', 'days of 47', 'deseret news marathon', 'sltrib', 'daily utah chronicle', 'buzz blog', 'krcl',
           'fox13', 'visit salt lake', 'visit utah', 'utah pride festival', 'kilby block party', 'punk rock flea market', 'punk rock halloween', 'big 12',
           'good neighbor guide', 'salt lake county health department', 'utah department of transportation', 'utah department of alcoholic beverage services'],
  /* "The valley", "the canyon road", "the university", "the train": no real institutions in game text. */
  blocklist: ['kilby court*', 'urban lounge*', 'salt lake tribune*', 'deseret*', 'crucialfest*', 'utah jazz*', 'real salt lake*', 'zions*'],

  blurb: ['A mountain capital with a deep punk history and an all-ages tradition older than most cities have. Half the room does not drink, so shows are sober and loud.',
          'A garden-court room, a punk bar with a 21+ corner and a merch shop that does all-ages bills carry it, with houses and warehouses by word of mouth behind them.'],
  hard: 'Rooms close on rent and zoning, and snow can shut the mountain road.',
  region: 'the Mountain West',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Las Vegas', state: 'NV', lat: 36.17, lon: -115.14 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Salt Lake City' },
    { id: 'murray', kind: 'FEEDER', name: 'Murray', minutes: 15, bearing: 170, note: 'An inner suburb. Kids come up on the train.' },
    { id: 'west-valley', kind: 'FEEDER', name: 'West Valley City', minutes: 20, bearing: 235, note: 'A big working-class suburb with garages and crews.' },
    { id: 'bountiful', kind: 'FEEDER', name: 'Bountiful', minutes: 20, bearing: 350, note: 'A northern suburb with a history of an all-ages room.' },
    { id: 'sandy', kind: 'FEEDER', name: 'Sandy', minutes: 25, bearing: 165, note: 'A large suburb at the south end of the valley.' },
    { id: 'draper', kind: 'FEEDER', name: 'Draper', minutes: 30, bearing: 170, note: 'A south-valley suburb of teenagers.' },
    { id: 'ogden', kind: 'FEEDER', name: 'Ogden', minutes: 40, bearing: 5, note: 'Its own scene, with halls and one DIY room that moved up from the city.' },
    { id: 'park-city', kind: 'FEEDER', name: 'Park City', minutes: 40, bearing: 100, beyond: 'canyon-roads', note: 'A mountain town over the pass. Occasional shows.' },
    { id: 'provo', kind: 'PEER', name: 'Provo and Orem', minutes: 50, bearing: 170, slug: 'provo-ut', note: 'A student scene where rooms close and reopen.' },
    { id: 'logan', kind: 'PEER', name: 'Logan', minutes: 90, bearing: 5, note: 'A college town rebuilding after a venue closure.' },
    { id: 'boise', kind: 'PEER', name: 'Boise', state: 'ID', minutes: 150, bearing: 320, slug: 'boise-id', note: 'A comparable scene across the desert.' }
  ],

  chokepoints: [{ id: 'canyon-roads', name: 'the canyon road', p: .03 }],

  hoods: [
    { id: 'downtown', name: 'downtown and the train hub', route: 'downtown', note: 'Bars, big clubs and the transit stop. The touring-band center.' },
    { id: 'sugar-house', name: 'Sugar House', route: 'old-side', note: 'A hip shopping district with cheap older houses. Band houses and record stores.' },
    { id: 'avenues', name: 'the Avenues', route: 'old-side', note: 'Hilly Victorian rentals with little noise tolerance. Small bands.' },
    { id: 'ninth-ninth', name: '9th and 9th', route: 'old-side', note: 'Mixed rentals near bars and small stages.' },
    { id: 'granary', name: 'the Granary District', route: 'work-side', note: 'Industrial blocks of warehouses turned arts spaces. Rehearsal rooms and larger DIY spaces.' },
    { id: 'west-side', name: 'Glendale and Rose Park', route: 'work-side', note: 'Working-class west-side streets with a big Latino population. Garages and backyards.' },
    { id: 'south-salt-lake', name: 'Millcreek and South Salt Lake', route: 'work-side', note: 'Strip malls, cheap warehouses and some rehearsal rooms.' },
    { id: 'foothill', name: 'the University and Foothill', route: 'campus', note: 'Student housing on the east bench.' }
  ],

  contacts: ['provo-ut', 'ogden-ut', 'boise-id', 'denver'],

  rooms: [
    { id: 'rose-park-house', kind: 'HOUSE', hood: 'west-side', cap: 40, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [70, 60, 45],
      pressure: 50, start: true, note: 'A basement under a west-side house, word of mouth only. The neighbors know, and the noise line is one call away.' },
    { id: 'avenues-parlor', kind: 'HOUSE', hood: 'avenues', cap: 30, hostCut: 0, pa: .3, curfew: 1290, ac: false, outdoor: false, sketch: 15, standing: [65, 60, 50],
      pressure: 55, note: 'A Victorian rental on a hill. Small acoustic nights, and a landlord who has no patience for noise.' },
    { id: 'granary-unit', kind: 'DIY', hood: 'granary', cap: 100, rent: 70, deposit: 0, pa: .6, curfew: 1380, ac: false, sketch: 50, standing: [55, 60, 40],
      pressure: 60, needs: ['VOUCH'], note: 'A practice-room complex with a shop area. Out-of-town bands land here, and four shows in a week brought the police once.' },
    { id: 'downtown-shop', kind: 'SHOP', hood: 'downtown', cap: 60, pa: .4, curfew: 1350, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'A record shop with a small brick room underneath. All ages, thin margins, and the price stays low on purpose.' },
    { id: 'print-shop', kind: 'SHOP', hood: 'sugar-house', cap: 70, pa: .5, curfew: 1350, ac: true, sketch: 10, standing: [65, 65, 75], following: .3,
      note: 'A punk merch shop in a former print shop. It books local bills and keeps them all ages, because so many rooms are 21 and over.' },
    { id: 'south-hall', kind: 'HALL', hood: 'south-salt-lake', cap: 150, rent: 150, deposit: 75, pa: .5, curfew: 1320, ac: true, sketch: 10, standing: [60, 60, 60],
      owner: 'HALL_MANAGER', pressure: 45, note: 'A rentable hall off the strip malls. A flat fee, a no-alcohol promise and out by ten.' },
    { id: 'garden-court', kind: 'CLUB', hood: 'granary', cap: 200, houseCosts: 120, split: .8, pa: .8, ages: ['ALL'], curfew: 1380, ac: false, outdoor: true, following: .6, sketch: 15,
      standing: [50, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], pressure: 50, note: 'The long-running dry all-ages court, half open to the sky. It just changed hands, and the new owners say it is staying.' },
    { id: 'downtown-bar', kind: 'BAR', hood: 'downtown', cap: 250, soundFee: 60, pa: .7, ages: ['A21'], curfew: 1500, ac: true, following: .4, sketch: 20,
      standing: [45, 65, 75], note: 'A punk-art bar with a small stage. The liquor licence makes it 21 and over, so most of the kids stay out.' },
    { id: 'ninth-bar', kind: 'BAR', hood: 'ninth-ninth', cap: 250, soundFee: 60, pa: .7, ages: ['A21'], curfew: 1500, ac: true, following: .4, sketch: 15,
      standing: [45, 65, 75], note: 'A small-club bar that books punk and metal. Good sound, a drinking crowd and a bouncer at the door.' },
    { id: 'volunteer-hall', kind: 'DIY', hood: 'granary', cap: 150, rent: 80, deposit: 0, pa: .6, curfew: 1410, ac: false, ages: ['A18'], sketch: 30, standing: [60, 65, 55],
      pressure: 45, note: 'A volunteer-run nonprofit all-ages hall. It hosts the town\'s own DIY weekend, and the money is always thin.' },
    { id: 'arts-hall', kind: 'HALL', hood: 'downtown', cap: 200, rent: 220, deposit: 100, pa: .7, curfew: 1380, ac: true, sketch: 10, standing: [55, 65, 65],
      owner: 'HALL_MANAGER', pressure: 55, note: 'An all-ages arts and music room that has fallen behind on rent and asked the community for help.' },
    { id: 'tour-theater', kind: 'BIG', hood: 'downtown', cap: 1000, rent: 1800, deposit: 500, pa: .95, curfew: 1380, ac: true, sketch: 5, standing: [40, 70, 65],
      owner: 'TALENT_BUYER', notice: 84, needs: ['FULL_BILL'], note: 'A mid-size theater where the tours play. Out of reach until you have sold a lot of tickets.' },
    { id: 'park-pavilion', kind: 'OUTDOOR', hood: 'ninth-ninth', cap: 80, rent: 15, pa: .4, curfew: 1230, sketch: 30, standing: [60, 55, 45],
      note: 'A park pavilion on a mild summer night. The noise code binds at nine and the permit is a form.' }
  ],

  calendar: [
    { id: 'state-holiday', label: 'the July 24th parade weekend', tag: 'parade', month: 7, week: 4, dows: [4, 5, 6], can: [.80, .75, .75], hoods: ['downtown'], elsewhere: [.95, .92, .92] },
    { id: 'pride-weekend', label: 'the pride weekend', tag: 'festival', month: 6, week: 1, dows: [5, 6], can: [.88, .85, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'arts-fest', label: 'the downtown arts festival', tag: 'festival', month: 6, week: 3, dows: [3, 4, 5, 6], can: [.88, .85, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.85, .95, .95], hoods: ['foothill'], elsewhere: [.95, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.85, .95, .95], hoods: ['foothill'], elsewhere: [.95, 1, 1] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 5], dows: [5], can: [.85, .95, .95], hoods: ['foothill'], elsewhere: [.95, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1260 },

  points: [
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99, pop: 3000000 },
    { name: 'Las Vegas', state: 'NV', lat: 36.17, lon: -115.14, pop: 2400000 },
    { name: 'Boise', state: 'ID', lat: 43.62, lon: -116.20, pop: 750000 },
    { name: 'Wendover', state: 'NV', lat: 40.74, lon: -114.04, pop: 4500 }
  ],
  roads: ['I-15', 'I-80', 'I-215', 'State Street', 'Redwood Road'],

  words: {
    street: ['State Street', '700 East', '2100 South', '400 South', 'Redwood Road'],
    water: ['the lake', 'the Jordan River', 'Emigration Creek'],
    hood: ['Sugar House', 'the Avenues', 'Granary District', 'Rose Park', 'Glendale', 'Marmalade', 'Liberty Wells', 'Millcreek'],
    thing: ['inversion', 'canyon', 'sunday', 'cream soda', 'snow tires', 'smog day'],
    weather: ['inversion', 'lake-effect snow', 'canyon closure']
  },

  events: [
    { id: 'SALT_LAKE_CITY_PASS_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true, months: [11, 12, 1, 2, 3] },
      telegraph: 'A storm is stacking up on the peaks, and the canyon road is on the closure list.',
      title: 'The canyon road is shut',
      body: 'Avalanche crews closed the canyon road at noon. The band from the mountain town and the kids from over the pass are on the wrong side of it.',
      options: [
        { id: 'EARLY', label: 'Move the show earlier so the early cars get through', likely: 'Some get down before the gates. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .6, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors an hour early. The ones who made it down did so on chains.' },
        { id: 'ACCEPT', label: 'Run it without them', likely: 'Lose everyone over the pass.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .2, beyond: true }],
          result: 'The road stayed shut all night. The mountain side watched a phone video.' },
        { id: 'RIDES', label: 'Send a van the long way around', likely: 'Three hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .85, beyond: true }, { op: 'HOURS', d: -3, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'The van came in late with six kids and a drum kit. They will remember that.' }
      ] },

    { id: 'SALT_LAKE_CITY_INVERSION', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], weather: 'COLD', months: [12, 1, 2] },
      telegraph: 'The inversion has been sitting on the valley for six days.',
      title: 'The inversion has everyone indoors',
      body: 'The air is brown and the warnings say to stay inside. Half the kids are coughing, and a few parents have said no to the drive.',
      options: [
        { id: 'GO', label: 'Run it anyway and hand out masks at the door', likely: 'Costs thirty dollars. Most of the crowd comes.',
          effects: [{ op: 'MONEY', amount: -30 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'REGULARS', pct: .01 }],
          result: 'A box of masks at the door. The room was sealed and loud and hazy.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'The parents keep a lot of the kids home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The kids with parents stayed in. The rest came in coughing.' }
      ] },

    { id: 'SALT_LAKE_CITY_PARADE_NIGHT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'The holiday parade is Saturday, and the police have already put out the street closures.',
      title: 'The parade closes downtown',
      body: 'The streets around the room are shut, and the sidewalks are full of families until the fireworks. The kids are coming by transit, and the bar rooms are empty.',
      options: [
        { id: 'LATE', label: 'Push doors back until the streets reopen', likely: 'A later night, but the transit crowd makes it.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. The kids came in off the train with flags still in their pockets.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The roads cut off the drivers.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The ones on foot got there. The ones in cars sat behind a barricade.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'SALT_LAKE_CITY_NOISE_CALL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 2] },
      telegraph: 'The neighbor on the hill has already asked twice what time it ends.',
      title: 'The noise line rings at nine',
      body: 'The show is in a Victorian rental on a hill. A neighbor called the noise line right at nine, and the officer is on the porch with a flashlight.',
      options: [
        { id: 'EARLY', label: 'Cut the bill and start earlier', likely: 'A short, tight night. Everyone is out before the officer comes back.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors early and the last band stopped at nine sharp. The officer nodded and left.' },
        { id: 'HALL', label: 'Move the whole bill to a rented hall', likely: 'Costs forty dollars and the room is bigger and drier.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }],
          result: 'A hall took the bill with an hour to spare. Nobody on the hill heard a thing.' },
        { id: 'ACCEPT', label: 'Run it and take the warning', likely: 'The next call is a ticket.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'REGULARS', pct: -.01 }],
          result: 'You finished the set and took the warning. The host is not sure about next time.' }
      ] }
  ]
});
