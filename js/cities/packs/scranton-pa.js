SB.Cities.register('scranton-pa', {
  v: 1,
  slug: 'scranton-pa',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of scranton', 'marywood', 'marywood university', 'johnson college', 'lackawanna college', 'penn state scranton', 'penn state', 'keystone college',
           'wilkes university', 'king\'s college', 'east stroudsburg university', 'bloomsburg university', 'luzerne county community college',
           'st. patrick\'s day parade', 'la festa italiana', 'steamtown', 'steamtown marathon', 'scranton fringe festival', 'fringe festival',
           'pittston tomato festival', 'tomato festival', 'cherry blossom festival', 'bloomsburg fair', 'pocono raceway', 'the electric city', 'electric city',
           'the times-tribune', 'times-tribune', 'scranton times', 'elks', 'moose lodge', 'knights of columbus', 'vfw', 'american legion',
           'the culm bank', 'culm bank', 'breaker boy hall', 'number nine social club', 'st. casimir\'s annex', 'slate picker\'s rec',
           'hose company no. 6 banquet room', 'hose company no. 6', 'the dummy line', 'dummy line', 'gravity plane records back room', 'gravity plane records',
           'keyser creek garage', 'the wet cellar', 'wet cellar', 'lackawanna avenue mezzanine', 'the anthracite annex', 'anthracite annex'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['university of scranton*', 'marywood*', 'penn state*', 'steamtown*', 'la festa*', 'pocono raceway*', 'times-tribune*', 'bloomsburg fair*'],

  blurb: ['Halls, basements and a rival town down the valley. The scene runs on a few people with a van.',
          'Heavy music feels at home in the old mill-and-parish country, and everybody is a few steps from everybody else.'],
  hard: 'Few rooms, thin tour traffic, and the next town down the valley competes.',
  region: 'the valley',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Scranton' },
    { id: 'dunmore', kind: 'FEEDER', name: 'Dunmore', minutes: 5, bearing: 100, note: 'The adjoining borough at the highway junction; its scene is Scranton\'s scene.' },
    { id: 'south-valley', kind: 'FEEDER', name: 'Old Forge, Taylor and Moosic', minutes: 15, bearing: 205, note: 'Working-class valley boroughs down the road; kids drift in all the time.' },
    { id: 'pittston', kind: 'FEEDER', name: 'Pittston', minutes: 20, bearing: 230, note: 'A coal and clothing-mill town on the way to the twin city.' },
    { id: 'carbondale', kind: 'FEEDER', name: 'Carbondale', minutes: 25, bearing: 40, note: 'An old struggling railroad and coal town to the north-east; the kids come down for shows.' },
    { id: 'wilkes-barre', kind: 'FEEDER', name: 'Wilkes-Barre', minutes: 30, bearing: 225, pop: 44000, note: 'The twin city down the interstate with its own colleges and bars; trade runs both ways.' },
    { id: 'tunkhannock', kind: 'FEEDER', name: 'Tunkhannock', minutes: 30, bearing: 280, note: 'A rural county seat; small bands and long roads.' },
    { id: 'honesdale', kind: 'FEEDER', name: 'Honesdale', minutes: 45, bearing: 70, note: 'A pretty canal-era town with a small arts crowd and a thin punk presence.' },
    { id: 'mount-pocono', kind: 'FEEDER', name: 'Mount Pocono and the Poconos', minutes: 45, bearing: 150, note: 'Tourism and exurbs; plenty of bored teenagers and few places to go.' },
    { id: 'hazleton', kind: 'FEEDER', name: 'Hazleton', minutes: 50, bearing: 205, note: 'A warehouse-economy city up on the ridge with a small scene of its own.' },
    { id: 'montrose', kind: 'FEEDER', name: 'Montrose', minutes: 55, bearing: 340, note: 'A rural northern county seat; the kids drive to Scranton or Binghamton.' },
    { id: 'stroudsburg', kind: 'FEEDER', name: 'Stroudsburg and East Stroudsburg', minutes: 60, bearing: 135, note: 'A college-town corner of the Poconos.' },
    { id: 'binghamton', kind: 'PEER', name: 'Binghamton', state: 'NY', minutes: 65, bearing: 355, scene: 450, note: 'A university city an hour north on the interstate, a frequent tour stop and the nearest outside crowd.' },
    { id: 'allentown', kind: 'PEER', name: 'Allentown', minutes: 80, bearing: 165, slug: 'allentown-pa', note: 'The bigger valley to the south, closer to Philadelphia; bands travel both ways.' },
    { id: 'ithaca', kind: 'PEER', name: 'Ithaca', state: 'NY', minutes: 105, bearing: 330, slug: 'ithaca-ny', note: 'A smaller, more bohemian college town.' }
  ],

  hoods: [
    { id: 'central-city', name: 'Central City', route: 'downtown', note: 'The flat river core: bars on the avenues, lofts above storefronts and old industrial buildings. Noise complaints come from the lofts.' },
    { id: 'south-side', name: 'the South Side', route: 'old-side', note: 'Dense rowhouses and corner bars on the hill south of downtown, with old ethnic clubs and newer families. Cheap.' },
    { id: 'west-side', name: 'the West Side', route: 'old-side', note: 'Rowhouses and double blocks across the river with parish and fire-company culture. Club rooms and basements.' },
    { id: 'hill-section', name: 'the Hill Section', route: 'campus', note: 'Big old houses split into apartments around the university. Student house shows, and landlords who notice.' },
    { id: 'north-scranton', name: 'North Scranton', route: 'work-side', note: 'A long working-class strip up the valley of small lots and rowhouses. Basements and corner bars.' },
    { id: 'green-ridge', name: 'Green Ridge', route: 'campus', note: 'Tidy single homes in the north-east. Quiet, and the neighbors call.' },
    { id: 'minooka', name: 'Minooka', route: 'work-side', note: 'Narrow rows at the south edge: cheap, ignored, and the least known to outsiders.' },
    { id: 'mountains', name: 'West Mountain and East Mountain', route: 'old-side', note: 'Ridge-top ranches and split-levels with big lots, barns and pole buildings. The place for a generator show.' }
  ],

  contacts: ['allentown-pa', 'ithaca-ny'],

  points: [
    { name: 'Binghamton', state: 'NY', lat: 42.1, lon: -75.91, pop: 48000 },
    { name: 'Wilkes-Barre', state: 'PA', lat: 41.25, lon: -75.88, pop: 44000 },
    { name: 'Williamsport', state: 'PA', lat: 41.24, lon: -77.0, pop: 28000 },
    { name: 'Bethlehem', state: 'PA', lat: 40.63, lon: -75.37, pop: 75000 }
  ],
  roads: ['I-81', 'I-84', 'I-380', 'US 6', 'US 11', 'PA 307'],

  words: {
    street: ['Lackawanna Avenue', 'Wyoming Avenue', 'Cedar Avenue', 'Main Avenue', 'Penn Avenue', 'Mulberry Street'],
    water: ['the Lackawanna River', 'Roaring Brook', 'Leggetts Creek'],
    hood: ['Minooka', 'Green Ridge', 'West Mountain', 'East Mountain', 'Hyde Park', 'Providence', 'the Hill Section', 'the South Side', 'the West Side', 'Dunmore'],
    thing: ['slag heap', 'breaker', 'pierogi', 'pizza tray', 'rowhouse', 'stone basement', 'coal door', 'club bar', 'banquet room', 'snow shovel', 'parish hall', 'hatchback', 'mill practice space'],
    weather: ['snow squall', 'black ice', 'lake-effect flurry', 'road closure']
  }
});
