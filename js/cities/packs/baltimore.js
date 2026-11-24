SB.Cities.register('baltimore', {
  v: 1,
  slug: 'baltimore',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['johns hopkins', 'jhu', 'towson university', 'university of maryland', 'umd', 'umbc', 'morgan state', 'loyola', 'coppin state', 'maryland institute college of art',
           'mica', 'university of baltimore', 'baltimore sun', 'baltimore banner', 'baltimore magazine', 'baltimore beat', 'city paper', 'wbal', 'wjz', 'wmar', 'wypr', 'wtmd',
           'baltimore orioles', 'orioles', 'baltimore ravens', 'ravens', 'camden yards', 'm&t bank stadium', 'inner harbor', 'national aquarium', 'fort mchenry', 'port of baltimore',
           'key bridge', 'francis scott key bridge', 'bethlehem steel', 'sparrows point', 'johns hopkins hospital', 'preakness', 'artscape', 'hurricane isabel', 'hurricane sandy',
           'ghost ship', 'natty boh', 'old bay', 'edgar allan poe', 'lexington market', 'the wire',
           'subscape', 'disturbin\' the peace', 'fells point fun festival', 'honfest', 'hampdenfest', 'afram', 'pimlico', 'laurel park', 'baltimore soundstage',
           'baltimore fishbowl', 'bmoreart', 'wmuc', 'baltimore watchdog', 'recher theatre', 'druid hill park', 'church of the guardian angel', 'sail 250',
           'kinetic sculpture race', 'baltimore pride'],
  blocklist: ['johns hopkins*', 'baltimore sun*', 'baltimore banner*', 'camden yards*', 'artscape*', 'natty boh*', 'old bay*', 'preakness*', 'recher theatre*'],

  blurb: ['A rowhouse port city where cheap warehouses launched a loud, close scene, and hardcore and noise bands form fast and play everywhere.',
          'Everyone is in three bands. Shows happen in basements, galleries and old industrial blocks, with a mix of ages and a rail yard out back.'],
  hard: 'Fire code and gentrifying rents keep closing the best warehouses.',
  region: 'the Mid-Atlantic',
  houseType: 'ROWHOUSE',
  whereGo: [
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .10, reason: 'A long hardcore history and a recent boom: a new band every week, and the kids show up for all of them.' }
  ],

  chokepoints: [
    { id: 'harbor-tunnels', name: 'the harbor tunnels', p: .025 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Baltimore' },
    { id: 'towson', kind: 'FEEDER', name: 'Towson', minutes: 20, bearing: 5, scene: 80, note: 'A student suburb with house shows.' },
    { id: 'catonsville', kind: 'FEEDER', name: 'Catonsville', minutes: 20, bearing: 250, note: 'A west-side suburb. The kids ride in.' },
    { id: 'dundalk', kind: 'FEEDER', name: 'Dundalk', minutes: 20, bearing: 115, beyond: 'harbor-tunnels', note: 'An old steel and shipyard blue-collar town.' },
    { id: 'glen-burnie', kind: 'FEEDER', name: 'Glen Burnie', minutes: 20, bearing: 185, beyond: 'harbor-tunnels', note: 'A south suburb with metal and punk kids.' },
    { id: 'columbia', kind: 'FEEDER', name: 'Columbia', minutes: 30, bearing: 225, note: 'A planned suburb with many teenage bands.' },
    { id: 'annapolis', kind: 'FEEDER', name: 'Annapolis', minutes: 40, bearing: 165, beyond: 'harbor-tunnels', note: 'A small town down the Bay corridor.' },
    { id: 'bel-air', kind: 'FEEDER', name: 'Bel Air', minutes: 40, bearing: 35, note: 'The north exurb.' },
    { id: 'westminster', kind: 'FEEDER', name: 'Westminster', minutes: 50, bearing: 305, note: 'Rural west. Occasional.' },
    { id: 'washington', kind: 'PEER', name: 'Washington', state: 'DC', minutes: 60, bearing: 215, slug: 'washington-dc', note: 'Larger, with an older punk lineage. The two scenes share bands and bills.' },
    { id: 'wilmington', kind: 'PEER', name: 'Wilmington', state: 'DE', minutes: 85, bearing: 50, slug: 'wilmington-de', note: 'Smaller, on the same road.' },
    { id: 'philadelphia', kind: 'PEER', name: 'Philadelphia', state: 'PA', minutes: 105, bearing: 45, slug: 'philadelphia', note: 'Larger, and the other end of the touring corridor.' }
  ],

  hoods: [
    { id: 'station-north', name: 'Station North', route: 'downtown', note: 'An arts district near the train station: galleries, bars and many DIY rooms.' },
    { id: 'charles-village', name: 'Charles Village', route: 'campus', note: 'Rowhouses beside the big private university. Students and artists.' },
    { id: 'hampden', name: 'Hampden', route: 'old-side', note: 'Old mill rowhouses, now bars and shops. Mixed tolerance for noise.' },
    { id: 'remington', name: 'Remington', route: 'work-side', note: 'Old industrial blocks and rowhouses. Cheap space and warehouse shows.' },
    { id: 'highlandtown', name: 'Highlandtown', route: 'old-side', note: 'Rowhouses with long-time residents and artists side by side.' },
    { id: 'pigtown', name: 'Pigtown', route: 'work-side', note: 'Rowhouses beside the rail yards.' },
    { id: 'fells-point', name: 'Fells Point', route: 'downtown', note: 'Waterfront bars in old brick. Loud.' },
    { id: 'curtis-bay', name: 'Curtis Bay', route: 'work-side', note: 'The industrial south end by the harbor. Cheap.' },
    { id: 'waverly', name: 'Waverly', route: 'old-side', note: 'Rowhouses and a lot of band houses.' },
    { id: 'towson', name: 'Towson', route: 'town:towson', note: 'Campus-edge houses north of the city. The school year decides everything.' }
  ],

  rooms: [
    { id: 'waverly-rowhouse', kind: 'HOUSE', hood: 'waverly', cap: 60, curfew: 1350, ac: false, outdoor: false, start: true,
      note: 'A rowhouse basement with a low ceiling and a floor drain. The neighbors share the wall, and one complaint ends the night.' },
    { id: 'charles-house', kind: 'HOUSE', hood: 'charles-village', cap: 50, curfew: 1320, ac: false, outdoor: false,
      note: 'A student rowhouse beside the big university. The students rotate every year, so the house changes hands every August.' },
    { id: 'towson-house', kind: 'HOUSE', hood: 'towson', cap: 60, ages: ['A18'], curfew: 1350, ac: false, outdoor: false,
      note: 'A campus-edge house up the road. A student group built a punk crowd here, and the term calendar decides everything.' },
    { id: 'church-basement', kind: 'DIY', hood: 'remington', cap: 150, curfew: 1320, ac: true,
      note: 'A sober basement room under a church, with a stage and a back practice room. A daycare uses it by day, so load-in is tight.' },
    { id: 'gallery-strip', kind: 'DIY', hood: 'station-north', cap: 120, curfew: 1380, ac: false,
      note: 'Storefronts and upper-floor galleries in the arts district. The all-ages crowd found its feet here before.' },
    { id: 'freight-warehouse', kind: 'DIY', hood: 'remington', cap: 100, curfew: 1380, ac: false, pressure: 70, needs: ['VOUCH'],
      note: 'A warehouse with a freight elevator and no second exit. The fire marshal is the enemy.' },
    { id: 'parish-hall', kind: 'HALL', hood: 'highlandtown', cap: 200, curfew: 1350, ac: true,
      note: 'A parish hall rented for a flat fee, with a priest who has to be told it is a concert.' },
    { id: 'arts-club', kind: 'CLUB', hood: 'station-north', cap: 300, ages: ['ALL'], curfew: 1410, ac: true,
      note: 'The club on the arts-district strip that the local hardcore kids headline. A band member is among the owners.' },
    { id: 'hampden-club', kind: 'CLUB', hood: 'hampden', cap: 200, ages: ['A21'], curfew: 1470, ac: true,
      note: 'A bar with a stage on the main avenue. The crowds have grown and the noise tolerance is mixed.' },
    { id: 'highlandtown-bar', kind: 'BAR', hood: 'highlandtown', cap: 150, ages: ['A21'], curfew: 1440, ac: true,
      note: 'A corner bar where a lot of the older heads got their start.' },
    { id: 'york-road-bar', kind: 'BAR', hood: 'charles-village', cap: 250, ages: ['A21'], curfew: 1440, ac: true,
      note: 'A bar north of the university with a back-room stage. The hardcore crowds have grown past the room.' },
    { id: 'harbor-hall', kind: 'BIG', hood: 'fells-point', cap: 1000, ages: ['ALL'], curfew: 1380, ac: true,
      note: 'The big hall near the harbor. It holds the yearly hardcore festival in February, and tours skip it unless the bill is big.' },
    { id: 'howard-street-rooms', kind: 'CLUB', hood: 'station-north', cap: 300, ages: ['A18'], curfew: 1410, ac: true, pressure: 65,
      note: 'Two neighboring rooms on one block. They ran into noise violations this year, and the festival splits its bands across both.' },
    { id: 'park-pavilion', kind: 'OUTDOOR', hood: 'waverly', cap: 80, curfew: 1140, outdoor: true,
      note: 'A pavilion in a park with a generator. Daylight only, and nobody asks twice.' }
  ],

  contacts: ['washington-dc', 'philadelphia', 'york-pa', 'harrisburg-pa'],

  calendar: [
    { id: 'spring-arts', label: 'the spring downtown arts weekend', tag: 'festival', month: 5, week: 4, dows: [5, 6], can: [.92, .90, .90], hoods: ['station-north'], elsewhere: [1, .97, .97] },
    { id: 'horse-race', label: 'the big horse race', tag: 'race', month: 5, week: 3, dows: [5], can: [.95, .92, .92] },
    { id: 'summer-arts', label: 'the big summer arts festival', tag: 'festival', month: 6, week: 3, dows: [4, 5, 6], can: [.90, .88, .88] },
    { id: 'underground-fest', label: 'the free underground music festival', tag: 'festival', month: 8, week: 4, dows: [4, 5, 6], can: [.85, .85, .85], hoods: ['station-north'], elsewhere: [.92, .90, .90] },
    { id: 'waterfront-fest', label: 'the waterfront festival', tag: 'festival', month: 10, week: 1, dows: [4, 5, 6], can: [.85, .85, .85], hoods: ['fells-point', 'highlandtown'], elsewhere: [1, .97, .97] },
    { id: 'hardcore-fest', label: 'the winter hardcore festival', tag: 'festival', month: 2, week: 3, dows: [4, 5, 6], can: [.92, .90, .90] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [6], can: [.88, .95, .95], hoods: ['pigtown'], elsewhere: [1, 1, 1] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 4], dows: [6], can: [.88, .95, .95], hoods: ['pigtown'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1260, curfewMinors: { weeknight: 1320, weekend: 1380, inForce: false } },

  points: [
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04, pop: 6300000 },
    { name: 'Wilmington', state: 'DE', lat: 39.74, lon: -75.55, pop: 72000 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17, pop: 6200000 },
    { name: 'York', state: 'PA', lat: 39.96, lon: -76.73, pop: 44000 }
  ],
  roads: ['I-95', 'I-83', 'I-695', 'I-70', 'I-97'],

  words: {
    street: ['North Avenue', 'Charles Street', 'Greenmount Avenue', 'Eastern Avenue', 'Pratt Street', 'Howard Street'],
    water: ['the Patapsco', 'Jones Falls', 'the Chesapeake'],
    hood: ['Station North', 'Charles Village', 'Hampden', 'Remington', 'Highlandtown', 'Pigtown', 'Fells Point', 'Curtis Bay', 'Waverly'],
    thing: ['rowhouse', 'formstone', 'stoop', 'warehouse', 'freight elevator', 'crab feast'],
    weather: ['humidity', 'snow day', 'afternoon thunderstorm']
  },

  events: [
    { id: 'BALTIMORE_WATERFRONT_CROWDS', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'A festival weekend is coming to the waterfront, with free entry, closed streets and no parking.',
      title: 'The festival takes the bus line',
      body: 'The streets are closed, the buses are rerouted and the lots are full. A bar show nearby has lost its parking, and the crowd has to walk.',
      options: [
        { id: 'LATE', label: 'Push doors back until the streets reopen', likely: 'The people who walk in will make it, but it\'s a later night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'You opened doors an hour late, and the crowd came on foot, loud and a little sunburnt.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Half the list gets stuck in the crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The people who were already in the neighborhood came, and nobody else could get through.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'BALTIMORE_SUMMER_CURFEW', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [6, 7, 8] },
      telegraph: 'The summer youth curfew is on, and the patrol cars are out by ten on weeknights.',
      title: 'The patrol rounds up the kids',
      body: 'Officers are driving under-17s home at ten on a weeknight, and half the bill still has to play, so the all-ages crowd is looking at the clock.',
      options: [
        { id: 'EARLY', label: 'Move the start up and finish before ten', likely: 'Most of the kids get to see the whole bill.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'You opened doors early, and the last band was done by a quarter to ten.' },
        { id: 'ACCEPT', label: 'Run it and let them go home', likely: 'The kids leave before the last bands.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The kids left in the middle of the second set, and the last band played to the grown-ups.' },
        { id: 'MOVE', label: 'Move it to a bar night for the older crowd', likely: 'It\'s smaller and later, and the kids miss it.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'BAR', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'A bar took the bill, and the older crowd stayed late while the kids stayed home.' }
      ] },

    { id: 'BALTIMORE_NINE_O_CLOCK', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The night noise limit starts at nine, and the sound check started after dinner.',
      title: 'The officer read the rule',
      body: 'A basement show has an officer at the door who read the nighttime noise code. The walls are shared, and the soundcheck is already on the record.',
      options: [
        { id: 'EARLY', label: 'Cut the bill short and finish by nine', likely: 'It\'s a short night, and nobody gets a ticket.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'It was two bands and a loud last song at five to nine, and the officer waited by the stoop.' },
        { id: 'ACCEPT', label: 'Run it and take the ticket', likely: 'The night goes on, and the ticket arrives later.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }, { op: 'MONEY', amount: -40 }],
          result: 'The bill ran its length, and by the end the ticket was waiting on the door.' },
        { id: 'MOVE', label: 'Move the whole bill to a hall', likely: 'It\'s bigger and calmer, with a flat fee.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'MONEY', amount: -25 }],
          result: 'A hall took the bill, and the crowd followed the van across the neighborhood.' }
      ] }
  ]
});
