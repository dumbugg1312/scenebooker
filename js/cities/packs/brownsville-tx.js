SB.Cities.register('brownsville-tx', {
  v: 1,
  slug: 'brownsville-tx',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['utrgv', 'university of texas rio grande valley', 'texas southmost college', 'tsc', 'spacex', 'starbase', 'port of brownsville',
           'border patrol', 'tabc', 'charro days', 'sombrero festival', 'latin jazz festival', 'brownsville herald', 'monitor and valley morning star',
           'valley morning star', 'the rider', 'kurv', 'kvns', 'kveo', 'brownsville metro', 'whataburger', 'taco palenque', 'topo chico', 'jarritos',
           'tecate', 'knights of columbus', 'vfw', 'sunrise mall', 'texas a&m-kingsville', 'texas state', 'utsa', 'ut austin', 'winter texans',
           'salon la ceiba', 'cotton compress annex', 'casa cuatro esquinas', 'resaca roller palace', 'boca chica lodge', 'taller tres equis',
           'shrimp basin social club', 'elizabeth street dry goods', 'papa rafa\'s carport', 'southmost sign shop', 'ebony tree hall', 'salon tamaulipas'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['utrgv*', 'spacex*', 'starbase*', 'charro days*', 'brownsville herald*', 'whataburger*', 'taco palenque*', 'sombrero festival*'],

  blurb: ['One promoter, a few friend groups, and a Valley of kids who drive an hour for a show, with punk, metal and indie on one bill.',
          'Rooms open, last a couple of years and close. Heat and fear of enforcement can empty a night.'],
  hard: 'Few stable rooms; the scene depends on one or two organizers.',
  region: 'the Valley',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'San Antonio', state: 'TX', lat: 29.42, lon: -98.49 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 },
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Brownsville' },
    { id: 'matamoros', kind: 'FEEDER', name: 'Matamoros', state: 'TAM', minutes: 25, bearing: 175, scene: 200, note: 'Across the bridge: its own rock, metal and punk crowd, held back by papers and bridge lines.' },
    { id: 'los-fresnos', kind: 'FEEDER', name: 'Los Fresnos', minutes: 20, bearing: 40, pop: 8000, note: 'A commuter and school town. Teen bands, no real room.' },
    { id: 'san-benito', kind: 'FEEDER', name: 'San Benito', minutes: 25, bearing: 330, pop: 24000, note: 'A farm and conjunto town up the highway.' },
    { id: 'harlingen', kind: 'FEEDER', name: 'Harlingen', minutes: 30, bearing: 335, pop: 70000, note: 'The crowd-sharing neighbor up the expressway, with a small scene of its own.' },
    { id: 'port-isabel', kind: 'FEEDER', name: 'Port Isabel', minutes: 30, bearing: 70, note: 'A small fishing and lighthouse town on the bay.' },
    { id: 'la-feria', kind: 'FEEDER', name: 'La Feria and Rio Hondo', minutes: 35, bearing: 325, note: 'Farm towns where kids carpool in.' },
    { id: 'south-padre', kind: 'FEEDER', name: 'South Padre Island', minutes: 40, bearing: 65, note: 'A beach resort with a tourist rock-bar economy, and few local punks.', beyond: 'causeway', season: { months: [3, 4, 5, 6, 7], mul: 1.5 } },
    { id: 'raymondville', kind: 'FEEDER', name: 'Raymondville', minutes: 55, bearing: 340, note: 'A small farm town.' },
    { id: 'mcallen', kind: 'PEER', name: 'McAllen and Edinburg', state: 'TX', minutes: 65, bearing: 295, scene: 1500, note: 'The big Valley cluster: more rooms, more bands, and the campus up the road.' },
    { id: 'corpus-christi', kind: 'PEER', name: 'Corpus Christi', state: 'TX', minutes: 165, bearing: 350, slug: 'corpus-christi-tx', note: 'The first big stop north out of the Valley.' }
  ],

  chokepoints: [{ id: 'causeway', name: 'the Island causeway', p: .02 }],

  hoods: [
    { id: 'downtown', name: 'downtown Brownsville', route: 'downtown', note: 'Old masonry storefronts and upstairs rooms by the bridge: busy with shoppers by day, empty at night, slowly restored and still cheap.' },
    { id: 'campus', name: 'the old fort and campus district', route: 'campus', note: 'The college grounds beside a resaca and big old houses along Palm Boulevard. Student halls and rented houses; empties in summer.' },
    { id: 'southmost', name: 'Southmost', route: 'old-side', note: 'Single-story houses with fenced yards and carports along the levee. Cheap and ignored, with heavy policing.' },
    { id: 'expressway', name: 'the Expressway and Boca Chica strip', route: 'work-side', note: 'Strip malls, chain restaurants and bars with weekend bands. Restaurant back rooms; commercial rents rising.' },
    { id: 'port-road', name: 'the port road east', route: 'work-side', note: 'Warehouses and shrimp boats, then wetland and beach. Room to be loud, but the road closes on launch days.' },
    { id: 'north-side', name: 'north Brownsville', route: 'campus', note: 'Slab-built subdivisions and big-box stores. Family driveways and garages, hostile to noise.' },
    { id: 'military-highway', name: 'Military Highway and the west edge', route: 'old-side', note: 'Mobile homes and big yards with few neighbors. Yard shows, far from everything and rough on roads.' }
  ],

  contacts: ['corpus-christi-tx', { name: 'McAllen', state: 'TX', lat: 26.2, lon: -98.23 }, 'laredo-tx'],

  points: [
    { name: 'McAllen', state: 'TX', lat: 26.2, lon: -98.23, pop: 140000 },
    { name: 'Harlingen', state: 'TX', lat: 26.19, lon: -97.7, pop: 70000 },
    { name: 'Kingsville', state: 'TX', lat: 27.52, lon: -97.86, pop: 25000 },
    { name: 'San Antonio', state: 'TX', lat: 29.42, lon: -98.49, pop: 1500000 },
    { name: 'Monterrey', state: 'NL', lat: 25.69, lon: -100.32, pop: 1100000 }
  ],
  roads: ['I-69E', 'US 77', 'US 83', 'US 281', 'SH 4', 'I-2'],

  words: {
    street: ['Boca Chica Boulevard', 'Elizabeth Street', 'Palm Boulevard', 'Military Highway', 'Paredes Line Road', 'Old Alice Road'],
    water: ['the Rio Grande', 'the resaca', 'the Brownsville Ship Channel', 'Laguna Madre'],
    hood: ['Southmost', 'Fort Brown', 'Olmito', 'Rancho Viejo', 'Los Fresnos', 'Matamoros'],
    thing: ['carport', 'trompo', 'raspa cart', 'cooler of ice', 'extension cord', 'quinceanera hall', 'box fan', 'benefit show', 'box fan', 'borrowed hall', 'Spanglish set'],
    weather: ['heat index', 'flash flood', 'storm watch'],
    surnames: ['Garza', 'Treviño', 'Salinas', 'Cantú', 'Villarreal', 'Guerra', 'Saenz', 'Ochoa', 'Pruitt']
  }
});
