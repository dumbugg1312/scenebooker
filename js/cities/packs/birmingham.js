SB.Cities.register('birmingham', {
  v: 1,
  slug: 'birmingham',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of alabama at birmingham', 'uab', 'university of alabama', 'alabama crimson tide', 'crimson tide', 'auburn university', 'auburn tigers',
           'samford university', 'birmingham-southern college', 'miles college', 'jacksonville state', 'birmingham news', 'al.com', 'bham now', 'birmingham magazine',
           'wbhm', 'wjox', 'wbrc', 'wiat', 'wvtm', 'birmingham barons', 'birmingham legion', 'birmingham stallions', 'birmingham bulls', 'sloss furnaces', 'sloss',
           'furnace fest', 'secret stages', 'magic city classic', 'barber motorsports', 'alabama state fair', 'mercedes-benz', 'regions bank', 'bbva',
           'uab hospital', 'children\'s of alabama', 'southern company', 'protective life', 'alabama power', 'mcwane', 'us steel', 'drummond', 'big spring jam',
           'city stages', 'iron bowl', 'legion field', 'railroad park', 'vulcan statue',
           'alabama a&m', 'alabama state university', 'birmingham race course', 'protective stadium', 'central alabama pride', 'pridefest',
           'pride in the magic city', 'sidewalk film festival', 'moss rock festival', 'regions tradition', 'birmingham folk festival',
           'marvel city caribbean festival', 'hoover metropolitan complex', 'oak mountain amphitheatre', 'alabama public radio', 'bhamnow',
           'styleblueprint', 'alabama reporter', 'yale globalist', 'trussville tribune', 'bhamwiki', 'inbirmingham', 'alabama abc board'],
  blocklist: ['furnace fest*', 'sloss*', 'secret stages*', 'city stages*', 'al.com*', 'birmingham barons*', 'sidewalk film festival*', 'moss rock festival*'],

  blurb: ['An old iron town spread over ridges and valleys, where everything is a drive and every block has a church.',
          'The big all-ages halls closed years ago. A loyal hardcore crowd and a young queer punk wave keep making new rooms out of arts spaces, a library meeting room and whatever lot is free.'],
  hard: 'Hills, suburbs, and the church next door.',
  region: 'the Deep South',
  whereGo: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'Memphis', state: 'TN', lat: 35.15, lon: -90.05 },
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .05, reason: 'Hardcore built this town and a young queer crowd is carrying it again.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Birmingham' },
    { id: 'bessemer', kind: 'FEEDER', name: 'Bessemer', minutes: 20, bearing: 235, note: 'A mill town southwest. Some bands, and kids drive in for shows.' },
    { id: 'hoover', kind: 'FEEDER', name: 'Hoover', minutes: 20, bearing: 170, note: 'Big suburb over the mountain. Lots of high school bands.' },
    { id: 'trussville', kind: 'FEEDER', name: 'Trussville', minutes: 20, bearing: 45, note: 'Church-heavy suburb to the northeast. Kids come in.' },
    { id: 'pelham', kind: 'FEEDER', name: 'Pelham', minutes: 30, bearing: 165, note: 'A commuter town with a few bands.' },
    { id: 'alabaster', kind: 'FEEDER', name: 'Alabaster', minutes: 30, bearing: 175, note: 'Suburban, along I-65.' },
    { id: 'oneonta', kind: 'FEEDER', name: 'Oneonta', minutes: 45, bearing: 25, note: 'Rural. Kids drive in.' },
    { id: 'jasper', kind: 'FEEDER', name: 'Jasper', minutes: 50, bearing: 300, note: 'Coal country. Rural kids and a metal lean.', lean: ['metal'] },
    { id: 'gadsden', kind: 'FEEDER', name: 'Gadsden', minutes: 60, bearing: 45, note: 'An old mill town with a small scene.' },
    { id: 'tuscaloosa', kind: 'PEER', name: 'Tuscaloosa', minutes: 60, bearing: 235, slug: 'tuscaloosa-al', note: 'A big university town with house shows. Kids drive both ways.' },
    { id: 'huntsville', kind: 'PEER', name: 'Huntsville', minutes: 100, bearing: 5, slug: 'huntsville-al', note: 'A research city with an active metal and punk crowd.' },
    { id: 'atlanta', kind: 'PEER', name: 'Atlanta', state: 'GA', minutes: 150, bearing: 90, slug: 'atlanta', note: 'Bigger. Tours stop there first.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Loft district', route: 'downtown', note: 'Bars, a few clubs and old brick warehouses. Where touring bands land.' },
    { id: 'five-points', name: 'Five Points South', route: 'downtown', note: 'A loud nightlife strip on the hill that does not mind amplifiers.' },
    { id: 'southside', name: 'Southside', route: 'campus', note: 'Dense blocks by the hospital and the university. Students, grad workers, some basements.' },
    { id: 'avondale', name: 'Avondale', route: 'old-side', note: 'Old houses and a bar strip. Artists and bar crowds. House shows and small rooms fit.' },
    { id: 'woodlawn', name: 'Woodlawn', route: 'old-side', note: 'Cheap old houses and small storefronts on the east side, with an arts revival.' },
    { id: 'ensley', name: 'Ensley', route: 'work-side', note: 'A former steel town on the west side. Empty storefronts, big old halls, cheap warehouse space.' },
    { id: 'fairfield', name: 'Fairfield and the Bessemer side', route: 'work-side', note: 'Mill rows and industrial yards. Rent is low. Police attention varies.' },
    { id: 'over-the-mountain', name: 'Homewood and Mountain Brook', route: 'campus', note: 'Over-the-mountain suburbs. Many kids come from here and almost no rooms are here.' },
    { id: 'hoover-vestavia', name: 'Hoover and Vestavia', route: 'campus', note: 'Suburban sprawl south of the mountain. Garage practice, shows somewhere else.' }
  ],

  rooms: [
    { id: 'woodlawn-house', kind: 'HOUSE', hood: 'woodlawn', cap: 40, curfew: 1320, ac: false, pressure: 55, start: true,
      note: 'A living room and a backyard on an east side block. The neighbors and the church lot next door are the threat.' },
    { id: 'firehouse', kind: 'DIY', hood: 'avondale', cap: 120, curfew: 1380, ac: false, pressure: 50, needs: ['VOUCH'],
      note: 'An old firehouse with a big open floor and the organizer\'s apartment upstairs. It lives as long as the rent gets paid and the block stays friendly.' },
    { id: 'lodge-arts', kind: 'DIY', hood: 'woodlawn', cap: 100, curfew: 1350, ac: true, pa: .35, pressure: 45,
      note: 'A fraternal lodge turned nonprofit arts center. The PA is small, so a loud band drowns it, and the lease decides the year.' },
    { id: 'west-hall', kind: 'HALL', hood: 'ensley', cap: 150, curfew: 1320, ac: true, owner: 'HALL_MANAGER', deposit: 100, pressure: 45,
      note: 'A rented lodge or union hall on the west side. Insurance, a clean-up deposit and a clock.' },
    { id: 'warehouse-dock', kind: 'DIY', hood: 'ensley', cap: 100, curfew: 1380, ac: false, pressure: 60, needs: ['VOUCH'],
      note: 'A warehouse with a loading-dock stage. No permits, so it lasts until the landlord asks.' },
    { id: 'library-room', kind: 'SHOP', hood: 'southside', cap: 60, curfew: 1290, ac: true, pa: .35,
      note: 'A public library meeting room for a free all-ages matinee. The librarian can say no, and the room must be clear by a quarter to five.' },
    { id: 'brewery-yard', kind: 'OUTDOOR', hood: 'avondale', cap: 200, curfew: 1260, ages: ['ALL'], rent: 25,
      note: 'A brewery yard for a punk flea market and night market. The weather and the permit decide it.' },
    { id: 'taproom', kind: 'BAR', hood: 'avondale', cap: 120, ages: ['A21'], curfew: 1470, ac: true,
      note: 'A taproom with a punk night of five local bands. Free or cheap, and the kids cannot get in.' },
    { id: 'hill-bar', kind: 'BAR', hood: 'five-points', cap: 150, ages: ['A18'], curfew: 1500, ac: true,
      note: 'A stage bar on the hill. The state keeps kids out of lounge rooms, so the door is 19 and up on a good night, and an old music bar here just closed.' },
    { id: 'touring-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['A18'], curfew: 1410, ac: true, owner: 'TALENT_BUYER', needs: ['FULL_BILL'],
      note: 'A mid-size touring room that books punk and hardcore. The rent is steep, so a local booker gets a slow week.' },
    { id: 'theater', kind: 'BIG', hood: 'southside', cap: 1200, ages: ['ALL'], curfew: 1380, ac: true, owner: 'TALENT_BUYER',
      note: 'The touring theaters on the avenue. Metal and punk package tours, and a local band is an opener at best.' }
  ],

  contacts: ['tuscaloosa-al', 'huntsville-al', 'atlanta', 'nashville'],

  calendar: [
    { id: 'classic', label: 'the big college football classic', tag: 'game', month: 10, weeks: [4, 5], dows: [4, 5], can: [.85, .88, .88], hoods: ['ensley', 'fairfield'], elsewhere: [.95, .93, .93] },
    { id: 'metal-fest', label: 'the big hardcore and metal festival', tag: 'festival', month: 10, week: 1, dows: [4, 5, 6], can: [.70, .65, .65] },
    { id: 'state-fair', label: 'the state fair', tag: 'fair', month: 9, weeks: [3, 4], dows: [4, 5, 6], can: [.92, .95, .95] },
    { id: 'pride-week', label: 'the pride weekend', tag: 'festival', month: 6, week: 2, dows: [4, 5], can: [.88, .88, .90], hoods: ['downtown'], elsewhere: [.92, .92, .92] },
    { id: 'rivalry', label: 'the in-state rivalry game', tag: 'game', month: 11, week: 4, dows: [5], can: [.80, .85, .85] },
    { id: 'football-sep', label: 'high school football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.88, 1, .97] },
    { id: 'football-oct', label: 'high school football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.88, 1, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1260, weekend: 1380, inForce: true } },

  points: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 6400000 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78, pop: 2197416 },
    { name: 'Montgomery', state: 'AL', lat: 32.38, lon: -86.3, pop: 385000 },
    { name: 'Memphis', state: 'TN', lat: 35.15, lon: -90.05, pop: 1341412 }
  ],
  roads: ['I-65', 'I-20', 'I-59', 'I-22', 'I-459', 'Highway 280'],

  words: {
    street: ['2nd Avenue North', '1st Avenue North', '20th Street', 'Highland Avenue', 'Clairmont', '41st Street'],
    water: ['Village Creek', 'the Cahaba', 'Valley Creek'],
    hood: ['Avondale', 'Woodlawn', 'Ensley', 'Southside', 'Five Points South', 'Homewood', 'Vestavia', 'Bessemer'],
    thing: ['ridge', 'mill lot', 'library room', 'siren', 'church lot', 'sweet tea', 'loading dock'],
    weather: ['tornado watch', 'humidity']
  },

  events: [
    { id: 'BIRMINGHAM_SIREN_SPRING', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [3, 4, 5] },
      telegraph: 'The forecast has a line of storms coming through on show night.',
      title: 'The sirens are going',
      body: 'A tornado watch is up for the county on show night. Half the list is texting to ask if it is still on, and the room is a metal shed on a hill.',
      options: [
        { id: 'EARLIER', label: 'Open early and finish before the line gets here', likely: 'Most of them make it. A short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Doors early, two short sets and out before the sky turned green.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The sirens went off right on time and nobody was there.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'A lot of people stay home under a watch.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'The ones who came stayed inside and played anyway. It was a small, loud room.' }
      ] },

    { id: 'BIRMINGHAM_FEST_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival', months: [10] },
      telegraph: 'Every kid with a ticket is headed to the old furnace site this weekend.',
      title: 'The festival has everybody',
      body: 'The big festival is on and every local kid and half the local bands are at it. Your Saturday show on the west side has six people, and four of them are the bands.',
      options: [
        { id: 'LATE', label: 'Push doors back until the kids come off the grounds', likely: 'The ones who want one more set show up late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors at ten. A packed floor of sunburnt kids who were not done for the day.' },
        { id: 'SHORT', label: 'Run it short, and play for who came', likely: 'A thin night, but the ones who came are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Two bands and a long loose set. The room was small and warm.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The festival was over and the kids were tired.' }
      ] },

    { id: 'BIRMINGHAM_CLASSIC_PARADE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game', months: [10] },
      telegraph: 'The parade starts at eight in the morning on the west side, and the street crews are already out.',
      title: 'The parade has the street',
      body: 'The classic weekend closes the road to the loading dock you booked for Friday night. The band cannot get the van within two blocks.',
      options: [
        { id: 'CARRY', label: 'Carry the gear in by hand', likely: 'Two hours of your day. The show goes on.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Four people, a hand truck and a long walk. The drum kit survived.' },
        { id: 'EARLY', label: 'Load in at dawn and open early', likely: 'Most get in before the barricades. A short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Loaded in before the barricades went up. A short, tight night.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The street was open and the band was glad.' }
      ] }
  ]
});
