SB.Cities.register('philadelphia', {
  v: 1,
  slug: 'philadelphia',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of pennsylvania', 'drexel', 'temple university', 'temple town', 'thomas jefferson university', 'jefferson university', 'st. joseph\'s university',
           'la salle university', 'villanova', 'rutgers', 'university of the arts', 'septa', 'patco', 'amtrak', 'l&i', 'licenses and inspections', 'plcb',
           'pennsylvania liquor control board', 'wawa', 'tastykake', 'tastykakes', 'citywide special', 'reading terminal market', 'odunde', 'wawa welcome america',
           'mummers parade', 'mummers', 'philadelphia eagles', 'the eagles', 'phillies', 'billy penn', 'phillyvoice', 'philadelphia inquirer', 'the inquirer',
           'philadelphia magazine', 'daily pennsylvanian', '34th street magazine', 'the temple news', 'whyy', 'wxpn', 'world cup', 'all-star game',
           'army-navy game', 'fringe festival', 'first friday', 'broad street run', 'hurricane ida', 'vfw', 'american legion', 'elks', 'moose lodge',
           'lehigh & trenton hall', 'lehigh and trenton hall', 'the pipefitters\' annex', 'thompson street stoop', 'cobbs creek rec cellar', 'the old poplar garage',
           'moyamensing back room', 'bridesburg sons of erin hall', 'second floor above the dry cleaner', 'hunting park wheelhouse', 'the grays ferry stable',
           'rail yard unit 6', 'lodge 212', 'pennypack pavilion', 'the el underpass', 'aramingo lanes back lot'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. L&I is the city inspectors' own abbreviation; game text says 'the city inspector'. */
  blocklist: ['septa*', 'wawa*', 'tastykake*', 'mummers*', 'philadelphia eagles*', 'phillies*', 'billy penn*', 'phillyvoice*', 'whyy*', 'wxpn*', 'odunde*', 'drexel*'],

  blurb: ['A city of brick rowhouses with real basements, a hardcore legacy, and a habit of building its own institutions when nobody else will.',
          'Old-head hardcore, kids in emo shirts, a boiler in the corner and a stoop full of people between sets. There\'s an inspector, a landlord or a developer for every basement.'],
  hard: 'Great draw, but basements get shut fast and kids have a curfew.',
  region: 'the Northeast corridor',
  missing: 'A legal room that survives the inspectors.',
  houseType: 'ROWHOUSE',
  whereGo: [
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'Oakland', state: 'CA', lat: 37.80, lon: -122.27 }
  ],

  tilt: [
    { fan: 'emo', band: 'pop-punk', d: .10, reason: 'The emo and pop-punk wave of the 2000s and 2010s put this city on the map.' },
    { fan: 'pop-punk', band: 'emo', d: .10, reason: 'The emo and pop-punk wave of the 2000s and 2010s put this city on the map.' },
    { fan: 'hardcore', band: 'crust', d: .10, reason: 'A hardcore town with a crusty basement streak.' },
    { fan: 'crust', band: 'hardcore', d: .10, reason: 'A hardcore town with a crusty basement streak.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Philadelphia' },
    { id: 'wilmington', kind: 'FEEDER', name: 'Wilmington', state: 'DE', minutes: 40, bearing: 234, note: 'A banking and credit-card city with a poor core, house shows and a few bars. Kids come up for bigger bills.' },
    { id: 'west-chester', kind: 'FEEDER', name: 'West Chester', minutes: 45, bearing: 270, note: 'A college town and county seat of bars and restaurants, with an active house-show scene.' },
    { id: 'trenton', kind: 'FEEDER', name: 'Trenton', state: 'NJ', minutes: 45, bearing: 49, note: 'A state capital with hard-luck neighborhoods, a few small rooms and a scene of its own.' },
    { id: 'pottstown', kind: 'FEEDER', name: 'Pottstown and Phoenixville', minutes: 45, bearing: 310, beyond: 'schuylkill', note: 'Former mill towns with their own bar rooms.' },
    { id: 'doylestown', kind: 'FEEDER', name: 'Doylestown and lower Bucks County', minutes: 50, bearing: 5, note: 'Old-money suburbs and farmland with an arts-town feel. The kids drive in because there is nothing to do.' },
    { id: 'vineland', kind: 'FEEDER', name: 'Vineland and Millville', state: 'NJ', minutes: 55, bearing: 167, beyond: 'delaware-bridges',
      note: 'A farming and glass-making region of kids with cars and little to do, with a small house-show scene.' },
    { id: 'reading', kind: 'FEEDER', name: 'Reading', minutes: 75, bearing: 304, beyond: 'schuylkill', note: 'A poor, majority-Latino former mill and rail city with a scrappy scene and a strong punk heritage.' },
    { id: 'allentown', kind: 'FEEDER', name: 'Allentown and Bethlehem', minutes: 75, bearing: 340,
      note: 'Former steel cities with big Latino communities, colleges and a real scene of their own. A rival for the hardcore crowd.' },
    { id: 'lancaster', kind: 'FEEDER', name: 'Lancaster', minutes: 75, bearing: 275, beyond: 'schuylkill', note: 'A farm county seat with a gentrifying downtown, a college and a few small rooms.' },
    { id: 'atlantic-city', kind: 'FEEDER', name: 'Atlantic City', state: 'NJ', minutes: 75, bearing: 136, beyond: 'delaware-bridges',
      note: 'Casino town with little room for locals. Kids work boardwalk jobs and drive up for shows.' },
    { id: 'dover', kind: 'FEEDER', name: 'Dover', state: 'DE', minutes: 85, bearing: 205, note: 'A state capital and military town in farm country. Kids who want a scene drive north.' },
    { id: 'stroudsburg', kind: 'FEEDER', name: 'Stroudsburg and the Poconos', minutes: 90, bearing: 355, note: 'A college town in resort country with a seasonal economy.' },
    { id: 'baltimore', kind: 'PEER', name: 'Baltimore', slug: 'baltimore', state: 'MD', minutes: 105, bearing: 225, scene: 12000, note: 'The next stop down I-95. Friendly rivals.' },
    { id: 'harrisburg', kind: 'PEER', name: 'Harrisburg', minutes: 110, bearing: 285, slug: 'harrisburg-pa', note: 'The state capital, a poor river city with a college orbit and a history of small rooms.' },
    { id: 'york', kind: 'PEER', name: 'York', minutes: 110, bearing: 262, slug: 'york-pa', note: 'A mill and factory city with a rough name and a punk streak.' },
    { id: 'scranton', kind: 'PEER', name: 'Scranton and Wilkes-Barre', minutes: 120, bearing: 350, slug: 'scranton-pa',
      note: 'Old coal cities with a powerful hardcore tradition of their own. Their kids drive down for national tours.' },
    { id: 'washington', kind: 'PEER', name: 'Washington', state: 'DC', minutes: 170, bearing: 220, slug: 'washington-dc', note: 'The other half of the corridor, and the other big town to play.' }
  ],

  chokepoints: [                                // which zones each one cuts is said by the zones' `beyond`, above
    { id: 'delaware-bridges', name: 'the bridges to Jersey', p: .015 },
    { id: 'schuylkill', name: 'the Schuylkill Expressway', p: .02 }
  ],

  hoods: [
    { id: 'west-philly', name: 'West Philly', route: 'campus', note: 'Big stone twins with porches, co-op houses and the cradle of the basement show. Students, grad students and long-time neighbors who have heard it all.' },
    { id: 'north-philly', name: 'North Philly and Brewerytown', route: 'campus', note: 'The student rowhouse belt around the big university on Broad Street, with basements, and old brewery blocks turning to townhomes. Cheaper farther north.' },
    { id: 'kensington', name: 'Kensington and East Kensington', route: 'work-side', note: 'Old mill land under the elevated train: warehouses, garages and basements, cheap and hard to police, with a real street crisis on the avenue itself.' },
    { id: 'fishtown', name: 'Fishtown and Port Richmond', route: 'downtown', note: 'Fishtown is condos and a bar-and-venue strip on Frankford Avenue; Port Richmond is the older, cheaper rowhouse blocks to the north.' },
    { id: 'northern-liberties', name: 'Northern Liberties and Callowhill', route: 'downtown', note: 'Priced past artists, but the warehouses and lofts of Callowhill survive in the gaps, with the city inspectors close behind.' },
    { id: 'south-philly', name: 'South Philly', route: 'old-side', note: 'Rowhouse basements and corner bars, social clubs and halls, from the restaurant strip on Passyunk to cheaper Pennsport and Point Breeze.' },
    { id: 'southwest', name: 'Southwest Philly', route: 'work-side', note: 'Kingsessing and Cobbs Creek: cheap rent, big twin houses, churches and thin transit. Fewer cops listening for noise.' },
    { id: 'northwest', name: 'Germantown and Mount Airy', route: 'old-side', note: 'Old stone houses and cobbled avenues with the biggest basements in the city, and owners who dislike noise.' },
    { id: 'northeast', name: 'the Northeast', route: 'campus', note: 'A separate world off the Boulevard: rowhouses and twins with driveways, veterans\' posts, fire halls and finished basements. Older neighbors call.' },
    { id: 'manayunk', name: 'Manayunk', route: 'downtown', note: 'A steep hillside above the river with a bar strip on Main Street. Mostly cover bands and a college crowd; it floods.' }
  ],

  rooms: [
    { id: 'west-basement', kind: 'HOUSE', hood: 'west-philly', cap: 60, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 25, standing: [75, 60, 45], pressure: 55,
      start: true, note: 'A basement under a stone twin in West Philly. Low ceiling, a boiler, no stage. Stoop and porch fill between sets.' },
    { id: 'north-basement', kind: 'HOUSE', hood: 'north-philly', cap: 50, hostCut: 0, pa: .3, curfew: 1380, ac: false, outdoor: false, sketch: 25, standing: [75, 55, 40], pressure: 55,
      note: 'A student rowhouse basement. Cheap, loud and gone when the lease turns over.' },
    { id: 'south-basement', kind: 'HOUSE', hood: 'south-philly', cap: 45, hostCut: 0, pa: .3, curfew: 1380, ac: false, outdoor: false, sketch: 20, standing: [65, 60, 50], pressure: 50,
      note: 'A rowhouse basement near the corner bar. Shared walls, and the stoop spills into the street.' },
    { id: 'northwest-cellar', kind: 'HOUSE', hood: 'northwest', cap: 70, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 15, standing: [65, 55, 50], pressure: 50,
      note: 'The biggest basement in the city, under an old stone house. The owners hate noise.' },
    { id: 'southwest-twin', kind: 'HOUSE', hood: 'southwest', cap: 55, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 20, standing: [65, 55, 45], pressure: 45,
      note: 'A big twin in Southwest Philly. Fewer cops listening, but the last train is a long walk.' },
    { id: 'northeast-rec', kind: 'HOUSE', hood: 'northeast', cap: 60, hostCut: 0, pa: .4, curfew: 1320, ac: true, outdoor: false, sketch: 10, standing: [70, 50, 40], pressure: 60,
      note: 'A finished basement in a twin off the Boulevard. Wood paneling, and a neighbor who calls early.' },
    { id: 'lot', kind: 'OUTDOOR', hood: 'kensington', cap: 80, rent: 10, pa: .4, curfew: 1320, sketch: 40, standing: [60, 55, 40],
      note: 'A lot behind a warehouse in Kensington. A generator, a hydrant for the extension cord, and no neighbors who call.' },
    { id: 'mill', kind: 'DIY', hood: 'kensington', cap: 160, rent: 100, deposit: 0, pa: .6, curfew: 1440, ac: false, sketch: 55, standing: [55, 60, 45], pressure: 65,
      needs: ['VOUCH'], note: 'A mill room carved into practice spaces on the elevated line. Fire-code gaps and walls shared with other bands.' },
    { id: 'loft', kind: 'DIY', hood: 'northern-liberties', cap: 110, rent: 120, deposit: 0, pa: .5, curfew: 1380, ac: true, sketch: 45, standing: [55, 60, 50], pressure: 70,
      needs: ['VOUCH'], note: 'A loft in an occupied, visible building. The city inspectors know the address.' },
    { id: 'garage', kind: 'DIY', hood: 'fishtown', cap: 80, rent: 90, deposit: 0, pa: .5, curfew: 1380, ac: false, sketch: 35, standing: [60, 60, 45], pressure: 60,
      note: 'A rowhome garage turned venue. One letter from the city and it is shut, or a license and it is legal.' },
    { id: 'church', kind: 'HALL', hood: 'west-philly', cap: 120, rent: 90, deposit: 0, pa: .5, curfew: 1320, ac: false, sketch: 5, standing: [70, 60, 60], owner: 'CHURCH_CONTACT',
      pressure: 50, note: 'A church basement, a long-running all-ages room. No beer, no cursing, over early.' },
    { id: 'post', kind: 'HALL', hood: 'northeast', cap: 180, rent: 200, deposit: 100, pa: .6, curfew: 1380, ac: true, sketch: 15, standing: [55, 60, 70], owner: 'HALL_MANAGER',
      note: 'A veterans\' post in the Northeast. Matinees only work if you are out before the wedding.' },
    { id: 'social-club', kind: 'HALL', hood: 'south-philly', cap: 130, rent: 160, deposit: 50, pa: .5, curfew: 1380, ac: true, sketch: 10, standing: [55, 60, 70], owner: 'HALL_MANAGER',
      note: 'A social club on a South Philly corner, run by a committee that outlived its members.' },
    { id: 'pizza-room', kind: 'SHOP', hood: 'fishtown', cap: 50, pa: .4, curfew: 1260, ac: true, sketch: 5, standing: [70, 65, 70], following: .2,
      note: 'The back room of a pizza parlor. Early shows, over by nine.' },
    { id: 'matinee-bar', kind: 'BAR', hood: 'fishtown', cap: 140, soundFee: 75, pa: .7, ages: ['A18', 'A21'], matinee: true, curfew: 1560, ac: true, following: .4, sketch: 20,
      standing: [50, 65, 70], note: 'A licensed bar that books hardcore matinees and 18-and-over nights. Wristbands at the door.' },
    { id: 'river-bar', kind: 'BAR', hood: 'manayunk', cap: 170, soundFee: 80, pa: .8, ages: ['A21'], curfew: 1560, ac: true, following: .4, sketch: 15, standing: [35, 65, 70],
      note: 'A cover-band bar on the river. A punk bill gets a dead Tuesday.' },
    { id: 'theater', kind: 'CLUB', hood: 'fishtown', cap: 400, houseCosts: 250, split: .8, pa: .9, ages: ['ALL', 'A21'], curfew: 1560, ac: true, following: .6, sketch: 10,
      standing: [50, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A converted theater with a license. All ages early, then the bar. Wants six weeks and a name.' }
  ],

  contacts: ['new-york', 'washington-dc', 'allentown-pa', 'trenton-nj', 'harrisburg-pa'],

  calendar: [
    { id: 'game-sep', label: 'home game Sunday', tag: 'game', month: 9, weeks: [1, 5], dows: [6], can: [.92, .90, .88], hoods: ['south-philly'], elsewhere: [.98, .95, .95] },
    { id: 'game-oct', label: 'home game Sunday', tag: 'game', month: 10, weeks: [1, 5], dows: [6], can: [.92, .90, .88], hoods: ['south-philly'], elsewhere: [.98, .95, .95] },
    { id: 'game-nov', label: 'home game Sunday', tag: 'game', month: 11, weeks: [1, 5], dows: [6], can: [.92, .90, .88], hoods: ['south-philly'], elsewhere: [.98, .95, .95] },
    { id: 'game-dec', label: 'home game Sunday', tag: 'game', month: 12, weeks: [1, 5], dows: [6], can: [.92, .90, .88], hoods: ['south-philly'], elsewhere: [.98, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1320, weekend: 1320, inForce: true }, quiet: 1320 },

  points: [
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61, pop: 2800000 },
    { name: 'Wilmington', state: 'DE', lat: 39.74, lon: -75.55, pop: 720000 },
    { name: 'Dover', state: 'DE', lat: 39.16, lon: -75.52, pop: 190000 }
  ],
  roads: ['I-95', 'I-76', 'I-676', 'I-476', 'PA Turnpike', 'US 1'],

  words: {
    street: ['Baltimore Avenue', 'Frankford Avenue', 'Kensington Avenue', 'Girard Avenue', 'Allegheny Avenue', 'Germantown Avenue', 'Washington Avenue', 'Passyunk Avenue',
             'Aramingo Avenue', 'Lehigh Avenue', 'Broad Street', 'Market Street', 'the Boulevard'],
    water: ['the Delaware', 'the Schuylkill', 'the Wissahickon', 'Cobbs Creek'],
    hood: ['West Philly', 'Spruce Hill', 'Cedar Park', 'Walnut Hill', 'Powelton', 'Kensington', 'East Kensington', 'Fishtown', 'Port Richmond', 'Northern Liberties',
           'Callowhill', 'Brewerytown', 'Strawberry Mansion', 'Fairhill', 'Point Breeze', 'Pennsport', 'Grays Ferry', 'Kingsessing', 'Germantown', 'Mount Airy', 'Chestnut Hill',
           'Mayfair', 'Tacony', 'Frankford', 'Manayunk'],
    thing: ['basement', 'boiler', 'stoop', 'porch', 'trolley', 'hoagie', 'water ice', 'tomato pie', 'scrapple', 'lawn chair', 'soft pretzel', 'support post', 'washing machine', 'parking ticket'],
    weather: ['tropical remnant', 'heat wave', 'nor\'easter', 'humidity']
  },

  events: [
    { id: 'PHILADELPHIA_BRIDGES_BACKED_UP', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Crews are working on the Schuylkill Expressway and the bridges to Jersey this week.',
      title: 'The expressway is a parking lot',
      body: 'A wreck on the Schuylkill Expressway and a lane closed on the bridges have the road in and out of the city at a crawl the night of your show. The kids from out of town are stuck in it.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it, but the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'You moved doors up an hour, and the people who really wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'You lose most of the people from outside the city.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The traffic never cleared, and the suburbs and the Jersey kids stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'It takes two hours of your day, but most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads of kids took the back way in together.' }
      ] },

    { id: 'PHILADELPHIA_TROPICAL_REMNANT', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [8, 9, 10], roomKind: ['HOUSE'] },
      telegraph: 'The remnants of a hurricane are tracking up the coast.',
      title: 'The basement is taking on water',
      body: 'A dying hurricane has dumped six inches in two hours. The expressway is shut, and the water is coming up through the drain in the basement floor.',
      options: [
        { id: 'HALL', label: 'Move it to a hall on higher ground', likely: 'It costs a bigger room and a rental fee, and some of the crowd follows.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'MONEY', amount: -60 }],
          result: 'A hall took the bill, and the floor was dry and a little bare.' },
        { id: 'LATER', label: 'Move it a day, once the water goes down', likely: 'Breaks the date, which costs you trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' },
        { id: 'BAIL', label: 'Bail it out and play on', likely: 'It\'s wet, loud and risky, and the crowd is thin.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }, { op: 'STRESS', d: 3 }],
          result: 'Everyone stood on milk crates, and the band played in rubber boots.' }
      ] },

    { id: 'PHILADELPHIA_CURFEW_HALF_ROOM', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 30, bind: ['show'],
      if: { daysOut: [0, 4], ages: 'ALL', roomKind: ['HOUSE', 'HALL', 'DIY', 'SHOP'] },
      telegraph: 'The city curfew for kids under eighteen is ten o\'clock.',
      title: 'The curfew takes half the room',
      body: 'Kids under eighteen have to be off the street by ten. The headliner doesn\'t go on until ten, and half your crowd is fourteen to seventeen.',
      options: [
        { id: 'EARLY', label: 'Start at five and keep it short', likely: 'The kids get the whole bill, but the adults get out of work late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -120 }, { op: 'SHOW_MOD', key: 'genMul', v: .85, gen: 1 }],
          result: 'Doors were at five, the kids were home by nine, and the middle crowd came late.' },
        { id: 'SWAP', label: 'Put the headliner on early', likely: 'The kids see everyone, and the headliner grumbles.',
          effects: [{ op: 'SWAP_ORDER', touringTo: 'NOW' }, { op: 'TRUST', who: '$touring', d: -1 }],
          result: 'The headliner played second, and the kids heard the whole set.' },
        { id: 'ACCEPT', label: 'Let the kids leave at ten', likely: 'The room empties in the middle of the night.',
          effects: [{ op: 'SHOW_MOD', key: 'genMul', v: .5, gen: 0 }],
          result: 'At ten the room lost half its people, and the ones who stayed were older.' }
      ] },

    { id: 'PHILADELPHIA_INSPECTOR_AT_THE_DOOR', when: 'NIGHT', tier: 'HARD', weight: 1, cooldown: 40, bind: ['show'],
      if: { roomKind: ['DIY'] },
      risk: { base: .05, incident: 'NOISE' },
      telegraph: null,
      title: 'The city inspector is at the door',
      body: 'A neighbor called the city, and an inspector is on the step, polite and tired. She mentions the assembly license and the alarm quote.',
      options: [
        { id: 'TALK', label: 'Talk to her and promise to fix the exits', likely: 'She leaves a letter, and the room is on the list.',
          effects: [{ op: 'ROOM_PRESSURE', d: 10 }],
          result: 'She left a letter, and you have thirty days.' },
        { id: 'END', label: 'End the night now', likely: 'It\'s safe, and the crowd goes home.',
          effects: [{ op: 'SHOW_MOD', key: 'endEarly', v: true }, { op: 'ROOM_PRESSURE', d: 4 }],
          result: 'The set ended early and the room emptied onto the street.' },
        { id: 'ARGUE', label: 'Argue that it is just a party', likely: 'It\'s risky, and the pressure on the room goes up.',
          effects: [{ op: 'ROOM_PRESSURE', d: 20 }, { op: 'ROOM_REL', d: -10 }],
          result: 'She wrote it all down, and the landlord heard by morning.' }
      ] }
  ]
});
