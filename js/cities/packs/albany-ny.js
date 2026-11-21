SB.Cities.register('albany-ny', {
  v: 1,
  slug: 'albany-ny',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university at albany', 'suny albany', 'ualbany', 'suny', 'rensselaer polytechnic institute', 'rpi', 'union college', 'siena college', 'the college of saint rose', 'skidmore college', 'hudson valley community college', 'hvcc', 'albany law school', 'albany medical college', 'albany medical center', 'times union', 'the daily gazette', 'metroland', 'wamc', 'wnyt', 'news10', 'nys music', 'albany devils', 'albany firewolves', 'albany river rats', 'tri-city valleycats', 'saratoga race course', 'travers stakes', 'nys assembly', 'empire state plaza', 'state university of new york', 'general electric', 'globalfoundries', 'albany airport', 'tulip festival', 'albany tulip fest', 'dunn memorial bridge', 'patroon island bridge', 'new york state capitol'],
  blocklist: ['times union*', 'metroland*', 'empire state plaza*', 'saratoga race*', 'tulip fest*', 'albany medical*'],

  blurb: ['Albany, Troy and Schenectady share one small, close hardcore scene that mixes styles on every bill and still mourns the rooms it lost.',
          'Everyone is in three bands. Bands from here have gone national, but the winter drive on the Northway is the problem.'],
  hard: 'One or two rooms carry everything, and touring bands skip you.',
  region: 'the Northeast',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 },
    { name: 'New York City', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Montreal', state: 'QC', lat: 45.5, lon: -73.57 }
  ],
  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'Hardcore carries the scene and its bills.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Albany' },
    { id: 'troy', kind: 'FEEDER', name: 'Troy', minutes: 15, bearing: 5, beyond: 'river-bridges', note: 'The closest sister city across the river, with shows, rooms, kids and bands.' },
    { id: 'schenectady', kind: 'FEEDER', name: 'Schenectady', minutes: 20, bearing: 305, note: 'A second hub northwest with bands and a few houses.' },
    { id: 'cohoes', kind: 'FEEDER', name: 'Cohoes and Watervliet', minutes: 15, bearing: 355, beyond: 'river-bridges', note: 'Mill-town rowhouses, a few bands and low rent.' },
    { id: 'rensselaer', kind: 'FEEDER', name: 'Rensselaer and East Greenbush', minutes: 10, bearing: 95, beyond: 'river-bridges', note: 'Across the river; suburb kids.' },
    { id: 'clifton-park', kind: 'FEEDER', name: 'Clifton Park', minutes: 25, bearing: 355, note: 'A big suburb full of teenagers who play in bands.' },
    { id: 'saratoga', kind: 'FEEDER', name: 'Saratoga Springs', minutes: 35, bearing: 5, note: 'A rich resort town with a young bar scene; kids drive down.' },
    { id: 'hudson', kind: 'FEEDER', name: 'Hudson', minutes: 45, bearing: 170, note: 'A small arts town south on the river.' },
    { id: 'glens-falls', kind: 'FEEDER', name: 'Glens Falls and Queensbury', minutes: 55, bearing: 5, note: 'North up the Northway, with a small scene of its own.' },
    { id: 'burlington', kind: 'PEER', name: 'Burlington', state: 'VT', minutes: 150, bearing: 5, slug: 'burlington-vt', note: 'Smaller and farther north.' },
    { id: 'utica', kind: 'PEER', name: 'Utica', minutes: 85, bearing: 290, slug: 'utica-ny', note: 'Smaller, down the Thruway.' },
    { id: 'poughkeepsie', kind: 'PEER', name: 'Poughkeepsie', minutes: 80, bearing: 175, slug: 'poughkeepsie-ny', note: 'Downriver.' },
    { id: 'syracuse', kind: 'PEER', name: 'Syracuse', minutes: 135, bearing: 275, slug: 'syracuse-ny', note: 'A similar-size scene.' }
  ],

  chokepoints: [{ id: 'river-bridges', name: 'the river bridges to Troy and Rensselaer', p: 0.03 }],

  hoods: [
    { id: 'lark-street', name: 'Lark Street and Center Square', route: 'downtown', note: 'Bars, tattoo shops and rowhouses; the nightlife strip, mostly 21+ rooms.' },
    { id: 'pine-hills', name: 'Pine Hills', route: 'campus', note: 'Student rentals and big old houses; where basement and living-room shows start.' },
    { id: 'central-ave', name: 'Central Avenue', route: 'work-side', note: 'A long strip of cheap storefronts and a couple of rooms that take loud music.' },
    { id: 'south-end', name: 'the South End', route: 'work-side', note: 'Cheap rowhouses and industrial lots near the river. Low rent, few neighbors to complain.' },
    { id: 'arbor-hill', name: 'Arbor Hill and West Hill', route: 'old-side', note: 'Old row housing and church halls. Shows are rare, rents are low.' },
    { id: 'troy', name: 'downtown Troy', route: 'old-side', note: 'Brick storefronts across the river, an arts and bar scene, and a real room again.' },
    { id: 'lansingburgh', name: 'Lansingburgh', route: 'old-side', note: 'Rowhouses and small old halls, cheap.' },
    { id: 'stockade', name: 'Schenectady, the Stockade and Hamilton Hill', route: 'work-side', note: 'A second hub twenty minutes northwest with old houses and storefronts.' },
    { id: 'delmar', name: 'Delmar and Slingerlands', route: 'campus', note: 'A quiet suburb; kids who drive in on Fridays.' }
  ],

  contacts: ['burlington-vt', 'utica-ny', 'poughkeepsie-ny', 'syracuse-ny'],

  points: [
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06, pop: 4900000 },
    { name: 'New York City', state: 'NY', lat: 40.71, lon: -74.01, pop: 19000000 },
    { name: 'Montreal', state: 'QC', lat: 45.5, lon: -73.57, pop: 4300000 },
    { name: 'Saratoga Springs', state: 'NY', lat: 43.08, lon: -73.78, pop: 28000 }
  ],
  roads: ['I-90', 'I-87', 'I-787', 'I-88', 'Central Avenue', 'Western Avenue'],

  words: {
    street: ['Central Avenue', 'Lark Street', 'Washington Avenue', 'Madison Avenue', 'Western Avenue', 'Delaware Avenue'],
    water: ['the Hudson', 'the Mohawk'],
    hood: ['Pine Hills', 'Arbor Hill', 'Lansingburgh', 'Center Square', 'Delmar', 'Cohoes'],
    thing: ['Northway', 'brownstone', 'bridge', 'capitol parking', 'snow squall'],
    weather: ['snow squall', 'ice on the Northway']
  },

  events: [
    { id: 'ALBANY_NY_BRIDGE_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Crews are working on a river bridge between Albany and Troy this week.',
      title: 'The bridge is shut',
      body: 'A river bridge is closed for repairs the night of your show. The bands and the kids from Troy and across the river have to go the long way around.',
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
