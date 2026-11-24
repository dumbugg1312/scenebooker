SB.Cities.register('shreveport-la', {
  v: 1,
  slug: 'shreveport-la',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['barksdale', 'barksdale air force base', 'barksdale afb', 'fort polk', 'fort johnson', 'louisiana tech', 'grambling', 'centenary college',
           'centenary', 'lsu shreveport', 'lsus', 'southern university at shreveport', 'bossier parish community college', 'lsu', 'red river revel',
           'state fair of louisiana', 'holiday in dixie', 'highland jazz & blues festival', 'highland jazz and blues festival', 'mudbug madness',
           'independence bowl', 'texas-ou', 'air show', 'shreveport times', 'the shreveport times', 'christmas lights festival',
           'natchitoches meat pie', 'rose city', 'the cypress knee', 'post 1187 hall', 'pecan row carport', 'red clay social club', 'the sandbag',
           'fourth street feed store', 'bayou pierre basement', 'hollywood heights shed', 'texas avenue tire and rim', 'the levee room',
           'pine island rec hall', 'allendale lanes', 'vfw', 'american legion',
           'radiance technologies independence bowl', 'radiance technologies', 'louisiana state fairgrounds', 'shreveport municipal memorial auditorium',
           'municipal auditorium', 'silver lot', 'coca-cola fan fest', 'humor and harmony festival', 'humor & harmony', 'cross lake palooza',
           'metalbug music festival', 'metalbug', '710 keel', 'keel news', 'k945', 'forum news', 'bossier press', 'visit shreveport-bossier',
           'downtown development authority', 'caddo parish sheriff', 'caddo parish commission', 'hargrove amphitheatre', 'provenance free concerts',
           'red river balloon rally', 'red river district', 'shreveport police', 'shreveport city council', 'louisiana-monroe'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['barksdale*', 'red river revel*', 'state fair of louisiana*', 'holiday in dixie*', 'independence bowl*', 'louisiana tech*', 'centenary*', 'mudbug madness*', 'metalbug*', 'humor and harmony*'],

  blurb: ['Carports, church halls and borrowed yards hold a scene too small to split by genre, so everyone plays with everyone, in the heat.',
          'It is a river city of casinos and old brick blocks, far from anywhere, and the best musicians leave for bigger cities.'],
  hard: 'Few rooms, brutal summers, and the one stable venue wants cover bands.',
  region: 'the Ark-La-Tex',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.8 },
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07 },
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Shreveport' },
    { id: 'bossier', kind: 'FEEDER', name: 'Bossier City', minutes: 15, bearing: 85, note: 'Casino strip and base housing across the river, in a different parish with its own sheriff. Mostly part of Shreveport\'s scene.' },
    { id: 'minden', kind: 'FEEDER', name: 'Minden', minutes: 35, bearing: 80, note: 'A small mill and farm seat east on the interstate; some bands, no real scene.' },
    { id: 'marshall', kind: 'FEEDER', name: 'Marshall', state: 'TX', minutes: 40, bearing: 265, note: 'A small east Texas college and railroad town; kids cross the state line for shows.' },
    { id: 'mansfield', kind: 'FEEDER', name: 'Mansfield', minutes: 45, bearing: 195, note: 'Timber and farm country south on the old highway; a few bands.' },
    { id: 'many', kind: 'FEEDER', name: 'Many and Zwolle', minutes: 60, bearing: 190, note: 'Tiny piney-woods towns; a few kids come in.' },
    { id: 'ruston', kind: 'FEEDER', name: 'Ruston', minutes: 70, bearing: 95, note: 'A big public university town with a real college music scene, with a neighboring historically Black university down the road.' },
    { id: 'natchitoches', kind: 'FEEDER', name: 'Natchitoches', minutes: 70, bearing: 175, note: 'The oldest town in the state: a university, tourists and a small college scene.' },
    { id: 'longview', kind: 'PEER', name: 'Longview', state: 'TX', minutes: 60, bearing: 262, slug: 'longview-tx', note: 'A mid-sized east Texas oil and retail town with some scene.' },
    { id: 'texarkana', kind: 'PEER', name: 'Texarkana', minutes: 80, bearing: 340, scene: 250, note: 'Two states in one city, with its own punk circle that trades with Shreveport.' },
    { id: 'monroe', kind: 'PEER', name: 'Monroe', minutes: 90, bearing: 90, scene: 400, note: 'A smaller, rougher neighbor an hour and a half east; the two scenes trade bands constantly.' },
    { id: 'tyler', kind: 'PEER', name: 'Tyler', state: 'TX', minutes: 120, bearing: 255, slug: 'tyler-tx', note: 'A larger, wealthier east Texas city with a small punk circle that swaps bands.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Shreveport', route: 'downtown', note: 'Old brick blocks on the west bank by the river bridges, with a few lofts. Bars and a museum district, and the casinos across the water.' },
    { id: 'ledbetter', name: 'Ledbetter Heights and Allendale', route: 'old-side', note: 'Low-lying historically Black neighborhoods south and west of downtown: shotgun houses, vacant lots and boarded buildings. Do not treat it as a free blank space.' },
    { id: 'highland', name: 'Highland', route: 'old-side', note: 'A historic district of old bungalows and big houses just southwest of downtown, with a small commercial strip and watchful neighbors.' },
    { id: 'broadmoor', name: 'Broadmoor and Youree Drive', route: 'campus', note: 'Mid-century ranch houses, strip malls, church fellowship halls and bowling lanes. Suburban middle-class Shreveport.' },
    { id: 'queensborough', name: 'Queensborough and Hollywood Heights', route: 'work-side', note: 'Older working-class north-central streets of small houses and corner stores. Cheap, and the closest the city has to a punk district.' },
    { id: 'south-shreveport', name: 'South Shreveport and Southern Hills', route: 'campus', note: 'Newer money, malls and big churches along Line Avenue. Where the kids with cars come from. Almost no DIY, many rules.' },
    { id: 'bossier-side', name: 'Bossier City and Airline Drive', route: 'work-side', note: 'Casino row and base rentals across the river. A different parish, so different rules and a different sheriff.' },
    { id: 'cross-lake', name: 'Cross Lake and Caddo Heights', route: 'old-side', note: 'Lake houses and big yards northwest of town. A plausible warm-month yard show, if the neighbors are far enough.' }
  ],

  rooms: [
    { id: 'queensborough-carport', kind: 'HOUSE', hood: 'queensborough', cap: 60, curfew: 1320, ac: false, outdoor: true, pressure: 50, start: true,
      note: 'A carport and back yard among small frame houses. A neighbor and a patrol car end it by ten, and the summer heat empties it first.' },
    { id: 'highland-porch', kind: 'HOUSE', hood: 'highland', cap: 50, curfew: 1320, ac: false, outdoor: true, pressure: 55,
      note: 'A porch and side yard in the old district. The neighbors are watchful, and the first complaint ends the night.' },
    { id: 'lake-yard', kind: 'HOUSE', hood: 'cross-lake', cap: 100, curfew: 1380, ac: false, outdoor: true, pressure: 40,
      note: 'A big lake-side yard for the warm months, far enough from the neighbors. A storm cancels it, and the drive is long.' },
    { id: 'texas-storefront', kind: 'DIY', hood: 'downtown', cap: 120, curfew: 1380, ac: false, pressure: 55, needs: ['VOUCH'],
      note: 'An all-ages storefront stage downtown, run by musicians. Rent and the inspector keep threatening it, and there is talk of a reopening.' },
    { id: 'fellowship-hall', kind: 'HALL', hood: 'broadmoor', cap: 150, curfew: 1320, ac: true, standing: [55, 60, 65],
      note: 'A church fellowship room out on the boulevard. An all-ages night only if you sign for it and pay for the room, and it is out by ten.' },
    { id: 'lake-benefit', kind: 'OUTDOOR', hood: 'cross-lake', cap: 300, curfew: 1260,
      note: 'A one-day lake or park bill with food and a cause. Permits and the weather decide whether it happens at all.' },
    { id: 'highland-bar', kind: 'BAR', hood: 'highland', cap: 150, ages: ['A18', 'A21'], curfew: 1440, ac: true,
      note: 'A dive bar on the Fairfield strip that books local heavy bands. Eighteen-plus early, drinkers late, and you work around them.' },
    { id: 'market-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['A18'], curfew: 1500, ac: true,
      note: 'A former saloon turned heavy-music club. Metal, horror-punk and festival days, and it wants to see a bill first.' },
    { id: 'airline-lounge', kind: 'BAR', hood: 'bossier-side', cap: 250, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A casino-row lounge that mostly wants cover bands. Load-in is past the slot machines.' },
    { id: 'civic-hall', kind: 'BIG', hood: 'downtown', cap: 3000, curfew: 1380, ac: true,
      note: 'The big municipal hall that books touring heavy acts. The room bands dream of and nobody here can book.' }
  ],

  contacts: ['longview-tx', 'tyler-tx', 'lafayette-la', 'baton-rouge-la'],

  calendar: [
    { id: 'crawfish', label: 'the crawfish festival', tag: 'festival', month: 5, week: 4, dows: [4, 5, 6], can: [.82, .78, .75], hoods: ['downtown'], elsewhere: [.97, .95, .95] },
    { id: 'arts-fest', label: 'the arts festival', tag: 'festival', month: 10, weeks: [2, 3], dows: [3, 4, 5, 6], can: [.90, .85, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'fair-oct', label: 'the state fair', tag: 'fair', month: 10, week: 5, dows: [0, 1, 2, 3, 4, 5, 6], can: [.92, .88, .85] },
    { id: 'fair-nov', label: 'the state fair', tag: 'fair', month: 11, weeks: [1, 2], dows: [0, 1, 2, 3, 4, 5, 6], can: [.92, .88, .85] },
    { id: 'bowl-game', label: 'the bowl game', tag: 'game', month: 12, week: 4, dows: [1], can: [.90, .90, .88], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1320, weekend: 1440, inForce: false } },

  points: [
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.8, pop: 1300000 },
    { name: 'Monroe', state: 'LA', lat: 32.51, lon: -92.12, pop: 47000 },
    { name: 'Texarkana', state: 'AR', lat: 33.43, lon: -94.05, pop: 30000 },
    { name: 'Alexandria', state: 'LA', lat: 31.31, lon: -92.45, pop: 45000 }
  ],
  roads: ['I-20', 'I-49', 'I-220', 'US 71', 'US 171', 'US 80'],

  words: {
    street: ['Texas Street', 'Youree Drive', 'Line Avenue', 'Airline Drive', 'Hollywood Avenue', 'Fern Avenue', 'Mansfield Road'],
    water: ['the Red River', 'Cross Lake', 'Cypress Bayou', 'Bayou Pierre'],
    hood: ['Highland', 'Broadmoor', 'Ledbetter Heights', 'Allendale', 'Queensborough', 'Hollywood Heights', 'Southern Hills', 'Caddo Heights'],
    thing: ['carport', 'casino buffet', 'box fan', 'kudzu', 'sno-ball stand', 'pecan tree', 'tire shop', 'church fellowship hall', 'shotgun house', 'generator', 'extension cord', 'minivan', 'boudin run'],
    weather: ['heat advisory', 'hail', 'tornado watch', 'afternoon thunderstorm']
  },

  events: [
    { id: 'SHREVEPORT_LA_CRAWFISH_SATURDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'A big festival fills the river plaza on Saturday, and every lot downtown will be full by noon.',
      title: 'The van cannot get within six blocks',
      body: 'The festival has the river plaza and every parking spot downtown, and the band\'s van is stuck six blocks from the storefront stage, so the gear has to go in on a hand cart.',
      options: [
        { id: 'CART', label: 'Send a few people with hand carts', likely: 'Slow, sweaty work, but most of the gear gets there.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'HOURS', d: -2, when: 'TODAY' }],
          result: 'It took four trips with a borrowed cart, the doors opened an hour late, and the room was loud.' },
        { id: 'MORNING', label: 'Load in before the vendors arrive', likely: 'The crowd comes late, but the stage is ready.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.92 }],
          result: 'You loaded in at dawn and sat on the gear until night, and the crowd came from the festival.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'The casual crowd is stuck in traffic.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.75 }],
          result: 'The parking never cleared, and half the list never found a place to leave the car.' }
      ] },

    { id: 'SHREVEPORT_LA_PARISH_LINE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4] },
      telegraph: 'You hear that the deputies across the river can enforce the curfew now, not just city police.',
      title: 'The deputies are at the parish line',
      body: 'The county deputies can enforce the under-18 curfew now, and the club in Bossier City has a bill that runs past ten. The kids who can come have to be gone before it starts.',
      options: [
        { id: 'EARLY', label: 'Move the start up and finish at ten', likely: 'The kids get a full set, and everyone else gets a short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }],
          result: 'Doors opened early and you were done by ten, so the kids got their set and went home.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The under-18 kids leave in the middle of the bill.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.75 }],
          result: 'A patrol car idled outside and the kids left at ten, mid-song.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new date.' }
      ] },

    { id: 'SHREVEPORT_LA_LAKE_STORM', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [4, 5, 6, 7, 8, 9] },
      telegraph: 'A storm warning is out for three in the afternoon, and the lake benefit day is the same day.',
      title: 'The tarp, the generator and the sky',
      body: 'A thirteen-band lake benefit day gets a storm warning at three, and a big yard, a generator and a tarp decide whether the day survives.',
      options: [
        { id: 'TARP', label: 'Rig the tarp and keep the generator dry', likely: 'A wet, loud day with a smaller crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The tarp held and the day went on, soaked, and the people who stayed were glad.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could make it came.' },
        { id: 'ACCEPT', label: 'Run it and see what the sky does', likely: 'Some bands get rained out.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.7 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'The sky opened at three, and half the bill never played.' }
      ] }
  ]
});
