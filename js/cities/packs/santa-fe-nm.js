SB.Cities.register('santa-fe-nm', {
  v: 1,
  slug: 'santa-fe-nm',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['the city different', 'zozobra', 'old man gloom', 'fiestas de santa fe', 'fiestas', 'indian market', 'spanish market', 'spanish colonial market',
           'international folk art market', 'folk art market', 'chamber music festival', 'desert chorale', 'santa fe opera', 'farolito walk',
           'rail runner', 'amtrak', 'southwest chief', 'santa fe trails', 'ksfr', 'santa fe new mexican', 'new mexican', 'pasatiempo', 'santa fe reporter',
           'new mexico magazine', 'green fire times', 'st. john\'s college', 'institute of american indian arts', 'iaia', 'santa fe community college',
           'college of santa fe', 'santa fe university of art and design', 'unm', 'university of new mexico', 'highlands university', 'kirtland air force base',
           'kirtland', 'santa fe high', 'capital high', 'indian school', 'st. michael\'s high', 'franklin miles park', 'fort marcy park', 'meow wolf',
           'los alamos national laboratory',
           'the dry river room', 'dry river room', 'spur line hall', 'second street cold storage', 'the tin roof annex', 'tin roof annex', 'casita nueve',
           'the pinon smoke', 'the piñon smoke', 'ristra house', 'rufina yard', 'the old acequia grange', 'old acequia grange', 'cottonwood post 112',
           'the adobe bell', 'adobe bell', 'siler bay 4', 'vfw', 'american legion', 'swaia', 'atrisco heritage foundation'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['zozobra*', 'meow wolf*', 'santa fe opera*', 'rail runner*', 'ksfr*', 'santa fe reporter*', 'indian market*', 'cottonwood post*'],

  blurb: ['Shows happen in yards, dirt lots, warehouse bays and bar back rooms under a huge sky, a few dozen friends at a time.',
          'Touring bands skip town for the bigger city an hour south, so locals fill every bill.'],
  hard: 'Touring bands skip you for the bigger town an hour south.',
  region: 'the high desert',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Albuquerque', state: 'NM', lat: 35.08, lon: -106.65 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Phoenix', state: 'AZ', lat: 33.45, lon: -112.07 },
    { name: 'El Paso', state: 'TX', lat: 31.76, lon: -106.49 },
    { name: 'Tucson', state: 'AZ', lat: 32.22, lon: -110.97 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Santa Fe' },
    { id: 'pojoaque', kind: 'FEEDER', name: 'Pojoaque, Nambé, Tesuque and Chimayó', minutes: 25, bearing: 355, note: 'Pueblo and village communities just north; the Good Friday pilgrimage fills the road.' },
    { id: 'espanola', kind: 'FEEDER', name: 'Española', minutes: 25, bearing: 340, note: 'The first town a local names: lowrider country, proud and poor, with a metal and Chicano punk thread.' },
    { id: 'lamy', kind: 'FEEDER', name: 'Lamy and Galisteo', minutes: 25, bearing: 170, note: 'Tiny rural villages to the south. Few kids, and every one of them drives.' },
    { id: 'madrid', kind: 'FEEDER', name: 'Madrid and Cerrillos', minutes: 35, bearing: 215, note: 'Old coal towns on the Turquoise Trail, now art villages with a rural weirdo crowd.' },
    { id: 'pecos', kind: 'FEEDER', name: 'Pecos', minutes: 35, bearing: 95, note: 'A small village up the river past Glorieta Pass; kids come in for shows.' },
    { id: 'edgewood', kind: 'FEEDER', name: 'Edgewood and Moriarty', minutes: 45, bearing: 200, note: 'Ranch-country commuter towns south on the interstate.' },
    { id: 'los-alamos', kind: 'FEEDER', name: 'Los Alamos', minutes: 50, bearing: 320, note: 'The lab town "up the Hill": well-off, nerdy, with a rock and metal crowd and a rivalry with Santa Fe.' },
    { id: 'bernalillo', kind: 'FEEDER', name: 'Bernalillo', minutes: 50, bearing: 215, note: 'An old river town at the edge of the big city\'s northern suburbs.' },
    { id: 'las-vegas', kind: 'FEEDER', name: 'Las Vegas', state: 'NM', minutes: 60, bearing: 60, note: 'A railroad and college town on the interstate with a small scene of its own.' },
    { id: 'rio-rancho', kind: 'PEER', name: 'Rio Rancho', minutes: 60, bearing: 220, scene: 300, note: 'A huge mesa suburb whose kids mostly go to the big city.' },
    { id: 'taos', kind: 'PEER', name: 'Taos', minutes: 90, bearing: 15, scene: 80, note: 'A small art-colony town north through the canyon, folk-heavy and punk-leaning.' }
  ],

  hoods: [
    { id: 'southside', name: 'the Southside', route: 'work-side', note: 'Big boxes, motels, strip malls and trailer parks along Cerrillos Road. Working-class, cheap by local standards, and tolerated.' },
    { id: 'railyard', name: 'the Railyard', route: 'downtown', note: 'A former rail yard turned arts district. Where all-ages music used to live; now priced out and polished.' },
    { id: 'siler', name: 'Siler and Rufina', route: 'work-side', note: 'Warehouses, auto shops and taprooms southwest of the Railyard. Practice bays and warehouse shows, heating up fast.' },
    { id: 'midtown', name: 'Midtown', route: 'campus', note: 'Empty campus buildings, shabby apartments and rental houses around the closed arts college. In limbo.' },
    { id: 'agua-fria', name: 'Agua Fria', route: 'old-side', note: 'An old farming village with big walled lots, ditches and family compounds. Hands-off, and the best bet for a yard show.' },
    { id: 'casa-solana', name: 'Casa Solana', route: 'old-side', note: 'Quiet postwar ranch houses on the northwest side. Garage shows in a good year, then the neighbors call.' },
    { id: 'plaza', name: 'the Plaza and Canyon Road', route: 'downtown', note: 'The historic core and the wealthy east side. Nothing here is cheap, and a review board polices everything.' },
    { id: 'eldorado', name: 'Eldorado and Rancho Viejo', route: 'work-side', note: 'Retiree subdivisions on the county fringe. Mostly huge lots and somebody\'s parents\' garage.' }
  ],

  rooms: [
    { id: 'midtown-garage', kind: 'HOUSE', hood: 'midtown', cap: 40, curfew: 1320, ac: false, sketch: 25, standing: [65, 60, 45], pressure: 50, start: true,
      note: 'A rented student house with a garage stage, kept alive by a handshake with the neighbors. The tenants turn over and so does the room.' },
    { id: 'solana-carport', kind: 'HOUSE', hood: 'casa-solana', cap: 40, curfew: 1320, ac: false, sketch: 20, standing: [65, 60, 50], pressure: 55,
      note: 'A carport on a quiet ranch-house street. Fine until the first neighbor call.' },
    { id: 'walled-yard', kind: 'HOUSE', hood: 'agua-fria', cap: 80, curfew: 1380, ac: false, outdoor: true, sketch: 30, standing: [60, 60, 45], pressure: 40,
      note: 'A yard behind adobe walls on a family lot. Nobody minds until somebody\'s cousin does.' },
    { id: 'county-garage', kind: 'HOUSE', hood: 'eldorado', cap: 60, curfew: 1320, ac: false, sketch: 20, standing: [65, 60, 50], pressure: 40,
      note: 'Somebody\'s parents\' garage on a big lot at the county edge. Every kid needs a ride.' },
    { id: 'siler-bay', kind: 'DIY', hood: 'siler', cap: 150, rent: 80, curfew: 1380, ac: false, sketch: 45, standing: [55, 60, 45], pressure: 55, needs: ['VOUCH'],
      note: 'A warehouse bay by the practice rooms. The landlords are selling and the taprooms are moving in.' },
    { id: 'railyard-collective', kind: 'DIY', hood: 'railyard', cap: 120, rent: 90, curfew: 1350, ac: true, sketch: 30, standing: [55, 60, 55], pressure: 50,
      note: 'A collective-run room in a warehouse for indie and lesser-known acts. The polished district around it prices everything up.' },
    { id: 'arts-hall', kind: 'HALL', hood: 'southside', cap: 120, rent: 150, deposit: 50, curfew: 1320, ac: true, sketch: 10, standing: [60, 60, 65], owner: 'HALL_MANAGER',
      note: 'A rented hall for daytime and early shows. The money comes and goes, and so does the lease.' },
    { id: 'strip-bar', kind: 'BAR', hood: 'southside', cap: 150, ages: ['A21'], curfew: 1500, ac: true, soundFee: 50, following: .3, sketch: 15, standing: [50, 65, 70],
      note: 'A bar with a back-room stage on the motel strip. An early all-ages show only works if the bar keeps minors out of the bar.' },
    { id: 'railyard-club', kind: 'CLUB', hood: 'railyard', cap: 250, ages: ['A21'], curfew: 1470, ac: true, following: .5, sketch: 15, standing: [45, 70, 70],
      owner: 'TALENT_BUYER', needs: ['FULL_BILL'],
      note: 'The long-running club that books touring acts and local bills. Everybody has played it once, and it remembers.' }
  ],

  contacts: ['albuquerque-nm', 'amarillo-tx', 'colorado-springs-co', 'el-paso-tx'],

  calendar: [
    { id: 'legislature', label: 'the legislative session', tag: 'holiday', month: 2, weeks: [1, 3], dows: [1, 2, 3], can: [.85, .90, .90], hoods: ['plaza', 'railyard'], elsewhere: [1, 1, 1] },
    { id: 'summer-arts-market', label: 'the summer arts market weekend', tag: 'fair', month: 7, week: 4, dows: [5, 6], can: [.88, .85, .85], hoods: ['plaza', 'railyard'], elsewhere: [.97, .95, .95] },
    { id: 'august-arts-market', label: 'the August arts market weekend', tag: 'fair', month: 8, week: 3, dows: [5, 6], can: [.88, .85, .85], hoods: ['plaza', 'railyard'], elsewhere: [.95, .93, .93] },
    { id: 'effigy-night', label: 'the burning-effigy Friday', tag: 'festival', month: 9, week: 1, dows: [4], can: [.80, .85, .90] },
    { id: 'town-festival', label: 'the late-summer town festival weekend', tag: 'festival', month: 9, week: 2, dows: [4, 5, 6], can: [.90, .90, .92], hoods: ['plaza', 'railyard'], elsewhere: [.97, .95, .95] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [3, 4], dows: [4], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 3], dows: [4], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1260 },

  points: [
    { name: 'Albuquerque', state: 'NM', lat: 35.08, lon: -106.65, pop: 560000 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99, pop: 715000 },
    { name: 'Raton', state: 'NM', lat: 36.9, lon: -104.44, pop: 6000 },
    { name: 'Las Cruces', state: 'NM', lat: 32.31, lon: -106.78, pop: 112000 }
  ],
  roads: ['I-25', 'US 84', 'US 285', 'St. Francis Drive', 'Cerrillos Road', 'NM 14'],

  words: {
    street: ['St. Francis Drive', 'Cerrillos Road', 'Agua Fria Street', 'Airport Road', 'Rodeo Road', 'Paseo de Peralta'],
    water: ['the Santa Fe River', 'the Rio Grande', 'the Pecos River'],
    hood: ['the Railyard', 'Casa Solana', 'Agua Fria', 'Siler', 'Midtown', 'the Southside', 'Eldorado', 'Rancho Viejo'],
    thing: ['arroyo', 'adobe wall', 'green chile', 'breakfast burrito', 'casita', 'lowrider', 'swamp cooler', 'generator', 'dirt lot', 'sopaipilla', 'guest house', 'carport', 'altitude', 'snowy pass'],
    weather: ['monsoon', 'afternoon lightning', 'fire ban', 'dust storm']
  },

  events: [
    { id: 'SANTA_FE_NM_EFFIGY_FRIDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'Barricades are going up near the park, and everyone you know has a plan for Friday that is not yours.',
      title: 'The road to the park is closed',
      body: 'The big burning night has shut the streets around downtown and drawn half the Southside to the park. The warehouse show has no parking and nobody is answering their phones.',
      options: [
        { id: 'LATE', label: 'Push doors back until the fire is out', likely: 'They come after. Later than you planned.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors at ten. The crowd came in smelling of smoke and stayed past midnight.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Half the crowd is on the other side of the barricades.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'A thin night. The bands played for the ones who walked.' }
      ] },

    { id: 'SANTA_FE_NM_MONSOON_ARROYO', when: 'WEEK', tier: 'HARD', weight: 3, cooldown: 35, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [7, 8, 9] },
      telegraph: 'The thunderheads have been building over the mountains every afternoon.',
      title: 'The arroyo is running',
      body: 'A storm sat over the foothills for an hour. The arroyo behind the dirt-lot show is running brown and the generator is standing in water.',
      options: [
        { id: 'GARAGE', label: 'Haul everything to a garage in Casa Solana', likely: 'Tight and loud. Fewer people fit.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A carport took the bill with an hour to spare. The rain on the roof kept time.' },
        { id: 'WAIT', label: 'Wait for it to drain and push doors late', likely: 'The ones who wanted to come stay.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The water was gone by nine. The crowd stood in the mud and did not mind.' },
        { id: 'ACCEPT', label: 'Run it wet', likely: 'Risky with a generator and a lot of cables.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Lightning ended the set early. Nobody was hurt and nobody was happy.' }
      ] },

    { id: 'SANTA_FE_NM_SESSION_SUITS', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 4], months: [1, 2, 3] },
      telegraph: 'The legislature is in session and every downtown room is full of suits.',
      title: 'The suits took the club',
      body: 'The long session has filled the Railyard club and every bar nearby with lobbyists. The all-ages hall is the only room left on a Tuesday.',
      options: [
        { id: 'HALL', label: 'Move the bill to the hall', likely: 'Early and sober. The kids can come.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The hall took the bill at six. The kids filled it and the suits stayed away.' },
        { id: 'LATE', label: 'Start late after the suits clear out', likely: 'A smaller, later crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The suits left by ten. The regulars drifted in after.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'A crowd that came for something else.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'A few lobbyists stayed for a song. The rest of the room was empty.' }
      ] }
  ]
});

