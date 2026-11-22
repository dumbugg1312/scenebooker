SB.Cities.register('ithaca-ny', {
  v: 1,
  slug: 'ithaca-ny',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['cornell', 'cornell university', 'cornell daily sun', 'ivy league', 'ithaca college', 'tompkins cortland', 'suny cortland', 'cortland state', 'ithaca journal',
           'gannett', 'ithaca voice', 'ithaca times', 'ithaca festival', 'apple festival', 'chili festival', 'grassroots', 'grassroots festival', 'slope day', 'tcat',
           'ncr', 'south hill business campus', 'ithaca is gorges', 'ten square miles surrounded by reality', 'cornell chicken', 'cornell barbecue', 'salt potatoes',
           'the burlington room', 'wsqx', 'wvbr', 'wicb', 'big red', 'porchfest',
           'ithaca commons', 'collegetown bagels', 'moosewood',
           'the ithacan', 'cornell sun', 'tompkins weekly', 'apple harvest festival', 'downtown ithaca alliance', 'downtown ithaca pride festival', 'visit ithaca',
           'cayuga park', 'state theatre', 'bailey hall', 'stereogum', 'brooklynvegan', 'national independent venue association'],
  /* The dossier names no invented venues beyond the section 11 list, which could not be checked; the colleges, press and festivals are written only in generic form. */
  blocklist: ['cornell*', 'ithaca college*', 'ithaca times*', 'ithaca journal*', 'tcat*', 'grassroots*', 'moosewood*'],

  blurb: ['A gorge-cut college town where the crowd graduates every spring and the basements are slowly torn down for apartments.',
          'Folk and indie drown out punk, but the kids who stay keep a few porches loud.'],
  hard: 'The crowd vanishes every May, all-ages rooms are rare, and snow stops the van on the hill.',
  region: 'the Finger Lakes',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Syracuse', state: 'NY', lat: 43.05, lon: -76.15 },
    { name: 'Rochester', state: 'NY', lat: 43.16, lon: -77.61 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Ithaca' },
    { id: 'dryden', kind: 'FEEDER', name: 'Dryden and Freeville', minutes: 15, bearing: 70, note: 'A bedroom town of cheaper rents; its scene mostly folds into the city.' },
    { id: 'newfield', kind: 'FEEDER', name: 'Newfield', minutes: 15, bearing: 220, note: 'Rural and exurban; its kids come into town.' },
    { id: 'lansing', kind: 'FEEDER', name: 'Lansing', minutes: 20, bearing: 10, note: 'Suburban, with the mall and chain strip north of the city.' },
    { id: 'trumansburg', kind: 'FEEDER', name: 'Trumansburg', minutes: 20, bearing: 310, note: 'A small village across the lake, arts-minded, with a folk and dance reputation.' },
    { id: 'groton', kind: 'FEEDER', name: 'Groton', minutes: 25, bearing: 60, note: 'A working-class village with a firehouse-and-field culture.' },
    { id: 'cortland', kind: 'FEEDER', name: 'Cortland', minutes: 30, bearing: 75, pop: 17500, bands: 2, note: 'The closest other town: a small college-and-townie scene whose kids drive in.' },
    { id: 'moravia', kind: 'FEEDER', name: 'Moravia and Aurora', minutes: 35, bearing: 355, note: 'Lake and farm towns up Route 34; few shows.' },
    { id: 'watkins-glen', kind: 'FEEDER', name: 'Watkins Glen and Montour Falls', minutes: 40, bearing: 250, note: 'Gorge and racing tourist towns at the head of Seneca Lake.', season: { months: [6, 7, 8], mul: 1.3 } },
    { id: 'owego', kind: 'FEEDER', name: 'Owego and Candor', minutes: 40, bearing: 150, note: 'River-valley villages and farms; not much scene.' },
    { id: 'auburn', kind: 'PEER', name: 'Auburn', minutes: 45, bearing: 15, scene: 350, note: 'A small prison-and-industry city to the north with a modest music scene.' },
    { id: 'elmira', kind: 'PEER', name: 'Elmira', minutes: 45, bearing: 205, scene: 400, note: 'A struggling river city south on Route 13; its kids come up for the college scene.' },
    { id: 'binghamton', kind: 'PEER', name: 'Binghamton', minutes: 60, bearing: 110, scene: 1200, note: 'A rougher blue-collar university city; people drive both ways for shows.' },
    { id: 'syracuse', kind: 'PEER', name: 'Syracuse', minutes: 70, bearing: 40, slug: 'syracuse-ny', note: 'The regional hub with far more rooms; it pulls bands and crowds the way a big city pulls from a small one.' }
  ],

  hoods: [
    { id: 'collegetown', name: 'Collegetown', route: 'campus', note: 'Steep streets below the main campus: dense undergrad rentals and new apartment blocks that squeezed the house shows out.' },
    { id: 'downtown', name: 'downtown and the Commons', route: 'downtown', note: 'The flat pedestrian core: bars with stages, a few multi-use rooms, and pricey new construction.' },
    { id: 'fall-creek', name: 'Fall Creek', route: 'old-side', note: 'Old frame houses with basements, shared houses and grad students; the most Ithaca neighborhood, with fewer cheap rooms every year.' },
    { id: 'southside', name: 'the Southside', route: 'work-side', note: 'A historic Black neighborhood of community rooms, church halls and backyards, gentrifying and contested.' },
    { id: 'west-end', name: 'the West End and the Inlet', route: 'work-side', note: 'Light industry, old mills and warehouse sheds by the inlet, and every cheap shed is being eyed by a developer.' },
    { id: 'west-hill', name: 'West Hill', route: 'old-side', note: 'A quietly cheap hillside of basements, garages and backyards that is hard to reach without a car.' },
    { id: 'south-hill', name: 'South Hill', route: 'campus', note: 'The smaller arts-minded college on the hill, with student houses around it.' }
  ],

  rooms: [
    { id: 'hill-house', kind: 'HOUSE', hood: 'fall-creek', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 55, start: true, note: 'A roommate-run basement in an old frame house on the hill. The landlord and the neighbors decide how long it lasts.' },
    { id: 'collegetown-house', kind: 'HOUSE', hood: 'collegetown', cap: 40, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [70, 55, 35],
      pressure: 65, note: 'A packed student rental under the steep streets. One complaint ends it, and the apartment blocks are coming.' },
    { id: 'downtown-diy', kind: 'DIY', hood: 'downtown', cap: 120, rent: 60, pa: .5, curfew: 1350, ac: false, sketch: 35, standing: [55, 60, 50],
      pressure: 55, note: 'A borrowed storefront floor the volunteers book for all-ages bills. It all depends on a room that says yes.' },
    { id: 'southside-hall', kind: 'HALL', hood: 'southside', cap: 120, rent: 120, deposit: 75, pa: .5, curfew: 1320, ac: true, sketch: 5, standing: [60, 60, 60],
      owner: 'CHURCH_CONTACT', note: 'A church hall in the old neighborhood south of downtown. A deposit, a straight face, and out by ten.' },
    { id: 'commons-shop', kind: 'SHOP', hood: 'downtown', cap: 60, pa: .4, curfew: 1200, ac: true, sketch: 5, standing: [70, 70, 75], following: .2,
      note: 'The record store on the pedestrian mall. Early sets between browsing hours, and the rent is the threat.' },
    { id: 'commons-bar', kind: 'BAR', hood: 'downtown', cap: 200, soundFee: 60, pa: .7, ages: ['A21'], curfew: 1500, ac: true, following: .3, sketch: 15,
      standing: [45, 65, 70], note: 'A downtown bar with a back-room stage. The kids are shut out at the door.' },
    { id: 'inlet-bar', kind: 'BAR', hood: 'west-end', cap: 250, soundFee: 80, pa: .8, ages: ['A18'], curfew: 1470, ac: true, outdoor: true, following: .3, sketch: 20,
      standing: [45, 65, 70], pressure: 60, note: 'A waterfront stage with a patio by the inlet. Deep in debt, with the developers circling.' },
    { id: 'downtown-club', kind: 'CLUB', hood: 'downtown', cap: 300, houseCosts: 150, split: .8, pa: .9, ages: ['A18'], curfew: 1440, ac: true, following: .6, sketch: 10,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', needs: ['FULL_BILL'], note: 'The last decent stage and sound system in a thinning field. Bar sales carry the room, not the bands.' },
    { id: 'bridge-flats', kind: 'OUTDOOR', hood: 'west-end', cap: 60, rent: 0, pa: .4, curfew: 1290, sketch: 45, standing: [55, 55, 40],
      note: 'The creek flats under the bridges. Free and loud, flooded in spring and frozen by November.' }
  ],

  contacts: ['syracuse-ny', 'rochester', 'utica-ny', 'scranton-pa'],

  rules: { quiet: 1320 },

  calendar: [
    { id: 'spring-festival', label: 'the spring community festival', tag: 'festival', month: 5, weeks: [4, 5], dows: [3, 4, 5, 6], can: [.90, .85, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'graduation', label: 'graduation weekends', tag: 'graduation', month: 5, weeks: [3, 4], dows: [4, 5, 6], can: [.80, .75, .85] },
    { id: 'harvest-fair', label: 'the fall harvest street fair', tag: 'fair', month: 9, week: 4, dows: [4, 5, 6], can: [.88, .85, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'porch-day', label: 'the porch music afternoon', tag: 'festival', month: 9, week: 4, dows: [6], can: [.92, .88, .88], hoods: ['fall-creek'], elsewhere: [1, .97, .97] },
    { id: 'move-in', label: 'move-in and the first weeks', tag: 'holiday', month: 8, weeks: [3, 4], dows: [4, 5, 6], can: [1.08, 1.12, 1.10], hoods: ['collegetown', 'south-hill'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.90, .95, .95], hoods: ['collegetown'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.90, .95, .95], hoods: ['collegetown'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Binghamton', state: 'NY', lat: 42.1, lon: -75.91, pop: 45000 },
    { name: 'Rochester', state: 'NY', lat: 43.16, lon: -77.61, pop: 210000 },
    { name: 'Scranton', state: 'PA', lat: 41.41, lon: -75.66, pop: 75000 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01, pop: 8300000 }
  ],
  roads: ['NY 13', 'NY 79', 'NY 96', 'NY 34', 'NY 89', 'I-81'],

  words: {
    street: ['State Street', 'Aurora Street', 'Buffalo Street', 'Meadow Street', 'Danby Road', 'Route 13', 'Route 79'],
    water: ['Cayuga Lake', 'Fall Creek', 'Cascadilla Creek', 'Six Mile Creek', 'the Inlet'],
    hood: ['Collegetown', 'the Commons', 'East Hill', 'South Hill', 'West Hill', 'Fall Creek', 'the Flats', 'Cayuga Heights'],
    thing: ['gorge', 'porch', 'co-op', 'farmers market', 'chicken barbecue', 'cider donut', 'basement', 'hill', 'steep staircase', 'snowbank', 'record store', 'church hall'],
    weather: ['lake effect', 'gray sky', 'mud season', 'snow day']
  },

  events: [
    { id: 'ITHACA_NY_SPRING_FLOOD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [3, 4, 5] },
      telegraph: 'The creek is brown and loud, and the flats under the bridges are already wet.',
      title: 'The creek comes up',
      body: 'A week of spring rain has the creek over its banks. The flats where the show was going to be are underwater and the basement crowd is wading in.',
      options: [
        { id: 'BASEMENT', label: 'Move the bill to a basement up the hill', likely: 'Smaller and louder. Dry, at least.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A hill house took the bill with an hour to spare, and the floor was packed.' },
        { id: 'WAIT', label: 'Hold the doors until the water drops', likely: 'A late start. Some of them give up.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The water dropped by nine. You started late and the mud was part of the night.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' }
      ] },

    { id: 'ITHACA_NY_GRADUATION_SAT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'graduation' },
      telegraph: 'Campus roads close on Saturday and every hotel in the county is booked.',
      title: 'Every car is parked in Collegetown',
      body: 'It is graduation weekend. The campus roads are shut, every space near the show is taken by parents, and half your crowd is leaving town for good on Sunday.',
      options: [
        { id: 'EARLY', label: 'Move the start up so people can park and walk', likely: 'Most of them get in. A short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors early, done before the roads reopened. The ones who came said their goodbyes loudly.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'The parents have the town. The kids have one night left.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'REGULARS', pct: .02 }],
          result: 'A thin room full of people who would not be there again. It felt like a last night.' }
      ] },

    { id: 'ITHACA_NY_PORCH_DAY', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The one afternoon of the year the neighborhood likes loud porches is coming up.',
      title: 'The porch afternoon wants a band',
      body: 'A house that never lets a drum kit past ten has been waved through for the afternoon. They want a band on the porch, and they want a list.',
      options: [
        { id: 'JOIN', label: 'Play a real porch for the afternoon', likely: 'Costs a little. A bigger, friendlier crowd.',
          effects: [{ op: 'MONEY', amount: -25 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.15 }, { op: 'REGULARS', pct: .02 }],
          result: 'You played a front porch to the whole street and nobody called anyone.' },
        { id: 'SKIP', label: 'Stay off the porches and keep the night small', likely: 'Fewer people, no trouble.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'You kept to your own room. The porches took some of the crowd.' }
      ] }
  ]
});
