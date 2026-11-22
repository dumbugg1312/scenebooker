SB.Cities.register('lansing-mi', {
  v: 1,
  slug: 'lansing-mi',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['michigan state university', 'michigan state', 'msu', 'spartan', 'spartans', 'sparrow', 'mclaren', 'general motors',
           'lansing community college', 'auto-owners', 'jackson national', 'dart container', 'reo motor car company', 'ransom e. olds',
           'lansing center', 'common ground music festival', 'lansing jazzfest', 'jazzfest', 'old town bluesfest', 'bluesfest', 'michigan pride',
           'silver bells', 'east lansing art festival', 'great lakes folk festival', 'summer solstice jazz festival', 'mint festival',
           'ionia free fair', 'melonfest', 'alma highland festival', 'alma college', 'central michigan university', 'central michigan',
           'western michigan university', 'greyhound', 'frank lloyd wright', 'state news', 'lansing state journal', 'city pulse',
           'michigan liquor control commission', 'the bumper plant', 'esker street annex', 'sycamore pit', 'slag hall', 'hoist hall',
           'capitol loop lanes', 'ledge road garage', 'st. casimir\'s basement', 'the walkup on franklin', 'local 9 hall',
           'the fabulous acres rec room',
           'spartan stadium', 'lansing community college', 'impact 89fm', 'impact 89', 'wkar', 'wilx', 'common ground', 'silver bells in the city', 'juneteenth parade',
           'lansing fiesta', 'red cedar jubilee', 'old town artfeast', 'artfeast', 'ox roast', 'michigan chicken wing festival', 'adado riverfront park', 'lake lansing park',
           'lansing lugnuts', 'lugnuts', 'lansing police department', 'east lansing police', 'east lansing housing commission', 'lansing board of water and light',
           'michigan metal fest', 'oldsmobile', 'mlcc'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['michigan state*', 'lansing state journal*', 'city pulse*', 'common ground*', 'dart container*', 'auto-owners*', 'lansing center*'],

  blurb: ['Basements near campus carry the scene, and the crowd resets every fall. Bigger cities an hour either way pull the touring bands past.',
          'A basement doubles as somebody\'s laundry room, the sump pump hums, and a landlord\'s email follows the neighbors\' complaint.'],
  hard: 'Students leave in summer, snow hits in winter, and tours skip you.',
  region: 'the Great Lakes',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05 },
    { name: 'Grand Rapids', state: 'MI', lat: 42.96, lon: -85.67 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Lansing' },
    { id: 'grand-ledge', kind: 'FEEDER', name: 'Grand Ledge', minutes: 20, bearing: 270, note: 'A riverside town of sandstone ledges; a few bands and no real room.' },
    { id: 'mason', kind: 'FEEDER', name: 'Mason', minutes: 20, bearing: 175, note: 'The county seat south on US 127; kids come to Lansing for everything.' },
    { id: 'williamston', kind: 'FEEDER', name: 'Williamston', minutes: 20, bearing: 100, note: 'A tiny bedroom town to the east; a handful of kids.' },
    { id: 'charlotte', kind: 'FEEDER', name: 'Charlotte', minutes: 25, bearing: 230, note: 'A farm and commuter county seat.' },
    { id: 'eaton-rapids', kind: 'FEEDER', name: 'Eaton Rapids', minutes: 25, bearing: 205, note: 'A small river town, now a working-class commuter town.' },
    { id: 'st-johns', kind: 'FEEDER', name: 'St. Johns', minutes: 25, bearing: 355, note: 'A farm town to the north.' },
    { id: 'portland', kind: 'FEEDER', name: 'Portland', minutes: 30, bearing: 285, note: 'A tiny farm town off I-96.' },
    { id: 'fowlerville', kind: 'FEEDER', name: 'Fowlerville', minutes: 30, bearing: 95, note: 'Farm kids by the fairgrounds.' },
    { id: 'owosso', kind: 'FEEDER', name: 'Owosso', minutes: 40, bearing: 55, note: 'An old factory town with a few scene-adjacent people.' },
    { id: 'ionia', kind: 'FEEDER', name: 'Ionia', minutes: 45, bearing: 290, note: 'A prison and farm town; kids drive to Lansing or Grand Rapids.' },
    { id: 'jackson', kind: 'PEER', name: 'Jackson', minutes: 45, bearing: 185, scene: 900, note: 'A smaller prison-and-arts town south on US 127 that sees Lansing as the big city.' },
    { id: 'flint', kind: 'PEER', name: 'Flint', minutes: 60, bearing: 65, slug: 'flint-mi', note: 'An auto city with shared industrial history; trades bands and people.' },
    { id: 'ann-arbor', kind: 'PEER', name: 'Ann Arbor', minutes: 60, bearing: 115, slug: 'ann-arbor-mi', note: 'Nearly the same size, with a stronger arts economy: the other Michigan college town.' },
    { id: 'kalamazoo', kind: 'PEER', name: 'Kalamazoo', minutes: 80, bearing: 240, slug: 'kalamazoo-mi', note: 'A university town with a real music presence; people drive for good shows.' }
  ],

  hoods: [
    { id: 'old-town', name: 'Old Town', route: 'downtown', note: 'Restored brick storefronts and galleries on the river; polished, and busy on festival weekends.' },
    { id: 'reo-town', name: 'REO Town', route: 'downtown', note: 'South of downtown along Washington Avenue: studios, arts rooms and old car-works streets slowly being revived.' },
    { id: 'downtown', name: 'downtown and the Capitol', route: 'downtown', note: 'Emptied nightly by state workers who commute home; nearly dead on weekend nights.' },
    { id: 'eastside', name: 'the Eastside', route: 'work-side', note: 'Old frame houses with full basements, working-class families and poor students. Cheap and mostly ignored.' },
    { id: 'westside', name: 'the Westside and Northwest side', route: 'old-side', note: 'Old bungalows, corner stores and church-heavy streets; church basements and small halls.' },
    { id: 'michigan-avenue', name: 'the Michigan Avenue corridor', route: 'work-side', note: 'Strip malls, chains and cheap bars along the city line. Banquet halls and bowling-alley rooms; little DIY.' },
    { id: 'east-lansing', name: 'East Lansing', route: 'campus', note: 'A clean downtown of student bars and rental blocks around the campus; regulated, and the parties draw citations.' },
    { id: 'okemos', name: 'Okemos, Delta Township and Holt', route: 'campus', note: 'Suburbs with parents\' garages and basements; they supply the kids, not the shows.' }
  ],

  rooms: [
    { id: 'campus-basement', kind: 'HOUSE', hood: 'east-lansing', cap: 60, curfew: 1380, ac: false, outdoor: false, pressure: 60, start: true,
      note: 'A basement in a co-op near campus, run by volunteers who pay the costs out of pocket. Packed with first-timers, and the rental license is one more citation from gone.' },
    { id: 'eastside-house', kind: 'HOUSE', hood: 'eastside', cap: 40, curfew: 1350, ac: false, outdoor: false, pressure: 55,
      note: 'A porch-and-basement house on the east side, owner-run and one neighbor away from done.' },
    { id: 'quitting-house', kind: 'HOUSE', hood: 'westside', cap: 50, curfew: 1350, ac: false, outdoor: false, pressure: 70,
      note: 'A punk-and-metal house whose owner is tired. A car already went through the front once, and the next bad night may be the last.' },
    { id: 'vault-room', kind: 'DIY', hood: 'downtown', cap: 150, curfew: 1380, ac: false, pressure: 65, needs: ['VOUCH'],
      note: 'A former bank building with a vault, meant for dry all-ages punk and metal. It needs the zoning board to say yes first.' },
    { id: 'tanning-storefront', kind: 'DIY', hood: 'east-lansing', cap: 80, curfew: 1380, ac: false, pressure: 55,
      note: 'A small commercial space near campus that was never meant for music. Hardcore shows run in it anyway, and the windows sweat.' },
    { id: 'strip-bar', kind: 'BAR', hood: 'east-lansing', cap: 200, curfew: 1500, ac: true,
      note: 'A student bar on the downtown strip that sometimes takes a hardcore bill. The owner sets the age policy, and the owner can change it.' },
    { id: 'east-bar', kind: 'BAR', hood: 'eastside', cap: 200, ages: ['A18'], curfew: 1440, ac: true,
      note: 'A long-running bar with a stage for punk and metal. It went dark for renovations once and the regulars feared the music was done.' },
    { id: 'avenue-club', kind: 'CLUB', hood: 'michigan-avenue', cap: 300, ages: ['ALL'], curfew: 1380, ac: true,
      note: 'A licensed club on the Michigan Avenue strip that lists all-ages punk bills. Management has changed hands before.' },
    { id: 'union-hall', kind: 'HALL', hood: 'east-lansing', cap: 200, curfew: 1320, ac: true, needs: ['VOUCH'],
      note: 'A campus hall that takes hardcore bills if a student group sponsors them. Your friend at the school is the whole key.' },
    { id: 'civic-hall', kind: 'HALL', hood: 'east-lansing', cap: 250, curfew: 1350, ac: true,
      note: 'A civic hall that took punk bills in the eighties. The rent is fair and the rules are long.' },
    { id: 'park-pavilion', kind: 'OUTDOOR', hood: 'okemos', cap: 300, curfew: 1260, outdoor: true,
      note: 'A county park pavilion and field. May through October only, and nobody can be loud after dark.' },
    { id: 'concert-hall', kind: 'BIG', hood: 'downtown', cap: 800, ages: ['ALL'], curfew: 1380, ac: true,
      note: 'A downtown concert hall for touring bills. Out of reach for most locals.' }
  ],

  contacts: ['flint-mi', 'ann-arbor-mi', 'kalamazoo-mi', 'grand-rapids', 'detroit'],

  calendar: [
    { id: 'river-festival', label: 'the riverfront music festival', tag: 'festival', month: 7, week: 1, dows: [3, 4, 5, 6], can: [.88, .85, .85], hoods: ['old-town', 'downtown'], elsewhere: [1, .97, .97] },
    { id: 'fiesta', label: 'the summer fiesta and carnival', tag: 'festival', month: 6, week: 3, dows: [3, 4, 5, 6], can: [.92, .90, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'art-fair', label: 'the old brick district art fair', tag: 'festival', month: 8, week: 3, dows: [5], can: [.92, .90, .90], hoods: ['old-town'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.85, .95, .95], hoods: ['east-lansing', 'eastside'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.85, .95, .95], hoods: ['east-lansing', 'eastside'], elsewhere: [1, 1, 1] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 3], dows: [5], can: [.85, .95, .95], hoods: ['east-lansing', 'eastside'], elsewhere: [1, 1, 1] },
    { id: 'holiday-parade', label: 'the downtown holiday parade', tag: 'parade', month: 11, week: 3, dows: [4], can: [.90, .92, .92], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1440, curfewMinors: { weeknight: 1440, weekend: 1440, inForce: false } },

  points: [
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05, pop: 4300000 },
    { name: 'Grand Rapids', state: 'MI', lat: 42.96, lon: -85.67, pop: 1100000 },
    { name: 'Jackson', state: 'MI', lat: 42.25, lon: -84.4, pop: 160000 },
    { name: 'Battle Creek', state: 'MI', lat: 42.32, lon: -85.18, pop: 135000 }
  ],
  roads: ['I-96', 'I-69', 'I-496', 'US 127', 'M-43', 'M-99'],

  words: {
    street: ['Grand River Avenue', 'Michigan Avenue', 'Saginaw Street', 'Washington Avenue', 'Cedar Street', 'Martin Luther King Boulevard'],
    water: ['the Grand River', 'the Red Cedar'],
    hood: ['Old Town', 'REO Town', 'Old Everett', 'Genesee', 'Edgewood', 'Washington Square', 'Frandor', 'Okemos', 'Holt', 'DeWitt'],
    thing: ['party store', 'coney', 'pop', 'basement', 'salt truck', 'Michigan left', 'sump pump', 'laundry room', 'wristband'],
    weather: ['grey sky', 'ice on the road', 'snow day']
  },

  events: [
    { id: 'LANSING_MI_ZONING_NIGHT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 4] },
      telegraph: 'The new all-ages room needs a rezoning petition, and the hearing is on a weeknight.',
      title: 'Zoning night',
      body: 'The board hears the petition for the old bank building the same evening as your show. The room needs bodies at the hearing, and the bodies are your crowd.',
      options: [
        { id: 'GO', label: 'Send the crowd to the hearing and start late', likely: 'A good cause and a short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'REGULARS', pct: .02 }],
          result: 'Forty kids spoke for three minutes each. The show started at ten and nobody minded.' },
        { id: 'ACCEPT', label: 'Run the show and skip the hearing', likely: 'A full room, and a petition without voices.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1 }],
          result: 'The room was full. The board heard from the landlord and nobody else.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'LANSING_MI_THIRD_CITATION', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [9, 10, 11, 12, 1, 2, 3, 4] },
      telegraph: 'A landlord letter is taped to the basement door. It says two tickets this year, and a third means the license.',
      title: 'The third ticket',
      body: 'The basement near campus already has two nuisance citations. One more and the landlord evicts the tenants to keep the rental license. The host is nervous and the bill is long.',
      options: [
        { id: 'QUIET', label: 'Keep it short and quiet, and pay the host something', likely: 'A tight night and a small thank-you.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'MONEY', amount: -25 }],
          result: 'Done by ten and the street was empty. The host slept for once.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'A packed night and a bad risk.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1 }, { op: 'STRESS', d: 1 }],
          result: 'The room was full and loud. Nobody called, this time.' },
        { id: 'MOVE', label: 'Move it to a hall', likely: 'Safe, with a fee and a smaller room.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .8 }],
          result: 'A hall took the bill. It was clean and legal and a little stiff.' }
      ] },

    { id: 'LANSING_MI_GAME_DAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'A home game is on Saturday, and the east side will be a parking lot by noon.',
      title: 'The game-day squeeze',
      body: 'The stadium crowd takes every road on the east side, and your show is on the wrong side of it. After the game, the same crowd will be looking for a place to be loud.',
      options: [
        { id: 'LATE', label: 'Push doors back until the crowd clears', likely: 'The ones who want a night out come. Later than planned.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors at nine. Strangers in jerseys wandered in with the regulars.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Half the list is stuck in traffic.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The road never moved. The room was the ones who walked.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] }
  ]
});
