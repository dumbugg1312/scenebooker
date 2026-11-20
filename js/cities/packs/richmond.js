SB.Cities.register('richmond', {
  v: 1,
  slug: 'richmond',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['virginia commonwealth university', 'vcu', 'university of richmond', 'virginia union university', 'richmond folk festival', 'richmond marathon', 'style weekly',
           'rva magazine', 'richmond magazine', 'axios richmond', 'richmond free press', 'commonwealth times', 'food not bombs', 'duke\'s mayonnaise', 'dukes mayonnaise',
           'pulse bus rapid transit', 'csx', 'amtrak', 'nascar', 'flying squirrels', 'fort lee', 'fort gregg-adams', 'tropical storm gaston', 'hurricane isabel',
           'waffle house', 'vfw', 'american legion',
           'cobblestone cellar', 'the fall line room', 'nickel bridge social hall', 'hermitage road warehouse', 'the floodwall annex', 'rocketts dockhouse',
           'mulberry street basement', 'church hill parish cellar', 'manchester slab', 'the pipeline porch', 'lombardy lot', 'ginter park garage',
           'belle isle boathouse', 'forest hill footbridge club', 'the slip back room'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The 2004 flood is 'the storm of 2004' in game text. */
  blocklist: ['richmond folk festival*', 'richmond marathon*', 'style weekly*', 'rva magazine*', 'food not bombs*', 'waffle house*', 'nascar*'],

  blurb: ['Houses come and go and the old heads keep the stories. Rent and shared rowhouse walls decide what lasts.',
          'A long, proud hardcore and zine memory, a legal downtown room for the big nights, and a warehouse that is now a taproom.'],
  hard: 'Cheap rooms vanish to rent and noise; the legal ones skip kids.',
  region: 'the I-95 corridor',
  houseType: 'ROWHOUSE',
  whereGo: [
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  tilt: [
    { fan: 'crust', band: 'hardcore', d: .10, reason: 'A town with a long memory for hardcore, crust and d-beat.' },
    { fan: 'hardcore', band: 'crust', d: .10, reason: 'A town with a long memory for hardcore, crust and d-beat.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Richmond' },
    { id: 'ashland', kind: 'FEEDER', name: 'Ashland', minutes: 20, bearing: 355, beyond: 'i95-tangle', note: 'A small railroad town north on I-95 with a liberal-arts college. Its kids are in the city every weekend.' },
    { id: 'chester', kind: 'FEEDER', name: 'Colonial Heights and Chester', minutes: 25, bearing: 185, beyond: 'i95-tangle',
      note: 'Strip-mall suburbs with church youth groups and teenagers with garages. A pop-punk and metal pipeline.' },
    { id: 'petersburg', kind: 'FEEDER', name: 'Petersburg', minutes: 30, bearing: 183, beyond: 'i95-tangle',
      note: 'An old industrial and railroad city, hit hard, with young artists arriving and cheap rooms.' },
    { id: 'hopewell', kind: 'FEEDER', name: 'Hopewell and Prince George', minutes: 35, bearing: 160,
      note: 'A chemical-plant river town and a base nearby. Few places to go; the kids ride in for shows.' },
    { id: 'williamsburg', kind: 'FEEDER', name: 'Williamsburg', minutes: 50, bearing: 115, note: 'An old college town and tourist trap: students, service workers and a lot of cover bands.' },
    { id: 'fredericksburg', kind: 'FEEDER', name: 'Fredericksburg', minutes: 60, bearing: 358, beyond: 'i95-tangle',
      note: 'A college town and DC commuter town on I-95, with a small scene of its own. The road is always congested.' },
    { id: 'farmville', kind: 'FEEDER', name: 'Farmville', minutes: 60, bearing: 250, note: 'A small college town in tobacco and farm country. The kids want out.' },
    { id: 'tappahannock', kind: 'FEEDER', name: 'Tappahannock and the Northern Neck', minutes: 60, bearing: 55, note: 'Rural tidewater. Nothing for teenagers, so they drive a long way for a show.' },
    { id: 'newport-news', kind: 'FEEDER', name: 'Newport News and Hampton', minutes: 70, bearing: 125, note: 'Shipyard and military kids with a scene of their own, who come up for a bigger bill.' },
    { id: 'emporia', kind: 'FEEDER', name: 'Emporia and South Hill', minutes: 80, bearing: 195, note: 'Farm and highway towns near the North Carolina line. Kids with trucks and nowhere to go.' },
    { id: 'waynesboro', kind: 'FEEDER', name: 'Waynesboro and Staunton', minutes: 90, bearing: 288, note: 'Valley towns at the foot of the Blue Ridge: small, rural and arty, a few kids with vans.' },
    { id: 'charlottesville', kind: 'PEER', name: 'Charlottesville', minutes: 70, bearing: 290, slug: 'charlottesville-va',
      note: 'The rich college-town sister, with a decent scene and mutual respect.' },
    { id: 'norfolk', kind: 'PEER', name: 'Norfolk and Virginia Beach', minutes: 90, bearing: 125, scene: 6000, note: 'The 757: a Navy, beach and port scene of its own. More rival than feeder, though kids do come up.' },
    { id: 'lynchburg', kind: 'PEER', name: 'Lynchburg', minutes: 110, bearing: 255, slug: 'lynchburg-va', note: 'A blue-collar mill city with a big evangelical university, and a hardcore and metal tradition for its size.' },
    { id: 'harrisonburg', kind: 'PEER', name: 'Harrisonburg', minutes: 120, bearing: 309, slug: 'harrisonburg-va', note: 'A college town with a strong DIY scene of its own. A stretch for a weeknight, but possible.' },
    { id: 'durham', kind: 'PEER', name: 'Durham and Raleigh', state: 'NC', minutes: 150, bearing: 205, slug: 'durham-nc', note: 'The next scene down I-85. A secondary pull for bands that leave.' }
  ],

  chokepoints: [                                // which zones each one cuts is said by the zones' `beyond`, above
    { id: 'i95-tangle', name: 'the I-95 and I-64 overlap downtown', p: .03 }
  ],

  hoods: [
    { id: 'oregon-hill', name: 'Oregon Hill', route: 'old-side', note: 'Small brick rowhouses on a bluff above the river, a working-class neighborhood with a long punk overlay. Squeezed by the university and new apartments.' },
    { id: 'fan', name: 'the Fan', route: 'campus', note: 'Victorian rowhouses in a wedge west of downtown: group houses, porches, cobblestone alleys and bars. Priced past broke.' },
    { id: 'monroe', name: 'Monroe Park and Grace Street', route: 'campus', note: 'The campus corridor. The university has bought up much of the old bar and restaurant row; fewer weird rooms every year.' },
    { id: 'carytown', name: 'Carytown and the Museum District', route: 'old-side', note: 'A long strip of indie shops and restaurants, with houses and yards behind. Older, complaint-prone residents and the strictest noise rules.' },
    { id: 'scotts', name: 'Scott\'s Addition', route: 'work-side', note: 'Old warehouses now full of breweries and condos. Rehearsal rooms and warehouse shows used to be here.' },
    { id: 'jackson-ward', name: 'Jackson Ward', route: 'downtown', note: 'The historic Black neighborhood downtown, scarred by the expressway: old commercial buildings, rowhouses and new lofts. Contested.' },
    { id: 'shockoe', name: 'Shockoe Bottom', route: 'downtown', note: 'Low-lying old tobacco-warehouse blocks east of downtown: bars, clubs, big rooms, and the part of the city that floods.' },
    { id: 'church-hill', name: 'Church Hill', route: 'old-side', note: 'A hilltop of cobblestones and old rowhouses. Expensive on the west side, rougher toward the East End; church halls and group houses.' },
    { id: 'manchester', name: 'Manchester and the Southside', route: 'work-side', note: 'Across the river: warehouses turning to lofts and breweries, garages and backyards. Cheaper than the north side, but not for long.' },
    { id: 'northside', name: 'the Northside', route: 'work-side', note: 'Highland Park, Barton Heights and Ginter Park: big frame houses, the cheapest rents in the city and almost no nightlife.' }
  ],

  rooms: [
    { id: 'hill-basement', kind: 'HOUSE', hood: 'oregon-hill', cap: 55, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 25, standing: [70, 60, 45],
      pressure: 55, start: true, note: 'A basement under a rowhouse on the hill. Shared walls: after eleven, the neighbors are the whole problem.' },
    { id: 'fan-house', kind: 'HOUSE', hood: 'fan', cap: 40, hostCut: 0, pa: .3, curfew: 1380, ac: false, outdoor: false, sketch: 20, standing: [70, 55, 40], pressure: 55,
      note: 'A group house in the Fan. Porch shows in summer; the walls are shared and the neighbors have heard it all.' },
    { id: 'northside-garage', kind: 'HOUSE', hood: 'northside', cap: 45, hostCut: 0, pa: .4, curfew: 1380, outdoor: false, sketch: 20, standing: [65, 55, 45], pressure: 40,
      note: 'A big rented house with a garage on the north side. Fewer neighbors, farther from everything.' },
    { id: 'southside-yard', kind: 'OUTDOOR', hood: 'manchester', cap: 70, rent: 10, pa: .4, curfew: 1320, sketch: 30, standing: [60, 55, 40],
      note: 'A backyard on the Southside. Summer afternoons; the generator is the only thing that works in a storm.' },
    { id: 'church-hill-hall', kind: 'HALL', hood: 'church-hill', cap: 90, rent: 80, deposit: 0, pa: .5, curfew: 1320, ac: true, sketch: 5, standing: [65, 60, 60],
      owner: 'CHURCH_CONTACT', pressure: 50, note: 'A parish hall with a basement. Tuesdays only, and no beer.' },
    { id: 'vets-hall', kind: 'HALL', hood: 'manchester', cap: 150, rent: 200, deposit: 75, pa: .6, curfew: 1380, ac: true, sketch: 15, standing: [55, 60, 70],
      owner: 'HALL_MANAGER', note: 'A veterans\' hall on the Southside. A flat fee, folding chairs and a long list of rules.' },
    { id: 'hall-warehouse', kind: 'DIY', hood: 'scotts', cap: 140, rent: 90, deposit: 0, pa: .6, curfew: 1440, ac: false, sketch: 45, standing: [55, 60, 45], pressure: 60,
      needs: ['VOUCH'], note: 'A warehouse bay from the days before the breweries. Fewer every year.' },
    { id: 'river-warehouse', kind: 'DIY', hood: 'manchester', cap: 100, rent: 70, deposit: 0, pa: .5, curfew: 1440, ac: false, sketch: 40, standing: [55, 60, 45], pressure: 60,
      needs: ['VOUCH'], note: 'A riverside warehouse in Manchester. Cheaper than the north side, and being converted to lofts.' },
    { id: 'upstairs', kind: 'DIY', hood: 'jackson-ward', cap: 90, rent: 80, deposit: 0, pa: .5, curfew: 1380, ac: true, sketch: 30, standing: [60, 60, 50], pressure: 55,
      note: 'An upstairs room in an old commercial building. The neighborhood is changing, and the landlord knows it.' },
    { id: 'records', kind: 'SHOP', hood: 'carytown', cap: 40, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'The record store on the strip. In-stores in the afternoon, over by seven.' },
    { id: 'bottom-bar', kind: 'BAR', hood: 'shockoe', cap: 120, soundFee: 60, pa: .7, ages: ['ALL', 'A21'], matinee: true, curfew: 1560, ac: true, lowLying: true,
      following: .3, sketch: 20, standing: [45, 65, 70], note: 'A bar in the Bottom with a stage. Under 21 early; the cellar floods when it rains hard.' },
    { id: 'taproom', kind: 'BAR', hood: 'scotts', cap: 110, soundFee: 40, pa: .6, ages: ['ALL', 'A21'], curfew: 1380, ac: true, following: .3, sketch: 10,
      standing: [50, 65, 70], note: 'A taproom in an old warehouse. It wants a quiet band and an early night.' },
    { id: 'club', kind: 'CLUB', hood: 'shockoe', cap: 280, houseCosts: 150, split: .8, pa: .9, ages: ['A21', 'A18'], curfew: 1560, ac: true, following: .6, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The legal downtown room that took the load from the houses and warehouses. Wants six weeks and a name.' }
  ],

  contacts: ['washington-dc', 'charlottesville-va', 'durham-nc', 'harrisonburg-va'],

  calendar: [
    { id: 'riverfront', label: 'the riverfront festival', tag: 'festival', month: 10, week: 2, dows: [4, 5, 6], can: [.92, .88, .85], hoods: ['shockoe', 'jackson-ward'], elsewhere: [.97, .95, .95] },
    { id: 'marathon', label: 'marathon weekend', tag: 'race', month: 11, week: 2, dows: [5], can: [.92, .88, .88], hoods: ['fan', 'carytown', 'monroe'], elsewhere: [1, 1, 1] },
    { id: 'fair', label: 'the county fair', tag: 'fair', month: 10, week: 3, dows: [3, 4, 5, 6], can: [.90, .95, .97] },
    { id: 'football-sep', label: 'high school football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.88, 1, .97] },
    { id: 'football-oct', label: 'high school football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.88, 1, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1380 },

  points: [
    { name: 'Norfolk', state: 'VA', lat: 36.85, lon: -76.29, pop: 1800000 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61, pop: 2800000 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64, pop: 1500000 }
  ],
  roads: ['I-95', 'I-64', 'I-195', 'I-295', 'Powhite Parkway', 'US 360'],

  words: {
    street: ['Broad Street', 'Grace Street', 'West Cary Street', 'Monument Avenue', 'the Boulevard', 'Hull Street', 'Brookland Park Boulevard', 'Franklin Street', 'Staples Mill Road'],
    water: ['the James', 'the Falls', 'Belle Isle', 'the Pipeline', 'Texas Beach'],
    hood: ['Oregon Hill', 'the Fan', 'Carytown', 'Scott\'s Addition', 'Jackson Ward', 'Shockoe Bottom', 'Church Hill', 'Manchester', 'Highland Park', 'Barton Heights', 'Ginter Park',
           'Forest Hill', 'Woodland Heights'],
    thing: ['cobblestone', 'rowhouse', 'floodwall', 'brunswick stew', 'ham biscuit', 'tobacco sign', 'freight yard', 'boiled peanuts', 'porch', 'alley', 'group house', 'zine', 'taproom'],
    weather: ['afternoon thunderstorm', 'ice storm', 'tropical remnant']
  },

  events: [
    { id: 'RICHMOND_I95_BACKUP', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Road crews are working on the I-95 and I-64 overlap downtown this week.',
      title: 'The interstate is a parking lot',
      body: 'A wreck at the I-95 and I-64 overlap has the whole spine backed up the night of your show. The bands and the kids from the north and the Southside are stuck.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross downtown.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The backup never cleared. The ones outside the city stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads took the back roads together. They\'ll remember that.' }
      ] },

    { id: 'RICHMOND_RACE_CLOSURES', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'race' },
      telegraph: 'The marathon closes half the north side on Saturday.',
      title: 'The marathon has the streets',
      body: 'Marathon weekend closes Broad, the Boulevard and Monument Avenue. Nobody can get near the show, and the tow trucks are circling the permit zones.',
      options: [
        { id: 'EARLY', label: 'Open early, tell everyone where to park', likely: 'Most get in before the barricades. Thinner than usual.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .92 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors an hour early. The ones who came parked a mile away and walked.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'A lot of people give up on the closures.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The streets stayed shut. Half the list never found a place to leave the car.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'RICHMOND_BOTTOM_FLOODS', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [7, 8, 9, 10] },
      telegraph: 'The remnants of a tropical system are headed up the coast.',
      title: 'The Bottom is flooding',
      body: 'A tropical remnant has dropped a foot of rain, and the low blocks of Shockoe Bottom are going under. Anywhere near the river is a bad bet tonight.',
      options: [
        { id: 'MOVE', label: 'Move it a day, once the water goes down', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' },
        { id: 'HILL', label: 'Move it to a house on high ground', likely: 'Smaller and louder, with a wall of neighbors on every side.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A rowhouse on the hill took the whole bill, and the floor was packed.' },
        { id: 'SANDBAG', label: 'Sandbag the door and play on', likely: 'Costs forty dollars. The crowd stays home.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The water stayed on the street. The room was half full and wet to the ankle.' }
      ] }
  ]
});
