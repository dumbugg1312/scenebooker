SB.Cities.register('baton-rouge-la', {
  v: 1,
  slug: 'baton-rouge-la',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['louisiana state university', 'lsu', 'tigerland', 'southern university', 'baton rouge community college', 'our lady of the lake',
           'southeastern louisiana university', 'nicholls state', 'ole miss', 'mississippi state', 'bayou classic', 'raising cane\'s',
           'community coffee', 'abita', 'waffle house', 'circle k', 'mall of louisiana', 'perkins rowe', 'wbrz', '225', 'inregister', 'klsu', 'dotd',
           'atc', 'angola', 'vfw', 'american legion', 'elks', 'the advocate', 'chemical corridor', 'exxon', 'exxonmobil', 'dow chemical',
           'hurricane katrina', 'plank road social club', 'delmont gardens rec hall', 'sugar mill annex', 'port allen elks lodge back room',
           'the overpass lot', 'airline highway skate and snack', 'cottonmouth hall', 'oak villa pavilion', 'ten mile bayou feed store',
           'the levee road laundromat', 'scenic highway practice bays', 'gus\'s carport'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The August 2016 flood is 'the flood of 2016' in game text. */
  blocklist: ['lsu*', 'tigerland*', 'raising cane\'s*', 'community coffee*', 'abita*', 'wbrz*', 'klsu*', 'waffle house*', 'bayou classic*'],

  blurb: ['A hot, flat, car-only river capital where hardcore and metal kids pack the few rooms that take them and one all-ages festival day matters.',
          'The old all-ages rooms are gone, football owns Saturdays, and the bigger music city is an hour down the interstate.'],
  hard: 'Bars cap you at 18+, the old all-ages rooms are gone, and football owns Saturdays.',
  region: 'the Gulf Coast run',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07 },
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 }
  ],

  tilt: [
    { fan: 'metal', band: 'hardcore', d: .10, reason: 'A heavy town where hardcore and swamp metal are the live engine, and they share the same few rooms.' },
    { fan: 'hardcore', band: 'metal', d: .10, reason: 'A heavy town where hardcore and swamp metal are the live engine, and they share the same few rooms.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Baton Rouge' },
    { id: 'zachary', kind: 'FEEDER', name: 'Zachary', minutes: 25, bearing: 15,
      note: 'An affluent school-district suburb, football crazy. Kids with cars and a long way to drive for anything loud.' },
    { id: 'denham-springs', kind: 'FEEDER', name: 'Denham Springs', minutes: 25, bearing: 95, beyond: 'perkins-works',
      note: 'A church-heavy suburb where most houses flooded in 2016. The closest thing to a hardcore feeder.' },
    { id: 'prairieville', kind: 'FEEDER', name: 'Prairieville and Gonzales', minutes: 30, bearing: 130,
      note: 'Fast-growing exurbs of commuter families, with one all-ages hall that shows up on the regional lists.' },
    { id: 'port-allen', kind: 'FEEDER', name: 'Port Allen and Plaquemine', minutes: 25, bearing: 265, beyond: 'river-bridge',
      note: 'Plant and river towns across the water. Cheap buildings, a lodge or two, and a bridge between you and them.' },
    { id: 'hammond', kind: 'FEEDER', name: 'Hammond', minutes: 45, bearing: 95,
      note: 'A state-college town on I-12 with a small scene of its own. A natural band stop.' },
    { id: 'ponchatoula', kind: 'FEEDER', name: 'Ponchatoula and Walker', minutes: 40, bearing: 105,
      note: 'Strawberry and antique-store towns off I-12. Small, rural and a little bored.' },
    { id: 'st-francisville', kind: 'FEEDER', name: 'St. Francisville and New Roads', minutes: 45, bearing: 330, beyond: 'river-bridge',
      note: 'Rural river parishes with a prison and plantation tourism. Occasional carloads.' },
    { id: 'thibodaux', kind: 'FEEDER', name: 'Donaldsonville and Thibodaux', minutes: 60, bearing: 205,
      note: 'Bayou towns on the way south, with a state college and some scene of its own.' },
    { id: 'covington', kind: 'FEEDER', name: 'Covington and Mandeville', minutes: 60, bearing: 95,
      note: 'Rich Northshore suburbs. The kids look to New Orleans first.' },
    { id: 'lafayette', kind: 'PEER', name: 'Lafayette', minutes: 55, bearing: 270, slug: 'lafayette-la',
      note: 'The strongest peer: its own metal and punk circuit, a university and a very different music identity.' },
    { id: 'jackson', kind: 'PEER', name: 'Jackson', state: 'MS', minutes: 140, bearing: 5, slug: 'jackson-ms',
      note: 'The other state capital, a similar government and university town.' },
    { id: 'lake-charles', kind: 'PEER', name: 'Lake Charles', minutes: 105, bearing: 275, scene: 700,
      note: 'A smaller casino and refinery town down I-10. A stop on the way to Houston.' }
  ],

  chokepoints: [                                // which zones each one cuts is said by the zones' `beyond`, above
    { id: 'river-bridge', name: 'the Mississippi River bridge on I-10', p: .02 },
    { id: 'perkins-works', name: 'I-10 through the Perkins interchange', p: .015 }
  ],

  hoods: [
    { id: 'mid-city', name: 'Mid City', route: 'old-side', note: 'Bungalows, shotguns, tire shops and plate-lunch counters along Government Street. New bars and food halls are arriving and investors are buying; the next rooms will be priced out here.' },
    { id: 'perkins', name: 'Perkins Road and Southdowns', route: 'downtown', note: 'A strip of bars and lots under and beside the interstate. Outdoor lot shows have worked here, but the underpass is now a planning project.' },
    { id: 'campus', name: 'Chimes Street and Highland Road', route: 'campus', note: 'The campus district, with the old college bar strip by the north gate. Student rents and a college crowd that turns over every four years.' },
    { id: 'downtown', name: 'downtown and Spanish Town', route: 'downtown', note: 'Galleries, bars and a few reuse buildings by the capitol, empty after five. Spanish Town is the only walkable neighborhood, with small bungalows and parade-season parties.' },
    { id: 'old-south', name: 'Old South Baton Rouge', route: 'work-side', note: 'A historic neighborhood of old houses and vacant lots south of downtown, under development pressure. Church halls and reuse buildings.' },
    { id: 'north', name: 'Scotlandville and North Baton Rouge', route: 'work-side', note: 'Large working-class neighborhoods at the north end of I-110. Not a punk neighborhood, but a booker has to understand who gets to host what.' },
    { id: 'airline', name: 'Gardere and Airline Highway', route: 'work-side', note: 'Strip-mall and ranch-house suburbs where a lot of actual teenagers live: carports, garages, practice units and warehouse bays. Cheap and ignored.' },
    { id: 'west-bank', name: 'Port Allen and the west bank', route: 'work-side', note: 'Small and industrial across the river. Sometimes a warehouse or a lodge, if you can cross the bridge.' }
  ],

  rooms: [
    { id: 'airline-carport', kind: 'HOUSE', hood: 'airline', cap: 45, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: true, sketch: 25, standing: [70, 60, 45],
      pressure: 50, start: true, note: 'A covered carport open on the sides, on a street of slab ranch houses. A thunderstorm shuts it down, and so does the humidity.' },
    { id: 'campus-porch', kind: 'HOUSE', hood: 'campus', cap: 40, hostCut: 0, pa: .3, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [65, 55, 40], pressure: 55,
      note: 'A rented house near campus, on the ground floor like everything else. The tenants change every year.' },
    { id: 'mid-city-yard', kind: 'OUTDOOR', hood: 'mid-city', cap: 70, rent: 10, pa: .4, curfew: 1320, sketch: 30, standing: [60, 55, 40],
      note: 'A backyard behind an old bungalow. Evenings only; the heat index decides everything else.' },
    { id: 'church-hall', kind: 'HALL', hood: 'old-south', cap: 110, rent: 90, deposit: 25, pa: .5, curfew: 1260, ac: true, sketch: 5, standing: [60, 60, 60],
      owner: 'CHURCH_CONTACT', pressure: 50, note: 'A church hall that will rent on a Sunday afternoon. The flyer cannot say anything it would not say in church.' },
    { id: 'lodge-hall', kind: 'HALL', hood: 'west-bank', cap: 150, rent: 180, deposit: 75, pa: .6, curfew: 1380, ac: true, sketch: 15, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'A lodge hall across the river. A flat fee, a long list of rules and a bridge to cross.' },
    { id: 'warehouse-bay', kind: 'DIY', hood: 'airline', cap: 90, rent: 70, deposit: 0, pa: .5, curfew: 1440, ac: false, sketch: 40, standing: [55, 60, 45], pressure: 55,
      needs: ['VOUCH'], note: 'A light-industrial bay off Airline Highway. Sound leaks and the neighbors complain; that is how these end.' },
    { id: 'mid-city-warehouse', kind: 'DIY', hood: 'mid-city', cap: 130, rent: 80, deposit: 0, pa: .6, curfew: 1440, ac: false, sketch: 45, standing: [55, 60, 45], pressure: 60,
      needs: ['VOUCH'], note: 'A cheap commercial building on Government Street. The next investor is already looking at it.' },
    { id: 'record-shop', kind: 'SHOP', hood: 'campus', cap: 45, pa: .4, curfew: 1200, ac: true, sketch: 5, standing: [70, 70, 75], following: .2,
      note: 'The record store near campus. Afternoon in-stores, over by dinnertime.' },
    { id: 'lot-bar', kind: 'BAR', hood: 'perkins', cap: 140, soundFee: 50, pa: .7, ages: ['A18', 'A21'], curfew: 1500, ac: false, outdoor: true, following: .3, sketch: 15,
      standing: [45, 65, 70], note: 'A bar and lot by the overpass. Eighteen and up, wristbands, and a big open sky for the rain to fall on.' },
    { id: 'stage-bar', kind: 'BAR', hood: 'downtown', cap: 160, soundFee: 70, pa: .8, ages: ['A18', 'A21'], matinee: false, curfew: 1560, ac: true, following: .4, sketch: 10,
      standing: [45, 65, 70], note: 'A downtown bar with a stage. Eighteen and over at best; the owner was charged over noise once.' },
    { id: 'club', kind: 'CLUB', hood: 'campus', cap: 300, houseCosts: 150, split: .8, pa: .9, ages: ['A21', 'A18'], curfew: 1560, ac: true, following: .6, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The biggest room on the campus strip. It books the cover bands first and wants six weeks and a name.' }
  ],

  contacts: ['lafayette-la', 'jackson-ms'],

  weather: { preset: 'GULF', storm: { months: [6, 7, 8, 9, 10, 11], peak: [8, 9, 10], perWeek: .01, perWeekPeak: .04 } },

  calendar: [
    { id: 'football-sat', label: 'home football Saturday', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.70, .80, .85], hoods: ['campus', 'perkins'], elsewhere: [.88, .92, .95] },
    { id: 'football-oct', label: 'home football Saturday', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.70, .80, .85], hoods: ['campus', 'perkins'], elsewhere: [.88, .92, .95] },
    { id: 'football-nov', label: 'home football Saturday', tag: 'game', month: 11, weeks: [1, 4], dows: [5], can: [.70, .80, .85], hoods: ['campus', 'perkins'], elsewhere: [.88, .92, .95] },
    { id: 'parade', label: 'Mardi Gras parade weekend', tag: 'parade', month: 2, week: 2, dows: [4, 5, 6], can: [.85, .80, .80], hoods: ['downtown'], elsewhere: [.95, .92, .92] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320 },

  points: [
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07, pop: 1270000 },
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37, pop: 7300000 },
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.80, pop: 1180000 }
  ],
  roads: ['I-10', 'I-12', 'I-110', 'US 61', 'US 190', 'LA 1'],

  words: {
    street: ['Government Street', 'Florida Boulevard', 'Nicholson Drive', 'Highland Road', 'Perkins Road', 'Airline Highway', 'Plank Road', 'Scenic Highway', 'Burbank Drive', 'Acadian Thruway'],
    water: ['the Mississippi', 'University Lakes', 'Bayou Duplantier', 'the Amite', 'the Atchafalaya'],
    hood: ['Mid City', 'Spanish Town', 'Southdowns', 'Old South Baton Rouge', 'Scotlandville', 'Gardere', 'Broadmoor', 'Sherwood Forest', 'Beauregard Town'],
    thing: ['carport', 'shotgun house', 'po-boy', 'boudin', 'crawfish boil', 'snowball', 'plate lunch', 'refinery flare', 'levee', 'median', 'ballroom', 'festival day'],
    weather: ['heat index', 'afternoon thunderstorm', 'tropical storm', 'flash flood'],
    surnames: ['Landry', 'Broussard', 'Thibodeaux', 'Boudreaux', 'Johnson', 'Williams', 'Robinson', 'Hebert']
  },

  events: [
    { id: 'BATON_ROUGE_LA_GAME_DAY', when: 'WEEK', tier: 'REAL', weight: 3, cooldown: 30, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'game' },
      telegraph: 'Home game Saturday: traffic will be turned one way toward the stadium.',
      title: 'The stadium owns the roads',
      body: 'A hundred thousand people are headed for the stadium. Police run the roads one way for ninety minutes before kickoff, and your load-in is on the wrong side of it.',
      options: [
        { id: 'EARLY', label: 'Load in early, before the barricades', likely: 'Most get in, but the crowd is thinner after.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Gear was in by noon, and the ones who came parked far away and walked.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'A lot of people give up on the parking.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The crowd that mattered was somewhere else.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date, which costs you trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'BATON_ROUGE_LA_CARPORT_STORM', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 35, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [5, 6, 7, 8, 9, 10] },
      telegraph: 'Thunderstorms are lining up from the Gulf all week.',
      title: 'The storm sits on the carport',
      body: 'A summer storm has parked overhead for three hours. The street is flooding, and water is coming in at the open sides of the carport with the amps ten feet away.',
      options: [
        { id: 'WAIT', label: 'Wait it out and start late', likely: 'Some leave, and the rest stay.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'It cleared around ten, and the room was damp and the people who stayed were loud.' },
        { id: 'TARPS', label: 'Hang tarps and play on', likely: 'It costs thirty dollars, and the crowd shrinks.',
          effects: [{ op: 'MONEY', amount: -30 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'You hung blue tarps over a wet drum kit, and it sounded like the end of the world.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date, which costs you trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the ones who could come, came.' }
      ] },

    { id: 'BATON_ROUGE_LA_BRIDGE_JAM', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Lane closures are planned on the river bridge this week.',
      title: 'The bridge is backed up',
      body: 'A wreck on the I-10 bridge over the river has traffic stopped, and the kids and the band coming from across the water are stuck behind it.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it, but the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'You moved doors up an hour, and the people who really wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'You lose most of the people who have to cross.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The backup never cleared, and the people across the river stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'It takes two hours of your day, but most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads of kids took the long way around together.' }
      ] }
  ]
});
