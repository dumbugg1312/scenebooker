SB.Cities.register('el-paso-tx', {
  v: 1,
  slug: 'el-paso-tx',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['fort bliss', 'bliss', 'biggs army airfield', 'william beaumont army medical center', 'border patrol', 'joint task force north',
           'utep', 'university of texas at el paso', 'new mexico state university', 'nmsu', 'el paso community college', 'sun bowl',
           'la fiesta de las flores', 'fiesta de las flores', 'balloonfest', 'sun city pride', 'klaq', 'great river raft race',
           'southwestern international prca rodeo', 'amigo airsho', 'cincinnati street mardi gras', 'downtown street festival',
           'neon desert', 'sun city music festival', 'texas showdown', 'el paso times', 'el diario de el paso', 'el paso herald-post',
           'el paso matters', 'sun metro', 'amtrak', 'sunset limited', 'texas eagle', 'union depot', 'holloman air force base', 'holloman',
           'whataburger', 'tecate', 'modelo', 'pacifico', 'dos equis', 'jarritos', 'topo chico', 'battle of i-10', 'vfw', 'american legion',
           'la cochera', 'caliche room', 'arroyo seco social hall', 'cuatro vientos hall', 'casa nopal', 'cinderblock social',
           'el hueco warehouse', 'ocotillo annex', 'salon paso seco', 'rail yard back room', 'mesquite street garage', 'the pink wall'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['utep*', 'fort bliss*', 'sun bowl*', 'klaq*', 'el paso times*', 'sun metro*', 'whataburger*', 'cincinnati street*'],

  blurb: ['Backyards behind cinderblock walls, and a Chicano, bilingual crowd that built it all itself. Heat sets the clock. The cops end the night.',
          'Bands that get good leave for bigger cities, so the rooms and the stubbornness stay. Two circle pits run at once.'],
  hard: 'Rooms keep closing, the nearest real city is hours away, and the cops come in force.',
  region: 'the Southwest',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Albuquerque', state: 'NM', lat: 35.08, lon: -106.65 },
    { name: 'Phoenix', state: 'AZ', lat: 33.45, lon: -112.07 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'street-punk', d: 0.06, reason: 'Border-punk and skate-punk roots run through the backyard history.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'El Paso' },
    { id: 'sunland-park', kind: 'FEEDER', name: 'Sunland Park and Santa Teresa', state: 'NM', minutes: 20, bearing: 295, note: 'Border suburbs just over the state line; kids come across for shows all the time.' },
    { id: 'anthony', kind: 'FEEDER', name: 'Anthony', minutes: 20, bearing: 350, note: 'A small border-edge town on the state line.' },
    { id: 'canutillo', kind: 'FEEDER', name: 'Canutillo', minutes: 20, bearing: 315, note: 'A small valley town up the river with its own school district.' },
    { id: 'socorro', kind: 'FEEDER', name: 'Socorro, San Elizario and Fabens', minutes: 30, bearing: 125, note: 'Farm and mission towns down the river; kids have to come in, and a few backyard bands live there.', bands: 1 },
    { id: 'mesilla', kind: 'FEEDER', name: 'Mesilla', state: 'NM', minutes: 50, bearing: 335, note: 'A tiny plaza town beside the college city; mostly a place kids pass through.' },
    { id: 'hatch', kind: 'FEEDER', name: 'Hatch', state: 'NM', minutes: 75, bearing: 340, note: 'A chile-farming village; mostly pass-through.' },
    { id: 'alamogordo', kind: 'FEEDER', name: 'Alamogordo', state: 'NM', minutes: 90, bearing: 20, note: 'A small base town with a little scene that sends kids down the highway.', bands: 1 },
    { id: 'deming', kind: 'FEEDER', name: 'Deming', state: 'NM', minutes: 90, bearing: 285, note: 'A farm and highway town on the interstate.' },
    { id: 'las-cruces', kind: 'PEER', name: 'Las Cruces', state: 'NM', minutes: 45, bearing: 330, scene: 500, note: 'A university and farm town up the valley with its own punk life: the sister scene and the most important trade.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Old brick blocks, bars with back rooms and empty storefronts. Dead on weeknights, busy on Saturdays, and the parking lots are dark.' },
    { id: 'segundo-barrio', name: 'Segundo Barrio', route: 'old-side', note: 'Dense old tenement blocks hard against the river. Courtyard shows nobody advertises, close neighbors, and a lot of watching eyes.' },
    { id: 'sunset-heights', name: 'Sunset Heights', route: 'old-side', note: 'Big old houses with porches, cut into apartments. The nearest thing to a house-show neighborhood.' },
    { id: 'kern-place', name: 'Kern Place', route: 'campus', note: 'Bungalows, student rentals and a strip of bars by the university. Noise complaints are the brake, and it keeps getting pricier.' },
    { id: 'lower-valley', name: 'the Lower Valley', route: 'work-side', note: 'Flat river-edge land with big lots, cinderblock walls and room for a generator. Cheap and ignored, which is why it works.' },
    { id: 'eastside', name: 'the Eastside', route: 'campus', note: 'Tract houses, strip malls and big high schools. Most of the kids actually live here, and garages and strip-mall units hold the shows.' },
    { id: 'northeast', name: 'the Northeast', route: 'work-side', note: 'Ranch houses and apartments around the base. Bands lose members to deployments and transfers.' }
  ],

  contacts: [
    { name: 'Las Cruces', state: 'NM', lat: 32.31, lon: -106.78 },
    { name: 'Albuquerque', state: 'NM', lat: 35.08, lon: -106.65 },
    { name: 'Tucson', state: 'AZ', lat: 32.22, lon: -110.97 }
  ],

  points: [
    { name: 'Las Cruces', state: 'NM', lat: 32.31, lon: -106.78, pop: 111000 },
    { name: 'Albuquerque', state: 'NM', lat: 35.08, lon: -106.65, pop: 564000 },
    { name: 'Tucson', state: 'AZ', lat: 32.22, lon: -110.97, pop: 543000 },
    { name: 'Phoenix', state: 'AZ', lat: 33.45, lon: -112.07, pop: 1600000 },
    { name: 'Midland', state: 'TX', lat: 32.0, lon: -102.08, pop: 132000 },
    { name: 'San Antonio', state: 'TX', lat: 29.42, lon: -98.49, pop: 1500000 }
  ],
  roads: ['I-10', 'I-110', 'US 54', 'Loop 375', 'US 62', 'Spur 601'],

  words: {
    street: ['Mesa', 'Alameda', 'Montana', 'Paisano', 'Dyer', 'Zaragoza', 'Yarbrough'],
    water: ['the Rio Grande', 'the river'],
    hood: ['Segundo Barrio', 'Chihuahuita', 'Sunset Heights', 'Kern Place', 'Ysleta', 'the Lower Valley', 'the Eastside', 'the Westside'],
    thing: ['carport', 'cinderblock wall', 'caliche', 'breakfast burrito', 'generator', 'swamp cooler', 'raspado', 'tarp', 'backyard show', 'party hall', 'mechanic shop', 'squad car'],
    weather: ['dust storm', 'monsoon', 'triple digits']
  },

  events: [
    { id: 'EL_PASO_TX_YARD_RAID', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'A neighbor two doors down has been giving the yard dirty looks all week.',
      title: 'Helicopter over the yard',
      body: 'Halfway through the second band a helicopter circles the block and squad cars line the street. The cinderblock wall hides the noise, but not the crowd.',
      options: [
        { id: 'SHUT', label: 'Kill the generator and clear the yard', likely: 'The night ends early. Nobody gets cited.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'The generator went quiet and the yard emptied through the side gate.' },
        { id: 'TALK', label: 'Go out and talk to them', likely: 'Costs a lot of nerve. They might leave.',
          effects: [{ op: 'REGULARS', pct: .01 }, { op: 'HOURS', d: -1, when: 'TODAY' }],
          result: 'You talked for twenty minutes. They left. The set went on, quieter.' },
        { id: 'MOVE', label: 'Move the rest to a mechanic shop', likely: 'Smaller, with the bay doors down.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'The bay doors came down, the tools went against the wall, and the bill finished.' }
      ] }
  ]
});
