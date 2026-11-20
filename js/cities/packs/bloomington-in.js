SB.Cities.register('bloomington-in', {
  v: 1,
  slug: 'bloomington-in',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['indiana university', 'iu', 'iu bloomington', 'little 500', 'breaking away', 'world\'s greatest college weekend', 'nsa crane',
           'crane naval', 'bloomington transit', 'rural transit', 'greyhound', 'cummins', 'depauw', 'depauw university', 'purdue', 'ball state',
           'indiana state university', 'college mall', 'switchyard park', 'b-line', '7-line', 'brown county state park', 'the karst room',
           'karst room', 'sinkhole annex', 'cutters\' hall', 'quarry lane basement', 'the limestone exchange', 'limestone exchange', 'persimmon hall',
           'clear creek ballroom', 'third street laundry', 'stinesville grange', 'the switchback', 'odd fellows lodge annex', 'dunn street carport'],
  /* The dossier's invented venue names are banned too: research, not content, unchecked. The university appears only as 'the university'. */
  blocklist: ['indiana university*', 'little 500*', 'cummins*', 'purdue*', 'karst room*', 'sinkhole annex*', 'persimmon hall*'],

  blurb: ['A limestone college town in south-central Indiana. Students run the rooms, the crowd listens and then sings every word, and a free house show is the all-ages scene.',
          'Houses die when the tenants graduate, and everyone leaves in May.'],
  hard: 'Hosts graduate and landlords sell; the room you booked may not exist next semester.',
  region: 'the Midwest',
  houseType: 'LIVING_ROOM',

  tilt: [
    { fan: 'folk-punk', band: 'indie', d: .07, reason: 'The same crowd fills both kinds of bills at the student houses.' },
    { fan: 'indie', band: 'folk-punk', d: .07, reason: 'The same crowd fills both kinds of bills at the student houses.' }
  ],
  whereGo: [
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16 },
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76 },
    { name: 'Cincinnati', state: 'OH', lat: 39.1, lon: -84.51 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Bloomington' },
    { id: 'ellettsville', kind: 'FEEDER', name: 'Ellettsville', minutes: 15, bearing: 315, pop: 6655, note: 'A bedroom town on the way to the next county; its kids come in for everything.' },
    { id: 'nashville', kind: 'FEEDER', name: 'Nashville', minutes: 30, bearing: 85, pop: 1256, note: 'An art-colony tourist town in the hills; its workers and kids come to Bloomington.' },
    { id: 'bedford', kind: 'FEEDER', name: 'Bedford', minutes: 30, bearing: 190, pop: 13792, note: 'A limestone quarry town on SR 37 whose kids come up for shows.' },
    { id: 'spencer', kind: 'FEEDER', name: 'Spencer', minutes: 30, bearing: 305, pop: 2454, note: 'A rural county seat, aging.' },
    { id: 'martinsville', kind: 'FEEDER', name: 'Martinsville', minutes: 35, bearing: 15, pop: 11932, note: 'A spa town in the Indianapolis orbit with a bad history; locals are careful there.' },
    { id: 'mitchell', kind: 'FEEDER', name: 'Mitchell', minutes: 35, bearing: 195, pop: 3933, note: 'A railroad and state-park town down SR 37.' },
    { id: 'bloomfield', kind: 'FEEDER', name: 'Bloomfield', minutes: 40, bearing: 250, pop: 2289, note: 'A shrinking rural county seat to the southwest.' },
    { id: 'seymour', kind: 'FEEDER', name: 'Seymour', minutes: 65, bearing: 100, pop: 21569, note: 'A railroad and manufacturing town to the east.' },
    { id: 'terre-haute', kind: 'PEER', name: 'Terre Haute', state: 'IN', minutes: 60, bearing: 275, scene: 700, note: 'A rough, working-class river city with two campuses; a sibling and a rival.' },
    { id: 'columbus', kind: 'PEER', name: 'Columbus', state: 'IN', minutes: 60, bearing: 95, scene: 250, note: 'A company town to the east with a small scene.' },
    { id: 'lafayette', kind: 'PEER', name: 'Lafayette', state: 'IN', minutes: 120, bearing: 355, slug: 'lafayette-in', note: 'A rival college town two hours north.' },
    { id: 'evansville', kind: 'PEER', name: 'Evansville', state: 'IN', minutes: 120, bearing: 230, slug: 'evansville-in', note: 'A bigger river city to the southwest.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Square', route: 'downtown', note: 'Bars, shops and restaurants around Courthouse Square and Kirkwood. Licensed 21+ rooms and the occasional afternoon all-ages show.' },
    { id: 'campus-edge', name: 'the campus edge', route: 'campus', note: 'Big houses cut into student rentals, with party culture and landlords and police who know a loud house.' },
    { id: 'near-west', name: 'the near west side and Prospect Hill', route: 'old-side', note: 'Older houses with porches and some basements; artists, grad students and long-time families. Gentrifying.' },
    { id: 'switchyard', name: 'the old rail yard and McDoel', route: 'work-side', note: 'Former rail land and old warehouses on the south side, now a park and rising rents.' },
    { id: 'south-side', name: 'Bryan Park and the south side', route: 'work-side', note: 'Cheap older houses and garages, more families, and no student landlord.' },
    { id: 'elm-heights', name: 'Elm Heights and the near east side', route: 'old-side', note: 'Quiet, tree-lined and owner-occupied. Neighbors complain fast.' },
    { id: 'east-side', name: 'the east and north sides', route: 'campus', note: 'Chain restaurants, apartment complexes and strip malls on 3rd Street, where the all-ages kids live.' },
    { id: 'county', name: 'Stinesville and the county roads', route: 'work-side', note: 'Barns, yards and quarry country outside the city line. Cheap and loud, but a long drive.' }
  ],

  contacts: ['lafayette-in', 'evansville-in', 'louisville'],

  points: [
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16, pop: 880000 },
    { name: 'Terre Haute', state: 'IN', lat: 39.47, lon: -87.41, pop: 58389 },
    { name: 'Columbus', state: 'IN', lat: 39.2, lon: -85.92, pop: 50474 },
    { name: 'Muncie', state: 'IN', lat: 40.19, lon: -85.39, pop: 65194 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.2, pop: 2800000 }
  ],
  roads: ['I-69', 'SR 37', 'SR 46', 'SR 45', 'I-65', 'I-70'],

  words: {
    street: ['Kirkwood', 'Walnut', 'College Avenue', 'Dunn Street', 'Fourth Street', '3rd Street', 'SR 37', 'SR 46'],
    water: ['Clear Creek', 'Lake Lemon'],
    hood: ['Prospect Hill', 'Elm Heights', 'McDoel', 'Bryan Park', 'Stinesville', 'Ellettsville', 'Vinegar Hill'],
    thing: ['limestone', 'sinkhole', 'quarry', 'porch couch', 'bike path', 'basement', 'persimmon', 'student rental', 'zine table', 'house nickname'],
    weather: ['thunderstorm', 'ice on the hills', 'summer exodus']
  },

  events: [
    { id: 'BLOOMINGTON_IN_LEASE_TURNOVER', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], months: [5, 6, 7, 8] },
      telegraph: 'The tenants at the house you booked are packing up for the summer.',
      title: 'The lease turned over',
      body: 'The students who ran the house graduated, the new tenants have never heard of the bill, and half the street is empty for the summer. The host says the show might still happen if you carry the gear in yourself.',
      options: [
        { id: 'HAUL', label: 'Carry it all in and run it yourself', likely: 'Two hours of your day. A small crowd that listens.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'You borrowed a cart and a porch couch. The few who stayed in town came and went quiet for the first song.' },
        { id: 'PORCH', label: 'Move it to a porch with a neighbor you know', likely: 'Smaller and louder, with a clock on it.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A porch on the near west side took the bill. The neighbor kept one eye on the clock.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] }
  ]
});
