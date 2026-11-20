SB.Cities.register('bremerton-wa', {
  v: 1,
  slug: 'bremerton-wa',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['puget sound naval shipyard', 'psns', 'bremerton annex', 'naval base kitsap', 'naval station bremerton', 'bangor', 'olympic college',
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
    { id: 'kitsap-way', name: 'Kitsap Way and Gorst', route: 'campus', note: 'Warehouses, auto shops and big-box land. Where a cheap space would be, but nobody can walk there.' }
  ],

  contacts: ['olympia-wa', 'bellingham-wa', { name: 'Tacoma', state: 'WA', lat: 47.25, lon: -122.44 }],

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
  }
});
