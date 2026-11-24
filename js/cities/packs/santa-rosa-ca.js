SB.Cities.register('santa-rosa-ca', {
  v: 1,
  slug: 'santa-rosa-ca',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['the press democrat', 'press democrat', 'north bay bohemian', 'bohemian', 'sonoma county gazette', 'kzst', 'ksro', 'kqsl', 'wine country radio',
           'santa rosa junior college', 'srjc', 'sonoma state university', 'sonoma state', 'university of san francisco', 'empire college', 'cardinal newman',
           'petaluma high', 'smart train', 'tubbs fire', 'kincade fire', 'ghost ship', 'sonoma county fair', 'gravenstein apple fair', 'apple blossom festival',
           'cotati accordion festival', 'egg bowl', 'eggs day', 'petaluma butter', 'butter and eggs', 'luther burbank', 'montgomery village', 'coddingtown',
           'santa rosa plaza', 'hotel la rose', 'joe rodota trail', 'prince memorial greenway', 'travis air force base', 'travis afb', 'keysight', 'kaiser',
           'giants', 'warriors', '49ers', 'nascar', 'indycar', 'graton',
           'the prune dryer', 'prune dryer', 'hop kiln annex', 'the egg candler hall', 'egg candler hall', 'sebastopol road skate & sound', 'sebastopol road skate',
           'laguna pole barn', 'the depot backroom', 'depot backroom', 'fourth street underpass collective', 'roseland feed & fuel', 'roseland feed',
           'piner road unit 7', 'mark west grange', 'the gravel pit rec', 'gravel pit rec', 'montecito carport', 'vfw', 'american legion',
           'the oak leaf', 'oak leaf news', 'museum of sonoma county', 'sonoma county museum', '707 day', 'kqed', 'stereogum', 'bandsintown', 'bay area hardcore'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The fire is written only as 'the fire' in game text. */
  blocklist: ['press democrat*', 'north bay bohemian*', 'santa rosa junior*', 'sonoma state*', 'ghost ship*', 'luther burbank*', 'sonoma county fair*', 'kzst*'],

  blurb: ['Wine country with tract-home garages for stages. Everyone drives, and the neighbors have already met the police.',
          'Rebuilt streets mean new neighbors with no patience, and the big city to the south steals the better bills.'],
  hard: 'Garages, no basements, close neighbors, and a big city next door that steals the crowd.',
  region: 'the North Bay',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Oakland', state: 'CA', lat: 37.8, lon: -122.27 },
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Santa Rosa' },
    { id: 'rohnert-park', kind: 'FEEDER', name: 'Rohnert Park and Cotati', minutes: 15, bearing: 175, note: 'The nearest college-town feed: a planned suburb and a plaza town with a campus-driven scene.' },
    { id: 'windsor', kind: 'FEEDER', name: 'Windsor', minutes: 15, bearing: 345, note: 'A well-off commuter suburb with no scene of its own.' },
    { id: 'sebastopol', kind: 'FEEDER', name: 'Sebastopol', minutes: 20, bearing: 260, note: 'A small progressive apple town, hippie flavored; Highway 12 floods at the low spot in winter.' },
    { id: 'healdsburg', kind: 'FEEDER', name: 'Healdsburg', minutes: 25, bearing: 340, note: 'A wine-and-restaurants plaza town; the kids come from the working side.' },
    { id: 'petaluma', kind: 'FEEDER', name: 'Petaluma', minutes: 30, bearing: 170, note: 'Old egg country with its own scene; kids trade back and forth.' },
    { id: 'west-county', kind: 'FEEDER', name: 'Forestville and Guerneville', minutes: 35, bearing: 285, note: 'Redwood river towns; the drive home is dark and winding, and the road floods.' },
    { id: 'sonoma', kind: 'FEEDER', name: 'Sonoma and the Valley of the Moon', minutes: 35, bearing: 130, note: 'A plaza wine town with little scene.' },
    { id: 'cloverdale', kind: 'FEEDER', name: 'Cloverdale', minutes: 45, bearing: 335, note: 'The last small town north; a drive from here is an event.' },
    { id: 'ukiah', kind: 'FEEDER', name: 'Ukiah', minutes: 60, bearing: 340, note: 'The next county\'s seat, with a community college and a small scene. A classic north-of-Cloverdale band.' },
    { id: 'napa', kind: 'PEER', name: 'Napa', minutes: 55, bearing: 105, scene: 250, note: 'A fancier wine tourist city with a working side.' },
    { id: 'vallejo', kind: 'PEER', name: 'Vallejo', state: 'CA', minutes: 65, bearing: 125, slug: 'vallejo-ca', note: 'The grittier, cheaper neighbor across the hills.' },
    { id: 'sacramento', kind: 'PEER', name: 'Sacramento', slug: 'sacramento', minutes: 105, bearing: 80, scene: 900, note: 'A bigger capital city where Santa Rosa kids go for shows.' }
  ],

  hoods: [
    { id: 'railroad-square', name: 'Railroad Square', route: 'downtown', note: 'Old brick warehouses and a depot west of the freeway. Nice bones, rising rents, and the neighbors have lawyers.' },
    { id: 'downtown', name: 'Courthouse Square and downtown', route: 'downtown', note: 'Offices, county buildings, bars and a mall split from the old grid. Daytime only.' },
    { id: 'roseland', name: 'Roseland and the southwest', route: 'work-side', note: 'A young, mostly Latino working neighborhood south of downtown. Parish halls, family yards and the cheapest rents in town.' },
    { id: 'industrial', name: 'the Todd, Dutton and Piner industrial blocks', route: 'work-side', note: 'Auto shops and supply units west of the freeway. Where bands rent practice rooms.' },
    { id: 'college', name: 'the college district', route: 'campus', note: 'Old bungalows and cheap apartments around the junior college. Rentals, roommates and landlords who watch.' },
    { id: 'coffey-park', name: 'Coffey Park', route: 'old-side', note: 'Tract homes on the north side, burned and rebuilt. New houses and new neighbors with low patience.' },
    { id: 'rincon-valley', name: 'Rincon Valley and the east side', route: 'campus', note: '1970s to 1990s suburban tracts and strip malls along Highway 12. Where most of the suburban kids grew up.' },
    { id: 'fountaingrove', name: 'Fountaingrove', route: 'old-side', note: 'Hillside money, mostly burned and rebuilt. Not a show neighborhood; it is where the parents\' money lives.' }
  ],


  rooms: [
    { id: 'rincon-garage', kind: 'HOUSE', hood: 'rincon-valley', cap: 60, curfew: 1320, outdoor: true, pressure: 55, start: true, note: 'A tract garage with the door up, no basement and close neighbors. The first complaint is the end.' },
    { id: 'college-bungalow', kind: 'HOUSE', hood: 'college', cap: 50, curfew: 1350, pressure: 55, note: 'An old bungalow with a yard, one of the long-running addresses. The landlord watches and the neighbors are done.' },
    { id: 'coffey-tract', kind: 'HOUSE', hood: 'coffey-park', cap: 40, curfew: 1290, pressure: 65, note: 'A rebuilt tract with new neighbors who have never lived near a garage. Low patience.' },
    { id: 'unit-complex', kind: 'DIY', hood: 'industrial', cap: 80, curfew: 1380, pressure: 55, needs: ['VOUCH'], note: 'A practice-unit complex among the auto shops. The fire marshal has been wary since the big warehouse fire down south.' },
    { id: 'taqueria-corner', kind: 'DIY', hood: 'roseland', cap: 70, curfew: 1350, pressure: 55, note: 'A taqueria with a stage in the back corner, plates of food and kids on the floor. These off-the-books rooms inevitably get shut down.' },
    { id: 'parish-hall', kind: 'HALL', hood: 'roseland', cap: 150, curfew: 1320, ac: true, note: 'A parish hall rented by the night. Someone from the church stays and the lights come up at ten.' },
    { id: 'saloon-upstairs', kind: 'CLUB', hood: 'railroad-square', cap: 300, curfew: 1530, ac: true, following: .5, note: 'The upstairs room of an old saloon, with a full stage and a booth. The heavier bills go here, and ages vary by night.' },
    { id: 'arts-center', kind: 'CLUB', hood: 'railroad-square', cap: 150, ages: ['ALL', 'A21'], curfew: 1350, ac: true, note: 'A small nonprofit arts room with wristbands for the drinkers. The answer to the missing all-ages room.' },
    { id: 'barrelhouse', kind: 'BAR', hood: 'downtown', cap: 120, curfew: 1500, note: 'A bar with a back stage and little money. A regular stop for the local heavy promoters.' },
    { id: 'old-theater', kind: 'BIG', hood: 'downtown', cap: 600, curfew: 1380, note: 'The old downtown movie theater. It books rarely and the rent is high.' },
    { id: 'cafe-set', kind: 'SHOP', hood: 'roseland', cap: 40, curfew: 1140, note: 'A coffee shop in the arts district. Afternoon sets and in-stores, over by seven.' },
    { id: 'creek-corridor', kind: 'OUTDOOR', hood: 'rincon-valley', cap: 100, curfew: 1080, note: 'A generator show in a park or creek bottom. Fire season and smoke close it.' }
  ],

  contacts: ['vallejo-ca', 'sacramento', 'oakland', 'chico-ca'],

  calendar: [
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 7, weeks: [3, 4], dows: [3, 4, 5, 6], can: [.88, .85, .85], elsewhere: [.95, .92, .92] },
    { id: 'big-fest', label: 'the day-long punk and metal fest', tag: 'festival', month: 7, week: 4, dows: [6], can: [1.08, 1.05, 1.05], hoods: ['railroad-square'], elsewhere: [.92, .9, .9] },
    { id: 'apple-fair', label: 'the apple fair', tag: 'fair', month: 8, week: 2, dows: [5, 6], can: [.92, .9, .9] },
    { id: 'fire-season', label: 'fire season heat and smoke', tag: 'holiday', month: 9, weeks: [1, 4], dows: [4, 5, 6], can: [.9, .88, .88] },
    { id: 'football-sep', label: 'high school football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.88, .95, .95] },
    { id: 'football-oct', label: 'high school football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.88, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42, pop: 810000 },
    { name: 'Ukiah', state: 'CA', lat: 39.15, lon: -123.21, pop: 16600 },
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49, pop: 525000 },
    { name: 'Eureka', state: 'CA', lat: 40.8, lon: -124.16, pop: 26000 }
  ],
  roads: ['US 101', 'Highway 12', 'Highway 116', 'Highway 128', 'Highway 37', 'I-80'],

  words: {
    street: ['Sebastopol Road', 'Mendocino Avenue', 'Fourth Street', 'Santa Rosa Avenue', 'Todd Road', 'Dutton Avenue', 'Piner Road'],
    water: ['the Russian River', 'Santa Rosa Creek', 'the Laguna', 'Mark West Creek'],
    hood: ['Roseland', 'Railroad Square', 'Coffey Park', 'Fountaingrove', 'Rincon Valley', 'Bennett Valley', 'Montgomery'],
    thing: ['garage', 'prune orchard', 'hop kiln', 'tasting room', 'generator', 'carport', 'redwood', 'taqueria', 'creek bed', 'driveway', 'power shutoff', 'flashlight', 'parish hall'],
    weather: ['red flag warning', 'power shutoff', 'smoke day', 'tule fog']
  },

  events: [
    { id: 'SANTA_ROSA_CA_POWER_SHUTOFF', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [8, 9, 10, 11] },
      telegraph: 'The red flag warning is up and the power company says it may cut the lights.',
      title: 'The power drops mid-set',
      body: 'A planned shutoff hits the neighborhood in the second band. The amps die, the fridge dies, and the whole driveway goes dark.',
      options: [
        { id: 'HEADLIGHTS', label: 'Park the cars facing the garage and play on', likely: 'Loud, dim, and a story for years.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'The crowd lit the driveway with their headlights and the drummer carried on.' },
        { id: 'GENERATOR', label: 'Borrow a generator and finish the bill', likely: 'Costs money and the neighbors hear it.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'SHOW_MOD', key: 'lateMin', v: 45 }],
          result: 'A borrowed generator rattled the whole street, you finished the set, and the complaint came at eleven.' },
        { id: 'CALLIT', label: 'Call it and send everyone home', likely: 'It\'s safe, but you lose a lot of goodwill.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }],
          result: 'You called it in the dark, and most of them stood in the driveway anyway.' } ] },

    { id: 'SANTA_ROSA_CA_FAIR_CLASH', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The carnival rides are up and the traffic is already backed up on the main road.',
      title: 'The fair takes half your crowd',
      body: 'Half your crowd is at the carnival and the other half is stuck in fair traffic on the way to the bill.',
      options: [
        { id: 'LATE', label: 'Push doors back an hour', likely: 'The crowd comes in from the rides.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late, and the carnival crowd rolled in with prizes.' },
        { id: 'ACCEPT', label: 'Run it as booked', likely: 'The casual crowd is on the Ferris wheel.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The regulars came and nobody else could park.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new date.' } ] },

    { id: 'SANTA_ROSA_CA_NEW_NEIGHBOR', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'A new family moved in two doors down, and a man was seen counting the cars.',
      title: 'The first complaint, before the second band',
      body: 'The new neighbor has never lived near a garage. The call goes in before the second band has plugged in, and a patrol car rolls slowly past.',
      options: [
        { id: 'TURNDOWN', label: 'Turn it down and end early', likely: 'The host keeps the house.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -75 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'You cut the set, the patrol car did not stop, and the host kept the house.' },
        { id: 'KNOCK', label: 'Knock on the door and apologize', likely: 'It could save the night, or it could make it worse.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .95 }, { op: 'REGULARS', pct: .01 }],
          result: 'You knocked on the door, and they took the apology and kept the number.' },
        { id: 'IGNORE', label: 'Ignore it and play on', likely: 'A bad bet.',
          effects: [{ op: 'MONEY', amount: -50 }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The second visit came with a warning, and a fine for the host.' } ] }
  ]
});
