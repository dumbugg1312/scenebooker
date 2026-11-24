SB.Cities.register('evansville-in', {
  v: 1,
  slug: 'evansville-in',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of evansville', 'university of southern indiana', 'usi', 'courier & press', 'courier and press', 'townsquare media',
           'midwest communications', 'mets', 'west side nut club', 'nut club', 'nut club fall festival', 'germania mannerchor', 'germania männerchor',
           'volksfest', 'frog follies', 'hydrofest', 'drums on the ohio', 'bosse field', 'evv', 'toyota', 'tri-state tornado', 'fort campbell',
           'vfw', 'american legion', 'elks', 'moose lodge', 'pronto pup',
           'floodwall room', 'stoplight annex', 'pocket city rec hall', 'bee line garage', 'crescent basement', 'red bank carport',
           'tri-state social hall', 'evansville living', 'evansville courier', '103 gbf', 'wkdq', 'wnin', 'old national events plaza', 'aiken theatre', 'victory theatre', 'mesker amphitheatre', 'mesker park zoo', 'parksfest', 'washington square mall', 'ford center', 'explore evansville', 'shrinersfest', 'freedom festival', 'hadi temple', 'thunder on the ohio', 'germania', 'bierstube', 'third shift lanes', 'lloyd lot', 'pronto pup pavilion', 'riverbend carpet outlet'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['university of evansville*', 'courier & press*', 'courier and press*', 'nut club*', 'frog follies*', 'hydrofest*', 'drums on the ohio*', 'bosse field*'],

  blurb: ['A small river-city scene where metal and hardcore anchor the bill and a few organizers hold it together. Everyone has a day job and a long drive to anywhere.',
          'There is no steady venue, so free outdoor days, a bookstore series and a rented-out mall space stand in for one.'],
  hard: 'Few rooms, and the same few people book all of them.',
  region: 'the Ohio Valley',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.20 },
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  tilt: [
    { fan: 'metal', band: 'hardcore', d: .06, reason: 'Thrash, crossover and hardcore bands share the same local stages and the same crowd.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Evansville' },
    { id: 'henderson', kind: 'FEEDER', name: 'Henderson', state: 'KY', minutes: 15, bearing: 190, pop: 28000, scene: 60, note: 'Across the river bridges in Kentucky, with a small real scene; the state line splits the crowd.', bands: 1 },
    { id: 'newburgh', kind: 'FEEDER', name: 'Newburgh', minutes: 20, bearing: 85, note: 'A well-off bedroom suburb with a river-town main street; kids come in.' },
    { id: 'mount-vernon', kind: 'FEEDER', name: 'Mount Vernon', minutes: 30, bearing: 265, note: 'A refinery and river-port town with a few garage bands.', bands: 1 },
    { id: 'boonville', kind: 'FEEDER', name: 'Boonville', minutes: 30, bearing: 70, note: 'A county seat and bedroom town in farm country.' },
    { id: 'princeton', kind: 'FEEDER', name: 'Princeton', minutes: 40, bearing: 355, note: 'A working-class county seat with a big plant.' },
    { id: 'mount-carmel', kind: 'FEEDER', name: 'Mount Carmel', state: 'IL', minutes: 55, bearing: 325, note: 'A small Wabash Valley college town across the state line.' },
    { id: 'jasper', kind: 'FEEDER', name: 'Jasper', minutes: 60, bearing: 40, note: 'A German-Catholic furniture town with a surprisingly active local music community.', bands: 1 },
    { id: 'vincennes', kind: 'FEEDER', name: 'Vincennes', minutes: 60, bearing: 5, note: 'An old river town with a small public university and a college-town feel.' },
    { id: 'owensboro', kind: 'PEER', name: 'Owensboro', state: 'KY', minutes: 50, bearing: 105, scene: 600, note: 'The closest peer: another river city across the Kentucky line. They trade bands and crowds readily.' },
    { id: 'terre-haute', kind: 'PEER', name: 'Terre Haute', minutes: 105, bearing: 355, scene: 600, note: 'An industrial and college town up US 41, a middle step on tours toward Indianapolis.' },
    { id: 'bloomington', kind: 'PEER', name: 'Bloomington', minutes: 120, bearing: 20, slug: 'bloomington-in', note: 'A far bigger college scene that Evansville\'s best bands and young people leave for.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The grid on the river behind the floodwall. Old commercial buildings, a few bars, and a lot of noise rules after ten.' },
    { id: 'haynies-corner', name: 'Haynie\'s Corner', route: 'downtown', note: 'A walkable arts district just east of downtown with galleries and bars. The nearest thing the city has to a scene street, and getting expensive.' },
    { id: 'west-side', name: 'the West Side', route: 'old-side', note: 'Old brick storefronts, corner bars, churches and social halls. Cheap, mostly ignored, and home to the big October festival.' },
    { id: 'jacobsville', name: 'Jacobsville', route: 'work-side', note: 'Older industrial-edge streets northeast of downtown. Closed factories, low rent, warehouses and practice spaces.' },
    { id: 'lamasco', name: 'Lamasco and the near north', route: 'old-side', note: 'Bungalows and a narrow commercial strip north of downtown. House shows and patio nights, quietly gentrifying.' },
    { id: 'schnitzelburg', name: 'Schnitzelburg', route: 'old-side', note: 'A German-heritage enclave of narrow lots, brick houses and corner taverns. Porch and backyard shows.' },
    { id: 'henderson-ky', name: 'Henderson, Kentucky', route: 'town:henderson', note: 'A small Kentucky town over the river bridges. The nearest place to play when the Evansville rooms are full.' },
    { id: 'east-side', name: 'the East Side', route: 'campus', note: 'Strip malls, newer subdivisions and a small private university. College-adjacent houses and church-hosted all-ages shows.' }
  ],

  rooms: [
    { id: 'lamasco-garage', kind: 'HOUSE', hood: 'lamasco', cap: 40, curfew: 1320, ac: false, outdoor: true, sketch: 25, standing: [65, 60, 45], pressure: 50, start: true,
      note: 'A garage and a porch on a bungalow street. Quiet by ten, and every neighbor can see the door.' },
    { id: 'schnitz-yard', kind: 'HOUSE', hood: 'schnitzelburg', cap: 50, curfew: 1320, ac: false, outdoor: true, sketch: 25, standing: [60, 60, 45], pressure: 50,
      note: 'A backyard between narrow brick houses and a corner tavern. The water table says no basement, so it is the yard or nothing.' },
    { id: 'west-hall', kind: 'HALL', hood: 'west-side', cap: 250, rent: 250, deposit: 100, curfew: 1350, ac: true, standing: [55, 60, 65], owner: 'HALL_MANAGER', pressure: 45,
      note: 'A society hall with a cash-bar side room. A member has to say yes, and festival week is off the table.' },
    { id: 'mall-wing', kind: 'BIG', hood: 'east-side', cap: 1500, curfew: 1380, ac: true, standing: [45, 65, 70], pressure: 55, needs: ['FULL_BILL'],
      note: 'A former department-store wing in the mall, rented one date at a time for touring metal. The mall closes when it closes.' },
    { id: 'warehouse', kind: 'DIY', hood: 'jacobsville', cap: 150, rent: 90, curfew: 1380, ac: false, sketch: 45, standing: [55, 60, 45], pressure: 60, needs: ['VOUCH'],
      note: 'A converted warehouse with practice rooms down the hall. Cheap and loud, until someone sells the building.' },
    { id: 'bookstore', kind: 'SHOP', hood: 'downtown', cap: 80, curfew: 1260, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'An indie bookstore with an early all-ages series. Soft and tidy, over by nine.' },
    { id: 'corner-lot', kind: 'OUTDOOR', hood: 'haynies-corner', cap: 500, rent: 20, curfew: 1320, sketch: 30, standing: [55, 60, 55], pressure: 50,
      note: 'The street on the arts-district corner, shut for a free summer day. Weather and permits decide it, and the generator belongs to someone else.' },
    { id: 'franklin-hall', kind: 'CLUB', hood: 'west-side', cap: 300, ages: ['ALL', 'A18'], curfew: 1380, ac: true, following: .5, standing: [50, 65, 65], notice: 35,
      note: 'A music hall on the main West Side strip. Locals-only bills of six bands for ten bucks, all ages early.' },
    { id: 'south-club', kind: 'CLUB', hood: 'east-side', cap: 250, ages: ['A18'], curfew: 1410, ac: true, following: .4, standing: [50, 65, 65], notice: 35,
      note: 'A ticketed club on the south side that takes regional hardcore and metalcore. Eighteen and up, with a bar.' },
    { id: 'wabash-brewpub', kind: 'BAR', hood: 'downtown', cap: 120, ages: ['A21'], curfew: 1440, ac: true, following: .3, sketch: 20, standing: [50, 65, 70],
      note: 'A brewpub with a stage on the west side of downtown. Touring punk and metal, twenty-one and up.' },
    { id: 'party-bar', kind: 'BAR', hood: 'west-side', cap: 200, ages: ['A21'], curfew: 1500, ac: true, following: .3, sketch: 15, standing: [45, 65, 70], pressure: 50,
      note: 'A rock and country party bar on the strip. It books a touring band now and then and is strictly twenty-one.' },
    { id: 'henderson-diy', kind: 'DIY', hood: 'henderson-ky', cap: 100, rent: 60, curfew: 1350, ac: false, sketch: 40, standing: [55, 60, 50],
      note: 'A small-town room across the river that has already hosted Evansville bands. The bridge is the whole problem.' }
  ],

  contacts: ['louisville', 'bloomington-in', 'lafayette-in', 'indianapolis'],

  calendar: [
    { id: 'west-fest', label: 'the West Side street festival week', tag: 'festival', month: 10, week: 1, dows: [0, 1, 2, 3, 4, 5], can: [.80, .75, .75], hoods: ['west-side'], elsewhere: [.95, .92, .92] },
    { id: 'singing-fest', label: 'the German-society festival', tag: 'festival', month: 8, week: 2, dows: [3, 4, 5], can: [.92, .90, .88], hoods: ['west-side'], elsewhere: [1, .97, .97] },
    { id: 'metal-day', label: 'the free metal day on the corner', tag: 'festival', month: 6, week: 2, dows: [4], can: [.92, .88, .88], hoods: ['haynies-corner'], elsewhere: [.95, .92, .92] },
    { id: 'fourth', label: 'the Fourth fireworks night', tag: 'holiday', month: 7, week: 1, dows: [4, 5, 6], can: [.88, .90, .92], hoods: ['downtown'], elsewhere: [.97, .95, .95] },
    { id: 'hydro-race', label: 'the hydroplane race weekend', tag: 'race', month: 8, week: 4, dows: [5, 6], can: [.90, .88, .88], hoods: ['downtown'], elsewhere: [.97, .95, .95] },
    { id: 'football', label: 'Friday night football', tag: 'game', month: 9, weeks: [2, 3], dows: [4], can: [.88, .96, .96] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76, pop: 633000 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78, pop: 690000 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.20, pop: 300000 },
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16, pop: 880000 },
    { name: 'Bowling Green', state: 'KY', lat: 36.99, lon: -86.44, pop: 72000 }
  ],
  roads: ['I-69', 'US 41', 'I-64', 'Lloyd Expressway', 'Indiana 62'],

  words: {
    street: ['Franklin Street', 'Lloyd Expressway', 'Division Street', 'Main Street', 'Washington Avenue', 'Fulton Avenue', 'Indiana 62'],
    water: ['the Ohio', 'the Ohio River', 'the floodwall'],
    hood: ['Haynie\'s Corner', 'Jacobsville', 'Lamasco', 'Schnitzelburg', 'the West Side', 'the East Side', 'Red Bank'],
    thing: ['pork tenderloin', 'carport', 'barge', 'grain elevator', 'second shift', 'bourbon', 'levee', 'social hall', 'mall', 'bookstore', 'outdoor stage', 'day job'],
    weather: ['river fog', 'tornado warning']
  },

  events: [
    { id: 'EVANSVILLE_IN_FESTIVAL_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'Every West Side street is going to be shut for the week, and the hall has no parking left within six blocks.',
      title: 'Festival week on the West Side',
      body: 'The streets around the hall are blocked off for the festival and the bands cannot get a van within six blocks. Your Saturday show is in the middle of it.',
      options: [
        { id: 'CART', label: 'Load in by hand cart and run it anyway', likely: 'A slow load-in and a late start, but the crowd is already in the neighborhood.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The amps went in on dollies and shopping carts, and doors opened an hour late to a crowd in a good mood.' },
        { id: 'EAST', label: 'Move the bill to the East Side', likely: 'Parking is easy, but the crowd is smaller and stranger.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'CLUB', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The bill ran on the east side with room to park, but fewer people made the drive.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'Nobody wants to fight the barricades.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'Most of the list stayed home rather than hunt for a spot.' }
      ] },

    { id: 'EVANSVILLE_IN_MALL_CLOSING', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The mall says its doors lock at nine whatever is on the schedule.',
      title: 'The mall locks up before the headliner',
      body: 'The touring date in the old department-store wing has a late headliner, and the mall\'s closing time is coming first. Management is standing by the door with a ring of keys.',
      options: [
        { id: 'EARLY', label: 'Cut the openers short and put the headliner on early', likely: 'It\'s a tight night, and the locals feel it.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Every local got fifteen minutes and the headliner played a full set before the lights came up.' },
        { id: 'PAY', label: 'Pay the mall to keep a guard and the doors open', likely: 'Costs money but saves the night.',
          effects: [{ op: 'MONEY', amount: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.0 }],
          result: 'A guard stood at the lot door till eleven and the last song went long.' },
        { id: 'ACCEPT', label: 'Run it as booked and let the clock decide', likely: 'The headliner may play to an empty floor.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The lights came on in the middle of the last song and a good part of the crowd was already in the parking lot.' }
      ] },

    { id: 'EVANSVILLE_IN_METAL_DAY_STORM', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [5, 6, 7, 8] },
      telegraph: 'A thunderstorm warning is out for the evening and the stage is a flatbed in the street.',
      title: 'A storm warning at seven',
      body: 'The free day on the corner is in full swing when the warning comes through. The generator belongs to the label, and so does the tarp.',
      options: [
        { id: 'TARP', label: 'Cover the gear and play through the first rain', likely: 'It\'s wet and loud, and the ones who stay will not forget it.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'REGULARS', pct: .02 }],
          result: 'The drummer played under a tarp and the crowd stood in the rain with their hands up.' },
        { id: 'STOP', label: 'Stop the show and wait for it to pass', likely: 'Most of the people leave and do not come back.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }],
          result: 'The storm took an hour and half the street had gone home by the time it passed.' },
        { id: 'MOVE', label: 'Move the last bands indoors', likely: 'It breaks the free-for-all feel and costs you some trust.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'CLUB', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .5 }],
          result: 'The last three bands finished indoors to a crowded, dripping room.' }
      ] },

    { id: 'EVANSVILLE_IN_BRIDGE_JAM', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'race' },
      telegraph: 'The river bridge is backing up for the race weekend and the Henderson show is Saturday.',
      title: 'The drummer is on the wrong side of the bridge',
      body: 'The bridge between Evansville and Henderson is a parking lot for the race weekend. Your drummer is on one side of it and the kit is on the other.',
      options: [
        { id: 'WAIT', label: 'Hold the doors until the van gets across', likely: 'The start is late, but the crowd stays in the lot.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The van crossed at nine thirty, and the show started late but nobody left.' },
        { id: 'BORROW', label: 'Borrow a kit and play on', likely: 'It sounds worse, but it happens.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The band played a loose set on a borrowed kit and made it work.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new date.' }
      ] }
  ]
});
