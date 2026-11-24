SB.Cities.register('ocala-fl', {
  v: 1,
  slug: 'ocala-fl',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['college of central florida', 'central florida college', 'university of florida', 'florida gators', 'ucf', 'florida state', 'florida state university',
           'h.i.t.s.', 'hits horse show', 'horse capital of the world', 'ocala star-banner', 'star-banner', 'e-one', 'walmart', 'waffle house', 'publix',
           'florida highway patrol', 'marion county sheriff', 'florida division of alcoholic beverages', 'on top of the world', 'the villages',
           'silver springs state park', 'silver springs attraction', 'vfw', 'american legion', 'daytona international speedway', 'embry-riddle',
           'the sand pine room', 'fence line hall', 'scrub jay annex', 'the paddock back lot', 'fountain street rec', 'limerock social club',
           'palmetto lodge no. 9', 'palmetto lodge', 'the gravel stable', 'blue run hall', 'cypress lane garage', 'the tin barn', 'sinkhole social',
           'light up ocala', 'brick city bluegrass festival', 'brick city', 'bluegrass and bbq', 'ocala fine arts festival', 'ocala arts festival',
           'first friday art walk', 'ocala downtown market', 'marion county fair', 'florida kids helping kids', 'i-75 flea market', 'world equestrian center',
           'winter spectacular', 'orange blossom classic', 'hits ocala', 'ocala breeders', 'king of the wing', 'oktoberfest', 'festivals of speed',
           'festival at fort king', 'ocala strawberry festival', 'ocala symphony orchestra', 'ocala civic theatre', 'ocala police department',
           'ocala main street', '352today', 'ocala post', 'ocala buzz', 'only in ocala', 'gainesville fest', 'tuscawilla park'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real schools, press, chains and posts are written only in generic form. */
  blocklist: ['star-banner*', 'waffle house*', 'sand pine room*', 'limerock social*', 'sinkhole social*', 'scrub jay annex*', 'palmetto lodge*'],

  blurb: ['Out past the horse farms, garages and halls hold a small, hot scene with no university to feed it new kids each fall.',
          'Most nights the best show is a drive away, and nobody minds. It lives in garages, carports and parking lots.'],
  hard: 'Few real rooms, long drives, and a neighbor with a phone.',
  region: 'Florida',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38 },
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46 },
    { name: 'Jacksonville', state: 'FL', lat: 30.33, lon: -81.66 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Ocala' },
    { id: 'belleview', kind: 'FEEDER', name: 'Belleview', minutes: 15, bearing: 185, note: 'A small suburb just south on US 441; retirees and families, and high-school bands.' },
    { id: 'silver-springs-shores', kind: 'FEEDER', name: 'Silver Springs Shores and Ocklawaha', minutes: 20, bearing: 120, note: 'Huge platted subdivisions of ranch houses on sandy lots: the best garage and backyard country.' },
    { id: 'reddick', kind: 'FEEDER', name: 'Reddick and Citra', minutes: 25, bearing: 10, note: 'Farm and horse country north; the kids here have the longest drives.' },
    { id: 'dunnellon', kind: 'FEEDER', name: 'Dunnellon', minutes: 30, bearing: 235, note: 'A small, loyal river and mining town to the southwest.' },
    { id: 'williston', kind: 'FEEDER', name: 'Williston', minutes: 35, bearing: 320, note: 'Rural farm and springs country on US 27.' },
    { id: 'wildwood', kind: 'FEEDER', name: 'Wildwood and Bushnell', minutes: 40, bearing: 190, note: 'An old-age crossroads on I-75; few young fans and everyone needs a ride.' },
    { id: 'inverness', kind: 'FEEDER', name: 'Inverness', minutes: 40, bearing: 250, note: 'A retirement-heavy county seat; its kids drive to Ocala or Gainesville.' },
    { id: 'salt-springs', kind: 'FEEDER', name: 'Salt Springs and the forest', minutes: 50, bearing: 75, note: 'Fish camps and campgrounds through the scrub on long dark roads.' },
    { id: 'leesburg', kind: 'FEEDER', name: 'Leesburg and Eustis', minutes: 55, bearing: 150, note: 'Lakefront retiree towns that pull toward Orlando.' },
    { id: 'palatka', kind: 'FEEDER', name: 'Palatka', minutes: 65, bearing: 50, note: 'An old river town that looks toward Jacksonville as much as Ocala.' },
    { id: 'gainesville', kind: 'PEER', name: 'Gainesville', minutes: 45, bearing: 355, slug: 'gainesville-fl', note: 'The university town up the road, twice the size, where Ocala kids go most.' },
    { id: 'lakeland', kind: 'PEER', name: 'Lakeland', minutes: 100, bearing: 195, slug: 'lakeland-fl', note: 'A similar inland Florida city down I-75 and I-4.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Square', route: 'downtown', note: 'Brick streets around a fountain square, newly full of breweries and restaurants; less friendly to loud, cheap shows each year.' },
    { id: 'historic', name: 'the historic district', route: 'old-side', note: 'Victorian houses and preservation-minded neighbors; almost no shows, and a lot of quiet.' },
    { id: 'west-ocala', name: 'West Ocala', route: 'old-side', note: 'A long-standing Black community of small old houses, churches and halls. Not a place to treat as a rough punk district.' },
    { id: 'sr-200', name: 'the southwest sprawl on SR 200', route: 'campus', note: 'The mall, big-box stores, apartments and a commuter campus: where teenagers actually hang out, in parking lots and strip-mall units.' },
    { id: 'silver-springs-blvd', name: 'Silver Springs Boulevard', route: 'work-side', note: 'The old tourist strip east: pawn shops, motels, used-car lots, cheap units and bar back rooms.' },
    { id: 'shores', name: 'Silver Springs Shores and Marion Oaks', route: 'work-side', note: 'Cheap ranch houses on big lots with garages and carports and few neighbors close enough to hear.' },
    { id: 'south', name: 'south toward Belleview', route: 'campus', note: 'Retirement belt and newer subdivisions; mostly a source of noise complaints.' },
    { id: 'west-i75', name: 'the west side near I-75', route: 'work-side', note: 'Horse barns, hotels and big arenas at the interstate. Built for visitors, not for kids with a van.' }
  ],

  rooms: [
    { id: 'shores-garage', kind: 'HOUSE', hood: 'shores', cap: 50, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 45, start: true, note: 'A garage on a big sandy lot in the platted streets. The first room, no AC, and it ends when a neighbor calls the sheriff.' },
    { id: 'armory-hall', kind: 'HALL', hood: 'downtown', cap: 200, rent: 150, deposit: 100, pa: .5, curfew: 1320, ac: true, sketch: 10, standing: [50, 60, 55],
      owner: 'HALL_MANAGER', pressure: 45, note: 'The old armory by the park carried the all-ages years. Reviving it means a rental, a deposit and an adult who will sign.' },
    { id: 'post-hall', kind: 'HALL', hood: 'south', cap: 150, rent: 120, deposit: 75, pa: .5, curfew: 1320, ac: true, sketch: 10, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'A post hall out toward Belleview, rented by the night. Cheap, with a bar the post runs and a long list of rules.' },
    { id: 'strip-unit', kind: 'DIY', hood: 'sr-200', cap: 80, rent: 60, deposit: 0, pa: .5, curfew: 1350, ac: true, sketch: 40, standing: [55, 60, 45],
      pressure: 55, needs: ['VOUCH'], note: 'A strip-mall unit by the mall where the teenagers already are. It lasts until the landlord or the fire marshal notices.' },
    { id: 'record-shop', kind: 'SHOP', hood: 'sr-200', cap: 40, pa: .4, curfew: 1080, ac: true, sketch: 5, standing: [65, 65, 75], following: .2,
      note: 'A shop on the sprawl with an afternoon in-store set. Done by six, and nobody is turned away.' },
    { id: 'scrub-yard', kind: 'OUTDOOR', hood: 'shores', cap: 60, rent: 10, pa: .4, curfew: 1320, sketch: 35, standing: [60, 55, 40],
      note: 'A generator show on family land in the scrub. Dark, far out, and a burn ban in spring makes the fire ring a gamble.' },
    { id: 'square-bar', kind: 'BAR', hood: 'downtown', cap: 120, soundFee: 50, pa: .7, ages: ['A21'], matinee: true, curfew: 1560, ac: true, following: .4, sketch: 20,
      standing: [55, 65, 75], pressure: 50, note: 'The dive on the Square with a small stage and a mural. Punk, hardcore and metal most weeks, and touring bands fill the gap between two cities.' },
    { id: 'strip-bar', kind: 'BAR', hood: 'downtown', cap: 100, soundFee: 40, pa: .6, ages: ['A21'], curfew: 1500, ac: true, following: .2, sketch: 15,
      standing: [50, 65, 70], note: 'A second bar down the strip that hosts the odd emo night or karaoke with a band. Locals count the whole town as a couple of rooms.' },
    { id: 'boulevard-club', kind: 'CLUB', hood: 'silver-springs-blvd', cap: 250, houseCosts: 150, split: .8, pa: .8, ages: ['A18', 'A21'], curfew: 1530, ac: true, following: .4, sketch: 20,
      standing: [45, 65, 65], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A rock bar back room on the old tourist strip, between motels and pawn shops. For the bigger nights, once you have a name.' },
    { id: 'arena', kind: 'BIG', hood: 'west-i75', cap: 800, rent: 1800, deposit: 500, pa: .9, ages: ['ALL'], curfew: 1380, ac: true, sketch: 5, standing: [40, 60, 60],
      owner: 'TALENT_BUYER', notice: 90, needs: ['FULL_BILL'], note: 'A theater-style hall by the interstate. Not a punk room, but the once-a-year step up.' }
  ],

  contacts: ['gainesville-fl', 'lakeland-fl', 'daytona-beach-fl', 'tampa', 'jacksonville'],

  calendar: [
    { id: 'square-lights', label: 'the holiday lighting parade', tag: 'parade', month: 11, week: 3, dows: [5], can: [.75, .70, .70], hoods: ['downtown'], elsewhere: [.95, .92, .92] },
    { id: 'horse-circuit', label: 'the winter horse circuit', tag: 'festival', month: 2, weeks: [1, 5], dows: [2, 3, 4, 5, 6], can: [.95, .90, .90], hoods: ['west-i75', 'sr-200'], elsewhere: [1, .97, .97] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 3, week: 3, dows: [1, 2, 3, 4, 5, 6], can: [.90, .88, .88] },
    { id: 'arts-festival', label: 'the downtown arts festival', tag: 'festival', month: 10, week: 4, dows: [5, 6], can: [.90, .88, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'football-fall', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1740, inForce: true } },

  points: [
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38, pop: 2700000 },
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46, pop: 3200000 },
    { name: 'Jacksonville', state: 'FL', lat: 30.33, lon: -81.66, pop: 1600000 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 6100000 }
  ],
  roads: ['I-75', 'US 27', 'US 441', 'SR 40', 'SR 200', 'US 301'],

  words: {
    street: ['Silver Springs Boulevard', 'SR 200', 'SR 40', 'Pine Avenue', 'College Road', 'Fort King Street'],
    water: ['the Rainbow River', 'Silver Springs', 'the Ocklawaha', 'Lake Weir'],
    hood: ['Silver Springs Shores', 'Marion Oaks', 'Ocklawaha', 'Belleview', 'Reddick', 'West Ocala'],
    thing: ['horse trailer', 'sand pit', 'pasture fence', 'garage fan', 'boiled peanuts', 'sweet tea', 'scrub', 'carport', 'exit strip', 'concrete-block garage'],
    weather: ['afternoon thunderstorm', 'brush-fire warning', 'storm watch']
  },

  events: [
    { id: 'OCALA_FL_SQUARE_PARADE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'Barricades are going up around the fountain square for the big Saturday in November.',
      title: 'Load-in through a parade',
      body: 'Thousands are on the brick streets for the lighting parade, and the bar show has to carry its gear in through the crowd before the floats finish.',
      options: [
        { id: 'EARLY', label: 'Load in at noon, before the streets close', likely: 'Everything is in early, but it\'s a long wait for doors.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The gear was on stage by one, and the crowd found the room after the last float.' },
        { id: 'LATE', label: 'Push doors back until the parade is over', likely: 'The ones who stayed downtown wander in.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 75 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors opened an hour late, and the street emptied and the bar filled.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Nobody can park, and the regulars know it.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Half the list gave up on parking, and the room was thin and loud.' }
      ] },

    { id: 'OCALA_FL_HORSE_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'festival', months: [1, 2, 3, 4] },
      telegraph: 'Horse trailers are lined up on the interstate and the west side is gridlocked.',
      title: 'The west side is all trailers',
      body: 'Week after week of riders has jammed the roads. Half your crowd is coming straight from a barn shift in boots, and nobody knows when they will arrive.',
      options: [
        { id: 'LATE', label: 'Start late and let them straggle in', likely: 'You start late, but they show up.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'The first band played to six people, and by the last one the room was full of boots.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The early bands play to nobody.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The traffic never cleared, and the early bands played for the bar staff.' }
      ] },

    { id: 'OCALA_FL_BURN_BAN', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [3, 4, 5] },
      telegraph: 'No rain in weeks and a burn ban has been posted across the scrub.',
      title: 'The fire ring is off',
      body: 'The generator show on family land was built around a fire ring, and the ban is posted at the county line. The scrub is dry as paper.',
      options: [
        { id: 'NOFIRE', label: 'Run it dark with no fire', likely: 'It\'s safer and a little flat, and fewer come out.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'There was no fire, just a few flashlights and a loud set, and the ones who came did not mind.' },
        { id: 'GARAGE', label: 'Roll it into a garage instead', likely: 'It\'s smaller and hotter, but legal.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A garage took the bill, and the crowd stood in the driveway with the door up.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] }
  ]
});
