SB.Cities.register('bremerton-wa', {
  v: 1,
  slug: 'bremerton-wa',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['bremerton art walk', 'first friday art walk', 'wayzgoose', 'bremerton bridge blast', 'bridge blast', 'kitsap wine festival', 'west sound film festival', 'kitsap harbor festival', 'jingle fest', 'kitsap sun pavilion', 'kitsap county fairgrounds', 'kitsap daily news', 'seattle weekly', 'seattle times', 'knkx', 'port of bremerton', 'greater kitsap chamber', 'wsipp', 'washington state liquor control board', 'seattle seafair', 'wildcat lake', 'bremerton boardwalk',
           'puget sound naval shipyard', 'psns', 'bremerton annex', 'naval base kitsap', 'naval station bremerton', 'bangor', 'olympic college',
           'evergreen state college', 'kitsap sun', 'kitsap transit', 'washington state ferries', 'liquor and cannabis board',
           'armed forces day parade', 'blackberry festival', 'whaling days', 'seahawks', 'huskies', 'kitsap county fair',
           'sierra pacific', 'simpson', 'squaxin island', 'port madison indian reservation', 'vfw', 'american legion', 'elks', 'grange',
           'the dry dock annex', 'dry dock annex', 'narrows hall', 'callow street social', 'the slipway', 'gantry room', 'sinclair inlet grange',
           'warren bridge armory', 'tugline lodge', 'chico cannery', 'union hill rec hall', 'the gorst depot', 'pier seven boat shop',
           'bremerton high school', 'central kitsap', 'south kitsap', 'north kitsap'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['kitsap sun*', 'naval base kitsap*', 'psns*', 'blackberry festival*', 'armed forces day*', 'olympic college*'],

  blurb: ['A Navy shipyard town where one loyal all-ages club holds a small scene together with fests and weekend bills.',
          'Punk, hardcore and metal share the bills. When the booker leaves, everyone wonders what is left.'],
  hard: 'One room, one booker. If either goes, there is nothing else.',
  region: 'the Sound',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 },
    { name: 'Tacoma', state: 'WA', lat: 47.25, lon: -122.44 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'metal', d: .06, reason: 'Hardcore and metal kids share fest bills at the main club.' },
    { fan: 'metal', band: 'hardcore', d: .06, reason: 'Hardcore and metal kids share fest bills at the main club.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Bremerton' },
    { id: 'port-orchard', kind: 'FEEDER', name: 'Port Orchard', minutes: 15, bearing: 175, pop: 15587, note: 'Suburban and Navy-adjacent, a short foot ferry across the inlet. A local rival.' },
    { id: 'silverdale', kind: 'FEEDER', name: 'Silverdale', minutes: 20, bearing: 10, pop: 20733, note: 'A mall suburb of Navy families up the highway. A little scene of its own.' },
    { id: 'poulsbo', kind: 'FEEDER', name: 'Poulsbo', minutes: 25, bearing: 20, pop: 11975, note: 'An older, wealthier tourist town with bored teenagers and a thin scene.' },
    { id: 'belfair', kind: 'FEEDER', name: 'Belfair', minutes: 30, bearing: 235, pop: 4279, note: 'A rural canal gateway. No scene to speak of.' },
    { id: 'kingston', kind: 'FEEDER', name: 'Kingston and Suquamish', minutes: 35, bearing: 40, note: 'Small and quiet, with a ferry to the mainland.' },
    { id: 'gig-harbor', kind: 'FEEDER', name: 'Gig Harbor', minutes: 40, bearing: 170, pop: 12029, note: 'A wealthier bedroom town across the tolled bridge. Not much of a scene.', beyond: 'narrows-bridge' },
    { id: 'shelton', kind: 'FEEDER', name: 'Shelton', minutes: 45, bearing: 215, pop: 10371, note: 'A timber and oyster town with a small, hard-working scene.' },
    { id: 'bainbridge', kind: 'FEEDER', name: 'Bainbridge Island', minutes: 45, bearing: 80, note: 'A rich island whose music kids head for Seattle, not here.' },
    { id: 'port-townsend', kind: 'FEEDER', name: 'Port Townsend', minutes: 75, bearing: 350, pop: 10148, note: 'An older arts town with a small scene, across the floating bridge.', beyond: 'canal-bridge' },
    { id: 'olympia', kind: 'PEER', name: 'Olympia', state: 'WA', minutes: 75, bearing: 205, slug: 'olympia-wa', note: 'The cool older cousin with the famous indie scene.' },
    { id: 'tacoma', kind: 'PEER', name: 'Tacoma', state: 'WA', minutes: 50, bearing: 165, scene: 900, note: 'A port city with its own punk history and a natural trading partner.' },
    { id: 'bellingham', kind: 'PEER', name: 'Bellingham', state: 'WA', minutes: 165, bearing: 5, slug: 'bellingham-wa', note: 'A distant college-town peer at the top of the tour route.' }
  ],

  chokepoints: [
    { id: 'narrows-bridge', name: 'the Tacoma Narrows Bridge', p: .01 },
    { id: 'canal-bridge', name: 'the Hood Canal Bridge', p: .015 }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Bremerton', route: 'downtown', note: 'A small walkable waterfront by the shipyard and the ferry. Sailors, commuters, redevelopment and leftover dive bars; rents rising.' },
    { id: 'charleston', name: 'Charleston', route: 'work-side', note: 'The older west-side retail strip along Callow. Cheap, working-class and mostly ignored, with a real music tradition.' },
    { id: 'navy-yard-city', name: 'Navy Yard City', route: 'work-side', note: 'Gate-town strip commercial and rental apartments west of downtown. Practice spaces and garages.' },
    { id: 'manette', name: 'Manette', route: 'old-side', note: 'Across the bridge on the Narrows: quiet residential streets with yards and basements, and getting priced out of reach.' },
    { id: 'east-bremerton', name: 'East Bremerton and Wheaton Way', route: 'old-side', note: 'Postwar houses, apartments and strip malls. Most of the scene lives here; backyards and halls.' },
    { id: 'union-hill', name: 'Union Hill', route: 'campus', note: 'Hilly and residential, part student and part Navy family. Apartment and house shows.' },
    { id: 'kitsap-way', name: 'Kitsap Way and Gorst', route: 'campus', note: 'Warehouses, auto shops and big-box land. Where a cheap space would be, but nobody can walk there.' },
    { id: 'tracyton', name: 'Tracyton and the Kitsap Lake side', route: 'work-side', note: 'A drive out of the city, with a movie house and no bus. The kids come with their parents or not at all.' }
  ],

  contacts: ['olympia-wa', 'bellingham-wa', 'seattle', { name: 'Tacoma', state: 'WA', lat: 47.25, lon: -122.44 }],

  rooms: [
    { id: 'manette-basement', kind: 'HOUSE', hood: 'manette', cap: 40, curfew: 1320, outdoor: false, pressure: 55, start: true, note: 'A basement or yard on a quiet residential street. A neighbor on a night-shift schedule is the threat.' },
    { id: 'union-apartment', kind: 'HOUSE', hood: 'union-hill', cap: 50, curfew: 1320, outdoor: false, pressure: 55, note: 'An apartment or house on the hill. One complaint or one lease and it is over.' },
    { id: 'gorst-garage', kind: 'DIY', hood: 'kitsap-way', cap: 80, curfew: 1380, pressure: 55, needs: ['VOUCH'], note: 'A practice garage or auto bay off the highway. Cheap, but nobody can walk there; the landlord and the fire marshal are the risk.' },
    { id: 'callow-club', kind: 'CLUB', hood: 'downtown', cap: 250, ages: ['ALL', 'A18'], curfew: 1380, following: .6, needs: ['FULL_BILL'], pressure: 55, note: 'An old movie theater turned punk club, with an all-ages floor below and a roped-off bar above. It is the whole scene.' },
    { id: 'waterfront-theater', kind: 'BIG', hood: 'downtown', cap: 1000, ages: ['ALL'], curfew: 1350, note: 'A restored theater on the waterfront that sells out nostalgia tours. Too grand for a local bill.' },
    { id: 'lakeside-movie-house', kind: 'BAR', hood: 'tracyton', cap: 200, ages: ['ALL', 'A21'], curfew: 1380, note: 'A converted movie house out on the lake side that runs punk nights. All ages, with the bar 21 and up, and a drive with no bus.' },
    { id: 'back-stage-bar', kind: 'BAR', hood: 'downtown', cap: 80, ages: ['A21'], curfew: 1500, standing: [50, 60, 70], note: 'A small bar with a back stage for the older metal and hard rock crowd. Twenty-one and up, and the cover is five dollars.' },
    { id: 'east-hall', kind: 'HALL', hood: 'east-bremerton', cap: 150, curfew: 1320, owner: 'HALL_MANAGER', note: 'A hall rented for a night, with a deposit and a board that wants a name on the form.' },
    { id: 'manette-yard', kind: 'OUTDOOR', hood: 'manette', cap: 60, curfew: 1260, ac: false, note: 'A waterfront yard in summer. Any rain and it is over.' },
    { id: 'charleston-shop', kind: 'SHOP', hood: 'charleston', cap: 40, curfew: 1200, note: 'An in-store set on a first Friday, with the walkers out early. Over by eight.' }
  ],

  calendar: [
    { id: 'may-parade', label: 'the May parade', tag: 'parade', month: 5, week: 3, dows: [5], can: [0.9, 0.88, 0.85], hoods: ['downtown'], elsewhere: [1, 0.97, 0.97] },
    { id: 'print-fair', label: 'the block-print fair', tag: 'festival', month: 6, weeks: [4, 5], dows: [5, 6], can: [0.92, 0.9, 0.9], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'bridge-fireworks', label: 'the bridge fireworks night', tag: 'festival', month: 6, weeks: [4, 5], dows: [5], can: [0.9, 0.88, 0.88], hoods: ['manette', 'downtown'], elsewhere: [1, 0.95, 0.95] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 8, weeks: [4, 5], dows: [3, 4, 5, 6], can: [0.88, 0.85, 0.82], hoods: ['kitsap-way'], elsewhere: [0.95, 0.9, 0.9] },
    { id: 'berry-festival', label: 'the waterfront festival', tag: 'festival', month: 9, week: 1, dows: [4, 5, 6], can: [0.95, 0.9, 0.9], hoods: ['downtown'], elsewhere: [1, 0.97, 0.97] },
    { id: 'football-oct', label: 'game days', tag: 'game', month: 10, weeks: [1, 5], dows: [5, 6], can: [0.9, 0.95, 0.95] },
    { id: 'football-nov', label: 'game days', tag: 'game', month: 11, weeks: [1, 5], dows: [5, 6], can: [0.9, 0.95, 0.95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.1] }
  ],

  points: [
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33, pop: 750000 },
    { name: 'Tacoma', state: 'WA', lat: 47.25, lon: -122.44, pop: 220000 },
    { name: 'Everett', state: 'WA', lat: 47.98, lon: -122.2, pop: 110000 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68, pop: 650000 }
  ],
  roads: ['SR 3', 'SR 16', 'SR 304', 'SR 310', 'SR 303', 'I-5'],

  words: {
    street: ['Callow Avenue', 'Wheaton Way', 'Kitsap Way', 'Burwell Street', 'Warren Avenue'],
    water: ['Sinclair Inlet', 'the Port Washington Narrows', 'Dyes Inlet', 'Hood Canal', 'Puget Sound'],
    hood: ['Charleston', 'Manette', 'Navy Yard City', 'East Bremerton', 'Union Hill', 'Evergreen', 'Haddon', 'Gorst', 'Old Town'],
    thing: ['teriyaki place', 'espresso stand', 'ferry', 'anchor', 'foot ferry', 'daylight basement', 'all-ages club', 'fest weekend', 'shipyard shift', 'old riot story'],
    weather: ['drizzle', 'windstorm', 'gray sky']
  },

  events: [
    { id: 'BREMERTON_WA_FERRY_NIGHT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'The ferry schedule is tight this week and the last boat is early.',
      title: 'The last boat',
      body: 'The last boat leaves before the headliner, and half the Seattle crowd has to choose between the set and getting home.',
      options: [
        { id: 'EARLY', label: 'Move the bill up so the headliner plays before the boat', likely: 'The kids who need the ferry make it. A short start.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors early. The headliner went on at eight and the boat crowd got home.' },
        { id: 'ACCEPT', label: 'Let them choose', likely: 'The ones across the water leave early.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'Half the room ran for the dock before the last song.' }
      ] },

    { id: 'BREMERTON_WA_PARADE_MORNING', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'A parade closes the downtown streets on Saturday.',
      title: 'The load-in van is stuck',
      body: 'A May parade has the downtown streets closed, and the load-in van cannot reach the club until the last marching band clears.',
      options: [
        { id: 'WAIT', label: 'Wait it out and start late', likely: 'The crowd comes in as the parade ends.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .92 }],
          result: 'The van got through at six. Doors went up late and nobody minded.' },
        { id: 'CARRY', label: 'Carry the gear in from three blocks away', likely: 'Costs an hour of your day.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Amps went down the sidewalk behind the band from the high school.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'BREMERTON_WA_NIGHT_SHIFT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [6, 7, 8, 9] },
      telegraph: 'The man next door works nights and is back to sleep by ten.',
      title: 'The neighbor in the next house',
      body: 'A shipyard worker in the next house is asleep by ten and calls in a noise complaint in the middle of a summer yard show.',
      options: [
        { id: 'QUIET', label: 'Turn it down and go acoustic', likely: 'Short and quiet.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The last two bands played unplugged on the grass.' },
        { id: 'PAY', label: 'Go knock on his door and apologize', likely: 'Costs twenty-five dollars in earplugs and baked goods.',
          effects: [{ op: 'MONEY', amount: -25 }, { op: 'REGULARS', pct: .02 }],
          result: 'He took the apology and the plate of cookies and the show went on.' },
        { id: 'ACCEPT', label: 'Run it and hope', likely: 'The next call comes with a patrol car.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'A patrol car rolled by at nine and the crowd scattered.' }
      ] }
  ]
});
