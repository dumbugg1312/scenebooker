SB.Cities.register('syracuse-ny', {
  v: 1,
  slug: 'syracuse-ny',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['syracuse university', 'suny', 'suny oswego', 'suny cortland', 'suny esf', 'carrier dome', 'jma wireless dome', 'syracuse orange', 'upstate medical university',
           'upstate medical', 'le moyne college', 'lemoyne college', 'onondaga community college', 'new york state fair', 'state fair', 'fort drum',
           '10th mountain division', 'tenth mountain division', 'united way', 'syracuse.com', 'post-standard', 'syracuse new times', 'siberacuse',
           'lock seven hall', 'the salt shed', 'creekwalk annex', 'the hanover loft', 'brine street social club', 'tipp hill parish annex', 'the onondaga room',
           'the third rail basement', 'erie basin hall', 'eastwood grange', 'the lakefront garage', 'westcott porch',
           'syracuse nationals', 'syracuse trad fest', 'salt city horror festival', 'festa italiana', 'syracuse irish festival', 'syracuse arts and crafts festival', 'syracuse jazz fest', 'new york state blues fest', 'nys fairgrounds', 'oncenter', 'the daily orange', 'the news house', 'cnycentral', 'wrvo', 'jerk magazine', 'visit syracuse', 'palace theater', 'onondaga lake park', 'long branch park', 'cny scottish games', 'syracuse bavarian oktoberfest', 'cny pride', 'le moyne', 'rosamond gifford zoo'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real institutions appear only as generic phrases in game text. */
  blocklist: ['syracuse university*', 'suny*', 'carrier dome*', 'new york state fair*', 'fort drum*', 'syracuse new times*', 'the salt shed*'],

  blurb: ['Lake-effect snow decides who shows up. Basements and halls keep the lights on while the college crowd comes and goes.',
          'Students without cars ride in with suburban kids, and winters make the road skip you for bigger cities.'],
  hard: 'Winter weather and thin all-ages rooms; the road skips you for bigger cities.',
  region: 'upstate New York',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Syracuse' },
    { id: 'liverpool', kind: 'FEEDER', name: 'Liverpool and Baldwinsville', minutes: 15, bearing: 330, note: 'Middle-class village suburbs that turn out suburban garage bands.' },
    { id: 'camillus', kind: 'FEEDER', name: 'Camillus and Skaneateles', minutes: 25, bearing: 270, note: 'Lake-resort and suburban villages: richer, quieter.' },
    { id: 'auburn', kind: 'FEEDER', name: 'Auburn', minutes: 30, bearing: 245, note: 'An old factory and prison city with a small scene.' },
    { id: 'cazenovia', kind: 'FEEDER', name: 'Cazenovia', minutes: 30, bearing: 100, note: 'A small college village on the lake.' },
    { id: 'cortland', kind: 'FEEDER', name: 'Cortland', minutes: 35, bearing: 185, note: 'A state college town on the Southern Tier line with a scene of its own.', bands: 2 },
    { id: 'fulton', kind: 'FEEDER', name: 'Fulton', minutes: 35, bearing: 350, note: 'A small mill town on the river north of the city.' },
    { id: 'oneida', kind: 'FEEDER', name: 'Oneida', minutes: 40, bearing: 80, note: 'A small canal and sports city to the east.' },
    { id: 'oswego', kind: 'FEEDER', name: 'Oswego', minutes: 45, bearing: 345, note: 'A lakeport with a state college and a scene of its own.', bands: 2 },
    { id: 'watertown', kind: 'FEEDER', name: 'Watertown', minutes: 70, bearing: 10, note: 'The service city for a big army base: young soldiers who need a night off.', season: { months: [9, 10, 11, 12], mul: 1.2 } },
    { id: 'utica', kind: 'PEER', name: 'Utica', minutes: 50, bearing: 85, slug: 'utica-ny', note: 'A Mohawk Valley mill town with a small scene of its own.' },
    { id: 'ithaca', kind: 'PEER', name: 'Ithaca', minutes: 60, bearing: 185, slug: 'ithaca-ny', note: 'A smaller college town with a respected scene; people travel between the two.' },
    { id: 'binghamton', kind: 'PEER', name: 'Binghamton', minutes: 65, bearing: 175, scene: 800, note: 'A university town down I-81 that links Syracuse to the Pennsylvania side of the circuit.' },
    { id: 'rochester', kind: 'PEER', name: 'Rochester', slug: 'rochester', minutes: 85, bearing: 265, scene: 2400, note: 'The other upstate city and a long-standing rival that trades bands.' }
  ],

  hoods: [
    { id: 'university-hill', name: 'the Hill by campus', route: 'campus', note: 'Big old houses cut into student flats, with fraternity and sorority houses. House shows run by students.' },
    { id: 'westcott', name: 'Westcott', route: 'old-side', note: 'A bohemian strip beside the campus park: students, professors and families, and the closest thing to an outsider\'s idea of a scene.' },
    { id: 'downtown', name: 'downtown and Armory Square', route: 'downtown', note: 'Bars, restaurants and old industrial buildings turned nightlife; 21 and over, popular with students.' },
    { id: 'near-westside', name: 'the Near Westside and the SALT District', route: 'work-side', note: 'Old factory buildings and a rail yard around Onondaga Circle; one of the poorest, cheapest blocks in the city.' },
    { id: 'eastwood', name: 'Eastwood', route: 'old-side', note: 'A working-class village-within-the-city with owner-occupied family houses, basements and garages.' },
    { id: 'tipp-hill', name: 'Tipperary Hill', route: 'old-side', note: 'A proud Irish hill above the canal with pubs, parish halls and family basements.' },
    { id: 'north-side', name: 'the North Side and Little Italy', route: 'work-side', note: 'Cheap storefronts, big old houses and social-club halls, with the highway rebuild changing its edges.' },
    { id: 'south-side', name: 'the South Side', route: 'work-side', note: 'Low-income blocks with vacant lots and boarded two-families, mostly outside the college scene\'s circuit.' }
  ],

  rooms: [
    { id: 'hill-house', kind: 'HOUSE', hood: 'university-hill', cap: 150, ages: ['A18'], curfew: 1440, start: true, ac: false,
      note: 'A gray rented student basement with a side-door guard, doors at 9:30 and cheap cover. It lasts until the tenants graduate.' },
    { id: 'tarp-basement', kind: 'HOUSE', hood: 'university-hill', cap: 60, ages: ['A18'], curfew: 1440,
      note: 'A basement hung wall to wall in blue plastic tarps, built for loud, fast bands. Small, sweaty and gone the moment the organizers get bored.' },
    { id: 'student-houses', kind: 'HOUSE', hood: 'university-hill', cap: 80, ages: ['A18'], curfew: 1440,
      note: 'A rotation of student houses that open their basements on weekends. Turnover is constant and the landlords are watching.' },
    { id: 'avenue-porch', kind: 'HOUSE', hood: 'university-hill', cap: 50, ages: ['A18'], curfew: 1410,
      note: 'A porch on a main avenue near campus that still runs small shows after the big house bans. The street is the limit.' },
    { id: 'yard-blocks', kind: 'OUTDOOR', hood: 'university-hill', cap: 80, ages: ['ALL'], curfew: 1260, outdoor: true,
      note: 'Backyards on the student blocks in the fall, until the nine o\'clock noise line or the first snow.' },
    { id: 'old-storefront', kind: 'DIY', hood: 'near-westside', cap: 100, ages: ['ALL'], curfew: 1350, needs: ['VOUCH'], pressure: 55,
      note: 'A storefront in the cheap old industrial blocks. An all-ages space like it ended once over a landlord fight, and kids still talk about it.' },
    { id: 'east-hall', kind: 'HALL', hood: 'eastwood', cap: 300, ages: ['ALL'], curfew: 1290, ac: true,
      note: 'A rented event hall on the eastern edge with free afternoon bills and a flea market. Daytime keeps it clear of curfew trouble.' },
    { id: 'parish-hall', kind: 'HALL', hood: 'tipp-hill', cap: 150, ages: ['ALL'], curfew: 1320, ac: true, owner: 'HALL_MANAGER',
      note: 'A rented parish or social-club hall on the hill. Nobody has promised it to punks, but the rental is cheap.' },
    { id: 'armory-bar', kind: 'BAR', hood: 'downtown', cap: 250, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A back-room stage in an old industrial building. Heavy bills on weekends, students fill it and locals get carded out.' },
    { id: 'strip-club', kind: 'CLUB', hood: 'westcott', cap: 350, ages: ['A18'], curfew: 1410, ac: true, pressure: 55, needs: ['FULL_BILL'],
      note: 'A converted theater on the strip, shut once by the code office and reopened. Licensed, big and hard to please.' },
    { id: 'hardcore-hall', kind: 'CLUB', hood: 'downtown', cap: 600, ages: ['ALL'], curfew: 1380, ac: true, needs: ['FULL_BILL'],
      note: 'The touring hardcore room, where national bills play weekend afternoons and nights. The local scene\'s top step.' }
  ],

  contacts: ['utica-ny', 'ithaca-ny', 'rochester', 'buffalo'],

  calendar: [
    { id: 'green-parade', label: 'the parade and green-beer Sunday', tag: 'parade', month: 3, weeks: [2, 3], dows: [5, 6], can: [.85, .85, .85], hoods: ['downtown', 'tipp-hill'], elsewhere: [1, .97, .97] },
    { id: 'commencement', label: 'commencement weekend', tag: 'graduation', month: 5, weeks: [2, 3], dows: [4, 5, 6], can: [.80, .85, .90], hoods: ['university-hill', 'downtown'], elsewhere: [.97, .97, .97] },
    { id: 'car-show', label: 'the car show', tag: 'festival', month: 7, weeks: [2, 3], dows: [4, 5, 6], can: [.92, .90, .90] },
    { id: 'arts-fair', label: 'the arts and crafts fair', tag: 'fair', month: 7, week: 3, dows: [4, 5, 6], can: [.92, .90, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'fair-fortnight', label: 'the late-summer fair fortnight', tag: 'fair', month: 8, weeks: [3, 5], dows: [4, 5, 6], can: [.80, .85, .85] },
    { id: 'fall-fests', label: 'the Italian and Irish weekends', tag: 'festival', month: 9, weeks: [1, 3], dows: [5, 6], can: [.92, .92, .92], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 4], dows: [5], can: [.85, .95, .95], hoods: ['university-hill'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [5], can: [.85, .95, .95], hoods: ['university-hill'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1260 },

  points: [
    { name: 'Rochester', state: 'NY', lat: 43.16, lon: -77.61, pop: 210000 },
    { name: 'Binghamton', state: 'NY', lat: 42.10, lon: -75.91, pop: 47000 },
    { name: 'Albany', state: 'NY', lat: 42.65, lon: -73.76, pop: 99000 },
    { name: 'Buffalo', state: 'NY', lat: 42.89, lon: -78.88, pop: 278000 },
    { name: 'Watertown', state: 'NY', lat: 43.97, lon: -75.91, pop: 25000 }
  ],
  roads: ['I-81', 'I-90', 'I-690', 'I-481', 'Route 20', 'Route 5'],

  words: {
    street: ['Westcott Street', 'James Street', 'Erie Boulevard', 'South Salina Street', 'West Onondaga Street', 'Genesee Street', 'Teall Avenue'],
    water: ['Onondaga Lake', 'Onondaga Creek', 'Lake Ontario', 'the Erie Canal'],
    hood: ['Westcott', 'Eastwood', 'Tipperary Hill', 'Tipp Hill', 'Armory Square', 'Little Italy', 'Sedgwick Farms', 'Strathmore', 'Thornden Park'],
    thing: ['snow emergency', 'plow', 'road salt', 'lake effect', 'snow tire', 'viaduct', 'salt potato', 'ramp season', 'steamed window', 'minivan', 'porch', 'skatepark'],
    weather: ['lake effect', 'snow emergency', 'gray November']
  },

  events: [
    { id: 'SYRACUSE_NY_LANDLORD_BAN', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 5], months: [8, 9, 10, 11, 2, 3, 4] },
      telegraph: 'One of the big landlords on the hill is sending a letter to all its tenants about parties.',
      title: 'The landlord ban',
      body: 'An Eastside rental company has banned parties across all its houses, the same week your booked basement was meant to host. The tenants are scared, and the insurance people are watching the block.',
      options: [
        { id: 'PORCH', label: 'Move it to a porch or a yard', likely: 'It\'s smaller and in the open, and the street is the limit.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'OUTDOOR', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'The bill went to a porch, and the neighbors on both sides came out to listen.' },
        { id: 'DAY', label: 'Turn it into a daytime bill', likely: 'You\'re out by dark, and the landlord never sees it.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -180 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Doors were at two, and nobody got a letter, and the sets were short and tight.' },
        { id: 'ACCEPT', label: 'Run it in the basement anyway', likely: 'The tenants are nervous, and so is everyone else.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The room was half empty, and everybody watched the door.' }
      ] },

    { id: 'SYRACUSE_NY_FAIR_FORTNIGHT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The fair is on for two weeks and half the kids on the west edge are working it or riding it.',
      title: 'The fair fortnight',
      body: 'The fair has emptied the west edge and taken half the kids for twelve days. The hall on the east edge still runs a free all-ages afternoon, and your night is right behind it.',
      options: [
        { id: 'AFTERNOON', label: 'Take the afternoon slot at the east hall', likely: 'It\'s free and early, and the kids who stayed show up.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'SHOW_MOD', key: 'lateMin', v: -240 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'The afternoon bill filled the hall with the kids the fair did not take.' },
        { id: 'ACCEPT', label: 'Run it at night as planned', likely: 'A thin crowd, but the regulars come.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'It was a quiet night, because the fair got the rest.' }
      ] },

    { id: 'SYRACUSE_NY_GREEN_SUNDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], calendar: 'parade' },
      telegraph: 'The parade crowd is already building on the hill and the parking is gone.',
      title: 'Green-beer Sunday',
      body: 'The parade crowd has spilled over onto the hill, and a hall booked there cannot find a place for the van. Every bar on the block is shoulder to shoulder.',
      options: [
        { id: 'LATE', label: 'Push doors to the evening', likely: 'The drunks go home and the kids come out.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors were at eight, and the street had emptied and the van got a spot.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' },
        { id: 'ACCEPT', label: 'Run it and walk the gear in', likely: 'Load-in is slow and the crowd is thin.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'lateMin', v: 45 }],
          result: 'You carried gear six blocks and started late, and the ones who found parking were glad.' }
      ] }
  ]
});
