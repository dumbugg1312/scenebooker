SB.Cities.register('kennewick-wa', {
  v: 1,
  slug: 'kennewick-wa',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['hanford', 'hanford site', 'pacific northwest national laboratory', 'tri-city herald', 'tri city herald', 'kndu', 'kepr', 'northwest public radio',
           'ben franklin transit', 'tri-city americans', 'toyota center', 'columbia basin college', 'washington state university', 'wsu', 'tri-cities campus',
           'columbia center mall', 'vista field', 'taco time', 'amtrak', 'empire builder', 'water follies', 'hydroplane races', 'unlimited hydroplane',
           'benton franklin fair', 'kennewick man', 'uber', 'mount st. helens',
           'tri-city dust devils', 'tri-cities water follies', 'apollo columbia cup', 'over the river air show', 'stcu', 'cool desert nights', 'allied arts show',
           'hogs and dogs', 'pasco flea market', 'fiery foods festival', 'savor the flavor', 'radcon', 'tri-cities pride', 'benton county fairgrounds', 'richland high',
           'hanford high', 'kamiakin', 'kennewick high', 'southridge high', 'chiawana', 'pasco high', 'visit tri-cities', 'tri-cities business news', 'uptown richland',
           'jambase', 'bandsintown',
           'sagebrush grange hall', 'the blue span annex', 'blue span annex', 'ninth avenue carport', 'irrigation ditch room', 'basalt records & repair',
           'basalt records', 'the net shed', 'ridge road pole barn', 'desert rose roller rink', 'columbia dry dock hall', 'the wye room',
           'lamplight mattress outlet', 'fairgrounds building c'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The nuclear site is written only as 'the site' or 'the cleanup'. */
  blocklist: ['hanford*', 'tri-city herald*', 'tri-city americans*', 'taco time*', 'columbia basin college*', 'water follies*', 'northwest public radio*', 'kennewick man*'],

  blurb: ['The biggest of three river cities where the Columbia, Snake and Yakima meet, all wide arterials, hot wind and steady contractor paychecks from the nuclear cleanup.',
          'Every show is a ride problem. Summer heat and wind push things into garages, halls and backyards, and the river bridges are the real border.'],
  hard: 'Off every tour route, and nobody gets to a show without a ride.',
  region: 'the Northwest',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Spokane', state: 'WA', lat: 47.66, lon: -117.43 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Boise', state: 'ID', lat: 43.62, lon: -116.2 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Kennewick' },
    { id: 'pasco', kind: 'FEEDER', name: 'Pasco', minutes: 10, bearing: 20, scene: 60, note: 'Across the river: young, mostly Latino and growing, with cheaper warehouse space.',
      rooms: [
        { id: 'pasco-yard', kind: 'HOUSE', hood: 'pasco-town', zone: 'pasco', cap: 50, curfew: 1350, ac: false, outdoor: true, pressure: 45,
          note: 'A backyard and a shed across the river, good from May to September. A hundred-degree afternoon or a wind gust wrecks it.' }
      ] },
    { id: 'richland', kind: 'FEEDER', name: 'Richland', minutes: 10, bearing: 310, scene: 70, note: 'The orderly, affluent third city with a branch campus and a skatepark.',
      rooms: [
        { id: 'uptown-club', kind: 'BAR', hood: 'richland-town', zone: 'richland', cap: 250, ages: ['ALL', 'A21'], curfew: 1440, pressure: 60,
          note: 'The revived underground club that takes most of the heavy shows. All-ages nights came late, by request, and a lease fight shut it once.' },
        { id: 'uptown-lounge', kind: 'CLUB', hood: 'richland-town', zone: 'richland', cap: 200, ages: ['A21'], curfew: 1500,
          note: 'A bar and lounge with a stage that takes the odd heavy night. Nobody is sure the crowd fits.' },
        { id: 'skatepark', kind: 'OUTDOOR', hood: 'richland-town', zone: 'richland', cap: 100, curfew: 1230,
          note: 'The skatepark and a generator, daytime only. The wind and the hundred-degree afternoons set the hours.' }
      ] },
    { id: 'west-richland', kind: 'FEEDER', name: 'West Richland', minutes: 15, bearing: 295, note: 'A commuter suburb of Richland with no scene of its own.' },
    { id: 'benton-city', kind: 'FEEDER', name: 'Benton City', minutes: 25, bearing: 295, note: 'A small farm and wine town up the Yakima; a few kids drive in.' },
    { id: 'prosser', kind: 'FEEDER', name: 'Prosser', minutes: 35, bearing: 270, note: 'An agricultural county seat; a handful of kids and one or two garages.' },
    { id: 'hermiston', kind: 'FEEDER', name: 'Hermiston', state: 'OR', minutes: 35, bearing: 185, note: 'A farm and logistics town across the river in Oregon; its kids cross for a bigger show.' },
    { id: 'sunnyside', kind: 'FEEDER', name: 'Sunnyside and Grandview', minutes: 50, bearing: 275, note: 'Young, mostly Latino farm towns down I-82.' },
    { id: 'othello', kind: 'FEEDER', name: 'Othello', minutes: 50, bearing: 5, note: 'A young potato-processing town to the north.' },
    { id: 'walla-walla', kind: 'FEEDER', name: 'Walla Walla', minutes: 60, bearing: 100, note: 'A wine town with two colleges and a real college music scene; a swap partner as much as a feeder.' },
    { id: 'yakima', kind: 'PEER', name: 'Yakima', minutes: 75, bearing: 290, slug: 'yakima-wa', note: 'Almost the same size, up I-82; a revived downtown and the closest equal.' },
    { id: 'spokane', kind: 'PEER', name: 'Spokane', minutes: 140, bearing: 40, slug: 'spokane-wa', note: 'Much bigger, with the nearest real punk scene; the next step up.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Kennewick', route: 'downtown', note: 'The old core by the river: low brick buildings, empty storefronts and slowly rising rents.' },
    { id: 'columbia-drive', name: 'Columbia Drive and the riverfront', route: 'work-side', note: 'Light industrial units and old motels turning into wine and artisan projects; getting pricier.' },
    { id: 'vista', name: 'Vista and the arena district', route: 'campus', note: 'New construction on a closed airfield beside the hockey arena; big-crowd traffic, little room for shows.' },
    { id: 'columbia-center', name: 'the Columbia Center strip', route: 'work-side', note: 'The mall and big-box strips, where kids hang out and vacant suites come up.' },
    { id: 'old-kennewick', name: 'central Kennewick', route: 'old-side', note: 'Mid-century bungalows with detached garages; the likeliest home of backyard shows.' },
    { id: 'southridge', name: 'Southridge', route: 'campus', note: 'New tract sprawl on the ridge: families and finished basements, more cars than rooms.' },
    { id: 'richland-town', name: 'the old Richland shopping blocks', route: 'town:richland', note: 'A tidy old shopping district across the river, with the one real stage for heavy bands and a skatepark nearby.' },
    { id: 'pasco-town', name: 'Pasco', route: 'town:pasco', note: 'The cheaper warehouse-and-yard fringe across the river, hot and windy and full of kids.' },
    { id: 'west-kennewick', name: 'the golf-course tracts', route: 'campus', note: 'Pricey, quiet planned housing; nobody wants a drum kit here.' }
  ],

  rooms: [
    { id: 'tract-garage', kind: 'HOUSE', hood: 'old-kennewick', cap: 40, curfew: 1320, ac: false, outdoor: false, pressure: 55, start: true,
      note: 'A garage on a tract lot in an old bungalow block. The neighbors are close, and one call ends the night.' },
    { id: 'ridge-basement', kind: 'HOUSE', hood: 'southridge', cap: 30, curfew: 1320, ac: true, outdoor: false, pressure: 55,
      note: 'A finished basement in a new tract home with the parents away. Families next door, and more cars than room.' },
    { id: 'lodge-tavern', kind: 'BAR', hood: 'downtown', cap: 150, ages: ['A21'], curfew: 1410,
      note: 'A lodge-style tavern with a stage that books cover bands. Punk is a harder sell.' },
    { id: 'lodge-hall', kind: 'HALL', hood: 'downtown', cap: 120, curfew: 1320, ac: true,
      note: 'A rented hall with a cheap deposit. The lender wants proof the night stays clean.' },
    { id: 'river-unit', kind: 'DIY', hood: 'columbia-drive', cap: 80, curfew: 1350, ac: false, pressure: 55,
      note: 'A light-industrial unit near the river. It lasts until the landlord sells to the wine crowd.' },
    { id: 'strip-suite', kind: 'SHOP', hood: 'columbia-center', cap: 60, curfew: 1260,
      note: 'A short-lease suite in a vacant strip-mall row where the kids already hang out. Mall security and the lease end it.' },
    { id: 'arena', kind: 'BIG', hood: 'vista', cap: 6000, curfew: 1380,
      note: 'The hockey arena. A package tour passes through, local punk almost never sees it, and the crowd clogs the roads.' }
  ],

  contacts: ['yakima-wa', 'spokane-wa', 'portland', 'boise-id'],

  calendar: [
    { id: 'boat-race', label: 'the boat race and air show weekend', tag: 'festival', month: 7, week: 3, dows: [4, 5, 6], can: [.88, .82, .80], hoods: ['downtown', 'columbia-drive'], elsewhere: [.95, .92, .92] },
    { id: 'county-fair', label: 'the county fair and rodeo', tag: 'fair', month: 8, week: 4, dows: [1, 2, 3, 4, 5], can: [.90, .85, .85] },
    { id: 'car-show', label: 'the classic car show', tag: 'festival', month: 6, week: 3, dows: [5, 6], can: [.95, .92, .92], hoods: ['richland-town'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Yakima', state: 'WA', lat: 46.6, lon: -120.51, pop: 250000 },
    { name: 'Spokane', state: 'WA', lat: 47.66, lon: -117.43, pop: 590000 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33, pop: 4000000 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68, pop: 2500000 }
  ],
  roads: ['I-82', 'US 395', 'SR 240', 'I-182', 'I-84', 'US 12'],

  words: {
    street: ['Columbia Drive', 'Clearwater Avenue', 'Highway 395', 'Highway 240'],
    water: ['the Columbia', 'the Snake', 'the Yakima', 'the Blue Bridge', 'the Cable Bridge'],
    hood: ['Southridge', 'Vista', 'Clover Island', 'Canyon Lakes', 'East Pasco', 'Columbia Park'],
    thing: ['tumbleweed', 'sagebrush', 'tater tots', 'drive-through espresso', 'taqueria', 'carport', 'wind gust', 'tarp', 'strip-mall suite', 'bridge closure'],
    weather: ['hundred-degree afternoon', 'wind advisory', 'dust storm']
  },

  events: [
    { id: 'KENNEWICK_WA_HEAT', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [7, 8] },
      telegraph: 'The forecast says 104 and the wind is not going to help.',
      title: 'The air conditioning quits',
      body: 'A midsummer night, a hundred and four at doors, and the cooling gave out. The back wall is open to the parking lot and the neighbors will hear all of it.',
      options: [
        { id: 'COOL', label: 'Open the back and run it short', likely: 'Loud to the neighbors. The ones inside survive.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Doors open to the lot and short sets. Everybody sweated and nobody left.' },
        { id: 'LATE', label: 'Push doors to after dark', likely: 'The heat breaks a little. Late for a school night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors at nine. The lot cooled off and the crowd came in loud.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'People stay home from the heat.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'Half the list stayed in the cool. The regulars came.' }
      ] },

    { id: 'KENNEWICK_WA_RACE_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The river side is booked solid for the race weekend, and every kid has a cousin in town.',
      title: 'The river is full',
      body: 'The boat race has the hotels full, the roads shut by the water, and every ride the kids counted on is busy with family. Your show is across town.',
      options: [
        { id: 'EARLY', label: 'Start early before the roads fill', likely: 'Most get there. A short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors an hour early. The ones who beat the traffic got a tight night.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'Nobody has a ride.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The ride shortage ate the list. The ones with a car came.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] }
  ]
});
