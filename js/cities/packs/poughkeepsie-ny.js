SB.Cities.register('poughkeepsie-ny', {
  v: 1,
  slug: 'poughkeepsie-ny',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['ibm', 'vassar', 'vassar college', 'marist', 'marist college', 'bard college', 'bard', 'culinary institute of america', 'dia beacon', 'poughkeepsie journal',
           'gannett', 'news 12', 'news 12 hudson valley', 'metro-north', 'amtrak', 'walkway over the hudson', 'west point', 'stewart international airport',
           'stewart airport', 'dutchess community college', 'suny new paltz', 'the galleria', 'galleria', 'dutchess county fair', 'sheep and wool festival',
           'hudson valley renegades', 'renegades', 'vfw', 'american legion', 'eagles', 'elks', 'knights of columbus', 'wawa', 'stewart\'s shops',
           'lozenge hall', 'the fallkill boiler room', 'aerie 2209', 'st. casimir\'s undercroft', 'the annex at union and cottage', 'pendell pole barn',
           'hooker avenue lanes', 'the main mall storefront', 'the stretch room', 'clover street foundry', 'rail trail shed', 'ridley hall',
           'poughkeepsie porchfest', 'porchfest', 'jazz in the valley', 'waryas park', 'bardavon', 'bardavon 1869 opera house', 'revel 32', 'chronogram', 'dying scene',
           'wdph', 'wpdh', 'hudson valley post', 'nysmusic', 'times union', 'wgxc', 'wavefarm', 'news12', 'dutchess tourism', 'destination dutchess', 'hudson valley one',
           'sinterklaas', 'hudson valley wine and food festival'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['poughkeepsie journal*', 'vassar*', 'marist*', 'metro-north*', 'news 12*', 'walkway over*', 'dia beacon*', 'dutchess county fair*'],

  blurb: ['A mid-Hudson river city seventy-five miles up the line from Manhattan, with big old brick blocks, cheap commercial space and a long hardcore and metal tradition.',
          'Scattered across a river valley, the scene lives in damp basements and rented halls, always one inspection from closing. Everyone drives in from somewhere else.'],
  hard: 'Rooms close fast and everyone lives in a different town.',
  region: 'the Hudson Valley',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Poughkeepsie' },
    { id: 'hyde-park', kind: 'FEEDER', name: 'Hyde Park', minutes: 15, bearing: 5, note: 'A suburban estate town to the north with a cooking school and a few older halls.' },
    { id: 'wappingers', kind: 'FEEDER', name: 'Wappingers Falls', minutes: 15, bearing: 170, note: 'A suburban village of commuters and families, with some teenage bands.' },
    { id: 'highland', kind: 'FEEDER', name: 'Highland', minutes: 15, bearing: 270, note: 'An orchard town across the Mid-Hudson Bridge; many kids come over.' },
    { id: 'fishkill', kind: 'FEEDER', name: 'Fishkill and Hopewell Junction', minutes: 20, bearing: 150, note: 'Commuter suburbs along the interstate, with strip malls and a ballpark.' },
    { id: 'newburgh', kind: 'FEEDER', name: 'Newburgh', minutes: 30, bearing: 205, scene: 60, note: 'An old industrial river city across the bridge: rougher, with a post-industrial feel and a friendly rivalry.',
      rooms: [
      { id: 'edge-house', kind: 'HOUSE', hood: 'newburgh-edge', cap: 60, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, sketch: 25, standing: [60, 60, 50],
          pressure: 45, note: 'A house over the river-city line. The shows spill across it, and so do the kids.' }] },
    { id: 'beacon', kind: 'FEEDER', name: 'Beacon', minutes: 30, bearing: 180, note: 'A former hat-making town with its own arts and music crowd, gentrifying fast.' },
    { id: 'new-paltz', kind: 'FEEDER', name: 'New Paltz', minutes: 30, bearing: 285, note: 'A state college town with a hippie-punk-folk mix and a scene of its own.' },
    { id: 'rhinebeck', kind: 'FEEDER', name: 'Rhinebeck and Red Hook', minutes: 30, bearing: 10, note: 'A wealthy village and farm town with a small college scene to the north.' },
    { id: 'millbrook', kind: 'FEEDER', name: 'Millbrook and Pine Plains', minutes: 40, bearing: 80, note: 'Horse country and farmland; small and scattered.' },
    { id: 'pawling', kind: 'FEEDER', name: 'Pawling', minutes: 40, bearing: 120, note: 'A commuter and farm town on the Connecticut line.' },
    { id: 'kingston', kind: 'PEER', name: 'Kingston', minutes: 45, bearing: 350, note: 'A county seat with an artists\' community; artsier and more hippie, and it trades bands and crowds.' },
    { id: 'danbury', kind: 'PEER', name: 'Danbury', state: 'CT', minutes: 55, bearing: 120, note: 'A bigger Connecticut city down the interstate that trades crowds.' },
    { id: 'albany', kind: 'PEER', name: 'Albany', slug: 'albany-ny', minutes: 90, bearing: 5, note: 'The capital up the road, with a bigger circuit that pulls college-bound kids.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown, Main Street and Market Street', route: 'downtown', note: 'A spine of 19th-century brick with storefronts, second-floor rooms and restaurant back rooms. Slowly being revived.' },
    { id: 'waterfront', name: 'the waterfront and the train station', route: 'downtown', note: 'Down the hill by the river, with the station, riverfront park and a few old warehouses. Heating up.' },
    { id: 'mill-street', name: 'Mill Street and the Fallkill corridor', route: 'work-side', note: 'Old mills and cheap commercial space along the creek: studios and lofts, until the apartments arrive.' },
    { id: 'south-side', name: 'the South Side', route: 'old-side', note: 'Working-class and immigrant blocks of two- and three-family frame houses with basements and absentee landlords. Cheap and ignored.' },
    { id: 'north-side', name: 'the North Side and Mount Carmel', route: 'old-side', note: 'Older houses and divided Victorians with basements, porches and backyards. Mostly stable.' },
    { id: 'arlington', name: 'Arlington and the college side', route: 'campus', note: 'Just outside the city line, where the college kids rent. House shows and campus radio nights.' },
    { id: 'route-9', name: 'the Route 9 strip', route: 'work-side', note: 'Malls, big boxes and industrial parks in the Town. Practice spaces and strip-plaza units.' },
    { id: 'highland-side', name: 'across the river in Highland', route: 'work-side', note: 'The orchard side, reached over the bridge. Barns and yards.' },
    { id: 'newburgh-edge', name: 'Balmville and the Newburgh edge', route: 'town:newburgh', note: 'Just over the river-city line: houses and yards where bands and kids drive in from both sides.' }
  ],

  rooms: [
    { id: 'south-side-basement', kind: 'HOUSE', hood: 'south-side', cap: 40, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 55, start: true, note: 'A stone-walled basement in a rented frame house. The landlord or a neighbor is the threat.' },
    { id: 'north-side-porch', kind: 'HOUSE', hood: 'north-side', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 25, standing: [65, 60, 50],
      pressure: 45, note: 'A divided Victorian with a porch and a yard. Backyard shows in summer, the basement in winter.' },
    { id: 'main-street-bar', kind: 'BAR', hood: 'downtown', cap: 250, soundFee: 80, pa: .8, ages: ['A18'], curfew: 1440, ac: true, following: .4, sketch: 15,
      standing: [45, 65, 70], pressure: 55, note: 'The Main Street room that took over from the old big club. Hardcore, hip hop and jazz on one calendar, if the bar is in a good mood.' },
    { id: 'cannon-shop', kind: 'SHOP', hood: 'downtown', cap: 100, pa: .5, curfew: 1320, ac: true, sketch: 10, standing: [65, 65, 70], following: .2,
      note: 'A record shop in a former lodge building with a new stage. Untested, and its own landlord could crowd it out.' },
    { id: 'lodge-club', kind: 'CLUB', hood: 'downtown', cap: 300, houseCosts: 150, split: .8, pa: .9, ages: ['A18'], curfew: 1410, ac: true, following: .5, sketch: 10,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', needs: ['FULL_BILL'], note: 'A polished event space in an old lodge. Punk is a rental here, not the house style.' },
    { id: 'pizza-room', kind: 'DIY', hood: 'downtown', cap: 80, rent: 0, pa: .5, curfew: 1380, ac: true, sketch: 20, standing: [55, 60, 55],
      pressure: 40, note: 'A back-room stage behind a pizza place. Free entry, and it ends when the kitchen wants its floor back.' },
    { id: 'mill-loft', kind: 'DIY', hood: 'mill-street', cap: 120, rent: 80, pa: .5, curfew: 1380, ac: false, sketch: 50, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'A loft over the creek with a hand-built stage. One inspector from gone.' },
    { id: 'north-hall', kind: 'HALL', hood: 'north-side', cap: 200, rent: 200, deposit: 100, pa: .6, curfew: 1290, ac: true, sketch: 10, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'A rented hall with a flat fee and a deposit. No beer, and the manager wants to know what hardcore means.' },
    { id: 'river-park', kind: 'OUTDOOR', hood: 'waterfront', cap: 300, rent: 25, pa: .4, curfew: 1080, sketch: 25, standing: [60, 55, 50],
      note: 'A permit and a stage by the train station and the river. Daytime benefit bills only, over by six.' },
    { id: 'highland-barn', kind: 'DIY', hood: 'highland-side', cap: 60, rent: 20, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 40, standing: [55, 55, 45],
      note: 'A barn show over the bridge. Nobody to complain, and the ride is the hard part.' },
    { id: 'strip-hall', kind: 'BIG', hood: 'route-9', cap: 800, rent: 1800, deposit: 500, pa: .9, ages: ['A18'], curfew: 1380, ac: true, sketch: 5, standing: [40, 70, 70],
      note: 'The big room out on the strip, by the malls. Far too big for a first-time booker.' }
  ],

  contacts: ['albany-ny', 'new-york', 'new-haven-ct', 'springfield-ma'],

  calendar: [
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 8, week: 3, dows: [1, 2, 3, 4, 5, 6], can: [.95, .90, .88] },
    { id: 'porch-day', label: 'the porch music afternoon', tag: 'festival', month: 8, week: 4, dows: [6], can: [.92, .88, .88], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'river-jazz', label: 'the riverside jazz afternoon', tag: 'festival', month: 8, week: 3, dows: [6], can: [.92, .90, .90], hoods: ['waterfront'], elsewhere: [1, 1, 1] },
    { id: 'harvest-weekend', label: 'the wine and food weekend', tag: 'festival', month: 9, week: 2, dows: [5], can: [.95, .92, .92] },
    { id: 'wool-weekend', label: 'the fall wool weekend', tag: 'festival', month: 10, week: 3, dows: [5, 6], can: [.95, .92, .92] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.88, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.88, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Newburgh', state: 'NY', lat: 41.5, lon: -74.01, pop: 28800 },
    { name: 'Kingston', state: 'NY', lat: 41.93, lon: -74.0, pop: 24000 },
    { name: 'Albany', state: 'NY', lat: 42.65, lon: -73.76, pop: 100000 },
    { name: 'Scranton', state: 'PA', lat: 41.41, lon: -75.66, pop: 76000 },
    { name: 'Danbury', state: 'CT', lat: 41.39, lon: -73.45, pop: 87000 }
  ],
  roads: ['US 9', 'I-84', 'NY 55', 'US 44', 'I-87', 'the Taconic'],

  words: {
    street: ['Main Street', 'Market Street', 'Mill Street', 'Hooker Avenue', 'Dutchess Avenue', 'Raymond Avenue', 'Academy Street', 'North Clover Street'],
    water: ['the Hudson', 'the Fallkill', 'the Mid-Hudson Bridge'],
    hood: ['Arlington', 'Mount Carmel', 'the South Side', 'the North Side', 'Mill Street', 'Highland', 'Hyde Park'],
    thing: ['basement', 'Greek diner', 'orchard', 'cider donut', 'rail trail', 'two-family house', 'parish hall', 'commuter train', 'dehumidifier', 'photocopy'],
    weather: ['nor\'easter', 'flash flood', 'leaf-peeper weekend']
  },

  events: [
    { id: 'POUGHKEEPSIE_NY_FAIR_SATURDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The county fair is up the road this week and every van is headed north on Route 9.',
      title: 'The fair takes the north county',
      body: 'A fair Saturday sends every north-county kid and every touring van up Route 9. Your show downtown opens with three bands and no crowd.',
      options: [
        { id: 'LATE', label: 'Push doors back until the fair traffic thins', likely: 'The crowd that wants a night out shows up. Later than planned.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour and a half late. The crowd came down from the fair loud and sunburnt.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'A long, empty first hour.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Three bands played to the bartender. By ten the room finally filled.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'POUGHKEEPSIE_NY_CREEK_FLOOD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [6, 7, 8, 9, 10] },
      telegraph: 'A summer storm is parked over the valley and the creek is rising.',
      title: 'The creek floods the practice space',
      body: 'A thunderstorm has put the creek-side practice space under water the night of a benefit. The amps are fine, the floor is not.',
      options: [
        { id: 'BARN', label: 'Move the bill to a barn over the bridge', likely: 'Smaller and farther. Nobody will complain about the noise.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A barn took the bill with an hour to spare. The ride over the bridge was half the night.' },
        { id: 'ACCEPT', label: 'Run it in the mud', likely: 'The ones who come will remember it.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Half the list stayed home rather than wade in.' }
      ] },

    { id: 'POUGHKEEPSIE_NY_LAST_TRAIN', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 3], months: [9, 10, 11, 12, 1, 2, 3, 4] },
      telegraph: 'Half the bill is coming up from the city on the commuter train.',
      title: 'The last train south',
      body: 'The last train down the river leaves before the headliner goes on, and the friends who came up for the show are watching the clock instead of the stage.',
      options: [
        { id: 'EARLY', label: 'Move the start up and put the headliner on early', likely: 'Most of them stay. A short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors early and the headliner on by nine. Everybody caught the train.' },
        { id: 'ACCEPT', label: 'Keep the order and let them leave', likely: 'The room thins before the best set.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'A third of the room walked out for the station mid-set.' }
      ] }
  ]
});
