SB.Cities.register('winston-salem-nc', {
  v: 1,
  slug: 'winston-salem-nc',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['wake forest', 'wake forest university', 'winston-salem state', 'unc school of the arts', 'school of the arts', 'salem college', 'forsyth tech', 'catawba',
           'appalachian state', 'app state', 'texas pete', 'cheerwine', 'cook out', 'biscuitville', 'bojangles', 'bojangles\'', 'waffle house', 'krispy kreme',
           'winston-salem journal', 'innovation quarter', 'hanes mall', 'hanes', 'reynolds', 'r.j. reynolds', 'vfw', 'american legion', 'moose lodge', 'elks lodge',
           'national black theatre festival', 'rockabilly weekender', 'carolina classic fair', 'dixie classic fair', 'bowman gray', 'bowman gray stadium', 'camel city',
           'moravian love feast', 'old salem', 'amtrak',
           'salem boiler room', 'brookstown annex', 'camel yard', 'twin city hall', 'peters creek garage', 'waughtown social club', 'moravian star lanes',
           'sunset avenue lodge', 'tobacco row loft', 'fourth and trade basement', 'hanes mill pavilion', 'sauratown barn',
           'carolina classic fair', 'gears and guitars', 'gears & guitars', 'riverrun', 'art crush', 'hispanic league fiesta', 'christmas at old salem',
           'wfdd', 'wfae', 'wunc', 'journalnow', 'triad city beat', 'visit winston-salem', 'nc museum', 'r.j. reynolds high school', 'rj reynolds',
           'uncg', 'wacb', 'myfox8', 'fox8', 'wfmy', 'stock 50', 'nc abc commission', 'piedmont craftsmen\'s fair'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['wake forest*', 'texas pete*', 'cheerwine*', 'cook out*', 'biscuitville*', 'bojangles*', 'winston-salem journal*'],

  blurb: ['A quiet tobacco and textile city where old factories keep turning into labs and apartments. A few people hold the scene together, and a show feels like a regional get-together.',
          'Garage and metal run old, folk-punk and indie run young, and everyone drives, so bands are known by people down the road.'],
  hard: 'Few rooms, patchy all-ages, and a college crowd that resets every semester.',
  region: 'the Piedmont',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Greensboro', state: 'NC', lat: 36.07, lon: -79.79 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 },
    { name: 'Durham', state: 'NC', lat: 35.99, lon: -78.9 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Winston-Salem' },
    { id: 'kernersville', kind: 'FEEDER', name: 'Kernersville', minutes: 15, bearing: 95, note: 'A commuter town toward Greensboro; its kids can go either way.' },
    { id: 'clemmons', kind: 'FEEDER', name: 'Clemmons', minutes: 15, bearing: 255, note: 'A wealthy, church-heavy suburb; kids drive in for shows.' },
    { id: 'lewisville', kind: 'FEEDER', name: 'Lewisville and Pfafftown', minutes: 15, bearing: 300, note: 'Subdivisions and farmland just northwest.' },
    { id: 'king', kind: 'FEEDER', name: 'King', minutes: 20, bearing: 10, note: 'A small mill town up US 52 with some metal and country.' },
    { id: 'lexington', kind: 'FEEDER', name: 'Lexington', minutes: 30, bearing: 195, note: 'A working-class barbecue and furniture town; sends its weird kids north.' },
    { id: 'mocksville', kind: 'FEEDER', name: 'Mocksville', minutes: 30, bearing: 235, note: 'A farm and light-industry county seat on I-40.' },
    { id: 'mount-airy', kind: 'FEEDER', name: 'Mount Airy', minutes: 45, bearing: 340, note: 'A small tourist town with old-time music and very little punk.' },
    { id: 'salisbury', kind: 'FEEDER', name: 'Salisbury', minutes: 45, bearing: 210, note: 'A small city with a college and a downtown; kids come both ways.' },
    { id: 'statesville', kind: 'FEEDER', name: 'Statesville', minutes: 50, bearing: 240, note: 'A distribution and industry town; kids will drive for a show.' },
    { id: 'elkin', kind: 'FEEDER', name: 'Elkin and Yadkinville', minutes: 50, bearing: 295, note: 'Foothills farm and mill towns, now partly wine country.' },
    { id: 'greensboro', kind: 'PEER', name: 'Greensboro', minutes: 30, bearing: 95, slug: 'greensboro-nc', note: 'The true sister city: bigger, with more rooms. People drive both ways.' },
    { id: 'durham', kind: 'PEER', name: 'Durham', minutes: 90, bearing: 100, slug: 'durham-nc', note: 'A bigger, better-known scene and a destination for local kids.' },
    { id: 'roanoke', kind: 'PEER', name: 'Roanoke', state: 'VA', minutes: 120, bearing: 335, slug: 'roanoke-va', note: 'Shows up on routing, but not a regular trade.' },
    { id: 'asheville', kind: 'PEER', name: 'Asheville', minutes: 135, bearing: 255, slug: 'asheville-nc', note: 'A famous arts town in the mountains; a weekend trip both ways.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Trade Street arts corridor', route: 'downtown', note: 'Old tobacco warehouses, theaters and bars. Club shows and the odd loft night, with rents climbing.' },
    { id: 'west-end', name: 'the West End', route: 'old-side', note: 'Bungalows and Victorians west of downtown, with basements and porches. The neighbors are close and quick to call.' },
    { id: 'southside', name: 'Southside and Waughtown', route: 'work-side', note: 'Cheap mill-house streets and corner shops, mostly ignored. The likeliest place for a warehouse or backyard show.' },
    { id: 'ardmore', name: 'Ardmore', route: 'old-side', note: 'Quiet older houses and apartments south of the West End, with few rooms of its own.' },
    { id: 'east-winston', name: 'East Winston and Skyline', route: 'campus', note: 'The long-standing Black commercial and cultural heart, with a historically Black college. A promoter needs a real relationship here, not just a lease.' },
    { id: 'reynolda', name: 'the university area and Reynolda', route: 'campus', note: 'Big old houses and student renters to the northwest. House shows draw noise complaints fast.' },
    { id: 'ogburn', name: 'Ogburn Avenue and the north side', route: 'work-side', note: 'Strip malls and industrial road north of downtown. Nobody lives close enough to complain, and the one all-ages club is out here.' },
    { id: 'stratford', name: 'Stratford Road and the southwest strip', route: 'work-side', note: 'Chain restaurants, strip malls and apartment complexes. Vacant retail units and old gym spaces double as practice rooms.' }
  ],

  rooms: [
    { id: 'west-end-house', kind: 'HOUSE', hood: 'west-end', cap: 50, ages: ['ALL'], curfew: 1350,ac: false, outdoor: false, pressure: 55, start: true,  note: 'A living room and a yard in an old frame house west of downtown. The neighbors are close, and the noise call and the youth curfew both bite.' },
    { id: 'upstairs-lounge', kind: 'HALL', hood: 'downtown', cap: 100, ages: ['A18'], curfew: 1380,ac: true,  note: 'An upstairs lounge above a bigger club. Small bills only, and the club\'s own calendar decides.' },
    { id: 'collective', kind: 'DIY', hood: 'downtown', cap: 60, ages: ['A18'], curfew: 1350,ac: false, pressure: 50,  note: 'An artist collective that hosts underground art nights in rotating spots. Art first, bands second, and nothing permanent.' },
    { id: 'ogburn-club', kind: 'CLUB', hood: 'ogburn', cap: 250, ages: ['ALL'], curfew: 1380,ac: true,  note: 'A rock and metal club out on the strip-mall road. Most shows are all ages, and it is the likeliest all-ages room in town.' },
    { id: 'southwest-club', kind: 'CLUB', hood: 'stratford', cap: 200, ages: ['ALL'], curfew: 1380,ac: true, pressure: 55,  note: 'A room beside a bar in the southwest strip with all-ages nights. It shares a wall with the bar, so the rules shift.' },
    { id: 'dive-bar', kind: 'BAR', hood: 'west-end', cap: 120, ages: ['A21'], curfew: 1500,ac: true,  note: 'A dive bar with a stage that books original metal, grunge and punk. Twenty-one and up, so the younger kids wait outside.' },
    { id: 'country-bar', kind: 'BAR', hood: 'southside', cap: 150, ages: ['A21'], curfew: 1500,ac: true, standing: [45, 60, 55],  note: 'A bar with weekend country and open mics that now and then gives a night to a heavier bill. The locals have little patience for loud.' },
    { id: 'downtown-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['A18', 'A21'], curfew: 1410,ac: true,  note: 'A mid-size ticketed club with a real stage and a house sound crew. Eighteen-plus some nights, twenty-one-plus others.' },
    { id: 'big-club', kind: 'BIG', hood: 'downtown', cap: 1000, ages: ['A18'], curfew: 1380,ac: true,  note: 'The thousand-person concert club with the good sightlines. National acts, not a room a new booker gets.' },
    { id: 'brewery-patio', kind: 'OUTDOOR', hood: 'reynolda', cap: 100, ages: ['ALL'], curfew: 1260,ac: false, outdoor: true,  note: 'A brewery patio and a park series. Family-friendly, early, and leaning toward cover bands.' },
    { id: 'lodge-hall', kind: 'HALL', hood: 'stratford', cap: 150, ages: ['ALL'], curfew: 1320,ac: true,  note: 'A rented lodge or a vacant unit for a one-off benefit bill. All ages and out by ten.' },
  ],

  contacts: ['greensboro-nc', 'durham-nc', 'asheville-nc', 'roanoke-va', 'charlotte'],

  calendar: [
    { id: 'fair', label: 'the fall fair', tag: 'fair', month: 10, weeks: [1, 2], dows: [3, 4, 5, 6], can: [0.88, 0.9, 0.92] },
    { id: 'film-festival', label: 'the film festival', tag: 'festival', month: 4, weeks: [2, 3], dows: [3, 4, 5, 6], can: [0.88, 0.9, 0.92], hoods: ['downtown'], elsewhere: [1, 0.97, 0.97] },
    { id: 'memorial-weekend', label: 'the Memorial Day weekend festival', tag: 'festival', month: 5, week: 4, dows: [4, 5, 6], can: [0.88, 0.9, 0.92], hoods: ['downtown'], elsewhere: [1, 0.97, 0.97] },
    { id: 'stock-car', label: 'stock-car nights', tag: 'race', month: 7, weeks: [1, 4], dows: [5], can: [0.92, 0.94, 0.96], hoods: ['east-winston'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [2, 4], dows: [5], can: [0.9, 0.95, 0.95], hoods: ['reynolda'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [2, 4], dows: [5], can: [0.9, 0.95, 0.95], hoods: ['reynolda'], elsewhere: [1, 1, 1] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 2], dows: [5], can: [0.9, 0.95, 0.95], hoods: ['reynolda'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1320, weekend: 1320, inForce: false } },

  points: [
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 2700000 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64, pop: 1400000 },
    { name: 'Boone', state: 'NC', lat: 36.22, lon: -81.67, pop: 20000 },
    { name: 'High Point', state: 'NC', lat: 35.96, lon: -80.0, pop: 115000 }
  ],
  roads: ['I-40', 'US 52', 'I-85', 'US 421', 'Salem Parkway', 'Silas Creek Parkway'],

  words: {
    street: ['Trade Street', 'Fourth Street', 'Salem Parkway', 'Silas Creek Parkway', 'University Parkway', 'Northwest Boulevard', 'Peters Creek Parkway'],
    water: ['Salem Creek', 'the Yadkin', 'Peters Creek', 'Sauratown Mountain'],
    hood: ['West End', 'Ardmore', 'Waughtown', 'Southside', 'Skyline', 'Reynolda', 'Clemmons', 'Kernersville'],
    thing: ['sugar cake', 'red slaw', 'hushpuppies', 'sweet tea', 'tobacco warehouse', 'hot sauce', 'ice storm', 'practice space', 'mill building', 'carport', 'county field'],
    weather: ['afternoon thunderstorm', 'ice storm']
  },

  events: [
    { id: 'WINSTON_SALEM_NC_CURFEW_NIGHT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [6, 7, 8, 9, 10] },
      telegraph: 'The temporary teen curfew is on, and the all-ages club has been told the kids must be out by ten.',
      title: 'The kids have to be home by ten',
      body: 'It\'s a Saturday all-ages bill, and everyone under eighteen must be off the street at ten. The headliners can go on at nine, or the last band can play to half a room.',
      options: [
        { id: 'EARLY', label: 'Start early and put the headliners on at nine', likely: 'It\'s a short, tight night, and the kids make it home.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.95 }],
          result: 'Doors were at five and the headliners went on at nine, and the kids were out the door by ten.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The last band plays to the grown-ups.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.75 }],
          result: 'By ten the room was half the size, and the last band played to the older crowd and a bartender.' }
      ] },

    { id: 'WINSTON_SALEM_NC_FAIR_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The fall fair is on and every kid under eighteen is on the midway.',
      title: 'Fair week empties the room',
      body: 'The fairgrounds are jammed and every kid is on the midway, so a bill downtown has no crowd until after dark.',
      options: [
        { id: 'LATE', label: 'Push doors back until after dark', likely: 'The kids come when the midway closes.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.95 }],
          result: 'Doors opened an hour late, and the fair crowd drifted in smelling of funnel cake.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The room is empty early and fuller late.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }],
          result: 'It was quiet early and full by ten, and the regulars were glad of the space.' }
      ] },

    { id: 'WINSTON_SALEM_NC_RACE_NIGHT', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'race' },
      telegraph: 'The stock-car season is on and the Saturday race lets out at ten.',
      title: 'The race lets out at ten',
      body: 'The stock-car crowd spills out at ten and some of them wander into the bar with the stage, which is twenty-one and up, while the younger punks watch from the sidewalk.',
      options: [
        { id: 'LATE', label: 'Push the set back an hour', likely: 'You get a bigger crowd late, and a tired band.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.15 }],
          result: 'Doors opened an hour late, and a few racing fans stayed for the last band.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The people under twenty-one stay outside.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }],
          result: 'The twenty-ones came in, and the younger kids watched from the sidewalk.' }
      ] }
  ]
});
