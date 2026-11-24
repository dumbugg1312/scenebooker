SB.Cities.register('columbia-mo', {
  v: 1,
  slug: 'columbia-mo',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of missouri', 'mizzou', 'faurot', 'columbia college', 'stephens college', 'true/false', 'roots n blues', 'whiteman air force base',
           'lincoln university', 'central methodist', 'westminster college', 'missouri state fair', 'party cove', 'magic city', 'sharp end',
           'loop 70 rec', 'limestone room', 'rangeline annex', 'spur line hall', 'gravel road barn', 'fourth floor walkup', 'post 311',
           'hinkson basement', 'katy siding', 'auction barn', 'providence pallet',
           'the maneater', 'kbia', 'columbia missourian', 'vox magazine', 'riverfront times', 'columbia police department', 'kopn', 'ktgr',
           'roots n blues n bbq festival', 'stephens lake park', 'memorial stadium', 'missouri theatre', 'show-me state games', 'anchor fest',
           'discover the district', 'columbia parks and recreation', 'whiteman afb', 'southeastern conference'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['mizzou*', 'university of missouri*', 'true/false*', 'roots n blues*', 'columbia college*', 'stephens college*'],

  blurb: ['A Missouri university town about halfway between St. Louis and Kansas City, where football weekends and downtown bars run the calendar.',
          'Anything else has to live in the art-gallery blocks and old rentals around campus.'],
  hard: 'Bars are the default room, students turn over, and downtown real estate keeps getting more valuable.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Kansas City', state: 'MO', lat: 39.1, lon: -94.58 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.2 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'metal', d: .08, reason: 'Metal and hardcore share the same underground room and the same benefit bills.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Columbia' },
    { id: 'ashland', kind: 'FEEDER', name: 'Ashland', minutes: 15, bearing: 190, note: 'A fast-growing commuter town; kids come in for shows.' },
    { id: 'centralia', kind: 'FEEDER', name: 'Centralia', minutes: 25, bearing: 10, scene: 60, note: 'A small factory town; a few vanloads.' },
    { id: 'jefferson-city', kind: 'FEEDER', name: 'Jefferson City', minutes: 30, bearing: 165, note: 'The state capital: straighter and bigger, with crowds that go both ways.', bands: 2 },
    { id: 'boonville', kind: 'FEEDER', name: 'Boonville', minutes: 30, bearing: 275, note: 'An old river town on the interstate.' },
    { id: 'moberly', kind: 'FEEDER', name: 'Moberly', minutes: 35, bearing: 345, note: 'A working-class rail town; kids come down for shows.' },
    { id: 'fulton', kind: 'FEEDER', name: 'Fulton', minutes: 40, bearing: 115, note: 'Two small colleges; some interest, no scene.' },
    { id: 'fayette', kind: 'FEEDER', name: 'Fayette', minutes: 40, bearing: 300, note: 'A tiny college seat west of town.' },
    { id: 'mexico', kind: 'FEEDER', name: 'Mexico', minutes: 50, bearing: 60, note: 'A courthouse-square town; kids arrive in carloads on a Friday.' },
    { id: 'sedalia', kind: 'FEEDER', name: 'Sedalia', minutes: 60, bearing: 245, note: 'A rail town with some local rock and country.' },
    { id: 'kirksville', kind: 'PEER', name: 'Kirksville', minutes: 80, bearing: 355, scene: 500, note: 'A smaller college-town scene up the highway; kids drive down for bigger shows.' },
    { id: 'rolla', kind: 'PEER', name: 'Rolla', minutes: 90, bearing: 165, scene: 600, note: 'An engineering college town with a stop on the interstate.' },
    { id: 'lawrence', kind: 'PEER', name: 'Lawrence', state: 'KS', minutes: 150, bearing: 280, slug: 'lawrence-ks', note: 'The nearest like-for-like college town with a known scene.' },
    { id: 'springfield', kind: 'PEER', name: 'Springfield', minutes: 165, bearing: 215, slug: 'springfield-mo', note: 'A bigger Ozarks city with a larger music infrastructure.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The Broadway bar district: student high-rises, old commercial blocks, loft rooms and stages. Licensed 21-plus shows.' },
    { id: 'north-village', name: 'the North Village arts district', route: 'downtown', note: 'Galleries, small theaters and bars just north. Art-opening-with-a-band nights.' },
    { id: 'campus-ring', name: 'the campus rental ring', route: 'campus', note: 'Older frame houses around campus rented to students, with basements and porches. House shows, and neighbors who call.' },
    { id: 'business-loop', name: 'the Business Loop', route: 'work-side', note: 'The old highway strip north of downtown: motels, pawn shops and cheap storefronts.' },
    { id: 'old-black-district', name: 'the old Black business district', route: 'old-side', note: 'A jazz-era district just north of Broadway; history to respect, not a cheap punk district.' },
    { id: 'south-side', name: 'south Columbia', route: 'campus', note: 'Newer subdivisions, chain restaurants and a bluff state park. Suburban teenagers.' },
    { id: 'east-side', name: 'Paris Road and the east side', route: 'work-side', note: 'Apartment complexes, warehouses and light industry. Unit practice spaces and few neighbors.' },
    { id: 'centralia-hood', name: 'Centralia', route: 'town:centralia', note: 'A small factory town up the highway with old fellowship halls that rent cheap to a sober crowd.' }
  ],

  rooms: [
    { id: 'campus-house', kind: 'HOUSE', hood: 'campus-ring', cap: 60, curfew: 1350, ac: false, outdoor: false, pressure: 55, start: true,
      note: 'A student-rented frame house with a basement and a porch. The lease holder takes the citation, and the crew turns over at graduation.' },
    { id: 'east-warehouse', kind: 'DIY', hood: 'east-side', cap: 120, curfew: 1440, ac: false, pressure: 60, needs: ['VOUCH'],
      note: 'A graffiti-covered warehouse with a stage and band rooms, run by a committee that splits the rent. The address goes by word of mouth and the police visit.' },
    { id: 'small-basement', kind: 'HOUSE', hood: 'campus-ring', cap: 40, ages: ['A18'], curfew: 1320, ac: false, outdoor: false, pressure: 60,
      note: 'A small basement show with a hand-written door list. Every neighbor with a phone can end it.' },
    { id: 'broadway-bar', kind: 'BAR', hood: 'downtown', cap: 150, ages: ['A21'], curfew: 1530, ac: true,
      note: 'A downtown bar with a corner that turns into a stage after dark. The band is the sideshow to the Broadway crowd.' },
    { id: 'old-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['ALL', 'A18', 'A21'], curfew: 1380, ac: true, needs: ['FULL_BILL'],
      note: 'An old downtown club that books local punk, hardcore and metal, mostly all ages. The money and the landlord are the threat.' },
    { id: 'arts-hall', kind: 'CLUB', hood: 'north-village', cap: 250, curfew: 1380, ac: true, needs: ['FULL_BILL'],
      note: 'A converted music hall near the galleries. Ticketed all-ages bills with a real door and sound, and a rent that wants a draw.' },
    { id: 'old-theater', kind: 'BIG', hood: 'downtown', cap: 1000, curfew: 1380, ac: true,
      note: 'A restored historic theater. Punk gets in only as an opener or a benefit, and with permission.' },
    { id: 'fellowship-hall', kind: 'HALL', hood: 'centralia-hood', cap: 100, curfew: 1320, ac: true,
      note: 'A small-town fellowship hall that rents cheap. A one-off hardcore matinee, if the crowd stays sober.' },
    { id: 'record-shop', kind: 'SHOP', hood: 'downtown', cap: 40, ac: true,
      note: 'The record shop downtown. An in-store set, and the way newcomers learn where the real shows are.' }
  ],

  contacts: ['lawrence-ks', 'springfield-mo', 'iowa-city-ia', 'champaign-il'],

  calendar: [
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 3], dows: [5], can: [.85, .90, .85], hoods: ['downtown', 'campus-ring'], elsewhere: [.95, .97, .97] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 2], dows: [4, 5], can: [.85, .90, .85], hoods: ['downtown', 'campus-ring'], elsewhere: [.95, .97, .97] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 4], dows: [5], can: [.85, .90, .85], hoods: ['downtown', 'campus-ring'], elsewhere: [.95, .97, .97] },
    { id: 'roots-fest', label: 'the late-summer roots festival', tag: 'festival', month: 9, weeks: [3, 4], dows: [4, 5, 6], can: [.90, .88, .88], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'film-fest', label: 'the documentary film festival', tag: 'festival', month: 3, week: 1, dows: [3, 4, 5, 6], can: [.80, .80, .85], hoods: ['downtown', 'north-village'], elsewhere: [.95, .95, .97] },
    { id: 'graduation', label: 'finals and graduation week', tag: 'graduation', month: 5, weeks: [1, 2], dows: [4, 5], can: [.70, .70, .75] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1440, inForce: false } },

  points: [
    { name: 'Kansas City', state: 'MO', lat: 39.1, lon: -94.58, pop: 510000 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.2, pop: 300000 },
    { name: 'Jefferson City', state: 'MO', lat: 38.58, lon: -92.17, pop: 43000 },
    { name: 'Rolla', state: 'MO', lat: 37.95, lon: -91.77, pop: 20000 },
    { name: 'Kirksville', state: 'MO', lat: 40.19, lon: -92.58, pop: 17500 }
  ],
  roads: ['I-70', 'US 63', 'US 54', 'Providence Road', 'Stadium Boulevard', 'Business Loop 70'],

  words: {
    street: ['Broadway', 'Providence Road', 'Stadium Boulevard', 'Rangeline', 'Paris Road', 'Business Loop 70'],
    water: ['the Missouri', 'Hinkson Creek', 'Perche Creek'],
    hood: ['North Village', 'East Campus', 'West Broadway', 'Grindstone', 'Rock Bridge', 'the Loop'],
    thing: ['limestone bluff', 'gravel road', 'grain bin', 'pallet', 'frame house', 'yard show', 'benefit bill', 'campus radio', 'torn-down room'],
    weather: ['humidity', 'ice storm']
  },

  events: [
    { id: 'COLUMBIA_MO_GAME_SATURDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'A home game is Saturday, and every bar downtown is already planning for it.',
      title: 'The town is stuffed',
      body: 'Downtown is jammed with alumni and the lots are full. The east-side warehouse is the one place the crowd isn\'t, but its address can\'t be posted anywhere.',
      options: [
        { id: 'WORD', label: 'Pass the address by word of mouth', likely: 'The regulars find it, and nobody new does.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'The people who knew where to ask came, and it was a tight, loud, unpublicized night.' },
        { id: 'LATE', label: 'Push doors back until the game crowd thins', likely: 'The night people show up, later than planned.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'You opened doors an hour late, and the people who wanted something else drifted in from the bars.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the game.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The casual crowd stayed downtown, and the regulars came.' }
      ] },

    { id: 'COLUMBIA_MO_ICE_STORM', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [12, 1, 2] },
      telegraph: 'Freezing rain is forecast for Friday, and the roads will be glass by dark.',
      title: 'Ice storm Friday',
      body: 'The roads are glazed and half the town has lost power. The bar is dark, so the bill is moving to a basement where the furnace and one overloaded extension cord are the whole plan.',
      options: [
        { id: 'BASEMENT', label: 'Move the bill to a basement within walking distance', likely: 'It\'s smaller and warmer, but you\'ll have to watch the extension cord.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'The bill squeezed into a basement, and the furnace held and the cord didn\'t melt.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and the bands trust you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could make it came.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'Only the people who can walk come.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }],
          result: 'A handful of walkers came to a cold room, and it made a good story afterward.' }
      ] }
  ]
});
