SB.Cities.register('bozeman-mt', {
  v: 1,
  slug: 'bozeman-mt',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['bobcat stadium', 'brick breeden fieldhouse', 'lindley park', 'big sky country state fair', 'gallatin county fairgrounds', 'bozeman stampede', 'bozeman roundup', 'valley view rodeo', 'bozeman daily chronicle', 'bozeman magazine', 'explore big sky', 'kbzk', 'nbc montana', 'visit bozeman', 'downtown bozeman partnership', 'emo nite', 'warped tour', 'vans warped tour', 'montana state university', 'msu', 'msu bozeman', 'bobcats', 'university of montana', 'grizzlies', 'cat-griz', 'cat griz',
           'sweet pea festival', 'bridger bowl', 'big sky resort', 'yellowstone club', 'gallatin valley mall', 'bozeman health',
           'downtown holiday stroll', 'gallatin county fair', 'the quonset annex', 'quonset annex', 'sourdough hall', 'kagy street basement',
           'the feed store back room', 'lehrkind', 'lehrkind lot', 'the four corners shop', 'cottonwood grange', 'the rail spur',
           'the haybarn at nine mile', 'haybarn at nine mile', 'pass road garage', 'the elevator loft', 'elevator loft', 'the hyalite pavilion',
           'hyalite pavilion'],
  /* The dossier's invented venue names are banned too: research, not content, unchecked. The university appears only as 'the university'. */
  blocklist: ['montana state*', 'sweet pea*', 'bridger bowl*', 'cat-griz*', 'sourdough hall*', 'lehrkind*'],

  blurb: ['A mountain-valley college town in southwest Montana, where bands can play home a few times before it dries up, so the road is part of the job.',
          'A few organizers keep all-ages shows alive, and a DIY weekend is the high point of the year.'],
  hard: 'Small crowd that tires fast, and few rooms that take under-21s.',
  region: 'Big Sky country',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Missoula', state: 'MT', lat: 46.87, lon: -113.99 },
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Bozeman' },
    { id: 'gallatin-gateway', kind: 'FEEDER', name: 'Gallatin Gateway', minutes: 15, bearing: 200, note: 'Tiny and rural, on the road to the canyon.' },
    { id: 'belgrade', kind: 'FEEDER', name: 'Belgrade', minutes: 15, bearing: 285, pop: 10000, note: 'The airport suburb and affordable bolt-hole, with a small garage scene.' },
    { id: 'manhattan', kind: 'FEEDER', name: 'Manhattan', minutes: 25, bearing: 280, pop: 2000, note: 'A farm town whose kids come to Bozeman.' },
    { id: 'livingston', kind: 'FEEDER', name: 'Livingston', minutes: 30, bearing: 95, pop: 8000, note: 'A railroad town turned arts and fly-fishing town over the pass, with a small artsy scene.' },
    { id: 'three-forks', kind: 'FEEDER', name: 'Three Forks', minutes: 35, bearing: 265, pop: 2000, note: 'A farm and cement town near the river headwaters.' },
    { id: 'wilsall', kind: 'FEEDER', name: 'Wilsall and Clyde Park', minutes: 40, bearing: 45, note: 'Ranching villages up the north roads.' },
    { id: 'big-sky', kind: 'FEEDER', name: 'Big Sky', minutes: 50, bearing: 190, note: 'A ski resort town of seasonal workers; the canyon road is a winter hazard.', season: { months: [12, 1, 2, 3], mul: 1.6 } },
    { id: 'ennis', kind: 'FEEDER', name: 'Ennis', minutes: 60, bearing: 235, pop: 1000, note: 'A fishing and ranching town over Norris Hill.' },
    { id: 'whitehall', kind: 'FEEDER', name: 'Whitehall', minutes: 60, bearing: 255, note: 'A small mining and ranching town west on I-90.' },
    { id: 'west-yellowstone', kind: 'FEEDER', name: 'West Yellowstone', minutes: 90, bearing: 180, note: 'A tourist gateway, very quiet in winter.' },
    { id: 'butte', kind: 'PEER', name: 'Butte', state: 'MT', minutes: 75, bearing: 255, scene: 500, note: 'A scruffy old mining town with cheap space and a tough identity; a real punk peer.' },
    { id: 'helena', kind: 'PEER', name: 'Helena', state: 'MT', minutes: 90, bearing: 330, scene: 350, note: 'A government town with its own small scene.' },
    { id: 'billings', kind: 'PEER', name: 'Billings', state: 'MT', minutes: 120, bearing: 90, scene: 700, note: 'The state\'s biggest city; bands coming from the east hit it first.' },
    { id: 'missoula', kind: 'PEER', name: 'Missoula', state: 'MT', minutes: 180, bearing: 285, slug: 'missoula-mt', note: 'The cooler, more bohemian college-town sibling, and a rival.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Main Street', route: 'downtown', note: 'Historic brick, now bars, outfitters and galleries. Liquor law and rent are hardest on all-ages shows.' },
    { id: 'southside', name: 'the university district and the Southside', route: 'campus', note: 'Old houses cut into student rentals; the likeliest place for house shows, with landlord and neighbor risk.' },
    { id: 'northeast', name: 'Northeast Bozeman', route: 'work-side', note: 'The old working-class rail and mill side, once cheap and ignored, now heating up. Garages, shops and warehouses.' },
    { id: 'west-side', name: 'the west side and Huffine Lane', route: 'work-side', note: 'Big-box stores, apartments and subdivisions with mini-storage practice rooms and strip-mall units.' },
    { id: 'four-corners', name: 'Four Corners', route: 'old-side', note: 'An unincorporated crossroads west of town with cheaper land and different rules; barns and yards.' },
    { id: 'belgrade', name: 'Belgrade', route: 'old-side', note: 'The affordable suburb out by the airport, with lower rent, garages and shops.' },
    { id: 'south-valley', name: 'south toward Gallatin Gateway', route: 'campus', note: 'Acreage, barns and second homes with few neighbors; the audience has to drive.' }
  ],

  rooms: [
    { id: 'southside-house', kind: 'HOUSE', hood: 'southside', cap: 40, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 50, start: true, note: 'An old student rental with a porch and a cold basement. The tenants turn over every year and the neighbors do not.' },
    { id: 'union-hall', kind: 'DIY', hood: 'downtown', cap: 150, curfew: 1380, ac: false, sketch: 35, standing: [60, 60, 55],
      pressure: 50, note: 'An all-ages union hall that runs punk and benefit nights. The door money goes to keeping an aging building standing.' },
    { id: 'lodge-hall', kind: 'HALL', hood: 'downtown', cap: 200, rent: 180, deposit: 75, pa: .6, curfew: 1350, ac: true, sketch: 10, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'A fraternal hall rented one night at a time. A gatekeeper with a list of rules and a key.' },
    { id: 'rail-shop', kind: 'SHOP', hood: 'northeast', cap: 60, curfew: 1320, ac: false, sketch: 10, standing: [65, 65, 70],
      note: 'An oversized shop on the old rail side, good for a day show. Rent and redevelopment are coming for it.' },
    { id: 'barn-yard', kind: 'OUTDOOR', hood: 'four-corners', cap: 80, rent: 15, pa: .4, curfew: 1290, outdoor: true, sketch: 30, standing: [60, 55, 40],
      pressure: 45, note: 'A yard and barn outside city limits. Everyone has to drive, and a late-summer fire ban can cancel the weekend.' },
    { id: 'main-bar', kind: 'BAR', hood: 'downtown', cap: 120, soundFee: 50, pa: .7, ages: ['A21'], curfew: 1500, ac: true, following: .3, sketch: 20,
      standing: [50, 65, 70], note: 'A small bar that mixes punk with standup. Its own schedule always comes first.' },
    { id: 'music-hall', kind: 'CLUB', hood: 'downtown', cap: 300, houseCosts: 150, split: .8, pa: .9, ages: ['A18'], curfew: 1440, ac: true, following: .5, sketch: 10,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A historic downtown music hall that sat dark for years and is news again. The promoter sets the age.' },
    { id: 'fieldhouse', kind: 'BIG', hood: 'southside', cap: 1500, rent: 2200, deposit: 500, pa: .95, curfew: 1350, ac: true, sketch: 5, standing: [40, 70, 75],
      owner: 'TALENT_BUYER', notice: 84, needs: ['FULL_BILL'], note: 'The campus fieldhouse for touring bills. The college calendar controls every date.' },
    { id: 'belgrade-garage', kind: 'OUTDOOR', hood: 'belgrade', cap: 60, rent: 10, pa: .4, curfew: 1290, outdoor: true, sketch: 35, standing: [60, 55, 40],
      pressure: 45, note: 'A garage and skatepark benefit out by the airport. Fun, loud and far from the Bozeman crowd.' }
  ],

  contacts: ['missoula-mt', 'ogden-ut', 'boise-id'],

  calendar: [
    { id: 'arts-weekend', label: 'the arts festival weekend', tag: 'festival', month: 8, week: 1, dows: [4, 5, 6], can: [.85, .85, .80], hoods: ['downtown'], elsewhere: [.95, .95, .95] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 7, week: 3, dows: [3, 4, 5, 6], can: [.92, .90, .90] },
    { id: 'pro-rodeo', label: 'the pro rodeo', tag: 'fair', month: 8, week: 1, dows: [3, 4, 5], can: [.92, .90, .90] },
    { id: 'homecoming', label: 'homecoming', tag: 'game', month: 9, week: 4, dows: [4, 5], can: [.85, .85, .85], hoods: ['southside', 'downtown'], elsewhere: [.95, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 3], dows: [5], can: [.85, .95, .95], hoods: ['southside', 'downtown'], elsewhere: [1, 1, 1] },
    { id: 'rivalry', label: 'the rivalry game', tag: 'game', month: 11, week: 3, dows: [5], can: [.70, .80, .80] },
    { id: 'graduation', label: 'graduation weekend', tag: 'graduation', month: 5, weeks: [1, 2], dows: [4, 5], can: [.85, .90, .90] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Billings', state: 'MT', lat: 45.78, lon: -108.5, pop: 110000 },
    { name: 'Butte', state: 'MT', lat: 46.0, lon: -112.53, pop: 35000 },
    { name: 'Helena', state: 'MT', lat: 46.59, lon: -112.04, pop: 33000 },
    { name: 'Idaho Falls', state: 'ID', lat: 43.49, lon: -112.03, pop: 65000 },
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89, pop: 1200000 },
    { name: 'Fargo', state: 'ND', lat: 46.88, lon: -96.79, pop: 125000 }
  ],
  roads: ['I-90', 'US 191', 'MT 84', 'I-15', 'Bozeman Pass', 'Homestake Pass'],

  words: {
    street: ['Main Street', '19th Avenue', 'Huffine Lane', 'Kagy Boulevard', 'US 191', 'I-90'],
    water: ['the Gallatin', 'Bozeman Creek', 'Hyalite Canyon'],
    hood: ['Northeast Bozeman', 'the Southside', 'Four Corners', 'Gallatin Gateway', 'Belgrade', 'Bridger Canyon'],
    thing: ['snowpack', 'avalanche', 'fly shop', 'Subaru', 'woodstove', 'quonset hut', 'trailhead', 'barn', 'ski season', 'diy weekend'],
    weather: ['pass closure', 'powder day', 'wildfire smoke', 'early blizzard']
  },

  events: [
    { id: 'BOZEMAN_MT_RIVALRY_NOON', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: "The big game is Saturday at noon, and every bar on Main Street is already planning for it.",
      title: "Everybody is at the game",
      body: "The whole student crowd is at the tailgates or the stadium, the bars are full by noon, and the all-ages hall has an empty night ahead of it.",
      options: [
        { id: 'LATE', label: "Push doors back until the game crowd winds down", likely: "The ones who want a night out come late.",
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.95 }],
          result: "Doors an hour late. The crowd drifted in from the bars loud and happy." },
        { id: 'ACCEPT', label: "Run it as planned", likely: "The casual crowd is at the game.",
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.75 }],
          result: "Half the town was at the game. The regulars came." },
        { id: 'MOVE', label: "Move it a day", likely: "Breaks the date. Costs trust with the bands.",
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: "You moved it a day. Not everyone could make the new one." }
      ] },

    { id: 'BOZEMAN_MT_ARTS_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'festival' },
      telegraph: "A free three-day festival takes the park and the parking this weekend.",
      title: "A free show in the park",
      body: "The festival has the park, the parking and every hotel room. Your show is up against a free three-day event with a crowd of thousands.",
      options: [
        { id: 'EARLY', label: "Play early, before the park lets out", likely: "A short set for the ones who skipped the lawn.",
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }],
          result: "Doors early. The ones who came wanted something louder than the park." },
        { id: 'ACCEPT', label: "Run it and take what you get", likely: "The park wins.",
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.75 }],
          result: "The park won the night. A small, loyal room." },
        { id: 'PARK', label: "Move it outdoors to a yard", likely: "Smaller and cheaper, with no one to answer to.",
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'OUTDOOR', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: "A yard out on the edge of town took the bill, and the festival kids found it." }
      ] },

    { id: 'BOZEMAN_MT_PASS_CLOSED', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [11, 12, 1, 2, 3] },
      telegraph: "Snow is stacking up on the pass, and the road west is down to one lane.",
      title: "The pass is closed",
      body: "A late-winter pass closure has the touring van stuck on the mountain road west of town. The show can go on with the local bands, if you let it.",
      options: [
        { id: 'LOCAL', label: "Run it with local bands only", likely: "A thin night, but a warm one.",
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: "Locals only and a long, loose night. The room was half full and warm." },
        { id: 'WAIT', label: "Hold the doors and wait for the van", likely: "A late start. The crowd gets restless.",
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }],
          result: "The van limped in at ten. You started late and nobody left." },
        { id: 'MOVE', label: "Move it a day", likely: "Breaks the date. Costs trust with the bands.",
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: "You moved it a day. Not everyone could make the new one." }
      ] }
  ]
});
