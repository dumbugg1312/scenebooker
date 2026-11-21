SB.Cities.register('providence', {
  v: 1,
  slug: 'providence',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['brown university', 'rhode island school of design', 'risd', 'providence college', 'johnson & wales', 'johnson and wales', 'rhode island college', 'university of rhode island',
           'uri', 'bryant university', 'salve regina', 'roger williams university', 'community college of rhode island', 'providence journal', 'projo', 'providence phoenix',
           'rhode island monthly', 'motif magazine', 'boston globe', 'wbru', 'wriu', 'wprb', 'wlnk', 'wpri', 'wjar', 'providence bruins', 'pawtucket red sox', 'pawsox',
           'rhode island fc', 'waterfire', 'amica mutual pavilion', 'dunkin donuts center', 'providence place', 'rhode island convention center', 'rhode island state house',
           'newport folk festival', 'newport jazz festival', 'lifespan', 'care new england', 'cvs health', 'textron', 'citizens bank', 'gtech', 'naval station newport',
           'naval war college', 'hurricane carol', 'hurricane bob', 'hurricane sandy', 'great hurricane of 1938', 'station nightclub', 'fete', 'lupo\'s', 'fort thunder'],
  blocklist: ['providence journal*', 'projo*', 'waterfire*', 'fort thunder*', 'lupos heartbreak*', 'risd*', 'brown university*'],

  blurb: ['A tiny old mill port at the head of the bay where everyone is twenty minutes from everyone. Art-school weirdos and working-class punks share the same corner of the same loft.',
          'The old-timers say the good rooms are gone. The kids book the same corner of the mill district anyway, and the same few hundred faces find the next basement.'],
  hard: 'Landlords and neighbors keep killing the good rooms; every show is a favor.',
  region: 'New England',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  chokepoints: [
    { id: 'east-bay-bridge', name: 'the big river bridge to the east side', p: .03 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Providence' },
    { id: 'pawtucket', kind: 'FEEDER', name: 'Pawtucket', minutes: 10, bearing: 20, note: 'The mill town on the line and the cheap-rent twin of the city. Bands and warehouse spaces.' },
    { id: 'east-providence', kind: 'FEEDER', name: 'East Providence', minutes: 10, bearing: 110, beyond: 'east-bay-bridge', note: 'Across the river. Working-class kids who drive in.' },
    { id: 'cranston', kind: 'FEEDER', name: 'Cranston', minutes: 15, bearing: 195, note: 'Suburban basements and garages. The kids come in by car.' },
    { id: 'johnston', kind: 'FEEDER', name: 'Johnston and North Providence', minutes: 15, bearing: 285, note: 'Older suburbs full of garage bands.' },
    { id: 'warwick', kind: 'FEEDER', name: 'Warwick', minutes: 20, bearing: 185, note: 'A big suburb of malls and highway. Teens come up, and a few bands.' },
    { id: 'woonsocket', kind: 'FEEDER', name: 'Woonsocket', minutes: 25, bearing: 330, note: 'An old mill town with a small, stubborn crowd.' },
    { id: 'attleboro', kind: 'FEEDER', name: 'Attleboro', state: 'MA', minutes: 25, bearing: 50, note: 'A border town over the state line. Teens and a few bands.' },
    { id: 'fall-river', kind: 'FEEDER', name: 'Fall River', state: 'MA', minutes: 35, bearing: 130, beyond: 'east-bay-bridge', note: 'A loud, cheap mill city. People come in for shows.' },
    { id: 'newport', kind: 'FEEDER', name: 'Newport', minutes: 40, bearing: 170, note: 'A summer tourist island. A few kids drive up.' },
    { id: 'worcester', kind: 'PEER', name: 'Worcester', state: 'MA', minutes: 45, bearing: 335, slug: 'worcester-ma', note: 'A scene of similar size, with house and club shows and a lot of bill swapping.' },
    { id: 'hartford', kind: 'PEER', name: 'Hartford', state: 'CT', minutes: 60, bearing: 275, slug: 'hartford', note: 'Shared fill dates along the Route 6 line.' },
    { id: 'new-haven', kind: 'PEER', name: 'New Haven', state: 'CT', minutes: 75, bearing: 245, slug: 'new-haven-ct', note: 'Older, with a deeper DIY network.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Bars, clubs and the arts district, and the rooms that reopen under new names.' },
    { id: 'olneyville', name: 'Olneyville', route: 'work-side', note: 'Old mill buildings, cheap rent, house venues and big warehouse lofts. The likeliest place for a loud room.' },
    { id: 'elmhurst', name: 'Elmhurst', route: 'old-side', note: 'A quiet residential pocket by the colleges, where a basement ran for years until the landlord evicted the tenants.' },
    { id: 'fox-point', name: 'Fox Point', route: 'old-side', note: 'Cape Verdean and Portuguese roots, now student and young-worker housing near the water.' },
    { id: 'federal-hill', name: 'Federal Hill', route: 'downtown', note: 'An old Italian neighborhood with a restaurant strip. Noisy at night, and strict about it.' },
    { id: 'smith-hill', name: 'Smith Hill', route: 'work-side', note: 'Rowhouses and triple-deckers, cheap and close to the highway.' },
    { id: 'elmwood', name: 'Elmwood', route: 'work-side', note: 'Industrial and residential south of downtown: warehouses and body shops.' },
    { id: 'valley-falls', name: 'Valley Falls', route: 'work-side', note: 'Mill buildings along the river over the line: lofts and rehearsal rooms.' },
    { id: 'mount-pleasant', name: 'Mount Pleasant', route: 'campus', note: 'Hillside homes near a commuter college, with plenty of basements.' },
    { id: 'college-hill', name: 'College Hill', route: 'campus', note: 'The elite college slope: big old houses and noise complaints.' }
  ],

  contacts: ['worcester-ma', 'hartford', 'new-haven-ct', 'boston'],

  points: [
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06, pop: 4900000 },
    { name: 'New London', state: 'CT', lat: 41.36, lon: -72.1, pop: 27000 },
    { name: 'Hyannis', state: 'MA', lat: 41.65, lon: -70.29, pop: 14000 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01, pop: 19900000 }
  ],
  roads: ['I-95', 'I-195', 'I-295', 'Route 6'],

  words: {
    street: ['Broadway', 'Atwells Avenue', 'Westminster Street', 'Washington Street', 'Eddy Street', 'Hope Street'],
    water: ['Narragansett Bay', 'the Providence River', 'the Seekonk', 'the Woonasquatucket'],
    hood: ['Olneyville', 'Elmhurst', 'Fox Point', 'Federal Hill', 'Smith Hill', 'Elmwood', 'Valley Falls', 'Mount Pleasant', 'College Hill'],
    thing: ['triple-decker', 'mill loft', 'coffee milk', 'hurricane barrier', 'freight elevator', 'one-way street'],
    weather: ['nor\'easter', 'ice storm', 'damp cold']
  },

  events: [
    { id: 'PROVIDENCE_BRIDGE_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Crews have the lanes on the big river bridge down to one.',
      title: 'The bridge is down to one lane',
      body: 'An inspection has closed most of the bridge to the east side. Everyone coming from across the river, and from the mill city beyond, is stuck in the line.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the line', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors an hour early. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people from across the river.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The line never cleared. The east side stayed home.' },
        { id: 'RIDES', label: 'Organize rides the long way round', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads came round by the back streets together. They will remember that.' }
      ] }
  ]
});
