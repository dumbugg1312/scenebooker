SB.Cities.register('greenville-sc', {
  v: 1,
  slug: 'greenville-sc',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['clemson university', 'clemson tigers', 'furman university', 'furman', 'bob jones university', 'north greenville university', 'greenville technical college',
           'greenville news', 'upstate business journal', 'fox carolina', 'wyff', 'wspa', 'wfbc', 'greenville drive', 'south carolina gamecocks', 'gamecocks', 'bmw',
           'michelin', 'ge vernova', 'prisma health', 'bon secours', 'bi-lo', 'bon secours wellness arena', 'peace center', 'fluor', 'bmw manufacturing', 'euphoria',
           'artisphere', 'fall for greenville', 'hurricane hugo', 'falls park', 'metal monday', 'swamp rabbit trail'],
  blocklist: ['greenville news*', 'peace center*', 'euphoria greenville*', 'artisphere*', 'bon secours*', 'fall for greenville*'],

  blurb: ['Mill-town suburbs under the foothills, where grind and sludge crowd the same dive bars as a fast-growing hardcore night.',
          'Halfway between Atlanta and Charlotte, and it feels it. Few colleges, a polished downtown and a church lot next to every show.'],
  hard: 'Few colleges, liquor-liability costs and a church-heavy calendar.',
  region: 'the Southeast',
  houseType: 'LIVING_ROOM',
  whereGo: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 }
  ],

  tilt: [
    { fan: 'metal', band: 'metal', d: .08, reason: 'A working-class death, grind and sludge underground runs deep here.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Greenville' },
    { id: 'greer', kind: 'FEEDER', name: 'Greer', minutes: 20, bearing: 60, note: 'A suburb toward Spartanburg. Bar shows and a few bands.' },
    { id: 'lyman', kind: 'FEEDER', name: 'Lyman and Duncan', minutes: 25, bearing: 55, note: 'East bedroom towns.' },
    { id: 'easley', kind: 'FEEDER', name: 'Easley and Pickens', minutes: 25, bearing: 290, note: 'Foothills towns with teen bands.' },
    { id: 'anderson', kind: 'FEEDER', name: 'Anderson', minutes: 35, bearing: 215, note: 'A small city of churches and factories. Kids drive in.' },
    { id: 'clemson', kind: 'FEEDER', name: 'Clemson', minutes: 40, bearing: 270, note: 'A university town with its own separate house scene.' },
    { id: 'laurens', kind: 'FEEDER', name: 'Laurens', minutes: 40, bearing: 170, note: 'A mill town south.' },
    { id: 'seneca', kind: 'FEEDER', name: 'Seneca and Walhalla', minutes: 55, bearing: 285, note: 'Mountain-edge towns.' },
    { id: 'spartanburg', kind: 'PEER', name: 'Spartanburg', minutes: 40, bearing: 55, slug: 'spartanburg-sc', note: 'A smaller scene next door.' },
    { id: 'asheville', kind: 'PEER', name: 'Asheville', state: 'NC', minutes: 70, bearing: 335, slug: 'asheville-nc', note: 'Arty, with a bigger pull.' },
    { id: 'athens', kind: 'PEER', name: 'Athens', state: 'GA', minutes: 100, bearing: 245, slug: 'athens-ga', note: 'A college town across the state line.' },
    { id: 'columbia', kind: 'PEER', name: 'Columbia', minutes: 105, bearing: 155, slug: 'columbia-sc', note: 'Where the early metalcore wave came from.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Main Street', route: 'downtown', note: 'Tourist restaurants and a few music rooms. Not the punk end.' },
    { id: 'west-end', name: 'the West End', route: 'downtown', note: 'An old warehouse and mill district west of downtown. Rock clubs and dive bars.' },
    { id: 'augusta-road', name: 'Augusta Road and Overbrook', route: 'old-side', note: 'Older bungalows and thrift stores.' },
    { id: 'berea', name: 'Berea and Poe Mill', route: 'work-side', note: 'Old mill villages, cheap rent and some house shows.' },
    { id: 'taylors', name: 'Taylors', route: 'work-side', note: 'An east side strip of bars and arcades.' },
    { id: 'sans-souci', name: 'Sans Souci and Parker', route: 'work-side', note: 'Lower-income mill village flats.' },
    { id: 'judson', name: 'Judson and Woodside', route: 'work-side', note: 'Mill neighborhoods near the river.' },
    { id: 'travelers-rest', name: 'Travelers Rest', route: 'campus', note: 'A north bedroom town on the greenway. Arty and full of cyclists.' },
    { id: 'mauldin', name: 'Mauldin and Simpsonville', route: 'campus', note: 'Big suburbs to the south. Kids who drive.' }
  ],

  points: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 6400000 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 2938830 },
    { name: 'Asheville', state: 'NC', lat: 35.57, lon: -82.55, pop: 422345 },
    { name: 'Columbia', state: 'SC', lat: 34.04, lon: -80.91, pop: 879918 }
  ],
  roads: ['I-85', 'I-385', 'I-185', 'Wade Hampton Boulevard', 'Pleasantburg Drive', 'White Horse Road'],

  words: {
    street: ['Main Street', 'Pleasantburg Drive', 'Wade Hampton Boulevard', 'Augusta Road', 'White Horse Road', 'Laurens Road'],
    water: ['the Reedy', 'Lake Keowee', 'the Saluda'],
    hood: ['the West End', 'Berea', 'Poe Mill', 'Taylors', 'Travelers Rest', 'Mauldin', 'Sans Souci', 'Overbrook'],
    thing: ['mill village', 'pollen', 'kudzu', 'screened porch', 'greenway', 'church lot', 'car plant shift'],
    weather: ['pollen', 'ice storm', 'tropical remnant']
  },

  events: [
    { id: 'GREENVILLE_SC_INSURANCE_LETTER', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 6] },
      telegraph: 'The bar owner has been quiet about the all-ages nights.',
      title: 'The insurance letter',
      body: 'A letter came from the bar\'s insurer this week and the owner would not say what it said. Now the owner wants a word before doors.',
      options: [
        { id: 'ADULTS', label: 'Make it 21 and up this once', likely: 'Keeps the room. Locks out the kids.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The kids waited outside and some of them left. The bar kept you on the calendar.' },
        { id: 'PAY', label: 'Cover the extra cost yourself', likely: 'Costs fifty dollars.',
          effects: [{ op: 'MONEY', amount: -50 }, { op: 'REGULARS', pct: .02 }],
          result: 'The owner took the cash and kept the door open for everyone.' },
        { id: 'MOVE', label: 'Take it to a living room', likely: 'Smaller. Fewer rules. A church lot next door.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A mill village house took the whole bill. The screened porch was the green room.' }
      ] }
  ]
});
