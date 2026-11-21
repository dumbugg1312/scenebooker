SB.Cities.register('grand-rapids', {
  v: 1,
  slug: 'grand-rapids',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['grand valley state university', 'gvsu', 'calvin university', 'calvin college', 'aquinas college', 'davenport university', 'grand rapids community college', 'grcc',
           'western michigan university', 'michigan state', 'mlive', 'grand rapids press', 'rapidian', 'wzzm', 'woodtv', 'wood tv', 'whtc', 'grand rapids griffins',
           'west michigan whitecaps', 'grand rapids drive', 'artprize', 'beer city', 'amway', 'steelcase', 'herman miller', 'meijer', 'spectrum health', 'corewell health',
           'gerald ford', 'ford museum', 'van andel arena', 'devos place', 'frederik meijer gardens', 'founders brewing', 'bell\'s', 'bells brewery', 'griffins', 'west michigan whitecaps'],
  blocklist: ['mlive*', 'artprize*', 'founders brewing*', 'meijer*', 'grand rapids press*', 'steelcase*', 'amway*'],

  blurb: ['A church-quiet West Michigan city on the river, with a loud hardcore youth scene underneath. Whether an all-ages hall is open decides whether the scene runs hot or cold.',
          'When the hall closes everything falls back to shared houses on the near west and southeast sides, and the neighbors are polite and call the city.'],
  hard: 'Few all-ages rooms, lake-effect snow, and church-minded neighbors.',
  region: 'the Great Lakes',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05 },
    { name: 'Ann Arbor', state: 'MI', lat: 42.28, lon: -83.74 },
    { name: 'Milwaukee', state: 'WI', lat: 43.04, lon: -87.91 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'Hardcore needs an all-ages hall, and when one is open the kids fill it.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Grand Rapids' },
    { id: 'wyoming', kind: 'FEEDER', name: 'Wyoming', minutes: 10, bearing: 200, note: 'A south suburb of strip malls and garages.' },
    { id: 'kentwood', kind: 'FEEDER', name: 'Kentwood', minutes: 15, bearing: 150, note: 'A southeast suburb.' },
    { id: 'grandville', kind: 'FEEDER', name: 'Grandville', minutes: 15, bearing: 215, note: 'A suburb to the southwest.' },
    { id: 'rockford', kind: 'FEEDER', name: 'Rockford', minutes: 20, bearing: 5, note: 'A wealthy north suburb.' },
    { id: 'holland', kind: 'FEEDER', name: 'Holland and Zeeland', minutes: 30, bearing: 235, note: 'Conservative lakeshore church towns. Kids drive in for shows, some without telling anyone.' },
    { id: 'greenville', kind: 'FEEDER', name: 'Greenville', minutes: 35, bearing: 45, note: 'A small town to the north.' },
    { id: 'muskegon', kind: 'FEEDER', name: 'Muskegon', minutes: 40, bearing: 295, note: 'A lake port with metal and punk kids.' },
    { id: 'kalamazoo', kind: 'PEER', name: 'Kalamazoo', minutes: 60, bearing: 200, slug: 'kalamazoo-mi', note: 'A house-show scene that polices its own safety.' },
    { id: 'lansing', kind: 'PEER', name: 'Lansing', minutes: 70, bearing: 105, slug: 'lansing-mi', note: 'A mid-size scene to the east.' }
  ],

  hoods: [
    { id: 'heritage-hill', name: 'Heritage Hill', route: 'old-side', note: 'Big old Victorians cut into apartments near downtown. Shared houses.' },
    { id: 'eastown', name: 'Eastown', route: 'old-side', note: 'A small business strip of bars and shops. The weirdo and punk kids hang here.' },
    { id: 'wealthy-street', name: 'Wealthy Street and the Southeast Side', route: 'old-side', note: 'Old houses and shops, cheap-ish.' },
    { id: 'division', name: 'Division Avenue South', route: 'work-side', note: 'An old commercial strip with a hardcore youth space that reopened to lines around the block.' },
    { id: 'west-side', name: 'the West Side', route: 'work-side', note: 'Old Polish and working-class blocks of small houses. House-venue turf.' },
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Bars, big concert halls and hotels. Expensive.' },
    { id: 'creston', name: 'Creston', route: 'work-side', note: 'North-side neighborhood with cheap houses.' },
    { id: 'walker', name: 'Walker and Wyoming', route: 'campus', note: 'Suburban strip towns: garages and a few church halls.' }
  ],

  contacts: ['kalamazoo-mi', 'lansing-mi', 'ann-arbor-mi', 'chicago', 'milwaukee'],

  points: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 9500000 },
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05, pop: 4390000 },
    { name: 'Milwaukee', state: 'WI', lat: 43.04, lon: -87.91, pop: 1575000 },
    { name: 'Muskegon', state: 'MI', lat: 43.23, lon: -86.25, pop: 175000 }
  ],
  roads: ['US-131', 'I-96', 'I-196', 'M-6', 'I-94'],

  words: {
    street: ['Division Avenue', 'Wealthy Street', 'Fulton Street', 'Michigan Street', 'Leonard Street', 'Eastern Avenue'],
    water: ['the Grand River'],
    hood: ['Heritage Hill', 'Eastown', 'Creston', 'the West Side', 'Wyoming', 'Kentwood', 'Walker'],
    thing: ['lake-effect', 'church hall', 'shovel', 'firehouse', 'Sunday service'],
    weather: ['lake-effect snow', 'whiteout']
  },

  events: [
    { id: 'GRAND_RAPIDS_WHITEOUT', when: 'WEEK', tier: 'HARD', weight: 3, cooldown: 35, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'COLD', months: [11, 12, 1, 2, 3] },
      telegraph: 'A lake-effect band is parked over the west side all week.',
      title: 'A whiteout on show day',
      body: 'The lake-effect snow has the van windows buried and the highway down to one lane. The host is still out shoveling the driveway for load-in.',
      options: [
        { id: 'EARLY', label: 'Move doors earlier so people can beat the worst of it', likely: 'Most make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Doors an hour early. Everyone who came was stamping snow off their boots.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'A lot of the lakeshore kids never make it in.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }],
          result: 'The road never cleared. The room was the ones who could walk.' },
        { id: 'STAY', label: 'Let everyone sleep over', likely: 'Smaller crowd, and a floor full of bodies in the morning.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }, { op: 'REGULARS', pct: .02 }, { op: 'STRESS', d: 1 }],
          result: 'Nobody drove home. By morning the basement was one big pile of coats.' }
      ] }
  ]
});
