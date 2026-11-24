SB.Cities.register('albany-ny', {
  v: 1,
  slug: 'albany-ny',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university at albany', 'suny albany', 'ualbany', 'suny', 'rensselaer polytechnic institute', 'rpi', 'union college', 'siena college', 'the college of saint rose', 'skidmore college', 'hudson valley community college', 'hvcc', 'albany law school', 'albany medical college', 'albany medical center', 'times union', 'the daily gazette', 'metroland', 'wamc', 'wnyt', 'news10', 'nys music', 'albany devils', 'albany firewolves', 'albany river rats', 'tri-city valleycats', 'saratoga race course', 'travers stakes', 'nys assembly', 'empire state plaza', 'state university of new york', 'general electric', 'globalfoundries', 'albany airport', 'tulip festival', 'albany tulip fest', 'dunn memorial bridge', 'patroon island bridge', 'new york state capitol',
           'larkfest', 'lark fest', 'capital pride', 'capital pride festival', 'alive at five', 'dad fest', 'troy victorian stroll', 'victorian stroll', 'discover albany', 'albany.org', '518scene', '518 scene', 'invisible oranges', 'capital punishment series', 'nysmusic', 'albany student press', 'upstate concerts', 'chronogram', 'tulip queen', 'riverfront jazz festival', 'lark street bid'],
  blocklist: ['times union*', 'metroland*', 'empire state plaza*', 'saratoga race*', 'tulip fest*', 'albany medical*', 'invisible oranges', 'chronogram', 'capital punishment series'],

  blurb: ['Albany, Troy and Schenectady share one small, close hardcore scene that mixes styles on every bill and still mourns the rooms it lost.',
          'Everyone is in three bands, and bands from here have gone national, but the winter drive on the Northway is the problem.'],
  hard: 'One or two rooms carry everything, and touring bands skip you.',
  region: 'the Northeast',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 },
    { name: 'New York City', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Montreal', state: 'QC', lat: 45.5, lon: -73.57 }
  ],
  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'Hardcore carries the scene and its bills.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Albany' },
    { id: 'troy', kind: 'FEEDER', name: 'Troy', minutes: 15, bearing: 5, beyond: 'river-bridges', note: 'The closest sister city across the river, with shows, rooms, kids and bands.' },
    { id: 'schenectady', kind: 'FEEDER', name: 'Schenectady', minutes: 20, bearing: 305, note: 'A second hub northwest with bands and a few houses.' },
    { id: 'cohoes', kind: 'FEEDER', name: 'Cohoes and Watervliet', minutes: 15, bearing: 355, beyond: 'river-bridges', note: 'Mill-town rowhouses, a few bands and low rent.' },
    { id: 'rensselaer', kind: 'FEEDER', name: 'Rensselaer and East Greenbush', minutes: 10, bearing: 95, beyond: 'river-bridges', note: 'Across the river; suburb kids.' },
    { id: 'clifton-park', kind: 'FEEDER', name: 'Clifton Park', minutes: 25, bearing: 355, note: 'A big suburb full of teenagers who play in bands.' },
    { id: 'saratoga', kind: 'FEEDER', name: 'Saratoga Springs', minutes: 35, bearing: 5, note: 'A rich resort town with a young bar scene; kids drive down.' },
    { id: 'hudson', kind: 'FEEDER', name: 'Hudson', minutes: 45, bearing: 170, note: 'A small arts town south on the river.' },
    { id: 'glens-falls', kind: 'FEEDER', name: 'Glens Falls and Queensbury', minutes: 55, bearing: 5, note: 'North up the Northway, with a small scene of its own.' },
    { id: 'burlington', kind: 'PEER', name: 'Burlington', state: 'VT', minutes: 150, bearing: 5, slug: 'burlington-vt', note: 'Smaller and farther north.' },
    { id: 'utica', kind: 'PEER', name: 'Utica', minutes: 85, bearing: 290, slug: 'utica-ny', note: 'Smaller, down the Thruway.' },
    { id: 'poughkeepsie', kind: 'PEER', name: 'Poughkeepsie', minutes: 80, bearing: 175, slug: 'poughkeepsie-ny', note: 'Downriver.' },
    { id: 'syracuse', kind: 'PEER', name: 'Syracuse', minutes: 135, bearing: 275, slug: 'syracuse-ny', note: 'A similar-size scene.' }
  ],

  chokepoints: [{ id: 'river-bridges', name: 'the river bridges to Troy and Rensselaer', p: 0.03 }],

  hoods: [
    { id: 'lark-street', name: 'Lark Street and Center Square', route: 'downtown', note: 'Bars, tattoo shops and rowhouses; the nightlife strip, mostly 21+ rooms.' },
    { id: 'pine-hills', name: 'Pine Hills', route: 'campus', note: 'Student rentals and big old houses; where basement and living-room shows start.' },
    { id: 'central-ave', name: 'Central Avenue', route: 'work-side', note: 'A long strip of cheap storefronts and a couple of rooms that take loud music.' },
    { id: 'south-end', name: 'the South End', route: 'work-side', note: 'Cheap rowhouses and industrial lots near the river. Low rent, few neighbors to complain.' },
    { id: 'arbor-hill', name: 'Arbor Hill and West Hill', route: 'old-side', note: 'Old row housing and church halls. Shows are rare, rents are low.' },
    { id: 'troy', name: 'downtown Troy', route: 'old-side', note: 'Brick storefronts across the river, an arts and bar scene, and a real room again.' },
    { id: 'lansingburgh', name: 'Lansingburgh', route: 'old-side', note: 'Rowhouses and small old halls, cheap.' },
    { id: 'stockade', name: 'Schenectady, the Stockade and Hamilton Hill', route: 'work-side', note: 'A second hub twenty minutes northwest with old houses and storefronts.' },
    { id: 'delmar', name: 'Delmar and Slingerlands', route: 'campus', note: 'A quiet suburb; kids who drive in on Fridays.' }
  ],

  rooms: [
    { id: 'pine-basement', kind: 'HOUSE', hood: 'pine-hills', cap: 60, curfew: 1380, ac: false, outdoor: false, standing: [70, 60, 45], pressure: 55, start: true, note: 'A soundproofed basement in a converted rental. Five bucks at the door, students in the crowd, and a lease that turns over every June.' },
    { id: 'quiet-street-house', kind: 'HOUSE', hood: 'lark-street', cap: 80, curfew: 1380, ac: false, outdoor: false, standing: [65, 60, 45], pressure: 60, note: 'A party house on a quiet side street that does all-local bills. The neighbors have already seen trouble at the door once.' },
    { id: 'hills-basement', kind: 'HOUSE', hood: 'pine-hills', cap: 70, curfew: 1380, ac: false, outdoor: false, standing: [70, 60, 40], pressure: 55, note: 'A basement with a line out the door since it opened. Every good basement around here closed one after another, and this one knows it.' },
    { id: 'rowhouse-floors', kind: 'HOUSE', hood: 'south-end', cap: 60, curfew: 1380, ac: false, outdoor: false, standing: [65, 60, 50], pressure: 50, note: 'A rowhouse with music on every floor, attic included. The stairs are tiny and the booker wants it all ages.' },
    { id: 'troy-storefront', kind: 'DIY', hood: 'troy', cap: 200, rent: 80, pa: 0.6, ages: ['ALL', 'A21'], curfew: 1440, ac: true, standing: [55, 60, 55], pressure: 50, note: 'An art and music space in a brick storefront across the river. A springboard for new bands, and it is still building its crowd.' },
    { id: 'central-bar', kind: 'BAR', hood: 'central-ave', cap: 150, soundFee: 50, pa: 0.7, ages: ['A21'], curfew: 1500, ac: true, following: 0.3, standing: [50, 65, 65], note: 'A bar with a back-room stage on the long strip. The 21-plus side of the calendar.' },
    { id: 'underground-club', kind: 'CLUB', hood: 'lark-street', cap: 500, houseCosts: 200, split: 0.8, pa: 0.9, ages: ['ALL', 'A18'], curfew: 1410, ac: true, following: 0.6, standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The one licensed room that books the loud touring bills. If it books wrong, nothing else exists.' },
    { id: 'mill-hall', kind: 'HALL', hood: 'stockade', cap: 200, rent: 180, deposit: 75, pa: 0.6, curfew: 1350, ac: true, standing: [55, 60, 65], owner: 'HALL_MANAGER', note: 'A rented hall in an old mill town up the river. All ages for one night, folding chairs and a long list of rules.' },
    { id: 'big-hall', kind: 'BIG', hood: 'lark-street', cap: 1500, rent: 1800, deposit: 500, pa: 0.95, ages: ['ALL'], curfew: 1380, ac: true, standing: [40, 65, 70], note: 'The big standing hall downtown for touring bills. Locals open only when the booker owes somebody a favor.' },
    { id: 'park-lawn', kind: 'OUTDOOR', hood: 'lark-street', cap: 300, rent: 20, pa: 0.4, curfew: 1200, sketch: 35, standing: [60, 55, 50], note: 'A pavilion and a lawn in the park for daytime benefit bills when it is warm. Done by eight.' }
  ],

  contacts: ['burlington-vt', 'utica-ny', 'poughkeepsie-ny', 'syracuse-ny', 'springfield-ma'],

  calendar: [
    { id: 'flower-weekend', label: 'the spring flower weekend', tag: 'festival', month: 5, week: 2, dows: [5, 6], can: [.90, .88, .85], hoods: ['lark-street', 'pine-hills'], elsewhere: [1, .97, .97] },
    { id: 'street-fair', label: 'the fall street festival', tag: 'festival', month: 9, weeks: [2, 3], dows: [5], can: [.88, .85, .85], hoods: ['lark-street'], elsewhere: [1, .97, .97] },
    { id: 'pride-weekend', label: 'the summer pride weekend', tag: 'festival', month: 6, weeks: [1, 2], dows: [5, 6], can: [.95, .95, .95], hoods: ['lark-street'], elsewhere: [1, 1, 1] },
    { id: 'troy-stroll', label: 'the Troy holiday stroll', tag: 'festival', month: 12, week: 1, dows: [6], can: [.90, .92, .95], hoods: ['troy'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.88, .97, .97] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.88, .97, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06, pop: 4900000 },
    { name: 'New York City', state: 'NY', lat: 40.71, lon: -74.01, pop: 19000000 },
    { name: 'Montreal', state: 'QC', lat: 45.5, lon: -73.57, pop: 4300000 },
    { name: 'Saratoga Springs', state: 'NY', lat: 43.08, lon: -73.78, pop: 28000 }
  ],
  roads: ['I-90', 'I-87', 'I-787', 'I-88', 'Central Avenue', 'Western Avenue'],

  words: {
    street: ['Central Avenue', 'Lark Street', 'Washington Avenue', 'Madison Avenue', 'Western Avenue', 'Delaware Avenue'],
    water: ['the Hudson', 'the Mohawk'],
    hood: ['Pine Hills', 'Arbor Hill', 'Lansingburgh', 'Center Square', 'Delmar', 'Cohoes'],
    thing: ['Northway', 'brownstone', 'bridge', 'capitol parking', 'snow squall'],
    weather: ['snow squall', 'ice on the Northway']
  },

  events: [
    { id: 'ALBANY_NY_BRIDGE_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Crews are working on a river bridge between Albany and Troy this week.',
      title: 'The bridge is shut',
      body: 'A river bridge is closed for repairs the night of your show. The bands and the kids from Troy and across the river have to go the long way around.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it, but the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'You moved doors up an hour, and the people who really wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'You lose most of the people who have to cross.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'It never cleared, and the people on the far side stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'It takes two hours of your day, but most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads came together the long way around.' }
      ] },

    { id: 'ALBANY_NY_STREET_FAIR', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The strip is coned off, and vendors are setting up for the weekend.',
      title: 'The strip is a fair',
      body: 'A street festival has taken over the nightlife strip. The load-in lane at the big club is closed, the vendors are three deep, and your bill is stuck behind them.',
      options: [
        { id: 'EARLY', label: 'Load in at noon before the street closes', likely: 'likely',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -30 }, { op: 'SHOW_MOD', key: 'headsMul', v: .92 }],
          result: 'The vans got in before the cones, and the night started on time, though the crowd had to walk through a fair to get there.' },
        { id: 'BASEMENT', label: 'Move the bill to a basement a few blocks away', likely: 'It\'s smaller and louder, and nobody has to park.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .5 }],
          result: 'A basement took the whole bill, and the floor was packed to the stairs.' },
        { id: 'ACCEPT', label: 'Run it and carry the gear by hand', likely: 'It\'s slow and sweaty, and some of the crowd gives up on the parking.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'lateMin', v: 45 }],
          result: 'You hauled every amp down the block, and doors were late, but the people who stayed were glad.' }
      ] },

    { id: 'ALBANY_NY_SQUALL', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [12, 1, 2, 3] },
      telegraph: 'A snow squall is lined up on the Northway for the evening.',
      title: 'The opener is stuck in the snow',
      body: 'A squall hit the Northway and the opener from the big suburb is crawling in the right lane. The quiet hour is close and the room is filling.',
      options: [
        { id: 'WAIT', label: 'Hold the doors and start an hour late', likely: 'The crowd gets restless, but nobody leaves.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .92 }],
          result: 'They got there at nine, covered in snow, and the night ran late and loud.' },
        { id: 'SKIP', label: 'Drop the opener and run a short bill', likely: 'It\'s a thinner night, but it ends on time.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'You kept the bill short and the sets tight, and everybody got home before the roads iced over.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and everybody trusts you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could make it came.' }
      ] }
  ]
});
