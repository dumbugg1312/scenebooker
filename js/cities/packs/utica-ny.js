SB.Cities.register('utica-ny', {
  v: 1,
  slug: 'utica-ny',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['observer-dispatch', 'observer dispatch', 'boilermaker', 'utica club', 'matt brewery', 'f.x. matt', 'colgate', 'hamilton college', 'suny poly', 'suny polytechnic',
           'mohawk valley community college', 'utica university', 'utica college', 'fort drum', 'griffiss', 'utica comets', 'utica city fc', 'adirondack bank center',
           'oneida nation', 'turning stone', 'vfw', 'american legion', 'elks', 'state liquor authority',
           'canal street annex', 'hillside social club', 'polish hall annex', 'st. casimir\'s undercroft', 'the knit mill loft', 'harbor flats', 'oneida square parlor',
           'the double on rutger', 'bagg\'s back room', 'the parkway garage', 'mohawk valley hall of mirrors', 'the tomato pie basement', 'the black river grange',
           'oneida county tourism', 'oneida county sheriff', 'utica zoo', 'utica summer fest', 'munson-williams-proctor', 'nys music', 'nysmusic', 'mohawk valley living', 'wibx', 'big frog', 'utica police', 'oneida county fair', 'great new york state fair', 'boilermaker walk', 'boilermaker experience', 'new york civil liberties union', 'nyclu', 'rit reporter', 'daily orange', 'syracuse new times', 'upstate concerts', 'bandsintown', 'songkick'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['observer-dispatch*', 'boilermaker*', 'utica club*', 'canal street annex*', 'colgate*', 'turning stone*'],

  blurb: ['A small old mill city on the Mohawk and the old canal, with cheap rent, tall wooden doubles with basements, and a bar or social club on every corner.',
          'The downtown is half empty, the winters are long, and the young leave at eighteen for bigger towns an hour either way.'],
  hard: 'Few all-ages rooms, and snow and bigger cities nearby thin the crowd.',
  region: 'the Mohawk Valley',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Albany', state: 'NY', lat: 42.65, lon: -73.76 },
    { name: 'Syracuse', state: 'NY', lat: 43.05, lon: -76.15 },
    { name: 'Rochester', state: 'NY', lat: 43.16, lon: -77.61 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Utica' },
    { id: 'new-hartford', kind: 'FEEDER', name: 'New Hartford', minutes: 10, bearing: 190, note: 'The wealthier suburb to the south; backyards and finished basements.' },
    { id: 'whitesboro', kind: 'FEEDER', name: 'Whitesboro and Oriskany', minutes: 10, bearing: 285, note: 'Mill-village suburbs to the west.' },
    { id: 'clinton', kind: 'FEEDER', name: 'Clinton', minutes: 15, bearing: 235, note: 'A small college town; kids come in for shows.' },
    { id: 'rome', kind: 'FEEDER', name: 'Rome', minutes: 20, bearing: 295, note: 'A smaller city up the valley with a little scene and a friendly rivalry.' },
    { id: 'herkimer', kind: 'FEEDER', name: 'Herkimer and Ilion', minutes: 20, bearing: 110, note: 'Factory and river towns with a community college.' },
    { id: 'little-falls', kind: 'FEEDER', name: 'Little Falls', minutes: 30, bearing: 95, note: 'An old mill town in the gorge with an artsy small-town edge.' },
    { id: 'oneida', kind: 'FEEDER', name: 'Oneida and Canastota', minutes: 35, bearing: 255, note: 'Small cities and farm towns to the west.' },
    { id: 'boonville', kind: 'FEEDER', name: 'Boonville', minutes: 40, bearing: 345, note: 'Dairy and logging country in the Adirondack foothills.' },
    { id: 'hamilton', kind: 'FEEDER', name: 'Hamilton', minutes: 40, bearing: 215, note: 'A university village to the south; students are a possible crowd.' },
    { id: 'syracuse', kind: 'PEER', name: 'Syracuse', minutes: 55, bearing: 265, slug: 'syracuse-ny', note: 'The big neighbor on the Thruway; Utica loses its bands and kids to it.' },
    { id: 'schenectady', kind: 'PEER', name: 'Schenectady', minutes: 70, bearing: 100, scene: 700, note: 'A similar-size city on the way to Albany.' },
    { id: 'binghamton', kind: 'PEER', name: 'Binghamton', minutes: 75, bearing: 190, scene: 900, note: 'A university city down Route 12; a plausible two-way trade.' },
    { id: 'ithaca', kind: 'PEER', name: 'Ithaca', minutes: 95, bearing: 230, slug: 'ithaca-ny', note: 'A college and arts town to the southwest.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Bagg\'s Square', route: 'downtown', note: 'Old brick by the canal harbor: bars, theaters and a thin crowd; empty upstairs rooms.' },
    { id: 'cornhill', name: 'Cornhill', route: 'old-side', note: 'The oldest hillside neighborhood: dense wood-frame houses, cheap, with students, artists and refugee families.' },
    { id: 'east-utica', name: 'East Utica', route: 'work-side', note: 'Old Polish and Italian blocks of corner bars, church halls and ethnic social clubs.' },
    { id: 'west-utica', name: 'West Utica', route: 'work-side', note: 'Older Italian side: two-families, garages and old mill buildings.' },
    { id: 'south-utica', name: 'Oneida Square and South Utica', route: 'old-side', note: 'Big Victorian houses cut into apartments, with churches and halls.' },
    { id: 'parkway', name: 'the Parkway and North Utica', route: 'campus', note: 'Leafier and residential, with backyards and a college on the outskirts.' },
    { id: 'new-hartford-side', name: 'New Hartford and Whitesboro', route: 'campus', note: 'The suburban edge most people mean when they say they are from Utica.' }
  ],

  rooms: [
    { id: 'cornhill-basement', kind: 'HOUSE', hood: 'cornhill', cap: 40, curfew: 1320, ac: false, start: true, pressure: 50,
      note: 'A cold, low basement under a wood-frame double, with an upstairs neighbor who is family. A noise call is the threat.' },
    { id: 'west-garage', kind: 'HOUSE', hood: 'west-utica', cap: 30, curfew: 1320, ac: false, pressure: 55,
      note: 'A garage or a yard behind a two-family in summer. The walls are shared, so the noise rule bites hardest here.' },
    { id: 'hartford-yard', kind: 'OUTDOOR', hood: 'new-hartford-side', cap: 25, curfew: 1290, outdoor: true,
      note: 'A backyard with a generator or a borrowed outlet. Weather kills it from October to April.' },
    { id: 'old-theater', kind: 'HALL', hood: 'downtown', cap: 250, ages: ['ALL'], curfew: 1350, ac: true, rent: 300, deposit: 100, pressure: 45,
      note: 'A restored 1920s theater, rented for early all-ages bills at seven. Costs are high and nothing is promised from one night to the next.' },
    { id: 'vintage-shop', kind: 'SHOP', hood: 'downtown', cap: 80, curfew: 1350, ac: true, standing: [60, 65, 70],
      note: 'A clothing store that opens its floor after hours as a favor. One bad night or one sold lease ends it.' },
    { id: 'east-club-hall', kind: 'HALL', hood: 'east-utica', cap: 150, curfew: 1320, ac: true, owner: 'HALL_MANAGER',
      note: 'A social-club hall on a corner, cheap rent, a cheap-beer bar and an older member watching the door.' },
    { id: 'victorian-hall', kind: 'DIY', hood: 'south-utica', cap: 60, curfew: 1350, ac: false, needs: ['VOUCH'],
      note: 'A church hall or a hall with a stage in a Victorian block, rented a night at a time. Fire code and the people in charge are the limit.' },
    { id: 'back-room-bar', kind: 'BAR', hood: 'downtown', cap: 120, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A back-room stage with a bar in front. All ages only for an early set, and only if the owner allows it.' },
    { id: 'mid-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['A18'], curfew: 1470, ac: true,
      note: 'A mid-size club that books tribute and regional rock. Hardcore rents it on slow nights.' },
    { id: 'arena', kind: 'BIG', hood: 'downtown', cap: 3000, ages: ['ALL'], curfew: 1380, ac: true,
      note: 'The arena for hockey and touring acts. A punk bill here is the opener on someone else\'s night.' }
  ],

  contacts: ['syracuse-ny', 'ithaca-ny', 'albany-ny', 'buffalo'],

  calendar: [
    { id: 'road-race', label: 'the road race weekend', tag: 'race', month: 7, week: 2, dows: [5, 6], can: [.88, .85, .85] },
    { id: 'parade', label: 'the St. Patrick\'s parade', tag: 'parade', month: 3, week: 2, dows: [5], can: [.85, .85, .90], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'summer-concerts', label: 'the downtown summer concert series', tag: 'festival', month: 7, weeks: [1, 4], dows: [0], can: [.93, .95, 1], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'arts-fest', label: 'the arts festival', tag: 'festival', month: 6, week: 2, dows: [4, 5, 6], can: [.92, .92, .92], hoods: ['south-utica'], elsewhere: [1, 1, 1] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 8, weeks: [3, 4], dows: [4, 5, 6], can: [.90, .92, .95] },
    { id: 'college-break', label: 'the college break', tag: 'graduation', month: 5, week: 3, dows: [4, 5, 6], can: [.85, .90, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Albany', state: 'NY', lat: 42.65, lon: -73.76, pop: 900000 },
    { name: 'Buffalo', state: 'NY', lat: 42.89, lon: -78.88, pop: 1100000 },
    { name: 'Watertown', state: 'NY', lat: 43.97, lon: -75.91, pop: 120000 },
    { name: 'Binghamton', state: 'NY', lat: 42.1, lon: -75.91, pop: 250000 }
  ],
  roads: ['I-90', 'I-790', 'NY 12', 'NY 5S', 'NY 49', 'Genesee Street'],

  words: {
    street: ['Genesee Street', 'Oneida Square', 'Memorial Parkway', 'Whitesboro Street', 'Bleecker Street'],
    water: ['the Mohawk', 'the canal', 'the Barge Canal'],
    hood: ['Cornhill', 'East Utica', 'West Utica', 'Bagg\'s Square', 'New Hartford', 'Whitesboro', 'Yorkville'],
    thing: ['chicken riggies', 'tomato pie', 'half-moon cookie', 'utica greens', 'double', 'social club', 'bocce', 'snowbank', 'club hall', 'lake-effect'],
    weather: ['lake effect', 'nor\'easter']
  },

  events: [
    { id: 'UTICA_NY_SHOP_AFTER_HOURS', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The vintage shop says yes to the bill, but the owner is out of town.',
      title: 'The shop after closing',
      body: 'The shop will let the bill in after closing, but the owner is away and a rack of fragile stock sits where the pit will be. It has to be cleared by six.',
      options: [
        { id: 'CLEAR', label: 'Clear the racks yourself', likely: 'Costs the afternoon and a little trust.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'You carried every rack to the back and left the place cleaner than you found it.' },
        { id: 'HALL', label: 'Move to the club hall', likely: 'Roomier, and nobody is watching a rack.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: 1.4 }],
          result: 'The hall took the bill, and it was a bigger room with a thinner crowd.' },
        { id: 'ACCEPT', label: 'Run it and keep people out of the stock', likely: 'Tight and nervous.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'You roped off the racks and kept the crowd to the middle of the floor.' }
      ] },

    { id: 'UTICA_NY_PARADE_SATURDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'Saturday is the parade and the whole main street is shut until evening.',
      title: 'The closed street',
      body: 'The main street is shut until evening, the bars are full, and the load-in to the theater has to go around the blocks.',
      options: [
        { id: 'LATE', label: 'Load in late, doors late', likely: 'The street opens up at seven.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 75 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors were at nine, the parade crowd had drifted to the bars, and the kids came in.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new date.' },
        { id: 'ACCEPT', label: 'Carry the gear around the closure', likely: 'Slow, but the night holds.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 45 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The amps went the long way around, so the doors were late and the crowd was thin.' }
      ] },

    { id: 'UTICA_NY_RACE_PARKING', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'race' },
      telegraph: 'The race weekend has the hotels packed and a touring van is circling for a place to park.',
      title: 'Six blocks from the hall',
      body: 'The hotels are full and a touring band can only find parking six blocks from the hall. Half the street is closed for the race.',
      options: [
        { id: 'SHUTTLE', label: 'Ferry the gear in by hand', likely: 'Slow load-in, and the band is tired.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'It took four trips with the amps, and the set was ragged but the room was warm.' },
        { id: 'ACCEPT', label: 'Let the band find its own spot', likely: 'They get there when they get there.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 30 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The van turned up late and the crowd waited.' }
      ] },

    { id: 'UTICA_NY_BASEMENT_FAMILY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [10, 11, 12, 1, 2, 3, 4] },
      telegraph: 'The upstairs neighbor, who is family, is cooking for everyone before the show.',
      title: 'The quiet hour comes at ten',
      body: 'The basement is full and the upstairs neighbor is cooking for the whole bill. The noise rule still starts at ten.',
      options: [
        { id: 'EARLY', label: 'Start early, finish by ten', likely: 'Short and loud, and everyone eats.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.05 }],
          result: 'Doors were at six, the bands played hard and tight, and the whole room ate after.' },
        { id: 'ACCEPT', label: 'Run it as planned and watch the clock', likely: 'The neighbors may call.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .95 }, { op: 'MONEY', amount: -25 }],
          result: 'The bill ran past ten and someone called it in, and you paid for the trouble.' }
      ] }
  ]
});
