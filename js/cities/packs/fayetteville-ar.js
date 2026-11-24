SB.Cities.register('fayetteville-ar', {
  v: 1,
  slug: 'fayetteville-ar',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of arkansas', 'razorback', 'razorbacks', 'razorback stadium', 'razorback baseball', 'woo pig sooie', 'calling the hogs',
           'the hogs', 'walmart', 'tyson', 'j.b. hunt', 'jb hunt', 'bikes, blues and bbq', 'bikes blues and bbq', 'arkansas democrat-gazette',
           'democrat-gazette', 'fayetteville flyer', 'arkansas traveler', 'northeastern state university', 'cherokee nation', 'fort chaffee',
           'crystal bridges', 'razorback greenway', 'arkansas abc', 'american legion', 'vfw', 'the dogtrot', 'low water crossing', 'persimmon hall',
           'the cistern', 'frisco grain', 'boston mountain social club', 'dewberry annex', 'sassafras hall', 'lot 49', 'the hickory room',
           'pocket knife hall',
           'ammplify fest', 'ammplify', 'old friends music festival', 'fayetteville roots festival', 'roots fest', 'lights of the ozarks',
           'fayetteville farmers market', 'joe martin stage race', 'square to square', 'kuaf', 'ozarks at large', 'nwa free weekly',
           'idle class magazine', 'experience fayetteville', 'onlyinark', 'arkansas online', 'format festival', 'mutants of the monster'],
  /* The dossier's twelve invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['razorback*', 'bikes blues*', 'walmart*', 'democrat-gazette*', 'fayetteville flyer*', 'arkansas traveler*'],

  blurb: ['A hill town that lost its main DIY room, so shows move from a veterans hall to a hilltop to a bar back room. Hardcore, doom and emo share bills for kids in a scene that is rebuilding.',
          'A few small crews book under different names, and many nights are free or by donation and often all ages.'],
  hard: 'No steady room; booking means piecing together borrowed halls and 21+ bars.',
  region: 'the Ozarks',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Little Rock', state: 'AR', lat: 34.75, lon: -92.29 },
    { name: 'Tulsa', state: 'OK', lat: 36.15, lon: -95.99 },
    { name: 'Kansas City', state: 'MO', lat: 39.10, lon: -94.58 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'metal', d: .07, reason: 'Hardcore and sludge share bills and crowds here.' },
    { fan: 'emo', band: 'hardcore', d: .06, reason: 'Emo and hardcore bands play the same all-ages bills.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Fayetteville' },
    { id: 'farmington', kind: 'FEEDER', name: 'Farmington', minutes: 10, bearing: 255, note: 'A fast-growing bedroom suburb; its high-school kids call Fayetteville town.' },
    { id: 'elkins', kind: 'FEEDER', name: 'Elkins', minutes: 15, bearing: 100, note: 'Tiny and rural; a few kids with cars.' },
    { id: 'prairie-grove', kind: 'FEEDER', name: 'Prairie Grove', minutes: 20, bearing: 235, note: 'A small farm town; teens drive in on US 62.' },
    { id: 'south-hills', kind: 'FEEDER', name: 'Greenland, Lincoln and West Fork', minutes: 20, bearing: 195, note: 'Small hill-country towns where a cousin drives you.' },
    { id: 'springdale', kind: 'FEEDER', name: 'Springdale', minutes: 20, bearing: 5, scene: 150, note: 'A big poultry-industry town with a large young population and its own church and community scenes.' },
    { id: 'rogers', kind: 'FEEDER', name: 'Rogers', minutes: 30, bearing: 10, note: 'A retail suburb; kids come south to Fayetteville.' },
    { id: 'bentonville', kind: 'FEEDER', name: 'Bentonville', minutes: 35, bearing: 15, note: 'Corporate money and a polite funded music culture; the punk kids drive south.' },
    { id: 'huntsville', kind: 'FEEDER', name: 'Huntsville', minutes: 40, bearing: 95, note: 'A rural county seat on US 412; the odd kid drives in.' },
    { id: 'siloam-springs', kind: 'FEEDER', name: 'Siloam Springs', state: 'AR', minutes: 40, bearing: 295, note: 'A small college town at the Oklahoma line; kids cross over for shows.' },
    { id: 'eureka-springs', kind: 'FEEDER', name: 'Eureka Springs', minutes: 60, bearing: 80, note: 'A tourist and arts town with a weird, welcoming crowd and high rents.', season: { months: [5, 6, 7, 8, 9, 10], mul: 1.3 } },
    { id: 'fort-smith', kind: 'PEER', name: 'Fort Smith', minutes: 60, bearing: 175, scene: 500, note: 'A rougher, cheaper river and rail town with a scrappier metal and hardcore crowd.' },
    { id: 'joplin', kind: 'PEER', name: 'Joplin', state: 'MO', minutes: 90, bearing: 40, scene: 250, note: 'A smaller blue-collar town; a pass-through on tours.' },
    { id: 'tulsa', kind: 'PEER', name: 'Tulsa', slug: 'tulsa', state: 'OK', minutes: 120, bearing: 285, scene: 1200, note: 'The nearest big music town; touring bands pick it and skip you.' },
    { id: 'springfield', kind: 'PEER', name: 'Springfield', state: 'MO', minutes: 150, bearing: 55, slug: 'springfield-mo', note: 'The other Ozarks college city, with a deep punk and hardcore tradition.' }
  ],

  hoods: [
    { id: 'dickson', name: 'Dickson and the campus edge', route: 'downtown', note: 'The big bar strip below the campus ridge: 21 and over, student housing and game-day crowds.' },
    { id: 'square', name: 'the Square', route: 'downtown', note: 'Old brick storefronts around the courthouse, now bars, coffee and galleries; the priciest rents a punk can still bike to.' },
    { id: 'wilson-park', name: 'Wilson Park and Mount Nord', route: 'old-side', note: 'Old bungalows cut into student rentals; the classic house-show streets, and the neighbors who complain.' },
    { id: 'walker-park', name: 'Walker Park and the south side', route: 'work-side', note: 'Warehouses, duplexes and practice spaces by the old rail line; cheap, and turning into the next place to cost more.' },
    { id: 'mission', name: 'Mission Boulevard and the strip malls', route: 'work-side', note: 'Aging strip malls, motels and light industry; landlords who do not ask questions.' },
    { id: 'north-college', name: 'North College Avenue', route: 'old-side', note: 'Old shopping centers and cheap shop units north of the Square, slowly giving way to apartments.' },
    { id: 'wedington', name: 'Wedington Drive and west Fayetteville', route: 'campus', note: 'Subdivisions, big-box stores and new apartments; all-ages kids but no culture of local rooms.' },
    { id: 'sequoyah', name: 'Mount Sequoyah', route: 'campus', note: 'A steep, expensive hillside of professors and retirees; a skyline landmark, not a venue district.' }
  ],

  rooms: [
    { id: 'wilson-house', kind: 'HOUSE', hood: 'wilson-park', cap: 40, curfew: 1320, ac: false, outdoor: false, pressure: 60, start: true,
      note: 'A borrowed bungalow on the old house-show streets, since the main house room lost its house. The neighbors and the landlord can end it any week.' },
    { id: 'walker-basement', kind: 'HOUSE', hood: 'walker-park', cap: 50, curfew: 1350, ac: false, pressure: 50,
      note: 'A duplex with a basement that a band house has used for years. Fine until the lease gets read.' },
    { id: 'mission-unit', kind: 'DIY', hood: 'mission', cap: 80, curfew: 1380, ac: false, pressure: 55, needs: ['VOUCH'],
      note: 'A strip-mall unit with a hand-built stage, run by a small crew that also plays the bills.' },
    { id: 'sound-house', kind: 'DIY', hood: 'walker-park', cap: 120, curfew: 1380, ac: false, pressure: 60, needs: ['VOUCH'],
      note: 'A converted building that is part art space, part stage and part practice room. The rent and a possible sale hang over it.' },
    { id: 'studio-yard', kind: 'OUTDOOR', hood: 'walker-park', cap: 250, curfew: 1260, ac: false, outdoor: true,
      note: 'A yard at an art-and-studio complex that has held an all-day punk market. A stage, vendor tables, and over by dark.' },
    { id: 'hilltop-site', kind: 'OUTDOOR', hood: 'sequoyah', cap: 150, curfew: 1260, ac: false, outdoor: true, pressure: 30,
      note: 'A hilltop or trailside clearing for a festival-style one-off. The neighbors are far enough to forget, and the weather decides.' },
    { id: 'post-hall', kind: 'HALL', hood: 'wilson-park', cap: 100, rent: 80, curfew: 1320, ac: true, owner: 'HALL_MANAGER',
      note: 'A veterans post hall that hosts toy-drive shows. No alcohol, cheap, and the post wants the room back by night.' },
    { id: 'square-shop', kind: 'SHOP', hood: 'square', cap: 60, curfew: 1200, ac: true,
      note: 'A small downtown shop for an early in-store set, over before the bars fill the street.' },
    { id: 'square-bar', kind: 'BAR', hood: 'square', cap: 150, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A bar back room with a PA. The bar keeps the drinks and you keep what is left of the door.' },
    { id: 'dickson-bar', kind: 'BAR', hood: 'dickson', cap: 200, ages: ['A21'], curfew: 1500, ac: true, following: .3,
      note: 'A bar stage on the strip, with students and game-day money. Some nights are 18-plus, but kids are rarely the point.' },
    { id: 'strip-club', kind: 'CLUB', hood: 'dickson', cap: 300, ages: ['A18'], curfew: 1470, ac: true, needs: ['FULL_BILL'],
      note: 'The room on the strip that books touring punk and hardcore, mostly 18-plus. It pays, and it checks IDs.' },
    { id: 'wedington-hall', kind: 'BIG', hood: 'wedington', cap: 900, ages: ['ALL'], curfew: 1380, ac: true,
      note: 'A big hall on the west side that books national metal and rock. Locals open only if a tour needs one.' }
  ],

  contacts: ['springfield-mo', 'tulsa', 'little-rock-ar', 'kansas-city'],

  calendar: [
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 4], dows: [5], can: [.75, .65, .65], hoods: ['dickson', 'square'], elsewhere: [.92, .90, .90] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [5], can: [.75, .65, .65], hoods: ['dickson', 'square'], elsewhere: [.92, .90, .90] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 4], dows: [5], can: [.75, .65, .65], hoods: ['dickson', 'square'], elsewhere: [.92, .90, .90] },
    { id: 'spring-race', label: 'bike race weekend', tag: 'race', month: 5, week: 2, dows: [5, 6], can: [.92, .90, .90], hoods: ['square'], elsewhere: [1, .98, .98] },
    { id: 'holiday-lights', label: 'the holiday lights on the Square', tag: 'holiday', month: 12, weeks: [1, 3], dows: [4, 5], can: [.92, .90, .90], hoods: ['square'], elsewhere: [1, 1, 1] },
    { id: 'graduation', label: 'graduation and the long break', tag: 'graduation', month: 5, weeks: [1, 2], dows: [4, 5, 6], can: [.75, .80, .80] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1380 },

  points: [
    { name: 'Fort Smith', state: 'AR', lat: 35.39, lon: -94.40, pop: 89000 },
    { name: 'Joplin', state: 'MO', lat: 37.08, lon: -94.51, pop: 51000 },
    { name: 'Tulsa', state: 'OK', lat: 36.15, lon: -95.99, pop: 413000 },
    { name: 'Memphis', state: 'TN', lat: 35.15, lon: -90.05, pop: 630000 }
  ],
  roads: ['I-49', 'US 71', 'US 62', 'US 412', 'Highway 16'],

  words: {
    street: ['Dickson', 'College Avenue', 'Mission Boulevard', 'Wedington Drive', 'School Avenue', 'Highway 16'],
    water: ['Lake Fayetteville', 'the White River', 'Lake Wedington'],
    hood: ['Wilson Park', 'Mount Nord', 'Walker Park', 'Mount Sequoyah', 'the Square'],
    thing: ['cheese dip', 'daylight basement', 'steep driveway', 'poultry truck', 'feed store', 'sweet tea', 'veterans hall', 'toy drive', 'hilltop', 'trail'],
    weather: ['ice storm', 'tornado watch']
  },

  events: [
    { id: 'FAYETTEVILLE_AR_HOME_SATURDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'It is a home Saturday, and the stadium traffic is already backed up past the strip.',
      title: 'The stadium swallows the strip',
      body: 'A home game fills every bar, hotel and lot below the ridge. Your bill is in the same part of town, and nobody can park.',
      options: [
        { id: 'SOUTH', label: 'Move the whole bill to a south-side unit', likely: 'Smaller, but away from the traffic.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'DIY', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'A unit on the south side took the bill, and it was smaller and loud and nobody circled for parking.' },
        { id: 'LATE', label: 'Push doors back until the game crowd thins', likely: 'The ones who want a real night come late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Doors opened an hour and a half late, and the kids came in once the streets cleared.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the game.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The casual crowd sat in traffic, but the regulars found a place to park.' }
      ] },

    { id: 'FAYETTEVILLE_AR_HILLTOP_STORM', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [4, 5, 6, 9, 10] },
      telegraph: 'Thunderstorms are forecast for the ridge, right over the hilltop day show.',
      title: 'Thunder on the ridge',
      body: 'The day show is set in a clearing on the hill, and the forecast has a line of storms coming through at four. The generator is already up there.',
      options: [
        { id: 'HALL', label: 'Move the bill to the veterans hall', likely: 'No beer and out by nine, smaller but dry.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'The post took the bill with a few hours to spare, and it was dry, close and over by nine.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could make it came.' },
        { id: 'ACCEPT', label: 'Run it on the hill and hope', likely: 'A lot of people watch the sky and stay home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }],
          result: 'The line of storms broke early, but half the list had already given up.' }
      ] },

    { id: 'FAYETTEVILLE_AR_ICE_STORM', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [12, 1, 2] },
      telegraph: 'An ice storm is sitting on the mountain grade, and the interstate is down to one lane.',
      title: 'The van is stuck north of town',
      body: 'The touring band is stuck behind a jackknifed truck on the grade, and the local opener has been told to be ready to play twice.',
      options: [
        { id: 'SHORT', label: 'Run the short bill and let the opener play long', likely: 'A thin night, but the ones who came are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The opener played twice and the room stayed warm, but the van never made it.' },
        { id: 'WAIT', label: 'Hold the doors and wait for the van', likely: 'A late start, and the crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The van pulled in at ten, glazed with ice, and you started late but nobody left.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could make it came.' }
      ] }
  ]
});
