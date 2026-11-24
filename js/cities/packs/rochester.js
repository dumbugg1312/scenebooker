SB.Cities.register('rochester', {
  v: 1,
  slug: 'rochester',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of rochester', 'rochester institute of technology', 'rit', 'nazareth college', 'st. john fisher university', 'roberts wesleyan', 'suny brockport', 'monroe community college', 'eastman school of music', 'eastman kodak', 'kodak', 'xerox', 'bausch and lomb', 'wegmans', 'democrat and chronicle', 'city newspaper', 'rochester city paper', 'roc city mag', 'wxxi', 'wham', 'rochester red wings', 'rochester americans', 'amerks', 'rochester rhinos', 'buffalo bills', 'lilac festival', 'rochester international jazz festival', 'fringe festival', 'clothesline festival', 'new york state thruway', 'rochester airport', 'george eastman museum', 'strong museum of play', 'seabreeze', 'rochester knighthawks', 'rochester rattlers', 'genesee brewery', 'garbage plate', 'nick tahou',
           'rochester jazz festival', 'rochester fringe', 'park ave festival', 'park avenue summer art fest', 'park avenue summer stroll', 'greek festival', 'annunciation greek festival',
           'rochester pride', 'memorial art gallery', 'whec', '13wham', 'rochester first', 'rochester city magazine', 'rit reporter', 'kidsoutandabout', 'bandsintown',
           'setlist.fm', 'dodiy', 'etix', 'upstate concerts', 'monroe county parks', 'cityofrochester.gov', 'ecode360', 'nyclu', 'youth today', 'wxxi news'],
  blocklist: ['wegmans*', 'kodak*', 'xerox*', 'genesee brew*', 'lilac fest*', 'democrat and chronicle*'],

  blurb: ['Rochester\'s DIY scene lives in church halls, studios and basements, with a strong hardcore and death-metal underground and tape labels.',
          'The big rooms book covers, so bands hit a ceiling, and the same old bands have played the same Saturday for ten years.'],
  hard: 'The big rooms book cover bands, and the same bands keep playing.',
  region: 'the Great Lakes',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Buffalo', state: 'NY', lat: 42.89, lon: -78.88 },
    { name: 'Toronto', state: 'ON', lat: 43.65, lon: -79.38 },
    { name: 'Syracuse', state: 'NY', lat: 43.05, lon: -76.15 },
    { name: 'New York City', state: 'NY', lat: 40.71, lon: -74.01 }
  ],
  tilt: [
    { fan: 'hardcore', band: 'metal', d: .08, reason: 'Hardcore and death-metal acts and a tape label carry the underground.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Rochester' },
    { id: 'fairport', kind: 'FEEDER', name: 'Fairport and Pittsford', minutes: 20, bearing: 105, note: 'Rich suburbs; teenagers with cars.' },
    { id: 'webster', kind: 'FEEDER', name: 'Webster and Penfield', minutes: 20, bearing: 70, note: 'East-side suburbs; pop-punk and emo kids.' },
    { id: 'spencerport', kind: 'FEEDER', name: 'Spencerport and Hilton', minutes: 20, bearing: 285, beyond: 'river-bridges', note: 'West suburbs.' },
    { id: 'brockport', kind: 'FEEDER', name: 'Brockport', minutes: 30, bearing: 275, note: 'A college town west; students and bands.' },
    { id: 'geneseo', kind: 'FEEDER', name: 'Geneseo', minutes: 35, bearing: 195, note: 'A small college town south; kids and a few bands.' },
    { id: 'canandaigua', kind: 'FEEDER', name: 'Canandaigua', minutes: 35, bearing: 130, note: 'A lake town; kids drive in.' },
    { id: 'batavia', kind: 'FEEDER', name: 'Batavia', minutes: 35, bearing: 265, note: 'A farm town with a few bands.' },
    { id: 'newark', kind: 'FEEDER', name: 'Newark and Lyons', minutes: 35, bearing: 85, note: 'Small canal towns.' },
    { id: 'buffalo', kind: 'PEER', name: 'Buffalo', minutes: 80, bearing: 265, slug: 'buffalo', note: 'A bigger scene with more all-ages rooms; bands go there.' },
    { id: 'syracuse', kind: 'PEER', name: 'Syracuse', minutes: 85, bearing: 95, slug: 'syracuse-ny', note: 'A similar-size scene.' },
    { id: 'ithaca', kind: 'PEER', name: 'Ithaca', minutes: 90, bearing: 160, slug: 'ithaca-ny', note: 'Smaller; a college town.' }
  ],

  chokepoints: [{ id: 'river-bridges', name: 'the downtown river bridges', p: 0.02 }],

  hoods: [
    { id: 'park-ave', name: 'Park Avenue and the arts district', route: 'old-side', note: 'Cafes, old houses and storefronts; the arts and music district.' },
    { id: 'south-wedge', name: 'the South Wedge', route: 'old-side', note: 'Rowhouses and corner bars; a young scruffy neighborhood that holds basement shows.' },
    { id: 'market', name: 'the Public Market area', route: 'work-side', note: 'Old factories and a market; cheap warehouse and studio space.' },
    { id: 'corn-hill', name: 'Corn Hill and Plymouth-Exchange', route: 'old-side', note: 'Historic houses near the river; some shows.' },
    { id: 'dewey', name: 'Lyell Avenue and Dewey Avenue', route: 'work-side', note: 'A long strip of old commercial buildings and factories; cheap rooms.' },
    { id: 'downtown', name: 'downtown and the East End', route: 'downtown', note: 'Bars and clubs; the 21+ nightlife strip.' },
    { id: 'highland', name: 'Beechwood and Highland Park', route: 'old-side', note: 'Quiet streets of old houses; the odd house show.' },
    { id: 'henrietta', name: 'Henrietta and Brighton', route: 'campus', note: 'Student rentals and suburb; kids who drive in.' },
    { id: 'charlotte', name: 'Charlotte by the lake', route: 'work-side', note: 'A beach strip with summer shows, empty in winter.' }
  ],

  rooms: [
    { id: 'park-ave-house', kind: 'HOUSE', hood: 'park-ave', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 55, start: true, note: 'The downstairs of a big old three-story house, run by a longtime booker. The neighbors and the quiet hour set the clock.' },
    { id: 'church-program-hall', kind: 'HALL', hood: 'corn-hill', cap: 80, rent: 60, deposit: 0, pa: .5, curfew: 1320, ac: true, sketch: 5, standing: [65, 60, 65],
      owner: 'CHURCH_CONTACT', pressure: 45, note: 'A church program room, all ages and no beer. It works until the pastor changes or the church wants its room back.' },
    { id: 'wedge-rowhouse', kind: 'HOUSE', hood: 'south-wedge', cap: 40, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 40],
      pressure: 60, note: 'A rowhouse basement with a low ceiling. One noise complaint ends it.' },
    { id: 'suburb-rental', kind: 'HOUSE', hood: 'henrietta', cap: 40, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, sketch: 20, standing: [70, 55, 40],
      pressure: 50, note: 'A student-rental living room. Empty in summer and at the holidays.' },
    { id: 'market-warehouse', kind: 'DIY', hood: 'market', cap: 100, rent: 80, pa: .6, curfew: 1380, ac: false, sketch: 50, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'A warehouse unit shared with a practice space. The fire marshal and the rent are the threats.' },
    { id: 'studio-floor', kind: 'DIY', hood: 'downtown', cap: 60, rent: 50, pa: .5, curfew: 1350, ac: true, sketch: 20, standing: [60, 60, 55],
      note: 'A recording studio that lets bands play in its tracking room. A few shows a month, not a real venue.' },
    { id: 'dewey-storefront', kind: 'DIY', hood: 'dewey', cap: 80, rent: 60, pa: .5, curfew: 1380, ac: false, sketch: 45, standing: [55, 60, 45],
      pressure: 55, note: 'A storefront with a stage built from pallets. The landlord is always one offer from selling.' },
    { id: 'wedge-bar', kind: 'BAR', hood: 'south-wedge', cap: 100, soundFee: 50, pa: .6, ages: ['A21'], curfew: 1500, ac: true, following: .3, sketch: 15,
      standing: [45, 65, 70], note: 'A corner bar with a back-room stage. It pays little and books cover nights.' },
    { id: 'touring-club', kind: 'CLUB', hood: 'downtown', cap: 300, houseCosts: 150, split: .8, pa: .9, ages: ['A18'], curfew: 1440, ac: true, following: .6, sketch: 10,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', needs: ['FULL_BILL'], note: 'The touring metal and hardcore room. It sets the ceiling for locals, who book covers and tributes.' },
    { id: 'concert-hall', kind: 'CLUB', hood: 'downtown', cap: 350, houseCosts: 200, split: .8, pa: .9, ages: ['A18'], curfew: 1440, ac: true, following: .5, sketch: 10,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', needs: ['FULL_BILL'], note: 'A concert hall that shut for a while and reopened. Mixed bookings, and punk is not first in line.' },
    { id: 'big-club', kind: 'BIG', hood: 'downtown', cap: 1500, rent: 2200, deposit: 500, pa: .95, ages: ['A18'], curfew: 1410, ac: true, sketch: 5, standing: [40, 70, 70],
      pressure: 60, note: 'The big-room fantasy. The license has been pulled before.' },
    { id: 'beach-lot', kind: 'OUTDOOR', hood: 'charlotte', cap: 150, rent: 20, pa: .4, curfew: 1260, sketch: 30, standing: [60, 55, 45],
      note: 'A pavilion on the beach strip. Summer only, and dead from November to March.' }
  ],

  contacts: ['buffalo', 'syracuse-ny', 'ithaca-ny', 'utica-ny'],

  rules: { quiet: 1320 },

  calendar: [
    { id: 'spring-park-fest', label: 'the spring park festival', tag: 'festival', month: 5, weeks: [2, 3], dows: [4, 5, 6], can: [.85, .80, .85] },
    { id: 'church-food-fest', label: 'the church food festival', tag: 'festival', month: 5, weeks: [4, 5], dows: [3, 4, 5, 6], can: [.92, .90, .92], hoods: ['downtown', 'highland'], elsewhere: [1, .97, .97] },
    { id: 'jazz-week', label: 'the nine-day jazz week', tag: 'festival', month: 6, weeks: [3, 4], dows: [3, 4, 5, 6], can: [.85, .82, .85], hoods: ['downtown'], elsewhere: [1, .95, .95] },
    { id: 'pride-weekend', label: 'the summer pride weekend', tag: 'parade', month: 7, week: 3, dows: [5], can: [.90, .88, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'arts-street-fair', label: 'the arts street fair', tag: 'fair', month: 8, week: 1, dows: [5, 6], can: [.80, .75, .75], hoods: ['park-ave'], elsewhere: [1, .97, .97] },
    { id: 'twelve-night-fest', label: 'the twelve-night arts festival', tag: 'festival', month: 9, weeks: [3, 4], dows: [3, 4, 5, 6], can: [.88, .85, .88], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [6], can: [.95, .97, .97] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [6], can: [.95, .97, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],
  points: [
    { name: 'Toronto', state: 'ON', lat: 43.65, lon: -79.38, pop: 6200000 },
    { name: 'New York City', state: 'NY', lat: 40.71, lon: -74.01, pop: 19000000 },
    { name: 'Buffalo', state: 'NY', lat: 42.89, lon: -78.88, pop: 1155000 },
    { name: 'Syracuse', state: 'NY', lat: 43.05, lon: -76.15, pop: 650000 }
  ],
  roads: ['I-90', 'I-490', 'I-590', 'I-390', 'the Inner Loop', 'Route 104'],

  words: {
    street: ['Park Avenue', 'East Avenue', 'Monroe Avenue', 'Lake Avenue', 'Clinton Avenue', 'Dewey Avenue'],
    water: ['the Genesee', 'Lake Ontario'],
    hood: ['the South Wedge', 'Charlotte', 'Corn Hill', 'Irondequoit', 'Marketview Heights'],
    thing: ['church hall', 'tape', 'lake snow', 'Inner Loop', 'folding table', 'potluck'],
    weather: ['lake snow', 'lake-effect storm']
  },

  events: [
    { id: 'ROCHESTER_BRIDGE_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Crews are working on a bridge over the river downtown this week.',
      title: 'The bridge is shut',
      body: 'A bridge over the river is closed the night of your show, and it splits downtown from the west side. The bands and the kids on the other bank have to go the long way around.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it, but the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'You moved doors up an hour, and the people who really wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'It never cleared, so the people on the far side stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'It takes two hours of your day, but most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads came together the long way around.' }
      ] },

    { id: 'ROCHESTER_LAKE_EFFECT', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [11, 12, 1, 2, 3] },
      telegraph: 'A lake-effect band is parked over the Thruway an hour west, and nothing is moving.',
      title: 'The Thruway is shut',
      body: 'The touring band is stuck behind a snow squall an hour west, and the local opener is ready, the room is filling, and the headliner is nowhere.',
      options: [
        { id: 'LONG', label: 'Let the local openers play long', likely: 'A loose night, and the people who came are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The locals stretched it to two hours and nobody complained.' },
        { id: 'WAIT', label: 'Hold the doors and wait for the van', likely: 'A late start, and the crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The van pulled in at ten, and you started late but nobody left.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could make it came.' }
      ] },

    { id: 'ROCHESTER_QUIET_HOUR', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [4, 5, 6, 7, 8, 9, 10] },
      telegraph: 'Somebody on the next stoop has been taking photos of the porch.',
      title: 'The ten o\'clock call',
      body: 'Someone in the rowhouse next door has the noise code open on their phone. At ten sharp the call goes in, and your show is the one it is about.',
      options: [
        { id: 'ACOUSTIC', label: 'Go acoustic in the stairwell', likely: 'Quiet, close and strange, and most of them stay.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The last two bands played a stairwell set by candle, and people remembered it.' },
        { id: 'END', label: 'End it at ten and send them home', likely: 'No trouble, but it\'s a short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'You pulled the plug at ten, and the neighbors waved from their window.' }
      ] },

    { id: 'ROCHESTER_ART_STREET', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The street the first room sits on is closed for the weekend for an arts fair.',
      title: 'The street is closed',
      body: 'The arts-district street is shut for the fair, so the church hall cannot load in and the bands are parking six blocks away.',
      options: [
        { id: 'CARRY', label: 'Carry the gear in by hand', likely: 'Two hours of your day. Most of them make it.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Everyone carried amps through the crowd, and it was a strange, good start.' },
        { id: 'ACCEPT', label: 'Run it small and take what you get', likely: 'The fair has the crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The fair took the crowd and the street, but the regulars made it in.' }
      ] }
  ]
});
