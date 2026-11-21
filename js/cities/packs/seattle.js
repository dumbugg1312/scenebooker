SB.Cities.register('seattle', {
  v: 1,
  slug: 'seattle',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of washington', 'uw', 'seattle university', 'seattle pacific university', 'seattle central college', 'seattle times', 'the stranger',
           'seattle weekly', 'kexp', 'kuow', 'kiro', 'king 5', 'komo', 'kcts', 'seahawks', 'seattle mariners', 'sounders', 'kraken', 'huskies', 'microsoft', 'amazon',
           'boeing', 'starbucks', 'costco', 'nordstrom', 'expedia', 'bumbershoot', 'sasquatch', 'northwest terror fest', 'disemboweled god fest', 'seafair',
           'capitol hill block party', 'emerald city comic con', 'joint base lewis-mcchord', 'jblm', 'naval station everett', 'puget sound naval shipyard',
           'sound transit', 'washington state ferries', 'space needle', 'pike place', 'pike place market', 'lumen field', 't-mobile park', 'climate pledge arena',
           'seattle center', 'sub pop', 'grunge', 'nirvana', 'pearl jam', 'soundgarden', 'tacoma dome', 'evergreen state college', 'western washington university',
           'seattle police', 'link light rail', 'metro transit', 'nintendo', 'valve', 'rei', 'safeco', 'the showbox', 'neumos', 'the crocodile', 'vera project'],
  blocklist: ['seattle times*', 'the stranger seattle*', 'kexp*', 'bumbershoot*', 'showbox*', 'crocodile cafe*', 'vera project*', 'neumos*'],

  blurb: ['Rain, ferries and a rent crisis, but an old all-ages tradition keeps the kids coming. Metal and punk both run deep here.',
          'A big, serious stop on I-5, where bills mix ages and genres and everyone wants the room to last.'],
  hard: 'Rent and noise complaints keep killing the rooms; every house show lives on borrowed time.',
  region: 'the Northwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Vancouver', state: 'BC', lat: 49.28, lon: -123.12 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 }
  ],

  tilt: [
    { fan: 'metal', band: 'metal', d: .08, reason: 'A strong extreme metal circuit runs through the whole Sound.' },
    { fan: 'street-punk', band: 'street-punk', d: .08, reason: 'A long all-ages punk history; kids still expect it.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Seattle' },
    { id: 'tacoma', kind: 'FEEDER', name: 'Tacoma', minutes: 40, bearing: 195, lean: ['hardcore'], note: 'Its own scene with a strong hardcore history. Kids drive up.' },
    { id: 'everett', kind: 'FEEDER', name: 'Everett', minutes: 35, bearing: 5, note: 'A port and Navy town with young bands. Kids ride in on I-5.' },
    { id: 'bellevue', kind: 'FEEDER', name: 'Bellevue', minutes: 20, bearing: 90, beyond: 'floating-bridges', note: 'The wealthy east side. Suburban kids come west for shows.' },
    { id: 'renton', kind: 'FEEDER', name: 'Renton', minutes: 25, bearing: 140, beyond: 'floating-bridges', note: 'A working-class suburb full of garage bands.' },
    { id: 'kent', kind: 'FEEDER', name: 'Kent', minutes: 30, bearing: 170, note: 'Warehouse and suburb sprawl south of the city.' },
    { id: 'bremerton', kind: 'FEEDER', name: 'Bremerton', minutes: 60, bearing: 250, note: 'A shipyard town across the Sound. The ferry schedule decides when the band arrives.' },
    { id: 'bellingham', kind: 'FEEDER', name: 'Bellingham', minutes: 90, bearing: 5, note: 'A college town up I-5.' },
    { id: 'olympia', kind: 'PEER', name: 'Olympia', minutes: 60, bearing: 195, slug: 'olympia-wa', note: 'A small scene with a long DIY tradition, still active with grind and punk.' },
    { id: 'portland', kind: 'PEER', name: 'Portland', state: 'OR', minutes: 175, bearing: 185, slug: 'portland', note: 'A scene of similar size. The usual tour pairing.' }
  ],

  chokepoints: [{ id: 'floating-bridges', name: 'the floating bridges', p: .03 }],

  hoods: [
    { id: 'capitol-hill', name: 'Capitol Hill', route: 'downtown', note: 'Dense bars and apartments, the old home of the small all-ages rooms. Expensive now.' },
    { id: 'belltown', name: 'Belltown', route: 'downtown', note: 'The old club strip, mostly lost to condo towers.' },
    { id: 'ballard', name: 'Ballard', route: 'old-side', note: 'Old fishing streets with houses and breweries. House shows here draw noise complaints.' },
    { id: 'fremont', name: 'Fremont', route: 'old-side', note: 'A canal and bridge neighborhood of converted warehouses and rehearsal spaces.' },
    { id: 'columbia-city', name: 'Columbia City and Rainier Valley', route: 'old-side', note: 'Cheaper houses and family streets.' },
    { id: 'west-seattle', name: 'West Seattle', route: 'old-side', note: 'Across the bridge, a separate feel and few rooms.' },
    { id: 'sodo', name: 'SoDo', route: 'work-side', note: 'Warehouses and rail yards south of downtown. Rehearsal rooms and the odd warehouse show.' },
    { id: 'georgetown', name: 'Georgetown', route: 'work-side', note: 'Industrial, by the airfield and the river. Cheap space and few neighbors to hear it.' },
    { id: 'u-district', name: 'the U District', route: 'campus', note: 'Cheap group houses and low basements with drip pipes. A long all-ages tradition.' }
  ],

  points: [
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68, pop: 2540000 },
    { name: 'Vancouver', state: 'BC', lat: 49.28, lon: -123.12, pop: 2600000 },
    { name: 'Spokane', state: 'WA', lat: 47.66, lon: -117.43, pop: 590000 },
    { name: 'Eugene', state: 'OR', lat: 44.05, lon: -123.09, pop: 380000 }
  ],
  roads: ['I-5', 'I-90', 'SR-520', 'SR-99', 'I-405'],

  words: {
    street: ['Pike', 'Pine', 'Broadway', 'Aurora', 'Rainier Avenue', '45th'],
    water: ['Puget Sound', 'Lake Washington', 'Lake Union', 'the Duwamish', 'the ship canal'],
    hood: ['Capitol Hill', 'Ballard', 'Fremont', 'Georgetown', 'Columbia City', 'West Seattle', 'Belltown', 'SoDo'],
    thing: ['drizzle', 'ferry', 'espresso', 'bridge', 'wet amp', 'parking ticket'],
    weather: ['drizzle', 'gray day', 'rain on the load-in']
  },

  events: [
    { id: 'SEATTLE_BRIDGE_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'The floating bridge is scheduled for a maintenance closure this week.',
      title: 'The bridge is shut',
      body: 'The floating bridge closed for the night, and the east-side kids and the bands from over the lake cannot cross. Everyone is rerouting around the water.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the closure', likely: 'Most make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the lake.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The bridge never reopened in time. The east side stayed home.' },
        { id: 'RIDES', label: 'Organize rides the long way around', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads went around together. They will remember that.' }
      ] }
  ]
});
