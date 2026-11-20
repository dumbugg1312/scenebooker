SB.Cities.register('lafayette-in', {
  v: 1,
  slug: 'lafayette-in',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['purdue university', 'purdue', 'boilermakers', 'boilermaker', 'boilers', 'wabash college', 'saint joseph\'s college', 'depauw university',
           'depauw', 'indiana state university', 'indiana university', 'ball state', 'notre dame', 'old oaken bucket', 'hunters\' moon',
           'hunters moon', 'feast of the hunters', 'fort ouiatenon', 'indiana beach', 'journal & courier', 'journal and courier', 'purdue exponent',
           'wlfi', 'wpbi', 'citybus', 'subaru', 'amtrak', 'wabash landing', 'tippecanoe battlefield', 'prophetstown', 'the wea plain grange',
           'wea plain grange', 'cold storage no. 3', 'cold storage no 3', 'the buffalo fish social club', 'buffalo fish social club',
           'upper main hardware loft', 'the cornstarch union hall', 'cornstarch union hall', 'starlite lanes', 'the levee back dock',
           'levee back dock', 'ninth street hill rental', 'wabash avenue elks annex', 'elks annex', 'elks', 'the big four skate shop',
           'big four skate shop', 'tenderloin hall'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The university is written only as 'the university' or 'the big school'. */
  blocklist: ['purdue*', 'journal & courier*', 'indiana beach*', 'citybus*', 'subaru*', 'wlfi*', 'hunters moon*', 'old oaken*'],

  blurb: ['A river town in flat Indiana farmland, split by the Wabash from a huge university town, where fresh weirdos arrive every August.',
          'Basements, lodge halls and a farm kid\'s barn do the rest. Half the room is new every fall and has never heard the local bands.'],
  hard: 'Students leave in May and take the houses and bands with them.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76 },
    { name: 'Cincinnati', state: 'OH', lat: 39.1, lon: -84.51 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Lafayette' },
    { id: 'battle-ground', kind: 'FEEDER', name: 'Battle Ground and Dayton', minutes: 15, bearing: 10, note: 'Farm villages just north; kids drive in for anything.' },
    { id: 'delphi', kind: 'FEEDER', name: 'Delphi', minutes: 25, bearing: 30, note: 'A canal and farm county seat; kids come to Lafayette for everything.' },
    { id: 'attica', kind: 'FEEDER', name: 'Attica', minutes: 35, bearing: 235, note: 'An old river town down the Wabash.' },
    { id: 'monticello', kind: 'FEEDER', name: 'Monticello', minutes: 40, bearing: 5, note: 'A lake resort town; summer teens come south for shows.' },
    { id: 'frankfort', kind: 'FEEDER', name: 'Frankfort', minutes: 40, bearing: 120, note: 'A rail and meatpacking farm town with a large Latino community.' },
    { id: 'crawfordsville', kind: 'FEEDER', name: 'Crawfordsville', minutes: 40, bearing: 185, note: 'A small college and steel town that genuinely trades bands with Lafayette.', bands: 1 },
    { id: 'logansport', kind: 'FEEDER', name: 'Logansport', minutes: 50, bearing: 55, note: 'A railroad and river town with some DIY activity.' },
    { id: 'rensselaer', kind: 'FEEDER', name: 'Rensselaer', minutes: 55, bearing: 320, note: 'A farm town near the interstate with a small Catholic college.' },
    { id: 'greencastle', kind: 'FEEDER', name: 'Greencastle', minutes: 60, bearing: 175, note: 'A small liberal-arts college town with a small, active scene.', bands: 1 },
    { id: 'terre-haute', kind: 'PEER', name: 'Terre Haute', minutes: 85, bearing: 215, scene: 800, note: 'A river and college town with a revived downtown; the nearest equal.' },
    { id: 'champaign', kind: 'PEER', name: 'Champaign', state: 'IL', minutes: 100, bearing: 260, slug: 'champaign-il', note: 'The nearest big-scene college town, across the state line.' },
    { id: 'muncie', kind: 'PEER', name: 'Muncie', minutes: 105, bearing: 110, scene: 900, note: 'College and factory, the closest in structure; a regular bill-swapping partner.' },
    { id: 'bloomington', kind: 'PEER', name: 'Bloomington', minutes: 120, bearing: 190, slug: 'bloomington-in', note: 'Bigger, artsier and better established; Lafayette looks up to it and competes with it.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Lafayette', route: 'downtown', note: 'Old brick blocks with upper floors, small bar rooms, a theater or two, and empty ground floors for a one-night pop-up.' },
    { id: 'ninth-street-hill', name: 'Ninth Street Hill', route: 'old-side', note: 'Big old houses cut into apartments, with deep porches and stone cellars; the heart of house shows.' },
    { id: 'centennial', name: 'Centennial and Highland Park', route: 'old-side', note: 'Small frame houses and bungalows, working-class and mixed; garages and backyards.' },
    { id: 'sagamore', name: 'the Sagamore Parkway strip', route: 'work-side', note: 'Car-oriented chain strips, rinks, and warehouse and light-industrial bays for practice rooms.' },
    { id: 'chauncey', name: 'Chauncey Village', route: 'campus', note: 'The student bar and apartment strip at the edge of campus; bars with band nights, not DIY.' },
    { id: 'the-levee', name: 'the Levee riverfront', route: 'campus', note: 'A shiny riverfront of shops and a skating center across the pedestrian bridge; nothing DIY but good for skaters.' },
    { id: 'happy-hollow', name: 'Happy Hollow and West Lafayette', route: 'campus', note: 'Older rental houses with basements, hit by stricter rental enforcement and rising rents.' },
    { id: 'county-edge', name: 'the county edge', route: 'work-side', note: 'Barns, pole buildings and shop sheds out past the last streetlight.' }
  ],

  contacts: ['champaign-il', 'bloomington-in'],

  points: [
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16, pop: 2100000 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 9500000 },
    { name: 'Champaign', state: 'IL', lat: 40.12, lon: -88.24, pop: 236000 },
    { name: 'Kokomo', state: 'IN', lat: 40.49, lon: -86.13, pop: 60000 }
  ],
  roads: ['I-65', 'US 52', 'US 231', 'SR 26', 'SR 38', 'I-74'],

  words: {
    street: ['Main Street', 'Sagamore Parkway', 'Ninth Street', 'State Street', 'Teal Road', 'Union Street'],
    water: ['the Wabash', 'Wildcat Creek', 'the old canal'],
    hood: ['Ninth Street Hill', 'Centennial', 'Highland Park', 'Chauncey', 'Happy Hollow', 'Vinton', 'Wabash'],
    thing: ['tenderloin', 'sugar cream pie', 'corn syrup haze', 'pole barn', 'tailgate', 'move-in week', 'finals week', 'lodge hall', 'drummer graduates'],
    weather: ['lake effect snow', 'corn sweat']
  }
});
