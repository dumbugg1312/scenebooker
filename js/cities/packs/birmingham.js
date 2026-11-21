SB.Cities.register('birmingham', {
  v: 1,
  slug: 'birmingham',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of alabama at birmingham', 'uab', 'university of alabama', 'alabama crimson tide', 'crimson tide', 'auburn university', 'auburn tigers',
           'samford university', 'birmingham-southern college', 'miles college', 'jacksonville state', 'birmingham news', 'al.com', 'bham now', 'birmingham magazine',
           'wbhm', 'wjox', 'wbrc', 'wiat', 'wvtm', 'birmingham barons', 'birmingham legion', 'birmingham stallions', 'birmingham bulls', 'sloss furnaces', 'sloss',
           'furnace fest', 'secret stages', 'magic city classic', 'barber motorsports', 'alabama state fair', 'mercedes-benz', 'regions bank', 'bbva',
           'uab hospital', 'children\'s of alabama', 'southern company', 'protective life', 'alabama power', 'mcwane', 'us steel', 'drummond', 'big spring jam',
           'city stages', 'iron bowl', 'legion field', 'railroad park', 'vulcan statue'],
  blocklist: ['furnace fest*', 'sloss*', 'secret stages*', 'city stages*', 'al.com*', 'birmingham barons*'],

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
      ] }
  ]
});
