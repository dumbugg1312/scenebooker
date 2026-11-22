SB.Cities.register('tucson', {
  v: 1,
  slug: 'tucson',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of arizona', 'u of a', 'arizona wildcats', 'wildcats', 'arizona daily star', 'tucson weekly', 'daily wildcat', 'tucson sentinel', 'kxci',
           'kvoa', 'kold', 'kgun', 'tucson electric power', 'raytheon', 'davis-monthan', 'davis monthan air force base', 'fort huachuca', 'pima community college',
           'pima county', 'tucson medical center', 'banner health', 'tucson gem and mineral show', 'gem and mineral show', 'el tour de tucson',
           'all souls procession', 'fourth avenue street fair', 'tucson rodeo', 'la fiesta de los vaqueros', 'sky island', 'kitt peak', 'tohono o\'odham nation',
           'pascua yaqui tribe', 'diamond casino', 'golf links', 'cat mountain', 'arizona-sonora desert museum', 'tucson roadrunners', 'tucson saguaros',
           'hotel congress', 'club congress', 'tucson convention center', 'loft cinema', 'rialto theatre', 'the flycatcher', 'club crawl', 'sentinel peak',
           'saguaro national park', 'mount lemmon', 'border patrol',
           'tucson.com', 'thisistucson', 'this is tucson', 'kgun 9', 'azpm', 'arizona public media', 'visit tucson', 'downtown tucson partnership',
           'tucson gem mineral and fossil showcase', 'gem and jam', 'fourth avenue winter street fair', 'fourth avenue spring street fair',
           'fourth avenue merchants association', 'tucson rodeo parade', 'tucson meet yourself', 'tucson presidio birthday', 'tucson veterans day parade',
           'dusk music festival', 'tucson film festival', 'phoenix new times', 'state press'],
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

  rooms: [
    { id: 'midtown-garage', kind: 'HOUSE', hood: 'midtown', cap: 60, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [70, 60, 45],
      pressure: 50, start: true, note: 'A garage off Speedway with a swamp cooler on the amp. Kids and old heads on one floor, and out by ten before the neighbors call.' },
    { id: 'barrio-yard', kind: 'HOUSE', hood: 'barrio', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 25, standing: [65, 60, 45],
      pressure: 55, note: 'A backyard behind an adobe rowhouse. It goes quiet fast when new neighbors move in.' },
    { id: 'east-garage', kind: 'HOUSE', hood: 'east-side', cap: 40, hostCut: 0, pa: .4, curfew: 1290, ac: false, outdoor: false, sketch: 20, standing: [65, 60, 50],
      pressure: 50, note: 'A tract garage where the teen bands start. The parents set the hour.' },
    { id: 'menlo-yard', kind: 'HOUSE', hood: 'menlo', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 30, standing: [65, 60, 45],
      pressure: 40, note: 'A hillside yard on the west side. Cheap and far from campus, so the crowd is all local.' },
    { id: 'youth-space', kind: 'DIY', hood: 'midtown', cap: 250, rent: 70, deposit: 0, pa: .7, ages: ['ALL'], curfew: 1350, ac: true, sketch: 15, standing: [60, 65, 60],
      pressure: 40, note: 'A youth-run arts and music space on Grant. Doors at seven, all ages, and it runs on grants and volunteers.' },
    { id: 'south-bay', kind: 'DIY', hood: 'south-tucson', cap: 120, rent: 60, deposit: 0, pa: .6, curfew: 1380, ac: false, sketch: 45, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'A narrow unit between body shops and taquerias. The one place hardcore has fit, and the landlord is watching.' },
    { id: 'avenue-shop', kind: 'SHOP', hood: 'fourth-ave', cap: 60, pa: .4, curfew: 1320, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'A record and thrift storefront on Fourth Avenue. In-store sets before the bars fill.' },
    { id: 'avenue-bar', kind: 'BAR', hood: 'fourth-ave', cap: 150, soundFee: 50, pa: .7, ages: ['A21'], curfew: 1500, ac: true, following: .3, sketch: 20,
      standing: [50, 65, 70], note: 'A bar by the underpass with a music shop next door. Nearly the only punk host for years.' },
    { id: 'prince-bar', kind: 'BAR', hood: 'prince', cap: 150, soundFee: 40, pa: .6, ages: ['A21'], curfew: 1500, ac: true, following: .2, sketch: 15,
      standing: [45, 65, 70], note: 'A plain stage in a strip-mall bar. Metal and hardcore on weeknights, a long drive from campus.' },
    { id: 'union-hall', kind: 'HALL', hood: 'prince', cap: 200, rent: 160, deposit: 75, pa: .6, curfew: 1320, ac: true, sketch: 10, standing: [55, 60, 70],
      owner: 'HALL_MANAGER', note: 'A rented hall for the afternoon. A cleaning deposit and someone watching the door.' },
    { id: 'hotel-club', kind: 'CLUB', hood: 'downtown', cap: 350, houseCosts: 200, split: .8, pa: .9, ages: ['ALL', 'A21'], curfew: 1380, ac: true, following: .6, sketch: 10,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 56, needs: ['FULL_BILL'], note: 'The old club inside the hotel, with a patio stage. A touring room that wants a name.' },
    { id: 'old-theatre', kind: 'BIG', hood: 'downtown', cap: 1200, rent: 1800, deposit: 500, pa: .95, ages: ['ALL'], curfew: 1380, ac: true, sketch: 5, standing: [40, 70, 70],
      notice: 90, note: 'An old theatre for the biggest metal and hardcore nights. A local band gets it once a year at most.' },
    { id: 'campus-lot', kind: 'OUTDOOR', hood: 'university', cap: 150, rent: 15, pa: .4, curfew: 1290, sketch: 30, standing: [60, 55, 40],
      note: 'A park or a lot near the university. Fine in January, out of the question in July.' }
  ],

  contacts: ['phoenix', 'flagstaff-az', 'el-paso-tx'],

  calendar: [
    { id: 'winter-fair', label: 'the winter street fair', tag: 'fair', month: 12, week: 2, dows: [4, 5, 6], can: [.90, .88, .85], hoods: ['fourth-ave', 'downtown'], elsewhere: [1, .98, .98] },
    { id: 'spring-fair', label: 'the spring street fair', tag: 'fair', month: 3, week: 4, dows: [4, 5, 6], can: [.90, .88, .85], hoods: ['fourth-ave', 'downtown'], elsewhere: [1, .98, .98] },
    { id: 'gem-show', label: 'the gem show', tag: 'festival', month: 2, weeks: [1, 3], dows: [3, 4, 5, 6], can: [.92, .90, .90], hoods: ['downtown'], elsewhere: [.98, .96, .96] },
    { id: 'rodeo', label: 'the rodeo weekend and parade', tag: 'parade', month: 2, week: 3, dows: [4, 5, 6], can: [.95, .92, .90] },
    { id: 'procession', label: 'the Day of the Dead procession', tag: 'parade', month: 11, week: 1, dows: [5, 6], can: [.90, .88, .85], hoods: ['downtown', 'menlo'], elsewhere: [1, .97, .97] },
    { id: 'cycling-race', label: 'the cycling race', tag: 'race', month: 11, week: 3, dows: [5], can: [.95, .92, .92] },
    { id: 'football-9', label: 'home football', tag: 'game', month: 9, weeks: [1, 4], dows: [5], can: [.88, .95, .95], hoods: ['university'], elsewhere: [1, 1, 1] },
    { id: 'football-10', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [5], can: [.88, .95, .95], hoods: ['university'], elsewhere: [1, 1, 1] },
    { id: 'football-11', label: 'home football', tag: 'game', month: 11, weeks: [1, 4], dows: [5], can: [.88, .95, .95], hoods: ['university'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1320, weekend: 1320, inForce: false } },

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
      ] },

    { id: 'TUCSON_STREET_FAIR', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The street fair sets up on the avenue this weekend, and the parking runs out two blocks away.',
      title: 'Fair weekend on the avenue',
      body: 'The in-store set will fill the avenue with strangers. The bar next door wants the sidewalk, and your crowd has to park a long way off.',
      options: [
        { id: 'EARLY', label: 'Play early, before the fair crowd thickens', likely: 'The regulars get in. A short, quick set.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour early. The regulars were in and out before the lot filled.' },
        { id: 'ACCEPT', label: 'Run it and let the strangers wander in', likely: 'Some come in, some never find a space to park.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'REGULARS', pct: .02 }],
          result: 'A few fair-goers stayed for the second band. The regulars circled the block twice.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'TUCSON_GEM_SHOW_VAN', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival', months: [1, 2] },
      telegraph: 'Every motel lot in town is full for the gem show, and the touring van has no place to sleep.',
      title: 'No beds in town',
      body: 'The gem show has taken every motel and half the parking. The out-of-town band is circling with a van, and a Midtown house offers a living room floor if the show ends by ten.',
      options: [
        { id: 'FLOOR', label: 'Take the floor and end the show by ten', likely: 'A short night. The band is grateful.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'REGULARS', pct: .02 }],
          result: 'Done by ten, and the band slept in a living room. They said so on the way out of town.' },
        { id: 'PAY', label: 'Pay for a motel room an hour out', likely: 'Costs forty dollars. They make doors late.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'SHOW_MOD', key: 'lateMin', v: 45 }],
          result: 'The band drove in from the next town and loaded in late, but they loaded in.' },
        { id: 'ACCEPT', label: 'Let them sort it out themselves', likely: 'They play tired and leave early.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'They played hard and short, and the van was gone before the last song died.' }
      ] },

    { id: 'TUCSON_CURFEW_NIGHT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The all-ages crowd has parents who want the kids home by ten-thirty.',
      title: 'Home by midnight',
      body: 'A sixteen-year-old with a parent\'s SUV from the foothills has to be home by midnight, and the neighbors across the street are watching the all-ages door. The last band will play to half a room.',
      options: [
        { id: 'EARLY', label: 'Move the start up so the kids hear every band', likely: 'Everyone sees the whole bill. An early night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors early. The kids heard every band and made the curfew with minutes to spare.' },
        { id: 'ACCEPT', label: 'Run the bill as planned', likely: 'The last band loses the young half of the room.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The parents came at ten-thirty and the room emptied. The headliner played to the older heads.' }
      ] }
  ]
});
