SB.Cities.register('boulder-co', {
  v: 1,
  slug: 'boulder-co',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['cu boulder', 'cu', 'university of colorado', 'colorado state university', 'csu', 'university of northern colorado', 'colorado school of mines',
           'school of mines', 'naropa', 'naropa university', 'big 12', 'bolder boulder', 'polar bear plunge', 'naked pumpkin run', 'happy thursday',
           'boulder international film festival', 'conference on world affairs', 'frozen dead guy days', 'frozen dead guy', 'marshall fire',
           'the marshall fire', 'flatiron flyer', 'flex bus', 'rtd', 'denver-boulder turnpike', 'pearl street mall', 'boulder junction', 'f. e. warren',
           'f.e. warren air force base', 'halloween on the hill',
           'goss street basement', 'the marine street annex', 'marine street annex', 'valmont cold storage', 'the table mesa carport', 'table mesa carport',
           'gunbarrel grange hall', 'the four mile pavilion', 'four mile pavilion', 'arapahoe feed & supply', 'arapahoe feed and supply',
           'the 55th street rehearsal barn', '55th street rehearsal barn', 'the sandstone room', 'broadway laundromat back room', 'the mapleton porch',
           'lee hill lodge',
           'boulder creek festival', 'creek festival', 'munchkin masquerade', 'boulder weekly', 'daily camera', 'caribou current', 'colorado sun', 'longmont leader', 'westword', 'cu buffs', 'folsom field', 'bluebird music festival', 'colorado shakespeare festival', 'boulder fringe festival', 'twenty ninth street', 'viva le rock fest', 'longmont punkiversary'],
  /* The dossier's invented venue names are banned too: research, not content, unchecked. The university appears only as 'the university' and the fire as 'the fire'. */
  blocklist: ['cu boulder*', 'university of colorado*', 'naropa*', 'bolder boulder*', 'frozen dead guy*', 'marshall fire*', 'flatiron flyer*', 'goss street basement*'],

  blurb: ['A small, young punk scene tucked inside a folk-and-indie town under the Flatirons. The kids run it themselves, in a coffee-shop yard or a borrowed house.',
          'Half of them have one foot in Denver, and the town never quite calls itself a punk town.'],
  hard: 'Few rooms, landlords who don\'t renew, and Denver pulling everyone away.',
  region: 'the Front Range',
  houseType: 'LIVING_ROOM',
  whereGo: [
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Boulder' },
    { id: 'louisville', kind: 'FEEDER', name: 'Louisville and Superior', minutes: 20, bearing: 135, pop: 21226, note: 'Affluent suburbs hit hard by the fire; few shows, many band members.' },
    { id: 'lafayette', kind: 'FEEDER', scene: 50, name: 'Lafayette', minutes: 20, bearing: 115, pop: 30411, note: 'A former coal town, cheaper than Boulder, where many scene people live.',
      rooms: [
    { id: 'lafayette-garage', kind: 'HOUSE', hood: 'lafayette', cap: 60, curfew: 1320,
      note: 'A tract-house garage where rent is cheap and the neighbors are few. One complaint or one wet night ends it.' }] },
    { id: 'broomfield', kind: 'FEEDER', name: 'Broomfield', minutes: 20, bearing: 150, pop: 74112, note: 'A corporate suburb halfway to Denver; bored teenagers ride the bus in.' },
    { id: 'longmont', kind: 'FEEDER', scene: 60, name: 'Longmont', minutes: 25, bearing: 35, pop: 98900, note: 'The cheaper, grittier neighbor and the most important feeder: forgiving garages and its own small scene.',
      rooms: [
    { id: 'longmont-yard', kind: 'OUTDOOR', hood: 'longmont', cap: 200, curfew: 1260,
      note: 'A yard behind a taco counter that once drew a crowd. Daylight and a neighbor\'s patience set the clock.' },
    { id: 'longmont-lodge', kind: 'HALL', hood: 'longmont', cap: 250, curfew: 1350, ac: true,
      note: 'A lodge hall up in Longmont that rents by the night for punk bills. Folding chairs, a bar closed off, a long list of rules.' }] },
    { id: 'lyons', kind: 'FEEDER', name: 'Lyons', minutes: 25, bearing: 330, pop: 2209, note: 'A sandstone folk and bluegrass town; the punk kids come to Boulder.' },
    { id: 'nederland', kind: 'FEEDER', name: 'Nederland', minutes: 30, bearing: 265, pop: 1471, note: 'A hippie mountain town up the canyon with small bar and basement shows.' },
    { id: 'golden', kind: 'FEEDER', name: 'Golden', minutes: 35, bearing: 195, pop: 20399, note: 'A mining-college and brewing town with some crossover.' },
    { id: 'estes-park', kind: 'FEEDER', name: 'Estes Park', minutes: 70, bearing: 315, pop: 5904, note: 'A tourist town at the park gate; its teenagers come down when the road allows.' },
    { id: 'loveland', kind: 'FEEDER', name: 'Loveland', minutes: 45, bearing: 20, pop: 76378, note: 'A conservative exurb with a small, sometimes churchy-venue scene.' },
    { id: 'fort-collins', kind: 'PEER', name: 'Fort Collins', state: 'CO', minutes: 60, bearing: 10, slug: 'fort-collins-co', note: 'The truest peer: a college town with its own breweries and scene.' },
    { id: 'greeley', kind: 'PEER', name: 'Greeley', state: 'CO', minutes: 60, bearing: 55, slug: 'greeley-co', note: 'A farm and meatpacking world with a state college; a rougher, separate scene.' },
    { id: 'colorado-springs', kind: 'PEER', name: 'Colorado Springs', state: 'CO', minutes: 115, bearing: 190, slug: 'colorado-springs-co', note: 'A bigger, conservative military city with a distinct scene that trades through Denver.' }
  ],

  hoods: [
    { id: 'the-hill', name: 'the Hill', route: 'campus', note: 'West of the campus: student houses, fraternities and the old counterculture streets. Police know exactly what a loud house looks like.' },
    { id: 'downtown', name: 'downtown and the pedestrian mall', route: 'downtown', note: 'The tourist and street-performer center. Priced out for anything cheap, but where the flyers get stapled.' },
    { id: 'goss-grove', name: 'Goss-Grove', route: 'old-side', note: 'Old frame houses and small apartment buildings cut into student rentals. House shows, and neighbors who call the city.' },
    { id: 'north-boulder', name: 'North Boulder', route: 'old-side', note: 'Quiet, family-minded and expensive; where the older ex-scene people live.' },
    { id: 'east-boulder', name: 'East Boulder and the Valmont strip', route: 'work-side', note: 'Warehouses, flex buildings and office-park garages: practice spaces and the occasional unlicensed show, under zoning pressure.' },
    { id: 'south-boulder', name: 'South Boulder and Table Mesa', route: 'old-side', note: 'Mid-century ranch houses and duplexes with finished basements. Stable and expensive.' },
    { id: 'gunbarrel', name: 'Gunbarrel', route: 'work-side', note: 'Far northeast office parks and big-box sprawl: practice garages, basements and no scene center.' },
    { id: 'canyon', name: 'the foothills and the canyon', route: 'work-side', note: 'Cabins, mountain houses and bonfires up the canyon road. Loud shows with a long, icy drive.' },
    { id: 'longmont', name: 'Longmont', route: 'town:longmont', note: 'The cheaper, grittier town to the northeast, with its own yards, a lodge hall and a punk wave of its own.' },
    { id: 'lafayette', name: 'Lafayette', route: 'town:lafayette', note: 'A former coal town of tract houses and garages, where rent is lower and many scene people live.' }
  ],

  rooms: [
    { id: 'hill-house', kind: 'HOUSE', hood: 'the-hill', cap: 40, curfew: 1350, pressure: 55, start: true,
      note: 'A student rental on the Hill. The loud party calls are the risk, and the police know this block.' },
    { id: 'valmont-unit', kind: 'DIY', hood: 'east-boulder', cap: 120, curfew: 1380, ac: false, pressure: 60,
      note: 'A bare flex-building unit a student opened for shows. The lease and the zoning can end it any week.' },
    { id: 'coffee-yard', kind: 'SHOP', hood: 'goss-grove', cap: 80, curfew: 1320, ac: false, outdoor: true,
      note: 'A coffee stand\'s yard and lot, with a show every other week. Something breaks, you get kicked out.' },
    { id: 'church-room', kind: 'HALL', hood: 'the-hill', cap: 150, curfew: 1320, ac: true,
      note: 'A church fellowship room rented for loud all-ages bills. A pastor or a board vote closes it.' },
    { id: 'downtown-club', kind: 'CLUB', hood: 'downtown', cap: 350, curfew: 1380, ages: ['ALL', 'A18'],
      note: 'The touring indie and folk room downtown. Local punk kids rarely get the stage.' },
    { id: 'big-theatre', kind: 'BIG', hood: 'downtown', cap: 600, curfew: 1380, ages: ['ALL'],
      note: 'A six-hundred-seat theatre for touring acts. Not for a first-time booker.' },
    { id: 'pearl-bar', kind: 'BAR', hood: 'downtown', cap: 150, curfew: 1500, ages: ['A21'],
      note: 'A taproom with a corner stage. Bands are house music here, and it is 21-plus at night.' },
    { id: 'canyon-cabin', kind: 'OUTDOOR', hood: 'canyon', cap: 60, curfew: 1320,
      note: 'A cabin with a bonfire and a generator up the canyon. A long, icy drive home.' }
  ],

  contacts: ['fort-collins-co', 'greeley-co', 'colorado-springs-co', 'denver'],

  calendar: [
    { id: 'late-may-fest', label: 'the late-May downtown festival and the 10K', tag: 'festival', month: 5, weeks: [4, 5], dows: [4, 5, 6, 0], can: [.85, .90, .92], hoods: ['downtown'], elsewhere: [.97, .97, .97] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [2, 4], dows: [5], can: [.88, .95, .95], hoods: ['the-hill'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 3], dows: [4, 5], can: [.88, .95, .95], hoods: ['the-hill'], elsewhere: [1, 1, 1] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [2, 4], dows: [4, 5], can: [.88, .95, .95], hoods: ['the-hill'], elsewhere: [1, 1, 1] },
    { id: 'term-opening', label: 'the fall-term opening', tag: 'holiday', month: 8, week: 4, dows: [4, 5, 6], can: [1.10, 1.05, 1.0], hoods: ['the-hill', 'goss-grove'], elsewhere: [1, 1, 1] },
    { id: 'graduation', label: 'term break and graduation', tag: 'graduation', month: 5, weeks: [2, 3], dows: [4, 5, 6], can: [.88, .90, .92] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.05, 1.02, 1], hoods: ['the-hill'], elsewhere: [1, 1, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1380, curfewMinors: { weeknight: 1380, weekend: 1380, inForce: false } },

  points: [
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99, pop: 715522 },
    { name: 'Cheyenne', state: 'WY', lat: 41.14, lon: -104.82, pop: 65132 },
    { name: 'Laramie', state: 'WY', lat: 41.31, lon: -105.59, pop: 31000 },
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89, pop: 1200000 },
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93, pop: 485000 }
  ],
  roads: ['US 36', 'I-25', 'SH 119', 'SH 7', 'SH 93', 'US 287'],

  words: {
    street: ['Pearl Street', 'Arapahoe Avenue', 'Valmont Road', 'Table Mesa Drive', '28th Street', 'Broadway', 'Canyon Boulevard', 'US 36'],
    water: ['Boulder Creek', 'Boulder Canyon', 'Four Mile Canyon'],
    hood: ['the Hill', 'Goss-Grove', 'North Boulder', 'Martin Acres', 'Table Mesa', 'Gunbarrel', 'Mapleton'],
    thing: ['Flatirons', 'chinook wind', 'cruiser bike', 'finished basement', 'trailhead', 'foothills cabin', 'brewery', 'coffee stand', 'yard show', 'cooler of waters'],
    weather: ['chinook wind', 'afternoon thunderstorm', 'canyon ice']
  },

  events: [
    { id: 'BOULDER_CO_WAREHOUSE_CALL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The flex-building landlord has been walking the lot, and downtown is already full for the festival weekend.',
      title: 'The landlord comes by the unit',
      body: 'The festival weekend has the parking full and the landlord of the east-side flex building has noticed cars, cables and a banner. He wants the show off his lot tonight.',
      options: [
        { id: 'MOVE', label: 'Move the bill to a house', likely: 'Smaller and louder, and the neighbors may call.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A house took the bill with an hour to spare, and the floor was packed.' },
        { id: 'TRIM', label: 'Trim the bill and finish early', likely: 'Fewer bands, out before his lawyer wakes up.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'You cut two sets and loaded out by ten. He watched the whole way.' },
        { id: 'ACCEPT', label: 'Run it and take what comes', likely: 'The lot is full and he is angry.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Half the crowd turned around in the lot rather than argue with him.' }
      ] },

    { id: 'BOULDER_CO_CANYON_ICE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [11, 12, 1, 2, 3] },
      telegraph: 'The first real storm is coming and the canyon road is going to ice by dark.',
      title: 'The canyon road ices over',
      body: 'Ice on the canyon road the night of the bonfire set. The band is in the van at the bottom and the cabin is nine miles up.',
      options: [
        { id: 'PORCH', label: 'Play the cabin porch for whoever is already up there', likely: 'A small, warm night.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'A dozen of them in coats on the porch with one amp. Nobody forgot it.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the band.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' },
        { id: 'ACCEPT', label: 'Run it and wait for them', likely: 'A late start and a worried crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The van crawled in at ten. The crowd was colder and louder for it.' }
      ] },

    { id: 'BOULDER_CO_GAME_DAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'The home game is Saturday, and the tailgates take the Hill by noon.',
      title: 'The Hill is a tailgate',
      body: 'Traffic, tailgates and a loud street, and your house show is on the same block. Half the kids you counted on went north on the bus to a lodge hall night.',
      options: [
        { id: 'LATE', label: 'Push doors back until the game is over', likely: 'The crowd that wants a night out shows up late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. The ones who came were loud and happy.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the game.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The casual crowd stayed on the couch. The regulars came.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] }
  ]
});
