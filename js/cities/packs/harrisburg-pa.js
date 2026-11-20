SB.Cities.register('harrisburg-pa', {
  v: 1,
  slug: 'harrisburg-pa',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['pennsylvania farm show', 'farm show complex', 'farm show', 'great american outdoor show', 'kipona', 'penn state', 'penn state harrisburg',
           'harrisburg university', 'hacc', 'messiah university', 'messiah college', 'dickinson college', 'dickinson', 'shippensburg university',
           'lebanon valley college', 'susquehanna university', 'carlisle barracks', 'army war college', 'fort indiantown gap', 'new cumberland army depot',
           'hersheypark', 'hershey chocolate', 'pennlive', 'patriot-news', 'patriot news', 'witf', 'capital area transit', 'sheetz', 'rutter\'s', 'rutters',
           'wawa', 'yuengling', 'hurricane agnes', 'agnes flood', 'liquor control board', 'vfw', 'american legion', 'elks', 'moose lodge',
           'paxton street hall', 'the camelback room', 'cumberland social club', 'second street annex', 'the maclay basement', 'susquehanna grange no. 9',
           'steelworkers\' rec', 'the hill street pavilion', 'reily street garage', 'the capitol loft', 'front & verbeke hall', 'riverfront slab'],
  /* Dossier institutions and its unchecked invented venue names are banned: research, not content. */
  blocklist: ['pennlive*', 'sheetz*', 'wawa*', 'yuengling*', 'farm show*', 'kipona*', 'paxton street hall*', 'camelback room*'],

  blurb: ['A capital whose downtown shuts at five, so the kids carry the scene out to basements and fire halls. Cheap rowhouse cellars, a car for everyone.',
          'The river is the west edge, and the West Shore bands have to cross a bridge to play in town. Baltimore and Philadelphia keep pulling the ambitious ones away.'],
  hard: 'Tiny walkable core; most rooms are halls and houses far apart.',
  region: 'the Mid-Atlantic',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80.0 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Harrisburg' },
    { id: 'west-shore', kind: 'FEEDER', name: 'Lemoyne, Camp Hill and Mechanicsburg', minutes: 15, bearing: 250, note: 'Across the river bridges: suburban teenagers and basements.' },
    { id: 'hershey', kind: 'FEEDER', name: 'Hershey and Hummelstown', minutes: 20, bearing: 100, note: 'A chocolate and amusement-park town; suburban kids drive in.' },
    { id: 'carlisle', kind: 'FEEDER', name: 'Carlisle', minutes: 25, bearing: 245, note: 'A small college town on I-81.' },
    { id: 'lebanon', kind: 'FEEDER', name: 'Lebanon and Annville', minutes: 30, bearing: 95, note: 'A Pennsylvania Dutch working town with a small college next door.' },
    { id: 'elizabethtown', kind: 'FEEDER', name: 'Elizabethtown and Mount Joy', minutes: 35, bearing: 150, note: 'College and farm towns toward Lancaster.' },
    { id: 'gettysburg', kind: 'FEEDER', name: 'Gettysburg', minutes: 50, bearing: 205, note: 'A college and tourist town down US 15.' },
    { id: 'shippensburg', kind: 'FEEDER', name: 'Shippensburg', minutes: 45, bearing: 235, note: 'A university town on I-81.' },
    { id: 'selinsgrove', kind: 'FEEDER', name: 'Selinsgrove and Sunbury', minutes: 55, bearing: 5, note: 'River towns up US 11 and 15.' },
    { id: 'chambersburg', kind: 'FEEDER', name: 'Chambersburg', minutes: 55, bearing: 230, note: 'A farm and mill town, big for its region.' },
    { id: 'lancaster', kind: 'PEER', name: 'Lancaster', minutes: 45, bearing: 145, slug: 'lancaster-pa', note: 'The nicer, wealthier cousin; crowds trade both ways.' },
    { id: 'reading', kind: 'PEER', name: 'Reading', minutes: 60, bearing: 95, slug: 'reading-pa', note: 'Larger and poorer; shares touring bands.' },
    { id: 'state-college', kind: 'PEER', name: 'State College', minutes: 90, bearing: 295, slug: 'state-college-pa', note: 'A college town with its own bill-building tradition.' },
    { id: 'scranton', kind: 'PEER', name: 'Scranton and Wilkes-Barre', minutes: 105, bearing: 35, slug: 'scranton-pa', note: 'Another capital-sized scene with the same dynamics, up I-81.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Capitol', route: 'downtown', note: 'Offices and a few bars; dull after dark, good for licensed rooms.' },
    { id: 'midtown', name: 'Midtown', route: 'old-side', note: 'Rowhouses, coffee, small galleries; the likeliest place for record shops and storefront rooms.' },
    { id: 'uptown', name: 'Uptown', route: 'old-side', note: 'Big brick rowhouses split into units, with attics and basements.' },
    { id: 'allison-hill', name: 'Allison Hill', route: 'work-side', note: 'Dense, low-income and long disinvested; cheap space, but an outsider\'s show there is a different situation.' },
    { id: 'shipoke', name: 'Shipoke', route: 'old-side', note: 'Quaint riverfront rowhouses with older homeowners and noise complaints.' },
    { id: 'steelton', name: 'Steelton', route: 'work-side', note: 'An old steel borough of small rowhouses, social halls and cheap practice space.' },
    { id: 'west-shore-hood', name: 'the West Shore', route: 'campus', note: 'Car-dependent suburbs across the river, full of teenagers and finished basements.' }
  ],

  contacts: ['lancaster-pa', 'york-pa', 'reading-pa', 'state-college-pa'],

  points: [
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61, pop: 2800000 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17, pop: 6100000 },
    { name: 'Hagerstown', state: 'MD', lat: 39.64, lon: -77.72, pop: 90000 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80.0, pop: 2300000 }
  ],
  roads: ['I-81', 'I-83', 'I-76', 'I-283', 'US 322', 'US 11'],

  words: {
    street: ['Market Street', 'Third Street', 'Maclay Street', 'Derry Street', 'Front Street', 'Paxton Street'],
    water: ['the Susquehanna', 'Paxton Creek', 'the river'],
    hood: ['Allison Hill', 'Midtown', 'Uptown', 'Shipoke', 'Steelton', 'Bellevue Park', 'Camp Curtin', 'the West Shore', 'Lower Paxton'],
    thing: ['rowhouse', 'hoagie', 'scrapple', 'soft pretzel', 'shoofly pie', 'pierogi', 'fire hall', 'cellar', 'bridge', 'gas station run'],
    weather: ['ice storm', 'river flood', 'humid']
  }
});
