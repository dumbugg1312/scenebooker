SB.Cities.register('erie-pa', {
  v: 1,
  slug: 'erie-pa',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['erie times', 'goerie', 'erie news now', 'yourerie', 'wjet', 'wsee', 'wica', 'wqln', 'erie otters', 'erie seawolves', 'erie insurance arena', 'erie county fair', 'celebrateerie', 'celebrate erie', 'erie blues and jazz fest', 'erie irish festival', 'pride on the bay', 'juneteenth block party', 'frontier park', 'perry square', 'bayview park', 'erie zoo', 'erie philharmonic', 'erie playhouse', 'erie 250', 'thrash punk bash', 'hellfest', 'this is hardcore', 'eventbrite', 'dodiy', 'pennsylvania western university',
           'gannon', 'gannon university', 'mercyhurst', 'penn state behrend', 'behrend', 'lecom', 'pennsylvania western university', 'edinboro university',
           'presque isle state park', 'wabtec', 'ge transportation', 'erie insurance', 'ontario hockey league', 'detroit tigers', 'erie reader',
           'erie times-news', 'bicentennial tower', 'lake shore limited', 'amtrak', 'csx', 'greyhound', 'intermodal transportation center',
           'roar on the shore', 'yuengling', 'genesee', 'liquor control board', 'vfw', 'american legion', 'sponge candy',
           'holland street annex', 'sixth street social', 'lakeview legion', 'perch & pierogi', 'perch and pierogi', 'ore dock',
           'peninsula skate barn', 'boiler annex', 'mill creek rec', 'snow belt room', 'east avenue basement', 'dobbins back room'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['gannon*', 'mercyhurst*', 'behrend*', 'wabtec*', 'erie reader*', 'roar on the shore*', 'erie times*', 'lecom*'],

  blurb: ['Erie\'s hardcore and metal kids pack one all-ages hall and treasure it, since rooms here keep closing. Locals open, and the lake does the rest.',
          'Everyone remembers a closed room. Benefit nights keep the lights on, and snow decides who shows up.'],
  hard: 'One reliable all-ages room, and a history of closed rooms and lost tours.',
  region: 'the Great Lakes',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Buffalo', state: 'NY', lat: 42.89, lon: -78.88 },
    { name: 'Cleveland', state: 'OH', lat: 41.50, lon: -81.69 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -79.99 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'metal', d: 0.06, reason: 'Hardcore and metal share the same all-ages bills.' },
    { fan: 'metal', band: 'hardcore', d: 0.06, reason: 'Metalcore and revival nights draw both crowds.' },
    { fan: 'metal', band: 'street-punk', d: .06, reason: 'Thrash-punk nights share the same bill and the same hall.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Erie' },
    { id: 'harborcreek', kind: 'FEEDER', name: 'Harborcreek and Wesleyville', minutes: 15, bearing: 70, scene: 60, note: 'East suburbs with garages, barns and backyards on the road to the college.' },
    { id: 'fairview', kind: 'FEEDER', name: 'Girard and Fairview', minutes: 20, bearing: 265, note: 'Suburb and farm edge to the west; kids drive in.' },
    { id: 'north-east', kind: 'FEEDER', name: 'North East', minutes: 25, bearing: 65, note: 'Grape country with a small downtown. Kids drive in.' },
    { id: 'edinboro', kind: 'FEEDER', name: 'Edinboro', minutes: 30, bearing: 175, note: 'A college town in winter and a lake resort in summer; the likeliest to have a small scene of its own.', bands: 1 },
    { id: 'albion', kind: 'FEEDER', name: 'Albion', minutes: 30, bearing: 225, note: 'A tiny farm borough southwest.' },
    { id: 'union-city', kind: 'FEEDER', name: 'Union City and Waterford', minutes: 35, bearing: 165, note: 'Farm and creek towns to the south.' },
    { id: 'corry', kind: 'FEEDER', name: 'Corry', minutes: 40, bearing: 130, note: 'An old rail and factory town.' },
    { id: 'meadville', kind: 'FEEDER', name: 'Meadville', minutes: 40, bearing: 190, note: 'A small college town down I-79 with a scene of its own.', bands: 1 },
    { id: 'conneaut', kind: 'FEEDER', name: 'Conneaut and Ashtabula', state: 'OH', minutes: 45, bearing: 255, note: 'Working-class port and rail towns on the Ohio shore.' },
    { id: 'jamestown', kind: 'PEER', name: 'Jamestown', state: 'NY', minutes: 60, bearing: 80, scene: 500, note: 'A smaller industrial city across the state line; people cross both ways for shows.' },
    { id: 'youngstown', kind: 'PEER', name: 'Youngstown', state: 'OH', minutes: 90, bearing: 220, slug: 'youngstown-oh', note: 'A Rust Belt twin with the same economy and the same winters.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The square, the old commercial blocks and a thin bar strip. Always being revitalized, and the rent near the water keeps rising.' },
    { id: 'little-italy', name: 'Little Italy and West 18th', route: 'old-side', note: 'Old working-class blocks with corner bars, bakeries, social halls and basements in doubles. Stable and slowly gentrifying.' },
    { id: 'east-side', name: 'the lower east side', route: 'work-side', note: 'Doubles, old churches and former factory blocks along the rail line. The cheapest rent and the most empty buildings, and the likeliest home of a basement or warehouse room.' },
    { id: 'college-orbits', name: 'the college rental streets', route: 'campus', note: 'Rental houses ringing the campuses. House shows follow the school calendar and churn every May.' },
    { id: 'millcreek', name: 'Millcreek and Peach Street', route: 'campus', note: 'Strip malls, chains and subdivisions south of the grid. Where the suburban kids live; practice garages, few real rooms.' },
    { id: 'millionaires-row', name: 'Millionaires Row', route: 'old-side', note: 'Victorian mansions on West 6th, many cut into apartments. Big basements and quiet neighbors who call.' },
    { id: 'harborcreek-side', name: 'Harborcreek and Wesleyville', route: 'town:harborcreek', note: 'The east suburbs: garages and barns past the city line, where city police do not go.' }
  ],

  rooms: [
    { id: 'east-basement', kind: 'HOUSE', hood: 'east-side', cap: 40, curfew: 1320, ac: false, outdoor: false, pressure: 55, start: true,
      note: 'A stone basement under an old double on the lower east side. A few friends hold it, and the neighbors call.' },
    { id: 'rental-house', kind: 'HOUSE', hood: 'college-orbits', cap: 60, curfew: 1350, ac: false, outdoor: false, pressure: 55,
      note: 'A rental house near the campuses. It runs with the school year and is gone every May.' },
    { id: 'harborcreek-barn', kind: 'HOUSE', hood: 'harborcreek-side', cap: 80, curfew: 1380, ac: false, outdoor: true, pressure: 40,
      note: 'A garage and barn east of the city, outside city police. Summer and early fall only, and the lake ends it by November.' },
    { id: 'rail-bay', kind: 'DIY', hood: 'east-side', cap: 120, curfew: 1350, ac: false, pressure: 60, needs: ['VOUCH'],
      note: 'A practice space in an empty factory block by the rail line. Rare, and the fire marshal is the kill shot.' },
    { id: 'italian-hall', kind: 'HALL', hood: 'little-italy', cap: 200, curfew: 1320, rent: 200, ac: true,
      note: 'A social hall with a stage. A bar-less rule, and a manager who watches the clock.' },
    { id: 'parish-hall', kind: 'HALL', hood: 'east-side', cap: 250, curfew: 1350, rent: 250, ac: true,
      note: 'An emptied parish hall with room for a real crowd. A hardcore show once drew three hundred to a room like it.' },
    { id: 'state-street-bar', kind: 'BAR', hood: 'downtown', cap: 150, soundFee: 50, ages: ['A21'], curfew: 1500, ac: true, following: 0.3,
      note: 'A small independent music bar with a back-room stage on the downtown corridor. It shares the street with cover bands.' },
    { id: 'peach-street-bar', kind: 'BAR', hood: 'millcreek', cap: 120, soundFee: 50, ages: ['A21'], curfew: 1500, ac: true, following: 0.3,
      note: 'A suburban strip bar that books heavy bills one night a week.' },
    { id: 'old-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['A18'], curfew: 1440, ac: true, following: 0.5, standing: [55, 65, 70],
      note: 'The old reliable club, going since the seventies. The 18-plus night is the usual compromise.' },
    { id: 'the-hall', kind: 'CLUB', hood: 'downtown', cap: 350, ages: ['ALL'], curfew: 1380, ac: true, following: 0.6, standing: [60, 65, 75],
      note: 'A renovated hall that runs almost every night in the busy months. Home base for hardcore and metal, all ages, and the one room everybody protects.' },
    { id: 'tour-room', kind: 'BIG', hood: 'downtown', cap: 900, curfew: 1380, ac: true, following: 0.5,
      note: 'The one night a tour is big enough to leave the club behind.' },
    { id: 'fairgrounds', kind: 'OUTDOOR', hood: 'millcreek', cap: 500, curfew: 1260, rent: 25, ac: false, outdoor: true, pressure: 40,
      note: 'A summer day-long bill at the fairgrounds. The weather and the fair calendar decide it.' }
  ],

  contacts: ['youngstown-oh', 'akron-oh', 'pittsburgh', 'cleveland', 'buffalo'],

  calendar: [
    { id: 'lake-festival', label: 'the lakefront summer festival', tag: 'festival', month: 8, week: 3, dows: [4, 5, 6], can: [0.88, 0.85, 0.85], hoods: ['downtown'], elsewhere: [0.95, 0.95, 0.95] },
    { id: 'fall-festival', label: 'the fall street festival', tag: 'festival', month: 9, week: 3, dows: [4, 5, 6], can: [0.9, 0.88, 0.88], hoods: ['downtown'], elsewhere: [1, 0.97, 0.97] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 8, weeks: [4, 5], dows: [0, 1, 2, 3, 4, 5, 6], can: [0.85, 0.8, 0.8], hoods: ['millcreek'], elsewhere: [0.92, 0.9, 0.9] },
    { id: 'july-fourth', label: 'the Fourth of July on the lake', tag: 'holiday', month: 7, week: 1, dows: [4, 5], can: [0.9, 0.85, 0.85], hoods: ['downtown'], elsewhere: [1, 0.97, 0.97] },
    { id: 'hockey-oct', label: 'home hockey', tag: 'game', month: 10, weeks: [1, 5], dows: [4, 5], can: [0.92, 0.95, 0.95], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'hockey-nov', label: 'home hockey', tag: 'game', month: 11, weeks: [1, 5], dows: [4, 5], can: [0.92, 0.95, 0.95], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.1] }
  ],

  rules: { curfewMinors: { weeknight: 1320, weekend: 1320, inForce: true } },

  points: [
    { name: 'Buffalo', state: 'NY', lat: 42.89, lon: -78.88, pop: 278000 },
    { name: 'Cleveland', state: 'OH', lat: 41.50, lon: -81.69, pop: 372000 },
    { name: 'Rochester', state: 'NY', lat: 43.16, lon: -77.61, pop: 211000 },
    { name: 'Jamestown', state: 'NY', lat: 42.10, lon: -79.24, pop: 28000 }
  ],
  roads: ['I-90', 'I-79', 'I-86', 'PA 290', 'US 20', 'US 6N'],

  words: {
    street: ['State Street', 'Peach Street', 'West 18th', 'Holland Street', 'Parade Street', 'East Avenue', 'West 26th'],
    water: ['Lake Erie', 'the bay', 'Mill Creek', 'the Bayfront'],
    hood: ['Little Italy', 'the Bayfront', 'Millcreek', 'Harborcreek', 'Wesleyville', 'the lower east side', 'Millionaires Row'],
    thing: ['double house', 'fish fry', 'pierogi', 'perch sandwich', 'plow', 'road salt', 'parish hall', 'wedding soup', 'all-ages hall', 'revival night', 'benefit bill', 'canned food drive'],
    weather: ['lake effect', 'whiteout']
  },

  events: [
    { id: 'ERIE_PA_LAKE_EFFECT', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [12, 1, 2, 3] },
      telegraph: 'The snow is coming off the lake overnight, and the interstate south is already slick.',
      title: 'The lake takes the road',
      body: 'The bill is set, the snow came off the lake overnight, and the interstate to the college town is shut. Half the crowd is stuck and an opener plays two sets.',
      options: [
        { id: 'SHORT', label: 'Run the short bill and play on', likely: 'A thin night, but the ones who came are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The local opener played two sets and the room stayed warm.' },
        { id: 'WAIT', label: 'Hold the doors until the road clears', likely: 'A late start. The crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }],
          result: 'The vans got in at ten. You started late and nobody left.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' }
      ] },

    { id: 'ERIE_PA_CURFEW_NIGHT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [9, 10, 11, 12, 1, 2, 3, 4, 5] },
      telegraph: 'The city is enforcing its youth curfew again, and the hall lets out at ten.',
      title: 'The ten o\'clock line',
      body: 'The curfew line is ten at night for anyone under eighteen. A carload of sixteen-year-olds is still in the hall at ten past ten, and a parent has to drive in before the band packs out.',
      options: [
        { id: 'EARLY', label: 'Stop the bill early so the kids can get home', likely: 'A shorter night. The parents notice.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }, { op: 'REGULARS', pct: .02 }],
          result: 'You ended at half past nine. A few parents shook your hand at the door.' },
        { id: 'RIDES', label: 'Drive the kids home yourself', likely: 'Two hours of your day. They remember it.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'You packed the car with sixteen-year-olds and nobody got a fine.' },
        { id: 'ACCEPT', label: 'Let it run and hope', likely: 'A ticket for a kid, and a call to a parent.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }],
          result: 'The officer waited at the corner. The kid got a warning and the bill ended in a hurry.' }
      ] },

    { id: 'ERIE_PA_FESTIVAL_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The lakefront festival is this weekend, and the bar strip is already taking tables.',
      title: 'The festival eats the street',
      body: 'A festival fills downtown with a crowd and takes the parking. The downtown club has a full house of people who want out of it, and the door staff cannot tell who is eighteen.',
      options: [
        { id: 'LATE', label: 'Push doors back until the stage lets out', likely: 'The crowd that wants a night out shows up late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.95 }],
          result: 'Doors an hour late. The crowd came in loud from the street.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd stays at the festival.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }],
          result: 'Most of the list stayed on the street. The regulars came.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] }
  ]
});
