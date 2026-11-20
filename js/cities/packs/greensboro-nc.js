SB.Cities.register('greensboro-nc', {
  v: 1,
  slug: 'greensboro-nc',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['unc greensboro', 'uncg', 'north carolina a&t', 'a&t', 'aggies', 'central carolina fair', 'first friday', 'first fridays', 'north carolina folk festival',
           'fun fourth', 'north carolina comedy festival', 'winter wonderlights', 'sedgefield', 'acc tournament', 'greensboro transit authority', 'news & record',
           'yes! weekly', 'triad city beat', 'carolina peacemaker', 'wqfs', 'wuag', 'wnaa', 'cook out', 'cheerwine', 'waffle house', 'fedex',
           'piedmont triad international', 'amtrak', 'fort bragg', 'fort liberty', 'high point market', 'vfw', 'american legion',
           'the piety hill annex', 'gate city garage', 'mill pond social hall', 'the kudzu room', 'spring garden carport', 'boro hardware',
           'the lowe lot warehouse', 'dogwood fellowship hall', 'lindley lot', 'the wendover annex', 'freight door hall', 'carolina hosiery loft'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['cook out*', 'news & record*', 'yes! weekly*', 'triad city beat*', 'uncg*', 'a&t*', 'central carolina fair*', 'waffle house*'],

  blurb: ['A flat, tree-covered Piedmont city built on textiles, tobacco and rail, the biggest of the three Triad cities, with two big universities and a small downtown that was hollowed out and partly revived.',
          'Two universities feed the porches and carports, but the crowd turns over every four years. Everyone needs a car, shows are found rather than stumbled on, and rooms open and shut every few years as leases rise.'],
  hard: 'A fill-date town: no late transit, thin all-ages, easy for bands to skip.',
  region: 'the Piedmont',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 },
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Greensboro' },
    { id: 'high-point', kind: 'FEEDER', name: 'High Point', minutes: 20, bearing: 240, pop: 114000, note: 'A furniture-market twin to the southwest with a smaller scene of its own.' },
    { id: 'kernersville', kind: 'FEEDER', name: 'Kernersville', minutes: 25, bearing: 285, note: 'A suburb on the interstate between Greensboro and Winston-Salem.' },
    { id: 'burlington', kind: 'FEEDER', name: 'Burlington, Graham, Mebane and Elon', minutes: 30, bearing: 85, note: 'A former textile town and its neighbors to the east, with a small scene and a private university.' },
    { id: 'reidsville', kind: 'FEEDER', name: 'Reidsville', minutes: 30, bearing: 10, note: 'A tobacco and mill town up the highway; no known scene.' },
    { id: 'thomasville', kind: 'FEEDER', name: 'Thomasville and Lexington', minutes: 30, bearing: 220, note: 'Furniture and barbecue towns down the interstate.' },
    { id: 'asheboro', kind: 'FEEDER', name: 'Asheboro', minutes: 45, bearing: 195, note: 'A hosiery and zoo town in the hills to the south with a small scene.' },
    { id: 'eden', kind: 'FEEDER', name: 'Eden', minutes: 45, bearing: 15, note: 'A mill town where two rivers meet; the mall is closed.' },
    { id: 'salisbury', kind: 'FEEDER', name: 'Salisbury', minutes: 50, bearing: 215, note: 'A small college town down the interstate.' },
    { id: 'mount-airy', kind: 'FEEDER', name: 'Mount Airy', minutes: 70, bearing: 320, note: 'A small old-time music and granite town by the Virginia line.' },
    { id: 'winston-salem', kind: 'PEER', name: 'Winston-Salem', minutes: 35, bearing: 270, slug: 'winston-salem-nc', note: 'The twin sister city: friendly rivals who swap bands and fans.' },
    { id: 'durham', kind: 'PEER', name: 'Durham', minutes: 60, bearing: 100, slug: 'durham-nc', note: 'The scene most likely to take Greensboro bands.' },
    { id: 'fayetteville', kind: 'PEER', name: 'Fayetteville', minutes: 105, bearing: 150, slug: 'fayetteville-nc', note: 'A military town with a harder-edged crowd.' },
    { id: 'richmond', kind: 'PEER', name: 'Richmond', state: 'VA', minutes: 175, bearing: 20, slug: 'richmond', note: 'A comparable city with real touring exchange.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Elm Street core', route: 'downtown', note: 'Old brick blocks, bars, old theaters and lofts. Heating up and expensive: a DIY room here is a short-lease gamble.' },
    { id: 'southside', name: 'Southside', route: 'downtown', note: 'The old rail-edge district, mostly redeveloped into townhomes. Gentrified; little left to book.' },
    { id: 'college-hill', name: 'College Hill and Tate Street', route: 'campus', note: 'The old hilltop neighborhood by the university: big rental houses with porches, coffee shops, a historic district and neighbors who call.' },
    { id: 'lindley-park', name: 'Lindley Park and Spring Garden', route: 'campus', note: 'Bungalows south and west of campus, mixing students, artists and long-time residents. House shows and noise complaints.' },
    { id: 'glenwood', name: 'Glenwood', route: 'old-side', note: 'Small houses and church spaces, Black, white and Latino working-class. Yard shows; cheap and partly heating.' },
    { id: 'east-side', name: 'the east side and East Market Street', route: 'old-side', note: 'Black, working-class neighborhoods around the big state university. Church halls, rec centers and step-show culture; a booker who skips this half of town is missing half the city.' },
    { id: 'gate-city', name: 'Gate City Boulevard and the arena corridor', route: 'work-side', note: 'Motels, chains and a huge arena. Event days wreck the parking; nothing DIY.' },
    { id: 'mill-south', name: 'the south and southwest mill neighborhoods', route: 'work-side', note: 'Old mill villages, warehouses and rail yards. Practice units and the odd warehouse show; cheap, but developers are buying.' },
    { id: 'north-side', name: 'the north side and Battleground Avenue', route: 'campus', note: 'Rich suburbs and big churches. The bands\' parents live here; the teenagers with cars come from here.' }
  ],

  contacts: ['winston-salem-nc', 'durham-nc', 'asheville-nc', 'fayetteville-nc', 'richmond'],

  points: [
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64, pop: 470000 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 875000 },
    { name: 'Chapel Hill', state: 'NC', lat: 35.91, lon: -79.06, pop: 61000 },
    { name: 'Danville', state: 'VA', lat: 36.59, lon: -79.40, pop: 42000 },
    { name: 'Boone', state: 'NC', lat: 36.22, lon: -81.67, pop: 19000 }
  ],
  roads: ['I-40', 'I-85', 'I-73', 'US 29', 'US 220', 'the Loop'],

  words: {
    street: ['Elm Street', 'Tate Street', 'Spring Garden', 'Market Street', 'Gate City Boulevard', 'Wendover Avenue', 'Battleground Avenue', 'Randleman Road'],
    water: ['Lake Brandt', 'Buffalo Creek', 'the Haw River'],
    hood: ['College Hill', 'Lindley Park', 'Glenwood', 'Southside', 'Friendly', 'Lawndale', 'Mendenhall'],
    thing: ['carport', 'mill house', 'sweet tea', 'barbecue', 'kudzu', 'crawlspace', 'porch', 'practice space', 'milkshake run'],
    weather: ['ice storm', 'thunderstorm', 'humidity']
  }
});
