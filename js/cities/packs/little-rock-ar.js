SB.Cities.register('little-rock-ar', {
  v: 1,
  slug: 'little-rock-ar',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of arkansas', 'university of arkansas at little rock', 'ualr', 'uams', 'hendrix college', 'hendrix', 'razorback', 'razorbacks', 'go hogs',
           'arkansas times', 'arkansas democrat-gazette', 'democrat-gazette', 'riverfest', 'arkansas state fair', 'little rock marathon',
           'war memorial stadium', 'wildwood park', 'little rock air force base', 'camp robinson', 'river market', 'waffle house', 'cheerwine',
           'dr pepper', 'vfw', 'american legion', 'knights of columbus', 'foreign trade zone',
           'pulaski pavilion', 'the delta room', 'kavanaugh carport', 'asher annex', 'the cheese dip hall', 'post 213', 'the quapaw basement',
           'baseline garage', 'ouachita room', 'mile marker 6', 'the rock island shed', 'markham street back lot'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['riverfest*', 'arkansas times*', 'democrat-gazette*', 'razorback*', 'waffle house*', 'cheerwine*', 'hendrix*'],

  blurb: ['Fast punk and doom share bills across the river. Heat, storms and a bar\'s wristband policy decide who gets in.',
          'A small city of carports and bar back rooms, where kids drive in from the west side and their parents wait in the lot.'],
  hard: 'Yard shows die at the first neighbor call, and bars card kids.',
  region: 'the Mid-South',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Memphis', state: 'TN', lat: 35.15, lon: -90.05 },
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.8 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 },
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Little Rock' },
    { id: 'sherwood-maumelle', kind: 'FEEDER', name: 'Sherwood and Maumelle', minutes: 20, bearing: 335, note: 'Suburbs of the same county; kids drive in.' },
    { id: 'jacksonville', kind: 'FEEDER', name: 'Jacksonville', minutes: 25, bearing: 25, note: 'A base town; airmen turn up at shows.' },
    { id: 'benton-bryant', kind: 'FEEDER', name: 'Benton and Bryant', minutes: 25, bearing: 225, note: 'Bedroom suburbs with high-school bands and little of their own.' },
    { id: 'cabot', kind: 'FEEDER', name: 'Cabot', minutes: 30, bearing: 15, note: 'A church-heavy commuter suburb.' },
    { id: 'conway', kind: 'FEEDER', name: 'Conway', minutes: 35, bearing: 320, note: 'The biggest feeder: two colleges and probably a small scene of its own.', bands: 2 },
    { id: 'pine-bluff', kind: 'FEEDER', name: 'Pine Bluff', minutes: 45, bearing: 150, note: 'A shrinking Delta mill and river town with little scene.' },
    { id: 'morrilton', kind: 'FEEDER', name: 'Morrilton', minutes: 50, bearing: 305, note: 'A small farm town along the interstate.' },
    { id: 'searcy', kind: 'FEEDER', name: 'Searcy', minutes: 55, bearing: 35, note: 'A conservative college town; kids drive down.' },
    { id: 'hot-springs', kind: 'FEEDER', name: 'Hot Springs', minutes: 60, bearing: 235, note: 'A spa and tourist town with its own bar and arts crowd.', bands: 2 },
    { id: 'russellville', kind: 'FEEDER', name: 'Russellville', minutes: 75, bearing: 310, note: 'A college town with a small scene.' },
    { id: 'fayetteville', kind: 'PEER', name: 'Fayetteville', minutes: 180, bearing: 325, slug: 'fayetteville-ar', note: 'The state\'s other main scene, up in the Ozarks, with a mild rivalry.' },
    { id: 'fort-smith', kind: 'PEER', name: 'Fort Smith', minutes: 135, bearing: 295, scene: 1200, note: 'A smaller river town on the Oklahoma border.' },
    { id: 'jonesboro', kind: 'PEER', name: 'Jonesboro', minutes: 120, bearing: 55, scene: 1000, note: 'A college town in the northeast corner of the state.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'A managed riverfront of offices, hotels and bars; expensive-ish, with churn, and no place for DIY.' },
    { id: 'soma', name: 'SoMa', route: 'downtown', note: 'Old brick storefronts south of downtown with bars and small art rooms; the up-and-coming strip, with rents rising and DIY pushed out.' },
    { id: 'argenta', name: 'Argenta in North Little Rock', route: 'downtown', note: 'An old town across the river with an arts-and-music main street; more bars and rising rents.' },
    { id: 'capitol-view', name: 'Capitol View', route: 'old-side', note: 'Small craftsman houses west of downtown with porches and yards; artists and students, slowly gentrifying.' },
    { id: 'hillcrest', name: 'Hillcrest and the Heights', route: 'old-side', note: 'Big old houses and a bar strip, wealthy-bohemian; neighbors call the police and the area is priced out.' },
    { id: 'quapaw-quarter', name: 'the Quapaw Quarter', route: 'old-side', note: 'Old Victorian houses east of downtown, mixed income and partly derelict; yards and porches, few basements.' },
    { id: 'midtown', name: 'Midtown', route: 'work-side', note: 'Strip malls, motels and rented duplexes with commercial-strip rooms and practice spaces; cheap and ignored.' },
    { id: 'southwest', name: 'Southwest Little Rock', route: 'work-side', note: 'Working-class neighborhoods, strip centers and warehouses; cheap industrial space, few scene residents.' },
    { id: 'west-little-rock', name: 'West Little Rock', route: 'campus', note: 'Suburban sprawl where kids grow up and drive in from; skateparks and church youth rooms, not shows.' }
  ],

  contacts: ['fayetteville-ar'],

  points: [
    { name: 'Memphis', state: 'TN', lat: 35.15, lon: -90.05, pop: 1300000 },
    { name: 'Hot Springs', state: 'AR', lat: 34.5, lon: -93.05, pop: 90000 },
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.8, pop: 7500000 },
    { name: 'Oklahoma City', state: 'OK', lat: 35.47, lon: -97.52, pop: 1400000 }
  ],
  roads: ['I-30', 'I-40', 'I-430', 'I-630', 'US 67', 'US 70'],

  words: {
    street: ['Markham', 'Cantrell', 'Kavanaugh', 'Asher', 'Baseline Road', 'Roosevelt Road'],
    water: ['the Arkansas River', 'Pinnacle Mountain'],
    hood: ['SoMa', 'Argenta', 'Capitol View', 'Hillcrest', 'Chenal Valley'],
    thing: ['cheese dip', 'carport', 'catfish', 'hushpuppy', 'sweet tea', 'ice storm', 'plate lunch', 'box fan', 'generator', 'bar back room', 'wristband', 'box fan', 'generator', 'bar back room', 'wristband'],
    weather: ['tornado watch', 'ice storm', 'thunderstorm']
  }
});
