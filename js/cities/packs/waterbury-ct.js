SB.Cities.register('waterbury-ct', {
  v: 1,
  slug: 'waterbury-ct',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['yale', 'uconn', 'university of connecticut', 'western connecticut state', 'western ct state', 'vfw', 'american legion', 'knights of columbus',
           'metro-north', 'dunkin\'', 'dunkin', 'narragansett', 'patriots', 'republican-american', 'brass mill center', 'brass city',
           'the annealing room', 'annealing room', 'number nine mill', 'the grinder hall', 'grinder hall', 'pine hill social', 'hopeville annex',
           'the rolling room', 'sixth ward hall', 'brass lot', 'the spindle', 'washington hill cellar', 'naugatuck street social club', 'the triple-decker',
           'waterbury observer', 'waterbury republican-american', 'main street waterbury', 'our lady of mount carmel', 'ole skool cookout', 'brass city jazz fest',
           'make music waterbury', 'connecticut death fest', 'new haven independent', 'new haven register', 'ct public', 'bandsintown', 'i95rock'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['uconn*', 'yale*', 'republican-american*', 'brass mill*', 'dunkin*', 'annealing room*', 'number nine mill*'],

  blurb: ['A brass-and-clock mill city in the Naugatuck Valley, all brick factories, steep hillsides and an interstate that runs straight through it.',
          'The basements are loud and cheap, the upstairs landlord is the real threat, and "who has the van" is the lineup.'],
  hard: 'Few all-ages rooms; tours skip you for the bigger cities.',
  region: 'the Northeast',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Hartford', state: 'CT', lat: 41.76, lon: -72.67 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Waterbury' },
    { id: 'naugatuck', kind: 'FEEDER', name: 'Naugatuck', minutes: 15, bearing: 160, note: 'A close cousin mill town down Route 8 with a small high-school punk crowd.' },
    { id: 'wolcott', kind: 'FEEDER', name: 'Wolcott', minutes: 15, bearing: 80, note: 'A bedroom suburb of kids with basements and cars.' },
    { id: 'watertown', kind: 'FEEDER', name: 'Watertown and Oakville', minutes: 15, bearing: 300, note: 'A quiet suburb where parents tolerate a basement.' },
    { id: 'thomaston', kind: 'FEEDER', name: 'Thomaston', minutes: 20, bearing: 340, note: 'A small old mill town to the north.' },
    { id: 'cheshire', kind: 'FEEDER', name: 'Cheshire and Prospect', minutes: 20, bearing: 120, note: 'Richer suburbs to the southeast.' },
    { id: 'southbury', kind: 'FEEDER', name: 'Southbury, Oxford and Middlebury', minutes: 20, bearing: 230, note: 'Wealthier suburbs; some kids have cars.' },
    { id: 'southington', kind: 'FEEDER', name: 'Southington and Bristol', minutes: 25, bearing: 70, note: 'A big suburban pool of punk and metal kids east on I-84.' },
    { id: 'lower-valley', kind: 'FEEDER', name: 'Seymour, Ansonia and Derby', minutes: 25, bearing: 190, note: 'Small mill cities with their own band pools down the valley.' },
    { id: 'torrington', kind: 'FEEDER', name: 'Torrington', minutes: 30, bearing: 335, note: 'An old mill city in the hills with a small scene and a friendly rivalry.' },
    { id: 'meriden', kind: 'FEEDER', name: 'Meriden', minutes: 30, bearing: 100, note: 'A small mill-minded city to the east.' },
    { id: 'danbury', kind: 'FEEDER', name: 'Danbury', minutes: 35, bearing: 245, pop: 85000, note: 'A bigger city west on I-84 with a hardcore circuit of its own.' },
    { id: 'new-haven', kind: 'PEER', name: 'New Haven', minutes: 45, bearing: 135, slug: 'new-haven-ct', note: 'The big Connecticut all-ages tradition; it takes Waterbury\'s best bands.' },
    { id: 'springfield', kind: 'PEER', name: 'Springfield', state: 'MA', minutes: 75, bearing: 45, slug: 'springfield-ma', note: 'Another old industrial city up I-91 with some touring overlap.' },
    { id: 'poughkeepsie', kind: 'PEER', name: 'Poughkeepsie', state: 'NY', minutes: 90, bearing: 275, slug: 'poughkeepsie-ny', note: 'A Hudson Valley peer down I-84.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Green', route: 'downtown', note: 'Civic buildings, bars, a clock tower and a lot of empty upper floors. A cheap storefront can be found, but a distant landlord usually owns it.' },
    { id: 'brooklyn', name: 'Brooklyn', route: 'old-side', note: 'Dense two- and three-family houses just east of downtown, with corner stores, social clubs and leftover industrial buildings.' },
    { id: 'south-end', name: 'the South End', route: 'work-side', note: 'A working-class riverside area of old industrial units and mixed housing. Cheap and ignored.' },
    { id: 'bunker-hill', name: 'Bunker Hill', route: 'old-side', note: 'A hillside of porches, small yards and cellars where the neighbors are close and the stairs are steep.' },
    { id: 'town-plot', name: 'Town Plot and Overlook', route: 'campus', note: 'Older single-family hill streets on the west side. Basement shows with tolerant parents.' },
    { id: 'waterville', name: 'Waterville and Hopeville', route: 'work-side', note: 'Quiet working-class mill villages up and across the river. Garages, basements and church halls.' },
    { id: 'abrigador', name: 'Abrigador and Willow Street', route: 'old-side', note: 'An old family east side of social clubs and bakeries. Little for DIY, but the clubs rent halls.' },
    { id: 'chase-strip', name: 'the Chase Parkway strip', route: 'campus', note: 'Highway retail and a fading mall. Where kids hang in the parking lots.' }
  ],

  contacts: ['new-haven-ct', 'springfield-ma', 'poughkeepsie-ny', 'hartford', 'bridgeport-ct'],

  calendar: [
    { id: 'parish-feast', label: 'the summer parish feast', tag: 'festival', month: 7, week: 3, dows: [3, 4, 5, 6], can: [.90, .88, .85], hoods: ['abrigador'], elsewhere: [1, .97, .97] },
    { id: 'july-fireworks', label: 'the Fourth of July fireworks', tag: 'holiday', month: 7, week: 1, dows: [0, 1, 2, 3, 4, 5, 6], can: [.90, .88, .88] },
    { id: 'multicultural-fest', label: 'the downtown multicultural festival', tag: 'festival', month: 9, week: 4, dows: [5], can: [.92, .90, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'island-parade', label: 'the Puerto Rican parade', tag: 'parade', month: 9, week: 1, dows: [5], can: [.90, .88, .88], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'Friday-night high-school football', tag: 'game', month: 9, weeks: [2, 4], dows: [4], can: [.88, .95, .95] },
    { id: 'football-oct', label: 'Friday-night high-school football', tag: 'game', month: 10, weeks: [1, 3], dows: [4], can: [.88, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] },
    { id: 'tree-lighting', label: 'the downtown tree lighting', tag: 'holiday', month: 11, week: 4, dows: [6], can: [.92, .92, .92], hoods: ['downtown'], elsewhere: [1, 1, 1] }
  ],


  points: [
    { name: 'Hartford', state: 'CT', lat: 41.76, lon: -72.67, pop: 121000 },
    { name: 'Bridgeport', state: 'CT', lat: 41.19, lon: -73.20, pop: 148000 },
    { name: 'Stamford', state: 'CT', lat: 41.05, lon: -73.54, pop: 135000 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01, pop: 8300000 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06, pop: 650000 }
  ],
  roads: ['I-84', 'Route 8', 'I-95', 'Route 6', 'I-91'],

  words: {
    street: ['Bank Street', 'Meadow Street', 'Willow Street', 'Highland Avenue', 'Watertown Avenue', 'East Main Street'],
    water: ['the Naugatuck', 'the Naugatuck River'],
    hood: ['Brooklyn', 'Bunker Hill', 'Washington Hill', 'Overlook', 'Town Plot', 'Waterville', 'Hopeville', 'Abrigador', 'the South End'],
    thing: ['grinder', 'apizza', 'brick mill', 'cellar', 'social club', 'parish hall', 'the Mixmaster', 'triple-decker', 'mill rehearsal room', 'van'],
    weather: ['nor\'easter', 'black ice', 'snow squall']
  },

  events: [
    { id: 'WATERBURY_CT_FEAST_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The east side is closing its streets for the feast, and the procession goes right past the hall.',
      title: 'The procession blocks the loading door',
      body: 'The street is shut for the feast, parking is gone for blocks, and the procession passes the hall\'s loading door just as the first band shows up.',
      options: [
        { id: 'LATE', label: 'Push the doors back until the street opens', likely: 'The bands get in, but it\'s a late night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'The band hauled amps through the crowd and the doors opened an hour late.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd cannot park.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'Nobody could park, and the people who walked from the hill came.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could make it came.' }
      ] },

    { id: 'WATERBURY_CT_FIRST_SNOW', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [11, 12, 1, 2, 3] },
      telegraph: 'The first snow is coming, and the steep hill streets do not get plowed first.',
      title: 'The van does not make the hill',
      body: 'The band from Southington made it up to Bunker Hill, and the drummer\'s van is spinning at the bottom of the steep street.',
      options: [
        { id: 'CARRY', label: 'Carry the drums up the hill by hand', likely: 'A late start, and a story everyone tells.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 45 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'Six people carried the kit up the hill in the snow, and the cellar was loud and warm.' },
        { id: 'SHORT', label: 'Run the short bill without them', likely: 'A thin night.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Two bands played a long, loose night for the people who could walk.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could make it came.' }
      ] },

    { id: 'WATERBURY_CT_THEATER_DATE', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 4] },
      telegraph: 'The big downtown theater just announced a touring hardcore date on your night.',
      title: 'The theater took your crowd',
      body: 'A touring hardcore bill is at the downtown theater tonight, every local kid wants on it, and the cellar crowd has gone downtown.',
      options: [
        { id: 'LATE', label: 'Push doors back until the theater lets out', likely: 'The kids come up after, wired, and it\'s late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 75 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Doors were at ten, and a wave of kids with wristbands came down from the theater and the floor filled.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The cellar crowd is somewhere else.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'Everybody was downtown, so the bands played to their own friends.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could make it came.' }
      ] }
  ]
});
