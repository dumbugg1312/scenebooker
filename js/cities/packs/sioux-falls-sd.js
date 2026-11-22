SB.Cities.register('sioux-falls-sd', {
  v: 1,
  slug: 'sioux-falls-sd',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['augustana university', 'augustana', 'university of sioux falls', 'south dakota state university', 'sdsu', 'university of south dakota',
           'dakota state university', 'dordt university', 'dordt', 'mount marty university', 'mount marty', 'dakota wesleyan university', 'dakota wesleyan',
           'argus leader', 'wells fargo', 'citigroup', 'hy-vee', 'hy vee', 'casey\'s', 'kum & go', 'kum and go', 'taco john\'s', 'culver\'s', 'pizza ranch',
           'empire mall', 'plaza 41', 'sculpturewalk', 'first fridays', 'downtown riverfest', 'festival of bands', 'sioux empire spectacular',
           'party in the park', 'sioux empire fair', 'siouxpercon', 'sioux falls pride', 'summit league', 'ushl', 'sturgis rally', 'sturgis', 'tyson',
           'jefferson lines', 'sioux area metro', 'south dakota public broadcasting', 'corn palace', 'ellsworth', 'sioux falls regional airport',
           'the quartzite room', 'split rock hall', 'the packer\'s annex', 'packer\'s annex', 'skywalk basement', 'the falls overlook post',
           'falls overlook post', 'east bank dock door', 'terrace park shed', 'st. anselm\'s fellowship hall', 'minnehaha rec', 'the cold storage',
           'sod house social', 'the 41st street unit', 'slamdakota', 'slamdakota death fest', 'not just a phase fest', '605 revue', 'levitt at the falls', 'fridays on the plaza', 'sioux falls municipal band', 'w.h. lyon fairgrounds', 'lyon fairgrounds', 'hot summer nites', 'experience sioux falls', 'dakota news now', 'the dakota scout', 'pigeon605', 'pigeon 605', 'kikn', 'kkrc', 'kxrb', 'ksfy', 'dtsf', 'downtown sioux falls inc', 'sioux falls skyforce', 'sioux falls stampede', 'sioux falls police department', 'sioux falls canaries'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Colleges and events appear in game text only as generic words. */
  blocklist: ['argus leader*', 'augustana*', 'empire mall*', 'sculpturewalk*', 'sod house*', 'quartzite room*', 'split rock*', 'hy-vee*'],

  blurb: ['A flat, car-bound city where the next big stop is hours away. Shows take whatever room says yes that month.',
          'Winter decides what happens. Summer moves it into garages and yards, until the thunderstorm.'],
  hard: 'Weather, distance, and few all-ages rooms; Minneapolis and Omaha pull the bands.',
  region: 'the Plains',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 },
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.94 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Sioux Falls' },
    { id: 'brandon', kind: 'FEEDER', name: 'Brandon', minutes: 10, bearing: 90, pop: 11048, note: 'A growing suburb east on I-90; its kids come in for everything.' },
    { id: 'dell-rapids', kind: 'FEEDER', name: 'Dell Rapids', minutes: 25, bearing: 10, note: 'A small quarry town up the river valley.' },
    { id: 'canton', kind: 'FEEDER', name: 'Canton', minutes: 25, bearing: 185, pop: 3066, note: 'A small county seat to the south; no scene of its own.' },
    { id: 'luverne', kind: 'FEEDER', name: 'Luverne', state: 'MN', minutes: 30, bearing: 100, pop: 4946, note: 'A farm and county-seat town just over the Minnesota line.' },
    { id: 'madison', kind: 'FEEDER', name: 'Madison', minutes: 40, bearing: 320, pop: 6191, note: 'A small college town with a few kids who might start something.', bands: 1 },
    { id: 'brookings', kind: 'FEEDER', name: 'Brookings', minutes: 60, bearing: 5, pop: 23377, note: 'The big college-town feeder up I-29; students come south for bigger bills and go home for the summer.', bands: 3 },
    { id: 'vermillion', kind: 'FEEDER', name: 'Vermillion', minutes: 60, bearing: 205, pop: 11695, note: 'A state-college town to the southwest with a plausible small scene.', bands: 2 },
    { id: 'mitchell', kind: 'FEEDER', name: 'Mitchell', minutes: 60, bearing: 265, pop: 15660, note: 'Kids drive east on I-90 for bigger shows.' },
    { id: 'worthington', kind: 'FEEDER', name: 'Worthington', state: 'MN', minutes: 60, bearing: 100, pop: 13947, note: 'A pork-packing and immigrant town an hour east on I-90.' },
    { id: 'sioux-city', kind: 'PEER', name: 'Sioux City', state: 'IA', minutes: 85, bearing: 190, scene: 700, note: 'The smaller, slightly rougher sibling down I-29; the two trade bands.' },
    { id: 'mankato', kind: 'PEER', name: 'Mankato', state: 'MN', minutes: 165, bearing: 80, scene: 600, note: 'A college town to the east over the Minnesota line.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Phillips Avenue', route: 'downtown', note: 'The old brick core south of the falls: bars with stages, galleries, an arena, and rents climbing out of reach.' },
    { id: 'east-bank', name: 'the East Bank', route: 'work-side', note: 'The old packing-house strip by the river: warehouses and loading docks, turning into apartments.' },
    { id: 'cathedral', name: 'the Cathedral District', route: 'old-side', note: 'Old brick houses and parish halls east of downtown; quietly gentrifying, still room for a basement show.' },
    { id: 'mckennan', name: 'McKennan Park and Whittier', route: 'old-side', note: 'Older streets around the park with student and nurse rentals and long-time families.' },
    { id: 'campus', name: 'the campus areas', route: 'campus', note: 'Two small private colleges inside the city; student houses within a few blocks, a thin crowd.' },
    { id: '41st', name: '41st Street', route: 'work-side', note: 'The southwest retail belt: chain restaurants, strip malls and cheap commercial units that can hold a show.' },
    { id: 'suburbs', name: 'the south and east suburbs', route: 'campus', note: 'New subdivisions with finished basements and parents with cars; audience, not where shows start.' },
    { id: 'north-side', name: 'the north side', route: 'work-side', note: 'Working-class streets along the river near the pork plant; cheap and ignored, with garages and backyards.' }
  ],

  rooms: [
    { id: 'cathedral-basement', kind: 'HOUSE', hood: 'cathedral', cap: 40, curfew: 1350, ac: false, outdoor: false, start: true, note: 'A basement under an old brick house, door shut for the sound. It lives or dies by the neighbors and the 10:30 line.' },
    { id: 'north-garage', kind: 'HOUSE', hood: 'north-side', cap: 50, curfew: 1350, ac: false, outdoor: true, note: 'A garage and backyard on a working-class street. Summer nights, until the thunderstorm rolls in.' },
    { id: 'park-rental', kind: 'HOUSE', hood: 'mckennan', cap: 35, curfew: 1350, ac: false, outdoor: false, note: 'A student and nurse rental by the park. A small living-room night with a thin crowd, and a landlord who reads the lease.' },
    { id: 'record-shop', kind: 'SHOP', hood: 'downtown', cap: 50, curfew: 1320, ac: true, note: 'The record shop on Phillips Avenue. In-stores and small bills, over by ten.' },
    { id: 'phillips-bar', kind: 'BAR', hood: 'downtown', cap: 150, ages: ['A21'], curfew: 1590, ac: true, note: 'A bar with a stage that runs a free punk night on the first Friday. The doors are 21 and the night runs long.' },
    { id: 'metal-bar', kind: 'BAR', hood: '41st', cap: 300, ages: ['A21'], curfew: 1500, ac: true, note: 'A sports bar and billiards hall on 41st Street with an indoor room and a parking-lot stage. The local metal room, and nobody under 21 gets near it.' },
    { id: 'event-hall', kind: 'CLUB', hood: 'downtown', cap: 250, ages: ['A18'], curfew: 1470, ac: true, note: 'An event hall and lounge that books hardcore and metalcore. Eighteen and up, and the early all-ages slot is the one you want.' },
    { id: 'dock-room', kind: 'DIY', hood: 'east-bank', cap: 80, curfew: 1380, ac: false, needs: ['VOUCH'], note: 'A loading-dock room in an old packing building by the river. It lasts until the building is sold.' },
    { id: 'strip-unit', kind: 'DIY', hood: '41st', cap: 60, curfew: 1350, ac: false, needs: ['VOUCH'], note: 'A rented strip-mall unit between leases. Cheap, with a landlord and the fire code to worry about.' },
    { id: 'parish-hall', kind: 'HALL', hood: 'cathedral', cap: 120, curfew: 1320, ac: true, note: 'A parish hall rented by the night. All ages, no beer, and it needs a sponsor.' },
    { id: 'river-pavilion', kind: 'OUTDOOR', hood: 'north-side', cap: 100, curfew: 1290, note: 'A pavilion by the river trail. Summer only, with daylight and the weather as the rules.' },
    { id: 'arena', kind: 'BIG', hood: 'downtown', cap: 700, curfew: 1380, ac: true, note: 'The arena and the large hall. Touring bills pass through, and a local bill never fills it.' }
  ],

  contacts: ['omaha', 'fargo-nd', 'minneapolis', 'lincoln-ne', 'des-moines-ia'],

  calendar: [
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 8, week: 1, dows: [1, 2, 3, 4, 5, 6], can: [.88, .85, .85] },
    { id: 'river-festival', label: 'the river festival', tag: 'festival', month: 9, week: 3, dows: [5], can: [.90, .85, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'metal-festival', label: 'the extreme-metal festival', tag: 'festival', month: 7, week: 2, dows: [5], can: [1.05, 1.10, 1.05], hoods: ['41st'], elsewhere: [.95, .95, .95] },
    { id: 'home-music-day', label: 'the home-grown music day', tag: 'festival', month: 7, week: 3, dows: [5], can: [.95, .92, .92], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.88, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.88, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1350, curfewMinors: { weeknight: 1380, weekend: 1380, inForce: false } },

  points: [
    { name: 'Sioux City', state: 'IA', lat: 42.5, lon: -96.4, pop: 85800 },
    { name: 'Rapid City', state: 'SD', lat: 44.08, lon: -103.23, pop: 74000 },
    { name: 'Fargo', state: 'ND', lat: 46.88, lon: -96.79, pop: 126000 },
    { name: 'Mitchell', state: 'SD', lat: 43.71, lon: -98.03, pop: 15700 }
  ],
  roads: ['I-90', 'I-29', 'I-229', '41st Street', 'US 81'],

  words: {
    street: ['Phillips Avenue', '41st Street', '12th Street', 'Minnesota Avenue'],
    water: ['the Big Sioux', 'the Falls', 'the river trail'],
    hood: ['the East Bank', 'the Cathedral District', 'McKennan Park', 'Whittier', 'Pettigrew Heights', 'Brandon'],
    thing: ['chislic', 'kuchen', 'block heater', 'church basement', 'Morton building', 'pork tenderloin', 'fry bread', 'blizzard warning', 'gas-station pizza', 'campus room'],
    weather: ['blizzard', 'ground blizzard', 'tornado warning']
  },

  events: [
    { id: 'SIOUX_FALLS_SD_LOT_STORM', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [6, 7, 8], weather: 'RAIN' },
      telegraph: 'A line of thunderstorms is marching across the plains toward the festival weekend.',
      title: 'The parking-lot stage loses its power',
      body: 'A storm has knocked out the generator on the parking-lot stage. The bar says the bands can play inside, but the under-21 crowd cannot follow them through the door.',
      options: [
        { id: 'INSIDE', label: 'Move the bands inside and lose the kids', likely: 'Fewer people, but the music goes on.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The bands crammed into the bar. The kids stood out in the rain and went home.' },
        { id: 'WAIT', label: 'Wait out the storm', likely: 'A late start. The crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The power came back near ten. Half the crowd was still there.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' }
      ] },

    { id: 'SIOUX_FALLS_SD_FAIR_CURFEW', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The county fair is in town, and it has its own curfew for kids 17 and under.',
      title: 'The fair takes the kids',
      body: 'Fair week has its own curfew for anyone 17 and under, and the late show is the one thing the kids on your list cannot get to.',
      options: [
        { id: 'EARLY', label: 'Start early so the kids can get in and out', likely: 'Most of them make it. A short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .92 }],
          result: 'Doors early and done by the curfew. The kids went home on time.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The kids stay away.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The fair kept the kids. The regulars over eighteen came.' }
      ] },

    { id: 'SIOUX_FALLS_SD_BLIZZARD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [11, 12, 1, 2, 3] },
      telegraph: 'A blizzard warning is up for the whole eastern half of the state.',
      title: 'The interstate is shut',
      body: 'A blizzard warning has closed I-29 the afternoon the Twin Cities band is due. The opener is here and the headliner is stuck in a drift.',
      options: [
        { id: 'LONG', label: 'Let the opener play a long set', likely: 'A thin night, but the ones who came are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The opener played all night to a half-full room. Nobody minded.' },
        { id: 'WAIT', label: 'Hold the doors for the van', likely: 'A late start. The crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The van dug in at ten. You started late and nobody left.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' }
      ] }
  ]
});
