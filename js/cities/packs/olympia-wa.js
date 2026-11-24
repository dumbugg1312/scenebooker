SB.Cities.register('olympia-wa', {
  v: 1,
  slug: 'olympia-wa',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['the evergreen state college', 'evergreen state college', 'evergreen', 'lakefair', 'arts walk', 'procession of the species', 'olympic airshow', 'capital city marathon',
           'cooper point journal', 'the olympian', 'intercity transit', 'south puget sound community college', 'saint martin\'s', 'st. martin\'s', 'seahawks', 'apple cup',
           'washington state fair', 'joint base lewis-mcchord', 'jblm', 'lewis-mcchord', 'amtrak cascades', 'amtrak', 'greyhound', 'flixbus', 'riot grrrl', 'nirvana',
           'kill rock stars', 'k records', 'olympia beer', 'international pop underground',
           'the deschutes room', 'hammersley grange', 'plum street annex', 'the oyster shed', 'totten hall', 'budd inlet boathouse', 'madrona basement', 'tumwater falls rec room',
           'percival loft', 'the westside laundry back room', 'priest point pavilion', 'mud bay grange'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Lakefair is "the summer lake festival" in game text. */
  blocklist: ['lakefair*', 'procession of the species*', 'kill rock stars*', 'k records*', 'the olympian*', 'cooper point*', 'intercity transit*', 'riot grrrl*'],

  blurb: ['A small capital at the south tip of Puget Sound, green and wet, where the state pays the bills and the town makes its own records.',
          'Homemade, feminist and queer tape-label punk is the local religion, and the town is a little tired of being asked about it. Everyone has a bus pass and a cassette.'],
  hard: 'Few permanent rooms: every date rides on one lease and one neighbor.',
  region: 'the I-5 corridor',
  houseType: 'LIVING_ROOM',
  whereGo: [
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 }
  ],

  tilt: [
    { fan: 'indie', band: 'garage', d: .10, reason: 'A town that has always preferred homemade and lo-fi over polish.' },
    { fan: 'garage', band: 'indie', d: .10, reason: 'A town that has always preferred homemade and lo-fi over polish.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Olympia' },
    { id: 'lacey', kind: 'FEEDER', name: 'Lacey', minutes: 10, bearing: 75, note: 'The bigger suburb next door: malls, a small Benedictine college and a handful of teenage bands.' },
    { id: 'rochester', kind: 'FEEDER', name: 'Rochester and Grand Mound', minutes: 25, bearing: 205, note: 'Farm and exurb. The teens drive in on I-5.' },
    { id: 'tenino', kind: 'FEEDER', name: 'Tenino and Bucoda', minutes: 30, bearing: 170, note: 'A quarry and railroad town and the smallest town in the county. Almost no scene.' },
    { id: 'shelton', kind: 'FEEDER', name: 'Shelton', minutes: 30, bearing: 315, note: 'A mill and oyster town with a prison. A kid scene that sometimes drives in on US 101.' },
    { id: 'yelm', kind: 'FEEDER', name: 'Yelm', minutes: 35, bearing: 110, note: 'A fast-growing exurb of military families, with a small scene of its own.' },
    { id: 'lakewood', kind: 'FEEDER', name: 'Lakewood and DuPont', minutes: 35, bearing: 25, beyond: 'i5-nisqually', note: 'Suburbs and base families up I-5. Many kids go to Tacoma instead.' },
    { id: 'centralia', kind: 'FEEDER', name: 'Centralia and Chehalis', minutes: 40, bearing: 200, note: 'Old railroad, timber and farm towns with a small, real scene and some conservative pressure.' },
    { id: 'elma', kind: 'FEEDER', name: 'Elma and Montesano', minutes: 45, bearing: 250, note: 'Small timber and farm towns out on US 12.' },
    { id: 'aberdeen', kind: 'FEEDER', name: 'Aberdeen and Hoquiam', minutes: 60, bearing: 265, note: 'Rain, mill and fishing towns, hard-up, with a long tradition of loud, heavy bands. The kids make the drive.' },
    { id: 'tacoma', kind: 'PEER', name: 'Tacoma', minutes: 45, bearing: 15, scene: 3000, note: 'The scruffier, working-class sibling to the north. Bands cross all the time.' },
    { id: 'bremerton', kind: 'PEER', name: 'Bremerton', minutes: 60, bearing: 340, slug: 'bremerton-wa', note: 'A Navy shipyard town across the Sound. Thin exchange.' },
    { id: 'longview', kind: 'PEER', name: 'Longview and Kelso', minutes: 75, bearing: 195, scene: 700, note: 'Mill towns down the interstate.' },
    { id: 'bellingham', kind: 'PEER', name: 'Bellingham', minutes: 150, bearing: 5, slug: 'bellingham-wa', note: 'A fellow college-and-punk town; the two trade bands and tours.' }
  ],

  chokepoints: [
    { id: 'i5-nisqually', name: 'I-5 at the Nisqually bottleneck', p: .03 }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Brick storefronts, bars and theaters on a small peninsula by the harbor. Everyone agrees it needs work and few agree how.' },
    { id: 'westside', name: 'the Westside', route: 'old-side', note: 'Craftsman houses and duplexes across the water: the classic house-show neighborhood, slowly getting pricier.' },
    { id: 'eastside', name: 'the Eastside', route: 'work-side', note: 'Old houses, small apartment blocks and a few light-industrial buildings up the hill. Cheaper, and gentrifying.' },
    { id: 'campus', name: 'the college campus and Cooper Point', route: 'campus', note: 'A forested campus outside the city limits, with dorm lounges, apartments and woods. The scene fills and empties with the school year.' },
    { id: 'martin-way', name: 'Martin Way', route: 'work-side', note: 'Motels, thrift stores, dive bars and auto shops running east into Lacey. Cheap, ignored, and good for practice rooms.' },
    { id: 'tumwater', name: 'Tumwater', route: 'work-side', note: 'Across the river to the south: light-industrial units and storage buildings suited to practice spaces and one-off warehouse shows.' },
    { id: 'bigelow', name: 'Bigelow Highlands', route: 'old-side', note: 'Quiet older houses close to downtown. Few shows, and a lot of the complaints come from here.' }
  ],

  rooms: [
    { id: 'westside-garage', kind: 'HOUSE', hood: 'westside', cap: 45, hostCut: 0, pa: .4, curfew: 1380, outdoor: false, sketch: 20, standing: [70, 60, 45], pressure: 45, start: true,
      note: 'A converted garage behind an old house on the Westside. The neighbors mostly put up with it, until one does not.' },
    { id: 'eastside-house', kind: 'HOUSE', hood: 'eastside', cap: 40, hostCut: 0, pa: .3, curfew: 1380, outdoor: false, sketch: 20, standing: [65, 55, 45], pressure: 45,
      note: 'A living room in an old wood house on the hill. Thin walls and a big front porch.' },
    { id: 'westside-yard', kind: 'OUTDOOR', hood: 'westside', cap: 60, rent: 0, pa: .4, curfew: 1320, ac: false, sketch: 25, standing: [60, 55, 45],
      note: 'A rental backyard with tarps and a generator. July to September, if it does not rain.' },
    { id: 'storefront', kind: 'DIY', hood: 'downtown', cap: 70, rent: 70, deposit: 0, pa: .5, curfew: 1380, ac: false, sketch: 25, standing: [60, 60, 50], pressure: 55,
      note: 'A downtown storefront with a PA, a volunteer door and a snack table. It lives and dies with one lease.' },
    { id: 'warehouse-unit', kind: 'DIY', hood: 'tumwater', cap: 90, rent: 60, deposit: 0, pa: .5, curfew: 1440, ac: false, sketch: 40, standing: [55, 60, 45], pressure: 55,
      note: 'A shared practice unit in a light-industrial block. Nobody notices much, until someone does.' },
    { id: 'grange-hall', kind: 'HALL', hood: 'eastside', cap: 130, rent: 100, deposit: 50, pa: .5, curfew: 1380, ac: false, sketch: 10, standing: [55, 60, 65], owner: 'HALL_MANAGER',
      note: 'A rented community hall with folding chairs and no beer. The fallback when a house gets shut down.' },
    { id: 'campus-lounge', kind: 'HALL', hood: 'campus', cap: 100, rent: 0, deposit: 0, pa: .5, curfew: 1380, ac: false, sketch: 10, standing: [65, 60, 50],
      note: 'A dorm lounge on the campus. It needs a student organizer and a calendar that is not finals week.' },
    { id: 'record-shop', kind: 'SHOP', hood: 'downtown', cap: 40, pa: .4, curfew: 1140, ac: false, sketch: 5, standing: [70, 70, 75], following: .2,
      note: 'The record store downtown. In-stores in the afternoon.' },
    { id: 'downtown-bar', kind: 'BAR', hood: 'downtown', cap: 110, soundFee: 40, pa: .7, ages: ['ALL', 'A21'], matinee: true, curfew: 1560, ac: false, following: .3, sketch: 15,
      standing: [50, 65, 70], note: 'A bar with a stage. 21 and over most nights, with an occasional early all-ages bill.' },
    { id: 'martin-bar', kind: 'BAR', hood: 'martin-way', cap: 90, soundFee: 30, pa: .6, ages: ['A21'], curfew: 1560, ac: false, following: .2, sketch: 10,
      standing: [50, 65, 65], note: 'A dive bar on the strip with a small stage. Nobody from town comes out here, which suits it.' }
  ],

  contacts: ['bremerton-wa', 'bellingham-wa', 'salem-or', 'eugene-or'],

  calendar: [
    { id: 'lake-festival', label: 'the summer lake festival', tag: 'festival', month: 7, week: 3, dows: [2, 3, 4, 5, 6], can: [.80, .75, .75], hoods: ['downtown', 'westside'], elsewhere: [.92, .90, .90] },
    { id: 'gallery-walk-spring', label: 'the gallery walk', tag: 'arts', month: 4, week: 3, dows: [4], can: [.95, .95, .95], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'gallery-walk-fall', label: 'the gallery walk', tag: 'arts', month: 10, week: 3, dows: [4], can: [.95, .95, .95], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'costume-parade', label: 'the handmade costume parade', tag: 'festival', month: 4, week: 4, dows: [5], can: [.92, .92, .95], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'pride', label: 'Pride weekend', tag: 'holiday', month: 6, week: 4, dows: [5, 6], can: [1.05, 1.08, 1.02] },
    { id: 'football-sunday-oct', label: 'football Sundays', tag: 'game', month: 10, weeks: [1, 5], dows: [6], can: [.88, .90, .92] },
    { id: 'football-sunday-nov', label: 'football Sundays', tag: 'game', month: 11, weeks: [1, 5], dows: [6], can: [.88, .90, .92] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] }
  ],

  points: [
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33, pop: 4000000 },
    { name: 'Vancouver', state: 'WA', lat: 45.64, lon: -122.66, pop: 190000 },
    { name: 'Tacoma', state: 'WA', lat: 47.25, lon: -122.44, pop: 220000 }
  ],
  roads: ['I-5', 'US 101', 'US 12', 'SR 8', 'SR 510', 'SR 507'],

  words: {
    street: ['Fourth Avenue', 'Capitol Way', 'State Avenue', 'Harrison Avenue', 'Cooper Point Road', 'Martin Way', 'Pacific Avenue', 'Eastside Street', 'Plum Street', 'Capitol Boulevard'],
    water: ['Budd Inlet', 'Capitol Lake', 'the Deschutes', 'Puget Sound', 'Percival Landing', 'Totten Inlet'],
    hood: ['the Westside', 'the Eastside', 'Tumwater', 'Lacey', 'Bigelow', 'Cooper Point'],
    thing: ['espresso stand', 'oyster', 'fern', 'rain boots', 'crawlspace', 'tarp', 'slice shop', 'co-op', 'kombucha', 'mushroom', 'donation jar', 'grange hall', 'cassette'],
    weather: ['drizzle', 'atmospheric river', 'gray'],
    surnames: ['Nguyen', 'Larsen', 'Sandoval', 'Peterson', 'Kim', 'Olson', 'Hernandez', 'Anderson']
  },

  events: [
    { id: 'OLYMPIA_WA_LAKE_FESTIVAL_CLASH', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'festival' },
      telegraph: 'The summer lake festival has the park booked and the downtown streets marked for the parade.',
      title: 'The whole town is at the lake',
      body: 'The lake festival has the parade route closed, the parking gone and half the city walking the other way toward the fireworks, and your show is on the wrong side of it.',
      options: [
        { id: 'EARLY', label: 'Go on early, before the parade lets out', likely: 'Most get in before the barricades, but the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'You opened doors an hour early, and the ones who came parked a mile away and walked.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'The crowd goes to the fireworks.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The fireworks started and the room emptied by half.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'OLYMPIA_WA_I5_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'A winter storm is closing roads north and south of town.',
      title: 'I-5 is shut at the river bottoms',
      body: 'A crash and a rainstorm have closed I-5 near the Nisqually bottleneck on the night of your show, and everyone coming from Tacoma, Lakewood and the north is stuck on the shoulder.',
      options: [
        { id: 'LATER', label: 'Push doors back and wait for them', likely: 'Most make it eventually, but the night runs late.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: 60 }],
          result: 'The bands got in at ten, and the room filled slowly, then all at once.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'You lose most of the people who have to cross the bottleneck.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The road never opened, and the ones from the north stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'It takes two hours of your day, but most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads took the back roads together.' }
      ] },

    { id: 'OLYMPIA_WA_GALLERY_WALK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'arts' },
      telegraph: 'Downtown is filling with art and visitors for the gallery walk.',
      title: 'A gallery offers a room',
      body: 'On gallery walk night downtown is full of strollers, and a gallery owner offers you the back room for free. The catch is a polite hour, a polite volume and nowhere to park.',
      options: [
        { id: 'TAKE', label: 'Take the room and keep it quiet', likely: 'You get a gentle crowd that is smaller, but you pay nothing.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'It was an acoustic bill, early and soft, and the gallery owner was thrilled.' },
        { id: 'SKIP', label: 'Pass and run your own room as planned', likely: 'Parking is a nightmare downtown.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The crowd had to circle for parking, and some gave up.' }
      ] },

    { id: 'OLYMPIA_WA_YARD_RAIN', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [6, 7, 8, 9, 10] },
      telegraph: 'A front is coming in off the Sound.',
      title: 'It is raining on the backyard show',
      body: 'The one dry month turned out not to be. The rain has soaked the tarp and the generator is spitting, and the whole crowd is looking at the garage.',
      options: [
        { id: 'GARAGE', label: 'Move everyone into the garage', likely: 'It\'s smaller and louder, with the neighbors listening.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'Everyone packed into the garage and stayed until the power went out.' },
        { id: 'TARP', label: 'Buy more tarps and play on', likely: 'It costs twenty dollars, and a few people leave.',
          effects: [{ op: 'MONEY', amount: -20 }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The tarps held, mostly, but the front row got wet.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The sky cleared, but not everyone could come.' }
      ] }
  ]
});
