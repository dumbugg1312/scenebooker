SB.Cities.register('slidell-la', {
  v: 1,
  slug: 'slidell-la',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['southeastern louisiana university', 'slu', 'keesler', 'stennis space center', 'stennis', 'michoud', 'nasa', 'textron', 'amtrak',
           'crescent', 'katrina', 'hurricane katrina', 'waffle house', 'raising cane\'s', 'raising canes', 'new orleans saints', 'lsu', 'jazz fest',
           'french quarter fest', 'essence festival', 'wwoz', 'wtul', 'nola.com', 'slidell sentry-news', 'sentry-news', 'community coffee',
           'abita beer', 'vfw', 'knights of columbus', 'pearl river community college', 'salmen high', 'slidell high', 'bonfouca creosote',
           'rail spur hall', 'bonfouca hall', 'front street annex', 'twin span social club', 'honey island barn', 'camellia unit b',
           'cross street carport', 'gause bay 6', 'salt marsh pavilion', 'pontchartrain pallet co.', 'pontchartrain pallet', 'bayou boat shed',
           'olde towne metal fest', 'slidell heritage festival', 'slidell heritage', 'krewe de paws', 'krewe of kidz', 'kidz wagon parade', 'slidell christmas parade',
           'fritchie park', 'connectfest', 'music food and art festival', 'rockin\' the rails', 'visit the northshore', 'st tammany sheriff', 'slidell police',
           'wwltv', 'wwl', 'bandsintown', 'gigsalad', 'eventbrite', 'louisiana state police'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The storm is written only as 'the storm' in game text. */
  blocklist: ['sentry-news*', 'waffle house*', 'raising cane*', 'keesler*', 'wwoz*', 'wtul*', 'rail spur*', 'honey island barn*'],

  blurb: ['A garage-and-carport town with the real night 35 minutes across the lake. Kids book what they can and watch the weather.',
          'Houses sit on slabs, with no basements. Everyone carpools, and the crowd is half friends and family.'],
  hard: 'Everyone with a van drives across the lake instead.',
  region: 'the Gulf',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07 },
    { name: 'Baton Rouge', state: 'LA', lat: 30.45, lon: -91.15 },
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Slidell' },
    { id: 'pearl-river', kind: 'FEEDER', name: 'Pearl River', minutes: 15, bearing: 20, note: 'A small swamp-edge town of high school kids with no scene of its own.' },
    { id: 'lacombe', kind: 'FEEDER', name: 'Lacombe', minutes: 15, bearing: 265, note: 'Rural, bayou and fishing-camp country west on US 190.' },
    { id: 'picayune', kind: 'FEEDER', name: 'Picayune', state: 'MS', minutes: 25, bearing: 35, note: 'A small Mississippi town up I-59; kids come south for shows.' },
    { id: 'covington', kind: 'FEEDER', name: 'Covington', minutes: 25, bearing: 295, note: 'Affluent and antique-minded, with a small bar-music scene.' },
    { id: 'mandeville', kind: 'FEEDER', name: 'Mandeville', minutes: 25, bearing: 255, note: 'A wealthy lakefront suburb; kids with money and cars.' },
    { id: 'bay-st-louis', kind: 'FEEDER', name: 'Bay St. Louis and Waveland', state: 'MS', minutes: 30, bearing: 85, note: 'Arty beach towns still rebuilding from the storm, with a little scene of their own.', bands: 1 },
    { id: 'abita-springs', kind: 'FEEDER', name: 'Abita Springs', minutes: 30, bearing: 290, note: 'A tiny town west on the Northshore.' },
    { id: 'poplarville', kind: 'FEEDER', name: 'Poplarville', state: 'MS', minutes: 40, bearing: 25, note: 'A farm and small-college town.' },
    { id: 'ponchatoula', kind: 'FEEDER', name: 'Ponchatoula and Folsom', minutes: 40, bearing: 300, note: 'Strawberry and horse country; small.' },
    { id: 'hammond', kind: 'PEER', name: 'Hammond', minutes: 45, bearing: 290, scene: 900, note: 'The college town up I-12 that sees Slidell as the suburbs; the real nearby scene.' },
    { id: 'gulfport', kind: 'PEER', name: 'Gulfport and Biloxi', state: 'MS', minutes: 55, bearing: 90, slug: 'gulfport-ms', note: 'The coast cities an hour east on I-10, with casinos and a bigger scene.' },
    { id: 'houma', kind: 'PEER', name: 'Houma', minutes: 90, bearing: 235, scene: 700, note: 'A bayou city of similar size to the southwest.' },
    { id: 'hattiesburg', kind: 'PEER', name: 'Hattiesburg', state: 'MS', minutes: 105, bearing: 35, scene: 1200, note: 'A larger college city up I-59.' }
  ],

  hoods: [
    { id: 'olde-towne', name: 'Olde Towne', route: 'downtown', note: 'The old railroad downtown: small storefronts and city-run events, the likeliest home of a legit room and the least tolerant of a loud one.' },
    { id: 'gause', name: 'the Gause Boulevard corridor', route: 'work-side', note: 'Chain restaurants, strip malls and slowly emptying retail; cheap rentable units and bays.' },
    { id: 'fremaux', name: 'Fremaux', route: 'campus', note: 'Newer polished retail and suburbs; priced up and hostile to shows.' },
    { id: 'lakeside', name: 'Eden Isles and Oak Harbor', route: 'old-side', note: 'Canal subdivisions and raised houses by the lake; older, richer and flood-prone.' },
    { id: 'salmen', name: 'Salmen and Brownswitch', route: 'campus', note: 'Postwar and 1990s subdivisions where the bands live: garages, carports and backyards on slabs.' },
    { id: 'pearl-side', name: 'the Pearl River side', route: 'work-side', note: 'Wooded lots and trailers out toward the swamp; big yards and bonfire shows far from neighbors.' },
    { id: 'bayou-liberty', name: 'Bayou Liberty and Bayou Bonfouca', route: 'old-side', note: 'Bayou-side houses and acreage west of town; quiet, scattered backyard and boat-shed shows.' }
  ],

  contacts: ['gulfport-ms', 'new-orleans-la', 'baton-rouge-la', 'mobile-al', 'lafayette-la'],

  calendar: [
    { id: 'antique-spring', label: 'the antique street fair', tag: 'fair', month: 3, week: 4, dows: [5, 6], can: [.85, .85, .82], hoods: ['olde-towne'], elsewhere: [.98, .97, .97] },
    { id: 'antique-fall', label: 'the antique street fair', tag: 'fair', month: 10, week: 4, dows: [5, 6], can: [.85, .85, .82], hoods: ['olde-towne'], elsewhere: [.98, .97, .97] },
    { id: 'pumpkin-fest', label: 'the pumpkin festival', tag: 'festival', month: 10, week: 1, dows: [5, 6], can: [.88, .85, .82], hoods: ['olde-towne'], elsewhere: [1, .98, .98] },
    { id: 'carnival', label: 'Carnival parade weekends', tag: 'parade', month: 2, weeks: [1, 4], dows: [4, 5, 6], can: [.90, .85, .85], hoods: ['olde-towne'], elsewhere: [.97, .95, .95] },
    { id: 'heritage-fest', label: 'the heritage festival', tag: 'festival', month: 7, week: 1, dows: [4, 5, 6], can: [.90, .88, .85] },
    { id: 'xmas-parade', label: 'the downtown Christmas parade', tag: 'parade', month: 11, week: 4, dows: [5], can: [.88, .85, .85], hoods: ['olde-towne'], elsewhere: [1, .98, .98] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07, pop: 380000 },
    { name: 'Hammond', state: 'LA', lat: 30.5, lon: -90.46, pop: 20000 },
    { name: 'Hattiesburg', state: 'MS', lat: 31.33, lon: -89.29, pop: 48000 },
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.8, pop: 200000 }
  ],
  roads: ['I-10', 'I-12', 'I-59', 'US 11', 'US 190', 'the Twin Span'],

  words: {
    street: ['Gause Boulevard', 'Front Street', 'US 11', 'US 190'],
    water: ['Lake Pontchartrain', 'Bayou Bonfouca', 'Bayou Liberty', 'the Pearl River', 'Honey Island Swamp'],
    hood: ['Olde Towne', 'Eden Isles', 'Oak Harbor', 'Salmen', 'Brownswitch', 'Fremaux', 'Lacombe', 'the Northshore'],
    thing: ['carport', 'boudin', 'snoball', 'king cake', 'crawfish boil', 'neutral ground', 'daiquiri drive-through', 'garage', 'trailer', 'hurricane cone', 'drive-thru'],
    weather: ['afternoon thunderstorm', 'storm watch', 'boil-water advisory']
  },

  events: [
    { id: 'SLIDELL_LA_STORM_CONE', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], months: [8, 9, 10] },
      telegraph: 'There is a storm in the Gulf, and the cone has moved over the weekend.',
      title: 'Everyone is checking the cone',
      body: 'A storm in the Gulf has the forecast cone sliding toward the coast. The whole bill is watching it before anyone puts up a flyer, and a garage show cannot stand in the wind.',
      options: [
        { id: 'WAIT', label: 'Hold the date and watch the cone', likely: 'Most hold out hope. The crowd comes late and thin.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }],
          result: 'The cone slid east at noon. You started late, and the ones who came were glad to be out.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'Half the list stays home with the shutters.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.6 }],
          result: 'People were taping windows. The room was mostly the bands.' }
      ] },

    { id: 'SLIDELL_LA_ANTIQUE_FAIR', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The antique street fair takes over downtown for the whole weekend.',
      title: 'The vendors have the alley',
      body: 'The street fair has the streets and the parking, and your storefront show has to load in through the back alley before the vendors arrive.',
      options: [
        { id: 'EARLY', label: 'Load in at dawn and open early', likely: 'The gear gets in. A tired crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.92 }],
          result: 'You loaded in before the vendors and opened when the fair crowd wandered in.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'A lot of people give up on the parking.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.75 }],
          result: 'The streets stayed shut. Half the list never found a place to leave the car.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'SLIDELL_LA_CARNIVAL_SATURDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], calendar: 'parade' },
      telegraph: 'A parade rolls through downtown Saturday afternoon, and the cops will be busy.',
      title: 'A parade, then the dark',
      body: 'A parade rolls through town in the afternoon and the crowd and the cops are both busy. A show after dark can be big or it can be empty.',
      options: [
        { id: 'LATE', label: 'Push doors back until the parade is over', likely: 'The parade crowd drifts in. Later than planned.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.15 }],
          result: 'Doors an hour late. The parade crowd spilled in, loud and happy.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Half the town is already worn out.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }],
          result: 'The parade ended, and so did the night for most of them.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] }
  ]
});
