SB.Cities.register('wilmington-nc', {
  v: 1,
  slug: 'wilmington-nc',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['unc wilmington', 'uncw', 'unc pembroke', 'cape fear community college', 'east carolina university', 'camp lejeune', 'fort bragg',
           'azalea festival', 'holiday flotilla', 'cucalorus', 'riverfest', 'seahawks', 'starnews', 'star-news', 'port city daily', 'whqr', 'wave transit',
           'cape fear public transportation authority', 'cook out', 'waffle house', 'bojangles', 'biscuitville', 'cheerwine', 'sun drop',
           'hurricane florence', 'wilmywood', 'battleship north carolina', 'uss north carolina', 'vfw', 'american legion',
           'the carport at shipyard', 'marl pit hall', 'pogie row annex', 'spanish moss room', 'number nine fellowship hall', 'brickyard loft',
           'monkey junction roller rink', 'the fisher street garage', 'cape lot 14', 'vinegar slab pizza', 'the dry dock back porch', 'salt marsh social hall'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The storm is written only as 'the storm' in game text. */
  blocklist: ['uncw*', 'starnews*', 'port city daily*', 'cucalorus*', 'azalea festival*', 'cook out*', 'marl pit*', 'pogie row*'],

  blurb: ['A Cape Fear River port city squeezed between the river and the Atlantic beaches, where hardcore, indie, metal and folk-punk share bills because there is not enough of any one.',
          'Rooms rise and fall with the lease, the school year and the next named storm.'],
  hard: 'A two-hour detour, no basements, and a storm season.',
  region: 'the Carolina coast',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64 },
    { name: 'Charleston', state: 'SC', lat: 32.78, lon: -79.93 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Wilmington' },
    { id: 'leland', kind: 'FEEDER', name: 'Leland, Belville and Navassa', minutes: 15, bearing: 295, note: 'Fast-growing subdivisions just over the bridge; kids with no scene of their own come in.' },
    { id: 'hampstead', kind: 'FEEDER', name: 'Hampstead', minutes: 30, bearing: 15, note: 'A beach-adjacent suburb up US 17. Teens drive to town.' },
    { id: 'burgaw', kind: 'FEEDER', name: 'Burgaw', minutes: 30, bearing: 340, note: 'A small county seat with a band or two.' },
    { id: 'southport', kind: 'FEEDER', name: 'Southport and Oak Island', minutes: 40, bearing: 190, note: 'Fishing and retiree beach towns with little scene.' },
    { id: 'wallace', kind: 'FEEDER', name: 'Wallace and Warsaw', minutes: 45, bearing: 355, note: 'Farm country up I-40. Kids drive in.' },
    { id: 'shallotte', kind: 'FEEDER', name: 'Shallotte and Calabash', minutes: 50, bearing: 235, note: 'Beach and retiree towns near the South Carolina line.' },
    { id: 'topsail', kind: 'FEEDER', name: 'Surf City and Topsail Island', minutes: 50, bearing: 35, note: 'A summer beach crowd that is empty off-season.' },
    { id: 'elizabethtown', kind: 'FEEDER', name: 'Elizabethtown', minutes: 55, bearing: 315, note: 'A small river town to the northwest.' },
    { id: 'whiteville', kind: 'FEEDER', name: 'Whiteville', minutes: 60, bearing: 280, note: 'A rural county seat west on US 74; kids make the drive.' },
    { id: 'jacksonville', kind: 'PEER', name: 'Jacksonville', minutes: 70, bearing: 25, scene: 1500, note: 'A young military town up the road with a punk and metal streak.' },
    { id: 'myrtle-beach', kind: 'PEER', name: 'Myrtle Beach', state: 'SC', minutes: 95, bearing: 225, slug: 'myrtle-beach-sc', note: 'A tourist strip with a small DIY scene whose bands come up US 17.' },
    { id: 'fayetteville', kind: 'PEER', name: 'Fayetteville', minutes: 100, bearing: 330, slug: 'fayetteville-nc', note: 'A larger Army town that trades heavy and hardcore bands.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Brick storefronts and a riverwalk full of bars, tourists and students. Priced for anyone but DIY; every room lives on a permit and a landlord with other offers.' },
    { id: 'brooklyn', name: 'the Brooklyn arts district', route: 'old-side', note: 'Old warehouses and studios just north of downtown, home to the film and artist crowd. Heating up and getting priced out.' },
    { id: 'southside', name: 'the Southside and Carolina Beach Road', route: 'work-side', note: 'Working-class houses, auto shops and small warehouses running south to Monkey Junction. Garages, carports and practice units.' },
    { id: 'midtown', name: 'Midtown and Wrightsville Avenue', route: 'old-side', note: 'Mid-century ranch houses and motels between downtown and the beach, where working musicians rent. A candidate for the next price jump.' },
    { id: 'college-road', name: 'College Road and the campus side', route: 'campus', note: 'Student apartment complexes and rentals around the university. Complexes shut parties down fast.' },
    { id: 'inner-ring', name: 'Greenfield Lake and Forest Hills', route: 'old-side', note: 'Quiet tree-lined bungalow streets where neighbors call in noise quickly. Porch and small backyard shows.' },
    { id: 'castle-hayne', name: 'Castle Hayne and the north county', route: 'work-side', note: 'Industrial lots, acreage and big yards up toward the airport. Cheap, with generator and field shows.' },
    { id: 'over-the-bridge', name: 'across the river', route: 'campus', note: 'New subdivisions in the next county where many workers now live. Strict HOAs.' }
  ],

  contacts: ['myrtle-beach-sc', 'fayetteville-nc', 'durham-nc'],

  points: [
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64, pop: 470000 },
    { name: 'Charleston', state: 'SC', lat: 32.78, lon: -79.93, pop: 150000 },
    { name: 'Greenville', state: 'NC', lat: 35.61, lon: -77.37, pop: 90000 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 880000 },
    { name: 'Florence', state: 'SC', lat: 34.20, lon: -79.76, pop: 40000 }
  ],
  roads: ['I-40', 'I-140', 'US 17', 'US 74', 'US 421', 'Oleander Drive'],

  words: {
    street: ['Market Street', 'Princess Street', 'Front Street', 'Oleander Drive', 'College Road', 'Carolina Beach Road', 'Shipyard Boulevard', 'Castle Street'],
    water: ['the Cape Fear', 'the Cape Fear River', 'Greenfield Lake', 'Wrightsville Beach'],
    hood: ['Brooklyn', 'Southside', 'Midtown', 'Castle Hayne', 'Forest Hills', 'Sunset Park', 'Monkey Junction', 'Wrightsville Beach', 'Carolina Beach'],
    thing: ['carport', 'live oak', 'shrimp boat', 'hush puppy', 'boiled peanuts', 'sweet tea', 'screened porch', 'extension cord', 'sandy yard', 'taproom', 'storage unit'],
    weather: ['tropical storm watch', 'pollen', 'humidity', 'afternoon thunderstorm']
  }
});
