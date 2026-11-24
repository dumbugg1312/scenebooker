SB.Cities.register('sacramento', {
  v: 1,
  slug: 'sacramento',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['california state university sacramento', 'sacramento state', 'uc davis', 'university of california davis', 'american river college', 'sacramento city college',
           'cosumnes river college', 'sacramento bee', 'sacramento news and review', 'news and review', 'capradio', 'kcra', 'kxtv', 'sacramento kings', 'sacramento republic',
           'sacramento river cats', 'river cats', 'golden 1 center', 'california state fair', 'cal expo', 'california state capitol', 'state of california',
           'mcclellan air force base', 'travis air force base', 'beale air force base', 'kaiser permanente', 'sutter health', 'intel', 'uc davis health', 'mace ranch',
           'old sacramento', 'california state fair', 'golden 1 center', 'sacramento pride', 'second saturday', 'newsreview', 'submerge magazine', 'comstocks', 'sacramento beat', 'sacramento 365', 'sacramento365', 'visit sacramento', 'midtown business association', 'explore midtown', 'downtown sacramento partnership', 'farm to fork', 'farm-to-fork', 'cbs sacramento', 'abc10', 'sacramento zoo', 'sutter\'s fort', 'sacramento international airport', 'arco arena', 'sleep train arena', 'raley field', 'tower bridge', 'submerge', 'cal expo'],
  blocklist: ['sacramento bee*', 'news and review*', 'capradio*', 'sacramento river cats*', 'golden 1*', 'cal expo*'],

  blurb: ['A capital city of porches and tree-lined houses where shows live in living rooms.',
          'Indie and punk share bills, and the scene mostly looks after itself.'],
  hard: 'Rising rents and closed clubs mean every room is a friend\'s house.',
  region: 'the Valley and the Bay',
  houseType: 'LIVING_ROOM',
  whereGo: [
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Oakland', state: 'CA', lat: 37.80, lon: -122.27 },
    { name: 'San Jose', state: 'CA', lat: 37.34, lon: -121.89 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 }
  ],

  tilt: [
    { fan: 'indie', band: 'indie', d: .08, reason: 'The living-room scene of the last few years is indie-led.' }
  ],

  chokepoints: [{ id: 'river-bridges', name: 'the river bridges', p: .02 }],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Sacramento' },
    { id: 'west-sacramento', kind: 'FEEDER', name: 'West Sacramento', minutes: 10, bearing: 275, beyond: 'river-bridges', note: 'Just across the river. A closed bridge cuts it off.' },
    { id: 'elk-grove', kind: 'FEEDER', name: 'Elk Grove', minutes: 20, bearing: 185, note: 'A suburb to the south.' },
    { id: 'davis', kind: 'FEEDER', name: 'Davis', minutes: 25, bearing: 270, note: 'A student town with living-room shows. Bands and kids both come by car or train.', bands: 2, scene: 100,
      rooms: [{ id: 'davis-living-room', kind: 'HOUSE', hood: 'davis-hood', cap: 40, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [70, 60, 45],
      pressure: 40, note: 'A student living room a train ride away. The kids arrive by bike and the bands by car.' }] },
    { id: 'roseville', kind: 'FEEDER', name: 'Roseville', minutes: 25, bearing: 30, note: 'Suburban kids and some bands.', scene: 120,
      rooms: [{ id: 'roseville-club', kind: 'CLUB', hood: 'roseville-hood', cap: 350, houseCosts: 200, split: .8, pa: .9, ages: ['A18'], curfew: 1470, ac: true, following: .5, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The suburban sibling of a Midtown room that closed. Its owners moved the shows up the interstate.' }] },
    { id: 'folsom', kind: 'FEEDER', name: 'Folsom', minutes: 25, bearing: 80, note: 'A suburb out Highway 50.' },
    { id: 'woodland', kind: 'FEEDER', name: 'Woodland', minutes: 30, bearing: 300, note: 'A small farm town.' },
    { id: 'auburn', kind: 'FEEDER', name: 'Auburn', minutes: 40, bearing: 45, note: 'A foothill town.' },
    { id: 'placerville', kind: 'FEEDER', name: 'Placerville', minutes: 50, bearing: 80, note: 'A foothill town with some bands.', bands: 1 },
    { id: 'stockton', kind: 'PEER', name: 'Stockton', minutes: 55, bearing: 185, slug: 'stockton-ca', note: 'A similar Valley scene.' },
    { id: 'modesto', kind: 'PEER', name: 'Modesto', minutes: 90, bearing: 170, slug: 'modesto-ca', note: 'A similar Valley scene farther south.' },
    { id: 'santa-rosa', kind: 'PEER', name: 'Santa Rosa', minutes: 90, bearing: 245, slug: 'santa-rosa-ca', note: 'Over toward the coast hills.' },
    { id: 'chico', kind: 'PEER', name: 'Chico', minutes: 95, bearing: 350, slug: 'chico-ca', note: 'A smaller college scene up the valley.' }
  ],

  hoods: [
    { id: 'midtown', name: 'Midtown', route: 'downtown', note: 'The bar and arts grid, where old houses have turned into punk houses and venues.' },
    { id: 'downtown', name: 'downtown and K Street', route: 'downtown', note: 'Bars and theaters. The small clubs here have mostly closed.' },
    { id: 'oak-park', name: 'Oak Park', route: 'old-side', note: 'An older, mixed neighborhood south of Broadway. House shows and cheap space.' },
    { id: 'east-sac', name: 'East Sacramento', route: 'old-side', note: 'Older, wealthier and tree-lined. Few shows.' },
    { id: 'curtis-park', name: 'Curtis Park and Land Park', route: 'old-side', note: 'Quiet residential streets with backyards.' },
    { id: 'north-sac', name: 'North Sacramento and Del Paso Heights', route: 'work-side', note: 'Industrial streets and backyard studios. Cheap.' },
    { id: 'south-sac', name: 'South Sacramento and Florin', route: 'work-side', note: 'Rows of houses, with some house shows.' },
    { id: 'arden', name: 'Arden and Arcade', route: 'campus', note: 'The suburban middle.' },
    { id: 'davis-hood', name: 'Davis', route: 'town:davis', note: 'A student town of bikes and old houses with living rooms big enough for a band.' },
    { id: 'roseville-hood', name: 'Roseville', route: 'town:roseville', note: 'Suburban sprawl up the interstate, with a bigger club than anything the city has left.' }
  ],

  rooms: [
    { id: 'midtown-living-room', kind: 'HOUSE', hood: 'midtown', cap: 40, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [70, 60, 50],
      pressure: 45, start: true, note: 'A living room with a donation jar and a swap rack by the door. The host never turns a kid away and worries about strangers.' },
    { id: 'oak-park-house', kind: 'HOUSE', hood: 'oak-park', cap: 50, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 50, note: 'An old frame house with a backyard and a cellar door. Cheap and loose, and nobody can say which of these still hold shows.' },
    { id: 'north-yard', kind: 'DIY', hood: 'north-sac', cap: 80, rent: 40, pa: .5, curfew: 1380, ac: false, outdoor: true, sketch: 40, standing: [55, 60, 45],
      pressure: 55, note: 'A backyard studio with a real stage on an industrial-edge street. A show every month or two, and the neighbors are the weather.' },
    { id: 'florin-storefront', kind: 'DIY', hood: 'south-sac', cap: 200, rent: 80, pa: .7, curfew: 1380, ac: false, outdoor: false, sketch: 45, standing: [60, 60, 50],
      pressure: 60, needs: ['VOUCH'], note: 'Two rooms in a strip-mall storefront on the boulevard, the old home of all-ages punk. Rising costs wore the owners down, and the block is rough.' },
    { id: 'zine-storefront', kind: 'DIY', hood: 'midtown', cap: 60, rent: 50, pa: .5, curfew: 1350, ac: true, sketch: 30, standing: [60, 65, 55],
      pressure: 45, note: 'A small art and zine shop that clears the shelves for the odd hardcore bill. Afternoons are better than nights.' },
    { id: 'zine-table', kind: 'SHOP', hood: 'midtown', cap: 40, pa: .4, curfew: 1260, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'In-store sets beside the zine table. Over by nine, and the owner likes it that way.' },
    { id: 'park-hall', kind: 'HALL', hood: 'curtis-park', cap: 120, rent: 120, deposit: 50, pa: .5, curfew: 1320, ac: true, sketch: 10, standing: [60, 60, 65],
      owner: 'HALL_MANAGER', pressure: 45, note: 'A park auditorium on a quiet street. The old punk bills started in rooms like this, and the city can pull it any week.' },
    { id: 'midtown-bar', kind: 'BAR', hood: 'midtown', cap: 120, soundFee: 50, pa: .6, ages: ['A21'], curfew: 1530, ac: true, following: .3, sketch: 20, standing: [50, 65, 70],
      note: 'An old-fashioned bar with a stage in the back. Punk bills on the weekends, and no kids.' },
    { id: 'k-street-club', kind: 'CLUB', hood: 'downtown', cap: 300, houseCosts: 200, split: .8, pa: .9, ages: ['A21'], curfew: 1500, ac: true, following: .6, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The long-running club for touring metal and hardcore. The door and the bar tab are the whole point.' },
    { id: 'big-room', kind: 'BIG', hood: 'midtown', cap: 2150, rent: 2200, deposit: 500, pa: 1, ages: ['A18'], curfew: 1410, ac: true, following: .8, sketch: 5,
      standing: [40, 70, 70], owner: 'TALENT_BUYER', notice: 90, needs: ['FULL_BILL'], note: 'A new room for the touring acts the town used to lose to the Bay. Far past a basement bill.' },
    { id: 'parkway-pavilion', kind: 'OUTDOOR', hood: 'arden', cap: 80, rent: 15, pa: .4, curfew: 1230, ac: false, outdoor: true, sketch: 35, standing: [60, 55, 45],
      note: 'A pavilion on the river parkway. A daytime show in the cooler months, and over before the sun goes.' }
  ],

  contacts: ['stockton-ca', 'chico-ca', 'modesto-ca', 'santa-rosa-ca', 'oakland'],

  calendar: [
    { id: 'state-fair', label: 'the state fair', tag: 'fair', month: 7, weeks: [3, 5], dows: [3, 4, 5, 6], can: [.90, .88, .85] },
    { id: 'state-fair-aug', label: 'the state fair', tag: 'fair', month: 8, week: 1, dows: [3, 4, 5, 6], can: [.90, .88, .85] },
    { id: 'food-festival', label: 'the food festival', tag: 'festival', month: 9, week: 4, dows: [4, 5, 6], can: [.90, .85, .85], hoods: ['midtown', 'downtown'], elsewhere: [1, .97, .97] },
    { id: 'pride-weekend', label: 'pride weekend', tag: 'parade', month: 6, week: 3, dows: [4, 5, 6], can: [1.05, 1.05, 1], hoods: ['midtown', 'downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.85, .95, .95] },
    { id: 'graduation', label: 'graduation weekend', tag: 'graduation', month: 5, weeks: [4, 5], dows: [4, 5, 6], can: [.90, .90, .92] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1320, weekend: 1320, inForce: false } },

  points: [
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42, pop: 810000 },
    { name: 'Reno', state: 'NV', lat: 39.53, lon: -119.81, pop: 270000 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68, pop: 650000 },
    { name: 'Lake Tahoe', state: 'CA', lat: 39.1, lon: -120.03, pop: 22000 }
  ],
  roads: ['I-80', 'I-5', 'Highway 99', 'Highway 50', 'Business 80'],

  words: {
    street: ['J Street', 'Broadway', 'Stockton Boulevard', 'Folsom Boulevard', 'Fruitridge Road', 'Franklin Boulevard'],
    water: ['the American River', 'the Sacramento River'],
    hood: ['Midtown', 'Oak Park', 'East Sac', 'Curtis Park', 'Land Park', 'Del Paso Heights', 'Florin'],
    thing: ['porch', 'swamp cooler', 'delta breeze', 'flea market', 'bike rack', 'donation jar'],
    weather: ['delta breeze', 'smoke day', 'tule fog']
  },

  events: [
    { id: 'SACRAMENTO_RIVER_BRIDGES_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Crews are working on the river bridges this week.',
      title: 'The bridge is shut',
      body: 'A wreck has closed one of the bridges over the river, and the traffic from West Sacramento is stacked up on the other, so the people from the far side are stuck.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the backup', likely: 'Most of them make it, but the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'You moved doors up an hour, and the people who really wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the river.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The bridge stayed shut, so the people across the river stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'It takes two hours of your day, but most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads took the long way around together.' }
      ] },

    { id: 'SACRAMENTO_TRIPLE_DIGITS', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'HEAT', months: [6, 7, 8, 9] },
      telegraph: 'The forecast says 108 on Friday, and the swamp cooler in the living room is already struggling.',
      title: 'The living room is an oven',
      body: 'A heat wave sits on the valley. The cooler cannot keep up, the crowd spills onto the porch, and the neighbors are leaning on their fences.',
      options: [
        { id: 'LATE', label: 'Push doors to nine and let the evening cool', likely: 'A later start, and the ones who come stay.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors at nine, a breeze off the delta, and a crowd on the porch between sets.' },
        { id: 'YARD', label: 'Move the bands to the yard and watch the bike rack', likely: 'Cooler and looser. The neighbors decide how long it lasts.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The yard held everyone, and a neighbor came by once to count heads.' },
        { id: 'ACCEPT', label: 'Run it in the heat', likely: 'Sweaty and short, and plenty will stay home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Half the list stayed in their air conditioning, and the rest sweated through it.' }
      ] },

    { id: 'SACRAMENTO_TEN_OCLOCK_HALL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4] },
      telegraph: 'The hall manager reminds you that anyone under eighteen has to be out by ten.',
      title: 'Under eighteen by ten',
      body: 'The curfew for minors is the hall\'s problem the second the clock passes ten, and your headliner does not go on until a quarter to, so the youngest half of the crowd is about to be asked to leave.',
      options: [
        { id: 'SWAP', label: 'Put a sibling band on first and the headliner second', likely: 'The kids get the best set, and the late crowd gets a shorter night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'The headliner played at nine and the room emptied politely at ten.' },
        { id: 'EARLY', label: 'Start an hour early and finish before the clock', likely: 'Many get off work too late to make it.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Doors were at five, so it was a tight bill with a thin start.' },
        { id: 'ACCEPT', label: 'Run it as planned and watch the door', likely: 'You risk the hall\'s trust.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }, { op: 'MONEY', amount: -25 }],
          result: 'A patrol car slowed down outside, and the manager did not look happy.' }
      ] }
  ]
});
