SB.Cities.register('sacramento', {
  v: 1,
  slug: 'sacramento',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['california state university sacramento', 'sacramento state', 'uc davis', 'university of california davis', 'american river college', 'sacramento city college',
           'cosumnes river college', 'sacramento bee', 'sacramento news and review', 'news and review', 'capradio', 'kcra', 'kxtv', 'sacramento kings', 'sacramento republic',
           'sacramento river cats', 'river cats', 'golden 1 center', 'california state fair', 'cal expo', 'california state capitol', 'state of california',
           'mcclellan air force base', 'travis air force base', 'beale air force base', 'kaiser permanente', 'sutter health', 'intel', 'uc davis health', 'mace ranch',
           'old sacramento', 'sacramento zoo', 'sutter\'s fort', 'sacramento international airport', 'arco arena', 'sleep train arena', 'raley field', 'tower bridge'],
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
    { id: 'davis', kind: 'FEEDER', name: 'Davis', minutes: 25, bearing: 270, note: 'A student town with living-room shows. Bands and kids both come by car or train.', bands: 2 },
    { id: 'roseville', kind: 'FEEDER', name: 'Roseville', minutes: 25, bearing: 30, note: 'Suburban kids and some bands.' },
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
    { id: 'arden', name: 'Arden and Arcade', route: 'campus', note: 'The suburban middle.' }
  ],

  contacts: ['stockton-ca', 'chico-ca', 'oakland'],

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
      body: 'A wreck has closed one of the bridges over the river, and the traffic from West Sacramento is stacked up on the other. The people from the far side are stuck.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the backup', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the river.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The bridge stayed shut. The ones across the river stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads took the long way around together. They will remember that.' }
      ] }
  ]
});
