SB.Cities.register('fort-wayne-in', {
  v: 1,
  slug: 'fort-wayne-in',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['purdue fort wayne', 'ipfw', 'university of saint francis', 'saint francis', 'indiana tech', 'ivy tech', 'huntington university',
           'trine university', 'taylor university', 'manchester university', 'parkview field', 'three rivers festival', 'johnny appleseed festival',
           'johnny appleseed', 'germanfest', 'komets', 'war memorial coliseum', 'air national guard', 'steak n shake', 'summit city', 'city of churches',
           'magnet wire capital', 'vfw', 'american legion', 'the magnet room', 'wire mill hall', 'three rivers annex', 'calhoun basement', 'swinney carport',
           'maumee lanes back room', 'rudisill rec', 'summit city social hall', 'st. joe boiler house', 'broadway storage unit 14', 'lakeside porch', 'post 214 annex',
           'fort wayne pride', 'fort wayne philharmonic', 'arts united center', 'headwaters park', 'whatzup', 'wboi', 'northeast indiana public radio',
           'input fort wayne', 'journal gazette', 'news sentinel', 'wowo', 'visit fort wayne', 'allen county fair', 'allen county sheriff',
           'fort wayne police', 'indiana state police', 'brewed in the fort', 'tincaps', 'bandsintown', 'songkick', 'jambase'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['komets*', 'parkview field*', 'steak n shake*', 'johnny appleseed*', 'three rivers festival*', 'germanfest*'],

  blurb: ['Old heads still tell kids they missed the real scene. Rooms open, go sober or go dark, and the bar bills carry on.',
          'The big all-ages night is a ticketed anniversary show at the theater, not a basement.'],
  hard: 'Few DIY rooms left; the big theater is for touring names, not locals.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83.00 },
    { name: 'Cleveland', state: 'OH', lat: 41.50, lon: -81.69 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Fort Wayne' },
    { id: 'auburn', kind: 'FEEDER', name: 'Auburn', minutes: 25, bearing: 15, note: 'A small classic-car town up the highway; its kids drive down to the city.' },
    { id: 'columbia-city', kind: 'FEEDER', name: 'Columbia City', minutes: 25, bearing: 300, note: 'A rural commuter town to the northwest.' },
    { id: 'huntington', kind: 'FEEDER', name: 'Huntington', minutes: 30, bearing: 225, note: 'A county seat with a small college and a few local bands.' },
    { id: 'decatur', kind: 'FEEDER', name: 'Decatur', minutes: 30, bearing: 170, note: 'A farm town to the south.' },
    { id: 'bluffton', kind: 'FEEDER', name: 'Bluffton', minutes: 35, bearing: 195, note: 'A farm town with a small college, down the state road.' },
    { id: 'kendallville', kind: 'FEEDER', name: 'Kendallville and Garrett', minutes: 40, bearing: 25, note: 'Small factory and farm towns to the north.' },
    { id: 'angola', kind: 'FEEDER', name: 'Angola', minutes: 45, bearing: 5, note: 'A lake-country college town up the interstate; busier in summer.', season: { months: [6, 7, 8], mul: 1.4 } },
    { id: 'van-wert', kind: 'FEEDER', name: 'Van Wert', state: 'OH', minutes: 45, bearing: 100, note: 'An Ohio farm town; its kids drive west for shows.' },
    { id: 'warsaw', kind: 'FEEDER', name: 'Warsaw', minutes: 50, bearing: 295, note: 'A lake town of its own with a few small shows.' },
    { id: 'defiance', kind: 'FEEDER', name: 'Defiance', state: 'OH', minutes: 55, bearing: 60, note: 'A small Ohio college town to the northeast.' },
    { id: 'muncie', kind: 'PEER', name: 'Muncie', minutes: 80, bearing: 215, scene: 400, note: 'A college town with a strong DIY tradition that sees the bigger city as squarer.' },
    { id: 'south-bend', kind: 'PEER', name: 'South Bend', minutes: 90, bearing: 305, slug: 'south-bend-in', note: 'A bigger college and arts scene to the northwest.' },
    { id: 'toledo', kind: 'PEER', name: 'Toledo', state: 'OH', minutes: 105, bearing: 65, slug: 'toledo-oh', note: 'A close rival and the road to Detroit.' },
    { id: 'dayton', kind: 'PEER', name: 'Dayton', state: 'OH', minutes: 120, bearing: 150, slug: 'dayton-oh', note: 'Two hours south-east, with its own touring traffic.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Landing', route: 'downtown', note: 'A revived grid at the meeting of the rivers: bars with back rooms and a few short-lived pop-up spaces. Priced up and polished.' },
    { id: 'fairfield', name: 'the Fairfield Avenue corridor', route: 'old-side', note: 'Record shops, thrift, coffee and old brick houses with basements. The heart of house shows, heating up for years.' },
    { id: 'west-central', name: 'West Central and Lakeside', route: 'old-side', note: 'Big old Victorian houses cut into apartments. Basements and porches, with rents rising.' },
    { id: 'broadway', name: 'Broadway and the near south side', route: 'work-side', note: 'Cheap duplexes, corner stores and light-industrial units. Practice spaces and backyard shows, mostly ignored.' },
    { id: 'northeast', name: 'the northeast and Coliseum Boulevard', route: 'work-side', note: 'Postwar ranch houses, strip malls, church halls and rec rooms. Stable and unglamorous.' },
    { id: 'crescent', name: 'Crescent Avenue and the commuter campus', route: 'campus', note: 'Apartments and fast food around a commuter university. Risky apartment shows.' },
    { id: 'waynedale', name: 'Waynedale and the southwest', route: 'work-side', note: 'Working-class suburb with big yards: garage, carport and yard shows.' },
    { id: 'northwest', name: 'the northwest sprawl', route: 'campus', note: 'Affluent big-box suburbs. Nothing for shows but the parents\' basements.' }
  ],

  rooms: [
    { id: 'broadway-basement', kind: 'HOUSE', hood: 'broadway', cap: 50, curfew: 1350, ac: false, pressure: 55, start: true,
      note: 'A duplex basement on the near south side. One call to the non-emergency line ends the night.' },
    { id: 'fairfield-basement', kind: 'HOUSE', hood: 'fairfield', cap: 60, curfew: 1320, ac: false, pressure: 50,
      note: 'Old brick, low and damp, with one stairwell. The old heads swear the best nights were down here.' },
    { id: 'waynedale-yard', kind: 'HOUSE', hood: 'waynedale', cap: 70, curfew: 1350, ac: false, outdoor: true, pressure: 45,
      note: 'A garage and a big yard in the southwest. Warm months only, and the first storm or the first angry neighbor ends it.' },
    { id: 'vacant-storefront', kind: 'DIY', hood: 'downtown', cap: 120, curfew: 1380, ac: false, pressure: 55, needs: ['VOUCH'],
      note: 'A borrowed empty storefront downtown, the old way. The revival is pricing these buildings out.' },
    { id: 'practice-unit', kind: 'DIY', hood: 'broadway', cap: 80, curfew: 1380, ac: false, pressure: 55, needs: ['VOUCH'],
      note: 'A practice-space unit cleared for the night. The landlord and the fire marshal are the risk.' },
    { id: 'record-shop', kind: 'SHOP', hood: 'fairfield', cap: 40, curfew: 1260, ac: true,
      note: 'An in-store set among the racks on the avenue. Short and early, over by nine.' },
    { id: 'fellowship-hall', kind: 'HALL', hood: 'northeast', cap: 150, curfew: 1320, ac: true, owner: 'CHURCH_CONTACT', pressure: 45,
      note: 'A rented fellowship hall. Safe and sober, and the renter can say no to a loud or rude bill.' },
    { id: 'back-stage-bar', kind: 'BAR', hood: 'downtown', cap: 150, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A neighborhood bar with a stage in the back and punk bills most weeks. The owner holds the age line and it is 21.' },
    { id: 'entertainment-center', kind: 'CLUB', hood: 'northeast', cap: 300, ages: ['A18'], curfew: 1380, ac: true, owner: 'TALENT_BUYER', needs: ['FULL_BILL'],
      note: 'A big entertainment center out on the northeast side. The owner can close the bar to minors for the night.' },
    { id: 'music-hall', kind: 'CLUB', hood: 'downtown', cap: 400, ages: ['ALL'], curfew: 1410, ac: true, seated: true, owner: 'TALENT_BUYER', needs: ['FULL_BILL'],
      note: 'A nonprofit all-ages hall with seats. The building is the pull and the seats are the limit.' },
    { id: 'old-theater', kind: 'BIG', hood: 'downtown', cap: 2000, ages: ['ALL'], curfew: 1380, ac: true, owner: 'TALENT_BUYER',
      note: 'The revived theater. Touring names and anniversary nights, and not for a local band unless it opens.' },
    { id: 'southwest-lot', kind: 'OUTDOOR', hood: 'waynedale', cap: 100, curfew: 1260,
      note: 'A yard or a lot in the southwest, over by nine. A thunderstorm or the neighbors\' patience wipes it out.' }
  ],

  contacts: ['south-bend-in', 'toledo-oh', 'dayton-oh', 'indianapolis', 'lafayette-in'],

  calendar: [
    { id: 'river-festival', label: 'the river festival', tag: 'festival', month: 7, weeks: [2, 3], dows: [4, 5, 6], can: [.85, .80, .80], hoods: ['downtown'], elsewhere: [.95, .92, .92] },
    { id: 'apple-festival', label: 'the apple festival', tag: 'festival', month: 9, week: 3, dows: [5, 6], can: [.92, .90, .90] },
    { id: 'german-week', label: 'the German heritage week', tag: 'festival', month: 6, weeks: [1, 2], dows: [4, 5, 6], can: [.92, .90, .90], hoods: ['downtown'], elsewhere: [1, .98, .98] },
    { id: 'pride-weekend', label: 'the pride weekend', tag: 'festival', month: 7, week: 4, dows: [4, 5], can: [.90, .88, .88], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'football-sep', label: 'high school football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.88, 1, .97] },
    { id: 'football-oct', label: 'high school football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.88, 1, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1380, inForce: true } },

  points: [
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16, pop: 880000 },
    { name: 'Muncie', state: 'IN', lat: 40.19, lon: -85.39, pop: 65000 },
    { name: 'Lima', state: 'OH', lat: 40.74, lon: -84.11, pop: 35000 },
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05, pop: 630000 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 2700000 }
  ],
  roads: ['I-69', 'I-469', 'US 30', 'US 24', 'US 27', 'SR 930'],

  words: {
    street: ['Fairfield', 'Broadway', 'Calhoun Street', 'Coliseum Boulevard', 'Rudisill', 'Main Street', 'Lincoln Highway', 'Crescent Avenue'],
    water: ['the St. Marys', 'the St. Joseph', 'the Maumee'],
    hood: ['Fairfield', 'West Central', 'Lakeside', 'Southwood Park', 'Rudisill', 'South Wayne', 'Waynedale', 'Time Corners', 'Tillman'],
    thing: ['coney', 'tenderloin sandwich', 'church basement', 'fellowship hall', 'carport', 'bowling alley', 'community room', 'anniversary show', 'sober bar'],
    weather: ['lake-effect snow', 'muggy storm']
  },

  events: [
    { id: 'FORT_WAYNE_IN_RIVER_FESTIVAL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival', months: [7] },
      telegraph: 'The river festival opens Friday, and downtown is already full of fences and food trucks.',
      title: 'Fireworks night downtown',
      body: 'The festival has downtown for nine days. Your bill is in an empty storefront on the route to the fireworks, the crowd is walking past the door, and someone has called the fire marshal.',
      options: [
        { id: 'DOORS', label: 'Prop the doors and take the walk-ins', likely: 'A big crowd and a bigger risk.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.15 }, { op: 'MONEY', amount: -25 }],
          result: 'The street wandered in, and the marshal counted heads twice and let it slide.' },
        { id: 'EARLY', label: 'Start early and be done before the fireworks', likely: 'Most of your people get in first.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Doors were early and you were out by dark, and the people who came heard every set.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the festival crowd went home and a few of yours came.' }
      ] },

    { id: 'FORT_WAYNE_IN_NOISE_CALL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The upstairs neighbor on the near south side was out on the porch with a phone last week.',
      title: 'One call to the non-emergency line',
      body: 'At ten the police are on the porch, and the same night they are sweeping for kids under curfew. Half the room is fifteen.',
      options: [
        { id: 'CLOSE', label: 'End it on the spot and send everyone home', likely: 'A short night with no trouble, and the neighbors are quiet.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }, { op: 'REGULARS', pct: .02 }],
          result: 'The lights came on at ten, and nobody got a ride in a squad car.' },
        { id: 'QUIET', label: 'Switch to a quiet set and keep it going', likely: 'Half the room leaves anyway.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'It was two acoustic songs and a lot of whispering, and they were gone by eleven.' },
        { id: 'MOVE', label: 'Walk the bands to a yard across town', likely: 'A smaller crowd, a louder night, a risk.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A yard in the southwest took the bill, and it was packed until the first drops.' }
      ] },

    { id: 'FORT_WAYNE_IN_YARD_STORM', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [5, 6, 7, 8, 9] },
      telegraph: 'A muggy storm is lining up over the St. Marys and the yard show is outside.',
      title: 'The thunderstorm in Waynedale',
      body: 'The fellowship hall cancelled the bill over a band name, so it moved to a yard in the southwest. Now the sky has turned green and the amp is under a tarp.',
      options: [
        { id: 'GARAGE', label: 'Pull everything into the garage', likely: 'Smaller, louder, and wet.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .6 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'It was forty people in a two-car garage with the rain on the roof, and it was the best set of the night.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the storm blew over, and so did half the list.' },
        { id: 'ACCEPT', label: 'Run it outside and take what you get', likely: 'A lot of people stay home under a storm.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'The people who came held the tarp, and the amp survived.' }
      ] }
  ]
});
