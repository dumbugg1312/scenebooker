SB.Cities.register('allentown-pa', {
  v: 1,
  slug: 'allentown-pa',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['muhlenberg college', 'muhlenberg', 'cedar crest', 'moravian', 'lehigh university', 'lafayette college', 'lafayette', 'desales', 'kutztown university', 'east stroudsburg university',
           'penn state', 'the great allentown fair', 'great allentown fair', 'allentown fair', 'musikfest', 'lehigh-lafayette', 'lehigh vs. lafayette', 'the rivalry',
           'lanta', 'wdiy', 'wmuh', 'wawa', 'sheetz', 'yuengling', 'live nation', 'niz', 'lehigh valley underground music archive', 'queen city municipal',
           'band city usa', 'peanut city', 'queen city', 'a-town', 'mack trucks', 'vfw', 'american legion', 'pennsylvania liquor control board', 'plcb', 'liquor control board',
           'ribbon mill', 'peanut row', 'dutch hill hall', 'sixth ward social club', 'little lehigh lodge', 'mountainville lanes', 'the transistor room', 'band city basement',
           'cumberland street rec', 'jordan creek annex', 'liberty street parish hall', 'the mack yard'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real colleges, the fair and the big festival are translated in game text. */
  blocklist: ['musikfest*', 'great allentown fair*', 'wdiy*', 'muhlenberg*', 'lehigh university*', 'lehigh valley underground*', 'wawa*', 'sheetz*', 'yuengling*'],

  blurb: ['A dense brick rowhouse city in the Lehigh Valley with a shiny new downtown for ticketed shows. The scene is small enough that every bill is mixed and everyone knows who is late.',
          'The old heads remember a nineties peak. Teenagers are restarting it, and the best nights are in a hall or over the river in Bethlehem.'],
  hard: 'Few bands, few rooms, a closed club, and half the town never hears about shows.',
  region: 'the I-78 corridor',
  houseType: 'ROWHOUSE',
  whereGo: [
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Allentown' },
    { id: 'whitehall', kind: 'FEEDER', name: 'Whitehall and Salisbury', minutes: 10, bearing: 20, note: 'Strip-mall and split-level suburbs across the river, full of garages and basements.' },
    { id: 'catasauqua', kind: 'FEEDER', name: 'Catasauqua', minutes: 10, bearing: 350, note: 'An old iron-town borough just north with real show history and a few bands.', bands: 2 },
    { id: 'emmaus', kind: 'FEEDER', name: 'Emmaus', minutes: 15, bearing: 235, note: 'A close-in borough where a new crop of high-school kids is trying to revive the scene.', bands: 2 },
    { id: 'bethlehem', kind: 'FEEDER', name: 'Bethlehem', minutes: 15, bearing: 100, scene: 700, note: 'The cooler, more artsy sister on the south side of the river. Crowds trade back and forth all the time.', bands: 5 },
    { id: 'easton', kind: 'FEEDER', name: 'Easton', minutes: 25, bearing: 80, note: 'A river city on the Delaware with its own band history and a college.' },
    { id: 'nazareth', kind: 'FEEDER', name: 'Nazareth and Bangor', minutes: 30, bearing: 50, note: 'Old slate and cement towns north of the Valley. Small, working-class, kids drive far.' },
    { id: 'kutztown', kind: 'FEEDER', name: 'Kutztown', minutes: 30, bearing: 265, note: 'A university town and farm country, with a small campus scene.' },
    { id: 'quakertown', kind: 'FEEDER', name: 'Quakertown and Upper Bucks', minutes: 30, bearing: 170, note: 'Suburb and farm country that drives to both Allentown and Philadelphia, with a hardcore habit.', bands: 2 },
    { id: 'pottstown', kind: 'FEEDER', name: 'Pottstown and Boyertown', minutes: 45, bearing: 200, note: 'Old mill towns to the south with kids who need a ride.' },
    { id: 'palmerton', kind: 'FEEDER', name: 'Palmerton and the Blue Mountain towns', minutes: 45, bearing: 340, note: 'Old zinc, coal and rail towns. Very small; the kids drive a long way for a show.' },
    { id: 'stroudsburg', kind: 'FEEDER', name: 'Stroudsburg and the Poconos edge', minutes: 50, bearing: 35, note: 'A university town and resort exurb with a small punk history.' },
    { id: 'reading', kind: 'PEER', name: 'Reading', minutes: 45, bearing: 245, slug: 'reading-pa', note: 'The other worn-out industrial city, heavily Latino, with a DIY scene of its own.' },
    { id: 'lancaster', kind: 'PEER', name: 'Lancaster', minutes: 75, bearing: 230, slug: 'lancaster-pa', note: 'A college and arts city in farm country, on the way west.' },
    { id: 'scranton', kind: 'PEER', name: 'Scranton and Wilkes-Barre', minutes: 80, bearing: 335, slug: 'scranton-pa', note: 'A hardcore and ska-punk tradition up the turnpike; friendly rivals sharing bands.' },
    { id: 'harrisburg', kind: 'PEER', name: 'Harrisburg', minutes: 85, bearing: 265, slug: 'harrisburg-pa', note: 'The capital, with its own punk and hardcore scene, on the touring road west.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Arena, towers and a big new music hall, with bars and clubs. Polished, priced up and not for a ten-dollar bill.' },
    { id: 'arts-district', name: 'the Arts District and Old Allentown', route: 'old-side', note: 'Brownstones, a museum and church sanctuaries. Neighbors who know the zoning officer.' },
    { id: 'west-end', name: 'the West End', route: 'campus', note: 'The whiter, comfortable side: college kids, a hospital, big Victorian houses with porches and basements. The fair is here every September.' },
    { id: 'north-side', name: 'the North Side and Seventh Street', route: 'work-side', note: 'The Latino commercial spine, with the most cheap rowhouses and storefronts in the city. Ignored for now; the downtown rent wave is creeping up.' },
    { id: 'waterfront', name: 'the Waterfront and East Allentown', route: 'work-side', note: 'Old rail and industrial land along the river, being turned into offices and housing. The warehouses are going.' },
    { id: 'sixth-ward', name: 'the Sixth Ward', route: 'old-side', note: 'Working-class blocks of rowhouses, social clubs and parish halls. Cheap and stable, with basements and garages.' },
    { id: 'south-side', name: 'Mountainville and Alton Park', route: 'work-side', note: 'Cheap and quiet at the foot of the mountain, with parkland, garages and industrial units. Kids from the suburbs pass through.' }
  ],

  rooms: [
    { id: 'sixth-cellar', kind: 'HOUSE', hood: 'sixth-ward', cap: 45, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 25, standing: [70, 60, 45],
      pressure: 55, start: true, note: 'A rowhouse cellar with a low ceiling and a dehumidifier. Forty people, and the neighbors on both sides know it.' },
    { id: 'north-cellar', kind: 'HOUSE', hood: 'north-side', cap: 40, hostCut: 0, pa: .3, curfew: 1380, outdoor: false, sketch: 25, standing: [65, 55, 45], pressure: 50,
      note: 'A basement on the North Side. Cheap, close to everything, and a hard walk for anyone from out of town.' },
    { id: 'west-house', kind: 'HOUSE', hood: 'west-end', cap: 50, hostCut: 0, pa: .4, curfew: 1380, outdoor: false, sketch: 20, standing: [70, 55, 40], pressure: 50,
      note: 'A big old group house with a basement and a porch. Student-run, so it is gone when they graduate.' },
    { id: 'south-garage', kind: 'HOUSE', hood: 'south-side', cap: 55, hostCut: 0, pa: .4, curfew: 1380, outdoor: true, sketch: 20, standing: [65, 55, 45], pressure: 40,
      note: 'A detached garage behind a single-family house. Fewer neighbors; cold in winter, loud in summer.' },
    { id: 'park-pavilion', kind: 'OUTDOOR', hood: 'south-side', cap: 80, rent: 10, pa: .2, curfew: 1140, sketch: 25, standing: [60, 55, 45],
      note: 'A park pavilion by the creek. Daytime only and no power, so it is a generator show.' },
    { id: 'fire-hall', kind: 'HALL', hood: 'sixth-ward', cap: 160, rent: 180, deposit: 75, pa: .6, curfew: 1440, ac: true, sketch: 10, standing: [60, 60, 70],
      owner: 'HALL_MANAGER', note: 'A volunteer fire company social hall on a Saturday afternoon. Someone old sits at the door and the bar stays shut.' },
    { id: 'social-club', kind: 'HALL', hood: 'sixth-ward', cap: 120, rent: 120, deposit: 50, pa: .5, curfew: 1380, ac: true, sketch: 15, standing: [55, 60, 70],
      owner: 'HALL_MANAGER', note: 'A fraternal hall with a committee, a low ceiling and a long list of rules. Someone\'s dad is a member.' },
    { id: 'parish-hall', kind: 'HALL', hood: 'arts-district', cap: 90, rent: 70, deposit: 0, pa: .4, curfew: 1320, ac: true, sketch: 5, standing: [65, 60, 60],
      owner: 'CHURCH_CONTACT', pressure: 50, note: 'A church basement. Hard curfew, no beer, and a pastor who reads the lyric sheet.' },
    { id: 'waterfront-bay', kind: 'DIY', hood: 'waterfront', cap: 130, rent: 80, deposit: 0, pa: .5, curfew: 1440, ac: false, sketch: 45, standing: [55, 60, 45], pressure: 60,
      needs: ['VOUCH'], note: 'An old industrial unit by the river. A flawless room with a clock on it: the lot is already planned for housing.' },
    { id: 'north-storefront', kind: 'DIY', hood: 'north-side', cap: 70, rent: 60, deposit: 0, pa: .4, curfew: 1380, ac: false, sketch: 35, standing: [60, 60, 50], pressure: 55,
      note: 'The back of a storefront on a ground-floor block. Close to the families who live above it.' },
    { id: 'west-records', kind: 'SHOP', hood: 'west-end', cap: 40, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'The record store with a front window. Afternoon shows, all ages, no beer, over by seven.' },
    { id: 'downtown-bar', kind: 'BAR', hood: 'downtown', cap: 120, soundFee: 60, pa: .7, ages: ['A21', 'A18'], curfew: 1560, ac: true, following: .3, sketch: 20, standing: [45, 65, 70],
      note: 'A downtown bar with a back room and a wristband policy. Under 21 is a favor, and the liquor board is listening.' },
    { id: 'new-hall', kind: 'CLUB', hood: 'downtown', cap: 450, houseCosts: 250, split: .8, pa: .9, ages: ['A21', 'A18'], curfew: 1560, ac: true, following: .6, sketch: 10,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The big new music hall with a flat-floor second room. Wants six weeks and a name.' }
  ],

  contacts: ['reading-pa', 'scranton-pa', 'lancaster-pa', 'harrisburg-pa', 'trenton-nj'],

  calendar: [
    { id: 'fair', label: 'fair week', tag: 'fair', month: 9, week: 1, dows: [2, 3, 4, 5, 6], can: [.85, .90, .92], hoods: ['west-end'], elsewhere: [.96, .97, .97] },
    { id: 'fair-late', label: 'fair week', tag: 'fair', month: 8, week: 5, dows: [2, 3, 4, 5, 6], can: [.85, .90, .92], hoods: ['west-end'], elsewhere: [.96, .97, .97] },
    { id: 'big-festival', label: 'the ten-day festival in Bethlehem', tag: 'festival', month: 8, week: 1, dows: [3, 4, 5, 6], can: [.88, .88, .90] },
    { id: 'arena-oct', label: 'a home game at the arena', tag: 'game', month: 10, weeks: [2, 4], dows: [4, 5], can: [.95, .95, .97], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-fri', label: 'high school football', tag: 'game', month: 10, weeks: [1, 3], dows: [4], can: [.88, 1, .97] },
    { id: 'college-rivalry', label: 'the big college football weekend', tag: 'game', month: 11, week: 3, dows: [5], can: [.90, .95, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1380, inForce: false } },

  points: [
    { name: 'Wilkes-Barre', state: 'PA', lat: 41.25, lon: -75.88, pop: 44000 },
    { name: 'Phillipsburg', state: 'NJ', lat: 40.69, lon: -75.19, pop: 14000 }
  ],
  roads: ['I-78', 'US 22', 'PA 309', 'I-476', 'US 222'],

  words: {
    street: ['Hamilton Street', 'Tilghman Street', 'Linden Street', 'Liberty Street', 'Walnut Street', 'Seventh Street', 'Union Street', 'Lehigh Street', 'MacArthur Road', 'Emmaus Avenue', 'Nineteenth Street'],
    water: ['the Lehigh', 'Jordan Creek', 'the Little Lehigh', 'the Lehigh Parkway', 'South Mountain'],
    hood: ['Dutch Hill', 'Mountainville', 'Alton Park', 'Old Fairgrounds', 'Jordan Heights', 'West Park', 'Cumberland Gardens', 'Old Allentown', 'the Sixth Ward', 'the West End'],
    thing: ['rowhouse cellar', 'dehumidifier', 'fire hall', 'silk mill', 'scrapple', 'shoofly pie', 'funnel cake', 'chow-chow', 'minivan', 'photocopy', 'punk flea market', 'union hall', 'park pavilion', 'generator'],
    weather: ['nor\'easter', 'ice storm', 'gray slush'],
    surnames: ['Rivera', 'Santiago', 'Reyes', 'Kuntz', 'Yeager', 'Schaeffer', 'Kovach', 'Hoffman', 'Diaz', 'Moyer']
  },

  events: [
    { id: 'ALLENTOWN_PA_FAIR_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The fair opens this week and the West End is already full of trucks.',
      title: 'The fair has the West End',
      body: 'The fair is on, parking is gone, every cop is waving traffic, and half your friends are working funnel-cake stands tonight.',
      options: [
        { id: 'EARLY', label: 'Open early and send everyone to park on the side streets', likely: 'Most get in. A thinner start.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors an hour early. The ones who came walked the last mile.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'A lot of people give up on the traffic.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The fair kept them away. The room was half the list.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'ALLENTOWN_PA_FESTIVAL_DRAIN', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'festival' },
      telegraph: 'Every local band got booked on a free stage in Bethlehem this week.',
      title: 'The festival ate the scene',
      body: 'Your local bands, sound people and half the crowd are working the free stages in Bethlehem for ten days. Everyone is tired and broke.',
      options: [
        { id: 'TRADE', label: 'Book the tired ones for a short late set', likely: 'The crowd is smaller but friendly.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Short sets, late start. Everybody came after their own shift.' },
        { id: 'ACCEPT', label: 'Take a thin night', likely: 'Half the list is across the river.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The festival drew them off. You played to the ones who live here.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' }
      ] },

    { id: 'ALLENTOWN_PA_I78_BREAKDOWN', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 2], months: [12, 1, 2, 3] },
      telegraph: 'Snow is on the way and I-78 is the headliner\'s only road.',
      title: 'The van died on I-78',
      body: 'The headliner\'s van quit somewhere on I-78 in a snowstorm. They can find a mechanic and a floor, or they can miss your show.',
      options: [
        { id: 'RIDES', label: 'Send someone out with a minivan', likely: 'Two hours of your day. They make it.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'SHOW_MOD', key: 'lateMin', v: 45 }, { op: 'REGULARS', pct: .02 }],
          result: 'You fetched them off the shoulder. They remember that.' },
        { id: 'WAIT', label: 'Let the openers play long and wait for them', likely: 'A late start and a restless room.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The openers filled the time. The headliner walked in at eleven.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The roads were clear by then.' }
      ] },

    { id: 'ALLENTOWN_PA_ARENA_NIGHT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'The arena has a game and a concert on your night.',
      title: 'Parking costs thirty dollars',
      body: 'Every spot within a mile is thirty dollars and every bar downtown is full. Your crowd cannot find a place to leave the car.',
      options: [
        { id: 'EARLY', label: 'Open early and point them to the free lot across the creek', likely: 'Most get in. Thinner than usual.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .92 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors early. The ones who came walked over the bridge.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'A lot of people skip it.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .78 }],
          result: 'The streets filled up. Half the list stayed home.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] }
  ]
});
