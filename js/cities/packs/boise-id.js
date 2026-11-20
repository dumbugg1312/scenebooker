SB.Cities.register('boise-id', {
  v: 1,
  slug: 'boise-id',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['boise state', 'boise state university', 'bsu', 'broncos', 'bronco stadium', 'albertsons stadium', 'basque block', 'basque museum', 'bodo',
           'bogus basin', 'mountain home air force base', 'idaho air national guard', 'boise pride', 'northwest nazarene university', 'nnu',
           'college of idaho', 'treefort', 'treefort music fest', 'idaho statesman', 'boise weekly', 'western idaho fair', 'ada county fair',
           'national oldtime fiddlers', 'jaialdi', 'famous idaho potato bowl', 'idaho potato bowl', 'camel\'s back park', 'idaho capitol',
           'the inversion room', 'inversion room', 'chinden annex', 'sugar beet hall', 'lemhi street basement', 'cole road grange',
           'sagebrush social club', 'the settlers canal collective', 'settlers canal collective', 'eighth ward rec hall', 'basin street lanes',
           'the spud cellar', 'spud cellar', 'orchard pawn annex', 'foothills fruit stand'],
  /* The dossier's invented venue names are banned too: research, not content, unchecked. The university appears only as 'the university'. */
  blocklist: ['boise state*', 'treefort*', 'idaho statesman*', 'boise weekly*', 'basque block*', 'sugar beet hall*', 'inversion room*'],

  blurb: ['Idaho\'s capital in a high-desert river valley, with a small, stubborn underground where hardcore, grind and death metal share bills. Houses are the backbone; a big festival gets the spotlight.',
          'Every band has a Portland or Seattle someday, and a show that runs past eleven brings the cops.'],
  hard: 'Almost nowhere is all-ages, and the cops come at eleven.',
  region: 'the Mountain West',
  houseType: 'BASEMENT',
  tilt: [
    { fan: 'hardcore', band: 'metal', d: .08, reason: 'Hardcore, grind and death metal share one bill and one crowd.' },
    { fan: 'metal', band: 'hardcore', d: .08, reason: 'Hardcore, grind and death metal share one bill and one crowd.' }
  ],
  whereGo: [
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Boise' },
    { id: 'meridian', kind: 'FEEDER', name: 'Meridian', minutes: 20, bearing: 285, pop: 120000, note: 'A fast-growing suburb of new subdivisions and big churches; a deep well of teenage bands.' },
    { id: 'nampa', kind: 'FEEDER', name: 'Nampa', minutes: 25, bearing: 270, pop: 100000, note: 'A farm and railroad town with a real separate scene and a chip on its shoulder about Boise.' },
    { id: 'eagle', kind: 'FEEDER', name: 'Eagle and Star', minutes: 25, bearing: 315, note: 'Wealthy suburbs with no scene; the kids drive in.' },
    { id: 'kuna', kind: 'FEEDER', name: 'Kuna', minutes: 25, bearing: 245, pop: 25000, note: 'A farm-suburb mix with skate and garage kids.' },
    { id: 'caldwell', kind: 'FEEDER', name: 'Caldwell', minutes: 30, bearing: 275, pop: 60000, note: 'A farm town with a small college and a small DIY scene around the old downtown.' },
    { id: 'emmett', kind: 'FEEDER', name: 'Emmett', minutes: 45, bearing: 320, pop: 7000, note: 'A fruit and farm town up the Payette valley with a few high-school bands.' },
    { id: 'idaho-city', kind: 'FEEDER', name: 'Idaho City and Horseshoe Bend', minutes: 45, bearing: 30, note: 'Tiny old mining towns in the forest: a few kids and the odd bonfire show.' },
    { id: 'mountain-home', kind: 'FEEDER', name: 'Mountain Home', minutes: 55, bearing: 115, pop: 14000, note: 'A base town that cycles in young airmen; they depend on Boise for anything cultural.' },
    { id: 'ontario', kind: 'FEEDER', name: 'Ontario', state: 'OR', minutes: 55, bearing: 290, pop: 11000, note: 'The Oregon border town; bands there sometimes play both states.' },
    { id: 'payette', kind: 'FEEDER', name: 'Payette, Fruitland and Weiser', minutes: 70, bearing: 305, note: 'Small farm towns on the Snake River with weak scenes; teenagers drive.' },
    { id: 'twin-falls', kind: 'PEER', name: 'Twin Falls', state: 'ID', minutes: 120, bearing: 105, scene: 400, note: 'The farm and dairy hub two hours east with its own punk scene; its kids drive to Boise for touring bands.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The bar, hotel and office core. Almost all paid venues now; cranes, condos and noise complaints.' },
    { id: 'north-end', name: 'the North End', route: 'old-side', note: 'Tall trees, bungalows and basements: the old punk-house ground, now very expensive with quick calls to police.' },
    { id: 'bench', name: 'the Bench', route: 'work-side', note: 'The raised terrace south of downtown: older ranch houses, garages and strip malls.' },
    { id: 'east-end', name: 'the East End and the campus', route: 'campus', note: 'The university edge with student rentals and a river path.' },
    { id: 'garden-city', name: 'Garden City', route: 'work-side', note: 'A small separate city along the river with cheap warehouses and old industrial lots.' },
    { id: 'west-boise', name: 'West Boise and Fairview Avenue', route: 'old-side', note: 'Wide car-oriented streets, apartment complexes and big-box shopping.' },
    { id: 'west-valley', name: 'Nampa and Caldwell', route: 'work-side', note: 'The west valley: garages, downtown storefronts and church rooms.' }
  ],

  contacts: ['portland', 'bend-or', 'spokane-wa', 'ogden-ut'],

  points: [
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89, pop: 1200000 },
    { name: 'Twin Falls', state: 'ID', lat: 42.56, lon: -114.46, pop: 55000 },
    { name: 'Pocatello', state: 'ID', lat: 42.87, lon: -112.45, pop: 56000 },
    { name: 'Pendleton', state: 'OR', lat: 45.67, lon: -118.79, pop: 17000 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68, pop: 2500000 }
  ],
  roads: ['I-84', 'I-184', 'ID-55', 'US 20', 'US 95', 'I-86'],

  words: {
    street: ['State Street', 'Chinden', 'Fairview Avenue', 'Overland Road', 'Cole Road', 'Vista Avenue', 'Warm Springs Avenue', 'I-184'],
    water: ['the Boise River', 'the Snake River'],
    hood: ['the North End', 'Hyde Park', 'the Bench', 'the East End', 'Garden City', 'the Foothills', 'Hulls Gulch'],
    thing: ['sagebrush', 'potato', 'canal', 'foothill trail', 'river float', 'carport', 'sugar beet', 'guardian note', 'flea market'],
    weather: ['inversion', 'wildfire smoke', 'dry heat']
  },

  events: [
    { id: 'BOISE_ID_ELEVEN_O_CLOCK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [5, 6, 7, 8, 9] },
      telegraph: 'A neighbor on the block has already said the word "eleven" twice this week.',
      title: 'The cops come at eleven',
      body: 'The noise rule bites after 11, and a patrol car has been idling at the end of the block since the second band. The headliner is not on yet.',
      options: [
        { id: 'MOVEUP', label: 'Cut the changeovers and start the headliner now', likely: 'A rushed set. Everyone hears it before the lights come.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -30 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The headliner went on early and short. The patrol car left at ten past eleven.' },
        { id: 'TURNDOWN', label: 'Turn it down and keep going', likely: 'Quieter. A few leave.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The amps came down a notch. The room leaned in and the car stayed at the end of the block.' },
        { id: 'END', label: 'Call it early and keep the peace', likely: 'The headliner is sore. The kids are angrier.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -2 }, { op: 'REGULARS', pct: -.01 }],
          result: 'You shut it down at ten to eleven. The kids were angry for a week.' }
      ] }
  ]
});
