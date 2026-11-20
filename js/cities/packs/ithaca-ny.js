SB.Cities.register('ithaca-ny', {
  v: 1,
  slug: 'ithaca-ny',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['cornell', 'cornell university', 'cornell daily sun', 'ivy league', 'ithaca college', 'tompkins cortland', 'suny cortland', 'cortland state', 'ithaca journal',
           'gannett', 'ithaca voice', 'ithaca times', 'ithaca festival', 'apple festival', 'chili festival', 'grassroots', 'grassroots festival', 'slope day', 'tcat',
           'ncr', 'south hill business campus', 'ithaca is gorges', 'ten square miles surrounded by reality', 'cornell chicken', 'cornell barbecue', 'salt potatoes',
           'the burlington room', 'wsqx', 'wvbr', 'wicb', 'big red', 'porchfest',
           'ithaca commons', 'collegetown bagels', 'moosewood'],
  /* The dossier names no invented venues beyond the section 11 list, which could not be checked; the colleges, press and festivals are written only in generic form. */
  blocklist: ['cornell*', 'ithaca college*', 'ithaca times*', 'ithaca journal*', 'tcat*', 'grassroots*', 'moosewood*'],

  blurb: ['A gorge-cut college town where the crowd graduates every spring and the basements are slowly torn down for apartments.',
          'Folk and indie drown out punk, but the kids who stay keep a few porches loud.'],
  hard: 'The crowd vanishes every May, all-ages rooms are rare, and snow stops the van on the hill.',
  region: 'the Finger Lakes',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Syracuse', state: 'NY', lat: 43.05, lon: -76.15 },
    { name: 'Rochester', state: 'NY', lat: 43.16, lon: -77.61 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Ithaca' },
    { id: 'dryden', kind: 'FEEDER', name: 'Dryden and Freeville', minutes: 15, bearing: 70, note: 'A bedroom town of cheaper rents; its scene mostly folds into the city.' },
    { id: 'newfield', kind: 'FEEDER', name: 'Newfield', minutes: 15, bearing: 220, note: 'Rural and exurban; its kids come into town.' },
    { id: 'lansing', kind: 'FEEDER', name: 'Lansing', minutes: 20, bearing: 10, note: 'Suburban, with the mall and chain strip north of the city.' },
    { id: 'trumansburg', kind: 'FEEDER', name: 'Trumansburg', minutes: 20, bearing: 310, note: 'A small village across the lake, arts-minded, with a folk and dance reputation.' },
    { id: 'groton', kind: 'FEEDER', name: 'Groton', minutes: 25, bearing: 60, note: 'A working-class village with a firehouse-and-field culture.' },
    { id: 'cortland', kind: 'FEEDER', name: 'Cortland', minutes: 30, bearing: 75, pop: 17500, bands: 2, note: 'The closest other town: a small college-and-townie scene whose kids drive in.' },
    { id: 'moravia', kind: 'FEEDER', name: 'Moravia and Aurora', minutes: 35, bearing: 355, note: 'Lake and farm towns up Route 34; few shows.' },
    { id: 'watkins-glen', kind: 'FEEDER', name: 'Watkins Glen and Montour Falls', minutes: 40, bearing: 250, note: 'Gorge and racing tourist towns at the head of Seneca Lake.', season: { months: [6, 7, 8], mul: 1.3 } },
    { id: 'owego', kind: 'FEEDER', name: 'Owego and Candor', minutes: 40, bearing: 150, note: 'River-valley villages and farms; not much scene.' },
    { id: 'auburn', kind: 'PEER', name: 'Auburn', minutes: 45, bearing: 15, scene: 350, note: 'A small prison-and-industry city to the north with a modest music scene.' },
    { id: 'elmira', kind: 'PEER', name: 'Elmira', minutes: 45, bearing: 205, scene: 400, note: 'A struggling river city south on Route 13; its kids come up for the college scene.' },
    { id: 'binghamton', kind: 'PEER', name: 'Binghamton', minutes: 60, bearing: 110, scene: 1200, note: 'A rougher blue-collar university city; people drive both ways for shows.' },
    { id: 'syracuse', kind: 'PEER', name: 'Syracuse', minutes: 70, bearing: 40, slug: 'syracuse-ny', note: 'The regional hub with far more rooms; it pulls bands and crowds the way a big city pulls from a small one.' }
  ],

  hoods: [
    { id: 'collegetown', name: 'Collegetown', route: 'campus', note: 'Steep streets below the main campus: dense undergrad rentals and new apartment blocks that squeezed the house shows out.' },
    { id: 'downtown', name: 'downtown and the Commons', route: 'downtown', note: 'The flat pedestrian core: bars with stages, a few multi-use rooms, and pricey new construction.' },
    { id: 'fall-creek', name: 'Fall Creek', route: 'old-side', note: 'Old frame houses with basements, shared houses and grad students; the most Ithaca neighborhood, with fewer cheap rooms every year.' },
    { id: 'southside', name: 'the Southside', route: 'work-side', note: 'A historic Black neighborhood of community rooms, church halls and backyards, gentrifying and contested.' },
    { id: 'west-end', name: 'the West End and the Inlet', route: 'work-side', note: 'Light industry, old mills and warehouse sheds by the inlet, and every cheap shed is being eyed by a developer.' },
    { id: 'west-hill', name: 'West Hill', route: 'old-side', note: 'A quietly cheap hillside of basements, garages and backyards that is hard to reach without a car.' },
    { id: 'south-hill', name: 'South Hill', route: 'campus', note: 'The smaller arts-minded college on the hill, with student houses around it.' }
  ],

  contacts: ['syracuse-ny', 'utica-ny', 'poughkeepsie-ny'],

  points: [
    { name: 'Binghamton', state: 'NY', lat: 42.1, lon: -75.91, pop: 45000 },
    { name: 'Rochester', state: 'NY', lat: 43.16, lon: -77.61, pop: 210000 },
    { name: 'Scranton', state: 'PA', lat: 41.41, lon: -75.66, pop: 75000 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01, pop: 8300000 }
  ],
  roads: ['NY 13', 'NY 79', 'NY 96', 'NY 34', 'NY 89', 'I-81'],

  words: {
    street: ['State Street', 'Aurora Street', 'Buffalo Street', 'Meadow Street', 'Danby Road', 'Route 13', 'Route 79'],
    water: ['Cayuga Lake', 'Fall Creek', 'Cascadilla Creek', 'Six Mile Creek', 'the Inlet'],
    hood: ['Collegetown', 'the Commons', 'East Hill', 'South Hill', 'West Hill', 'Fall Creek', 'the Flats', 'Cayuga Heights'],
    thing: ['gorge', 'porch', 'co-op', 'farmers market', 'chicken barbecue', 'cider donut', 'basement', 'hill', 'steep staircase', 'snowbank', 'record store', 'church hall'],
    weather: ['lake effect', 'gray sky', 'mud season', 'snow day']
  }
});
