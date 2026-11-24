SB.Cities.register('miami', {
  v: 1,
  slug: 'miami',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of miami', 'florida international university', 'fiu', 'miami dade college', 'florida atlantic university', 'nova southeastern university',
           'miami new times', 'miami herald', 'sun sentinel', 'broward palm beach new times', 'wlrn', 'wsvn', 'wplg', 'miami heat', 'miami dolphins',
           'florida panthers', 'miami marlins', 'inter miami', 'miami open', 'miami grand prix', 'art basel', 'ultra music festival', 'calle ocho festival',
           'port of miami', 'portmiami', 'miami international airport', 'carnival cruise line', 'baptist health', 'jackson memorial hospital',
           'hurricane andrew', 'hurricane irma', 'hurricane ian', 'hurricane milton', 'homestead air reserve base', 'southcom', 'miami beach convention center',
           'sunpass', 'metrorail', 'metromover', 'brightline', 'publix', 'waffle house', 'amtrak',
           'miami hurricanes', 'hard rock stadium', 'miami music week', 'winter music conference', 'art basel miami beach', 'formula 1 miami grand prix',
           'south beach wine & food festival', 'art deco weekend', 'miami international boat show', 'caplin news', 'miami-dade college', 'wvum', 'rolling loud',
           'miami-dade police'],
  blocklist: ['miami new times*', 'miami herald*', 'sun sentinel*', 'art basel*', 'ultra music*', 'sunpass*', 'brightline*', 'rolling loud*', 'miami hurricanes*'],

  blurb: ['Warehouses, house shows and one long-running punk bar make up the scene in a huge, spread-out metro.',
          'Rooms open fast and close faster, and everybody drives an hour to get anywhere.'],
  hard: 'Spaces keep getting shut or sold, and the audience is an hour of traffic away.',
  region: 'South Florida',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38 },
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'Hardcore fests and halls keep coming back around.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Miami' },
    { id: 'hialeah', kind: 'FEEDER', name: 'Hialeah', minutes: 20, bearing: 340, note: 'A big working-class city. Kids drive in.' },
    { id: 'miami-gardens', kind: 'FEEDER', name: 'Miami Gardens and Opa-locka', minutes: 25, bearing: 340, note: 'Working-class towns to the north.' },
    { id: 'kendall', kind: 'FEEDER', name: 'Kendall and Cutler Bay', minutes: 25, bearing: 220, note: 'Suburban kids.' },
    { id: 'hollywood', kind: 'FEEDER', name: 'Hollywood', minutes: 30, bearing: 5, note: 'In Broward, and it shares the audience.' },
    { id: 'pembroke-pines', kind: 'FEEDER', name: 'Pembroke Pines and Miramar', minutes: 35, bearing: 350, note: 'A big suburban family belt.' },
    { id: 'homestead', kind: 'FEEDER', name: 'Homestead', minutes: 40, bearing: 200, note: 'Far south in farm country. Kids and bands, a long drive.' },
    { id: 'keys', kind: 'FEEDER', name: 'Key Largo and the Keys', minutes: 70, bearing: 190, note: 'A few bands and few kids.' },
    { id: 'fort-lauderdale', kind: 'PEER', name: 'Fort Lauderdale', minutes: 45, bearing: 5, scene: 2500, note: 'Its own bars and its own scene up in Broward.' },
    { id: 'west-palm', kind: 'PEER', name: 'West Palm Beach', minutes: 75, bearing: 350, scene: 1500, note: 'Smaller, with its own scene.' },
    { id: 'naples', kind: 'PEER', name: 'Naples', minutes: 120, bearing: 320, slug: 'naples-fl', note: 'Wealthy, and the scene is thin.' }
  ],

  hoods: [
    { id: 'little-havana', name: 'Little Havana', route: 'old-side', note: 'The older Cuban neighborhood: small houses and shops near downtown.' },
    { id: 'allapattah', name: 'Allapattah', route: 'work-side', note: 'Warehouses and wholesale. It has hosted collective-run DIY spaces and all-ages halls.' },
    { id: 'wynwood', name: 'Wynwood', route: 'downtown', note: 'Old warehouses turned galleries, bars and murals. Tourist-priced now.' },
    { id: 'little-haiti', name: 'Little Haiti and the Design District', route: 'work-side', note: 'Redeveloping fast.' },
    { id: 'overtown', name: 'Overtown and downtown', route: 'downtown', note: 'Bars, arenas and towers. A punk space here was torn down for a car lot.' },
    { id: 'doral', name: 'Doral', route: 'campus', note: 'A warehouse and strip-mall belt near the airport. It hosted an all-ages squat-style space.' },
    { id: 'kendall-hood', name: 'Kendall and Westchester', route: 'campus', note: 'Suburbs where many kids live and drive in.' },
    { id: 'hialeah-hood', name: 'Hialeah', route: 'work-side', note: 'Industrial, working class and mostly Cuban. Kids and bands.' },
    { id: 'miami-beach', name: 'Miami Beach', route: 'downtown', note: 'The tourist strip. Bars, not DIY.' },
    { id: 'coral-gables', name: 'Coral Gables and Coconut Grove', route: 'old-side', note: 'Affluent and tree-lined. Not a scene base.' }
  ],

  rooms: [
    { id: 'kendall-yard', kind: 'HOUSE', hood: 'kendall-hood', cap: 60, curfew: 1350, ac: false, outdoor: true, pressure: 50, start: true,
      note: 'A yard with a pop-up tent and a PA on the patio. The neighbors are close, and the noise rule has no hour.' },
    { id: 'haiti-house', kind: 'HOUSE', hood: 'little-haiti', cap: 80, curfew: 1380, ac: false, outdoor: false, pressure: 55,
      note: 'A lived-in punk house with a back lot, still open. The redevelopment is closing in around it.' },
    { id: 'wholesale-warehouse', kind: 'DIY', hood: 'allapattah', cap: 200, curfew: 1380, ac: false, pressure: 65, needs: ['VOUCH'],
      note: 'A wholesale-district warehouse with a roll-up door and a hand-built stage. It lives until somebody with a badge or a landlord notices.' },
    { id: 'hialeah-unit', kind: 'DIY', hood: 'hialeah-hood', cap: 150, curfew: 1380, ac: false, pressure: 55, needs: ['VOUCH'],
      note: 'A unit in an industrial park next to a wholesale importer. Cheap, loud, and nobody lives next door, but the lease says storage.' },
    { id: 'doral-unit', kind: 'DIY', hood: 'doral', cap: 120, curfew: 1350, ac: true, pressure: 55,
      note: 'A strip-mall unit by the airport. It only works if the crowd can drive there, and the last one lost money.' },
    { id: 'haiti-shop', kind: 'SHOP', hood: 'little-haiti', cap: 60, curfew: 1260, ac: true, following: .2,
      note: 'A record shop that doubles as a coffee shop and a community room. Shows in the front among the racks, early and short, with a sticker table.' },
    { id: 'gallery-room', kind: 'HALL', hood: 'little-haiti', cap: 100, curfew: 1320, ac: true, owner: 'HALL_MANAGER',
      note: 'A gallery room that books bands between openings. Gallery rents and opening nights decide the dates.' },
    { id: 'old-pub', kind: 'BAR', hood: 'little-haiti', cap: 120, ages: ['A21'], curfew: 1560, ac: true, following: .4,
      note: 'The loud, smelly, homey old pub. Metal and hardcore are welcome, since many places will not book them.' },
    { id: 'wynwood-bar', kind: 'BAR', hood: 'wynwood', cap: 200, ages: ['A18'], curfew: 1500, ac: true, pressure: 55,
      note: 'A bar with a back stage, a hub for metal and hardcore. The block is being redeveloped, and two bars nearby have already gone.' },
    { id: 'allapattah-club', kind: 'CLUB', hood: 'allapattah', cap: 300, ages: ['A18'], curfew: 1560, ac: false, following: .4,
      note: 'Packed, humid and dark, with no air. The pits start at small shows and the crowd spills onto the sidewalk between sets.' },
    { id: 'courtyard-stage', kind: 'OUTDOOR', hood: 'little-haiti', cap: 400, rent: 25, ages: ['ALL'], curfew: 1320, ac: false, outdoor: true,
      note: 'A courtyard with stages, not punk by origin. It rents for a day fest and loses the night to the neighbors.' },
    { id: 'taproom-lot', kind: 'OUTDOOR', hood: 'wynwood', cap: 250, rent: 25, ages: ['ALL'], curfew: 1320, ac: false, outdoor: true,
      note: 'A taproom lot that does one-off all-ages bills with wristbands. Twenty-one to drink, everyone else gets a soda.' }
  ],

  contacts: ['naples-fl', 'cape-coral-fl', 'palm-bay-fl', 'orlando'],

  calendar: [
    { id: 'latin-street-fest', label: 'the Latin street festival', tag: 'festival', month: 3, week: 3, dows: [6], can: [.90, .90, .92], hoods: ['little-havana', 'overtown'], elsewhere: [1, 1, 1] },
    { id: 'electronic-fest', label: 'the big electronic festival', tag: 'festival', month: 3, week: 4, dows: [4, 5, 6], can: [.88, .85, .85], hoods: ['overtown'], elsewhere: [1, .95, .95] },
    { id: 'race-weekend', label: 'race weekend', tag: 'race', month: 5, week: 1, dows: [4, 5, 6], can: [.92, .90, .90] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.88, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.88, .95, .95] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 5], dows: [5], can: [.88, .95, .95] },
    { id: 'art-fair-week', label: 'the big art fair week', tag: 'festival', month: 12, weeks: [1, 2], dows: [4, 5, 6], can: [.85, .85, .85], hoods: ['wynwood', 'little-haiti', 'miami-beach'], elsewhere: [1, .97, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1440, inForce: true } },

  points: [
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38, pop: 307000 },
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46, pop: 400000 },
    { name: 'Fort Myers', state: 'FL', lat: 26.64, lon: -81.87, pop: 95000 },
    { name: 'Key West', state: 'FL', lat: 24.56, lon: -81.78, pop: 25000 }
  ],
  roads: ['I-95', 'the Turnpike', 'SR 836', 'SR 826', 'NW 36th Street', 'Flagler Street'],

  words: {
    street: ['Flagler Street', 'Biscayne Boulevard', 'NW 7th Avenue', 'Calle Ocho', 'Collins Avenue', 'NW 36th Street'],
    water: ['Biscayne Bay', 'the Miami River', 'the Intracoastal'],
    hood: ['Little Havana', 'Allapattah', 'Wynwood', 'Little Haiti', 'Overtown', 'Doral', 'Hialeah', 'Westchester'],
    thing: ['expressway', 'causeway', 'hurricane shutters', 'toll', 'cafecito'],
    weather: ['afternoon thunderstorm', 'king tide']
  },

  events: [
    { id: 'MIAMI_STORM_FORECAST', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [6, 7, 8, 9, 10, 11] },
      telegraph: 'A storm is drifting toward the coast, and the forecast cone is wide enough to take in the whole county.',
      title: 'The cone has your show in it',
      body: 'The storm is two days out and the low streets are already flooding with the tide. The show is set for the warehouse in Allapattah, and the roads may not be passable by Saturday.',
      options: [
        { id: 'MOVE_UNIT', label: 'Move the whole bill to a unit in Hialeah, on higher ground', likely: 'It\'s smaller, and a drive for everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'DIY', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'A unit in Hialeah took the bill with the shutters half up, and the crowd was smaller, but the roads held.' },
        { id: 'MOVE_DAY', label: 'Move it a day, once the water goes down', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could make it came.' },
        { id: 'ACCEPT', label: 'Run it and watch the sky', likely: 'People stay home for the storm.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }],
          result: 'Most of the list stayed home to tape windows, and the people who came showed up wet.' }
      ] },

    { id: 'MIAMI_ART_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'festival', months: [12] },
      telegraph: 'The warehouse landlord has gone quiet, because art fair week has the whole district booked for galleries and parties.',
      title: 'The landlord is hosting a gallery',
      body: 'During art fair week the roll-up door can be used for a party but not for a band, unless you pay what a gallery pays, and your date is the same weekend.',
      options: [
        { id: 'PAY', label: 'Pay the gallery rate and keep the room', likely: 'It costs real money, because rents spike all week.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'You paid what a gallery pays, and the band played in front of a mural nobody asked for.' },
        { id: 'UNIT', label: 'Move to a unit in Hialeah, away from the fair', likely: 'It\'s smaller and farther away, but the door is yours.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'DIY', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'A Hialeah unit took the bill, with no gallery and no party and plenty of noise.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, to after the fair cleared, and not everyone could make the new one.' }
      ] },

    { id: 'MIAMI_MIDNIGHT_CURFEW', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [3, 4, 5, 6, 7, 8] },
      telegraph: 'Patrols are out for spring break and summer, and the curfew for kids under seventeen is being enforced again.',
      title: 'Midnight and the kids under seventeen',
      body: 'Your Friday show runs past midnight and the patrols are watching the door, and anyone under seventeen has to be out or with an adult before twelve.',
      options: [
        { id: 'EARLY', label: 'Move the start up so the kids can leave in time', likely: 'Most of them make it home.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'You opened doors early and finished by eleven-thirty, and the kids were out of the lot before the patrols turned the corner.' },
        { id: 'ADULT', label: 'Run late and make the little kids leave at eleven', likely: 'It\'s a thinner room with some hard feelings.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The younger kids went home at eleven and the older crowd stayed, and nobody was happy about it.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Some people won\'t risk it.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Half the younger kids stayed home rather than risk a call to their parents.' }
      ] }
  ]
});
