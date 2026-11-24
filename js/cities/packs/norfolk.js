SB.Cities.register('norfolk', {
  v: 1,
  slug: 'norfolk',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['old dominion university', 'odu', 'norfolk state university', 'nsu', 'tidewater community college', 'regent university', 'virginia wesleyan', 'william and mary',
           'christopher newport university', 'virginian-pilot', 'daily press', 'wavy', 'wtkr', 'wvec', 'norfolk naval station', 'naval station norfolk', 'naval air station oceana',
           'oceana', 'little creek', 'langley', 'fort eustis', 'newport news shipbuilding', 'huntington ingalls', 'norfolk southern', 'port of virginia', 'norfolk admirals',
           'norfolk tides', 'norfolk arena', 'chrysler hall', 'harbor park', 'neptune festival', 'azalea festival', 'harborfest', 'virginia beach oceanfront', 'busch gardens',
           'colonial williamsburg', 'hurricane isabel', 'hurricane irene', 'hurricane matthew', 'hurricane sandy', 'hurricane dorian', 'hardcore norfolk',
           'hampton roads bridge-tunnel', 'monitor-merrimac', 'chesapeake bay bridge-tunnel', 'midtown tunnel', 'downtown tunnel',
           'festevents', 'norfolk festevents', 'sail250', 'juneteenth norfolk', 'town point park', 'town point virginia wine festival', 'virginia children\'s festival',
           'norfolk arbor day festival', 'lafayette park', 'dragon faire', 'neon district', 'norfolk waterfront jazz festival', 'norfolk latino music and food festival',
           'chartway', 'harbor race weekend', 'wmra', 'whro', 'veer magazine', 'veermag', '13newsnow', '13 news now', 'norfolk police department', 'virginia abc',
           'virginia folklife program'],
  blocklist: ['virginian-pilot*', 'old dominion*', 'norfolk southern*', 'busch gardens*', 'neptune festival*', 'harborfest*', 'hardcore norfolk*', 'festevents*', 'veer magazine*', '13newsnow*'],

  blurb: ['A Navy and shipyard metro split by water, with a hardcore history older than most of the bands. Everyone crosses a tunnel to see a show.',
          'Sailors in civvies stand in the crowd, a deployment empties the room, and a nor\'easter floods the lot. The scene is spread over seven towns and picks a side of the water each night.'],
  hard: 'Tunnels and tides split the crowd, and half the bars are 21 and over.',
  region: 'the Tidewater',
  houseType: 'LIVING_ROOM',
  whereGo: [
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'An all-ages hardcore lineage goes back decades here, and the old heads still tell it.' },
    { fan: 'metal', band: 'metal', d: .06, reason: 'A metal and punk room out in the suburbs keeps the metal crowd coming.' }
  ],

  chokepoints: [
    { id: 'tunnels', name: 'the tunnels', p: .035 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Norfolk' },
    { id: 'portsmouth', kind: 'FEEDER', name: 'Portsmouth', minutes: 15, bearing: 215, beyond: 'tunnels', note: 'Across the river. Few rooms, cheap old houses.' },
    { id: 'chesapeake', kind: 'FEEDER', name: 'Chesapeake', minutes: 20, bearing: 195, note: 'Suburban kids, with a metal and punk room out in the strip malls.' },
    { id: 'virginia-beach', kind: 'FEEDER', name: 'Virginia Beach', minutes: 25, bearing: 95, note: 'The biggest city in the metro. Lots of teenagers and lots of bands.' },
    { id: 'hampton', kind: 'FEEDER', name: 'Hampton', minutes: 25, scene: 55, bearing: 320, beyond: 'tunnels', note: 'Across the bridge-tunnel. Shows up for the big bills.' },
    { id: 'newport-news', kind: 'FEEDER', name: 'Newport News', minutes: 35, bearing: 310, beyond: 'tunnels', note: 'A shipyard town up the peninsula with some bands.' },
    { id: 'suffolk', kind: 'FEEDER', name: 'Suffolk', minutes: 35, bearing: 235, note: 'The rural edge. Kids drive in.' },
    { id: 'williamsburg', kind: 'FEEDER', name: 'Williamsburg', minutes: 55, bearing: 315, beyond: 'tunnels', note: 'A college town that comes down once in a while.' },
    { id: 'richmond', kind: 'PEER', name: 'Richmond', minutes: 95, bearing: 300, slug: 'richmond', note: 'The bigger scene up I-64, with its own long memory.' },
    { id: 'greenville', kind: 'PEER', name: 'Greenville', state: 'NC', minutes: 150, bearing: 215, note: 'Small, students, thin.' }
  ],

  hoods: [
    { id: 'ghent', name: 'Ghent', route: 'old-side', note: 'Old townhouses and restaurants by the creek. Bars and artists, and some of the room supply.' },
    { id: 'downtown', name: 'downtown Norfolk', route: 'downtown', note: 'Waterfront bars, a few music rooms and big arena crowds.' },
    { id: 'arts-district', name: 'the arts district', route: 'downtown', note: 'Old warehouses turned studios and galleries. DIY-friendly.' },
    { id: 'hampton-boulevard', name: 'Hampton Boulevard', route: 'work-side', note: 'Shipyard traffic, auto shops and the old hardcore-hall corridor.' },
    { id: 'colley-avenue', name: 'Colley Avenue', route: 'campus', note: 'Student apartments and cheap food.' },
    { id: 'ocean-view', name: 'Ocean View', route: 'work-side', note: 'Older beach-side houses. Quiet.' },
    { id: 'oceanfront', name: 'the Oceanfront', route: 'downtown', note: 'A tourist strip of bars, loud and pricey.' },
    { id: 'olde-towne', name: 'Olde Towne Portsmouth', route: 'old-side', note: 'Historic houses across the river. Cheap.' },
    { id: 'great-bridge', name: 'Greenbrier and Great Bridge', route: 'campus', note: 'Suburban strip-mall rooms and kids with cars.' },
    { id: 'hampton-hood', name: 'Hampton', route: 'town:hampton', note: 'Across the bridge-tunnel on the peninsula: warehouse rooms, and a long drive home after the show.' }
  ],

  rooms: [
    { id: 'ghent-townhouse', kind: 'HOUSE', hood: 'ghent', cap: 40, curfew: 1320, ac: true, sketch: 20, standing: [65, 60, 45], pressure: 55, start: true,
      note: 'A living room in an old attached townhouse. Short and loud, with thin walls and a lease that turns over with the ship.' },
    { id: 'olde-towne-house', kind: 'HOUSE', hood: 'olde-towne', cap: 50, curfew: 1320, ac: false, sketch: 25, standing: [65, 55, 45], pressure: 50,
      note: 'A porch and a back room in a cheap historic house across the river. The tunnel traffic is the real problem.' },
    { id: 'arts-warehouse', kind: 'DIY', hood: 'arts-district', cap: 120, rent: 70, curfew: 1380, ac: false, sketch: 40, standing: [55, 60, 45], pressure: 60, needs: ['VOUCH'],
      note: 'A warehouse studio that lends its floor for a night. The landlord, the fire code and the redevelopment of the district are all watching.' },
    { id: 'boulevard-hall', kind: 'HALL', hood: 'hampton-boulevard', cap: 200, rent: 220, deposit: 100, curfew: 1350, ac: true, sketch: 15, standing: [55, 60, 65], owner: 'HALL_MANAGER',
      note: 'A rented hall on the shipyard corridor where the old all-ages hardcore shows were held. One bad night with the neighbors and it is gone.' },
    { id: 'taphouse', kind: 'BAR', hood: 'colley-avenue', cap: 250, soundFee: 60, pa: .7, ages: ['ALL', 'A21'], matinee: true, curfew: 1410, ac: true, following: .3, sketch: 20, standing: [50, 65, 70],
      note: 'A grill and taphouse with a stage in the dining room. Doors at seven, all ages early, and it runs close to the edge on money.' },
    { id: 'underground-club', kind: 'CLUB', hood: 'downtown', cap: 400, houseCosts: 200, split: .8, pa: .9, ages: ['ALL'], curfew: 1380, ac: true, following: .5, sketch: 10, standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42,
      note: 'A newer club built to give the underground a permanent room. The real step up, with a bigger guarantee and a bigger bar minimum.' },
    { id: 'ghent-bar', kind: 'BAR', hood: 'ghent', cap: 150, soundFee: 50, pa: .6, ages: ['A21'], curfew: 1500, ac: true, following: .3, sketch: 15, standing: [50, 65, 65], pressure: 50,
      note: 'A bar with a back-room stage, and neighbors above. The late license is what keeps the lights on.' },
    { id: 'oceanfront-bar', kind: 'BAR', hood: 'oceanfront', cap: 200, soundFee: 60, pa: .7, ages: ['A21'], curfew: 1500, ac: true, following: .2, sketch: 25, standing: [45, 60, 65],
      note: 'A tourist-strip bar where the wrong crowd wanders in. Summer rates and no parking.' },
    { id: 'strip-mall-room', kind: 'CLUB', hood: 'great-bridge', cap: 250, houseCosts: 150, split: .8, pa: .8, ages: ['A18'], curfew: 1380, ac: true, following: .4, sketch: 20, standing: [50, 65, 55], pressure: 50,
      note: 'A metal and punk room in a strip mall out in the suburbs. The landlord next door is the problem, and the kids have cars.' },
    { id: 'big-room', kind: 'BIG', hood: 'downtown', cap: 1500, curfew: 1380, ac: true, sketch: 5, standing: [40, 70, 70],
      note: 'A former theater downtown with a big stage. The room you open for, not headline.' },
    { id: 'beach-market', kind: 'OUTDOOR', hood: 'oceanfront', cap: 150, rent: 25, curfew: 1080, sketch: 25, standing: [60, 60, 45],
      note: 'A daytime flea market and a brewery lot near the beach. No quiet-hour problem until the lights go on.' },
    { id: 'hampton-warehouse', kind: 'HALL', hood: 'hampton-hood', cap: 200, rent: 180, deposit: 75, curfew: 1380, ac: false, sketch: 20, standing: [55, 60, 55], owner: 'HALL_MANAGER',
      note: 'A warehouse-style room across the water. All ages, and a tunnel between you and the drive home.' }
  ],

  contacts: ['richmond', 'raleigh', 'washington-dc', 'baltimore', 'wilmington-nc'],

  calendar: [
    { id: 'spring-wine', label: 'the spring wine festival', tag: 'festival', month: 5, week: 1, dows: [5, 6], can: [.95, .92, .92], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'harbor-festival', label: 'the harbor festival', tag: 'festival', month: 6, weeks: [3, 4], dows: [4, 5, 6], can: [.85, .82, .82], hoods: ['downtown', 'ghent'], elsewhere: [.97, .95, .95] },
    { id: 'jazz-fest', label: 'the waterfront jazz festival', tag: 'festival', month: 8, week: 3, dows: [4, 5], can: [.92, .9, .9], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'beach-fall-fest', label: 'the Oceanfront fall festival', tag: 'festival', month: 9, week: 4, dows: [4, 5], can: [.9, .88, .88], hoods: ['oceanfront'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 3], dows: [5], can: [.9, .95, .95], hoods: ['colley-avenue'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 3], dows: [5], can: [.9, .95, .95], hoods: ['colley-avenue'], elsewhere: [1, 1, 1] },
    { id: 'fall-wine', label: 'the fall wine festival', tag: 'festival', month: 10, week: 3, dows: [5, 6], can: [.92, .9, .9], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'road-race', label: 'the November road race weekend', tag: 'race', month: 11, week: 3, dows: [5, 6], can: [.9, .88, .88], hoods: ['downtown', 'ghent'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1380, weekend: 1380, inForce: false } },

  points: [
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44, pop: 1370000 },
    { name: 'Elizabeth City', state: 'NC', lat: 36.3, lon: -76.25, pop: 18000 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64, pop: 1600000 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04, pop: 6300000 }
  ],
  roads: ['I-64', 'I-264', 'I-464', 'I-664', 'US 58', 'US 13'],

  words: {
    street: ['Granby Street', 'Colley Avenue', 'Hampton Boulevard', 'Virginia Beach Boulevard', 'Military Highway', 'Newtown Road'],
    water: ['the Elizabeth River', 'the James', 'Hampton Roads', 'the Lafayette River'],
    hood: ['Ghent', 'Ocean View', 'Olde Towne', 'Greenbrier', 'Great Bridge', 'Colley'],
    thing: ['tunnel', 'shipyard', 'nor\'easter', 'deployment', 'warship', 'flea market'],
    weather: ['nor\'easter', 'tidal flooding', 'afternoon thunderstorm']
  },

  events: [
    { id: 'NORFOLK_TUNNEL_CLOSED', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Water is already standing on the tunnel approaches.',
      title: 'The tunnel is shut',
      body: 'The tide and a nor\'easter have flooded the approach and the tunnel is closed. The bands and the kids from across the water cannot get to you tonight.',
      options: [
        { id: 'EARLIER', label: 'Move the show up an hour so they can beat the tide', likely: 'Some make it, but the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'You moved doors up an hour, and the people who could leave work early beat the water.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'You lose most of the people on the other side of the water.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The tunnel never reopened, and only your side of the water showed up.' },
        { id: 'RIDES', label: 'Organize rides the long way round', likely: 'It takes two hours of your day, but most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads came round by the long bridge together.' }
      ] },

    { id: 'NORFOLK_HARBOR_FESTIVAL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The waterfront festival has the garages full and the load-in street is going to be shut for the fireworks.',
      title: 'The garages are full',
      body: 'Every garage downtown is taken for the festival. Your all-ages bill is on, but the load-in street is a fireworks crowd, and the bands cannot park.',
      options: [
        { id: 'EARLY', label: 'Have the bands load in at four', likely: 'Everyone gets in, but there\'s a long wait before doors.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'The bands loaded in before the crowds and sat in the van for three hours, and the room opened on time.' },
        { id: 'LATE', label: 'Push doors back until the fireworks end', likely: 'The crowd that wants a night out shows up late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors went an hour late, and the festival crowd poured in loud and sunburned.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Half of them cannot find parking.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'People circled the garages and gave up, so it was a thin night but a loud one.' }
      ] },

    { id: 'NORFOLK_CURFEW_SIDEWALK', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The all-ages show is going to run past eleven, and the neighbor still counts the ten o\'clock quiet hour.',
      title: 'The kids on the sidewalk at eleven',
      body: 'The bill runs long. A few seventeen-year-olds and a sailor in civvies are on the sidewalk when the curfew hour hits, and the neighbor next door is on the phone.',
      options: [
        { id: 'CUT', label: 'Cut the last band and clear the sidewalk', likely: 'It\'s a short night, and the headliner is angry.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The last band got half a set, and the sidewalk was empty by eleven.' },
        { id: 'RIDES', label: 'Get the kids into cars and rides home', likely: 'It takes an hour, and the kids remember.',
          effects: [{ op: 'HOURS', d: -1, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'You stood in the lot until every kid had a ride, and their parents noticed.' },
        { id: 'ACCEPT', label: 'Let it run', likely: 'The room risks a visit.',
          effects: [{ op: 'MONEY', amount: -40 }],
          result: 'City police came by at ten past eleven and wrote a warning, and the room paid for it.' }
      ] }
  ]
});
