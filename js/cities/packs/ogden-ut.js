SB.Cities.register('ogden-ut', {
  v: 1,
  slug: 'ogden-ut',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['stewart stadium', 'ogden pioneer days rodeo', 'ogden twilight', 'ogden amphitheater', 'harvest moon celebration', 'holiday electric light parade',
           'historic 25th street car and motorcycle show', 'brigham city peach days', 'standard.net', 'visit ogden', 'visitogden', 'the signpost',
           'daily utah chronicle', 'slug magazine', 'slug mag', 'big sky conference', 'utah tech', 'ksl', 'fox13', 'kutv', 'weber state', 'weber state university', 'kwcr', 'union pacific', 'southern pacific', 'hill air force base', 'hill afb',
           'internal revenue service', 'standard-examiner', 'frontrunner', 'ogden marathon', 'ogden arts festival', 'harvest moon festival',
           'winterfest', 'hot rocking 4th', 'peach days', 'pioneer days', 'ogden pioneer days', 'pioneer day', 'sundance', 'general conference',
           'lds', 'latter-day saints', 'mormon', 'brigham young university', 'byu', 'utah state university', 'cafe rio', 'crumbl', 'ogden high',
           'ben lomond high', 'freeport center', 'zion curtain', 'snowbasin', 'powder mountain', 'ogden union station', 'city weekly', 'vfw',
           'american legion', 'the switch shack', 'two-bit annex', 'wall avenue garage', 'eccles avenue rec room', 'the hostler\'s basement',
           'junction loading dock', 'shadow valley shed', 'canyon mouth hall', 'slaterville quonset', 'bench road carport', 'depot row pizza',
           'weber grange no. 9', 'weber grange'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real schools, base, press, church and events are written only in generic form. */
  blocklist: ['standard-examiner*', 'weber state*', 'hill air force*', 'peach days*', 'cafe rio*', 'switch shack*', 'two-bit annex*', 'weber grange*'],

  blurb: ['Sober kids pack basements and halls before curfew, and the bar rooms are a different, older crowd.',
          'A satellite of the big city forty minutes south: modest turnouts, loyal locals, and bands that skip it.'],
  hard: 'Bars can\'t take minors, so the two crowds never share a bill.',
  region: 'the Mountain West',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Boise', state: 'ID', lat: 43.62, lon: -116.2 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Ogden' },
    { id: 'roy-clearfield', kind: 'FEEDER', name: 'Roy and Clearfield', minutes: 15, bearing: 190, note: 'Bedroom suburbs by the base where many of the teenagers actually live; basements everywhere.' },
    { id: 'north-ogden', kind: 'FEEDER', name: 'North Ogden and Harrisville', minutes: 10, bearing: 355, note: 'Farm-turned-subdivision suburbs just north.' },
    { id: 'plain-city', kind: 'FEEDER', name: 'Plain City and West Haven', minutes: 20, bearing: 285, note: 'Flat farm country west toward the lake.' },
    { id: 'layton', kind: 'FEEDER', name: 'Layton and Kaysville', minutes: 25, bearing: 185, note: 'A mall-and-chain bedroom town and a farming-origin suburb; the nicer side of the county line.' },
    { id: 'morgan', kind: 'FEEDER', name: 'Morgan', minutes: 25, bearing: 110, note: 'A ranch and commuter town through the canyon on I-84.' },
    { id: 'ogden-valley', kind: 'FEEDER', name: 'Huntsville and Eden', minutes: 25, bearing: 75, note: 'Ski-money mountain valley up the canyon; far for kids without cars.' },
    { id: 'brigham-city', kind: 'FEEDER', name: 'Brigham City', minutes: 30, bearing: 340, note: 'An orchard town to the north with a small scene of its own.' },
    { id: 'bountiful', kind: 'FEEDER', name: 'Bountiful and Woods Cross', minutes: 35, bearing: 180, note: 'Salt Lake suburbs that send kids north for cheaper rooms.' },
    { id: 'tremonton', kind: 'FEEDER', name: 'Tremonton and Garland', minutes: 40, bearing: 330, note: 'A farm and factory town where a few teenagers drive for everything.' },
    { id: 'evanston', kind: 'FEEDER', name: 'Evanston', state: 'WY', minutes: 75, bearing: 100, note: 'An oil and rail town in Wyoming; kids drive in because nothing happens at home.' },
    { id: 'logan', kind: 'PEER', name: 'Logan', minutes: 60, bearing: 15, note: 'A college town up the canyon in a tight-knit valley; a smaller, closer scene.' },
    { id: 'provo', kind: 'PEER', name: 'Provo', minutes: 75, bearing: 180, slug: 'provo-ut', note: 'A big sober city to the south that locals call the other Utah.' },
    { id: 'pocatello', kind: 'PEER', name: 'Pocatello', state: 'ID', minutes: 110, bearing: 25, note: 'The next real stop north on I-15 for touring bands.' }
  ],

  hoods: [
    { id: 'twenty-fifth', name: 'downtown and Historic 25th Street', route: 'downtown', note: 'Old rail-hotel brick with restaurants, galleries and upstairs rooms; tourist-polished and heating up.' },
    { id: 'west-ogden', name: 'West Ogden and the rail yards', route: 'work-side', note: 'Warehouses, garages and lower-income families by the tracks; cheap now and eyed for redevelopment.' },
    { id: 'east-central', name: 'East Central', route: 'old-side', note: 'Old Victorian and bungalow streets with basements and porches; renters and students, slowly gentrifying.' },
    { id: 'east-bench', name: 'the East Bench by the university', route: 'campus', note: 'Student rentals and mid-century houses on the bench; quiet over breaks.' },
    { id: 'south-ogden', name: 'South Ogden and Riverdale', route: 'work-side', note: 'Chain-store strips and tract houses at the interstate junction; strip-mall practice rooms and basements.' },
    { id: 'shadow-valley', name: 'Shadow Valley and the hillside', route: 'old-side', note: 'Expensive hillside homes; almost nothing but parents with finished basements.' }
  ],

  rooms: [
    { id: 'south-basement', kind: 'HOUSE', hood: 'south-ogden', cap: 60, curfew: 1320, ac: true, outdoor: false, sketch: 20, standing: [65, 60, 50], pressure: 50, start: true,
      note: 'A finished basement in a tract house where the parents hover. The under-16 curfew and the neighbors are what end the night.' },
    { id: 'east-central-basement', kind: 'HOUSE', hood: 'east-central', cap: 50, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45], pressure: 50,
      note: 'A renter\'s basement under an old bungalow, with a porch for the overflow. The landlord and the ten o\'clock sound rule both watch it.' },
    { id: 'sober-room', kind: 'DIY', hood: 'south-ogden', cap: 150, rent: 80, curfew: 1350, ac: true, sketch: 30, standing: [60, 65, 55], following: .2, pressure: 45, needs: ['VOUCH'],
      note: 'A sober all-ages room on the boulevard strip, no drugs and no drinks. It moved up from the big city once already and a lease could move it again.' },
    { id: 'downtown-room', kind: 'DIY', hood: 'twenty-fifth', cap: 120, rent: 90, curfew: 1350, ac: true, sketch: 30, standing: [55, 60, 50], pressure: 55, needs: ['VOUCH'],
      note: 'A long-running rented room that was once the only all-ages one in town. The building keeps coming up for sale and the rent keeps climbing.' },
    { id: 'skate-shop', kind: 'SHOP', hood: 'west-ogden', cap: 100, pa: .4, curfew: 1290, ac: true, sketch: 10, standing: [70, 65, 70], following: .2,
      note: 'An indoor skatepark and shop. The ramps get pushed aside for a bill, and the shop\'s own hours and insurance set the clock.' },
    { id: 'record-shop', kind: 'SHOP', hood: 'twenty-fifth', cap: 40, pa: .4, curfew: 1230, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'An independent record store downtown. In-store sets for a few dozen kids, only as loud as the neighbors allow.' },
    { id: 'civic-hall', kind: 'HALL', hood: 'south-ogden', cap: 200, rent: 220, deposit: 100, pa: .6, curfew: 1320, ac: true, sketch: 10, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'A civic hall in the suburbs. The ward buildings will not take punk, so this is the fallback, with a deposit and an adult required.' },
    { id: 'brick-bar', kind: 'BAR', hood: 'twenty-fifth', cap: 150, soundFee: 60, pa: .7, ages: ['A21'], curfew: 1500, ac: true, following: .3, sketch: 20, standing: [45, 65, 75],
      note: 'An old brick bar with a stage and no cover most nights. The oldest local heads play here, and no minors ever share the bill.' },
    { id: 'basement-bar', kind: 'BAR', hood: 'twenty-fifth', cap: 100, soundFee: 40, pa: .6, ages: ['A21'], curfew: 1500, ac: false, following: .3, sketch: 15, standing: [45, 65, 70],
      note: 'A dive below street level with cheap drinks and local bands. It has closed neighbors on this street before.' },
    { id: 'church-club', kind: 'CLUB', hood: 'twenty-fifth', cap: 250, houseCosts: 150, split: .8, pa: .85, ages: ['A21'], curfew: 1500, ac: true, following: .5, sketch: 10,
      standing: [45, 70, 65], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'],
      note: 'A bar in a former church with a live-music side. Mid-size, and the next step for a local band that tours a little.' },
    { id: 'new-hall', kind: 'CLUB', hood: 'twenty-fifth', cap: 300, houseCosts: 180, split: .8, pa: .9, ages: ['A18'], curfew: 1380, ac: true, following: .4, sketch: 10,
      standing: [45, 70, 60], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'],
      note: 'A newer indoor concert room, mostly 18-plus. It tried a punk-folk bill once, and it is a stretch up from the DIY rooms.' },
    { id: 'bench-pullout', kind: 'OUTDOOR', hood: 'east-bench', cap: 80, rent: 10, pa: .4, curfew: 1320, sketch: 35, standing: [60, 55, 40],
      note: 'A canyon pullout or a park pavilion on the bench. The plan B when every room is booked or the quiet hour is close.' }
  ],

  contacts: ['provo-ut', 'salt-lake-city', 'boise-id'],

  calendar: [
    { id: 'july-rodeo', label: 'the July rodeo week', tag: 'parade', month: 7, weeks: [3, 4], dows: [4, 5], can: [.85, .80, .85], hoods: ['twenty-fifth', 'west-ogden'], elsewhere: [.95, .93, .93] },
    { id: 'marathon', label: 'marathon weekend', tag: 'race', month: 5, week: 3, dows: [5], can: [.92, .88, .88], hoods: ['twenty-fifth'], elsewhere: [1, 1, 1] },
    { id: 'peach-fest', label: 'the neighbor town\'s peach festival', tag: 'fair', month: 9, week: 1, dows: [4, 5], can: [.88, .88, .90] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [3, 5], dows: [5], can: [.88, .95, .95], hoods: ['east-bench'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [2, 5], dows: [5], can: [.88, .95, .95], hoods: ['east-bench'], elsewhere: [1, 1, 1] },
    { id: 'holiday-lights', label: 'the holiday lights downtown', tag: 'festival', month: 12, weeks: [1, 4], dows: [4, 5], can: [.90, .88, .90], hoods: ['twenty-fifth'], elsewhere: [1, .97, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1320, weekend: 1320, inForce: false } },

  points: [
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89, pop: 1300000 },
    { name: 'Pocatello', state: 'ID', lat: 42.87, lon: -112.45, pop: 56000 },
    { name: 'Cheyenne', state: 'WY', lat: 41.14, lon: -104.82, pop: 65000 },
    { name: 'Las Vegas', state: 'NV', lat: 36.17, lon: -115.14, pop: 2300000 }
  ],
  roads: ['I-15', 'I-84', 'US 89', 'SR 39', 'I-80', 'Harrison Boulevard'],

  words: {
    street: ['Washington Boulevard', 'Harrison Boulevard', 'Wall Avenue', 'Twenty-Fifth Street', 'Twelfth Street', 'Grant Avenue', 'Lincoln Avenue'],
    water: ['the Weber River', 'the Ogden River', 'Pineview Reservoir', 'the Great Salt Lake'],
    hood: ['East Central', 'the East Bench', 'Shadow Valley', 'West Ogden', 'Riverdale', 'Harrisville', 'Eden'],
    thing: ['fry sauce', 'dirty soda', 'freight train', 'basement', 'canyon road', 'funeral potatoes', 'pastrami burger', 'skatepark', 'curfew', 'merch table'],
    weather: ['inversion', 'air alert', 'canyon wind', 'monsoon storm']
  },

  events: [
    { id: 'OGDEN_UT_MATINEE_CURFEW', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'A home game is the same Saturday as the matinee, and the bench will be jammed with parked cars.',
      title: 'The matinee meets the game',
      body: 'The hardcore matinee is on the same Saturday as a home football game. The afternoon crowd will arrive late and the under-16 curfew at ten will cut the bill in half.',
      options: [
        { id: 'EARLY', label: 'Start early and trim the changeovers', likely: 'Everyone gets a set, but nobody gets comfortable.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors early, short sets, and the kids were out before the curfew.' },
        { id: 'CUT', label: 'Cut a band and keep it tight', likely: 'The ones who came are happy. The bands are not.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Four bands became three. Everyone made it home in time.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the game.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The game ran long and the crowd came late.' }
      ] },

    { id: 'OGDEN_UT_PARADE_CLOSURES', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'The parade and the fireworks are this week, and the downtown streets will be closed.',
      title: 'The streets are closed for the parade',
      body: 'A fill-date band is loading in during the parade closures and cannot get the van within six blocks of the room.',
      options: [
        { id: 'CART', label: 'Hand-carry the gear from the edge of the closure', likely: 'Slow and sweaty. Doors go late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'You ferried the amps six blocks on a borrowed dolly and started late.' },
        { id: 'BASEMENT', label: 'Move the whole bill to a basement', likely: 'Smaller and louder. No road closures under a house.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A basement took the bill with an hour to spare, and the floor was packed.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The parade crowd is not your crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The fireworks took the town and the regulars made do.' }
      ] },

    { id: 'OGDEN_UT_CANYON_SNOW', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [12, 1, 2, 3] },
      telegraph: 'The canyon road is closing for snow and a van from the east is due this weekend.',
      title: 'The opener is stuck in the canyon',
      body: 'A snow closure has stranded the opening band on the wrong side of the mountains. The bill is short and the kids know a basement.',
      options: [
        { id: 'SHORT', label: 'Run the short bill and play on', likely: 'A thin night, but the ones who came are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Two bands and a long, loose night in a warm room.' },
        { id: 'WAIT', label: 'Hold the doors and wait for them', likely: 'A late start. The crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The van pulled in at ten. You started late and nobody left.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' }
      ] }
  ]
});
