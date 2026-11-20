SB.Cities.register('atlantic-city-nj', {
  v: 1,
  slug: 'atlantic-city-nj',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['stockton university', 'stockton', 'press of atlantic city', 'miss america', 'soar & shore airshow', 'soar and shore airshow', 'boardwalk hall', 'atlantic city rail line',
           'nj transit', 'new jersey transit', 'atlantic city weekly', 'juvenile curfew act', 'air national guard', 'coast guard training center', 'vfw', 'american legion',
           'ghost ship', 'white house sub shop', 'white house subs', 'rolling chair',
           'the brine room', 'brine room', 'back bay boathouse', 'windbreak', 'chelsea cold storage', 'the taffy room', 'taffy room', 'kentucky avenue annex',
           'ducktown social hall', 'the dry dock', 'pacific & pennsylvania', 'pacific and pennsylvania', 'bungalow 9', 'the jitney stop', 'mid-island roller rink'],
  /* Banned holds the dossier's real institutions and its invented venue names (unchecked). The pageant and the air show are written only generically. */
  blocklist: ['press of atlantic city*', 'stockton*', 'boardwalk hall*', 'miss america*', 'white house sub*', 'windbreak*', 'brine room*'],

  blurb: ['A casino resort on a barrier island where cover bands rule the lounges, so an original punk show is the odd one out.',
          'The real shows hide in mainland garages or come as rare big events by the Boardwalk. The kids who start bands come over the bridge or down the Expressway.'],
  hard: 'Few all-ages rooms, a teen curfew, and a cover-band town.',
  region: 'the Jersey Shore',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Atlantic City' },
    { id: 'pleasantville', kind: 'FEEDER', name: 'Pleasantville', minutes: 5, bearing: 295, note: 'The working-class mainland neighbor where many casino workers and teenagers live.' },
    { id: 'absecon', kind: 'FEEDER', name: 'Absecon', minutes: 10, bearing: 320, note: 'A small suburb with basements; a likely source of teen bands.' },
    { id: 'egg-harbor', kind: 'FEEDER', name: 'Egg Harbor Township', minutes: 15, bearing: 255, note: 'Big suburban sprawl and the largest feeder by population.' },
    { id: 'brigantine', kind: 'FEEDER', name: 'Brigantine', minutes: 15, bearing: 20, note: 'A small residential beach island over the bridge.' },
    { id: 'galloway', kind: 'FEEDER', name: 'Galloway', minutes: 20, bearing: 320, note: 'A spread-out suburb with a college campus.' },
    { id: 'somers-point', kind: 'FEEDER', name: 'Somers Point and Linwood', minutes: 20, bearing: 235, note: 'Bayside shore suburbs with a bar-heavy waterfront.' },
    { id: 'mays-landing', kind: 'FEEDER', name: 'Mays Landing', minutes: 25, bearing: 275, note: 'The small county seat, with a community college nearby.' },
    { id: 'ocean-city', kind: 'FEEDER', name: 'Ocean City', minutes: 30, bearing: 215, note: 'A dry family resort town; the classic punk kid in a dry town.' },
    { id: 'hammonton', kind: 'FEEDER', name: 'Hammonton', minutes: 35, bearing: 290, note: 'A farm town on the train line out to Philadelphia.' },
    { id: 'tuckerton', kind: 'FEEDER', name: 'Tuckerton and Manahawkin', minutes: 50, bearing: 40, note: 'Bay-shore towns up the Parkway with a surf and skate crowd.' },
    { id: 'vineland', kind: 'PEER', name: 'Vineland and Millville', minutes: 55, bearing: 245, scene: 500, note: 'Farm and glass towns with their own hardcore and metal history.' },
    { id: 'trenton', kind: 'PEER', name: 'Trenton', minutes: 90, bearing: 330, slug: 'trenton-nj', note: 'A forgotten post-industrial city with the same underdog feel.' },
    { id: 'wilmington-de', kind: 'PEER', name: 'Wilmington', state: 'DE', minutes: 95, bearing: 265, scene: 700, note: 'A similar-sized underdog city down the road.' },
    { id: 'asbury-park', kind: 'PEER', name: 'Asbury Park', minutes: 85, bearing: 10, scene: 700, note: 'The other boardwalk town, with a music-history identity of its own.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Boardwalk blocks', route: 'downtown', note: 'The avenues behind the Boardwalk: old storefronts, small hotels and the heaviest policing in the state.' },
    { id: 'inlet', name: 'the Inlet', route: 'old-side', note: 'The far northeast end, residential and cut off; church halls, community centers and a few houses.' },
    { id: 'ducktown', name: 'Ducktown', route: 'old-side', note: 'The old Italian-American rowhouse neighborhood by the Expressway; tolerant if a show ends early.' },
    { id: 'westside', name: 'the Westside', route: 'work-side', note: 'A historic Black neighborhood of rowhouses and churches; church halls and community rooms.' },
    { id: 'chelsea', name: 'Chelsea and Chelsea Heights', route: 'old-side', note: 'The southwest end: single-family houses, driveways, yards and condo neighbors who complain.' },
    { id: 'venice-park', name: 'Venice Park and Bungalow Park', route: 'work-side', note: 'Quiet bayfront houses with older owners; flood-exposed, a source of garages more than shows.' },
    { id: 'marina', name: 'the Marina District', route: 'downtown', note: 'Bay-side casino hotels and marinas; no place for DIY, but its shifts run everyone\'s week.' },
    { id: 'mainland', name: 'the mainland towns across the bay', route: 'campus', note: 'Pleasantville, Absecon and Galloway: basements, a college campus and the kids who start the bands.' }
  ],

  contacts: ['trenton-nj', 'philadelphia'],

  points: [
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17, pop: 1600000 },
    { name: 'Camden', state: 'NJ', lat: 39.93, lon: -75.12, pop: 71000 },
    { name: 'Cherry Hill', state: 'NJ', lat: 39.93, lon: -75.03, pop: 74000 },
    { name: 'Cape May', state: 'NJ', lat: 38.94, lon: -74.91, pop: 2800 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01, pop: 8300000 }
  ],
  roads: ['Atlantic City Expressway', 'Garden State Parkway', 'Route 30', 'Route 40', 'Route 9'],

  words: {
    street: ['Atlantic Avenue', 'Pacific Avenue', 'Arctic Avenue', 'Baltic Avenue', 'Kentucky Avenue', 'Oriental Avenue', 'Absecon Boulevard', 'Black Horse Pike'],
    water: ['Absecon Inlet', 'Absecon Bay', 'Great Bay', 'the Intracoastal'],
    hood: ['the Inlet', 'Ducktown', 'Chelsea', 'Venice Park', 'Bungalow Park', 'the Westside', 'the Marina District'],
    thing: ['jitney', 'salt water taffy', 'Italian sub', 'storm tide', 'neon sign', 'boardwalk fries', 'beach tag', 'casino lounge', 'parking deck', 'curfew siren'],
    weather: ['nor\'easter', 'storm tide', 'sea fog']
  }
});
