SB.Cities.register('savannah-ga', {
  v: 1,
  slug: 'savannah-ga',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['scad', 'savannah college of art and design', 'savannah film festival', 'savannah music festival', 'georgia southern', 'savannah state',
           'armstrong state', 'armstrong', 'hunter army airfield', 'fort stewart', 'fort eisenhower', 'hyundai', 'st. patrick\'s day parade',
           'savannah morning news', 'connect savannah', 'wtoc', 'wsav', 'whcj', 'savannah bananas', 'waffle house', 'tybee pirate fest',
           'pirate fest', 'oktoberfest on the river', 'georgia-florida', 'marine corps air station', 'parris island', 'mighty eighth', 'tabby hall',
           'the lane house social', 'lane house social', 'marsh hen social club', 'shed no. 9', 'low tide roller rink', 'legion post 441',
           'skidaway skate barn', 'pier and piling', 'ossabaw room', 'haint blue garage', 'live oak carport', 'vfw', 'american legion',
           'savannah jazz festival', 'savannah book festival', 'savannah irish festival', 'savannah greek festival', 'hellenic community center',
           'savannah christmas market', 'plant riverside district', 'savannah civic center', 'savannah craft brew fest', 'tybee post theater',
           'beach bum parade', 'savannah police department', 'scad radio', 'scad district', 'ships of the sea maritime museum', 'visit savannah',
           'bandsintown', 'opendate', 'thesavannahian', 'savannah first timer'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['scad*', 'savannah college*', 'connect savannah*', 'savannah morning*', 'hunter army*', 'fort stewart*', 'savannah bananas*', 'waffle house*', 'plant riverside district*', 'tybee post theater*'],

  blurb: ['Art kids, service workers and suburban kids share backyards and back rooms under live oaks.',
          'Heat, gnats and rental-house neighbors set the schedule, and most tours skip the town.'],
  hard: 'Short-term-rental neighbors call it in and most tours skip the town.',
  region: 'the Lowcountry',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Jacksonville', state: 'FL', lat: 30.33, lon: -81.66 },
    { name: 'Charleston', state: 'SC', lat: 32.78, lon: -79.93 },
    { name: 'Athens', state: 'GA', lat: 33.96, lon: -83.38 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Savannah' },
    { id: 'pooler', kind: 'FEEDER', name: 'Pooler', minutes: 20, bearing: 295, note: 'A fast-growing retail and warehouse suburb with no scene of its own.' },
    { id: 'richmond-hill', kind: 'FEEDER', name: 'Richmond Hill', minutes: 30, bearing: 210, note: 'A booming south-county suburb of new houses; the kids drive in.' },
    { id: 'rincon', kind: 'FEEDER', name: 'Rincon and Springfield', minutes: 30, bearing: 325, note: 'Church-heavy bedroom and rural towns up the county road, with an informal scene.' },
    { id: 'hinesville', kind: 'FEEDER', name: 'Hinesville', minutes: 45, bearing: 235, note: 'A base town whose crowd empties and refills with deployments.' },
    { id: 'hilton-head', kind: 'FEEDER', name: 'Hilton Head, Bluffton and Hardeeville', state: 'SC', minutes: 45, bearing: 30, note: 'Resort and retiree money, with working-class service kids on the cheaper edges.' },
    { id: 'claxton', kind: 'FEEDER', name: 'Claxton and Metter', minutes: 55, bearing: 275, note: 'Farm towns west on the old highway; kids drive in for what they cannot have at home.' },
    { id: 'statesboro', kind: 'FEEDER', name: 'Statesboro', minutes: 60, bearing: 310, note: 'A college town with a small music scene of its own; the likeliest two-way trade.' },
    { id: 'beaufort', kind: 'FEEDER', name: 'Beaufort', state: 'SC', minutes: 60, bearing: 35, note: 'A quiet Lowcountry shrimping and tourist town beside two Marine bases.' },
    { id: 'brunswick', kind: 'FEEDER', name: 'Brunswick', minutes: 75, bearing: 190, note: 'A port and shipyard town on the south coast that has had a scene of its own.' },
    { id: 'charleston', kind: 'PEER', name: 'Charleston', state: 'SC', minutes: 105, bearing: 55, slug: 'charleston-sc', note: 'The natural trade partner and tourist-town rival up the coast.' },
    { id: 'augusta', kind: 'PEER', name: 'Augusta', minutes: 135, bearing: 320, slug: 'augusta-ga', note: 'An inland base city; a different Georgia, and less of a touring stop.' },
    { id: 'macon', kind: 'PEER', name: 'Macon', minutes: 160, bearing: 295, scene: 250, note: 'A smaller, cheaper city at the far end of the interstate most Georgia tours use.' }
  ],

  hoods: [
    { id: 'landmark', name: 'the Historic District', route: 'downtown', note: 'The squares and the river bluff: tourists, hotels, bars and row houses with garden-level rooms. Too expensive for DIY and full of complaining neighbors.' },
    { id: 'victorian', name: 'the Victorian District and Forsyth', route: 'old-side', note: 'Wooden Victorian houses split into apartments around the big park. Porch and house shows, with renters who will tolerate them.' },
    { id: 'thomas-square', name: 'Thomas Square and Midtown', route: 'old-side', note: 'Frame houses, corner stores and mixed streets south of the Victorian blocks. The old cheap place for artists and musicians, now getting priced.' },
    { id: 'starland', name: 'Starland', route: 'downtown', note: 'Old buildings turned into an arts district around Bull Street. The nearest thing to an artsy-punk neighborhood: shop, backyard and warehouse shows.' },
    { id: 'west-savannah', name: 'West Savannah and Cuyler-Brownville', route: 'work-side', note: 'Historic Black working-class streets, vacant lots and industrial buildings. Not a place to treat as an empty blank for punk.' },
    { id: 'southside', name: 'the Southside', route: 'campus', note: 'Strip malls, apartments and a branch campus along Abercorn Street. Where most suburban kids live. Rented plaza rooms and bowling alleys.' },
    { id: 'islands', name: 'the Islands and Tybee', route: 'old-side', note: 'Marsh-edge towns and a beach island east on Highway 80. Beach-bar shows and outdoor shows, and the road floods.' },
    { id: 'port-wentworth', name: 'Garden City and Port Wentworth', route: 'work-side', note: 'Warehouse and trucking towns around the port. Cheap commercial space and practice rooms.' }
  ],

  rooms: [
    { id: 'thomas-yard', kind: 'HOUSE', hood: 'thomas-square', cap: 60, curfew: 1350, ac: false, outdoor: true, start: true, pressure: 55,
      note: 'A frame house where one booking crew runs shows in the yard and the front room. The renters next door have started to count.' },
    { id: 'victorian-porch', kind: 'HOUSE', hood: 'victorian', cap: 50, curfew: 1350, ac: false, outdoor: true, pressure: 60,
      note: 'A split-up Victorian with a big porch. One noise call ends the night.' },
    { id: 'starland-yard', kind: 'DIY', hood: 'starland', cap: 150, ages: ['ALL'], curfew: 1380, ac: false, outdoor: true, pressure: 55,
      note: 'A gallery, a print shop and a courtyard that throw a five-dollar bill now and then. Half the buildings around it are rentals now, and every guest has a phone.' },
    { id: 'starland-records', kind: 'SHOP', hood: 'starland', cap: 80, curfew: 1320, ac: true,
      note: 'A record shop that promised monthly all-ages shows and a weekday open mic. Over by ten.' },
    { id: 'legal-hall', kind: 'HALL', hood: 'landmark', cap: 250, rent: 450, deposit: 150, curfew: 1320, ac: true,
      note: 'A legal all-ages room you can rent. The rent is real money, so it suits a benefit or a festival-night overflow.' },
    { id: 'punk-bar', kind: 'BAR', hood: 'landmark', cap: 200, curfew: 1500, ac: true, following: .3,
      note: 'The long-running punk bar with weekly shows and a back stage. No minors, and the room for any touring band.' },
    { id: 'midtown-bar', kind: 'BAR', hood: 'thomas-square', cap: 150, curfew: 1500, ac: false,
      note: 'A small, loud bar that books crossover, hardcore and metal. It gets very hot in summer.' },
    { id: 'stamp-bar', kind: 'BAR', hood: 'thomas-square', cap: 120, ages: ['A18'], curfew: 1410, ac: true,
      note: 'A bar with a stage that lets eighteen-to-twenty in with a stamp during live music. Fast bills, early close.' },
    { id: 'club', kind: 'CLUB', hood: 'starland', cap: 300, ages: ['A21'], curfew: 1500, ac: true,
      note: 'The mid-size room for a regional headliner. Wants a bill and some weeks of notice.' },
    { id: 'truck-yard', kind: 'OUTDOOR', hood: 'starland', cap: 200, curfew: 1320, ac: false, outdoor: true,
      note: 'A food-truck yard with a stage. Summer all-ages bills, until the rain or the heat index ends the night.' },
    { id: 'port-warehouse', kind: 'DIY', hood: 'port-wentworth', cap: 100, curfew: 1380, ac: false, pressure: 55,
      note: 'A practice unit and an unlicensed warehouse near the port. Cheap, far from neighbors, and a different police force.' },
    { id: 'beach-patio', kind: 'OUTDOOR', hood: 'islands', cap: 150, ages: ['A21'], curfew: 1380, ac: false, outdoor: true,
      note: 'A beach-bar patio on the marsh road. The road floods, and the beach town has its own police.' }
  ],

  contacts: ['charleston-sc', 'augusta-ga', 'columbia-sc', 'jacksonville'],

  calendar: [
    { id: 'march-parade', label: 'the big March parade month', tag: 'parade', month: 3, week: 3, dows: [4, 5, 6], can: [.88, .85, .85], hoods: ['landmark'], elsewhere: [.95, .93, .93] },
    { id: 'spring-music', label: 'the spring music festival', tag: 'festival', month: 4, weeks: [1, 3], dows: [3, 4, 5, 6], can: [.95, .92, .92], hoods: ['landmark'], elsewhere: [1, .97, .97] },
    { id: 'jazz-fest', label: 'the jazz festival', tag: 'festival', month: 9, week: 3, dows: [4, 5, 6], can: [.95, .92, .92], hoods: ['landmark'], elsewhere: [1, .97, .97] },
    { id: 'island-weekend', label: 'the island pirate weekend', tag: 'festival', month: 10, week: 2, dows: [4, 5, 6], can: [.85, .82, .82], hoods: ['islands'], elsewhere: [.97, .95, .95] },
    { id: 'winter-market', label: 'the winter market and holiday season', tag: 'holiday', month: 12, weeks: [1, 3], dows: [4, 5], can: [.95, .92, .92], hoods: ['landmark'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.88, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.88, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1440, inForce: false } },

  points: [
    { name: 'Jacksonville', state: 'FL', lat: 30.33, lon: -81.66, pop: 950000 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 500000 },
    { name: 'Macon', state: 'GA', lat: 32.84, lon: -83.63, pop: 157000 },
    { name: 'Hilton Head Island', state: 'SC', lat: 32.22, lon: -80.75, pop: 38000 }
  ],
  roads: ['I-95', 'I-16', 'I-516', 'US 17', 'US 80', 'US 301'],

  words: {
    street: ['Abercorn Street', 'Bull Street', 'Victory Drive', 'Skidaway Road', 'Waters Avenue', 'Highway 80', 'Montgomery Street'],
    water: ['the Savannah River', 'Wilmington River', 'Ossabaw Sound', 'Tybee Creek'],
    hood: ['Starland', 'Thomas Square', 'Thunderbolt', 'Isle of Hope', 'Wilmington Island', 'Whitemarsh', 'Tybee', 'Cuyler-Brownville', 'Forsyth Park', 'Garden City'],
    thing: ['live oak', 'Spanish moss', 'lane house', 'porch', 'gnat', 'tabby wall', 'shrimp boat', 'carport', 'haint blue ceiling', 'generator', 'alley load-in', 'garden-level room', 'bar back room', 'ghost tour'],
    weather: ['heat index', 'afternoon thunderstorm', 'king tide', 'evacuation route']
  },
  events: [
    { id: 'SAVANNAH_GA_GHOST_TOUR', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'A tour group has been stopping outside the yard on the same block every night.',
      title: 'A ghost tour finds the yard show',
      body: 'A tour group stops on the sidewalk outside the Starland yard and starts filming. The neighbor on the rental side comes out onto the stoop.',
      options: [
        { id: 'QUIET', label: 'Turn it down and wave them along', likely: 'A quiet set, and the neighbor goes back in.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The tour moved on and the neighbor went back in, and the set ran quiet.' },
        { id: 'INSIDE', label: 'Move the whole bill indoors', likely: 'Hotter and louder, but out of sight.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'A living room took the bill, and the floor was packed and wet with sweat.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The complaint comes in.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'Somebody called it in, and half the yard left before the police came.' }
      ] },

    { id: 'SAVANNAH_GA_ISLAND_JAM', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'A festival weekend is jamming the road to the island.',
      title: 'The highway is a parking lot',
      body: 'A big weekend has Highway 80 backed up for miles, and the beach-bar show is hours from starting. The bands are on the back road.',
      options: [
        { id: 'LATE', label: 'Push doors back and wait for the van', likely: 'A late start, and the crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The van came in by the back road at ten, and you started late but nobody left.' },
        { id: 'ACCEPT', label: 'Run what you have', likely: 'A thinner bill and a half-empty patio.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Two bands made it, and the rest played to whoever stayed.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'SAVANNAH_GA_STORM_BENEFIT', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [8, 9, 10] },
      telegraph: 'A tropical storm is in the forecast and the radio says the coast should be ready.',
      title: 'The storm takes the Saturday',
      body: 'A tropical system is on the way and the outbound lane on I-16 is already filling. The Saturday is gone, but a hall could turn it into a benefit.',
      options: [
        { id: 'BENEFIT', label: 'Turn the date into a benefit at a hall', likely: 'Smaller and earlier, but people come to help.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The hall opened its doors and the money all went to the ones who lost the most.' },
        { id: 'MOVE', label: 'Move it a day, once it blows over', likely: 'It breaks the date and costs you some trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the ones who could come, came.' },
        { id: 'SANDBAG', label: 'Sandbag the door and play on', likely: 'It costs forty dollars, and the crowd stays home.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The rain held off, and the room was half full and wet to the ankle.' }
      ] }
  ]
});
