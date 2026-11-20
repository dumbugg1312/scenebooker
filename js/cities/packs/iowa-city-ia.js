SB.Cities.register('iowa-city-ia', {
  v: 1,
  slug: 'iowa-city-ia',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of iowa', 'iowa hawkeyes', 'hawkeyes', 'hawkeye saturdays', 'kinnick', 'big ten', 'iowa state', 'cyclones', 'cambus', 'iowa city transit',
           'coralville transit', 'press-citizen', 'iowa city press-citizen', 'cedar rapids gazette', 'the gazette', 'kcrg', 'daily iowan', 'hy-vee', 'hy vee',
           'casey\'s', 'maid-rite', 'busch light', 'miller lite', 'procter & gamble', 'procter and gamble', 'american college testing', 'unesco', 'city of literature',
           'writers\' workshop', 'iowa writers', 'iowa memorial union', 'old capitol', 'old capitol cellar', 'iowa state fair', 'summer of the arts',
           'the burlington street annex', 'burlington street annex', 'sycamore room', 'the dubuque street depot', 'dubuque street depot', 'ralston basement',
           'lower city pavilion', 'the gilbert shed', 'gilbert shed', 'linn street garage', 'the riverside room', 'hickory hall', 'muscatine avenue annex', 'the sheaf'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The university, the paper and the stadium are written only in generic form. */
  blocklist: ['hawkeye*', 'hy-vee*', 'maid-rite*', 'old capitol*', 'daily iowan*', 'kcrg*', 'sycamore room*'],

  blurb: ['Iowa City\'s scene resets with the school year, so every crew is new. Basements, bars and art rooms trade the same few hundred literate, friendly kids.',
          'Football Saturdays and winter break empty the town, and the bars card at 21.'],
  hard: 'Football weekends and student turnover break routing; all-ages means houses and halls.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Des Moines', state: 'IA', lat: 41.59, lon: -93.62 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 },
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Iowa City' },
    { id: 'north-liberty', kind: 'FEEDER', name: 'Coralville, North Liberty and Tiffin', minutes: 15, bearing: 335, note: 'Fast-growing commuter suburbs; the kids mostly come in.' },
    { id: 'solon', kind: 'FEEDER', name: 'Solon', minutes: 15, bearing: 20, note: 'A small commuter town with a few teen bands.' },
    { id: 'west-branch', kind: 'FEEDER', name: 'West Branch', minutes: 15, bearing: 80, note: 'Quiet, just off I-80 to the east.' },
    { id: 'kalona', kind: 'FEEDER', name: 'Kalona', minutes: 25, bearing: 190, note: 'Amish and Mennonite country; a few teens come in.' },
    { id: 'williamsburg', kind: 'FEEDER', name: 'Williamsburg', minutes: 25, bearing: 285, note: 'An outlet-mall town west on I-80.' },
    { id: 'mount-vernon', kind: 'FEEDER', name: 'Mount Vernon and Lisbon', minutes: 30, bearing: 15, note: 'A small college town with student bands.' },
    { id: 'washington', kind: 'FEEDER', name: 'Washington', minutes: 30, bearing: 175, note: 'A farm and light-industry county seat to the south.' },
    { id: 'muscatine', kind: 'FEEDER', name: 'Muscatine', minutes: 40, bearing: 110, note: 'A river and factory town on the Mississippi.' },
    { id: 'grinnell', kind: 'FEEDER', name: 'Grinnell', minutes: 50, bearing: 265, note: 'A small college town with student bands.' },
    { id: 'cedar-rapids', kind: 'PEER', name: 'Cedar Rapids', minutes: 45, bearing: 340, slug: 'cedar-rapids-ia', note: 'The larger neighbor up I-380: bands and crowds trade both ways all the time.' },
    { id: 'quad-cities', kind: 'PEER', name: 'Quad Cities', minutes: 60, bearing: 95, slug: 'davenport-ia', note: 'A river and industry cluster an hour east on I-80, a touring stop and a traffic partner.' },
    { id: 'des-moines', kind: 'PEER', name: 'Des Moines', minutes: 120, bearing: 275, slug: 'des-moines-ia', note: 'The capital scene, where bigger tours choose to stop instead.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Ped Mall', route: 'downtown', note: 'A pedestrian plaza of bars, restaurants and a library; legal rooms, 21-and-over at night, and almost no DIY.' },
    { id: 'campus', name: 'campus and along the river', route: 'campus', note: 'Where the student year happens: institutional rooms and the crowd that feeds everything else.' },
    { id: 'northside', name: 'Northside', route: 'old-side', note: 'Old houses with real basements and a bohemian streak, heating up and getting expensive.' },
    { id: 'near-south', name: 'the Near South Side', route: 'old-side', note: 'Old houses cut into rentals near campus and the hospital: the likeliest place for basement and porch shows.' },
    { id: 'peninsula', name: 'Peninsula and the river bottoms', route: 'work-side', note: 'Quiet, flood-prone streets by the river; not a place to put a show.' },
    { id: 'east-side', name: 'the east side along Highway 6', route: 'work-side', note: 'Mid-century houses, strip malls and apartment blocks; garages, carports and rented practice space.' },
    { id: 'coralville-strip', name: 'Coralville and the Strip', route: 'campus', note: 'Big-box retail, hotels and a mall in the next town over; legal event rooms, no DIY.' }
  ],

  contacts: ['cedar-rapids-ia', 'davenport-ia', 'des-moines-ia'],

  points: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 2700000 },
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93, pop: 485000 },
    { name: 'Dubuque', state: 'IA', lat: 42.5, lon: -90.66, pop: 59000 },
    { name: 'Ames', state: 'IA', lat: 42.03, lon: -93.62, pop: 66000 }
  ],
  roads: ['I-80', 'I-380', 'US 218', 'US 6', 'Iowa 1', 'Iowa 27'],

  words: {
    street: ['Burlington Street', 'Dubuque Street', 'Gilbert Street', 'Muscatine Avenue', 'Highway 6', 'Linn Street', 'Clinton Street'],
    water: ['the Iowa River', 'Coralville Lake', 'the Mississippi'],
    hood: ['the Ped Mall', 'Northside', 'Peninsula', 'Prospect Hill', 'Towncrest', 'Lower Muscatine', 'the Strip', 'the Corridor'],
    thing: ['pork tenderloin', 'loose-meat sandwich', 'gas-station pizza', 'cornfield', 'bonfire', 'basement', 'porch', 'cornstalks', 'bulkhead door', 'art room', 'photocopied flyer', 'all-ages hall'],
    weather: ['derecho', 'thunderstorm', 'ice storm', 'spring flood']
  }
});
