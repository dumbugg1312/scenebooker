SB.Cities.register('raleigh', {
  v: 1,
  slug: 'raleigh',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['north carolina state university', 'nc state', 'ncsu', 'wknc', 'meredith college', 'peace university', 'shaw university', 'saint augustine\'s university',
           'wake tech', 'university of north carolina', 'unc', 'duke university', 'indy week', 'news and observer', 'n&o', 'wral', 'wunc', 'wake county',
           'carolina hurricanes', 'nc fc', 'carolina railhawks', 'nc state fair', 'red hat amphitheater', 'pnc arena', 'lenovo center', 'carter-finley', 'dorton arena',
           'research triangle park', 'rtp', 'sas institute', 'red hat', 'fort bragg', 'camp lejeune', 'hurricane fran', 'hurricane florence', 'hurricane matthew',
           'hurricane isabel', 'duke', 'tar heels', 'wolfpack',
           'raleigh wide open', 'wide open bluegrass', 'ibma', 'state fairgrounds', 'technician online', 'abc11', 'axios raleigh', 'visit raleigh', 'visitraleigh',
           '6am city', 'raleigh today', 'triangle on the cheap', 'bandsintown', 'ticketfairy', 'dodiy', 'do diy', 'jambase', 'nonoise', 'city of raleigh',
           'raleigh city council', 'raleigh police department', 'nc abc commission', 'spectrum news', 'centennial campus', 'fayetteville street', 'school of government'],
  blocklist: ['nc state*', 'ncsu*', 'wknc*', 'news and observer*', 'indy week*', 'red hat software*', 'sas institute*'],

  blurb: ['A state capital of newcomers and the middle of the Triangle: a big, spread-out city where hardcore and metal rooms come and go.',
          'Scene history is patchy because everyone is from somewhere else. Matinees at stores and halls do the work the bars will not, and the same few dozen faces turn up at each one.'],
  hard: 'Rooms close fast, the Beltline eats load-in, and the kids live out in the suburbs.',
  region: 'the Carolinas',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Durham', state: 'NC', lat: 35.99, lon: -78.9 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 },
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'Hardcore labels, a record shop and a downtown room have kept this town loyal to hardcore.' },
    { fan: 'metal', band: 'metal', d: .08, reason: 'The local metal crowd has been showing up for each other for years.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Raleigh' },
    { id: 'garner', kind: 'FEEDER', name: 'Garner', minutes: 15, bearing: 170, note: 'A working-class suburb to the south; the kids come in.' },
    { id: 'cary', kind: 'FEEDER', name: 'Cary', minutes: 20, bearing: 235, scene: 150, note: 'A huge suburb full of teenagers with cars. A lot of bands start here.' },
    { id: 'knightdale', kind: 'FEEDER', name: 'Knightdale', minutes: 20, bearing: 85, note: 'An east-side suburb; the kids ride in.' },
    { id: 'wake-forest', kind: 'FEEDER', name: 'Wake Forest', minutes: 25, bearing: 5, note: 'A growing bedroom town to the north.' },
    { id: 'apex', kind: 'FEEDER', name: 'Apex', minutes: 25, bearing: 230, note: 'A commuter suburb of young families, with a few bands.' },
    { id: 'clayton', kind: 'FEEDER', name: 'Clayton', minutes: 30, bearing: 140, note: 'A small town past Garner with few shows of its own.' },
    { id: 'fuquay-varina', kind: 'FEEDER', name: 'Fuquay-Varina', minutes: 30, bearing: 195, note: 'A small town with few options.' },
    { id: 'durham', kind: 'PEER', name: 'Durham', minutes: 35, bearing: 315, slug: 'durham-nc', note: 'The Triangle neighbor with a deeper punk and indie lineage.' },
    { id: 'chapel-hill', kind: 'PEER', name: 'Chapel Hill', minutes: 40, bearing: 295, note: 'A student town with many bands and a shared audience.' },
    { id: 'greensboro', kind: 'PEER', name: 'Greensboro', minutes: 90, bearing: 275, slug: 'greensboro-nc', note: 'Smaller, and on the same touring road.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Bars, a few all-ages-friendly rooms and parking decks: the one dense night-out core.' },
    { id: 'glenwood-south', name: 'Glenwood South', route: 'downtown', note: 'A loud bar strip, and expensive. More bachelorette party than basement.' },
    { id: 'oakwood', name: 'Oakwood', route: 'old-side', note: 'Old Victorian houses on quiet streets. Low tolerance for noise.' },
    { id: 'boylan-heights', name: 'Boylan Heights', route: 'old-side', note: 'Small historic streets by the tracks with cheapish renters. House shows are possible.' },
    { id: 'five-points', name: 'Five Points', route: 'old-side', note: 'Leafy bungalows with older money creeping in.' },
    { id: 'hillsborough-street', name: 'Hillsborough Street', route: 'campus', note: 'A strip of cheap food and bars beside the big school. Students and a few rooms.' },
    { id: 'wilmington-street', name: 'South Wilmington Street', route: 'work-side', note: 'Warehouses, auto shops and a rail line. The cheapest space in town.' },
    { id: 'east-raleigh', name: 'East Raleigh and Poole Road', route: 'work-side', note: 'Working-class, older houses, far from the bars.' },
    { id: 'north-raleigh', name: 'North Raleigh', route: 'campus', note: 'Big suburbs and strip malls. The kids who drive in come from here.' },
    { id: 'cary', name: 'Cary', route: 'town:cary', note: 'A huge suburb of teenagers with cars. Rooms here sit in office parks, outside the city rules.' }
  ],

  rooms: [
    { id: 'boylan-house', kind: 'HOUSE', hood: 'boylan-heights', cap: 60, ages: ['ALL'], curfew: 1350, ac: false, outdoor: false, pressure: 55, start: true,
      note: 'A rented house on a small historic street, donation at the door and all ages. The neighbors have the police on speed dial.' },
    { id: 'campus-basement', kind: 'HOUSE', hood: 'hillsborough-street', cap: 80, ages: ['ALL'], curfew: 1380, ac: false, outdoor: false, pressure: 55,
      note: 'A student band basement off the big strip. Packed in term, ticketed for noise, and dark all summer when the students leave.' },
    { id: 'east-porch', kind: 'HOUSE', hood: 'east-raleigh', cap: 40, ages: ['ALL'], curfew: 1320, ac: false, outdoor: true,
      note: 'A porch and a yard on a cheap rental out east. Far from the bars, and the landlord ends it when he hears.' },
    { id: 'community-space', kind: 'DIY', hood: 'wilmington-street', cap: 100, ages: ['ALL'], curfew: 1380, ac: false, outdoor: false, pressure: 55,
      note: 'A community-run space with a donation jar and a mutual-aid shelf. All genres, and the lease is the only threat.' },
    { id: 'cary-diy', kind: 'DIY', hood: 'cary', cap: 120, ages: ['ALL'], curfew: 1350, ac: true, outdoor: false,
      note: 'An all-ages room in an office park out in Cary, opened by a band. The suburban kids come here and nobody calls the cops.' },
    { id: 'downtown-hall', kind: 'HALL', hood: 'downtown', cap: 250, ages: ['A18'], curfew: 1380, ac: true, pressure: 55,
      note: 'The old-line downtown club room for hardcore and punk. Under-eighteens need an adult, and the new sound limits worry the owner.' },
    { id: 'maywood-club', kind: 'CLUB', hood: 'wilmington-street', cap: 300, ages: ['A18'], curfew: 1440, ac: true,
      note: 'A metal-first club south of downtown with a stage and a bar. A sister room closed for good, and everyone knows it.' },
    { id: 'strip-bar', kind: 'BAR', hood: 'glenwood-south', cap: 200, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A bar stage on the loud strip that books punk and metal showcases. Pricey, full of bachelorette parties, and nervous at eleven.' },
    { id: 'record-store', kind: 'SHOP', hood: 'hillsborough-street', cap: 80, ages: ['ALL'], curfew: 1140, ac: true,
      note: 'A record store on the strip doing all-ages matinees. Kids are home before their curfew.' },
    { id: 'amphitheater', kind: 'BIG', hood: 'downtown', cap: 800, ages: ['ALL'], curfew: 1380, ac: true,
      note: 'The big touring room. A booker gets it once, if ever.' }
  ],

  contacts: ['durham-nc', 'greensboro-nc', 'charlotte', 'richmond', 'fayetteville-nc'],

  calendar: [
    { id: 'street-festival', label: 'the downtown street festival', tag: 'festival', month: 10, week: 1, dows: [4, 5], can: [.85, .88, .90], hoods: ['downtown', 'glenwood-south'], elsewhere: [1, .97, .97] },
    { id: 'state-fair', label: 'the state fair', tag: 'fair', month: 10, weeks: [3, 4], dows: [3, 4, 5, 6], can: [.88, .90, .92] },
    { id: 'graduation', label: 'spring graduation', tag: 'graduation', month: 5, week: 2, dows: [4, 5, 6], can: [.85, .90, .92], hoods: ['hillsborough-street'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [2, 4], dows: [5], can: [.88, .95, .95], hoods: ['hillsborough-street'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [2, 4], dows: [5], can: [.88, .95, .95], hoods: ['hillsborough-street'], elsewhere: [1, 1, 1] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 2], dows: [5], can: [.88, .95, .95], hoods: ['hillsborough-street'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1380, curfewMinors: { weeknight: 1380, weekend: 1380, inForce: false } },

  points: [
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 2900000 },
    { name: 'Chapel Hill', state: 'NC', lat: 35.91, lon: -79.06, pop: 61000 },
    { name: 'Fayetteville', state: 'NC', lat: 35.05, lon: -78.88, pop: 210000 },
    { name: 'Greenville', state: 'NC', lat: 35.61, lon: -77.37, pop: 90000 }
  ],
  roads: ['I-40', 'I-440', 'I-540', 'US 1', 'US 64', 'I-85'],

  words: {
    street: ['Hillsborough Street', 'Glenwood Avenue', 'Capital Boulevard', 'Wilmington Street', 'Martin Street', 'Person Street'],
    water: ['the Neuse', 'Walnut Creek', 'Crabtree Creek'],
    hood: ['Oakwood', 'Boylan Heights', 'Five Points', 'Glenwood South', 'Cameron Village', 'Poole Road'],
    thing: ['beltline', 'pollen', 'matinee', 'bungalow', 'barbecue plate', 'garden apartment'],
    weather: ['pollen', 'afternoon thunderstorm', 'ice storm']
  },

  events: [
    { id: 'RALEIGH_STREET_FESTIVAL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The downtown street festival is this weekend and the free stages are going up on every block.',
      title: 'The festival swallows the club blocks',
      body: 'The load-in lane is coned off and the free stages are out-drawing everything downtown. Your matinee is two streets from the loudest one.',
      options: [
        { id: 'LATE', label: 'Push doors back until the stages go quiet', likely: 'The ones who want a real show come late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.95 }],
          result: 'Doors went an hour late, and the festival crowd drifted over, sunburned and loud.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Free music beats a cover charge.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.75 }],
          result: 'The free stages took most of the street, and the regulars carried the room.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'RALEIGH_ELEVEN_SHARP', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [3, 4, 5, 6, 7, 8, 9, 10, 11] },
      telegraph: 'A neighbor on a quiet street has said the police will come at eleven sharp.',
      title: 'Eleven o\'clock is the line',
      body: 'The quiet hour starts at eleven and the neighbors know it. A band that stops at ten fifty-eight beats the ticket. One that plays one more song gets it.',
      options: [
        { id: 'STOP', label: 'End it at ten fifty-eight', likely: 'Everyone goes home early and happy.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.95 }],
          result: 'You cut the last song and had the lights off at ten fifty-eight, and nobody got a ticket.' },
        { id: 'ONE_MORE', label: 'Let them play one more', likely: 'A great last song and a fine.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'REGULARS', pct: .02 }],
          result: 'The last song was the best of the night, and the ticket came a minute later.' }
      ] },

    { id: 'RALEIGH_FAIR_WEEK', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The state fair is on and every kid has ride money and a ticket.',
      title: 'Fair week eats the all-ages bill',
      body: 'The fair is eleven days long, every kid in the county has spent their money on the midway, and the van from out of town is stuck in fair traffic.',
      options: [
        { id: 'SHORT', label: 'Run it as a short bill', likely: 'Half a house and a loose, easy night.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Half the room, a short bill, and a van that finally pulled in at ten.' },
        { id: 'LATE', label: 'Hold the doors for the van', likely: 'A late start, and the kids who came wait it out.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }],
          result: 'The van pulled in late, and you started after nine and nobody left.' }
      ] }
  ]
});
