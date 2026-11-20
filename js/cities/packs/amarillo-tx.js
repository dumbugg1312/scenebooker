SB.Cities.register('amarillo-tx', {
  v: 1,
  slug: 'amarillo-tx',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['pantex', 'bnsf', 'amarillo college', 'texas tech', 'west texas a&m', 'wtamu', 'buffalos', 'sod poodles', 'texas route 66 festival', 'route 66 festival',
           'cattle drive and parade', 'tri-state fair', 'tri-state fair and rodeo', 'hoodoo mural festival', 'international film festival', 'world championship ranch rodeo',
           'cannon air force base', 'houston chronicle', 'anarchy in amarillo', 'whataburger', 'braum\'s', 'braums', 'dairy queen', 'sonic', 'rosa\'s', 'shiner', 'lone star',
           'dr pepper', 'big red', 'topo chico', 'vfw', 'american legion', 'tecate', 'dos equis',
           'the shelterbelt', 'shelterbelt', 'caliche hall', 'the playa room', 'playa room', 'the section line', 'the cattle guard', 'the helium room', 'feedyard annex',
           'hail damage', 'slab on grade', 'the sod house', 'mesquite lot', 'plains fraternal hall'],
  /* Banned holds the dossier's real institutions and its invented venue names (unchecked). Storms and events are written generically. */
  blocklist: ['whataburger*', 'braum*', 'sod poodles*', 'tri-state fair*', 'shelterbelt*', 'caliche hall*'],

  blurb: ['Big sky, few rooms. This flat Panhandle city keeps rising and nearly vanishing, and the scene lives in record stores, backyards and carports.',
          'Cover bands get the paid slots, so originals play early, for free, to whoever drove in. The wind decides the outdoor ones.'],
  hard: 'Few rooms, long drives, and bars that only want cover bands.',
  region: 'the High Plains',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.8 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 },
    { name: 'Oklahoma City', state: 'OK', lat: 35.47, lon: -97.52 },
    { name: 'Albuquerque', state: 'NM', lat: 35.08, lon: -106.65 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Amarillo' },
    { id: 'canyon', kind: 'FEEDER', name: 'Canyon', minutes: 20, bearing: 190, note: 'A university town with a tiny college scene of its own.', bands: 1 },
    { id: 'hereford', kind: 'FEEDER', name: 'Hereford', minutes: 50, bearing: 220, note: 'Cattle and feedlot town with a small garage scene.' },
    { id: 'pampa', kind: 'FEEDER', name: 'Pampa', minutes: 55, bearing: 85, note: 'Oil and ranch town; small garage and metal kids.' },
    { id: 'dumas', kind: 'FEEDER', name: 'Dumas', minutes: 50, bearing: 340, note: 'A meatpacking and farm town; its scene is unknown.' },
    { id: 'borger', kind: 'FEEDER', name: 'Borger', minutes: 55, bearing: 25, note: 'A refinery town with a grim reputation and a few garage bands.' },
    { id: 'tulia', kind: 'FEEDER', name: 'Tulia', minutes: 45, bearing: 185, note: 'A farm town with no scene; kids drive up.' },
    { id: 'dalhart', kind: 'FEEDER', name: 'Dalhart', minutes: 75, bearing: 330, note: 'A ranch town; the occasional kid makes the drive.' },
    { id: 'clovis', kind: 'PEER', name: 'Clovis', state: 'NM', minutes: 105, bearing: 255, scene: 300, note: 'A base and railroad town with its own small punk and metal crowd; real two-way trade.' },
    { id: 'lubbock', kind: 'PEER', name: 'Lubbock', minutes: 120, bearing: 185, slug: 'lubbock-tx', note: 'The big student scene two hours south on the interstate.' },
    { id: 'wichita-falls', kind: 'PEER', name: 'Wichita Falls', minutes: 175, bearing: 120, scene: 400, note: 'A far peer at the end of the southeast highway.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'A small grid of bars and event rooms around the ballpark; rents are climbing and the noise complaints with them.' },
    { id: 'san-jacinto', name: 'San Jacinto and Sixth Avenue', route: 'old-side', note: 'Old highway storefronts, antique shops and modest historic houses; the likeliest place for a short-lived storefront room.' },
    { id: 'the-barrio', name: 'the Barrio', route: 'work-side', note: 'Old family neighborhood by the railroad; shows mean a garage or a hall, not a bar.' },
    { id: 'plemons-eakle', name: 'Plemons-Eakle and Sunset Terrace', route: 'old-side', note: 'Craftsman bungalows full of young renters; the likeliest punk house blocks.' },
    { id: 'north-heights', name: 'North Heights', route: 'work-side', note: 'Cheap, church-centered, with a lot of vacant lots and community halls.' },
    { id: 'amarillo-boulevard', name: 'Amarillo Boulevard', route: 'work-side', note: 'Old motel row and strip buildings; the cheapest commercial rent, with police attention the risk.' },
    { id: 'southwest', name: 'the southwest side', route: 'campus', note: 'New subdivisions and chain strips where band kids live and go to school; garages and practice bays.' },
    { id: 'wolflin', name: 'Wolflin and Bivins', route: 'campus', note: 'Old-money brick streets; parents\' houses, not show houses.' }
  ],

  contacts: ['lubbock-tx', 'santa-fe-nm', 'wichita-ks'],

  points: [
    { name: 'Oklahoma City', state: 'OK', lat: 35.47, lon: -97.52, pop: 700000 },
    { name: 'Albuquerque', state: 'NM', lat: 35.08, lon: -106.65, pop: 560000 },
    { name: 'Tucumcari', state: 'NM', lat: 35.17, lon: -103.72, pop: 4800 },
    { name: 'Wichita Falls', state: 'TX', lat: 33.91, lon: -98.49, pop: 104000 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99, pop: 715000 }
  ],
  roads: ['I-40', 'I-27', 'US 287', 'US 60', 'US 87', 'Loop 335'],

  words: {
    street: ['Amarillo Boulevard', 'Sixth Avenue', 'Washington Street', 'Western Street', 'Soncy Road', 'Georgia Street', 'Coulter Street'],
    water: ['Palo Duro Canyon', 'Lake Meredith', 'the Canadian River', 'Playa Lake'],
    hood: ['San Jacinto', 'the Barrio', 'Plemons-Eakle', 'Sunset Terrace', 'North Heights', 'Wolflin', 'Bivins', 'Soncy'],
    thing: ['carport', 'caliche', 'feedlot', 'grain elevator', 'tumbleweed', 'cow skull', 'water tower', 'breakfast burrito', 'record store', 'floor PA', 'backyard'],
    weather: ['wind advisory', 'hail', 'dust storm', 'blizzard']
  }
});
