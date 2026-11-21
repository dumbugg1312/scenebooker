SB.Cities.register('miami', {
  v: 1,
  slug: 'miami',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of miami', 'florida international university', 'fiu', 'miami dade college', 'florida atlantic university', 'nova southeastern university',
           'miami new times', 'miami herald', 'sun sentinel', 'broward palm beach new times', 'wlrn', 'wsvn', 'wplg', 'miami heat', 'miami dolphins',
           'florida panthers', 'miami marlins', 'inter miami', 'miami open', 'miami grand prix', 'art basel', 'ultra music festival', 'calle ocho festival',
           'port of miami', 'portmiami', 'miami international airport', 'carnival cruise line', 'baptist health', 'jackson memorial hospital',
           'hurricane andrew', 'hurricane irma', 'hurricane ian', 'hurricane milton', 'homestead air reserve base', 'southcom', 'miami beach convention center',
           'sunpass', 'metrorail', 'metromover', 'brightline', 'publix', 'waffle house', 'amtrak'],
  blocklist: ['miami new times*', 'miami herald*', 'sun sentinel*', 'art basel*', 'ultra music*', 'sunpass*', 'brightline*'],

  blurb: ['Warehouses, house shows and one long-running punk bar in a huge, spread-out metro.',
          'Rooms open fast and close faster, and everybody drives an hour.'],
  hard: 'Spaces keep getting shut or sold, and the audience is an hour of traffic away.',
  region: 'South Florida',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38 },
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'Hardcore fests and halls keep coming back around.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Miami' },
    { id: 'hialeah', kind: 'FEEDER', name: 'Hialeah', minutes: 20, bearing: 340, note: 'A big working-class city. Kids drive in.' },
    { id: 'miami-gardens', kind: 'FEEDER', name: 'Miami Gardens and Opa-locka', minutes: 25, bearing: 340, note: 'Working-class towns to the north.' },
    { id: 'kendall', kind: 'FEEDER', name: 'Kendall and Cutler Bay', minutes: 25, bearing: 220, note: 'Suburban kids.' },
    { id: 'hollywood', kind: 'FEEDER', name: 'Hollywood', minutes: 30, bearing: 5, note: 'In Broward, and it shares the audience.' },
    { id: 'pembroke-pines', kind: 'FEEDER', name: 'Pembroke Pines and Miramar', minutes: 35, bearing: 350, note: 'A big suburban family belt.' },
    { id: 'homestead', kind: 'FEEDER', name: 'Homestead', minutes: 40, bearing: 200, note: 'Far south in farm country. Kids and bands, a long drive.' },
    { id: 'keys', kind: 'FEEDER', name: 'Key Largo and the Keys', minutes: 70, bearing: 190, note: 'A few bands and few kids.' },
    { id: 'fort-lauderdale', kind: 'PEER', name: 'Fort Lauderdale', minutes: 45, bearing: 5, scene: 2500, note: 'Its own bars and its own scene up in Broward.' },
    { id: 'west-palm', kind: 'PEER', name: 'West Palm Beach', minutes: 75, bearing: 350, scene: 1500, note: 'Smaller, with its own scene.' },
    { id: 'naples', kind: 'PEER', name: 'Naples', minutes: 120, bearing: 320, slug: 'naples-fl', note: 'Wealthy, and the scene is thin.' }
  ],

  hoods: [
    { id: 'little-havana', name: 'Little Havana', route: 'old-side', note: 'The older Cuban neighborhood: small houses and shops near downtown.' },
    { id: 'allapattah', name: 'Allapattah', route: 'work-side', note: 'Warehouses and wholesale. It has hosted collective-run DIY spaces and all-ages halls.' },
    { id: 'wynwood', name: 'Wynwood', route: 'downtown', note: 'Old warehouses turned galleries, bars and murals. Tourist-priced now.' },
    { id: 'little-haiti', name: 'Little Haiti and the Design District', route: 'work-side', note: 'Redeveloping fast.' },
    { id: 'overtown', name: 'Overtown and downtown', route: 'downtown', note: 'Bars, arenas and towers. A punk space here was torn down for a car lot.' },
    { id: 'doral', name: 'Doral', route: 'campus', note: 'A warehouse and strip-mall belt near the airport. It hosted an all-ages squat-style space.' },
    { id: 'kendall-hood', name: 'Kendall and Westchester', route: 'campus', note: 'Suburbs where many kids live and drive in.' },
    { id: 'hialeah-hood', name: 'Hialeah', route: 'work-side', note: 'Industrial, working class and mostly Cuban. Kids and bands.' },
    { id: 'miami-beach', name: 'Miami Beach', route: 'downtown', note: 'The tourist strip. Bars, not DIY.' },
    { id: 'coral-gables', name: 'Coral Gables and Coconut Grove', route: 'old-side', note: 'Affluent and tree-lined. Not a scene base.' }
  ],

  contacts: ['naples-fl'],
  points: [
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38, pop: 307000 },
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46, pop: 400000 },
    { name: 'Fort Myers', state: 'FL', lat: 26.64, lon: -81.87, pop: 95000 },
    { name: 'Key West', state: 'FL', lat: 24.56, lon: -81.78, pop: 25000 }
  ],
  roads: ['I-95', 'the Turnpike', 'SR 836', 'SR 826', 'NW 36th Street', 'Flagler Street'],

  words: {
    street: ['Flagler Street', 'Biscayne Boulevard', 'NW 7th Avenue', 'Calle Ocho', 'Collins Avenue', 'NW 36th Street'],
    water: ['Biscayne Bay', 'the Miami River', 'the Intracoastal'],
    hood: ['Little Havana', 'Allapattah', 'Wynwood', 'Little Haiti', 'Overtown', 'Doral', 'Hialeah', 'Westchester'],
    thing: ['expressway', 'causeway', 'hurricane shutters', 'toll', 'cafecito'],
    weather: ['afternoon thunderstorm', 'king tide']
  }
});
