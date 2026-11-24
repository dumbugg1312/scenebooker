SB.Cities.register('little-rock-ar', {
  v: 1,
  slug: 'little-rock-ar',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of arkansas', 'university of arkansas at little rock', 'ualr', 'uams', 'hendrix college', 'hendrix', 'razorback', 'razorbacks', 'go hogs',
           'arkansas times', 'arkansas democrat-gazette', 'democrat-gazette', 'riverfest', 'arkansas state fair', 'little rock marathon',
           'war memorial stadium', 'wildwood park', 'little rock air force base', 'camp robinson', 'river market', 'waffle house', 'cheerwine',
           'dr pepper', 'vfw', 'american legion', 'knights of columbus', 'foreign trade zone',
           'pulaski pavilion', 'the delta room', 'kavanaugh carport', 'asher annex', 'the cheese dip hall', 'post 213', 'the quapaw basement',
           'baseline garage', 'ouachita room', 'mile marker 6', 'the rock island shed', 'markham street back lot',
           'little rock rangers', 'drum corps international', 'katv', 'kuaf', 'arkansas online', 'arkansas business', 'talk business', 'encyclopedia of arkansas',
           'west 9th street', 'arkansas.com', 'littlerock.com', 'little rock family', 'little rock central high', 'central high'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['riverfest*', 'arkansas times*', 'democrat-gazette*', 'razorback*', 'waffle house*', 'cheerwine*', 'hendrix*'],

  blurb: ['Fast punk and doom share bills across the river, and heat, storms and a bar\'s wristband policy decide who gets in.',
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

  rooms: [
    { id: 'capitol-carport', kind: 'HOUSE', hood: 'capitol-view', cap: 40, curfew: 1320, ac: false, outdoor: true, pressure: 50, start: true,
      note: 'A carport on a craftsman block with the porch light on. One neighbor with a phone ends it.' },
    { id: 'quapaw-porch', kind: 'HOUSE', hood: 'quapaw-quarter', cap: 50, curfew: 1320, ac: false, outdoor: true, pressure: 45,
      note: 'A big porch and side yard on an old Victorian. The block is tolerant, but the house may be sold out from under it.' },
    { id: 'midtown-duplex', kind: 'HOUSE', hood: 'midtown', cap: 60, curfew: 1350, ac: false, pressure: 40,
      note: 'A duplex garage and back lot where nobody is home to complain. The landlord is the one to fear.' },
    { id: 'warehouse-bay', kind: 'DIY', hood: 'midtown', cap: 100, curfew: 1380, ac: false, pressure: 60,
      note: 'A bay in a strip-center warehouse with a bare stage. These rooms last a few years, then the fire inspector comes.' },
    { id: 'library-room', kind: 'HALL', hood: 'argenta', cap: 150, rent: 0, deposit: 0, curfew: 1230, ac: true,
      note: 'A public library meeting room across the river. Free, all ages, and the doors close early at a public building.' },
    { id: 'argenta-bar', kind: 'BAR', hood: 'argenta', cap: 200, ages: ['A21'], curfew: 1500, ac: true, pressure: 45,
      note: 'A bar with a back-room stage on the arts-and-music main street. Wristbands for the young, and rents are climbing.' },
    { id: 'soma-bar', kind: 'BAR', hood: 'soma', cap: 120, ages: ['A18', 'A21'], curfew: 1470, ac: true, pressure: 50,
      note: 'A brick storefront bar with a stage on the up-and-coming strip. The rents are pushing the loud bills out.' },
    { id: 'river-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['ALL'], curfew: 1380, ac: true, pressure: 55,
      note: 'A club in the riverfront district with hardcore and metal bills. The district curfew puts the kids out early.' },
    { id: 'brewpub-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['ALL'], curfew: 1380, ac: true, pressure: 35,
      note: 'An old brewpub-type club, all ages, home to the loud local bands for years. A long-lived room, not a DIY one.' },
    { id: 'big-hall', kind: 'BIG', hood: 'downtown', cap: 1500, ages: ['A18'], curfew: 1410, ac: true,
      note: 'A big hall with a 21-plus mezzanine that books national packages. Too big for locals, except as openers.' },
    { id: 'hillcrest-yard', kind: 'OUTDOOR', hood: 'hillcrest', cap: 60, curfew: 1290, pressure: 60,
      note: 'A backyard behind a big old house. The neighbors have money and call the police fast.' },
    { id: 'skatepark-lot', kind: 'OUTDOOR', hood: 'west-little-rock', cap: 80, curfew: 1260, pressure: 35,
      note: 'A skatepark or church lot on the west side. Kids only, with the parents waiting in the cars.' }
  ],

  contacts: ['fayetteville-ar', 'memphis', 'tulsa', 'shreveport-la', 'jackson-ms'],

  calendar: [
    { id: 'fair', label: 'the state fair', tag: 'fair', month: 10, weeks: [3, 4], dows: [3, 4, 5, 6], can: [.90, .85, .85] },
    { id: 'river-fest', label: 'the river festival weekend', tag: 'festival', month: 5, week: 4, dows: [4, 5, 6], can: [.85, .80, .80], hoods: ['downtown', 'argenta'], elsewhere: [1, .97, .97] },
    { id: 'marathon', label: 'marathon weekend', tag: 'race', month: 3, week: 1, dows: [5, 6], can: [.95, .92, .92], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'fourth', label: 'the Fourth of July', tag: 'holiday', month: 7, week: 1, dows: [0, 1, 2, 3, 4, 5, 6], can: [.90, .90, .88], hoods: ['downtown', 'argenta'], elsewhere: [.97, .97, .97] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [2, 4], dows: [5], can: [.90, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 2], dows: [5], can: [.90, .95, .95] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 2], dows: [5], can: [.90, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1320, weekend: 1320, inForce: true } },

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
  },

  events: [
    { id: 'LITTLE_ROCK_AR_FAIR_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The fair is in its second week and every kid under eighteen is at the fairgrounds past nine.',
      title: 'The fair takes the kids',
      body: 'The fair has run a week and a half. The rides are lit and the roads around the fairgrounds are jammed, and the city curfew for minors means the young ones have to choose.',
      options: [
        { id: 'EARLY', label: 'Start early so the kids can get home', likely: 'The kids who came get a short night, and the fair crowd stays away.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'You opened doors early and were out before the curfew, and the ones who came got a tight, loud set.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Half your regulars are on the midway.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The kids were at the fair, and the older regulars carried the floor.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'LITTLE_ROCK_AR_DISTRICT_CURFEW', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The entertainment district has a nine o\'clock curfew for minors, and the police are walking it.',
      title: 'Kids out by nine',
      body: 'The riverfront district clears everyone under eighteen at nine, and your all-ages bill has a headliner at ten and a floor of kids.',
      options: [
        { id: 'KIDS_FIRST', label: 'Put the youngest bands on first and clear them out', likely: 'The kids get their set, but the late crowd is adults only.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The kids played first and left by nine, and the headliner played to a thinner, older room.' },
        { id: 'HOUSE', label: 'Move the whole bill to a carport', likely: 'It\'s smaller, and nobody is carding at the gate.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A carport took the bill with an hour to spare, and it was crowded, loud and a little nervous about the neighbors.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'The kids leave mid-set.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The police came by at nine, and half the floor left with their parents mid-song.' }
      ] },

    { id: 'LITTLE_ROCK_AR_TORNADO_WATCH', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 35, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [3, 4, 5, 6, 7] },
      telegraph: 'A tornado watch is up for the whole county and the sky has gone green.',
      title: 'The sirens go off',
      body: 'The watch turned into a warning at seven. The carport is no shelter, the host is pointing at the bathroom, and the police are driving the block telling people to go home.',
      options: [
        { id: 'BATHROOM', label: 'Wait it out inside and play after', likely: 'It\'s late, damp and warm, and the ones who stay won\'t forget it.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'Thirty people sat in a hallway for an hour, and then you played a set by flashlight when the power came back.' },
        { id: 'CALL', label: 'Call it off and send everyone home', likely: 'It\'s safe, but the bands lose their gas money.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }, { op: 'MONEY', amount: -25 }],
          result: 'You called it off and moved it a day, and the bands got gas money out of your pocket.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Only the stubborn come.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }],
          result: 'The storm passed to the north, so it was a small crowd and a lot of mud.' }
      ] }
  ]
});
