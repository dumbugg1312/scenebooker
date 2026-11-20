SB.Cities.register('south-bend-in', {
  v: 1,
  slug: 'south-bend-in',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of notre dame', 'notre dame', 'saint mary\'s college', 'holy cross college', 'indiana university south bend', 'iusb',
           'bethel university', 'ivy tech', 'goshen college', 'western michigan university', 'culver academies', 'studebaker', 'south bend tribune',
           'amtrak', 'lake shore limited', 'vfw', 'the dome', 'ignition park', 'paczki day', 'eddy street commons',
           'the tollgate annex', 'tollgate annex', 'lake-effect hall', 'lake effect hall', 'wheel and wagon room', 'the bend social club',
           'bend social club', 'bendix basement', 'paczki hall', 'the portage back room', 'portage back room', 'the kiln',
           'sixth street parish hall', 'the east race annex', 'east race annex', 'ironwork'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The big university and the old car works appear in game text only as generic words. */
  blocklist: ['south bend tribune*', 'notre dame*', 'studebaker*', 'tollgate annex*', 'wheel and wagon*', 'bendix basement*', 'paczki hall*', 'lake-effect hall*'],

  blurb: ['Cheap old basements and rented halls carry what scene there is, under lake-effect snow.',
          'Chicago is close, so the kids leave and the bands drive past. The big university north of town is a separate world.'],
  hard: 'Snow, home football Saturdays and a long drive from anywhere keep nights thin.',
  region: 'Michiana',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16 },
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05 },
    { name: 'Grand Rapids', state: 'MI', lat: 42.96, lon: -85.67 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'South Bend' },
    { id: 'mishawaka', kind: 'FEEDER', name: 'Mishawaka', minutes: 10, bearing: 80, pop: 50000, note: 'A separate city next door with its own police and codes, and a small scene of its own.', bands: 2 },
    { id: 'niles', kind: 'FEEDER', name: 'Niles', state: 'MI', minutes: 20, bearing: 350, pop: 11000, note: 'An old river town just over the Michigan line.' },
    { id: 'buchanan', kind: 'FEEDER', name: 'Buchanan and Dowagiac', state: 'MI', minutes: 30, bearing: 335, note: 'Small river and farm towns to the north.' },
    { id: 'elkhart', kind: 'FEEDER', name: 'Elkhart', minutes: 30, bearing: 95, pop: 50000, note: 'A factory-labor town with its own scene and a lot of garage drummers.', bands: 3 },
    { id: 'plymouth', kind: 'FEEDER', name: 'Plymouth', minutes: 35, bearing: 190, pop: 10000, note: 'A farm town down US 31.' },
    { id: 'goshen', kind: 'FEEDER', name: 'Goshen', minutes: 40, bearing: 105, pop: 35000, note: 'A small college town at the edge of Amish country, with its own small scene.', bands: 1 },
    { id: 'laporte', kind: 'FEEDER', name: 'LaPorte', minutes: 40, bearing: 275, pop: 22000, note: 'A mill and lake-edge town in the Central time zone.' },
    { id: 'michigan-city', kind: 'FEEDER', name: 'Michigan City', minutes: 50, bearing: 305, pop: 32000, note: 'A lake-beach town with a casino and an outlet mall.' },
    { id: 'warsaw', kind: 'FEEDER', name: 'Warsaw', minutes: 50, bearing: 140, pop: 15000, note: 'An orthopedic-device town in lake country with small shows of its own.' },
    { id: 'benton-harbor', kind: 'FEEDER', name: 'Three Rivers and Benton Harbor', state: 'MI', minutes: 50, bearing: 5, note: 'Struggling river towns beside a wealthy resort lakeshore.' },
    { id: 'kalamazoo', kind: 'PEER', name: 'Kalamazoo', state: 'MI', minutes: 75, bearing: 55, slug: 'kalamazoo-mi', note: 'The closest trade partner: two colleges and a similar mood.' },
    { id: 'fort-wayne', kind: 'PEER', name: 'Fort Wayne', minutes: 90, bearing: 120, slug: 'fort-wayne-in', note: 'A bigger Indiana city down US 30: rival and stop.' },
    { id: 'lafayette', kind: 'PEER', name: 'Lafayette and West Lafayette', minutes: 120, bearing: 205, slug: 'lafayette-in', note: 'A big-university town two hours south.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The river core around Michigan and Main with lofts, a whitewater channel and bars; the cheap storefront era is closing.' },
    { id: 'east-bank', name: 'the east bank', route: 'old-side', note: 'Older mixed-use blocks east of the river, historically cheap commercial space and slowly gentrifying.' },
    { id: 'near-northwest', name: 'the near northwest side', route: 'work-side', note: 'Working-class neighborhoods toward the old car works; family and landlord ties make house shows rare.' },
    { id: 'west-side', name: 'the West Side', route: 'work-side', note: 'Polish, Hungarian and Latino strips along Lincoln Way West: corner bars, social halls and cheap units. The likeliest home for hall shows.' },
    { id: 'university-edge', name: 'the university edge on Eddy Street', route: 'campus', note: 'Student housing and football-weekend traffic; tight landlords and police, priced out of DIY.' },
    { id: 'commuter-campus', name: 'the commuter campus on the east side', route: 'campus', note: 'Apartments and rentals around the state-college branch; younger renters and some house shows.' },
    { id: 'southeast', name: 'the southeast side', route: 'old-side', note: 'Quiet single-family streets south of downtown; basements likely.' }
  ],

  contacts: ['kalamazoo-mi', 'fort-wayne-in', 'chicago', 'toledo-oh', 'lansing-mi'],

  points: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 2700000 },
    { name: 'Elkhart', state: 'IN', lat: 41.68, lon: -85.98, pop: 53000 },
    { name: 'Grand Rapids', state: 'MI', lat: 42.96, lon: -85.67, pop: 200000 },
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16, pop: 880000 }
  ],
  roads: ['I-80/90 (the Toll Road)', 'US 31', 'US 20', 'US 33', 'US 30', 'I-94'],

  words: {
    street: ['Michigan Street', 'Main Street', 'Colfax Avenue', 'Jefferson Boulevard', 'Lincoln Way West', 'Western Avenue', 'Portage Avenue', 'Mishawaka Avenue', 'Ironwood Drive'],
    water: ['the St. Joseph', 'the East Race', 'Lake Michigan'],
    hood: ['the West Side', 'the East Bank', 'Rum Village', 'Mishawaka', 'Michiana'],
    thing: ['pork tenderloin', 'lake effect', 'paczki', 'fish fry', 'basement keg', 'Toll Road', 'fish fry hall', 'fall football Saturday', 'empty factory'],
    weather: ['lake-effect snow', 'whiteout']
  }
});
