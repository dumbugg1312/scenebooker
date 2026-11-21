SB.Cities.register('asheville-nc', {
  v: 1,
  slug: 'asheville-nc',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['unc asheville', 'a-b tech', 'warren wilson college', 'montreat', 'mars hill university', 'brevard college', 'western carolina university', 'appalachian state',
           'furman', 'biltmore estate', 'mountain xpress', 'asheville citizen-times', 'citizen-times', 'asheville watchdog', 'asheville grit', 'wcqs', 'wncw', 'wpvm', 'wlos',
           'blue ridge public radio', 'asheville redefines transit', 'downtown after 5', 'leaf festival', 'beer city', 'helene', 'hurricane helene', 'waffle house', 'cook out',
           'bojangles', 'krispy kreme', 'cheerwine', 'american legion', 'vfw', 'moose lodge', 'elks', 'ghost ship', 'abc commission',
           'beaucatcher hall', 'kudzu hall', 'the sourwood room', 'sourwood room', 'hill street annex', 'depot street lanes', 'wolfpen hall', 'cut-rate hall',
           'tunnel road moose lodge', 'bent creek social', 'hominy hall', 'the dry ridge', 'the ledger room'],
  /* Banned holds the dossier's real institutions and its invented venue names (unchecked). The flood is written only as 'the flood' in game text. */
  blocklist: ['mountain xpress*', 'citizen-times*', 'wncw*', 'wcqs*', 'biltmore estate*', 'kudzu hall*', 'wolfpen hall*', 'beer city*'],

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

  contacts: ['johnson-city-tn', 'spartanburg-sc', 'hickory-nc'],

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
  }
});
