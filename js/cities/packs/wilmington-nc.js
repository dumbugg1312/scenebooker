SB.Cities.register('wilmington-nc', {
  v: 1,
  slug: 'wilmington-nc',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['unc wilmington', 'uncw', 'unc pembroke', 'cape fear community college', 'east carolina university', 'camp lejeune', 'fort bragg',
           'azalea festival', 'holiday flotilla', 'cucalorus', 'riverfest', 'seahawks', 'starnews', 'star-news', 'port city daily', 'whqr', 'wave transit',
           'cape fear public transportation authority', 'cook out', 'waffle house', 'bojangles', 'biscuitville', 'cheerwine', 'sun drop',
           'hurricane florence', 'wilmywood', 'battleship north carolina', 'uss north carolina', 'vfw', 'american legion',
           'the carport at shipyard', 'marl pit hall', 'pogie row annex', 'spanish moss room', 'number nine fellowship hall', 'brickyard loft',
           'monkey junction roller rink', 'the fisher street garage', 'cape lot 14', 'vinegar slab pizza', 'the dry dock back porch', 'salt marsh social hall',
           'wilmington biz', 'wilmingtonbiz', 'wect', 'wway', 'port city jams', 'avenue wilmington', 'salt magazine', 'wilmington and beaches', 'wilmington downtown inc',
           'downtown alive', 'nc azalea festival', 'north carolina azalea festival', 'wrightsville beach holiday flotilla', 'wilmington beer week',
           'lighthouse beer and wine festival', 'nc 4th of july festival', 'greenfield lake amphitheater', 'live oak bank pavilion', 'riverfront park', 'wilson center',
           'hopscotch', 'hurricane helene', 'wilmington strong', 'music over flo', 'unc school of government', 'nc abc commission', 'ncrla', 'wfae',
           'spectrum news', 'pollstar', 'eventbrite', 'bandsintown'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The storm is written only as 'the storm' in game text. */
  blocklist: ['uncw*', 'starnews*', 'port city daily*', 'cucalorus*', 'azalea festival*', 'cook out*', 'marl pit*', 'pogie row*'],

  blurb: ['A Cape Fear River port city squeezed between the river and the Atlantic beaches, where hardcore, indie, metal and folk-punk share bills because there aren\'t enough people for any one of them.',
          'Rooms rise and fall with the lease, the school year and the next named storm.'],
  hard: 'A two-hour detour, no basements, and a storm season.',
  region: 'the Carolina coast',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64 },
    { name: 'Charleston', state: 'SC', lat: 32.78, lon: -79.93 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Wilmington' },
    { id: 'leland', kind: 'FEEDER', name: 'Leland, Belville and Navassa', minutes: 15, bearing: 295, note: 'Fast-growing subdivisions just over the bridge; kids with no scene of their own come in.' },
    { id: 'hampstead', kind: 'FEEDER', name: 'Hampstead', minutes: 30, bearing: 15, note: 'A beach-adjacent suburb up US 17. Teens drive to town.' },
    { id: 'burgaw', kind: 'FEEDER', name: 'Burgaw', minutes: 30, bearing: 340, note: 'A small county seat with a band or two.' },
    { id: 'southport', kind: 'FEEDER', name: 'Southport and Oak Island', minutes: 40, bearing: 190, note: 'Fishing and retiree beach towns with little scene.' },
    { id: 'wallace', kind: 'FEEDER', name: 'Wallace and Warsaw', minutes: 45, bearing: 355, note: 'Farm country up I-40. Kids drive in.' },
    { id: 'shallotte', kind: 'FEEDER', name: 'Shallotte and Calabash', minutes: 50, bearing: 235, note: 'Beach and retiree towns near the South Carolina line.' },
    { id: 'topsail', kind: 'FEEDER', name: 'Surf City and Topsail Island', minutes: 50, bearing: 35, note: 'A summer beach crowd that is empty off-season.' },
    { id: 'elizabethtown', kind: 'FEEDER', name: 'Elizabethtown', minutes: 55, bearing: 315, note: 'A small river town to the northwest.' },
    { id: 'whiteville', kind: 'FEEDER', name: 'Whiteville', minutes: 60, bearing: 280, note: 'A rural county seat west on US 74; kids make the drive.' },
    { id: 'jacksonville', kind: 'PEER', name: 'Jacksonville', minutes: 70, bearing: 25, scene: 1500, note: 'A young military town up the road with a punk and metal streak.' },
    { id: 'myrtle-beach', kind: 'PEER', name: 'Myrtle Beach', state: 'SC', minutes: 95, bearing: 225, slug: 'myrtle-beach-sc', note: 'A tourist strip with a small DIY scene whose bands come up US 17.' },
    { id: 'fayetteville', kind: 'PEER', name: 'Fayetteville', minutes: 100, bearing: 330, slug: 'fayetteville-nc', note: 'A larger Army town that trades heavy and hardcore bands.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Brick storefronts and a riverwalk full of bars, tourists and students. Priced for anyone but DIY; every room lives on a permit and a landlord with other offers.' },
    { id: 'brooklyn', name: 'the Brooklyn arts district', route: 'old-side', note: 'Old warehouses and studios just north of downtown, home to the film and artist crowd. Heating up and getting priced out.' },
    { id: 'southside', name: 'the Southside and Carolina Beach Road', route: 'work-side', note: 'Working-class houses, auto shops and small warehouses running south to Monkey Junction. Garages, carports and practice units.' },
    { id: 'midtown', name: 'Midtown and Wrightsville Avenue', route: 'old-side', note: 'Mid-century ranch houses and motels between downtown and the beach, where working musicians rent. A candidate for the next price jump.' },
    { id: 'college-road', name: 'College Road and the campus side', route: 'campus', note: 'Student apartment complexes and rentals around the university. Complexes shut parties down fast.' },
    { id: 'inner-ring', name: 'Greenfield Lake and Forest Hills', route: 'old-side', note: 'Quiet tree-lined bungalow streets where neighbors call in noise quickly. Porch and small backyard shows.' },
    { id: 'castle-hayne', name: 'Castle Hayne and the north county', route: 'work-side', note: 'Industrial lots, acreage and big yards up toward the airport. Cheap, with generator and field shows.' },
    { id: 'over-the-bridge', name: 'across the river', route: 'campus', note: 'New subdivisions in the next county where many workers now live. Strict HOAs.' },
    { id: 'wrightsville-beach', name: 'Wrightsville Beach', route: 'old-side', note: 'The beach town east of Midtown: bar patios, summer crowds and a bridge that backs up. Dead in the off-season.' }
  ],

  rooms: [
    { id: 'southside-carport', kind: 'HOUSE', hood: 'southside', cap: 40, ages: ['ALL'], curfew: 1320,outdoor: true, ac: false, pressure: 55, start: true,  note: 'A carport and a sandy back yard on a slab ranch house, with an extension cord out the kitchen window. One call to the non-emergency line ends it.' },
    { id: 'forest-porch', kind: 'HOUSE', hood: 'inner-ring', cap: 30, ages: ['ALL'], curfew: 1290,outdoor: true, ac: false,  note: 'A screened porch on a bungalow street. Short sets, early, and the neighbors are quick.' },
    { id: 'north-field', kind: 'HOUSE', hood: 'castle-hayne', cap: 80, ages: ['ALL'], curfew: 1410,outdoor: true, ac: false,  note: 'A big yard and a generator out on the north county acreage. Nobody to complain, and a long way from anything.' },
    { id: 'back-room', kind: 'DIY', hood: 'downtown', cap: 100, ages: ['A18'], curfew: 1380,ac: true, pressure: 55,  note: 'A back room behind a wine-and-beer shop on the core blocks. The hub for the local mixed bills, and it lives on a landlord and a permit.' },
    { id: 'rec-bar', kind: 'BAR', hood: 'downtown', cap: 120, ages: ['A18'], curfew: 1500,ac: true,  note: 'A bar with a rec room, darts and pinball, that books late sets and touring bands. Eighteen and up, and the drinks are the money.' },
    { id: 'main-road-tavern', kind: 'BAR', hood: 'midtown', cap: 150, ages: ['A21'], curfew: 1470,ac: true,  note: 'A tavern on the main road out to the beach that lists punk and hardcore bills. Treat it as twenty-one and up.' },
    { id: 'church-hall', kind: 'HALL', hood: 'downtown', cap: 300, ages: ['ALL'], curfew: 1320,ac: true, rent: 400,  note: 'A converted old church used for the big release shows. Rare, costly, and the old building is what bites.' },
    { id: 'old-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['A18'], curfew: 1440,ac: true, pressure: 60,  note: 'A mid-size room in an old downtown building. The last big one was shut on structural findings, so everyone checks the floor.' },
    { id: 'patio', kind: 'OUTDOOR', hood: 'downtown', cap: 150, ages: ['ALL'], curfew: 1260,ac: false, outdoor: true, pressure: 60,  note: 'A taproom patio on the riverfront blocks. Zoning writes citations for amplified sound without a stage permit, and the police take the noise calls.' },
    { id: 'beach-patio', kind: 'OUTDOOR', hood: 'wrightsville-beach', cap: 200, ages: ['A21'], curfew: 1380,ac: false, outdoor: true,  note: 'A beach bar patio that has hosted hardcore and straight-edge sets. Summer only.' },
    { id: 'arts-shop', kind: 'SHOP', hood: 'brooklyn', cap: 60, ages: ['ALL'], curfew: 1200,ac: true,  note: 'A storefront in the arts district. Afternoon sets for the film and art crowd, over by eight.' },
    { id: 'waterfront-pavilion', kind: 'BIG', hood: 'downtown', cap: 1200, ages: ['ALL'], curfew: 1380,ac: true,  note: 'The big waterfront pavilion. Touring packages only, almost never the scene.' },
  ],

  contacts: ['myrtle-beach-sc', 'fayetteville-nc', 'raleigh', 'charleston-sc', 'durham-nc'],

  calendar: [
    { id: 'spring-festival', label: 'the spring garden festival', tag: 'festival', month: 4, week: 2, dows: [2, 3, 4, 5, 6], can: [0.85, 0.88, 0.9], hoods: ['downtown'], elsewhere: [1, 0.97, 0.97] },
    { id: 'move-in', label: 'move-in week', tag: 'graduation', month: 8, week: 2, dows: [2, 3, 4, 5, 6], can: [0.85, 0.9, 0.92], hoods: ['college-road'], elsewhere: [1, 1, 1] },
    { id: 'river-festival', label: 'the river festival', tag: 'festival', month: 10, week: 1, dows: [4, 5, 6], can: [0.85, 0.88, 0.9], hoods: ['downtown'], elsewhere: [1, 0.97, 0.97] },
    { id: 'beer-week', label: 'taproom beer week', tag: 'festival', month: 10, weeks: [2, 4], dows: [4, 5], can: [0.93, 0.95, 0.97], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'boat-parade', label: 'the holiday boat parade', tag: 'parade', month: 11, week: 4, dows: [5], can: [0.92, 0.9, 0.9], hoods: ['wrightsville-beach'], elsewhere: [1, 0.97, 0.97] },
    { id: 'fourth', label: 'the Fourth of July on the river', tag: 'holiday', month: 7, week: 1, dows: [4, 5, 6], can: [0.9, 0.88, 0.88], hoods: ['downtown'], elsewhere: [1, 0.97, 0.97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1440 },

  points: [
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64, pop: 470000 },
    { name: 'Charleston', state: 'SC', lat: 32.78, lon: -79.93, pop: 150000 },
    { name: 'Greenville', state: 'NC', lat: 35.61, lon: -77.37, pop: 90000 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 880000 },
    { name: 'Florence', state: 'SC', lat: 34.20, lon: -79.76, pop: 40000 }
  ],
  roads: ['I-40', 'I-140', 'US 17', 'US 74', 'US 421', 'Oleander Drive'],

  words: {
    street: ['Market Street', 'Princess Street', 'Front Street', 'Oleander Drive', 'College Road', 'Carolina Beach Road', 'Shipyard Boulevard', 'Castle Street'],
    water: ['the Cape Fear', 'the Cape Fear River', 'Greenfield Lake', 'Wrightsville Beach'],
    hood: ['Brooklyn', 'Southside', 'Midtown', 'Castle Hayne', 'Forest Hills', 'Sunset Park', 'Monkey Junction', 'Wrightsville Beach', 'Carolina Beach'],
    thing: ['carport', 'live oak', 'shrimp boat', 'hush puppy', 'boiled peanuts', 'sweet tea', 'screened porch', 'extension cord', 'sandy yard', 'taproom', 'storage unit'],
    weather: ['tropical storm watch', 'pollen', 'humidity', 'afternoon thunderstorm']
  },

  events: [
    { id: 'WILMINGTON_NC_FESTIVAL_BLOCK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'A festival is closing the downtown streets, and the load-in block is on the list.',
      title: 'The streets are closed and the tourists are wandering in',
      body: 'Downtown is shut to cars for the festival. Your load-in is on a blocked street, and half the room is tourists who thought it was a bar.',
      options: [
        { id: 'EARLY', label: 'Load in early, before the barricades', likely: 'It\'s a tight scramble, and the room fills with strangers anyway.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.95 }],
          result: 'You had the gear in by four and opened doors early, and the strangers stayed for two songs and clapped.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The locals avoid downtown on festival nights.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }],
          result: 'The regulars fought the parking and made it, but the rest of the street never found the door.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date, and the bands trust you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'WILMINGTON_NC_PATIO_CITATION', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [4, 5, 6, 7, 8, 9, 10] },
      telegraph: 'A taproom down the block got a citation for amplified sound on its patio, and word has gotten around.',
      title: 'The patio set draws a zoning ticket',
      body: 'The patio has no permit for amplified sound, and zoning and the police both enforce it, so the band can go inside or play without the amps.',
      options: [
        { id: 'INSIDE', label: 'Move the bill into a house', likely: 'It\'s smaller and louder, and nobody can cite a carport.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A carport took the bill with an hour to spare, and the extension cord held.' },
        { id: 'UNPLUGGED', label: 'Play it unplugged on the patio', likely: 'It\'s quiet and strange, and some people love that.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'They played acoustic guitars and a cardboard kick drum, and it was quiet and odd and pretty great.' },
        { id: 'RISK', label: 'Run it loud and pay if it comes', likely: 'There\'s a fine if someone calls.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'REGULARS', pct: .02 }],
          result: 'The ticket came during the last song, and the crowd thought it was worth it.' }
      ] },

    { id: 'WILMINGTON_NC_STORM_WEEK', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], months: [8, 9, 10] },
      telegraph: 'The storm is out in the Atlantic, and the whole coast is watching the forecast.',
      title: 'The storm turns toward the coast',
      body: 'An evacuation order is coming and the touring van has already turned around, so the bill is down to the locals who are staying put.',
      options: [
        { id: 'SHORT', label: 'Run the short bill in a carport', likely: 'It\'s a thin, loud, close night.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.7 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'A few locals and a generator played while the wind picked up, and nobody wanted to leave.' },
        { id: 'MOVE', label: 'Move it a week', likely: 'It breaks the date, and everybody trusts you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it, and the people who stayed in town came to the next one.' }
      ] },

    { id: 'WILMINGTON_NC_MOVE_IN', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'graduation' },
      telegraph: 'It\'s move-in week, and the road to campus is a parking lot.',
      title: 'Every student is stuck on College Road',
      body: 'The back room is empty because every student is stuck in move-in traffic. The new freshmen will come next Friday, and they won\'t know the rules.',
      options: [
        { id: 'LATE', label: 'Hold doors until the traffic clears', likely: 'It starts late, and the people who made it are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }],
          result: 'You opened doors an hour late, and the freshmen drifted in sunburned and asked who was playing.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'It\'s a thin night with a few new faces.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }],
          result: 'The room was half full, and three freshmen asked how to get on the list.' }
      ] }
  ]
});
