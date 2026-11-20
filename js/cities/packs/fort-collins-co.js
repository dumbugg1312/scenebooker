SB.Cities.register('fort-collins-co', {
  v: 1,
  slug: 'fort-collins-co',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['colorado state university', 'csu', 'cu boulder', 'university of colorado', 'university of wyoming', 'university of northern colorado', 'woodward', 'anheuser-busch',
           'broadcom', 'microsoft', 'tour de fat', 'colorado brewers festival', 'brewers festival', 'colorado marathon', 'fortitude 10k', 'horsetooth half marathon',
           'poudre fire authority', 'f.e. warren', 'cameron peak', 'cow college', 'the choice city', 'vfw', 'american legion',
           'the sugar beet annex', 'larimer grange no. 9', 'the hailstone', 'horsetooth rec room', 'canal street garage', 'the cottonwood cellar', 'mason spur',
           'the ditch rider', 'cow college annex', 'shields street carport', 'the chinook room', 'poudre pallet co.'],
  /* The dossier's twelve invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['colorado state*', 'tour de fat*', 'colorado brewers*', 'poudre fire*', 'cow college*', 'fortitude*'],

  blurb: ['Sober, kid-run hardcore and metal in a town of bluegrass and taprooms. Shows hop between basements, garages and a reuse-arts back room.',
          'No stage, shoulder to shoulder, and anyone can climb up for the mic.'],
  hard: 'Under-21 bands, few permanent rooms, and the houses keep closing.',
  region: 'the Front Range',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89 },
    { name: 'Albuquerque', state: 'NM', lat: 35.08, lon: -106.65 },
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'metal', d: .08, reason: 'The local shows blend hardcore and metal on the same bill.' },
    { fan: 'metal', band: 'hardcore', d: .08, reason: 'The local shows blend hardcore and metal on the same bill.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Fort Collins' },
    { id: 'laporte', kind: 'FEEDER', name: 'Laporte and Bellvue', minutes: 15, bearing: 320, note: 'A semi-rural edge of barns and acreage, already in the town\'s orbit.' },
    { id: 'wellington', kind: 'FEEDER', name: 'Wellington', minutes: 20, bearing: 5, note: 'A small bedroom town up I-25; teens drive down for shows.' },
    { id: 'windsor', kind: 'FEEDER', name: 'Windsor and Timnath', minutes: 20, bearing: 125, note: 'Fast-growing family suburbs to the southeast with no scene.' },
    { id: 'loveland', kind: 'FEEDER', name: 'Loveland', minutes: 25, bearing: 185, pop: 80000, note: 'An arts-and-sculpture suburb with its own small scene and a lot of suburban kids.' },
    { id: 'berthoud', kind: 'FEEDER', name: 'Berthoud', minutes: 30, bearing: 185, note: 'A farm town turned commuter town.' },
    { id: 'red-feather', kind: 'FEEDER', name: 'Red Feather Lakes and Livermore', minutes: 50, bearing: 315, note: 'Remote ranch and mountain kids; the roads close in bad weather.' },
    { id: 'estes-park', kind: 'FEEDER', name: 'Estes Park', minutes: 60, bearing: 230, note: 'A tourist town at the mountain gate; seasonal workers and a hard winter drive.', season: { months: [6, 7, 8], mul: 1.4 } },
    { id: 'laramie', kind: 'FEEDER', name: 'Laramie', state: 'WY', minutes: 80, bearing: 330, note: 'A university town up US 287; students sometimes come south for a show.' },
    { id: 'plains', kind: 'FEEDER', name: 'Fort Morgan and Brush', minutes: 90, bearing: 105, note: 'Feedlot and sugar-beet towns on the plains; kids come for the bigger town.' },
    { id: 'cheyenne', kind: 'PEER', name: 'Cheyenne', state: 'WY', minutes: 45, bearing: 5, scene: 400, note: 'A smaller capital and base town where I-25 meets I-80; shows trade south from there.' },
    { id: 'greeley', kind: 'PEER', name: 'Greeley', minutes: 45, bearing: 130, slug: 'greeley-co', note: 'The rougher, working-class neighbor; crowds and bands trade both ways.' },
    { id: 'boulder', kind: 'PEER', name: 'Boulder', minutes: 55, bearing: 190, slug: 'boulder-co', note: 'The pricey flagship town and friendly rival, with a long music history.' }
  ],

  hoods: [
    { id: 'old-town', name: 'Old Town', route: 'downtown', note: 'A historic brick core of bars, taprooms and restaurants; tourists and brewery crowds, and priced out for anything cheap.' },
    { id: 'campus-west', name: 'Campus West', route: 'campus', note: 'Student duplexes and small old houses by the university; the most house shows, and the first noise and landlord crackdowns.' },
    { id: 'midtown', name: 'Midtown', route: 'work-side', note: 'Strip malls and older commercial blocks along College Avenue south of Prospect; small units for practice rooms.' },
    { id: 'old-town-north', name: 'Old Town North', route: 'old-side', note: 'Former mills, auto shops and warehouses along the river, turning fast into taprooms, galleries and apartments.' },
    { id: 'east-side', name: 'the east side along Mulberry', route: 'work-side', note: 'Car lots, light industry and working-class neighborhoods toward the interstate; carports and industrial bays.' },
    { id: 'harmony', name: 'the Harmony corridor', route: 'campus', note: 'Office parks, new subdivisions and big churches; sterile, with a few garages and church halls.' },
    { id: 'foothills-edge', name: 'the foothills edge', route: 'old-side', note: 'Older houses and sheds near the reservoir; far from neighbors, cold in winter.' }
  ],

  contacts: ['greeley-co', 'boulder-co', 'denver'],

  points: [
    { name: 'Cheyenne', state: 'WY', lat: 41.14, lon: -104.82, pop: 65000 },
    { name: 'Longmont', state: 'CO', lat: 40.17, lon: -105.10, pop: 98000 },
    { name: 'Laramie', state: 'WY', lat: 41.31, lon: -105.59, pop: 31000 },
    { name: 'Colorado Springs', state: 'CO', lat: 38.83, lon: -104.82, pop: 480000 }
  ],
  roads: ['I-25', 'US 287', 'CO 14', 'US 34', 'I-80'],

  words: {
    street: ['College Avenue', 'Mulberry', 'Laurel', 'Prospect', 'Drake', 'Horsetooth', 'Harmony', 'Lemay'],
    water: ['the Poudre', 'Horsetooth Reservoir', 'the Poudre Canyon'],
    hood: ['Old Town', 'Campus West', 'Laporte', 'Bellvue', 'Midtown', 'Andersonville'],
    thing: ['taproom', 'green chile', 'bike lane', 'irrigation ditch', 'foothills', 'foco', 'reuse-arts space', 'soundproofed garage', 'parking-lot show'],
    weather: ['hailstorm', 'wildfire smoke', 'chinook wind']
  }
});
