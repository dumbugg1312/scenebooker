SB.Cities.register('harrisonburg-va', {
  v: 1,
  slug: 'harrisonburg-va',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['james madison university', 'jmu', 'eastern mennonite university', 'bridgewater college', 'university of virginia', 'uva', 'virginia tech',
           'virginia military institute', 'washington and lee', 'the breeze', 'daily news-record', 'daily news record', 'whsv', 'wxjm', 'wmra',
           'waffle house', 'sheetz', 'wawa', 'cook out', 'parents\' weekend', 'parents weekend', 'blacks run annex', 'the scale house',
           'valley pike parlor', 'switchyard hall', 'granary row', 'the cold room', 'massanutten room', 'feed store back room',
           'shenandoah lodge no. 9', 'the hatch house', 'pike street garage', 'turkey hill grange', 'vfw', 'american legion',
           'bridgeforth stadium', 'macrock', 'harrisonburg citizen', 'hburg citizen', 'wemc', 'wvtf', 'whro', 'rocktown now', 'virginia folklife',
           'virginia film festival', 'harrisonburg fire department', 'new year\'s plunge', 'valley 4th', 'rocktown beer and music festival',
           'harrisonburg downtown renaissance', 'espn gameday'],
  /* Dossier institutions and its unchecked invented venue names are banned: research, not content. */
  blocklist: ['jmu*', 'james madison*', 'whsv*', 'wxjm*', 'scale house*', 'hatch house*', 'granary row*', 'switchyard hall*', 'macrock*', 'rocktown now*'],

  blurb: ['Students, farm kids and a few lifers share the same basements, and when the semester ends, half the scene drives home.',
          'Shows live in rented houses and county halls, and the landlord is the real headliner.'],
  hard: 'Student turnover and strict landlords keep the good rooms short-lived.',
  region: 'the Valley',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Harrisonburg' },
    { id: 'bridgewater', kind: 'FEEDER', name: 'Bridgewater and Dayton', minutes: 15, bearing: 195, note: 'A small college town and a farm town just south; a few students and kids.' },
    { id: 'broadway', kind: 'FEEDER', name: 'Broadway and Timberville', minutes: 20, bearing: 350, note: 'Poultry and farm towns whose high-school kids ride in for shows.' },
    { id: 'elkton', kind: 'FEEDER', name: 'Elkton', minutes: 25, bearing: 90, note: 'A small mill and farm town at the foot of the Blue Ridge.' },
    { id: 'staunton', kind: 'FEEDER', name: 'Staunton', minutes: 35, bearing: 200, note: 'A small arts-minded city with its own music and theater; more peer than feeder.', bands: 2 },
    { id: 'luray', kind: 'FEEDER', name: 'Luray', minutes: 40, bearing: 55, note: 'A tourist town over Massanutten Mountain on US 211.' },
    { id: 'waynesboro', kind: 'FEEDER', name: 'Waynesboro', minutes: 45, bearing: 175, note: 'A blue-collar small city with metal and punk kids.', lean: ['metal', 'hardcore'] },
    { id: 'woodstock', kind: 'FEEDER', name: 'Woodstock and Strasburg', minutes: 50, bearing: 20, note: 'Small Valley towns up I-81; Strasburg leans toward Winchester.' },
    { id: 'moorefield', kind: 'FEEDER', name: 'Moorefield and Petersburg', state: 'WV', minutes: 75, bearing: 305, note: 'Farm and mountain towns; kids cross the mountains on US 33 for shows.' },
    { id: 'charlottesville', kind: 'PEER', name: 'Charlottesville', minutes: 60, bearing: 110, slug: 'charlottesville-va', note: 'Bigger, richer and over the mountain on US 33; the towns trade bands.' },
    { id: 'roanoke', kind: 'PEER', name: 'Roanoke', minutes: 105, bearing: 215, slug: 'roanoke-va', note: 'A larger city down I-81.' },
    { id: 'lynchburg', kind: 'PEER', name: 'Lynchburg', minutes: 120, bearing: 160, slug: 'lynchburg-va', note: 'Bigger and more conservative, with religious schools.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Court Square', route: 'downtown', note: 'Brick storefronts, bars with back rooms and an arts district; priced out for DIY but good for a bar show.' },
    { id: 'east-side', name: 'the east side by campus', route: 'campus', note: 'Student apartment complexes and rental houses on Port Republic Road; thin walls and managed leases.' },
    { id: 'old-town', name: 'Old Town and South Main', route: 'old-side', note: 'Older houses, part rentals; basements and porches, and watchful neighbors.' },
    { id: 'northeast', name: 'the Northeast Neighborhood', route: 'old-side', note: 'A historic Black neighborhood with deep roots; not a student playground.' },
    { id: 'park-view', name: 'Park View', route: 'old-side', note: 'Small houses and church-heavy streets in the northwest; quiet hours are enforced by neighbors.' },
    { id: 'the-pike', name: 'the Pike corridor', route: 'work-side', note: 'Strip malls, motels and immigrant groceries; cheap, ignored and practical.' },
    { id: 'rail-edge', name: 'the rail and plant edge', route: 'work-side', note: 'Warehouses and cold storage; practice rooms and the odd warehouse show, shrinking as they convert.' },
    { id: 'county-edge', name: 'the Rockingham County edge', route: 'work-side', note: 'Farmhouses, barns and fields past the city line; the risk is the sheriff and the neighbors.' }
  ],

  rooms: [
    { id: 'old-town-basement', kind: 'HOUSE', hood: 'old-town', cap: 60, curfew: 1350, ac: false, sketch: 25, standing: [65, 60, 45], pressure: 55, start: true,
      note: 'A low-ceiling basement in Old Town, shoulder to shoulder, with a donation jar and the address by word of mouth. The host has given the neighbors a phone number.' },
    { id: 'east-side-house', kind: 'HOUSE', hood: 'east-side', cap: 50, curfew: 1320, ac: false, sketch: 20, standing: [65, 60, 40], pressure: 55,
      note: 'A newer house on the rental streets that opened after the old one closed. About a show a month, and it lives on a patient landlord.' },
    { id: 'complex-house', kind: 'HOUSE', hood: 'east-side', cap: 40, curfew: 1320, ac: true, sketch: 20, standing: [65, 55, 40], pressure: 60,
      note: 'An apartment at the edge of a rental complex. The walls are thin and the neighbors are on the other side of the drywall.' },
    { id: 'park-view-porch', kind: 'HOUSE', hood: 'park-view', cap: 35, curfew: 1290, ac: false, outdoor: true, sketch: 20, standing: [65, 55, 50], pressure: 55,
      note: 'A porch and a yard on a church-heavy street. Warm months only, and somebody will call it in.' },
    { id: 'rail-bay', kind: 'DIY', hood: 'rail-edge', cap: 120, rent: 60, curfew: 1380, ac: false, sketch: 40, standing: [55, 60, 45], pressure: 65, needs: ['VOUCH'],
      note: 'A light-industrial bay by the tracks. The fire department shut a room like it this year, and it was never approved for a crowd.' },
    { id: 'coffee-stage', kind: 'SHOP', hood: 'downtown', cap: 60, curfew: 1260, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'A downtown coffee shop with a stage that took in the displaced shows. Early, sober and safe.' },
    { id: 'court-square-bar', kind: 'BAR', hood: 'downtown', cap: 150, soundFee: 50, pa: .6, ages: ['A21'], curfew: 1470, ac: true, following: .3, sketch: 20, standing: [50, 65, 65],
      note: 'A cidery with a small stage off the square. It hosts the overflow, and the license sets who gets in.' },
    { id: 'county-hall', kind: 'HALL', hood: 'county-edge', cap: 150, rent: 150, deposit: 75, curfew: 1320, ac: true, sketch: 10, standing: [55, 60, 60], owner: 'HALL_MANAGER', pressure: 45,
      note: 'A rented fire hall past the city line. The sheriff and the pastor both have opinions, and it is out by ten.' },
    { id: 'park-pavilion', kind: 'OUTDOOR', hood: 'county-edge', cap: 100, rent: 20, curfew: 1140, sketch: 30, standing: [60, 55, 40],
      note: 'A park pavilion and a generator. A crowd that size with amps needs a city permit, and it is over by seven.' }
  ],

  contacts: ['charlottesville-va', 'roanoke-va', 'lynchburg-va', 'hagerstown-md', 'richmond'],

  calendar: [
    { id: 'diy-weekend', label: 'the DIY music weekend', tag: 'festival', month: 4, week: 1, dows: [4, 5], can: [1.05, 1.08, 1], hoods: ['downtown'], elsewhere: [.92, .88, 1] },
    { id: 'fair', label: 'the county fair', tag: 'fair', month: 8, weeks: [2, 3], dows: [4, 5], can: [.95, .92, .9] },
    { id: 'semester-start', label: 'the week the students come back', tag: 'holiday', month: 8, week: 4, dows: [4, 5, 6], can: [1.08, 1.1, 1], hoods: ['east-side'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 3], dows: [5], can: [.85, .95, .95], hoods: ['east-side', 'old-town'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football and homecoming', tag: 'game', month: 10, weeks: [3, 4], dows: [4, 5], can: [.85, .95, .95], hoods: ['east-side', 'downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 2], dows: [5], can: [.85, .95, .95], hoods: ['east-side', 'old-town'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'holiday-parade', label: 'the holiday parade and tree lighting', tag: 'parade', month: 11, week: 4, dows: [4, 5], can: [.92, 1, 1], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Winchester', state: 'VA', lat: 39.19, lon: -78.16, pop: 28000 },
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44, pop: 1300000 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04, pop: 6300000 },
    { name: 'Knoxville', state: 'TN', lat: 35.96, lon: -83.92, pop: 870000 }
  ],
  roads: ['I-81', 'US 11', 'US 33', 'VA 42', 'US 250', 'US 211'],

  words: {
    street: ['Main Street', 'Market Street', 'Port Republic Road', 'Reservoir Street', 'University Boulevard', 'Mount Clinton Pike'],
    water: ['Blacks Run', 'the Shenandoah'],
    hood: ['Old Town', 'Park View', 'Northeast', 'the east side', 'Court Square', 'Dayton', 'Bridgewater'],
    thing: ['poultry house', 'feed mill', 'hay wagon', 'cinder block', 'apple orchard', 'turkey house', 'basement window', 'barn', 'porch', 'coffee shop set'],
    weather: ['valley fog', 'black ice', 'mountain thunderstorm']
  },
  events: [
    { id: 'HARRISONBURG_VA_FIRE_MARSHAL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The fire department has been walking the downtown rooms, and word is that one more is about to be shut.',
      title: 'The fire marshal comes by',
      body: 'The building was only ever approved for manufacturing, not for a crowd. The marshal has looked at your room, and your bill is in four days.',
      options: [
        { id: 'COFFEE', label: 'Move the show to a coffeehouse at five', likely: 'You get half the crowd and no amps, but it\'s safe.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'SHOP', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .5 }],
          result: 'A coffee shop took you at five, and it was acoustic sets, a full counter and no complaints.' },
        { id: 'HOUSE', label: 'Move the bill to a basement', likely: 'It\'s smaller and louder, and nobody is inspecting a house.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A basement took the bill with a day to spare, and the floor was packed.' },
        { id: 'ACCEPT', label: 'Run it and hope', likely: 'Some of the list stays home, worried about the door.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Nobody came to the door, but it was a nervous night, and the room was thinner than you wanted.' }
      ] },

    { id: 'HARRISONBURG_VA_GAME_DAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'A home game is on Saturday, and South Main will be shut.',
      title: 'The van cannot get through',
      body: 'The first home game fills the east side and the streets around it. The band from Richmond is stuck behind the traffic, and the house is on the other side of it.',
      options: [
        { id: 'LATE', label: 'Push doors back until the traffic breaks', likely: 'It starts late, and the crowd waits it out.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'You opened doors an hour late, and the band walked the last mile with their amps.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the game.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The casual crowd stayed home, and the regulars came.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date, and the bands trust you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'HARRISONBURG_VA_NEIGHBOR_CALL', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 2] },
      telegraph: 'The flyer says to call the number if the volume is a problem, and somebody has the number.',
      title: 'The neighbor calls at 9:55',
      body: 'The host gave the block a phone number, and a neighbor took it literally. The host has one warning left, and the second band is just starting.',
      options: [
        { id: 'TURN_DOWN', label: 'Turn it down and go acoustic', likely: 'It\'s a quieter, weirder set, and most people stay.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The drums went to brushes and the room leaned in, and the neighbor stopped calling.' },
        { id: 'END', label: 'End it early and take the bands out front', likely: 'It\'s a short night, and nobody gets in trouble.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'You stopped at ten, and the street stayed loud for another hour, though more quietly.' },
        { id: 'ACCEPT', label: 'Ignore the call', likely: 'The host burns the one warning.',
          effects: [{ op: 'MONEY', amount: -40 }],
          result: 'Deputies came by and cited the host, and the show went on, but the host won\'t forget it.' }
      ] }
  ]

});
