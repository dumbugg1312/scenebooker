SB.Cities.register('hickory-nc', {
  v: 1,
  slug: 'hickory-nc',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['lenoir-rhyne', 'lenoir rhyne', 'western piedmont community college', 'catawba valley community college', 'appalachian state', 'app state',
           'hickory daily record', 'hickory oktoberfest', 'oktoberfest', 'high point market', 'crawdads', 'hickory crawdads',
           'hickory motor speedway', 'waffle house', 'cook out', 'bojangles', 'hardee\'s', 'biscuitville', 'cheerwine', 'sun drop', 'fort bragg',
           'camp lejeune', 'vfw', 'american legion', 'elks', 'moose lodge', 'knights of columbus', 'the spindle room', 'hosiery hall',
           'catawba cutting floor', 'union square annex', 'the dip shed', 'showroom 9', 'cable yard', 'lake landing hall', 'mill village rec', 'veneer'],
  /* Dossier institutions and its unchecked invented venue names are banned: research, not content. */
  blocklist: ['lenoir-rhyne*', 'hickory daily record*', 'cheerwine*', 'bojangles*', 'spindle room*', 'hosiery hall*', 'cutting floor*', 'third shift*'],

  blurb: ['Mill-town punk in carports, church halls and one stubborn back room. Everyone drives; everyone knows everyone.',
          'Few rooms, many cousins. A show here lives or dies on one landlord and one neighbor.'],
  hard: 'One or two rooms, no transit, and a noise complaint ends your night.',
  region: 'the Piedmont',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 },
    { name: 'Asheville', state: 'NC', lat: 35.6, lon: -82.55 },
    { name: 'Winston-Salem', state: 'NC', lat: 36.1, lon: -80.24 },
    { name: 'Greensboro', state: 'NC', lat: 36.07, lon: -79.79 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Hickory' },
    { id: 'conover', kind: 'FEEDER', name: 'Newton and Conover', minutes: 10, bearing: 100, note: 'Mill and furniture towns that are effectively the same metro; Conover is the more industrial.' },
    { id: 'longview', kind: 'FEEDER', name: 'Longview and Claremont', minutes: 10, bearing: 80, note: 'Mill villages and suburbs on the edge of town.' },
    { id: 'maiden', kind: 'FEEDER', name: 'Maiden and Catawba', minutes: 20, bearing: 150, note: 'Farm and mill villages.' },
    { id: 'granite-falls', kind: 'FEEDER', name: 'Granite Falls', minutes: 20, bearing: 345, note: 'A small furniture and textile town on NC 18.' },
    { id: 'lenoir', kind: 'FEEDER', name: 'Lenoir', minutes: 30, bearing: 340, note: 'A bigger furniture town up US 321; probably a few bands.', bands: 2 },
    { id: 'morganton', kind: 'FEEDER', name: 'Morganton', minutes: 35, bearing: 275, note: 'A small city west on I-40 with a community college.' },
    { id: 'taylorsville', kind: 'FEEDER', name: 'Taylorsville', minutes: 30, bearing: 15, note: 'A rural county seat.' },
    { id: 'statesville', kind: 'FEEDER', name: 'Statesville', minutes: 35, bearing: 120, note: 'A mid-size town east on I-40; more peer than feeder.' },
    { id: 'lincolnton', kind: 'FEEDER', name: 'Lincolnton', minutes: 40, bearing: 170, note: 'A small mill town down NC 16.' },
    { id: 'wilkesboro', kind: 'FEEDER', name: 'Wilkesboro and North Wilkesboro', minutes: 50, bearing: 20, note: 'Small, rural and racing-minded.' },
    { id: 'marion', kind: 'FEEDER', name: 'Marion', minutes: 50, bearing: 285, note: 'A small town at the foot of the mountains.' },
    { id: 'boone', kind: 'PEER', name: 'Boone', minutes: 60, bearing: 330, scene: 900, note: 'The cooler college town with a much bigger scene; kids go up, a few come down.' },
    { id: 'winston-salem', kind: 'PEER', name: 'Winston-Salem', minutes: 75, bearing: 65, slug: 'winston-salem-nc', note: 'Bigger, east on I-40.' },
    { id: 'asheville', kind: 'PEER', name: 'Asheville', minutes: 80, bearing: 262, slug: 'asheville-nc', note: 'A different league over the mountains; the tour partner to the west.' },
    { id: 'spartanburg', kind: 'PEER', name: 'Spartanburg', minutes: 100, bearing: 235, slug: 'spartanburg-sc', note: 'A mill-town cousin to the south.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Union Square', route: 'downtown', note: 'A renovated rail-line center of breweries and restaurants; priced for visitors, hard on DIY.' },
    { id: 'kenworth', name: 'Kenworth and the close-in streets', route: 'old-side', note: 'Older houses and a few brick buildings near downtown; quiet and cheap, with neighbors as the limit.' },
    { id: 'ridgeview', name: 'Ridgeview', route: 'old-side', note: 'A historically Black neighborhood on the south side with its own civic history; not a venue district.' },
    { id: 'strips', name: 'the Highland and US 321 strips', route: 'campus', note: 'Strip malls, chains and a mall; where the kids actually hang out and rent a unit.' },
    { id: 'fairgrove', name: 'Fairgrove by the university', route: 'campus', note: 'Student rentals and a small bar-and-pizza pocket that empties in summer.' },
    { id: 'viewmont', name: 'Viewmont and the mill villages', route: 'work-side', note: 'Small frame mill houses with yards and carports; the best chance for a house show.' },
    { id: 'lake', name: 'Lake Hickory and the Catawba River', route: 'old-side', note: 'Lake houses and boat landings; backyard and bonfire shows.' },
    { id: 'edge-towns', name: 'the old plants out in the edge towns', route: 'work-side', note: 'Empty furniture and hosiery plants; the realistic warehouse show if the fire marshal does not come.' }
  ],

  contacts: ['asheville-nc', 'winston-salem-nc', 'greensboro-nc', 'spartanburg-sc'],

  points: [
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 2700000 },
    { name: 'Knoxville', state: 'TN', lat: 35.96, lon: -83.92, pop: 870000 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64, pop: 1500000 },
    { name: 'Gastonia', state: 'NC', lat: 35.26, lon: -81.19, pop: 80000 }
  ],
  roads: ['I-40', 'US 321', 'US 70', 'NC 16', 'NC 127', 'NC 18'],

  words: {
    street: ['US 70', 'Highway 321', 'Springs Road', 'Main Avenue', 'Highland Avenue'],
    water: ['Lake Hickory', 'the Catawba River', 'Lake Rhodhiss'],
    hood: ['Kenworth', 'Ridgeview', 'Viewmont', 'Highland', 'Fairgrove', 'Longview', 'Claremont'],
    thing: ['carport', 'hushpuppy', 'red slaw', 'vinegar barbecue', 'hosiery mill', 'furniture showroom', 'fellowship hall', 'tractor supply', 'drive-through', 'couch factory'],
    weather: ['thunderstorm', 'ice storm', 'red clay mud']
  }
});
