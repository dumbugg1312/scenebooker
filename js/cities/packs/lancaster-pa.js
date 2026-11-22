SB.Cities.register('lancaster-pa', {
  v: 1,
  slug: 'lancaster-pa',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['franklin & marshall college', 'true blue weekend', 'lancaster bible college', 'lancaster mennonite school', 'elizabethtown fair', 'southern lancaster county fair', 'west lampeter community fair', 'manheim community fair', 'long\'s park', 'binns park', 'first fridays', 'celebrate lancaster', 'lancaster musicfest', 'buchanan park', 'bird-in-hand hot air balloon festival', 'whoopie pie festival', 'penn-mar irish festival', 'zenkaikon', 'lancaster craft beerfest', 'reservoir park', 'discover lancaster', 'visit lancaster city', 'lancasterpa.com', 'lancaster county magazine', 'county lines magazine', 'lancaster noise control board', 'plcb', 'pennsylvania state police', 'pennsylvania child labor act', 'franklin & marshall', 'franklin and marshall', 'f&m', 'millersville university', 'elizabethtown college', 'lancaster bible college', 'messiah university',
           'lebanon valley college', 'central market', 'first friday', 'lnp', 'lancasteronline', 'lancaster farming', 'red rose transit', 'amtrak', 'turkey hill', 'wilbur chocolate',
           'wawa', 'sheetz', 'pennsylvania farm show', 'ephrata fair', 'renaissance faire', 'pennsylvania renaissance faire', 'philadelphia eagles', 'carlisle barracks',
           'pennsylvania liquor control board', 'vfw', 'american legion', 'fire company',
           'the dutch cellar', 'chestnut hall', 'the lime kiln', 'marigold annex', 'the watch factory floor', 'pretzel row room', 'reservoir street hall', 'the cork loft',
           'quarry road barn', 'steeple basement', 'square dance hall', 'the back porch lot'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['franklin & marshall*', 'millersville university*', 'lancasteronline*', 'turkey hill*', 'wilbur chocolate*', 'wawa*', 'sheetz*'],

  blurb: ['Old brick rowhouses and farm-town church halls, a few cramped basements, and a scene that feeds the bigger cities down the road.',
          'Shows hide in halls and houses, a hall wants to read the lyrics first, and the best players tend to leave.'],
  hard: 'Few rooms, no interstate, and the good players drift to the big city.',
  region: 'the Mid-Atlantic',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Lancaster' },
    { id: 'strasburg', kind: 'FEEDER', name: 'Strasburg and Paradise', minutes: 20, bearing: 105, note: 'Plain-community farm country with little scene.' },
    { id: 'lititz', kind: 'FEEDER', name: 'Lititz', minutes: 20, bearing: 10, note: 'A tidy, affluent borough; its teens drive south for shows.' },
    { id: 'manheim', kind: 'FEEDER', name: 'Manheim', minutes: 25, bearing: 325, note: 'A small farm town northwest of the city.' },
    { id: 'mount-joy', kind: 'FEEDER', name: 'Mount Joy', minutes: 25, bearing: 295, note: 'A small suburb of the city on the way to the river.' },
    { id: 'columbia', kind: 'FEEDER', name: 'Columbia', minutes: 30, bearing: 250, note: 'A working-class river town with a bridge to York County.' },
    { id: 'ephrata', kind: 'FEEDER', name: 'Ephrata', minutes: 30, bearing: 40, note: 'A farm, church and light-industry borough with a teen scene.' },
    { id: 'elizabethtown', kind: 'FEEDER', name: 'Elizabethtown', minutes: 30, bearing: 315, note: 'A small college town with a scene of its own.' },
    { id: 'quarryville', kind: 'FEEDER', name: 'Quarryville and the southern end', minutes: 30, bearing: 170, note: 'Farm country; tiny.' },
    { id: 'lebanon', kind: 'FEEDER', name: 'Lebanon', minutes: 40, bearing: 5, note: 'A working-class small city with a few bands.' },
    { id: 'coatesville', kind: 'FEEDER', name: 'Coatesville and Downingtown', minutes: 45, bearing: 100, note: 'Steel-town and Chester County suburbs with real crossover to Philadelphia.' },
    { id: 'york', kind: 'PEER', name: 'York', minutes: 45, bearing: 235, slug: 'york-pa', note: 'The same size across the Susquehanna; a friendly rival that trades bands.' },
    { id: 'harrisburg', kind: 'PEER', name: 'Harrisburg', minutes: 45, bearing: 320, slug: 'harrisburg-pa', note: 'The state capital and the other regional hub.' },
    { id: 'reading', kind: 'PEER', name: 'Reading', minutes: 55, bearing: 60, slug: 'reading-pa', note: 'A rougher, cheaper rust-belt city that trades bands.' },
    { id: 'allentown', kind: 'PEER', name: 'Allentown', minutes: 85, bearing: 55, slug: 'allentown-pa', note: 'A bigger valley scene up the road.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Penn Square', route: 'downtown', note: 'A revived brick core of restaurants, galleries and convention hotels; priced out for DIY, with the odd vacant storefront.' },
    { id: 'southeast', name: 'southeast Lancaster', route: 'work-side', note: 'Tight rowhouse blocks and corner stores, heavily Latino and working class. Basements, living rooms and a community hall; the walls are shared.' },
    { id: 'northwest', name: 'Cabbage Hill and the northwest', route: 'old-side', note: 'Older working-class blocks and big houses split into flats. House shows and backyards.' },
    { id: 'college', name: 'the college blocks', route: 'campus', note: 'Student houses and faculty houses beside the college; the semester calendar rules everything.' },
    { id: 'musser', name: 'Musser Park and the northeast', route: 'old-side', note: 'Bigger brick houses on tree-lined streets, with high rents and neighbors who call the city. Not a place for shows.' },
    { id: 'mill-edge', name: 'the old factory edge', route: 'work-side', note: 'Big brick mills and warehouses, some converted to lofts, some vacant. One-night shows and practice units until the condos arrive.' },
    { id: 'suburbs', name: 'Manheim Township and the Route 30 strip', route: 'campus', note: 'Strip malls, big churches and split-levels with finished basements; the capacity champions for teenage shows.' },
    { id: 'millersville', name: 'Millersville', route: 'campus', note: 'A university borough a few miles southwest with student rentals and its own scene.' }
  ],

  rooms: [
    { id: 'southeast-rowhouse', kind: 'HOUSE', hood: 'southeast', cap: 40, curfew: 1320, start: true,
      note: 'A rowhouse living room or basement with a shared wall. The noise rule ends the night early.' },
    { id: 'hill-backyard', kind: 'HOUSE', hood: 'northwest', cap: 50, curfew: 1350,
      note: 'A backyard in summer and a cramped basement in winter. The landlord is the threat.' },
    { id: 'millersville-rental', kind: 'HOUSE', hood: 'millersville', cap: 60, ages: ['A18'], curfew: 1380,
      note: 'A student rental that follows the semester. Packed in term, silent over the breaks.' },
    { id: 'college-house', kind: 'HOUSE', hood: 'college', cap: 80, curfew: 1350,
      note: 'A campus house show is rare. The school\'s party rules decide if it happens twice.' },
    { id: 'mill-warehouse', kind: 'DIY', hood: 'mill-edge', cap: 100, curfew: 1350,
      note: 'A loaned warehouse that lasts a month or two. Then a developer or an inspector shows up.' },
    { id: 'church-hall', kind: 'HALL', hood: 'downtown', cap: 150, curfew: 1320,
      note: 'A downtown church space, welcoming to everyone. It wants a say in the bill and a hard stop.' },
    { id: 'strip-fire-hall', kind: 'HALL', hood: 'suburbs', cap: 150, curfew: 1320,
      note: 'A fire hall out on the strip. Plenty of parking and plenty of chaperones.' },
    { id: 'record-shop', kind: 'SHOP', hood: 'downtown', cap: 60, curfew: 1290,
      note: 'A record shop that clears the floor after hours. Early, short, and over by nine-thirty.' },
    { id: 'square-bar', kind: 'BAR', hood: 'downtown', cap: 200, ages: ['A21'], curfew: 1500,
      note: 'A bar with a stage that opens its door to minors some nights. The liquor rules shape the door.' },
    { id: 'square-club', kind: 'CLUB', hood: 'downtown', cap: 350, ages: ['A18'], curfew: 1440,
      note: 'A club that books touring indie first and punk now and then. It lost its old building and is still finding a new one.' },
    { id: 'route-theater', kind: 'BIG', hood: 'suburbs', cap: 1000, ages: ['ALL'], curfew: 1380,
      note: 'A theater or arena date out on the strip. It rarely books punk, and the booker only buys a ticket.' },
    { id: 'square-park', kind: 'OUTDOOR', hood: 'downtown', cap: 300, curfew: 1260,
      note: 'A small downtown park stage with a permit and a sound limit. Free shows one night a month crowd it.' }
  ],

  contacts: ['york-pa', 'harrisburg-pa', 'reading-pa', 'state-college-pa'],

  calendar: [
    { id: 'monthly-night-jun', label: 'the monthly downtown night', tag: 'festival', month: 6, week: 1, dows: [4], can: [0.88, 0.85, 0.88], hoods: ['downtown'], elsewhere: [0.97, 0.95, 0.97] },
    { id: 'monthly-night-aug', label: 'the monthly downtown night', tag: 'festival', month: 8, week: 1, dows: [4], can: [0.88, 0.85, 0.88], hoods: ['downtown'], elsewhere: [0.97, 0.95, 0.97] },
    { id: 'art-fest', label: 'the art festival weekend', tag: 'festival', month: 9, week: 1, dows: [5, 6, 0], can: [0.92, 0.9, 0.9], hoods: ['downtown'], elsewhere: [1, 0.97, 0.97] },
    { id: 'borough-fairs', label: 'the borough fairs', tag: 'fair', month: 9, weeks: [2, 3], dows: [3, 4, 5], can: [0.9, 0.88, 0.9] },
    { id: 'homecoming', label: 'homecoming weekend', tag: 'game', month: 10, weeks: [3, 4], dows: [5], can: [0.9, 0.9, 0.92], hoods: ['college','millersville'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [0.85, 0.95, 0.95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [0.85, 0.95, 0.95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.1] }
  ],

  rules: { curfewMinors: { weeknight: 1320, weekend: 1440, inForce: false } },

  points: [
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17, pop: 6200000 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61, pop: 2800000 },
    { name: 'West Chester', state: 'PA', lat: 39.96, lon: -75.6, pop: 20000 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80.0, pop: 2300000 }
  ],
  roads: ['US 30', 'US 222', 'PA 283', 'PA 501', 'the Turnpike'],

  words: {
    street: ['Lincoln Highway', 'Orange Street', 'Chestnut Street', 'Prince Street', 'Duke Street', 'Queen Street'],
    water: ['the Susquehanna', 'the Conestoga', 'Lancaster Creek'],
    hood: ['Cabbage Hill', 'Musser Park', 'Manheim Township', 'Millersville', 'East Lampeter', 'Southeast Lancaster'],
    thing: ['soft pretzel', 'shoofly pie', 'whoopie pie', 'scrapple', 'chow-chow', 'buggy', 'finished basement', 'fire hall', 'backyard', 'loaned storefront'],
    weather: ['humid thunderstorm', 'grey winter', 'snow squall']
  },

  events: [
    { id: 'LANCASTER_PA_MONTHLY_NIGHT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival', months: [5, 6, 7, 8, 9, 10] },
      telegraph: 'The free park concert is on Friday and the streets around the square will be shut.',
      title: 'The free band is down the street',
      body: 'A free concert in the downtown park has the sidewalks full and the street closed, and the kids who would have come to the hall are standing in front of a free band.',
      options: [
        { id: 'LATE', label: 'Push doors back until the park empties out', likely: 'The crowd that wants more shows up late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. The park crowd drifted over and filled the hall.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd stays at the park.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The free band had the square. The ones who came were the committed.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'LANCASTER_PA_FAIR_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The fair is on in the farm towns, with a parade and a midway on Friday night.',
      title: 'The farm-town fair takes the kids',
      body: 'A week of borough fairs has the farm-town teenagers on a midway and a parade route. Your show draws the three who skipped it.',
      options: [
        { id: 'SMALL', label: 'Run it small and call it a house night', likely: 'The ones who came get a good night.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'A thin room and a tight bill. The three who skipped the fair were glad.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The farm-town kids are at the parade.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The midway kept the farm towns busy. The room was half full.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'LANCASTER_PA_NOISE_VARIANCE', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 4], months: [5, 6, 7, 8, 9] },
      telegraph: 'The city says a backyard show can ask for a one-night noise variance, but only before nine.',
      title: 'The nine o\'clock rule',
      body: 'The noise board grants a one-night variance for a backyard show, but only if you ask before the nine o\'clock rule hits. Skip it and a neighbor will call the police line.',
      options: [
        { id: 'ASK', label: 'Ask for the variance and pay the fee', likely: 'Costs twenty-five dollars. The night runs late.',
          effects: [{ op: 'MONEY', amount: -25 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.1 }],
          result: 'Paperwork on the porch. The band played past nine and nobody called.' },
        { id: 'SKIP', label: 'Skip the paperwork and keep it quiet', likely: 'Fewer people, less noise, no trouble.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'You kept the amps low. The yard was half full and nobody complained.' },
        { id: 'MOVE', label: 'Move the show to a hall', likely: 'Smaller and with chaperones.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A church hall took the bill. The chaperones watched the door.' }
      ] }
  ]
});
