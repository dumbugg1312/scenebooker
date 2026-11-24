SB.Cities.register('hickory-nc', {
  v: 1,
  slug: 'hickory-nc',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['hickory kick holidays', 'footcandle film festival', 'footcandle', 'hickory christmas parade', 'breaking darkness music festival', 'visit hickory', 'lowes foods', 'lowe\'s foods', 'l.p. frans stadium', 'make music day', 'bandsintown', 'songkick', 'hickory hops',
           'lenoir-rhyne', 'lenoir rhyne', 'western piedmont community college', 'catawba valley community college', 'appalachian state', 'app state',
           'hickory daily record', 'hickory oktoberfest', 'oktoberfest', 'high point market', 'crawdads', 'hickory crawdads',
           'hickory motor speedway', 'waffle house', 'cook out', 'bojangles', 'hardee\'s', 'biscuitville', 'cheerwine', 'sun drop', 'fort bragg',
           'camp lejeune', 'vfw', 'american legion', 'elks', 'moose lodge', 'knights of columbus', 'the spindle room', 'hosiery hall',
           'catawba cutting floor', 'union square annex', 'the dip shed', 'showroom 9', 'cable yard', 'lake landing hall', 'mill village rec', 'veneer'],
  /* Dossier institutions and its unchecked invented venue names are banned: research, not content. */
  blocklist: ['lenoir-rhyne*', 'hickory daily record*', 'cheerwine*', 'bojangles*', 'spindle room*', 'hosiery hall*', 'cutting floor*', 'third shift*'],

  blurb: ['Mill-town punk lives in carports, church halls and one stubborn back room, and everyone drives and knows everyone.',
          'There are few rooms and many cousins, and a show here lives or dies on one landlord and one neighbor.'],
  hard: 'One or two rooms, no transit, and a noise complaint ends your night.',
  region: 'the Piedmont',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 },
    { name: 'Asheville', state: 'NC', lat: 35.6, lon: -82.55 },
    { name: 'Winston-Salem', state: 'NC', lat: 36.1, lon: -80.24 },
    { name: 'Greensboro', state: 'NC', lat: 36.07, lon: -79.79 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Hickory' },
    { id: 'conover', kind: 'FEEDER', name: 'Newton and Conover', minutes: 10, bearing: 100, note: 'Mill and furniture towns that are effectively the same metro; Conover is the more industrial.', scene: 60,
      rooms: [{ id: 'conover-hall', kind: 'HALL', hood: 'conover-hood', cap: 150, curfew: 1320, ac: true, pressure: 45,
      note: 'A small-town lodge or church hall with a door volunteer and a no-cussing sign. One complaint and the lease is gone.' }] },
    { id: 'longview', kind: 'FEEDER', name: 'Longview and Claremont', minutes: 10, bearing: 80, note: 'Mill villages and suburbs on the edge of town.', scene: 50,
      rooms: [{ id: 'longview-hall', kind: 'HALL', hood: 'longview-hood', cap: 100, curfew: 1290, ac: true, pressure: 40,
      note: 'A church fellowship hall. Clean, early, and faith-friendly lineups get it easier.' }] },
    { id: 'maiden', kind: 'FEEDER', name: 'Maiden and Catawba', minutes: 20, bearing: 150, note: 'Farm and mill villages.' },
    { id: 'granite-falls', kind: 'FEEDER', name: 'Granite Falls', minutes: 20, bearing: 345, note: 'A small furniture and textile town on NC 18.' },
    { id: 'lenoir', kind: 'FEEDER', name: 'Lenoir', minutes: 30, bearing: 340, note: 'A bigger furniture town up US 321; probably a few bands.', bands: 2 },
    { id: 'morganton', kind: 'FEEDER', name: 'Morganton', minutes: 35, bearing: 275, note: 'A small city west on I-40 with a community college.' },
    { id: 'taylorsville', kind: 'FEEDER', name: 'Taylorsville', minutes: 30, bearing: 15, note: 'A rural county seat.' },
    { id: 'statesville', kind: 'FEEDER', name: 'Statesville', minutes: 35, bearing: 120, note: 'A mid-size town east on I-40; more peer than feeder.' },
    { id: 'lincolnton', kind: 'FEEDER', name: 'Lincolnton', minutes: 40, bearing: 170, note: 'A small mill town down NC 16.' },
    { id: 'wilkesboro', kind: 'FEEDER', name: 'Wilkesboro and North Wilkesboro', minutes: 50, bearing: 20, note: 'Small, rural and racing-minded.' },
    { id: 'marion', kind: 'FEEDER', name: 'Marion', minutes: 50, bearing: 285, note: 'A small town at the foot of the mountains.' },
    { id: 'boone', kind: 'PEER', name: 'Boone', minutes: 60, bearing: 330, scene: 900, note: 'The cooler college town with a much bigger scene; kids go up, a few come down.' },
    { id: 'winston-salem', kind: 'PEER', name: 'Winston-Salem', minutes: 75, bearing: 65, slug: 'winston-salem-nc', note: 'Bigger, east on I-40.' },
    { id: 'asheville', kind: 'PEER', name: 'Asheville', minutes: 80, bearing: 262, slug: 'asheville-nc', note: 'A different league over the mountains; the tour partner to the west.' },
    { id: 'spartanburg', kind: 'PEER', name: 'Spartanburg', minutes: 100, bearing: 235, slug: 'spartanburg-sc', note: 'A mill-town cousin to the south.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Union Square', route: 'downtown', note: 'A renovated rail-line center of breweries and restaurants; priced for visitors, hard on DIY.' },
    { id: 'kenworth', name: 'Kenworth and the close-in streets', route: 'old-side', note: 'Older houses and a few brick buildings near downtown; quiet and cheap, with neighbors as the limit.' },
    { id: 'ridgeview', name: 'Ridgeview', route: 'old-side', note: 'A historically Black neighborhood on the south side with its own civic history; not a venue district.' },
    { id: 'strips', name: 'the Highland and US 321 strips', route: 'campus', note: 'Strip malls, chains and a mall; where the kids actually hang out and rent a unit.' },
    { id: 'fairgrove', name: 'Fairgrove by the university', route: 'campus', note: 'Student rentals and a small bar-and-pizza pocket that empties in summer.' },
    { id: 'viewmont', name: 'Viewmont and the mill villages', route: 'work-side', note: 'Small frame mill houses with yards and carports; the best chance for a house show.' },
    { id: 'lake', name: 'Lake Hickory and the Catawba River', route: 'old-side', note: 'Lake houses and boat landings; backyard and bonfire shows.' },
    { id: 'edge-towns', name: 'the old plants out in the edge towns', route: 'work-side', note: 'Empty furniture and hosiery plants; the realistic warehouse show if the fire marshal does not come.' },
    { id: 'conover-hood', name: 'Newton and Conover', route: 'town:conover', note: 'Mill and furniture towns that are almost the same metro, with small-town halls and strip-mall kids.' },
    { id: 'longview-hood', name: 'Longview and Claremont', route: 'town:longview', note: 'Mill villages and suburbs at the edge of Hickory, with church halls and quiet streets.' }
  ],

  rooms: [
    { id: 'viewmont-house', kind: 'HOUSE', hood: 'viewmont', cap: 40, curfew: 1320, ac: false, outdoor: true, pressure: 50, start: true,
      note: 'A carport or yard in a small frame mill house. One neighbor can end the night.' },
    { id: 'kenworth-garage', kind: 'HOUSE', hood: 'kenworth', cap: 50, curfew: 1320, ac: false, pressure: 50,
      note: 'A garage or porch show on an older close-in street. The landlord and the next-door neighbor are the limit.' },
    { id: 'lake-yard', kind: 'HOUSE', hood: 'lake', cap: 80, curfew: 1380, ac: false, outdoor: true, pressure: 45,
      note: 'A lakeside backyard with a generator and a bonfire, in summer only. Weather and the lake-house neighbors decide it.' },
    { id: 'plant-bay', kind: 'DIY', hood: 'edge-towns', cap: 120, curfew: 1380, ac: false, pressure: 60, needs: ['VOUCH'],
      note: 'A bay in an empty plant with a borrowed PA. The fire marshal and the owner insurer end it.' },
    { id: 'strip-shop', kind: 'SHOP', hood: 'strips', cap: 60, curfew: 1260, ac: true,
      note: 'A rented unit or a shop floor on the strip doing early in-stores. Over by nine.' },
    { id: 'city-park', kind: 'OUTDOOR', hood: 'strips', cap: 100, curfew: 1260, ac: false, outdoor: true,
      note: 'A city park with a skate spot. Daylight only, and you need a city permit.' },
    { id: 'downtown-bar', kind: 'BAR', hood: 'downtown', cap: 100, curfew: 1500, ac: true,
      note: 'A bar with a stage downtown. Covers pay the rent, and punk gets a Monday if it asks.' },
    { id: 'heavy-club', kind: 'CLUB', hood: 'downtown', cap: 300, curfew: 1380, ac: true, ages: ['ALL', 'A18'],
      note: 'A big indoor room that touring punk, hardcore and metal bills actually use. Some nights are all ages, some are eighteen-plus.' },
    { id: 'rail-stage', kind: 'BIG', hood: 'downtown', cap: 1500, curfew: 1350, ages: ['ALL'], ac: false, outdoor: true,
      note: 'A city-run outdoor stage by the rail line. Punk is rare there, and the city sets the curfew.' },
    { id: 'highland-bar', kind: 'BAR', hood: 'strips', cap: 120, curfew: 1560, ac: true,
      note: 'A dive-bar stage on the Highland strip. It may book nothing but covers.' }
  ],

  contacts: ['asheville-nc', 'winston-salem-nc', 'greensboro-nc', 'spartanburg-sc'],

  calendar: [
    { id: 'heritage-weekend', label: 'the downtown German-heritage weekend', tag: 'festival', month: 10, week: 2, dows: [4, 5, 6], can: [0.8, 0.75, 0.75], hoods: ['downtown'], elsewhere: [1, 0.97, 0.97] },
    { id: 'spring-beer', label: 'the spring beer weekend', tag: 'festival', month: 4, week: 2, dows: [5], can: [0.9, 0.85, 0.85], hoods: ['downtown'], elsewhere: [1, 0.97, 0.97] },
    { id: 'holiday-parade', label: 'the downtown holiday parade and tree lighting', tag: 'parade', month: 11, weeks: [3, 4], dows: [4], can: [0.85, 0.88, 0.92], hoods: ['downtown'], elsewhere: [1, 0.97, 0.97] },
    { id: 'heavy-day', label: 'the all-day heavy festival', tag: 'festival', month: 8, week: 1, dows: [5], can: [0.8, 0.8, 0.8], hoods: ['downtown'], elsewhere: [0.92, 0.9, 0.9] },
    { id: 'football-sep', label: 'high-school football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [0.85, 0.9, 0.9] },
    { id: 'football-oct', label: 'high-school football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [0.85, 0.9, 0.9] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.1] }
  ],

  tilt: [
    { fan: 'metal', band: 'metal', d: .06, reason: 'A yearly faith-based heavy festival brings the metalcore kids out to the big club.' }
  ],

  points: [
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 2700000 },
    { name: 'Knoxville', state: 'TN', lat: 35.96, lon: -83.92, pop: 870000 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64, pop: 1500000 },
    { name: 'Gastonia', state: 'NC', lat: 35.26, lon: -81.19, pop: 80000 }
  ],
  roads: ['I-40', 'US 321', 'US 70', 'NC 16', 'NC 127', 'NC 18'],

  words: {
    street: ['US 70', 'Highway 321', 'Springs Road', 'Main Avenue', 'Highland Avenue'],
    water: ['Lake Hickory', 'the Catawba River', 'Lake Rhodhiss'],
    hood: ['Kenworth', 'Ridgeview', 'Viewmont', 'Highland', 'Fairgrove', 'Longview', 'Claremont'],
    thing: ['carport', 'hushpuppy', 'red slaw', 'vinegar barbecue', 'hosiery mill', 'furniture showroom', 'fellowship hall', 'tractor supply', 'drive-through', 'couch factory'],
    weather: ['thunderstorm', 'ice storm', 'red clay mud']
  },

  events: [
    { id: 'HICKORY_NC_HERITAGE_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The heritage festival is taking over downtown, and every lot near the club is full.',
      title: 'The festival takes downtown',
      body: 'A festival has taken over downtown for the weekend. The only room open is the big club, and every local band wants the Saturday opener.',
      options: [
        { id: 'LATE', label: 'Push doors back until the festival winds down', likely: 'Later, and the crowd that wants a real show finds you.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors opened an hour late, and the crowd came in from the street, loud and happy.' },
        { id: 'HALL', label: 'Move the bill to a church hall in Longview', likely: 'Smaller, quieter and over early.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A hall in Longview took the bill, and the floor was packed.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the festival.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The casual crowd stayed on the street, and the regulars came.' }
      ] },

    { id: 'HICKORY_NC_LAKE_STORM', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [6, 7, 8, 9] },
      telegraph: 'A thunderstorm is rolling up the Catawba, and the lake-house neighbors are already looking out their windows.',
      title: 'Thunder on the lake',
      body: 'A thunderstorm rolled up the river, the generator is flooding, and the next-door lake-house owner is on the phone about the noise.',
      options: [
        { id: 'GARAGE', label: 'Move it into a garage', likely: 'Smaller and louder, and dry.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A garage in town took the bill, and the floor was packed.' },
        { id: 'WAIT', label: 'Wait for the storm to pass', likely: 'The start is late, and the crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 75 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The storm passed by ten, and you started late but nobody left.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'The neighbor may keep calling.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The generator coughed, the neighbor called twice, and half the list went home.' }
      ] },

    { id: 'HICKORY_NC_PARADE_FRIDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'The holiday parade is Friday, and downtown will be shut by four.',
      title: 'Downtown is shut',
      body: 'The parade has closed downtown and the kids are on the sidewalk. A hall in Longview is the only roof open for a show.',
      options: [
        { id: 'HALL', label: 'Move the bill to the hall in Longview', likely: 'Smaller, early, and a clean room.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'The hall took the bill, and the families stayed on to hear the bands.' },
        { id: 'LATE', label: 'Push doors back until the parade is over', likely: 'It\'s later than planned, and the crowd walks in from the street.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors opened an hour late, and the crowd came in from the parade, loud and happy.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The families are at the parade.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Half the room was at the parade, and the regulars came.' }
      ] }
  ]
});
