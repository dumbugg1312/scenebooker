SB.Cities.register('poughkeepsie-ny', {
  v: 1,
  slug: 'poughkeepsie-ny',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['ibm', 'vassar', 'vassar college', 'marist', 'marist college', 'bard college', 'bard', 'culinary institute of america', 'dia beacon', 'poughkeepsie journal',
           'gannett', 'news 12', 'news 12 hudson valley', 'metro-north', 'amtrak', 'walkway over the hudson', 'west point', 'stewart international airport',
           'stewart airport', 'dutchess community college', 'suny new paltz', 'the galleria', 'galleria', 'dutchess county fair', 'sheep and wool festival',
           'hudson valley renegades', 'renegades', 'vfw', 'american legion', 'eagles', 'elks', 'knights of columbus', 'wawa', 'stewart\'s shops',
           'lozenge hall', 'the fallkill boiler room', 'aerie 2209', 'st. casimir\'s undercroft', 'the annex at union and cottage', 'pendell pole barn',
           'hooker avenue lanes', 'the main mall storefront', 'the stretch room', 'clover street foundry', 'rail trail shed', 'ridley hall'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['poughkeepsie journal*', 'vassar*', 'marist*', 'metro-north*', 'news 12*', 'walkway over*', 'dia beacon*', 'dutchess county fair*'],

  blurb: ['A mid-Hudson river city seventy-five miles up the line from Manhattan, with big old brick blocks, cheap commercial space and a long hardcore and metal tradition.',
          'Scattered across a river valley, the scene lives in damp basements and rented halls, always one inspection from closing. Everyone drives in from somewhere else.'],
  hard: 'Rooms close fast and everyone lives in a different town.',
  region: 'the Hudson Valley',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Poughkeepsie' },
    { id: 'hyde-park', kind: 'FEEDER', name: 'Hyde Park', minutes: 15, bearing: 5, note: 'A suburban estate town to the north with a cooking school and a few older halls.' },
    { id: 'wappingers', kind: 'FEEDER', name: 'Wappingers Falls', minutes: 15, bearing: 170, note: 'A suburban village of commuters and families, with some teenage bands.' },
    { id: 'highland', kind: 'FEEDER', name: 'Highland', minutes: 15, bearing: 270, note: 'An orchard town across the Mid-Hudson Bridge; many kids come over.' },
    { id: 'fishkill', kind: 'FEEDER', name: 'Fishkill and Hopewell Junction', minutes: 20, bearing: 150, note: 'Commuter suburbs along the interstate, with strip malls and a ballpark.' },
    { id: 'newburgh', kind: 'FEEDER', name: 'Newburgh', minutes: 30, bearing: 205, note: 'An old industrial river city across the bridge: rougher, with a post-industrial feel and a friendly rivalry.' },
    { id: 'beacon', kind: 'FEEDER', name: 'Beacon', minutes: 30, bearing: 180, note: 'A former hat-making town with its own arts and music crowd, gentrifying fast.' },
    { id: 'new-paltz', kind: 'FEEDER', name: 'New Paltz', minutes: 30, bearing: 285, note: 'A state college town with a hippie-punk-folk mix and a scene of its own.' },
    { id: 'rhinebeck', kind: 'FEEDER', name: 'Rhinebeck and Red Hook', minutes: 30, bearing: 10, note: 'A wealthy village and farm town with a small college scene to the north.' },
    { id: 'millbrook', kind: 'FEEDER', name: 'Millbrook and Pine Plains', minutes: 40, bearing: 80, note: 'Horse country and farmland; small and scattered.' },
    { id: 'pawling', kind: 'FEEDER', name: 'Pawling', minutes: 40, bearing: 120, note: 'A commuter and farm town on the Connecticut line.' },
    { id: 'kingston', kind: 'PEER', name: 'Kingston', minutes: 45, bearing: 350, note: 'A county seat with an artists\' community; artsier and more hippie, and it trades bands and crowds.' },
    { id: 'danbury', kind: 'PEER', name: 'Danbury', state: 'CT', minutes: 55, bearing: 120, note: 'A bigger Connecticut city down the interstate that trades crowds.' },
    { id: 'albany', kind: 'PEER', name: 'Albany', minutes: 90, bearing: 5, note: 'The capital up the road, with a bigger circuit that pulls college-bound kids.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown, Main Street and Market Street', route: 'downtown', note: 'A spine of 19th-century brick with storefronts, second-floor rooms and restaurant back rooms. Slowly being revived.' },
    { id: 'waterfront', name: 'the waterfront and the train station', route: 'downtown', note: 'Down the hill by the river, with the station, riverfront park and a few old warehouses. Heating up.' },
    { id: 'mill-street', name: 'Mill Street and the Fallkill corridor', route: 'work-side', note: 'Old mills and cheap commercial space along the creek: studios and lofts, until the apartments arrive.' },
    { id: 'south-side', name: 'the South Side', route: 'old-side', note: 'Working-class and immigrant blocks of two- and three-family frame houses with basements and absentee landlords. Cheap and ignored.' },
    { id: 'north-side', name: 'the North Side and Mount Carmel', route: 'old-side', note: 'Older houses and divided Victorians with basements, porches and backyards. Mostly stable.' },
    { id: 'arlington', name: 'Arlington and the college side', route: 'campus', note: 'Just outside the city line, where the college kids rent. House shows and campus radio nights.' },
    { id: 'route-9', name: 'the Route 9 strip', route: 'work-side', note: 'Malls, big boxes and industrial parks in the Town. Practice spaces and strip-plaza units.' },
    { id: 'highland-side', name: 'across the river in Highland', route: 'work-side', note: 'The orchard side, reached over the bridge. Barns and yards.' }
  ],

  contacts: ['new-york', 'new-haven-ct', 'springfield-ma', 'burlington-vt'],


  points: [
    { name: 'Newburgh', state: 'NY', lat: 41.5, lon: -74.01, pop: 28800 },
    { name: 'Kingston', state: 'NY', lat: 41.93, lon: -74.0, pop: 24000 },
    { name: 'Albany', state: 'NY', lat: 42.65, lon: -73.76, pop: 100000 },
    { name: 'Scranton', state: 'PA', lat: 41.41, lon: -75.66, pop: 76000 },
    { name: 'Danbury', state: 'CT', lat: 41.39, lon: -73.45, pop: 87000 }
  ],
  roads: ['US 9', 'I-84', 'NY 55', 'US 44', 'I-87', 'the Taconic'],

  words: {
    street: ['Main Street', 'Market Street', 'Mill Street', 'Hooker Avenue', 'Dutchess Avenue', 'Raymond Avenue', 'Academy Street', 'North Clover Street'],
    water: ['the Hudson', 'the Fallkill', 'the Mid-Hudson Bridge'],
    hood: ['Arlington', 'Mount Carmel', 'the South Side', 'the North Side', 'Mill Street', 'Highland', 'Hyde Park'],
    thing: ['basement', 'Greek diner', 'orchard', 'cider donut', 'rail trail', 'two-family house', 'parish hall', 'commuter train', 'dehumidifier', 'photocopy'],
    weather: ['nor\'easter', 'flash flood', 'leaf-peeper weekend']
  }
});
