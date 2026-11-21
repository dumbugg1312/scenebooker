SB.Cities.register('tucson', {
  v: 1,
  slug: 'tucson',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of arizona', 'u of a', 'arizona wildcats', 'wildcats', 'arizona daily star', 'tucson weekly', 'daily wildcat', 'tucson sentinel', 'kxci',
           'kvoa', 'kold', 'kgun', 'tucson electric power', 'raytheon', 'davis-monthan', 'davis monthan air force base', 'fort huachuca', 'pima community college',
           'pima county', 'tucson medical center', 'banner health', 'tucson gem and mineral show', 'gem and mineral show', 'el tour de tucson',
           'all souls procession', 'fourth avenue street fair', 'tucson rodeo', 'la fiesta de los vaqueros', 'sky island', 'kitt peak', 'tohono o\'odham nation',
           'pascua yaqui tribe', 'diamond casino', 'golf links', 'cat mountain', 'arizona-sonora desert museum', 'tucson roadrunners', 'tucson saguaros',
           'hotel congress', 'club congress', 'tucson convention center', 'loft cinema', 'rialto theatre', 'the flycatcher', 'club crawl', 'sentinel peak',
           'saguaro national park', 'mount lemmon', 'border patrol'],
  /* "The university", "the air base", "the gem show", "the procession". Nogales is a place and is used as a place. */
  blocklist: ['hotel congress*', 'club congress*', 'arizona daily star*', 'tucson weekly*', 'rialto theatre*', 'raytheon*', 'davis-monthan*', 'pima community*'],

  blurb: ['A desert town where punk keeps rebuilding the same rooms in new strip malls and backyards. Old heads and kids share a floor, and a hot night ends in a dust storm.',
          'An all-ages room downtown, a narrow hardcore room on the south side and the east-side garages carry it, with the old club left for touring acts.'],
  hard: 'Rooms close every few years, summers hit 108, and Phoenix pulls the bands.',
  region: 'the Southwest',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Phoenix', state: 'AZ', lat: 33.45, lon: -112.07 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'El Paso', state: 'TX', lat: 31.76, lon: -106.49 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Tucson' },
    { id: 'foothills', kind: 'FEEDER', name: 'Casas Adobes and the Catalina Foothills', minutes: 20, bearing: 0, note: 'An affluent north side. Bored kids with cars.' },
    { id: 'marana', kind: 'FEEDER', name: 'Marana', minutes: 25, bearing: 320, note: 'A new-tract suburb. Teenagers come down the interstate; a few garage bands.' },
    { id: 'oro-valley', kind: 'FEEDER', name: 'Oro Valley', minutes: 25, bearing: 355, note: 'A wealthy foothills suburb. Few shows; kids come in with their parents\' cars.' },
    { id: 'vail', kind: 'FEEDER', name: 'Vail', minutes: 25, bearing: 110, note: 'Rural-suburban sprawl. Kids need rides.' },
    { id: 'sahuarita', kind: 'FEEDER', name: 'Sahuarita', minutes: 25, bearing: 180, note: 'A commuter town on the interstate south. A small crowd.' },
    { id: 'green-valley', kind: 'FEEDER', name: 'Green Valley', minutes: 35, bearing: 185, note: 'A retirement community. Little youth, but the high school sends a few.' },
    { id: 'three-points', kind: 'FEEDER', name: 'Three Points', minutes: 40, bearing: 250, note: 'Ranch land at the edge of the reservation. Rare.' },
    { id: 'benson', kind: 'FEEDER', name: 'Benson', minutes: 50, bearing: 105, note: 'A small desert town on the interstate. One or two bands.' },
    { id: 'nogales', kind: 'PEER', name: 'Nogales', minutes: 65, bearing: 180, note: 'A border town with a link across the line.' },
    { id: 'sierra-vista', kind: 'PEER', name: 'Sierra Vista', minutes: 75, bearing: 130, note: 'An army town with a small, sporadic scene.' },
    { id: 'phoenix', kind: 'PEER', name: 'Phoenix', minutes: 100, bearing: 320, slug: 'phoenix', note: 'The big sibling up the interstate. Bands and fans go there for bigger rooms.' },
    { id: 'las-cruces', kind: 'PEER', name: 'Las Cruces', state: 'NM', minutes: 170, bearing: 100, note: 'A smaller college-town scene along the interstate east.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The bar and restaurant core around the old train depot. One big older club for touring bands. Rebuilt and pricey for kids.' },
    { id: 'fourth-ave', name: 'Fourth Avenue', route: 'old-side', note: 'Old storefronts, thrift stores, tattoo shops and bars under the railroad underpass. The traditional punk drag.' },
    { id: 'barrio', name: 'Barrio Viejo and Armory Park', route: 'old-side', note: 'Adobe rowhouses and small lots south of downtown. Shared houses, backyard shows and new neighbors who complain.' },
    { id: 'menlo', name: 'Menlo Park and the west side', route: 'old-side', note: 'A hillside barrio below the mountain. Low rent and backyards.' },
    { id: 'south-tucson', name: 'South Tucson', route: 'work-side', note: 'A small city inside the city. Cheap warehouses, taquerias and body shops; one of the few places a hardcore room has fit.' },
    { id: 'prince', name: 'Prince Road and Flowing Wells', route: 'work-side', note: 'Strip malls, auto shops and trailer parks on the near northwest. A punk and metal room once sat in a strip far from downtown.' },
    { id: 'university', name: 'the university and Sam Hughes', route: 'campus', note: 'Bungalow rentals full of students. House-party territory from August to May.' },
    { id: 'midtown', name: 'Midtown', route: 'campus', note: 'Fraying midcentury ranch houses, cheap rent and plenty of garages.' },
    { id: 'east-side', name: 'the east side', route: 'campus', note: 'Cul-de-sacs, driveways and garages. Where a lot of teen bands start.' }
  ],

  contacts: ['phoenix', 'flagstaff-az', 'el-paso-tx'],

  points: [
    { name: 'Phoenix', state: 'AZ', lat: 33.45, lon: -112.07, pop: 5200000 },
    { name: 'Las Cruces', state: 'NM', lat: 32.31, lon: -106.78, pop: 110000 },
    { name: 'El Paso', state: 'TX', lat: 31.76, lon: -106.49, pop: 870000 },
    { name: 'Yuma', state: 'AZ', lat: 32.69, lon: -114.63, pop: 200000 }
  ],
  roads: ['I-10', 'I-19', 'Oracle Road', 'Speedway', 'Grant Road', 'Stone Avenue'],

  words: {
    street: ['Fourth Avenue', 'Congress Street', 'Speedway', 'Grant', 'Prince Road', 'Stone', '22nd Street'],
    water: ['the Santa Cruz', 'the Rillito', 'the wash'],
    hood: ['Barrio Viejo', 'Armory Park', 'Sam Hughes', 'South Tucson', 'Menlo Park', 'Flowing Wells', 'the east side'],
    thing: ['swamp cooler', 'wash', 'mesquite', 'monsoon', 'prickly pear', 'javelina', 'agua fresca'],
    weather: ['dust storm', 'monsoon storm', 'flash flood']
  },

  events: [
    { id: 'TUCSON_WASH_RUNNING', when: 'WEEK', tier: 'HARD', weight: 3, cooldown: 35, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [7, 8, 9] },
      telegraph: 'A monsoon cell is parked over the mountains north of town.',
      title: 'The wash is running',
      body: 'The dry wash filled in ten minutes, and the dip in the road is a brown river. The band is on the far side of it with the amps and nowhere to cross.',
      options: [
        { id: 'WAIT', label: 'Wait it out and push doors late', likely: 'It drops in an hour. The crowd waits.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 75 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The water dropped by nine. The band waded the last stretch with the amp over a head.' },
        { id: 'AROUND', label: 'Send a driver the long way round', likely: 'Two hours of your day. The band gets there.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .01 }],
          result: 'A driver took the long way and the band loaded in under an umbrella.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'TUCSON_HUNDRED_AND_EIGHT', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 35, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'HEAT', months: [5, 6, 7, 8, 9] },
      telegraph: 'The forecast says one hundred and eight all week.',
      title: 'It is 108 in the garage',
      body: 'The swamp cooler is only pushing hot air around. The sun is still on the stucco and the band wants to know who is going to last through the second set.',
      options: [
        { id: 'LATE', label: 'Start after nine, when the sun is down', likely: 'The ones who want to come do. Late for the neighbors.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'It cooled to ninety-six by ten. The crowd was damp but happy.' },
        { id: 'ICE', label: 'Buy ice and water for everybody', likely: 'Costs forty dollars. People stay.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'REGULARS', pct: .02 }],
          result: 'A cooler of agua fresca at the door. Nobody forgot it.' },
        { id: 'ACCEPT', label: 'Run it as it is', likely: 'Half the crowd goes home early.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The ones who stayed were soaked and the room emptied by ten.' }
      ] }
  ]
});
