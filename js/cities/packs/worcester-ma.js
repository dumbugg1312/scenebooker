SB.Cities.register('worcester-ma', {
  v: 1,
  slug: 'worcester-ma',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['clark university', 'clark', 'holy cross', 'college of the holy cross', 'assumption university', 'worcester polytechnic', 'wpi',
           'worcester state', 'quinsigamond community college', 'umass chan', 'umass medical', 'massachusetts college of pharmacy', 'fitchburg state',
           'telegram & gazette', 'telegram and gazette', 'wchc', 'wcuw', 'wicn', 'wcca', 'wcca-tv', 'dunkin', 'dunkin\'', 'start on the street',
           'wormtown', 'wormtown brewery', 'worcester railers', 'railers', 'worcester red sox', 'polar park', 'dcu center', 'mechanics hall',
           'massmutual', 'worcester lunch car', 'worcester lunch car company', 'amtrak', 'mbta', 'wrta', 'vfw', 'american legion', 'west warwick',
           'the station nightclub', 'worcester cold storage', 'cold storage fire', 'seven hills legion post', 'pioneer valley', 'norton company',
           'washburn', 'abrasive room', 'wire mill social club', 'seven hills legion post 411', 'blackstone cellar', 'lunch car annex',
           'millbury street hall', 'three-decker third floor', 'quinsig garage', 'union hill lithuanian hall', 'pike exit pizza',
           'palladium', 'em loew\'s', 'loew\'s center', 'plymouth theatre', 'masscon concerts', 'new england metalfest', 'metalfest', 'tattoo the earth',
           'wormtown ska', 'raven music hall', 'off the rails', 'wcuw frontroom', 'frontroom', 'o\'briens', 'hanover theatre', 'woosox', 'pride worcester',
           'canal diggers', 'worcester oktoberfest', 'worcester turkey trot', 'worcester winter fest', 'worcester restaurant week', 'hot night in the city',
           'worcester center for crafts', 'institute park', 'discover central massachusetts', 'worcester magazine', 'rock 929', 'vegfest', 'sir morgan\'s cove',
           'democracy center'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The two fires are written only as 'the old fire'. */
  blocklist: ['wormtown*', 'telegram*', 'dunkin*', 'clark university*', 'holy cross*', 'polar park*', 'mechanics hall*', 'railers*', 'palladium*', 'hanover theatre*'],

  blurb: ['A hilly mill city of three-deckers with a chip on its shoulder about Boston, forty miles east. Shows are heavy, local and scrappy, and the crowd mostly knows each other.',
          'Cellars, halls and mill rooms do the work. Metal and hardcore lead, and the last train east decides who leaves early.'],
  hard: 'Neighbors a few feet away, a fire marshal with a memory, and a train that drains your crowd.',
  region: 'New England',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 },
    { name: 'Providence', state: 'RI', lat: 41.82, lon: -71.41 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Worcester' },
    { id: 'holden', kind: 'FEEDER', name: 'Holden and Paxton', minutes: 15, bearing: 330, note: 'Bedroom towns just north; a few kids with a garage.' },
    { id: 'shrewsbury', kind: 'FEEDER', name: 'Shrewsbury and Westborough', minutes: 20, bearing: 80, note: 'Tech and retail suburbs to the east; kids are as likely to go to Boston.' },
    { id: 'auburn', kind: 'FEEDER', name: 'Auburn, Millbury and Leicester', minutes: 15, bearing: 220, note: 'Adjacent suburbs and mill villages; no scene of their own.' },
    { id: 'grafton', kind: 'FEEDER', name: 'Grafton, Sutton and Oxford', minutes: 25, bearing: 190, note: 'Rural-edge towns with woods and the odd garage band.' },
    { id: 'milford', kind: 'FEEDER', name: 'Milford and Franklin', minutes: 30, bearing: 135, note: 'Suburban working-class towns to the southeast.' },
    { id: 'leominster', kind: 'FEEDER', name: 'Leominster and Fitchburg', minutes: 35, bearing: 355, note: 'Old plastics and paper mill cities up I-190, with a small arts crowd.' },
    { id: 'webster', kind: 'FEEDER', name: 'Webster, Dudley and Southbridge', minutes: 35, bearing: 205, note: 'Mill and lake towns down I-395; thin or no scene.' },
    { id: 'putnam', kind: 'FEEDER', name: 'Putnam and Killingly', state: 'CT', minutes: 40, bearing: 190, note: 'A corner of mill villages over the Connecticut line.' },
    { id: 'gardner', kind: 'FEEDER', name: 'Gardner and Athol', minutes: 50, bearing: 320, note: 'Cold, isolated furniture and mill towns; kids drive far for a show.' },
    { id: 'northampton', kind: 'FEEDER', name: 'Amherst and Northampton', minutes: 60, bearing: 270, note: 'A college valley with its own scene; trades with the city both ways.' },
    { id: 'providence', kind: 'PEER', name: 'Providence', slug: 'providence', state: 'RI', minutes: 50, bearing: 185, note: 'The nearest real peer: artier, with a bigger DIY base. Bands trade steadily.' },
    { id: 'springfield', kind: 'PEER', name: 'Springfield', minutes: 55, bearing: 255, slug: 'springfield-ma', note: 'A tougher, more run-down peer city out the Pike.' },
    { id: 'hartford', kind: 'PEER', name: 'Hartford', slug: 'hartford', state: 'CT', minutes: 70, bearing: 235, note: 'A city of similar size down I-84.' },
    { id: 'manchester', kind: 'PEER', name: 'Manchester', state: 'NH', minutes: 75, bearing: 5, slug: 'manchester-nh', note: 'A smaller mill city to the north.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Main Street core', route: 'downtown', note: 'Bars with stages, upstairs rooms and old commercial blocks, with new apartments pushing rents up.' },
    { id: 'canal', name: 'the Canal District and Green Island', route: 'work-side', note: 'Old mill-era brick, bars, loading docks and garages around the five-way junction. Game-day traffic jams it.' },
    { id: 'main-south', name: 'Main South', route: 'campus', note: 'Three-deckers and parish halls south of downtown, near a private university. Cheap, improving slowly.' },
    { id: 'union-hill', name: 'Union Hill', route: 'old-side', note: 'Steep streets of three-deckers, cheap rents and mostly ignored. House and apartment shows.' },
    { id: 'quinsigamond', name: 'Quinsigamond Village', route: 'work-side', note: 'A mill village on the south side. Basements, garages and rehearsal rooms.' },
    { id: 'grafton-hill', name: 'Grafton Hill and Greendale', route: 'old-side', note: 'Residential hills to the north with yards and basements; a parent\'s driveway is the venue.' },
    { id: 'elm-park', name: 'Elm Park and the college hills', route: 'campus', note: 'Student apartments and a few bars on the west side. House shows and campus all-ages nights.' }
  ],

  rooms: [
    { id: 'main-south-cellar', kind: 'HOUSE', hood: 'main-south', cap: 40, curfew: 1290, ac: false, outdoor: false, pressure: 55, start: true,
      note: 'The cellar of a three-decker south of downtown. The neighbors are a few feet away, so one complaint after nine ends it.' },
    { id: 'union-hill-cellar', kind: 'HOUSE', hood: 'union-hill', cap: 35, curfew: 1290, ac: false, outdoor: false,
      note: 'A cellar on a steep street. Parking is the problem and the hill makes load-in slow.' },
    { id: 'hill-yard', kind: 'HOUSE', hood: 'grafton-hill', cap: 50, curfew: 1320, ac: false, outdoor: true,
      note: 'A yard and a garage on the northern hills. The houses sit farther apart, so the neighbors take longer to call.' },
    { id: 'mill-room', kind: 'DIY', hood: 'quinsigamond', cap: 60, curfew: 1320, ac: false, pressure: 60,
      note: 'A rehearsal room in an old mill building that doubles as a one-night space. The fire inspector is the threat.' },
    { id: 'music-hall', kind: 'HALL', hood: 'main-south', cap: 300, ages: ['ALL', 'A18', 'A21'], curfew: 1380, ac: true,
      note: 'A rented hall run by a not-for-profit crew. Ages change from night to night and the money goes back to the bands.' },
    { id: 'station-room', kind: 'HALL', hood: 'downtown', cap: 120, curfew: 1290, ac: true,
      note: 'A small college-radio room on Main Street. All ages, as long as the school stays in the mood.' },
    { id: 'club-room', kind: 'BAR', hood: 'downtown', cap: 250, ages: ['A21', 'ALL'], curfew: 1440, ac: true,
      note: 'A club-sized room on Main Street. Most nights are 21 and over, a few dates go all ages, and the line dancers have the other nights.' },
    { id: 'canal-bar', kind: 'BAR', hood: 'canal', cap: 100, ages: ['A21'], curfew: 1440, ac: true,
      note: 'A bar with a back stage near the five-way junction. Ballgame nights jam the street.' },
    { id: 'corner-club', kind: 'CLUB', hood: 'downtown', cap: 250, ages: ['A18'], curfew: 1380, ac: true,
      note: 'A corner bar-club with an older hardcore history. Nobody is sure it is still booking.' },
    { id: 'big-theater', kind: 'BIG', hood: 'downtown', cap: 2000, ages: ['ALL'], curfew: 1380, ac: true,
      note: 'The old theater on Main Street, with an upstairs room, a downstairs room and an outdoor stage. It sets the ceiling for every heavy band in the state.' },
    { id: 'college-hall', kind: 'HALL', hood: 'elm-park', cap: 100, curfew: 1320, ac: true,
      note: 'A student hall for campus all-ages nights. It dies in mid-May and again in December.' },
    { id: 'driveway', kind: 'OUTDOOR', hood: 'grafton-hill', cap: 80, curfew: 1230, outdoor: true,
      note: 'A parent\'s driveway and backyard. Summer only, and off by dusk.' }
  ],

  contacts: ['providence', 'springfield-ma', 'hartford', 'manchester-nh', 'boston'],

  calendar: [
    { id: 'parade', label: 'the St. Patrick\'s parade', tag: 'parade', month: 3, week: 3, dows: [5], can: [.85, .85, .85], hoods: ['elm-park', 'downtown'], elsewhere: [1, .97, .97] },
    { id: 'pride', label: 'the Pride block party', tag: 'festival', month: 9, weeks: [1, 2], dows: [5], can: [.88, .85, .85], hoods: ['downtown'], elsewhere: [1, .95, .95] },
    { id: 'canal-race', label: 'the canal road race', tag: 'race', month: 9, weeks: [1, 2], dows: [5], can: [.9, .9, .9], hoods: ['canal'], elsewhere: [1, 1, 1] },
    { id: 'fireworks', label: 'the fireworks night', tag: 'holiday', month: 7, week: 1, dows: [4, 5, 6], can: [.9, .9, .9] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [2, 4], dows: [5], can: [.9, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [5], can: [.9, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1260 },

  points: [
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06, pop: 4900000 },
    { name: 'Providence', state: 'RI', lat: 41.82, lon: -71.41, pop: 1600000 },
    { name: 'Hartford', state: 'CT', lat: 41.76, lon: -72.67, pop: 1200000 },
    { name: 'Lowell', state: 'MA', lat: 42.63, lon: -71.32, pop: 115000 },
    { name: 'Albany', state: 'NY', lat: 42.65, lon: -73.76, pop: 900000 }
  ],
  roads: ['I-290', 'I-90', 'I-190', 'I-395', 'Route 146', 'Route 9'],

  words: {
    street: ['Main Street', 'Shrewsbury Street', 'Millbury Street', 'Route 9', 'Route 20', 'Route 146'],
    water: ['the Blackstone Canal', 'the Blackstone River', 'Lake Quinsigamond'],
    hood: ['Green Island', 'Union Hill', 'Main South', 'Quinsigamond Village', 'Grafton Hill', 'Greendale', 'Elm Park', 'Kelley Square'],
    thing: ['three-decker', 'parish hall', 'the Pike', 'packie', 'diner car', 'snow emergency', 'parking ban', 'cellar', 'mill room', 'social-club hall'],
    weather: ['nor\'easter', 'snow emergency']
  },

  events: [
    { id: 'WORCESTER_MA_PARADE_SATURDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'The parade route is posted. It runs along the west side and shuts the streets for the afternoon.',
      title: 'The parade eats your matinee',
      body: 'The parade fills the roads west of downtown, and the load-in street is blocked from noon. The matinee crowd is standing on the curb with a drink.',
      options: [
        { id: 'LATE', label: 'Push doors back until the street opens', likely: 'The ones who care will find you. A later night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors went up late, after the barricades came down. The room filled slowly and stayed.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The matinee crowd watches the parade.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The afternoon was empty and the parade took everyone who could walk.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'WORCESTER_MA_SEPTEMBER_SATURDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'race' },
      telegraph: 'A block party, a road race and the downtown detours all land on the same Saturday.',
      title: 'Three things on one Saturday',
      body: 'The block party, the race and the detours split one crowd, and the Canal District parking is the worst of the year. Your show is competing with all of it.',
      options: [
        { id: 'LATE', label: 'Start late, after the party breaks up', likely: 'A later start. The party crowd wanders in.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. The party crowd drifted in, loud and happy.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The crowd is split three ways.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The regulars came and found a place to park eventually.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' }
      ] },

    { id: 'WORCESTER_MA_YARD_NOISE', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [9, 10, 11] },
      telegraph: 'Dark comes early now, and the nine o\'clock noise rule does not care about the schedule.',
      title: 'The nine o\'clock rule',
      body: 'A yard show on the northern hills has to end by dusk, or the police arrive when the band hits its first loud chord. The neighbors already have the number.',
      options: [
        { id: 'EARLY', label: 'Move the start up and finish by dusk', likely: 'Most of them get in. A short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Doors early and done before dark. The ones who came got a short, tight set.' },
        { id: 'CELLAR', label: 'Move the whole bill to a cellar', likely: 'Smaller and louder, with the neighbors on the other side of the wall.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A cellar took the bill with an hour to spare, and the floor was packed.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'The police arrive at the first loud chord.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }, { op: 'MONEY', amount: -25 }],
          result: 'They shut it down after two songs and a ticket for the noise.' }
      ] }
  ]
});
