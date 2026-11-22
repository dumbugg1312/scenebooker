SB.Cities.register('champaign-il', {
  v: 1,
  slug: 'champaign-il',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of illinois', 'university of illinois urbana-champaign', 'uiuc', 'illini', 'fighting illini', 'daily illini', 'news-gazette',
           'the news-gazette', 'big ten', 'kraft heinz', 'ebertfest', 'quad day', 'boneyard arts festival', 'boneyard arts', 'c-carts', 'amtrak',
           'state farm', 'vfw', 'american legion', 'elks', 'elks lodge', 'general motors', 'gm plant', 'illinois central', 'canadian national',
           'norfolk southern', 'sweetcorn festival', 'illinois state university', 'eastern illinois university', 'millikin', 'purdue',
           'indiana university', 'chambana', 'carle foundation', 'the sump', 'tallgrass room', 'grain bin', 'quonset 40', 'section line',
           'the siding', 'frostbite garage', 'combine hall', 'overpass annex', 'dry slough', 'soybean moon',
           'friday night live', 'downtown streetfest', 'parade of lights', 'pygmalion', 'pygmalion festival', 'champaign city partnership', 'pride festival',
           'homecoming parade', 'grange grove', 'state farm center', 'blues brews and bbq', 'wpgu', 'will radio', 'nprillinois', 'npr illinois', 'ipm newsroom',
           'smile politely', 'chambana moms', 'pizza fm', 'pizzafm', 'experience cu', 'arcola broomcorn festival', 'broomcorn festival', 'ucimc',
           'spurlock museum', 'krannert', 'illiac', 'market street'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['illini*', 'ebertfest*', 'quad day*', 'boneyard arts*', 'news-gazette*', 'kraft heinz*', 'tallgrass room*', 'combine hall*'],

  blurb: ['Basements across the line carry the town while the strip fills with glass. Punks, hardcore kids and rappers share one bill.',
          'Half the crowd leaves every May, and half never did.'],
  hard: 'Houses end by zoning letter or landlord, and the students leave every May.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.2 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Champaign' },
    { id: 'urbana', kind: 'FEEDER', name: 'Urbana', minutes: 10, bearing: 45, note: 'The twin city on the other side of campus: arty, activist and cheaper.', bands: 3 },
    { id: 'mahomet', kind: 'FEEDER', name: 'Mahomet', minutes: 15, bearing: 320, note: 'A bedroom suburb off the interstate; teens come in for shows.' },
    { id: 'rantoul', kind: 'FEEDER', name: 'Rantoul', minutes: 20, bearing: 5, note: 'A shrunken old air-force town north on US 45; kids come because there is nothing else.', bands: 1 },
    { id: 'tuscola', kind: 'FEEDER', name: 'Tuscola', minutes: 25, bearing: 190, note: 'A farm town south on I-57.' },
    { id: 'monticello', kind: 'FEEDER', name: 'Monticello', minutes: 30, bearing: 280, note: 'A county seat west on I-72.' },
    { id: 'paxton', kind: 'FEEDER', name: 'Paxton and the farm towns', minutes: 35, bearing: 10, note: 'Farm towns up I-57; kids drive in with a parent\'s permission.' },
    { id: 'danville', kind: 'FEEDER', name: 'Danville', minutes: 40, bearing: 100, note: 'A former rail and factory city east on I-74 with a real appetite for bands.', bands: 2 },
    { id: 'mattoon', kind: 'FEEDER', name: 'Mattoon and Charleston', minutes: 50, bearing: 210, note: 'Two towns south on I-57; Charleston has a state university and its own small DIY life.', bands: 2 },
    { id: 'decatur', kind: 'FEEDER', name: 'Decatur', minutes: 55, bearing: 270, note: 'A shrinking industrial city west on I-72 with some scene of its own.', bands: 2 },
    { id: 'bloomington-normal', kind: 'PEER', name: 'Bloomington and Normal', minutes: 60, bearing: 310, scene: 1500, note: 'Another campus twin up I-74; the two towns trade bands.' },
    { id: 'springfield', kind: 'PEER', name: 'Springfield', minutes: 80, bearing: 265, scene: 900, note: 'The quiet old capital west on I-72.' },
    { id: 'lafayette', kind: 'PEER', name: 'Lafayette and West Lafayette', minutes: 90, bearing: 85, slug: 'lafayette-in', note: 'The mirror-image campus town across the Indiana line.' },
    { id: 'peoria', kind: 'PEER', name: 'Peoria', minutes: 90, bearing: 295, slug: 'peoria-il', note: 'A river port with more bars and fewer students.' }
  ],

  hoods: [
    { id: 'campustown', name: 'Campustown', route: 'campus', note: 'Eight blocks of bars and fast food under new student towers: glassed over, expensive and watched.' },
    { id: 'downtown-champaign', name: 'downtown Champaign', route: 'downtown', note: 'Restored theaters, taps and a few mid-sized rooms; young professionals and grad students.' },
    { id: 'downtown-urbana', name: 'downtown Urbana', route: 'downtown', note: 'Around the square: storefronts, co-ops and old houses; slowly gentrifying and the more arty half.' },
    { id: 'west-urbana', name: 'West Urbana and the near-campus grid', route: 'old-side', note: 'Two-and-a-half-story houses cut into student flats; basements, porches and back yards.' },
    { id: 'north-champaign', name: 'north and northeast Champaign', route: 'work-side', note: 'Long-standing working-class blocks of older frame houses; not a student scene and not to be treated as one.' },
    { id: 'philo-road', name: 'Philo Road and east Urbana', route: 'work-side', note: 'Low-rent strip malls, cheap apartments and car lots; practice rooms and storage units.' },
    { id: 'rail-edge', name: 'the railroad corridors', route: 'work-side', note: 'Old garages and cinder-block shops by the tracks, rented by the month.' },
    { id: 'prospect', name: 'Prospect Avenue and Savoy', route: 'campus', note: 'Chain restaurants, malls and subdivisions; where parent-driven suburban kids come from.' }
  ],

  rooms: [
    { id: 'west-urbana-basement', kind: 'HOUSE', hood: 'west-urbana', cap: 60, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, sketch: 25, standing: [70, 60, 45],
      pressure: 55, start: true, note: 'A student-rental basement near campus. The address goes up the day of, there is a jar at the door, and it ends at the landlord or in May.' },
    { id: 'urbana-seniors', kind: 'HOUSE', hood: 'west-urbana', cap: 50, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 50, note: 'A house venue started by a group of seniors, with mixed bills that put punk next to funk. It lasts exactly as long as that class does.' },
    { id: 'champaign-basement', kind: 'HOUSE', hood: 'campustown', cap: 50, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, sketch: 25, standing: [70, 55, 40],
      pressure: 55, note: 'A basement and a porch on the Champaign side of campus. Hardcore-leaning and less often open than across the line.' },
    { id: 'collective-room', kind: 'DIY', hood: 'downtown-urbana', cap: 100, rent: 60, deposit: 0, pa: .5, curfew: 1320, ac: false, sketch: 35, standing: [60, 65, 50],
      pressure: 55, note: 'A storefront performance room run by a collective. All ages, with a fire-code closure behind it and the inspector still a worry.' },
    { id: 'community-hall', kind: 'HALL', hood: 'downtown-urbana', cap: 150, rent: 150, deposit: 50, pa: .5, curfew: 1320, ac: true, sketch: 5, standing: [60, 60, 60],
      owner: 'HALL_MANAGER', note: 'A rented church or community hall near the square. Good for one benefit night, early and sober.' },
    { id: 'downtown-shop', kind: 'SHOP', hood: 'downtown-champaign', cap: 40, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'A record and art shop in a restored storefront. A quick afternoon set, and out by seven.' },
    { id: 'back-stage-bar', kind: 'BAR', hood: 'downtown-champaign', cap: 150, soundFee: 50, pa: .7, ages: ['A21', 'A18'], curfew: 1500, ac: true, following: .3, sketch: 20, standing: [50, 65, 70],
      note: 'A bar with a back stage and a small arcade corner. Punk and indie bills, and a run of the town\'s bars have closed.' },
    { id: 'campus-club', kind: 'CLUB', hood: 'campustown', cap: 350, houseCosts: 220, split: .8, pa: .9, ages: ['A18', 'ALL'], curfew: 1470, ac: true, following: .6, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The one strictly-music club, eighteen-plus on most nights. Touring metal and punk with local support.' },
    { id: 'downtown-club', kind: 'CLUB', hood: 'downtown-champaign', cap: 300, houseCosts: 180, split: .8, pa: .9, ages: ['A18'], curfew: 1470, ac: true, following: .5, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A mid-size downtown room with food and drink. Touring punk and local favorites, and it wants a name.' }
  ],

  contacts: ['lafayette-in', 'peoria-il', 'bloomington-in', 'chicago'],

  calendar: [
    { id: 'summer-street-party', label: 'the summer downtown street party', tag: 'festival', month: 8, week: 1, dows: [5], can: [.92, .88, .88], hoods: ['downtown-champaign'], elsewhere: [1, 1, 1] },
    { id: 'fall-parade', label: 'the fall alumni parade', tag: 'parade', month: 9, week: 4, dows: [4], can: [.90, .85, .85], hoods: ['campustown', 'downtown-champaign'], elsewhere: [1, .97, .97] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 4], dows: [5], can: [.80, .92, .92], hoods: ['campustown', 'west-urbana'], elsewhere: [.95, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [5], can: [.80, .92, .92], hoods: ['campustown', 'west-urbana'], elsewhere: [.95, 1, 1] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 3], dows: [5], can: [.80, .92, .92], hoods: ['campustown', 'west-urbana'], elsewhere: [.95, 1, 1] },
    { id: 'arts-fest', label: 'the downtown music and arts festival', tag: 'festival', month: 9, week: 3, dows: [3, 4, 5, 6], can: [.90, .85, .85], hoods: ['downtown-champaign'], elsewhere: [1, .97, .97] },
    { id: 'december-parade', label: 'the December parade', tag: 'parade', month: 11, weeks: [4, 5], dows: [5], can: [.92, .90, .90], hoods: ['downtown-champaign'], elsewhere: [1, 1, 1] },
    { id: 'commencement', label: 'commencement and move-out', tag: 'graduation', month: 5, weeks: [2, 3], dows: [4, 5, 6], can: [.85, .80, .80] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1350, weekend: 1440, inForce: false } },

  points: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 9400000 },
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16, pop: 890000 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.2, pop: 2800000 },
    { name: 'Kankakee', state: 'IL', lat: 41.12, lon: -87.86, pop: 24000 },
    { name: 'Terre Haute', state: 'IN', lat: 39.47, lon: -87.41, pop: 58000 }
  ],
  roads: ['I-57', 'I-74', 'I-72', 'US 45', 'US 150', 'Illinois 10'],

  words: {
    street: ['Green Street', 'Neil Street', 'University Avenue', 'Wright Street', 'Prospect Avenue', 'Philo Road', 'Race Street'],
    water: ['the Boneyard Creek', 'the Boneyard'],
    hood: ['Campustown', 'West Urbana', 'Savoy', 'Mahomet', 'Philo', 'the Square', 'Lincoln Square'],
    thing: ['tenderloin', 'corn dog', 'sump pump', 'tornado siren', 'cinder block', 'ground blizzard', 'transit bus', 'storage unit', 'basement show', 'porch', 'radio zine', 'zoning letter'],
    weather: ['crosswind', 'ground blizzard', 'thunderstorm']
  },

  events: [
    { id: 'CHAMPAIGN_IL_MAY_KEYS', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 5], months: [4, 5] },
      telegraph: 'The senior who runs the house is packing boxes and has not said who gets the keys.',
      title: 'The seniors hand you the keys',
      body: 'The graduating class that kept the house alive is leaving. They want you to book the last show, and they know the fall class will not find the address.',
      options: [
        { id: 'LASTSHOW', label: 'Throw them a proper last show', likely: 'A packed night and a lot of goodbyes.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.15 }, { op: 'REGULARS', pct: .02 }],
          result: 'The whole class came to see it out, and a few of the juniors took notes.' },
        { id: 'NEXT', label: 'Take the keys and start the new crew early', likely: 'Smaller. The house stays alive.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'REGULARS', pct: .01 }],
          result: 'A small night with the new crew learning where the breaker box is.' },
        { id: 'LET_GO', label: 'Let it go quiet for the summer', likely: 'Safe, but the address is lost.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The house went dark for the summer, and in the fall nobody knew where it was.' }
      ] },

    { id: 'CHAMPAIGN_IL_GAME_SATURDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'The near-campus blocks are walled with parked cars and police are posting at the intersections.',
      title: 'The football Saturday wall',
      body: 'Traffic is stopped, the police are on every corner and the crowd is leaving for the stadium. Your show is in the middle of it.',
      options: [
        { id: 'URBANA', label: 'Move it to the Urbana side', likely: 'Fewer cars and cops. A little less crowd.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'A basement across the line was calm and full, and nobody fought the traffic to get there.' },
        { id: 'LATE', label: 'Start late, after the game lets out', likely: 'The crowd that wants a night out shows up.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. The crowd came in loud and happy.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the game.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The casual crowd stayed in the traffic. The regulars came.' }
      ] },

    { id: 'CHAMPAIGN_IL_ZONING_LETTER', when: 'WEEK', tier: 'HARD', weight: 1, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'A neighbor has been counting cars, and somebody asked about the jar at the door.',
      title: 'The zoning inspector at the door',
      body: 'The door money has grown, and so has the attention. An inspector and a neighbor are at the curb asking whether you are charging admission in a house.',
      options: [
        { id: 'FREE', label: 'Drop the door money and run a free night', likely: 'Smaller pay. No letter.',
          effects: [{ op: 'MONEY', amount: -30 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'You emptied the jar and called it a party. The inspector left with a card and a look.' },
        { id: 'HALL', label: 'Move the bill to a rented hall', likely: 'Costs money and the house crowd. Legal.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'MONEY', amount: -40 }],
          result: 'A hall took the bill. It was clean and early and a little stiff.' },
        { id: 'END', label: 'Call it before the second band', likely: 'The kids are angry. The house stays open.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -2 }, { op: 'REGULARS', pct: -.01 }],
          result: 'You shut it down at the curb. The house kept its keys and the crowd kept its grudge.' }
      ] }
  ]
});
