SB.Cities.register('las-vegas', {
  v: 1,
  slug: 'las-vegas',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of nevada las vegas', 'unlv', 'runnin\' rebels', 'college of southern nevada', 'csn', 'nevada state', 'las vegas review-journal',
           'review-journal', 'las vegas sun', 'las vegas weekly', 'kvbc', 'ktnv', 'klas', 'knpr', 'kuna', 'kxnt', 'vegas golden knights', 'golden knights',
           'las vegas raiders', 'las vegas aces', 'las vegas aviators', 'nellis air force base', 'nellis', 'creech air force base', 'mgm resorts',
           'caesars entertainment', 'caesars palace', 'wynn', 'station casinos', 'venetian', 'clark county school district', 'life is beautiful',
           'electric daisy carnival', 'edc', 'punk rock bowling', 'punk rock museum', 'neon reverb', 'consumer electronics show', 'ces', 'national finals rodeo',
           'nfr', 'formula one', 'f1 las vegas grand prix', 'las vegas motor speedway', 'vegas strip', 'bellagio', 'luxor', 'sphere', 'neon museum',
           'fremont street experience', 'hoover dam', 'lake mead', 'red rock canyon', 'the bunkhouse', 'beauty bar', 'the usual place'],
  /* "The casinos", "the big university", "the spring punk festival", "the fight weekend". "The Strip" never appears: locals say "the boulevard" or nothing. */
  blocklist: ['unlv*', 'review-journal*', 'golden knights*', 'punk rock bowling*', 'punk rock museum*', 'neon reverb*', 'bunkhouse saloon*', 'beauty bar*'],

  blurb: ['A desert city where punk plays boxing gyms, backyards and bar back rooms. Shift workers fill the floor after midnight, and nobody cares about the casinos.',
          'There is no permanent all-ages room, so promoters take odd spaces and real risks. A free all-ages festival downtown every Memorial Day weekend holds the calendar together.'],
  hard: 'No all-ages room, brutal heat, and a town that works nights.',
  region: 'the Mojave',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'Phoenix', state: 'AZ', lat: 33.45, lon: -112.07 },
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89 },
    { name: 'San Diego', state: 'CA', lat: 32.72, lon: -117.16 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Las Vegas' },
    { id: 'north-las-vegas', kind: 'FEEDER', name: 'North Las Vegas', minutes: 15, bearing: 25, beyond: 'spaghetti-bowl', note: 'A working-class city with its own rules. Kids and bands.' },
    { id: 'henderson', kind: 'FEEDER', name: 'Henderson', minutes: 20, bearing: 140, note: 'A large suburb. Kids come in with cars; a small garage scene.' },
    { id: 'boulder-city', kind: 'FEEDER', name: 'Boulder City', minutes: 30, bearing: 140, note: 'A small town. One or two bands.' },
    { id: 'indian-springs', kind: 'FEEDER', name: 'Indian Springs', minutes: 45, bearing: 320, note: 'Remote and tiny.' },
    { id: 'pahrump', kind: 'FEEDER', name: 'Pahrump', minutes: 60, bearing: 285, note: 'A desert town. Teenagers drive in.' },
    { id: 'moapa', kind: 'FEEDER', name: 'Moapa Valley and Overton', minutes: 60, bearing: 45, beyond: 'spaghetti-bowl', note: 'A small farm valley. Rare.' },
    { id: 'mesquite', kind: 'FEEDER', name: 'Mesquite', minutes: 80, bearing: 45, beyond: 'spaghetti-bowl', note: 'A small casino town on the interstate. Rare.' },
    { id: 'bullhead', kind: 'PEER', name: 'Bullhead City', state: 'AZ', minutes: 100, bearing: 175, note: 'A small river-town scene.' },
    { id: 'kingman', kind: 'PEER', name: 'Kingman', state: 'AZ', minutes: 100, bearing: 130, note: 'A tiny desert-town scene.' },
    { id: 'st-george', kind: 'PEER', name: 'St. George', state: 'UT', minutes: 120, bearing: 40, note: 'A small, conservative college-and-retiree scene.' }
  ],

  chokepoints: [{ id: 'spaghetti-bowl', name: 'the Spaghetti Bowl', p: .02 }],

  hoods: [
    { id: 'downtown', name: 'downtown and East Fremont', route: 'downtown', note: 'The old casino core and the walkable bar strip east of it. Most local music rooms have been here, and many have come and gone.' },
    { id: 'arts-district', name: 'the Arts District', route: 'old-side', note: 'Warehouse blocks south of downtown, now galleries, breweries and murals. The cheap units were pushed out.' },
    { id: 'westside', name: 'the Old Westside', route: 'old-side', note: 'A historic Black neighborhood west of downtown. Low income, few rooms.' },
    { id: 'chinatown', name: 'Spring Mountain Road', route: 'work-side', note: 'A long run of strip malls and restaurants west of the casinos. Cheap commercial units.' },
    { id: 'boulder-hwy', name: 'Boulder Highway', route: 'work-side', note: 'Cheap motels, shops and trailer parks on the way to Henderson. Rough rooms.' },
    { id: 'east-side', name: 'Sunrise Manor and the east side', route: 'work-side', note: 'Low-income stucco tracts at the desert edge. Backyards and desert shows.' },
    { id: 'north-lv', name: 'North Las Vegas', route: 'work-side', note: 'Industrial warehouses and tract houses, in a separate city with its own rules.' },
    { id: 'maryland', name: 'Maryland Parkway', route: 'campus', note: 'Rentals and dive bars by the university. One of the few all-ages-adjacent corridors.' },
    { id: 'summerlin', name: 'Summerlin and the west side', route: 'campus', note: 'Master-planned suburbs with big garages. Teen bands.' }
  ],

  contacts: ['phoenix', 'salt-lake-city', 'los-angeles'],

  points: [
    { name: 'Baker', state: 'CA', lat: 35.27, lon: -116.07, pop: 700 },
    { name: 'Barstow', state: 'CA', lat: 34.90, lon: -117.02, pop: 25000 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24, pop: 12800000 },
    { name: 'Kingman', state: 'AZ', lat: 35.19, lon: -114.05, pop: 32000 }
  ],
  roads: ['I-15', 'US 95', 'I-215', 'Boulder Highway', 'Charleston Boulevard', 'Flamingo Road'],

  words: {
    street: ['Fremont', 'Charleston Boulevard', 'Maryland Parkway', 'Sahara Avenue', 'Flamingo Road', 'Spring Mountain Road', 'Tropicana Avenue', 'Boulder Highway'],
    water: ['the wash', 'the Las Vegas Wash'],
    hood: ['East Fremont', 'the Arts District', 'Old Westside', 'Sunrise Manor', 'Summerlin', 'North Las Vegas', 'Boulder Highway'],
    thing: ['neon', 'swamp cooler', 'wash', 'shift', 'graveyard shift', 'motel sign', 'dirt road', 'boxing gym'],
    weather: ['heat warning', 'monsoon storm', 'flash flood']
  },

  events: [
    { id: 'LAS_VEGAS_GRAVEYARD_LOADIN', when: 'WEEK', tier: 'REAL', weight: 3, cooldown: 35, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'Half the band picked up extra graveyard shifts this week.',
      title: 'The band gets off at two',
      body: 'The drummer and the bass player are both on the graveyard shift, and the late bill is a Tuesday for them. Nobody will have an amp in the room before the doors.',
      options: [
        { id: 'LATE', label: 'Push the whole bill late and let them load in after the shift', likely: 'The room is full of people in work shirts. The neighbors are asleep.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 120 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }, { op: 'REGULARS', pct: .01 }],
          result: 'The doors opened at midnight. The crowd came off their shifts in vests and name tags.' },
        { id: 'SWAP', label: 'Swap them to the front and find a replacement headliner', likely: 'Costs an hour of phone calls.',
          effects: [{ op: 'HOURS', d: -1, when: 'TODAY' }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'A last-minute swap. The headliner was a friend with an amp and a day off.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'A rough, tired set.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'They played on no sleep. It was loud and loose and over by eleven.' }
      ] },

    { id: 'LAS_VEGAS_FIVE_FIFTEEN', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 35, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'HEAT', months: [6, 7, 8, 9] },
      telegraph: 'The forecast says 115 all week.',
      title: 'It is 115 in the desert',
      body: 'The desert show off the dirt road is an oven, and the generator keeps cutting out. The wind is only pushing hot air around.',
      options: [
        { id: 'NIGHT', label: 'Start after dark, when the sun is down', likely: 'The ones who want to come do. A long wait in the heat.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'It cooled to a hundred by ten. The headlights lit the stage.' },
        { id: 'ICE', label: 'Buy ice and water for everybody', likely: 'Costs forty dollars. People stay.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'REGULARS', pct: .02 }],
          result: 'Cases of cold water and electrolytes at the door. Nobody forgot it.' },
        { id: 'ACCEPT', label: 'Run it as it is', likely: 'Half the crowd goes home early.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The ones who stayed were soaked and the generator died by eleven.' }
      ] }
  ]
});
