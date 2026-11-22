SB.Cities.register('salem-or', {
  v: 1,
  slug: 'salem-or',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['punx in the park', 'marion square', 'mall rats music festival', 'salem reporter', 'willamette collegian', 'clypian', 'kptv', 'katu', 'fox 12', 'willamette week', 'portland mercury', 'the stranger', 'bend source', 'viva salem', 'make music day', 'hoopla', 'englewood forest festival', 'awesome 3000', 'salem saturday market', 'noble fest', 'oregon expo', 'oregon state fair and exposition center', 'salem-keizer', 'keizer high school',
           'willamette university', 'corban university', 'chemeketa community college', 'chemeketa', 'western oregon university',
           'oregon state university', 'oregon state fair', 'state fair', 'salem art fair', 'world beat festival', 'bite of salem',
           'salem capital pride', 'keizerfest', 'statesman journal', 'capital press', 'salem business journal', 'salem magazine', 'cherriots',
           'amtrak', 'coast starlight', 'amtrak cascades', 'greyhound', 'olcc', 'chemawa indian school', 'confederated tribes of the grand ronde',
           'oregon ducks', 'oregon beavers', 'cherry city', 'salem depot', 'labor day fires', 'orchard row hall', 'hop kiln room', 'prune dryer',
           'pringle creek carport', 'slough street studio', 'lodge 41', 'the bypass lot', 'mill race garage', 'eola hill shop', 'third gear garage',
           'cannery annex', 'lancaster laundromat loft'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['statesman journal*', 'willamette university*', 'cherriots*', 'oregon state fair*', 'keizerfest*', 'capital press*'],

  blurb: ['A capital with no scene on paper, where garages and halls fill when kids drive in from the farm towns.',
          'Government quiet downtown at night, and the big city is an hour up the road.'],
  hard: 'Quiet, spread out, and overshadowed by the city to the north.',
  region: 'the Valley',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Salem' },
    { id: 'keizer', kind: 'FEEDER', name: 'Keizer', minutes: 10, bearing: 5, note: 'A suburb just north across the river. Its teenagers are Salem teenagers, and the garages are here.' },
    { id: 'monmouth', kind: 'FEEDER', name: 'Monmouth and Independence', minutes: 20, bearing: 260, note: 'A college town and its river twin to the west, dry for decades; students drive in for shows.' },
    { id: 'silverton', kind: 'FEEDER', name: 'Silverton', minutes: 25, bearing: 70, note: 'A farm and tourist town in the foothills with a small school-band scene.' },
    { id: 'woodburn', kind: 'FEEDER', name: 'Woodburn', minutes: 25, bearing: 20, note: 'A mostly Latino farm-labor town on I-5 that may have its own punk and hardcore audience.' },
    { id: 'dallas', kind: 'FEEDER', name: 'Dallas', minutes: 25, bearing: 265, note: 'A forestry and farm county seat to the west.' },
    { id: 'stayton', kind: 'FEEDER', name: 'Stayton', minutes: 30, bearing: 110, note: 'A mill and farm town up the canyon road; kids drive down.' },
    { id: 'albany', kind: 'FEEDER', name: 'Albany', minutes: 30, bearing: 195, note: 'A rail and metals town on I-5 with a historic downtown and a small scene of its own.' },
    { id: 'corvallis', kind: 'FEEDER', name: 'Corvallis', minutes: 45, bearing: 215, note: 'A university town with much better music infrastructure; crowds trade both ways.' },
    { id: 'mill-city', kind: 'FEEDER', name: 'Mill City', minutes: 45, bearing: 100, note: 'A tiny timber town in the canyon, scarred by fire.' },
    { id: 'eugene', kind: 'PEER', name: 'Eugene', minutes: 60, bearing: 190, slug: 'eugene-or', note: 'An hour south on I-5: the university town with the real punk history. The obvious trading partner.' },
    { id: 'vancouver', kind: 'PEER', name: 'Vancouver', state: 'WA', minutes: 70, bearing: 5, note: 'Across the Columbia, nearly a Portland suburb.' },
    { id: 'olympia', kind: 'PEER', name: 'Olympia', state: 'WA', minutes: 150, bearing: 340, slug: 'olympia-wa', note: 'Up I-5 past Portland, an occasional tour exchange.' },
    { id: 'bend', kind: 'PEER', name: 'Bend', minutes: 150, bearing: 100, slug: 'bend-or', note: 'Over the Cascades on the canyon highway: a rich resort town in a different world.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Salem', route: 'downtown', note: 'The capitol, bank buildings and the riverfront: busy with state workers at lunch and empty at night. A few bars and the odd storefront.' },
    { id: 'west-salem', name: 'West Salem', route: 'work-side', note: 'Across the river bridges, with its own high school, strip malls and subdivisions. Better for a garage or basement than a venue.' },
    { id: 'north-salem', name: 'North Salem and Highland', route: 'old-side', note: 'Older bungalows with basements, cheap rents, and the fairgrounds and the prison close by. Ignored and a little rough.' },
    { id: 'lancaster', name: 'East Salem and Lancaster Drive', route: 'work-side', note: 'Strip malls, apartment blocks, auto shops and warehouse bays in a mostly Latino working-class district. The cheapest space in town.' },
    { id: 'south-salem', name: 'South Salem', route: 'campus', note: 'Newer subdivisions and finished basements, parents with space and neighbors with rules.' },
    { id: 'sunnyslope', name: 'Sunnyslope and the park side', route: 'old-side', note: 'Leafy and more prosperous, good for backyard parties and park events, not for venues.' },
    { id: 'keizer-side', name: 'Keizer', route: 'work-side', note: 'The big suburb north of the river: garages, basements and all-ages shows in somebody\'s house.' }
  ],

  rooms: [
    { id: 'keizer-garage', kind: 'HOUSE', hood: 'keizer-side', cap: 50, curfew: 1320, ac: false, outdoor: true, pressure: 50, start: true,
      note: 'A garage and carport with a canopy for the rain. A neighbor\'s noise call ends it.' },
    { id: 'basement-shop', kind: 'SHOP', hood: 'downtown', cap: 80, curfew: 1320, pa: 0.5, ac: false, outdoor: false, standing: [65, 65, 70], following: 0.2,
      note: 'A vintage clothing store with a basement stage. Always all ages, ten dollars at the door, and the lease is the threat.' },
    { id: 'skatepark-day', kind: 'OUTDOOR', hood: 'downtown', cap: 300, curfew: 1200, rent: 15, ac: false, outdoor: true, pressure: 45,
      note: 'A free daytime bill at the downtown skatepark each September. It needs a permit and clear air.' },
    { id: 'lodge-hall', kind: 'HALL', hood: 'downtown', cap: 250, curfew: 1350, rent: 300, ac: true,
      note: 'A rented lodge room, a night at a time. Beer is the sticking point.' },
    { id: 'lancaster-bay', kind: 'DIY', hood: 'lancaster', cap: 100, curfew: 1380, ac: false, pressure: 55, needs: ['VOUCH'],
      note: 'A shop bay in a strip of auto shops and warehouses. The cheapest space in town, with a landlord and a fire marshal.' },
    { id: 'rail-warehouse', kind: 'DIY', hood: 'downtown', cap: 120, curfew: 1380, ac: false, pressure: 55, needs: ['VOUCH'],
      note: 'A borrowed warehouse by the tracks for hardcore nights. It is never the same room twice.' },
    { id: 'north-bungalow', kind: 'HOUSE', hood: 'north-salem', cap: 60, curfew: 1320, ac: false, outdoor: false, pressure: 45,
      note: 'An old bungalow with a real basement on a rough block. Cheap, and nobody calls.' },
    { id: 'west-garage', kind: 'HOUSE', hood: 'west-salem', cap: 50, curfew: 1320, ac: false, outdoor: false, pressure: 55,
      note: 'A subdivision garage where the parents and the neighbors set the rules.' },
    { id: 'metal-club', kind: 'CLUB', hood: 'downtown', cap: 250, ages: ['A21'], curfew: 1440, ac: true, following: 0.4,
      note: 'A club with a real stage. The loud local bills here are 21 and over.' },
    { id: 'main-strip-bar', kind: 'BAR', hood: 'downtown', cap: 120, soundFee: 50, ages: ['A21'], curfew: 1470, ac: true, following: 0.3,
      note: 'A bar with a back-room stage on the main strip. Rooms like it close without warning.' },
    { id: 'mall-box', kind: 'BIG', hood: 'lancaster', cap: 900, curfew: 1440, rent: 1800, ac: true,
      note: 'A big empty store inside a mall, used for a one-day festival. All ages, doors at five, and a big step up.' }
  ],

  contacts: ['eugene-or', 'olympia-wa', 'bend-or', 'portland'],

  calendar: [
    { id: 'late-summer-fair', label: 'the late-summer fair', tag: 'fair', month: 8, weeks: [4, 5], dows: [0, 1, 2, 3, 4, 5, 6], can: [0.75, 0.7, 0.7], hoods: ['north-salem'], elsewhere: [0.88, 0.85, 0.85] },
    { id: 'skatepark-day', label: 'the free skatepark day', tag: 'festival', month: 9, week: 2, dows: [5], can: [0.9, 0.9, 0.9], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'metal-fest', label: 'the one-day metal and punk fest', tag: 'festival', month: 12, week: 1, dows: [5], can: [0.9, 0.9, 0.9], hoods: ['lancaster'], elsewhere: [0.88, 0.88, 0.88] },
    { id: 'riverfront-fest', label: 'the riverfront world-music weekend', tag: 'festival', month: 6, weeks: [2, 3], dows: [4, 5, 6], can: [0.92, 0.9, 0.9], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [0.85, 0.95, 0.95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [0.85, 0.95, 0.95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.1] }
  ],

  points: [
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68, pop: 650000 },
    { name: 'Eugene', state: 'OR', lat: 44.05, lon: -123.09, pop: 177000 },
    { name: 'Corvallis', state: 'OR', lat: 44.56, lon: -123.26, pop: 61000 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33, pop: 740000 }
  ],
  roads: ['I-5', 'Highway 99E', 'Highway 22', 'Highway 221', 'Highway 213'],

  words: {
    street: ['Commercial Street', 'Lancaster Drive', 'River Road', 'Highway 99E', 'Highway 22'],
    water: ['the Willamette', 'the river'],
    hood: ['West Salem', 'Highland', 'Northgate', 'Sunnyslope', 'Hayesville', 'Four Corners', 'Keizer', 'Grant'],
    thing: ['taco truck', 'grange hall', 'filbert orchard', 'hop field', 'cannery', 'teriyaki shop', 'garage canopy', 'marionberry stand', 'church hall', 'canopy'],
    weather: ['week of rain', 'wildfire smoke', 'ice storm']
  },

  events: [
    { id: 'SALEM_OR_FAIR_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The fairgrounds fair is on, and downtown parking is already full.',
      title: 'The fair takes the weekend',
      body: 'The fair is eleven days long and nobody books against it. Half your door goes to the fairgrounds, and the other half cannot find a spot downtown.',
      options: [
        { id: 'LATE', label: 'Push doors back until the fair lets out', likely: 'The crowd that wants a night out shows up late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }],
          result: 'Doors an hour late. The kids came off the midway still smelling of fried dough.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Fewer people, no trouble.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.7 }],
          result: 'The fair kept most of the list. The ones who came had room to move.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'SALEM_OR_SMOKE_WEEK', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [8, 9] },
      telegraph: 'The sky over the valley has gone orange and the air has a taste.',
      title: 'Smoke over the valley',
      body: 'A week of wildfire smoke is parked on the valley and the outdoor bill is two days away. The sound crew wants to cancel.',
      options: [
        { id: 'INSIDE', label: 'Move it indoors into a garage or hall', likely: 'Smaller and louder. Nobody has to breathe the sky.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: 0.6 }],
          result: 'A garage took the bill. It was packed and the door stayed shut.' },
        { id: 'MASKS', label: 'Run it outside and hand out masks', likely: 'Costs a little. The crowd is thin and the day is short.',
          effects: [{ op: 'MONEY', amount: -25 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }],
          result: 'Masks and a short set. The ones who came coughed through the choruses.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The air did not clear.' }
      ] },

    { id: 'SALEM_OR_QUIET_CALL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [10, 11, 3, 4, 5] },
      telegraph: 'The week of rain has everyone under the canopy and the neighbors inside with their windows shut.',
      title: 'The ten o\'clock call',
      body: 'The garage bill is crowded under a canopy in the rain, and a neighbor has called in the quiet-hour limit while the second band is still setting up.',
      options: [
        { id: 'SHORT', label: 'Cut it short and clear the street', likely: 'The host keeps the garage. A thin night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.85 }],
          result: 'You stopped at ten. The host stayed on speaking terms with the street.' },
        { id: 'KNOCK', label: 'Go talk to the neighbor', likely: 'Costs a little. A smaller crowd while you do.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }, { op: 'REGULARS', pct: .02 }],
          result: 'The neighbor listened. The night ended at half past ten with no call back.' },
        { id: 'ACCEPT', label: 'Keep playing', likely: 'Risks the host\'s garage.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.75 }],
          result: 'The call came back at eleven, and the host got a warning.' }
      ] }
  ]
});
