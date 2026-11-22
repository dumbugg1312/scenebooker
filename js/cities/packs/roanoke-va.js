SB.Cities.register('roanoke-va', {
  v: 1,
  slug: 'roanoke-va',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['elmwood park', 'strawberry festival', 'salem fair', 'olde salem days', 'jazz in july', 'homegrown harvest festival', 'go outside festival', 'henry street festival', 'harrison museum', 'st. patrick\'s day parade', 'shamrock festival', 'downtown roanoke inc', 'visit roanoke', 'cardinal news', 'roanoke rambler', 'the roanoker', 'rvamag', 'star city',
           'virginia tech', 'vt', 'hollins university', 'hollins', 'roanoke college', 'radford university', 'virginia western', 'virginia military institute', 'vmi',
           'washington and lee', 'liberty university', 'carilion', 'roanoke star', 'mill mountain star', 'city market', 'history museum', 'grandin theatre',
           'berglund center', 'roanoke civic center', 'salem red sox', 'salem civic center', 'salem fair', 'martinsville speedway', 'd-day memorial',
           'local colors', 'strawberry festival', 'down by downtown', 'festival in the park', 'henry street heritage festival', 'go fest', 'dickens of a christmas',
           'pride in the park', 'blue ridge marathon', 'smith mountain lake', 'amtrak', 'norfolk southern', 'roanoke times', 'wvtf', 'wuvt',
           'caboose room', 'roundhouse annex', 'valley door', 'switchyard hall', 'the star loft', 'norfolk lane basement', 'mill street garage',
           'tinker creek pavilion', 'the brakeman', 'hollins road lodge', 'seven bridges hall', 'the ridge room'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['virginia tech*', 'roanoke times*', 'grandin theatre*', 'carilion*', 'liberty university*', 'blue ridge marathon*', 'berglund*', 'norfolk southern*'],

  blurb: ['A rail town in a mountain bowl under a lit star, small enough that the whole scene fits in one room.',
          'Kids drive in from every valley town, the old heads play the bar bills, and everyone knows who is booking.'],
  hard: 'Few all-ages rooms: bar bills are 21-and-over and the halls want a member to sign you in.',
  region: 'the Blue Ridge',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 },
    { name: 'Asheville', state: 'NC', lat: 35.60, lon: -82.55 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Roanoke' },
    { id: 'salem', kind: 'FEEDER', name: 'Salem', minutes: 10, bearing: 275, pop: 25000, note: 'A small college town next door with a civic center; school bands only.' },
    { id: 'vinton', kind: 'FEEDER', name: 'Vinton', minutes: 10, bearing: 95, note: 'A blue-collar town on the east edge; teenagers come in.' },
    { id: 'bedford', kind: 'FEEDER', name: 'Bedford', minutes: 40, bearing: 85, note: 'A small foothill county seat, rural and conservative.' },
    { id: 'rocky-mount', kind: 'FEEDER', name: 'Rocky Mount and Franklin County', minutes: 45, bearing: 150, note: 'Lake-weekend country; kids drive in because nothing is there.', season: { months: [5, 6, 7, 8, 9], mul: 1.3 } },
    { id: 'blacksburg', kind: 'FEEDER', name: 'Blacksburg', minutes: 45, bearing: 235, note: 'A big public university town with its own scene; the main source of college-age crowds.', bands: 4 },
    { id: 'christiansburg', kind: 'FEEDER', name: 'Christiansburg and Radford', minutes: 55, bearing: 240, note: 'A strip town and a small university town along the interstate.', bands: 1 },
    { id: 'lexington', kind: 'FEEDER', name: 'Lexington', minutes: 55, bearing: 15, note: 'Two small campuses and a small show scene to the north.', bands: 1 },
    { id: 'floyd', kind: 'FEEDER', name: 'Floyd', minutes: 50, bearing: 200, note: 'A mountain town of old-time music; folk, not punk, with a few crossover kids.' },
    { id: 'covington', kind: 'FEEDER', name: 'Covington and Clifton Forge', minutes: 65, bearing: 335, note: 'Depressed paper-mill and rail towns; a few kids drive in.' },
    { id: 'martinsville', kind: 'FEEDER', name: 'Martinsville', minutes: 75, bearing: 145, note: 'A former furniture and textile town with a few bands and a long drive.', bands: 1 },
    { id: 'wytheville', kind: 'FEEDER', name: 'Wytheville and Pulaski', minutes: 80, bearing: 235, note: 'Interstate-junction and mill towns; an occasional crowd.' },
    { id: 'lynchburg', kind: 'PEER', name: 'Lynchburg', minutes: 60, bearing: 80, slug: 'lynchburg-va', note: 'Same size; each thinks the other is more conservative.' },
    { id: 'harrisonburg', kind: 'PEER', name: 'Harrisonburg', minutes: 100, bearing: 25, slug: 'harrisonburg-va', note: 'A university town with a famously active DIY scene for its size.' },
    { id: 'charlottesville', kind: 'PEER', name: 'Charlottesville', minutes: 120, bearing: 55, slug: 'charlottesville-va', note: 'A smaller city with a nicer town and a bigger arts economy.' },
    { id: 'greensboro', kind: 'PEER', name: 'Greensboro', minutes: 130, bearing: 140, slug: 'greensboro-nc', note: 'The closest big metro outside Virginia with an active scene.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the market area', route: 'downtown', note: 'Old brick by the tracks and the market: lofts, 21-and-over bar rooms and the big civic arena.' },
    { id: 'old-southwest', name: 'Old Southwest', route: 'old-side', note: 'Big Victorian houses split into apartments, with basements and carriage houses. The best housing stock for house shows.' },
    { id: 'grandin', name: 'Grandin Village and Raleigh Court', route: 'old-side', note: 'A walkable small-business strip with bungalow streets around it; comfortable, with watchful neighbors.' },
    { id: 'wasena', name: 'Wasena', route: 'old-side', note: 'Small riverside houses and a greenway. Cheaper, with yard shows and a river identity.' },
    { id: 'southeast', name: 'Southeast Roanoke', route: 'work-side', note: 'Working-class brick streets with church halls, corner stores and empty commercial buildings. Cheap and ignored.' },
    { id: 'gainsboro', name: 'Gainsboro and Henry Street', route: 'work-side', note: 'The historic center of Black business and music, cut up by highways. Old halls and churches; treat with care.' },
    { id: 'williamson-road', name: 'the Williamson Road corridor', route: 'work-side', note: 'The old highway strip of motels, taquerias and strip-mall bays. Practice rooms and the occasional all-ages show.' },
    { id: 'salem-side', name: 'Salem and Vinton', route: 'campus', note: 'The suburban towns either side. Where the school-bus kids come from.' }
  ],

  contacts: ['lynchburg-va', 'harrisonburg-va', 'charlottesville-va', 'greensboro-nc', 'johnson-city-tn'],

  rooms: [
    { id: 'old-sw-basement', kind: 'HOUSE', hood: 'old-southwest', cap: 60, curfew: 1320, outdoor: false, pressure: 55, start: true, note: 'A split Victorian with a damp stone basement and one narrow stair. One neighbor call and the landlord hears about it.' },
    { id: 'wasena-yard', kind: 'HOUSE', hood: 'wasena', cap: 40, curfew: 1320, outdoor: true, note: 'A yard and porch show by the greenway. The weather and the neighbors decide it.' },
    { id: 'southeast-garage', kind: 'HOUSE', hood: 'southeast', cap: 50, curfew: 1350, outdoor: false, pressure: 35, note: 'A garage on a brick block where nobody watches. Cheap, and a long way from the bars.' },
    { id: 'southeast-storefront', kind: 'DIY', hood: 'southeast', cap: 120, curfew: 1350, pressure: 60, needs: ['VOUCH'], note: 'A bay with a few friends on the lease. When the building sells, it is gone.' },
    { id: 'strip-bay', kind: 'DIY', hood: 'williamson-road', cap: 100, curfew: 1380, pressure: 55, note: 'A practice-room bay turned show room. The landlord and the fire marshal are the risks.' },
    { id: 'post-hall', kind: 'HALL', hood: 'downtown', cap: 150, curfew: 1320, owner: 'HALL_MANAGER', note: 'A post hall that has taken punk bills lately. It wants a member to sign you in, and the bar rules apply.' },
    { id: 'market-bar', kind: 'BAR', hood: 'downtown', cap: 150, ages: ['ALL', 'A21'], matinee: true, curfew: 1440, standing: [45, 60, 65], note: 'A small bar with a stage that books some punk. Early doors can be all ages; the owner worries about pay, the pit and damage.' },
    { id: 'downtown-club', kind: 'CLUB', hood: 'downtown', cap: 250, ages: ['ALL', 'A18'], curfew: 1410, needs: ['FULL_BILL'], note: 'A small downtown club with all-ages punk nights, ten dollars at the door. It depends on the owner\'s say.' },
    { id: 'ballroom', kind: 'BIG', hood: 'downtown', cap: 1200, ages: ['ALL'], curfew: 1410, note: 'An old bank ballroom, standing room only. Too big for a punk bill; the dream room.' },
    { id: 'park-stage', kind: 'OUTDOOR', hood: 'downtown', cap: 800, curfew: 1320, ac: false, note: 'The amphitheater in the downtown park, for summer and fall. The daytime fests use the same lawn.' },
    { id: 'market-lot', kind: 'OUTDOOR', hood: 'downtown', cap: 200, curfew: 1260, rent: 0, note: 'An early-evening set in the market, hosted by the downtown group. Free, and over by nine.' }
  ],

  calendar: [
    { id: 'park-festival', label: 'the spring park festival', tag: 'festival', month: 5, week: 1, dows: [4, 5], can: [0.9, 0.88, 0.88], hoods: ['downtown'], elsewhere: [1, 0.97, 0.97] },
    { id: 'county-fair', label: 'the county fair next door', tag: 'fair', month: 7, weeks: [1, 2], dows: [0, 1, 2, 3, 4, 5, 6], can: [0.95, 0.9, 0.88] },
    { id: 'heritage-festival', label: 'the heritage street festival', tag: 'festival', month: 9, weeks: [2, 4], dows: [5], can: [0.9, 0.9, 0.88], hoods: ['gainsboro'], elsewhere: [1, 0.97, 0.97] },
    { id: 'outdoor-festival', label: 'the outdoor festival', tag: 'festival', month: 10, week: 3, dows: [4, 5, 6], can: [0.92, 0.9, 0.9] },
    { id: 'patrick-parade', label: 'the St. Patrick\'s parade', tag: 'parade', month: 3, week: 3, dows: [5], can: [1.05, 1.05, 1], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [0.9, 0.95, 0.95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [0.9, 0.95, 0.95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.1] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1440, inForce: false } },

  points: [
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44, pop: 1370000 },
    { name: 'Danville', state: 'VA', lat: 36.59, lon: -79.40, pop: 42000 },
    { name: 'Bristol', state: 'VA', lat: 36.60, lon: -82.19, pop: 17000 },
    { name: 'Knoxville', state: 'TN', lat: 35.96, lon: -83.92, pop: 870000 }
  ],
  roads: ['I-81', 'I-581', 'US 220', 'US 460', 'US 11', 'the Blue Ridge Parkway'],

  words: {
    street: ['Williamson Road', 'Franklin Road', 'Memorial Avenue', 'Campbell Avenue', 'Main Street'],
    water: ['the Roanoke River', 'Tinker Creek', 'Carvins Cove', 'Back Creek'],
    hood: ['Old Southwest', 'Grandin', 'Raleigh Court', 'Wasena', 'Gainsboro', 'Southeast', 'Vinton', 'Salem'],
    thing: ['railyard', 'Victorian porch', 'bluegrass jam', 'mountain overlook', 'Foursquare', 'caboose', 'fellowship hall', 'brewery patio', 'stone basement'],
    weather: ['mountain fog', 'hurricane remnant', 'summer thunderstorm']
  },

  events: [
    { id: 'ROANOKE_VA_FAIR_WEEKS', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The county fair next door runs two weeks and every school kid has a wristband.',
      title: 'The fair has the kids',
      body: 'The fair next door is in its second week. The Salem and Vinton kids are on the rides, and your Saturday bill is all school-age bands in a town full of carnival noise.',
      options: [
        { id: 'EARLY', label: 'Open early and let them come after the rides', likely: 'Some come over. Short and loud.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .92 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors an hour early. The ones who came still smelled like fried dough.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The fair wins the kids.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The kids stayed on the midway. The regulars came.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'ROANOKE_VA_STREET_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'A street festival closes the old Henry Street blocks on Saturday.',
      title: 'The street is closed',
      body: 'The street festival has Henry Street shut to cars all day, and the hall wants the stage down by dark. The crew has to carry gear past the barricades.',
      options: [
        { id: 'CARRY', label: 'Hand-carry the gear and start on time', likely: 'Costs an hour of your day. Most get in.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Amps went past the barricades one at a time. The stage was ready by dark.' },
        { id: 'LATE', label: 'Push doors back until the street reopens', likely: 'The crowd that wants a night out shows up.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .92 }],
          result: 'Doors an hour late. The festival crowd drifted in.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'A lot of people give up on the barricades.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Half the list never found a way past the cones.' }
      ] },

    { id: 'ROANOKE_VA_LOT_PATROL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [5, 6, 7, 8, 9] },
      telegraph: 'City police have been parked near downtown lots on Saturday nights.',
      title: 'The patrol car in the lot',
      body: 'A late bill is ending and the parents are idling in the lot. A patrol car is waiting, and the curfew for kids under seventeen is on everybody\'s mind.',
      options: [
        { id: 'EARLY', label: 'End the night early and clear the lot', likely: 'A short night, no trouble.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Done before the cutoff. The lot was empty by eleven.' },
        { id: 'ACCEPT', label: 'Run it and watch the clock', likely: 'Nervous parents leave early.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The patrol car sat there all night and half the kids were pulled out early.' }
      ] }
  ]
});
