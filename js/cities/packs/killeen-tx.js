SB.Cities.register('killeen-tx', {
  v: 1,
  slug: 'killeen-tx',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['fort hood', 'fort cavazos', 'cavazos', 'ironhorse', '1st cavalry division', 'first cavalry', 'killeen daily herald', 'the daily herald',
           'central texas college', 'texas a&m university-central texas', 'university of mary hardin-baylor', 'mary hardin-baylor', 'baylor', 'tarleton',
           'baylor scott & white', 'scott & white', 'darnall', 'killeen kangaroos', 'kangaroos', 'grey wolves', 'harker heights knights', 'copperas cove bulldawgs',
           'bulldawgs', 'whataburger', 'dairy queen', 'sonic drive-in', 'waffle house', 'shiner', 'lone star beer', 'dr pepper', 'vfw', 'american legion',
           'amtrak', 'atsf', 'santa fe railway',
           'the motor pool annex', 'motor pool annex', 'rancier rec room', 'ironhorse hall', 'gate nine tire & lube', 'gate nine', 'trimmier ballroom',
           'the cantonment', 'cantonment', 'nolan creek pavilion', 'santa fe depot annex', 'clear creek carport', 'bunny trail bowl',
           'post 4414', 'post 4414 social hall', 'lone star laundromat', 'the lone star laundromat back room'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The post is written only as 'the post' or 'the base' in game text. */
  blocklist: ['fort hood*', 'killeen daily herald*', 'whataburger*', 'waffle house*', 'dairy queen*', 'ironhorse*', 'central texas college*', 'baylor*'],

  blurb: ['An Army gate town in central Texas, all strip malls and tire shops, where the scene forms fast around whoever just arrived with a box of records.',
          'Shows are hot garages and rented halls, and lineups change with every set of orders. Small, loyal and word of mouth.'],
  hard: 'People rotate out on orders, and landlords and neighbors shut garages down.',
  region: 'Texas',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 },
    { name: 'San Antonio', state: 'TX', lat: 29.42, lon: -98.49 },
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.8 },
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Killeen' },
    { id: 'harker-heights', kind: 'FEEDER', name: 'Harker Heights', minutes: 10, bearing: 100, note: 'The nicer suburb next door; officers\' kids with garages, and the police pay more attention.' },
    { id: 'copperas-cove', kind: 'FEEDER', name: 'Copperas Cove', minutes: 20, bearing: 270, note: 'A separate base town to the west with its own skate crowd and church-run all-ages nights.' },
    { id: 'belton', kind: 'FEEDER', name: 'Belton', minutes: 25, bearing: 85, note: 'A county seat with a small church college; a churchy, polite crowd.' },
    { id: 'temple', kind: 'FEEDER', name: 'Temple', minutes: 30, bearing: 75, note: 'A hospital and railroad town, the other half of the same metro; a small scene is plausible.' },
    { id: 'salado', kind: 'FEEDER', name: 'Salado', minutes: 35, bearing: 135, note: 'A small wealthy tourist village; its high-school kids drive up I-35.' },
    { id: 'lampasas', kind: 'FEEDER', name: 'Lampasas', minutes: 40, bearing: 285, note: 'A ranching and springs town with a small-town high-school crowd.' },
    { id: 'gatesville', kind: 'FEEDER', name: 'Gatesville', minutes: 45, bearing: 330, note: 'A prison and farm town to the northwest; a few kids drive in.' },
    { id: 'waco', kind: 'PEER', name: 'Waco', minutes: 60, bearing: 20, slug: 'waco-tx', note: 'The nearest equal, an hour up the interstate: the bigger, more cultural sibling.' },
    { id: 'college-station', kind: 'PEER', name: 'College Station', minutes: 105, bearing: 115, slug: 'college-station-tx', note: 'A big college town; shows trade seasonally.' },
    { id: 'san-marcos', kind: 'PEER', name: 'San Marcos', minutes: 90, bearing: 185, scene: 900, note: 'A small college town on the interstate with a strong DIY streak.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Killeen', route: 'downtown', note: 'The old railroad main street: low brick storefronts, pawn and barber shops, a few vacant fronts and halls to rent.' },
    { id: 'gate-side', name: 'the gate strip', route: 'downtown', note: 'Bars, tattoo and vape shops built for soldiers. Shows here are 18 and up or 21 and up, and kids rarely get in.' },
    { id: 'south-killeen', name: 'south Killeen', route: 'campus', note: 'Chain-store sprawl and new subdivisions toward Harker Heights; military families, garages and backyards.' },
    { id: 'west-killeen', name: 'Westcliff and west Killeen', route: 'campus', note: 'Newer, nicer subdivisions near the colleges; big garages and carports.' },
    { id: 'east-killeen', name: 'east Killeen', route: 'work-side', note: 'Older strip, motels, car lots and flex-industrial units; the best bet for a warehouse room.' },
    { id: 'old-killeen', name: 'old Killeen', route: 'old-side', note: 'Older tract streets near downtown; working-class renters and long-time families.' },
    { id: 'nolanville', name: 'Nolanville and the east edge', route: 'work-side', note: 'Trailers and farmland along the creek; cheap yards well out of earshot.' }
  ],

  contacts: ['waco-tx', 'college-station-tx'],

  points: [
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74, pop: 2300000 },
    { name: 'Waco', state: 'TX', lat: 31.55, lon: -97.15, pop: 270000 },
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.8, pop: 7500000 },
    { name: 'San Antonio', state: 'TX', lat: 29.42, lon: -98.49, pop: 2600000 }
  ],
  roads: ['US 190', 'I-14', 'I-35', 'TX 195', 'Loop 121', 'Business 190'],

  words: {
    street: ['Rancier Avenue', 'Trimmier Road', 'Clear Creek Road', 'Stan Schlueter Loop', 'Rosewood Drive', 'Elms Road'],
    water: ['Nolan Creek', 'the Lampasas River', 'Lake Belton', 'Stillhouse Hollow Lake'],
    hood: ['Westcliff', 'Harker Heights', 'Nolanville', 'Copperas Cove'],
    thing: ['window unit', 'kolache', 'breakfast taco', 'carport', 'tire shop', 'pawn shop', 'barracks', 'veterans hall', 'group chat'],
    weather: ['flash flood', 'norther', 'hail storm']
  }
});
