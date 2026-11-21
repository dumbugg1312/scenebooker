SB.Cities.register('milwaukee', {
  v: 1,
  slug: 'milwaukee',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of wisconsin-milwaukee', 'uwm', 'marquette university', 'marquette', 'milwaukee area technical college', 'matc', 'milwaukee journal sentinel',
           'shepherd express', 'milwaukee record', 'onmilwaukee', 'urban milwaukee', 'milwaukee magazine', 'radio milwaukee', 'wuwm', 'wmse', 'summerfest', 'the big gig',
           'festa italiana', 'german fest', 'wisconsin state fair', 'milwaukee brewers', 'brewers', 'milwaukee bucks', 'harley-davidson', 'harley', 'miller brewing',
           'molson coors', 'pabst', 'northwestern mutual', 'rockwell automation', 'froedtert', 'aurora health', 'johnson controls', 'great lakes naval station',
           'discovery world', 'milwaukee art museum', 'fiserv forum', 'american family field', 'state fair park'],
  blocklist: ['summerfest*', 'journal sentinel*', 'shepherd express*', 'pabst*', 'harley-davidson*', 'marquette university*', 'wmse*'],

  blurb: ['Basements in Riverwest and bars in Bay View carry a polite, ever-turning emo and hardcore scene. The lake wind cuts across every load-in.',
          'The all-ages crowd turns over almost completely every few years and rebuilds each time. Halls come and go, the kids drive to Chicago for the big ones, and a lease can end a venue overnight.'],
  hard: 'All-ages rooms keep closing, and one lease or ban can end your venue.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 }
  ],

  tilt: [
    { fan: 'emo', band: 'emo', d: .08, reason: 'Emo and screamo kids keep this city loyal to the sound.' },
    { fan: 'hardcore', band: 'hardcore', d: .06, reason: 'A strong hardcore city, with kids and middle-agers both in the room.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Milwaukee' },
    { id: 'west-allis', kind: 'FEEDER', name: 'West Allis', minutes: 15, bearing: 270, note: 'A working-class inner suburb.' },
    { id: 'waukesha', kind: 'FEEDER', name: 'Waukesha', minutes: 25, bearing: 270, note: 'A big suburb; kids drive in.' },
    { id: 'racine', kind: 'FEEDER', name: 'Racine', minutes: 30, bearing: 185, beyond: 'hoan-bridge', note: 'An old factory town with its own small basement scene.' },
    { id: 'port-washington', kind: 'FEEDER', name: 'Port Washington', minutes: 35, bearing: 5, note: 'A small lake town.' },
    { id: 'west-bend', kind: 'FEEDER', name: 'West Bend', minutes: 40, bearing: 320, note: 'Exurban kids with cars.' },
    { id: 'oconomowoc', kind: 'FEEDER', name: 'Oconomowoc', minutes: 40, bearing: 275, note: 'A lake-country suburb.' },
    { id: 'kenosha', kind: 'FEEDER', name: 'Kenosha', minutes: 45, bearing: 185, beyond: 'hoan-bridge', note: 'Halfway to Chicago; kids can go either way.' },
    { id: 'madison', kind: 'PEER', name: 'Madison', minutes: 80, bearing: 270, slug: 'madison-wi', note: 'A campus-driven scene and a regular swap.' },
    { id: 'green-bay', kind: 'PEER', name: 'Green Bay', minutes: 120, bearing: 340, slug: 'green-bay-wi', note: 'Smaller. Bands come through.' }
  ],

  chokepoints: [
    { id: 'hoan-bridge', name: 'the Hoan Bridge', p: .03 }
  ],

  hoods: [
    { id: 'riverwest', name: 'Riverwest', route: 'old-side', note: 'Tight old houses and flats on the river. Artists, cheap rooms, house shows and basements.' },
    { id: 'bay-view', name: 'Bay View', route: 'old-side', note: 'A working-class lake neighborhood turned hip. A gritty punk and metal room there has closed.' },
    { id: 'walkers-point', name: 'Walker\'s Point', route: 'downtown', note: 'Bars and warehouses south of the river, where an all-ages club closed.' },
    { id: 'east-side', name: 'the East Side', route: 'campus', note: 'Student rentals by the university. House venues open and close with each class.' },
    { id: 'brady', name: 'Brady Street and Murray Hill', route: 'downtown', note: 'Bars and shops, with rents rising.' },
    { id: 'near-west', name: 'the Near West Side and Merrill Park', route: 'work-side', note: 'Cheap, old and industrial, with former theaters and halls.' },
    { id: 'cudahy', name: 'Cudahy', route: 'work-side', note: 'A blue-collar lake suburb with a bar-and-hall tradition. A former metal room reopened as all-ages.' },
    { id: 'shorewood', name: 'Shorewood', route: 'campus', note: 'An inner suburb with a village-hall tradition of all-ages metal and hardcore.' },
    { id: 'sherman-park', name: 'Sherman Park', route: 'old-side', note: 'Big old houses on the cheaper west side.' }
  ],

  contacts: ['madison-wi', 'green-bay-wi', 'chicago', 'minneapolis'],

  points: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 9500000 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27, pop: 3760000 },
    { name: 'Rockford', state: 'IL', lat: 42.26, lon: -89.09, pop: 340000 }
  ],
  roads: ['I-94', 'I-43', 'I-794', 'I-41', 'US 41'],

  words: {
    street: ['North Avenue', 'Brady Street', 'Locust Street', 'Kinnickinnic Avenue', 'Water Street', 'Mitchell Street'],
    water: ['Lake Michigan', 'the Milwaukee River', 'the Kinnickinnic'],
    hood: ['Riverwest', 'Bay View', 'Walker\'s Point', 'Merrill Park', 'Cudahy', 'Shorewood', 'Sherman Park'],
    thing: ['fish fry', 'brat', 'tavern', 'lake wind', 'low pipe', 'duplex'],
    weather: ['lake wind', 'ice storm']
  },

  events: [
    { id: 'MILWAUKEE_HOAN_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Crews are working on the lakefront spur this week.',
      title: 'The Hoan Bridge is shut',
      body: 'The Hoan Bridge is closed for a wreck and ice. Every car from the south side and the lake towns is being sent through downtown, and it is not moving.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the bridge.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The bridge stayed shut. The south side stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads took the surface streets together. They\'ll remember that.' }
      ] }
  ]
});
