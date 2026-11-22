SB.Cities.register('south-bend-in', {
  v: 1,
  slug: 'south-bend-in',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of notre dame', 'notre dame', 'saint mary\'s college', 'holy cross college', 'indiana university south bend', 'iusb',
           'bethel university', 'ivy tech', 'goshen college', 'western michigan university', 'culver academies', 'studebaker', 'south bend tribune',
           'amtrak', 'lake shore limited', 'vfw', 'the dome', 'ignition park', 'paczki day', 'eddy street commons',
           'the tollgate annex', 'tollgate annex', 'lake-effect hall', 'lake effect hall', 'wheel and wagon room', 'the bend social club',
           'bend social club', 'bendix basement', 'paczki hall', 'the portage back room', 'portage back room', 'the kiln',
           'sixth street parish hall', 'the east race annex', 'east race annex', 'ironwork',
           'visit south bend mishawaka', 'visit south bend', 'abc57', 'wndu', 'wvpe', '95.3 mnc', '953mnc', 'dyngus day', 'solidarity day', 'fusion fest', 'south bend fusion fest', 'concours d\'elegance', 'copshaholm', 'restaurant weeks', 'wine walk', 'st. joseph county 4-h fair', '4-h fair', 'fighting irish', 'notre dame football', 'sjcpl', 'south bend police department', 'sbpd', 'bandsintown', 'opendate', 'wishtv', 'heraldpalladium', 'leader-post', 'ndsmc observer', 'in.gov atc', 'indiana alcohol and tobacco commission'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The big university and the old car works appear in game text only as generic words. */
  blocklist: ['south bend tribune*', 'notre dame*', 'studebaker*', 'tollgate annex*', 'wheel and wagon*', 'bendix basement*', 'paczki hall*', 'lake-effect hall*'],

  blurb: ['Cheap old basements and rented halls carry what scene there is, under lake-effect snow.',
          'Chicago is close, so the kids leave and the bands drive past. The big university north of town is a separate world.'],
  hard: 'Snow, home football Saturdays and a long drive from anywhere keep nights thin.',
  region: 'Michiana',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16 },
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05 },
    { name: 'Grand Rapids', state: 'MI', lat: 42.96, lon: -85.67 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'South Bend' },
    { id: 'mishawaka', kind: 'FEEDER', name: 'Mishawaka', minutes: 10, bearing: 80, pop: 50000, scene: 60, note: 'A separate city next door with its own police and codes, and a small scene of its own.', bands: 2 },
    { id: 'niles', kind: 'FEEDER', name: 'Niles', state: 'MI', minutes: 20, bearing: 350, pop: 11000, note: 'An old river town just over the Michigan line.' },
    { id: 'buchanan', kind: 'FEEDER', name: 'Buchanan and Dowagiac', state: 'MI', minutes: 30, bearing: 335, note: 'Small river and farm towns to the north.' },
    { id: 'elkhart', kind: 'FEEDER', name: 'Elkhart', minutes: 30, bearing: 95, pop: 50000, note: 'A factory-labor town with its own scene and a lot of garage drummers.', bands: 3 },
    { id: 'plymouth', kind: 'FEEDER', name: 'Plymouth', minutes: 35, bearing: 190, pop: 10000, note: 'A farm town down US 31.' },
    { id: 'goshen', kind: 'FEEDER', name: 'Goshen', minutes: 40, bearing: 105, pop: 35000, note: 'A small college town at the edge of Amish country, with its own small scene.', bands: 1 },
    { id: 'laporte', kind: 'FEEDER', name: 'LaPorte', minutes: 40, bearing: 275, pop: 22000, note: 'A mill and lake-edge town in the Central time zone.' },
    { id: 'michigan-city', kind: 'FEEDER', name: 'Michigan City', minutes: 50, bearing: 305, pop: 32000, note: 'A lake-beach town with a casino and an outlet mall.' },
    { id: 'warsaw', kind: 'FEEDER', name: 'Warsaw', minutes: 50, bearing: 140, pop: 15000, note: 'An orthopedic-device town in lake country with small shows of its own.' },
    { id: 'benton-harbor', kind: 'FEEDER', name: 'Three Rivers and Benton Harbor', state: 'MI', minutes: 50, bearing: 5, note: 'Struggling river towns beside a wealthy resort lakeshore.' },
    { id: 'kalamazoo', kind: 'PEER', name: 'Kalamazoo', state: 'MI', minutes: 75, bearing: 55, slug: 'kalamazoo-mi', note: 'The closest trade partner: two colleges and a similar mood.' },
    { id: 'fort-wayne', kind: 'PEER', name: 'Fort Wayne', minutes: 90, bearing: 120, slug: 'fort-wayne-in', note: 'A bigger Indiana city down US 30: rival and stop.' },
    { id: 'lafayette', kind: 'PEER', name: 'Lafayette and West Lafayette', minutes: 120, bearing: 205, slug: 'lafayette-in', note: 'A big-university town two hours south.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The river core around Michigan and Main with lofts, a whitewater channel and bars; the cheap storefront era is closing.' },
    { id: 'east-bank', name: 'the east bank', route: 'old-side', note: 'Older mixed-use blocks east of the river, historically cheap commercial space and slowly gentrifying.' },
    { id: 'near-northwest', name: 'the near northwest side', route: 'work-side', note: 'Working-class neighborhoods toward the old car works; family and landlord ties make house shows rare.' },
    { id: 'west-side', name: 'the West Side', route: 'work-side', note: 'Polish, Hungarian and Latino strips along Lincoln Way West: corner bars, social halls and cheap units. The likeliest home for hall shows.' },
    { id: 'university-edge', name: 'the university edge on Eddy Street', route: 'campus', note: 'Student housing and football-weekend traffic; tight landlords and police, priced out of DIY.' },
    { id: 'commuter-campus', name: 'the commuter campus on the east side', route: 'campus', note: 'Apartments and rentals around the state-college branch; younger renters and some house shows.' },
    { id: 'southeast', name: 'the southeast side', route: 'old-side', note: 'Quiet single-family streets south of downtown; basements likely.' },
    { id: 'mishawaka-town', name: 'Mishawaka across the line', route: 'town:mishawaka', note: 'A separate city next door with its own police and codes; parish rooms and halls that answer to a different office.' }
  ],

  contacts: ['kalamazoo-mi', 'fort-wayne-in', 'chicago', 'toledo-oh', 'lansing-mi'],

  rooms: [
    { id: 'southeast-basement', kind: 'HOUSE', hood: 'southeast', cap: 40, curfew: 1350, ac: false, outdoor: false, pressure: 55, start: true,
      note: 'A full basement under an old frame house on a quiet street. One noise call from a neighbor and the night is over.' },
    { id: 'coffee-basement', kind: 'DIY', hood: 'east-bank', cap: 60, curfew: 1320, ac: false, standing: [60, 60, 45], pressure: 55,
      note: 'A basement stage under a coffee shop, all ages and no beer. It lives on the owner\'s goodwill and the landlord\'s mood.' },
    { id: 'jefferson-club', kind: 'CLUB', hood: 'east-bank', cap: 300, ages: ['ALL', 'A18'], curfew: 1410, ac: true,
      note: 'An all-ages club on the boulevard that runs ticketed bills. You rent the night, and the bill costs real money.' },
    { id: 'lab-stage', kind: 'DIY', hood: 'downtown', cap: 80, curfew: 1350, ac: true, standing: [55, 60, 50], pressure: 50,
      note: 'A second all-ages stage in a community space with other events on other nights. It can lose your date to anyone.' },
    { id: 'metal-bar', kind: 'BAR', hood: 'downtown', cap: 120, ages: ['A21'], curfew: 1500, ac: true, soundFee: 50, following: .3,
      note: 'A bar with a back stage and a metal night at a small door. Twenty-one and over, and the touring bands know it.' },
    { id: 'strip-bar', kind: 'BAR', hood: 'west-side', cap: 100, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A corner bar on Lincoln Way West with a stage in the corner. The owner decides, and decides fast.' },
    { id: 'polish-hall', kind: 'HALL', hood: 'west-side', cap: 150, ages: ['A18'], curfew: 1380, ac: true, owner: 'HALL_MANAGER',
      note: 'A social hall on the West Side with a bar and a stage. A flat rent, an insurance form and a friendly member.' },
    { id: 'parish-room', kind: 'HALL', hood: 'mishawaka-town', cap: 120, curfew: 1350, ac: true, owner: 'CHURCH_CONTACT',
      note: 'A parish room across the line, with codes of its own. All ages, no beer, and out by half past ten.' },
    { id: 'whitewater-lawn', kind: 'OUTDOOR', hood: 'downtown', cap: 200, curfew: 1260, ac: false, outdoor: true, pressure: 50,
      note: 'The grass by the river and the whitewater channel. You need a permit, so it is rare, and the weather has a vote.' },
    { id: 'southeast-yard', kind: 'OUTDOOR', hood: 'southeast', cap: 60, curfew: 1260, ac: false, outdoor: true,
      note: 'A backyard on a single-family street. A summer night, a generator, and neighbors who count the cars.' },
    { id: 'downtown-theater', kind: 'BIG', hood: 'downtown', cap: 900, ages: ['ALL'], curfew: 1380, ac: true, owner: 'TALENT_BUYER',
      note: 'A touring-size theater downtown. A local booker cannot get through the door.' }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1500, inForce: true } },

  calendar: [
    { id: 'spring-monday', label: 'the Monday-after-Easter party', tag: 'holiday', month: 4, week: 1, dows: [0], can: [.85, .88, .90], hoods: ['west-side', 'downtown'], elsewhere: [1, 1, 1] },
    { id: 'art-day', label: 'the downtown art day', tag: 'festival', month: 8, week: 3, dows: [5], can: [.88, .85, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 7, weeks: [1, 2], dows: [4, 5, 6], can: [.92, .90, .88] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [2, 4], dows: [5], can: [.80, .95, .95], hoods: ['university-edge'], elsewhere: [.92, .97, .97] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [2, 4], dows: [5], can: [.80, .95, .95], hoods: ['university-edge'], elsewhere: [.92, .97, .97] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 3], dows: [5], can: [.80, .95, .95], hoods: ['university-edge'], elsewhere: [.92, .97, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 2700000 },
    { name: 'Elkhart', state: 'IN', lat: 41.68, lon: -85.98, pop: 53000 },
    { name: 'Grand Rapids', state: 'MI', lat: 42.96, lon: -85.67, pop: 200000 },
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16, pop: 880000 }
  ],
  roads: ['I-80/90 (the Toll Road)', 'US 31', 'US 20', 'US 33', 'US 30', 'I-94'],

  words: {
    street: ['Michigan Street', 'Main Street', 'Colfax Avenue', 'Jefferson Boulevard', 'Lincoln Way West', 'Western Avenue', 'Portage Avenue', 'Mishawaka Avenue', 'Ironwood Drive'],
    water: ['the St. Joseph', 'the East Race', 'Lake Michigan'],
    hood: ['the West Side', 'the East Bank', 'Rum Village', 'Mishawaka', 'Michiana'],
    thing: ['pork tenderloin', 'lake effect', 'paczki', 'fish fry', 'basement keg', 'Toll Road', 'fish fry hall', 'fall football Saturday', 'empty factory'],
    weather: ['lake-effect snow', 'whiteout']
  },

  events: [
    { id: 'SOUTH_BEND_IN_FOOTBALL_BEDS', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'A home game is on Saturday and every hotel in the county is already full.',
      title: 'No beds on football Saturday',
      body: 'The headliner has a van and no room. Every hotel from here to the Toll Road is full, and the locals are leaving early for the game.',
      options: [
        { id: 'LATE', label: 'Push doors back so the game crowd can come', likely: 'The ones who stay in town show up. Late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.95 }],
          result: 'Doors an hour late. The out-of-town band slept in the van and played a loose, loud set.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The locals are at the game.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }],
          result: 'Half the list was at the game. The band played to the ones who stayed.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'SOUTH_BEND_IN_KIDS_CURFEW', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The kids on your list keep saying they have to be home at eleven.',
      title: 'The kids go home early',
      body: 'The curfew for the fifteen-to-seventeen crowd starts at eleven on a weeknight, and the headliner does not go on until half past.',
      options: [
        { id: 'EARLY', label: 'Start early and put the headliner first', likely: 'The kids see the best band. A short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.95 }],
          result: 'Doors early, headliner at nine. The kids got the best set and were home on time.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The kids leave before the headliner.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.85 }],
          result: 'The kids left at ten fifty. The room that was left was older and quieter.' }
      ] },

    { id: 'SOUTH_BEND_IN_LAKE_EFFECT', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [12, 1, 2] },
      telegraph: 'The forecast says lake-effect snow, heavy by the lake and nothing downtown.',
      title: 'The whiteout on the Toll Road',
      body: 'Snow is coming off the lake and the band from Chicago is crawling along the Toll Road. The room is warm and the bill is two bands short.',
      options: [
        { id: 'SHORT', label: 'Run the short bill and play on', likely: 'A thin night, but the ones who came are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Two bands and a long, loose night. The room was half full and warm.' },
        { id: 'WAIT', label: 'Hold the doors and wait for them', likely: 'A late start. The crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }],
          result: 'The van pulled in at ten. You started late and nobody left.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' }
      ] }
  ]
});
