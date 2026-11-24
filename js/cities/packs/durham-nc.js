SB.Cities.register('durham-nc', {
  v: 1,
  slug: 'durham-nc',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['duke', 'duke university', 'duke health', 'duke basketball', 'unc', 'unc chapel hill', 'university of north carolina', 'nc state', 'nccu',
           'north carolina central university', 'research triangle park', 'rtp', 'american tobacco', 'brightleaf', 'streets at southpoint', 'southpoint',
           'durham bulls', 'herald-sun', 'news & observer', 'news and observer', 'indy week', 'moogfest', 'full frame', 'godurham', 'cheerwine', 'sun drop',
           'cook out', 'bojangles', 'biscuitville', 'waffle house', 'fort bragg', 'fort liberty', 'acc tournament', 'dukies', 'tar heels', 'bull city',
           'bull durham', 'american legion', 'vfw',
           'the pollen room', 'carport nineteen', 'orchard street annex', 'st. delphine\'s fellowship hall', 'the slaw cellar', 'mill house number six',
           'bright leaf back lot', 'the yellow dust', 'cold biscuit hall', 'post 4410 hall', 'the spare warehouse', 'holloway street garage',
           'discover durham', 'abc11', 'wral', 'durham performing arts center', 'dpac', 'centerfest', 'bull city boom and bash', 'bull city boom & bash', 'durham central park', 'durham pride', 'pride durham', 'lgbtq center of durham', 'black august', 'phoenix fest', 'durham book festival', 'good moon festival', 'nccu homecoming', 'nc a&t', 'durham holiday parade', 'durham parks and recreation'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real institutions are written only in generic form. */
  blocklist: ['unc*', 'nccu*', 'cook out*', 'waffle house*', 'bull city*', 'indy week*', 'the pollen room*', 'wral*', 'dpac*', 'centerfest*'],

  blurb: ['The scene is small, political and queer-friendly, with screamo, grind and hardcore sharing bills, and a benefit night is the normal kind of show.',
          'The old-timers tell squat stories, and the kids fill the downtown club, where the promoter, a band member and the door person are the same three people.'],
  hard: 'Few cheap rooms are left. Club nights are 18+ and houses vanish to rent.',
  region: 'the Piedmont',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'emo', d: 0.06, reason: 'Screamo and skramz bills sit at the center of this scene.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Durham' },
    { id: 'chapel-hill', kind: 'FEEDER', name: 'Chapel Hill and Carrboro', minutes: 20, bearing: 235, note: 'A college town and its arty neighbor: more a sister scene, its kids drive over constantly.', bands: 4 },
    { id: 'raleigh', kind: 'FEEDER', name: 'Raleigh', minutes: 30, bearing: 125, scene: 900, note: 'The state capital next door: the nearest trading partner, and the corporate cousin.', bands: 5 },
    { id: 'hillsborough', kind: 'FEEDER', name: 'Hillsborough', minutes: 25, bearing: 305, pop: 9000, note: 'A small historic county seat of artists and farms with a little music scene.', bands: 1 },
    { id: 'mebane', kind: 'FEEDER', name: 'Mebane', minutes: 30, bearing: 295, pop: 18000, note: 'A suburban outlet and furniture town with no scene I can name.' },
    { id: 'oxford', kind: 'FEEDER', name: 'Oxford', minutes: 35, bearing: 15, pop: 8500, note: 'A small farm and tobacco town up I-85.' },
    { id: 'burlington', kind: 'FEEDER', name: 'Burlington and Graham', minutes: 40, bearing: 285, pop: 60000, note: 'A textile city whose kids drive forty minutes to Durham for a show.' },
    { id: 'pittsboro', kind: 'FEEDER', name: 'Pittsboro', minutes: 40, bearing: 215, note: 'A rural-arts county seat with a small scene of its own.', bands: 1 },
    { id: 'roxboro', kind: 'FEEDER', name: 'Roxboro', minutes: 40, bearing: 5, pop: 8000, note: 'Tobacco and farm country; kids head to Durham for anything with a PA.' },
    { id: 'sanford', kind: 'FEEDER', name: 'Sanford', minutes: 50, bearing: 205, pop: 30000, note: 'A brick and industrial town that feeds Raleigh and Durham.' },
    { id: 'greensboro', kind: 'PEER', name: 'Greensboro', minutes: 60, bearing: 275, slug: 'greensboro-nc', note: 'A mill and furniture city with a real DIY tradition and cheaper houses.' },
    { id: 'fayetteville', kind: 'PEER', name: 'Fayetteville', minutes: 75, bearing: 185, slug: 'fayetteville-nc', note: 'A military town whose punk kids come up for bigger bills.' },
    { id: 'winston-salem', kind: 'PEER', name: 'Winston-Salem', minutes: 85, bearing: 275, slug: 'winston-salem-nc', note: 'An arts-school town with moderate trade.' },
    { id: 'richmond', kind: 'PEER', name: 'Richmond', state: 'VA', minutes: 135, bearing: 5, slug: 'richmond', note: 'A well-known DIY town on the same tour line; two-way traffic.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Former tobacco warehouses turned offices, restaurants and condos; polished, and a long way from cheap.' },
    { id: 'old-north', name: 'Old North Durham and Trinity Park', route: 'old-side', note: 'Big old porch houses near the old campus; the pricey side of town and a rougher north edge.' },
    { id: 'walltown', name: 'Walltown and Northgate Park', route: 'old-side', note: 'A historically Black working-class neighborhood now gentrifying, beside older streets of small houses.' },
    { id: 'west-durham', name: 'Old West Durham', route: 'old-side', note: 'A former textile mill village of rowhouses and the converted mill itself; porches, cellars and rentals.' },
    { id: 'east-durham', name: 'East Durham', route: 'work-side', note: 'Historically working-class and Black mill villages along Holloway; converted hosiery buildings and cheap space.' },
    { id: 'hayti', name: 'Hayti and the south side', route: 'work-side', note: 'A historic Black community cut by the freeway in the 1960s; a few small clubs and cultural spaces, little punk.' },
    { id: 'lakewood', name: 'Lakewood and the Hillsborough Road corridor', route: 'work-side', note: 'Small ranch houses, strip malls and light-industrial lots; cheap practice rooms.' },
    { id: 'north-durham', name: 'North Durham and Bragtown', route: 'campus', note: 'Older suburban strips and cheap apartments along Roxboro Road; ignored.' }
  ],

  rooms: [
    { id: 'mill-porch', kind: 'HOUSE', hood: 'west-durham', cap: 50, pa: .4, curfew: 1350, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 55, start: true, note: 'A rowhouse in an old mill village, with a porch and a cellar. Houses were cheap here once, and the neighbors have started to call.' },
    { id: 'walltown-yard', kind: 'HOUSE', hood: 'walltown', cap: 60, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 20, standing: [65, 60, 45],
      pressure: 50, note: 'A yard and a front room beside a street that is changing fast. Rent is the pressure, not the neighbors.' },
    { id: 'east-garage', kind: 'HOUSE', hood: 'east-durham', cap: 80, pa: .5, curfew: 1380, ac: false, outdoor: false, sketch: 30, standing: [65, 60, 45],
      pressure: 50, note: 'A big garage with no basement, in a neighborhood that gets pricier every month. Loud, and the one place it might survive.' },
    { id: 'lot-room', kind: 'DIY', hood: 'lakewood', cap: 100, rent: 60, pa: .5, curfew: 1380, ac: false, sketch: 40, standing: [60, 60, 45],
      pressure: 55, note: 'A rehearsal room off the Hillsborough Road lots. Run by volunteers, short on years, and one sale away from the end.' },
    { id: 'hosiery-floor', kind: 'DIY', hood: 'east-durham', cap: 120, rent: 80, pa: .6, curfew: 1410, ac: false, sketch: 50, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'A floor in a converted hosiery building, in the old squat and warehouse tradition. Eviction letters and inspectors are the weather.' },
    { id: 'south-hall', kind: 'HALL', hood: 'hayti', cap: 150, rent: 120, deposit: 50, pa: .5, curfew: 1320, ac: true, sketch: 10, standing: [60, 60, 65],
      owner: 'HALL_MANAGER', note: 'A rented community hall for benefit nights. Mutual aid and queer youth shows are routine here, and it is out by ten.' },
    { id: 'zine-shop', kind: 'SHOP', hood: 'downtown', cap: 60, pa: .4, curfew: 1290, ac: true, sketch: 5, standing: [70, 70, 75], following: .2,
      note: 'A record and zine shop downtown. An afternoon in-store set, and a table of fliers by the door.' },
    { id: 'stage-bar', kind: 'BAR', hood: 'downtown', cap: 250, soundFee: 70, pa: .8, ages: ['A21', 'ALL'], curfew: 1440, ac: true, following: .5, sketch: 15, standing: [50, 65, 70],
      note: 'A queer-founded bar with a stage that anchors punk and hardcore bills. Most nights are 21 and over, and the age is decided show by show.' },
    { id: 'main-street-club', kind: 'CLUB', hood: 'downtown', cap: 300, houseCosts: 150, split: .8, pa: .8, ages: ['A18'], curfew: 1440, ac: true, following: .5, sketch: 15, standing: [45, 70, 70],
      note: 'A music bar on the main street with hardcore, screamo and metal on the calendar. Eighteen and over, and it fills.' },
    { id: 'garage-club', kind: 'CLUB', hood: 'east-durham', cap: 450, houseCosts: 200, split: .8, pa: .9, ages: ['ALL'], curfew: 1410, ac: true, following: .6, sketch: 15, standing: [45, 70, 65],
      owner: 'TALENT_BUYER', notice: 56, needs: ['FULL_BILL'], note: 'A big club in an old garage-and-bar complex on the east side. All ages unless the show says otherwise, and it wants a bill that sells.' },
    { id: 'park-pavilion', kind: 'OUTDOOR', hood: 'downtown', cap: 200, rent: 20, pa: .4, curfew: 1260, ac: false, outdoor: true, sketch: 30, standing: [60, 55, 50],
      note: 'The pavilion in the park downtown. A daytime benefit fest, and over by nine.' },
    { id: 'arts-hall', kind: 'BIG', hood: 'downtown', cap: 2000, pa: 1, ages: ['ALL'], curfew: 1380, ac: true, following: .8, sketch: 5, standing: [40, 70, 60],
      note: 'The performing arts center, a long way from the scene. Touring acts only, and the place a local band is never asked.' }
  ],

  contacts: ['raleigh', 'greensboro-nc', 'fayetteville-nc', 'winston-salem-nc', 'richmond'],

  calendar: [
    { id: 'homecoming', label: 'the homecoming parade weekend', tag: 'parade', month: 10, week: 2, dows: [5], can: [0.85, 0.85, 0.85], hoods: ['east-durham', 'hayti'], elsewhere: [0.97, 0.97, 0.97] },
    { id: 'pride-weekend', label: 'the Pride weekend', tag: 'festival', month: 9, week: 4, dows: [4, 5], can: [0.9, 0.88, 0.88], hoods: ['downtown', 'old-north'], elsewhere: [0.97, 0.95, 0.95] },
    { id: 'arts-festival', label: 'the downtown arts festival', tag: 'festival', month: 9, week: 3, dows: [5, 6], can: [0.9, 0.88, 0.88], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'fourth', label: 'the Fourth of July fireworks', tag: 'holiday', month: 7, week: 1, dows: [0, 1, 5, 6], can: [0.88, 0.85, 0.85], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'community-weekend', label: 'the August community weekend', tag: 'festival', month: 8, week: 4, dows: [4, 5, 6], can: [0.92, 0.9, 0.9], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'doc-festival', label: 'the spring documentary festival', tag: 'festival', month: 4, weeks: [1, 2], dows: [3, 4, 5, 6], can: [0.92, 0.9, 0.9], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 2], dows: [5], can: [0.88, 0.95, 0.95] },
    { id: 'holiday-parade', label: 'the holiday parade', tag: 'parade', month: 12, week: 1, dows: [5], can: [0.92, 0.9, 0.9], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.1] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1440, inForce: false }, quiet: 1380 },

  points: [
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64, pop: 470000 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 880000 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04, pop: 690000 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 500000 }
  ],
  roads: ['I-85', 'I-40', 'NC 147', 'US 15-501', 'US 70', 'US 501'],

  words: {
    street: ['Holloway Street', 'Roxboro Road', 'Chapel Hill Road', 'Hillsborough Road', 'Angier Avenue', 'Driver Street', 'Erwin Road', 'Ninth Street'],
    water: ['Ellerbe Creek', 'Falls Lake', 'Jordan Lake', 'the Eno'],
    hood: ['Old North Durham', 'Trinity Park', 'Walltown', 'Northgate Park', 'Watts-Hillandale', 'Old West Durham', 'East Durham', 'Hayti', 'Lakewood', 'Bragtown'],
    thing: ['mill house', 'tobacco barn', 'pimento cheese', 'biscuit', 'sweet tea', 'pollen', 'porch', 'benefit show', 'zine table', 'donation jar', 'group chat'],
    weather: ['pollen', 'humidity', 'ice storm']
  },

  events: [
    { id: 'DURHAM_NC_HOMECOMING', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'The homecoming parade closes the east-side streets at six in the morning.',
      title: 'The parade has the east side',
      body: 'The streets near the show are closed from dawn, and the crowd is alumni and kids with nowhere to park, but the all-ages bill is still on.',
      options: [
        { id: 'EARLY', label: 'Open early and tell them where to park', likely: 'Most people get in, and it\'s a tired, loud night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .92 }],
          result: 'You opened doors an hour early, and the people who came parked a mile away.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'A lot of people give up because of the closures.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The streets stayed shut, and half the list never found a place to park.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'DURHAM_NC_PRIDE_DOOR', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'festival' },
      telegraph: 'The pride week benefit is booked for the same weekend as the arts festival.',
      title: 'The door fight',
      body: 'The bar with the stage wants a 21-and-over door, and the kids want all ages, and pride week and the downtown arts festival have the same stage booked.',
      options: [
        { id: 'ALL', label: 'Make it all ages and move it to the hall', likely: 'It\'s smaller, and the kids can come.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'The hall took the bill, and the kids filled the floor.' },
        { id: 'BAR', label: 'Keep it at the bar, 21 and over', likely: 'The kids are shut out.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The bar was packed, and the kids stood on the sidewalk.' },
        { id: 'SPLIT', label: 'Run an early all-ages set and a late bar set', likely: 'It\'s two nights in one.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .95 }, { op: 'SHOW_MOD', key: 'lateMin', v: 30 }],
          result: 'You ran an early set for the kids and a late one for the bar, and everyone got a night.' }
      ] },

    { id: 'DURHAM_NC_NOISE_CALL', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [3, 4, 5, 6, 7, 8, 9, 10] },
      telegraph: 'A neighbor on the porch street has called in the last two shows.',
      title: 'The third noise call',
      body: 'The house has had two noise calls, and the sound ordinance bars amplified music after eleven, so tonight the set must stop mid-song or move to a cellar.',
      options: [
        { id: 'CELLAR', label: 'Move the bill to a cellar in the mill', likely: 'It\'s smaller and sweatier, and nobody outside can hear it.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A cellar took the whole bill, and the floor was packed.' },
        { id: 'EARLY', label: 'Start at six and end by ten', likely: 'Most of them get there, and it\'s a short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -120 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'You were done by ten-thirty, and the street stayed quiet.' },
        { id: 'ACCEPT', label: 'Run it and take the knock', likely: 'You get a visit from the officers.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The knock came at eleven, and the last band played one song unplugged.' }
      ] }
  ]
});
