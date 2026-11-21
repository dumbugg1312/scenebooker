SB.Cities.register('kansas-city', {
  v: 1,
  slug: 'kansas-city',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of missouri-kansas city', 'umkc', 'university of kansas', 'kansas state', 'johnson county community college', 'jccc', 'the pitch', 'kansas city star',
           'kansas city magazine', 'kcur', 'kkfi', 'kansas city chiefs', 'chiefs', 'kansas city royals', 'royals', 'sporting kc', 'arrowhead', 'kauffman', 'cerner', 'hallmark',
           'burns & mcdonnell', 'garmin', 'kansas city barbecue society', 'american royal', 'plaza lights', 'worlds of fun', 'union station', 'power and light', 't-mobile center',
           'fort leavenworth', 'buck o\'neill bridge', 'heart of america bridge'],
  blocklist: ['kansas city star*', 'the pitch kansas city*', 'kcur*', 'kansas city chiefs*', 'kansas city royals*', 'hallmark cards*', 'american royal*', 'arrowhead stadium*'],

  blurb: ['Warehouses in the bottoms and house venues carry a punk scene that never keeps a room long. Rock-and-punk runs deep here, and a house named for a joke is usually gone by next summer.',
          'The state line splits the kids, half of whom live in Kansas, and nobody can park.'],
  hard: 'Rooms last a year or two, all-ages spots are rare, and parking is worse.',
  region: 'the Plains',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.2 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 }
  ],

  tilt: [
    { fan: 'street-punk', band: 'garage', d: .06, reason: 'A long rock-and-punk tradition, and mid-paced punk still fills a room.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Kansas City' },
    { id: 'overland-park', kind: 'FEEDER', name: 'Overland Park', state: 'KS', minutes: 20, bearing: 190, note: 'Suburban kids with cars; an old all-ages coffeehouse scene.' },
    { id: 'independence', kind: 'FEEDER', name: 'Independence', minutes: 20, bearing: 95, note: 'An east-side suburb.' },
    { id: 'liberty', kind: 'FEEDER', name: 'Liberty', minutes: 20, bearing: 20, beyond: 'river-bridges', note: 'A north suburb across the river.' },
    { id: 'lees-summit', kind: 'FEEDER', name: 'Lee\'s Summit', minutes: 25, bearing: 130, note: 'A southeast suburb.' },
    { id: 'olathe', kind: 'FEEDER', name: 'Olathe', state: 'KS', minutes: 30, bearing: 215, note: 'A suburb in Kansas.' },
    { id: 'leavenworth', kind: 'FEEDER', name: 'Leavenworth', state: 'KS', minutes: 40, bearing: 335, beyond: 'river-bridges', note: 'A river town of military and prison jobs.' },
    { id: 'st-joseph', kind: 'FEEDER', name: 'St. Joseph', minutes: 60, bearing: 335, beyond: 'river-bridges', note: 'A small town up the river.' },
    { id: 'lawrence', kind: 'PEER', name: 'Lawrence', state: 'KS', minutes: 45, bearing: 275, slug: 'lawrence-ks', note: 'A college-town scene with its own legends. Kids drive back and forth.' },
    { id: 'columbia', kind: 'PEER', name: 'Columbia', minutes: 120, bearing: 85, slug: 'columbia-mo', note: 'A campus town to the east.' },
    { id: 'omaha', kind: 'PEER', name: 'Omaha', state: 'NE', minutes: 180, bearing: 340, slug: 'omaha', note: 'A bigger scene up I-29.' }
  ],

  chokepoints: [
    { id: 'river-bridges', name: 'the Missouri River bridges', p: .03 }
  ],

  hoods: [
    { id: 'midtown', name: 'Midtown and Westport', route: 'downtown', note: 'Bars, rooms and the nightlife strip. Midtown house shows kept things alive in lean years.' },
    { id: 'crossroads', name: 'the Crossroads', route: 'downtown', note: 'Warehouses and galleries, with rents rising.' },
    { id: 'west-bottoms', name: 'the West Bottoms', route: 'work-side', note: 'Empty brick warehouses by the river. An all-ages punk room lasted about a year.' },
    { id: 'northeast', name: 'the Historic Northeast', route: 'old-side', note: 'Cheap old houses, many immigrants, DIY basements.' },
    { id: 'troost', name: 'the Troost Corridor', route: 'old-side', note: 'The dividing street. An old DIY venue stood on it.' },
    { id: 'stadium-drive', name: 'the Stadium Drive area', route: 'work-side', note: 'Industrial sprawl east of the sports complexes, with a DIY punk club in a warehouse.' },
    { id: 'waldo', name: 'Waldo and Brookside', route: 'old-side', note: 'South-side bungalows.' },
    { id: 'kck', name: 'Strawberry Hill and KCK', route: 'work-side', note: 'Across the state line. Working class.' },
    { id: 'johnson-county', name: 'Johnson County', route: 'campus', note: 'Suburban kids, and a past of coffeehouse all-ages shows.' }
  ],

  contacts: ['lawrence-ks', 'columbia-mo', 'omaha', 'st-louis', 'wichita-ks'],

  points: [
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.2, pop: 2800000 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99, pop: 2960000 },
    { name: 'Des Moines', state: 'IA', lat: 41.59, lon: -93.62, pop: 710000 },
    { name: 'Wichita', state: 'KS', lat: 37.69, lon: -97.34, pop: 650000 }
  ],
  roads: ['I-70', 'I-35', 'I-29', 'I-435', 'I-670'],

  words: {
    street: ['Troost Avenue', 'Main Street', 'Broadway Boulevard', 'Westport Road', 'Southwest Boulevard', 'State Line Road'],
    water: ['the Missouri River', 'the Kansas River'],
    hood: ['Westport', 'the Crossroads', 'the West Bottoms', 'Waldo', 'Brookside', 'Strawberry Hill', 'Northeast'],
    thing: ['barbecue', 'bay door', 'boulevard', 'siren', 'rail yard'],
    weather: ['tornado siren', 'ice storm']
  },

  events: [
    { id: 'KANSAS_CITY_BRIDGE_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Crews are working on the river bridges to the north this week.',
      title: 'The river bridge is closed',
      body: 'A wreck has shut one of the bridges over the Missouri, and the other is backed up for a mile. Everyone coming from the north side is stuck.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the river.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The bridge stayed shut. The north side stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads took the long way around together. They\'ll remember that.' }
      ] }
  ]
});
