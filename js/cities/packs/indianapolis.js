SB.Cities.register('indianapolis', {
  v: 1,
  slug: 'indianapolis',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['indiana university', 'iupui', 'iu indianapolis', 'butler university', 'university of indianapolis', 'marian university', 'ball state', 'purdue', 'notre dame',
           'indianapolis star', 'indystar', 'nuvo', 'mirror indy', 'indianapolis business journal', 'ibj', 'wish-tv', 'wthr', 'wrtv', 'wfyi', 'indianapolis colts', 'indiana pacers',
           'indianapolis indians', 'indy fuel', 'indianapolis motor speedway', 'indy 500', 'indianapolis 500', 'brickyard 400', 'indiana state fair', 'gen con', 'lucas oil stadium',
           'gainbridge fieldhouse', 'eli lilly', 'elevance', 'cummins', 'fedex', 'allison transmission', 'naval surface warfare center crane', 'fort benjamin harrison',
           'colts', 'pacers', 'monon trail', 'circle centre', 'axios indianapolis', 'pollstar', 'the hard times', 'impd', 'indianapolis metropolitan police',
           'city-county council', '500 festival', 'mini-marathon', 'indy mini', 'carb day', 'indianapolis motor speedway', 'indiana convention center', 'state fairgrounds', 'final four', 'ivy tech', 'wishtv', 'wnba all-star'],
  blocklist: ['indystar*', 'indianapolis star*', 'nuvo*', 'gen con*', 'indy 500*', 'lucas oil*', 'brickyard 400*'],

  blurb: ['A flat, car-bound state capital wrapped in a ring road, with a young hardcore crowd that carries the all-ages rooms in the old brick strips.',
          'Everyone drives in from the suburbs and leaves right after the show. Rooms open and close when the landlord sells the block, so the scene spreads thin across the neighborhoods.'],
  hard: 'Kids need rides home to the suburbs, and halls vanish when buildings sell.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Cincinnati', state: 'OH', lat: 39.1, lon: -84.51 },
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83.0 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'Young kids carry all-ages hardcore here and fill the small rooms.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Indianapolis' },
    { id: 'greenwood', kind: 'FEEDER', name: 'Greenwood', minutes: 20, bearing: 185, note: 'A south suburb with garage bands.' },
    { id: 'plainfield', kind: 'FEEDER', name: 'Plainfield', minutes: 20, bearing: 250, note: 'Truck stops and warehouses at the west edge.' },
    { id: 'carmel', kind: 'FEEDER', name: 'Carmel', minutes: 25, bearing: 340, note: 'A wealthy suburb with some pop-punk and emo kids.' },
    { id: 'greenfield', kind: 'FEEDER', name: 'Greenfield', minutes: 25, bearing: 85, note: 'An east county seat.' },
    { id: 'fishers', kind: 'FEEDER', name: 'Fishers', minutes: 30, bearing: 30, note: 'A rich suburb; kids drive in on weekends.' },
    { id: 'noblesville', kind: 'FEEDER', name: 'Noblesville', minutes: 30, bearing: 25, note: 'A fast-growing suburb.' },
    { id: 'franklin', kind: 'FEEDER', name: 'Franklin', minutes: 30, bearing: 190, note: 'A small college town to the south.' },
    { id: 'lebanon', kind: 'FEEDER', name: 'Lebanon', minutes: 35, bearing: 320, note: 'A small town up I-65 with a few kids.' },
    { id: 'bloomington', kind: 'PEER', name: 'Bloomington', minutes: 60, bearing: 210, slug: 'bloomington-in', note: 'A college town with its own house shows.' },
    { id: 'muncie', kind: 'PEER', name: 'Muncie', minutes: 60, bearing: 60, note: 'A smaller scene to the northeast.' },
    { id: 'lafayette', kind: 'PEER', name: 'Lafayette', minutes: 75, bearing: 320, slug: 'lafayette-in', note: 'A campus town with a smaller scene.' }
  ],

  hoods: [
    { id: 'fountain-square', name: 'Fountain Square', route: 'old-side', note: 'An old brick strip southeast of downtown: bars, a bowling alley, record shops. The center of all-ages punk right now.' },
    { id: 'broad-ripple', name: 'Broad Ripple', route: 'downtown', note: 'The old party strip on the canal, with a newer all-ages room in a former bar. The older bars are going.' },
    { id: 'irvington', name: 'Irvington', route: 'old-side', note: 'Old east-side houses and porches. House-show country, and the porches have opinions.' },
    { id: 'garfield-park', name: 'Garfield Park', route: 'old-side', note: 'A south-side park neighborhood with cheap houses and basements.' },
    { id: 'near-east', name: 'Near Eastside', route: 'work-side', note: 'Mixed industry and rowhouse blocks. Warehouse and gallery spaces.' },
    { id: 'mass-ave', name: 'Mass Ave', route: 'downtown', note: 'Theaters and clubs on a diagonal avenue. Pricey for kids.' },
    { id: 'haughville', name: 'Haughville and the Near Westside', route: 'work-side', note: 'Cheap old frame houses beside the rail yards and factories.' },
    { id: 'midtown', name: 'Butler-Tarkington and 34th Street', route: 'campus', note: 'North side by a private campus. A gallery space here has run hardcore matinees.' },
    { id: 'southport', name: 'Southport and Perry Township', route: 'campus', note: 'Suburban south side: garages and strip malls.' }
  ],

  rooms: [
    { id: 'irvington-porch', kind: 'HOUSE', hood: 'irvington', cap: 60, curfew: 1350, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45], pressure: 55, start: true,
      note: 'A basement and a porch on an old east-side street, with the address passed by word of mouth. The neighbors on the porches decide how long it lasts.' },
    { id: 'garfield-basement', kind: 'HOUSE', hood: 'garfield-park', cap: 50, curfew: 1350, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45], pressure: 50,
      note: 'A basement and a garage beside the park. Fine until somebody calls it in.' },
    { id: 'haughville-house', kind: 'HOUSE', hood: 'haughville', cap: 80, curfew: 1380, ac: false, outdoor: false, sketch: 30, standing: [60, 60, 45], pressure: 45,
      note: 'A frame house by the rail yards, where loud is easier. The landlord keeps talking about selling and the heat is a space heater.' },
    { id: 'southport-garage', kind: 'HOUSE', hood: 'southport', cap: 40, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [65, 60, 50], pressure: 45,
      note: 'A garage in the south suburbs for the kids who cannot drive north.' },
    { id: 'near-east-warehouse', kind: 'DIY', hood: 'near-east', cap: 120, rent: 70, curfew: 1380, ac: false, sketch: 45, standing: [55, 60, 45], pressure: 60, needs: ['VOUCH'],
      note: 'A warehouse or storefront with a hand-painted sign. Zoning and the fire code are the risk.' },
    { id: 'square-collective', kind: 'DIY', hood: 'fountain-square', cap: 150, rent: 80, curfew: 1380, ac: true, sketch: 40, standing: [60, 65, 55], pressure: 55,
      note: 'A collective\'s all-ages room on the old brick strip. The booker\'s rooms have come and gone for twenty years.' },
    { id: 'gallery-room', kind: 'DIY', hood: 'midtown', cap: 100, rent: 60, curfew: 1350, ac: true, sketch: 25, standing: [65, 65, 55], pressure: 45,
      note: 'A gallery-style space north of the campus with no bar. Hardcore matinees in the afternoon and a bill in the evening.' },
    { id: 'bowling-bar', kind: 'BAR', hood: 'fountain-square', cap: 150, ages: ['ALL', 'A21'], soundFee: 50, curfew: 1380, ac: true, following: .4, sketch: 20, standing: [55, 70, 70],
      note: 'A bowling alley with a stage that became the hotspot for all-ages punk. A hardcore singer books it.' },
    { id: 'square-record-shop', kind: 'SHOP', hood: 'fountain-square', cap: 100, curfew: 1290, ac: true, sketch: 5, standing: [70, 70, 80], following: .25,
      note: 'A record shop that hosts punk and hardcore bills. An early start, and cleared out by closing.' },
    { id: 'square-club', kind: 'CLUB', hood: 'fountain-square', cap: 300, ages: ['ALL', 'A18'], curfew: 1380, ac: true, following: .6, standing: [50, 70, 70], notice: 35,
      note: 'A club that runs nearly everything all-ages or 18-plus, with drinks only for the twenty-ones. Almost none of its shows are 21-plus only.' },
    { id: 'ripple-stage', kind: 'CLUB', hood: 'broad-ripple', cap: 250, ages: ['ALL'], curfew: 1380, ac: true, following: .4, standing: [50, 65, 65], notice: 35, pressure: 50,
      note: 'An all-ages stage in a former bar on the canal strip, run by a record store. The bar before it closed after a shooting, and the block remembers.' },
    { id: 'irvington-theater', kind: 'HALL', hood: 'irvington', cap: 300, rent: 300, deposit: 100, ages: ['A18'], curfew: 1380, ac: true, standing: [50, 60, 65], owner: 'HALL_MANAGER',
      note: 'A historic theater on the east side with a punk reputation. It is licensed, so it follows the bar rules.' },
    { id: 'ave-bar', kind: 'BAR', hood: 'mass-ave', cap: 250, ages: ['A21'], soundFee: 60, curfew: 1500, ac: true, following: .4, sketch: 15, standing: [45, 65, 75],
      note: 'A mostly twenty-one-plus punk bar. On punk-fest days it runs twenty-one-plus only.' },
    { id: 'square-lot', kind: 'OUTDOOR', hood: 'fountain-square', cap: 600, rent: 25, curfew: 1320, sketch: 35, standing: [55, 60, 50], pressure: 45,
      note: 'A seasonal lot venue, spring to fall. It outgrew its space, and the plan is to move it indoors.' }
  ],

  contacts: ['bloomington-in', 'lafayette-in', 'cincinnati', 'chicago', 'louisville'],

  calendar: [
    { id: 'car-race', label: 'the big car race weekend', tag: 'race', month: 5, weeks: [3, 4], dows: [4, 5, 6], can: [.80, .75, .75], hoods: ['fountain-square', 'mass-ave'], elsewhere: [.92, .90, .90] },
    { id: 'half-marathon', label: 'the half-marathon', tag: 'race', month: 5, week: 1, dows: [5], can: [.92, .92, .92], hoods: ['mass-ave', 'fountain-square'], elsewhere: [1, 1, 1] },
    { id: 'gaming-con', label: 'the gaming convention', tag: 'festival', month: 8, week: 1, dows: [3, 4, 5, 6], can: [.88, .88, .88], hoods: ['mass-ave'], elsewhere: [.97, .97, .97] },
    { id: 'state-fair', label: 'the state fair', tag: 'fair', month: 8, weeks: [1, 3], dows: [4, 5, 6], can: [.88, .92, .95] },
    { id: 'football-oct', label: 'Sunday home football', tag: 'game', month: 10, weeks: [1, 4], dows: [6], can: [.88, .95, .95], hoods: ['mass-ave'], elsewhere: [.97, 1, 1] },
    { id: 'football-nov', label: 'Sunday home football', tag: 'game', month: 11, weeks: [1, 3], dows: [6], can: [.88, .95, .95], hoods: ['mass-ave'], elsewhere: [.97, 1, 1] },
    { id: 'hoops-march', label: 'tournament basketball weekends', tag: 'game', month: 3, weeks: [2, 4], dows: [4, 5, 6], can: [.92, .95, .95], hoods: ['mass-ave'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1380, weekend: 1500, inForce: true } },

  points: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 9500000 },
    { name: 'Cincinnati', state: 'OH', lat: 39.1, lon: -84.51, pop: 2250000 },
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76, pop: 1300000 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83.0, pop: 2150000 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.2, pop: 2800000 }
  ],
  roads: ['I-65', 'I-70', 'I-69', 'I-465', 'I-74'],

  words: {
    street: ['Virginia Avenue', 'Shelby Street', 'College Avenue', 'Washington Street', 'Meridian Street', '10th Street'],
    water: ['the White River', 'Fall Creek', 'the canal'],
    hood: ['Fountain Square', 'Broad Ripple', 'Irvington', 'Garfield Park', 'Haughville', 'Windsor Park', 'Southport'],
    thing: ['porch', 'ring road', 'salamander heater', 'parking lot', 'bowling alley', 'tornado siren'],
    weather: ['tornado watch', 'ice storm']
  },

  events: [
    { id: 'INDIANAPOLIS_SIREN', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [4, 5, 6] },
      telegraph: 'A tornado watch is up for the whole county this week.',
      title: 'The sirens go off mid-set',
      body: 'The tornado sirens start in the middle of the second band. Half the room is looking at their phones, and the host wants everyone in the basement right now.',
      options: [
        { id: 'BASEMENT', label: 'Move everyone down to the basement and keep playing', likely: 'It\'s cramped and loud, and nobody leaves.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'REGULARS', pct: .02 }],
          result: 'The set finished by flashlight with the whole crowd packed between the pipes.' },
        { id: 'WAIT', label: 'Stop the show and wait it out', likely: 'The night loses its energy and a lot of kids leave early.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'The sirens ran an hour. By the time they stopped, most of the kids had gone home.' },
        { id: 'MOVE', label: 'Call it and move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'INDIANAPOLIS_KID_CURFEW', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [3, 4, 5, 6, 7, 8, 9, 10] },
      telegraph: 'Police are walking the strip around closing and checking the ages of kids on the street.',
      title: 'Off the street by eleven',
      body: 'Half the weeknight bill is sixteen, and the city has started enforcing the curfew, but the headliner is booked for ten forty-five.',
      options: [
        { id: 'EARLY', label: 'Move every set time up an hour', likely: 'The kids get home in time, but the early bands play to a thin floor.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors were at six and the last chord at ten, and the headliner played to a floor that was still filling.' },
        { id: 'MATINEE', label: 'Turn it into an afternoon bill', likely: 'You get a different crowd and a lot less money at the bar.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -180 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The bands played in daylight, and every kid was home for dinner.' },
        { id: 'ACCEPT', label: 'Run it as booked', likely: 'Parents are nervous and the older kids leave early.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The headliner started at a quarter to eleven to half a room.' }
      ] },

    { id: 'INDIANAPOLIS_RACE_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'race' },
      telegraph: 'Every hotel in town is full for the car race and parking on the strip is gone.',
      title: 'Race weekend in May',
      body: 'The big race has the hotels full and the lots taken. The headliner cannot find a spot to load in, but a lot of strangers are wandering the strip.',
      options: [
        { id: 'LEAN', label: 'Pitch the show to the visitors', likely: 'You get a looser crowd that has never heard the bands.',
          effects: [{ op: 'MONEY', amount: -25 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.1 }, { op: 'REGULARS', pct: .02 }],
          result: 'A hand-lettered sign on the sidewalk pulled in a dozen out-of-towners who stayed for the set.' },
        { id: 'LATE', label: 'Push doors back until the traffic breaks', likely: 'The locals come late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors opened an hour late, and the ones who came were glad to be out of traffic.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The regulars skip it.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The regulars stayed away from the whole area.' }
      ] },

    { id: 'INDIANAPOLIS_SECRET_SHOW', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [4, 5, 6, 7, 8, 9, 10] },
      telegraph: 'The last show on the porch left fireworks smoke over the block, and the neighbors noticed.',
      title: 'The porch neighbors call it in',
      body: 'Police came to the house after the smoke and the shouting. The host can go quiet or cancel the next three shows.',
      options: [
        { id: 'QUIET', label: 'Stop posting the address and keep it small', likely: 'You get fewer people, and the ones who come know the rules.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'The address went out by word of mouth only, and the room was small, quiet and tight.' },
        { id: 'MOVE', label: 'Move it to a room with a lease', likely: 'It costs money, but it\'s safer.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'DIY', respect: false }, { op: 'MONEY', amount: -40 }],
          result: 'A leased room took the bill. It cost forty dollars and nobody had to hide.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The block is watching.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'A cruiser idled at the corner the whole night, and the bands played short sets.' }
      ] }
  ]
});
