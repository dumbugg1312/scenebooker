SB.Cities.register('evansville-in', {
  v: 1,
  slug: 'evansville-in',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of evansville', 'university of southern indiana', 'usi', 'courier & press', 'courier and press', 'townsquare media',
           'midwest communications', 'mets', 'west side nut club', 'nut club', 'nut club fall festival', 'germania mannerchor', 'germania männerchor',
           'volksfest', 'frog follies', 'hydrofest', 'drums on the ohio', 'bosse field', 'evv', 'toyota', 'tri-state tornado', 'fort campbell',
           'vfw', 'american legion', 'elks', 'moose lodge', 'pronto pup',
           'floodwall room', 'stoplight annex', 'pocket city rec hall', 'bee line garage', 'crescent basement', 'red bank carport',
           'tri-state social hall', 'third shift lanes', 'lloyd lot', 'pronto pup pavilion', 'riverbend carpet outlet'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['university of evansville*', 'courier & press*', 'courier and press*', 'nut club*', 'frog follies*', 'hydrofest*', 'drums on the ohio*', 'bosse field*'],

  blurb: ['A small river-city scene where metal and hardcore anchor the bill and a few organizers hold it together. Everyone has a day job and a long drive to anywhere.',
          'There is no steady venue. Free outdoor days, a bookstore series and a rented-out mall space stand in for one.'],
  hard: 'Few rooms, and the same few people book all of them.',
  region: 'the Ohio Valley',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.20 },
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  tilt: [
    { fan: 'metal', band: 'hardcore', d: .06, reason: 'Thrash, crossover and hardcore bands share the same local stages and the same crowd.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Evansville' },
    { id: 'henderson', kind: 'FEEDER', name: 'Henderson', state: 'KY', minutes: 15, bearing: 190, pop: 28000, note: 'Across the river bridges in Kentucky, with a small real scene; the state line splits the crowd.', bands: 1 },
    { id: 'newburgh', kind: 'FEEDER', name: 'Newburgh', minutes: 20, bearing: 85, note: 'A well-off bedroom suburb with a river-town main street; kids come in.' },
    { id: 'mount-vernon', kind: 'FEEDER', name: 'Mount Vernon', minutes: 30, bearing: 265, note: 'A refinery and river-port town with a few garage bands.', bands: 1 },
    { id: 'boonville', kind: 'FEEDER', name: 'Boonville', minutes: 30, bearing: 70, note: 'A county seat and bedroom town in farm country.' },
    { id: 'princeton', kind: 'FEEDER', name: 'Princeton', minutes: 40, bearing: 355, note: 'A working-class county seat with a big plant.' },
    { id: 'mount-carmel', kind: 'FEEDER', name: 'Mount Carmel', state: 'IL', minutes: 55, bearing: 325, note: 'A small Wabash Valley college town across the state line.' },
    { id: 'jasper', kind: 'FEEDER', name: 'Jasper', minutes: 60, bearing: 40, note: 'A German-Catholic furniture town with a surprisingly active local music community.', bands: 1 },
    { id: 'vincennes', kind: 'FEEDER', name: 'Vincennes', minutes: 60, bearing: 5, note: 'An old river town with a small public university and a college-town feel.' },
    { id: 'owensboro', kind: 'PEER', name: 'Owensboro', state: 'KY', minutes: 50, bearing: 105, scene: 600, note: 'The closest peer: another river city across the Kentucky line. They trade bands and crowds readily.' },
    { id: 'terre-haute', kind: 'PEER', name: 'Terre Haute', minutes: 105, bearing: 355, scene: 600, note: 'An industrial and college town up US 41, a middle step on tours toward Indianapolis.' },
    { id: 'bloomington', kind: 'PEER', name: 'Bloomington', minutes: 120, bearing: 20, slug: 'bloomington-in', note: 'A far bigger college scene that Evansville\'s best bands and young people leave for.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The grid on the river behind the floodwall. Old commercial buildings, a few bars, and a lot of noise rules after ten.' },
    { id: 'haynies-corner', name: 'Haynie\'s Corner', route: 'downtown', note: 'A walkable arts district just east of downtown with galleries and bars. The nearest thing the city has to a scene street, and getting expensive.' },
    { id: 'west-side', name: 'the West Side', route: 'old-side', note: 'Old brick storefronts, corner bars, churches and social halls. Cheap, mostly ignored, and home to the big October festival.' },
    { id: 'jacobsville', name: 'Jacobsville', route: 'work-side', note: 'Older industrial-edge streets northeast of downtown. Closed factories, low rent, warehouses and practice spaces.' },
    { id: 'lamasco', name: 'Lamasco and the near north', route: 'old-side', note: 'Bungalows and a narrow commercial strip north of downtown. House shows and patio nights, quietly gentrifying.' },
    { id: 'schnitzelburg', name: 'Schnitzelburg', route: 'old-side', note: 'A German-heritage enclave of narrow lots, brick houses and corner taverns. Porch and backyard shows.' },
    { id: 'east-side', name: 'the East Side', route: 'campus', note: 'Strip malls, newer subdivisions and a small private university. College-adjacent houses and church-hosted all-ages shows.' }
  ],

  contacts: ['louisville', 'bloomington-in', 'lafayette-in'],

  points: [
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76, pop: 633000 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78, pop: 690000 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.20, pop: 300000 },
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16, pop: 880000 },
    { name: 'Bowling Green', state: 'KY', lat: 36.99, lon: -86.44, pop: 72000 }
  ],
  roads: ['I-69', 'US 41', 'I-64', 'Lloyd Expressway', 'Indiana 62'],

  words: {
    street: ['Franklin Street', 'Lloyd Expressway', 'Division Street', 'Main Street', 'Washington Avenue', 'Fulton Avenue', 'Indiana 62'],
    water: ['the Ohio', 'the Ohio River', 'the floodwall'],
    hood: ['Haynie\'s Corner', 'Jacobsville', 'Lamasco', 'Schnitzelburg', 'the West Side', 'the East Side', 'Red Bank'],
    thing: ['pork tenderloin', 'carport', 'barge', 'grain elevator', 'second shift', 'bourbon', 'levee', 'social hall', 'mall', 'bookstore', 'outdoor stage', 'day job'],
    weather: ['river fog', 'tornado warning']
  }
});
