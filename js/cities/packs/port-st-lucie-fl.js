SB.Cities.register('port-st-lucie-fl', {
  v: 1,
  slug: 'port-st-lucie-fl',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['general development corporation', 'core communities', 'mets', 'new york mets', 'tcpalm', 'stuart news', 'fort pierce tribune', 'vero beach press journal',
           'wptv', 'publix', 'pub sub', 'waffle house', 'brightline', 'greyhound', 'vfw', 'american legion', 'elks', 'hurricane frances', 'hurricane jeanne',
           'hurricane milton', 'frances', 'jeanne', 'milton', 'pineapple festival', 'indian river state college', 'seminole brighton', 'brighton reservation',
           'gators', 'seminoles', 'dolphins', 'the swale', 'section 21 annex', 'lanai room', 'canal street carport', 'palmetto plaza unit 9', 'the snowbird lounge',
           'lot 40 hall', 'cashmere garage', 'mangrove back room', 'the retention pond', 'sandhill rec', 'bayshore annex',
           'st. lucie county fair', 'st lucie county fair', 'midflorida event center', 'clover park', 'river nights', 'friday fest', 'marina square', 'psl irish festival', 'freedom fest', 'festival of lights', 'treasure coast caribbean food and music festival', 'fort pierce punk rock flea market', 'treasure coast tattoo art expo', 'emo night treasure coast', 'macaroni kid', 'bandsintown', 'eventbrite', 'humanitix', 'gigsalad', 'thebash', 'visit st. lucie', 'cityofpsl', 'treasurecoast.com', 'wlrn', 'miami new times', 'creative loafing', 'st. lucie county fairgrounds', 'treasure coast theatre'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The storms are written only as 'the storm' in game text. */
  blocklist: ['tcpalm*', 'publix*', 'waffle house*', 'pineapple festival*', 'general development*', 'wptv*', 'st. lucie county fair*', 'midflorida event center*', 'macaroni kid*'],

  blurb: ['A fast-growing Treasure Coast city of platted ranch-house lots, canals and six-lane boulevards, with no center and nothing walkable.',
          'Nobody here has a basement, so shows are in carports and garages. Storms and neighbors run the calendar, and every kid needs a ride.'],
  hard: 'Every kid needs a ride, and the only rooms are borrowed carports.',
  region: 'the Treasure Coast',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'West Palm Beach', state: 'FL', lat: 26.72, lon: -80.05 },
    { name: 'Miami', state: 'FL', lat: 25.76, lon: -80.19 },
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38 },
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Port St. Lucie' },
    { id: 'fort-pierce', kind: 'FEEDER', name: 'Fort Pierce', minutes: 20, bearing: 340, note: 'The county seat to the north, with an old waterfront downtown and the nearest bars and small music culture.' },
    { id: 'jensen-beach', kind: 'FEEDER', name: 'Jensen Beach and Hutchinson Island', minutes: 20, bearing: 100, note: 'A beach town across the river; surf and skate kids.' },
    { id: 'stuart', kind: 'FEEDER', name: 'Stuart', minutes: 25, bearing: 165, note: 'The wealthy boat-and-river town to the south, with a pretty downtown and a few bars.' },
    { id: 'palm-city', kind: 'FEEDER', name: 'Palm City and Port Salerno', minutes: 30, bearing: 185, note: 'A suburb and a fishing village to the south.' },
    { id: 'vero-beach', kind: 'FEEDER', name: 'Vero Beach', minutes: 35, bearing: 330, note: 'A wealthy beachside town with a rural mainland and a small scene.' },
    { id: 'indiantown', kind: 'FEEDER', name: 'Indiantown', minutes: 35, bearing: 220, note: 'A small farm-worker and utility town with almost no scene.' },
    { id: 'hobe-sound', kind: 'FEEDER', name: 'Hobe Sound and Jupiter', minutes: 45, bearing: 160, note: 'Wealthy beach towns to the south; Jupiter is closer to West Palm.' },
    { id: 'sebastian', kind: 'FEEDER', name: 'Sebastian', minutes: 50, bearing: 335, note: 'A fishing and retiree town to the north. Small.' },
    { id: 'okeechobee', kind: 'FEEDER', name: 'Okeechobee', minutes: 55, bearing: 295, note: 'A cattle and lake-fishing town west on SR 70. Little scene, but good for a generator show.' },
    { id: 'west-palm', kind: 'PEER', name: 'West Palm Beach', minutes: 60, bearing: 170, note: 'The cultural magnet to the south, with real venues and a bigger scene. Port St. Lucie kids go south to play.' },
    { id: 'melbourne', kind: 'PEER', name: 'Palm Bay and Melbourne', minutes: 75, bearing: 350, note: 'The Space Coast to the north, with a scene that overlaps a little.' },
    { id: 'fort-lauderdale', kind: 'PEER', name: 'Fort Lauderdale', minutes: 100, bearing: 175, note: 'South Florida\'s big hardcore, punk and metal scene lives down here.' }
  ],

  hoods: [
    { id: 'sections', name: 'the old sections around Port St. Lucie Boulevard', route: 'old-side', note: 'The oldest platted blocks: cheap block ranch houses on canals with big carports and garages. The likeliest place for a carport show.' },
    { id: 'us1', name: 'the US 1 corridor', route: 'downtown', note: 'Older storefronts, pawn shops and small plazas with cheap flex units, mixed and mostly ignored.' },
    { id: 'st-lucie-west', name: 'St. Lucie West', route: 'campus', note: 'A suburban office-and-retail hub with newer houses, chain restaurants and a stadium. Strip-center units; not cheap.' },
    { id: 'tradition', name: 'Tradition and Southern Grove', route: 'campus', note: 'The newest and most expensive master-planned district out west. Young families; some flex space at the edge.' },
    { id: 'southwest', name: 'Southwest Port St. Lucie', route: 'work-side', note: 'The 2000s boom ring of mid-priced subdivisions, hard hit by foreclosures. Garages and backyards.' },
    { id: 'north-county', name: 'Lakewood Park and White City', route: 'work-side', note: 'Unincorporated lots toward Fort Pierce, with barns, big yards and a rural feel.' },
    { id: 'fort-pierce-hood', name: 'downtown Fort Pierce', route: 'downtown', note: 'The nearest walkable core, with bars and old storefronts, where the local night life actually happens.' }
  ],

  contacts: [{ name: 'West Palm Beach', state: 'FL', lat: 26.72, lon: -80.05 }, 'palm-bay-fl', 'miami', 'orlando', 'lakeland-fl'],

  calendar: [
    { id: 'fair-feb', label: 'the county fair', tag: 'fair', month: 2, week: 4, dows: [4, 5, 6], can: [.85, .88, .90], hoods: ['fort-pierce-hood', 'north-county'], elsewhere: [.95, .95, .95] },
    { id: 'fair-mar', label: 'the county fair', tag: 'fair', month: 3, weeks: [1, 2], dows: [4, 5, 6], can: [.85, .88, .90], hoods: ['fort-pierce-hood', 'north-county'], elsewhere: [.95, .95, .95] },
    { id: 'spring-street', label: 'the spring street festival', tag: 'festival', month: 3, week: 2, dows: [5], can: [.90, .92, .95], hoods: ['st-lucie-west'], elsewhere: [1, 1, 1] },
    { id: 'fourth', label: 'the Fourth of July party', tag: 'holiday', month: 7, week: 1, dows: [4, 5, 6], can: [.70, .75, .80] },
    { id: 'light-parade', label: 'the holiday parade and lights', tag: 'parade', month: 12, weeks: [1, 2], dows: [5, 6], can: [.88, .90, .93], hoods: ['st-lucie-west', 'fort-pierce-hood'], elsewhere: [1, .97, .97] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'West Palm Beach', state: 'FL', lat: 26.72, lon: -80.05, pop: 120000 },
    { name: 'Fort Lauderdale', state: 'FL', lat: 26.12, lon: -80.14, pop: 180000 },
    { name: 'Miami', state: 'FL', lat: 25.76, lon: -80.19, pop: 450000 },
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38, pop: 310000 },
    { name: 'Melbourne', state: 'FL', lat: 28.08, lon: -80.61, pop: 85000 }
  ],
  roads: ['I-95', 'US 1', 'the Turnpike', 'Gatlin Boulevard', 'Becker Road', 'SR 70'],

  words: {
    street: ['US 1', 'Gatlin Boulevard', 'Becker Road', 'Port St. Lucie Boulevard', 'Prima Vista Boulevard', 'Floresta Drive', 'Cashmere Boulevard', 'Southbend Boulevard'],
    water: ['the North Fork', 'the St. Lucie River', 'the Indian River', 'the Intracoastal'],
    hood: ['St. Lucie West', 'Tradition', 'Southern Grove', 'Lakewood Park', 'White City', 'Hutchinson Island', 'Jensen Beach'],
    thing: ['carport', 'lanai', 'swale', 'canal', 'retention pond', 'snowbird', 'love bugs', 'generator', 'strip plaza', 'tarp', 'six-lane road'],
    weather: ['afternoon thunderstorm', 'storm watch', 'humidity']
  }
});
