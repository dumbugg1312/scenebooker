SB.Cities.register('reading-pa', {
  v: 1,
  slug: 'reading-pa',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['reverb pizza', 'reading hardcore presents', 'gnome hutch', 'mr. roboto project', 'chaos and carnage', 'chaos & carnage', 'ardmore music hall', 'archer music hall', 'tummyache', 'firstenergy stadium', 'berks jazz fest', 'liederkranz', 'reading liederkranz', 'oktoberfest', 'art on the avenue', 'color and art fest', 'armed forces day parade', 'berks armed forces day parade', 'berks county fair', 'the reading fair', 'leesport', 'bear creek mountain resort', 'berks fiddle fest', 'gravity league', 'pagodafest', 'duryea drive', 'skyline drive', 'reading symphony', 'visitpa', 'visit pa americana', 'bandsintown', 'songkick', 'reading royals', 'new hampshire fisher cats', 'harrisburg senators', 'berks weekly', 'yahoo news', 'reading railroad', 'conrail', 'reading eagle', 'albright', 'alvernia', 'penn state berks', 'reading area community college',
           'kutztown university', 'kutztown folk festival', 'folk festival', 'world war ii weekend', 'duryea hill climb', 'hill climb',
           'pretzel city', 'plcb', 'liquor control board', 'amtrak thruway', 'fort indiantown gap', 'indiantown gap', 'wawa', 'sheetz', 'eagles',
           'phillies', '76ers', 'reading fightin phils', 'fightin phils', 'royals', 'santander arena', 'sovereign center', 'goggleworks',
           'penn state', 'hawk mountain', 'neversink grange', 'southwark social hall', 'pretzel works loft', 'schuylkill boat shed',
           'fifth street annex', 'hampden heights turner hall', 'turner hall', 'loading dock on washington', 'mount penn rec room',
           'penn\'s commons basement', 'tulpehocken hall', 'old brewery cold room', 'oley pike grange annex'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['reading eagle*', 'reading railroad*', 'goggleworks*', 'santander*', 'kutztown folk*', 'wawa*', 'sheetz*'],

  blurb: ['A brick mill city off every tour line, where a hall, a damp basement and a few stubborn kids keep a small, loud, loyal scene going.',
          'Vacant mill space is everywhere, but touring bands only come if a local asked, and Philadelphia is an hour and a quarter east.'],
  hard: 'Off the tour route, so you have to beg a fill date.',
  region: 'the Mid-Atlantic',
  houseType: 'ROWHOUSE',
  whereGo: [
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80.00 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Reading' },
    { id: 'inner-ring', kind: 'FEEDER', name: 'Shillington, Mohnton and Sinking Spring', minutes: 15, bearing: 220, note: 'Suburban boroughs with their own fire halls and school districts; the base crowd.' },
    { id: 'kutztown', kind: 'FEEDER', name: 'Kutztown', minutes: 25, bearing: 50, note: 'A college town in farm country with the most of its own scene of any small town here.', bands: 2 },
    { id: 'hamburg', kind: 'FEEDER', name: 'Hamburg', minutes: 25, bearing: 10, note: 'A small borough at the foot of Blue Mountain; fire-hall shows.' },
    { id: 'fleetwood', kind: 'FEEDER', name: 'Fleetwood and Topton', minutes: 25, bearing: 55, note: 'Farm and factory boroughs whose teens drive to Reading and Allentown.' },
    { id: 'west-berks', kind: 'FEEDER', name: 'Womelsdorf, Robesonia and Wernersville', minutes: 25, bearing: 265, note: 'Tiny west county boroughs; church-hall culture.' },
    { id: 'birdsboro', kind: 'FEEDER', name: 'Birdsboro and Elverson', minutes: 25, bearing: 130, note: 'An old iron mill borough and a farm village.' },
    { id: 'boyertown', kind: 'FEEDER', name: 'Boyertown', minutes: 35, bearing: 100, note: 'A manufacturing borough on the county line; school and church circuit.' },
    { id: 'pottstown', kind: 'FEEDER', name: 'Pottstown', minutes: 40, bearing: 115, note: 'A working-class river mill town with some shows of its own, on the road to Philadelphia.', bands: 2 },
    { id: 'ephrata', kind: 'FEEDER', name: 'Ephrata and Lititz', minutes: 40, bearing: 230, note: 'Farm-and-tourist towns that split their loyalty with Lancaster.' },
    { id: 'lebanon', kind: 'FEEDER', name: 'Lebanon', minutes: 45, bearing: 280, note: 'A small city with a small scene that looks to both Harrisburg and Reading.' },
    { id: 'pottsville', kind: 'FEEDER', name: 'Pottsville', minutes: 50, bearing: 350, note: 'Shrinking coal-region town with a loud hardcore and metal reputation.', lean: ['hardcore', 'metal'], bands: 2 },
    { id: 'allentown', kind: 'PEER', name: 'Allentown', minutes: 60, bearing: 55, slug: 'allentown-pa', note: 'The closest same-size pair; bands run both on one weekend.' },
    { id: 'lancaster', kind: 'PEER', name: 'Lancaster', minutes: 50, bearing: 225, slug: 'lancaster-pa', note: 'Arty and pricier; a show in one pulls kids from the other.' },
    { id: 'harrisburg', kind: 'PEER', name: 'Harrisburg', minutes: 65, bearing: 285, slug: 'harrisburg-pa', note: 'The state capital and the usual next stop west.' },
    { id: 'york', kind: 'PEER', name: 'York', minutes: 75, bearing: 245, slug: 'york-pa', note: 'Smaller, with a similar post-industrial feel.' }
  ],

  hoods: [
    { id: 'center-city', name: 'Center City and Penn Street', route: 'downtown', note: 'The old downtown grid: bank towers, empty department stores and repeated revival plans. Occasional storefront and upstairs shows.' },
    { id: 'outlet-district', name: 'the Outlet District', route: 'work-side', note: 'Big brick mills and loading docks, mostly watched and owned. Warehouse potential and cheap practice rooms.' },
    { id: 'southwest', name: 'Southwest Reading', route: 'work-side', note: 'Dense Latino rowhouse blocks by the river with corner stores, social clubs and churches. Basements if you have friends there.' },
    { id: 'northeast', name: 'Northeast Reading and Hampden Heights', route: 'old-side', note: 'Rowhouses and duplexes climbing away from the river. Basements and backyards, cheap and ignored.' },
    { id: 'mount-penn', name: 'Mount Penn', route: 'old-side', note: 'A residential hillside under the pagoda. House and yard shows, with the hill giving some noise cover.' },
    { id: 'west-reading', name: 'West Reading', route: 'downtown', note: 'The walkable borough across the bridge: bars and restaurants, nothing all-ages, priced out and polished.' },
    { id: 'inner-suburbs', name: 'the inner suburbs', route: 'campus', note: 'Shillington, Mohnton and Exeter: fire halls, church basements and finished suburban basements. Where the suburban kids come from.' },
    { id: 'north-reading', name: 'north Reading and the 9th Street corridor', route: 'work-side', note: 'A long avenue north from downtown with a nightclub, a pizza annex and street parking. Not the best part of town.' }
  ],

  rooms: [
    { id: 'yard-basement', kind: 'HOUSE', hood: 'inner-suburbs', cap: 50, curfew: 1320, start: true,
      note: 'A basement and a yard stage run by friends. The code bars sound across a residential line after ten.' },
    { id: 'hampden-basement', kind: 'HOUSE', hood: 'northeast', cap: 40, curfew: 1320,
      note: 'A damp stone-walled basement in a rowhouse. The wall is shared and the landlord is the risk.' },
    { id: 'southwest-basement', kind: 'HOUSE', hood: 'southwest', cap: 35, curfew: 1320,
      note: 'A basement on a dense block, reachable only through someone who lives there.' },
    { id: 'north-club', kind: 'CLUB', hood: 'north-reading', cap: 300, ages: ['ALL', 'A21'], curfew: 1380,
      note: 'The main metal and hardcore room, with an outdoor stage. A commercial nightclub that needs a draw.' },
    { id: 'pizza-annex', kind: 'BAR', hood: 'north-reading', cap: 120, ages: ['ALL', 'A21'], curfew: 1380,
      note: 'A smaller room beside the club for bills that will not fill the big one. All ages early, 21-plus late.' },
    { id: 'suburb-fire-hall', kind: 'HALL', hood: 'inner-suburbs', cap: 200, curfew: 1350,
      note: 'A fire company hall with a kitchen window. The fire marshal\'s count is the limit.' },
    { id: 'hamburg-hall', kind: 'HALL', hood: 'inner-suburbs', cap: 150, curfew: 1320,
      note: 'A church basement or fire hall at the foot of the mountain. No booze and no cursing.' },
    { id: 'mill-practice', kind: 'DIY', hood: 'outlet-district', cap: 100, curfew: 1380,
      note: 'A rented practice room in an old mill that can host a night. An inspection or a sold building ends it.' },
    { id: 'penn-storefront', kind: 'SHOP', hood: 'center-city', cap: 60, curfew: 1260,
      note: 'A storefront set on the old downtown grid. Revival plans make the rent climb.' },
    { id: 'hillside-pavilion', kind: 'OUTDOOR', hood: 'mount-penn', cap: 80, curfew: 1260,
      note: 'A rented pavilion on the hillside in summer. The city added a park noise rule after ten.' },
    { id: 'downtown-arena', kind: 'BIG', hood: 'center-city', cap: 7000, ages: ['ALL'], curfew: 1380,
      note: 'The downtown arena. Out of reach for a booker, and touring metal skips it for the club.' }
  ],

  contacts: ['allentown-pa', 'lancaster-pa', 'harrisburg-pa', 'philadelphia'],

  calendar: [
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 7, week: 2, dows: [2, 3, 4, 5], can: [0.88, 0.85, 0.88] },
    { id: 'holiday-parade', label: 'the holiday parade', tag: 'parade', month: 11, week: 4, dows: [5], can: [0.9, 0.95, 0.95], hoods: ['center-city'], elsewhere: [1, 1, 1] },
    { id: 'german-fest', label: 'the fall festival weekend', tag: 'festival', month: 9, week: 2, dows: [4, 5, 6], can: [0.92, 0.88, 0.88] },
    { id: 'hillside-weekend', label: 'the hillside race weekend', tag: 'race', month: 9, week: 4, dows: [5, 6], can: [0.9, 0.88, 0.9], hoods: ['mount-penn'], elsewhere: [1, 0.97, 0.97] },
    { id: 'metal-one-day', label: 'the spring metal one-day', tag: 'festival', month: 5, week: 3, dows: [5], can: [0.9, 0.85, 0.9] },
    { id: 'arts-avenue', label: 'the arts avenue fair', tag: 'festival', month: 6, week: 3, dows: [4, 5, 6], can: [0.95, 0.92, 0.92], hoods: ['west-reading'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [0.85, 0.95, 0.95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [0.85, 0.95, 0.95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.1] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1320, weekend: 1320, inForce: true } },

  points: [
    { name: 'Pottstown', state: 'PA', lat: 40.25, lon: -75.65, pop: 23000 },
    { name: 'Phoenixville', state: 'PA', lat: 40.13, lon: -75.52, pop: 19000 },
    { name: 'Wilmington', state: 'DE', lat: 39.74, lon: -75.55, pop: 70000 },
    { name: 'Trenton', state: 'NJ', lat: 40.22, lon: -74.76, pop: 90000 }
  ],
  roads: ['US 422', 'US 222', 'PA 61', 'I-78', 'I-176', 'Penn Street'],

  words: {
    street: ['Penn Street', 'Perkiomen Avenue', 'Fifth Street', 'Washington Street', 'Tulpehocken Street'],
    water: ['the Schuylkill', 'the Tulpehocken', 'Antietam Lake'],
    hood: ['Southwest Reading', 'Hampden Heights', 'Mount Penn', 'Outlet District', 'West Reading', 'Wyomissing', 'Shillington'],
    thing: ['soft pretzel', 'rowhouse stoop', 'fire company hall', 'hoagie', 'scrapple', 'bodega', 'birch beer', 'mill building', 'practice space', 'bull roast'],
    weather: ['nor\'easter', 'river flood']
  },

  events: [
    { id: 'READING_PA_TEN_PM_LINE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4] },
      telegraph: 'The code says no sound across a residential line after ten, and the neighbor over the party wall knows it.',
      title: 'The neighbor calls it in at ten-oh-one',
      body: 'A basement bill runs into the ten o\'clock line. The neighbor across the party wall has the number on the fridge and the clock in the window.',
      options: [
        { id: 'EARLY', label: 'Move the start up and finish by ten', likely: 'A short night, a clean one.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors early, done before ten. Nobody called.' },
        { id: 'ACCEPT', label: 'Run it long and hope', likely: 'The neighbor probably has it timed to the minute.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The cops came at ten-twenty. You ended it there and apologized to the street.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'READING_PA_HILLSIDE_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'race' },
      telegraph: 'The hillside race weekend closes the roads up the mountain.',
      title: 'The hill is closed',
      body: 'The hillside race weekend has closed the roads up the mountain. The house up there cannot get its amps in, and the bands are stuck on the wrong side of the barricades.',
      options: [
        { id: 'EARLY', label: 'Load in early before the barricades go up', likely: 'Most of them get in. A short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .92 }],
          result: 'Everything was in by noon. The crowd came on foot after.' },
        { id: 'BASEMENT', label: 'Move the bill to a basement down the hill', likely: 'Smaller and louder.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A basement below the barricades took the bill and the floor was packed.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'A lot of people give up on the closures.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The roads stayed shut. Half the list never got up the hill.' }
      ] },

    { id: 'READING_PA_METAL_SATURDAY', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival', months: [5] },
      telegraph: 'The spring metal one-day is on Saturday, the same night as your bill.',
      title: 'The big room is at the other thing',
      body: 'The spring metal one-day has the club\'s crowd, and your hardcore bill is on the same Saturday. The promoter wants the opener to play the pizza annex.',
      options: [
        { id: 'ANNEX', label: 'Move the opener to the pizza annex', likely: 'A small crowd that came for the bill.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The annex was packed and warm. The big room was someone else\'s night.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The metal crowd is at the other thing.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The metal day took the crowd. The ones who came were the regulars.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] }
  ]
});
