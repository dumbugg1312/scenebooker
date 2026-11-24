SB.Cities.register('chico-ca', {
  v: 1,
  slug: 'chico-ca',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['cal state chico', 'california state university, chico', 'chico state', 'csuc', 'wildcats', 'butte college', 'enterprise-record', 'chico enterprise-record',
           'chico news & review', 'news & review', 'the orion', 'kcsc', 'kzfr', 'kzap', 'kpay', 'sierra nevada', 'camp fire', 'park fire', 'pioneer days',
           'wildflower century', 'queen bee festival', 'oktobeefest', 'olive festival', 'ghost ship', 'sierra nevada brewing', 'chicoshows', 'thursday night market', 'taste of downtown', 'butte county fair', 'pioneer day', 'pioneer day parade', 'cn&r', 'nspr', 'northstate public radio', 'downtown chico business association', 'visit chico', 'chico area recreation & park district', 'chico police department', 'butte365', 'shakespeare in the park', 'wallywood', 'b-line', 'coast starlight', 'amtrak',
           'walmart', 'medianews group', 'the huller', 'tule fog annex', 'sandy gulch hall', 'esplanade carport', 'walnut row house', 'nord avenue granary',
           'lindo channel garage', 'the orchard shed', 'bear hole social club', 'skyway quonset', 'park avenue pump room', 'hundred-degree room'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Camp Fire is written only as 'the fire'. */
  blocklist: ['sierra nevada*', 'chico news*', 'enterprise-record*', 'pioneer days*', 'wildflower century*', 'wallywood*'],

  blurb: ['A campus town where a loose booking crew keeps all-ages, sober punk alive on five-dollar doors. Rooms come and go, but the kids keep starting bands.',
          'Summer empties the house shows, and fire season fills the sky with smoke.'],
  hard: 'All-ages rooms keep closing, students turn over, and smoke kills whole weekends.',
  region: 'the Valley',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Chico' },
    { id: 'durham', kind: 'FEEDER', name: 'Durham', minutes: 15, bearing: 200, note: 'A farm town close enough to count as part of Chico.' },
    { id: 'forest-ranch', kind: 'FEEDER', name: 'Forest Ranch and the canyon', minutes: 20, bearing: 50, note: 'Wooded foothill roads; kids with long, twisty drives home.' },
    { id: 'paradise', kind: 'FEEDER', name: 'Paradise and Magalia', minutes: 25, bearing: 75, note: 'The ridge towns, rebuilt and tight-knit; many of their kids now live in Chico.' },
    { id: 'oroville', kind: 'FEEDER', name: 'Oroville', minutes: 30, bearing: 165, note: 'The county seat to the south; its kids come north because their town has nothing.' },
    { id: 'gridley', kind: 'FEEDER', name: 'Gridley and Biggs', minutes: 30, bearing: 190, note: 'Rice and orchard towns down the highway, very small.' },
    { id: 'orland', kind: 'FEEDER', name: 'Orland', minutes: 30, bearing: 275, note: 'A farm town out toward the interstate.' },
    { id: 'willows', kind: 'FEEDER', name: 'Willows', minutes: 40, bearing: 270, note: 'A farm and government town, tiny scene.' },
    { id: 'corning', kind: 'FEEDER', name: 'Corning', minutes: 40, bearing: 310, note: 'Olive and orchard country, tiny scene.' },
    { id: 'red-bluff', kind: 'FEEDER', name: 'Red Bluff', minutes: 45, bearing: 330, note: 'A river and rodeo town with a few punk and metal kids.', bands: 1 },
    { id: 'yuba-city', kind: 'PEER', name: 'Yuba City', minutes: 60, bearing: 185, scene: 700, note: 'Flat farmland south on the highway; kids drive up for shows.' },
    { id: 'redding', kind: 'PEER', name: 'Redding', minutes: 75, bearing: 350, scene: 600, note: 'Hotter and more conservative; its bands drive down because it has fewer rooms.' },
    { id: 'davis', kind: 'PEER', name: 'Davis', minutes: 90, bearing: 200, scene: 1200, note: 'The other California college town: richer, with a known house-show scene.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The original grid around the plaza: bars, a theater and a Thursday market. Licensed 21-plus rooms and little else.' },
    { id: 'south-campus', name: 'South Campus', route: 'campus', note: 'Packed student rentals with big yards and carports. Where house shows live, and where police and neighbors push back.' },
    { id: 'avenues', name: 'the Avenues', route: 'old-side', note: 'Shaded old bungalows split into rentals near the park. Backyard shows, until a neighbor calls.' },
    { id: 'barber', name: 'Barber and the southside', route: 'work-side', note: 'Old rail-line streets, warehouses and auto shops. The best bet for a room with a loading door, and it is heating up.' },
    { id: 'chapmantown', name: 'Chapmantown', route: 'work-side', note: 'A lower-income west side with big lots and backyards. Cheaper houses for bands that cannot pay student rent.' },
    { id: 'east-side', name: 'the East 20th strip', route: 'work-side', note: 'A half-empty mall and strip malls with vacant storefronts and a few practice spaces.' },
    { id: 'nord', name: 'Nord Avenue and the north fringe', route: 'old-side', note: 'Orchard lots and farmhouses where the noise carries and the neighbors are far.' }
  ],

  rooms: [
    { id: 'campus-garage', kind: 'HOUSE', hood: 'south-campus', cap: 60, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [70, 60, 45],
      pressure: 55, start: true, note: 'A rental garage with the door up and a cleared floor. All ages and sober, out by ten, and the unruly-gathering count is twenty.' },
    { id: 'avenues-yard', kind: 'HOUSE', hood: 'avenues', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 20, standing: [65, 60, 50],
      pressure: 55, note: 'A backyard and a porch behind an old bungalow. One neighbor with a phone ends the night.' },
    { id: 'roll-up-unit', kind: 'DIY', hood: 'barber', cap: 120, rent: 60, deposit: 0, pa: .5, curfew: 1380, ac: false, sketch: 45, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'A unit with a roll-up door, used when the landlord is looking the other way. Fire code and the next-door neighbors are the limits.' },
    { id: 'plaza-bar', kind: 'BAR', hood: 'downtown', cap: 120, soundFee: 50, pa: .7, ages: ['ALL', 'A21'], matinee: true, curfew: 1320, ac: true, following: .3, sketch: 20,
      standing: [55, 65, 70], note: 'A bar with a stage a block off the plaza. Early all-ages punk, seven to ten, then it turns back into a bar.' },
    { id: 'second-street-club', kind: 'CLUB', hood: 'downtown', cap: 250, houseCosts: 150, split: .8, pa: .85, ages: ['ALL', 'A21'], curfew: 1410, ac: true, following: .5, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', needs: ['FULL_BILL'], note: 'The real club room on the strip. Touring and local bills, and the age policy changes by night.' },
    { id: 'club-hall', kind: 'HALL', hood: 'downtown', cap: 200, rent: 220, deposit: 100, pa: .6, curfew: 1440, ac: true, sketch: 10, standing: [55, 60, 70],
      owner: 'HALL_MANAGER', note: 'A club hall rented by the night, with a rental fee and a janitor. Big enough for a real bill, and nobody wants a loud one twice.' },
    { id: 'strip-event-room', kind: 'CLUB', hood: 'east-side', cap: 300, houseCosts: 150, split: .8, pa: .8, ages: ['ALL'], curfew: 1380, ac: true, following: .3, sketch: 10,
      standing: [50, 65, 65], owner: 'TALENT_BUYER', note: 'A big event room in a half-empty strip. Fiddles and banjos in the listings; punk here would be an odd booking.' },
    { id: 'taproom-lot', kind: 'OUTDOOR', hood: 'downtown', cap: 300, rent: 20, pa: .5, curfew: 1290, sketch: 25, standing: [60, 60, 60],
      note: 'A taproom lot with a stage and no door. Free all-ages shows, until smoke or heat kills the evening.' },
    { id: 'meriam-barn', kind: 'OUTDOOR', hood: 'east-side', cap: 400, rent: 25, pa: .5, curfew: 1260, sketch: 15, standing: [55, 60, 65],
      note: 'A barn and a lawn in a new development. Polite crowds, free shows, and not really a punk room.' }
  ],

  contacts: ['sacramento', 'reno-nv', 'santa-rosa-ca', 'modesto-ca'],

  calendar: [
    { id: 'spring-parade', label: 'the spring parade weekend', tag: 'parade', month: 5, week: 1, dows: [5], can: [.85, .80, .80], hoods: ['downtown', 'south-campus'], elsewhere: [.95, .92, .92] },
    { id: 'taste-downtown', label: 'the downtown pub crawl and plaza concert', tag: 'festival', month: 9, week: 1, dows: [6], can: [.88, .90, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'county-fair', label: 'the county fair weekend', tag: 'fair', month: 8, week: 4, dows: [3, 4, 5, 6], can: [.90, .88, .88] },
    { id: 'move-in', label: 'move-in week', tag: 'holiday', month: 8, weeks: [3, 4], dows: [4, 5], can: [1.06, 1.04, 1], hoods: ['south-campus'], elsewhere: [1, 1, 1] },
    { id: 'winter-break', label: 'the winter break', tag: 'holiday', month: 12, weeks: [3, 4], dows: [3, 4, 5], can: [.88, .85, .85], hoods: ['south-campus'], elsewhere: [1, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1320, weekend: 1320, inForce: false } },

  points: [
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49, pop: 520000 },
    { name: 'Redding', state: 'CA', lat: 40.59, lon: -122.39, pop: 94000 },
    { name: 'Davis', state: 'CA', lat: 38.54, lon: -121.74, pop: 66000 },
    { name: 'Medford', state: 'OR', lat: 42.33, lon: -122.87, pop: 85000 },
    { name: 'Eureka', state: 'CA', lat: 40.8, lon: -124.16, pop: 27000 }
  ],
  roads: ['SR 99', 'SR 32', 'I-5', 'SR 70', 'the Skyway'],

  words: {
    street: ['the Esplanade', 'Nord Avenue', 'Park Avenue', 'Mangrove', 'the Skyway', 'East 20th'],
    water: ['Big Chico Creek', 'Lindo Channel', 'Sandy Gulch', 'the Sacramento River'],
    hood: ['South Campus', 'Barber', 'Chapmantown', 'the Avenues', 'Forest Ranch', 'Bidwell Park'],
    thing: ['almond huller', 'walnut orchard', 'tri-tip', 'taqueria', 'swimming hole', 'cruiser bike', 'punk house', 'pizza parlor', 'record store room', 'campus radio'],
    weather: ['tule fog', 'smoke day', 'triple digits']
  },

  events: [
    { id: 'CHICO_CA_UNRULY_COUNT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], calendar: 'holiday' },
      telegraph: 'The freshmen are back, and the house next door has been watching your garage all week.',
      title: 'A neighbor starts counting',
      body: 'Someone on the block has decided your garage show is a party and has called it in. The unruly-gathering rule starts at about twenty people, and you have sixty.',
      options: [
        { id: 'EARLY', label: 'Start early and be done by nine', likely: 'It\'s a short night, and the patrol car finds a dark house.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'You opened doors early and finished by nine, and the people who came got a tight set and nobody got cited.' },
        { id: 'HALL', label: 'Move the whole bill to a rented hall', likely: 'It costs money and loses some of the crowd.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .8 }],
          result: 'A club hall took the bill with a day to spare, and it felt less like a show, but it ran.' },
        { id: 'ACCEPT', label: 'Run it and keep the door shut', likely: 'The odds are not good.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'Half the list stayed away rather than get a host cited.' }
      ] },

    { id: 'CHICO_CA_SMOKE_DAY', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [8, 9, 10, 11] },
      telegraph: 'Smoke from a fire in the foothills has turned the afternoon orange, and the air has a taste.',
      title: 'Smoke over the stage',
      body: 'The smoke has settled into the valley, and the air is bad enough that nobody wants to stand in a lot, so the outdoor stage is dark.',
      options: [
        { id: 'INSIDE', label: 'Move the bill inside to a hall', likely: 'Everyone fits and breathes, but it costs a rental.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The hall took the bill, and the doors stayed shut against the haze.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'Only the committed show up, coughing.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'It was a thin crowd in masks, and a set cut short.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the air was no better.' }
      ] }
  ]
});
