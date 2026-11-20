SB.Cities.register('chicago', {
  v: 1,
  slug: 'chicago',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['lollapalooza', 'riot fest', 'uic', 'depaul', 'loyola', 'columbia college', 'art institute', 'university of chicago', 'northwestern', 'roosevelt university',
           'illinois tech', 'northeastern illinois', 'chicago state', 'wluw', 'wnur', 'chicago cubs', 'cubs', 'white sox', 'chicago bears', 'chicago bulls',
           'blackhawks', 'wrigley field', 'wrigleyville', 'wrigley', 'soldier field', 'united center', 'divvy', 'cta', 'metra', 'jewel-osco', 'old style', 'malort', 'malört',
           'rainbow cone', 'ghost ship', 'vfw', 'american legion', 'knights of columbus', 'chicago reader', 'public place of amusement',
           'greystone annex', 'viaduct social club', 'kostner lodge post 14', 'bohemian gymnastic hall', 'back forty alley garage', 'coach house eight', 'gangway basement',
           'our lady of perpetual amps', 'stockyard annex', 'nine mile strip lanes', 'humboldt boulevard social', 'lakefront laundromat stage', 'dibs chair tap',
           'pulaski industrial unit 3c', 'tamale cart backroom'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Game text says "the big lakefront festival", "the park festival", "the home team". */
  blocklist: ['lollapalooza*', 'riot fest*', 'wluw*', 'wnur*', 'old style*', 'chicago reader*', 'divvy*'],

  blurb: ['Chicago kids chase shows across a huge city, in basements and bar back rooms. A train line decides the crowd, and a licensed room is a different world from a house.',
          'The rooms live on paperwork, luck and tolerant neighbors. Most clubs are 21+, so under-21s lean on house shows.'],
  hard: 'Rooms are licensed or raided, and all-ages is the gamble.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Chicago' },
    { id: 'joliet', kind: 'FEEDER', name: 'Joliet', minutes: 50, bearing: 225, note: 'A big blue-collar suburb and county seat. Kids ride the train in; basically exurban Chicago.' },
    { id: 'aurora', kind: 'FEEDER', name: 'Aurora and Elgin', minutes: 50, bearing: 270, beyond: 'kennedy', note: 'Mid-size cities with big Latino populations and basements of their own.' },
    { id: 'waukegan', kind: 'FEEDER', name: 'Waukegan', minutes: 50, bearing: 5, note: 'A lakeshore industrial city on the north line, with its own basements.' },
    { id: 'kenosha', kind: 'FEEDER', name: 'Kenosha', state: 'WI', minutes: 60, bearing: 350, note: 'A former auto town on the lake. Suburbanites cross the state line.' },
    { id: 'kankakee', kind: 'FEEDER', name: 'Kankakee', minutes: 60, bearing: 185, note: 'A river town in a long industrial decline. A tiny scene, mostly basements.' },
    { id: 'michigan-city', kind: 'FEEDER', name: 'Michigan City', state: 'IN', minutes: 60, bearing: 115, beyond: 'skyway', note: 'A lakeshore town with a beach and a casino. Busy in summer.', season: { months: [6, 7, 8], mul: 1.3 } },
    { id: 'dekalb', kind: 'FEEDER', name: 'DeKalb', minutes: 75, bearing: 275, note: 'A university town in farmland. Its scene follows the semester.' },
    { id: 'valparaiso', kind: 'FEEDER', name: 'Valparaiso', state: 'IN', minutes: 75, bearing: 130, beyond: 'skyway', note: 'A small college and farm town. Students come up for a bigger bill.' },
    { id: 'ottawa', kind: 'FEEDER', name: 'Ottawa and La Salle-Peru', minutes: 90, bearing: 240, note: 'River and quarry towns. Kids drive an hour for a good show.' },
    { id: 'rockford', kind: 'PEER', name: 'Rockford', minutes: 90, bearing: 315, slug: 'rockford-il', note: 'A manufacturing city with its own punk and hardcore pride. A rival, not a satellite.' },
    { id: 'milwaukee', kind: 'PEER', name: 'Milwaukee', state: 'WI', minutes: 90, bearing: 355, scene: 4000, note: 'A big friendly rival to the north.' },
    { id: 'south-bend', kind: 'PEER', name: 'South Bend', state: 'IN', minutes: 105, bearing: 105, slug: 'south-bend-in', note: 'A college town with a long scene tradition. Kids make the trip.' },
    { id: 'champaign', kind: 'PEER', name: 'Champaign and Urbana', minutes: 135, bearing: 185, slug: 'champaign-il', note: 'A big state university and a fine scene. Many Chicago bands started here.' }
  ],

  chokepoints: [
    { id: 'skyway', name: 'the Skyway and the Dan Ryan', p: .02 },
    { id: 'kennedy', name: 'the Kennedy', p: .015 }
  ],

  hoods: [
    { id: 'logan', name: 'Logan Square', route: 'old-side', note: 'A boulevard neighborhood that once held the all-ages rooms. Priced out; what is left is bars and tolerated basements.' },
    { id: 'avondale', name: 'Avondale and Belmont Cragin', route: 'work-side', note: 'Brick bungalows, two-flats and rail-line industry. Basements and garages, still cheaper than Logan.' },
    { id: 'wicker', name: 'Wicker Park', route: 'downtown', note: 'The old art-and-rock district, now corporate. A few record shops and old bar rooms, and a lot of memory.' },
    { id: 'pilsen', name: 'Pilsen', route: 'old-side', note: 'Brick storefronts, murals and lofts along 18th Street. Basement shows of thirty people are normal, and displacement is the fight.' },
    { id: 'bridgeport', name: 'Bridgeport and Back of the Yards', route: 'work-side', note: 'Working-class blocks of old machine families, with warehouses along the rail and canal. Cheap and mostly ignored.' },
    { id: 'little-village', name: 'Little Village', route: 'work-side', note: 'Dense, family-oriented and Mexican American, with bilingual political punk in storefronts and basements.' },
    { id: 'humboldt', name: 'Humboldt Park', route: 'old-side', note: 'Greystones and park fieldhouses on the West Side, with artist-run spaces. Gentrification pushes in from the east.' },
    { id: 'rogers-park', name: 'Rogers Park and Uptown', route: 'campus', note: 'The far north lakefront at the end of the Red Line: students, immigrants, old ballrooms and basements.' },
    { id: 'lakeview', name: 'Lakeview', route: 'downtown', note: 'The first-wave punk strip, now expensive and a parking trap on game days.' },
    { id: 'hyde-park', name: 'Hyde Park and the South Side', route: 'campus', note: 'A university orbit and Black neighborhoods: art spaces, church halls and basements. A smaller scene, separate from the north side circuits.' }
  ],

  rooms: [
    { id: 'pilsen-basement', kind: 'HOUSE', hood: 'pilsen', cap: 40, hostCut: 0, pa: .3, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [70, 60, 45],
      pressure: 50, start: true, note: 'A garden-unit basement under a two-flat. One stairway and a low ceiling; the landlord lives upstairs.' },
    { id: 'avondale-garage', kind: 'HOUSE', hood: 'avondale', cap: 45, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 25, standing: [65, 55, 45],
      pressure: 50, note: 'An alley garage with the door up. Summer nights are great until one neighbor picks up the phone.' },
    { id: 'bridgeport-house', kind: 'HOUSE', hood: 'bridgeport', cap: 60, hostCut: 0, pa: .5, curfew: 1380, ac: false, outdoor: false, sketch: 15, standing: [75, 65, 45],
      pressure: 40, note: 'A house that has hosted shows for years, with rent about like Pilsen and a tolerant block.' },
    { id: 'humboldt-gangway', kind: 'OUTDOOR', hood: 'humboldt', cap: 60, rent: 0, pa: .4, curfew: 1320, sketch: 30, standing: [60, 55, 40],
      note: 'A narrow backyard reached through a gangway. The gangway is the load-in and the choke point.' },
    { id: 'logan-bar', kind: 'BAR', hood: 'logan', cap: 110, soundFee: 40, pa: .6, ages: ['ALL', 'A21'], matinee: true, curfew: 1560, ac: true, following: .3, sketch: 10,
      standing: [50, 65, 70], note: 'A neighborhood tavern with a back room and a small stage. All-ages early, twenty-one later.' },
    { id: 'lakeview-tavern', kind: 'BAR', hood: 'lakeview', cap: 130, soundFee: 60, pa: .7, ages: ['A21'], curfew: 1560, ac: true, following: .3, sketch: 10,
      standing: [45, 65, 70], note: 'An old bar room that went punk. Expensive, and nothing works on a game day.' },
    { id: 'polish-hall', kind: 'HALL', hood: 'avondale', cap: 160, rent: 200, deposit: 75, pa: .6, curfew: 1380, ac: true, sketch: 10, standing: [55, 60, 70],
      owner: 'HALL_MANAGER', note: 'A fraternal hall on the Northwest Side with a kitchen, folding chairs and a rental price.' },
    { id: 'post-hall', kind: 'HALL', hood: 'bridgeport', cap: 130, rent: 150, deposit: 50, pa: .5, curfew: 1380, ac: true, sketch: 10, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'A veterans\' post on the Southwest Side. A flat fee and a long list of rules.' },
    { id: 'parish-basement', kind: 'HALL', hood: 'little-village', cap: 90, rent: 70, deposit: 0, pa: .4, curfew: 1320, ac: false, sketch: 5, standing: [65, 60, 60],
      owner: 'CHURCH_CONTACT', pressure: 50, note: 'A church basement. No beer, and a funeral lunch can bump you with a day\'s notice.' },
    { id: 'fieldhouse', kind: 'HALL', hood: 'humboldt', cap: 100, rent: 80, deposit: 0, pa: .4, curfew: 1320, ac: true, sketch: 5, standing: [60, 60, 60],
      owner: 'HALL_MANAGER', note: 'A park district fieldhouse. Cheap, and strict about a price on the flyer.' },
    { id: 'storefront', kind: 'DIY', hood: 'little-village', cap: 80, rent: 60, deposit: 0, pa: .5, curfew: 1380, ac: false, sketch: 35, standing: [60, 60, 45], pressure: 55,
      needs: ['VOUCH'], note: 'A ground-floor storefront on 26th Street. Bilingual, political and loud.' },
    { id: 'warehouse', kind: 'DIY', hood: 'bridgeport', cap: 150, rent: 90, deposit: 0, pa: .6, curfew: 1440, ac: false, sketch: 50, standing: [55, 60, 45], pressure: 65,
      needs: ['VOUCH'], note: 'A rail-line warehouse. Powerful, illegal and the first to go when inspectors come around.' },
    { id: 'record-shop', kind: 'SHOP', hood: 'wicker', cap: 40, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'The record store on the old strip. In-stores in the afternoon, done by seven.' },
    { id: 'club', kind: 'CLUB', hood: 'logan', cap: 300, houseCosts: 150, split: .8, pa: .9, ages: ['A21', 'A18'], curfew: 1560, ac: true, following: .6, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The licensed room. It wants six weeks and a name.' }
  ],

  contacts: ['rockford-il', 'south-bend-in', 'champaign-il', 'madison-wi'],

  calendar: [
    { id: 'st-pats', label: 'St. Patrick\'s weekend', tag: 'holiday', month: 3, week: 3, dows: [4, 5], can: [.92, .88, .85], hoods: ['bridgeport', 'lakeview'], elsewhere: [1, 1, 1] },
    { id: 'pride', label: 'Pride weekend', tag: 'festival', month: 6, week: 4, dows: [5, 6], can: [.95, .92, .95], hoods: ['lakeview', 'rogers-park'], elsewhere: [1, 1, 1] },
    { id: 'lakefront-fest', label: 'the big lakefront festival', tag: 'festival', month: 8, week: 1, dows: [3, 4, 5, 6], can: [.80, .85, .95] },
    { id: 'park-fest', label: 'the park festival', tag: 'festival', month: 9, week: 3, dows: [4, 5, 6], can: [.80, .90, .95], hoods: ['humboldt', 'little-village'], elsewhere: [.92, .95, .97] },
    { id: 'marathon', label: 'marathon weekend', tag: 'race', month: 10, week: 2, dows: [5, 6], can: [.92, .90, .92], hoods: ['logan', 'lakeview', 'wicker'], elsewhere: [1, 1, 1] },
    { id: 'home-game-jun', label: 'a home game weekend', tag: 'game', month: 6, weeks: [1, 5], dows: [4, 5], can: [.90, .92, 1], hoods: ['lakeview', 'bridgeport'], elsewhere: [1, 1, 1] },
    { id: 'home-game-jul', label: 'a home game weekend', tag: 'game', month: 7, weeks: [1, 5], dows: [4, 5], can: [.90, .92, 1], hoods: ['lakeview', 'bridgeport'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1320, weekend: 1320, inForce: true }, quiet: 1320 },

  points: [
    { name: 'Milwaukee', state: 'WI', lat: 43.04, lon: -87.91, pop: 1570000 },
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16, pop: 2100000 },
    { name: 'Madison', state: 'WI', lat: 43.07, lon: -89.40, pop: 680000 },
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05, pop: 4300000 }
  ],
  roads: ['I-90', 'I-94', 'I-55', 'I-290', 'I-57', 'Lake Shore Drive'],

  words: {
    street: ['Western', 'Ashland', 'Pulaski', 'Kedzie', 'Cicero', 'Fullerton', 'Belmont', '18th Street', '26th Street', 'Blue Island'],
    water: ['the lake', 'the river', 'the canal'],
    hood: ['Logan Square', 'Pilsen', 'Bridgeport', 'Little Village', 'Humboldt Park', 'Rogers Park', 'Avondale', 'Hermosa', 'Back of the Yards', 'Uptown', 'Wicker Park'],
    thing: ['gangway', 'two-flat', 'greystone', 'bungalow', 'garden unit', 'dibs chair', 'Italian beef', 'jibarito', 'tallboy', 'viaduct', 'back room', 'donation jar', 'train platform', 'alley garage'],
    weather: ['lake effect', 'polar vortex', 'thunderstorm']
  },

  events: [
    { id: 'CHICAGO_SKYWAY_SNOW', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'A lake-effect band is forecast over the Skyway and the Dan Ryan.',
      title: 'The Skyway is shut',
      body: 'Lake-effect snow has closed the Skyway and backed up the Dan Ryan. The out-of-town band and everyone coming from Indiana are stuck on the wrong side.',
      options: [
        { id: 'EARLIER', label: 'Move doors an hour earlier', likely: 'Most who can make it do. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors an hour early. The ones who beat the snow came in with wet boots.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the closure.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The road stayed shut. The Indiana kids stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads took the back roads together. They will remember that.' }
      ] },

    { id: 'CHICAGO_TOW_BAN', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [12, 1, 2, 3] },
      telegraph: 'The overnight parking ban is on and the forecast says two inches.',
      title: 'The tow trucks are out',
      body: 'Snow is coming down and the street ban is in force. Every car left on the block after three in the morning gets hauled, and the band\'s van is one of them.',
      options: [
        { id: 'EARLY', label: 'End early so people can move their cars', likely: 'Everyone leaves in time. The night is short.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The show ended at midnight and every car was gone by two.' },
        { id: 'LOT', label: 'Pay a lot to hold the van and a few cars', likely: 'Costs forty dollars. The bands appreciate it.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'REGULARS', pct: .01 }],
          result: 'The lot kept the van safe. The band left a thank-you on the flyer.' },
        { id: 'GAMBLE', label: 'Tell everyone to take the L and leave the van', likely: 'Thinner crowd, and a risk to the van.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Half the room came by train. The van was still there in the morning.' }
      ] },

    { id: 'CHICAGO_HOME_GAME', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'game' },
      telegraph: 'There is a home game on the North Side this weekend.',
      title: 'A home game empties the block',
      body: 'A home game has closed every street within a mile and filled the trains. Nobody can park near the room and the people coming from the other side of town are stuck on a bus.',
      options: [
        { id: 'EARLY', label: 'Open early and tell everyone where to park', likely: 'Most get in before the crowds. Thinner than usual.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .92 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors an hour early. The ones who came parked a mile away and walked.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'A lot of people give up.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The streets stayed full. Half the list never found a place to leave the car.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'CHICAGO_VIADUCT_FLOOD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [6, 7, 8, 9] },
      telegraph: 'A line of thunderstorms is headed across the lake.',
      title: 'The viaduct floods',
      body: 'The storm dropped three inches in an hour. The viaduct on the way in is under water and the basement is taking it through the wall.',
      options: [
        { id: 'MOVE', label: 'Move it a day, once the water goes down', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' },
        { id: 'UP', label: 'Move it to a house upstairs', likely: 'Smaller and louder, with neighbors on every side.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A third-floor flat took the whole bill, and the floor was packed.' },
        { id: 'MOP', label: 'Mop and play on', likely: 'Costs forty dollars. The crowd stays home.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The water stayed on the floor. The room was half full and wet to the ankle.' }
      ] }
  ]
});
