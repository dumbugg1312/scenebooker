SB.Cities.register('knoxville-tn', {
  v: 1,
  slug: 'knoxville-tn',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of tennessee', 'tennessee volunteers', 'vols', 'tennessee valley authority', 'tva', 'oak ridge national laboratory', 'ornl', 'y-12',
           'pellissippi state', 'carson-newman', 'maryville college', 'lincoln memorial university', 'knox news', 'knoxville news sentinel', 'metro pulse',
           'knoxville mercury', 'wbir', 'wate', 'wvlt', 'wuot', 'neyland stadium', 'thompson-boling arena', 'tennessee theatre', 'dollywood', 'covenant health',
           'university of tennessee medical center', 'pilot company', 'clayton homes', 'scripps', 'bijou theatre', 'tennessee valley fair', 'rhythm n blooms',
           'big ears', 'great smoky mountains national park', 'market square', 'sundown in the city'],
  blocklist: ['rhythm n blooms*', 'big ears festival*', 'knoxville mercury*', 'metro pulse*', 'bijou theatre*', 'tennessee theatre*'],

  blurb: ['A river valley under the mountains where a few old punk houses and a deli patio keep the all-ages tradition alive.',
          'Everyone knows the person on the door. Football Saturdays eat the calendar, and the students leave every May.'],
  hard: 'Football Saturdays, the summer exodus and few rooms that take kids.',
  region: 'the Mid-South',
  houseType: 'LIVING_ROOM',
  whereGo: [
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Knoxville' },
    { id: 'maryville', kind: 'FEEDER', name: 'Maryville', minutes: 25, bearing: 195, note: 'A small college town. Kids drive in.' },
    { id: 'clinton', kind: 'FEEDER', name: 'Clinton and Powell', minutes: 25, bearing: 340, note: 'Northern bedroom suburbs.' },
    { id: 'oak-ridge', kind: 'FEEDER', name: 'Oak Ridge', minutes: 30, bearing: 295, note: 'A science town. Educated, nerdy, with metal and indie kids.' },
    { id: 'lenoir-city', kind: 'FEEDER', name: 'Lenoir City', minutes: 30, bearing: 235, note: 'A lake bedroom town.' },
    { id: 'sevierville', kind: 'FEEDER', name: 'Sevierville', minutes: 40, bearing: 105, note: 'A tourist strip. Few kids, some bands.' },
    { id: 'morristown', kind: 'FEEDER', name: 'Morristown', minutes: 50, bearing: 60, note: 'A small factory town. Rides in.' },
    { id: 'bean-station', kind: 'FEEDER', name: 'Bean Station', minutes: 50, bearing: 55, note: 'Rural. A tiny house-show spot has been mentioned.' },
    { id: 'johnson-city', kind: 'PEER', name: 'Johnson City', minutes: 100, bearing: 55, slug: 'johnson-city-tn', note: 'A college town with a small loud scene.' },
    { id: 'kingsport', kind: 'PEER', name: 'Kingsport', minutes: 105, bearing: 55, slug: 'kingsport-tn', note: 'Smaller, up the valley.' },
    { id: 'chattanooga', kind: 'PEER', name: 'Chattanooga', minutes: 110, bearing: 220, slug: 'chattanooga-tn', note: 'A similar size on a different river.' },
    { id: 'asheville', kind: 'PEER', name: 'Asheville', state: 'NC', minutes: 120, bearing: 130, slug: 'asheville-nc', note: 'Arty. A fill date over the mountains.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Bars, restaurants and a few listening rooms. The legitimate small-club zone.' },
    { id: 'old-city', name: 'the Old City', route: 'downtown', note: 'Brick warehouses turned bars by the rail line. Mid-sized rooms.' },
    { id: 'fort-sanders', name: 'Fort Sanders', route: 'campus', note: 'Student housing in old Victorians by the university. House shows.' },
    { id: 'fourth-gill', name: 'Fourth and Gill', route: 'old-side', note: 'Old streets north of downtown where a longtime punk house sits.' },
    { id: 'south-knoxville', name: 'South Knoxville', route: 'old-side', note: 'Across the river. An artist crowd and cheaper houses.' },
    { id: 'happy-holler', name: 'Happy Holler and Parkridge', route: 'old-side', note: 'Bungalows and coffeehouses north and east of downtown.' },
    { id: 'western', name: 'Western Avenue and Papermill', route: 'work-side', note: 'Warehouses, auto shops and cheaper rent.' },
    { id: 'east-knoxville', name: 'East Knoxville', route: 'work-side', note: 'Lower income, older housing stock.' },
    { id: 'west-knoxville', name: 'West Knoxville and Bearden', route: 'campus', note: 'Suburban. An early all-ages house venue was out here.' }
  ],

  points: [
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78, pop: 2197416 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 6400000 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 2938830 },
    { name: 'Lexington', state: 'KY', lat: 38.04, lon: -84.46, pop: 535174 }
  ],
  roads: ['I-40', 'I-75', 'I-640', 'I-275', 'Kingston Pike', 'Chapman Highway'],

  words: {
    street: ['Gay Street', 'Cumberland Avenue', 'Kingston Pike', 'Chapman Highway', 'Central Avenue', 'Magnolia Avenue'],
    water: ['the Tennessee River', 'the Holston', 'the French Broad'],
    hood: ['Fort Sanders', 'Fourth and Gill', 'Happy Holler', 'Parkridge', 'Papermill', 'Bearden', 'Sequoyah Hills', 'South Knoxville'],
    thing: ['porch', 'orange', 'valley fog', 'deli patio', 'rail line', 'night shift', 'dogwood'],
    weather: ['ice storm', 'valley fog', 'leaf traffic']
  },

  events: [
    { id: 'KNOXVILLE_TN_YARD_RAIN', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 2], weather: 'RAIN', months: [4, 5, 6, 7, 8, 9, 10] },
      telegraph: 'Rain is coming in off the mountains on show night.',
      title: 'The yard show is a kitchen show',
      body: 'The porch show on the hill street is getting rained on. The roommates rented the house for the year and want to know what you plan to do about the kitchen.',
      options: [
        { id: 'INSIDE', label: 'Pack everyone into the kitchen and front room', likely: 'Loud, tight and a little damp.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .6 }, { op: 'REGULARS', pct: .02 }],
          result: 'Forty people in a kitchen. The neighbors will hear about this one.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The sky was clear and fewer people could come.' },
        { id: 'TARP', label: 'Hang a tarp and play on', likely: 'Costs thirty dollars. The crowd thins.',
          effects: [{ op: 'MONEY', amount: -30 }, { op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The tarp sagged and dripped on the drummer. The room stayed half full.' }
      ] }
  ]
});
