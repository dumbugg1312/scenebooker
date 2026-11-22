SB.Cities.register('dover-de', {
  v: 1,
  slug: 'dover-de',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of delaware', 'delaware state university', 'dsu', 'wesley college', 'delaware technical community college', 'del tech',
           'dover air force base', 'dover afb', 'air mobility command', 'dover motor speedway', 'dover international speedway', 'dover downs',
           'monster mile', 'nascar', 'delaware state fair', 'state news', 'delaware state news', 'news journal', 'delaware online', 'delawareonline',
           'wboc', 'wdel', 'wxdr', 'wjbr', 'delaware state hornets', 'blue hens', 'philadelphia eagles', 'eagles', 'phillies',
           'bayhealth', 'perdue', 'mountaire', 'state farm', 'hurricane sandy', 'hurricane isabel', 'hurricane irene', 'sandy', 'isabel',
           'delaware public media', 'schwartz center', 'legislative hall', 'dover air show', 'waffle house', 'wawa', 'sheetz',
           'mcdonald\'s', 'walmart', 'amtrak', 'dover mall', 'ocean city boardwalk', 'delaware state police', 'dover police',
           'c-17', 'c-5', 'galaxy', 'dover days', 'dover days festival', 'oktdoverfest', 'bally\'s dover', 'bally\'s', 'rollins center',
           'dover comic con', 'bowers beach buccaneer bash', 'visit central delaware', 'downtown dover partnership', 'kent county levy court', 'whyy'],
  blocklist: ['dover downs*', 'dover motor*', 'delaware state*', 'wesley college*', 'wawa*', 'dover air*'],

  blurb: ['A capital city of farm towns and a big base, where punk is a few kids with garages and a long drive north.',
          'Shows are rare and small, and every one is a flat highway away from anywhere.'],
  hard: 'No young crowd, no all-ages room, and bands skip you on the way to the beach.',
  region: 'Delmarva',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Wilmington', state: 'DE', lat: 39.74, lon: -75.55 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Dover' },
    { id: 'camden', kind: 'FEEDER', name: 'Camden and Wyoming', minutes: 10, bearing: 195, note: 'Suburb next door; teenagers with garages.' },
    { id: 'cheswold', kind: 'FEEDER', name: 'Cheswold', minutes: 10, bearing: 350, note: 'A farm town north on Route 13.' },
    { id: 'magnolia', kind: 'FEEDER', name: 'Magnolia', minutes: 10, bearing: 185, note: 'A farm village; a handful of kids.' },
    { id: 'felton', kind: 'FEEDER', name: 'Felton', minutes: 15, bearing: 195, note: 'A farm town, mostly trucks.' },
    { id: 'smyrna', kind: 'FEEDER', name: 'Smyrna', minutes: 20, bearing: 340, note: 'A bigger town to the north with its own bars; kids come in.' },
    { id: 'harrington', kind: 'FEEDER', name: 'Harrington', minutes: 20, bearing: 195, note: 'A farm town with a fairgrounds crowd.' },
    { id: 'clayton', kind: 'FEEDER', name: 'Clayton', minutes: 25, bearing: 340, note: 'Small; people drive south to Dover or north to Wilmington.' },
    { id: 'milford', kind: 'FEEDER', name: 'Milford', minutes: 25, bearing: 160, note: 'A small riverfront town in the south; some young people come up.' },
    { id: 'middletown', kind: 'FEEDER', name: 'Middletown', minutes: 35, bearing: 335, note: 'Fast-growing suburbs; kids with cars.' },
    { id: 'wilmington', kind: 'PEER', name: 'Wilmington', state: 'DE', minutes: 50, bearing: 25, slug: 'wilmington-de', note: 'The state\'s real punk and club city; its bands come down only now and then.' },
    { id: 'annapolis', kind: 'PEER', name: 'Annapolis', state: 'MD', minutes: 55, bearing: 260, scene: 600, note: 'Across the Bay Bridge; a small-city scene.' },
    { id: 'salisbury', kind: 'PEER', name: 'Salisbury', state: 'MD', minutes: 60, bearing: 170, scene: 500, note: 'A college and poultry town with a small scene of its own.' }
  ],

  hoods: [
    { id: 'the-green', name: 'the Green', route: 'downtown', note: 'Brick colonial streets around the old state house. A few bars, empty late; small rooms only.' },
    { id: 'loockerman', name: 'Loockerman Street', route: 'downtown', note: 'The main drag east of the Green. Storefronts, some vacant; the closest thing to a bar strip.' },
    { id: 'route-13', name: 'the Route 13 corridor', route: 'work-side', note: 'Motels, car lots and strip malls. Cheap rent, where any hall or warehouse would be.' },
    { id: 'north-side', name: 'the north side', route: 'old-side', note: 'Older rowhouse and mid-century streets near the state offices. Renters and state workers.' },
    { id: 'silver-lake', name: 'Silver Lake', route: 'old-side', note: 'A lake park with older houses around it. Quiet porch streets.' },
    { id: 'college-area', name: 'the college area', route: 'campus', note: 'Student housing and apartments off Route 8. Shows here sit mostly outside the punk world.' },
    { id: 'base-side', name: 'Route 9 and Route 10 east', route: 'work-side', note: 'Rental houses, mobile-home parks and tract homes for service families and contractors. Young and transient.' },
    { id: 'camden-edge', name: 'the Camden edge', route: 'campus', note: 'Suburban cul-de-sacs, garages and basements where teenagers practice.' }
  ],

  contacts: ['wilmington-de', 'philadelphia', 'baltimore', 'washington-dc'],

  calendar: [
    { id: 'parade', label: 'the big spring parade weekend', tag: 'parade', month: 5, week: 1, dows: [5], can: [.80, .75, .70], hoods: ['the-green', 'loockerman'], elsewhere: [.95, .92, .90] },
    { id: 'race-spring', label: 'race weekend', tag: 'race', month: 5, weeks: [1, 2], dows: [4, 5, 6], can: [.92, .88, .85], hoods: ['route-13'], elsewhere: [1, .97, .95] },
    { id: 'race-fall', label: 'race weekend', tag: 'race', month: 10, weeks: [1, 3], dows: [4, 5, 6], can: [.92, .88, .85], hoods: ['route-13'], elsewhere: [1, .97, .95] },
    { id: 'state-fair', label: 'the state fair', tag: 'fair', month: 7, weeks: [4, 5], dows: [3, 4, 5, 6], can: [.88, .85, .85] },
    { id: 'beer-festival', label: 'the craft-beer festival', tag: 'festival', month: 10, weeks: [1, 3], dows: [5], can: [.92, .90, .90], hoods: ['the-green', 'loockerman'], elsewhere: [1, 1, 1] },
    { id: 'comic-weekend', label: 'the comic convention weekend', tag: 'festival', month: 6, week: 2, dows: [5, 6], can: [.95, .92, .92] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4, 5], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4, 5], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1440, weekend: 1500, inForce: false } },

  roads: ['US 13', 'DE 1', 'Route 8', 'Route 10', 'US 113'],
  points: [
    { name: 'Rehoboth Beach', state: 'DE', lat: 38.72, lon: -75.08, pop: 1500 },
    { name: 'Ocean City', state: 'MD', lat: 38.34, lon: -75.08, pop: 7000 },
    { name: 'Newark', state: 'DE', lat: 39.68, lon: -75.75, pop: 33000 }
  ],

  words: {
    street: ['Loockerman Street', 'State Street', 'Governors Avenue', 'Forrest Avenue', 'Route 8', 'North DuPont Highway'],
    water: ['the St. Jones River', 'Silver Lake', 'Delaware Bay'],
    hood: ['Silver Lake', 'Camden', 'Wyoming', 'the Green', 'Loockerman'],
    thing: ['strip mall', 'toll road', 'window unit', 'parking lot', 'marsh mosquito', 'farm stand'],
    weather: ['humidity', 'nor\'easter']
  },

  events: [
    { id: 'DOVER_DE_MARSH_FLOOD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [7, 8, 9, 10] },
      telegraph: 'A tropical system is tracking up the coast toward the bay.',
      title: 'The low roads are under',
      body: 'A big rain has the St. Jones over its banks and the marsh roads east of town underwater. The farm-town kids and the bands from the coast side can\'t get through tonight.',
      options: [
        { id: 'MOVE', label: 'Move it a day, once the water goes down', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' },
        { id: 'GARAGE', label: 'Move it to a garage on higher ground', likely: 'Smaller and louder, with a window unit that loses.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A garage in a tract off Route 8 took the whole bill, and the floor was packed.' },
        { id: 'PLAYON', label: 'Run it as planned and take what you get', likely: 'Most of the list stays home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The water stayed on the roads. The room was half full.' }
      ] }
  ]
});
