SB.Cities.register('cincinnati', {
  v: 1,
  slug: 'cincinnati',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of cincinnati', 'xavier university', 'northern kentucky university', 'nku', 'miami university', 'cincinnati enquirer', 'citybeat', 'cincinnati bengals', 'bengals', 'cincinnati reds', 'fc cincinnati', 'kings island', 'cincinnati zoo', 'cincinnati museum center', 'procter and gamble', 'p&g', 'kroger', 'fifth third bank', 'cincinnati children\'s hospital', 'uc health', 'great american ball park', 'paycor stadium', 'taft theatre', 'cincinnati symphony', 'wlw', 'wkrc', 'wcpo', 'wxix', 'wcet', 'findlay market', 'oktoberfest zinzinnati', 'riverfest', 'bunbury', 'cincinnati marathon', 'cvg', 'fort thomas', 'brent spence bridge', 'roebling bridge', 'purple people bridge', 'skyline chili', 'gold star chili', 'graeter\'s'],
  blocklist: ['cincinnati enquirer*', 'citybeat*', 'kings island*', 'skyline chili*', 'gold star chili*', 'findlay market*', 'graeter*'],

  blurb: ['Hardcore and metal bounce between Northside and the Kentucky side of the river in rooms that open and close.',
          'A scrappy crowd, rebuilt after the bar closures and still hunting all-ages spaces that are not bars.'],
  hard: 'Rooms close without warning, and the river splits the scene in two states.',
  region: 'the Ohio Valley',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83 },
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16 },
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],
  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'Punk, hardcore and metal communities fill the bills.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Cincinnati' },
    { id: 'covington', kind: 'FEEDER', name: 'Covington', minutes: 10, bearing: 175, beyond: 'river-bridges', note: 'Across the bridge; hardcore and metal kids.' },
    { id: 'newport', kind: 'FEEDER', name: 'Newport', minutes: 10, bearing: 165, beyond: 'river-bridges', note: 'The same river-hop scene.' },
    { id: 'norwood', kind: 'FEEDER', name: 'Norwood', minutes: 15, bearing: 55, note: 'Small and close.' },
    { id: 'florence', kind: 'FEEDER', name: 'Florence', minutes: 20, bearing: 190, beyond: 'river-bridges', note: 'Suburban strip-mall kids; car only.' },
    { id: 'milford', kind: 'FEEDER', name: 'Milford', minutes: 25, bearing: 85, note: 'A small east-side suburb.' },
    { id: 'mason', kind: 'FEEDER', name: 'Mason', minutes: 30, bearing: 30, note: 'A northern suburb; teens drive down.' },
    { id: 'lawrenceburg', kind: 'FEEDER', name: 'Lawrenceburg', minutes: 30, bearing: 245, note: 'An Indiana river town with a casino strip.' },
    { id: 'hamilton', kind: 'FEEDER', name: 'Hamilton', minutes: 35, bearing: 340, note: 'A factory town with garage bands.' },
    { id: 'oxford', kind: 'FEEDER', name: 'Oxford', minutes: 45, bearing: 310, note: 'Students.' },
    { id: 'dayton', kind: 'PEER', name: 'Dayton', minutes: 55, bearing: 25, slug: 'dayton-oh', note: 'The closest sister scene.' },
    { id: 'lexington', kind: 'PEER', name: 'Lexington', state: 'KY', minutes: 80, bearing: 170, slug: 'lexington-ky', note: 'Smaller, with a similar hardcore scene.' },
    { id: 'louisville', kind: 'PEER', name: 'Louisville', state: 'KY', minutes: 100, bearing: 235, slug: 'louisville', note: 'A larger sister scene.' },
    { id: 'columbus', kind: 'PEER', name: 'Columbus', minutes: 105, bearing: 60, slug: 'columbus', note: 'The big neighbor up the interstate.' }
  ],

  chokepoints: [{ id: 'river-bridges', name: 'the bridges over the Ohio', p: 0.04 }],

  hoods: [
    { id: 'northside', name: 'Northside', route: 'old-side', note: 'An old-house neighborhood north of downtown; the main punk and queer arts district, with bars and small venues.' },
    { id: 'otr', name: 'Over-the-Rhine', route: 'downtown', note: 'Dense brick, bars and gentrified nightlife. Not DIY.' },
    { id: 'clifton', name: 'Clifton and Short Vine', route: 'campus', note: 'Students and old houses near the big hospitals.' },
    { id: 'camp-washington', name: 'Camp Washington', route: 'work-side', note: 'Industrial blocks, warehouses and cheap buildings in the valley.' },
    { id: 'covington', name: 'Covington', route: 'old-side', note: 'Across the river: bars and converted spaces, where much of the hardcore and metal scene lives.' },
    { id: 'newport', name: 'Newport', route: 'downtown', note: 'Across the river: bars and an entertainment strip.' },
    { id: 'price-hill', name: 'Price Hill and Westwood', route: 'work-side', note: 'Steep west-side hillsides with cheap houses and basements.' },
    { id: 'norwood', name: 'Norwood', route: 'work-side', note: 'A small blue-collar city surrounded by Cincinnati; old factories.' },
    { id: 'oakley', name: 'Oakley and Pleasant Ridge', route: 'old-side', note: 'East-side bungalows and a few venues.' }
  ],

  contacts: ['dayton-oh', 'lexington-ky', 'louisville', 'columbus'],

  points: [
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83, pop: 2240000 },
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16, pop: 2200000 },
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76, pop: 1390000 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 9500000 }
  ],
  roads: ['I-71', 'I-75', 'I-74', 'I-275', 'Route 50', 'Colerain Avenue'],

  words: {
    street: ['Vine Street', 'Main Street', 'Ludlow Avenue', 'Hamilton Avenue', 'Colerain Avenue', 'Madison Road'],
    water: ['the Ohio', 'Mill Creek'],
    hood: ['Northside', 'Camp Washington', 'Price Hill', 'Covington', 'Newport', 'Norwood'],
    thing: ['chili', 'hillside', 'river bridge', 'brick', 'fire marshal'],
    weather: ['river flood', 'ice on the hills']
  },

  events: [
    { id: 'CINCINNATI_BRIDGE_BACKUP', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Crews are working on the big bridge over the Ohio this week.',
      title: 'The river bridge is jammed',
      body: 'A wreck has the big bridge over the river backed up the night of your show. The Kentucky side of the scene, bands and kids, is stuck on the far bank.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'It never cleared. The ones on the far side stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads came together the long way. They will remember that.' }
      ] }
  ]
});
