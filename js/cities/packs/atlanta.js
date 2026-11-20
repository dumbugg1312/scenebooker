SB.Cities.register('atlanta', {
  v: 1,
  slug: 'atlanta',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['dragon con', 'peachtree road race', 'inman park festival', 'atlanta jazz festival', 'shaky knees', 'east atlanta strut', 'candler park fall fest', 'sweet auburn music festival',
           'creative loafing', 'ajc', 'atlanta journal-constitution', 'artsatl', 'rough draft atlanta', 'waffle house', 'marta', 'atlanta streetcar', 'the varsity',
           'atlanta falcons', 'falcons', 'atlanta united', 'atlanta hawks', 'atlanta braves', 'braves', 'georgia tech', 'georgia state', 'emory', 'atlanta university center',
           'agnes scott', 'kennesaw state', 'savannah college of art', 'scad', 'fort benning', 'fort moore', 'coca-cola', 'cop city', 'hurricane helene', 'helene',
           'the dome', 'georgia dome', 'oakland warehouse fire', 'ghost ship',
           'peachtree wire co', 'the red clay room', 'kudzu cathedral annex', 'spaghetti junction social', 'the crawlspace', 'cardiac hill rec hall', 'the perimeter club',
           'gulch street garage', 'buford backlot', 'pecan hall lodge', 'the dogwood basement', 'mill village gym', 'flat shoals fellowship hall', 'the humid room', 'southern rail annex'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Game text says "the sci-fi convention", "the big road race", "the train", "the weekly paper". */
  blocklist: ['dragon con*', 'peachtree road race*', 'creative loafing*', 'waffle house*', 'marta*', 'shaky knees*', 'artsatl*', 'the varsity*'],

  blurb: ['The one big city for a hundred miles of small towns: a sprawling, car-dependent place where the underground is scattered by price, not taste.',
          'Rooms close, rents climb, and the shows keep turning up in a house with a ticket link and a door person. Everyone knows everyone, and the neighbors know too.'],
  hard: 'Few rooms, rising rent, strict ID checks and an eleven o\'clock cutoff.',
  region: 'the Southeast',
  houseType: 'LIVING_ROOM',
  whereGo: [
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'crust', d: .10, reason: 'A city with a long memory for hardcore, crust and a fast Southern sound.' },
    { fan: 'crust', band: 'hardcore', d: .10, reason: 'A city with a long memory for hardcore, crust and a fast Southern sound.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Atlanta' },
    { id: 'newnan', kind: 'FEEDER', name: 'Newnan', minutes: 45, bearing: 215, beyond: 'connector', pop: 43000, note: 'A tidy horse-country commuter town to the southwest. Nothing to do, so the kids drive up.' },
    { id: 'griffin', kind: 'FEEDER', name: 'Griffin', minutes: 45, bearing: 185, beyond: 'connector', pop: 23000, note: 'An old mill and rail town south of the airport.' },
    { id: 'cartersville', kind: 'FEEDER', name: 'Cartersville', minutes: 50, bearing: 330, beyond: 'connector', pop: 24000, note: 'A mill and farm town on the highway north. Atlanta is the nearest real city.' },
    { id: 'carrollton', kind: 'FEEDER', name: 'Carrollton', minutes: 60, bearing: 255, pop: 27000, note: 'A west Georgia college town with a small downtown and a small DIY scene.' },
    { id: 'gainesville', kind: 'FEEDER', name: 'Gainesville', minutes: 60, bearing: 20, pop: 44000, note: 'A poultry and lake city to the north, with a large Latino community and a lake-boat culture.' },
    { id: 'dahlonega', kind: 'FEEDER', name: 'Dahlonega', minutes: 75, bearing: 5, pop: 7000, note: 'A mountain college and wine town. Anything loud means a drive to Atlanta.' },
    { id: 'lagrange', kind: 'FEEDER', name: 'LaGrange', minutes: 70, bearing: 235, pop: 31000, note: 'A textile mill town with a college and an old-economy feel.' },
    { id: 'rome', kind: 'FEEDER', name: 'Rome', minutes: 80, bearing: 305, pop: 37000, note: 'A mill and small-college town in the northwest hills. Some bands, few rooms, and it floods.' },
    { id: 'athens', kind: 'PEER', name: 'Athens', minutes: 75, bearing: 70, slug: 'athens-ga', note: 'The college music town to the east. Strong scene of its own, and kids go both ways.' },
    { id: 'macon', kind: 'PEER', name: 'Macon', minutes: 90, bearing: 155, scene: 3000, note: 'A historic soul and rock town with a small scene of its own and a college crowd.' },
    { id: 'columbus', kind: 'PEER', name: 'Columbus', minutes: 110, bearing: 205, slug: 'columbus-ga', note: 'A river city beside an army post. Military kids and a small scene.' },
    { id: 'chattanooga', kind: 'PEER', name: 'Chattanooga', state: 'TN', minutes: 120, bearing: 335, slug: 'chattanooga-tn', note: 'A scene city with its own rooms. It sends bands south and takes Atlanta bands up.' }
  ],

  chokepoints: [
    { id: 'connector', name: 'the Downtown Connector', p: .03 }
  ],

  hoods: [
    { id: 'l5p', name: 'Little Five Points', route: 'old-side', note: 'The old punk, goth and hippie center, now a village of vintage shops, tattoo parlors and tourists. Commercial rents and patrols; the bungalows around it hold the houses.' },
    { id: 'eav', name: 'East Atlanta Village', route: 'downtown', note: 'A small main street of bars and music rooms with cottages behind. The default for a bar-sized, all-ages punk bill, and priced hot.' },
    { id: 'eastside', name: 'Edgewood, Old Fourth Ward and Cabbagetown', route: 'downtown', note: 'The bar strip and the old mill village by the BeltLine. The textbook gentrification case; most of the cheap rooms are gone or gutted.' },
    { id: 'kirkwood', name: 'Kirkwood, East Lake and Candler Park', route: 'old-side', note: 'Small bungalows on sloping lots, some with half-basements. House shows here depend on tolerant neighbors.' },
    { id: 'decatur', name: 'Decatur', route: 'campus', note: 'A separate town east with a women\'s college and a walkable square. Quiet, orderly all-ages houses with ID checks and an eleven o\'clock end.' },
    { id: 'west-end', name: 'West End and the Southwest', route: 'work-side', note: 'Historic Black neighborhoods of Victorians, bungalows, rail yards and warehouses. Cheap becoming heated, with real displacement politics.' },
    { id: 'midtown', name: 'Midtown and Home Park', route: 'campus', note: 'High-rises, the big rooms and the engineering school, with student bungalows next door. Priced out; most DIY lives elsewhere.' },
    { id: 'downtown', name: 'Downtown and Castleberry Hill', route: 'downtown', note: 'Warehouse lofts, old railroad brick and a convention and stadium economy. Warehouse and gallery rooms keep getting closed or sold.' },
    { id: 'buford', name: 'Buford Highway and Doraville', route: 'work-side', note: 'A long immigrant-run commercial strip with practice warehouses and cheap apartments. Not a show neighborhood, but where the bands eat and rehearse.' },
    { id: 'marietta-blvd', name: 'Marietta Boulevard and the Westside industrial belt', route: 'work-side', note: 'Rail, river and warehouses northwest of downtown: practice rooms, studios and the occasional warehouse show.' }
  ],

  rooms: [
    { id: 'kirkwood-house', kind: 'HOUSE', hood: 'kirkwood', cap: 55, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 20, standing: [70, 60, 45],
      pressure: 50, start: true, note: 'A bungalow with a half-basement and a yard. The neighbors are tolerant until eleven.' },
    { id: 'l5p-bungalow', kind: 'HOUSE', hood: 'l5p', cap: 45, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: true, sketch: 20, standing: [70, 55, 45],
      pressure: 50, note: 'A practice house on a bungalow street near the village. Porch and carport shows; the neighbors know it all.' },
    { id: 'eav-carport', kind: 'HOUSE', hood: 'eav', cap: 50, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: true, sketch: 25, standing: [65, 60, 45],
      pressure: 50, note: 'A cottage with a backyard and a carport behind the main street. Summer storms are the only real enemy.' },
    { id: 'decatur-house', kind: 'HOUSE', hood: 'decatur', cap: 40, hostCut: 0, pa: .3, curfew: 1380, ac: false, outdoor: false, sketch: 10, standing: [70, 55, 55],
      pressure: 45, note: 'A polite residential room: tickets at the door, ID checked, and over by eleven so the street stays friendly.' },
    { id: 'southwest-yard', kind: 'OUTDOOR', hood: 'west-end', cap: 80, rent: 10, pa: .4, curfew: 1320, sketch: 30, standing: [60, 55, 40],
      note: 'A big backyard in the Southwest. Warm evenings, and the whole thing moves under a tarp when it rains.' },
    { id: 'church-hall', kind: 'HALL', hood: 'decatur', cap: 100, rent: 80, deposit: 50, pa: .5, curfew: 1320, ac: true, sketch: 5, standing: [65, 60, 60],
      owner: 'CHURCH_CONTACT', pressure: 50, note: 'A fellowship hall east of the city. Wants a deposit, a sober adult and proof of insurance, and no beer.' },
    { id: 'vets-hall', kind: 'HALL', hood: 'west-end', cap: 160, rent: 200, deposit: 75, pa: .6, curfew: 1380, ac: true, sketch: 15, standing: [55, 60, 70],
      owner: 'HALL_MANAGER', note: 'A veterans\' hall near the airport. A flat fee, folding chairs and a long list of rules.' },
    { id: 'westside-warehouse', kind: 'DIY', hood: 'marietta-blvd', cap: 150, rent: 90, deposit: 0, pa: .6, curfew: 1440, ac: false, sketch: 45, standing: [55, 60, 45], pressure: 60,
      needs: ['VOUCH'], note: 'A warehouse bay on the rail line. Great while it lasts; one inspection or sale ends it.' },
    { id: 'downtown-gallery', kind: 'DIY', hood: 'downtown', cap: 100, rent: 80, deposit: 0, pa: .5, curfew: 1440, ac: false, sketch: 40, standing: [55, 60, 45], pressure: 60,
      needs: ['VOUCH'], note: 'A second-floor gallery in an old brick building. The fire code is the quiet worry.' },
    { id: 'rehearsal-block', kind: 'DIY', hood: 'buford', cap: 70, rent: 50, deposit: 0, pa: .5, curfew: 1440, ac: true, sketch: 30, standing: [55, 55, 45], pressure: 50,
      needs: ['VOUCH'], note: 'A rehearsal warehouse where shows happen after hours, by accident, on the right nights.' },
    { id: 'records', kind: 'SHOP', hood: 'l5p', cap: 40, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'The record store in the village. In-stores in the afternoon, over by seven.' },
    { id: 'eav-bar', kind: 'BAR', hood: 'eav', cap: 120, soundFee: 60, pa: .7, ages: ['ALL', 'A21'], matinee: true, curfew: 1560, ac: true, following: .3, sketch: 15,
      standing: [50, 65, 70], note: 'A bar on the main street with a stage and wristbands for the under-21s.' },
    { id: 'eastside-bar', kind: 'BAR', hood: 'eastside', cap: 100, soundFee: 40, pa: .6, ages: ['ALL', 'A21'], curfew: 1500, ac: true, following: .3, sketch: 10,
      standing: [50, 65, 70], note: 'A bar on the Edgewood strip with a back room. It wants a quiet night and an early finish.' },
    { id: 'club', kind: 'CLUB', hood: 'midtown', cap: 450, houseCosts: 220, split: .8, pa: .9, ages: ['A21', 'A18'], curfew: 1560, ac: true, following: .6, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The legal room that wants a name and six weeks, and the touring crowd it brings.' }
  ],

  contacts: ['athens-ga', 'chattanooga-tn', 'columbus-ga', 'augusta-ga', 'savannah-ga'],

  weather: { preset: 'SOUTHEAST', fineMonths: [4, 10], coolMonths: [11] },

  calendar: [
    { id: 'convention', label: 'the big sci-fi convention weekend', tag: 'convention', month: 9, week: 1, dows: [4, 5, 6, 0], can: [.85, .85, .88], hoods: ['downtown', 'midtown'], elsewhere: [.97, .97, .97] },
    { id: 'road-race', label: 'the Fourth of July road race', tag: 'race', month: 7, week: 1, dows: [0, 1, 2, 3, 4, 5, 6], can: [.90, .90, .92], hoods: ['midtown'], elsewhere: [.97, .97, .97] },
    { id: 'neighborhood-festival', label: 'the spring neighborhood festival', tag: 'festival', month: 4, week: 4, dows: [4, 5, 6], can: [.90, .92, .92], hoods: ['eastside', 'l5p'], elsewhere: [.97, .97, .97] },
    { id: 'jazz-fest', label: 'the park jazz festival', tag: 'festival', month: 5, week: 4, dows: [5, 6, 0], can: [.95, .90, .90], hoods: ['midtown'], elsewhere: [1, 1, 1] },
    { id: 'juneteenth', label: 'Juneteenth', tag: 'holiday', month: 6, week: 3, dows: [0, 1, 2, 3, 4, 5, 6], can: [.95, .95, .95], hoods: ['west-end', 'downtown'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend in the village', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1], hoods: ['l5p'], elsewhere: [1.03, 1.02, 1] },
    { id: 'football-fall', label: 'college football Saturday', tag: 'game', month: 10, weeks: [2, 4], dows: [5], can: [.92, .95, .95] },
    { id: 'thanksgiving', label: 'Thanksgiving weekend', tag: 'holiday', month: 11, week: 4, dows: [3, 4, 5, 6], can: [.65, .85, .85] },
    { id: 'january', label: 'the dead weeks of January', tag: 'holiday', month: 1, week: 1, dows: [4, 5, 6], can: [.75, .85, .90] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1440, inForce: false }, quiet: 1380 },

  points: [
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.80, pop: 1100000 },
    { name: 'Greenville', state: 'SC', lat: 34.85, lon: -82.40, pop: 930000 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 2700000 },
    { name: 'Montgomery', state: 'AL', lat: 32.38, lon: -86.30, pop: 390000 }
  ],
  roads: ['I-75', 'I-85', 'I-20', 'I-285', 'GA-400', 'the Downtown Connector'],

  words: {
    street: ['Moreland Avenue', 'Flat Shoals Avenue', 'Edgewood Avenue', 'Ponce de Leon Avenue', 'Marietta Boulevard', 'Buford Highway', 'Memorial Drive', 'Peachtree Street', 'McLendon Avenue', 'Euclid Avenue'],
    water: ['the Chattahoochee', 'South River', 'Peachtree Creek', 'Lake Claire'],
    hood: ['Little Five Points', 'East Atlanta', 'Old Fourth Ward', 'Cabbagetown', 'Reynoldstown', 'Kirkwood', 'East Lake', 'Candler Park', 'Lake Claire', 'West End', 'Pittsburgh', 'Mechanicsville',
           'Adair Park', 'Castleberry Hill', 'Home Park', 'Doraville', 'Chamblee'],
    thing: ['bungalow', 'crawlspace', 'kudzu', 'red clay', 'pecan', 'carport', 'screened porch', 'tall pine', 'rail yard', 'ticket link', 'gallery', 'benefit show'],
    weather: ['heat index', 'afternoon thunderstorm', 'ice storm', 'pollen'],
    surnames: ['Johnson', 'Williams', 'Brown', 'Jackson', 'Harris', 'Nguyen', 'Garcia', 'Kim', 'Patel', 'Bryant']
  },

  events: [
    { id: 'ATLANTA_CONVENTION_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'convention' },
      telegraph: 'The big convention is coming. Every downtown hotel is full.',
      title: 'Costumes everywhere',
      body: 'The convention has taken over downtown. Every bar is full of strangers in armor, parking is gone, and one of them wanders in and asks to sit in.',
      options: [
        { id: 'WELCOME', label: 'Welcome the strangers and give them a slot', likely: 'A weird, loud night. A few of them become regulars.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.05 }, { op: 'REGULARS', pct: .02 }],
          result: 'A full armor suit played a song with the openers. It was the best photo of the year.' },
        { id: 'ACCEPT', label: 'Run it as planned and ignore them', likely: 'Parking and the streets cost you a third of the crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'Half the list never found a place to park.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'ATLANTA_ROAD_RACE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'race' },
      telegraph: 'The road race closes Peachtree on the Fourth, and the van needs that road.',
      title: 'The road race has the street',
      body: 'Thousands of runners have closed the main road the touring van needs. The band has to park a long way off and walk their gear through the crowd.',
      options: [
        { id: 'EARLY', label: 'Tell them to park early and walk', likely: 'Everyone gets in. Doors an hour early.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .95 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'The band parked a mile off and walked through the runners. They were on time.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'A lot of people give up on the closures.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .78 }],
          result: 'The street stayed shut. The list thinned out by seven.' }
      ] },

    { id: 'ATLANTA_BACKYARD_STORM', when: 'WEEK', tier: 'HARD', weight: 3, cooldown: 35, bind: ['show'],
      if: { daysOut: [0, 2], weather: 'RAIN', months: [6, 7, 8, 9] },
      telegraph: 'A thunderstorm is building over the city every afternoon this week.',
      title: 'The storm takes the power',
      body: 'A summer thunderstorm has knocked out the power to the street, and the backyard show is drowning. Somebody has a generator, and a carport.',
      options: [
        { id: 'CARPORT', label: 'Move it to the carport on the generator', likely: 'Smaller and louder, a little dangerous.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'The band played in the carport on a generator. Everybody was soaked and happy.' },
        { id: 'WAIT', label: 'Wait it out', likely: 'The storm passes, and half the crowd is gone.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }, { op: 'SHOW_MOD', key: 'lateMin', v: 60 }],
          result: 'The storm passed at ten. The few who stayed got a late, slow night.' },
        { id: 'CANCEL', label: 'Call it off', likely: 'Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You pushed it a day. The ones who could come, came.' }
      ] },

    { id: 'ATLANTA_DECATUR_COMPLAINT', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [3, 4, 5, 9, 10, 11] },
      telegraph: 'A neighbor in Decatur has been looking at the street a lot lately.',
      title: 'The neighbor calls at ten fifty',
      body: 'A neighbor has called in a noise complaint at ten fifty, and the show is not over. The house has an eleven o\'clock rule for a reason.',
      options: [
        { id: 'PORCH', label: 'Finish on the porch with an acoustic set', likely: 'The neighbor is satisfied. A smaller, nicer night.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .7 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'The set moved to the porch and the street slept through it.' },
        { id: 'END', label: 'End it early, with an apology', likely: 'Safe. Costs a little goodwill with the bands.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The show ended at eleven sharp. The neighbor waved from the window.' },
        { id: 'RISK', label: 'Keep playing', likely: 'The police come. Costs forty dollars.',
          effects: [{ op: 'MONEY', amount: -40 }],
          result: 'The police stopped by at eleven twenty and the night ended with a fine.' }
      ] }
  ]
});
