SB.Cities.register('oakland', {
  v: 1,
  slug: 'oakland',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['uc berkeley', 'cal state east bay', 'laney', 'merritt college', 'mills college', 'holy names', 'stanford', 'cal football',
           'memorial stadium', 'the big game', 'kalx', 'kpfa', 'east bay express', 'the oaklandside', 'oaklandside', 'berkeleyside', 'ac transit',
           'port of oakland', 'abc', 'alcoholic beverage control', 'oakland roots', 'the roots', 'the a\'s', 'raiders', 'warriors', 'the dubs',
           'ballers', 'coliseum', 'outside lands', 'oakland pride', 'black joy parade', 'first fridays', 'art murmur', 'lake merritt band',
           'ghost ship', 'travis air force base', 'mare island', 'alameda point', 'gallo', 'amtrak', 'vfw', 'american legion', 'odd fellows',
           'masonic', 'the estuary annex', 'mandela parkway hall', 'the cannery loft', 'peralta street garage', 'fog belt social',
           'the flatlands room', 'telegraph back unit', 'hegenberger hall', 'basin street basement', 'the eucalyptus room', 'seminary avenue rec',
           'the fruitvale rec room', 'foothill boulevard storefront', 'the sideshow annex', 'pullman hall'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The 2016 fire is 'the 2016 warehouse fire' in game text. */
  blocklist: ['ghost ship*', 'east bay express*', 'outside lands*', 'first fridays*', 'oakland roots*', 'kalx*', 'kpfa*', 'berkeleyside*'],

  blurb: ['Warehouse rooms and backyard shows run on volunteers, donation jars and borrowed time, and the dry all-ages tradition runs deep.',
          'Crust, hardcore and garage share bills with art-scene noise, and the rent keeps pushing rooms out to the edges of the East Bay.'],
  hard: 'Rents are high and rooms close fast; keeping one is the real booking.',
  region: 'the West Coast',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 }
  ],

  tilt: [
    { fan: 'crust', band: 'hardcore', d: .10, reason: 'Crust, d-beat and political hardcore took over the flatlands and never left.' },
    { fan: 'hardcore', band: 'crust', d: .10, reason: 'Crust, d-beat and political hardcore took over the flatlands and never left.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Oakland' },
    { id: 'richmond', kind: 'FEEDER', name: 'Richmond, San Pablo and Pinole', minutes: 25, bearing: 340, note: 'Refinery and bedroom towns up I-80, cheap, with new all-ages rooms of their own. Kids ride the train or drive.' },
    { id: 'marin', kind: 'FEEDER', name: 'San Rafael and Marin', minutes: 40, bearing: 320, beyond: 'bridges', note: 'Rich suburbs with a lot of teen bands.' },
    { id: 'vallejo', kind: 'FEEDER', name: 'Vallejo', minutes: 40, bearing: 15, beyond: 'bridges', lean: ['hardcore', 'metal'], bands: 2,
      note: 'A working-class shipyard town with little for teens and a small punk and metal scene.' },
    { id: 'antioch', kind: 'FEEDER', name: 'Antioch and Pittsburg', minutes: 40, bearing: 55, note: 'Delta commuter suburbs with long ties to the East Bay scene.' },
    { id: 'livermore', kind: 'FEEDER', name: 'Livermore', minutes: 40, bearing: 100, note: 'Wine country and a national lab; hot summers and teenagers with cars.' },
    { id: 'fairfield', kind: 'FEEDER', name: 'Fairfield and Vacaville', minutes: 55, bearing: 25, note: 'Air-base and prison suburbs on I-80. Kids drive in for shows.' },
    { id: 'napa', kind: 'FEEDER', name: 'Napa', minutes: 55, bearing: 355, note: 'Tourist wine country, quiet, with a scattering of bands.' },
    { id: 'tracy', kind: 'FEEDER', name: 'Tracy', minutes: 50, bearing: 100, note: 'A commuter town on the Central Valley edge, ringed by logistics warehouses.' },
    { id: 'davis', kind: 'FEEDER', name: 'Davis', minutes: 60, bearing: 35, lean: ['indie'], bands: 3, note: 'A college town with bikes, house shows and a student crowd.' },
    { id: 'petaluma', kind: 'FEEDER', name: 'Petaluma', minutes: 60, bearing: 330, beyond: 'bridges', note: 'A dairy and brewing bedroom town with teen bands.' },
    { id: 'santa-cruz', kind: 'PEER', name: 'Santa Cruz', minutes: 80, bearing: 170, slug: 'santa-cruz-ca', beyond: 'highway-17', note: 'A beach and college scene across a notorious mountain road.' },
    { id: 'stockton', kind: 'PEER', name: 'Stockton', minutes: 75, bearing: 85, slug: 'stockton-ca', note: 'A Delta port with a strong local scene and its own history.' },
    { id: 'santa-rosa', kind: 'PEER', name: 'Santa Rosa', minutes: 75, bearing: 340, slug: 'santa-rosa-ca', note: 'The biggest North Bay city, with an old punk and metal history.' },
    { id: 'sacramento', kind: 'PEER', name: 'Sacramento', slug: 'sacramento', minutes: 75, bearing: 50, scene: 3000, note: 'A smaller neighbor up I-80 that touring bands often add.' }
  ],

  chokepoints: [
    { id: 'bridges', name: 'the Bay and Carquinez bridges', p: .03 },
    { id: 'highway-17', name: 'Highway 17', p: .01 }
  ],

  hoods: [
    { id: 'west-oakland', name: 'West Oakland', route: 'work-side', note: 'Victorians, rail yards and warehouses under the port cranes; the best place for a loud room with no neighbors, and surveilled since 2016.' },
    { id: 'uptown', name: 'Downtown and Uptown', route: 'downtown', note: 'Bars, storefront galleries and theater lofts along Telegraph and Broadway; the most bookable core, with rising rents.' },
    { id: 'temescal', name: 'Temescal', route: 'old-side', note: 'Bungalows with backyards and detached garages; priced up, but it still produces house shows.' },
    { id: 'fruitvale', name: 'Fruitvale and Dimond', route: 'old-side', note: 'A mostly Latino district of taquerias and bungalows; houses, backyards and community halls, cheaper than the north.' },
    { id: 'east-oakland', name: 'East Oakland', route: 'work-side', note: 'Wide flat blocks of stucco bungalows and auto shops; shows here are neighborhood-driven and rarely written about.' },
    { id: 'jack-london', name: 'Jack London', route: 'downtown', note: 'Waterfront warehouses turned lofts; the DIY rooms are gone or legal now.' },
    { id: 'lake', name: 'Lake Merritt', route: 'old-side', note: 'Victorians and apartments ringing a big park; nice, expensive and not a loud-music area.' },
    { id: 'berkeley-edge', name: 'Emeryville and West Berkeley', route: 'campus', note: 'An old brickyard and warehouse strip along the line, home to a long-running volunteer all-ages club.' },
    { id: 'alameda', name: 'Alameda', route: 'campus', note: 'An island of bungalows and old naval hangars; suburban and quiet.' },
    { id: 'hayward', name: 'Hayward and San Leandro', route: 'work-side', note: 'Industrial edges, rehearsal buildings and a state college campus; newer rooms are opening here.' }
  ],

  rooms: [
    { id: 'temescal-garage', kind: 'HOUSE', hood: 'temescal', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 20, standing: [70, 60, 45], pressure: 50, start: true,
      note: 'A detached garage at the back of a bungalow lot. Door open, string lights, and a ten o\'clock tolerance from the neighbors.' },
    { id: 'fruitvale-yard', kind: 'OUTDOOR', hood: 'fruitvale', cap: 70, rent: 10, pa: .4, curfew: 1320, sketch: 25, standing: [60, 55, 40],
      note: 'A backyard in the flats. Fog turns a July evening cold, and a generator is the only safe bet if the power goes out.' },
    { id: 'east-garage', kind: 'HOUSE', hood: 'east-oakland', cap: 60, hostCut: 0, pa: .4, curfew: 1380, outdoor: false, sketch: 20, standing: [65, 55, 45], pressure: 40,
      note: 'A garage in East Oakland. Nobody complains much, and nobody writes about it either.' },
    { id: 'west-warehouse', kind: 'DIY', hood: 'west-oakland', cap: 160, rent: 100, deposit: 0, pa: .6, curfew: 1500, ac: false, outdoor: false, sketch: 45, standing: [55, 60, 45], pressure: 60,
      needs: ['VOUCH'], note: 'A rented industrial shell partitioned into living pods, with a main floor for shows. The most exposed kind of room since 2016.' },
    { id: 'west-yard', kind: 'DIY', hood: 'west-oakland', cap: 100, rent: 60, deposit: 0, pa: .5, curfew: 1440, ac: false, sketch: 40, standing: [55, 60, 45], pressure: 55,
      needs: ['VOUCH'], note: 'A fenced industrial yard with a shed stage. Generator shows, and a landlord who has had an offer.' },
    { id: 'berkeley-collective', kind: 'DIY', hood: 'berkeley-edge', cap: 250, rent: 40, deposit: 0, pa: .7, curfew: 1380, ac: false, ages: ['ALL'], sketch: 10, standing: [65, 65, 60], pressure: 35,
      needs: ['VOUCH'], note: 'A volunteer-run, alcohol-free all-ages club with a membership model. Never serves a drink and never lets a show run late.' },
    { id: 'fruitvale-hall', kind: 'HALL', hood: 'fruitvale', cap: 140, rent: 150, deposit: 75, pa: .5, curfew: 1380, ac: true, sketch: 10, standing: [55, 60, 65], owner: 'HALL_MANAGER',
      note: 'A rented community hall. Cheap, strict on alcohol and strict on the end time.' },
    { id: 'hayward-rehearsal', kind: 'DIY', hood: 'hayward', cap: 80, rent: 60, deposit: 0, pa: .5, curfew: 1440, ac: false, sketch: 35, standing: [55, 55, 45], pressure: 50,
      note: 'A rehearsal building where a party in one room is the usual show.' },
    { id: 'records', kind: 'SHOP', hood: 'temescal', cap: 40, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'A record shop with a seven o\'clock bill and a donation jar.' },
    { id: 'uptown-bar', kind: 'BAR', hood: 'uptown', cap: 150, soundFee: 60, pa: .7, ages: ['ALL', 'A21'], matinee: true, curfew: 1560, ac: true, following: .3, sketch: 15,
      standing: [45, 65, 70], note: 'A bar on Telegraph with a back room. 18+ nights with a wristband.' },
    { id: 'uptown-club', kind: 'CLUB', hood: 'uptown', cap: 300, houseCosts: 180, split: .8, pa: .9, ages: ['A21', 'A18'], curfew: 1560, ac: true, following: .6, sketch: 10,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A legal club with a real PA. Wants six weeks and a name.' }
  ],

  contacts: ['santa-cruz-ca', 'stockton-ca', 'santa-rosa-ca', 'vallejo-ca'],

  weather: { preset: 'CALIFORNIA' },

  calendar: [
    { id: 'gallery-walk', label: 'the monthly gallery walk', tag: 'festival', month: 1, dows: [4], can: [1.05, 1.0, .95], hoods: ['uptown'], elsewhere: [1, 1, 1] },
    { id: 'big-game', label: 'the rivalry football game', tag: 'game', month: 11, week: 4, dows: [5], can: [.92, .95, .97], hoods: ['berkeley-edge'], elsewhere: [1, 1, 1] },
    { id: 'summer-festival', label: 'the big city festival across the bridge', tag: 'festival', month: 8, week: 2, dows: [4, 5, 6], can: [.92, .92, .95] },
    { id: 'football-fri', label: 'high school football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.88, 1, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] },
    { id: 'new-years', label: 'New Year\'s Eve', tag: 'holiday', month: 12, week: 5, dows: [0, 1, 2, 3, 4, 5, 6], can: [.90, .92, .95] }
  ],

  rules: { quiet: 1320 },

  points: [
    { name: 'San Jose', state: 'CA', lat: 37.34, lon: -121.89, pop: 1950000 },
    { name: 'Fresno', state: 'CA', lat: 36.74, lon: -119.79, pop: 1000000 },
    { name: 'Reno', state: 'NV', lat: 39.53, lon: -119.81, pop: 490000 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33, pop: 4000000 }
  ],
  roads: ['I-80', 'I-580', 'I-880', 'I-980', 'CA-24', 'I-5'],

  words: {
    street: ['Telegraph Avenue', 'Broadway', 'International Boulevard', 'Foothill Boulevard', 'San Pablo Avenue', 'MacArthur Boulevard', 'East 14th Street', 'Mandela Parkway', 'Hegenberger Road', 'the Nimitz'],
    water: ['Lake Merritt', 'the Estuary', 'the Bay', 'San Leandro Bay'],
    hood: ['West Oakland', 'Temescal', 'Fruitvale', 'Dimond', 'Elmhurst', 'Jack London', 'Uptown', 'Emeryville', 'Alameda', 'San Antonio', 'Deep East'],
    thing: ['bungalow', 'burrito', 'taco truck', 'sideshow', 'scraper bike', 'flatlands', 'tallboy', 'boba', 'fog', 'donation jar', 'generator', 'sliding scale'],
    weather: ['fog', 'smoke day', 'wind'],
    surnames: ['Garcia', 'Nguyen', 'Washington', 'Reyes', 'Santos', 'Lee', 'Jackson', 'Ramos']
  },

  events: [
    { id: 'OAKLAND_POWER_SHUTOFF', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [9, 10, 11] },
      telegraph: 'The utility has warned of fire-risk power shutoffs in the hills.',
      title: 'The lights go out',
      body: 'A fire-risk power shutoff has gone out across the hills, and the room has no electricity. The only way the show happens is on a generator.',
      options: [
        { id: 'GENERATOR', label: 'Move it to a flatland yard with a generator', likely: 'Smaller, louder, and it works.',
          effects: [{ op: 'MONEY', amount: -30 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'A rented generator in a West Oakland yard kept the bill alive.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day once the power came back.' },
        { id: 'ACCEPT', label: 'Go acoustic and see who comes', likely: 'A small crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }],
          result: 'Only the ones who lived nearby found the dark room.' }
      ] },

    { id: 'OAKLAND_MAZE_BACKUP', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'A stalled lane and road crews have the bridge approaches backed up all week.',
      title: 'The Maze is a parking lot',
      body: 'A wreck at the freeway junction by the bridge toll plaza has traffic stopped for hours. The bands and the kids from across the water are stuck.',
      options: [
        { id: 'EARLIER', label: 'Move doors an hour earlier', likely: 'Most make it. A thin start.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors an hour early. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the water.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The backup never cleared. The ones from across the bridge stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads took the back way together. They\'ll remember that.' }
      ] },

    { id: 'OAKLAND_FOG_ROLLS_IN', when: 'NIGHT', tier: 'REAL', weight: 2, cooldown: 30, bind: ['show'],
      if: { daysOut: [0, 0], months: [6, 7, 8, 9] },
      telegraph: 'The fog bank is sitting out past the bridge.',
      title: 'The fog rolls in',
      body: 'At nine the fog comes over the hills and the backyard show goes from t-shirts to hoodies. People start drifting toward the car.',
      options: [
        { id: 'HEATERS', label: 'Pass around a heater and keep going', likely: 'Costs a little. The crowd mostly stays.',
          effects: [{ op: 'MONEY', amount: -20 }, { op: 'SHOW_MOD', key: 'headsMul', v: .92 }],
          result: 'A borrowed heater and a pile of blankets kept the yard warm enough.' },
        { id: 'INSIDE', label: 'Move the last sets into the garage', likely: 'Packed and loud.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'The garage held half the yard. The ones inside got the best of it.' }
      ] },

    { id: 'OAKLAND_LANDLORD_OFFER', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 6] },
      telegraph: 'A man in a good jacket has been photographing the warehouse.',
      title: 'The landlord got an offer',
      body: 'A developer made an offer on the building, and the landlord gave everyone sixty days. This could be the last show here.',
      options: [
        { id: 'LASTSHOW', label: 'Throw a fundraiser bill for the tenants', likely: 'A big crowd and a lot of work.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.15 }, { op: 'HOURS', d: -2, when: 'TODAY' }],
          result: 'The block-party bill packed the floor and raised a few hundred for the move.' },
        { id: 'MOVEIT', label: 'Move it to a garage in the flats', likely: 'Smaller, closer to the neighbors.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .5 }],
          result: 'A garage took the whole bill. It was packed to the street.' },
        { id: 'DROP', label: 'Push it a week and find another room', likely: 'Costs the date and the bands\' patience.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 7, respect: false }],
          result: 'You pushed the show a week and went hunting for a floor.' }
      ] }
  ]
});
