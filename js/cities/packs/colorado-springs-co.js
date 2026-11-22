SB.Cities.register('colorado-springs-co', {
  v: 1,
  slug: 'colorado-springs-co',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['air force academy', 'fort carson', 'peterson', 'schriever', 'cheyenne mountain complex', 'norad', 'colorado college', 'uccs', 'pikes peak state college',
           'colorado technical university', 'broadmoor', 'garden of the gods', 'pikes peak international hill climb', 'pikes peak ascent', 'hill climb',
           'labor day lift off', 'pridefest', 'galaxyfest', 'waldo canyon', 'black forest fire', 'focus on the family', 'colorado state university',
           'cheyenne cutoff', 'bijou annex', 'ute pass grange', 'garden level', 'hancock hall', 'monument creek rec room', 'platte avenue laundromat',
           'tejon tuxedo', 'fillmore fallout', 'red rock carport', 'peterson road pump house', 'old quarry room',
           'colorado springs gazette', 'the gazette', 'colorado springs independent', 'westword', 'krcc', 'colorado public radio', 'pikes peak library district', 'pikes peak library', 'ppld', "what's left fest", 'whats left fest', '71grind', '71 grind', 'territory days', 'hill climb fan fest', 'star spangled symphony', 'pikes peak center', 'festival of lights', 'festival of lights parade', 'springs magazine', 'visit cos', 'visitcos', '4th of july fireworks'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The two big fires are written only as 'the fires'. */
  blocklist: ['fort carson*', 'air force academy*', 'colorado college*', 'garden of the gods*', 'pikes peak international*', 'broadmoor*', 'uccs*'],

  blurb: ['Heavy bands and a record-store stage carry this sprawled military town. Rooms are few and tend to vanish fast.',
          'The pits are real, the crowd is thin, and Denver is an hour north. Fire marshals end more spaces than rent does.'],
  hard: 'Few rooms, thin crowds, and Denver siphons the draw.',
  region: 'the Front Range',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Albuquerque', state: 'NM', lat: 35.08, lon: -106.65 },
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'metal', d: .06, reason: 'Punk and metal share bills and festival lineups here.' },
    { fan: 'metal', band: 'hardcore', d: .06, reason: 'Punk and metal share bills and festival lineups here.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Colorado Springs' },
    { id: 'manitou', kind: 'FEEDER', scene: 50, name: 'Manitou Springs', minutes: 10, bearing: 285, note: 'A small artsy tourist town at the mouth of the pass, with Victorian houses and steep streets.',
      rooms: [
    { id: 'manitou-yard', kind: 'OUTDOOR', hood: 'manitou', cap: 80, curfew: 1200,
      note: 'A park or yard show at the mouth of the pass. Tourists, afternoon hail and the quiet hour.' }] },
    { id: 'fountain', kind: 'FEEDER', scene: 50, name: 'Fountain and Widefield', minutes: 15, bearing: 190, note: 'Army suburbs to the south; transient and young, with garages and driveways.',
      rooms: [
    { id: 'fountain-garage', kind: 'HOUSE', hood: 'fountain', cap: 35, curfew: 1260, pressure: 50,
      note: 'A driveway and a garage in an Army suburb. It lasts as long as the lease and the deployment cycle.' }] },
    { id: 'monument', kind: 'FEEDER', name: 'Monument and Palmer Lake', minutes: 25, bearing: 355, note: 'Affluent bedroom towns over the hill; the teens come down.' },
    { id: 'falcon', kind: 'FEEDER', name: 'Falcon and Peyton', minutes: 30, bearing: 75, note: 'Exurban and ranch country to the east.' },
    { id: 'woodland-park', kind: 'FEEDER', name: 'Woodland Park', minutes: 40, bearing: 290, note: 'A small mountain town; teens drive down the pass for shows.' },
    { id: 'castle-rock', kind: 'FEEDER', name: 'Castle Rock', minutes: 45, bearing: 5, note: 'A fast-growing suburb that looks to Denver more than to the Springs.' },
    { id: 'florissant', kind: 'FEEDER', name: 'Florissant and Divide', minutes: 50, bearing: 280, note: 'Mountain hamlets with a handful of kids.' },
    { id: 'canon-city', kind: 'FEEDER', name: 'Cañon City', minutes: 55, bearing: 230, note: 'A prison and canyon-tourism town with a modest scene.' },
    { id: 'cripple-creek', kind: 'FEEDER', name: 'Cripple Creek', minutes: 60, bearing: 255, note: 'A small casino town up in the mountains.' },
    { id: 'pueblo', kind: 'PEER', name: 'Pueblo', minutes: 45, bearing: 180, scene: 1000, note: 'A poorer steel city down the interstate that calls itself the real working town.' },
    { id: 'boulder', kind: 'PEER', name: 'Boulder', minutes: 100, bearing: 350, slug: 'boulder-co', note: 'A college town on the way up; it thinks the Springs is square.' },
    { id: 'fort-collins', kind: 'PEER', name: 'Fort Collins', minutes: 135, bearing: 0, slug: 'fort-collins-co', note: 'A college and brewery town with a DIY scene; bands trade, crowds do not.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'A flat grid east of the creek: bars, restaurants, old commercial buildings and a few small stages. Licensed shows.' },
    { id: 'old-colorado-city', name: 'Old Colorado City and the Westside', route: 'old-side', note: 'A historic strip of shops and bars toward the mountains, with working-class cottages behind it.' },
    { id: 'old-north-end', name: 'the Old North End', route: 'campus', note: 'Big old houses split into student and young-adult rentals, many with basements. House shows in principle.' },
    { id: 'southeast', name: 'the southeast side', route: 'work-side', note: 'Cheap, diverse, military-adjacent ranch houses and strip malls along Academy and Hancock. Garages.' },
    { id: 'ivywild', name: 'Ivywild and the near south side', route: 'old-side', note: 'Bungalows and repurposed old school and bakery buildings just south of downtown.' },
    { id: 'north-side', name: 'Briargate and the north side', route: 'campus', note: 'Newer subdivisions, big boxes and big churches. Enormous numbers of teenagers and few rooms; church youth rooms are the all-ages option.' },
    { id: 'fort-side', name: 'the south side by the post', route: 'work-side', note: 'Army families and transient renters along the interstate and Highway 85.' },
    { id: 'manitou', name: 'Manitou Springs', route: 'town:manitou', note: 'A small artsy tourist town at the mouth of the pass, with steep streets and Victorian houses.' },
    { id: 'fountain', name: 'Fountain and Widefield', route: 'town:fountain', note: 'Army suburbs to the south, young and transient, with garages and driveways.' }
  ],

  rooms: [
    { id: 'westside-garage', kind: 'HOUSE', hood: 'old-colorado-city', cap: 40, curfew: 1290, pressure: 55, start: true,
      note: 'A garage or basement run by one person, on the Westside. Neighbors and the noise code are what end it.' },
    { id: 'library-room', kind: 'DIY', hood: 'downtown', cap: 50, curfew: 1350, rent: 0, pressure: 60, ac: true,
      note: 'A volunteer storefront space that reopened inside a library building after the fire marshal shut its warehouse. Fifty people, one or two tired volunteers.' },
    { id: 'record-shop', kind: 'SHOP', hood: 'southeast', cap: 100, curfew: 1320, ac: true, following: .2,
      note: 'The record store on the east side with a real pit. It is one shop\'s goodwill and its landlord.' },
    { id: 'small-bar', kind: 'BAR', hood: 'downtown', cap: 120, curfew: 1530, ages: ['A21'],
      note: 'A small music bar with the pit close to the gear. A liquor license can go after one incident report.' },
    { id: 'roomy-bar', kind: 'BAR', hood: 'downtown', cap: 150, curfew: 1470, ages: ['A18', 'A21'],
      note: 'A roomier, airier music bar. More floor than crowd on a normal night.' },
    { id: 'all-ages-club', kind: 'CLUB', hood: 'downtown', cap: 250, curfew: 1410, ages: ['ALL'],
      note: 'An all-ages club whose booker also runs garage shows. Alcohol only for 21-plus, and thin weeknights.' },
    { id: 'promoter-hall', kind: 'CLUB', hood: 'downtown', cap: 450, curfew: 1410, ages: ['ALL'],
      note: 'The promoter hall for punk, metal and hardcore, mostly all ages. Denver, an hour north, pulls the same acts.' },
    { id: 'school-hall', kind: 'HALL', hood: 'ivywild', cap: 150, curfew: 1320, ac: true,
      note: 'A reconverted school building that rents for concerts. It is a family neighborhood, so ten o\'clock is the line.' },
    { id: 'theater', kind: 'BIG', hood: 'downtown', cap: 700, curfew: 1380, ages: ['ALL'],
      note: 'A theater-size room for the one big show. Hard to fill locally.' }
  ],

  contacts: ['denver', 'boulder-co', 'fort-collins-co', 'santa-fe-nm', 'albuquerque-nm'],

  calendar: [
    { id: 'western-fest', label: 'the Memorial Day weekend western festival', tag: 'festival', month: 5, weeks: [4, 5], dows: [5, 6, 0], can: [.88, .92, .92], hoods: ['old-colorado-city'], elsewhere: [1, 1, 1] },
    { id: 'mountain-race', label: 'the mountain race fan week', tag: 'race', month: 6, weeks: [3, 4], dows: [4, 5, 6], can: [.90, .92, .92], hoods: ['downtown'], elsewhere: [1, 1, .97] },
    { id: 'weekender', label: 'the punk-and-metal weekender', tag: 'festival', month: 9, weeks: [2, 3], dows: [4, 5, 6], can: [1.10, 1.08, 1.05], hoods: ['downtown', 'southeast'], elsewhere: [1, 1, 1] },
    { id: 'balloon-weekend', label: 'the balloon festival weekend', tag: 'festival', month: 9, week: 1, dows: [4, 5, 6, 0], can: [.92, .90, .90], hoods: ['southeast'], elsewhere: [1, .97, .97] },
    { id: 'lights-parade', label: 'the winter lights parade', tag: 'parade', month: 12, week: 1, dows: [5], can: [.88, .90, .92], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [2, 4], dows: [5], can: [.90, .97, .97] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 3], dows: [5], can: [.90, .97, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1320, weekend: 1320, inForce: false } },

  points: [
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99, pop: 715000 },
    { name: 'Pueblo', state: 'CO', lat: 38.25, lon: -104.61, pop: 112000 },
    { name: 'Albuquerque', state: 'NM', lat: 35.08, lon: -106.65, pop: 560000 },
    { name: 'Trinidad', state: 'CO', lat: 37.17, lon: -104.5, pop: 8000 },
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89, pop: 200000 }
  ],
  roads: ['I-25', 'US 24', 'Powers Boulevard', 'Academy Boulevard', 'Highway 83'],

  words: {
    street: ['Tejon', 'Nevada Avenue', 'Colorado Avenue', 'Academy Boulevard', 'Platte Avenue', 'Powers Boulevard', 'Cimarron'],
    water: ['Monument Creek', 'Fountain Creek', 'Ute Pass'],
    hood: ['Old Colorado City', 'Old North End', 'Ivywild', 'Briargate', 'Manitou Springs', 'Black Forest'],
    thing: ['church youth room', 'basement', 'hail dent', 'snow shovel', 'chain-up', 'ranch house', 'record store stage', 'warehouse space', 'pit', 'earplugs'],
    weather: ['hail', 'altitude', 'monument hill closure']
  },

  events: [
    { id: 'COLORADO_SPRINGS_CO_FIRE_MARSHAL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The fire marshal has been walking downtown storefronts this week, counting exits.',
      title: 'The fire marshal walks in',
      body: 'The marshal comes by the storefront space on a night it is holding more than its posted fifty. Forty-nine, or he closes it.',
      options: [
        { id: 'CAP', label: 'Cap the door and turn people away', likely: 'A smaller night, and some angry kids outside.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'You counted every head. The ones outside stood on the sidewalk and listened.' },
        { id: 'TRIM', label: 'Move the second band outside', likely: 'Cold, but the room breathes.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The second band played the sidewalk. The room never went over.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'COLORADO_SPRINGS_CO_HAIL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [5, 6, 7, 8, 9] },
      telegraph: 'The sky over the pass has gone green, and the afternoon forecast says hail.',
      title: 'Hail over the pass',
      body: 'Hail the size of marbles in the middle of a yard show. The set can go on. The van windows are the problem.',
      options: [
        { id: 'PORCH', label: 'Pull everyone under the porch and play on', likely: 'Cramped and loud.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .6 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Forty people under one roof and a band in the doorway. The hail drummed along.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' },
        { id: 'ACCEPT', label: 'Run it and eat the damage', likely: 'The crowd leaves to check their cars.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }, { op: 'MONEY', amount: -40 }],
          result: 'Half the crowd went to look at their windshields. The band paid for a window.' }
      ] },

    { id: 'COLORADO_SPRINGS_CO_HILL_CLOSURE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [12, 1, 2, 3] },
      telegraph: 'Snow is stacking up on the pass, and the highway north is already slow.',
      title: 'The highway north closes',
      body: 'A winter storm shuts the highway over the hill the night of your show. The touring band and the Denver-side kids are on the wrong side of it.',
      options: [
        { id: 'EARLIER', label: 'Move doors earlier so they can beat the closure', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors an hour early. The ones who left work early made it.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose everyone from the north.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The road never reopened. The ones from town came.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the band.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Nobody could drive anyway.' }
      ] }
  ]
});
