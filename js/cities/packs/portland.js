SB.Cities.register('portland', {
  v: 1,
  slug: 'portland',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['olcc', 'oregon liquor and cannabis commission', 'rose festival', 'cityfair', 'starlight parade', 'pickathon', 'timbers', 'portland timbers', 'trail blazers', 'blazers',
           'portland state university', 'portland state', 'reed college', 'lewis & clark', 'lewis and clark', 'university of portland', 'portland community college',
           'pacific university', 'linfield', 'willamette university', 'george fox', 'oregon state university', 'university of oregon', 'trimet', 'freddy\'s', 'fred meyer',
           'portlandia', 'last thursday', 'bridge pedal', 'portland marathon', 'the mercury', 'portland mercury', 'willamette week', 'oregonian', 'portland monthly', 'opb',
           'oregon public broadcasting', 'kboo', 'kpsu', 'kmhd', 'portland police bureau',
           'eighty-second street annex', 'couch basement social hall', 'kenton packing room', 'albina freight house', 'tabor fellowship hall', 'cully tarp yard',
           'foster road garage', 'moss street rec', 'lents grange room', 'st. johns underpass society', 'interstate loading dock', 'division street stockroom',
           'burnside fellowship annex', 'powell boulevard pavilion', 'mount hood avenue lodge'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The big events are 'the late-spring parade', 'the roots festival' and the like in game text. */
  blocklist: ['rose festival*', 'pickathon*', 'portland timbers*', 'trail blazers*', 'portlandia*', 'willamette week*', 'trimet*', 'last thursday*'],

  blurb: ['A rainy river city of basements, garages and record stores, where kids have made their own rooms for forty years because nobody was stopping them.',
          'A rainy, friendly crowd under tarps. The old all-ages rooms are mostly memories, so houses carry it, and the rent keeps pushing them outward.'],
  hard: 'All-ages rooms are scarce and rent keeps pushing houses outward.',
  region: 'the I-5 corridor',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Portland' },
    { id: 'vancouver', kind: 'FEEDER', name: 'Vancouver', state: 'WA', minutes: 20, bearing: 5, beyond: 'interstate-bridge',
      note: 'A big suburb across the Columbia with a few rooms of its own; most kids cross the river.' },
    { id: 'camas', kind: 'FEEDER', name: 'Camas and Washougal', state: 'WA', minutes: 35, bearing: 65, beyond: 'interstate-bridge',
      note: 'An old mill town gone tech-suburb and a working-class town beside it. Teenagers drive in.' },
    { id: 'hillsboro', kind: 'FEEDER', name: 'Hillsboro', minutes: 30, bearing: 275, note: 'A suburb of chip plants and a large Latino community. Garage bands, and the train home runs late-ish.' },
    { id: 'gresham', kind: 'FEEDER', name: 'Gresham', minutes: 30, bearing: 95, lean: ['hardcore'], note: 'An older working-class east-side suburb with a garage and hardcore past and a fair number of basement shows.' },
    { id: 'oregon-city', kind: 'FEEDER', name: 'Oregon City and Milwaukie', minutes: 30, bearing: 160, note: 'River-mill towns above the falls. Teen bands and a few local halls.' },
    { id: 'forest-grove', kind: 'FEEDER', name: 'Forest Grove', minutes: 45, bearing: 255, note: 'A small college town in farm country with a few DIY houses. The kids come to the city weekly.' },
    { id: 'newberg', kind: 'FEEDER', name: 'Newberg', minutes: 45, bearing: 215, note: 'A wine-country town of churches and almost no nightlife. A small, determined punk and metal contingent drives in.' },
    { id: 'st-helens', kind: 'FEEDER', name: 'St. Helens and Scappoose', minutes: 40, bearing: 335, note: 'Former mill towns on the river, one road in. A few teen bands.' },
    { id: 'longview', kind: 'FEEDER', name: 'Longview and Kelso', state: 'WA', minutes: 55, bearing: 345, beyond: 'interstate-bridge', lean: ['metal'],
      note: 'Paper-mill and port towns with a scrappy punk and metal history. Kids drive south on I-5.' },
    { id: 'hood-river', kind: 'FEEDER', name: 'Hood River', minutes: 65, bearing: 80, beyond: 'gorge-ice', note: 'A windsurf and orchard town in the Gorge: broke kids and rich ones, and a small scene. Winter ice can close the road.' },
    { id: 'salem', kind: 'PEER', name: 'Salem', minutes: 55, bearing: 185, slug: 'salem-or', note: 'The state capital, stubbornly the un-Portland, with a long punk and hardcore streak. Many of its bands play here.' },
    { id: 'eugene', kind: 'PEER', name: 'Eugene', minutes: 120, bearing: 195, slug: 'eugene-or', note: 'The hippie sibling to the south, with a scene of its own.' },
    { id: 'olympia', kind: 'PEER', name: 'Olympia', state: 'WA', minutes: 120, bearing: 355, slug: 'olympia-wa', note: 'The sibling scene up I-5, with its own indie and zine network.' }
  ],

  chokepoints: [                                // which zones each one cuts is said by the zones' `beyond`, above
    { id: 'interstate-bridge', name: 'the Interstate Bridge', p: .02 },
    { id: 'gorge-ice', name: 'I-84 through the Gorge', p: .015 }
  ],

  hoods: [
    { id: 'inner-se', name: 'inner Southeast', route: 'old-side', note: 'Craftsman houses, cafes and record stores east of the river. Priced up for twenty years; the old house-show core has moved outward.' },
    { id: 'outer-se', name: 'outer Southeast', route: 'work-side', note: 'Montavilla, Foster-Powell and Lents out past Eighty-Second: ranch houses with basements and big yards, church halls, and most of the house shows today.' },
    { id: 'alberta-cully', name: 'Alberta and Cully', route: 'old-side', note: 'Alberta is the old arts street, polished now. Cully has larger lots and lower rent, and both are under pressure.' },
    { id: 'north', name: 'North Portland', route: 'work-side', note: 'Mississippi is gentrified; Kenton and St. Johns are heating up, with cheaper rent, small storefronts and bridge undersides.' },
    { id: 'central-eastside', name: 'the Central Eastside', route: 'work-side', note: 'Old warehouses, auto shops and practice-room buildings with no one living there at night. Redeveloped fast, so spaces are fewer and rents high.' },
    { id: 'old-town', name: 'Old Town and downtown', route: 'downtown', note: 'The old nightlife district of bars, ballrooms and basement clubs, with shelters and a lot of vacancies. Parking and safety dominate the booking.' },
    { id: 'pearl', name: 'the Pearl and Slabtown', route: 'downtown', note: 'A rebuilt rail yard of condos and boutiques. The clubs were priced out and the last rock room on the west side closed.' },
    { id: 'hollywood', name: 'Hollywood and Sandy Boulevard', route: 'downtown', note: 'An old commercial strip of taquerias, laundromats and old theaters, where clubs open and get bought out.' },
    { id: 'university-blocks', name: 'the urban campus', route: 'campus', note: 'Downtown by the park blocks: students, a commuter crowd and apartments. The scene fills in late September and empties in June.' }
  ],

  rooms: [
    { id: 'outer-basement', kind: 'HOUSE', hood: 'outer-se', cap: 55, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [70, 60, 45],
      pressure: 45, start: true, note: 'A damp, low basement in a ranch house out past Eighty-Second. Big lot, few close neighbors, and nobody much minds before ten.' },
    { id: 'inner-basement', kind: 'HOUSE', hood: 'inner-se', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [70, 55, 40],
      pressure: 55, note: 'A craftsman basement on the inner east side. The block has seen a lot of shows and a lot of new neighbors.' },
    { id: 'cully-garage', kind: 'HOUSE', hood: 'alberta-cully', cap: 70, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 25, standing: [65, 55, 45],
      pressure: 40, note: 'A detached garage with a roll-up door and a big lot. Fine until it rains sideways.' },
    { id: 'outer-yard', kind: 'OUTDOOR', hood: 'outer-se', cap: 80, rent: 0, pa: .4, curfew: 1320, sketch: 30, standing: [60, 55, 40],
      note: 'A backyard under tarps. Summer only, and the dry season is the whole calendar.' },
    { id: 'underpass', kind: 'OUTDOOR', hood: 'north', cap: 60, rent: 0, pa: .3, curfew: 1320, sketch: 60, standing: [55, 55, 35], pressure: 55,
      note: 'The underside of a bridge, powered by a generator. Illegal, wet and loved.' },
    { id: 'church-basement', kind: 'HALL', hood: 'outer-se', cap: 100, rent: 80, deposit: 0, pa: .5, curfew: 1320, ac: false, sketch: 5, standing: [65, 60, 60],
      owner: 'CHURCH_CONTACT', pressure: 50, note: 'A fellowship hall. Sundays and early nights only, with strict rules about the kitchen.' },
    { id: 'grange-hall', kind: 'HALL', hood: 'outer-se', cap: 160, rent: 200, deposit: 75, pa: .6, curfew: 1380, ac: false, sketch: 15, standing: [55, 60, 70],
      owner: 'HALL_MANAGER', note: 'A hall rented by the night with a deposit and a hard end time. Drop ceilings and a long list of rules.' },
    { id: 'eastside-warehouse', kind: 'DIY', hood: 'central-eastside', cap: 140, rent: 90, deposit: 0, pa: .6, curfew: 1440, ac: false, sketch: 45, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'A warehouse bay between distilleries. The inspectors are always one complaint away.' },
    { id: 'kenton-room', kind: 'DIY', hood: 'north', cap: 150, rent: 100, deposit: 0, pa: .6, curfew: 1380, ac: true, ages: ['ALL'], sketch: 5, standing: [65, 65, 65],
      pressure: 45, note: 'A new nonprofit room with no bar. All ages, dry, and living on donations and the door.' },
    { id: 'record-store', kind: 'SHOP', hood: 'inner-se', cap: 40, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'The record store on the avenue. In-stores and matinees, over by seven.' },
    { id: 'cafe-stage', kind: 'BAR', hood: 'hollywood', cap: 90, soundFee: 40, pa: .6, ages: ['ALL', 'A21'], matinee: true, curfew: 1380, ac: true, following: .3, sketch: 10,
      standing: [55, 65, 65], note: 'A restaurant with a stage, licensed for minors with an adult section. Shows end early and the vegan food runs out.' },
    { id: 'tavern-back', kind: 'BAR', hood: 'old-town', cap: 150, soundFee: 60, pa: .7, ages: ['A21', 'ALL'], matinee: true, curfew: 1560, ac: true, following: .3, sketch: 25,
      standing: [45, 65, 70], note: 'A back room in a downtown tavern. All ages only for the early show, before the bar goes 21 and up.' },
    { id: 'club', kind: 'CLUB', hood: 'pearl', cap: 300, houseCosts: 180, split: .8, pa: .9, ages: ['A21', 'A18'], curfew: 1560, ac: true, following: .6, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The legal club on the west side. It wants six weeks of notice and a name.' }
  ],

  contacts: ['salem-or', 'eugene-or', 'olympia-wa'],

  calendar: [
    { id: 'parade', label: 'the late-spring parade weekend', tag: 'parade', month: 6, week: 1, dows: [4, 5], can: [.80, .85, .90], hoods: ['old-town', 'central-eastside', 'pearl'], elsewhere: [.97, .95, .95] },
    { id: 'pride', label: 'Pride weekend', tag: 'festival', month: 7, week: 3, dows: [5, 6], can: [.90, .90, .95], hoods: ['old-town', 'pearl'], elsewhere: [1, 1, 1] },
    { id: 'blues', label: 'the waterfront blues festival', tag: 'festival', month: 7, week: 1, dows: [4, 5, 6], can: [.92, .88, .85], hoods: ['old-town', 'central-eastside'], elsewhere: [.97, .95, .95] },
    { id: 'roots-fest', label: 'the roots festival', tag: 'festival', month: 8, week: 1, dows: [4, 5, 6], can: [.90, .92, .95] },
    { id: 'game-night', label: 'a home game night', tag: 'game', month: 10, weeks: [1, 5], dows: [3, 4, 5], can: [.90, .95, .95], hoods: ['central-eastside', 'pearl', 'old-town'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320 },

  points: [
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33, pop: 4000000 },
    { name: 'Tacoma', state: 'WA', lat: 47.25, lon: -122.44, pop: 220000 },
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49, pop: 2400000 }
  ],
  roads: ['I-5', 'I-84', 'I-205', 'I-405', 'US 26', 'US 30'],

  words: {
    street: ['Hawthorne', 'Belmont', 'Division', 'Alberta', 'Mississippi Avenue', 'Foster Road', 'Sandy Boulevard', 'Burnside', 'Killingsworth', 'Powell Boulevard', 'Interstate Avenue', 'Eighty-Second Avenue'],
    water: ['the Willamette', 'the Columbia', 'the Clackamas'],
    hood: ['Montavilla', 'Foster-Powell', 'Lents', 'Cully', 'Kenton', 'St. Johns', 'Sellwood', 'Hollywood', 'Slabtown', 'Boise-Eliot', 'Albina'],
    thing: ['food cart', 'tarp', 'moss', 'marionberry pie', 'tofu scramble', 'banh mi', 'bike lane', 'basement', 'hazelnut', 'cedar', 'zine', 'practice room', 'generator', 'food cart pod'],
    weather: ['drizzle', 'atmospheric river', 'smoke', 'ice storm', 'heat dome']
  },

  events: [
    { id: 'PORTLAND_SMOKE_WEEK', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 4], months: [8, 9] },
      telegraph: 'The air has gone orange and the numbers are all red.',
      title: 'Smoke week',
      body: 'Wildfire smoke has settled over the valley. Nobody wants to stand in a backyard, and the whole bill is asking for a room with a door.',
      options: [
        { id: 'INSIDE', label: 'Move it into a basement with a borrowed air purifier', likely: 'Smaller and sweatier, but they come.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A basement took the whole bill. The purifier lost, but nobody left.' },
        { id: 'MOVE', label: 'Move it a day, when the wind turns', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The smoke cleared a little and so did the line.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'A lot of people stay in.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The room was half full and everyone coughed in tune.' }
      ] },

    { id: 'PORTLAND_GORGE_ICE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true, months: [12, 1, 2] },
      telegraph: 'An ice storm is forecast for the Gorge this week.',
      title: 'The Gorge is closed',
      body: 'Freezing rain has shut I-84 and the bridges. The bands and kids from outside the city cannot get through.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the ice', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the water.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The roads never opened. The ones from outside stayed home.' }
      ] },

    { id: 'PORTLAND_PARADE_BRIDGES', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'parade' },
      telegraph: 'The big night parade closes both bridges on Saturday.',
      title: 'The parade has the bridges',
      body: 'The parade has closed the bridges and half of downtown on the night of your show, and the carnival has filled every parking space on the waterfront.',
      options: [
        { id: 'EARLY', label: 'Open early and tell everyone to come by bike', likely: 'Most get in before the closures. Thinner than usual.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .92 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors an hour early. The ones who came locked their bikes to every pole on the block.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'A lot of people give up on the closures.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The bridges stayed shut. Half the list never found a way across.' }
      ] },

    { id: 'PORTLAND_GAME_NIGHT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'Two home games land on the same night this week.',
      title: 'Every parking spot is gone',
      body: 'A soccer match and a basketball game fall on one night, and every space within a mile of the show has a meter or a tow truck.',
      options: [
        { id: 'EARLY', label: 'Open early, tell everyone where to leave the car', likely: 'Most get in before the lots fill. Thinner than usual.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .92 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors an hour early. Everyone walked in from the far side of the river.' },
        { id: 'ACCEPT', label: 'Take what you get', likely: 'A lot of people circle and go home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The streets were a parking lot. Half the list never found a spot.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] }
  ]
});
