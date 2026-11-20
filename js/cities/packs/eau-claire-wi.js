SB.Cities.register('eau-claire-wi', {
  v: 1,
  slug: 'eau-claire-wi',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['uw-eau claire', 'uwec', 'uw-stout', 'stout', 'uw-river falls', 'uw-stevens point', 'blugold', 'blugolds', 'blue devils', 'midwest weirdfest', 'weirdfest',
           'eau claire marathon', 'downtown farmers market', 'wisconsin public radio', 'leinenkugel\'s', 'leinenkugel', 'spotted cow', 'kwik trip', 'culver\'s',
           'eau claire memorial', 'eau claire north', 'packers', 'vikings', 'fort mccoy', 'ho-chunk', 'ho-chunk nation', 'chippewa river state trail',
           'american legion', 'vfw', 'elks',
           'the sawmill annex', 'half moon hall', 'chippewa flats', 'the confluence room', 'randall street basement', 'the lutheran annex', 'bridge number nine',
           'the tire works loft', 'blugold lanes back room', 'the horseradish room', 'eastside hill garage'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real institutions are written only in generic form. */
  blocklist: ['uwec*', 'blugold*', 'weirdfest*', 'leinenkugel*', 'kwik trip*', 'the sawmill annex*', 'half moon hall*'],

  blurb: ['The punks live in the shadow of the town\'s folk fame. A house-born fest, long basement bills and a hall keep them loud.',
          'Bills run five to seven bands, and a basement that lasts a year is a good run. Rooms come and go.'],
  hard: 'Houses last about a year, bar rooms are 21+, and the best show is a hall.',
  region: 'the Chippewa Valley',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 },
    { name: 'Madison', state: 'WI', lat: 43.07, lon: -89.4 },
    { name: 'Milwaukee', state: 'WI', lat: 43.04, lon: -87.91 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Eau Claire' },
    { id: 'altoona', kind: 'FEEDER', name: 'Altoona', minutes: 5, bearing: 100, pop: 8500, note: 'A suburb next door with no scene; its kids are effectively Eau Claire kids.' },
    { id: 'chippewa-falls', kind: 'FEEDER', name: 'Chippewa Falls', minutes: 15, bearing: 5, pop: 14000, note: 'An old mill and brewing town with a long heavy-music tradition and a mild rivalry.', bands: 2 },
    { id: 'fall-creek', kind: 'FEEDER', name: 'Fall Creek', minutes: 20, bearing: 125, note: 'A small farm and commuter town; no scene.' },
    { id: 'augusta', kind: 'FEEDER', name: 'Augusta', minutes: 25, bearing: 135, note: 'A small farm town; no scene.' },
    { id: 'menomonie', kind: 'FEEDER', name: 'Menomonie', minutes: 30, bearing: 275, pop: 16000, note: 'A college town with its own bar and house-show scene; sends and takes bands and crowds.', bands: 3 },
    { id: 'osseo', kind: 'FEEDER', name: 'Osseo', minutes: 30, bearing: 195, note: 'A small farm town on the interstate; no scene.' },
    { id: 'mondovi', kind: 'FEEDER', name: 'Mondovi', minutes: 40, bearing: 235, note: 'A small farm town with a few bands and no venues.', bands: 1 },
    { id: 'durand', kind: 'FEEDER', name: 'Durand', minutes: 45, bearing: 245, note: 'A river town at the bottom of the valley with a tiny scene.' },
    { id: 'rice-lake', kind: 'FEEDER', name: 'Rice Lake', minutes: 60, bearing: 350, pop: 8000, note: 'A northwoods hub with a branch campus; its kids come south for bigger shows.' },
    { id: 'la-crosse', kind: 'PEER', name: 'La Crosse', minutes: 90, bearing: 215, scene: 900, note: 'The nearest true peer: artsier, hillier, and a steady swap of bands.' },
    { id: 'wausau', kind: 'PEER', name: 'Wausau', minutes: 90, bearing: 95, scene: 500, note: 'A paper-mill and insurance town; its kids come west for shows.' },
    { id: 'duluth', kind: 'PEER', name: 'Duluth', state: 'MN', minutes: 165, bearing: 340, slug: 'duluth-mn', note: 'The nearest same-size port city with a distinct scene; trades bands more than crowds.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the confluence', route: 'downtown', note: 'Walkable bars, restaurants, new apartments and a market where the rivers meet.' },
    { id: 'water-street', name: 'Water Street', route: 'campus', note: 'A historic strip of student bars, pizza, tattoo and thrift across the river by campus.' },
    { id: 'third-ward', name: 'the Third Ward', route: 'old-side', note: 'An older residential district near downtown; porches, a few big houses and basements, and close neighbors.' },
    { id: 'randall-park', name: 'Randall Park', route: 'old-side', note: 'Old houses cut into apartments for students and young workers: the best bet for basements and yards.' },
    { id: 'eastside-hill', name: 'Eastside Hill', route: 'old-side', note: 'A quiet residential hill east of downtown; basements and garages, and the grade makes loading a pain.' },
    { id: 'north-side', name: 'the old industrial north side', route: 'work-side', note: 'A big former factory complex and old mill buildings now holding workshops, studios and practice rooms.' },
    { id: 'south-side', name: 'Hastings Way and the south side', route: 'work-side', note: 'Strip malls and chains along the highway, where pizza places will take an all-ages show.' }
  ],

  contacts: ['duluth-mn', 'madison-wi', 'minneapolis'],

  points: [
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27, pop: 430000 },
    { name: 'Madison', state: 'WI', lat: 43.07, lon: -89.4, pop: 270000 },
    { name: 'Stevens Point', state: 'WI', lat: 44.52, lon: -89.57, pop: 25000 },
    { name: 'Rochester', state: 'MN', lat: 44.02, lon: -92.47, pop: 120000 }
  ],
  roads: ['I-94', 'US 53', 'US 12', 'WI 37', 'WI 29'],

  words: {
    street: ['Water Street', 'Hastings Way', 'Clairemont Avenue', 'Barstow Street', 'Graham Avenue', 'Madison Street'],
    water: ['the Chippewa', 'the Eau Claire River', 'Half Moon Lake', 'Lake Wissota'],
    hood: ['Third Ward', 'Randall Park', 'Eastside Hill', 'Emery Street', 'Shawtown', 'West Eau Claire'],
    thing: ['fish fry', 'supper club', 'brandy old fashioned', 'cheese curd', 'tavern', 'bubbler', 'snowbank', 'basement show', 'lodge hall', 'coffee bar', 'festival weekend'],
    weather: ['wind chill', 'blizzard']
  }
});
