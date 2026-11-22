SB.Cities.register('oxnard-ca', {
  v: 1,
  slug: 'oxnard-ca',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['nardcore', 'the nard', 'naval base ventura county', 'seabee', 'seabees', 'point mugu', 'naval air station point mugu', 'california strawberry festival',
           'strawberry festival', 'salsa festival', 'reggae jam on the coast', 'reggae jam', 'tall ships festival', 'channel islands tall ships', 'csu channel islands',
           'cal state channel islands', 'oxnard college', 'cal lutheran', 'california lutheran', 'amazon', 'amtrak', 'metrolink', 'greyhound', 'union pacific',
           'thomas fire', 'henry t. oxnard historic district', 'carnegie art museum', 'river ridge field', 'ventura county fair', 'ventura county fairgrounds',
           'vfw', 'american legion', 'oxnard refinery',
           'the cold storage', 'quonset nine', 'fifth street annex', 'the packing shed', 'hueneme road hall', 'the drainage ditch', 'pallet yard',
           'salt air room', 'ranchito rec', 'the windbreak', 'lima bean lounge', 'tide table',
           'visit oxnard', 'silver strand beach', 'kcsb', 'kclu', 'venturarocks', 'ventura county star', 'vc star', 'vc reporter', 'the fader', 'la weekly', 'oc weekly',
           'oxnard salsa festival', 'oxnard tamale festival', 'oxnard christmas parade', '4th of july family parade', 'fireworks by the sea', 'bandsintown', 'songkick'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The regional hardcore scene, the base, colleges and festivals are written only in generic form. */
  blocklist: ['nardcore*', 'seabee*', 'strawberry festival*', 'reggae jam*', 'cold storage*', 'quonset nine*', 'lima bean lounge*', 'salt air room*'],

  blurb: ['A strawberry-field and Navy city on the Ventura County coast, northwest of Los Angeles, built on a flat plain of tract homes and old barrios.',
          'Everyone is somebody\'s cousin, the tacos come after the set, and the old heads still guard the early-80s hardcore the town made for itself. Shows live in garages, yards and back lots.'],
  hard: 'Garage and yard rooms only; noise calls and fog kill nights, and bands skip it.',
  region: 'the California coast',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'San Diego', state: 'CA', lat: 32.72, lon: -117.16 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Oxnard' },
    { id: 'port-hueneme', kind: 'FEEDER', name: 'Port Hueneme', minutes: 10, bearing: 200, note: 'The Navy town at the southwest edge, where the early shows were held in halls.' },
    { id: 'camarillo', kind: 'FEEDER', name: 'Camarillo', minutes: 15, bearing: 100, note: 'A suburb with outlet shopping and its own pop-punk and metal bands.' },
    { id: 'ventura', kind: 'FEEDER', name: 'Ventura', minutes: 20, bearing: 320, note: 'The county seat and beach town up the freeway: the bigger bar economy, rival and partner.' },
    { id: 'thousand-oaks', kind: 'FEEDER', name: 'Thousand Oaks', minutes: 30, bearing: 95, note: 'A wealthy suburb with no rooms of its own; its kids come to shows here.' },
    { id: 'santa-paula', kind: 'FEEDER', name: 'Santa Paula', minutes: 30, bearing: 45, note: 'A farm and citrus town up Highway 126; its kids come down for shows.' },
    { id: 'moorpark', kind: 'FEEDER', name: 'Moorpark', minutes: 35, bearing: 75, note: 'A suburb and farm town on Highway 118.' },
    { id: 'fillmore', kind: 'FEEDER', name: 'Fillmore', minutes: 40, bearing: 50, note: 'A small farm town with railroad heritage.' },
    { id: 'ojai', kind: 'FEEDER', name: 'Ojai', minutes: 40, bearing: 350, note: 'A mountain-valley arts and wellness town.' },
    { id: 'simi-valley', kind: 'FEEDER', name: 'Simi Valley', minutes: 40, bearing: 90, note: 'A big suburb with an old skate and punk legacy.' },
    { id: 'santa-barbara', kind: 'PEER', name: 'Santa Barbara', minutes: 60, bearing: 310, slug: 'santa-barbara-ca', note: 'A smaller, wealthier college and beach town up the coast with its own scene.' },
    { id: 'santa-clarita', kind: 'PEER', name: 'Santa Clarita', minutes: 65, bearing: 65, note: 'A suburban city of similar size with its own punk and metal circuit.' },
    { id: 'antelope-valley', kind: 'PEER', name: 'Lancaster and Palmdale', minutes: 100, bearing: 45, note: 'A desert scene that is famously separate.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the historic district', route: 'downtown', note: 'Old commercial storefronts, small galleries and restaurants with back rooms; slowly gentrifying as cheap space closes.' },
    { id: 'colonia', name: 'Colonia', route: 'old-side', note: 'The long-rooted central barrio of dense old houses, big garages and back-lot units. Not a place to treat as sketchy; locals will correct you.' },
    { id: 'southwinds', name: 'Southwinds and south Oxnard', route: 'campus', note: 'Postwar and later tract homes, apartments and strip malls with Navy families; garages and rec rooms.' },
    { id: 'rose-park', name: 'Rose Park and the north-central side', route: 'old-side', note: 'Older bungalows with backyards and garages; quiet and creeping up in price.' },
    { id: 'shores', name: 'Oxnard Shores and Hollywood Beach', route: 'old-side', note: 'The beach strip: surf and skate culture, cottages, and big money moving in. Almost no commercial rooms.' },
    { id: 'del-norte', name: 'Del Norte and El Rio', route: 'work-side', note: 'Industrial yards, packing sheds, fields and warehouses by the north side; practice rooms and generator shows near the fields.' },
    { id: 'hueneme-side', name: 'the Port Hueneme edge', route: 'work-side', note: 'Halls and base-adjacent rooms where kids come and go with the rotations.' }
  ],

  rooms: [
    { id: 'southwinds-garage', kind: 'HOUSE', hood: 'southwinds', cap: 60, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 25, standing: [65, 60, 45],
      pressure: 50, start: true, note: 'A two-car garage with the door up and a yard behind. Slab houses, no basements, and one neighbor\'s call ends it.' },
    { id: 'colonia-yard', kind: 'HOUSE', hood: 'colonia', cap: 80, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 30, standing: [70, 60, 45],
      pressure: 50, note: 'A family yard with cousins on the bill and a big garage out back. Everyone knows everyone, and police watch groups outside houses.' },
    { id: 'rose-park-yard', kind: 'HOUSE', hood: 'rose-park', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 20, standing: [65, 60, 50],
      pressure: 55, note: 'An old bungalow with a backyard on a quiet block. One complaint ends it, and rents are creeping up.' },
    { id: 'hueneme-hall', kind: 'HALL', hood: 'hueneme-side', cap: 250, rent: 250, deposit: 100, pa: .6, curfew: 1350, ac: true, sketch: 10, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'A rented lodge-style hall near the base. One-night bookings, so the rent and the insurance are the squeeze.' },
    { id: 'lodge-hall', kind: 'HALL', hood: 'downtown', cap: 300, rent: 350, deposit: 150, pa: .6, curfew: 1320, ac: false, sketch: 15, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', pressure: 45, note: 'An old fraternal lodge that has held a sold-out line around the block. Hot and packed, with cords across the stage.' },
    { id: 'packing-shed', kind: 'DIY', hood: 'del-norte', cap: 100, rent: 70, deposit: 0, pa: .5, curfew: 1320, ac: false, sketch: 45, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'A shed by the fields with a generator and no permit. Warehouses and storage tenants keep outbidding bands.' },
    { id: 'downtown-pub', kind: 'BAR', hood: 'downtown', cap: 120, soundFee: 50, pa: .7, ages: ['ALL', 'A21'], matinee: true, curfew: 1500, ac: true, following: .3, sketch: 20,
      standing: [50, 65, 70], note: 'A pub with a small stage where hardcore bills land. Late nights are 21-plus, with an early all-ages matinee slot.' },
    { id: 'harbor-club', kind: 'CLUB', hood: 'hueneme-side', cap: 300, houseCosts: 150, split: .8, pa: .8, ages: ['A18'], curfew: 1410, ac: true, following: .4, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A rare real club for the town, 18-plus and over by half past eleven. The next proper ones are up in Ventura.' },
    { id: 'shores-lot', kind: 'OUTDOOR', hood: 'shores', cap: 80, rent: 15, pa: .4, curfew: 1260, sketch: 40, standing: [60, 55, 40],
      note: 'A skatepark or beach lot with a generator. Fog, wind and a patrol car are all part of the bill.' },
    { id: 'civic-theater', kind: 'BIG', hood: 'downtown', cap: 900, rent: 1800, deposit: 500, pa: .9, ages: ['ALL'], curfew: 1380, ac: true, following: .6, sketch: 5,
      standing: [40, 65, 70], owner: 'TALENT_BUYER', notice: 90, note: 'A city theater complex that hosts the yearly punk fest on two stages. Rented, never yours.' },
    { id: 'municipal-stage', kind: 'BIG', hood: 'hueneme-side', cap: 600, rent: 1500, deposit: 500, pa: .85, ages: ['ALL'], curfew: 1350, ac: true, following: .5, sketch: 5,
      standing: [40, 65, 70], owner: 'TALENT_BUYER', notice: 80, note: 'A municipal theater and its lawn, where the yearly punk festival used to be held. City rules and a strict load-out.' }
  ],

  contacts: ['santa-barbara-ca', 'los-angeles', 'san-luis-obispo-ca', 'bakersfield-ca'],

  calendar: [
    { id: 'harbor-parade', label: 'the Fourth of July harbor parade', tag: 'parade', month: 7, week: 1, dows: [4, 5, 6], can: [.90, .85, .85], hoods: ['shores', 'hueneme-side'], elsewhere: [.97, .95, .95] },
    { id: 'summer-street-fest', label: 'the downtown summer street festival', tag: 'festival', month: 7, weeks: [4, 5], dows: [5, 6], can: [.90, .88, .88], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'punk-fest', label: 'the yearly punk festival', tag: 'festival', month: 7, week: 2, dows: [4, 5], can: [.85, .80, .80] },
    { id: 'holiday-parade', label: 'the downtown holiday parade weekend', tag: 'festival', month: 12, week: 1, dows: [5], can: [.90, .88, .88], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 8, weeks: [1, 2], dows: [4, 5, 6], can: [.95, .92, .92] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.88, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.88, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320 },

  points: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24, pop: 12800000 },
    { name: 'Santa Clarita', state: 'CA', lat: 34.39, lon: -118.54, pop: 230000 },
    { name: 'Lancaster', state: 'CA', lat: 34.7, lon: -118.14, pop: 175000 },
    { name: 'San Bernardino', state: 'CA', lat: 34.11, lon: -117.29, pop: 225000 }
  ],
  roads: ['US 101', 'CA 1', 'CA 126', 'CA 118', 'CA 34', 'I-5'],

  words: {
    street: ['Fifth Street', 'Saviers Road', 'Rice Avenue', 'Channel Islands Boulevard', 'Hueneme Road', 'Ventura Road'],
    water: ['Channel Islands Harbor', 'the Santa Clara River', 'the Pacific'],
    hood: ['Colonia', 'Southwinds', 'Rose Park', 'Oxnard Shores', 'Hollywood Beach', 'Del Norte', 'El Rio', 'Silver Strand', 'Port Hueneme'],
    thing: ['strawberry field', 'taco truck', 'two-car garage', 'half-pipe', 'dry pool', 'agua fresca', 'birria', 'patio', 'fog', 'side yard'],
    weather: ['May gray', 'June gloom', 'marine layer', 'Santa Ana wind']
  },

  events: [
    { id: 'OXNARD_CA_LODGE_SELLOUT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], months: [3, 4, 5, 6, 7, 8, 9, 10, 11] },
      telegraph: 'Word is the lodge hall will sell out in minutes and tickets are already going around for double.',
      title: 'The line wraps the block',
      body: 'The lodge sold out before dinner and the resale is ugly. The hall is hot, the line runs around the building, and the locals who started the night are stuck outside.',
      options: [
        { id: 'LOCALS', label: 'Hold a block of door spots for the local bands\' people', likely: 'Fewer paid tickets. The room stays honest.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }, { op: 'REGULARS', pct: .02 }],
          result: 'The local bands\' people got in. Nobody was happy about the resale, but nobody was shut out.' },
        { id: 'EARLY', label: 'Go on early and clear the minors by ten', likely: 'A short, tight night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'The headliner went on early and the room was out by ten. Sweaty, loud and legal.' },
        { id: 'ACCEPT', label: 'Run it and let the line sort itself out', likely: 'A packed hall and a rough door.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The hall was packed to the walls and the door was a mess. People will talk about it.' }
      ] },

    { id: 'OXNARD_CA_PUNK_FEST_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival', months: [7, 8] },
      telegraph: 'The yearly punk festival lands on the same week as the harbor parade, and the shore is full.',
      title: 'The punk festival week collision',
      body: 'Twelve bands on two stages across town, the beach parking gone to the parade, and your hall show in the middle of it.',
      options: [
        { id: 'LATE', label: 'Push doors back until the punk festival lets out', likely: 'The punk festival crowd wanders in, tired and loud.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.05 }],
          result: 'Doors an hour late. The punk festival crowd poured in with nowhere else to go.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The whole scene is across town.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The whole scene was at the punk festival. The ones who came were the ones who skipped it.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. A few more could come once the punk festival was over.' }
      ] },

    { id: 'OXNARD_CA_JUNE_GLOOM', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [5, 6, 10, 11, 12] },
      telegraph: 'The marine layer is down to the sidewalk and the forecast is wet.',
      title: 'The lot is soaked',
      body: 'The beach lot is under a cold, wet fog and the generator just died. The garage in Southwinds is the only dry room anyone has.',
      options: [
        { id: 'GARAGE', label: 'Move the whole bill to a garage', likely: 'Smaller and louder, and dry.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A garage took the bill. Shoulder to shoulder and the door rolled down on the fog.' },
        { id: 'WAIT', label: 'Wait for the generator and play on', likely: 'A late start and a damp crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 75 }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The generator coughed back to life at ten. The wet ones stayed.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The fog lifted by noon.' }
      ] }
  ]
});
