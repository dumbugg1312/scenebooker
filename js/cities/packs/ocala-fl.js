SB.Cities.register('ocala-fl', {
  v: 1,
  slug: 'ocala-fl',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['college of central florida', 'central florida college', 'university of florida', 'florida gators', 'ucf', 'florida state', 'florida state university',
           'h.i.t.s.', 'hits horse show', 'horse capital of the world', 'ocala star-banner', 'star-banner', 'e-one', 'walmart', 'waffle house', 'publix',
           'florida highway patrol', 'marion county sheriff', 'florida division of alcoholic beverages', 'on top of the world', 'the villages',
           'silver springs state park', 'silver springs attraction', 'vfw', 'american legion', 'daytona international speedway', 'embry-riddle',
           'the sand pine room', 'fence line hall', 'scrub jay annex', 'the paddock back lot', 'fountain street rec', 'limerock social club',
           'palmetto lodge no. 9', 'palmetto lodge', 'the gravel stable', 'blue run hall', 'cypress lane garage', 'the tin barn', 'sinkhole social'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real schools, press, chains and posts are written only in generic form. */
  blocklist: ['star-banner*', 'waffle house*', 'sand pine room*', 'limerock social*', 'sinkhole social*', 'scrub jay annex*', 'palmetto lodge*'],

  blurb: ['Out past the horse farms, garages and halls hold a small, hot scene with no university to feed it new kids each fall.',
          'Most nights the best show is a drive away, and nobody minds. It lives in garages, carports and parking lots.'],
  hard: 'Few real rooms, long drives, and a neighbor with a phone.',
  region: 'Florida',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38 },
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46 },
    { name: 'Jacksonville', state: 'FL', lat: 30.33, lon: -81.66 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Ocala' },
    { id: 'belleview', kind: 'FEEDER', name: 'Belleview', minutes: 15, bearing: 185, note: 'A small suburb just south on US 441; retirees and families, and high-school bands.' },
    { id: 'silver-springs-shores', kind: 'FEEDER', name: 'Silver Springs Shores and Ocklawaha', minutes: 20, bearing: 120, note: 'Huge platted subdivisions of ranch houses on sandy lots: the best garage and backyard country.' },
    { id: 'reddick', kind: 'FEEDER', name: 'Reddick and Citra', minutes: 25, bearing: 10, note: 'Farm and horse country north; the kids here have the longest drives.' },
    { id: 'dunnellon', kind: 'FEEDER', name: 'Dunnellon', minutes: 30, bearing: 235, note: 'A small, loyal river and mining town to the southwest.' },
    { id: 'williston', kind: 'FEEDER', name: 'Williston', minutes: 35, bearing: 320, note: 'Rural farm and springs country on US 27.' },
    { id: 'wildwood', kind: 'FEEDER', name: 'Wildwood and Bushnell', minutes: 40, bearing: 190, note: 'An old-age crossroads on I-75; few young fans and everyone needs a ride.' },
    { id: 'inverness', kind: 'FEEDER', name: 'Inverness', minutes: 40, bearing: 250, note: 'A retirement-heavy county seat; its kids drive to Ocala or Gainesville.' },
    { id: 'salt-springs', kind: 'FEEDER', name: 'Salt Springs and the forest', minutes: 50, bearing: 75, note: 'Fish camps and campgrounds through the scrub on long dark roads.' },
    { id: 'leesburg', kind: 'FEEDER', name: 'Leesburg and Eustis', minutes: 55, bearing: 150, note: 'Lakefront retiree towns that pull toward Orlando.' },
    { id: 'palatka', kind: 'FEEDER', name: 'Palatka', minutes: 65, bearing: 50, note: 'An old river town that looks toward Jacksonville as much as Ocala.' },
    { id: 'gainesville', kind: 'PEER', name: 'Gainesville', minutes: 45, bearing: 355, slug: 'gainesville-fl', note: 'The university town up the road, twice the size, where Ocala kids go most.' },
    { id: 'lakeland', kind: 'PEER', name: 'Lakeland', minutes: 100, bearing: 195, slug: 'lakeland-fl', note: 'A similar inland Florida city down I-75 and I-4.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Square', route: 'downtown', note: 'Brick streets around a fountain square, newly full of breweries and restaurants; less friendly to loud, cheap shows each year.' },
    { id: 'historic', name: 'the historic district', route: 'old-side', note: 'Victorian houses and preservation-minded neighbors; almost no shows, and a lot of quiet.' },
    { id: 'west-ocala', name: 'West Ocala', route: 'old-side', note: 'A long-standing Black community of small old houses, churches and halls. Not a place to treat as a rough punk district.' },
    { id: 'sr-200', name: 'the southwest sprawl on SR 200', route: 'campus', note: 'The mall, big-box stores, apartments and a commuter campus: where teenagers actually hang out, in parking lots and strip-mall units.' },
    { id: 'silver-springs-blvd', name: 'Silver Springs Boulevard', route: 'work-side', note: 'The old tourist strip east: pawn shops, motels, used-car lots, cheap units and bar back rooms.' },
    { id: 'shores', name: 'Silver Springs Shores and Marion Oaks', route: 'work-side', note: 'Cheap ranch houses on big lots with garages and carports and few neighbors close enough to hear.' },
    { id: 'south', name: 'south toward Belleview', route: 'campus', note: 'Retirement belt and newer subdivisions; mostly a source of noise complaints.' }
  ],

  contacts: ['gainesville-fl', 'lakeland-fl', 'tallahassee-fl'],

  points: [
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38, pop: 2700000 },
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46, pop: 3200000 },
    { name: 'Jacksonville', state: 'FL', lat: 30.33, lon: -81.66, pop: 1600000 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 6100000 }
  ],
  roads: ['I-75', 'US 27', 'US 441', 'SR 40', 'SR 200', 'US 301'],

  words: {
    street: ['Silver Springs Boulevard', 'SR 200', 'SR 40', 'Pine Avenue', 'College Road', 'Fort King Street'],
    water: ['the Rainbow River', 'Silver Springs', 'the Ocklawaha', 'Lake Weir'],
    hood: ['Silver Springs Shores', 'Marion Oaks', 'Ocklawaha', 'Belleview', 'Reddick', 'West Ocala'],
    thing: ['horse trailer', 'sand pit', 'pasture fence', 'garage fan', 'boiled peanuts', 'sweet tea', 'scrub', 'carport', 'exit strip', 'concrete-block garage'],
    weather: ['afternoon thunderstorm', 'brush-fire warning', 'storm watch']
  }
});
