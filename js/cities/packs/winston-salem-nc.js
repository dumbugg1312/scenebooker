SB.Cities.register('winston-salem-nc', {
  v: 1,
  slug: 'winston-salem-nc',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['wake forest', 'wake forest university', 'winston-salem state', 'unc school of the arts', 'school of the arts', 'salem college', 'forsyth tech', 'catawba',
           'appalachian state', 'app state', 'texas pete', 'cheerwine', 'cook out', 'biscuitville', 'bojangles', 'bojangles\'', 'waffle house', 'krispy kreme',
           'winston-salem journal', 'innovation quarter', 'hanes mall', 'hanes', 'reynolds', 'r.j. reynolds', 'vfw', 'american legion', 'moose lodge', 'elks lodge',
           'national black theatre festival', 'rockabilly weekender', 'carolina classic fair', 'dixie classic fair', 'bowman gray', 'bowman gray stadium', 'camel city',
           'moravian love feast', 'old salem', 'amtrak',
           'salem boiler room', 'brookstown annex', 'camel yard', 'twin city hall', 'peters creek garage', 'waughtown social club', 'moravian star lanes',
           'sunset avenue lodge', 'tobacco row loft', 'fourth and trade basement', 'hanes mill pavilion', 'sauratown barn'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['wake forest*', 'texas pete*', 'cheerwine*', 'cook out*', 'biscuitville*', 'bojangles*', 'winston-salem journal*'],

  blurb: ['A quiet tobacco and textile city where old factories keep turning into labs and apartments. A few people hold the scene together, and a show feels like a regional get-together.',
          'Garage and metal run old, folk-punk and indie run young. Everyone drives, and bands are known by people down the road.'],
  hard: 'Few rooms, patchy all-ages, and a college crowd that resets every semester.',
  region: 'the Piedmont',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Greensboro', state: 'NC', lat: 36.07, lon: -79.79 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 },
    { name: 'Durham', state: 'NC', lat: 35.99, lon: -78.9 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Winston-Salem' },
    { id: 'kernersville', kind: 'FEEDER', name: 'Kernersville', minutes: 15, bearing: 95, note: 'A commuter town toward Greensboro; its kids can go either way.' },
    { id: 'clemmons', kind: 'FEEDER', name: 'Clemmons', minutes: 15, bearing: 255, note: 'A wealthy, church-heavy suburb; kids drive in for shows.' },
    { id: 'lewisville', kind: 'FEEDER', name: 'Lewisville and Pfafftown', minutes: 15, bearing: 300, note: 'Subdivisions and farmland just northwest.' },
    { id: 'king', kind: 'FEEDER', name: 'King', minutes: 20, bearing: 10, note: 'A small mill town up US 52 with some metal and country.' },
    { id: 'lexington', kind: 'FEEDER', name: 'Lexington', minutes: 30, bearing: 195, note: 'A working-class barbecue and furniture town; sends its weird kids north.' },
    { id: 'mocksville', kind: 'FEEDER', name: 'Mocksville', minutes: 30, bearing: 235, note: 'A farm and light-industry county seat on I-40.' },
    { id: 'mount-airy', kind: 'FEEDER', name: 'Mount Airy', minutes: 45, bearing: 340, note: 'A small tourist town with old-time music and very little punk.' },
    { id: 'salisbury', kind: 'FEEDER', name: 'Salisbury', minutes: 45, bearing: 210, note: 'A small city with a college and a downtown; kids come both ways.' },
    { id: 'statesville', kind: 'FEEDER', name: 'Statesville', minutes: 50, bearing: 240, note: 'A distribution and industry town; kids will drive for a show.' },
    { id: 'elkin', kind: 'FEEDER', name: 'Elkin and Yadkinville', minutes: 50, bearing: 295, note: 'Foothills farm and mill towns, now partly wine country.' },
    { id: 'greensboro', kind: 'PEER', name: 'Greensboro', minutes: 30, bearing: 95, slug: 'greensboro-nc', note: 'The true sister city: bigger, with more rooms. People drive both ways.' },
    { id: 'durham', kind: 'PEER', name: 'Durham', minutes: 90, bearing: 100, slug: 'durham-nc', note: 'A bigger, better-known scene and a destination for local kids.' },
    { id: 'roanoke', kind: 'PEER', name: 'Roanoke', state: 'VA', minutes: 120, bearing: 335, slug: 'roanoke-va', note: 'Shows up on routing, but not a regular trade.' },
    { id: 'asheville', kind: 'PEER', name: 'Asheville', minutes: 135, bearing: 255, slug: 'asheville-nc', note: 'A famous arts town in the mountains; a weekend trip both ways.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Trade Street arts corridor', route: 'downtown', note: 'Old tobacco warehouses, theaters and bars. Club shows and the odd loft night, with rents climbing.' },
    { id: 'west-end', name: 'the West End', route: 'old-side', note: 'Bungalows and Victorians west of downtown, with basements and porches. The neighbors are close and quick to call.' },
    { id: 'southside', name: 'Southside and Waughtown', route: 'work-side', note: 'Cheap mill-house streets and corner shops, mostly ignored. The likeliest place for a warehouse or backyard show.' },
    { id: 'ardmore', name: 'Ardmore', route: 'old-side', note: 'Quiet older houses and apartments south of the West End, with few rooms of its own.' },
    { id: 'east-winston', name: 'East Winston and Skyline', route: 'campus', note: 'The long-standing Black commercial and cultural heart, with a historically Black college. A promoter needs a real relationship here, not just a lease.' },
    { id: 'reynolda', name: 'the university area and Reynolda', route: 'campus', note: 'Big old houses and student renters to the northwest. House shows draw noise complaints fast.' },
    { id: 'stratford', name: 'Stratford Road and the southwest strip', route: 'work-side', note: 'Chain restaurants, strip malls and apartment complexes. Vacant retail units and old gym spaces double as practice rooms.' }
  ],

  contacts: ['greensboro-nc', 'durham-nc', 'asheville-nc', 'roanoke-va'],

  points: [
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 2700000 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64, pop: 1400000 },
    { name: 'Boone', state: 'NC', lat: 36.22, lon: -81.67, pop: 20000 },
    { name: 'High Point', state: 'NC', lat: 35.96, lon: -80.0, pop: 115000 }
  ],
  roads: ['I-40', 'US 52', 'I-85', 'US 421', 'Salem Parkway', 'Silas Creek Parkway'],

  words: {
    street: ['Trade Street', 'Fourth Street', 'Salem Parkway', 'Silas Creek Parkway', 'University Parkway', 'Northwest Boulevard', 'Peters Creek Parkway'],
    water: ['Salem Creek', 'the Yadkin', 'Peters Creek', 'Sauratown Mountain'],
    hood: ['West End', 'Ardmore', 'Waughtown', 'Southside', 'Skyline', 'Reynolda', 'Clemmons', 'Kernersville'],
    thing: ['sugar cake', 'red slaw', 'hushpuppies', 'sweet tea', 'tobacco warehouse', 'hot sauce', 'ice storm', 'practice space', 'mill building', 'carport', 'county field'],
    weather: ['afternoon thunderstorm', 'ice storm']
  }
});
