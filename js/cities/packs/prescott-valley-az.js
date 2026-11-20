SB.Cities.register('prescott-valley-az', {
  v: 1,
  slug: 'prescott-valley-az',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['findlay toyota center', 'northern arizona suns', 'suns', 'embry-riddle', 'embry riddle', 'prescott college', 'yavapai college', 'yavaline',
           'ernest a. love field', 'love field', 'prescott daily courier', 'daily courier', 'frontier days', 'whiskey row', 'whiskey off-road',
           'courthouse plaza', 'walmart', 'costco', 'taco bell', 'jack in the box', 'sonic', 'circle k', 'dutch bros', 'northern arizona university', 'nau',
           'bradshaw mountain high school', 'prescott high', 'humboldt unified', 'vfw', 'american legion', 'elks', 'national guard', 'wickenburg',
           'the heliograph room', 'glassford annex', 'lynx creek social hall', 'cordes junction rec hall', 'the caliche', 'black canyon carport',
           'dewey feed & grain', 'dewey feed and grain', 'fain road unit 9', 'the windsong garage', 'the bradshaw basement', 'mingus grade rest stop', 'long look lanes'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['findlay toyota*', 'frontier days*', 'whiskey row*', 'whiskey off-road*', 'prescott daily*', 'yavaline*', 'embry*', 'dutch bros*'],

  blurb: ['Subdivision sprawl at five thousand feet, with a scene that lives in carports and big yards and borrows its bars from the older town ten minutes west.',
          'Everyone drives to the show, nobody has a basement, and the older neighbors have the HOA ear.'],
  hard: 'No real rooms of its own: you load in to a yard and hope the neighbors are out.',
  region: 'the Southwest',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Phoenix', state: 'AZ', lat: 33.45, lon: -112.07 },
    { name: 'Tucson', state: 'AZ', lat: 32.22, lon: -110.97 },
    { name: 'Las Vegas', state: 'NV', lat: 36.17, lon: -115.14 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Prescott Valley' },
    { id: 'dewey', kind: 'FEEDER', name: 'Dewey-Humboldt', minutes: 10, bearing: 120, note: 'A tiny rural former mining town with big lots. No known scene.' },
    { id: 'prescott', kind: 'FEEDER', name: 'Prescott', minutes: 15, bearing: 265, note: 'The older, prettier twin ten minutes west, with the bars, the colleges and the real scene. The gravity well.' },
    { id: 'chino-valley', kind: 'FEEDER', name: 'Chino Valley', minutes: 25, bearing: 340, note: 'A farm and ranch town to the north. A small scene is possible.' },
    { id: 'mayer', kind: 'FEEDER', name: 'Mayer', minutes: 25, bearing: 150, note: 'A rural old mining town with big lots and cheap rent.' },
    { id: 'cordes-lakes', kind: 'FEEDER', name: 'Cordes Lakes', minutes: 30, bearing: 140, note: 'Trailer and RV communities by the interstate, and a travel stop.' },
    { id: 'black-canyon', kind: 'FEEDER', name: 'Black Canyon City', minutes: 45, bearing: 170, note: 'A small desert town down the interstate.' },
    { id: 'jerome', kind: 'FEEDER', name: 'Jerome and Clarkdale', minutes: 50, bearing: 70, note: 'A cliffside ex-mining town turned gallery town, and its neighbor. Tiny.' },
    { id: 'camp-verde', kind: 'FEEDER', name: 'Camp Verde', minutes: 50, bearing: 95, note: 'A rural valley town on the interstate.' },
    { id: 'cottonwood', kind: 'FEEDER', name: 'Cottonwood', minutes: 55, bearing: 70, note: 'The Verde Valley hub, with a likely high-school scene.' },
    { id: 'sedona', kind: 'FEEDER', name: 'Sedona', minutes: 75, bearing: 50, note: 'A tourist and wealth town with a few creatives and almost no scene.' },
    { id: 'flagstaff', kind: 'PEER', name: 'Flagstaff', minutes: 90, bearing: 30, slug: 'flagstaff-az', note: 'The bigger college town to the north, and the nearest real regional scene.' },
    { id: 'kingman', kind: 'PEER', name: 'Kingman', minutes: 135, bearing: 310, note: 'A railroad and old-highway town on the interstate with a small, hard-luck scene.' },
    { id: 'lake-havasu', kind: 'PEER', name: 'Lake Havasu City', minutes: 180, bearing: 275, note: 'A boating-and-retiree desert town with a spring-break crowd. Bands occasionally pass through.' }
  ],

  hoods: [
    { id: 'town-center', name: 'Town Center and the entertainment district', route: 'downtown', note: 'The arena, chain restaurants and big-box retail. Nothing DIY, but parking lots and after-show food.' },
    { id: 'old-grid', name: 'the old grid along the west side', route: 'old-side', note: 'The oldest subdivisions: modest ranches, manufactured homes and big flat lots with carports and sheds. Backyard shows.' },
    { id: 'fain-road', name: 'the Fain Road industrial corridor', route: 'work-side', note: 'Warehouses and unit bays; the one place a loud band does not anger neighbors. Contested as the land gets developed.' },
    { id: 'glassford-hill', name: 'Glassford Hill and the east-side subdivisions', route: 'campus', note: 'Newer stucco tract homes with HOAs and neighbors who call about noise. Retirees and commuters.' },
    { id: 'southeast-lots', name: 'the southeast lots toward Dewey', route: 'work-side', note: 'Semi-rural lots with horses and long driveways, far from neighbors. The likeliest house-show geography.' },
    { id: 'lynx-creek', name: 'Lynx Creek and the northeast edge', route: 'old-side', note: 'Old mining remnants and a lake: a hangout and outdoor gathering spot, not a show space.' },
    { id: 'prescott-hood', name: 'downtown Prescott', route: 'downtown', note: 'The old courthouse square and its historic bars, ten minutes west. All-ages afternoons and back rooms, tourist-heavy and pricey.' }
  ],

  contacts: ['flagstaff-az'],

  points: [
    { name: 'Phoenix', state: 'AZ', lat: 33.45, lon: -112.07, pop: 1650000 },
    { name: 'Flagstaff', state: 'AZ', lat: 35.2, lon: -111.65, pop: 77000 },
    { name: 'Kingman', state: 'AZ', lat: 35.19, lon: -114.05, pop: 33000 },
    { name: 'Albuquerque', state: 'NM', lat: 35.08, lon: -106.65, pop: 560000 }
  ],
  roads: ['SR 69', 'SR 89A', 'SR 89', 'I-17', 'I-40', 'Fain Road'],

  words: {
    street: ['Highway 69', 'Highway 89A', 'Fain Road', 'Glassford Hill Road', 'Robert Road', 'Lakeshore Drive'],
    water: ['Lynx Creek', 'Lynx Lake', 'Agua Fria River'],
    hood: ['Glassford Hill', 'Dewey', 'Humboldt', 'Mayer', 'Cordes Junction', 'Lynx Creek', 'Bradshaw Mountains'],
    thing: ['carport', 'swamp cooler', 'dirt lot', 'generator', 'caliche', 'monsoon wash', 'HOA letter', 'strip mall', 'parking lot', 'yard show', 'load-in', 'mountain view'],
    weather: ['monsoon storm', 'hailstorm', 'wildfire smoke', 'fire restrictions', 'freeze']
  }
});
