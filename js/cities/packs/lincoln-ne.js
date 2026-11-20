SB.Cities.register('lincoln-ne', {
  v: 1,
  slug: 'lincoln-ne',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of nebraska', 'university of nebraska-lincoln', 'unl', 'nebraska wesleyan', 'union college', 'southeast community college',
           'doane university', 'doane', 'midland university', 'lincoln journal star', 'journal star', 'daily nebraskan', 'kzum', 'startran',
           'runza', 'valentino\'s', 'valentinos', 'nelnet', 'bryan health', 'saint elizabeth', 'kawasaki', 'national museum of roller skating',
           'celebrate lincoln', 'uncle sam jam', 'boo at the zoo', 'husker', 'huskers', 'big red', 'go big red', 'offutt', 'amtrak',
           'california zephyr', 'telegraph district', 'taco inn', 'amigos', 'village inn', 'busch light', 'natty light', 'fireball',
           'vfw', 'american legion', 'knights of columbus', 'lincoln public schools', 'nebraska nice',
           'the soddy', 'haymow', 'windbreak', 'the shelterbelt', 'tall corn hall', 'fallow', 'the culvert', 'lancaster lanes annex',
           'switchyard', 'the cistern', 'bohemian basement', 'salt flat social'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['kzum*', 'runza*', 'valentino*', 'journal star*', 'daily nebraskan*', 'husker*', 'big red*', 'startran*'],

  blurb: ['A campus town on a flat grid, fed by farm-town kids and basements. The punk here is old, and half the crowd leaves in May.',
          'Football Saturdays own downtown, so the real shows happen late, in student houses, or on a Sunday.'],
  hard: 'Football weekends, short summers, and the bigger city an hour east.',
  region: 'the Plains',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93 },
    { name: 'Kansas City', state: 'MO', lat: 39.1, lon: -94.58 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Lincoln' },
    { id: 'waverly', kind: 'FEEDER', name: 'Waverly', minutes: 15, bearing: 40, note: 'A bedroom suburb with no scene to speak of.' },
    { id: 'ashland', kind: 'FEEDER', name: 'Ashland', minutes: 25, bearing: 55, note: 'A small river-edge town.' },
    { id: 'seward', kind: 'FEEDER', name: 'Seward', minutes: 25, bearing: 280, note: 'A college town with church-youth music and a big Fourth of July.' },
    { id: 'crete', kind: 'FEEDER', name: 'Crete', minutes: 30, bearing: 240, note: 'A small college town of Czech heritage with a small scene.' },
    { id: 'wahoo', kind: 'FEEDER', name: 'Wahoo', minutes: 40, bearing: 355, note: 'A farm town where bands do form.', bands: 1 },
    { id: 'beatrice', kind: 'FEEDER', name: 'Beatrice', minutes: 45, bearing: 185, note: 'Farm and small manufacturing; kids drive up for shows.' },
    { id: 'fremont', kind: 'FEEDER', name: 'Fremont', minutes: 50, bearing: 15, note: 'A packing-plant and industry town, closer to the big city east for some.' },
    { id: 'york', kind: 'FEEDER', name: 'York', minutes: 50, bearing: 260, note: 'A farm town with a small college.' },
    { id: 'nebraska-city', kind: 'FEEDER', name: 'Nebraska City', minutes: 50, bearing: 110, note: 'Apple country on the river; a small scene.' },
    { id: 'columbus', kind: 'FEEDER', name: 'Columbus', minutes: 70, bearing: 320, note: 'Industrial and farm town to the north.' },
    { id: 'hastings', kind: 'FEEDER', name: 'Hastings', minutes: 85, bearing: 250, note: 'A farm and trade center with a small college.' },
    { id: 'grand-island', kind: 'FEEDER', name: 'Grand Island', minutes: 90, bearing: 265, note: 'A bigger, diverse packing-plant city out on I-80.' },
    { id: 'manhattan', kind: 'PEER', name: 'Manhattan', state: 'KS', minutes: 120, bearing: 185, scene: 700, note: 'A smaller college town to the south.' },
    { id: 'topeka', kind: 'PEER', name: 'Topeka', state: 'KS', minutes: 150, bearing: 170, scene: 800, note: 'A quieter capital city.' },
    { id: 'lawrence', kind: 'PEER', name: 'Lawrence', state: 'KS', minutes: 180, bearing: 160, slug: 'lawrence-ks', note: 'A famous music college town and a real exchange partner.' }
  ],

  hoods: [
    { id: 'downtown-haymarket', name: 'downtown and the Haymarket', route: 'downtown', note: 'Rebuilt rail warehouses, an arena, lofts and bars; expensive, heavily policed, and where touring bands load in.' },
    { id: 'downtown-east', name: 'downtown east of O Street', route: 'campus', note: 'Older low-rise blocks near campus with bars, record stores and cafes; where people mean "the scene".' },
    { id: 'near-south', name: 'Near South', route: 'old-side', note: 'Craftsman and Victorian houses rented to students and young workers, with basements and porches; drifting upscale.' },
    { id: 'havelock-belmont', name: 'Havelock and Belmont', route: 'work-side', note: 'Former railroad and farm towns annexed long ago; cheap rent, auto shops, garages and basements.' },
    { id: 'university-place', name: 'University Place and Bethany', route: 'old-side', note: 'Quiet older streets on the north side with garages and small halls; students, families and retirees.' },
    { id: 'student-blocks', name: 'the student blocks by campus', route: 'campus', note: 'Rental houses with backyards and PAs; leases end each May and August.' },
    { id: 'west-edge', name: 'the west edge', route: 'work-side', note: 'Cheap, industrial, car-oriented land with practice spaces and warehouse rooms.' }
  ],

  contacts: ['lawrence-ks'],

  points: [
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93, pop: 970000 },
    { name: 'Kansas City', state: 'MO', lat: 39.1, lon: -94.58, pop: 2200000 },
    { name: 'Des Moines', state: 'IA', lat: 41.59, lon: -93.62, pop: 710000 },
    { name: 'Sioux Falls', state: 'SD', lat: 43.55, lon: -96.73, pop: 280000 }
  ],
  roads: ['I-80', 'I-180', 'US 77', 'US 34', 'US 6'],

  words: {
    street: ['O Street', 'Cornhusker Highway', 'Holdrege Street', 'Van Dorn Street', 'Highway 77'],
    water: ['Salt Creek', 'the Platte'],
    hood: ['the Haymarket', 'Near South', 'Havelock', 'Belmont', 'University Place', 'Bethany'],
    thing: ['kolache', 'grain elevator', 'tornado siren', 'basement', 'shelter belt', 'combine', 'blizzard', 'move-out curb', 'football Saturday', 'work-truck van', 'shelter basement', 'move-out curb', 'football Saturday', 'work-truck van', 'shelter basement'],
    weather: ['tornado warning', 'hail', 'blizzard', 'ice']
  }
});
