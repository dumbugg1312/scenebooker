SB.Cities.register('louisville', {
  v: 1,
  slug: 'louisville',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of louisville', 'u of l', 'uofl', 'bellarmine', 'spalding university', 'sullivan university', 'jefferson community and technical college',
           'indiana university southeast', 'western kentucky university', 'eastern kentucky university', 'ge appliances', 'kentucky derby', 'derby festival',
           'kentucky derby festival', 'thunder over louisville', 'louder than life', 'bourbon & beyond', 'bourbon and beyond', 'forecastle', 'kentucky state fair',
           'st. james court art show', 'st james court art show', 'louisville city fc', 'frisch\'s', 'waffle house', 'white castle', 'ale-8-one', 'ale-8', 'tarc',
           'metro alcoholic beverage control', 'keep louisville weird', 'vfw', 'american legion', 'knights of columbus', 'fraternal order of police', 'ghost ship',
           'oakland warehouse fire', 'fort knox', 'expo center',
           'beargrass annex', 'the floodwall room', 'floodwall room', 'rubbertown rec', 'shotgun social hall', 'whiskey row stairwell', 'ninth street mission hall',
           'tobacco row loft', 'hogshead hall', 'cave hill social club', 'camelback common', 'pegasus lot', 'preston highway roller rink', 'the falls annex',
           'slugger alley garage', 'brownsboro basement'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Annual events are generic in game text. */
  blocklist: ['kentucky derby*', 'thunder over*', 'louder than life*', 'forecastle*', 'ale-8*', 'frisch*', 'waffle house*', 'white castle*'],

  blurb: ['An Ohio River city at the Falls with a long memory for teenage post-hardcore, indie and slow, strange rooms in odd places.',
          'Shows happen nearly every week, and the crowd follows the bill, not the building. But the liquor board and the landlords keep taking the rooms.'],
  hard: 'All-ages means early shows, and rooms vanish by fine or by sale.',
  region: 'the Ohio Valley',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Cincinnati', state: 'OH', lat: 39.10, lon: -84.51 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Louisville' },
    { id: 'shepherdsville', kind: 'FEEDER', name: 'Shepherdsville', minutes: 20, bearing: 185, note: 'Warehouse and commuter suburb on I-65. Strip malls and a few garage bands.', bands: 1 },
    { id: 'la-grange', kind: 'FEEDER', name: 'La Grange', minutes: 30, bearing: 55, note: 'A wealthy exurb with a railroad down Main Street and suburban pop-punk kids.' },
    { id: 'shelbyville', kind: 'FEEDER', name: 'Shelbyville', minutes: 35, bearing: 85, note: 'Horse and farm country. The kids drive in for anything.' },
    { id: 'corydon', kind: 'FEEDER', name: 'Corydon', state: 'IN', minutes: 40, bearing: 255, beyond: 'river-bridges', note: 'A small old Indiana town across the river. Quiet and rural.' },
    { id: 'scottsburg', kind: 'FEEDER', name: 'Scottsburg', state: 'IN', minutes: 40, bearing: 350, beyond: 'river-bridges', note: 'A farm and factory town with nothing to do. Kids ride in on I-65.' },
    { id: 'bardstown', kind: 'FEEDER', name: 'Bardstown', minutes: 45, bearing: 150, note: 'A Catholic tourist town with few options for kids and an occasional scene.' },
    { id: 'radcliff', kind: 'FEEDER', name: 'Radcliff', minutes: 45, bearing: 210, note: 'A base town of transient young adults. Metal and punk kids drive up on weekends.', bands: 2 },
    { id: 'elizabethtown', kind: 'FEEDER', name: 'Elizabethtown', minutes: 50, bearing: 195, note: 'The big town on the way to Nashville, with a small music community of its own.', bands: 2 },
    { id: 'frankfort', kind: 'FEEDER', name: 'Frankfort', minutes: 50, bearing: 70, note: 'The state capital, a small college and a few shows of its own.' },
    { id: 'columbus-in', kind: 'FEEDER', name: 'Columbus', state: 'IN', minutes: 70, bearing: 340, beyond: 'river-bridges', note: 'An engine-making, architecture town with a small music community.' },
    { id: 'lexington', kind: 'PEER', name: 'Lexington', minutes: 75, bearing: 85, slug: 'lexington-ky', note: 'The lateral rival in horse country. Respect, and a basketball grudge.' },
    { id: 'bloomington', kind: 'PEER', name: 'Bloomington', state: 'IN', minutes: 110, bearing: 300, slug: 'bloomington-in', note: 'A big college town with a scene of its own.' },
    { id: 'bowling-green', kind: 'PEER', name: 'Bowling Green', minutes: 110, bearing: 195, scene: 1800, note: 'A state-university and car-plant town with a real college scene.' },
    { id: 'owensboro', kind: 'PEER', name: 'Owensboro', minutes: 120, bearing: 245, scene: 600, note: 'A river town of bourbon and barbecue with a modest scene.' }
  ],

  chokepoints: [
    { id: 'river-bridges', name: 'the river bridges', p: .03 }
  ],

  hoods: [
    { id: 'highlands', name: 'the Highlands', route: 'old-side', note: 'The old counterculture strip along Bardstown Road: bars, record and vintage shops, and brick houses with real basements. Established and getting expensive.' },
    { id: 'old-louisville', name: 'Old Louisville', route: 'campus', note: 'Victorian mansions chopped into apartments south of downtown, with huge basements, students, and preservation neighbors who call it in fast.' },
    { id: 'germantown', name: 'Germantown and Schnitzelburg', route: 'old-side', note: 'Dense shotgun houses and corner taverns. Few basements, so shows go to porches and backyards. Heating up and getting pricey.' },
    { id: 'butchertown', name: 'Butchertown and NuLu', route: 'downtown', note: 'Old meatpacking blocks and gallery warehouses east of downtown. Priced out; warehouse shows are history.' },
    { id: 'portland', name: 'Portland and the West End', route: 'work-side', note: 'Behind the floodwall: cheap, ignored, storefronts and old churches. Crossing the old line takes care and respect.' },
    { id: 'shelby-park', name: 'Shelby Park and Smoketown', route: 'work-side', note: 'Tight shotgun blocks south of downtown. Cheaper than the Highlands, with displacement worries.' },
    { id: 'crescent-hill', name: 'Crescent Hill and Clifton', route: 'campus', note: 'Leafy brick bungalows along Frankfort Avenue. Families, professionals and sensitive ears.' },
    { id: 'south-end', name: 'the South End', route: 'work-side', note: 'Working-class suburbs along Preston and Dixie Highways: strip malls, practice spaces, post halls and rinks. Car only and mostly ignored.' },
    { id: 'southern-indiana', name: 'Southern Indiana', route: 'work-side', note: 'Jeffersonville, Clarksville and New Albany across the bridges: different state, different cops, cheap rent and a toll to pay.' }
  ],

  rooms: [
    { id: 'highlands-basement', kind: 'HOUSE', hood: 'highlands', cap: 60, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 20, standing: [70, 60, 45],
      pressure: 50, start: true, note: 'A brick basement off Bardstown Road. Real walls and a real floor, and neighbors who have heard it all.' },
    { id: 'mansion-basement', kind: 'HOUSE', hood: 'old-louisville', cap: 70, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [65, 55, 45],
      pressure: 55, note: 'A mansion cut into flats with a huge basement. Tall rooms, churchy neighbors, and complaints that travel fast.' },
    { id: 'shotgun-yard', kind: 'OUTDOOR', hood: 'germantown', cap: 60, rent: 0, pa: .4, curfew: 1320, sketch: 25, standing: [65, 55, 40],
      note: 'A shotgun house with a side yard. The crowd stretches from the front porch to the back fence. Spring and fall.' },
    { id: 'portland-storefront', kind: 'DIY', hood: 'portland', cap: 90, rent: 60, deposit: 0, pa: .5, curfew: 1440, ac: false, sketch: 35, standing: [55, 60, 45],
      pressure: 45, lowLying: true, needs: ['VOUCH'], note: 'A storefront behind the floodwall. Cheap, ignored and low enough to worry about in a wet spring.' },
    { id: 'chapel', kind: 'HALL', hood: 'highlands', cap: 100, rent: 80, deposit: 0, pa: .5, curfew: 1320, ac: true, sketch: 5, standing: [65, 60, 60],
      owner: 'CHURCH_CONTACT', pressure: 50, note: 'An old chapel that hosts concerts, with conditions. No beer, and the priest has opinions.' },
    { id: 'south-end-hall', kind: 'HALL', hood: 'south-end', cap: 160, rent: 180, deposit: 75, pa: .6, curfew: 1380, ac: true, sketch: 10, standing: [55, 60, 70],
      owner: 'HALL_MANAGER', note: 'A veterans\' hall on Preston Highway. A flat fee, a bar in the back that has to stay dark, and a long list of rules.' },
    { id: 'rink', kind: 'HALL', hood: 'south-end', cap: 220, rent: 250, deposit: 100, pa: .6, curfew: 1320, ac: true, sketch: 5, standing: [55, 65, 65],
      owner: 'HALL_MANAGER', note: 'A roller rink on the highway. Kid matinees on skate-night terms, and the carpet never dries.' },
    { id: 'indiana-lot', kind: 'DIY', hood: 'southern-indiana', cap: 120, rent: 70, deposit: 0, pa: .5, curfew: 1440, ac: false, sketch: 35, standing: [55, 60, 45],
      pressure: 40, needs: ['VOUCH'], note: 'An old commercial building in New Albany. Cheap, a different set of cops, and the bridge toll.' },
    { id: 'records', kind: 'SHOP', hood: 'highlands', cap: 45, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'The record shop on the strip. Afternoon in-stores, over by dinner.' },
    { id: 'strip-bar', kind: 'BAR', hood: 'highlands', cap: 140, soundFee: 50, pa: .7, ages: ['ALL', 'A21'], matinee: true, curfew: 1560, ac: true, following: .3, sketch: 15,
      standing: [45, 65, 70], note: 'A bar on Bardstown Road with a stage. No-alcohol early shows for kids, then 21 and over. The liquor board is watching.' },
    { id: 'taproom', kind: 'BAR', hood: 'germantown', cap: 100, soundFee: 40, pa: .6, ages: ['ALL', 'A21'], curfew: 1380, ac: true, following: .3, sketch: 10,
      standing: [50, 65, 70], note: 'A corner tavern that already took one noise fine. It wants a quiet band and an early night.' },
    { id: 'club', kind: 'CLUB', hood: 'butchertown', cap: 300, houseCosts: 150, split: .8, pa: .9, ages: ['A21', 'A18'], curfew: 1560, ac: true, following: .6, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A real club east of downtown. Wants six weeks and a name.' }
  ],

  contacts: ['lexington-ky', 'bloomington-in'],

  calendar: [
    { id: 'airshow', label: 'the riverfront air show', tag: 'airshow', month: 4, week: 3, dows: [5], can: [.85, .75, .75], hoods: ['butchertown'], elsewhere: [.92, .90, .90] },
    { id: 'race', label: 'race weekend', tag: 'race', month: 5, week: 1, dows: [4, 5], can: [.85, .75, .80], hoods: ['highlands', 'old-louisville'], elsewhere: [.92, .88, .90] },
    { id: 'fair', label: 'the state fair', tag: 'fair', month: 8, week: 3, dows: [3, 4, 5, 6], can: [.90, .95, .97] },
    { id: 'festival', label: 'the big festival weekend', tag: 'festival', month: 9, week: 4, dows: [4, 5, 6], can: [.92, .88, .90] },
    { id: 'art-show', label: 'the Old Louisville art show', tag: 'festival', month: 10, week: 1, dows: [5, 6], can: [.90, .85, .90], hoods: ['old-louisville'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Cincinnati', state: 'OH', lat: 39.10, lon: -84.51, pop: 2250000 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78, pop: 2100000 },
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16, pop: 2100000 }
  ],
  roads: ['I-64', 'I-65', 'I-71', 'the Watterson', 'the Snyder', 'Spaghetti Junction'],

  words: {
    street: ['Bardstown Road', 'Baxter Avenue', 'Frankfort Avenue', 'Preston Highway', 'Dixie Highway', 'Brownsboro Road', 'Shelbyville Road', 'Broadway', 'Market Street'],
    water: ['the Ohio', 'the Falls', 'Beargrass Creek'],
    hood: ['the Highlands', 'Old Louisville', 'Germantown', 'Schnitzelburg', 'Butchertown', 'NuLu', 'Portland', 'Shawnee', 'Crescent Hill', 'Clifton', 'Shelby Park',
           'Smoketown', 'Okolona', 'Beechmont', 'Iroquois'],
    thing: ['shotgun house', 'floodwall', 'hot brown', 'burgoo', 'beer cheese', 'bourbon barrel', 'rickhouse', 'tallboy', 'porch'],
    weather: ['ozone alert', 'ice storm', 'tornado watch']
  },

  events: [
    { id: 'LOUISVILLE_BRIDGE_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'The river bridges are down to one lane for repairs this week.',
      title: 'Nobody can cross the river',
      body: 'A wreck and a lane closure have the bridges backed up for miles on the night of your show. The kids from Southern Indiana are stuck on the far bank, and the ones who made it want to know who is paying the toll.',
      options: [
        { id: 'EARLIER', label: 'Move doors an hour earlier', likely: 'Most of them beat the jam. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors moved up an hour. The ones who left work early made it over.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people from across the river.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The bridges never cleared. The Indiana kids stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Three cars took the long way round together. They will remember that.' }
      ] },

    { id: 'LOUISVILLE_RACE_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'race' },
      telegraph: 'Every house in the Highlands is throwing a party this weekend.',
      title: 'Race weekend has every porch',
      body: 'It is race weekend. Every house in the Highlands has a party with hats and a television, the bars are slammed, and nobody wants a punk show until midnight.',
      options: [
        { id: 'LATE', label: 'Start late and play to the party crowd', likely: 'A looser, drunker room that shows up after dark.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors at ten. The hats came in around eleven.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'A lot of your people are at someone else\'s party.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The street was full. Your room was half empty.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The city was nursing its head, and so were the bands.' }
      ] },

    { id: 'LOUISVILLE_ICE_STORM', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'COLD', months: [12, 1, 2] },
      telegraph: 'An ice storm is coming in off the river.',
      title: 'The ice has the power out',
      body: 'An ice storm has knocked out power across the East End. The one house with a generator is the only room still lit, and the neighbors know exactly what a generator sounds like.',
      options: [
        { id: 'GENERATOR', label: 'Move it to the house with the generator', likely: 'Small, loud and dark. A neighbor may call.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }, { op: 'STRESS', d: 2 }],
          result: 'The house took the whole bill by lantern light. The generator ran all night.' },
        { id: 'LATER', label: 'Move it a day, once the lights come back', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' },
        { id: 'ACCEPT', label: 'Play on and take what you get', likely: 'Few can drive on the ice.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .5 }],
          result: 'The roads glazed over. Only the people who could walk came.' }
      ] }
  ]
});
