SB.Cities.register('akron-oh', {
  v: 1,
  slug: 'akron-oh',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of akron', 'kent state', 'kent state university', 'cuyahoga valley national park', 'blossom music center', 'blossom', 'porchrokr', 'akron marathon',
           'akron marathon race series', 'soap box derby', 'all-american soap box derby', 'firstenergy', 'akron beacon journal', 'beacon journal', 'devil strip',
           'cleveland magazine', 'goodyear', 'goodyear heights', 'firestone', 'firestone park', 'galley boy', 'swensons', 'rubber bowl', '330 day', 'taste of akron',
           'akron art expo', 'pro football hall of fame', 'hall of fame weekend', 'ohio state', 'browns', 'cavaliers', 'guardians', 'zips', 'golden flashes', 'ghost ship',
           'oakland warehouse fire', 'wnir', 'wkyc', 'wkdu', 'college of wooster', 'mount union', 'oberlin conservatory', 'akron civic theatre', 'canal park', 'lock 3',
           'hardesty park', 'the cure room', 'cure room', 'the tread shop', 'tread shop', 'wingfoot hall', 'wingfoot', 'spicer street social club', 'hardesty hall',
           'lock fifteen', 'sixth ward', 'summit lake social club', 'the vulcanizer', 'vulcanizer', 'kenmore lodge no. 330', 'kenmore lodge', 'vfw', 'american legion',
           'akron sound', 'northside district'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Plain words the dossier also used ("the compound", "the slab") are left out so they stay usable. */
  blocklist: ['porchrokr*', 'akron marathon*', 'soap box derby*', 'beacon journal*', 'goodyear*', 'firestone*', 'galley boy*', 'rubber bowl*'],

  blurb: ['A shrunken rubber town in Northeast Ohio, where a house or a porch every few hundred feet holds a four-band bill, free or pay what you can.',
          'Locals are proud of the old art-punk years and tired of hearing about them, and with Cleveland up the road swallowing the tours, the 330 books its own.'],
  hard: 'Cleveland swallows the tours, and hosts worry about fire code and the next closure.',
  region: 'Northeast Ohio',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Cleveland', state: 'OH', lat: 41.50, lon: -81.69 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80.00 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83.00 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  money: { priceIndex: .85 },

  tilt: [
    { fan: 'hardcore', band: 'metal', d: .08, reason: 'A town that has made its own basement noise since the eighties, and a metal crowd that shares its rooms.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Akron' },
    { id: 'falls', kind: 'FEEDER', name: 'Cuyahoga Falls', minutes: 15, bearing: 20, note: 'An inner-ring suburb on the river falls. High-school bands and a few kids with cars.' },
    { id: 'barberton', kind: 'FEEDER', name: 'Barberton', minutes: 15, bearing: 225, note: 'A mill and chemical town with Eastern European halls and a few bars. Working-class and loyal.' },
    { id: 'kent', kind: 'FEEDER', name: 'Kent', minutes: 20, bearing: 85, note: 'A college town where the old Akron bars moved a generation ago. The best feeder and a rival.' },
    { id: 'suburbs', kind: 'FEEDER', name: 'Stow, Hudson, Tallmadge and Twinsburg', minutes: 20, bearing: 45, note: 'Middle-class suburbs. Kids drive in on weekends.' },
    { id: 'canton', kind: 'FEEDER', name: 'Massillon and Canton', minutes: 35, bearing: 175, note: 'Mill towns to the south with their own punk and metal clubs. Half feeder, half sibling.' },
    { id: 'medina', kind: 'FEEDER', name: 'Medina', minutes: 35, bearing: 295, note: 'A growing, wealthier exurb with a historic square and little for teenagers, so they ride in.' },
    { id: 'ravenna', kind: 'FEEDER', name: 'Ravenna', minutes: 30, bearing: 70, note: 'A county seat in farm and lake country. A small scene that feeds off Kent.' },
    { id: 'wooster', kind: 'FEEDER', name: 'Wooster', minutes: 45, bearing: 235, note: 'A small college town in farm country, with a few bands and a lot of road.' },
    { id: 'alliance', kind: 'FEEDER', name: 'Alliance', minutes: 45, bearing: 130, note: 'A small railroad and college town southeast. Quiet, with a few kids with vans.' },
    { id: 'lorain', kind: 'FEEDER', name: 'Elyria and Lorain', minutes: 50, bearing: 320, note: 'Steel and lake towns with a mixed working-class scene of their own.' },
    { id: 'oberlin', kind: 'FEEDER', name: 'Oberlin', minutes: 60, bearing: 315, note: 'A small college town with a conservatory and a crowd for noise, queer punk and student bands.' },
    { id: 'ashtabula', kind: 'FEEDER', name: 'Ashtabula County', minutes: 80, bearing: 50, note: 'Lake port and covered-bridge country. A long drive, so the kids who come mean it.' },
    { id: 'youngstown', kind: 'PEER', name: 'Youngstown', minutes: 60, bearing: 100, slug: 'youngstown-oh', note: 'A harder, poorer, steel-haunted city with its own hardcore tradition. A short drive out and a long one back.' },
    { id: 'erie', kind: 'PEER', name: 'Erie', state: 'PA', minutes: 120, bearing: 50, slug: 'erie-pa', note: 'A small peer along the lake, with its own few rooms.' },
    { id: 'toledo', kind: 'PEER', name: 'Toledo', minutes: 150, bearing: 295, slug: 'toledo-oh', note: 'A peer in size and rust, too far to trade crowds. Bands play both on the way to Chicago.' },
    { id: 'dayton', kind: 'PEER', name: 'Dayton', minutes: 180, bearing: 225, slug: 'dayton-oh', note: 'The other mid-sized Ohio punk town, three hours across the state.' }
  ],

  hoods: [
    { id: 'highland-square', name: 'Highland Square', route: 'old-side', note: 'Big old houses with porches, a walkable strip of bars and a porch-music weekend each summer. The cultural center, and the place a bad night gets the lights turned off by decree.' },
    { id: 'downtown', name: 'Downtown and North Main', route: 'downtown', note: 'A compact core built for twice the people: small bars, club nights, big empty buildings and new lofts in the old rubber offices.' },
    { id: 'kenmore', name: 'Kenmore', route: 'work-side', note: 'A working-class boulevard on the dead-mall edge, cheap and newly noticed, with a punk and metal club moving in from the next county.' },
    { id: 'north-hill', name: 'North Hill', route: 'old-side', note: 'The international district, home to thousands of Nepali-speaking families and the only part of the city that is growing. Few rock shows, plenty of cheap storefronts.' },
    { id: 'east-akron', name: 'East Akron and Ellet', route: 'work-side', note: 'Company-built tire-plant neighborhoods of small frame houses, ravines and real basements. Cheap and ignored: the heart of the basement circuit.' },
    { id: 'south-akron', name: 'South Akron', route: 'work-side', note: 'A walkable, family neighborhood of garages and yards along South Main. Where you grew up, not where you go out.' },
    { id: 'west-hill', name: 'West Hill', route: 'old-side', note: 'Porches and long-vacant houses west of downtown. Funky, cheap and a little rough.' },
    { id: 'campus', name: 'the campus edge', route: 'campus', note: 'Student rentals around the university east of downtown. The rooms depend on enrollment, which is falling.' },
    { id: 'merriman', name: 'Merriman Valley', route: 'old-side', note: 'The river valley on the edge of the national park: restaurants and bigger live rooms. More date night than punk, and pricey.' }
  ],

  rooms: [
    { id: 'ellet-basement', kind: 'HOUSE', hood: 'east-akron', cap: 55, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 25, standing: [70, 60, 45],
      pressure: 45, start: true, note: 'A basement under a small frame house on the east side. One stairway, low ceiling, and it floods in spring.' },
    { id: 'square-house', kind: 'HOUSE', hood: 'highland-square', cap: 50, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 20, standing: [65, 60, 50],
      pressure: 55, note: 'A big old house with a porch and a front-room stage. The neighbors are older and the street is watched.' },
    { id: 'campus-house', kind: 'HOUSE', hood: 'campus', cap: 45, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 20, standing: [75, 55, 35],
      pressure: 55, note: 'A student rental near the university. Packed in term, empty in the long breaks.' },
    { id: 'west-hill-house', kind: 'HOUSE', hood: 'west-hill', cap: 45, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 40, note: 'A porch-front house on a half-empty block. Few neighbors, farther from the bars.' },
    { id: 'south-yard', kind: 'OUTDOOR', hood: 'south-akron', cap: 70, rent: 10, pa: .4, curfew: 1320, sketch: 30, standing: [60, 55, 40],
      note: 'A backyard and a garage in an old company neighborhood. Summer evenings, a generator, and the one dry weekend in September.' },
    { id: 'church-hall', kind: 'HALL', hood: 'north-hill', cap: 90, rent: 80, deposit: 0, pa: .5, curfew: 1320, ac: true, sketch: 5, standing: [65, 60, 60],
      owner: 'CHURCH_CONTACT', pressure: 45, note: 'A church basement hall. All ages, no beer, and out by ten.' },
    { id: 'social-hall', kind: 'HALL', hood: 'kenmore', cap: 160, rent: 180, deposit: 75, pa: .6, curfew: 1380, ac: true, sketch: 15, standing: [55, 60, 70],
      owner: 'HALL_MANAGER', note: 'A fraternal hall with a bar and a stage already built. A flat fee, folding chairs and a long list of rules.' },
    { id: 'storefront', kind: 'DIY', hood: 'kenmore', cap: 100, rent: 70, deposit: 0, pa: .5, curfew: 1440, ac: false, sketch: 40, standing: [55, 60, 45],
      pressure: 55, needs: ['VOUCH'], note: 'A vacant storefront on the boulevard. Cheap and loud, with a landlord who may not know.' },
    { id: 'old-plant', kind: 'DIY', hood: 'east-akron', cap: 150, rent: 90, deposit: 0, pa: .6, curfew: 1440, ac: false, sketch: 50, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'A bay in an old factory building, with a rehearsal room next door. The best sound in town and the worst fire exits.' },
    { id: 'loft-room', kind: 'DIY', hood: 'downtown', cap: 90, rent: 80, deposit: 0, pa: .5, curfew: 1380, ac: true, sketch: 30, standing: [60, 60, 50],
      pressure: 50, note: 'An upstairs room in an old downtown building. The lofts are coming, and the landlord knows it.' },
    { id: 'record-store', kind: 'SHOP', hood: 'highland-square', cap: 40, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'The record store on the strip. In-stores in the afternoon, over by seven.' },
    { id: 'main-bar', kind: 'BAR', hood: 'downtown', cap: 130, soundFee: 60, pa: .7, ages: ['ALL', 'A18', 'A21'], matinee: true, curfew: 1590, ac: true,
      following: .3, sketch: 20, standing: [50, 65, 70], note: 'A small bar on North Main with a stage and an 18-plus night.' },
    { id: 'square-bar', kind: 'BAR', hood: 'highland-square', cap: 110, soundFee: 40, pa: .6, ages: ['A21'], curfew: 1590, ac: true, following: .3, sketch: 10,
      standing: [45, 65, 75], pressure: 50, note: 'A bar on the strip. The city shut this block down early once, and it remembers.' },
    { id: 'club', kind: 'CLUB', hood: 'downtown', cap: 300, houseCosts: 150, split: .8, pa: .9, ages: ['A18', 'A21'], curfew: 1590, ac: true, following: .6, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The legal downtown room, a converted theater with a long history. Wants six weeks and a name.' }
  ],

  contacts: ['canton-oh', 'youngstown-oh', 'pittsburgh', 'erie-pa'],

  calendar: [
    { id: 'porch-fest', label: 'the porch music weekend', tag: 'festival', month: 8, week: 3, dows: [4, 5, 6], can: [.92, .88, .85], hoods: ['highland-square'], elsewhere: [1, .97, .97] },
    { id: 'marathon', label: 'marathon weekend', tag: 'race', month: 9, week: 4, dows: [5], can: [.92, .88, .88], hoods: ['downtown', 'campus'], elsewhere: [1, 1, 1] },
    { id: 'cart-derby', label: 'the cart derby weekend', tag: 'race', month: 7, week: 3, dows: [4, 5, 6], can: [.95, .92, .90] },
    { id: 'area-code-day', label: 'the area-code holiday', tag: 'festival', month: 3, week: 5, dows: [3, 4, 5, 6], can: [.88, .92, .95] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Cleveland', state: 'OH', lat: 41.50, lon: -81.69, pop: 2000000 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80.00, pop: 2400000 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83.00, pop: 2200000 }
  ],
  roads: ['I-76', 'I-77', 'I-277', 'Route 8', 'Route 59', 'the Ohio Turnpike'],

  words: {
    street: ['West Market Street', 'Main Street', 'Kenmore Boulevard', 'Howard Street', 'Exchange Street', 'Brittain Road', 'Canton Road', 'South Main Street', 'Arlington Street'],
    water: ['the Cuyahoga', 'the canal', 'the Towpath', 'Summit Lake', 'Lake Erie'],
    hood: ['Highland Square', 'Kenmore', 'North Hill', 'Ellet', 'West Hill', 'Sherbondy Hill', 'Merriman Valley', 'Cuyahoga Falls', 'Barberton', 'Kent'],
    thing: ['tire', 'smokestack', 'blimp', 'basement', 'porch', 'pierogi', 'halushki', 'kielbasa', 'momo', 'factory ground', 'house show', 'vacant building', 'fire code'],
    weather: ['lake-effect snow', 'slush', 'spring thaw']
  },

  events: [
    { id: 'AKRON_OH_BAR_CURFEW', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [5, 6, 7, 8, 9] },
      telegraph: 'There was a shooting near the bar strip and the mayor is talking about closing hours.',
      title: 'The city turns off the lights',
      body: 'After an incident in the bar district the city has set a midnight closing for the bars and an early one for the parking lots, with towing after. Your show is in the middle of it.',
      options: [
        { id: 'EARLY', label: 'Move the start up and finish before the closing', likely: 'Most of them get in, but it\'s a short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'You opened doors early and finished before the lots closed, so the people who came got a short, tight set.' },
        { id: 'BASEMENT', label: 'Move the whole bill to a basement', likely: 'It\'s smaller and louder, and nobody can tow a house.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A basement took the bill with an hour to spare, and the floor was packed.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'People are nervous about the towing.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'Half the list stayed home rather than risk the car.' }
      ] },

    { id: 'AKRON_OH_GAME_DAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'A home game is on Saturday, and the whole fall schedule is on every television.',
      title: 'The football-day collision',
      body: 'A game at the stadium, a big Ohio game on every screen, and your show at eight in the same neighborhood as three tailgates.',
      options: [
        { id: 'LATE', label: 'Push doors back until the games are over', likely: 'The crowd that wants a night out shows up, later than planned.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'You opened doors an hour late, and the crowd came in from the bars, loud and happy.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the game.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The casual crowd stayed on the couch, and the regulars came.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'AKRON_OH_LAKE_EFFECT', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [11, 12, 1, 2, 3] },
      telegraph: 'The forecast says lake-effect snow, heavy to the north and east and nothing at all in the city.',
      title: 'The snow is on the Turnpike',
      body: 'The band from Pittsburgh hit a snow squall on the Turnpike that never reached Akron. They are crawling, and the bill has two of its five bands.',
      options: [
        { id: 'SHORT', label: 'Run the short bill and play on', likely: 'It\'s a thin night, but the people who came are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'It was two bands and a long, loose night, and the room was half full and warm.' },
        { id: 'WAIT', label: 'Hold the doors and wait for them', likely: 'It\'s a late start, and the crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The van pulled in at ten, so you started late, and nobody left.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date and costs you some trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could come, came.' }
      ] },

    { id: 'AKRON_OH_PORCH_NOISE', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The neighborhood association is running a porch music weekend and wants permits.',
      title: 'The porch weekend wants a permit',
      body: 'A neighborhood porch-music weekend is on, and your band wants in as a legitimate act. The association asks for a noise permit and a list of porches.',
      options: [
        { id: 'JOIN', label: 'Get the permit and play a real porch', likely: 'It costs a little, and you get a bigger, friendlier crowd.',
          effects: [{ op: 'MONEY', amount: -25 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.15 }, { op: 'REGULARS', pct: .02 }],
          result: 'With the permit in hand, you played a front porch to the whole street.' },
        { id: 'SKIP', label: 'Stay off the porches and keep it small', likely: 'You get fewer people and no trouble.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'You kept to your own room, and the festival took some of the crowd.' }
      ] }
  ]
});
