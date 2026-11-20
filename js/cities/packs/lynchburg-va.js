SB.Cities.register('lynchburg-va', {
  v: 1,
  slug: 'lynchburg-va',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['liberty university', 'flames', 'randolph college', 'university of lynchburg', 'virginia university of lynchburg',
           'central virginia community college', 'sweet briar', 'sweet briar college', 'longwood university', 'hampden-sydney',
           'virginia military institute', 'vmi', 'virginia tech', 'uva', 'hillcats', 'lynchburg hillcats', 'carolina league', 'cleveland guardians',
           'virginia 10 miler', '10 miler', 'news & advance', 'news and advance', 'gltc', 'amtrak', 'greyhound', 'american eagle', 'waffle house',
           'cook out', 'kemper street station', 'vines center', 'williams stadium', 'baptist', 'vfw', 'american legion', 'the foundry annex',
           'kemper siding', 'candler\'s cellar', 'lodge 1142', 'third hill hall', 'the tobacco barn room', 'st. anselm\'s fellowship hall',
           'lowwater skate and supply', 'the rail yard rec', 'old forest social club', 'garland street garage', 'the piedmont pie room'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['liberty university*', 'hillcats*', 'virginia 10 miler*', 'news & advance*', 'waffle house*', 'cook out*', 'randolph college*'],

  blurb: ['A city of seven hills on the James River in the Blue Ridge foothills, with no interstate and a huge religious campus on the mountain.',
          'A few dozen kids keep shows going in church halls and damp basements, and half the bill drives in from the county. The best bands move to Richmond.'],
  hard: 'No interstate, a conservative town, and everyone you need is forty minutes away.',
  region: 'the Blue Ridge',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Lynchburg' },
    { id: 'madison-heights', kind: 'FEEDER', name: 'Madison Heights', minutes: 10, bearing: 10, scene: 60, note: 'Across the river in the next county, with its own deputies. Cheap, and an old trick for dodging city rules.' },
    { id: 'forest', kind: 'FEEDER', name: 'Forest', minutes: 15, bearing: 250, note: 'A church-heavy suburb to the west. Kids need a ride in.' },
    { id: 'rustburg', kind: 'FEEDER', name: 'Rustburg and Brookneal', minutes: 30, bearing: 170, note: 'A rural county seat and a tiny river-and-tobacco town.' },
    { id: 'amherst', kind: 'FEEDER', name: 'Amherst', minutes: 25, bearing: 5, note: 'A small county seat up US 29. Little scene.' },
    { id: 'appomattox', kind: 'FEEDER', name: 'Appomattox', minutes: 30, bearing: 100, note: 'A tiny rural town where the kids drive in for shows.' },
    { id: 'altavista', kind: 'FEEDER', name: 'Altavista', minutes: 30, bearing: 185, note: 'An old mill town to the south with a few bands of its own.' },
    { id: 'bedford', kind: 'FEEDER', name: 'Bedford', minutes: 35, bearing: 255, note: 'A county seat to the west. Bored teens, no scene.' },
    { id: 'farmville', kind: 'FEEDER', name: 'Farmville', minutes: 55, bearing: 100, note: 'A college town to the east that trades bands with the city.' },
    { id: 'lexington', kind: 'FEEDER', name: 'Lexington and Buena Vista', minutes: 75, bearing: 335, note: 'Two small college and mill towns up in the valley.' },
    { id: 'roanoke', kind: 'PEER', name: 'Roanoke', state: 'VA', minutes: 60, bearing: 260, slug: 'roanoke-va', note: 'The regional hub an hour west. Mild rivalry and real trading both ways.' },
    { id: 'charlottesville', kind: 'PEER', name: 'Charlottesville', state: 'VA', minutes: 70, bearing: 40, slug: 'charlottesville-va', note: 'Up US 29: a bigger scene per head, where local kids go for national bands.' },
    { id: 'danville', kind: 'PEER', name: 'Danville', state: 'VA', minutes: 75, bearing: 200, note: 'A down-on-its-luck tobacco and textile city that trades a few bands.' },
    { id: 'harrisonburg', kind: 'PEER', name: 'Harrisonburg', state: 'VA', minutes: 120, bearing: 355, slug: 'harrisonburg-va', note: 'A university city with a well-known DIY tradition.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown on the bluff', route: 'downtown', note: 'Brick warehouses and storefronts above the river. The best place for a room and the place with the most noise complaints.' },
    { id: 'rivermont', name: 'Rivermont and the west end', route: 'campus', note: 'Leafy old houses and duplexes near a small college. Rented house shows, with older neighbors who call the police.' },
    { id: 'hill-streets', name: 'the close-in hills', route: 'old-side', note: 'Row houses and subdivided rentals on the steep streets around downtown. Cheap in places, and being flipped one block at a time.' },
    { id: 'old-forest-road', name: 'Fort Hill and the Old Forest Road corridor', route: 'work-side', note: 'Mid-century ranch houses, church campuses and strip malls. Garages and carports, and neighbors rather than landlords to worry about.' },
    { id: 'wards-road', name: 'the Wards Road strip', route: 'campus', note: 'Big-box retail and student apartments at the foot of the mountain. Not a place for shows, but where the audience lives.' },
    { id: 'madison-heights-hood', name: 'Madison Heights', route: 'town:madison-heights', note: 'Across the river: strip malls, ranch houses and cheap industrial space under the county sheriff.' },
    { id: 'east-end', name: 'the east end and the rail strip', route: 'work-side', note: 'Old foundry and warehouse land along the river and tracks. Industrial space where it exists, and a history to treat with care.' }
  ],

  contacts: ['roanoke-va', 'charlottesville-va', 'harrisonburg-va'],

  points: [
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44, pop: 1300000 },
    { name: 'Greensboro', state: 'NC', lat: 36.07, lon: -79.79, pop: 780000 },
    { name: 'Blacksburg', state: 'VA', lat: 37.23, lon: -80.41, pop: 45000 },
    { name: 'Staunton', state: 'VA', lat: 38.15, lon: -79.07, pop: 25000 }
  ],
  roads: ['US 29', 'US 460', 'US 501', 'US 221', 'US 501 Business', 'the James River'],

  words: {
    street: ['Rivermont Avenue', 'Church Street', 'Main Street', 'Boonsboro Road', 'Old Forest Road', 'Wards Road'],
    water: ['the James River', 'the James', 'Blackwater Creek'],
    hood: ['Rivermont', 'Garland Hill', 'Federal Hill', 'Daniel\'s Hill', 'Diamond Hill', 'College Hill', 'Tinbridge Hill', 'Fort Hill', 'Madison Heights'],
    thing: ['church basement', 'seven hills', 'chili dog', 'milkshake tray', 'tobacco barn', 'biscuit', 'skate shop', 'fellowship hall'],
    weather: ['humid afternoon', 'snow day']
  }
});
