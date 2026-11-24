SB.Cities.register('madison-wi', {
  v: 1,
  slug: 'madison-wi',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['dane county farmers market', 'art fair on the square', 'taste of madison', 'atwood fest', 'marquette waterfront festival', 'eken park festival', 'true north festival', 'monroe street festival', 'make music madison', 'wisconsin film festival', 'shamrock shuffle', 'midwest horse fair', 'holiday fantasy in lights', 'stoughton syttende mai', 'syttende mai', 'dane county fair', 'tone madison', 'city cast madison', 'madison commons', 'wmdx', 'madison365', 'visit madison', 'madison police', 'madison fire department', 'olin park', 'warner park', 'memorial union', 'monona terrace', 'overture center', 'wisconsin union', 'uw athletics', 'big ten', 'notre dame', 'university of wisconsin', 'university of wisconsin-madison', 'uw-madison', 'uw madison', 'uw health', 'uw-whitewater', 'uw-platteville', 'badgers', 'camp randall',
           'mifflin street block party', 'mifflin', 'mifflin street', 'freakfest', 'great taste of the midwest', 'great taste', 'ironman wisconsin', 'dane county farmers\' market',
           'brat fest', 'orton park festival', 'epic systems', 'capital times', 'wisconsin state journal', 'state journal', 'daily cardinal', 'badger herald',
           'wort', 'wsum', 'packers', 'green bay packers', 'culver\'s', 'spotted cow', 'sconnie', 'madison area technical college', 'edgewood college',
           'the lakeside annex', 'fourth lake hall', 'the yahara cellar', 'bascom basement club', 'the dane street lodge', 'cold frame room', 'the odana pavilion',
           'the square annex loft', 'the greenbush hall', 'the cheddar room', 'the sauk road rec room', 'wingra back porch'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['freakfest*', 'camp randall*', 'great taste*', 'daily cardinal*'],

  blurb: ['Wisconsin\'s capital on an isthmus between two lakes: a bike-and-co-op college town where weird local art counts as a civic good.',
          'Students fill the basements from October to April, then vanish with the leases in May. Rents climb, but the weird-art tradition holds.'],
  hard: 'Under-21 law and the May exodus: all-ages rooms and a summer crowd are scarce.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Milwaukee', state: 'WI', lat: 43.04, lon: -87.91 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Madison' },
    { id: 'sun-prairie', kind: 'FEEDER', name: 'Sun Prairie', minutes: 20, bearing: 60, scene: 50, note: 'A fast-growing suburb to the northeast. Its kids come into town for everything.' },
    { id: 'stoughton', kind: 'FEEDER', name: 'Stoughton', minutes: 25, bearing: 130, note: 'A Norwegian-heritage town to the southeast with a small DIY tradition at best.' },
    { id: 'mount-horeb', kind: 'FEEDER', name: 'Mount Horeb', minutes: 30, bearing: 255, note: 'The first hill town of the Driftless country to the west. Kids drive in for shows.' },
    { id: 'fort-atkinson', kind: 'FEEDER', name: 'Fort Atkinson', minutes: 40, bearing: 105, note: 'A dairy and small-factory town in the shadow of the capital.' },
    { id: 'janesville', kind: 'FEEDER', name: 'Janesville', minutes: 40, bearing: 160, scene: 55, note: 'A working-class town that lost its car plant, with a scene of its own.' },
    { id: 'watertown', kind: 'FEEDER', name: 'Watertown', minutes: 45, bearing: 85, note: 'A German-heritage factory town with high-school bands and some house shows.' },
    { id: 'whitewater', kind: 'FEEDER', name: 'Whitewater', minutes: 45, bearing: 115, scene: 50, note: 'A state-college town with its own student scene, the most self-contained of the ring.' },
    { id: 'portage', kind: 'FEEDER', name: 'Portage', minutes: 45, bearing: 5, note: 'A small river and farm town where the kids come south.' },
    { id: 'beloit', kind: 'FEEDER', name: 'Beloit', minutes: 50, bearing: 175, note: 'A border mill town with a small private college and bands of its own.' },
    { id: 'baraboo', kind: 'FEEDER', name: 'Baraboo', minutes: 60, bearing: 345, note: 'A seasonal tourist town up US 12 near the bluffs.' },
    { id: 'rockford', kind: 'PEER', name: 'Rockford', state: 'IL', minutes: 70, bearing: 180, slug: 'rockford-il', note: 'A bigger working-class neighbor down the interstate: more cousin than rival.' },
    { id: 'green-bay', kind: 'PEER', name: 'Green Bay', state: 'WI', minutes: 135, bearing: 55, slug: 'green-bay-wi', note: 'Football-obsessed and a long way off. Madison people see it as another planet.' },
    { id: 'iowa-city', kind: 'PEER', name: 'Iowa City', state: 'IA', minutes: 165, bearing: 225, slug: 'iowa-city-ia', note: 'Another university town, an obvious partner on the Midwest loop.' },
    { id: 'eau-claire', kind: 'PEER', name: 'Eau Claire', state: 'WI', minutes: 165, bearing: 310, slug: 'eau-claire-wi', note: 'A small city with a big reputation for serious music. The two see each other as the state\'s music towns.' }
  ],

  hoods: [
    { id: 'downtown', name: 'the Square and State Street', route: 'downtown', note: 'Licensed bars, theaters and clubs around the capitol. The door-deal rooms, heavily policed and priced out of DIY.' },
    { id: 'willy-street', name: 'Willy Street and Marquette', route: 'old-side', note: 'Co-ops, bike shops and old houses with basements. The historic heart of house shows, now expensive, with homeowner neighbors.' },
    { id: 'tenney-lapham', name: 'Tenney-Lapham', route: 'old-side', note: 'Old frame houses between the lake and the river. Shared rentals and quiet-ish basements.' },
    { id: 'atwood', name: 'Atwood and Schenk', route: 'work-side', note: 'Bungalows and small shops on the east side, the weird-but-friendly arts crowd, getting family-priced.' },
    { id: 'near-west', name: 'the near west side by the stadium', route: 'campus', note: 'Student rentals and older houses. Gameday parking and the spring street party dominate here.' },
    { id: 'east-washington', name: 'East Washington and the north side', route: 'work-side', note: 'Warehouses and light industry being replaced by apartments. Practice spaces until the owner notices.' },
    { id: 'south-side', name: 'Park Street and the south side', route: 'work-side', note: 'Working-class and immigrant neighborhoods, strip malls and cheaper apartments. Cheap space and tolerant landlords, little scene.' },
    { id: 'west-side', name: 'the west side and the Beltline', route: 'campus', note: 'Shopping malls and subdivisions with big basements, home of the all-ages audience\'s parents.' },
    { id: 'sun-prairie-hood', name: 'Sun Prairie', route: 'town:sun-prairie', note: 'Newer subdivisions and a lot of garages.' }
  ],

  rooms: [
    { id: 'tenney-basement', kind: 'HOUSE', hood: 'tenney-lapham', cap: 60, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, pressure: 55, start: true,
      note: 'A basement under a shared student rental. The address goes out by message and the door donation is five dollars.' },
    { id: 'stadium-basement', kind: 'HOUSE', hood: 'near-west', cap: 80, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, pressure: 60,
      note: 'The old student-house basement circuit by the stadium. Game days and spring street weekends swallow it, and landlords get nervous.' },
    { id: 'atwood-parlor', kind: 'HOUSE', hood: 'atwood', cap: 40, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, pressure: 40,
      note: 'A living room and basement, quiet and older and politely run.' },
    { id: 'lake-church', kind: 'DIY', hood: 'willy-street', cap: 150, pa: .5, curfew: 1380, ac: false, pressure: 60,
      note: 'A converted old church used as a home venue, the biggest DIY draw in town. It has moved three times and the fire inspector knows its name.' },
    { id: 'arts-warehouse', kind: 'DIY', hood: 'east-washington', cap: 100, pa: .5, curfew: 1320, ac: true, pressure: 50,
      note: 'A volunteer-run all-ages arts studio in a warehouse building. The rent is rising and the building could be sold.' },
    { id: 'park-shelter', kind: 'HALL', hood: 'willy-street', cap: 120, ages: ['ALL'], curfew: 1260, ac: false, outdoor: true, rent: 60,
      note: 'A pavilion in an east-side park, good for a summer afternoon. The permit and the closing hour are the whole rulebook.' },
    { id: 'co-op-shop', kind: 'SHOP', hood: 'willy-street', cap: 40, ages: ['ALL'], ac: false, following: .2,
      note: 'A bike shop and record shop on the old-side strip. In-store sets, and a back lot in warm months.' },
    { id: 'willy-dive', kind: 'BAR', hood: 'willy-street', cap: 200, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A dive bar with a stage and a door deal. Underage only with a guardian or as a hired act.' },
    { id: 'atwood-bar', kind: 'BAR', hood: 'atwood', cap: 195, ages: ['A21'], curfew: 1470, ac: true,
      note: 'A neighborhood bar with a stage. The 18-plus nights are rare and early.' },
    { id: 'campus-club', kind: 'CLUB', hood: 'near-west', cap: 300, ages: ['A18'], curfew: 1470, ac: true,
      note: 'The one campus-area room where most under-21 bands can play a bar-sized stage. Fights on student nights keep the license nervous.' },
    { id: 'square-club', kind: 'CLUB', hood: 'downtown', cap: 350, ages: ['A18'], curfew: 1500, ac: true,
      note: 'A licensed club on the Square that sometimes runs 18-plus bills. The rules get shuffled after every fight.' },
    { id: 'east-hall', kind: 'BIG', hood: 'east-washington', cap: 700, ages: ['A18'], curfew: 1380, ac: true,
      note: 'A new independent hall, rare for a city this size. It pulls touring punk away from the clubs.' }
  ],

  contacts: ['rockford-il', 'iowa-city-ia', 'eau-claire-wi', 'green-bay-wi', 'milwaukee'],

  calendar: [
    { id: 'street-party', label: 'the spring street party', tag: 'festival', month: 4, week: 4, dows: [5], can: [0.8, 0.85, 0.85], hoods: ['near-west'], elsewhere: [.95,.95,.95] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [2, 4], dows: [5], can: [0.85, 0.9, 0.9], hoods: ['near-west', 'downtown'], elsewhere: [.95,.95,.95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [5], can: [0.85, 0.9, 0.9], hoods: ['near-west', 'downtown'], elsewhere: [.95,.95,.95] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 4], dows: [5], can: [0.85, 0.9, 0.9], hoods: ['near-west', 'downtown'], elsewhere: [.95,.95,.95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [0.92, 0.9, 0.9], hoods: ['downtown'], elsewhere: [1.08,1.05,1] },
    { id: 'beer-fest', label: 'the big beer festival', tag: 'festival', month: 8, week: 2, dows: [5], can: [0.95, 0.92, 0.92] },
    { id: 'art-fair', label: 'the downtown art fair', tag: 'fair', month: 7, week: 3, dows: [5, 6], can: [0.88, 0.85, 0.88], hoods: ['downtown'], elsewhere: [1,1,1] },
    { id: 'willy-fair', label: 'the Willy Street street fair', tag: 'festival', month: 9, week: 3, dows: [5, 6], can: [0.88, 0.85, 0.88], hoods: ['willy-street'], elsewhere: [1,1,1] },
    { id: 'lease-turnover', label: 'the end of the leases', tag: 'graduation', month: 5, weeks: [1, 2], dows: [4, 5, 6], can: [0.85, 0.8, 0.8] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.1] }
  ],

  points: [
    { name: 'Milwaukee', state: 'WI', lat: 43.04, lon: -87.91, pop: 1570000 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 9500000 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27, pop: 3700000 },
    { name: 'La Crosse', state: 'WI', lat: 43.8, lon: -91.24, pop: 52000 }
  ],
  roads: ['I-90', 'I-94', 'I-39', 'US 151', 'US 12', 'the Beltline'],

  words: {
    street: ['State Street', 'Willy Street', 'Atwood Avenue', 'Park Street', 'Monroe Street', 'East Washington Avenue', 'the Beltline'],
    water: ['Lake Mendota', 'Lake Monona', 'Lake Wingra', 'the Yahara'],
    hood: ['Marquette', 'Tenney-Lapham', 'Schenk-Atwood', 'Greenbush', 'Vilas', 'Bay Creek', 'Allied Drive', 'Hilldale', 'Middleton', 'Verona', 'Fitchburg'],
    thing: ['fish fry', 'cheese curd', 'brat', 'old fashioned', 'studded tire', 'co-op', 'bubbler', 'frozen custard'],
    weather: ['deep freeze', 'lake-effect snow', 'muddy thaw']
  },

  events: [
    { id: 'MADISON_WI_FIRE_NOTICE', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'A neighbor called the fire department about the church house, and the inspector left a card.',
      title: 'The fire notice',
      body: 'The inspector says the old church has no record as a music venue. The night cannot happen there, and the host is scared.',
      options: [
        { id: 'SHELTER', label: 'Move to an afternoon park shelter', likely: 'Daylight, a permit and no neighbors to call.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .8 }],
          result: 'An afternoon on the lawn, with a generator and no complaints.' },
        { id: 'BASEMENT', label: 'Move the whole bill to a basement', likely: 'Smaller and louder, and nobody inspects a basement.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .5 }],
          result: 'A student basement took the bill, and the floor was packed.' },
        { id: 'ACCEPT', label: 'Run it anyway and take the risk', likely: 'The host may never speak to you again.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Half the list stayed home rather than risk a citation.' }
      ] },

    { id: 'MADISON_WI_FOOTBALL_FRIDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'It is a home football weekend and the whole isthmus is parking lots.',
      title: 'Game weekend on the isthmus',
      body: 'Tens of thousands of fans, no parking and no sober drivers, and your bill sits right in the middle.',
      options: [
        { id: 'LATE', label: 'Push doors back until the game crowd thins out', likely: 'The ones who want a night out come in late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors opened an hour late, and the crowd walked in from the bars, loud and happy.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the game.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The casual crowd stayed out of it, and the regulars came.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new date.' }
      ] },

    { id: 'MADISON_WI_DEEP_FREEZE', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [12, 1, 2] },
      telegraph: 'A deep freeze has the bike lanes closed and the radiators banging.',
      title: 'The deep freeze',
      body: 'It is twelve below and the basement is the only warm room you have. The crowd is arriving on studded tires.',
      options: [
        { id: 'SHORT', label: 'Run the short bill and keep the room warm', likely: 'It\'s a small, close night, and the ones who came really wanted to.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Two bands, a space heater, and the door donation in hats and blankets.' },
        { id: 'WAIT', label: 'Hold the doors until the bands thaw out', likely: 'The start is late, and the crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The van pulled in at nine, and nobody left, because nobody wanted to go out.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and everyone trusts you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the ones who could come came.' }
      ] }
  ]
});
