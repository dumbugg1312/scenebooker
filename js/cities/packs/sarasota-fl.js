SB.Cities.register('sarasota-fl', {
  v: 1,
  slug: 'sarasota-fl',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of south florida sarasota-manatee', 'state college of florida', 'new college of florida', 'ringling college of art and design',
           'university of south florida', 'usf', 'sarasota herald-tribune', 'herald-tribune', 'sarasota magazine', 'creative loafing', 'tampa bay times', 'wusf',
           'wwsb', 'sarasota film festival', 'ringling museum', 'ringling bros', 'tampa bay rays', 'tampa bay buccaneers', 'tampa bay lightning',
           'sarasota sailors', 'baltimore orioles', 'atlanta braves', 'sarasota memorial hospital', 'publix', 'sarasota jungle gardens', 'selby gardens',
           'hurricane ian', 'hurricane helene', 'hurricane milton', 'hurricane charley', 'macdill air force base', 'sarasota bradenton international airport',
           'waffle house', 'amtrak',
           'visit sarasota', 'your observer', 'sarasota observer', 'srq magazine', 'srq daily', 'wslr', 'mysuncoast', 'tampabay28', 'bradenton times', 'fox 13', 'wtsp', 'siesta key crystal classic', 'crystal classic', 'sarasota chalk festival', 'avenida de colores', 'woods of mallaranny', 'living arts festival', 'sarasota orchestra', 'thunder by the bay', 'sarasota jazz festival', 'winter opera festival', 'venice sharks tooth festival', 'ringling underground', 'circus arts conservatory', 'waterside place', 'payne park', 'lemon avenue mall', 'burns square', 'bandsintown'],
  blocklist: ['herald-tribune*', 'ringling*', 'selby gardens*', 'sarasota jungle*', 'creative loafing*', 'sarasota orchestra*', 'crystal classic*', 'srq magazine*', 'srq daily*', 'mysuncoast*'],

  blurb: ['Retirees, beaches and bay condos on top, a few punk houses and warehouse nights underneath.',
          'Most of the audience drives in from Bradenton.'],
  hard: 'Small crowd, noise-averse retirees, and Tampa is an hour up the road.',
  region: 'the Gulf Coast',
  houseType: 'LIVING_ROOM',
  whereGo: [
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46 },
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Sarasota' },
    { id: 'bradenton', kind: 'FEEDER', name: 'Bradenton', minutes: 20, bearing: 15, scene: 300, note: 'The closest cheaper city. Some bands live here.' },
    { id: 'lakewood-ranch', kind: 'FEEDER', name: 'Lakewood Ranch', minutes: 20, bearing: 70, note: 'A new wealthy suburb with teens and no venues.' },
    { id: 'palmetto', kind: 'FEEDER', name: 'Palmetto and Ellenton', minutes: 25, bearing: 5, note: 'Working-class towns along the river.' },
    { id: 'venice', kind: 'FEEDER', name: 'Venice', minutes: 30, bearing: 170, note: 'Retirees and a few teens who drive north.' },
    { id: 'north-port', kind: 'FEEDER', name: 'North Port', minutes: 40, bearing: 150, note: 'Young-family sprawl. Kids with no local rooms.' },
    { id: 'englewood', kind: 'FEEDER', name: 'Englewood', minutes: 45, bearing: 180, note: 'A beach and trailer-park mix.' },
    { id: 'punta-gorda', kind: 'FEEDER', name: 'Punta Gorda', minutes: 55, bearing: 160, note: 'Small and older.' },
    { id: 'fort-myers', kind: 'PEER', name: 'Fort Myers', minutes: 75, bearing: 155, scene: 1200, note: 'A Gulf Coast city of similar size with some DIY.' },
    { id: 'lakeland', kind: 'PEER', name: 'Lakeland', minutes: 90, bearing: 60, slug: 'lakeland-fl', note: 'A smaller inland town.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Rosemary District', route: 'downtown', note: 'Bars, galleries and new condos. A brunch crowd with few rooms for loud bands.' },
    { id: 'gillespie-park', name: 'Gillespie Park', route: 'old-side', note: 'Small old bungalows near the center. House-show territory.' },
    { id: 'newtown', name: 'Newtown', route: 'old-side', note: 'A historic Black neighborhood north of downtown under redevelopment pressure. Not a scene area.' },
    { id: 'laurel-park', name: 'Laurel Park', route: 'old-side', note: 'Older cottages near the bay. Noise-sensitive.' },
    { id: 'siesta-key', name: 'Siesta Key', route: 'downtown', note: 'A beach town of tourists and bar bands, with little DIY.' },
    { id: 'fruitville', name: 'the Fruitville corridor', route: 'work-side', note: 'Warehouses and light industrial. Where practice spaces and warehouse nights fit.' },
    { id: 'gulf-gate', name: 'Palmer Ranch and Gulf Gate', route: 'campus', note: 'Suburban sprawl with young families and kids with cars.' },
    { id: 'bradenton-main', name: 'old Bradenton and 14th Street', route: 'town:bradenton', note: 'Cheaper, older and more working class than Sarasota.' }
  ],

  rooms: [
    { id: 'gillespie-house', kind: 'HOUSE', hood: 'gillespie-park', cap: 40, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 50],
      pressure: 50, start: true, note: 'A small old bungalow with a living-room stage and a porch. The neighbors are close and the sound rule is read out loud.' },
    { id: 'laurel-cottage', kind: 'HOUSE', hood: 'laurel-park', cap: 30, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 20, standing: [60, 60, 45],
      pressure: 65, note: 'A cottage near the bay with a yard. The houses are so close that the first complaint is usually the last.' },
    { id: 'bradenton-yard', kind: 'HOUSE', hood: 'bradenton-main', cap: 50, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: true, sketch: 25, standing: [65, 60, 50],
      pressure: 40, note: 'A backyard in the older, cheaper part of Bradenton. Fewer complaints, and a half-hour drive for the Sarasota kids.' },
    { id: 'warehouse', kind: 'DIY', hood: 'fruitville', cap: 80, rent: 70, deposit: 0, pa: .5, curfew: 1380, ac: false, sketch: 40, standing: [55, 60, 45],
      pressure: 55, needs: ['VOUCH'], note: 'A light-industrial bay where all-ages, no-booze nights once drew a hundred. Rent and the landlord decide if it is still open.' },
    { id: 'storage-unit', kind: 'DIY', hood: 'fruitville', cap: 25, rent: 40, deposit: 0, pa: .4, curfew: 1290, ac: false, sketch: 40, standing: [55, 55, 40],
      pressure: 60, needs: ['VOUCH'], note: 'A band\'s cinderblock storage unit with fans in the corner. The lease says no, and the roll-up door says otherwise.' },
    { id: 'arts-room', kind: 'HALL', hood: 'downtown', cap: 105, rent: 150, deposit: 50, pa: .6, curfew: 1350, ac: true, seated: true, sketch: 10, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'A small seated room for folk and experimental nights, booked most evenings in season. Punk gets in as a launch night.' },
    { id: 'teen-theater', kind: 'HALL', hood: 'downtown', cap: 100, rent: 180, deposit: 75, pa: .6, curfew: 1320, ac: true, seated: true, sketch: 5, standing: [55, 60, 70],
      owner: 'HALL_MANAGER', note: 'A small theater with a teens-only punk night after dark. You book a date on its calendar, not a stage of your own.' },
    { id: 'live-room', kind: 'BAR', hood: 'bradenton-main', cap: 150, soundFee: 60, pa: .8, ages: ['A21', 'ALL'], matinee: true, curfew: 1560, ac: true,
      following: .4, sketch: 20, standing: [50, 65, 70], note: 'The one real live room in the area, open most nights. Local punk draws best, and cover bands pay better.' },
    { id: 'downtown-bar', kind: 'BAR', hood: 'downtown', cap: 120, soundFee: 50, pa: .6, ages: ['A21'], curfew: 1440, ac: true, following: .3, sketch: 15,
      standing: [45, 65, 75], pressure: 55, note: 'A bar on the main downtown streets. The old scene played here until the condos moved in upstairs.' },
    { id: 'park-patio', kind: 'OUTDOOR', hood: 'downtown', cap: 100, rent: 20, pa: .4, curfew: 1290, ac: false, outdoor: true, sketch: 10, standing: [60, 60, 55],
      note: 'A patio in a downtown park with a weekly Friday concert. A bill fits if the weather and the park allow.' },
    { id: 'key-beach', kind: 'OUTDOOR', hood: 'siesta-key', cap: 200, rent: 25, pa: .4, curfew: 1260, ac: false, outdoor: true, sketch: 20, standing: [55, 55, 45],
      note: 'A beach lot full of tourists. An afternoon storm or a beach rule ends it, and the sun goes down early.' },
    { id: 'suburb-club', kind: 'CLUB', hood: 'gulf-gate', cap: 250, houseCosts: 150, split: .8, pa: .85, ages: ['A18'], curfew: 1440, ac: true, following: .4, sketch: 15,
      standing: [45, 70, 65], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A rented club-style room in the suburbs for kids with cars. Nobody can say if the crowd will come.' }
  ],

  contacts: ['lakeland-fl', 'tampa', 'cape-coral-fl', 'naples-fl', 'orlando'],

  calendar: [
    { id: 'sand-weekend', label: 'the sand sculpting weekend', tag: 'festival', month: 11, week: 2, dows: [4, 5, 6], can: [.85, .88, .90], hoods: ['siesta-key', 'gulf-gate'], elsewhere: [.95, .95, .95] },
    { id: 'street-painting', label: 'the street painting weekend', tag: 'festival', month: 11, weeks: [2, 3], dows: [5, 6], can: [.88, .90, .93], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'costume-fair', label: 'the period costume fair', tag: 'fair', month: 11, weeks: [1, 4], dows: [5, 6], can: [.93, .95, .97] },
    { id: 'spring-break', label: 'spring break', tag: 'holiday', month: 3, weeks: [1, 4], dows: [4, 5], can: [.90, .92, .95], hoods: ['downtown', 'siesta-key'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],
  rules: { quiet: 1380 },

  points: [
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46, pop: 400000 },
    { name: 'St. Petersburg', state: 'FL', lat: 27.77, lon: -82.64, pop: 260000 },
    { name: 'Fort Myers', state: 'FL', lat: 26.64, lon: -81.87, pop: 95000 },
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38, pop: 307000 }
  ],
  roads: ['I-75', 'US 41', 'the Tamiami Trail', 'Fruitville Road', 'Bee Ridge Road'],

  words: {
    street: ['Fruitville Road', 'Osprey Avenue', 'Tamiami Trail', 'Bee Ridge Road', 'Washington Boulevard', 'Main Street'],
    water: ['Sarasota Bay', 'the Manatee River', 'Roberts Bay'],
    hood: ['Gillespie Park', 'Laurel Park', 'Newtown', 'Southside Village', 'Siesta Key', 'Gulf Gate'],
    thing: ['snowbird', 'lanai', 'retention pond', 'causeway', 'storage unit'],
    weather: ['afternoon thunderstorm', 'hurricane warning']
  },
  events: [
    { id: 'SARASOTA_FL_CONDO_COMPLAINT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'A condo neighbor filmed the last porch show and sent it to the city commission while the sound rule is up for review.',
      title: 'The neighbor with the camera',
      body: 'A clip of the last yard show is going around the commission, and a deputy has stopped by twice this week. Your show is on the same block.',
      options: [
        { id: 'EARLY', label: 'Start at five and be done by nine', likely: 'The older kids miss it. The deputy stays in the car.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -120 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Early doors, done by nine. The ones who came got a short, tight set and nobody called.' },
        { id: 'MOVE', label: 'Move it to the warehouse side of town', likely: 'Fewer neighbors and a longer drive.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'DIY', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The bill moved to a bay out on the industrial edge. Loud, and nobody lives there.' },
        { id: 'ACCEPT', label: 'Run it and keep the volume down', likely: 'A cautious room and a nervous host.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }, { op: 'REGULARS', pct: -.02 }],
          result: 'You ran it quiet. Half the crowd wished you had not, and the host was tense all night.' }
      ] },

    { id: 'SARASOTA_FL_HURRICANE_WARNING', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [6, 7, 8, 9, 10, 11] },
      telegraph: 'A hurricane warning went up for the Gulf coast, and the storage units on the industrial edge are already sandbagging.',
      title: 'The warning two days out',
      body: 'A hurricane warning is posted two days before your bill. The band\'s cinderblock unit floods in a heavy rain, and half the county is filling gas tanks.',
      options: [
        { id: 'CALLOFF', label: 'Call it off and keep everyone safe', likely: 'A lost night, and nobody blames you.',
          effects: [{ op: 'MONEY', amount: -20 }, { op: 'REGULARS', pct: .02 }],
          result: 'You called it two days out. The bands were relieved and the deposit was gone.' },
        { id: 'MOVE', label: 'Move it a day, after it passes', likely: 'Breaks the date. The power may still be out.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones with power and gas came.' },
        { id: 'ACCEPT', label: 'Hold the date and see', likely: 'A thin house if the track bends your way.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .5 }],
          result: 'The storm turned. A third of the list came, rain still coming down.' }
      ] },

    { id: 'SARASOTA_FL_SAND_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'A festival weekend is filling the beaches and the causeway, and every bartender is stuck in the line.',
      title: 'The causeway is closed',
      body: 'The beach festival has the causeway at a standstill. The kid with the van and the sound man who lives on the Key are both stuck in traffic.',
      options: [
        { id: 'LATE', label: 'Push doors back an hour', likely: 'A late start, and the crowd trickles in.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. The sound man arrived sunburned and the room filled slowly.' },
        { id: 'SHORT', label: 'Cut the bill to the bands already in town', likely: 'A short night with a small, loyal crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Three bands played and the locals stayed late. The festival crowd never found the place.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The tourists have the roads.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The regulars who live inland came. Everyone else was in the line.' }
      ] }
  ]
});
