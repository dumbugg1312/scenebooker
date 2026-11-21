SB.Cities.register('nashville', {
  v: 1,
  slug: 'nashville',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['vanderbilt university', 'vanderbilt', 'belmont university', 'tennessee state university', 'middle tennessee state university', 'mtsu', 'lipscomb',
           'fisk university', 'nashville scene', 'the tennessean', 'tennessean', 'nashville banner', 'wsmv', 'wkrn', 'wtvf', 'wpln', 'wrvu', 'nashville predators',
           'tennessee titans', 'nashville sc', 'nashville sounds', 'grand ole opry', 'opry', 'cma fest', 'country music hall of fame', 'ryman', 'bonnaroo', 'tootsie\'s',
           'fort campbell', 'hca healthcare', 'vanderbilt university medical center', 'nissan', 'nameless fest', 'music row', 'ascend amphitheater', 'bridgestone arena',
           'nissan stadium', 'lower broadway', 'johnny cash museum'],
  blocklist: ['grand ole opry*', 'tootsie*', 'ryman*', 'cma fest*', 'bonnaroo*', 'the tennessean*', 'nashville scene*'],

  blurb: ['Country music sells the postcard. The kids book basements by DM and fill a nonprofit hall on the east side.',
          'Hardcore is on the rise, the dive bars are 21 and up, and half the band works a shift on the tourist strip.'],
  hard: 'Tourist rents, fire marshals and a thin all-ages map.',
  region: 'the Mid-South',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76 },
    { name: 'Memphis', state: 'TN', lat: 35.15, lon: -90.05 },
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.8 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .06, reason: 'The hardcore groundswell here is hard to miss.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Nashville' },
    { id: 'franklin', kind: 'FEEDER', name: 'Franklin', minutes: 25, bearing: 190, note: 'A wealthy suburb. Kids drive in and there are few rooms.' },
    { id: 'hendersonville', kind: 'FEEDER', name: 'Hendersonville', minutes: 25, bearing: 40, note: 'A church-heavy lake suburb with teen bands.' },
    { id: 'smyrna', kind: 'FEEDER', name: 'Smyrna', minutes: 25, bearing: 130, note: 'A suburb on the way to Murfreesboro.' },
    { id: 'gallatin', kind: 'FEEDER', name: 'Gallatin', minutes: 35, bearing: 55, note: 'An exurb. Kids come in for all-ages shows.' },
    { id: 'lebanon', kind: 'FEEDER', name: 'Lebanon', minutes: 35, bearing: 85, note: 'Farm and warehouse town with a small metal crowd.', lean: ['metal'] },
    { id: 'springfield', kind: 'FEEDER', name: 'Springfield', minutes: 35, bearing: 345, note: 'A small town north. Rides in with older siblings.' },
    { id: 'murfreesboro', kind: 'FEEDER', name: 'Murfreesboro', minutes: 40, bearing: 130, note: 'A big student town with its own house scene. Kids come in on weekends.' },
    { id: 'columbia', kind: 'FEEDER', name: 'Columbia', minutes: 50, bearing: 195, note: 'A small southern town. Shows are rare.' },
    { id: 'clarksville', kind: 'FEEDER', name: 'Clarksville', minutes: 55, bearing: 310, slug: 'clarksville-tn', note: 'An army town with its own scene.' },
    { id: 'huntsville', kind: 'PEER', name: 'Huntsville', state: 'AL', minutes: 110, bearing: 185, slug: 'huntsville-al', note: 'Engineers and a small loud scene.' },
    { id: 'chattanooga', kind: 'PEER', name: 'Chattanooga', minutes: 135, bearing: 135, slug: 'chattanooga-tn', note: 'A mid-sized, steady touring stop.' },
    { id: 'knoxville', kind: 'PEER', name: 'Knoxville', minutes: 180, bearing: 95, slug: 'knoxville-tn', note: 'Students, church and mountains.' }
  ],

  hoods: [
    { id: 'east-nashville', name: 'East Nashville', route: 'old-side', note: 'Old bungalows, gentrified. House venues, bars and a few all-ages rooms.' },
    { id: 'downtown', name: 'downtown and the Gulch', route: 'downtown', note: 'Tourist bars and honky-tonks. The punk crowd avoids it except one or two old clubs on the edge.' },
    { id: 'midtown', name: 'Midtown and Elliston Place', route: 'downtown', note: 'An old rock club strip near the hospitals. Dive bars and a long-running small club.' },
    { id: 'wedgewood', name: 'Wedgewood-Houston', route: 'work-side', note: 'Warehouses and studios turning into galleries. Loading-dock shows.' },
    { id: 'dickerson', name: 'Dickerson Pike', route: 'work-side', note: 'Motels, auto shops and cheap rent. Warehouse rooms.' },
    { id: 'antioch', name: 'Antioch and Nolensville Pike', route: 'work-side', note: 'A big immigrant community, cheap apartments and warehouses.' },
    { id: 'madison', name: 'Madison', route: 'campus', note: 'A northeast suburb with odd spaces, like a hobby shop.' },
    { id: 'hillsboro', name: 'Hillsboro Village', route: 'campus', note: 'Near the private colleges. Coffee shops and students.' },
    { id: 'bellevue', name: 'Bellevue', route: 'campus', note: 'A western bedroom town where kids start bands.' }
  ],

  points: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 6400000 },
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76, pop: 1390000 },
    { name: 'Memphis', state: 'TN', lat: 35.15, lon: -90.05, pop: 1341412 },
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.8, pop: 1197766 }
  ],
  roads: ['I-40', 'I-65', 'I-24', 'I-440', 'Briley Parkway', 'Gallatin Pike'],

  words: {
    street: ['Broadway', 'Gallatin Pike', 'Dickerson Pike', 'Nolensville Pike', 'Charlotte Pike', 'Murfreesboro Pike', 'Elliston Place', 'Jefferson Street'],
    water: ['the Cumberland'],
    hood: ['East Nashville', 'the Gulch', 'Wedgewood-Houston', 'Madison', 'Antioch', 'Hillsboro Village', 'Bellevue', 'Joelton'],
    thing: ['bachelorette bus', 'honky-tonk', 'DM', 'loading dock', 'side door', 'bowling alley', 'box fan', 'short-term rental'],
    weather: ['tornado watch', 'heat wave', 'ice on the hills']
  },

  events: [
    { id: 'NASHVILLE_FIRE_MARSHAL', when: 'WEEK', tier: 'HARD', weight: 1, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 2] },
      telegraph: 'Word is a fire inspector has been walking past warehouse rooms this month.',
      title: 'The fire marshal walks in',
      body: 'Halfway through the second band, a man with a clipboard is counting heads and looking at the one exit. The address came by DM that afternoon and the room is a basement.',
      options: [
        { id: 'CLEAR', label: 'Clear half the room and keep playing', likely: 'Half the night is gone. You stay out of trouble.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }, { op: 'REGULARS', pct: .02 }],
          result: 'Half the room went upstairs. He wrote something down and left.' },
        { id: 'SHUT', label: 'Shut it down and refund the door', likely: 'You lose the money and the night. Everyone knows you did right.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .4 }, { op: 'MONEY', amount: -30 }],
          result: 'The lights came up. People stood on the lawn and traded stories until midnight.' },
        { id: 'TALK', label: 'Talk to him and promise it will not happen again', likely: 'He may buy it. He may not.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'He gave you a card and a warning. The set went on with the door propped open.' }
      ] },

    { id: 'NASHVILLE_TORNADO_WATCH', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [3, 4, 5] },
      telegraph: 'Spring storms are lining up west of the city.',
      title: 'A tornado watch',
      body: 'The sirens are quiet but the phones are buzzing. The headliner is stuck under an overpass west of town and the opener is texting from a gas station.',
      options: [
        { id: 'DELAY', label: 'Push doors back an hour and wait it out', likely: 'The storm passes. The crowd drifts.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The storm blew through. The headliner got there as the first band loaded in.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The weather was fine and the room was half full.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'A lot of people stay home under a watch.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The ones who came stayed in the basement and played anyway.' }
      ] }
  ]
});
