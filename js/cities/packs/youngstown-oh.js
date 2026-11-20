SB.Cities.register('youngstown-oh', {
  v: 1,
  slug: 'youngstown-oh',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['ysu', 'youngstown state', 'youngstown state university', 'kent state', 'kent state university', 'brier hill festival', 'brier hill pizza', 'brier hill-style pizza',
           'canfield fair', 'mahoning county fair', 'youngstown air reserve station', 'idora park', 'idora', 'mill creek park', 'greyhound', 'amtrak', 'vfw', 'american legion',
           'st. patrick\'s day parade', 'ohio turnpike', 'covelli centre', 'covelli', 'eastwood mall', 'southern park mall', 'youngstown vindicator', 'vindicator',
           'tribune chronicle', 'wkbn', 'wfmj', 'ysu penguins', 'penguins', 'eastern gateway community college',
           'bessemer basement', 'slag hill social club', 'lanterman lot', 'open hearth annex', 'local 1462 hall', 'furnace room', 'cinder street rec',
           'fosterville pool hall', 'coke oven pizza back room', 'midlothian roller palace'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The 1984 fire is written only as 'the old fire'. */
  blocklist: ['vindicator*', 'ysu*', 'youngstown state*', 'idora*', 'brier hill festival*', 'covelli*', 'canfield fair*'],

  blurb: ['A half-empty Rust Belt steel town on the Mahoning River, an hour from Cleveland and from Pittsburgh. Rent is nearly free, and the crowd is small, tired and proud.',
          'Somebody always has a basement and a PA, but the ambitious kids drive away in either direction.'],
  hard: 'A fill-date town: small local crowds, and the best kids leave for Cleveland or Pittsburgh.',
  region: 'the Rust Belt',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80.0 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83.0 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Youngstown' },
    { id: 'struthers', kind: 'FEEDER', name: 'Struthers and Campbell', minutes: 10, bearing: 130, note: 'Small old mill towns along the river with Eastern European and Italian families.' },
    { id: 'boardman', kind: 'FEEDER', name: 'Boardman', minutes: 15, bearing: 180, note: 'The big suburb: malls and chain strips. Kids come in by car.' },
    { id: 'austintown', kind: 'FEEDER', name: 'Austintown', minutes: 15, bearing: 270, note: 'A suburb where the interstates meet; a few bands.' },
    { id: 'canfield', kind: 'FEEDER', name: 'Canfield and Poland', minutes: 15, bearing: 160, note: 'Wealthy suburbs. Kids come for shows and parents worry.' },
    { id: 'girard', kind: 'FEEDER', name: 'Girard and Niles', minutes: 20, bearing: 350, note: 'Old mill towns to the north.' },
    { id: 'hubbard', kind: 'FEEDER', name: 'Hubbard, Sharon and Hermitage', state: 'PA', minutes: 25, bearing: 55, note: 'State-line mill and shopping towns to the east.' },
    { id: 'warren', kind: 'FEEDER', name: 'Warren', minutes: 25, bearing: 320, note: 'A twin to Youngstown with its own cheap houses and bands. Trades the most acts.' },
    { id: 'salem', kind: 'FEEDER', name: 'Salem', minutes: 30, bearing: 215, note: 'A small farm-country town where a few kids drive in.' },
    { id: 'new-castle', kind: 'FEEDER', name: 'New Castle', state: 'PA', minutes: 35, bearing: 85, note: 'The outer reach of the mill towns; a couple of kids drive.' },
    { id: 'alliance', kind: 'FEEDER', name: 'Alliance', minutes: 40, bearing: 250, note: 'A small college town to the west.' },
    { id: 'east-liverpool', kind: 'FEEDER', name: 'East Liverpool', minutes: 50, bearing: 150, note: 'A river town on the Ohio at the end of the freeway.' },
    { id: 'akron', kind: 'PEER', name: 'Akron', minutes: 60, bearing: 265, slug: 'akron-oh', note: 'The nearest bigger music city: peer and big brother.' },
    { id: 'canton', kind: 'PEER', name: 'Canton', minutes: 60, bearing: 235, slug: 'canton-oh', note: 'A similar decayed industrial town. Youngstown sees it as boring; Canton sees Youngstown as tougher.' },
    { id: 'erie', kind: 'PEER', name: 'Erie', state: 'PA', minutes: 100, bearing: 25, slug: 'erie-pa', note: 'A lake city with more college and a more independent scene.' },
    { id: 'wheeling', kind: 'PEER', name: 'Wheeling', state: 'WV', minutes: 95, bearing: 165, note: 'A smaller river and mill town to the south.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Youngstown', route: 'downtown', note: 'Offices, courts and a few bars among surface lots and empty upper floors. A couple of storefront rooms.' },
    { id: 'university', name: 'Wick Park and the university', route: 'campus', note: 'Big old houses with real basements and porches around the campus, and a bar strip. Student-run events.' },
    { id: 'smoky-hollow', name: 'Smoky Hollow', route: 'downtown', note: 'An old industrial district being remade as an arts and maker area. Converted warehouse and storefront rooms.' },
    { id: 'brier-hill', name: 'Brier Hill', route: 'old-side', note: 'The old Italian neighborhood: social-club basements, church halls and a few houses.' },
    { id: 'north-heights', name: 'North Heights and Crandall Park', route: 'old-side', note: 'Single-family houses, many vacant. Cheap and mostly ignored; house and garage shows.' },
    { id: 'south-side', name: 'the South Side', route: 'work-side', note: 'The densest part of the city: stone-basement houses, corner-store lots and club halls on the main avenues.' },
    { id: 'west-side', name: 'the West Side', route: 'work-side', note: 'Stable bungalow streets with garages and backyards. The neighbors are the main constraint.' },
    { id: 'east-side', name: 'the East Side', route: 'work-side', note: 'Mostly vacant land and empty buildings. Almost nothing sanctioned, but a one-off is possible.' },
    { id: 'boardman-edge', name: 'Boardman and the south suburbs', route: 'campus', note: 'Strip malls, roller rinks and banquet halls just outside the city line for an all-ages bill.' }
  ],

  contacts: ['akron-oh', 'canton-oh', 'erie-pa', 'pittsburgh'],

  points: [
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69, pop: 2000000 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80.0, pop: 2400000 },
    { name: 'Kent', state: 'OH', lat: 41.15, lon: -81.36, pop: 30000 },
    { name: 'Wheeling', state: 'WV', lat: 40.06, lon: -80.72, pop: 27000 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83.0, pop: 2100000 }
  ],
  roads: ['I-80', 'I-76', 'I-680', 'SR 11', 'US 422', 'US 62'],

  words: {
    street: ['Market Street', 'Mahoning Avenue', 'Belmont Avenue', 'Glenwood Avenue', 'Madison Avenue', 'Federal Street'],
    water: ['the Mahoning River', 'Mill Creek', 'Lake Erie'],
    hood: ['Wick Park', 'Smoky Hollow', 'Brier Hill', 'Crandall Park', 'Oak Hill', 'Fosterville', 'Lansingville', 'Belle Vista', 'Cornersburg', 'Boardman'],
    thing: ['social club', 'parish hall', 'stone basement', 'vacant lot', 'mill yard', 'lake-effect snow', 'double house', 'fish fry', 'leftover bar', 'vacant block'],
    weather: ['lake-effect snow', 'whiteout']
  }
});
