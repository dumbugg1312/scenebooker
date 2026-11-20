SB.Cities.register('los-angeles', {
  v: 1,
  slug: 'los-angeles',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['lapd', 'los angeles police department', 'los angeles fire department', 'ucla', 'usc', 'cal state la', 'cal state northridge', 'occidental college', 'loyola marymount',
           'calarts', 'claremont colleges', 'cal poly pomona', 'cal state long beach', 'uc riverside', 'ucsb', 'uc santa barbara', 'cal state san bernardino',
           'cal state channel islands', 'dodgers', 'dodger stadium', 'coachella', 'rose parade', 'ciclavia', 'academy awards', 'oscars', 'world cup', 'in-n-out', 'danger dog',
           'edwards air force base', 'plant 42', 'port hueneme', 'camp pendleton', 'eastside punks', 'oakland warehouse fire', 'ghost ship',
           'arroyo annex', 'frogtown social hall', 'figueroa back room', 'cypress garage', 'chavez ravine rec room', 'los feliz loading dock', 'sunset basement annex',
           'tar pit room', 'mariposa warehouse', 'glassell park grange', 'vernon yard social club', 'marina del rey skate shop lot', 'pico courtyard collective',
           'hyperion bungalow', 'santa fe boxcar hall', 'knights of columbus'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The ballpark is 'the ballpark' and the desert festival 'the big desert festival' in game text. */
  blocklist: ['dodger*', 'coachella*', 'ciclavia*', 'in-n-out*', 'lapd*', 'tar pit room*', 'arroyo annex*', 'cypress garage*'],

  blurb: ['A few hundred neighborhoods stitched together by freeways, where the punk scene has been going for fifty years and is never one scene.',
          'Shows live in garages, yards and storefronts, and every one means a long drive and a parking fight. Booking here means knowing which part of town you are in.'],
  hard: 'Saturdays are saturated, parking is hostile, rent is brutal and rooms close for fire code.',
  region: 'Southern California',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Los Angeles' },
    { id: 'pomona', kind: 'FEEDER', name: 'Pomona and Claremont', minutes: 45, bearing: 80, note: 'A working-class city with an arts district and a five-college town beside it. A real scene of its own, and a natural feeder.' },
    { id: 'santa-clarita', kind: 'FEEDER', name: 'Santa Clarita', minutes: 45, bearing: 340, note: 'A planned suburb of garages, malls and bored teenagers.' },
    { id: 'thousand-oaks', kind: 'FEEDER', name: 'Thousand Oaks and Camarillo', minutes: 55, bearing: 290, note: 'Affluent suburbs with garage bands and skate culture.' },
    { id: 'riverside', kind: 'FEEDER', name: 'Riverside', minutes: 70, bearing: 90, note: 'An inland city with a campus, a small downtown and its own garages. The younger, harder scene.' },
    { id: 'antelope', kind: 'FEEDER', name: 'Lancaster and Palmdale', minutes: 70, bearing: 20, note: 'High desert, hot and windy and far from everything. The kids make their own scene and drive down.' },
    { id: 'ventura', kind: 'FEEDER', name: 'Ventura and Oxnard', minutes: 70, bearing: 295, note: 'A beach and farm county with skaters and a small-club scene.' },
    { id: 'san-bernardino', kind: 'FEEDER', name: 'San Bernardino', minutes: 75, bearing: 70, note: 'A struggling working-class city with a hardcore and garage culture.' },
    { id: 'victorville', kind: 'FEEDER', name: 'Victorville and Hesperia', minutes: 90, bearing: 50, beyond: 'cajon-pass', note: 'High-desert bedroom towns over the pass. Desert rats and skate parks.' },
    { id: 'oc', kind: 'PEER', name: 'Fullerton, Santa Ana and Anaheim', minutes: 50, bearing: 135, scene: 6000, note: 'Orange County: a famous suburban punk lineage and a strong rival more than a feeder.' },
    { id: 'santa-barbara', kind: 'PEER', name: 'Santa Barbara', minutes: 110, bearing: 305, slug: 'santa-barbara-ca', note: 'A college town with a small-venue and house-party scene.' },
    { id: 'bakersfield', kind: 'PEER', name: 'Bakersfield', minutes: 125, bearing: 350, scene: 2500, note: 'An oil and farm city over the mountains with country pride and a punk and metal scene.' },
    { id: 'san-diego', kind: 'PEER', name: 'San Diego', minutes: 140, bearing: 150, scene: 9000, note: 'A big city with a scene of its own, and the closest rival on the circuit.' }
  ],

  chokepoints: [
    { id: 'cajon-pass', name: 'the Cajon Pass', p: .02 }
  ],

  hoods: [
    { id: 'downtown', name: 'Downtown and the Arts District', route: 'downtown', note: 'Warehouses, lofts and industrial blocks. The Arts District is priced and branded; the rest is a patchwork where raw space appears and gets shut down fast.' },
    { id: 'hollywood', name: 'Hollywood and East Hollywood', route: 'downtown', note: 'Real licenses and real sound systems, in a tourist-heavy, expensive stretch. The old punk clubs are mostly other businesses now.' },
    { id: 'silver-lake', name: 'Silver Lake, Echo Park and Los Feliz', route: 'old-side', note: 'Hills and flats northwest of downtown: bars, hillside backyards and a few small clubs. Heavily gentrified, and still home to a lot of former band members.' },
    { id: 'nela', name: 'Highland Park, Eagle Rock and the northeast', route: 'old-side', note: 'Garages and yards on hilly streets along the Arroyo Seco. Long-time Latino families, artists and then professionals; Highland Park is the textbook gentrification story.' },
    { id: 'boyle-heights', name: 'Boyle Heights and East LA', route: 'work-side', note: 'Across the river east of downtown. Multigenerational families, a deep Chicano punk history and an organized anti-displacement movement that confronts booker who ignore it.' },
    { id: 'koreatown', name: 'Koreatown, Pico-Union and Filipinotown', route: 'old-side', note: 'Dense apartment districts with late-night restaurants and back rooms. Storefront collectives that are being squeezed.' },
    { id: 'south-la', name: 'South LA, Crenshaw and Inglewood', route: 'work-side', note: 'Community halls, churches and backyards in Black and Latino neighborhoods. Cheap and underserved by venues; stadium money is reshaping Inglewood.' },
    { id: 'valley', name: 'the San Fernando Valley', route: 'campus', note: 'Suburban garages, strip-mall practice rooms and skate spots across the mountains. Hot, stable and a classic source of teenage bands.' },
    { id: 'south-bay', name: 'the South Bay and the Harbor', route: 'campus', note: 'Beach cities and port towns with a long hardcore and skate-punk lineage. The beach cities are priced out; San Pedro and the inland towns are not.' },
    { id: 'long-beach', name: 'Long Beach and the Gateway Cities', route: 'campus', note: 'Separate cities that work as one scene: houses, backyards, halls and student housing. Expensive on the coast, affordable inland.' }
  ],

  rooms: [
    { id: 'nela-garage', kind: 'HOUSE', hood: 'nela', cap: 45, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [70, 60, 45],
      pressure: 50, start: true, note: 'A detached garage behind a bungalow on a hilly street. Load-in is a ramp; the neighbors are the whole problem after ten.' },
    { id: 'echo-backyard', kind: 'HOUSE', hood: 'silver-lake', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 25, standing: [65, 55, 40],
      pressure: 60, note: 'A hillside backyard with a steep drive. Pretty, loud and visible from every window above it.' },
    { id: 'valley-garage', kind: 'HOUSE', hood: 'valley', cap: 55, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 20, standing: [70, 60, 45],
      pressure: 40, note: 'A two-car garage in a tract house. Hot in summer, far from everything and far from complaints.' },
    { id: 'south-bay-yard', kind: 'OUTDOOR', hood: 'south-bay', cap: 90, rent: 0, pa: .4, curfew: 1320, sketch: 30, standing: [60, 55, 40],
      note: 'A backyard and a skate lot near the harbor. Afternoon sets by generator.' },
    { id: 'long-beach-house', kind: 'HOUSE', hood: 'long-beach', cap: 60, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: true, sketch: 25, standing: [65, 55, 45],
      pressure: 45, note: 'A rented house with a big backyard inland of the beach. Another city, another police department.' },
    { id: 'downtown-warehouse', kind: 'DIY', hood: 'downtown', cap: 180, rent: 120, deposit: 0, pa: .6, curfew: 1440, ac: false, sketch: 60, standing: [55, 60, 40], pressure: 70,
      needs: ['VOUCH'], note: 'An unpermitted industrial unit with one exit and no sprinklers. The landlord wants a month-to-month and the inspectors are counting.' },
    { id: 'filipinotown-store', kind: 'DIY', hood: 'koreatown', cap: 80, rent: 70, deposit: 0, pa: .5, curfew: 1380, ac: true, sketch: 30, standing: [60, 60, 50], pressure: 55,
      note: 'A collective in an empty storefront with a zine room in back. The rent just went up.' },
    { id: 'eastside-hall', kind: 'HALL', hood: 'boyle-heights', cap: 160, rent: 150, deposit: 50, pa: .5, curfew: 1380, ac: false, sketch: 10, standing: [60, 65, 70],
      owner: 'HALL_MANAGER', pressure: 45, note: 'A cultural hall with a long punk history. The community watches who books it and why.' },
    { id: 'south-la-hall', kind: 'HALL', hood: 'south-la', cap: 120, rent: 100, deposit: 50, pa: .5, curfew: 1320, ac: true, sketch: 10, standing: [55, 60, 65],
      owner: 'CHURCH_CONTACT', pressure: 50, note: 'A community hall with folding chairs and a long list of rules. No beer.' },
    { id: 'records', kind: 'SHOP', hood: 'silver-lake', cap: 40, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'A record store with a back room. In-stores in the afternoon, over by seven.' },
    { id: 'hollywood-bar', kind: 'BAR', hood: 'hollywood', cap: 150, soundFee: 70, pa: .8, ages: ['A21'], curfew: 1560, ac: true, following: .35, sketch: 15,
      standing: [45, 65, 70], note: 'A bar with a real license and a real stage. Twenty-one and over, and the doors turn into an argument.' },
    { id: 'highland-bar', kind: 'BAR', hood: 'nela', cap: 100, soundFee: 40, pa: .6, ages: ['ALL', 'A21'], matinee: true, curfew: 1560, ac: true, following: .3, sketch: 15,
      standing: [50, 65, 70], note: 'A bar on the main strip with an early all-ages matinee. Parking is the real problem.' },
    { id: 'hollywood-club', kind: 'CLUB', hood: 'hollywood', cap: 400, houseCosts: 250, split: .8, pa: .9, ages: ['A21', 'A18'], curfew: 1560, ac: true, following: .6, sketch: 10,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 56, needs: ['FULL_BILL'], note: 'The legal room on the boulevard that wants a name, a draw and eight weeks.' }
  ],

  contacts: ['santa-barbara-ca', 'oxnard-ca'],

  calendar: [
    { id: 'ballpark', label: 'a home game at the ballpark', tag: 'game', month: 6, weeks: [1, 5], dows: [3, 4, 5, 6], can: [.85, .88, .90], hoods: ['silver-lake', 'nela', 'downtown'], elsewhere: [.97, .97, .97] },
    { id: 'desert-fest', label: 'the big desert festival', tag: 'festival', month: 4, weeks: [2, 3], dows: [4, 5, 6], can: [.85, .88, .92] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'day-of-dead', label: 'Day of the Dead weekend', tag: 'holiday', month: 11, week: 1, dows: [4, 5], can: [1.05, 1.05, 1], hoods: ['boyle-heights'], elsewhere: [1, 1, 1] }
  ],

  points: [
    { name: 'San Diego', state: 'CA', lat: 32.72, lon: -117.16, pop: 1400000 },
    { name: 'Las Vegas', state: 'NV', lat: 36.17, lon: -115.14, pop: 650000 },
    { name: 'Phoenix', state: 'AZ', lat: 33.45, lon: -112.07, pop: 1600000 },
    { name: 'Tijuana', state: 'MX', lat: 32.51, lon: -117.04, pop: 1900000 }
  ],
  roads: ['I-5', 'I-10', 'US 101', 'I-405', 'I-110', 'SR 60'],

  words: {
    street: ['Sunset Boulevard', 'Figueroa Street', 'York Boulevard', 'Whittier Boulevard', 'Sepulveda Boulevard', 'Hyperion Avenue', 'Venice Boulevard', 'Pico Boulevard', 'Santa Monica Boulevard'],
    water: ['the LA River', 'Glendale Narrows', 'Elysian Valley', 'Ballona Creek', 'the Arroyo Seco'],
    hood: ['Highland Park', 'Eagle Rock', 'Echo Park', 'Silver Lake', 'Boyle Heights', 'Koreatown', 'Glassell Park', 'Cypress Park', 'Lincoln Heights', 'Leimert Park', 'San Pedro', 'Filipinotown'],
    thing: ['garage', 'taco truck', 'bungalow court', 'jacaranda', 'street sweeping', 'freeway', 'loading dock', 'generator', 'palm tree', 'marine layer', 'riverbed', 'hillside street'],
    weather: ['June gloom', 'Santa Ana wind', 'atmospheric river', 'smog'],
    surnames: ['Garcia', 'Hernandez', 'Nguyen', 'Kim', 'Martinez', 'Cohen', 'Ortiz', 'Sargsyan', 'Reyes', 'Tanaka']
  },

  events: [
    { id: 'LOS_ANGELES_BALLPARK_NIGHT', when: 'WEEK', tier: 'REAL', weight: 3, cooldown: 20, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'A home game tonight: every road around the ballpark will be a parking lot.',
      title: 'The ballpark has the freeway',
      body: 'A home game has let out, and the roads into Echo Park and Highland Park are solid brake lights. The headliner is stuck on the freeway while the opener is already on stage.',
      options: [
        { id: 'LATE', label: 'Stretch the opener and push the headliner back', likely: 'Most wait it out. A long, thin start.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The opener played forty minutes and then forty more. The headliner walked in as the crowd gave up on the clock.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'Half the list never gets through.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The ones who made it parked six blocks away. The rest stayed in the traffic.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'LOS_ANGELES_ATMOSPHERIC_RIVER', when: 'WEEK', tier: 'HARD', weight: 3, cooldown: 30, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [12, 1, 2, 3] },
      telegraph: 'A big storm is coming in off the ocean.',
      title: 'The backyard is a river',
      body: 'The atmospheric river has come early. The tarp has collapsed, the street is running like a creek and the band is standing in the garage with the amps on milk crates.',
      options: [
        { id: 'GARAGE', label: 'Pack everybody into the garage', likely: 'Smaller, louder, soaked. They will remember it.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .6 }, { op: 'REGULARS', pct: .02 }],
          result: 'Fifty people in a two-car garage with the door half down. Nobody wanted to leave.' },
        { id: 'MOVE', label: 'Move it a day, once the street drains', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' },
        { id: 'SANDBAG', label: 'Sandbag the drive and play on', likely: 'Costs forty dollars. The crowd stays home.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The water stayed on the street. The room was half full and wet to the ankle.' }
      ] },

    { id: 'LOS_ANGELES_FIRE_INSPECTOR', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 4] },
      telegraph: 'Someone says an inspector has been walking the industrial block.',
      title: 'The inspector is counting exits',
      body: 'A fire inspector has shown up on a Saturday afternoon with a clipboard. He counts the exits, finds one door chained shut, and asks who is in charge of the night.',
      options: [
        { id: 'FIX', label: 'Cut the chain, cut the crowd and fix it on the spot', likely: 'Costs sixty dollars and a smaller night.',
          effects: [{ op: 'MONEY', amount: -60 }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'A new lock and a cap on the headcount. The inspector wrote a note and left.' },
        { id: 'MOVE', label: 'Move the show to a house for the night', likely: 'Smaller and loud, with the neighbors all around.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A garage in the Valley took the whole bill, and the floor was packed.' },
        { id: 'CANCEL', label: 'Cancel and give everyone their money back', likely: 'Safe, and it costs the bands their night.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 7, respect: false }],
          result: 'Called off. The bands went home, and the word got around that the room is on a list.' }
      ] },

    { id: 'LOS_ANGELES_SANTA_ANA', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [9, 10, 11, 12] },
      telegraph: 'The hot dry wind is coming off the desert.',
      title: 'The wind is up',
      body: 'A Santa Ana wind has knocked the power out across the neighborhood, and there is smoke on the horizon. The show can run on a generator, but the air is not good.',
      options: [
        { id: 'GEN', label: 'Run it on the generator', likely: 'Louder and rougher. Some stay home for the smoke.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'REGULARS', pct: .01 }],
          result: 'One light and a generator. The wind banged the garage door in time with the drummer.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] }
  ]
});
