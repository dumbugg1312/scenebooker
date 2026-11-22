SB.Cities.register('montgomery-al', {
  v: 1,
  slug: 'montgomery-al',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['maxwell-gunter', 'maxwell gunter', 'maxwell air force base', 'maxwell afb', 'air university', 'hyundai', 'baptist hospital', 'jackson hospital',
           'alabama state university', 'alabama state', 'auburn university at montgomery', 'aum', 'faulkner university', 'huntingdon college', 'tuskegee university',
           'troy university', 'montgomery biscuits', 'iron bowl', 'national fair', 'legacy museum', 'rosa parks museum', 'montgomery advertiser',
           'waffle house', 'chris\' hot dogs', 'vfw', 'american legion', 'elks', 'moose lodge', 'abc board', 'union station',
           'catoma annex', 'two mile hall', 'bell street backroom', 'fairview tarp', 'day street garage', 'sayre street loft', 'coosa street warehouse',
           'lanier carport', 'pill hill parlor', 'mount meigs shop floor', 'wetumpka road bay', 'capitol heights porch',
           'alabama national fair', 'alabama state fair', 'red bluff', 'riverbend brewfest', 'camellia bowl', 'experience montgomery', '1819 news', 'yellowhammer news',
           'bandsintown', 'hbcu classic', 'turkey day classic', 'alabama state hornets', 'auburn tigers', 'camellia city', 'montgomery police', 'montgomery city council'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['montgomery advertiser*', 'hyundai*', 'waffle house*', 'iron bowl*', 'montgomery biscuits*', 'catoma annex*', 'chris\' hot dogs*'],

  blurb: ['A thin scene in a sprawling capital where shows are carports, lodges and bar back rooms.',
          'Everyone drives, nobody has a basement, and a church hall will say yes if it can read the lyrics first.'],
  hard: 'Few all-ages rooms and no walkable core; every show runs on rides.',
  region: 'the Deep South',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.81 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Montgomery' },
    { id: 'pike-road', kind: 'FEEDER', name: 'Pike Road and Millbrook', minutes: 15, bearing: 70, note: 'Fast-growing affluent suburbs. Almost no scene.' },
    { id: 'prattville', kind: 'FEEDER', name: 'Prattville', minutes: 20, bearing: 330, pop: 38000, note: 'Big bedroom suburb across the river. Military families, little scene of its own.' },
    { id: 'wetumpka', kind: 'FEEDER', name: 'Wetumpka', minutes: 25, bearing: 10, pop: 7000, note: 'A small river town up US 231.' },
    { id: 'clanton', kind: 'FEEDER', name: 'Clanton', minutes: 40, bearing: 345, pop: 9000, note: 'A roadside farm town up I-65.' },
    { id: 'tuskegee', kind: 'FEEDER', name: 'Tuskegee', minutes: 40, bearing: 80, pop: 9000, note: 'A small university town on I-85, with college crossover but little punk.' },
    { id: 'greenville', kind: 'FEEDER', name: 'Greenville', minutes: 45, bearing: 205, pop: 7000, note: 'A lumber and farm county seat down I-65.' },
    { id: 'troy', kind: 'FEEDER', name: 'Troy', minutes: 50, bearing: 135, pop: 18000, note: 'A college town to the southeast with some scene.' },
    { id: 'selma', kind: 'FEEDER', name: 'Selma', minutes: 50, bearing: 280, pop: 17500, note: 'A shrinking river town out US 80. Almost no scene.' },
    { id: 'auburn', kind: 'FEEDER', name: 'Auburn and Opelika', minutes: 55, bearing: 75, note: 'A big college town with its own indie and punk crowd; kids go both ways. Opelika is the mill-town neighbor.' },
    { id: 'columbus', kind: 'PEER', name: 'Columbus', state: 'GA', minutes: 90, bearing: 85, slug: 'columbus-ga', note: 'The nearest true peer: similar size, an army town.' },
    { id: 'huntsville', kind: 'PEER', name: 'Huntsville', state: 'AL', minutes: 135, bearing: 355, slug: 'huntsville-al', note: 'A rocket and tech city up I-65. Not an easy drive for a punk show.' },
    { id: 'mobile', kind: 'PEER', name: 'Mobile', state: 'AL', minutes: 160, bearing: 205, slug: 'mobile-al', note: 'A Gulf port with a stronger music identity, down I-65.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the riverfront', route: 'downtown', note: 'Capitol hill to the river: tourists and state workers by day, quiet after dark except on ballgame nights. Old storefronts and vacant upper floors, but landlords want more than DIY can pay.' },
    { id: 'cloverdale', name: 'Cloverdale', route: 'old-side', note: 'Shaded bungalows and a small strip of bars and shops. The old bohemian pocket, now priced up, and the neighbors call the police.' },
    { id: 'midtown', name: 'Midtown, the Garden District and Capitol Heights', route: 'old-side', note: 'Prewar streets east of downtown, patchy: some blocks heating up, some boarded. Rental houses with yards and carports.' },
    { id: 'west-montgomery', name: 'West Montgomery and the Mobile Highway corridor', route: 'work-side', note: 'Largely Black working-class neighborhoods with closed storefronts and big lots. Cheap, under-resourced and not a place to treat as a punk district.' },
    { id: 'centennial-hill', name: 'Centennial Hill', route: 'campus', note: 'The historically Black university neighborhood near downtown. A rare crossover for a show, handled as a campus event and not a scene home.' },
    { id: 'east-montgomery', name: 'East Montgomery', route: 'campus', note: 'The mall, chain and subdivision belt where most kids\' parents live. Strip-mall units and church halls.' },
    { id: 'south-side', name: 'the south and southeast side', route: 'work-side', note: 'Light industry and warehouse bays along the highways, far from neighbors. Practice rooms and generator shows, with fire code the unspoken problem.' }
  ],

  rooms: [
    { id: 'midtown-carport', kind: 'HOUSE', hood: 'midtown', cap: 40, curfew: 1320, ac: false, outdoor: true, start: true,
      note: 'A carport and backyard on a rental street. The neighbors call, and July heat ends it before they do.' },
    { id: 'cloverdale-porch', kind: 'HOUSE', hood: 'cloverdale', cap: 30, curfew: 1320, ac: false, outdoor: true, pressure: 55,
      note: 'A porch set on a block of close bungalows. The neighbors are near and the rents are climbing.' },
    { id: 'river-storefront', kind: 'DIY', hood: 'downtown', cap: 120, ac: true, pressure: 55, needs: ['VOUCH'],
      note: 'A small storefront or upper room near the river that bands have started using. The landlord and the fire code both have opinions.' },
    { id: 'church-hall', kind: 'HALL', hood: 'downtown', cap: 150, curfew: 1350, ac: true, standing: [60, 60, 55], pressure: 50,
      note: 'A church hall the bands run themselves, which punk shows came back to. The landlord or the congregation can pull it any week.' },
    { id: 'east-hall', kind: 'HALL', hood: 'east-montgomery', cap: 120, curfew: 1320, ac: true, owner: 'HALL_MANAGER',
      note: 'A rentable lodge hall in the subdivision belt. Content rules, no beer, and out by ten.' },
    { id: 'downtown-bar', kind: 'BAR', hood: 'downtown', cap: 150, ages: ['A18'], curfew: 1410, ac: true,
      note: 'A downtown bar with music most nights. Wristbands or an 18-plus night, and the liquor license sets the rules.' },
    { id: 'vaughn-bar', kind: 'BAR', hood: 'east-montgomery', cap: 100, ages: ['A18'], curfew: 1380, ac: true, pressure: 50,
      note: 'A bar back room on the east side, filling in for the dive on Vaughn Road that closed. Nobody is sure how long it will last.' },
    { id: 'blues-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['A18'], curfew: 1410, ac: true, needs: ['FULL_BILL'],
      note: 'An 18-plus blues club with a real stage. It rarely books punk and wants real money when it does.' },
    { id: 'bay-unit', kind: 'SHOP', hood: 'south-side', cap: 60, curfew: 1260, ac: false, pressure: 50,
      note: 'A practice bay in a light-industrial strip along the highway. Far from neighbors, with the fire code left unsaid.' },
    { id: 'lot-day-show', kind: 'OUTDOOR', hood: 'east-montgomery', cap: 80, curfew: 1140, ac: false, outdoor: true,
      note: 'An afternoon lot or park set by the skate spots. Heat and thunderstorms cancel it more often than not.' },
    { id: 'performing-arts', kind: 'BIG', hood: 'downtown', cap: 1500, ages: ['ALL'], curfew: 1350, ac: true,
      note: 'The big downtown performing arts hall. It books touring acts, not local bills.' }
  ],

  contacts: ['columbus-ga', 'huntsville-al', 'mobile-al', 'birmingham', 'tuscaloosa-al'],

  calendar: [
    { id: 'parade-weekend', label: 'Mardi Gras parade weekend', tag: 'parade', month: 2, weeks: [1, 2], dows: [4, 5, 6], can: [.85, .80, .75], hoods: ['downtown'], elsewhere: [.97, .95, .95] },
    { id: 'riverfront-fest', label: 'the riverfront music and food festival', tag: 'festival', month: 5, week: 2, dows: [4, 5, 6], can: [.88, .85, .85], hoods: ['downtown'], elsewhere: [.98, .96, .96] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 4], dows: [5], can: [.90, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [5], can: [.90, .95, .95] },
    { id: 'harvest-day', label: 'the downtown harvest festival', tag: 'festival', month: 10, week: 3, dows: [5], can: [.88, .85, .85], hoods: ['downtown'], elsewhere: [1, .98, .98] },
    { id: 'state-fair', label: 'the state fair', tag: 'fair', month: 10, weeks: [3, 4], dows: [3, 4, 5, 6], can: [.85, .85, .85], hoods: ['east-montgomery'], elsewhere: [.95, .93, .93] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1260, weekend: 1380, inForce: false } },

  points: [
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.81, pop: 200000 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 500000 },
    { name: 'Dothan', state: 'AL', lat: 31.22, lon: -85.39, pop: 70000 },
    { name: 'Jackson', state: 'MS', lat: 32.3, lon: -90.18, pop: 150000 }
  ],
  roads: ['I-65', 'I-85', 'US 80', 'US 231', 'US 82', 'Eastern Boulevard'],

  words: {
    street: ['Dexter Avenue', 'Fairview Avenue', 'Eastern Boulevard', 'Atlanta Highway', 'Day Street', 'Mobile Highway', 'Vaughn Road'],
    water: ['the Alabama River', 'Catoma Creek'],
    hood: ['Cloverdale', 'Garden District', 'Capitol Heights', 'Centennial Hill', 'Eastdale', 'Eastchase', 'Pike Road', 'Day Street'],
    thing: ['carport', 'crawlspace', 'window unit', 'kudzu', 'fire ant mound', 'church sign', 'boiled peanuts', 'meat-and-three', 'lodge hall', 'drive-thru', 'wristband night', 'pickup truck'],
    weather: ['tornado watch', 'afternoon thunderstorm', 'heat index']
  },
  events: [
    { id: 'MONTGOMERY_AL_TORNADO_WATCH', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [3, 4, 5, 11] },
      telegraph: 'A tornado watch is posted for the whole county, and the sky over the river has gone green.',
      title: 'A watch on the night of the show',
      body: 'The watch is up at six. Half the list is texting that they will stay in, and the carport crowd is already looking for an interior wall.',
      options: [
        { id: 'HALLWAY', label: 'Run it in the middle of the house, a hallway full of people', likely: 'Small, loud and strangely close. The set may restart.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .6 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The power flickered and the set restarted on a phone flashlight. Nobody forgot it.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'A lot of people stay home to watch the sky.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }],
          result: 'The watch expired at nine. By then most of the list had given up on the night.' }
      ] },

    { id: 'MONTGOMERY_AL_FAIR_NIGHT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The state fair has the east side jammed, and half the kids you know are working the midway.',
      title: 'Half the kids are on the midway',
      body: 'The church hall show lands on a fair Saturday. The lots on the east side are closed for the fair, and the kids are riding the rides instead of coming to you.',
      options: [
        { id: 'LATE', label: 'Push doors back until the fair crowd thins', likely: 'The ones who still want a show come late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors an hour late. The midway kids drifted in smelling of funnel cake.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual kids are at the fair.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The casual crowd rode the rides. The regulars came.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'MONTGOMERY_AL_PARADE_ALLEY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'Parade weekend is closing the streets around the 18-plus bar.',
      title: 'The band loads in past a float',
      body: 'The parade has the street by the bar shut. The band has to load in through the alley, around a float, and the doors are stuck behind the barricades.',
      options: [
        { id: 'EARLY', label: 'Open early and load in before the barricades', likely: 'Most get in. A short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .92 }],
          result: 'Doors early, loaded in before the barricades. The ones who came walked in from the parade.' },
        { id: 'ALLEY', label: 'Carry the gear through the alley by hand', likely: 'Two hours of your day. The band remembers it.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'You carried the amps past the float. The band told the story all night.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'A lot of people give up on the closures.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The streets stayed shut. Half the list never found a place to leave the car.' }
      ] }
  ]
});
