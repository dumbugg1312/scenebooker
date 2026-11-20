SB.Cities.register('johnson-city-tn', {
  v: 1,
  slug: 'johnson-city-tn',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['east tennessee state', 'east tennessee state university', 'etsu', 'buccaneers', 'ballad health', 'milligan university', 'milligan', 'king university', 'tusculum',
           'walters state', 'eastman chemical', 'eastman', 'appalachian state', 'virginia tech', 'tri-cities regional airport', 'johnson city transit', 'tweetsie trail',
           'founders park', 'fountain square', 'food city', 'ingles', 'hurricane helene', 'helene', 'csx', 'science hill', 'daniel boone high', 'model city', 'greyhound',
           'va medical center', 'johnson city press', 'wjhl', 'wets', 'wetb', 'wjcw', 'wqut', 'bristol rhythm', 'rhythm and roots', 'rhythm & roots', 'national storytelling festival',
           'storytelling festival', 'covered bridge days', 'fun fest', 'sycamore shoals', 'bristol motor speedway', 'waffle house', 'cook out', 'mountain dew', 'tabc',
           'the boilerhouse', 'boilerhouse', 'rayon hall', 'fountain annex', 'the switchyard', 'nolichucky room', 'hollow ridge hall', 'the roundhouse back lot',
           'lowgap social club', 'quarry lane garage', 'sycamore door', 'depot street basement', 'the gap'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The university, the paper, the festivals and the storm are written only in generic form. */
  blocklist: ['johnson city press*', 'ballad health*', 'tweetsie*', 'bristol rhythm*', 'waffle house*', 'cook out*', 'food city*'],

  blurb: ['A hospital and college town in the valley where bluegrass is the official sound. The punks bring a banjo and a car.',
          'Shows live on porches, in yards and in church halls, and the night ends at a chain diner.'],
  hard: 'Small regional draw: few rooms, no real all-ages, and a car ride to everything.',
  region: 'Appalachia',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Knoxville', state: 'TN', lat: 35.96, lon: -83.92 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Johnson City' },
    { id: 'jonesborough', kind: 'FEEDER', name: 'Jonesborough', minutes: 15, bearing: 240, note: 'The state\'s oldest town, quiet and historic; a punk scene is unlikely.' },
    { id: 'elizabethton', kind: 'FEEDER', name: 'Elizabethton', minutes: 20, bearing: 100, note: 'An old rayon-mill county seat with a small college; the nearest town a local names first.' },
    { id: 'bluff-city', kind: 'FEEDER', name: 'Bluff City and Piney Flats', minutes: 20, bearing: 30, note: 'Tiny rural towns on the way to the state line.' },
    { id: 'erwin', kind: 'FEEDER', name: 'Unicoi and Erwin', minutes: 25, bearing: 175, note: 'A railroad town in the river gorge, hit by flooding; kids drive up for shows.' },
    { id: 'greeneville', kind: 'FEEDER', name: 'Greeneville', minutes: 40, bearing: 235, note: 'A church-heavy county seat with a thin scene.' },
    { id: 'roan-mountain', kind: 'FEEDER', name: 'Roan Mountain and Hampton', minutes: 40, bearing: 125, note: 'Mountain communities with long drives and little to do.' },
    { id: 'abingdon', kind: 'FEEDER', name: 'Abingdon', state: 'VA', minutes: 55, bearing: 50, note: 'An arts-and-theater town up I-81 with a community college.' },
    { id: 'rogersville', kind: 'FEEDER', name: 'Rogersville', minutes: 55, bearing: 280, note: 'A small farm and church county seat to the west.' },
    { id: 'mountain-city', kind: 'FEEDER', name: 'Mountain City', minutes: 60, bearing: 70, note: 'The highest town in the state, near the lake; a handful of kids make the drive.' },
    { id: 'morristown', kind: 'FEEDER', name: 'Morristown', minutes: 60, bearing: 240, pop: 30400, note: 'A factory town with a community college and a big Latino community.' },
    { id: 'kingsport', kind: 'PEER', name: 'Kingsport', minutes: 45, bearing: 30, slug: 'kingsport-tn', note: 'The tidy company-town sibling up I-26; the two mildly mock each other.' },
    { id: 'boone', kind: 'PEER', name: 'Boone', state: 'NC', minutes: 75, bearing: 135, scene: 500, note: 'A college mountain town over the line; crowds cross easily.' },
    { id: 'asheville', kind: 'PEER', name: 'Asheville', state: 'NC', minutes: 110, bearing: 165, slug: 'asheville-nc', note: 'The better-known music town over the mountains that pulls bands and kids away.' },
    { id: 'roanoke', kind: 'PEER', name: 'Roanoke', state: 'VA', minutes: 150, bearing: 50, slug: 'roanoke-va', note: 'A larger peer on the I-81 touring line.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The rail-junction core of old brick buildings: bar-and-restaurant rooms, storefronts and warehouse space by the tracks.' },
    { id: 'campus', name: 'the university and West Walnut', route: 'campus', note: 'Cheap student rentals and chain food by campus: where house shows live.' },
    { id: 'tree-streets', name: 'the Tree Streets', route: 'old-side', note: 'Small frame houses between downtown and campus, slowly renovating: the best bet for porch and backyard shows.' },
    { id: 'north-roan', name: 'North Roan Street and State of Franklin Road', route: 'campus', note: 'The retail strip of chains and big-box lots, where closed shops become practice rooms.' },
    { id: 'bristol-highway', name: 'the Bristol Highway and Unaka Avenue corridors', route: 'work-side', note: 'Old commercial arteries of motels, auto shops and light industry: cheap warehouse and shop space for practice rooms.' },
    { id: 'boones-creek', name: 'Boones Creek and Gray', route: 'work-side', note: 'The suburban-to-rural fringe of acreage, sheds and barns; the city and county argue over who polices it.' },
    { id: 'mountain-home', name: 'Mountain Home', route: 'old-side', note: 'Institutional hospital and veteran ground: not a show space, but it matters for the crowd.' }
  ],

  contacts: ['kingsport-tn', 'asheville-nc', 'roanoke-va', 'chattanooga-tn'],

  points: [
    { name: 'Knoxville', state: 'TN', lat: 35.96, lon: -83.92, pop: 190000 },
    { name: 'Bristol', state: 'TN', lat: 36.6, lon: -82.19, pop: 27000 },
    { name: 'Boone', state: 'NC', lat: 36.22, lon: -81.67, pop: 19000 },
    { name: 'Abingdon', state: 'VA', lat: 36.71, lon: -81.98, pop: 8000 }
  ],
  roads: ['I-26', 'I-81', 'US 11E', 'US 19W', 'US 321', 'US 23'],

  words: {
    street: ['West Walnut Street', 'North Roan Street', 'State of Franklin Road', 'Unaka Avenue', 'Market Street', 'Buffalo Street', 'Bristol Highway', 'Tree Streets'],
    water: ['the Nolichucky', 'Boone Lake', 'Watauga Lake', 'the Watauga'],
    hood: ['Boones Creek', 'Gray', 'Mountain Home', 'Piney Flats', 'Roan Mountain', 'Buffalo Mountain', 'the Tri-Cities'],
    thing: ['biscuit', 'pimento cheese', 'banana pudding', 'sweet tea', 'rail yard', 'tobacco barn', 'covered bridge', 'church sign', 'banjo', 'fiddle', 'porch', 'chain diner'],
    weather: ['mountain ice', 'valley fog', 'flash flood', 'thunderstorm']
  }
});
