SB.Cities.register('cape-coral-fl', {
  v: 1,
  slug: 'cape-coral-fl',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['gulf american land corporation', 'gulf american', 'publix', 'walmart', 'florida gulf coast university', 'fgcu', 'florida southwestern state college',
           'fsw', 'hodges university', 'hurricane ian', 'hurricane charley', 'red sox', 'boston red sox', 'jetblue park', 'minnesota twins', 'macdill',
           'cape bike night', 'red white and boom', 'reindeer run', 'tour de cape', 'trunk or treat', 'songwriter fest', 'sounds of jazz and blues',
           'holiday boat-a-long', 'edison festival of light', 'swamp cabbage festival', 'cape coral yacht club', 'lee county sheriff', 'vfw', 'american legion', 'elks',
           'slab hall', 'seawall social hall', 'back unit 9', 'lot 14', 'redfish hall', 'the dock annex', 'unit c practice', 'mangrove music hall',
           'wink news', 'winknews', 'news-press', 'fort myers news-press', 'cape coral breeze', 'wgcu', 'fort myers beach talk', 'captiva sanibel', 'gulfshore life',
           'cape coral living', 'cape coral art festival', 'rotary club', 'burrowing owl festival', 'culture fest', 'concert in the park', 'holiday festival of lights',
           'festival of lights', 'eagle skate park', 'bill austen youth center', 'austen youth center', '239 fest', 'babefest', 'bimini basin', 'orlando weekly', 'substack'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The storms are written only as 'the storm' in game text. */
  blocklist: ['publix*', 'fgcu*', 'cape bike night*', 'red white and boom*', 'edison festival*', 'jetblue*', 'hurricane ian*'],

  blurb: ['A small canal-suburb scene that built its room in a pizza place. The canals are quiet, the amps are not.',
          "Everyone knows everyone, hardcore and emo share the bill, and the next room might be somebody's backyard."],
  hard: 'Few all-ages rooms, and the big fest is 21 and up.',
  region: 'the Gulf',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46 },
    { name: 'Miami', state: 'FL', lat: 25.76, lon: -80.19 },
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'emo', d: .06, reason: 'Hardcore and emo kids share the bill at the main room.' },
    { fan: 'emo', band: 'hardcore', d: .06, reason: 'Hardcore and emo kids share the bill at the main room.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Cape Coral' },
    { id: 'fort-myers', kind: 'FEEDER', name: 'Fort Myers', minutes: 25, bearing: 100, pop: 86395, scene: 500, note: 'Across the bridges: the old buildings, the arts district and the real stage for Cape kids.', beyond: 'river-bridges',
      rooms: [
    { id: 'fort-myers-club', kind: 'CLUB', hood: 'fort-myers', cap: 300, ages: ['A21'], curfew: 1500, ac: true, following: .5, standing: [45, 65, 65],
      note: 'A brewery turned rock room over the bridge. The real stage for Cape bands, if the traffic lets you through.' }] },
    { id: 'north-fort-myers', kind: 'FEEDER', name: 'North Fort Myers', minutes: 30, bearing: 60, scene: 80, note: 'A working-class strip of trailer and RV parks along the highway.',
      rooms: [
    { id: 'river-bar', kind: 'BAR', hood: 'north-river', cap: 100, ages: ['A21'], curfew: 1500, ac: true, sketch: 40, standing: [50, 60, 60],
      note: 'A bar along the highway north of the river. Cheap, rough and no bridge needed.' }] },
    { id: 'pine-island', kind: 'FEEDER', name: 'Matlacha and Pine Island', minutes: 30, bearing: 285, note: 'A fishing village and island at the end of one road. Few kids, little scene.', beyond: 'pine-island-road' },
    { id: 'punta-gorda', kind: 'FEEDER', name: 'Punta Gorda', minutes: 45, bearing: 340, pop: 19471, note: 'An older retiree canal city hit hard by two storms.' },
    { id: 'lehigh-acres', kind: 'FEEDER', name: 'Lehigh Acres', minutes: 50, bearing: 95, pop: 114287, note: 'A huge, poor bedroom suburb with no venues. Kids drive west to shows.' },
    { id: 'port-charlotte', kind: 'FEEDER', name: 'Port Charlotte', minutes: 50, bearing: 355, pop: 60625, note: 'Another planned canal suburb, older, with a young working-class minority.' },
    { id: 'bonita-springs', kind: 'FEEDER', name: 'Bonita Springs and Estero', minutes: 55, bearing: 145, note: 'Wealthy and old, with golf and beach tourism. The few kids come north.', beyond: 'river-bridges' },
    { id: 'labelle', kind: 'FEEDER', name: 'LaBelle', minutes: 70, bearing: 85, pop: 4966, note: 'A rural ranching county seat, a long drive east.' },
    { id: 'naples', kind: 'PEER', name: 'Naples', state: 'FL', minutes: 70, bearing: 150, slug: 'naples-fl', note: 'The wealthy edge of the region, down the interstate.' },
    { id: 'sarasota', kind: 'PEER', name: 'Sarasota', slug: 'sarasota-fl', state: 'FL', minutes: 105, bearing: 350, scene: 700, note: 'An arts town up the interstate that sees the Cape as retiree sprawl.' },
    { id: 'lakeland', kind: 'PEER', name: 'Lakeland', state: 'FL', minutes: 150, bearing: 15, slug: 'lakeland-fl', note: 'A mid-size inland city, a rare stop on a route north.' }
  ],

  chokepoints: [
    { id: 'river-bridges', name: 'the Cape Coral Bridge', p: .025 },
    { id: 'pine-island-road', name: 'Pine Island Road', p: .015 }
  ],

  hoods: [
    { id: 'southeast-cape', name: 'the Parkway end', route: 'downtown', note: 'The oldest canal houses, the bridge approach and the only thing like a downtown. Bars, back rooms and event lawns, with waterfront redevelopment pricing it up.' },
    { id: 'southwest-cape', name: 'the southwest Cape', route: 'old-side', note: 'Long residential grids of retirees, families and rentals. Garages and lanais, and the old houses are being torn down for bigger ones.' },
    { id: 'del-prado', name: 'the Del Prado corridor', route: 'work-side', note: 'Old strip plazas, chain restaurants and empty storefronts, and the most renters. Leased units and a church hall or two.' },
    { id: 'northeast-cape', name: 'the Pine Island Road belt', route: 'work-side', note: 'Warehouses, auto shops and industrial units, with small rented houses behind. Where a practice space would be; cheap and ignored for now.' },
    { id: 'northwest-cape', name: 'the northwest Cape', route: 'campus', note: 'New subdivisions with HOAs and big garages. Young families, no nightlife, farthest from anywhere.' },
    { id: 'fort-myers', name: 'Fort Myers across the bridge', route: 'town:fort-myers', note: 'The old downtown and the brewery rooms over the river, where Cape bands go to play the real stage. The bridge is the toll and the traffic.' },
    { id: 'north-river', name: 'the north river strip', route: 'town:north-fort-myers', note: 'The cheap strip along the highway north of the river: bars, posts and trailer parks, reachable without a bridge.' }
  ],

  rooms: [
    { id: 'sw-garage', kind: 'HOUSE', hood: 'southwest-cape', cap: 40, curfew: 1350, ac: false, outdoor: false, sketch: 25, pressure: 50, start: true,
      note: 'A slab-ranch garage with the door up and box fans going. No basements down here, and the neighbors on a canal block hear everything.' },
    { id: 'nw-garage', kind: 'HOUSE', hood: 'northwest-cape', cap: 60, curfew: 1320, ac: false, outdoor: false, sketch: 15, pressure: 55,
      note: 'A big garage in a new subdivision. Roomier, but young families, an HOA and a long drive from anywhere.' },
    { id: 'belt-unit', kind: 'DIY', hood: 'northeast-cape', cap: 80, curfew: 1380, ac: false, sketch: 40, pressure: 55, needs: ['VOUCH'],
      note: 'A shared practice unit in the industrial belt that throws a show now and then. The landlord and the fire marshal are the worry.' },
    { id: 'pizza-stage', kind: 'BAR', hood: 'southeast-cape', cap: 150, ages: ['A21'], curfew: 1500, ac: true, following: .4, standing: [55, 65, 70],
      note: 'A pizza place that opened its stage because nobody else would book local originals. Hardcore, emo and ska share the bill, 21 and up.' },
    { id: 'billiards-bar', kind: 'BAR', hood: 'southeast-cape', cap: 120, ages: ['A21'], curfew: 1500, ac: true, following: .3, standing: [50, 65, 70],
      note: 'A pool hall with a back stage for punk bills and the scene\'s own yearly fest. Storms and the rent set the calendar.' },
    { id: 'plaza-bar', kind: 'BAR', hood: 'del-prado', cap: 100, ages: ['A18'], curfew: 1470, ac: true, sketch: 30, standing: [50, 60, 60],
      note: 'A strip-plaza bar with a stage that can run an 18-plus night if the owner is willing. Cheap, and the owner changes.' },
    { id: 'park-lawn', kind: 'OUTDOOR', hood: 'southeast-cape', cap: 300, curfew: 1260, rent: 0, standing: [55, 55, 55],
      note: 'A city park lawn with a free evening series of mostly cover acts. A local band gets on by slot, and summer thunderstorms end it.' },
    { id: 'skate-park', kind: 'OUTDOOR', hood: 'southeast-cape', cap: 100, curfew: 1080, rent: 0, ac: false, standing: [60, 60, 55],
      note: 'The city skate park and youth center. It once ran a battle of the bands, with helmets, parental consent and city hours.' },
    { id: 'fellowship-hall', kind: 'HALL', hood: 'del-prado', cap: 120, rent: 120, pa: .5, curfew: 1320, ac: true, sketch: 5, owner: 'CHURCH_CONTACT',
      note: 'A fellowship room in a retiree-and-family suburb. Clean-cut, supervised and out by ten.' },
  ],

  contacts: ['naples-fl', 'sarasota-fl', 'lakeland-fl', 'tampa', { name: 'Fort Myers', state: 'FL', lat: 26.64, lon: -81.87 }],

  calendar: [
    { id: 'art-fest', label: 'the art festival', tag: 'festival', month: 1, week: 2, dows: [5, 6], can: [.90, .88, .85], hoods: ['southeast-cape'], elsewhere: [1, 1, 1] },
    { id: 'fourth-fireworks', label: 'the Fourth of July fireworks', tag: 'holiday', month: 7, week: 1, dows: [4, 5], can: [.92, .88, .85], hoods: ['southeast-cape'], elsewhere: [1, .97, .97] },
    { id: 'vets-parade', label: 'the veterans parade', tag: 'parade', month: 11, week: 2, dows: [5], can: [.92, .90, .90], hoods: ['southeast-cape'], elsewhere: [1, 1, 1] },
    { id: 'boat-parade', label: 'the boat parade', tag: 'parade', month: 12, week: 3, dows: [5], can: [.88, .85, .85], hoods: ['southeast-cape'], elsewhere: [1, .97, .97] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.88, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.88, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1380 },

  points: [
    { name: 'Fort Myers', state: 'FL', lat: 26.64, lon: -81.87, pop: 86000 },
    { name: 'Sarasota', state: 'FL', lat: 27.34, lon: -82.53, pop: 55000 },
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46, pop: 400000 },
    { name: 'Miami', state: 'FL', lat: 25.76, lon: -80.19, pop: 450000 },
    { name: 'Fort Lauderdale', state: 'FL', lat: 26.12, lon: -80.14, pop: 180000 }
  ],
  roads: ['I-75', 'US 41', 'SR 78', 'Cape Coral Parkway', 'Del Prado Boulevard', 'Alligator Alley'],

  words: {
    street: ['Cape Coral Parkway', 'Del Prado Boulevard', 'Pine Island Road', 'Burnt Store Road', 'Veterans Parkway'],
    water: ['the Caloosahatchee', 'the canals', 'Matlacha Pass', 'Redfish Point'],
    hood: ['the Cape', 'Southeast Cape', 'Southwest Cape', 'Northwest Cape', 'North Cape', 'Matlacha', 'Pine Island', 'Burnt Store'],
    thing: ['lanai', 'pool cage', 'canal lot', 'box fan', 'garage door', 'boat dock', 'slab', 'mangrove', 'pizza-place stage', 'free fest', 'parking-lot show', 'record store'],
    weather: ['afternoon thunderstorm', 'storm watch', 'red tide', 'mosquitoes']
  },

  events: [
    { id: 'CAPE_CORAL_FL_STORM_WATCH', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [6, 7, 8, 9, 10] },
      telegraph: 'A storm watch is up for the weekend, and the neighbors have started putting their shutters on.',
      title: 'The garage door can\'t stay up',
      body: 'The garage show depends on the door being up and the box fans running. With the wind coming and the power flickering, the door has to come down and the fans may not last.',
      options: [
        { id: 'MOVE', label: 'Move it a day, once the weather passes', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' },
        { id: 'SHUT', label: 'Pull the door down and run it hot and loud', likely: 'Sweaty and cramped. The crowd thins out.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The door stayed down and the fans quit twice. The ones who stayed were dripping and happy.' },
        { id: 'INDOORS', label: 'Move the whole bill to a friend\'s house on higher ground', likely: 'Smaller, with neighbors on every side.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A living room on the high side of the canal took the bill, and the floor was packed.' }
      ] },

    { id: 'CAPE_CORAL_FL_BRIDGE_WORK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Bridge work has the approach down to one lane all week.',
      title: 'The bridge is down to one lane',
      body: 'Construction on the big bridge has the Parkway approach at a crawl the night of your show. A van from across the river is sitting an hour in traffic, and the kids from the far side can\'t get over in time.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the water.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The approach never cleared. The far side stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads sat in the jam together all the way across. They\'ll remember that.' }
      ] },

    { id: 'CAPE_CORAL_FL_BOAT_PARADE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'The Parkway end closes Saturday afternoon for the parade on the water.',
      title: 'The Parkway end is shut',
      body: 'The parade has the Parkway end closed from four to nine, and the only room down there loads in after the lights go off. The crowd is on the water and parking is gone.',
      options: [
        { id: 'LATE', label: 'Push doors back until the street reopens', likely: 'A late start, but the parade crowd drifts in.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors at nine thirty. The crowd came in from the water, loud and happy.' },
        { id: 'GARAGE', label: 'Move the whole bill to a garage inland', likely: 'Smaller and louder, away from the closures.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A garage away from the parade took the bill, and it filled.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'People give up on the closures.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Half the list never found a place to leave the car.' }
      ] }
  ]
});
