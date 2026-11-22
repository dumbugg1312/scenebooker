SB.Cities.register('salinas-ca', {
  v: 1,
  slug: 'salinas-ca',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['hartnell college', 'hartnell', 'csumb', 'cal state monterey bay', 'california state university monterey bay', 'fort ord',
           'presidio of monterey', 'defense language institute', 'california rodeo salinas', 'california rodeo', 'big week', 'kiddie kapers',
           'el grito', 'ciclovia', 'salinas asian festival', 'first fridays', 'founders day', 'california international airshow', 'garlic festival',
           'strawberry festival', 'salinas union high school district', 'steinbeck house', 'steinbeck museum', 'national steinbeck center', 'amtrak',
           'coast starlight', 'greyhound', 'mst', 'monterey-salinas transit', 'oakland warehouse fire', 'ghost ship', 'ucsc', 'uc santa cruz',
           'university of california santa cruz', 'salad bowl of the world', 'the lettuce shed', 'sycamore hall', 'chinatown annex',
           'the packing house', 'gabilan street garage', 'fog line', 'the cold storage', 'rincon lot', 'boronda backyard', 'the sanjon',
           'artichoke room', 'salinas californian', 'monterey county now', 'monterey county weekly', 'mc weekly', 'golden state theatre', 'golden state theater', 'monterey fairgrounds', 'salinas sports complex', 'rodeo carnival', 'kiddie kapers parade', 'noche bohemia', 'festa italia', 'salinas valley fair', 'steinbeck festival', 'seemonterey', 'meet salinas', 'kqed'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['hartnell*', 'california rodeo*', 'el grito*', 'csumb*', 'fort ord*', 'ciclovia*'],

  blurb: ['Backyards and rented halls carry the shows here, and everyone\'s cousin is in the crowd.',
          'Salinas bands play outward to the coast and the Bay more than anyone plays in.'],
  hard: 'Few all-ages rooms, strict landlords, and no one booking through.',
  region: 'the Central Coast',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'San Jose', state: 'CA', lat: 37.34, lon: -121.89 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Oakland', state: 'CA', lat: 37.8, lon: -122.27 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Salinas' },
    { id: 'castroville', kind: 'FEEDER', name: 'Castroville', minutes: 10, bearing: 305, note: 'A small artichoke-farm town, mostly Latino. Backyard scale at most.' },
    { id: 'gonzales', kind: 'FEEDER', name: 'Gonzales', minutes: 20, bearing: 150, note: 'A tiny farm town down US 101.' },
    { id: 'marina', kind: 'FEEDER', name: 'Marina', minutes: 25, bearing: 285, note: 'A former army-base town by the dunes, with a university and many veterans.' },
    { id: 'seaside', kind: 'FEEDER', name: 'Seaside', minutes: 25, bearing: 275, note: 'A working-class, military-linked town toward the Peninsula.' },
    { id: 'soledad', kind: 'FEEDER', name: 'Soledad', minutes: 25, bearing: 150, note: 'A farm town and prison town in the valley; backyard shows only.' },
    { id: 'monterey', kind: 'FEEDER', name: 'Monterey and Pacific Grove', minutes: 25, bearing: 255, note: 'Tourist money and military schools over the hill; small and transient.' },
    { id: 'greenfield', kind: 'FEEDER', name: 'Greenfield', minutes: 35, bearing: 150, note: 'A young, mostly Latino farm town where kids have no room of their own.' },
    { id: 'watsonville', kind: 'FEEDER', name: 'Watsonville', minutes: 40, bearing: 330, note: 'A berry town north on the coast road, likely with its own scene and more rooms.' },
    { id: 'hollister', kind: 'FEEDER', name: 'Hollister', minutes: 45, bearing: 35, note: 'A farm town in the next county, with a motorcycle history.' },
    { id: 'gilroy', kind: 'FEEDER', name: 'Gilroy', minutes: 45, bearing: 355, note: 'A garlic town and Silicon Valley bedroom community.' },
    { id: 'santa-cruz', kind: 'PEER', name: 'Santa Cruz', minutes: 55, bearing: 325, slug: 'santa-cruz-ca', note: 'Over the hill: the real exchange partner. Salinas kids go there for shows; few come back.' },
    { id: 'san-luis-obispo', kind: 'PEER', name: 'San Luis Obispo', minutes: 135, bearing: 160, slug: 'san-luis-obispo-ca', note: 'Two hours south on US 101: a college town on the same coast route.' },
    { id: 'modesto', kind: 'PEER', name: 'Modesto', minutes: 150, bearing: 55, slug: 'modesto-ca', note: 'Over the pass into the Central Valley; the two trade little.' }
  ],

  hoods: [
    { id: 'alisal', name: 'Alisal and East Salinas', route: 'old-side', note: 'Dense, working-class and immigrant blocks with taquerias and swap meets. The biggest crowd of teenagers in town, and the most attention from neighbors and police.' },
    { id: 'oldtown', name: 'Oldtown and downtown', route: 'downtown', note: 'A Victorian and Art Deco core with galleries, a theater and a few bars. Polished, with little tolerance for noise after ten.' },
    { id: 'chinatown', name: 'Chinatown and the tracks', route: 'work-side', note: 'Old brick and warehouses north of downtown. Cheap and ignored, and where patience for crowds runs out fastest.' },
    { id: 'north-main', name: 'North Main and the rodeo grounds', route: 'work-side', note: 'Big lots that are the center of the city one week in July and industrial strip the rest of the year.' },
    { id: 'north-salinas', name: 'North Salinas', route: 'campus', note: 'Tract homes with two-car garages, a mall and big-box strips. Where kids with cars and allowances live.' },
    { id: 'west-salinas', name: 'West Salinas and Boronda', route: 'campus', note: 'Newer tract housing west of the freeway, quiet and car-dependent.' },
    { id: 'south-salinas', name: 'South Salinas and Maple Park', route: 'work-side', note: 'Older, lower-income blocks toward the freight corridor, with industrial buildings along the tracks.' }
  ],

  rooms: [
    { id: 'north-garage', kind: 'HOUSE', hood: 'north-salinas', cap: 60, hostCut: 0, pa: .4, curfew: 1290, ac: false, outdoor: false, sketch: 20, standing: [70, 60, 45],
      pressure: 50, start: true, note: 'A two-car garage and a driveway on a tract street. The neighbors may be your cousins, and a patrol car and a landlord letter come after them.' },
    { id: 'alisal-yard', kind: 'HOUSE', hood: 'alisal', cap: 80, hostCut: 0, pa: .4, curfew: 1260, ac: false, outdoor: true, sketch: 25, standing: [65, 60, 40],
      pressure: 60, note: 'A long backyard on a crowded block. Plenty of kids, and everyone on the street knows by nine.' },
    { id: 'alisal-banquet', kind: 'HALL', hood: 'alisal', cap: 200, rent: 220, deposit: 100, pa: .5, curfew: 1320, ac: true, sketch: 10, standing: [55, 60, 60],
      owner: 'HALL_MANAGER', pressure: 50, note: 'A banquet hall that rents for quinceaneras, with a deposit, an occupancy sign and a hired guard. One noise complaint and it stops renting to bands.' },
    { id: 'civic-hall', kind: 'HALL', hood: 'oldtown', cap: 350, rent: 300, deposit: 100, pa: .6, curfew: 1320, ac: true, sketch: 10, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', pressure: 45, note: 'A fifty-year-old city hall on North Main with movable risers. Seating that sticks can have the city pull it from bookers overnight.' },
    { id: 'main-bar', kind: 'BAR', hood: 'oldtown', cap: 150, soundFee: 50, pa: .6, ages: ['ALL', 'A21'], matinee: true, curfew: 1380, ac: true, following: .3, sketch: 20,
      standing: [50, 65, 70], pressure: 50, note: 'A bar at the south end of Main that has run all-ages punk and metal early in the night. It only happens when the owner says yes.' },
    { id: 'brick-storefront', kind: 'DIY', hood: 'chinatown', cap: 120, rent: 60, pa: .5, curfew: 1320, ac: false, sketch: 40, standing: [55, 60, 45],
      pressure: 55, needs: ['VOUCH'], note: 'A rented brick storefront by the tracks. Cheap and ignored until a crowd shows, and then it is the fire marshal and the landlord.' },
    { id: 'tracks-garage', kind: 'DIY', hood: 'south-salinas', cap: 80, rent: 40, pa: .5, curfew: 1290, ac: false, sketch: 35, standing: [60, 60, 45],
      pressure: 50, note: 'A storage-unit practice space along the freight line that turns into a room for one night.' },
    { id: 'rodeo-lot', kind: 'OUTDOOR', hood: 'north-main', cap: 150, rent: 15, pa: .4, curfew: 1260, ac: false, outdoor: true, sketch: 35, standing: [60, 55, 40],
      note: 'A lot at the edge of the riverbed with a generator. Trespass and farm security are the weather.' },
    { id: 'main-club', kind: 'CLUB', hood: 'oldtown', cap: 300, houseCosts: 200, split: .8, pa: .9, ages: ['A21'], curfew: 1410, ac: true, following: .5, sketch: 15,
      standing: [45, 70, 65], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A bigger bar-club near Main for the occasional touring bill. Hard to get for a booker nobody knows.' },
    { id: 'old-theater', kind: 'BIG', hood: 'oldtown', cap: 1400, rent: 1800, deposit: 500, pa: 1, ages: ['ALL'], curfew: 1380, ac: true, following: .7, sketch: 5,
      standing: [40, 70, 65], owner: 'TALENT_BUYER', notice: 90, needs: ['FULL_BILL'], note: 'A restored downtown theater that books touring acts. Far out of reach for a garage bill.' }
  ],

  contacts: ['santa-cruz-ca', 'san-jose', 'san-luis-obispo-ca', 'modesto-ca', 'fresno'],

  calendar: [
    { id: 'rodeo-week', label: 'the rodeo week', tag: 'fair', month: 7, week: 3, dows: [3, 4, 5, 6], can: [.85, .80, .80], hoods: ['north-main'], elsewhere: [.95, .92, .90] },
    { id: 'airshow', label: 'the air show', tag: 'airshow', month: 9, week: 4, dows: [5, 6], can: [.92, .95, 1] },
    { id: 'lights-parade', label: 'the holiday lights parade', tag: 'parade', month: 11, week: 4, dows: [6], can: [1, 1, .88], hoods: ['oldtown'], elsewhere: [1, 1, 1] },
    { id: 'street-festival', label: 'the summer street festival', tag: 'festival', month: 6, week: 4, dows: [5], can: [.92, .90, .90], hoods: ['oldtown'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1260 },

  points: [
    { name: 'San Jose', state: 'CA', lat: 37.34, lon: -121.89, pop: 1000000 },
    { name: 'Santa Cruz', state: 'CA', lat: 36.97, lon: -122.03, pop: 63000 },
    { name: 'Monterey', state: 'CA', lat: 36.6, lon: -121.89, pop: 28000 },
    { name: 'Paso Robles', state: 'CA', lat: 35.63, lon: -120.69, pop: 31000 }
  ],
  roads: ['US 101', 'Highway 68', 'Highway 183', 'Highway 156', 'Highway 1'],

  words: {
    street: ['Alisal Street', 'Main Street', 'Highway 101', 'Highway 68', 'Highway 183'],
    water: ['the Salinas River', 'the riverbed'],
    hood: ['Alisal', 'Oldtown', 'Chinatown', 'Harden Ranch', 'Santa Rita', 'Boronda', 'Laurelwood', 'Maple Park', 'Sherwood Gardens', 'the East Side'],
    thing: ['taco truck', 'lettuce field', 'packing shed', 'panaderia', 'garage', 'strawberry stand', 'crate label', 'quinceanera hall', 'storage unit', 'rented banquet hall', 'driveway'],
    weather: ['fog bank', 'afternoon wind', 'winter rain']
  },

  events: [
    { id: 'SALINAS_CA_RODEO_LOTS', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The carnival rides are going up on North Main, and the lots are filling.',
      title: 'The lots are full',
      body: 'It is rodeo week and the whole city is parked on North Main. The band\'s van is blocked in a block away, the hotels are full, and load-in is a maze of traffic cones.',
      options: [
        { id: 'EARLY', label: 'Move load-in two hours earlier', likely: 'The van gets in. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Load-in at four, before the lots filled. The room was set by the time the crowds came.' },
        { id: 'HOUSE', label: 'Move the bill to a garage across town', likely: 'Smaller and easier. Nobody has to park.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A garage took the bill with an hour to spare, and the driveway was packed.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'Half the town is at the rodeo.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The regulars found parking. Most of the rest stayed at the carnival.' }
      ] },

    { id: 'SALINAS_CA_HALL_CLOSED', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [6] },
      telegraph: 'A notice on the city door says the hall floor is closed for repairs.',
      title: 'The hall floor is closed',
      body: 'The city has posted that the hall is closed for repairs the week of your show. You have days to find a room for the bill.',
      options: [
        { id: 'BANQUET', label: 'Rent a banquet hall on the east side', likely: 'Costs money and a deposit. The crowd follows.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'A banquet hall took the date for a deposit, a guard and a long list of rules.' },
        { id: 'GARAGE', label: 'Move it to a garage', likely: 'Smaller and louder. Nobody can close a driveway.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'The bill fit in a garage and the whole street heard it.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'SALINAS_CA_PARADE_SUNDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'The holiday parade is closing Main Street on Sunday evening.',
      title: 'Main Street shuts for the parade',
      body: 'The parade closes the street for the evening. Your all-ages show next door gets the crowd for an hour before the floats, then loses it.',
      options: [
        { id: 'EARLY', label: 'Open doors early and finish before the parade', likely: 'A short night with a good crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.15 }],
          result: 'Doors early, done before the first float. A tight set and a full room.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The streets are closed. Most people go to the parade.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The parade took the crowd. The ones who came were the real regulars.' }
      ] }
  ]
});
