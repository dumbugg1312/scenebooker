SB.Cities.register('washington-dc', {
  v: 1,
  slug: 'washington-dc',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['national cherry blossom festival', 'cherry blossom', 'marine corps marathon', 'washington post', 'washington city paper', 'city paper', 'washingtonian', 'dcist', 'popville',
           'brightest young things', 'district fray', 'washington blade', 'wamu', 'wpfw', 'wgtb', 'wvau', 'wmuc', 'metrorail', 'wmata', 'metrobus', 'capital bikeshare',
           'nationals park', 'capital one arena', 'fedex field', 'audi field', 'georgetown university', 'howard university', 'american university', 'catholic university', 'gallaudet',
           'george washington university', 'university of the district of columbia', 'university of maryland', 'dcra', 'metropolitan police department', 'park police',
           'national park service', 'capitol police', 'secret service', 'naval academy', 'revolution summer', 'capital pride', 'natty light', 'soviet safeway', 'safeway', '7-eleven',
           'servsafe', 'vfw', 'american legion',
           'piney branch parlor', 'georgia avenue annex', 'blagden alley garage', 'ivy city cold storage', 'kenilworth social club', 'rhode island avenue legion post',
           'brentwood sub-basement', 'eckington yard', 'langdon park rec room', 'bloomingdale back room', 'takoma junction hall', 'mount rainier parlor',
           'benning road skate and social', 'half-moon pupuseria', 'half-moon pupusería', 'capitol view carriage house'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The spring festival is 'the blossom festival' in game text. */
  blocklist: ['washington city paper*', 'capital pride*', 'marine corps marathon*', 'cherry blossom*', 'wamu*', 'wpfw*', 'natty light*', 'dcist*'],

  blurb: ['A federal company town of interns, contractors and group houses, where a teenage all-ages tradition got hardwired around 1980 and the scene has stayed one scene.',
          'An X on the hand gets you in at five dollars, but the rowhouse basements go when a roommate moves out, and half the crowd is gone by August.'],
  hard: 'Rent and development are brutal, and the kids now live outside the District line.',
  region: 'the I-95 corridor',
  houseType: 'ROWHOUSE',
  whereGo: [
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'emo', d: .10, reason: 'The all-ages hardcore town that grew its own melodic, shouted branch.' },
    { fan: 'emo', band: 'hardcore', d: .10, reason: 'The all-ages hardcore town that grew its own melodic, shouted branch.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Washington', state: 'DC' },
    { id: 'frederick', kind: 'FEEDER', name: 'Frederick', state: 'MD', minutes: 50, bearing: 330, bands: 3, note: 'A historic downtown and a DC exurb with a real small scene: basements, bars and a few active bookers. The first town a local names.' },
    { id: 'annapolis', kind: 'FEEDER', name: 'Annapolis', state: 'MD', minutes: 40, bearing: 85, beyond: 'beltway', note: 'The state capital and sailing town. A small, scattered scene of sailors and townies.' },
    { id: 'waldorf', kind: 'FEEDER', name: 'Waldorf and La Plata', state: 'MD', minutes: 40, bearing: 190, note: 'A big Southern Maryland suburb of strip malls and skate spots. A pop-punk and hardcore tradition in basements and garages.' },
    { id: 'manassas', kind: 'FEEDER', name: 'Manassas', state: 'VA', minutes: 40, bearing: 245, beyond: 'beltway', note: 'A commuter suburb with a teen-heavy scene and skate shops.' },
    { id: 'westminster', kind: 'FEEDER', name: 'Westminster', state: 'MD', minutes: 60, bearing: 5, note: 'A small college town in farm country with a small basement scene.' },
    { id: 'leesburg', kind: 'FEEDER', name: 'Leesburg', state: 'VA', minutes: 50, bearing: 290, beyond: 'beltway', note: 'A wealthy exurb of horse and wine country with little for teenagers at night. A very small scene.' },
    { id: 'fredericksburg', kind: 'FEEDER', name: 'Fredericksburg', state: 'VA', minutes: 70, bearing: 205, beyond: 'beltway', note: 'A college town near the base, with a small college and house scene.' },
    { id: 'hagerstown', kind: 'FEEDER', name: 'Hagerstown', state: 'MD', minutes: 80, bearing: 315, note: 'An old rail and mill city on I-81 with a closed downtown at night. Small but real; the Appalachian door to the city.' },
    { id: 'shepherdstown', kind: 'FEEDER', name: 'Shepherdstown and Martinsburg', state: 'WV', minutes: 80, bearing: 305, note: 'A small river college town and a rail city turned commuter suburb. A house-and-basement tradition; the kids come up for shows.' },
    { id: 'winchester', kind: 'FEEDER', name: 'Winchester', state: 'VA', minutes: 90, bearing: 285, note: 'An old market town in the Shenandoah Valley, a long drive from anywhere else. Small and stubborn.' },
    { id: 'baltimore', kind: 'PEER', name: 'Baltimore', slug: 'baltimore', state: 'MD', minutes: 55, bearing: 45, scene: 5000, note: 'The scrappier, friendlier-to-weirdness neighbor an hour up the parkway. Always a quiet rivalry over who has the better scene.' },
    { id: 'richmond', kind: 'PEER', name: 'Richmond', state: 'VA', minutes: 110, bearing: 185, slug: 'richmond', note: 'Cheaper and sleepier down I-95, with a long memory for basements and a hard sound.' },
    { id: 'charlottesville', kind: 'PEER', name: 'Charlottesville', state: 'VA', minutes: 130, bearing: 240, slug: 'charlottesville-va', note: 'A separate college-town scene, a peer more than a feeder.' },
    { id: 'harrisonburg', kind: 'PEER', name: 'Harrisonburg', state: 'VA', minutes: 140, bearing: 265, slug: 'harrisonburg-va', note: 'A thriving all-ages basement tradition. Kids make the drive for weekend shows.' }
  ],

  chokepoints: [                                // which zones each one cuts is said by the zones' `beyond`, above
    { id: 'beltway', name: 'the Beltway', p: .03 }
  ],

  hoods: [
    { id: 'columbia-heights', name: 'Columbia Heights and Mount Pleasant', route: 'old-side', note: 'Dense rowhouses and apartments, once Black and Central American, now young professionals. A few house venues persist at high rent.' },
    { id: 'petworth', name: 'Petworth and Brightwood', route: 'old-side', note: 'Semidetached houses with real basements, porches and yards: the sweet spot for basement shows, and a neighbor-tolerance gamble on every lot.' },
    { id: 'shaw', name: 'Shaw and U Street', route: 'downtown', note: 'The old cultural corridor turned nightlife strip. Bars, clubs and former theaters; the licensed rooms are here, and all ages is a local habit.' },
    { id: 'adams-morgan', name: 'Adams Morgan', route: 'downtown', note: 'A loud weekend bar strip with basement rooms under bars and shops. Not friendly to DIY, but a rowdy, drunk context for a band.' },
    { id: 'h-street', name: 'H Street and Ivy City', route: 'work-side', note: 'A bar strip east of the station and an industrial belt behind it. Warehouses and art spaces, being converted to condos and distilleries.' },
    { id: 'brookland', name: 'Brookland and Bloomingdale', route: 'old-side', note: 'Bungalows and rowhouses with basements, still affordable-ish. The sleeper of the northeast.' },
    { id: 'capitol-hill', name: 'Capitol Hill and Barracks Row', route: 'downtown', note: 'Staff-and-intern rowhouse land. More beer pong than punk, though it once had low-key rowhouse shows.' },
    { id: 'east-river', name: 'east of the river', route: 'work-side', note: 'Cheap halls and warehouse spaces that survive, where the music is more go-go than punk. A hall with a PA and a landlord who answers texts.' },
    { id: 'gateway', name: 'Takoma Park, Hyattsville and the Maryland first ring', route: 'campus', note: 'Where artists moved when the District got expensive: big basements and yards along Route 1, county police and a Metro line out to the state college.' },
    { id: 'arlington', name: 'Arlington', route: 'campus', note: 'Across the river, with a fading punk history and basements and garages in single-family houses. The suburbs keep making bored teenagers.' }
  ],

  rooms: [
    { id: 'petworth-basement', kind: 'HOUSE', hood: 'petworth', cap: 55, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [70, 60, 45],
      pressure: 55, start: true, note: 'A rowhouse basement with its own entrance. Shared walls: one angry neighbor away from the end of the night.' },
    { id: 'heights-basement', kind: 'HOUSE', hood: 'columbia-heights', cap: 45, hostCut: 0, pa: .3, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [70, 55, 40],
      pressure: 55, note: 'A group-house basement. Condensation on the ceiling, and a lease that turns over whenever a roommate leaves.' },
    { id: 'brookland-house', kind: 'HOUSE', hood: 'brookland', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [65, 55, 45],
      pressure: 45, note: 'A bungalow basement. A little more yard, a little less neighbor.' },
    { id: 'gateway-basement', kind: 'HOUSE', hood: 'gateway', cap: 70, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 20, standing: [65, 60, 45],
      pressure: 40, note: 'A big frame-house basement in the first ring, where the county police have other priorities.' },
    { id: 'arlington-garage', kind: 'HOUSE', hood: 'arlington', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [65, 55, 45],
      pressure: 40, note: 'A single-family garage across the river. Teenagers with a lot of time and a car.' },
    { id: 'brookland-yard', kind: 'OUTDOOR', hood: 'brookland', cap: 60, rent: 0, pa: .4, curfew: 1320, sketch: 30, standing: [60, 55, 40],
      note: 'A fenced backyard with a porch. Warm months only, and a thunderstorm can end it.' },
    { id: 'underpass', kind: 'OUTDOOR', hood: 'east-river', cap: 60, rent: 0, pa: .3, curfew: 1320, sketch: 60, standing: [55, 55, 35], pressure: 55,
      note: 'A bridge underpass with a gas generator. Three bands, and ten minutes before somebody calls the cops.' },
    { id: 'church-hall', kind: 'HALL', hood: 'brookland', cap: 90, rent: 80, deposit: 0, pa: .5, curfew: 1320, ac: true, sketch: 5, standing: [65, 60, 60],
      owner: 'CHURCH_CONTACT', pressure: 50, note: 'A parish hall run through a community program. The permission is real, and so is the early end time.' },
    { id: 'post-hall', kind: 'HALL', hood: 'gateway', cap: 150, rent: 180, deposit: 75, pa: .6, curfew: 1380, ac: true, sketch: 15, standing: [55, 60, 70],
      owner: 'HALL_MANAGER', note: 'A veterans\' hall in the first ring. A flat fee, drop ceilings, and a member who asks you to turn it down at ten.' },
    { id: 'ivy-warehouse', kind: 'DIY', hood: 'h-street', cap: 130, rent: 90, deposit: 0, pa: .6, curfew: 1440, ac: false, sketch: 45, standing: [55, 60, 45], pressure: 60,
      needs: ['VOUCH'], note: 'A former cold-storage bay in the industrial belt. The city shuts these when somebody notices the occupancy paper.' },
    { id: 'east-art-space', kind: 'DIY', hood: 'east-river', cap: 100, rent: 70, deposit: 0, pa: .5, curfew: 1380, ac: false, sketch: 35, standing: [55, 60, 50], pressure: 50,
      note: 'A hall and art space east of the river with a PA and a landlord who answers texts.' },
    { id: 'record-store', kind: 'SHOP', hood: 'adams-morgan', cap: 40, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'The record store on the strip. In-stores in the afternoon, over by seven.' },
    { id: 'under-bar', kind: 'BAR', hood: 'adams-morgan', cap: 80, soundFee: 40, pa: .6, ages: ['ALL', 'A21'], matinee: true, curfew: 1560, ac: true, following: .3, sketch: 15,
      standing: [50, 65, 65], note: 'A room under a bar. All ages with a mark on the hand, and a rowdy crowd upstairs.' },
    { id: 'h-street-bar', kind: 'BAR', hood: 'h-street', cap: 120, soundFee: 60, pa: .7, ages: ['ALL', 'A21'], curfew: 1560, ac: true, following: .3, sketch: 20,
      standing: [50, 65, 70], note: 'A stage on the bar strip. Under 21 can come in with a wristband.' },
    { id: 'club', kind: 'CLUB', hood: 'shaw', cap: 350, houseCosts: 200, split: .8, pa: .9, ages: ['ALL', 'A21'], curfew: 1560, ac: true, following: .6, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The big licensed room on the corridor, where the kids can come in too. Wants six weeks and a name.' }
  ],

  contacts: ['richmond', 'charlottesville-va', 'harrisonburg-va'],

  calendar: [
    { id: 'blossom', label: 'the blossom festival weekends', tag: 'blossom', month: 4, weeks: [1, 2], dows: [4, 5, 6], can: [.85, .85, .90], hoods: ['capitol-hill', 'shaw'], elsewhere: [.97, .95, .95] },
    { id: 'pride', label: 'Pride weekend', tag: 'festival', month: 6, week: 2, dows: [5, 6], can: [.90, .90, .95], hoods: ['shaw', 'adams-morgan'], elsewhere: [1, 1, 1] },
    { id: 'fourth', label: 'the Fourth of July week', tag: 'holiday', month: 7, week: 1, dows: [0, 1, 2, 3, 4, 5, 6], can: [.92, .92, .95] },
    { id: 'marathon', label: 'the marathon', tag: 'race', month: 10, weeks: [4, 5], dows: [6], can: [.92, .90, .90], hoods: ['arlington', 'capitol-hill'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.05, 1.05, 1] },
    { id: 'game-june', label: 'a home game night', tag: 'game', month: 6, weeks: [1, 5], dows: [4], can: [.90, .95, .95], hoods: ['capitol-hill', 'east-river'], elsewhere: [1, 1, 1] },
    { id: 'game-sep', label: 'a home game night', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.90, .95, .95], hoods: ['capitol-hill', 'east-river'], elsewhere: [1, 1, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1380, inForce: false }, quiet: 1320 },

  points: [
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61, pop: 2800000 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17, pop: 6200000 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64, pop: 1500000 }
  ],
  roads: ['I-495', 'I-95', 'I-395', 'I-66', 'I-270', 'US 50'],

  words: {
    street: ['Georgia Avenue', 'Rhode Island Avenue', 'Connecticut Avenue', 'Wisconsin Avenue', 'Sixteenth Street', 'H Street', 'Eighteenth Street', 'Florida Avenue', 'New York Avenue', 'Route 1', 'Benning Road'],
    water: ['the Potomac', 'the Anacostia', 'Rock Creek'],
    hood: ['Petworth', 'Brightwood', 'Shaw', 'Eckington', 'Bloomingdale', 'Trinidad', 'Ivy City', 'Brentwood', 'Takoma', 'Mount Rainier', 'Hyattsville', 'Adams Morgan'],
    thing: ['half-smoke', 'mumbo sauce', 'rowhouse', 'carryout', 'party wall', 'group house', 'pupusa', 'alley', 'lease', 'porch', 'wristband', 'benefit show', 'curfew zone', 'last train'],
    weather: ['derecho', 'humidity', 'thunderstorm', 'ice storm', 'heat index']
  },

  events: [
    { id: 'WASHINGTON_DC_BLOSSOM_CROWDS', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'blossom' },
      telegraph: 'The blossoms are out and every hotel in town is full.',
      title: 'Tourists and no parking',
      body: 'Blossom weekend has filled every space and every train near the Mall. The locals are staying home and the visitors are wandering into your show.',
      options: [
        { id: 'EARLY', label: 'Open early and send the list the back way', likely: 'Most get in before the crowds. Thinner than usual.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .92 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors an hour early. The ones who came walked in from three stops away.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'A lot of people give up on the crowds.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The trains were packed with strangers. Half the list stayed home.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'WASHINGTON_DC_HOME_GAME', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'There is a home game on Friday night this week.',
      title: 'The trains are packed',
      body: 'A home game on your night has stripped the parking and flooded the trains. Everyone coming from across town is stuck.',
      options: [
        { id: 'EARLY', label: 'Open early, tell everyone to come before the crowd', likely: 'Most get in first. Thinner than usual.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .92 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors an hour early. The room filled before the game let out.' },
        { id: 'ACCEPT', label: 'Take what you get', likely: 'A lot of people give up.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The trains never cleared. Half the list never showed.' },
        { id: 'MOVE', label: 'Move the show to Saturday', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' }
      ] },

    { id: 'WASHINGTON_DC_DERECHO', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [6, 7, 8] },
      telegraph: 'A line of violent storms is headed for the region.',
      title: 'The power is out',
      body: 'A fast, violent storm has knocked the power out across the neighborhood. The basement is taking on water and the yard show has no lights.',
      options: [
        { id: 'GENERATOR', label: 'Borrow a generator and play on', likely: 'Costs thirty dollars. Smaller and louder.',
          effects: [{ op: 'MONEY', amount: -30 }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The band played by lantern light on a generator. Nobody forgot it.' },
        { id: 'MOVE', label: 'Move it a day, once the water goes down', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' },
        { id: 'ACCEPT', label: 'Call it off', likely: 'Nobody is happy, and nobody is hurt.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .4 }],
          result: 'The storm won. A handful stayed to bail water and drink the warm beer.' }
      ] },

    { id: 'WASHINGTON_DC_CURFEW_ZONE', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 3], months: [4, 5, 6, 9, 10] },
      telegraph: 'The mayor is talking about a weekend curfew zone for teenagers.',
      title: 'A curfew zone for the weekend',
      body: 'The police have declared a weekend curfew zone around your neighborhood. The teenage half of the crowd has to be home early or stay out of the zone.',
      options: [
        { id: 'EARLIER', label: 'Move the show earlier so the kids can get home', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors early, done before dark. The kids went home with their parents\' blessing.' },
        { id: 'ACCEPT', label: 'Run it as planned and lose the kids', likely: 'A lot of the crowd stays out of the zone.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The zone cleared the block by nine. The older half of the room was left.' }
      ] }
  ]
});
