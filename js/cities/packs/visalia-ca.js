SB.Cities.register('visalia-ca', {
  v: 1,
  slug: 'visalia-ca',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['college of the sequoias', 'sequoias', 'naval air station lemoore', 'nas lemoore', 'west hills college', 'fresno state', 'chapman university',
           'fresno pacific', 'porterville college', 'reedley college', 'visalia times-delta', 'times-delta', 'world ag expo', 'tulare county fair',
           'kings district fair', 'visalia rawhide', 'amgen tour of california', 'visalia transit', 'amtrak', 'amtrak thruway',
           'visalia police department', 'tulare county sheriff', 'vfw', 'american legion', 'sequoia national park', 'mexican coca-cola',
           'the packwood room', 'packwood room', 'tule fog annex', 'sycamore street lanes', 'the kaweah hall', 'kaweah hall', 'raisin row',
           'cotton gin garage', 'oak shade social club', 'citrus crate loft', 'goshen junction room', 'swamp cooler records', 'lemon cove lodge',
           'ben maddox carport',
           'valley echoes', 'bandsintown', 'gvwire', 'abc30', 'kqed'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['visalia times*', 'world ag expo*', 'swamp cooler*', 'tule fog annex*', 'packwood*'],

  blurb: ['A southern San Joaquin Valley farm and distribution city of tract homes and strip malls, with a pretty old downtown and a Sierra horizon on clear days.',
          'Punk lives in garages and backyards, and it starts over every time the seniors graduate and head for the bigger towns north and south.'],
  hard: 'Noise calls in tract homes, brutal heat and smoky air, and a bigger city that steals the crowd.',
  region: 'the Valley',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Fresno', state: 'CA', lat: 36.74, lon: -119.79 },
    { name: 'Bakersfield', state: 'CA', lat: 35.37, lon: -119.02 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'Oakland', state: 'CA', lat: 37.80, lon: -122.27 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Visalia' },
    { id: 'tulare', kind: 'FEEDER', name: 'Tulare', minutes: 15, bearing: 175, pop: 68875, note: 'The big dairy-town neighbor to the south, with a small scene of its own.' },
    { id: 'exeter', kind: 'FEEDER', name: 'Exeter', minutes: 15, bearing: 95, pop: 10321, note: 'A citrus town with murals; kids come over for shows.' },
    { id: 'farmersville', kind: 'FEEDER', name: 'Farmersville', minutes: 10, bearing: 130, note: 'Small and blue-collar, just southeast.' },
    { id: 'woodlake', kind: 'FEEDER', name: 'Woodlake', minutes: 20, bearing: 60, note: 'A small farm town at the foothill edge.' },
    { id: 'hanford', kind: 'FEEDER', name: 'Hanford', minutes: 25, bearing: 280, pop: 57990, note: 'A peer-sized town west on 198 with its own scene and a friendly rivalry.' },
    { id: 'lindsay', kind: 'FEEDER', name: 'Lindsay', minutes: 25, bearing: 125, note: 'A small citrus town to the southeast.' },
    { id: 'dinuba', kind: 'FEEDER', name: 'Dinuba', minutes: 30, bearing: 350, note: 'A farm town to the north.' },
    { id: 'porterville', kind: 'FEEDER', name: 'Porterville', minutes: 35, bearing: 140, pop: 62623, note: 'A real second town for shows, up against the foothills, and a friendly rival.' },
    { id: 'lemoore', kind: 'FEEDER', name: 'Lemoore', minutes: 35, bearing: 275, pop: 27038, note: 'Military families from the jet base; sailors sometimes bring friends.' },
    { id: 'reedley', kind: 'FEEDER', name: 'Reedley', minutes: 40, bearing: 5, pop: 25227, note: 'A fruit-basket town up the road in the next county.' },
    { id: 'merced', kind: 'PEER', name: 'Merced', minutes: 125, bearing: 320, slug: 'merced-ca', note: 'Two hours up Highway 99; a trading partner on tours.' },
    { id: 'modesto', kind: 'PEER', name: 'Modesto', minutes: 150, bearing: 325, slug: 'modesto-ca', note: 'A bigger Valley town farther up the 99.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'A tree-lined walkable core of bars and restaurants that run 21 and over. Priced up and polished, with little noise tolerance.' },
    { id: 'mooney', name: 'Mooney', route: 'campus', note: 'A long commercial strip of chains, a mall and apartments, with a community college at its south end. Strip units are the cheap practice rooms.' },
    { id: 'eastside', name: 'the Eastside', route: 'old-side', note: 'Older, working-class streets of small houses with long lots, garages and carports. Cheap and mostly ignored.' },
    { id: 'north-visalia', name: 'North Visalia', route: 'old-side', note: 'Older houses and newer subdivisions north of 198. Backyards and a few church properties.' },
    { id: 'industrial', name: 'the Industrial Area', route: 'work-side', note: 'Warehouses, packing sheds and small shops along the rail line. Cheap and promising but under pressure from code enforcement.' },
    { id: 'westside', name: 'the Westside', route: 'work-side', note: 'The farm edge toward Goshen. Yard shows and generator nights far from everyone.' },
    { id: 'southwest', name: 'Southwest Visalia', route: 'campus', note: 'New tract homes and big lots on the money side of town. Garage practice and little else.' }
  ],

  rooms: [
    { id: 'eastside-garage', kind: 'HOUSE', hood: 'eastside', cap: 60, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [65, 60, 45],
      pressure: 50, start: true, note: 'A garage on a long lot with the roll-up door open and the driveway for a room. It starts after sundown and ends at the first noise call.' },
    { id: 'southwest-garage', kind: 'HOUSE', hood: 'southwest', cap: 50, hostCut: 0, pa: .4, curfew: 1290, ac: false, outdoor: false, sketch: 20, standing: [60, 60, 50],
      pressure: 60, note: 'A two-car garage in a tract block. Good for practice and bad for shows: the subdivision calls within the hour.' },
    { id: 'westside-yard', kind: 'HOUSE', hood: 'westside', cap: 100, hostCut: 0, pa: .4, curfew: 1410, ac: false, outdoor: true, sketch: 30, standing: [60, 60, 45],
      pressure: 35, note: 'A yard on the farm edge with a generator and nobody to complain. Far from the cops and far from the kids with no car.' },
    { id: 'rail-unit', kind: 'DIY', hood: 'industrial', cap: 80, rent: 60, deposit: 0, pa: .5, curfew: 1350, ac: false, sketch: 40, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'A band-share unit by the rail line with the door rolled up. Code enforcement and the landlord both drive by.' },
    { id: 'mooney-unit', kind: 'DIY', hood: 'mooney', cap: 50, rent: 50, deposit: 0, pa: .5, curfew: 1320, ac: true, sketch: 25, standing: [60, 60, 50],
      pressure: 50, note: 'A strip-mall practice room near the college that sometimes hosts a night. The lease is short and the landlord worries about insurance.' },
    { id: 'church-hall', kind: 'HALL', hood: 'north-visalia', cap: 200, rent: 140, deposit: 75, pa: .5, curfew: 1320, ac: true, sketch: 5, standing: [60, 60, 65],
      owner: 'CHURCH_CONTACT', pressure: 45, note: 'A hall on church grounds, rented by the evening. All ages, no beer, and whose building it is matters.' },
    { id: 'strip-bar', kind: 'BAR', hood: 'downtown', cap: 250, soundFee: 50, pa: .7, ages: ['A21'], curfew: 1500, ac: true, following: .3, sketch: 15, standing: [45, 65, 70],
      pressure: 55, note: 'A bar with a stage on the tree-lined strip. Twenty-one and over, and not much patience for loud.' },
    { id: 'taproom', kind: 'BAR', hood: 'downtown', cap: 300, soundFee: 60, pa: .8, ages: ['A21'], curfew: 1380, ac: true, following: .4, sketch: 15, standing: [50, 65, 70],
      note: 'A brewery taproom with a real stage. The one room downtown where a touring package can land.' },
    { id: 'orchard-yard', kind: 'OUTDOOR', hood: 'westside', cap: 120, rent: 15, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 35, standing: [60, 55, 40],
      note: 'An orchard and an ag yard for a one-off. Smoke or a hundred-and-five day cancels it.' },
    { id: 'thrift-shop', kind: 'SHOP', hood: 'eastside', cap: 60, pa: .4, curfew: 1230, ac: true, sketch: 5, standing: [70, 70, 75], following: .2,
      note: 'A thrift shop that does early, quiet in-stores. Not a punk room by habit, and over by half past eight.' }
  ],

  contacts: ['merced-ca', 'modesto-ca', 'fresno', 'bakersfield-ca'],

  calendar: [
    { id: 'ag-expo', label: 'the ag expo', tag: 'fair', month: 2, week: 2, dows: [1, 2, 3], can: [.92, .90, .90] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 9, weeks: [3, 4], dows: [3, 4, 5, 6], can: [.90, .85, .85] },
    { id: 'district-fair', label: 'the district fair next door', tag: 'fair', month: 6, week: 3, dows: [2, 3, 4, 5, 6], can: [.92, .90, .90] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.82, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.82, .95, .95] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 3], dows: [4], can: [.82, .95, .95] },
    { id: 'graduation', label: 'graduation weekend', tag: 'graduation', month: 5, weeks: [4, 5], dows: [4, 5, 6], can: [.90, .92, .92] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Fresno', state: 'CA', lat: 36.74, lon: -119.79, pop: 542107 },
    { name: 'Bakersfield', state: 'CA', lat: 35.37, lon: -119.02, pop: 403455 },
    { name: 'Clovis', state: 'CA', lat: 36.83, lon: -119.70, pop: 120000 },
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49, pop: 520000 }
  ],
  roads: ['Highway 99', 'Highway 198', 'Highway 63', 'Highway 65', 'I-5'],

  words: {
    street: ['Mooney Boulevard', 'Highway 198', 'Highway 99', 'Highway 63', 'Ben Maddox Way', 'Court Street', 'Main Street'],
    water: ['the Kaweah', 'the Tule', 'the canal'],
    hood: ['Mooney', 'the Eastside', 'Goshen', 'North Visalia', 'the Westside'],
    thing: ['roll-up door', 'swamp cooler', 'taco truck', 'orange grove', 'crop duster', 'raspado', 'canal bank', 'driveway', 'church hall', 'generator'],
    weather: ['tule fog', 'triple digits', 'ag smoke']
  },

  events: [
    { id: 'VISALIA_CA_TRIPLE_DIGITS', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 35, bind: ['show'],
      if: { daysOut: [0, 3], months: [6, 7, 8, 9] },
      telegraph: 'The forecast is a hundred and ten, and the garage is a swamp cooler with a roll-up door.',
      title: 'Too hot to touch the drums',
      body: 'It is still triple digits at doors and the first band\'s kit is too hot to touch. The garage will not cool down until long after sundown.',
      options: [
        { id: 'LATE', label: 'Wait for the sun to drop and start late', likely: 'The crowd that can stay up comes, late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors were at nine, when the concrete had stopped glowing, and the ones who stayed were loud.' },
        { id: 'FANS', label: 'Rent fans and a cooler of ice', likely: 'It costs a little, and the crowd is sweaty and loyal.',
          effects: [{ op: 'MONEY', amount: -30 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1 }],
          result: 'You set up two box fans and a cooler of ice, and everybody was soaked and nobody left.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'People stay home in the heat.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Half the list stayed in the air conditioning, and the rest drank all the water.' }
      ] },

    { id: 'VISALIA_CA_FAIR_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'A fair is on one town over, and half the kids you know are working it or riding it.',
      title: 'The fair takes the kids',
      body: 'The fair weekend has half the list working a booth or riding the rides, and the other half stuck in the traffic on the highway.',
      options: [
        { id: 'LATE', label: 'Push doors back until the fair lets out', likely: 'The late crowd comes straight from the rides.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors were an hour late, and they came in smelling like funnel cake and brought their friends.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The room is thin.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The fair kept the casual crowd, and the regulars came.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date, which costs you trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'VISALIA_CA_SMOKE_DAY', when: 'WEEK', tier: 'HARD', weight: 1, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 2], months: [8, 9, 10] },
      telegraph: 'The sky has turned orange and the air quality alert is up.',
      title: 'The yard show may not happen',
      body: 'Smoke has settled over the valley. The yard show on the farm edge is outdoors, the air is bad, and the host wants to know whether you are still on.',
      options: [
        { id: 'INSIDE', label: 'Move the bill into a garage with the door shut', likely: 'It\'s smaller and stuffy, but it happens.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A garage took the bill with the door shut. It was loud and hot, and everybody coughed.' },
        { id: 'ACCEPT', label: 'Run it outside and take what you get', likely: 'There are masks, and the crowd is thin.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'The yard was empty by ten, and everybody went home to wash their hair.' }
      ] }
  ]
});
