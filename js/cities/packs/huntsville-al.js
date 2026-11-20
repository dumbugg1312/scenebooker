SB.Cities.register('huntsville-al', {
  v: 1,
  slug: 'huntsville-al',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['redstone arsenal', 'redstone', 'marshall space flight center', 'space command', 'nasa', 'von braun', 'space and rocket center', 'cummings research park',
           'university of alabama in huntsville', 'uah', 'alabama a&m', 'athens state university', 'calhoun community college', 'university of north alabama',
           'auburn university', 'panoply arts festival', 'panoply', 'cigar box guitar festival', 'galaxy of lights', 'week of welcome', 'huntsville times',
           'al.com', 'alabama media group', 'midcity district', 'midcity', 'bridge street town centre', 'lowe mill', 'dallas mill', 'lincoln mill',
           'browns ferry', 'oktoberfest', 'scottsboro boys', 'unclaimed baggage', 'trash pandas', 'huntsville havoc', 'krystal', 'whataburger', 'taco bell',
           'waffle house', 'super outbreak', 'vfw', 'american legion', 'moose lodge', 'elks',
           'the spindle room', 'pratt avenue hall', 'cotton row social', 'saturn slab', 'the depot annex', 'tennessee valley rec room', 'monte vista basement',
           'the slow water club', 'huntsville highway bowl-o-rama', 'gate nine', 'the rocket shed', 'big spring lanes'],
  /* Dossier institutions and its unchecked invented venue names are banned: research, not content. */
  blocklist: ['lowe mill*', 'dallas mill*', 'redstone*', 'huntsville times*', 'spindle room*', 'rocket shed*', 'saturn slab*', 'gate nine*'],

  blurb: ['A show here is run by bored, well-equipped kids with cars and good gear, in a city of engineers and contractors.',
          'It is small and scattered across garages, strip-mall bays and church halls, and it quietly rebuilds every few years.'],
  hard: 'Cheap rooms get redeveloped, football Saturdays empty the room, and drummers transfer away each summer.',
  region: 'the Tennessee Valley',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.81 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Huntsville' },
    { id: 'madison', kind: 'FEEDER', name: 'Madison', minutes: 15, bearing: 275, note: 'A fast-growing suburb the city surrounds; arsenal families and teenagers who drive in.' },
    { id: 'decatur', kind: 'FEEDER', name: 'Decatur', minutes: 30, bearing: 255, note: 'A river town on the lake with a small scene and a long shared history.', bands: 2 },
    { id: 'athens', kind: 'FEEDER', name: 'Athens', minutes: 30, bearing: 280, note: 'A county seat on US 72; kids drive over on Fridays.' },
    { id: 'hartselle', kind: 'FEEDER', name: 'Hartselle', minutes: 35, bearing: 230, note: 'A churchy suburb south of the river on I-565.' },
    { id: 'arab', kind: 'FEEDER', name: 'Arab', minutes: 40, bearing: 170, note: 'A small mountaintop town of football and church.' },
    { id: 'fayetteville', kind: 'FEEDER', name: 'Fayetteville', state: 'TN', minutes: 40, bearing: 5, note: 'A Tennessee farm town whose kids pick Huntsville over Nashville for the shorter drive.' },
    { id: 'guntersville', kind: 'FEEDER', name: 'Guntersville', minutes: 45, bearing: 150, note: 'A lake town of boaters and retirees; little scene.' },
    { id: 'scottsboro', kind: 'FEEDER', name: 'Scottsboro', minutes: 55, bearing: 100, note: 'A small river county seat to the east.' },
    { id: 'cullman', kind: 'FEEDER', name: 'Cullman', minutes: 60, bearing: 200, note: 'A conservative farm and small-city town; its teenagers drive an hour for a show.' },
    { id: 'albertville', kind: 'FEEDER', name: 'Albertville and Boaz', minutes: 60, bearing: 145, note: 'Poultry towns on Sand Mountain; regional Mexican music is bigger than rock.' },
    { id: 'shoals', kind: 'PEER', name: 'Florence and Muscle Shoals', minutes: 70, bearing: 265, scene: 1200, note: 'The Shoals: a real music scene of its own that trades shows both ways.' },
    { id: 'birmingham', kind: 'PEER', name: 'Birmingham', minutes: 110, bearing: 200, scene: 3500, note: 'Older, grittier and more musical; the city Huntsville measures itself against.' },
    { id: 'chattanooga', kind: 'PEER', name: 'Chattanooga', minutes: 110, bearing: 90, slug: 'chattanooga-tn', note: 'A similar-size peer with more small rooms and a natural next tour stop.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the old square', route: 'downtown', note: 'Bars, restaurants and apartments around the square and the spring park, with events programmed by the city.' },
    { id: 'five-points', name: 'Five Points and Old Town', route: 'old-side', note: 'Old houses near the foot of the mountain; the nearest thing to a bohemian neighborhood, with close neighbors.' },
    { id: 'mill-village', name: 'the Triana Boulevard mill village', route: 'work-side', note: 'A southwest cotton-mill neighborhood of small houses, studios and artist space.' },
    { id: 'northwest-mills', name: 'the northwest mill belt', route: 'work-side', note: 'Mill villages and big industrial buildings, converted lofts and bungalows.' },
    { id: 'campus', name: 'the university and Sparkman Drive', route: 'campus', note: 'A midsize city campus with student apartments and fast food stretching toward I-565.' },
    { id: 'normal', name: 'Normal', route: 'old-side', note: 'The historically Black university community on the north side; its music is band, gospel and hip-hop, a different audience to treat with care.' },
    { id: 'strips', name: 'the University Drive and Parkway strips', route: 'campus', note: 'Chains and strip centers where a cheap unit or a pizza back room is where a show actually ends up.' },
    { id: 'west-suburbs', name: 'Madison, Hampton Cove and the research corridor', route: 'campus', note: 'Affluent suburbs with big garages and homeowners\' associations.' }
  ],

  contacts: ['chattanooga-tn', 'tuscaloosa-al'],

  points: [
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.81, pop: 1100000 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78, pop: 2000000 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 6100000 },
    { name: 'Florence', state: 'AL', lat: 34.8, lon: -87.68, pop: 40000 }
  ],
  roads: ['I-565', 'US 72', 'US 231', 'US 431', 'I-65', 'AL 53'],

  words: {
    street: ['Memorial Parkway', 'University Drive', 'Governors Drive', 'Holmes Avenue', 'Sparkman Drive', 'Triana Boulevard'],
    water: ['the Tennessee River', 'Big Spring', 'Wheeler Lake', 'Monte Sano'],
    hood: ['Five Points', 'Old Town', 'Twickenham', 'Normal', 'Hampton Cove', 'Madison', 'Lincoln Village'],
    thing: ['meat-and-three', 'white barbecue sauce', 'hush puppy', 'carport', 'mill village', 'tornado siren', 'rocket', 'strip-mall bay', 'church youth hall', 'practice bay', 'garage fan'],
    weather: ['tornado watch', 'humid', 'afternoon thunderstorm']
  }
});
