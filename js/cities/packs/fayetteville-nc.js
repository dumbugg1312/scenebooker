SB.Cities.register('fayetteville-nc', {
  v: 1,
  slug: 'fayetteville-nc',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['juneteenth jubilee', 'rotary christmas parade', 'christmas in the park', 'christmas parade', 'segra stadium', 'woodpeckers', 'fayetteville woodpeckers', 'cool spring downtown district', 'visit downtown fayetteville', 'dogwood nights', 'dogwood fall festival', 'fourth friday', 'fall festival', 'crown event center', 'cityview', 'bizfayetteville', 'abc11', 'hope mills dam', 'hurricane matthew', 'hurricane florence', 'hurricane fran', 'hurricane floyd', 'tropical storm debby', 'youth protection safety ordinance',
           'fort bragg', 'fort liberty', 'pope field', 'fayetteville state university', 'methodist university', 'fayetteville technical community college',
           'shaw university', 'dogwood festival', 'international folk festival', 'folk festival', '4th fridays', 'fourth fridays', 'market house',
           'fayetteville observer', 'up & coming weekly', 'up and coming weekly', 'carolina league', 'waffle house', 'cook out', 'cookout', 'bojangles',
           'biscuitville', 'cheerwine', 'texas pete', 'walmart', 'fayettenam', 'america\'s can do city', 'all-american city', 'city of dogwoods', 'soldier city',
           'vfw', 'american legion', 'pinestraw annex', 'cross creek cellar', 'the carport at vance drive', 'sandhills social hall', 'mill pond room',
           'parachute row', 'dogwood loading dock', 'hay street backroom', 'cape fear annex', 'the quartermaster', 'slab and pine', 'bragg road storage bay 14'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The base is written only as 'the post' or 'the base'. */
  blocklist: ['fort bragg*', 'fort liberty*', 'dogwood festival*', 'fayetteville observer*', 'up & coming*', 'waffle house*', 'cook out*', 'bojangles*'],

  blurb: ['An Army town where metal benefits in rented halls and a worn-out DIY crew keep the scene going. A bill is a handful of local bands, usually with the same faces in the crowd.',
          'There is no steady all-ages room. The good bands play bigger bills up the road.'],
  hard: 'No steady all-ages room; shows are one-off hall rentals.',
  region: 'the Carolinas',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64 },
    { name: 'Durham', state: 'NC', lat: 35.99, lon: -78.90 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Fayetteville' },
    { id: 'hope-mills', kind: 'FEEDER', name: 'Hope Mills', minutes: 15, bearing: 225, note: 'A lake-and-mill bedroom suburb to the southwest; the first town a local names.', scene: 50,
      rooms: [{ id: 'lake-dock', kind: 'OUTDOOR', hood: 'hope-mills-hood', cap: 80, curfew: 1230, ac: false, outdoor: true,
      note: 'A dock at a lakeside park in Hope Mills. You need a permit, and sunset is the deadline.' }] },
    { id: 'spring-lake', kind: 'FEEDER', name: 'Spring Lake', minutes: 20, bearing: 310, note: 'A small town nearly all post-adjacent, soldier-heavy and stretched thin.' },
    { id: 'raeford', kind: 'FEEDER', name: 'Raeford', minutes: 30, bearing: 265, note: 'A farm and base county seat to the west on US 401.' },
    { id: 'dunn', kind: 'FEEDER', name: 'Dunn', minutes: 30, bearing: 15, note: 'An interstate and farm-country town up I-95.' },
    { id: 'lillington', kind: 'FEEDER', name: 'Lillington', minutes: 40, bearing: 340, note: 'A river-and-farm county seat to the north.' },
    { id: 'lumberton', kind: 'FEEDER', name: 'Lumberton', minutes: 40, bearing: 200, note: 'Bigger and poorer, down I-95; flooded often in storms.' },
    { id: 'pembroke', kind: 'FEEDER', name: 'Pembroke', minutes: 45, bearing: 235, note: 'A university town and the center of its own tribal community, with a distinct local culture.' },
    { id: 'sanford', kind: 'FEEDER', name: 'Sanford', minutes: 45, bearing: 330, note: 'A small brick-and-pottery city with a link to the Triangle.' },
    { id: 'southern-pines', kind: 'FEEDER', name: 'Southern Pines and Pinehurst', minutes: 45, bearing: 295, note: 'Golf-resort Sandhills towns; richer kids, the exception to broke.' },
    { id: 'clinton', kind: 'FEEDER', name: 'Clinton', minutes: 45, bearing: 90, note: 'A farm town to the east.' },
    { id: 'elizabethtown', kind: 'FEEDER', name: 'Elizabethtown', minutes: 45, bearing: 150, note: 'A small river town down NC 87.' },
    { id: 'wilmington', kind: 'PEER', name: 'Wilmington', minutes: 90, bearing: 140, slug: 'wilmington-nc', note: 'The cooler coastal town, with a bigger and steadier small-room scene.' },
    { id: 'greenville', kind: 'PEER', name: 'Greenville', minutes: 90, bearing: 65, scene: 800, note: 'An east Carolina college town with its own crowd.' },
    { id: 'greensboro', kind: 'PEER', name: 'Greensboro', minutes: 105, bearing: 325, slug: 'greensboro-nc', note: 'Larger but similar in character, up I-85.' },
    { id: 'columbia', kind: 'PEER', name: 'Columbia', state: 'SC', minutes: 135, bearing: 235, slug: 'columbia-sc', note: 'A fair match in size, down to the southwest.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Hay Street', route: 'downtown', note: 'The old soldier-bar strip, now a managed revival of stages, patios and a ballpark; clean, and tight on rough rooms.' },
    { id: 'haymount', name: 'Haymount', route: 'old-side', note: 'A leafy hill of big old houses near the hospital; the closest thing to a bohemian street, if the neighbors allow it.' },
    { id: 'murchison', name: 'the Murchison Road corridor', route: 'campus', note: 'Cheap ranch houses and apartments around a historic Black university; church halls and campus events.' },
    { id: 'bragg-blvd', name: 'Bragg Boulevard and Ramsey Street', route: 'work-side', note: 'The gate-town strip of pawn shops, tattoo shops and bars; storage-unit practice spaces and constant turnover.' },
    { id: 'west-side', name: 'Raeford Road and Skibo Road', route: 'campus', note: 'Chain-store sprawl and subdivisions where the suburban kid lives with a carport or garage.' },
    { id: 'massey-hill', name: 'Massey Hill and the south side', route: 'work-side', note: 'An old mill neighborhood of small houses and shuttered buildings; backyards and warehouses.' },
    { id: 'eastern', name: 'Eastern Boulevard and the I-95 side', route: 'work-side', note: 'Motels, truck stops and light industry with few neighbors to complain.' },
    { id: 'hope-mills-hood', name: 'Hope Mills', route: 'town:hope-mills', note: 'A lake-and-mill suburb southwest of the city, with park docks and quiet streets.' }
  ],

  rooms: [
    { id: 'west-carport', kind: 'HOUSE', hood: 'west-side', cap: 60, curfew: 1320, ac: false, outdoor: true, pressure: 55, start: true,
      note: 'A carport on a ranch-house street off Raeford Road, with a generator and a few fans. One neighbor call ends the night.' },
    { id: 'massey-yard', kind: 'HOUSE', hood: 'massey-hill', cap: 50, curfew: 1320, ac: false, outdoor: true, pressure: 50,
      note: 'A deep backyard in an old mill neighborhood, with a tarp over the bands. Weather and a landlord are the threats.' },
    { id: 'skatepark', kind: 'OUTDOOR', hood: 'west-side', cap: 120, curfew: 1260, ac: false, outdoor: true,
      note: 'A city skatepark that has held a bill or two. Daylight and the park hours decide it, and rain cancels it.' },
    { id: 'vets-hall', kind: 'HALL', hood: 'west-side', cap: 250, curfew: 1350, ac: true, pressure: 45,
      note: 'A veterans hall west of town that rents out for all-ages metal benefits. The date depends on the hall own calendar.' },
    { id: 'strip-bay', kind: 'DIY', hood: 'bragg-blvd', cap: 40, curfew: 1320, ac: false, pressure: 55,
      note: 'A practice bay in a storage-unit row on the gate-town strip. It sometimes holds a bill until the landlord turns over.' },
    { id: 'cafe', kind: 'SHOP', hood: 'haymount', cap: 50, curfew: 1260, ac: true,
      note: 'A neighborhood cafe with a tiny stage and a sweaty room. Over by nine.' },
    { id: 'hay-pub', kind: 'BAR', hood: 'downtown', cap: 80, curfew: 1500, ac: true,
      note: 'A pub-style bar on Hay Street with a small stage. Touring bands pack it, and the door is twenty-one.' },
    { id: 'music-hall', kind: 'CLUB', hood: 'downtown', cap: 300, curfew: 1410, ac: true, ages: ['A18'],
      note: 'A music hall that has run since the mid two-thousands. Conventional and legal, with an eighteen-plus night now and then.' },
    { id: 'gate-bar', kind: 'BAR', hood: 'bragg-blvd', cap: 100, curfew: 1530, ac: true,
      note: 'A bar on the gate-town strip, packed on a pay-cycle night. A biker bar nearby already closed.' },
    { id: 'ballpark-stage', kind: 'BIG', hood: 'downtown', cap: 1500, curfew: 1350, ages: ['ALL'], ac: false, outdoor: true,
      note: 'The outdoor stage downtown that holds the big festivals. Not a punk room, but a place to aim at.' }
  ],

  contacts: ['wilmington-nc', 'greensboro-nc', 'columbia-sc', 'durham-nc', 'raleigh'],

  calendar: [
    { id: 'spring-downtown', label: 'the spring downtown festival', tag: 'festival', month: 4, week: 4, dows: [4, 5, 6], can: [0.88, 0.85, 0.85], hoods: ['downtown'], elsewhere: [1, 0.97, 0.97] },
    { id: 'june-celebration', label: 'the downtown June celebration', tag: 'festival', month: 6, week: 3, dows: [4, 5], can: [0.92, 0.9, 0.9], hoods: ['downtown'], elsewhere: [1, 0.97, 0.97] },
    { id: 'fall-music-weekend', label: 'the downtown fall music-and-culture weekend', tag: 'festival', month: 9, week: 4, dows: [4, 5], can: [0.92, 0.88, 0.88], hoods: ['downtown'], elsewhere: [1, 0.97, 0.97] },
    { id: 'holiday-parade', label: 'the downtown holiday parade', tag: 'parade', month: 12, week: 2, dows: [5], can: [0.85, 0.9, 0.95], hoods: ['downtown'], elsewhere: [1, 0.97, 0.97] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [0.85, 0.95, 0.95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.1] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1380, weekend: 1380, inForce: true } },

  points: [
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64, pop: 470000 },
    { name: 'Florence', state: 'SC', lat: 34.20, lon: -79.76, pop: 40000 },
    { name: 'Charleston', state: 'SC', lat: 32.78, lon: -79.93, pop: 150000 },
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44, pop: 230000 }
  ],
  roads: ['I-95', 'I-295', 'US 401', 'NC 24', 'NC 87', 'Raeford Road'],

  words: {
    street: ['Hay Street', 'Bragg Boulevard', 'Ramsey Street', 'Raeford Road', 'Skibo Road', 'Cliffdale Road', 'Murchison Road'],
    water: ['the Cape Fear', 'Cross Creek', 'Hope Mills Lake'],
    hood: ['Haymount', 'Massey Hill', 'Hope Mills', 'Spring Lake', 'Cross Creek'],
    thing: ['carport', 'slab house', 'longleaf pine', 'storage unit', 'dogwood', 'barracks', 'sweet tea', 'rented hall', 'benefit show', 'pub stage', 'newsletter'],
    weather: ['afternoon thunderstorm', 'river flood']
  },

  events: [
    { id: 'FAYETTEVILLE_NC_HALL_BOOKED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], months: [4, 5, 6, 7, 8, 9, 10] },
      telegraph: 'The veterans hall just booked a benefit for your date, and nobody told the bills that share the calendar.',
      title: 'The hall is taken',
      body: 'The hall you counted on has a benefit that night. The only other roof is a carport, and the dock at the lake park has a permit and a sunset.',
      options: [
        { id: 'DOCK', label: 'Move the bill to the lake-park dock', likely: 'Smaller, outdoors, and out by sunset.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .6 }, { op: 'SHOW_MOD', key: 'lateMin', v: -120 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The dock took the bill with the sun still up, and the set was short and golden.' },
        { id: 'CARPORT', label: 'Move it to a west-side carport', likely: 'Smaller and louder, with a neighbor next door.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A carport took the bill, and the generator held.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'FAYETTEVILLE_NC_RIVER_FLOOD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [8, 9, 10] },
      telegraph: 'A flood watch is out on the river and the creeks, and the south side sits low.',
      title: 'The creek is up',
      body: 'A flood watch has the low south side underwater, and your backyard show in Massey Hill is under a tarp over a puddle.',
      options: [
        { id: 'CARPORT', label: 'Move it to a west-side carport', likely: 'Smaller and louder, on high ground.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A carport on the west side took the bill, dry and loud.' },
        { id: 'SANDBAG', label: 'Sandbag the yard and play on', likely: 'It costs forty dollars, and the crowd stays home.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The water stayed in the ditch, and the yard was half full and wet to the ankle.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'FAYETTEVILLE_NC_FREE_STAGES', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The downtown streets are closing for a free festival, and the free stages start at six.',
      title: 'Free stages downtown',
      body: 'Hay Street is shut, the parking is gone, and a free festival weekend is pulling the crowd away from your small bar bill.',
      options: [
        { id: 'LATE', label: 'Push doors back until the stages go quiet', likely: 'The ones who want a real show come late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors went an hour late, and the crowd came in loud from the free stages.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is on the street.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }],
          result: 'Half the room was on the street, but the regulars came.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'FAYETTEVILLE_NC_CURFEW_HALL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'A parent calls to say the city curfew for under-seventeens is the hour before your last band.',
      title: 'Clear the youngest kids',
      body: 'The city curfew for kids under seventeen starts at eleven, and the all-ages hall is full of the youngest of them before the last band.',
      options: [
        { id: 'EARLY', label: 'Move the last band up and finish early', likely: 'Everyone gets home, and the last band loses its crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The last band played to a thinner room, and every kid got home in time.' },
        { id: 'SPLIT', label: 'Clear the youngest before the last set', likely: 'Parents are glad, and the last band plays to older heads.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The youngest kids left with their parents. The late set was smaller and tighter.' },
        { id: 'ACCEPT', label: 'Run it and hope', likely: 'Parents may be called.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'A couple of parents showed up in the lot at ten to eleven.' }
      ] }
  ]
});
