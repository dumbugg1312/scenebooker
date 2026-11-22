SB.Cities.register('providence', {
  v: 1,
  slug: 'providence',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['brown university', 'rhode island school of design', 'risd', 'providence college', 'johnson & wales', 'johnson and wales', 'rhode island college', 'university of rhode island',
           'uri', 'bryant university', 'salve regina', 'roger williams university', 'community college of rhode island', 'providence journal', 'projo', 'providence phoenix',
           'rhode island monthly', 'motif magazine', 'boston globe', 'wbru', 'wriu', 'wprb', 'wlnk', 'wpri', 'wjar', 'providence bruins', 'pawtucket red sox', 'pawsox',
           'rhode island fc', 'waterfire', 'amica mutual pavilion', 'dunkin donuts center', 'providence place', 'rhode island convention center', 'rhode island state house',
           'newport folk festival', 'newport jazz festival', 'lifespan', 'care new england', 'cvs health', 'textron', 'citizens bank', 'gtech', 'naval station newport',
           'naval war college', 'hurricane carol', 'hurricane bob', 'hurricane sandy', 'great hurricane of 1938', 'station nightclub', 'fete', 'lupo\'s', 'fort thunder',
           'rhode island pridefest', 'pridefest', 'rhode island pride', 'rhode island heritage festival', 'heritage festival', 'columbus day festival',
           'feast of saint joseph', 'saint joseph\'s festival', 'festival of historic houses', 'three nights of lights', 'providence children\'s film festival',
           'waterfire arts center', 'golocalprov', 'golocal', 'vanyaland', 'brown daily herald', 'brown political review', 'abc6', 'wlne', 'nbc 10', 'turnto10',
           'providence board of licenses', 'providence police', 'rhode island general assembly', 'aclu of rhode island', 'rhode island aclu',
           'atwells avenue festival', 'new england hardcore festival', 'boston bruins'],
  blocklist: ['providence journal*', 'projo*', 'waterfire*', 'fort thunder*', 'lupos heartbreak*', 'risd*', 'brown university*'],

  blurb: ['A tiny old mill port at the head of the bay where everyone is twenty minutes from everyone. Art-school weirdos and working-class punks share the same corner of the same loft.',
          'The old-timers say the good rooms are gone. The kids book the same corner of the mill district anyway, and the same few hundred faces find the next basement.'],
  hard: 'Landlords and neighbors keep killing the good rooms; every show is a favor.',
  region: 'New England',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  chokepoints: [
    { id: 'east-bay-bridge', name: 'the big river bridge to the east side', p: .03 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Providence' },
    { id: 'pawtucket', kind: 'FEEDER', name: 'Pawtucket', minutes: 10, bearing: 20, note: 'The mill town on the line and the cheap-rent twin of the city. Bands and warehouse spaces.' },
    { id: 'east-providence', kind: 'FEEDER', name: 'East Providence', minutes: 10, bearing: 110, beyond: 'east-bay-bridge', note: 'Across the river. Working-class kids who drive in.' },
    { id: 'cranston', kind: 'FEEDER', name: 'Cranston', minutes: 15, bearing: 195, note: 'Suburban basements and garages. The kids come in by car.' },
    { id: 'johnston', kind: 'FEEDER', name: 'Johnston and North Providence', minutes: 15, bearing: 285, note: 'Older suburbs full of garage bands.' },
    { id: 'warwick', kind: 'FEEDER', name: 'Warwick', minutes: 20, bearing: 185, note: 'A big suburb of malls and highway. Teens come up, and a few bands.' },
    { id: 'woonsocket', kind: 'FEEDER', name: 'Woonsocket', minutes: 25, bearing: 330, note: 'An old mill town with a small, stubborn crowd.' },
    { id: 'attleboro', kind: 'FEEDER', name: 'Attleboro', state: 'MA', minutes: 25, bearing: 50, note: 'A border town over the state line. Teens and a few bands.' },
    { id: 'fall-river', kind: 'FEEDER', name: 'Fall River', state: 'MA', minutes: 35, bearing: 130, beyond: 'east-bay-bridge', note: 'A loud, cheap mill city. People come in for shows.' },
    { id: 'newport', kind: 'FEEDER', name: 'Newport', minutes: 40, bearing: 170, note: 'A summer tourist island. A few kids drive up.' },
    { id: 'worcester', kind: 'PEER', name: 'Worcester', state: 'MA', minutes: 45, bearing: 335, slug: 'worcester-ma', note: 'A scene of similar size, with house and club shows and a lot of bill swapping.' },
    { id: 'hartford', kind: 'PEER', name: 'Hartford', state: 'CT', minutes: 60, bearing: 275, slug: 'hartford', note: 'Shared fill dates along the Route 6 line.' },
    { id: 'new-haven', kind: 'PEER', name: 'New Haven', state: 'CT', minutes: 75, bearing: 245, slug: 'new-haven-ct', note: 'Older, with a deeper DIY network.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Bars, clubs and the arts district, and the rooms that reopen under new names.' },
    { id: 'olneyville', name: 'Olneyville', route: 'work-side', note: 'Old mill buildings, cheap rent, house venues and big warehouse lofts. The likeliest place for a loud room.' },
    { id: 'elmhurst', name: 'Elmhurst', route: 'old-side', note: 'A quiet residential pocket by the colleges, where a basement ran for years until the landlord evicted the tenants.' },
    { id: 'fox-point', name: 'Fox Point', route: 'old-side', note: 'Cape Verdean and Portuguese roots, now student and young-worker housing near the water.' },
    { id: 'federal-hill', name: 'Federal Hill', route: 'downtown', note: 'An old Italian neighborhood with a restaurant strip. Noisy at night, and strict about it.' },
    { id: 'smith-hill', name: 'Smith Hill', route: 'work-side', note: 'Rowhouses and triple-deckers, cheap and close to the highway.' },
    { id: 'elmwood', name: 'Elmwood', route: 'work-side', note: 'Industrial and residential south of downtown: warehouses and body shops.' },
    { id: 'valley-falls', name: 'Valley Falls', route: 'work-side', note: 'Mill buildings along the river over the line: lofts and rehearsal rooms.' },
    { id: 'mount-pleasant', name: 'Mount Pleasant', route: 'campus', note: 'Hillside homes near a commuter college, with plenty of basements.' },
    { id: 'college-hill', name: 'College Hill', route: 'campus', note: 'The elite college slope: big old houses and noise complaints.' }
  ],

  rooms: [
    { id: 'mill-house', kind: 'HOUSE', hood: 'olneyville', cap: 60, curfew: 1320, ac: false, outdoor: false, sketch: 30, standing: [70, 60, 45], pressure: 55, start: true,
      note: 'A house in the old mill district, run on goodwill with the rules taped by the door. One landlord or one complaint from gone.' },
    { id: 'hill-basement', kind: 'HOUSE', hood: 'mount-pleasant', cap: 40, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [65, 60, 50], pressure: 50,
      note: 'A hillside basement near the commuter college. The lots are tight and the neighbors can hear the floor.' },
    { id: 'student-house', kind: 'HOUSE', hood: 'college-hill', cap: 50, ages: ['A18'], curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [75, 55, 35], pressure: 65,
      note: 'A big old student house on the hill. The city fines the noise and counts heads, and it has for years.' },
    { id: 'mill-warehouse', kind: 'DIY', hood: 'olneyville', cap: 150, curfew: 1380, ac: false, sketch: 45, standing: [55, 60, 45], pressure: 60, needs: ['VOUCH'],
      note: 'A warehouse bay in a mill. Every mill nearby is turning into apartments, so a new one will not open.' },
    { id: 'valley-lofts', kind: 'DIY', hood: 'valley-falls', cap: 100, curfew: 1380, ac: false, sketch: 35, standing: [55, 60, 45], pressure: 50,
      note: 'Rehearsal rooms and lofts in a mill over the line. Loud is fine until someone files a complaint.' },
    { id: 'hill-hall', kind: 'HALL', hood: 'federal-hill', cap: 150, rent: 180, deposit: 75, curfew: 1350, ac: true, sketch: 10, standing: [55, 60, 65],
      note: 'A club hall in the old Italian blocks. The stage is built and the neighbors on the Hill are strict about nights.' },
    { id: 'river-lot', kind: 'OUTDOOR', hood: 'valley-falls', cap: 100, rent: 15, curfew: 1200, sketch: 35, standing: [60, 55, 40],
      note: 'A riverside lot by a skatepark up the river, near the line. Daylight, a permit and a generator.' },
    { id: 'back-room', kind: 'BAR', hood: 'downtown', cap: 120, soundFee: 60, curfew: 1500, ac: true, following: .3, sketch: 20, standing: [50, 65, 70],
      note: 'A back-room stage in a bar on the old club strip. The license board watches the volume and the cover.' },
    { id: 'night-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['A18'], curfew: 1440, ac: true, following: .5, sketch: 15, standing: [45, 70, 70], needs: ['FULL_BILL'],
      note: 'An 18-plus night club downtown. Rooms on this strip close and reopen under new names.' },
    { id: 'arts-room', kind: 'CLUB', hood: 'downtown', cap: 250, ages: ['ALL'], curfew: 1380, ac: true, following: .5, sketch: 10, standing: [60, 65, 75],
      note: 'A black-box room in a nonprofit arts complex. All ages, a small cover and the steadiest room in town.' },
    { id: 'elmwood-club', kind: 'CLUB', hood: 'elmwood', cap: 300, ages: ['A18'], curfew: 1440, ac: true, following: .4, sketch: 15, standing: [45, 65, 65], needs: ['FULL_BILL'],
      note: 'A sister room south of downtown, opened when a bigger club closed. It wants a name on the bill.' },
    { id: 'big-hall', kind: 'BIG', hood: 'downtown', cap: 900, ages: ['A18'], curfew: 1410, ac: true, following: .8, sketch: 5, standing: [40, 70, 70],
      note: 'The touring room for hardcore and metal packages. They book names, not locals.' }
  ],

  contacts: ['worcester-ma', 'hartford', 'new-haven-ct', 'boston'],

  calendar: [
    { id: 'saints-feast', label: 'the Italian saint\'s festival', tag: 'festival', month: 6, weeks: [1, 2], dows: [4, 5, 6], can: [.88, .85, .85], hoods: ['federal-hill'], elsewhere: [1, .97, .97] },
    { id: 'pride', label: 'Pride weekend', tag: 'parade', month: 6, weeks: [2, 3], dows: [5], can: [.92, .88, .88], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'river-fire', label: 'the river fire night', tag: 'festival', month: 7, weeks: [1, 3], dows: [5], can: [.90, .88, .88], hoods: ['downtown'], elsewhere: [1, .98, .98] },
    { id: 'fall-waterfront', label: 'the fall waterfront festival', tag: 'festival', month: 9, week: 3, dows: [5, 6], can: [.92, .90, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'october-tents', label: 'the October neighborhood festival', tag: 'festival', month: 10, week: 2, dows: [3, 4, 5, 6], can: [.90, .88, .88], hoods: ['federal-hill'], elsewhere: [1, .97, .97] },
    { id: 'move-in', label: 'college move-in week', tag: 'graduation', month: 9, week: 1, dows: [4, 5, 6], can: [1.05, 1.05, 1], hoods: ['college-hill'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] },
    { id: 'winter-weeks', label: 'the winter holiday weeks', tag: 'holiday', month: 12, weeks: [4, 5], dows: [3, 4, 5, 6], can: [.85, .88, .90] }
  ],

  points: [
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06, pop: 4900000 },
    { name: 'New London', state: 'CT', lat: 41.36, lon: -72.1, pop: 27000 },
    { name: 'Hyannis', state: 'MA', lat: 41.65, lon: -70.29, pop: 14000 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01, pop: 19900000 }
  ],
  roads: ['I-95', 'I-195', 'I-295', 'Route 6'],

  words: {
    street: ['Broadway', 'Atwells Avenue', 'Westminster Street', 'Washington Street', 'Eddy Street', 'Hope Street'],
    water: ['Narragansett Bay', 'the Providence River', 'the Seekonk', 'the Woonasquatucket'],
    hood: ['Olneyville', 'Elmhurst', 'Fox Point', 'Federal Hill', 'Smith Hill', 'Elmwood', 'Valley Falls', 'Mount Pleasant', 'College Hill'],
    thing: ['triple-decker', 'mill loft', 'coffee milk', 'hurricane barrier', 'freight elevator', 'one-way street'],
    weather: ['nor\'easter', 'ice storm', 'damp cold']
  },

  events: [
    { id: 'PROVIDENCE_BRIDGE_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Crews have the lanes on the big river bridge down to one.',
      title: 'The bridge is down to one lane',
      body: 'An inspection has closed most of the bridge to the east side. Everyone coming from across the river, and from the mill city beyond, is stuck in the line.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the line', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors an hour early. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people from across the river.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The line never cleared. The east side stayed home.' },
        { id: 'RIDES', label: 'Organize rides the long way round', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads came round by the back streets together. They will remember that.' }
      ] },

    { id: 'PROVIDENCE_MILL_SOLD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 5] },
      telegraph: 'There is a sales sign on the mill, and a developer\'s truck has been parked out front all week.',
      title: 'The mill is sold',
      body: 'The building that holds your show has been sold to an apartment developer. The new owner wants the floor cleared by the weekend, and the freight elevator is the only way down.',
      options: [
        { id: 'GO', label: 'Run it fast and be out by eleven', likely: 'A shorter night. The elevator is slow and the ones who come are loyal.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Doors early, a fast bill, and everything out in the elevator by midnight.' },
        { id: 'BASEMENT', label: 'Move the bill to a house basement', likely: 'Smaller, and it will not be the same room.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A basement took the bill with a few hours to spare, and it was packed to the stairs.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Word gets around that the building is changing hands.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Half the list stayed home, spooked by the sign on the door.' }
      ] },

    { id: 'PROVIDENCE_RIVER_FIRE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival', months: [5, 6, 7, 8, 9, 10, 11] },
      telegraph: 'The one-way streets by the three rivers are marked for closing on Saturday night.',
      title: 'The streets are closed for the fire',
      body: 'Crowds fill the rivers on Saturday, and the one-way streets leading downtown are blocked. The van cannot get to the load-in.',
      options: [
        { id: 'EARLY', label: 'Load in at four and wait it out', likely: 'The gear gets there. A long wait before doors.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Everything was in by dark. Doors opened late and the crowd drifted in from the rivers.' },
        { id: 'ACCEPT', label: 'Run it and hope the van squeezes through', likely: 'Late and rattled. The crowd is in the traffic too.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The van sat in the line for an hour. The first band went on without a drummer.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' }
      ] },

    { id: 'PROVIDENCE_TEN_PM', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 35, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The neighbors at the triple-decker fence have been out on their porch all week.',
      title: 'Ten o\'clock sharp',
      body: 'At ten the neighbors call it in, and the officer who comes is counting heads for overcrowding as much as listening for noise.',
      options: [
        { id: 'EARLY', label: 'Cut the last band and clear the floor', likely: 'A short night. Nobody gets a ticket.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The last band packed up on the porch and the officer left without a word.' },
        { id: 'ACCEPT', label: 'Argue it and run on', likely: 'People get nervous and drift out.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }, { op: 'MONEY', amount: -25 }],
          result: 'A fine and a long talk on the stoop, and half the floor went home.' }
      ] },

    { id: 'PROVIDENCE_NOREASTER', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [8, 9, 10, 11, 12, 1, 2, 3] },
      telegraph: 'The forecast has a nor\'easter coming up the coast, and the basements are already damp.',
      title: 'The basement is under water',
      body: 'The storm has put two inches on the floor of tonight\'s basement. The only dry room in town that takes all ages is the arts complex downtown.',
      options: [
        { id: 'ARTS', label: 'Move the bill to the arts room', likely: 'A bigger room, a cover and a cleaner sound.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The arts room took the bill, and the storm kept the weak ones at home.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' },
        { id: 'ACCEPT', label: 'Run it in the wet', likely: 'Cold feet and thin crowds.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'Everybody stood on the stairs in their shoes. It was loud and nobody stayed long.' }
      ] }
  ]
});
