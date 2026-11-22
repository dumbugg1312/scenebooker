SB.Cities.register('amarillo-tx', {
  v: 1,
  slug: 'amarillo-tx',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['pantex', 'bnsf', 'amarillo college', 'texas tech', 'west texas a&m', 'wtamu', 'buffalos', 'sod poodles', 'texas route 66 festival', 'route 66 festival',
           'cattle drive and parade', 'tri-state fair', 'tri-state fair and rodeo', 'hoodoo mural festival', 'international film festival', 'world championship ranch rodeo',
           'cannon air force base', 'houston chronicle', 'anarchy in amarillo', 'whataburger', 'braum\'s', 'braums', 'dairy queen', 'sonic', 'rosa\'s', 'shiner', 'lone star',
           'dr pepper', 'big red', 'topo chico', 'vfw', 'american legion', 'tecate', 'dos equis',
           'the shelterbelt', 'shelterbelt', 'caliche hall', 'the playa room', 'playa room', 'the section line', 'the cattle guard', 'the helium room', 'feedyard annex',
           'hail damage', 'slab on grade', 'the sod house', 'mesquite lot', 'plains fraternal hall',
           'route 66 historic district', 'texas route 66 festival', 'route 66 centennial', 'coors ranch rodeo', 'coors cowboy club', 'tri-state fairgrounds', 'hppr',
           'high plains public radio', 'amarillo globe-news', 'globe-news', 'amarillo police department', 'amarillo civic center', 'sam houston park', 'hodgetown',
           'songkick', 'bandsintown', 'eventbrite', 'visit amarillo', '987 the bomb', 'kiss fm', 'texas music office', 'tabc'],
  /* Banned holds the dossier's real institutions and its invented venue names (unchecked). Storms and events are written generically. */
  blocklist: ['whataburger*', 'braum*', 'sod poodles*', 'tri-state fair*', 'shelterbelt*', 'caliche hall*'],

  blurb: ['Big sky, few rooms. This flat Panhandle city keeps rising and nearly vanishing, and the scene lives in record stores, backyards and carports.',
          'Cover bands get the paid slots, so originals play early, for free, to whoever drove in. The wind decides the outdoor ones.'],
  hard: 'Few rooms, long drives, and bars that only want cover bands.',
  region: 'the High Plains',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.8 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 },
    { name: 'Oklahoma City', state: 'OK', lat: 35.47, lon: -97.52 },
    { name: 'Albuquerque', state: 'NM', lat: 35.08, lon: -106.65 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Amarillo' },
    { id: 'canyon', kind: 'FEEDER', name: 'Canyon', minutes: 20, bearing: 190, note: 'A university town with a tiny college scene of its own.', bands: 1, scene: 60,
      rooms: [
          { id: 'canyon-yard', kind: 'OUTDOOR', hood: 'canyon-town', zone: 'canyon', cap: 300, curfew: 1350, rent: 25, ages: ['ALL'],
        note: 'A concert yard south of the city that opened last year. It is outside the limits and drawing shows away.' }
      ] },
    { id: 'hereford', kind: 'FEEDER', name: 'Hereford', minutes: 50, bearing: 220, note: 'Cattle and feedlot town with a small garage scene.' },
    { id: 'pampa', kind: 'FEEDER', name: 'Pampa', minutes: 55, bearing: 85, note: 'Oil and ranch town; small garage and metal kids.' },
    { id: 'dumas', kind: 'FEEDER', name: 'Dumas', minutes: 50, bearing: 340, note: 'A meatpacking and farm town; its scene is unknown.' },
    { id: 'borger', kind: 'FEEDER', name: 'Borger', minutes: 55, bearing: 25, note: 'A refinery town with a grim reputation and a few garage bands.' },
    { id: 'tulia', kind: 'FEEDER', name: 'Tulia', minutes: 45, bearing: 185, note: 'A farm town with no scene; kids drive up.' },
    { id: 'dalhart', kind: 'FEEDER', name: 'Dalhart', minutes: 75, bearing: 330, note: 'A ranch town; the occasional kid makes the drive.' },
    { id: 'clovis', kind: 'PEER', name: 'Clovis', state: 'NM', minutes: 105, bearing: 255, scene: 300, note: 'A base and railroad town with its own small punk and metal crowd; real two-way trade.' },
    { id: 'lubbock', kind: 'PEER', name: 'Lubbock', minutes: 120, bearing: 185, slug: 'lubbock-tx', note: 'The big student scene two hours south on the interstate.' },
    { id: 'wichita-falls', kind: 'PEER', name: 'Wichita Falls', minutes: 175, bearing: 120, scene: 400, note: 'A far peer at the end of the southeast highway.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'A small grid of bars and event rooms around the ballpark; rents are climbing and the noise complaints with them.' },
    { id: 'san-jacinto', name: 'San Jacinto and Sixth Avenue', route: 'old-side', note: 'Old highway storefronts, antique shops and modest historic houses; the likeliest place for a short-lived storefront room.' },
    { id: 'the-barrio', name: 'the Barrio', route: 'work-side', note: 'Old family neighborhood by the railroad; shows mean a garage or a hall, not a bar.' },
    { id: 'plemons-eakle', name: 'Plemons-Eakle and Sunset Terrace', route: 'old-side', note: 'Craftsman bungalows full of young renters; the likeliest punk house blocks.' },
    { id: 'north-heights', name: 'North Heights', route: 'work-side', note: 'Cheap, church-centered, with a lot of vacant lots and community halls.' },
    { id: 'amarillo-boulevard', name: 'Amarillo Boulevard', route: 'work-side', note: 'Old motel row and strip buildings; the cheapest commercial rent, with police attention the risk.' },
    { id: 'southwest', name: 'the southwest side', route: 'campus', note: 'New subdivisions and chain strips where band kids live and go to school; garages and practice bays.' },
    { id: 'wolflin', name: 'Wolflin and Bivins', route: 'campus', note: 'Old-money brick streets; parents\' houses, not show houses.' },
    { id: 'canyon-town', name: 'Canyon', route: 'town:canyon', note: 'The college town south of the city. A new concert yard there is pulling shows out of Amarillo.' }
  ],

  rooms: [
    { id: 'bungalow', kind: 'HOUSE', hood: 'plemons-eakle', cap: 40, curfew: 1320, ac: false, pressure: 45, start: true,
      note: 'A living room or back porch in an old bungalow. No basements out here, so the wind carries it and the neighbors hear.' },
    { id: 'carport', kind: 'HOUSE', hood: 'southwest', cap: 60, curfew: 1350, ac: false, outdoor: true, pressure: 40,
      note: 'A carport with the door up and cars along the curb. It depends on the parents being gone and the wind laying down.' },
    { id: 'record-shop', kind: 'SHOP', hood: 'san-jacinto', cap: 50, curfew: 1290, ac: true, rent: 0, following: .2,
      note: 'A record store on the old highway strip with a back corner for small shows. The door goes to the bands and the cleanup costs him.' },
    { id: 'strip-bar', kind: 'BAR', hood: 'san-jacinto', cap: 200, curfew: 1500, ac: true, soundFee: 60, following: .3,
      note: 'A cafe-and-cantina room on the strip that takes touring acts for a cover. The rent on this block keeps climbing.' },
    { id: 'music-hall', kind: 'CLUB', hood: 'downtown', cap: 300, curfew: 1470, ac: true, ages: ['A18'], following: .5,
      note: 'A hall-style room near the ballpark that books heavy and Latin bills. Nobody has said for sure who gets in.' },
    { id: 'cellar-room', kind: 'CLUB', hood: 'downtown', cap: 250, curfew: 1470, ac: true, ages: ['A18'], pressure: 55,
      note: 'A room below street level that has hosted the metal bills. Loud-sound complaints and downtown rent are what end it.' },
    { id: 'north-hall', kind: 'HALL', hood: 'north-heights', cap: 120, curfew: 1320, ac: false, rent: 100, deposit: 50, owner: 'CHURCH_CONTACT',
      note: 'A church hall rented under a vague description of the music. Someone from the congregation always turns up.' },
    { id: 'strip-room', kind: 'DIY', hood: 'amarillo-boulevard', cap: 100, curfew: 1380, ac: false, sketch: 50, pressure: 60, needs: ['VOUCH'],
      note: 'A strip-building room with a PA on the floor and no stage. It is cheap, and the police are the risk.' },
    { id: 'plains-yard', kind: 'OUTDOOR', hood: 'southwest', cap: 100, curfew: 1260, rent: 10,
      note: 'A backyard or a bare lot. The wind and the dust decide whether anyone stays.' },
    { id: 'big-hall', kind: 'BIG', hood: 'downtown', cap: 1000, curfew: 1380, ac: true, ages: ['ALL'],
      note: 'A civic-scale hall and a park stage for touring rock. Locals rarely get on them.' }
  ],

  contacts: ['lubbock-tx', 'santa-fe-nm', 'wichita-ks', 'oklahoma-city', 'albuquerque-nm'],

  calendar: [
    { id: 'highway-fest', label: 'the old-highway festival', tag: 'festival', month: 6, weeks: [1, 2], dows: [3, 4, 5], can: [.85, .80, .80], hoods: ['san-jacinto', 'downtown'], elsewhere: [1, .95, .95] },
    { id: 'cattle-parade', label: 'the downtown parade', tag: 'parade', month: 6, week: 1, dows: [5], can: [.85, .85, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'fair-rodeo', label: 'the fair and rodeo', tag: 'fair', month: 9, weeks: [3, 4], dows: [4, 5, 6], can: [.85, .88, .88] },
    { id: 'baseball', label: 'a ballpark home stand', tag: 'game', month: 7, weeks: [1, 3], dows: [4, 5], can: [.92, .95, .95], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] },
    { id: 'christmas-week', label: 'Christmas week', tag: 'holiday', month: 12, week: 4, dows: [3, 4, 5, 6], can: [.70, .70, .70] }
  ],

  rules: { curfewMinors: { weeknight: 1440, weekend: 1440, inForce: true } },

  points: [
    { name: 'Oklahoma City', state: 'OK', lat: 35.47, lon: -97.52, pop: 700000 },
    { name: 'Albuquerque', state: 'NM', lat: 35.08, lon: -106.65, pop: 560000 },
    { name: 'Tucumcari', state: 'NM', lat: 35.17, lon: -103.72, pop: 4800 },
    { name: 'Wichita Falls', state: 'TX', lat: 33.91, lon: -98.49, pop: 104000 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99, pop: 715000 }
  ],
  roads: ['I-40', 'I-27', 'US 287', 'US 60', 'US 87', 'Loop 335'],

  words: {
    street: ['Amarillo Boulevard', 'Sixth Avenue', 'Washington Street', 'Western Street', 'Soncy Road', 'Georgia Street', 'Coulter Street'],
    water: ['Palo Duro Canyon', 'Lake Meredith', 'the Canadian River', 'Playa Lake'],
    hood: ['San Jacinto', 'the Barrio', 'Plemons-Eakle', 'Sunset Terrace', 'North Heights', 'Wolflin', 'Bivins', 'Soncy'],
    thing: ['carport', 'caliche', 'feedlot', 'grain elevator', 'tumbleweed', 'cow skull', 'water tower', 'breakfast burrito', 'record store', 'floor PA', 'backyard'],
    weather: ['wind advisory', 'hail', 'dust storm', 'blizzard']
  },

  events: [
    { id: 'AMARILLO_TX_DUST_WIND', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [3, 4, 5, 10, 11] },
      telegraph: 'A south wind is forecast, strong and steady, with dust in it.',
      title: 'The wind brings the feedlots',
      body: 'A hard south wind is dragging dust and feedlot smell across the southwest side. The backyard PA is on the ground and the crowd keeps squinting.',
      options: [
        { id: 'TARP', label: 'Tarp the PA and run it in the carport', likely: 'Smaller and louder, with a tarp snapping the whole night.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .7 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The PA sat under a tarp and the whole bill got through. Everyone went home grey.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The wind quit, and so did half the people who had planned to come.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'People stay in their cars.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'The ones who came wore bandannas. The rest watched the dust from their driveways.' }
      ] },

    { id: 'AMARILLO_TX_HIGHWAY_FEST', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'festival' },
      telegraph: 'The old-highway festival is this weekend, and the classic cars are already coming in on the interstate.',
      title: 'Classic cars on the strip',
      body: 'The old highway strip is wall to wall with polished cars and sightseers, and the record store has a show booked. There is nowhere to load in.',
      options: [
        { id: 'EARLY', label: 'Load in at dawn and open early', likely: 'A short night, but you get the gear in.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The gear was in before the first car pulled up. Doors went an hour early to the tourists wandering by.' },
        { id: 'ACCEPT', label: 'Run it and carry the gear a block', likely: 'Slow load-in. The strip crowd drifts in.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'HOURS', d: -1, when: 'TODAY' }],
          result: 'A block of carrying under the sun. The tourists wandered in for a song or two.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'AMARILLO_TX_FAIR_PARADE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The fair parade closes downtown on Saturday, and every kid in town is at the fairgrounds.',
      title: 'The fair has the kids',
      body: 'Downtown is shut for the parade and the kids are at the fairgrounds until dark. The club bill has nobody in the room before eleven.',
      options: [
        { id: 'LATE', label: 'Push doors back until the fair lets out', likely: 'The crowd that wants a night out shows up. Later than planned.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour and a half late. They came in sunburned and loud.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The kids are at the rodeo.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The first bands played to the bar staff. The room filled after eleven.' }
      ] }
  ]
});
