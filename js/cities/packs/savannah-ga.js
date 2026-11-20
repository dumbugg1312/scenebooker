SB.Cities.register('savannah-ga', {
  v: 1,
  slug: 'savannah-ga',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['scad', 'savannah college of art and design', 'savannah film festival', 'savannah music festival', 'georgia southern', 'savannah state',
           'armstrong state', 'armstrong', 'hunter army airfield', 'fort stewart', 'fort eisenhower', 'hyundai', 'st. patrick\'s day parade',
           'savannah morning news', 'connect savannah', 'wtoc', 'wsav', 'whcj', 'savannah bananas', 'waffle house', 'tybee pirate fest',
           'pirate fest', 'oktoberfest on the river', 'georgia-florida', 'marine corps air station', 'parris island', 'mighty eighth', 'tabby hall',
           'the lane house social', 'lane house social', 'marsh hen social club', 'shed no. 9', 'low tide roller rink', 'legion post 441',
           'skidaway skate barn', 'pier and piling', 'ossabaw room', 'haint blue garage', 'live oak carport', 'vfw', 'american legion'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['scad*', 'savannah college*', 'connect savannah*', 'savannah morning*', 'hunter army*', 'fort stewart*', 'savannah bananas*', 'waffle house*'],

  blurb: ['Art kids, service workers and suburban kids share backyards and back rooms under live oaks.',
          'Heat, gnats and rental-house neighbors set the schedule, and most tours skip the town.'],
  hard: 'Short-term-rental neighbors call it in and most tours skip the town.',
  region: 'the Lowcountry',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Jacksonville', state: 'FL', lat: 30.33, lon: -81.66 },
    { name: 'Charleston', state: 'SC', lat: 32.78, lon: -79.93 },
    { name: 'Athens', state: 'GA', lat: 33.96, lon: -83.38 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Savannah' },
    { id: 'pooler', kind: 'FEEDER', name: 'Pooler', minutes: 20, bearing: 295, note: 'A fast-growing retail and warehouse suburb with no scene of its own.' },
    { id: 'richmond-hill', kind: 'FEEDER', name: 'Richmond Hill', minutes: 30, bearing: 210, note: 'A booming south-county suburb of new houses; the kids drive in.' },
    { id: 'rincon', kind: 'FEEDER', name: 'Rincon and Springfield', minutes: 30, bearing: 325, note: 'Church-heavy bedroom and rural towns up the county road, with an informal scene.' },
    { id: 'hinesville', kind: 'FEEDER', name: 'Hinesville', minutes: 45, bearing: 235, note: 'A base town whose crowd empties and refills with deployments.' },
    { id: 'hilton-head', kind: 'FEEDER', name: 'Hilton Head, Bluffton and Hardeeville', state: 'SC', minutes: 45, bearing: 30, note: 'Resort and retiree money, with working-class service kids on the cheaper edges.' },
    { id: 'claxton', kind: 'FEEDER', name: 'Claxton and Metter', minutes: 55, bearing: 275, note: 'Farm towns west on the old highway; kids drive in for what they cannot have at home.' },
    { id: 'statesboro', kind: 'FEEDER', name: 'Statesboro', minutes: 60, bearing: 310, note: 'A college town with a small music scene of its own; the likeliest two-way trade.' },
    { id: 'beaufort', kind: 'FEEDER', name: 'Beaufort', state: 'SC', minutes: 60, bearing: 35, note: 'A quiet Lowcountry shrimping and tourist town beside two Marine bases.' },
    { id: 'brunswick', kind: 'FEEDER', name: 'Brunswick', minutes: 75, bearing: 190, note: 'A port and shipyard town on the south coast that has had a scene of its own.' },
    { id: 'charleston', kind: 'PEER', name: 'Charleston', state: 'SC', minutes: 105, bearing: 55, slug: 'charleston-sc', note: 'The natural trade partner and tourist-town rival up the coast.' },
    { id: 'augusta', kind: 'PEER', name: 'Augusta', minutes: 135, bearing: 320, slug: 'augusta-ga', note: 'An inland base city; a different Georgia, and less of a touring stop.' },
    { id: 'macon', kind: 'PEER', name: 'Macon', minutes: 160, bearing: 295, scene: 250, note: 'A smaller, cheaper city at the far end of the interstate most Georgia tours use.' }
  ],

  hoods: [
    { id: 'landmark', name: 'the Historic District', route: 'downtown', note: 'The squares and the river bluff: tourists, hotels, bars and row houses with garden-level rooms. Too expensive for DIY and full of complaining neighbors.' },
    { id: 'victorian', name: 'the Victorian District and Forsyth', route: 'old-side', note: 'Wooden Victorian houses split into apartments around the big park. Porch and house shows, with renters who will tolerate them.' },
    { id: 'thomas-square', name: 'Thomas Square and Midtown', route: 'old-side', note: 'Frame houses, corner stores and mixed streets south of the Victorian blocks. The old cheap place for artists and musicians, now getting priced.' },
    { id: 'starland', name: 'Starland', route: 'downtown', note: 'Old buildings turned into an arts district around Bull Street. The nearest thing to an artsy-punk neighborhood: shop, backyard and warehouse shows.' },
    { id: 'west-savannah', name: 'West Savannah and Cuyler-Brownville', route: 'work-side', note: 'Historic Black working-class streets, vacant lots and industrial buildings. Not a place to treat as an empty blank for punk.' },
    { id: 'southside', name: 'the Southside', route: 'campus', note: 'Strip malls, apartments and a branch campus along Abercorn Street. Where most suburban kids live. Rented plaza rooms and bowling alleys.' },
    { id: 'islands', name: 'the Islands and Tybee', route: 'old-side', note: 'Marsh-edge towns and a beach island east on Highway 80. Beach-bar shows and outdoor shows, and the road floods.' },
    { id: 'port-wentworth', name: 'Garden City and Port Wentworth', route: 'work-side', note: 'Warehouse and trucking towns around the port. Cheap commercial space and practice rooms.' }
  ],

  contacts: ['charleston-sc', 'augusta-ga', 'columbia-sc'],

  points: [
    { name: 'Jacksonville', state: 'FL', lat: 30.33, lon: -81.66, pop: 950000 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 500000 },
    { name: 'Macon', state: 'GA', lat: 32.84, lon: -83.63, pop: 157000 },
    { name: 'Hilton Head Island', state: 'SC', lat: 32.22, lon: -80.75, pop: 38000 }
  ],
  roads: ['I-95', 'I-16', 'I-516', 'US 17', 'US 80', 'US 301'],

  words: {
    street: ['Abercorn Street', 'Bull Street', 'Victory Drive', 'Skidaway Road', 'Waters Avenue', 'Highway 80', 'Montgomery Street'],
    water: ['the Savannah River', 'Wilmington River', 'Ossabaw Sound', 'Tybee Creek'],
    hood: ['Starland', 'Thomas Square', 'Thunderbolt', 'Isle of Hope', 'Wilmington Island', 'Whitemarsh', 'Tybee', 'Cuyler-Brownville', 'Forsyth Park', 'Garden City'],
    thing: ['live oak', 'Spanish moss', 'lane house', 'porch', 'gnat', 'tabby wall', 'shrimp boat', 'carport', 'haint blue ceiling', 'generator', 'alley load-in', 'garden-level room', 'bar back room', 'ghost tour'],
    weather: ['heat index', 'afternoon thunderstorm', 'king tide', 'evacuation route']
  }
});
