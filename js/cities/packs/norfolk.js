SB.Cities.register('norfolk', {
  v: 1,
  slug: 'norfolk',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['old dominion university', 'odu', 'norfolk state university', 'nsu', 'tidewater community college', 'regent university', 'virginia wesleyan', 'william and mary',
           'christopher newport university', 'virginian-pilot', 'daily press', 'wavy', 'wtkr', 'wvec', 'norfolk naval station', 'naval station norfolk', 'naval air station oceana',
           'oceana', 'little creek', 'langley', 'fort eustis', 'newport news shipbuilding', 'huntington ingalls', 'norfolk southern', 'port of virginia', 'norfolk admirals',
           'norfolk tides', 'norfolk arena', 'chrysler hall', 'harbor park', 'neptune festival', 'azalea festival', 'harborfest', 'virginia beach oceanfront', 'busch gardens',
           'colonial williamsburg', 'hurricane isabel', 'hurricane irene', 'hurricane matthew', 'hurricane sandy', 'hurricane dorian', 'hardcore norfolk',
           'hampton roads bridge-tunnel', 'monitor-merrimac', 'chesapeake bay bridge-tunnel', 'midtown tunnel', 'downtown tunnel'],
  blocklist: ['virginian-pilot*', 'old dominion*', 'norfolk southern*', 'busch gardens*', 'neptune festival*', 'harborfest*', 'hardcore norfolk*'],

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
    { id: 'hampton', kind: 'FEEDER', name: 'Hampton', minutes: 25, bearing: 320, beyond: 'tunnels', note: 'Across the bridge-tunnel. Shows up for the big bills.' },
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
    { id: 'great-bridge', name: 'Greenbrier and Great Bridge', route: 'campus', note: 'Suburban strip-mall rooms and kids with cars.' }
  ],

  contacts: ['richmond', 'washington-dc', 'raleigh', 'baltimore'],

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
        { id: 'EARLIER', label: 'Move the show up an hour so they can beat the tide', likely: 'Some make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who could leave work early beat the water.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people on the other side of the water.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The tunnel never reopened. Only your side of the water showed up.' },
        { id: 'RIDES', label: 'Organize rides the long way round', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads came round by the long bridge together. They will remember that.' }
      ] }
  ]
});
