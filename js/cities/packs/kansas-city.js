SB.Cities.register('kansas-city', {
  v: 1,
  slug: 'kansas-city',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of missouri-kansas city', 'umkc', 'university of kansas', 'kansas state', 'johnson county community college', 'jccc', 'the pitch', 'kansas city star',
           'kansas city magazine', 'kcur', 'kkfi', 'kansas city chiefs', 'chiefs', 'kansas city royals', 'royals', 'sporting kc', 'arrowhead', 'kauffman', 'cerner', 'hallmark',
           'burns & mcdonnell', 'garmin', 'kansas city barbecue society', 'american royal', 'plaza lights', 'worlds of fun', 'union station', 'power and light', 't-mobile center',
           'startland news', 'kctv', 'kshb', 'kmbc', 'fox4', 'unmkc', 'country club plaza', 'zona rosa', 'nelson-atkins', 'national wwi museum', 'liberty memorial',
           'pridefest', 'irish fest', 'art westport', 'plaza art fair', 'kansas city filmfest', 'dancefestopia', 'boom in the bottoms', 'crossroads night market',
           'fifa world cup', 'world cup', 'make music day', 'municode', 'fort leavenworth', 'buck o\'neill bridge', 'heart of america bridge'],
  blocklist: ['kansas city star*', 'the pitch kansas city*', 'kcur*', 'kansas city chiefs*', 'kansas city royals*', 'hallmark cards*', 'american royal*', 'arrowhead stadium*'],

  blurb: ['Warehouses in the bottoms and house venues carry a punk scene that never keeps a room long. Rock-and-punk runs deep here, and a house named for a joke is usually gone by next summer.',
          'The state line splits the kids, half of whom live in Kansas, and nobody can park.'],
  hard: 'Rooms last a year or two, all-ages spots are rare, and parking is worse.',
  region: 'the Plains',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.2 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 }
  ],

  tilt: [
    { fan: 'street-punk', band: 'garage', d: .06, reason: 'A long rock-and-punk tradition, and mid-paced punk still fills a room.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Kansas City' },
    { id: 'overland-park', kind: 'FEEDER', name: 'Overland Park', state: 'KS', minutes: 20, bearing: 190, note: 'Suburban kids with cars; an old all-ages coffeehouse scene.' },
    { id: 'independence', kind: 'FEEDER', name: 'Independence', minutes: 20, bearing: 95, scene: 60, note: 'An east-side suburb.' },
    { id: 'liberty', kind: 'FEEDER', name: 'Liberty', minutes: 20, bearing: 20, beyond: 'river-bridges', note: 'A north suburb across the river.' },
    { id: 'lees-summit', kind: 'FEEDER', name: 'Lee\'s Summit', minutes: 25, bearing: 130, note: 'A southeast suburb.' },
    { id: 'olathe', kind: 'FEEDER', name: 'Olathe', state: 'KS', minutes: 30, bearing: 215, note: 'A suburb in Kansas.' },
    { id: 'leavenworth', kind: 'FEEDER', name: 'Leavenworth', state: 'KS', minutes: 40, bearing: 335, beyond: 'river-bridges', note: 'A river town of military and prison jobs.' },
    { id: 'st-joseph', kind: 'FEEDER', name: 'St. Joseph', minutes: 60, bearing: 335, beyond: 'river-bridges', note: 'A small town up the river.' },
    { id: 'lawrence', kind: 'PEER', name: 'Lawrence', state: 'KS', minutes: 45, bearing: 275, slug: 'lawrence-ks', note: 'A college-town scene with its own legends. Kids drive back and forth.' },
    { id: 'columbia', kind: 'PEER', name: 'Columbia', minutes: 120, bearing: 85, slug: 'columbia-mo', note: 'A campus town to the east.' },
    { id: 'omaha', kind: 'PEER', name: 'Omaha', state: 'NE', minutes: 180, bearing: 340, slug: 'omaha', note: 'A bigger scene up I-29.' }
  ],

  chokepoints: [
    { id: 'river-bridges', name: 'the Missouri River bridges', p: .03 }
  ],

  hoods: [
    { id: 'midtown', name: 'Midtown and Westport', route: 'downtown', note: 'Bars, rooms and the nightlife strip. Midtown house shows kept things alive in lean years.' },
    { id: 'crossroads', name: 'the Crossroads', route: 'downtown', note: 'Warehouses and galleries, with rents rising.' },
    { id: 'west-bottoms', name: 'the West Bottoms', route: 'work-side', note: 'Empty brick warehouses by the river. An all-ages punk room lasted about a year.' },
    { id: 'northeast', name: 'the Historic Northeast', route: 'old-side', note: 'Cheap old houses, many immigrants, DIY basements.' },
    { id: 'troost', name: 'the Troost Corridor', route: 'old-side', note: 'The dividing street. An old DIY venue stood on it.' },
    { id: 'stadium-drive', name: 'the Stadium Drive area', route: 'work-side', note: 'Industrial sprawl east of the sports complexes, with a DIY punk club in a warehouse.' },
    { id: 'waldo', name: 'Waldo and Brookside', route: 'old-side', note: 'South-side bungalows.' },
    { id: 'kck', name: 'Strawberry Hill and KCK', route: 'work-side', note: 'Across the state line. Working class.' },
    { id: 'johnson-county', name: 'Johnson County', route: 'campus', note: 'Suburban kids, and a past of coffeehouse all-ages shows.' },
    { id: 'independence-hood', name: 'Independence', route: 'town:independence', note: 'Older east-side houses with basements, a drive from anywhere. A little scene lives out here.' }
  ],

  rooms: [
    { id: 'midtown-basement', kind: 'HOUSE', hood: 'northeast', cap: 40, curfew: 1350, ac: false, outdoor: false, pressure: 55, start: true,
      note: 'A basement in an old frame house. The neighbors and the night noise limit are the threat, and the houses that came before it are mostly gone.' },
    { id: 'east-basement', kind: 'HOUSE', hood: 'independence-hood', cap: 50, curfew: 1380, ac: false, outdoor: false, pressure: 45,
      note: 'A basement out on the east edge, a long drive from anywhere. Nobody complains, because nobody is close.' },
    { id: 'stadium-club', kind: 'DIY', hood: 'stadium-drive', cap: 200, curfew: 1500, ac: true, pressure: 35,
      note: 'A sticker-covered punk club, bar and coffee shop in a warehouse zone. Nobody lives next door, so rent and keeping the doors open are the threat.' },
    { id: 'bottoms-warehouse', kind: 'DIY', hood: 'west-bottoms', cap: 150, curfew: 1380, ac: false, pressure: 60,
      note: 'A brick warehouse behind a bay door with queer and POC punk nights. Rooms like it fold over rent and upkeep.' },
    { id: 'suburb-hall', kind: 'HALL', hood: 'johnson-county', cap: 120, curfew: 1320, ac: true,
      note: 'A rented hall or church room. Kids with cars come across the state line, if it is still available.' },
    { id: 'back-room', kind: 'SHOP', hood: 'midtown', cap: 60, curfew: 1260, ac: true,
      note: 'A shop back room with a couch and a PA. An early-evening room.' },
    { id: 'westport-bar', kind: 'BAR', hood: 'midtown', cap: 200, ages: ['A21'], curfew: 1530, ac: true,
      note: 'A Westport strip bar with a stage and punk and hardcore bills. The summer youth curfew works against any all-ages night.' },
    { id: 'midtown-club', kind: 'CLUB', hood: 'midtown', cap: 300, ages: ['A18'], curfew: 1470, ac: true, needs: ['FULL_BILL'],
      note: 'A mid-size club for punk and hardcore bills. Eighteen and up with ID, and minors with a guardian.' },
    { id: 'kck-club', kind: 'CLUB', hood: 'kck', cap: 350, ages: ['A18'], curfew: 1470, ac: true, needs: ['FULL_BILL'],
      note: 'A club across the state line where the door policy is the owner\'s own. A real touring date for hardcore.' },
    { id: 'downtown-theatre', kind: 'BIG', hood: 'crossroads', cap: 1000, ages: ['A18'], curfew: 1380, ac: true,
      note: 'A downtown theatre where the big touring names land. Local bands almost never get on the bill.' },
    { id: 'park-pavilion', kind: 'OUTDOOR', hood: 'midtown', cap: 400, curfew: 1140,
      note: 'A park pavilion or a lot behind a Westport building. Summer only, in daylight, and over by seven.' }
  ],

  contacts: ['lawrence-ks', 'columbia-mo', 'omaha', 'st-louis', 'wichita-ks'],

  calendar: [
    { id: 'pride-weekend', label: 'the Pride parade and festival', tag: 'parade', month: 6, week: 1, dows: [4, 5, 6], can: [.85, .80, .80], hoods: ['midtown'], elsewhere: [1, .97, .97] },
    { id: 'july-fireworks', label: 'the Fourth of July fireworks', tag: 'holiday', month: 7, week: 1, dows: [4, 5, 6], can: [.85, .80, .85], hoods: ['west-bottoms', 'crossroads'], elsewhere: [.97, .95, .97] },
    { id: 'art-weekend', label: 'the Westport art weekend', tag: 'festival', month: 9, week: 2, dows: [4, 5, 6], can: [.90, .85, .85], hoods: ['midtown'], elsewhere: [1, .97, .97] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [6], can: [.88, .95, .95], hoods: ['stadium-drive'], elsewhere: [1, .97, .97] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [6], can: [.88, .95, .95], hoods: ['stadium-drive'], elsewhere: [1, .97, .97] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 5], dows: [6], can: [.88, .95, .95], hoods: ['stadium-drive'], elsewhere: [1, .97, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] },
    { id: 'lights-night', label: 'the holiday lights night', tag: 'holiday', month: 11, week: 4, dows: [3], can: [.85, .88, .88], hoods: ['midtown', 'waldo'], elsewhere: [1, .97, .97] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1380, weekend: 1440, inForce: true } },

  points: [
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.2, pop: 2800000 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99, pop: 2960000 },
    { name: 'Des Moines', state: 'IA', lat: 41.59, lon: -93.62, pop: 710000 },
    { name: 'Wichita', state: 'KS', lat: 37.69, lon: -97.34, pop: 650000 }
  ],
  roads: ['I-70', 'I-35', 'I-29', 'I-435', 'I-670'],

  words: {
    street: ['Troost Avenue', 'Main Street', 'Broadway Boulevard', 'Westport Road', 'Southwest Boulevard', 'State Line Road'],
    water: ['the Missouri River', 'the Kansas River'],
    hood: ['Westport', 'the Crossroads', 'the West Bottoms', 'Waldo', 'Brookside', 'Strawberry Hill', 'Northeast'],
    thing: ['barbecue', 'bay door', 'boulevard', 'siren', 'rail yard'],
    weather: ['tornado siren', 'ice storm']
  },

  events: [
    { id: 'KANSAS_CITY_BRIDGE_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Crews are working on the river bridges to the north this week.',
      title: 'The river bridge is closed',
      body: 'A wreck has shut one of the bridges over the Missouri, and the other is backed up for a mile. Everyone coming from the north side is stuck.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it, but the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'You moved doors up an hour, and the people who really wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'You lose most of the people who have to cross the river.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The bridge stayed shut, and the north side stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'It takes two hours of your day, but most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads took the long way around together.' }
      ] },

    { id: 'KANSAS_CITY_SUMMER_CURFEW', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], months: [5, 6, 7, 8, 9] },
      telegraph: 'The summer youth curfew is on, and the strip empties of kids at nine.',
      title: 'Nine o\'clock on Westport',
      body: 'The summer curfew pushes anyone under eighteen out of the entertainment district by nine. Your all-ages bill starts at eight.',
      options: [
        { id: 'EARLY', label: 'Start at six and finish before nine', likely: 'Short bills and early doors, and most of the kids make it.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -120 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors were at six and the bill was short and fast, and the kids were out the door before nine.' },
        { id: 'MOVE', label: 'Move the whole bill to a basement', likely: 'Smaller and louder, out of the district.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A basement outside the district took the bill, and the kids walked home late and happy.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The kids are gone by nine.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'Half the room left at nine, ahead of the patrol.' }
      ] },

    { id: 'KANSAS_CITY_FOOTBALL_SUNDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'A home game on Sunday, and the lots around the stadiums are already filling.',
      title: 'Tailgate corridor',
      body: 'The warehouse club shares a corridor with the tailgates. The lot is full of smoke and parked cars, and the band is three blocks away with an amp.',
      options: [
        { id: 'LATE', label: 'Push doors back until the lot clears', likely: 'The night crowd comes, later than planned.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors went an hour late, and the crowd walked in from the tailgates, loud and happy.' },
        { id: 'ACCEPT', label: 'Run it as planned and carry the gear', likely: 'The casual crowd is at the game.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'HOURS', d: -1, when: 'TODAY' }],
          result: 'The band carried the amp through the smoke, and the regulars were there.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] }
  ]
});
