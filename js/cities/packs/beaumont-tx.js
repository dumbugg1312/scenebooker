SB.Cities.register('beaumont-tx', {
  v: 1,
  slug: 'beaumont-tx',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['lamar university', 'lamar', 'spindletop', 'spindletop-gladys city', 'gladys city', 'beaumont enterprise', 'beaumont examiner', 'what\'s up setx', 'south texas state fair',
           'south texas state fair and rodeo', 'ford park', 'mardi gras of southeast texas', 'neches river festival', 'crawfish festival', 'cajun food trail', 'floyd\'s',
           'rao\'s', 'rao\'s bakery', 'tia juanita\'s', 'madison\'s', 'whataburger', 'shiner', 'lone star', 'dr pepper', 'big red', 'topo chico', 'hurricane rita', 'hurricane ike',
           'hurricane harvey', 'harvey', 'imelda', 'tropical storm imelda', 'hurricane laura', 'winter storm uri', 'southland conference', 'tabc', 'vfw', 'american legion',
           'elks', 'moose', 'eatbmt', 'port of beaumont', 'texas alcoholic beverage commission',
           'the mudbug annex', 'mudbug annex', 'derrick street hall', 'the rice dryer', 'cat five lounge', 'the boudin barn', 'flare stack annex', 'marsh hen hall',
           'slab and sill', 'the tank farm', 'third shift hall', 'dowlen mattress annex', 'bayou rouge elks annex'],
  /* Banned holds the dossier's real institutions and its invented venue names (unchecked). Storms are written only as 'the '05 storm', 'the '08 storm' and so on. */
  blocklist: ['beaumont enterprise*', 'beaumont examiner*', 'whataburger*', 'lamar university*', 'rao\'s*', 'tia juanita*', 'derrick street hall*', 'mudbug annex*'],

  blurb: ['A refinery town with slab-floor garages, a sober all-ages band night and a much bigger scene an hour or two west in Houston.',
          'Metal and hardcore outlast the rest. Storms scatter the scene, and it keeps coming back.'],
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
    { id: 'nederland', kind: 'FEEDER', name: 'Nederland', minutes: 15, bearing: 150, note: 'A refinery suburb with a football-crazed high school.' },
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
    { id: 'eastex', name: 'the Eastex side', route: 'work-side', note: 'Old commercial strips and warehouse bays running toward the plants.' }
  ],

  contacts: ['lafayette-la', 'baton-rouge-la', 'tyler-tx'],

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
  }
});
