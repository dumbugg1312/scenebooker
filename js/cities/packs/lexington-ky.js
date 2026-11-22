SB.Cities.register('lexington-ky', {
  v: 1,
  slug: 'lexington-ky',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of kentucky', 'kentucky wildcats', 'big blue nation', 'lexvegas', 'wrfl', 'wuky', 'lexington herald-leader', 'herald-leader',
           'kentucky kernel', 'ace weekly', 'eastern kentucky university', 'georgetown college', 'centre college', 'transylvania university',
           'berea college', 'morehead state university', 'morehead state', 'kentucky state university', 'fort knox', 'fort campbell',
           'kentucky derby', 'keeneland', 'kentucky horse park', 'rupp arena', 'ale-8-one', 'ale-8', 'waffle house', 'toyota', 'vfw',
           'american legion', 'elks', 'moose lodge', 'knights of columbus', 'hot brown',
           'the fence row', 'stall nine', 'town branch hall', 'the pepper cellar', 'sinkhole social club', 'burgoo annex', 'the allotment',
           'plank road room', 'tobacco barn number four', 'the mule barn', 'bluegrass bingo hall', 'the switchman\'s loft',
           'kroger field', 'blue grass stakes', 'woodland art fair', 'roots and heritage', 'punk rock flea market', 'distorted mess fest', '859 fest',
           'bluegrass convention center', 'lexarts', 'visitlex', 'civiclex', 'ace magazine', 'fox 56', 'wkyt', 'fourth street live', 'churchill downs',
           'kentucky three-day event', 'louisville cardinals', 'lexington police department', 'lexington-fayette urban county government', 'jamcats', 'exploreuk'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['wrfl*', 'wuky*', 'keeneland*', 'herald-leader*', 'kentucky kernel*', 'ale-8*', 'waffle house*', 'rupp arena*', 'churchill downs*', 'fourth street live*'],

  blurb: ['A horse-country college town where the scene swells with the semester and shrinks to a stubborn core in summer. Bluegrass roots run under the punk.',
          'Everyone knows everyone in the room, everyone drives, and Louisville is always an hour away.'],
  hard: 'Term-time crowds vanish in summer, game days eat the weekend, and bars card kids.',
  region: 'the Bluegrass',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76 },
    { name: 'Cincinnati', state: 'OH', lat: 39.1, lon: -84.51 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83.0 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Lexington' },
    { id: 'nicholasville', kind: 'FEEDER', name: 'Nicholasville', minutes: 25, bearing: 190, note: 'A fast-growing bedroom suburb; kids drive north.' },
    { id: 'georgetown', kind: 'FEEDER', name: 'Georgetown', minutes: 25, bearing: 350, note: 'A factory-family town with a small college and a small teen scene.' },
    { id: 'versailles', kind: 'FEEDER', name: 'Versailles', minutes: 25, bearing: 260, note: 'Horse-farm money and a small scene; kids drive in.' },
    { id: 'winchester', kind: 'FEEDER', name: 'Winchester', minutes: 25, bearing: 95, note: 'Farm and light manufacturing, with a modest teen scene.' },
    { id: 'richmond', kind: 'FEEDER', name: 'Richmond', minutes: 30, bearing: 160, note: 'A regional university town with student-run shows; the likeliest full van.', bands: 3 },
    { id: 'paris', kind: 'FEEDER', name: 'Paris', minutes: 30, bearing: 40, note: 'Horse and whiskey country; few shows.' },
    { id: 'frankfort', kind: 'FEEDER', name: 'Frankfort', minutes: 35, bearing: 295, note: 'The state capital and a government town with a small scene.' },
    { id: 'berea', kind: 'FEEDER', name: 'Berea', minutes: 40, bearing: 170, note: 'A craft-and-folk college town; students come to shows.' },
    { id: 'mount-sterling', kind: 'FEEDER', name: 'Mount Sterling', minutes: 40, bearing: 90, note: 'A farm town that pulls toward Lexington.' },
    { id: 'danville', kind: 'FEEDER', name: 'Danville', minutes: 45, bearing: 215, note: 'A small college town with a little radio-minded crowd.' },
    { id: 'morehead', kind: 'FEEDER', name: 'Morehead', minutes: 70, bearing: 85, note: 'A mountain-gateway university town with a scene of its own.' },
    { id: 'london-corbin', kind: 'FEEDER', name: 'London and Corbin', minutes: 65, bearing: 190, note: 'Edge-of-the-mountains towns with metal and hardcore kids who treat Lexington as the big city.' },
    { id: 'dayton', kind: 'PEER', name: 'Dayton', state: 'OH', minutes: 135, bearing: 350, slug: 'dayton-oh', note: 'A smaller city with a deeper garage reputation than it gets credit for.' },
    { id: 'huntington', kind: 'PEER', name: 'Huntington', state: 'WV', minutes: 135, bearing: 85, slug: 'huntington-wv', note: 'A river and college town; the two trade bands along I-64.' },
    { id: 'bowling-green', kind: 'PEER', name: 'Bowling Green', minutes: 120, bearing: 225, scene: 900, note: 'A smaller college town to the southwest.' },
    { id: 'knoxville', kind: 'PEER', name: 'Knoxville', slug: 'knoxville-tn', state: 'TN', minutes: 170, bearing: 175, scene: 2500, note: 'Bigger, with the same university-and-mountains feel; the two trade bands on I-75.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Licensed bars, restaurants and parking decks around the old creek valley; not cheap and hard to do anything unlicensed.' },
    { id: 'north-limestone', name: 'North Limestone', route: 'old-side', note: 'A working-class strip turned cool, with small storefronts and side-street houses; rents are rising and neighbors are being displaced.' },
    { id: 'distillery-district', name: 'the Distillery District', route: 'work-side', note: 'Brick warehouses by the old railyards, mostly turned to event spaces and tourism; once cheap, now owned by development money.' },
    { id: 'campus-edge', name: 'the streets around campus', route: 'campus', note: 'Student rentals, old brick houses and apartment towers; house shows with thin walls and landlord noise clauses.' },
    { id: 'south-side', name: 'the south side', route: 'campus', note: 'Strip malls, ranch subdivisions and apartment blocks along the south pikes; the likeliest home for a strip-unit all-ages room.' },
    { id: 'east-end', name: 'the east end', route: 'work-side', note: 'Cheap older housing, garages and light industry along Winchester Road; the likeliest warehouse geography.' },
    { id: 'north-side', name: 'the northside', route: 'work-side', note: 'Working-class streets and industrial units toward Georgetown Road; garages and houses.' },
    { id: 'leestown', name: 'the Leestown Road corridor', route: 'work-side', note: 'A northwest road of body shops, truck lots and a few bars with stages out back; cars, not walking.' }
  ],

  rooms: [
    { id: 'campus-house', kind: 'HOUSE', hood: 'campus-edge', cap: 40, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, sketch: 25, standing: [70, 55, 40],
      pressure: 55, start: true, note: 'A living room and porch in an old brick rental near campus. The lease has a noise clause and one neighbor has a phone.' },
    { id: 'limestone-house', kind: 'HOUSE', hood: 'north-limestone', cap: 50, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: true, sketch: 25, standing: [65, 60, 45],
      pressure: 50, note: 'A side-street house with a yard. Rents are climbing and every year another house on the block gets sold.' },
    { id: 'east-garage', kind: 'HOUSE', hood: 'east-end', cap: 60, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 40, note: 'A garage and carport set on a cheap old street. The neighbors have no stake in the scene and no opinion of it yet.' },
    { id: 'limestone-basement', kind: 'DIY', hood: 'north-limestone', cap: 80, rent: 60, deposit: 0, pa: .5, curfew: 1350, ac: false, sketch: 35, standing: [60, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'A sober all-ages basement room behind a shop, so kids can come. It lives or dies on a fire inspection: a second exit and sprinklers.' },
    { id: 'east-warehouse', kind: 'DIY', hood: 'east-end', cap: 100, rent: 70, deposit: 0, pa: .6, curfew: 1380, ac: false, sketch: 45, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'A practice-space unit along Winchester Road turned show room for a season. The lease and the zoning are not on your side.' },
    { id: 'south-hall', kind: 'HALL', hood: 'south-side', cap: 150, rent: 180, deposit: 100, pa: .5, curfew: 1320, ac: true, sketch: 10, standing: [60, 60, 65],
      owner: 'HALL_MANAGER', note: 'A rented lodge on the south side. All ages, no beer, a deposit and insurance, and out by ten.' },
    { id: 'limestone-shop', kind: 'SHOP', hood: 'north-limestone', cap: 60, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [70, 70, 75], following: .2,
      note: 'A record shop on the strip. An in-store afternoon set, short and polite, over by seven.' },
    { id: 'leestown-bar', kind: 'BAR', hood: 'leestown', cap: 150, soundFee: 50, pa: .6, ages: ['A18', 'A21'], curfew: 1530, ac: true, following: .3, sketch: 20, standing: [50, 65, 65],
      pressure: 50, note: 'A bar with a stage out back and a wristband for 18-plus. The liquor license is the whole worry.' },
    { id: 'limestone-bar', kind: 'BAR', hood: 'north-limestone', cap: 120, soundFee: 50, pa: .7, ages: ['A21'], curfew: 1560, ac: true, following: .3, sketch: 15, standing: [45, 65, 75],
      note: 'A dark bar that has taken hardcore and doom bills for years. Drinks first, the band second.' },
    { id: 'campus-club', kind: 'CLUB', hood: 'campus-edge', cap: 250, houseCosts: 150, split: .8, pa: .9, ages: ['A18'], curfew: 1440, ac: true, following: .5, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The club by campus, hardcore fest days and mid-bills. The crowd follows the school terms.' },
    { id: 'west-club', kind: 'CLUB', hood: 'downtown', cap: 300, houseCosts: 150, split: .8, pa: .85, ages: ['A21'], curfew: 1560, ac: true, following: .5, sketch: 25,
      standing: [45, 65, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A rough bar-club on the west side that has taken punk and metal for years. It is the room that stayed.' },
    { id: 'distillery-hall', kind: 'BIG', hood: 'distillery-district', cap: 1200, rent: 1800, deposit: 500, pa: .95, ages: ['ALL'], curfew: 1380, ac: true, sketch: 5, standing: [40, 65, 70],
      notice: 84, note: 'A big all-ages hall in the old brick warehouses. Touring bills come here; locals only open.' }
  ],

  contacts: ['dayton-oh', 'huntington-wv', 'knoxville-tn', 'louisville', 'cincinnati'],

  calendar: [
    { id: 'spring-meet', label: 'the spring race meet', tag: 'race', month: 4, weeks: [1, 4], dows: [4, 5, 6], can: [.92, .90, .88], hoods: ['downtown', 'south-side'], elsewhere: [1, .97, .97] },
    { id: 'art-fair', label: 'the neighborhood art fair', tag: 'fair', month: 8, week: 3, dows: [5, 6], can: [.92, .90, .88], hoods: ['campus-edge'], elsewhere: [1, .97, .97] },
    { id: 'street-festival', label: 'the downtown street festival', tag: 'festival', month: 9, week: 2, dows: [4, 5, 6], can: [.90, .85, .85], hoods: ['downtown'], elsewhere: [1, .95, .95] },
    { id: 'flea-market', label: 'the record and zine flea market', tag: 'festival', month: 10, week: 1, dows: [5], can: [.88, .92, .92] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.85, .95, .95], hoods: ['campus-edge'], elsewhere: [.95, .97, .97] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.85, .95, .95], hoods: ['campus-edge'], elsewhere: [.95, .97, .97] },
    { id: 'football-nov', label: 'the rivalry game weekend', tag: 'game', month: 11, weeks: [1, 4], dows: [5], can: [.85, .93, .93] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1440, weekend: 1440, inForce: true } },

  points: [
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76, pop: 1300000 },
    { name: 'Cincinnati', state: 'OH', lat: 39.1, lon: -84.51, pop: 2250000 },
    { name: 'Knoxville', state: 'TN', lat: 35.96, lon: -83.92, pop: 900000 },
    { name: 'Charleston', state: 'WV', lat: 38.35, lon: -81.63, pop: 200000 }
  ],
  roads: ['I-75', 'I-64', 'New Circle Road', 'US 27', 'US 60', 'Mountain Parkway'],

  words: {
    street: ['Main Street', 'Limestone', 'Euclid Avenue', 'Nicholasville Road', 'Richmond Road', 'Winchester Road', 'Versailles Road', 'Tates Creek Road', 'New Circle'],
    water: ['Town Branch', 'the Kentucky River'],
    hood: ['North Limestone', 'Ashland Park', 'Woodland Park', 'Aylesford', 'Eastland', 'Manchester Street'],
    thing: ['tallboy', 'horse trailer', 'plank fence', 'tobacco barn', 'bourbon barrel', 'beer cheese', 'taqueria', 'ice storm', 'ring road', 'ginger soda', 'carport show', 'wristband', 'ring road', 'ginger soda', 'carport show', 'wristband'],
    weather: ['ice storm', 'heavy rain']
  },

  events: [
    { id: 'LEXINGTON_KY_RACE_MEET', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'race' },
      telegraph: 'The race meet is on and every deck on the south pikes is full of visitors.',
      title: 'Horse weekend',
      body: 'The track has money and cars on every road to the west side. The wristband line at the door is full of visitors who came for a drink and might stay for the band.',
      options: [
        { id: 'OPEN', label: 'Open the door wide and let the visitors in', likely: 'More heads, a few who do not know what they walked into.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.1 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'A lot of curious drinkers wandered in, and a few stayed to the end. Louder than the regulars liked.' },
        { id: 'EARLY', label: 'Start early and finish before the traffic', likely: 'The locals make it. The visitors are at dinner.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .92 }],
          result: 'Doors early. A tight night for the ones who know the room.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The roads and the lots take some of your list.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Half the usual crowd lost an hour in traffic. The ones who made it stayed late.' }
      ] },

    { id: 'LEXINGTON_KY_FIRE_INSPECTOR', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 5] },
      telegraph: 'Word on North Limestone is that the fire inspector is walking through the new basement room.',
      title: 'The inspector walks the basement',
      body: 'A fire inspector is going through the basement all-ages room in its third month. You have a week to add a second exit and sprinklers, or the sober shows end there.',
      options: [
        { id: 'PAY', label: 'Pay for a quick second exit and a sprinkler quote', likely: 'Costs real money, and the room might stay open.',
          effects: [{ op: 'MONEY', amount: -60 }],
          result: 'A cut-out door and a quote on paper. The inspector gave you thirty days.' },
        { id: 'HOUSE', label: 'Move the bill to a house for the week', likely: 'Smaller and louder, with neighbors on every side.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A side-street house took the bill, and the floor was packed.' },
        { id: 'ACCEPT', label: 'Run it and hope', likely: 'Nervous kids. Some stay home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'Nobody came to check. The word got around anyway and some stayed away.' }
      ] },

    { id: 'LEXINGTON_KY_RIVALRY_SATURDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game', months: [11] },
      telegraph: 'Rivalry Saturday is here, and the campus is emptying for the Thanksgiving break.',
      title: 'Parking but no audience',
      body: 'The tailgates have the campus streets, and the students are already on the highway home. A house show near campus has a place to park and nobody to play for.',
      options: [
        { id: 'LATE', label: 'Push doors back until the game is over', likely: 'The town crowd shows up. Later than planned.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. The ones who stayed in town came in loud and happy.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Half the list is out of town.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Students gone, regulars only. A small night, a good one.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] }
  ]
});
