SB.Cities.register('buffalo', {
  v: 1,
  slug: 'buffalo',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university at buffalo', 'ub', 'suny buffalo', 'buffalo state', 'canisius college', 'daemen university', 'medaille college', 'd\'youville university', 'niagara university', 'suny fredonia', 'buffalo bills', 'highmark stadium', 'buffalo sabres', 'keybank center', 'buffalo bisons', 'sahlen field', 'buffalo news', 'buffalo hive', 'buffablog', 'ub spectrum', 'artvoice', 'wbfo', 'wgrz', 'wivb', 'kleinhans music hall', 'shea\'s', 'peace bridge', 'rainbow bridge', 'niagara falls state park', 'canalside', 'taste of buffalo', 'allentown art festival', 'buffalo niagara medical campus', 'general motors', 'ford stamping plant', 'bethlehem steel', 'new era cap', 'ralph wilson stadium', 'buffalo wings', 'anchor bar'],
  blocklist: ['buffalo news*', 'buffalo bills*', 'anchor bar*', 'new era cap*', 'canalside*', 'kleinhans*'],

  blurb: ['Buffalo hardcore lives in restaurant back rooms and a veterans\' hall, packed with twenty-somethings and a few old heads at the back.',
          'It is all-ages and friendly and rowdy. The lake snow and the border decide who actually makes it.'],
  hard: 'Rooms depend on one owner\'s goodwill, and snow or the border can kill any night.',
  region: 'the Great Lakes',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Toronto', state: 'ON', lat: 43.65, lon: -79.38 },
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80 },
    { name: 'New York City', state: 'NY', lat: 40.71, lon: -74.01 }
  ],
  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'The all-ages hardcore wave is the scene now.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Buffalo' },
    { id: 'tonawanda', kind: 'FEEDER', name: 'Tonawanda and North Tonawanda', minutes: 15, bearing: 340, note: 'Working-class river suburbs; kids and bands.' },
    { id: 'amherst', kind: 'FEEDER', name: 'Amherst and Williamsville', minutes: 20, bearing: 55, note: 'Big suburbs; students and kids.' },
    { id: 'cheektowaga', kind: 'FEEDER', name: 'Lancaster, Depew and Cheektowaga', minutes: 20, bearing: 85, note: 'East suburbs.' },
    { id: 'niagara-falls', kind: 'FEEDER', name: 'Niagara Falls', minutes: 25, bearing: 340, beyond: 'border-bridges', note: 'A tourist and worn-down city with some bands.' },
    { id: 'orchard-park', kind: 'FEEDER', name: 'Orchard Park and Hamburg', minutes: 25, bearing: 185, beyond: 'skyway', note: 'Southern suburbs.' },
    { id: 'lockport', kind: 'FEEDER', name: 'Lockport', minutes: 30, bearing: 25, note: 'A canal town with a small scene.' },
    { id: 'fredonia', kind: 'FEEDER', name: 'Fredonia and Dunkirk', minutes: 50, bearing: 215, note: 'Lake towns with a college.' },
    { id: 'jamestown', kind: 'FEEDER', name: 'Jamestown', minutes: 75, bearing: 200, note: 'Small and far.' },
    { id: 'rochester', kind: 'PEER', name: 'Rochester', minutes: 80, bearing: 85, slug: 'rochester', note: 'A similar scene with more house shows and churches.' },
    { id: 'erie', kind: 'PEER', name: 'Erie', state: 'PA', minutes: 90, bearing: 220, slug: 'erie-pa', note: 'Smaller; bands go back and forth.' },
    { id: 'syracuse', kind: 'PEER', name: 'Syracuse', minutes: 150, bearing: 90, slug: 'syracuse-ny', note: 'A long Thruway drive.' }
  ],

  chokepoints: [{ id: 'skyway', name: 'the Skyway', p: 0.03 }, { id: 'border-bridges', name: 'the bridges to Canada', p: 0.02 }],

  hoods: [
    { id: 'elmwood', name: 'Elmwood Village and Allentown', route: 'downtown', note: 'Cafes, bars and old houses; the nightlife district for people who like art and music.' },
    { id: 'university-heights', name: 'University Heights and Main Street', route: 'campus', note: 'Student rentals and cheap storefronts, with a small all-ages room in a restaurant back room.' },
    { id: 'west-side', name: 'the West Side and Black Rock', route: 'old-side', note: 'Old two-family houses, immigrant restaurants and a back room that books hardcore.' },
    { id: 'south-buffalo', name: 'South Buffalo', route: 'work-side', note: 'Irish rowhouses and old plant buildings; a restaurant room that does shows.' },
    { id: 'larkinville', name: 'Kaisertown and Larkinville', route: 'work-side', note: 'Old industrial buildings, warehouses and cheap storage.' },
    { id: 'hertel', name: 'Hertel and North Buffalo', route: 'old-side', note: 'A commercial strip and houses; a few rooms.' },
    { id: 'east-side', name: 'the East Side and Broadway-Fillmore', route: 'work-side', note: 'Old Polish and Black neighborhoods with halls, clubs and fraternal posts.' },
    { id: 'lackawanna', name: 'Lackawanna', route: 'work-side', note: 'A former steel town on the lake; cheap space.' }
  ],

  contacts: ['rochester', 'erie-pa', 'syracuse-ny'],

  points: [
    { name: 'Toronto', state: 'ON', lat: 43.65, lon: -79.38, pop: 6200000 },
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69, pop: 2100000 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80, pop: 2370000 },
    { name: 'Niagara Falls', state: 'NY', lat: 43.09, lon: -79.06, pop: 48000 }
  ],
  roads: ['I-90', 'I-190', 'Route 33', 'I-290', 'the Thruway', 'Route 5'],

  words: {
    street: ['Main Street', 'Elmwood Avenue', 'Delaware Avenue', 'Broadway', 'Seneca Street', 'Chippewa Street', 'Hertel Avenue'],
    water: ['Lake Erie', 'the Niagara River', 'the Buffalo River'],
    hood: ['Black Rock', 'Kaisertown', 'Allentown', 'Lackawanna', 'Riverside', 'South Buffalo'],
    thing: ['wings', 'snow shovel', 'Skyway', 'generator', 'customs line', 'grain elevator'],
    weather: ['lake-effect snow', 'whiteout']
  },

  events: [
    { id: 'BUFFALO_SKYWAY_BACKUP', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Crews are working on the Skyway and the lakeshore bridges this week.',
      title: 'The Skyway is a parking lot',
      body: 'A wreck on the Skyway has traffic backed up all the way to the lake the night of your show. The bands and the kids from the south and the border side are stuck in it.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'It never cleared. The ones on the far side stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads came together the long way. They will remember that.' }
      ] }
  ]
});
