SB.Cities.register('kingsport-tn', {
  v: 1,
  slug: 'kingsport-tn',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['eastman chemical', 'eastman', 'holston army ammunition plant', 'holston army', 'bae systems', 'lincoln memorial university', 'northeast state',
           'east tennessee state university', 'etsu', 'milligan', 'tusculum', 'university of virginia\'s college at wise', 'college at wise',
           'pal\'s sudden service', 'pal\'s', 'waffle house', 'hardee\'s', 'mountain dew', 'fun fest', 'santa train', 'rhythm and roots', 'bristol motor speedway',
           'kingsport times-news', 'times-news', 'wkpt', 'whhg', 'whgg', 'dobyns-bennett', 'dobyns bennett', 'creeper trail', 'barter theatre', 'model city',
           'the fellowship annex', 'fellowship annex', 'circle room', 'holston door', 'model city hall of records', 'the fourth shift', 'fourth shift',
           'long island social club', 'warrior\'s carport', 'lee highway roller rink', 'the pressroom at stone drive', 'greenbelt pavilion annex',
           'cliffside upstairs', 'the derby lanes', 'derby lanes',
           'santa\'s depot', 'bristol rhythm and roots', 'rhythm & roots', 'bristol dragway', 'bristol herald courier', 'kingsport times news', 'visit kingsport',
           'jettie baker center', 'niswonger performing arts center', 'meadowview', 'wuot', 'sunset concert series', 'j. fred johnson stadium', 'drkmttr',
           'nameless fest', 'bandsintown', 'eventbrite'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The chemical plant is written only as 'the plant'. */
  blocklist: ['waffle house*', 'hardee*', 'dobyns*', 'fun fest*', 'santa train*', 'east tennessee state*'],

  blurb: ['A planned company town in the East Tennessee mountains where the big chemical plant sets the shifts and the church steeples set the skyline.',
          'Shows live in garages, church halls and one patient parent\'s carport. Kids drive to the college town for bigger nights and come home loyal.'],
  hard: 'Small crowd, no campus, and the bigger town down the road takes your night.',
  region: 'Appalachia',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Knoxville', state: 'TN', lat: 35.96, lon: -83.92 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Kingsport' },
    { id: 'mount-carmel', kind: 'FEEDER', name: 'Mount Carmel', minutes: 10, bearing: 270, note: 'A small town bordering Kingsport on the west; different police, same crowd.' },
    { id: 'church-hill', kind: 'FEEDER', name: 'Church Hill', minutes: 15, bearing: 265, note: 'A bedroom town up US 11W.' },
    { id: 'gate-city', kind: 'FEEDER', name: 'Gate City', state: 'VA', minutes: 15, bearing: 350, note: 'A tiny Virginia county seat across the line with a hollowed-out downtown.' },
    { id: 'bristol', kind: 'FEEDER', name: 'Bristol', minutes: 25, bearing: 80, note: 'A town split by the state line; kids cross both ways.' },
    { id: 'johnson-city', kind: 'FEEDER', name: 'Johnson City', minutes: 25, bearing: 150, slug: 'johnson-city-tn', note: 'The nearest college town, where the bigger scene is and where touring bands stop first.' },
    { id: 'rogersville', kind: 'FEEDER', name: 'Rogersville', minutes: 40, bearing: 250, note: 'An old county seat, farm and small-town.' },
    { id: 'elizabethton', kind: 'FEEDER', name: 'Elizabethton', minutes: 35, bearing: 115, note: 'A former mill town with a few devoted kids.' },
    { id: 'abingdon', kind: 'FEEDER', name: 'Abingdon', state: 'VA', minutes: 40, bearing: 65, note: 'An arts and tourist town more than a punk one.' },
    { id: 'greeneville', kind: 'FEEDER', name: 'Greeneville', minutes: 60, bearing: 215, note: 'An old Appalachian county seat with a small college nearby.' },
    { id: 'morristown', kind: 'PEER', name: 'Morristown', minutes: 60, bearing: 235, scene: 600, note: 'An industrial town with a similar feel; a plausible trading partner.' },
    { id: 'asheville', kind: 'PEER', name: 'Asheville', state: 'NC', minutes: 105, bearing: 150, slug: 'asheville-nc', note: 'Over the mountains on I-26: a famous scene, more a draw than an equal.' },
    { id: 'roanoke', kind: 'PEER', name: 'Roanoke', state: 'VA', minutes: 150, bearing: 70, slug: 'roanoke-va', note: 'Up I-81 in Virginia; a long drive but a real stop on the circuit.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Kingsport', route: 'downtown', note: 'The tidy planned center: nicest, most policed, and less tolerant of loud shows.' },
    { id: 'riverfront', name: 'the riverfront and Cliffside', route: 'work-side', note: 'Plant fences, parks and trails along the river, with warehouse and light-industrial units.' },
    { id: 'lynn-garden', name: 'Lynn Garden', route: 'old-side', note: 'Working-class streets of small old houses to the northeast; backyards and garages.' },
    { id: 'colonial-heights', name: 'Colonial Heights', route: 'campus', note: 'Suburban sprawl by the interstate: motels, chain stops, garages and older basements.' },
    { id: 'stone-drive', name: 'the Stone Drive strip', route: 'work-side', note: 'Dying retail strips where vacant units could be cheap practice or show space.' },
    { id: 'orebank', name: 'Orebank and Fairacres', route: 'old-side', note: 'Ordinary mixed-age streets with carports and close neighbors.' },
    { id: 'bloomingdale', name: 'Bloomingdale and the county edge', route: 'campus', note: 'Rural-suburban land, barns and yards with no neighbors in earshot.' }
  ],

  contacts: ['johnson-city-tn', 'asheville-nc', 'roanoke-va', 'knoxville-tn'],

  calendar: [
    { id: 'july-fest', label: 'the July street festival', tag: 'festival', month: 7, weeks: [3, 4], dows: [4, 5], can: [.85, .85, .80], hoods: ['downtown', 'riverfront'], elsewhere: [1, .95, .95] },
    { id: 'holiday-train', label: 'the holiday train', tag: 'parade', month: 11, weeks: [3, 4], dows: [5], can: [.85, .85, .80], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'roots-fest', label: 'the roots festival', tag: 'festival', month: 9, weeks: [2, 3], dows: [4, 5, 6], can: [.92, .88, .85] },
    { id: 'race-spring', label: 'race weekend', tag: 'race', month: 4, week: 2, dows: [4, 5, 6], can: [.92, .90, .88] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 4], dows: [4], can: [.80, .90, .90] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [4], can: [.80, .90, .90] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1440, weekend: 1440, inForce: false } },

  points: [
    { name: 'Knoxville', state: 'TN', lat: 35.96, lon: -83.92, pop: 900000 },
    { name: 'Asheville', state: 'NC', lat: 35.6, lon: -82.55, pop: 470000 },
    { name: 'Roanoke', state: 'VA', lat: 37.27, lon: -79.94, pop: 315000 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 2700000 }
  ],
  roads: ['I-26', 'I-81', 'US 23', 'US 11W', 'I-181'],

  words: {
    street: ['Stone Drive', 'Fort Henry Drive', 'Broad Street', 'Lee Highway', 'the Quillen Parkway'],
    water: ['the Holston', 'the South Fork', 'Boone Lake'],
    hood: ['Lynn Garden', 'Colonial Heights', 'Orebank', 'Fairacres', 'Cliffside', 'Allandale', 'Bloomingdale', 'Riverview'],
    thing: ['shift change', 'pinto beans and cornbread', 'drive-through', 'church camp', 'fellowship hall', 'stack', 'greenbelt', 'carpool', 'football Friday'],
    weather: ['mountain fog', 'ice storm']
  },

  events: [
    { id: 'KINGSPORT_TN_CARPORT_NEIGHBOR', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The carport show is running long and the neighbor across the narrow street keeps looking out the window.',
      title: 'The neighbor at the property line',
      body: 'A woman is standing at the property line with her phone out. Whether the sheriff or the city police come depends on which side of the line she calls.',
      options: [
        { id: 'QUIET', label: 'Turn it down and finish acoustic', likely: 'Everyone stays, and the neighbor goes inside.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The last bands played quiet, and the neighbor shut her door.' },
        { id: 'END', label: 'End it early before anyone calls', likely: 'It\'s a short night, and nobody is hurt.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'You cut the set list, and everyone was home before it got late.' },
        { id: 'ACCEPT', label: 'Play on', likely: 'It stays loud, and someone will call.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'MONEY', amount: -25 }],
          result: 'The cruiser rolled up at the last song, and the crowd scattered.' }
      ] },

    { id: 'KINGSPORT_TN_FESTIVAL_BARN', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The street festival has every downtown room blocked and a storm is on the radar.',
      title: 'The festival takes the hall',
      body: 'The nine-day festival has taken every downtown block. A barn out past Bloomingdale has opened up, but a thunderstorm is forecast and there\'s only one tarp.',
      options: [
        { id: 'BARN', label: 'Move the bill to the barn', likely: 'There are no neighbors to hear it, but the weather is a gamble.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'OUTDOOR', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The bill fit under the barn roof, and the storm held off until the last song.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date, which costs you trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the festival crowd had gone home.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'It\'s a block-long walk past the barricades.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Load-in was on foot, and the crowd was whoever could park.' }
      ] },

    { id: 'KINGSPORT_TN_HOLIDAY_TRAIN', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'Downtown is closed to cars on the Saturday before Thanksgiving.',
      title: 'Behind the barricades',
      body: 'The hall you booked is a block inside the barricades for the holiday train. Load-in is on foot and the crowd will be families.',
      options: [
        { id: 'CARRY', label: 'Carry the gear in on foot', likely: 'It\'s a long night for the van and the drummer.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'It took two hours of carrying amps past strollers, and the show went fine.' },
        { id: 'LATE', label: 'Push doors back until the crowds are gone', likely: 'It starts late, but the street is clear.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors were an hour late, and the street was empty by then.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date, which costs you trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] }
  ]
});
