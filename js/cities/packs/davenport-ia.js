SB.Cities.register('davenport-ia', {
  v: 1,
  slug: 'davenport-ia',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  /* The dossier's real institutions and its invented venue names are in banned: research, not content. */
  banned: ['little village', 'little village magazine', 'qc reader', 'rcreader', 'river cities reader', 'quadcities.com', 'wqad', 'wvik', 'iowa public radio', 'us 104.9', 'b100', 'quad cities chamber', 'visit quad cities', 'bix jazz festival', 'bix mix', 'rhythm city casino', 'rhythm city', 'icestravaganza', 'red white and boom', 'festival of trees', 'rivercenter', 'mississippi valley fairgrounds', 'greater quad cities renaissance faire', 'quad-city symphony', 'riverfront pops', 'big 9', 'k-square', 'alternating currents', 'motor row', 'whoradio', 'tradeshowz', 'songkick', 'rock island arsenal', 'arsenal', 'john deere', 'deere', 'hy-vee', 'von maur', 'lee enterprises', 'happy joe\'s', 'st. ambrose university', 'st. ambrose',
           'palmer college', 'augustana college', 'black hawk college', 'western illinois university', 'university of iowa', 'hawkeyes', 'hawkeye',
           'iowa hawkeyes', 'quad city river bandits', 'river bandits', 'bix beiderbecke', 'bix 7', 'bix', 'great mississippi valley fair',
           'mississippi valley blues festival', 'river roots live', 'american legion', 'vfw', 'the levee room', 'locks and dam social club',
           'hamburg hardware basement', 'post 4417', 'the floodplain', 'duck creek mill room', 'kimberly road roller rink annex', 'the pearl button annex',
           'bridge approach', 'north park loading dock', 'credit island boathouse', 'st. boniface parish hall', 'quad city times', 'quad-city times'],
  blocklist: ['hy-vee*', 'von maur*', 'happy joe*', 'river roots*', 'levee room*', 'floodplain*'],

  blurb: ['Two banks of the river share one small crowd. Shows are in bar rooms and reunions, with a few old lifers and a few kids.',
          'Metal packs the big rooms and punk lives on label nights, and the old basement days live mostly in memory.'],
  hard: 'Rooms come and go, and the best crowds split across the river.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 },
    { name: 'Des Moines', state: 'IA', lat: 41.59, lon: -93.62 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'metal', d: .07, reason: 'Metalcore and hardcore-metal bills fill the big rooms and draw the kids.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Davenport' },
    { id: 'bettendorf', kind: 'FEEDER', name: 'Bettendorf', minutes: 10, bearing: 80, note: 'The richer suburb next door with a big high school and little DIY.' },
    { id: 'walcott', kind: 'FEEDER', name: 'Wilton and Walcott', minutes: 20, bearing: 285, note: 'A farm town and a truck-stop town along the interstate.' },
    { id: 'muscatine', kind: 'FEEDER', name: 'Muscatine', minutes: 30, bearing: 250, pop: 23000, note: 'A factory and food-processing river town with a small scene on and off.' },
    { id: 'dewitt', kind: 'FEEDER', name: 'DeWitt', minutes: 30, bearing: 30, note: 'Farm and commuter town up US 61.' },
    { id: 'geneseo', kind: 'FEEDER', name: 'Geneseo', state: 'IL', minutes: 30, bearing: 100, note: 'A commuter-farm town whose high school supplies bands.', bands: 1 },
    { id: 'clinton', kind: 'FEEDER', name: 'Clinton', minutes: 50, bearing: 40, pop: 24000, note: 'A struggling river and industry town; the shows are small.' },
    { id: 'maquoketa', kind: 'FEEDER', name: 'Maquoketa', minutes: 55, bearing: 15, note: 'A small farm town up US 61.' },
    { id: 'galesburg', kind: 'FEEDER', name: 'Galesburg', state: 'IL', minutes: 60, bearing: 150, pop: 30000, note: 'A railroad and college town with a small scene.', bands: 1 },
    { id: 'iowa-city', kind: 'PEER', name: 'Iowa City', minutes: 50, bearing: 275, slug: 'iowa-city-ia', note: 'Smaller, but the better-known scene; it steals both crowds and tours.' },
    { id: 'cedar-rapids', kind: 'PEER', name: 'Cedar Rapids', minutes: 75, bearing: 300, slug: 'cedar-rapids-ia', note: 'Slightly larger; bands and crowds trade both ways.' },
    { id: 'peoria', kind: 'PEER', name: 'Peoria', state: 'IL', minutes: 105, bearing: 135, slug: 'peoria-il', note: 'A similar river and industry town down I-74.' },
    { id: 'rockford', kind: 'PEER', name: 'Rockford', state: 'IL', minutes: 120, bearing: 80, slug: 'rockford-il', note: 'Slightly bigger with a similar working-class identity.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the riverfront', route: 'downtown', note: 'Old brick blocks with bars below and apartments above; quiet on weeknights, and the river is the threat.' },
    { id: 'hamburg', name: 'Hamburg and the hill', route: 'old-side', note: 'The old German district: big brick houses cut into apartments, church halls and basements.' },
    { id: 'east-end', name: 'East Davenport and the east end', route: 'old-side', note: 'A charming river strip and tidy homes. Priced up and noise-averse; shows here are one-offs.' },
    { id: 'central', name: 'Central and the park district', route: 'old-side', note: 'Large old houses, some grand and some tired, around a big park. Cheap in places.' },
    { id: 'west-end', name: 'the West End', route: 'work-side', note: 'Warehouses, taverns and small houses with big yards and basements. Cheap and ignored, which is why it works.' },
    { id: 'kimberly', name: 'Northwest and Kimberly Road', route: 'campus', note: 'Malls, big boxes and subdivisions: suburban kids, skate parks and pizza-place back rooms.' },
    { id: 'north-davenport', name: 'North Davenport and Duck Creek', route: 'work-side', note: 'Plants, rail and light industry; practice spaces in old buildings.' },
    { id: 'across-river', name: 'Rock Island and Moline', route: 'downtown', note: 'The Illinois bank, with its own bar districts and rules; many shows land here.' }
  ],

  rooms: [
    { id: 'hamburg-basement', kind: 'HOUSE', hood: 'hamburg', cap: 50, curfew: 1320, ac: false, start: true, note: 'A basement in one of the big brick houses on the hill. It lives by word of mouth and one noise complaint.' },
    { id: 'west-end-yard', kind: 'HOUSE', hood: 'west-end', cap: 60, curfew: 1320, ac: false, outdoor: true, note: 'A backyard and garage with a big lot. Cheap and ignored until a neighbor calls.' },
    { id: 'arts-room', kind: 'DIY', hood: 'across-river', cap: 120, curfew: 1380, pressure: 55, note: 'A small arts room across the river with a gallery wall and a coffee counter. All-ages bills, and the money is thin.' },
    { id: 'side-garage', kind: 'DIY', hood: 'across-river', cap: 40, curfew: 1320, pressure: 55, note: 'A home garage on a side street, used for poetry and comedy more than punk. A loud night works only if the block lets it.' },
    { id: 'parish-hall', kind: 'HALL', hood: 'north-davenport', cap: 150, curfew: 1320, ac: true, note: 'A rented parish hall near the plants for a one-off all-ages bill. The deposit is the risk.' },
    { id: 'skate-pavilion', kind: 'OUTDOOR', hood: 'kimberly', cap: 100, curfew: 1260, note: 'A skate park and pavilion afternoon bill that ends at dusk.' },
    { id: 'river-bar', kind: 'BAR', hood: 'downtown', cap: 150, ages: ['A21'], curfew: 1500, ac: true, note: 'A downtown bar with a back stage. Stages here are fragile, and one vanished when the owner changed.' },
    { id: 'ground-floor-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['ALL'], curfew: 1380, ac: true, houseCosts: 150, note: 'A nonprofit-run music room that moved down to the ground floor and got a bigger stage. Metal fests and all-ages punk nights, with an adult needed under nineteen.' },
    { id: 'firehouse-room', kind: 'CLUB', hood: 'downtown', cap: 250, ages: ['A21'], curfew: 1440, ac: true, note: 'A restored firehouse turned bar and live room. New, polished and bar first.' },
    { id: 'island-club', kind: 'CLUB', hood: 'across-river', cap: 300, ages: ['A21'], curfew: 1530, ac: true, note: 'A rebuilt bar and stage in downtown Rock Island, reopened after the old one closed. Twenty-one and over, until the license changes.' },
    { id: 'old-theatre', kind: 'BIG', hood: 'downtown', cap: 2500, curfew: 1380, ac: true, note: 'An old theatre that books punk legends and metalcore packages. Ticketed, and nobody starts here.' }
  ],

  contacts: ['iowa-city-ia', 'cedar-rapids-ia', 'peoria-il', 'rockford-il', 'des-moines-ia'],

  calendar: [
    { id: 'fair', label: 'the fair', tag: 'fair', month: 8, weeks: [1, 2], dows: [3, 4, 5, 6], can: [.90, .90, .88] },
    { id: 'jazz-fest', label: 'the summer jazz festival', tag: 'festival', month: 7, weeks: [4, 5], dows: [3, 4, 5], can: [.90, .88, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'road-race', label: 'the downtown road race weekend', tag: 'race', month: 7, week: 4, dows: [4, 5], can: [.88, .85, .85], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'winter-fest', label: 'the winter festival', tag: 'festival', month: 1, week: 3, dows: [4, 5, 6], can: [.92, .92, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1440, inForce: false } },

  points: [
    { name: 'Des Moines', state: 'IA', lat: 41.59, lon: -93.62, pop: 214000 },
    { name: 'Dubuque', state: 'IA', lat: 42.5, lon: -90.66, pop: 59000 },
    { name: 'Madison', state: 'WI', lat: 43.07, lon: -89.4, pop: 270000 },
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93, pop: 485000 }
  ],
  roads: ['I-80', 'I-74', 'I-280', 'US 61', 'US 67', 'Locust Street'],

  words: {
    street: ['Brady Street', 'Locust Street', 'Kimberly Road', 'Rockingham Road', 'Harrison Street', 'Division Street'],
    water: ['the Mississippi', 'Duck Creek', 'Credit Island'],
    hood: ['Hamburg', 'East Davenport', 'the West End', 'Fairmount', 'North Park', 'Rock Island', 'Moline', 'Bettendorf', 'Le Claire'],
    thing: ['tenderloin', 'loose meat', 'barge', 'lock and dam', 'foursquare', 'tow boat', 'grain elevator', 'arts bar', 'crowd-funding drive', 'barn show'],
    weather: ['river stage', 'tornado siren', 'wind chill']
  },

  events: [
    { id: 'DAVENPORT_IA_FAIR_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], calendar: 'fair' },
      telegraph: 'Fair week has Locust Street backed up and the carnival lights on.',
      title: 'The carnival has the crowd',
      body: 'Grandstand traffic backs up Locust Street and the whole town is out at the fairgrounds, so the West End yard stays half empty until the last night.',
      options: [
        { id: 'LATE', label: 'Start after the grandstand lets out', likely: 'The fair crowd drifts over, full of fried food.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 75 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.95 }],
          result: 'You opened doors late, and the carnival crowd came in smelling of funnel cake.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the fair.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.75 }],
          result: 'Half the list was on the Ferris wheel, and the regulars came.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and the bands trust you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'DAVENPORT_IA_ACROSS_RIVER_AGES', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The Iowa side ends at eleven, and the Illinois side runs until the bars close.',
      title: 'Pick a bank',
      body: 'The all-ages show on one bank ends at eleven, and the twenty-one-and-over room across the bridge runs late, so the kids have to pick one before the headliner.',
      options: [
        { id: 'EARLY', label: 'Put the kids first and play early', likely: 'The bill is short, and the kids are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }],
          result: 'You opened doors early and finished by ten, and the kids got the whole bill.' },
        { id: 'ACCEPT', label: 'Let the headliner play late to the bar crowd', likely: 'The kids leave before the best set.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The headliner played to the bar crowd that stayed, and the kids watched the door.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and the bands trust you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day and lost a few people.' }
      ] },

    { id: 'DAVENPORT_IA_FLOOD_WATCH', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [3, 4, 5, 6] },
      telegraph: 'The river is climbing and the sump pumps are running.',
      title: 'The river is up',
      body: 'A basement on the hill is taking water. The sump pump runs under the first band, and the crowd has to wade out between songs.',
      options: [
        { id: 'PUMP', label: 'Run the show and keep the pump going', likely: 'It\'s a loud night, with wet shoes.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The pump ran all night and the floor was a puddle, and nobody left.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and the bands trust you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the river went down and the room dried out.' },
        { id: 'HALL', label: 'Move the whole bill to a hall', likely: 'It\'s higher ground, and it costs a deposit.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: 0.8 }],
          result: 'A parish hall took the bill with an hour to spare.' }
      ] }
  ]
});
