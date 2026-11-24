SB.Cities.register('clarksville-tn', {
  v: 1,
  slug: 'clarksville-tn',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['fort campbell', 'the 101st', '101st airborne', 'austin peay', 'apsu', 'trane', 'amazon', 'fedex', 'google', 'hankook', 'bridgestone', 'vfw',
           'dodea', 'nashville international', 'outlaw field', 'ringgold mill', 'l&n station', 'wilma rudolph', 'western kentucky university', 'wku',
           'mtsu', 'middle tennessee state', 'tennessee tech', 'corvette plant', 'a. o. smith', 'chitlin\' circuit', 'strawberry alley',
           'red river annex', 'hilldale hall', 'dunbar door', 'depot back room', 'ringgold loading dock', 'fort boulevard unit 9', 'redbud lodge',
           'highland rim skate and supply', 'palmyra road barn', 'quarter-mile carport', 'st. bethlehem grange', 'strawberry row basement', 'clarksville riverfest', 'riverfest', 'downtown at sundown', 'mic check monday', 'tour de ville', 'montgomery county fair', 'clarksville speedway', 'visit clarksville', 'clarksville now', 'clarksville online', 'ville magazine', 'deck the county', 'mudfest', 'bandsintown', 'reverbnation', 'nameless fest', 'tennessee alcoholic beverage commission'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Tornadoes are written only as 'the tornado'. */
  blocklist: ['fort campbell*', 'austin peay*', 'strawberry alley*', 'ringgold mill*', 'wilma rudolph*'],

  blurb: ['A base-town scene of a few bands and no home room, always half-watching Nashville down the interstate, with shows on bar stages, brewery patios and local-music days.',
          'Every few years a new batch of soldiers and students arrives, and the ones who play move on just as fast.'],
  hard: 'No all-ages room, and members keep rotating out to move orders and Nashville.',
  region: 'the Cumberland',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76 },
    { name: 'Memphis', state: 'TN', lat: 35.15, lon: -90.05 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Clarksville' },
    { id: 'oak-grove', kind: 'FEEDER', name: 'Oak Grove', state: 'KY', minutes: 15, bearing: 5, note: 'A young border town beside the post; its kids come to Clarksville for everything.' },
    { id: 'pleasant-view', kind: 'FEEDER', name: 'Pleasant View', minutes: 25, bearing: 150, note: 'A small bedroom community with no scene of its own.' },
    { id: 'hopkinsville', kind: 'FEEDER', name: 'Hopkinsville', state: 'KY', minutes: 30, bearing: 350, note: 'A farm and base town across the line with a few bands and strip rooms.', bands: 2 },
    { id: 'ashland-city', kind: 'FEEDER', name: 'Ashland City', minutes: 35, bearing: 140, note: 'A river and lake town; its kids split between Clarksville and Nashville.' },
    { id: 'springfield', kind: 'FEEDER', name: 'Springfield', minutes: 35, bearing: 95, note: 'A tobacco and commuter town on the Nashville edge.' },
    { id: 'dickson', kind: 'FEEDER', name: 'Dickson', minutes: 45, bearing: 190, note: 'A railroad town in the Nashville orbit with a small scene.', bands: 1 },
    { id: 'dover', kind: 'FEEDER', name: 'Dover', minutes: 45, bearing: 265, note: 'A rural county seat out by the lakes.' },
    { id: 'cadiz', kind: 'FEEDER', name: 'Cadiz', state: 'KY', minutes: 45, bearing: 310, note: 'A small lake-country seat across the line.' },
    { id: 'russellville', kind: 'FEEDER', name: 'Russellville', state: 'KY', minutes: 50, bearing: 40, note: 'A farm and factory town up US 79.' },
    { id: 'bowling-green', kind: 'PEER', name: 'Bowling Green', state: 'KY', minutes: 75, bearing: 55, scene: 1400, note: 'A college and factory town on the Nashville edge; the natural peer.' },
    { id: 'murfreesboro', kind: 'PEER', name: 'Murfreesboro', minutes: 80, bearing: 130, scene: 2200, note: 'A bigger college scene through Nashville; bands trade both ways.' },
    { id: 'paducah', kind: 'PEER', name: 'Paducah', state: 'KY', minutes: 90, bearing: 305, scene: 600, note: 'A river arts town and occasional tour stop.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'A rebuilt grid above the river bluff: restaurants, bars, a riverfront park and festivals. Brick storefronts that a landlord eyes.' },
    { id: 'campus-edge', name: 'the campus edge', route: 'campus', note: 'Aging rental houses around the university, with porches and a few basements. House shows and student events.' },
    { id: 'madison-street', name: 'North Clarksville and Madison Street', route: 'old-side', note: 'The older north side toward the Kentucky line: ranch houses, cheap rentals and trailer parks. Hit hard by the last tornado.' },
    { id: 'highway-strip', name: 'the Highway 41A strip', route: 'work-side', note: 'Four lanes of chain restaurants, pawn shops, vape shops and vacant strip units on the road to the post. Anonymous rooms.' },
    { id: 'east-side', name: 'Rossview and the east side', route: 'campus', note: 'New subdivisions and big boxes. Big garages, strict neighbors, and soldiers\' families.' },
    { id: 'st-bethlehem', name: 'St. Bethlehem and New Providence', route: 'work-side', note: 'Cheap riverside and interstate-corner streets with backyards, sheds and barns.' },
    { id: 'hilldale', name: 'Hilldale and Cumberland Heights', route: 'old-side', note: 'Older homeowners and church halls to the south. Quiet, and aging.' }
  ],

  rooms: [
    { id: 'campus-house', kind: 'HOUSE', hood: 'campus-edge', cap: 40, curfew: 1320, ac: false, outdoor: false, start: true, note: "A back room or porch of a rental by the university. Roommates turn over each semester and a neighbor's call ends it." },
    { id: 'barn-yard', kind: 'HOUSE', hood: 'st-bethlehem', cap: 60, curfew: 1350, ac: false, outdoor: true, note: 'A shed or barn-side backyard on a cheap edge street. Room to spread out, and the rain is the problem.' },
    { id: 'ranch-carport', kind: 'HOUSE', hood: 'madison-street', cap: 30, curfew: 1320, ac: false, outdoor: false, note: 'A carport and a living room in a cheap ranch rental, still patched from the tornado.' },
    { id: 'strip-unit', kind: 'DIY', hood: 'highway-strip', cap: 100, curfew: 1380, ac: false, needs: ['VOUCH'], note: 'A vacant strip unit rented under a quiet name. It lasts until the landlord or the next tenant finds out.' },
    { id: 'church-hall', kind: 'HALL', hood: 'hilldale', cap: 120, curfew: 1320, ac: true, note: 'A church hall rented by the night. Sober, and one complaint from a deacon ends it.' },
    { id: 'brick-shop', kind: 'SHOP', hood: 'downtown', cap: 40, curfew: 1260, ac: true, note: 'A brick storefront with the floor cleared after closing. The rent is the threat.' },
    { id: 'lawn-stage', kind: 'OUTDOOR', hood: 'downtown', cap: 300, curfew: 1260, note: 'A downtown lawn and a riverfront park with a free summer stage. Early and family-friendly, and a rain-out kills it.' },
    { id: 'vineyard-yard', kind: 'OUTDOOR', hood: 'east-side', cap: 150, curfew: 1320, note: 'A vineyard-style grounds with weekend music from May to October. Family crowds, cover sets and soft ceilings on the volume.' },
    { id: 'main-bar', kind: 'BAR', hood: 'downtown', cap: 120, ages: ['A21'], curfew: 1500, ac: true, note: 'A downtown bar with a weekend stage. They card at the door, and local bands share the night with covers.' },
    { id: 'food-stage', kind: 'BAR', hood: 'downtown', cap: 80, ages: ['ALL'], curfew: 1380, ac: true, note: 'A restaurant with a stage that does not card. Food comes first, and the band is background.' },
    { id: 'warehouse-club', kind: 'CLUB', hood: 'highway-strip', cap: 250, ages: ['A21'], curfew: 1500, ac: true, note: 'A big 21-plus warehouse room that has run metal nights. Far larger than the local crowd, and it may be inactive.' },
    { id: 'event-center', kind: 'BIG', hood: 'downtown', cap: 1500, curfew: 1380, ac: true, note: 'An event center that hosts the touring country and rock acts. Not a booking a new scene gets.' }
  ],

  contacts: ['nashville', 'louisville', 'evansville-in', 'chattanooga-tn', 'memphis'],

  calendar: [
    { id: 'river-festival', label: 'the river festival', tag: 'festival', month: 9, week: 2, dows: [4, 5], can: [.88, .85, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 8, week: 4, dows: [1, 2, 3, 4, 5], can: [.90, .88, .88] },
    { id: 'local-music-day', label: 'the local-music day', tag: 'festival', month: 7, week: 3, dows: [5], can: [1.05, 1.10, 1.05], hoods: ['downtown'], elsewhere: [.97, .97, .97] },
    { id: 'summer-concerts', label: 'the summer free concerts', tag: 'festival', month: 7, week: 2, dows: [3, 4], can: [.92, .90, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.88, .95, .95], hoods: ['campus-edge'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.88, .95, .95], hoods: ['campus-edge'], elsewhere: [1, 1, 1] },
    { id: 'christmas-parade', label: 'the Christmas parade', tag: 'parade', month: 12, week: 1, dows: [5], can: [.88, .90, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1380, weekend: 1380, inForce: true } },

  points: [
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78, pop: 690000 },
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76, pop: 630000 },
    { name: 'Memphis', state: 'TN', lat: 35.15, lon: -90.05, pop: 630000 },
    { name: 'Evansville', state: 'IN', lat: 37.97, lon: -87.57, pop: 117000 },
    { name: 'Murfreesboro', state: 'TN', lat: 35.85, lon: -86.39, pop: 153000 }
  ],
  roads: ['I-24', 'US 79', 'US 41A', 'SR 12', 'SR 76'],

  words: {
    street: ['Madison Street', 'Franklin Street', 'Public Square', 'College Street', 'Trenton Road', 'US 41A'],
    water: ['the Red River', 'the Cumberland', 'Dunbar Cave', 'Lake Barkley'],
    hood: ['Ringgold', 'Rossview', 'Sango', 'St. Bethlehem', 'New Providence', 'Hilldale', 'Cumberland Heights', 'Oak Grove'],
    thing: ['pawn shop', 'strip mall', 'dark-fired tobacco', 'cinder-block bathroom', 'storm cellar', 'pickup', 'brewery patio', 'bar stage', 'move order', 'warehouse room'],
    weather: ['tornado warning', 'river flood']
  },

  events: [
    { id: 'CLARKSVILLE_TN_TORNADO_WARNING', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [3, 4, 5], weather: 'RAIN' },
      telegraph: 'The weather service has the whole county under a tornado watch.',
      title: 'The tornado warning',
      body: 'A tornado warning sweeps through while the bands are loading in at the barn-side backyard in St. Bethlehem, and everyone is sheltering in the barn.',
      options: [
        { id: 'SHELTER', label: 'Wait it out in the barn and play after', likely: 'It means a late start, and the crowd that stays is loud.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The warning passed at nine, and you played late to a barn full of people who had nowhere to go.' },
        { id: 'HOUSE', label: 'Move the bill to a basement room', likely: 'It\'s smaller and safer.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A cellar took the bill, and it was packed and nobody minded.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and everybody loses some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could make it came.' }
      ] },

    { id: 'CLARKSVILLE_TN_TWO_STAGES', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The river festival and the local-music day land on the same weekend.',
      title: 'Two free stages downtown',
      body: 'There are two free stages downtown and your booked show is up against both of them, and nobody pays to get in when the music outside is free.',
      options: [
        { id: 'LATE', label: 'Push doors back until the stages go quiet', likely: 'It means a late start, and only the leftover crowd shows up.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors opened late, and the crowd drifted in from the free stages, loud and happy.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd stays on the lawn.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The lawn kept the casual crowd, and the regulars came.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'CLARKSVILLE_TN_MOVE_ORDERS', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 4], months: [4, 5, 6, 7, 8, 9, 10] },
      telegraph: "One of the bands has a drummer waiting on his unit's next orders.",
      title: 'Move orders',
      body: 'The drummer got orders the week before the downtown bar show, and the only fill-in is a 16-year-old who has to be out by the curfew.',
      options: [
        { id: 'FILL', label: 'Let the kid play and send him home on time', likely: 'The set is short and rough.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The kid played half a set and left before the curfew, and the band played the rest as a trio.' },
        { id: 'DROP', label: 'Drop the band from the bill', likely: 'It\'s a thinner bill.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The bill ran short without them, and the room was half full.' }
      ] }
  ]
});
