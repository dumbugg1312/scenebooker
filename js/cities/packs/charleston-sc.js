SB.Cities.register('charleston-sc', {
  v: 1,
  slug: 'charleston-sc',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['boeing', 'joint base charleston', 'naval weapons station', 'navy nuclear power school', 'marine corps air station', 'parris island', 'college of charleston', 'the citadel',
           'medical university of south carolina', 'charleston southern', 'trident technical college', 'spoleto', 'spoleto festival usa', 'piccolo spoleto',
           'cooper river bridge run', 'bridge run', 'charleston wine and food', 'southeastern wildlife exposition', 'festival of houses and gardens', 'moja arts festival',
           'lowcountry oyster festival', 'hugo', 'hurricane hugo', 'silicon harbor', 'jenkins orphanage band', 'university of south carolina', 'gamecocks', 'clemson',
           'waffle house', 'bojangles', 'vfw', 'american legion', 'elks', 'moose lodge', 'holy city', 'ravenel bridge', 'arthur ravenel',
           'the crosstown carport', 'rivers avenue tire and wheel annex', 'moose lodge no. 1190', 'folly road bingo hall', 'hanahan elks hall', 'ladson skate barn',
           'johns island packing shed', 'cainhoy fish camp', 'avondale laundromat back room', 'neck road lodge', 'ashley phosphate storage unit 114', 'shem creek bait annex',
           'charleston city paper', 'post and courier', 'high water festival', 'holy city hullabaloo', 'wentworth mansion', 'the local palate', 'charleston wine + food',
           'house and garden tours', 'food and wine classic', 'live5news', 'wcbd', 'abc news 4', 'the daniel island news', 'extra chill', 'charleston grit',
           'charleston magazine', 'bandsintown'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The 1989 storm is written only as 'the storm' in game text. */
  blocklist: ['spoleto*', 'bridge run*', 'joint base*', 'waffle house*', 'bojangles*', 'jenkins orphanage*', 'silicon harbor*'],

  blurb: ['Punk here is small and everybody shares one crowd. Shows live on porches, at a skatepark and at the odd waterfront DIY fest.',
          'The best way to find a show is a social-media group, not a flyer on a pole.'],
  hard: 'Few rooms left for under-21s, and one tiny crowd to split across genres.',
  region: 'the Lowcountry',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Charleston' },
    { id: 'goose-creek', kind: 'FEEDER', name: 'Goose Creek and Hanahan', minutes: 25, bearing: 350, note: 'Military and suburban towns up the interstate; the kids of base families.', bands: 2 },
    { id: 'summerville', kind: 'FEEDER', name: 'Summerville', minutes: 30, bearing: 325, note: 'A fast-growing suburb northwest on I-26; the likeliest kids to come in.', bands: 2 },
    { id: 'ladson', kind: 'FEEDER', name: 'Ladson and Ridgeville', minutes: 35, bearing: 330, note: 'Strip malls and farmland along I-26.' },
    { id: 'moncks-corner', kind: 'FEEDER', name: 'Moncks Corner', minutes: 45, bearing: 355, note: 'A rural county seat up US 52, with a lake nearby.' },
    { id: 'walterboro', kind: 'FEEDER', name: 'Walterboro', minutes: 50, bearing: 275, note: 'A rural county seat west by back roads.' },
    { id: 'st-george', kind: 'FEEDER', name: 'St. George and Holly Hill', minutes: 50, bearing: 300, note: 'Farm and lake towns along I-26.' },
    { id: 'orangeburg', kind: 'FEEDER', name: 'Orangeburg', minutes: 70, bearing: 310, note: 'A college town up I-26 with a small scene of its own.', bands: 1 },
    { id: 'georgetown', kind: 'FEEDER', name: 'Georgetown', minutes: 70, bearing: 40, note: 'A mill and port town up US 17.' },
    { id: 'beaufort', kind: 'FEEDER', name: 'Beaufort', minutes: 80, bearing: 225, note: 'Military and historic tourism to the southwest; a small scene.', bands: 1 },
    { id: 'columbia', kind: 'PEER', name: 'Columbia', minutes: 105, bearing: 320, slug: 'columbia-sc', note: 'The state capital up I-26; bands play both on one weekend.' },
    { id: 'savannah', kind: 'PEER', name: 'Savannah', minutes: 105, bearing: 245, slug: 'savannah-ga', note: 'A similar port and art-school city down US 17.' },
    { id: 'myrtle-beach', kind: 'PEER', name: 'Myrtle Beach', minutes: 120, bearing: 45, slug: 'myrtle-beach-sc', note: 'A beach resort up the coast.' },
    { id: 'augusta', kind: 'PEER', name: 'Augusta', minutes: 135, bearing: 285, slug: 'augusta-ga', note: 'A river city to the west.' }
  ],

  hoods: [
    { id: 'upper-peninsula', name: 'Upper King and the Neck', route: 'downtown', note: 'Old warehouses and auto shops turned breweries and hotels; small bars survive but every cheap building is being bought.' },
    { id: 'lower-peninsula', name: 'the Market and the lower peninsula', route: 'old-side', note: 'The tourist core: cover bands, bachelorettes and parking rules. Friends work here; shows do not happen here.' },
    { id: 'west-ashley', name: 'West Ashley', route: 'old-side', note: 'Postwar ranch houses and strip-mall units across the river; the best place for house and storefront shows.' },
    { id: 'james-island', name: 'James Island and Folly Road', route: 'campus', note: 'Marsh-edge streets of small lots: backyards, garages and roadside bars.' },
    { id: 'park-circle', name: 'Park Circle', route: 'downtown', note: 'A planned garden neighborhood in North Charleston, now bikes and craft beer; heating up fast.' },
    { id: 'rivers-avenue', name: 'Rivers Avenue and North Charleston', route: 'work-side', note: 'A long strip of pawn shops, tire places and warehouses: the cheapest and loosest commercial space.' },
    { id: 'mount-pleasant', name: 'Mount Pleasant and East Cooper', route: 'campus', note: 'Affluent suburbs over the big bridge; few rooms but plenty of kids who drive over.' },
    { id: 'johns-island', name: 'Johns Island', route: 'work-side', note: 'Fields, barns and fish camps with no neighbors for a mile; development is eating it.' },
    { id: 'folly-beach', name: 'Folly Beach', route: 'old-side', note: 'A beach town of bars and a pier, packed in summer and empty in winter.' }
  ],

  rooms: [
    { id: 'ashley-carport', kind: 'HOUSE', hood: 'west-ashley', cap: 60, curfew: 1350, ac: false, outdoor: true, sketch: 25, standing: [70, 60, 45], pressure: 45, start: true,
      note: 'A postwar ranch house with a carport and a yard. No basement, so the show is out front, and a neighbor\'s call ends it.' },
    { id: 'island-yard', kind: 'HOUSE', hood: 'james-island', cap: 50, curfew: 1320, ac: false, outdoor: true, sketch: 30, standing: [65, 55, 40], pressure: 60,
      note: 'A backyard on a marsh-edge lot. The neighbors are close, and a yard fest here once got shut by the police.' },
    { id: 'circle-house', kind: 'HOUSE', hood: 'park-circle', cap: 40, curfew: 1320, ac: false, outdoor: true, sketch: 20, standing: [65, 60, 45], pressure: 55,
      note: 'A small lot in a neighborhood that is getting expensive. The new neighbors have never heard a drum kit.' },
    { id: 'avenue-unit', kind: 'DIY', hood: 'rivers-avenue', cap: 120, rent: 60, curfew: 1380, ac: false, sketch: 45, standing: [55, 60, 45], pressure: 55, needs: ['VOUCH'],
      note: 'A donation-door arts space in a cheap commercial unit. No beer, and a landlord and a fire code to worry about.' },
    { id: 'north-skatepark', kind: 'OUTDOOR', hood: 'rivers-avenue', cap: 150, rent: 15, curfew: 1260, sketch: 40, standing: [60, 55, 45],
      note: 'The city skatepark. Early evening hardcore, and the lights and the city decide how long it lasts.' },
    { id: 'boatyard', kind: 'OUTDOOR', hood: 'upper-peninsula', cap: 200, rent: 25, curfew: 1320, sketch: 40, standing: [60, 55, 40], pressure: 50,
      note: 'A boatyard on the water. One-off fests, a hundred dollars to put on, and the weather and the yard owner decide it.' },
    { id: 'strip-unit', kind: 'SHOP', hood: 'west-ashley', cap: 80, curfew: 1350, ac: true, sketch: 15, standing: [65, 65, 60],
      note: 'A strip-mall unit on a month-to-month lease. Free all-ages shows until the lease runs out.' },
    { id: 'ashley-bar', kind: 'BAR', hood: 'west-ashley', cap: 100, soundFee: 50, curfew: 1500, ac: true, following: .3, sketch: 20, standing: [50, 65, 70],
      note: 'A bar across the river with a small stage for local metal and punk openers. The age rule is the bar\'s call.' },
    { id: 'beach-bar', kind: 'BAR', hood: 'folly-beach', cap: 90, soundFee: 40, curfew: 1500, ac: false, outdoor: true, following: .2, sketch: 15, standing: [50, 65, 70],
      note: 'A porch-style music bar on the beach. Packed in summer and empty in winter.' },
    { id: 'king-club', kind: 'CLUB', hood: 'upper-peninsula', cap: 300, ages: ['ALL', 'A18'], curfew: 1380, ac: true, following: .5, sketch: 15, standing: [45, 70, 70], needs: ['FULL_BILL'],
      note: 'A mid-size club for touring bands and the odd state-wide punk night. The rent around it keeps going up.' },
    { id: 'folly-club', kind: 'CLUB', hood: 'james-island', cap: 350, ages: ['A18'], curfew: 1440, ac: true, following: .6, sketch: 15, standing: [45, 65, 70], needs: ['FULL_BILL'],
      note: 'A long-running bar and stage on Folly Road. Mostly roots and rock bills, with punk on a side night.' },
    { id: 'historic-hall', kind: 'BIG', hood: 'lower-peninsula', cap: 900, ages: ['ALL'], curfew: 1380, ac: true, following: .8, sketch: 5, standing: [40, 70, 70],
      note: 'A restored historic hall on the peninsula. Ticketed, tourist-priced, and a touring room for names.' }
  ],

  contacts: ['columbia-sc', 'savannah-ga', 'myrtle-beach-sc', 'augusta-ga', 'charlotte'],

  calendar: [
    { id: 'long-race', label: 'the long road race', tag: 'race', month: 3, week: 4, dows: [5], can: [.88, .85, .85], hoods: ['lower-peninsula', 'upper-peninsula', 'mount-pleasant'], elsewhere: [1, .97, .97] },
    { id: 'wine-food-week', label: 'the wine-and-food week', tag: 'festival', month: 3, week: 1, dows: [2, 3, 4, 5, 6], can: [.90, .88, .88], hoods: ['lower-peninsula', 'upper-peninsula'], elsewhere: [1, 1, 1] },
    { id: 'house-tours', label: 'the historic home tours', tag: 'festival', month: 3, week: 3, dows: [4, 5], can: [.92, .90, .90], hoods: ['lower-peninsula'], elsewhere: [1, 1, 1] },
    { id: 'arts-season', label: 'the arts festival season', tag: 'festival', month: 6, weeks: [1, 2], dows: [4, 5, 6], can: [.92, .90, .90], hoods: ['lower-peninsula', 'upper-peninsula'], elsewhere: [1, .98, .98] },
    { id: 'wildlife-expo', label: 'the wildlife expo weekend', tag: 'fair', month: 2, week: 3, dows: [4, 5, 6], can: [.95, .92, .92], hoods: ['lower-peninsula', 'upper-peninsula'], elsewhere: [1, 1, 1] },
    { id: 'fall-food', label: 'the fall food-and-wine weekend', tag: 'festival', month: 11, week: 2, dows: [4, 5, 6], can: [.92, .90, .90], hoods: ['lower-peninsula', 'upper-peninsula'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 3], dows: [5], can: [.90, .95, .95], hoods: ['lower-peninsula'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1260, weekend: 1260, inForce: true } },

  points: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 6100000 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 2700000 },
    { name: 'Wilmington', state: 'NC', lat: 34.23, lon: -77.94, pop: 300000 },
    { name: 'Hilton Head', state: 'SC', lat: 32.22, lon: -80.75, pop: 40000 }
  ],
  roads: ['I-26', 'I-526', 'I-95', 'US 17', 'US 52', 'US 78'],

  words: {
    street: ['King Street', 'Meeting Street', 'Rivers Avenue', 'Savannah Highway', 'Folly Road', 'Morrison Drive', 'Dorchester Road'],
    water: ['the Ashley', 'the Cooper', 'Wappoo Cut', 'Shem Creek', 'the marsh'],
    hood: ['the Neck', 'Cannonborough', 'Elliotborough', 'Avondale', 'Park Circle', 'Daniel Island', 'James Island', 'Johns Island', 'Folly Beach', 'West Ashley'],
    thing: ['carport', 'pluff mud', 'tallboy', 'boiled peanuts', 'oyster shell', 'taco truck', 'king tide', 'palmetto bug', 'skatepark', 'boatyard', 'porch', 'farewell show'],
    weather: ['king tide', 'afternoon thunderstorm', 'storm watch', 'no-see-ums']
  },

  events: [
    { id: 'CHARLESTON_SC_YARD_SHUT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [3, 4, 5, 6, 7, 8, 9, 10] },
      telegraph: 'A neighbor on the next lot has been standing at the fence with a phone all afternoon.',
      title: 'The yard is shut at a quarter to ten',
      body: 'A neighbor and two county deputies have put a stop to the yard bill with the third band still to play. A bar across the river will take the rest, but it is 21 and over.',
      options: [
        { id: 'BAR', label: 'Move the last bands to the bar', likely: 'The show goes on. The kids can\'t come.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'BAR', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .6 }],
          result: 'The bar took the bill. The over-21 crowd stayed and the kids went home.' },
        { id: 'EARLY', label: 'End it there and send everyone home', likely: 'Everyone hears the short set. Nobody is fined.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The yard emptied quietly. The deputies left without writing anything.' },
        { id: 'ACCEPT', label: 'Argue it and run on', likely: 'A fine, and the neighbors never forget.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }, { op: 'MONEY', amount: -40 }],
          result: 'The ticket cost forty dollars and the yard was empty by ten.' }
      ] },

    { id: 'CHARLESTON_SC_RACE_DAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'race' },
      telegraph: 'The signs are up: the big bridge and the peninsula streets close Saturday morning.',
      title: 'The bridge is closed for the race',
      body: 'Saturday morning the runners have the big bridge and half the peninsula. The kids from across the water cannot drive over until the afternoon.',
      options: [
        { id: 'LATE', label: 'Push doors back until the streets open', likely: 'The kids get in. A late night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. The kids from over the bridge came in tired and loud.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Most of the east side stays home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The bridge never cleared. The east side stayed over the water.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' }
      ] },

    { id: 'CHARLESTON_SC_KING_TIDE', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [9, 10, 11] },
      telegraph: 'The tide tables show a king tide and the sky has been low and gray for two days.',
      title: 'The tide is in the street',
      body: 'A king tide has put the low streets under a foot of water, and it is rising toward the room. The skatepark is on higher ground and the lights are on.',
      options: [
        { id: 'SKATEPARK', label: 'Move the bill to the skatepark', likely: 'Early and outside. Daylight is the limit.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, respect: false }, { op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The skatepark took the bill and the water never reached the lot.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' },
        { id: 'ACCEPT', label: 'Run it and wade', likely: 'Wet shoes and a thin crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'The crowd came in with their pants rolled up. The floor was a puddle.' }
      ] }
  ]
});
