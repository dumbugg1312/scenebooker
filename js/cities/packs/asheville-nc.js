SB.Cities.register('asheville-nc', {
  v: 1,
  slug: 'asheville-nc',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['unc asheville', 'a-b tech', 'warren wilson college', 'montreat', 'mars hill university', 'brevard college', 'western carolina university', 'appalachian state',
           'furman', 'biltmore estate', 'mountain xpress', 'asheville citizen-times', 'citizen-times', 'asheville watchdog', 'asheville grit', 'wcqs', 'wncw', 'wpvm', 'wlos',
           'blue ridge public radio', 'asheville redefines transit', 'downtown after 5', 'leaf festival', 'beer city', 'helene', 'hurricane helene', 'waffle house', 'cook out',
           'bojangles', 'krispy kreme', 'cheerwine', 'american legion', 'vfw', 'moose lodge', 'elks', 'ghost ship', 'abc commission',
           'beaucatcher hall', 'kudzu hall', 'the sourwood room', 'sourwood room', 'hill street annex', 'depot street lanes', 'wolfpen hall', 'cut-rate hall',
           'tunnel road moose lodge', 'bent creek social', 'hominy hall', 'the dry ridge', 'the ledger room',
           'mountain dance and folk festival', 'mountain dance & folk', 'shindig on the green', 'folk heritage committee', 'blue ridge pride', 'pride festival', 'pack square', 'artsavl', 'arts avl', 'avl sounds fest', 'explore asheville', 'bpr', 'asheville high school', 'asheville yards', 'hellbender', 'deerfields', 'asheville beer week', 'bele chere', 'atlanta journal-constitution', 'nonoise', 'radfest', 'diglocal', 'garden and gun'],
  /* Banned holds the dossier's real institutions and its invented venue names (unchecked). The flood is written only as 'the flood' in game text. */
  blocklist: ['mountain xpress*', 'citizen-times*', 'wncw*', 'wcqs*', 'biltmore estate*', 'kudzu hall*', 'wolfpen hall*', 'beer city*', 'bele chere*', 'explore asheville*'],

  blurb: ['A mountain tourist town in a bowl on the French Broad, where the people who pour the beer cannot afford the streets the visitors walk.',
          'Crust, doom and art-punk share one bill because there are too few people to split into camps. The flood took the river rooms, and benefit shows are the default now.'],
  hard: 'Few rooms, a slow mountain drive in, and a flood-thinned scene. Gas is the real fee.',
  region: 'the Blue Ridge',
  houseType: 'BASEMENT',
  tilt: [
    { fan: 'crust', band: 'metal', d: .06, reason: 'The crust and metal crowds are the same few hundred people on mixed bills.' }
  ],
  whereGo: [
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Asheville' },
    { id: 'swannanoa', kind: 'FEEDER', name: 'Swannanoa', minutes: 15, bearing: 95, note: 'A valley community with a work college, hit hard by the flood.' },
    { id: 'weaverville', kind: 'FEEDER', name: 'Weaverville', minutes: 15, bearing: 5, note: 'A commuter suburb with a few kids and little scene.' },
    { id: 'black-mountain', kind: 'FEEDER', name: 'Black Mountain', minutes: 20, bearing: 85, note: 'A small hippie-ish town with camps and a few DIY kids.' },
    { id: 'marshall', kind: 'FEEDER', name: 'Marshall and Mars Hill', minutes: 30, bearing: 355, note: 'A tiny river town and a small college town; a few kids.' },
    { id: 'hendersonville', kind: 'FEEDER', name: 'Hendersonville', minutes: 30, bearing: 185, note: 'Retirement and apple country; conservative, with some skate and punk kids.' },
    { id: 'waynesville', kind: 'FEEDER', name: 'Waynesville and Canton', minutes: 35, bearing: 265, note: 'A mountain Main Street town and a mill town beyond it.' },
    { id: 'brevard', kind: 'FEEDER', name: 'Brevard', minutes: 40, bearing: 210, note: 'A small college and waterfall town with a stubborn DIY scene.', bands: 1 },
    { id: 'marion', kind: 'FEEDER', name: 'Marion and Old Fort', minutes: 45, bearing: 100, note: 'Furniture and textile mill country; some metal and punk kids with basements and halls.' },
    { id: 'sylva', kind: 'FEEDER', name: 'Sylva and Cullowhee', minutes: 55, bearing: 255, note: 'A real college scene of its own whose students sometimes come east.', bands: 1 },
    { id: 'morganton', kind: 'FEEDER', name: 'Morganton', minutes: 70, bearing: 95, note: 'A small furniture and prison town with a small scene.' },
    { id: 'greenville', kind: 'PEER', name: 'Greenville', slug: 'greenville-sc', state: 'SC', minutes: 70, bearing: 190, scene: 600, note: 'Richer and more suburban, with a long DIY memory; strong band trade.' },
    { id: 'johnson-city', kind: 'PEER', name: 'Johnson City', state: 'TN', minutes: 90, bearing: 320, slug: 'johnson-city-tn', note: 'A college and railroad town with its own long-running punk crowd.' },
    { id: 'hickory', kind: 'PEER', name: 'Hickory', minutes: 90, bearing: 95, slug: 'hickory-nc', note: 'A furniture and factory town down I-40.' },
    { id: 'knoxville', kind: 'PEER', name: 'Knoxville', slug: 'knoxville-tn', state: 'TN', minutes: 120, bearing: 280, scene: 1500, note: 'The nearest big college scene, two hours west through the gorge.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'A compact ridge-top grid of bars and ticketed rooms; tourist-heavy, parking scarce, mostly licensed shows.' },
    { id: 'south-slope', name: 'South Slope and Southside', route: 'work-side', note: 'Old industrial blocks turned taprooms, with practice spaces tucked behind; an old neighborhood beside them.' },
    { id: 'river-arts', name: 'the River Arts District', route: 'work-side', note: 'Old mills and warehouses along the French Broad, flooded and half rebuilt; cheap space and developer interest.' },
    { id: 'west-asheville', name: 'West Asheville', route: 'old-side', note: 'Bungalows and walkout basements along Haywood Road; where the punk kids live, and being priced out.' },
    { id: 'north-asheville', name: 'North Asheville', route: 'campus', note: 'Leafy older streets along Merrimon Avenue and student rentals near campus; neighbors complain fast.' },
    { id: 'woodfin', name: 'Woodfin and Riverside Drive', route: 'work-side', note: 'A thin, cheap, flood-prone strip of garages and light industrial units along the river.' },
    { id: 'east-asheville', name: 'East Asheville', route: 'old-side', note: 'Ranch houses, big yards and church halls past the tunnel on Tunnel Road; the best bet for a show nobody complains about.' },
    { id: 'south-suburbs', name: 'Arden and Fletcher', route: 'campus', note: 'Strip suburbs on Hendersonville Road where parents live and touring bands sleep in cheap motels.' }
  ],

  rooms: [
    { id: 'bungalow-basement', kind: 'HOUSE', hood: 'west-asheville', cap: 60, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 55, start: true, note: 'A concrete basement under an old bungalow on a hillside. The driveway is steep, the street fills by seven, and one complaint ends the night.' },
    { id: 'tunnel-yard', kind: 'HOUSE', hood: 'east-asheville', cap: 50, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 20, standing: [65, 60, 50],
      pressure: 35, note: 'A carport and a big yard on a ranch-house street past the tunnel. Nobody complains, but the weather decides and it is a long drive from the west side.' },
    { id: 'haywood-dive', kind: 'BAR', hood: 'west-asheville', cap: 120, soundFee: 50, pa: .7, ages: ['A21'], curfew: 1500, ac: true, following: .3, sketch: 20, standing: [55, 65, 70],
      note: 'A cabaret-dressed dive on the main drag that books the loud bands. The usual first stage, and small enough to feel packed.' },
    { id: 'pawn-bar', kind: 'BAR', hood: 'west-asheville', cap: 100, soundFee: 40, pa: .6, ages: ['A21'], curfew: 1470, ac: true, following: .2, sketch: 15, standing: [50, 65, 70],
      note: 'A neighborhood dive that takes a show only when the owner likes the bill. The odd post-punk night, and no promises.' },
    { id: 'art-space', kind: 'DIY', hood: 'west-asheville', cap: 80, rent: 70, pa: .5, curfew: 1380, ac: true, sketch: 35, standing: [60, 60, 50],
      pressure: 55, note: 'A queer-run art space where the scene looks after itself. Occupancy and noise rules bite, and the rent is the real threat.' },
    { id: 'mill-floor', kind: 'DIY', hood: 'river-arts', cap: 120, rent: 80, pa: .5, curfew: 1380, ac: false, lowLying: true, sketch: 40, standing: [55, 60, 45],
      pressure: 55, note: 'A warehouse floor in an old mill by the river. Cheap space, half rebuilt since the flood, with developers circling.' },
    { id: 'river-strip-unit', kind: 'DIY', hood: 'woodfin', cap: 40, rent: 40, pa: .4, curfew: 1320, ac: false, lowLying: true, sketch: 40, standing: [60, 55, 40],
      note: 'A garage unit on the river strip, a practice space turned show room. No heat, nobody close enough to complain, and it floods.' },
    { id: 'record-shop', kind: 'SHOP', hood: 'downtown', cap: 50, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [70, 70, 75], following: .2,
      note: 'The punk-leaning record shop on a tourist block. An afternoon in-store set, over by seven, and nowhere to park.' },
    { id: 'listening-room', kind: 'CLUB', hood: 'downtown', cap: 250, houseCosts: 150, split: .8, pa: .9, ages: ['ALL'], curfew: 1380, ac: true, following: .5, sketch: 10, standing: [45, 70, 70],
      note: 'The small downtown room with the good sound and the local ear. Ticketed and licensed, and it wants a draw.' },
    { id: 'river-club', kind: 'CLUB', hood: 'river-arts', cap: 500, houseCosts: 200, split: .8, pa: .9, ages: ['ALL'], curfew: 1380, ac: true, lowLying: true, following: .5, sketch: 10, standing: [45, 70, 65],
      note: 'An all-ages room that books rock, punk and metal. A step up from the bars, in a district the river has not finished with.' },
    { id: 'tunnel-hall', kind: 'HALL', hood: 'east-asheville', cap: 150, rent: 150, deposit: 75, pa: .5, curfew: 1320, ac: true, sketch: 10, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'A fellowship hall past the tunnel, rented by the night. All ages, out by ten, and no cussing on the flyer.' },
    { id: 'park-benefit', kind: 'OUTDOOR', hood: 'downtown', cap: 200, rent: 20, pa: .4, curfew: 1080, ac: false, outdoor: true, sketch: 30, standing: [60, 55, 50],
      note: 'A skatepark or a park lawn for a daylight benefit. A permit for the amps, and the weather in the way.' }
  ],

  contacts: ['greenville-sc', 'johnson-city-tn', 'hickory-nc', 'knoxville-tn', 'spartanburg-sc'],

  calendar: [
    { id: 'old-time-fest', label: 'the old-time music festival', tag: 'festival', month: 8, week: 1, dows: [3, 4, 5], can: [0.88, 0.85, 0.82], hoods: ['downtown'], elsewhere: [1, 0.97, 0.97] },
    { id: 'folk-series', label: 'the Saturday folk and dance series', tag: 'festival', month: 7, weeks: [2, 4], dows: [5], can: [0.92, 0.9, 0.9], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'pride-weekend', label: 'the Pride weekend', tag: 'festival', month: 9, week: 4, dows: [4, 5], can: [0.9, 0.88, 0.88], hoods: ['downtown'], elsewhere: [0.97, 0.95, 0.95] },
    { id: 'roots-fest', label: 'the roots and arts festival', tag: 'festival', month: 10, week: 3, dows: [4, 5, 6], can: [0.92, 0.9, 0.9] },
    { id: 'leaf-season', label: 'leaf season', tag: 'leaf', month: 10, weeks: [1, 4], dows: [4, 5], can: [0.92, 0.9, 0.9], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'flood-benefits', label: 'the fall recovery benefits', tag: 'benefit', month: 9, week: 4, dows: [4, 5, 6], can: [1.08, 1.05, 1.0], hoods: ['river-arts'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.1] }
  ],

  rules: { quiet: 1320 },

  points: [
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 900000 },
    { name: 'Knoxville', state: 'TN', lat: 35.96, lon: -83.92, pop: 190000 },
    { name: 'Greenville', state: 'SC', lat: 34.85, lon: -82.4, pop: 70000 },
    { name: 'Boone', state: 'NC', lat: 36.22, lon: -81.67, pop: 19000 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 500000 }
  ],
  roads: ['I-40', 'I-26', 'I-240', 'US 25', 'US 19', 'US 74'],

  words: {
    street: ['Haywood Road', 'Merrimon Avenue', 'Tunnel Road', 'Biltmore Avenue', 'Lexington Avenue', 'Patton Avenue', 'Hendersonville Road', 'Riverside Drive'],
    water: ['the French Broad', 'the Swannanoa', 'Beaverdam Creek', 'Hominy Creek'],
    hood: ['West Asheville', 'South Slope', 'Southside', 'Woodfin', 'Montford', 'Grove Park', 'Haw Creek', 'Oakley', 'Beaverdam', 'Five Points'],
    thing: ['carport', 'walkout basement', 'holler', 'kudzu', 'pimento cheese', 'biscuit', 'switchback', 'leaf peeper', 'benefit show', 'zine', 'art space', 'dive bar'],
    weather: ['fog', 'ice day', 'afternoon thunderstorm', 'flood warning']
  },

  events: [
    { id: 'ASHEVILLE_NC_FLASH_FLOOD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [5, 6, 7, 8, 9, 10] },
      telegraph: 'A flood warning is out for the river, and the benefit bill is booked on the low side of town.',
      title: 'The river is coming up again',
      body: 'A flash-flood warning has the river rooms nervous, and the bill is a benefit for the last flood. The band is already in the van on the mountain road.',
      options: [
        { id: 'MOVE', label: 'Move it a day, once the water goes down', likely: 'Breaks the date, which costs you trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the ones who could come, came.' },
        { id: 'HIGH', label: 'Move the bill to a house on high ground', likely: 'It\'s smaller and louder, with a steep driveway.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A hillside basement took the bill, and the floor was packed.' },
        { id: 'ACCEPT', label: 'Run it and watch the water', likely: 'Half the list stays home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The water stayed in its banks, and the room was half full and damp.' }
      ] },

    { id: 'ASHEVILLE_NC_LEAF_MOTELS', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'leaf' },
      telegraph: 'Leaf season has every motel on the Hendersonville road booked solid.',
      title: 'Every motel is full',
      body: 'Leaf-peepers have taken every room from Arden to Fletcher, and the touring band has nowhere to sleep. The only floor left is a basement in West Asheville, and the driveway is full by seven.',
      options: [
        { id: 'FLOOR', label: 'Put the band on a basement floor', likely: 'The house is happy, and the neighbors less so.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .95 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'They slept on the floor and played like it was a hotel, and the house got a few complaints.' },
        { id: 'MOTEL', label: 'Pay for a room an hour down the road', likely: 'It costs forty dollars, and they arrive late.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'SHOW_MOD', key: 'lateMin', v: 45 }],
          result: 'The band checked in out of town and barely made it by doors.' },
        { id: 'CANCEL', label: 'Shorten the bill to fit what you can sleep', likely: 'It\'s a smaller night.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'There were fewer bands on the bill, and it was a looser, quieter night.' }
      ] },

    { id: 'ASHEVILLE_NC_ICE_DAY', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [12, 1, 2, 3] },
      telegraph: 'The forecast says freezing rain, and the steep roads are the first to close.',
      title: 'The steep road is closed',
      body: 'An ice day has shut the steep street to the house. The bill can still be saved if it moves to a garage unit in the river strip, with no heat.',
      options: [
        { id: 'GARAGE', label: 'Move the bill to the unit on the river strip', likely: 'It\'s smaller and cold, and nobody can complain.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'DIY', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'It was a cold unit and cold fingers and a packed floor.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date, which costs you trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' },
        { id: 'ACCEPT', label: 'Wait for the plow and run it', likely: 'Most people stay in.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'The road stayed bad, and the few who made it were glad.' }
      ] }
  ]
});
