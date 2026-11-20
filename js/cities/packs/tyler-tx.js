SB.Cities.register('tyler-tx', {
  v: 1,
  slug: 'tyler-tx',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['tyler morning telegraph', 'texas rose festival', 'rose festival', 'rose capital of america', 'azalea trail', 'east texas state fair',
           'whataburger', 'waffle house', 'sonic drive-in', 'dairy queen', 'shiner', 'dr pepper', 'topo chico', 'warped tour', 'tabc', 'vfw',
           'american legion', 'canton trade days', 'first monday trade days', 'dallas cowboys', 'texas longhorns', 'texas a&m',
           'tyler junior college', 'ut tyler', 'university of texas at tyler', 'texas college', 'stephen f. austin', 'lamar university',
           'east texas baptist university', 'ice storm of 2021', 'winter storm uri', 'the pine shed', 'loop annex', 'rosebud hall', 'back forty',
           'cotton yard', 'the fellowship room', 'tin roof tyler', 'gentry street garage', 'second pew', 'smith road barn'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['tyler morning telegraph*', 'rose festival*', 'whataburger*', 'waffle house*', 'dairy queen*', 'warped tour*'],

  blurb: ['An East Texas hospital and rose-nursery hub in the Piney Woods: tidy, churchgoing and built around the car, with a big retail loop and no cheap bohemian district.',
          'The scene is a few kids from the suburbs and the pine towns around, one all-ages room at a time, and Dallas is close enough to take anyone serious.'],
  hard: 'Few rooms, no transit, and anyone serious has left for Dallas.',
  region: 'East Texas',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.8 },
    { name: 'Denton', state: 'TX', lat: 33.21, lon: -97.13 },
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Tyler' },
    { id: 'whitehouse', kind: 'FEEDER', name: 'Whitehouse', minutes: 10, bearing: 150, note: 'The bedroom suburb to the southeast; kids carpool in.' },
    { id: 'bullard', kind: 'FEEDER', name: 'Bullard', minutes: 15, bearing: 190, note: 'A wealthy suburb to the south with big lots, barns and high school kids.' },
    { id: 'lindale', kind: 'FEEDER', name: 'Lindale', minutes: 15, bearing: 10, note: 'A small town to the north at the interstate corner.' },
    { id: 'chandler', kind: 'FEEDER', name: 'Chandler and Brownsboro', minutes: 25, bearing: 265, note: 'Small farm and lake towns to the west.' },
    { id: 'jacksonville', kind: 'FEEDER', name: 'Jacksonville', minutes: 30, bearing: 185, note: 'A small town down US 69 with its own college and high school kids.' },
    { id: 'kilgore', kind: 'FEEDER', name: 'Kilgore', minutes: 35, bearing: 80, note: 'An oil town and college town that shares kids with Longview.' },
    { id: 'henderson', kind: 'FEEDER', name: 'Henderson', minutes: 40, bearing: 115, note: 'A small county seat to the east.' },
    { id: 'athens', kind: 'FEEDER', name: 'Athens', minutes: 40, bearing: 270, note: 'A lake-country town to the west with a community college.' },
    { id: 'mineola', kind: 'FEEDER', name: 'Mineola and Winnsboro', minutes: 40, bearing: 5, note: 'Rural railroad towns on the interstate corridor.' },
    { id: 'canton', kind: 'FEEDER', name: 'Canton', minutes: 40, bearing: 300, note: 'A town on the interstate known for its giant monthly flea market.' },
    { id: 'palestine', kind: 'FEEDER', name: 'Palestine', minutes: 55, bearing: 215, note: 'A rail town to the southwest with prisons and not much else.' },
    { id: 'longview', kind: 'PEER', name: 'Longview', minutes: 45, bearing: 75, slug: 'longview-tx', note: 'The closest peer: an oilfield town of similar size, trading crowds with Tyler.' },
    { id: 'nacogdoches', kind: 'PEER', name: 'Nacogdoches and Lufkin', minutes: 90, bearing: 160, note: 'A university town and a mill town down US 69, with student scenes of their own.' },
    { id: 'shreveport', kind: 'PEER', name: 'Shreveport', state: 'LA', minutes: 120, bearing: 85, slug: 'shreveport-la', note: 'The next stop east on I-20, a casino city with a small music community.' },
    { id: 'texarkana', kind: 'PEER', name: 'Texarkana', minutes: 120, bearing: 25, note: 'A border town to the north-northeast, a long drive for a fill date.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the square', route: 'downtown', note: 'Brick streets and restored storefronts around the courthouse. A few bars and one-off shows, and rents rising with the revival.' },
    { id: 'rail-side', name: 'the old rail district', route: 'old-side', note: 'Depot-era warehouses and industrial strips just north and east of downtown: the likeliest place for a practice space or a long-lived room.' },
    { id: 'north-side', name: 'the north and northeast side', route: 'work-side', note: 'Older cheap rentals and some of the cheapest housing in town, with yards for backyard shows. Neighbors and police are the problem.' },
    { id: 'loop-belt', name: 'South Broadway and the Loop', route: 'campus', note: 'Strip malls, chains and empty retail units with huge parking lots. The likeliest modern show spaces, with landlords who hate amps.' },
    { id: 'midtown', name: 'the old tree-lined districts', route: 'old-side', note: 'Big old houses and preservation money. Not a show neighborhood: a noise complaint comes at once.' },
    { id: 'medical', name: 'the medical district', route: 'work-side', note: 'Hospitals, clinics and parking garages. The day jobs that pay for the scene, not rooms.' },
    { id: 'south-side', name: 'the south side and the college edge', route: 'campus', note: 'Student apartments and rentals near the colleges, a source of audience and bands.' }
  ],

  contacts: ['longview-tx', 'shreveport-la'],

  points: [
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.8, pop: 1300000 },
    { name: 'Denton', state: 'TX', lat: 33.21, lon: -97.13, pop: 150000 },
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37, pop: 2300000 },
    { name: 'Texarkana', state: 'TX', lat: 33.43, lon: -94.05, pop: 37000 },
    { name: 'Nacogdoches', state: 'TX', lat: 31.6, lon: -94.65, pop: 33000 },
    { name: 'Lufkin', state: 'TX', lat: 31.34, lon: -94.73, pop: 34000 }
  ],
  roads: ['US 69', 'TX 31', 'TX 64', 'US 271', 'Loop 323', 'I-20'],

  words: {
    street: ['US 69', 'Texas 31', 'Texas 64', 'Loop 323', 'South Broadway'],
    water: ['Lake Tyler', 'Lake Palestine', 'Lake Fork'],
    hood: ['Charnwood', 'Azalea District', 'Bullard', 'Whitehouse', 'Lindale', 'South Broadway', 'Front Street', 'Beckham Avenue'],
    thing: ['pole barn', 'carport', 'generator', 'breakfast taco', 'barbecue pit', 'drive-in', 'tornado siren', 'rose bush', 'shed', 'church lot', 'strip-mall unit'],
    weather: ['spring thunderstorm', 'tornado watch', 'ice storm']
  }
});
