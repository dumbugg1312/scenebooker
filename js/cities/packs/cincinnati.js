SB.Cities.register('cincinnati', {
  v: 1,
  slug: 'cincinnati',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of cincinnati', 'xavier university', 'northern kentucky university', 'nku', 'miami university', 'cincinnati enquirer', 'citybeat', 'cincinnati bengals', 'bengals', 'cincinnati reds', 'fc cincinnati', 'kings island', 'cincinnati zoo', 'cincinnati museum center', 'procter and gamble', 'p&g', 'kroger', 'fifth third bank', 'cincinnati children\'s hospital', 'uc health', 'great american ball park', 'paycor stadium', 'taft theatre', 'cincinnati symphony', 'wlw', 'wkrc', 'wcpo', 'wxix', 'wcet', 'findlay market', 'oktoberfest zinzinnati', 'riverfest', 'bunbury', 'cincinnati marathon', 'cvg', 'fort thomas', 'brent spence bridge', 'roebling bridge', 'purple people bridge', 'skyline chili', 'gold star chili', 'graeter\'s', 'taste of cincinnati', 'bockfest', 'mt adams reindog parade', 'link nky', 'linknky', 'wvxu', 'fox19', 'local12', 'art academy of cincinnati', 'ohio liquor control commission', 'visitcincy', '365cincinnati', 'dayton daily news', 'cincinnati city council', 'spring grove cemetery', 'cincinnati open'],
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
    { id: 'covington', kind: 'FEEDER', name: 'Covington', minutes: 10, bearing: 175, beyond: 'river-bridges', note: 'Across the bridge; hardcore and metal kids.', scene: 100,
      rooms: [
        { id: 'river-bar', kind: 'BAR', hood: 'covington', zone: 'covington', cap: 200, soundFee: 50, ages: ['A21'], curfew: 1500, ac: true, following: .3, standing: [50, 65, 70],
      note: 'A small-stage bar over the river, where the Kentucky half of the scene drinks. Under-21s wait outside.' },
        { id: 'dark-theater', kind: 'BIG', hood: 'covington', zone: 'covington', cap: 800, ages: ['A18', 'A21'], curfew: 1380, ac: true, standing: [40, 60, 55], pressure: 60,
      note: 'A historic theater that went dark when its insurance was dropped. For sale or lease, and nobody will say when it opens.' }
      ] },
    { id: 'newport', kind: 'FEEDER', name: 'Newport', minutes: 10, bearing: 165, beyond: 'river-bridges', note: 'The same river-hop scene.', scene: 100,
      rooms: [
        { id: 'music-hall', kind: 'CLUB', hood: 'newport', zone: 'newport', cap: 400, ages: ['ALL'], curfew: 1410, ac: true, following: .5, standing: [50, 70, 65], owner: 'TALENT_BUYER', needs: ['FULL_BILL'],
      note: 'An old house turned music hall with several rooms. All-ages festivals fill it, and it takes in the bills other rooms drop.' }
      ] },
    { id: 'norwood', kind: 'FEEDER', name: 'Norwood', minutes: 15, bearing: 55, note: 'Small and close.' },
    { id: 'florence', kind: 'FEEDER', name: 'Florence', minutes: 20, bearing: 190, beyond: 'river-bridges', note: 'Suburban strip-mall kids; car only.' },
    { id: 'milford', kind: 'FEEDER', name: 'Milford', minutes: 25, bearing: 85, note: 'A small east-side suburb.' },
    { id: 'mason', kind: 'FEEDER', name: 'Mason', minutes: 30, bearing: 30, note: 'A northern suburb; teens drive down.' },
    { id: 'lawrenceburg', kind: 'FEEDER', name: 'Lawrenceburg', minutes: 30, bearing: 245, note: 'An Indiana river town with a casino strip.' },
    { id: 'hamilton', kind: 'FEEDER', name: 'Hamilton', minutes: 35, bearing: 340, note: 'A factory town with garage bands.', scene: 100,
      rooms: [
        { id: 'brewery-stage', kind: 'OUTDOOR', hood: 'fairfield', zone: 'hamilton', cap: 400, rent: 25, curfew: 1320, standing: [55, 65, 55],
      note: 'A brewery patio with an outdoor stage up north. A two-day all-ages metal weekend lives here, and so does any show with nowhere else to go.' }
      ] },
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
    { id: 'covington', name: 'Covington', route: 'town:covington', note: 'Across the river: bars and converted spaces, where much of the hardcore and metal scene lives.' },
    { id: 'newport', name: 'Newport', route: 'town:newport', note: 'Across the river: bars and an entertainment strip.' },
    { id: 'price-hill', name: 'Price Hill and Westwood', route: 'work-side', note: 'Steep west-side hillsides with cheap houses and basements.' },
    { id: 'norwood', name: 'Norwood', route: 'work-side', note: 'A small blue-collar city surrounded by Cincinnati; old factories.' },
    { id: 'oakley', name: 'Oakley and Pleasant Ridge', route: 'old-side', note: 'East-side bungalows and a few venues.' },
    { id: 'fairfield', name: 'Fairfield', route: 'town:hamilton', note: 'A north suburb of brewery patios and strip malls. Car only, and far from the bus.' }
  ],

  rooms: [
    { id: 'clifton-basement', kind: 'HOUSE', hood: 'clifton', cap: 60, curfew: 1380, ac: false, outdoor: false, standing: [70, 60, 45], pressure: 50, start: true,
      note: 'A student basement near campus that hosts so often it is nearly a venue. Leases turn over every summer and the walk home has a curfew.' },
    { id: 'northside-house', kind: 'HOUSE', hood: 'northside', cap: 50, curfew: 1380, ac: false, outdoor: false, standing: [65, 60, 50], pressure: 55,
      note: 'An old frame house on a residential street. Whether it still hosts depends on the week, and the neighbors have your number.' },
    { id: 'hillside-basement', kind: 'HOUSE', hood: 'price-hill', cap: 40, curfew: 1350, ac: false, outdoor: false, standing: [65, 60, 45], pressure: 45,
      note: 'A basement cut into a steep hillside. The van has to make the climb, and so does everyone carrying an amp.' },
    { id: 'gallery', kind: 'DIY', hood: 'northside', cap: 150, curfew: 1380, ac: false, standing: [60, 60, 50], pressure: 60, needs: ['VOUCH'],
      note: 'A converted gallery that turned punk and hardcore. It is offline for a code renovation, and every permit takes longer than promised.' },
    { id: 'warehouse', kind: 'DIY', hood: 'camp-washington', cap: 120, curfew: 1410, ac: false, standing: [55, 60, 45], pressure: 65, needs: ['VOUCH'],
      note: 'An old warehouse bay in the valley. The last benefit night ended with the fire marshal at the door and a long quiet after.' },
    { id: 'event-center', kind: 'HALL', hood: 'northside', cap: 300, curfew: 1380, ac: true, standing: [60, 60, 65], owner: 'HALL_MANAGER',
      note: 'A converted event center that runs the holiday hardcore fest. Rent and insurance are the whole fight.' },
    { id: 'record-shop', kind: 'SHOP', hood: 'clifton', cap: 60, curfew: 1290, ac: true, standing: [70, 70, 80], following: .2,
      note: 'The record shop on the Clifton strip. Ten-dollar suggested donation, all ages, out by half past nine.' },
    { id: 'strip-bar', kind: 'BAR', hood: 'northside', cap: 150, soundFee: 60, ages: ['A21'], curfew: 1500, ac: true, following: .3, standing: [45, 65, 70], pressure: 55,
      note: 'A stage bar on the main street. The long-running ones cut shows back, and owners call a pit a liability.' },
    { id: 'downtown-theater', kind: 'BIG', hood: 'otr', cap: 1500, ages: ['A18', 'A21'], curfew: 1380, ac: true, standing: [40, 65, 55], owner: 'TALENT_BUYER', notice: 90,
      note: 'The downtown theater with a bar. A step too far for any band that has not toured.' }
  ],

  contacts: ['dayton-oh', 'lexington-ky', 'louisville', 'columbus', 'indianapolis'],

  calendar: [
    { id: 'spring-parade', label: 'the spring baseball parade', tag: 'parade', month: 3, week: 4, dows: [3], can: [.85, .9, .9], hoods: ['otr'], elsewhere: [.97, .97, .97] },
    { id: 'food-fest', label: 'the downtown food festival', tag: 'festival', month: 5, week: 4, dows: [4, 5, 6], can: [.9, .88, .88], hoods: ['otr'], elsewhere: [1, .97, .97] },
    { id: 'metal-fest', label: 'the metal fest across the river', tag: 'festival', month: 6, week: 3, dows: [5], can: [.9, .9, .9], hoods: ['covington', 'newport'], elsewhere: [.96, .96, .96] },
    { id: 'punk-fest', label: 'the all-ages punk fest', tag: 'festival', month: 6, week: 4, dows: [5], can: [.92, .9, .9], hoods: ['newport'], elsewhere: [.97, .97, .97] },
    { id: 'fireworks', label: 'the river fireworks night', tag: 'festival', month: 9, week: 1, dows: [6], can: [.88, .85, .85] },
    { id: 'german-fest', label: 'the big German street festival', tag: 'festival', month: 9, week: 3, dows: [4, 5, 6], can: [.92, .88, .88], hoods: ['otr'], elsewhere: [1, .97, .97] },
    { id: 'football-fall', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [5, 6], can: [.88, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] },
    { id: 'holiday-fest', label: 'the holiday hardcore weekend', tag: 'holiday', month: 12, week: 3, dows: [4, 5], can: [1.08, 1.12, 1.05], hoods: ['northside'], elsewhere: [.95, .95, .95] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1380, inForce: true } },


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
      ] },

    { id: 'CINCINNATI_FIRE_MARSHAL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'A benefit bill is on at a warehouse in the valley, and the word is that the building has never been inspected.',
      title: 'The fire marshal at the door',
      body: 'Fire and police pulled up halfway through a benefit night at a warehouse space. Nobody was arrested, but the head count was over, the exits were short, and the building is done as a venue.',
      options: [
        { id: 'CLEAR', label: 'Clear the room and hand over what is left of the donations', likely: 'The room is lost, and the night ends early.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }, { op: 'MONEY', amount: -40 }],
          result: 'The room emptied calmly. The money went to the cause anyway, and the space never booked again.' },
        { id: 'MOVE', label: 'Move the rest of the bill to a basement', likely: 'Smaller and louder, with a quieter crowd.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'Half the room followed the vans to a basement and the last two bands played anyway.' },
        { id: 'ACCEPT', label: 'Run it small and quiet until they leave', likely: 'They may come back with a clipboard.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'You played it out under a watching eye, and people left early.' }
      ] },

    { id: 'CINCINNATI_THEATER_DARK', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 5] },
      telegraph: 'The big theater across the river has a for-lease sign on it and nobody will say if the next tour date holds.',
      title: 'The theater goes dark',
      body: 'The old theater across the river lost its insurance and closed without warning the week of your show. The bands are booked and the tickets are sold, and the bill needs a new room.',
      options: [
        { id: 'HALL', label: 'Move the bill to the all-ages music hall', likely: 'Smaller, but the crowd follows.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The hall had the night open and took the whole bill. Half the crowd needed a ride over the bridges.' },
        { id: 'PATIO', label: 'Take it north to a brewery stage', likely: 'Far from the bus, and a longer drive for the Kentucky bands.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'A patio stage in the suburbs. The kids who drive came, and the ones who do not, did not.' },
        { id: 'MOVEDAY', label: 'Push the whole bill a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'CINCINNATI_YOUTH_CURFEW', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'Police have been sending kids home from the bus stops after eleven all month.',
      title: 'The eleven o\'clock rule',
      body: 'Fifteen-year-olds are on the door list, and the headliner will not finish before the citywide youth curfew starts. Police have been stopping kids on the walk to the bus.',
      options: [
        { id: 'EARLY', label: 'Move doors up an hour and finish before eleven', likely: 'The young ones get out safely.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .92 }],
          result: 'Doors early, done by half past ten, every kid out the door before the street got watched.' },
        { id: 'RIDES', label: 'Line up rides for the young ones', likely: 'Two hours of your day. They get home.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'The parents on the list were glad to see someone had a plan.' },
        { id: 'ACCEPT', label: 'Run it as planned and hope', likely: 'Some of them leave before the last band.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'Half the kids left early to beat the clock. The last band played to the back wall.' }
      ] }
  ]
});
