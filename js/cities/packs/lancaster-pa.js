SB.Cities.register('lancaster-pa', {
  v: 1,
  slug: 'lancaster-pa',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['franklin & marshall', 'franklin and marshall', 'f&m', 'millersville university', 'elizabethtown college', 'lancaster bible college', 'messiah university',
           'lebanon valley college', 'central market', 'first friday', 'lnp', 'lancasteronline', 'lancaster farming', 'red rose transit', 'amtrak', 'turkey hill', 'wilbur chocolate',
           'wawa', 'sheetz', 'pennsylvania farm show', 'ephrata fair', 'renaissance faire', 'pennsylvania renaissance faire', 'philadelphia eagles', 'carlisle barracks',
           'pennsylvania liquor control board', 'vfw', 'american legion', 'fire company',
           'the dutch cellar', 'chestnut hall', 'the lime kiln', 'marigold annex', 'the watch factory floor', 'pretzel row room', 'reservoir street hall', 'the cork loft',
           'quarry road barn', 'steeple basement', 'square dance hall', 'the back porch lot'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['franklin & marshall*', 'millersville university*', 'lancasteronline*', 'turkey hill*', 'wilbur chocolate*', 'wawa*', 'sheetz*'],

  blurb: ['Old brick rowhouses and farm-town church halls, a few cramped basements, and a scene that feeds the bigger cities down the road.',
          'Shows hide in halls and houses, a hall wants to read the lyrics first, and the best players tend to leave.'],
  hard: 'Few rooms, no interstate, and the good players drift to the big city.',
  region: 'the Mid-Atlantic',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Lancaster' },
    { id: 'strasburg', kind: 'FEEDER', name: 'Strasburg and Paradise', minutes: 20, bearing: 105, note: 'Plain-community farm country with little scene.' },
    { id: 'lititz', kind: 'FEEDER', name: 'Lititz', minutes: 20, bearing: 10, note: 'A tidy, affluent borough; its teens drive south for shows.' },
    { id: 'manheim', kind: 'FEEDER', name: 'Manheim', minutes: 25, bearing: 325, note: 'A small farm town northwest of the city.' },
    { id: 'mount-joy', kind: 'FEEDER', name: 'Mount Joy', minutes: 25, bearing: 295, note: 'A small suburb of the city on the way to the river.' },
    { id: 'columbia', kind: 'FEEDER', name: 'Columbia', minutes: 30, bearing: 250, note: 'A working-class river town with a bridge to York County.' },
    { id: 'ephrata', kind: 'FEEDER', name: 'Ephrata', minutes: 30, bearing: 40, note: 'A farm, church and light-industry borough with a teen scene.' },
    { id: 'elizabethtown', kind: 'FEEDER', name: 'Elizabethtown', minutes: 30, bearing: 315, note: 'A small college town with a scene of its own.' },
    { id: 'quarryville', kind: 'FEEDER', name: 'Quarryville and the southern end', minutes: 30, bearing: 170, note: 'Farm country; tiny.' },
    { id: 'lebanon', kind: 'FEEDER', name: 'Lebanon', minutes: 40, bearing: 5, note: 'A working-class small city with a few bands.' },
    { id: 'coatesville', kind: 'FEEDER', name: 'Coatesville and Downingtown', minutes: 45, bearing: 100, note: 'Steel-town and Chester County suburbs with real crossover to Philadelphia.' },
    { id: 'york', kind: 'PEER', name: 'York', minutes: 45, bearing: 235, slug: 'york-pa', note: 'The same size across the Susquehanna; a friendly rival that trades bands.' },
    { id: 'harrisburg', kind: 'PEER', name: 'Harrisburg', minutes: 45, bearing: 320, slug: 'harrisburg-pa', note: 'The state capital and the other regional hub.' },
    { id: 'reading', kind: 'PEER', name: 'Reading', minutes: 55, bearing: 60, slug: 'reading-pa', note: 'A rougher, cheaper rust-belt city that trades bands.' },
    { id: 'allentown', kind: 'PEER', name: 'Allentown', minutes: 85, bearing: 55, slug: 'allentown-pa', note: 'A bigger valley scene up the road.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Penn Square', route: 'downtown', note: 'A revived brick core of restaurants, galleries and convention hotels; priced out for DIY, with the odd vacant storefront.' },
    { id: 'southeast', name: 'southeast Lancaster', route: 'work-side', note: 'Tight rowhouse blocks and corner stores, heavily Latino and working class. Basements, living rooms and a community hall; the walls are shared.' },
    { id: 'northwest', name: 'Cabbage Hill and the northwest', route: 'old-side', note: 'Older working-class blocks and big houses split into flats. House shows and backyards.' },
    { id: 'college', name: 'the college blocks', route: 'campus', note: 'Student houses and faculty houses beside the college; the semester calendar rules everything.' },
    { id: 'musser', name: 'Musser Park and the northeast', route: 'old-side', note: 'Bigger brick houses on tree-lined streets, with high rents and neighbors who call the city. Not a place for shows.' },
    { id: 'mill-edge', name: 'the old factory edge', route: 'work-side', note: 'Big brick mills and warehouses, some converted to lofts, some vacant. One-night shows and practice units until the condos arrive.' },
    { id: 'suburbs', name: 'Manheim Township and the Route 30 strip', route: 'campus', note: 'Strip malls, big churches and split-levels with finished basements; the capacity champions for teenage shows.' },
    { id: 'millersville', name: 'Millersville', route: 'campus', note: 'A university borough a few miles southwest with student rentals and its own scene.' }
  ],

  contacts: ['york-pa', 'harrisburg-pa', 'reading-pa', 'state-college-pa'],

  points: [
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17, pop: 6200000 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61, pop: 2800000 },
    { name: 'West Chester', state: 'PA', lat: 39.96, lon: -75.6, pop: 20000 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80.0, pop: 2300000 }
  ],
  roads: ['US 30', 'US 222', 'PA 283', 'PA 501', 'the Turnpike'],

  words: {
    street: ['Lincoln Highway', 'Orange Street', 'Chestnut Street', 'Prince Street', 'Duke Street', 'Queen Street'],
    water: ['the Susquehanna', 'the Conestoga', 'Lancaster Creek'],
    hood: ['Cabbage Hill', 'Musser Park', 'Manheim Township', 'Millersville', 'East Lampeter', 'Southeast Lancaster'],
    thing: ['soft pretzel', 'shoofly pie', 'whoopie pie', 'scrapple', 'chow-chow', 'buggy', 'finished basement', 'fire hall', 'backyard', 'loaned storefront'],
    weather: ['humid thunderstorm', 'grey winter', 'snow squall']
  }
});
