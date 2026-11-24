SB.Cities.register('daytona-beach-fl', {
  v: 1,
  slug: 'daytona-beach-fl',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['bethune-cookman', 'bethune-cookman university', 'daytona state college', 'embry-riddle', 'embry-riddle aeronautical university', 'ucf daytona beach',
           'daytona international speedway', 'daytona 500', 'speedweeks', 'rolex 24', 'coke zero sugar 400', 'coke zero', 'bike week', 'biketoberfest',
           'daytona beach news-journal', 'news-journal', 'waffle house', 'publix', 'vfw', 'american legion', 'elks', 'orlando weekly',
           'sandspur hall', 'the weekly rate', 'fourth turn social club', 'coquina annex', 'pit wall', 'no vacancy pool court', 'lot nine',
           'wash and fold room', 'brake dust', 'the lanai', 'ridgewood bay seven', 'gate c garage', 'volusia county', 'main street pier',
           'daytona beach bandshell', 'ocean center', 'nascar', 'rideshare', 'uber', 'lyft',
           'rockville', 'welcome to rockville', 'jeep beach', 'turkey run', 'spring turkey run', 'daytona spring turkey run', 'peabody auditorium', 'daytona beach peabody',
           'oceanfront bandshell', 'sounds of summer', 'midtown music series', 'daisy stocking park', 'wftv', 'fox 35', 'wusf', 'cfpublic', 'central florida public media',
           'observer local news', 'rewind it magazine', 'music scene media', 'bandsintown', 'eventbrite', 'special event zone', 'daytona beach police'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real institutions are written only in generic form. */
  blocklist: ['daytona international*', 'bike week*', 'biketoberfest*', 'news-journal*', 'waffle house*', 'sandspur hall*', 'embry-riddle*', 'bethune*'],

  blurb: ['A tourist town where a show is a bar bill: heavy and pop-punk bands in pubs and a pizza-and-brewery room, between tribute nights.',
          'Race and bike weeks swamp the small shows, and the storms and redevelopment keep taking the cheap buildings.'],
  hard: 'Bar rooms with covers and age limits, and the storms take the cheap buildings.',
  region: 'the Florida coast',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38 },
    { name: 'Jacksonville', state: 'FL', lat: 30.33, lon: -81.66 },
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Miami', state: 'FL', lat: 25.76, lon: -80.19 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Daytona Beach' },
    { id: 'ormond-beach', kind: 'FEEDER', name: 'Ormond Beach', minutes: 15, bearing: 5, note: 'A wealthier, older suburb to the north; some local kids, no scene of its own.' },
    { id: 'port-orange', kind: 'FEEDER', name: 'Port Orange', minutes: 15, bearing: 190, note: 'A big family suburb to the south with small garage-band culture.' },
    { id: 'new-smyrna-beach', kind: 'FEEDER', name: 'New Smyrna Beach', minutes: 25, bearing: 185, note: 'A surf and arts town with an independent streak and some pride.', bands: 2 },
    { id: 'deltona', kind: 'FEEDER', name: 'Deltona', minutes: 35, bearing: 250, note: 'A huge planned bedroom suburb full of young kids with no way to a show.' },
    { id: 'deland', kind: 'FEEDER', name: 'DeLand', minutes: 35, bearing: 265, note: 'A county seat and small college town with an old downtown and a few bands.', bands: 2 },
    { id: 'flagler-beach', kind: 'FEEDER', name: 'Flagler Beach', minutes: 35, bearing: 355, note: 'A small beach town up A1A.' },
    { id: 'edgewater', kind: 'FEEDER', name: 'Edgewater', minutes: 35, bearing: 180, note: 'A quiet working-class town down US 1.' },
    { id: 'palm-coast', kind: 'FEEDER', name: 'Palm Coast', minutes: 45, bearing: 355, note: 'A large planned suburb of retirees and families; no real scene.' },
    { id: 'titusville', kind: 'FEEDER', name: 'Titusville', minutes: 55, bearing: 175, note: 'A Space Coast town tied to the space industry.' },
    { id: 'st-augustine', kind: 'PEER', name: 'St. Augustine', minutes: 70, bearing: 345, scene: 500, note: 'A smaller tourist and arts town that trades kids for weekend shows.' },
    { id: 'palm-bay', kind: 'PEER', name: 'Melbourne and Palm Bay', minutes: 75, bearing: 180, slug: 'palm-bay-fl', note: 'A similar-size Space Coast scene with its own punk and metal; an easy trade of bands.' },
    { id: 'ocala', kind: 'PEER', name: 'Ocala', minutes: 80, bearing: 275, slug: 'ocala-fl', note: 'Horse country with a smaller scene, through the forest on SR 40.' },
    { id: 'gainesville', kind: 'PEER', name: 'Gainesville', minutes: 120, bearing: 310, slug: 'gainesville-fl', note: 'The state\'s best-known college punk town: more a destination than a peer.' }
  ],

  hoods: [
    { id: 'beachside', name: 'the beachside strip', route: 'downtown', note: 'Bars, arcades, tattoo shops and weekly-rate motels on A1A and the boardwalk; cheap in the back streets, priced out near the new condos.' },
    { id: 'seabreeze', name: 'Seabreeze', route: 'downtown', note: 'Older houses, restaurants and small bars on the island with an old-Florida feel.' },
    { id: 'downtown', name: 'downtown and the riverfront', route: 'old-side', note: 'Old brick storefronts at the foot of the main bridge, with ground floors that open and close.' },
    { id: 'midtown', name: 'Midtown', route: 'old-side', note: 'A long-underinvested neighborhood of churches, small shops and real history around the historically Black university. Not a district to treat as cheap space.' },
    { id: 'ridgewood', name: 'the Ridgewood corridor', route: 'work-side', note: 'Strip malls, pawn shops, car lots and block commercial buildings along US 1; cheap bays and practice rooms.' },
    { id: 'speedway', name: 'the speedway and airport zone', route: 'campus', note: 'Chain hotels, parking lots, students and a speedway; few places can host and everything shuts for race weeks.' },
    { id: 'holly-hill', name: 'Holly Hill', route: 'work-side', note: 'A small, rough-edged town just north where garages hold practices and backyard shows.' },
    { id: 'south-suburbs', name: 'the southern suburbs', route: 'campus', note: 'Family suburban streets with garages to the south.' }
  ],

  rooms: [
    { id: 'holly-carport', kind: 'HOUSE', hood: 'holly-hill', cap: 40, curfew: 1320, ac: false, outdoor: false, sketch: 30, pressure: 50, start: true,
      note: 'A carport in a small rough-edged town north of the city. No basements on a slab, and the neighbors and the ten o\'clock line decide how long it lasts.' },
    { id: 'orange-garage', kind: 'HOUSE', hood: 'south-suburbs', cap: 40, curfew: 1320, ac: false, outdoor: false, sketch: 20, pressure: 55,
      note: 'A garage in a family suburb. Parents drive the kids, so it ends early and sober.' },
    { id: 'ridgewood-bay', kind: 'SHOP', hood: 'ridgewood', cap: 60, curfew: 1260, ac: true, sketch: 25,
      note: 'A cheap commercial bay on the highway, shared by a practice room and a few shows. The landlord decides.' },
    { id: 'ridgewood-dive', kind: 'BAR', hood: 'ridgewood', cap: 120, ages: ['A21'], curfew: 1440, ac: true, sketch: 35, standing: [50, 60, 60],
      note: 'A strip-mall dive that will give a weeknight to a local bill. Twenty-one and up, and the cover is yours to set.' },
    { id: 'main-street-bar', kind: 'BAR', hood: 'beachside', cap: 250, ages: ['A21'], curfew: 1500, ac: true, following: .3, standing: [45, 60, 70],
      note: 'A garage-style music room on the old main drag. Nightly live music, mostly covers for the tourists.' },
    { id: 'punk-bar', kind: 'BAR', hood: 'beachside', cap: 150, ages: ['A21'], curfew: 1470, ac: true, following: .4, standing: [55, 65, 65],
      note: 'A bar that books touring older punk and horror-punk on weekends. Tourists drift in halfway through.' },
    { id: 'pizza-brewery', kind: 'CLUB', hood: 'downtown', cap: 250, ages: ['A18'], curfew: 1380, ac: true, houseCosts: 180, following: .5, standing: [50, 65, 65],
      note: 'A pizza-and-brewery room with a built stage and ticketed pop-punk and emo nights. Eighteen and up, home by eleven.' },
    { id: 'oceanfront-stage', kind: 'OUTDOOR', hood: 'beachside', cap: 400, curfew: 1260, rent: 0, standing: [55, 55, 50],
      note: 'The free summer series on the oceanfront. Tribute acts, not punk, so a local band gets on by a long shot, and a storm ends it.' },
    { id: 'civic-hall', kind: 'BIG', hood: 'downtown', cap: 2500, ages: ['ALL'], curfew: 1380, ac: true, standing: [40, 60, 60],
      note: 'The civic auditorium on the mainland. It books touring acts and tributes, and a booker here is a promoter renting the room.' }
  ],

  contacts: ['palm-bay-fl', 'ocala-fl', 'gainesville-fl', 'orlando', 'jacksonville'],

  calendar: [
    { id: 'race-weeks', label: 'race weeks', tag: 'race', month: 2, weeks: [2, 3], dows: [3, 4, 5, 6], can: [.75, .80, .85], hoods: ['speedway', 'beachside'], elsewhere: [.92, .92, .92] },
    { id: 'spring-rally', label: 'the big spring rally', tag: 'festival', month: 3, weeks: [1, 2], dows: [0, 1, 2, 3, 4, 5, 6], can: [.85, .88, .90], hoods: ['beachside', 'downtown', 'ridgewood'], elsewhere: [.95, .95, .95] },
    { id: 'spring-break', label: 'spring break weekends', tag: 'holiday', month: 3, weeks: [2, 4], dows: [4, 5, 6], can: [.85, .90, .90], hoods: ['beachside'], elsewhere: [1, .97, .97] },
    { id: 'metal-fest', label: 'the metal and rock festival', tag: 'festival', month: 5, week: 2, dows: [3, 4, 5, 6], can: [.88, .90, .92], hoods: ['speedway'], elsewhere: [.95, .95, .95] },
    { id: 'fall-rally', label: 'the fall rally', tag: 'festival', month: 10, week: 3, dows: [3, 4, 5, 6], can: [.90, .90, .92], hoods: ['beachside', 'downtown'], elsewhere: [.97, .97, .97] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.88, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.88, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38, pop: 310000 },
    { name: 'Jacksonville', state: 'FL', lat: 30.33, lon: -81.66, pop: 950000 },
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46, pop: 400000 },
    { name: 'Savannah', state: 'GA', lat: 32.08, lon: -81.09, pop: 147000 }
  ],
  roads: ['I-95', 'I-4', 'US 1', 'A1A', 'SR 44', 'SR 40'],

  words: {
    street: ['Ridgewood Avenue', 'Seabreeze Boulevard', 'International Speedway Boulevard', 'Beach Street', 'A1A', 'Granada Boulevard'],
    water: ['the Halifax', 'the Intracoastal', 'the Atlantic', 'the Tomoka'],
    hood: ['Seabreeze', 'Midtown', 'Holly Hill', 'Beachside', 'Ormond Beach', 'Port Orange'],
    thing: ['weekly-rate motel', 'carport', 'lanai', 'boiled peanuts', 'Cuban sandwich', 'tiki bar', 'moped', 'pizza stage', 'cover charge', 'tribute night'],
    weather: ['afternoon thunderstorm', 'storm watch', 'humidity']
  },

  events: [
    { id: 'DAYTONA_BEACH_FL_RACE_WEEKS', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'race' },
      telegraph: 'The hotels are full and the bar owners are lining up cover bands for the race crowd.',
      title: 'The race crowd takes the bar',
      body: 'Race week has every hotel full and the roads jammed. The bar owner wants a cover band for the visitors, and your local bill is about to lose its night.',
      options: [
        { id: 'CARPORT', label: 'Move the whole bill to a carport in Holly Hill tonight', likely: 'It\'s smaller and louder, away from the traffic.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A carport in Holly Hill took the bill with an hour to spare, and the driveway was packed.' },
        { id: 'EARLY', label: 'Take the early slot and finish before the cover band', likely: 'Most of them get in before the visitors, but it\'s a short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'You played to a half-full room at six and cleared the stage for the covers.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'DAYTONA_BEACH_FL_STORM_DAY', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [6, 7, 8, 9, 10] },
      telegraph: 'A storm warning is up for the evening and the beach crowd is already heading inland.',
      title: 'The beach crowd runs for cover',
      body: 'A storm has scattered the oceanfront and sent everyone looking for a dry room. The cheap building you booked leaks, and the owner of the mainland room has an empty night.',
      options: [
        { id: 'DRY', label: 'Move the bill to the mainland room that stays dry', likely: 'It\'s a better night, if you can pay for it.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.15 }],
          result: 'The dry room filled with people who had nowhere else to be.' },
        { id: 'WAIT', label: 'Hold the doors until it passes', likely: 'It\'s a late start, and the crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The rain cleared at ten, so you started late, and nobody left.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date and costs you some trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could come, came.' }
      ] },

    { id: 'DAYTONA_BEACH_FL_YOUTH_CURFEW', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'holiday', months: [3, 4] },
      telegraph: 'After a wild spring break weekend the city is talking about a curfew for kids on the beachside.',
      title: 'The beachside curfew goes up',
      body: 'The city has put a curfew on anyone under eighteen on the beachside after eight. Your all-ages show is on the main drag, and half its crowd just got sent home.',
      options: [
        { id: 'MAINLAND', label: 'Move the show to a mainland room', likely: 'It\'s smaller, but the kids can get there.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A mainland garage took the bill, and the kids found it.' },
        { id: 'EARLY', label: 'Start at five and finish before the curfew', likely: 'The kids get in, but it\'s a short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -150 }, { op: 'SHOW_MOD', key: 'headsMul', v: .92 }],
          result: 'Doors were at five and everyone was out by eight, so the kids who came were home on time.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'Half the kids stay home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }],
          result: 'The kids stayed on the mainland, and the room was mostly adults.' }
      ] }
  ]
});
