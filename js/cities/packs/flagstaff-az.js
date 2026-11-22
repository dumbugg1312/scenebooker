SB.Cities.register('flagstaff-az', {
  v: 1,
  slug: 'flagstaff-az',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['northern arizona university', 'lumberjacks', 'the lumberjack', 'skydome', 'snowbowl', 'arizona daily sun', 'flagstaff live', 'knau',
           'kpub', 'bnsf', 'amtrak', 'greyhound', 'flixbus', 'mountain line', 'route 66 days', 'flagstaff festival of science', 'festival of science',
           'coconino county fair', 'mountain film festival', 'pine cone drop', 'whiskey row', 'arizona department of liquor licenses', 'vfw',
           'american legion', 'pinecone annex', 'the ponderosa garage', 'switchback hall', 'the boxcar room', 'peaks view carport',
           'cinder cone basement', 'the third rail studio', 'aspen alley', 'santa fe avenue backroom', 'the lumber mill loft', 'monsoon yard',
           'highline practice space',
           'flagstaff 365', 'flagstaff chamber', 'visit flagstaff', 'flagstaff shakespeare festival', 'pride in the pines', 'celtic festival', 'chili festival',
           'melt fest', 'walkup skydome', 'bandsintown', 'eventbrite', 'phoenix new times', 'route66 news', 'flagstaff venue guide', 'arizona public radio',
           'big sky conference', 'hall of fame game'],
  /* The dossier's twelve invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['northern arizona*', 'snowbowl*', 'arizona daily sun*', 'flagstaff live*', 'skydome*', 'knau*', 'route 66 days*'],

  blurb: ['A mountain town where a few rooms carry the whole scene, one of them an all-ages art gallery. Pop-punk, emo and heavy bands share bills.',
          'Locals leave for the big city after a few years, and a farewell show is a regular night.'],
  hard: 'Very few rooms, so one closure empties the calendar',
  region: 'the Southwest',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Phoenix', state: 'AZ', lat: 33.45, lon: -112.07 },
    { name: 'Tempe', state: 'AZ', lat: 33.43, lon: -111.94 },
    { name: 'Albuquerque', state: 'NM', lat: 35.08, lon: -106.65 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Flagstaff' },
    { id: 'doney-park', kind: 'FEEDER', name: 'Doney Park', minutes: 15, bearing: 50, note: 'Forest-edge subdivisions northeast of town; kids drive in.' },
    { id: 'kachina', kind: 'FEEDER', name: 'Kachina Village and Munds Park', minutes: 20, bearing: 185, note: 'Cold, quiet pine communities down I-17; a long commute for a show.' },
    { id: 'williams', kind: 'FEEDER', name: 'Williams', minutes: 40, bearing: 280, note: 'A Route 66 tourist town on I-40; its kids have almost no rooms.' },
    { id: 'sedona', kind: 'FEEDER', name: 'Sedona', minutes: 45, bearing: 185, note: 'Retirees and tourism workers; the few young people drive up the canyon.' },
    { id: 'winslow', kind: 'FEEDER', name: 'Winslow', minutes: 60, bearing: 115, note: 'A hard-up railroad town; kids come in for shows.' },
    { id: 'verde-valley', kind: 'FEEDER', name: 'Cottonwood and Camp Verde', minutes: 60, bearing: 195, note: 'A working-class valley with a tiny scene of its own.' },
    { id: 'tuba-city', kind: 'FEEDER', name: 'Tuba City', minutes: 80, bearing: 15, scene: 100, note: 'The largest reservation town, with its own music culture; kids reach Flagstaff for shows.' },
    { id: 'holbrook', kind: 'FEEDER', name: 'Holbrook', minutes: 80, bearing: 100, note: 'A small railroad and highway town far down I-40.' },
    { id: 'prescott', kind: 'PEER', name: 'Prescott', minutes: 90, bearing: 220, scene: 600, note: 'The older, more conservative sibling with three colleges and its own small scene.' },
    { id: 'kingman', kind: 'PEER', name: 'Kingman', minutes: 150, bearing: 280, scene: 250, note: 'A working-class desert town; people drive between the two for shows.' },
    { id: 'gallup', kind: 'PEER', name: 'Gallup', state: 'NM', minutes: 170, bearing: 95, scene: 200, note: 'The next real stop east on I-40.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Brick storefronts, bars and tourists along the old highway and the tracks; ticketed bar bills, hard to run cheap.' },
    { id: 'southside', name: 'Southside', route: 'old-side', note: 'Small old houses south of the tracks, once working-class and Latino, now filling with bars; house shows and rising rent.' },
    { id: 'campus', name: 'the campus blocks', route: 'campus', note: 'Student rentals and apartment complexes by the university; fewer old houses every year.' },
    { id: 'sunnyside', name: 'Sunnyside', route: 'work-side', note: 'A poor, heavily Latino east side of older small houses and motels; garages and backyards.' },
    { id: 'east-side', name: 'east Flagstaff', route: 'work-side', note: 'Subdivisions and mobile home parks past the park; working families and garage practice spaces.' },
    { id: 'west-side', name: 'the west side industrial parks', route: 'work-side', note: 'Warehouses and light-industrial units off the interstate; practice spaces and the odd warehouse show.' },
    { id: 'mountainaire', name: 'Mountainaire', route: 'old-side', note: 'Forest-edge houses with yards south of the city; cheaper, cold and far.' }
  ],

  rooms: [
    { id: 'southside-house', kind: 'HOUSE', hood: 'southside', cap: 50, curfew: 1320, ac: false, pressure: 50, start: true,
      note: 'A living room or garage south of the tracks. The neighbors have heard it before, and the cold pushes everything indoors.' },
    { id: 'sunnyside-garage', kind: 'HOUSE', hood: 'sunnyside', cap: 40, curfew: 1320, ac: false, outdoor: true, pressure: 40,
      note: 'A backyard or garage on the east side. No basements on this ground, and the snow decides the season.' },
    { id: 'beaver-suite', kind: 'DIY', hood: 'downtown', cap: 100, rent: 60, curfew: 1320, ac: false, pressure: 55, needs: ['VOUCH'],
      note: 'An all-ages, dry storefront suite that doubles as a recording room. Shows run seven to ten, and it is one landlord from gone.' },
    { id: 'west-bay', kind: 'DIY', hood: 'west-side', cap: 80, rent: 50, curfew: 1380, ac: false, pressure: 45,
      note: 'A practice-space bay in an industrial park off the interstate. No neighbors to complain, but the landlord and the fire code can.' },
    { id: 'hotel-lounge', kind: 'BAR', hood: 'downtown', cap: 150, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A cocktail lounge in an old hotel that books local punk among other music. Ticketed and drink-driven, so hard to run cheap.' },
    { id: 'southside-tavern', kind: 'BAR', hood: 'southside', cap: 120, ages: ['A21'], curfew: 1470, ac: true,
      note: 'A tavern on the strip south of the tracks with a small stage. Locals\' bills and a cover.' },
    { id: 'rail-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['A18'], curfew: 1500, ac: true, notice: 56,
      note: 'A big room by the rail line that went dark and came back under a promoter with hardcore roots. Touring punk and metal land here.' },
    { id: 'old-theater', kind: 'HALL', hood: 'downtown', cap: 400, ages: ['ALL'], curfew: 1380, ac: true, rent: 400, deposit: 100, owner: 'HALL_MANAGER',
      note: 'A restored historic theater with a steady run of all-ages shows. Ticketed and run by professionals: a step up for a booker with a draw.' },
    { id: 'pine-clearing', kind: 'OUTDOOR', hood: 'mountainaire', cap: 60, curfew: 1260, pressure: 35,
      note: 'A pine clearing at the forest edge with a generator. Snow closes it half the year and dry summers close it the rest.' }
  ],

  contacts: ['prescott-valley-az', 'phoenix', 'tucson', 'albuquerque-nm'],

  calendar: [
    { id: 'pride', label: 'the Pride festival', tag: 'festival', month: 6, week: 3, dows: [5], can: [.92, .90, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'fourth', label: 'the Fourth of July', tag: 'holiday', month: 7, week: 1, dows: [0, 1, 2, 3, 4, 5, 6], can: [.90, .90, .88], hoods: ['downtown'], elsewhere: [.97, .97, .97] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 9, week: 1, dows: [4, 5, 6], can: [.92, .90, .90] },
    { id: 'homecoming', label: 'homecoming weekend', tag: 'game', month: 10, week: 3, dows: [3, 4, 5], can: [.88, .90, .92], hoods: ['downtown', 'campus'], elsewhere: [1, .97, .97] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [2, 4], dows: [5], can: [.90, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [5], can: [.90, .95, .95] },
    { id: 'graduation', label: 'graduation weekend', tag: 'graduation', month: 5, week: 2, dows: [4, 5, 6], can: [.88, .88, .90], hoods: ['campus'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1320, weekend: 1320, inForce: false } },

  points: [
    { name: 'Phoenix', state: 'AZ', lat: 33.45, lon: -112.07, pop: 1600000 },
    { name: 'Kingman', state: 'AZ', lat: 35.19, lon: -114.05, pop: 32000 },
    { name: 'Albuquerque', state: 'NM', lat: 35.08, lon: -106.65, pop: 560000 },
    { name: 'Las Vegas', state: 'NV', lat: 36.17, lon: -115.14, pop: 650000 }
  ],
  roads: ['I-40', 'I-17', 'US 89', 'US 180', 'Route 66'],

  words: {
    street: ['Route 66', 'Santa Fe Avenue', 'Milton Road', 'Beaver Street', 'San Francisco Street', 'Lake Mary Road'],
    water: ['Lake Mary', 'Oak Creek'],
    hood: ['Southside', 'Sunnyside', 'Mountainaire', 'Doney Park', 'Kachina Village', 'Buffalo Park'],
    thing: ['ponderosa', 'freight train', 'ski rack', 'trailhead', 'green chile', 'wood stove', 'art gallery', 'hotel ballroom', 'farewell show'],
    weather: ['monsoon', 'snow day']
  },

  events: [
    { id: 'FLAGSTAFF_AZ_SNOWFALL', when: 'WEEK', tier: 'HARD', weight: 3, cooldown: 35, bind: ['show'],
      if: { daysOut: [0, 3], months: [11, 12, 1, 2, 3] },
      telegraph: 'A heavy storm is stacking up over the peaks and the plows are already out.',
      title: 'The road to the east side is closed',
      body: 'Two feet fell by afternoon. The pass to the interstate is shut, the east-side garage is buried and the bill is a local trio and whoever is already in town.',
      options: [
        { id: 'LOCALS', label: 'Run it with whoever can walk there', likely: 'A small, warm night with the regulars.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'Thirty people in wet boots and one loud local trio. Nobody left early.' },
        { id: 'WAIT', label: 'Hold the doors until the plows come through', likely: 'Late, and the crowd thins.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The plow came at nine. You started at ten and the ones who stayed never forgot it.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'FLAGSTAFF_AZ_HOMECOMING_NOISE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'Homecoming weekend: the bars are full of alumni and the student rentals are loud.',
      title: 'Nine o\'clock noise call',
      body: 'The town tightened its quiet hour and nobody told the house. A neighbor called at nine, and the police are on the porch.',
      options: [
        { id: 'EARLY', label: 'Move the start up and finish before nine', likely: 'A short night. Most of them get in.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors early, done by nine. The ones who came got a short, tight set.' },
        { id: 'SUITE', label: 'Move the whole bill to a downtown suite', likely: 'Smaller, and nobody can call the neighbors.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'DIY', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'A suite took the bill with an hour to spare. Crowded, dry and legal.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'The police may shut it mid-set.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The police stood on the porch through the last two bands. Half the floor left early.' }
      ] },

    { id: 'FLAGSTAFF_AZ_FILL_DATE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4] },
      telegraph: 'A touring band between Phoenix and the east is asking for a fill date, and the fairgrounds are busy.',
      title: 'A fill date and no beer',
      body: 'The tour needs gas money and a floor to sleep on. Your room is dry, so there is no bar to split and the whole night is the door.',
      options: [
        { id: 'DOOR', label: 'Give them the whole door', likely: 'They are happy. You make nothing.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: 1 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.1 }],
          result: 'The tour played loud and sold out of shirts. They left with a full tank and a good word about the town.' },
        { id: 'SHORT', label: 'Put them on a short bill with the locals', likely: 'A modest night for everyone.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Four bands and a tight night. Nobody got rich and everybody got home.' },
        { id: 'PASS', label: 'Pass on it', likely: 'The room stays quiet.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'You passed. The night ran with the locals, and the tour found a basement in Winslow.' }
      ] }
  ]
});
