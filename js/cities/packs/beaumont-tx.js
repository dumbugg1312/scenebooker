SB.Cities.register('beaumont-tx', {
  v: 1,
  slug: 'beaumont-tx',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['lamar university', 'lamar', 'spindletop', 'spindletop-gladys city', 'gladys city', 'beaumont enterprise', 'beaumont examiner', 'what\'s up setx', 'south texas state fair',
           'south texas state fair and rodeo', 'ford park', 'mardi gras of southeast texas', 'neches river festival', 'crawfish festival', 'cajun food trail', 'floyd\'s',
           'rao\'s', 'rao\'s bakery', 'tia juanita\'s', 'madison\'s', 'whataburger', 'shiner', 'lone star', 'dr pepper', 'big red', 'topo chico', 'hurricane rita', 'hurricane ike',
           'hurricane harvey', 'harvey', 'imelda', 'tropical storm imelda', 'hurricane laura', 'winter storm uri', 'southland conference', 'tabc', 'vfw', 'american legion',
           'elks', 'moose', 'eatbmt', 'port of beaumont', 'texas alcoholic beverage commission',
           'the mudbug annex', 'mudbug annex', 'derrick street hall', 'the rice dryer', 'cat five lounge', 'the boudin barn', 'flare stack annex', 'marsh hen hall',
           'slab and sill', 'the tank farm', 'third shift hall', 'dowlen mattress annex', 'bayou rouge elks annex',
           'beaumont cvb', 'discover beaumont', 'gusher marathon', 'spindletop spin', 'dogtober fest', 'drillers reunion', 'sofar sounds', '12newsnow', '12news',
           'houston press', 'dallas observer', 'noisey', 'bandsintown', 'jambase', 'texas highways', 'bisnow', 'texas music office', 'texas state music directory'],
  /* Banned holds the dossier's real institutions and its invented venue names (unchecked). Storms are written only as 'the '05 storm', 'the '08 storm' and so on. */
  blocklist: ['beaumont enterprise*', 'beaumont examiner*', 'whataburger*', 'lamar university*', 'rao\'s*', 'tia juanita*', 'derrick street hall*', 'mudbug annex*'],

  blurb: ['A refinery town with slab-floor garages, a sober all-ages band night and a much bigger scene an hour or two west in Houston.',
          'Metal and hardcore outlast the rest, and storms scatter the scene, but it keeps coming back.'],
  hard: 'Few rooms, no basements, and storms keep taking what exists.',
  region: 'the Gulf',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 },
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07 },
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.8 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Beaumont' },
    { id: 'vidor', kind: 'FEEDER', name: 'Vidor', minutes: 15, bearing: 80, note: 'A town across the river where many Beaumont workers and kids live.' },
    { id: 'nederland', kind: 'FEEDER', name: 'Nederland', minutes: 15, bearing: 150, note: 'A refinery suburb with a football-crazed high school.', scene: 60,
      rooms: [
          { id: 'nederland-park', kind: 'OUTDOOR', hood: 'nederland-town', zone: 'nederland', cap: 100, curfew: 1290, rent: 10, ages: ['ALL'],
        note: 'A skatepark or pavilion in a feeder town. A daytime show, and the heat decides it.' }
      ] },
    { id: 'port-neches', kind: 'FEEDER', name: 'Port Neches', minutes: 20, bearing: 155, note: 'A petrochemical river town where football comes first.' },
    { id: 'lumberton', kind: 'FEEDER', name: 'Lumberton', minutes: 20, bearing: 340, note: 'A fast-growing bedroom suburb up the highway.' },
    { id: 'groves', kind: 'FEEDER', name: 'Groves', minutes: 25, bearing: 160, note: 'A working-class refinery town between its neighbors.' },
    { id: 'port-arthur', kind: 'FEEDER', name: 'Port Arthur', minutes: 25, bearing: 165, scene: 250, note: 'A bigger refinery city that is a neighbor and rival; kids ride in anyway.', bands: 2 },
    { id: 'bridge-city', kind: 'FEEDER', name: 'Bridge City', minutes: 25, bearing: 100, note: 'A bayou and shrimping town on the bay side.' },
    { id: 'orange', kind: 'FEEDER', name: 'Orange', minutes: 30, bearing: 85, note: 'A shipyard and paper-mill town near the Louisiana line with a small scene.', bands: 1 },
    { id: 'winnie', kind: 'FEEDER', name: 'Winnie', minutes: 30, bearing: 250, note: 'A rice and cattle town and a truck-stop exit.' },
    { id: 'silsbee', kind: 'FEEDER', name: 'Silsbee', minutes: 40, bearing: 345, note: 'A Piney Woods lumber town where football comes first.' },
    { id: 'lake-charles', kind: 'PEER', name: 'Lake Charles', state: 'LA', minutes: 60, bearing: 80, scene: 600, note: 'A refinery and casino town over the Sabine bridge; the same people with different food opinions.' },
    { id: 'lafayette', kind: 'PEER', name: 'Lafayette', state: 'LA', minutes: 120, bearing: 85, slug: 'lafayette-la', note: 'A music town with a bigger DIY culture; bands book it and Beaumont as a pair.' },
    { id: 'baton-rouge', kind: 'PEER', name: 'Baton Rouge', state: 'LA', minutes: 160, bearing: 85, slug: 'baton-rouge-la', note: 'A far peer at the end of the I-10 run east.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'A river-side grid of brick storefronts and one old nightlife street; empty after dark, with public money arriving.' },
    { id: 'old-town', name: 'Old Town', route: 'old-side', note: 'Big old houses and porches by downtown, with renters and artists in subdivided houses; cheap and flood-prone.' },
    { id: 'calder', name: 'the Calder Avenue corridor', route: 'old-side', note: 'Long boulevard of houses with garages and big back yards; stable, nice but not rich.' },
    { id: 'north-end', name: 'the North End', route: 'work-side', note: 'Bungalows, churches and community centers north of downtown; cheap, partly vacant and watched by police.' },
    { id: 'south-park', name: 'South Park', route: 'campus', note: 'Bungalows and rental duplexes around the university; students, retirees, and empty in summer.' },
    { id: 'dowlen', name: 'Dowlen Road and the southwest sprawl', route: 'campus', note: 'The mall and chain belt with new subdivisions; highest rents, least tolerant landlords.' },
    { id: 'college-street', name: 'College Street and the old arterials', route: 'work-side', note: 'Pawn shops, tire places and cheap strip units; the habitat of practice rooms and one-off shows.' },
    { id: 'eastex', name: 'the Eastex side', route: 'work-side', note: 'Old commercial strips and warehouse bays running toward the plants.' },
    { id: 'nederland-town', name: 'Nederland', route: 'town:nederland', note: 'A refinery suburb down the highway with a skatepark and a pavilion for daytime shows.' }
  ],

  contacts: ['houston', 'lafayette-la', 'baton-rouge-la', 'tyler-tx'],

  rooms: [
    { id: 'calder-carport', kind: 'HOUSE', hood: 'calder', cap: 60, curfew: 1320, ac: false, pressure: 45, start: true,
      note: 'A carport or back yard on a boulevard lot. No basements here, and a patrol car asking everyone to go home is how it ends.' },
    { id: 'old-town-porch', kind: 'HOUSE', hood: 'old-town', cap: 50, curfew: 1350, ac: false, pressure: 50,
      note: 'A porch and yard at a subdivided old house. It floods in a hard rain and the landlord decides the rest.' },
    { id: 'band-night', kind: 'HALL', hood: 'downtown', cap: 200, curfew: 1380, ac: false, rent: 60, deposit: 0, ages: ['ALL'], owner: 'HALL_MANAGER', sketch: 15, standing: [65, 60, 65],
      note: 'An arts-studio compound with a yard, an indoor pit and a barn. Originals only, no beer, and the monthly night has run on a hard line for years.' },
    { id: 'tire-bay', kind: 'DIY', hood: 'college-street', cap: 80, curfew: 1350, ac: false, sketch: 45, pressure: 55, needs: ['VOUCH'],
      note: 'A strip bay used as a practice room, with moving blankets on the walls. A show now and then, until the fire marshal or the landlord hears.' },
    { id: 'plant-bay', kind: 'DIY', hood: 'eastex', cap: 100, curfew: 1380, ac: false, sketch: 50, pressure: 60, needs: ['VOUCH'],
      note: 'A warehouse bay toward the plants, with a loose door and a generator. It is the worst place to be when a storm comes in.' },
    { id: 'brick-bar', kind: 'BAR', hood: 'downtown', cap: 150, curfew: 1500, ac: true, soundFee: 50, following: .2,
      note: 'A bar with a stage on the brick nightlife street. It books country and cover bands, so punk and metal get the slow nights.' },
    { id: 'belt-bar', kind: 'BAR', hood: 'dowlen', cap: 200, curfew: 1500, ac: true, soundFee: 70, pressure: 55,
      note: 'A chain-belt rock bar that rarely books punk. The rent is high and nobody here has the patience.' },
    { id: 'dance-hall', kind: 'CLUB', hood: 'downtown', cap: 300, curfew: 1440, ac: true, ages: ['A18'], following: .4,
      note: 'A restored dance hall that rents out for ticketed shows. Its status is shaky and the owner wants a full bill.' },
    { id: 'north-gym', kind: 'HALL', hood: 'north-end', cap: 120, curfew: 1320, ac: false, rent: 80, deposit: 0, owner: 'CHURCH_CONTACT',
      note: 'A church gym or community center for sober bills. Police are watching the neighborhood.' },
    { id: 'arena', kind: 'BIG', hood: 'dowlen', cap: 1000, curfew: 1380, ac: true, ages: ['ALL'],
      note: 'A rodeo and arena complex that is empty or jammed depending on fair week.' }
  ],

  calendar: [
    { id: 'mardi-gras', label: 'the Mardi Gras weekend', tag: 'parade', month: 2, weeks: [2, 4], dows: [3, 4, 5, 6], can: [.85, .80, .80], hoods: ['downtown'], elsewhere: [1, .95, .95] },
    { id: 'marathon', label: 'the spring marathon', tag: 'race', month: 3, week: 1, dows: [6], can: [.90, .90, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'spring-fair', label: 'the spring fair and rodeo', tag: 'fair', month: 3, week: 4, dows: [4, 5, 6], can: [.80, .82, .82] },
    { id: 'river-fest', label: 'the river festival', tag: 'festival', month: 4, week: 2, dows: [4, 5, 6], can: [.88, .85, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'football-sep', label: 'Friday-night football', tag: 'game', month: 9, weeks: [1, 4], dows: [4], can: [.80, .85, .85] },
    { id: 'football-oct', label: 'Friday-night football', tag: 'game', month: 10, weeks: [1, 4], dows: [4], can: [.80, .85, .85] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1440, inForce: false } },


  points: [
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37, pop: 2300000 },
    { name: 'Lake Charles', state: 'LA', lat: 30.23, lon: -93.22, pop: 78000 },
    { name: 'Galveston', state: 'TX', lat: 29.3, lon: -94.8, pop: 53000 },
    { name: 'Lufkin', state: 'TX', lat: 31.34, lon: -94.73, pop: 34000 },
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07, pop: 380000 }
  ],
  roads: ['I-10', 'US 69', 'US 96', 'US 287', 'Highway 347', 'Highway 90'],

  words: {
    street: ['Calder Avenue', 'College Street', 'Dowlen Road', 'Crockett Street', 'Eastex Freeway', 'Highway 347', 'Washington Boulevard', 'Trinity Street'],
    water: ['the Neches', 'the Sabine', 'Pine Island Bayou', 'the Ship Channel'],
    hood: ['Old Town', 'the North End', 'South Park', 'Calder Highlands', 'Caldwood', 'Eastex', 'Nederland', 'Vidor'],
    thing: ['carport', 'window unit', 'flare stack', 'boudin', 'crawfish boil', 'generator', 'refinery tower', 'blue tarp', 'practice space', 'moving blanket', 'band night'],
    weather: ['storm surge', 'evacuation', 'afternoon thunderstorm', 'heat index']
  },

  events: [
    { id: 'BEAUMONT_TX_STORM_WARNING', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], months: [6, 7, 8, 9, 10, 11] },
      telegraph: 'There is a storm in the Gulf, and the forecast cone has not decided yet.',
      title: 'A storm warning on show day',
      body: 'The Houston bands are asking whether to drive in. If the power goes down on the Eastex side, the show runs on a generator or it does not run.',
      options: [
        { id: 'GENERATOR', label: 'Tell everyone to come and run it on the generator', likely: 'It\'s louder, hotter and smaller, and the people who show up are the real ones.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'The lights went out at nine and the generator picked up the room, and it was the loudest night in months.' },
        { id: 'MOVE', label: 'Move it a day, once the sky clears', likely: 'It breaks the date, and everybody loses some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could make it came.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'Most people stay home and watch the radar.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .5 }],
          result: 'The warning held, and the bands played to the people who live next door.' }
      ] },

    { id: 'BEAUMONT_TX_BAND_NIGHT_RAIN', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [3, 4, 5, 6, 7, 8, 9, 10] },
      telegraph: 'Rain is forecast for the last Saturday, the one night the yard is supposed to be full.',
      title: 'Rain on the yard night',
      body: 'The yard is a creek and the bands are loading toward the indoor pit, and the crowd and the bands will outnumber the room.',
      options: [
        { id: 'PIT', label: 'Move it all to the indoor pit', likely: 'It\'s packed to the walls and loud, and fewer get in.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .6 }, { op: 'REGULARS', pct: .02 }],
          result: 'Every band squeezed into the pit and nobody left, and the walls were wet with sweat.' },
        { id: 'SHORT', label: 'Cut the bill and play on', likely: 'It\'s a shorter night with better sets.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'There were three bands instead of five, and the people who got in were glad.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the monthly night was not the same.' }
      ] },

    { id: 'BEAUMONT_TX_FAIR_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'Fair week has the southwest side gridlocked, and parents are dropping kids at the gate.',
      title: 'Fair week takes the crowd',
      body: 'The rodeo has half your crowd and the highway has the other half, so the bar show downtown has a stage and empty chairs.',
      options: [
        { id: 'LATE', label: 'Push doors back until the rodeo lets out', likely: 'It starts later than planned, and the crowd comes in loud.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors went up at ten, and they came off the highway still smelling of the arena.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The rodeo has the kids.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The first two bands played to the bartender, and the room filled late.' }
      ] }
  ]
});
