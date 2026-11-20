SB.Cities.register('durham-nc', {
  v: 1,
  slug: 'durham-nc',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['duke', 'duke university', 'duke health', 'duke basketball', 'unc', 'unc chapel hill', 'university of north carolina', 'nc state', 'nccu',
           'north carolina central university', 'research triangle park', 'rtp', 'american tobacco', 'brightleaf', 'streets at southpoint', 'southpoint',
           'durham bulls', 'herald-sun', 'news & observer', 'news and observer', 'indy week', 'moogfest', 'full frame', 'godurham', 'cheerwine', 'sun drop',
           'cook out', 'bojangles', 'biscuitville', 'waffle house', 'fort bragg', 'fort liberty', 'acc tournament', 'dukies', 'tar heels', 'bull city',
           'bull durham', 'american legion', 'vfw',
           'the pollen room', 'carport nineteen', 'orchard street annex', 'st. delphine\'s fellowship hall', 'the slaw cellar', 'mill house number six',
           'bright leaf back lot', 'the yellow dust', 'cold biscuit hall', 'post 4410 hall', 'the spare warehouse', 'holloway street garage'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real institutions are written only in generic form. */
  blocklist: ['unc*', 'nccu*', 'cook out*', 'waffle house*', 'bull city*', 'indy week*', 'the pollen room*'],

  blurb: ['Small, political and queer-friendly. Screamo, grind and hardcore share bills, and a benefit night is the normal kind of show.',
          'Old-timers tell squat stories. The kids fill the downtown club, and a promoter, a band member and the door person are the same three people.'],
  hard: 'Few cheap rooms are left. Club nights are 18+ and houses vanish to rent.',
  region: 'the Piedmont',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'emo', d: 0.06, reason: 'Screamo and skramz bills sit at the center of this scene.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Durham' },
    { id: 'chapel-hill', kind: 'FEEDER', name: 'Chapel Hill and Carrboro', minutes: 20, bearing: 235, note: 'A college town and its arty neighbor: more a sister scene, its kids drive over constantly.', bands: 4 },
    { id: 'raleigh', kind: 'FEEDER', name: 'Raleigh', minutes: 30, bearing: 125, scene: 900, note: 'The state capital next door: the nearest trading partner, and the corporate cousin.', bands: 5 },
    { id: 'hillsborough', kind: 'FEEDER', name: 'Hillsborough', minutes: 25, bearing: 305, pop: 9000, note: 'A small historic county seat of artists and farms with a little music scene.', bands: 1 },
    { id: 'mebane', kind: 'FEEDER', name: 'Mebane', minutes: 30, bearing: 295, pop: 18000, note: 'A suburban outlet and furniture town with no scene I can name.' },
    { id: 'oxford', kind: 'FEEDER', name: 'Oxford', minutes: 35, bearing: 15, pop: 8500, note: 'A small farm and tobacco town up I-85.' },
    { id: 'burlington', kind: 'FEEDER', name: 'Burlington and Graham', minutes: 40, bearing: 285, pop: 60000, note: 'A textile city whose kids drive forty minutes to Durham for a show.' },
    { id: 'pittsboro', kind: 'FEEDER', name: 'Pittsboro', minutes: 40, bearing: 215, note: 'A rural-arts county seat with a small scene of its own.', bands: 1 },
    { id: 'roxboro', kind: 'FEEDER', name: 'Roxboro', minutes: 40, bearing: 5, pop: 8000, note: 'Tobacco and farm country; kids head to Durham for anything with a PA.' },
    { id: 'sanford', kind: 'FEEDER', name: 'Sanford', minutes: 50, bearing: 205, pop: 30000, note: 'A brick and industrial town that feeds Raleigh and Durham.' },
    { id: 'greensboro', kind: 'PEER', name: 'Greensboro', minutes: 60, bearing: 275, slug: 'greensboro-nc', note: 'A mill and furniture city with a real DIY tradition and cheaper houses.' },
    { id: 'fayetteville', kind: 'PEER', name: 'Fayetteville', minutes: 75, bearing: 185, slug: 'fayetteville-nc', note: 'A military town whose punk kids come up for bigger bills.' },
    { id: 'winston-salem', kind: 'PEER', name: 'Winston-Salem', minutes: 85, bearing: 275, slug: 'winston-salem-nc', note: 'An arts-school town with moderate trade.' },
    { id: 'richmond', kind: 'PEER', name: 'Richmond', state: 'VA', minutes: 135, bearing: 5, slug: 'richmond', note: 'A well-known DIY town on the same tour line; two-way traffic.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Former tobacco warehouses turned offices, restaurants and condos; polished, and a long way from cheap.' },
    { id: 'old-north', name: 'Old North Durham and Trinity Park', route: 'old-side', note: 'Big old porch houses near the old campus; the pricey side of town and a rougher north edge.' },
    { id: 'walltown', name: 'Walltown and Northgate Park', route: 'old-side', note: 'A historically Black working-class neighborhood now gentrifying, beside older streets of small houses.' },
    { id: 'west-durham', name: 'Old West Durham', route: 'old-side', note: 'A former textile mill village of rowhouses and the converted mill itself; porches, cellars and rentals.' },
    { id: 'east-durham', name: 'East Durham', route: 'work-side', note: 'Historically working-class and Black mill villages along Holloway; converted hosiery buildings and cheap space.' },
    { id: 'hayti', name: 'Hayti and the south side', route: 'work-side', note: 'A historic Black community cut by the freeway in the 1960s; a few small clubs and cultural spaces, little punk.' },
    { id: 'lakewood', name: 'Lakewood and the Hillsborough Road corridor', route: 'work-side', note: 'Small ranch houses, strip malls and light-industrial lots; cheap practice rooms.' },
    { id: 'north-durham', name: 'North Durham and Bragtown', route: 'campus', note: 'Older suburban strips and cheap apartments along Roxboro Road; ignored.' }
  ],

  contacts: ['greensboro-nc', 'richmond', 'fayetteville-nc', 'wilmington-nc'],

  points: [
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64, pop: 470000 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 880000 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04, pop: 690000 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 500000 }
  ],
  roads: ['I-85', 'I-40', 'NC 147', 'US 15-501', 'US 70', 'US 501'],

  words: {
    street: ['Holloway Street', 'Roxboro Road', 'Chapel Hill Road', 'Hillsborough Road', 'Angier Avenue', 'Driver Street', 'Erwin Road', 'Ninth Street'],
    water: ['Ellerbe Creek', 'Falls Lake', 'Jordan Lake', 'the Eno'],
    hood: ['Old North Durham', 'Trinity Park', 'Walltown', 'Northgate Park', 'Watts-Hillandale', 'Old West Durham', 'East Durham', 'Hayti', 'Lakewood', 'Bragtown'],
    thing: ['mill house', 'tobacco barn', 'pimento cheese', 'biscuit', 'sweet tea', 'pollen', 'porch', 'benefit show', 'zine table', 'donation jar', 'group chat'],
    weather: ['pollen', 'humidity', 'ice storm']
  }
});
