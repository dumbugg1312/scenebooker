SB.Cities.register('sarasota-fl', {
  v: 1,
  slug: 'sarasota-fl',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of south florida sarasota-manatee', 'state college of florida', 'new college of florida', 'ringling college of art and design',
           'university of south florida', 'usf', 'sarasota herald-tribune', 'herald-tribune', 'sarasota magazine', 'creative loafing', 'tampa bay times', 'wusf',
           'wwsb', 'sarasota film festival', 'ringling museum', 'ringling bros', 'tampa bay rays', 'tampa bay buccaneers', 'tampa bay lightning',
           'sarasota sailors', 'baltimore orioles', 'atlanta braves', 'sarasota memorial hospital', 'publix', 'sarasota jungle gardens', 'selby gardens',
           'hurricane ian', 'hurricane helene', 'hurricane milton', 'hurricane charley', 'macdill air force base', 'sarasota bradenton international airport',
           'waffle house', 'amtrak'],
  blocklist: ['herald-tribune*', 'ringling*', 'selby gardens*', 'sarasota jungle*', 'creative loafing*'],

  blurb: ['Retirees, beaches and bay condos on top, a few punk houses and warehouse nights underneath.',
          'Most of the audience drives in from Bradenton.'],
  hard: 'Small crowd, noise-averse retirees, and Tampa is an hour up the road.',
  region: 'the Gulf Coast',
  houseType: 'LIVING_ROOM',
  whereGo: [
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46 },
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Sarasota' },
    { id: 'bradenton', kind: 'FEEDER', name: 'Bradenton', minutes: 20, bearing: 15, note: 'The closest cheaper city. Some bands live here.' },
    { id: 'lakewood-ranch', kind: 'FEEDER', name: 'Lakewood Ranch', minutes: 20, bearing: 70, note: 'A new wealthy suburb with teens and no venues.' },
    { id: 'palmetto', kind: 'FEEDER', name: 'Palmetto and Ellenton', minutes: 25, bearing: 5, note: 'Working-class towns along the river.' },
    { id: 'venice', kind: 'FEEDER', name: 'Venice', minutes: 30, bearing: 170, note: 'Retirees and a few teens who drive north.' },
    { id: 'north-port', kind: 'FEEDER', name: 'North Port', minutes: 40, bearing: 150, note: 'Young-family sprawl. Kids with no local rooms.' },
    { id: 'englewood', kind: 'FEEDER', name: 'Englewood', minutes: 45, bearing: 180, note: 'A beach and trailer-park mix.' },
    { id: 'punta-gorda', kind: 'FEEDER', name: 'Punta Gorda', minutes: 55, bearing: 160, note: 'Small and older.' },
    { id: 'fort-myers', kind: 'PEER', name: 'Fort Myers', minutes: 75, bearing: 155, scene: 1200, note: 'A Gulf Coast city of similar size with some DIY.' },
    { id: 'lakeland', kind: 'PEER', name: 'Lakeland', minutes: 90, bearing: 60, slug: 'lakeland-fl', note: 'A smaller inland town.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Rosemary District', route: 'downtown', note: 'Bars, galleries and new condos. A brunch crowd with few rooms for loud bands.' },
    { id: 'gillespie-park', name: 'Gillespie Park', route: 'old-side', note: 'Small old bungalows near the center. House-show territory.' },
    { id: 'newtown', name: 'Newtown', route: 'old-side', note: 'A historic Black neighborhood north of downtown under redevelopment pressure. Not a scene area.' },
    { id: 'laurel-park', name: 'Laurel Park', route: 'old-side', note: 'Older cottages near the bay. Noise-sensitive.' },
    { id: 'siesta-key', name: 'Siesta Key', route: 'downtown', note: 'A beach town of tourists and bar bands, with little DIY.' },
    { id: 'fruitville', name: 'the Fruitville corridor', route: 'work-side', note: 'Warehouses and light industrial. Where practice spaces and warehouse nights fit.' },
    { id: 'gulf-gate', name: 'Palmer Ranch and Gulf Gate', route: 'campus', note: 'Suburban sprawl with young families and kids with cars.' },
    { id: 'bradenton-main', name: 'old Bradenton and 14th Street', route: 'work-side', note: 'Cheaper, older and more working class than Sarasota.' }
  ],

  contacts: ['lakeland-fl', 'tampa', 'naples-fl'],
  points: [
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46, pop: 400000 },
    { name: 'St. Petersburg', state: 'FL', lat: 27.77, lon: -82.64, pop: 260000 },
    { name: 'Fort Myers', state: 'FL', lat: 26.64, lon: -81.87, pop: 95000 },
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38, pop: 307000 }
  ],
  roads: ['I-75', 'US 41', 'the Tamiami Trail', 'Fruitville Road', 'Bee Ridge Road'],

  words: {
    street: ['Fruitville Road', 'Osprey Avenue', 'Tamiami Trail', 'Bee Ridge Road', 'Washington Boulevard', 'Main Street'],
    water: ['Sarasota Bay', 'the Manatee River', 'Roberts Bay'],
    hood: ['Gillespie Park', 'Laurel Park', 'Newtown', 'Southside Village', 'Siesta Key', 'Gulf Gate'],
    thing: ['snowbird', 'lanai', 'retention pond', 'causeway', 'storage unit'],
    weather: ['afternoon thunderstorm', 'hurricane warning']
  }
});
