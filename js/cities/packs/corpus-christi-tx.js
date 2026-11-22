SB.Cities.register('corpus-christi-tx', {
  v: 1,
  slug: 'corpus-christi-tx',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  /* The dossier's real institutions and its invented venue names are in banned: research, not content. The storm is written only as 'the '17 storm'. */
  banned: ['naval air station corpus christi', 'naval air station', 'port of corpus christi', 'buc days', 'bayfest', 'first friday artwalk', 'artwalk',
           'texas a&m', 'texas a&m-kingsville', 'texas a&m-corpus christi', 'del mar college', 'coastal bend college', 'saint leo', 'caller-times',
           'whataburger', 'taco cabana', 'h-e-b', 'heb', 'shiner', 'lone star', 'topo chico', 'dr pepper', 'hurricane harvey', 'harvey', 'vfw',
           'american legion', 'king ranch', 'myspace', 'instagram', 'texas jazz festival', 'texas state aquarium', 'sparkling city by the sea',
           'birdiest city in america', 'the blue heron annex', 'seawall hall', 'the norther', 'tuloso feed & seed', 'tuloso feed and seed',
           'mesquite street warehouse', 'kleberg street garage', 'the dredge', 'cuatro vientos hall', 'the bait shop back room', 'laguna strip unit 4',
           'sandbar lodge no. 12', 'the refinery row rec hall',
           'the bend magazine', 'foghorn news', 'reporting texas', 'kiii', 'visit corpus christi', 'rodeo corpus christi', 'american bank center',
           'hilliard convention center', 'barefoot mardi gras', 'whitecap beach', 'padre balli park', 'texas sandfest', 'sandfest',
           'merry days by the bay', 'dia de los muertos', 'birding festival', 'dunking of the mayor', 'bandsintown', 'happeningnext', 'songkick',
           'municode', 'ecode360', 'tamucc library', 'tpwd', 'ccriffs', 'subccultured', 'rally night parade', 'professional bull riders',
           'port aransas ferry'],
  blocklist: ['whataburger*', 'taco cabana*', 'caller-times*', 'buc days*', 'bayfest*', 'blue heron annex*', 'seawall hall*'],

  blurb: ['A Gulf port and refinery city at the bottom of the Texas coastal bend, long and flat and windy, with a naval base and a loyal metal and hardcore crowd.',
          'Rooms keep closing, storms dent everything, and kids leave for the big Texas cities after high school.'],
  hard: 'Rooms keep closing, hurricanes dent everything, and kids leave after high school.',
  region: 'South Texas',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'San Antonio', state: 'TX', lat: 29.42, lon: -98.49 },
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Corpus Christi' },
    { id: 'robstown', kind: 'FEEDER', name: 'Robstown', minutes: 20, bearing: 285, pop: 10143, scene: 60, note: 'A farm and rail town that already acts like a west suburb.',
      rooms: [
        { id: 'robstown-hall', kind: 'HALL', hood: 'robstown-hall', zone: 'robstown', cap: 120, curfew: 1320, ac: true,
          note: 'A rented lodge hall twenty minutes west, the feeder-town kids\' own room. Out by ten.' }
      ] },
    { id: 'portland', kind: 'FEEDER', name: 'Portland', minutes: 20, bearing: 20, note: 'A bedroom suburb across the bay.' },
    { id: 'ingleside', kind: 'FEEDER', name: 'Ingleside and Aransas Pass', minutes: 30, bearing: 40, note: 'Refinery and shrimp-boat towns.' },
    { id: 'sinton', kind: 'FEEDER', name: 'Sinton and Mathis', minutes: 30, bearing: 330, note: 'Small farm and oil towns; high school kids.' },
    { id: 'kingsville', kind: 'FEEDER', name: 'Kingsville', minutes: 40, bearing: 215, pop: 25402, note: 'A university town down US 77 with the likeliest small scene of its own.', bands: 2 },
    { id: 'rockport', kind: 'FEEDER', name: 'Rockport and Fulton', minutes: 40, bearing: 35, pop: 10070, note: 'Fishing and retirees, rebuilt after the \'17 storm.' },
    { id: 'port-aransas', kind: 'FEEDER', name: 'Port Aransas', minutes: 45, bearing: 55, pop: 2904, note: 'A beach town reached by the free ferry; swells every summer.', season: { months: [3, 6, 7, 8], mul: 1.5 } },
    { id: 'alice', kind: 'FEEDER', name: 'Alice', minutes: 50, bearing: 260, pop: 17891, note: 'An oil-field hub; kids drive in for shows.' },
    { id: 'beeville', kind: 'FEEDER', name: 'Beeville', minutes: 60, bearing: 320, note: 'Prison and community college town.' },
    { id: 'victoria', kind: 'PEER', name: 'Victoria', minutes: 80, bearing: 35, scene: 600, note: 'Smaller, same coastal-plains orbit; bands trade both ways.' },
    { id: 'laredo', kind: 'PEER', name: 'Laredo', minutes: 135, bearing: 250, slug: 'laredo-tx', note: 'A Spanish-speaking border city with a cross-border punk pipeline.' },
    { id: 'brownsville', kind: 'PEER', name: 'Brownsville', minutes: 180, bearing: 185, slug: 'brownsville-tx', note: 'The Valley: a bigger combined scene down US 77.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the bayfront', route: 'downtown', note: 'Hotels and bars on the bay, old brick blocks behind them, and rents that keep squeezing the cheap rooms.' },
    { id: 'north-beach', name: 'North Beach', route: 'downtown', note: 'Beach bars and tourist motels across the channel; seasonal and storm-prone.' },
    { id: 'westside', name: 'the Westside and the old north side', route: 'work-side', note: 'Small frame houses with yards, carports and garages near the industrial corridor: the likeliest backyard shows.' },
    { id: 'midtown', name: 'Midtown and the Morgan Avenue corridor', route: 'old-side', note: 'Mid-century commercial strips with thrift shops, small bars and the best chance of a small DIY room.' },
    { id: 'southside', name: 'the Southside', route: 'campus', note: 'Chain strips, apartments and tract houses where most teenagers and community college students live.' },
    { id: 'flour-bluff', name: 'Flour Bluff', route: 'old-side', note: 'A peninsula past the base on the road to the island: surf shops, military families and small tract houses.' },
    { id: 'calallen', name: 'Calallen and Annaville', route: 'work-side', note: 'Semi-rural western edge along the river with big lots, sheds and shops where noise is tolerated.' },
    { id: 'robstown-hall', name: 'Robstown', route: 'town:robstown', note: 'A farm and rail town twenty minutes west, with lodge halls the local kids rent for themselves.' }
  ],

  rooms: [
    { id: 'westside-carport', kind: 'HOUSE', hood: 'westside', cap: 60, curfew: 1350, ac: false, outdoor: true, pressure: 55, start: true,
      note: 'A yard and a carport with a plug-in PA and a pit on the grass. There is a code of conduct on the fence, and the neighbors have your number.' },
    { id: 'calallen-shed', kind: 'HOUSE', hood: 'calallen', cap: 80, curfew: 1380, ac: false, outdoor: false, sketch: 30,
      note: 'A shed on a big lot far from the neighbors, so noise is tolerated. A long drive for kids without cars.' },
    { id: 'midtown-backyard', kind: 'HOUSE', hood: 'midtown', cap: 50, curfew: 1350, ac: false, outdoor: true,
      note: 'A label owner\'s backyard. Local bands, first-timers, a rough pit, and it lives or dies on the host\'s patience.' },
    { id: 'midtown-storefront', kind: 'DIY', hood: 'midtown', cap: 100, curfew: 1380, ac: false, pressure: 55,
      note: 'A shop space on a cheap strip, the likeliest small DIY room and always one lease renewal from gone.' },
    { id: 'post-hall', kind: 'HALL', hood: 'southside', cap: 150, curfew: 1320, ac: true,
      note: 'A rented post hall where a teenager books the night and the manager watches the clock.' },
    { id: 'southside-bar', kind: 'BAR', hood: 'southside', cap: 120, ages: ['A18'], curfew: 1470, ac: true,
      note: 'A neighborhood dive with a corner stage and a jukebox crowd that did not come for the band.' },
    { id: 'bay-patio', kind: 'BAR', hood: 'downtown', cap: 250, ages: ['A18'], curfew: 1500, ac: true, following: .3,
      note: 'A bar with a patio stage by the bay. Punk shares the calendar with country and Tejano, and a Saturday can be lost to a bigger booking.' },
    { id: 'brick-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['A18'], curfew: 1470, ac: true,
      note: 'An old brick rock room near the bay, the one that turns a local band into a touring opener. Tourist-district rent is the long threat.' },
    { id: 'bowl', kind: 'BIG', hood: 'downtown', cap: 1000, ages: ['ALL'], curfew: 1380,
      note: 'A bowl-shaped amphitheater where the touring metal and hardcore packages land. A local band gets on only as the opener.' },
    { id: 'bluff-lot', kind: 'OUTDOOR', hood: 'flour-bluff', cap: 200, curfew: 1320, outdoor: true,
      note: 'A lot or park pavilion past the base. Wind and heat decide it.' },
    { id: 'beach-bar', kind: 'CLUB', hood: 'north-beach', cap: 200, ages: ['A21'], curfew: 1500, ac: true, lowLying: true, pressure: 50,
      note: 'A beach bar with a stage. Summer tourists crowd it and the first storm closes it.' }
  ],

  contacts: ['laredo-tx', 'brownsville-tx', 'san-antonio', 'mcallen-tx'],

  calendar: [
    { id: 'bayfront-fest', label: 'the spring bayfront festival', tag: 'festival', month: 5, weeks: [1, 2], dows: [4, 5, 6], can: [.80, .78, .75], hoods: ['downtown'], elsewhere: [.97, .95, .95] },
    { id: 'rodeo', label: 'the rodeo week', tag: 'fair', month: 5, week: 2, dows: [1, 2, 3, 4, 5], can: [.90, .88, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'beach-parade', label: 'the beach carnival parade', tag: 'parade', month: 2, weeks: [1, 3], dows: [5, 6], can: [.90, .88, .88], hoods: ['north-beach'], elsewhere: [.97, .95, .95] },
    { id: 'street-fest', label: 'the autumn street festival', tag: 'festival', month: 11, week: 1, dows: [4, 5, 6], can: [.90, .88, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'lights-month', label: 'the holiday lights month', tag: 'holiday', month: 12, weeks: [1, 4], dows: [3, 4, 5, 6], can: [.92, .90, .90], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'football-oct', label: 'Friday night football', tag: 'game', month: 10, weeks: [1, 4], dows: [4], can: [.88, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1380, inForce: false } },

  points: [
    { name: 'San Antonio', state: 'TX', lat: 29.42, lon: -98.49, pop: 1500000 },
    { name: 'McAllen', state: 'TX', lat: 26.2, lon: -98.23, pop: 140000 },
    { name: 'Harlingen', state: 'TX', lat: 26.19, lon: -97.7, pop: 65000 },
    { name: 'Victoria', state: 'TX', lat: 28.8, lon: -97.0, pop: 65500 }
  ],
  roads: ['I-37', 'US 77', 'SH 358', 'SH 286', 'US 181', 'SH 35'],


  events: [
    { id: 'CORPUS_CHRISTI_TX_BAYFRONT_FEST', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The bayfront festival is on, with every Saturday downtown spoken for.',
      title: 'The festival has downtown',
      body: 'The festival has filled the bayfront with carnival rides and parking is gone. The club has cancelled your bill rather than lose the night to the crowds.',
      options: [
        { id: 'CARPORT', label: 'Move the show to a carport on the Westside', likely: 'Smaller and louder, away from the crowds.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A carport took the whole bill and the floor was packed.' },
        { id: 'EARLY', label: 'Start early and finish before the crowds', likely: 'A short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .92 }],
          result: 'Doors an hour early. The ones who came parked a mile away and walked.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'The casual crowd goes to the carnival.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The rides took the casual crowd. The regulars came.' }
      ] },

    { id: 'CORPUS_CHRISTI_TX_STORM_WATCH', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [6, 7, 8, 9, 10, 11] },
      telegraph: 'A tropical storm is in the gulf and the watch has been posted for the coast.',
      title: 'The storm watch goes up',
      body: 'A tropical storm watch has been posted the week of a booked show. The bay is rising and the road to the island has been closed to the public.',
      options: [
        { id: 'INLAND', label: 'Move it to a hall inland in Robstown', likely: 'Smaller and farther, but dry.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'A lodge hall inland took the bill. Dry, and a long drive for everyone.' },
        { id: 'MOVE', label: 'Call it off and move it a week', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it. The ones who could come, came.' },
        { id: 'SANDBAG', label: 'Run it and play on', likely: 'Costs forty dollars. The crowd stays home.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The storm stayed offshore. The room was half full and wet to the ankle.' }
      ] },

    { id: 'CORPUS_CHRISTI_TX_YARD_PIT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
      telegraph: 'There is a code of conduct posted on the fence, and the host is nervous.',
      title: 'The pit takes out a tooth',
      body: 'Someone lost a tooth in the pit at the last yard show, and the host is not sure about the next one. The whole scene is arguing about it.',
      options: [
        { id: 'RULES', label: 'Talk it through and put rules on the fence', likely: 'A slower, safer night.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }, { op: 'REGULARS', pct: .02 }],
          result: 'A sign on the fence and a few older kids watching the pit. It was a good night.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The host might not stay patient.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The pit was just as rough, and the host looked tired at the end of the night.' },
        { id: 'MOVE', label: 'Move it to a hall', likely: 'Calmer, and a different crowd.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }],
          result: 'The hall manager watched the clock and the pit stayed small.' }
      ] }
  ],

  words: {
    street: ['Padre Island Drive', 'Staples Street', 'Everhart Road', 'Morgan Avenue', 'Ocean Drive', 'Leopard Street', 'Agnes Street'],
    water: ['Corpus Christi Bay', 'the Laguna Madre', 'the Nueces', 'the ship channel'],
    hood: ['North Beach', 'Flour Bluff', 'Calallen', 'Annaville', 'Hillcrest', 'Six Points', 'Westside', 'Mustang Island'],
    thing: ['carport', 'breakfast taco', 'refinery flare', 'shrimp boat', 'pan dulce', 'barbacoa', 'raspa', 'backyard', 'empty lot', 'flyer box', 'legion hall'],
    weather: ['norther', 'storm surge', 'red tide']
  }
});
