SB.Cities.register('champaign-il', {
  v: 1,
  slug: 'champaign-il',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of illinois', 'university of illinois urbana-champaign', 'uiuc', 'illini', 'fighting illini', 'daily illini', 'news-gazette',
           'the news-gazette', 'big ten', 'kraft heinz', 'ebertfest', 'quad day', 'boneyard arts festival', 'boneyard arts', 'c-carts', 'amtrak',
           'state farm', 'vfw', 'american legion', 'elks', 'elks lodge', 'general motors', 'gm plant', 'illinois central', 'canadian national',
           'norfolk southern', 'sweetcorn festival', 'illinois state university', 'eastern illinois university', 'millikin', 'purdue',
           'indiana university', 'chambana', 'carle foundation', 'the sump', 'tallgrass room', 'grain bin', 'quonset 40', 'section line',
           'the siding', 'frostbite garage', 'combine hall', 'overpass annex', 'dry slough', 'soybean moon'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['illini*', 'ebertfest*', 'quad day*', 'boneyard arts*', 'news-gazette*', 'kraft heinz*', 'tallgrass room*', 'combine hall*'],

  blurb: ['Basements across the line carry the town while the strip fills with glass. Punks, hardcore kids and rappers share one bill.',
          'Half the crowd leaves every May, and half never did.'],
  hard: 'Houses end by zoning letter or landlord, and the students leave every May.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.2 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Champaign' },
    { id: 'urbana', kind: 'FEEDER', name: 'Urbana', minutes: 10, bearing: 45, note: 'The twin city on the other side of campus: arty, activist and cheaper.', bands: 3 },
    { id: 'mahomet', kind: 'FEEDER', name: 'Mahomet', minutes: 15, bearing: 320, note: 'A bedroom suburb off the interstate; teens come in for shows.' },
    { id: 'rantoul', kind: 'FEEDER', name: 'Rantoul', minutes: 20, bearing: 5, note: 'A shrunken old air-force town north on US 45; kids come because there is nothing else.', bands: 1 },
    { id: 'tuscola', kind: 'FEEDER', name: 'Tuscola', minutes: 25, bearing: 190, note: 'A farm town south on I-57.' },
    { id: 'monticello', kind: 'FEEDER', name: 'Monticello', minutes: 30, bearing: 280, note: 'A county seat west on I-72.' },
    { id: 'paxton', kind: 'FEEDER', name: 'Paxton and the farm towns', minutes: 35, bearing: 10, note: 'Farm towns up I-57; kids drive in with a parent\'s permission.' },
    { id: 'danville', kind: 'FEEDER', name: 'Danville', minutes: 40, bearing: 100, note: 'A former rail and factory city east on I-74 with a real appetite for bands.', bands: 2 },
    { id: 'mattoon', kind: 'FEEDER', name: 'Mattoon and Charleston', minutes: 50, bearing: 210, note: 'Two towns south on I-57; Charleston has a state university and its own small DIY life.', bands: 2 },
    { id: 'decatur', kind: 'FEEDER', name: 'Decatur', minutes: 55, bearing: 270, note: 'A shrinking industrial city west on I-72 with some scene of its own.', bands: 2 },
    { id: 'bloomington-normal', kind: 'PEER', name: 'Bloomington and Normal', minutes: 60, bearing: 310, scene: 1500, note: 'Another campus twin up I-74; the two towns trade bands.' },
    { id: 'springfield', kind: 'PEER', name: 'Springfield', minutes: 80, bearing: 265, scene: 900, note: 'The quiet old capital west on I-72.' },
    { id: 'lafayette', kind: 'PEER', name: 'Lafayette and West Lafayette', minutes: 90, bearing: 85, slug: 'lafayette-in', note: 'The mirror-image campus town across the Indiana line.' },
    { id: 'peoria', kind: 'PEER', name: 'Peoria', minutes: 90, bearing: 295, slug: 'peoria-il', note: 'A river port with more bars and fewer students.' }
  ],

  hoods: [
    { id: 'campustown', name: 'Campustown', route: 'campus', note: 'Eight blocks of bars and fast food under new student towers: glassed over, expensive and watched.' },
    { id: 'downtown-champaign', name: 'downtown Champaign', route: 'downtown', note: 'Restored theaters, taps and a few mid-sized rooms; young professionals and grad students.' },
    { id: 'downtown-urbana', name: 'downtown Urbana', route: 'downtown', note: 'Around the square: storefronts, co-ops and old houses; slowly gentrifying and the more arty half.' },
    { id: 'west-urbana', name: 'West Urbana and the near-campus grid', route: 'old-side', note: 'Two-and-a-half-story houses cut into student flats; basements, porches and back yards.' },
    { id: 'north-champaign', name: 'north and northeast Champaign', route: 'work-side', note: 'Long-standing working-class blocks of older frame houses; not a student scene and not to be treated as one.' },
    { id: 'philo-road', name: 'Philo Road and east Urbana', route: 'work-side', note: 'Low-rent strip malls, cheap apartments and car lots; practice rooms and storage units.' },
    { id: 'rail-edge', name: 'the railroad corridors', route: 'work-side', note: 'Old garages and cinder-block shops by the tracks, rented by the month.' },
    { id: 'prospect', name: 'Prospect Avenue and Savoy', route: 'campus', note: 'Chain restaurants, malls and subdivisions; where parent-driven suburban kids come from.' }
  ],

  contacts: ['lafayette-in', 'peoria-il', 'bloomington-in'],

  points: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 9400000 },
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16, pop: 890000 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.2, pop: 2800000 },
    { name: 'Kankakee', state: 'IL', lat: 41.12, lon: -87.86, pop: 24000 },
    { name: 'Terre Haute', state: 'IN', lat: 39.47, lon: -87.41, pop: 58000 }
  ],
  roads: ['I-57', 'I-74', 'I-72', 'US 45', 'US 150', 'Illinois 10'],

  words: {
    street: ['Green Street', 'Neil Street', 'University Avenue', 'Wright Street', 'Prospect Avenue', 'Philo Road', 'Race Street'],
    water: ['the Boneyard Creek', 'the Boneyard'],
    hood: ['Campustown', 'West Urbana', 'Savoy', 'Mahomet', 'Philo', 'the Square', 'Lincoln Square'],
    thing: ['tenderloin', 'corn dog', 'sump pump', 'tornado siren', 'cinder block', 'ground blizzard', 'transit bus', 'storage unit', 'basement show', 'porch', 'radio zine', 'zoning letter'],
    weather: ['crosswind', 'ground blizzard', 'thunderstorm']
  }
});
