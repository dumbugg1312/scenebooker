SB.Cities.register('bloomington-in', {
  v: 1,
  slug: 'bloomington-in',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['indiana daily student', 'idsnews', 'wfiu', 'wtiu', 'indiana public media', 'wiux', 'herald-times', 'herald times', 'magbloom', 'limestone post', 'audiofemme', 'visit bloomington', 'jacobs school of music', 'musical arts center', 'hoosier half marathon', 'monroe county history center', 'streetdance rewind', 'fourth street festival', 'lotus world music and arts festival', 'lotus festival', 'hilly hundred', 'taste of bloomington', 'granfalloon', 'cosmic songwriter festival', 'bloomington music expo', 'great glass pumpkin patch', 'canopy of lights', 'bloomington pridefest', 'monroe county fall festival', 'stinesville quarry festival', 'homecoming', 'indianapolis motor speedway', 'quiet nights', 'indiana university', 'iu', 'iu bloomington', 'little 500', 'breaking away', 'world\'s greatest college weekend', 'nsa crane',
           'crane naval', 'bloomington transit', 'rural transit', 'greyhound', 'cummins', 'depauw', 'depauw university', 'purdue', 'ball state',
           'indiana state university', 'college mall', 'switchyard park', 'b-line', '7-line', 'brown county state park', 'the karst room',
           'karst room', 'sinkhole annex', 'cutters\' hall', 'quarry lane basement', 'the limestone exchange', 'limestone exchange', 'persimmon hall',
           'clear creek ballroom', 'third street laundry', 'stinesville grange', 'the switchback', 'odd fellows lodge annex', 'dunn street carport'],
  /* The dossier's invented venue names are banned too: research, not content, unchecked. The university appears only as 'the university'. */
  blocklist: ['indiana university*', 'little 500*', 'cummins*', 'purdue*', 'karst room*', 'sinkhole annex*', 'persimmon hall*'],

  blurb: ['A limestone college town in south-central Indiana. Students run the rooms, the crowd listens and then sings every word, and a free house show is the all-ages scene.',
          'Houses die when the tenants graduate, and everyone leaves in May.'],
  hard: 'Hosts graduate and landlords sell; the room you booked may not exist next semester.',
  region: 'the Midwest',
  houseType: 'LIVING_ROOM',

  tilt: [
    { fan: 'folk-punk', band: 'indie', d: .07, reason: 'The same crowd fills both kinds of bills at the student houses.' },
    { fan: 'indie', band: 'folk-punk', d: .07, reason: 'The same crowd fills both kinds of bills at the student houses.' }
  ],
  whereGo: [
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16 },
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76 },
    { name: 'Cincinnati', state: 'OH', lat: 39.1, lon: -84.51 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Bloomington' },
    { id: 'ellettsville', kind: 'FEEDER', name: 'Ellettsville', minutes: 15, bearing: 315, pop: 6655, note: 'A bedroom town on the way to the next county; its kids come in for everything.' },
    { id: 'nashville', kind: 'FEEDER', name: 'Nashville', minutes: 30, bearing: 85, pop: 1256, note: 'An art-colony tourist town in the hills; its workers and kids come to Bloomington.' },
    { id: 'bedford', kind: 'FEEDER', name: 'Bedford', minutes: 30, bearing: 190, pop: 13792, note: 'A limestone quarry town on SR 37 whose kids come up for shows.' },
    { id: 'spencer', kind: 'FEEDER', name: 'Spencer', minutes: 30, bearing: 305, pop: 2454, note: 'A rural county seat, aging.' },
    { id: 'martinsville', kind: 'FEEDER', name: 'Martinsville', minutes: 35, bearing: 15, pop: 11932, note: 'A spa town in the Indianapolis orbit with a bad history; locals are careful there.' },
    { id: 'mitchell', kind: 'FEEDER', name: 'Mitchell', minutes: 35, bearing: 195, pop: 3933, note: 'A railroad and state-park town down SR 37.' },
    { id: 'bloomfield', kind: 'FEEDER', name: 'Bloomfield', minutes: 40, bearing: 250, pop: 2289, note: 'A shrinking rural county seat to the southwest.' },
    { id: 'seymour', kind: 'FEEDER', name: 'Seymour', minutes: 65, bearing: 100, pop: 21569, note: 'A railroad and manufacturing town to the east.' },
    { id: 'terre-haute', kind: 'PEER', name: 'Terre Haute', state: 'IN', minutes: 60, bearing: 275, scene: 700, note: 'A rough, working-class river city with two campuses; a sibling and a rival.' },
    { id: 'columbus', kind: 'PEER', name: 'Columbus', state: 'IN', minutes: 60, bearing: 95, scene: 250, note: 'A company town to the east with a small scene.' },
    { id: 'lafayette', kind: 'PEER', name: 'Lafayette', state: 'IN', minutes: 120, bearing: 355, slug: 'lafayette-in', note: 'A rival college town two hours north.' },
    { id: 'evansville', kind: 'PEER', name: 'Evansville', state: 'IN', minutes: 120, bearing: 230, slug: 'evansville-in', note: 'A bigger river city to the southwest.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Square', route: 'downtown', note: 'Bars, shops and restaurants around Courthouse Square and Kirkwood. Licensed 21+ rooms and the occasional afternoon all-ages show.' },
    { id: 'campus-edge', name: 'the campus edge', route: 'campus', note: 'Big houses cut into student rentals, with party culture and landlords and police who know a loud house.' },
    { id: 'near-west', name: 'the near west side and Prospect Hill', route: 'old-side', note: 'Older houses with porches and some basements; artists, grad students and long-time families. Gentrifying.' },
    { id: 'switchyard', name: 'the old rail yard and McDoel', route: 'work-side', note: 'Former rail land and old warehouses on the south side, now a park and rising rents.' },
    { id: 'south-side', name: 'Bryan Park and the south side', route: 'work-side', note: 'Cheap older houses and garages, more families, and no student landlord.' },
    { id: 'elm-heights', name: 'Elm Heights and the near east side', route: 'old-side', note: 'Quiet, tree-lined and owner-occupied. Neighbors complain fast.' },
    { id: 'east-side', name: 'the east and north sides', route: 'campus', note: 'Chain restaurants, apartment complexes and strip malls on 3rd Street, where the all-ages kids live.' },
    { id: 'county', name: 'Stinesville and the county roads', route: 'work-side', note: 'Barns, yards and quarry country outside the city line. Cheap and loud, but a long drive.' }
  ],

  rooms: [
    { id: 'campus-house', kind: 'HOUSE', hood: 'campus-edge', cap: 60, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, standing: [70, 60, 40],
      pressure: 55, start: true, note: 'A rented student house with a low basement and a living room that doubles as the stage. It lasts until the lease turns over.' },
    { id: 'big-basement', kind: 'HOUSE', hood: 'campus-edge', cap: 120, hostCut: 0, pa: .5, curfew: 1410, ac: false, outdoor: false, standing: [65, 60, 40],
      pressure: 60, note: 'One of the largest basements in town, with a chill room upstairs. The crowd surfs, and the host worries about the ceiling.' },
    { id: 'porch-house', kind: 'HOUSE', hood: 'near-west', cap: 50, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, standing: [65, 60, 50],
      pressure: 45, note: 'A porch and a backyard with a narrow basement stair that dead-ends at the bathroom line. One neighbor\'s call ends it.' },
    { id: 'all-ages-room', kind: 'DIY', hood: 'downtown', cap: 120, rent: 70, pa: .5, curfew: 1380, ac: true, standing: [60, 60, 55],
      pressure: 50, note: 'A small grungy all-ages room just off the center, with food and books. The only regular one, on thin margins.' },
    { id: 'sober-room', kind: 'DIY', hood: 'downtown', cap: 80, rent: 50, pa: .5, curfew: 1350, ac: true, standing: [60, 60, 60],
      pressure: 45, needs: ['VOUCH'], note: 'A collectively run sober room that lives on volunteers and a lease. Be nice to the volunteers.' },
    { id: 'walnut-bar', kind: 'BAR', hood: 'downtown', cap: 250, soundFee: 60, pa: .75, ages: ['A21'], curfew: 1500, ac: true, following: .3, standing: [50, 65, 70],
      note: 'A bar with a stage that books local and regional bands almost every night. Cover at the door, and twenty-one and up.' },
    { id: 'eighteen-room', kind: 'CLUB', hood: 'downtown', cap: 120, houseCosts: 120, split: .8, pa: .8, ages: ['A18'], curfew: 1470, ac: true, following: .4, standing: [50, 65, 65],
      owner: 'TALENT_BUYER', notice: 35, note: 'A small crowded 18-plus room with a good drink list. Quieter than it used to be.' },
    { id: 'main-club', kind: 'CLUB', hood: 'downtown', cap: 300, houseCosts: 200, split: .8, pa: .9, ages: ['A21'], curfew: 1500, ac: true, following: .6, standing: [45, 70, 70],
      owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The town\'s main club, strictly twenty-one and up, so the kids cannot get in. It wants a name.' },
    { id: 'vets-hall', kind: 'HALL', hood: 'east-side', cap: 150, pa: .5, curfew: 1350, ac: true, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'A veterans\'-type hall rented by the night, with a long list of rules from whoever holds the key.' }
  ],
  contacts: ['lafayette-in', 'evansville-in', 'indianapolis', 'louisville', 'cincinnati'],

  calendar: [
    { id: 'bike-race', label: 'the bike race weekend', tag: 'race', month: 4, weeks: [3, 4], dows: [4, 5, 6], can: [.85, .85, .85], hoods: ['campus-edge', 'downtown'], elsewhere: [.95, .92, .92] },
    { id: 'graduation', label: 'graduation weekend', tag: 'graduation', month: 5, weeks: [1, 2], dows: [4, 5, 6], can: [.85, .90, .90] },
    { id: 'arts-fair', label: 'the arts and crafts street fair', tag: 'fair', month: 9, week: 1, dows: [5, 6], can: [.90, .88, .88], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'world-music', label: 'the world music festival', tag: 'festival', month: 9, week: 4, dows: [3, 4, 5, 6], can: [.88, .90, .90], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 3], dows: [5], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.85, .95, .95] },
    { id: 'big-weekend', label: 'the big fall football weekend', tag: 'game', month: 10, weeks: [2, 3], dows: [4, 5, 6], can: [.90, 1.0, 1.0], hoods: ['campus-edge'], elsewhere: [.95, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1260 },

  points: [
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16, pop: 880000 },
    { name: 'Terre Haute', state: 'IN', lat: 39.47, lon: -87.41, pop: 58389 },
    { name: 'Columbus', state: 'IN', lat: 39.2, lon: -85.92, pop: 50474 },
    { name: 'Muncie', state: 'IN', lat: 40.19, lon: -85.39, pop: 65194 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.2, pop: 2800000 }
  ],
  roads: ['I-69', 'SR 37', 'SR 46', 'SR 45', 'I-65', 'I-70'],

  words: {
    street: ['Kirkwood', 'Walnut', 'College Avenue', 'Dunn Street', 'Fourth Street', '3rd Street', 'SR 37', 'SR 46'],
    water: ['Clear Creek', 'Lake Lemon'],
    hood: ['Prospect Hill', 'Elm Heights', 'McDoel', 'Bryan Park', 'Stinesville', 'Ellettsville', 'Vinegar Hill'],
    thing: ['limestone', 'sinkhole', 'quarry', 'porch couch', 'bike path', 'basement', 'persimmon', 'student rental', 'zine table', 'house nickname'],
    weather: ['thunderstorm', 'ice on the hills', 'summer exodus']
  },

  events: [
    { id: 'BLOOMINGTON_IN_LEASE_TURNOVER', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], months: [5, 6, 7, 8] },
      telegraph: 'The tenants at the house you booked are packing up for the summer.',
      title: 'The lease turned over',
      body: 'The students who ran the house graduated, the new tenants have never heard of the bill, and half the street is empty for the summer. The host says the show might still happen if you carry the gear in yourself.',
      options: [
        { id: 'HAUL', label: 'Carry it all in and run it yourself', likely: 'Two hours of your day. A small crowd that listens.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'You borrowed a cart and a porch couch. The few who stayed in town came and went quiet for the first song.' },
        { id: 'PORCH', label: 'Move it to a porch with a neighbor you know', likely: 'Smaller and louder, with a clock on it.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A porch on the near west side took the bill. The neighbor kept one eye on the clock.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'BLOOMINGTON_IN_BIKE_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 4], months: [4], calendar: 'race' },
      telegraph: 'It is the bike race weekend and every house on the edge of campus has a keg on the porch.',
      title: 'The whole campus edge is a party',
      body: 'Thousands of visitors, every hotel sold out, and a neighbor leans over the fence to say they are not doing this tonight. A tiny all-ages room downtown could take the overflow.',
      options: [
        { id: 'OVERFLOW', label: 'Move the bill to the all-ages room downtown', likely: 'Smaller, safer, and the crowd finds you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'DIY', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.05 }],
          result: 'The little room downtown was packed all night with people who wanted somewhere quiet to be loud.' },
        { id: 'EARLY', label: 'Play early and shut down before the street fills', likely: 'A short night. The neighbor relaxes.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Done by nine. The street was a sea of coolers by ten.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The crowd is distracted and the police are close.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'Half the room kept wandering out to see what was going on in the street.' }
      ] },

    { id: 'BLOOMINGTON_IN_BIG_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 4], months: [10], calendar: 'game' },
      telegraph: 'It is the big football weekend. The parties will be huge and the police have added cars.',
      title: 'The party houses go big',
      body: 'A bigger crowd and more police than usual, and the town remembers what happened at a party on this weekend. The host wants to cancel or move the show.',
      options: [
        { id: 'MOVE_ROOM', label: 'Move the bill to a licensed room', likely: 'Safer, but nobody under 21 gets in.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'BAR', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The bar took the bill with an hour to spare. The kids were left on the porch.' },
        { id: 'QUIET', label: 'Keep the house show, shorter and quieter', likely: 'Fewer people. Fewer problems.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'An acoustic-ish early set and a front door with two big friends on it. Nothing happened, which was the point.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] }
  ]
});
