SB.Cities.register('greenville-sc', {
  v: 1,
  slug: 'greenville-sc',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['clemson university', 'clemson tigers', 'furman university', 'furman', 'bob jones university', 'north greenville university', 'greenville technical college',
           'greenville news', 'upstate business journal', 'fox carolina', 'wyff', 'wspa', 'wfbc', 'greenville drive', 'south carolina gamecocks', 'gamecocks', 'bmw',
           'michelin', 'ge vernova', 'prisma health', 'bon secours', 'bi-lo', 'bon secours wellness arena', 'peace center', 'fluor', 'bmw manufacturing', 'euphoria',
           'artisphere', 'fall for greenville', 'hurricane hugo', 'falls park', 'metal monday', 'swamp rabbit trail',
           'upper sc state fair', 'upper south carolina state fair', 'poinsettia christmas parade', 'greenville jaycees', 'upstate renaissance faire', 'hollywild',
           'greenville journal', 'upcountry history museum', 'east carolinian', 'whiskey riff', '6am city', 'gvltoday', 'greenville zoo', 'boo in the zoo',
           'moonlight movies', 'greenwave music festival', 'greenville county sheriff', 'greenville police department'],
  blocklist: ['greenville news*', 'peace center*', 'euphoria greenville*', 'artisphere*', 'bon secours*', 'fall for greenville*'],

  blurb: ['Mill-town suburbs under the foothills, where grind and sludge crowd the same dive bars as a fast-growing hardcore night.',
          'Halfway between Atlanta and Charlotte, and it feels it, with few colleges, a polished downtown and a church lot next to every show.'],
  hard: 'Few colleges, liquor-liability costs and a church-heavy calendar.',
  region: 'the Southeast',
  houseType: 'LIVING_ROOM',
  whereGo: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 }
  ],

  tilt: [
    { fan: 'metal', band: 'metal', d: .08, reason: 'A working-class death, grind and sludge underground runs deep here.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Greenville' },
    { id: 'greer', kind: 'FEEDER', name: 'Greer', minutes: 20, bearing: 60, note: 'A suburb toward Spartanburg. Bar shows and a few bands.' },
    { id: 'lyman', kind: 'FEEDER', name: 'Lyman and Duncan', minutes: 25, bearing: 55, note: 'East bedroom towns.' },
    { id: 'easley', kind: 'FEEDER', name: 'Easley and Pickens', minutes: 25, bearing: 290, note: 'Foothills towns with teen bands.' },
    { id: 'anderson', kind: 'FEEDER', name: 'Anderson', minutes: 35, bearing: 215, note: 'A small city of churches and factories. Kids drive in.' },
    { id: 'clemson', kind: 'FEEDER', name: 'Clemson', minutes: 40, bearing: 270, note: 'A university town with its own separate house scene.' },
    { id: 'laurens', kind: 'FEEDER', name: 'Laurens', minutes: 40, bearing: 170, note: 'A mill town south.' },
    { id: 'seneca', kind: 'FEEDER', name: 'Seneca and Walhalla', minutes: 55, bearing: 285, note: 'Mountain-edge towns.' },
    { id: 'spartanburg', kind: 'PEER', name: 'Spartanburg', minutes: 40, bearing: 55, slug: 'spartanburg-sc', note: 'A smaller scene next door.' },
    { id: 'asheville', kind: 'PEER', name: 'Asheville', state: 'NC', minutes: 70, bearing: 335, slug: 'asheville-nc', note: 'Arty, with a bigger pull.' },
    { id: 'athens', kind: 'PEER', name: 'Athens', state: 'GA', minutes: 100, bearing: 245, slug: 'athens-ga', note: 'A college town across the state line.' },
    { id: 'columbia', kind: 'PEER', name: 'Columbia', minutes: 105, bearing: 155, slug: 'columbia-sc', note: 'Where the early metalcore wave came from.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Main Street', route: 'downtown', note: 'Tourist restaurants and a few music rooms. Not the punk end.' },
    { id: 'west-end', name: 'the West End', route: 'downtown', note: 'An old warehouse and mill district west of downtown. Rock clubs and dive bars.' },
    { id: 'augusta-road', name: 'Augusta Road and Overbrook', route: 'old-side', note: 'Older bungalows and thrift stores.' },
    { id: 'berea', name: 'Berea and Poe Mill', route: 'work-side', note: 'Old mill villages, cheap rent and some house shows.' },
    { id: 'taylors', name: 'Taylors', route: 'work-side', note: 'An east side strip of bars and arcades.' },
    { id: 'sans-souci', name: 'Sans Souci and Parker', route: 'work-side', note: 'Lower-income mill village flats.' },
    { id: 'judson', name: 'Judson and Woodside', route: 'work-side', note: 'Mill neighborhoods near the river.' },
    { id: 'travelers-rest', name: 'Travelers Rest', route: 'campus', note: 'A north bedroom town on the greenway. Arty and full of cyclists.' },
    { id: 'mauldin', name: 'Mauldin and Simpsonville', route: 'campus', note: 'Big suburbs to the south. Kids who drive.' }
  ],

  rooms: [
    { id: 'berea-house', kind: 'HOUSE', hood: 'berea', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 50],
      pressure: 50, start: true, note: 'A living room and screened porch in an old mill house. Word of mouth, all ages, and a church lot across the street on Sunday.' },
    { id: 'souci-flat', kind: 'HOUSE', hood: 'sans-souci', cap: 40, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [60, 60, 45],
      pressure: 50, note: 'A shared flat with a back room. Thin supply: shows come and go with the lease.' },
    { id: 'west-end-diy', kind: 'DIY', hood: 'west-end', cap: 100, rent: 70, deposit: 0, pa: .5, curfew: 1380, ac: false, sketch: 40, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'A rented warehouse room that hosted benefits. One such room opened and was lost inside a year, so nobody trusts the lease.' },
    { id: 'taylors-bay', kind: 'DIY', hood: 'taylors', cap: 60, rent: 50, deposit: 0, pa: .5, curfew: 1350, ac: false, sketch: 35, standing: [55, 60, 45],
      pressure: 55, needs: ['VOUCH'], note: 'A practice-space bay tucked behind the bar strip. Cheap, loud and one complaint from gone.' },
    { id: 'skatepark', kind: 'OUTDOOR', hood: 'mauldin', cap: 120, rent: 10, pa: .4, curfew: 1290, ac: false, outdoor: true, sketch: 35, standing: [60, 55, 40],
      pressure: 50, note: 'A skatepark with a ramp shed that has hosted punk and hardcore. All ages, until the sun drops and the neighbors call.' },
    { id: 'mill-hall', kind: 'HALL', hood: 'judson', cap: 150, deposit: 100, pa: .6, ages: ['A18'], curfew: 1350, ac: true, sketch: 10, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'A converted mill hall by the river where ticketed nights are 18 and up. The rent is the whole risk.' },
    { id: 'taylors-bar', kind: 'BAR', hood: 'taylors', cap: 120, soundFee: 50, pa: .7, ages: ['A21'], curfew: 1500, ac: true, following: .3, sketch: 20, standing: [50, 65, 65],
      pressure: 55, note: 'A dive bar with a stage in a strip of bars and arcades. Metal and grind nights, and an insurer who reads the calendar.' },
    { id: 'west-end-bar', kind: 'BAR', hood: 'west-end', cap: 140, soundFee: 60, pa: .7, ages: ['A21'], curfew: 1500, ac: true, following: .3, sketch: 20, standing: [50, 65, 70],
      note: 'A rock bar in an old warehouse block. Mixed weeknights and a bartender who remembers who pays.' },
    { id: 'road-club', kind: 'CLUB', hood: 'augusta-road', cap: 300, houseCosts: 200, split: .8, pa: .9, ages: ['ALL'], curfew: 1410, ac: true, following: .5, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], pressure: 50, note: 'The long-running club on the main road out of town: hardcore and metal beside folk acts, mostly all ages. Thin margins, and listings say rooms like it keep closing.' },
    { id: 'downtown-club', kind: 'CLUB', hood: 'downtown', cap: 250, houseCosts: 180, split: .8, pa: .85, ages: ['A18'], curfew: 1380, ac: true, following: .4, sketch: 10,
      standing: [45, 65, 65], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A tourist-strip room of cover bands. A punk bill is a one-off, and the downtown curfew sends the kids home at ten.' },
    { id: 'west-end-amph', kind: 'BIG', hood: 'west-end', cap: 1700, rent: 2000, deposit: 500, pa: 1, curfew: 1380, ac: false, outdoor: true, sketch: 5, standing: [40, 70, 70],
      note: 'A new amphitheater-style room near the West End. Touring packages only, far above any basement bill.' }
  ],

  contacts: ['spartanburg-sc', 'asheville-nc', 'athens-ga', 'columbia-sc', 'charlotte'],

  calendar: [
    { id: 'fall-fest', label: 'the fall food-and-music festival', tag: 'festival', month: 10, week: 2, dows: [3, 4, 5, 6], can: [.85, .88, .90], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'spring-arts', label: 'the spring arts festival', tag: 'festival', month: 5, week: 2, dows: [4, 5, 6], can: [.88, .90, .92], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'sept-fest', label: 'the September food and music weekend', tag: 'festival', month: 9, week: 3, dows: [3, 4, 5, 6], can: [.90, .92, .92], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'xmas-parade', label: 'the Christmas parade', tag: 'parade', month: 12, week: 1, dows: [5], can: [.85, .90, .90], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1560, weekend: 1320, inForce: true } },

  points: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 6400000 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 2938830 },
    { name: 'Asheville', state: 'NC', lat: 35.57, lon: -82.55, pop: 422345 },
    { name: 'Columbia', state: 'SC', lat: 34.04, lon: -80.91, pop: 879918 }
  ],
  roads: ['I-85', 'I-385', 'I-185', 'Wade Hampton Boulevard', 'Pleasantburg Drive', 'White Horse Road'],

  words: {
    street: ['Main Street', 'Pleasantburg Drive', 'Wade Hampton Boulevard', 'Augusta Road', 'White Horse Road', 'Laurens Road'],
    water: ['the Reedy', 'Lake Keowee', 'the Saluda'],
    hood: ['the West End', 'Berea', 'Poe Mill', 'Taylors', 'Travelers Rest', 'Mauldin', 'Sans Souci', 'Overbrook'],
    thing: ['mill village', 'pollen', 'kudzu', 'screened porch', 'greenway', 'church lot', 'car plant shift'],
    weather: ['pollen', 'ice storm', 'tropical remnant']
  },

  events: [
    { id: 'GREENVILLE_SC_INSURANCE_LETTER', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 6] },
      telegraph: 'The bar owner has been quiet about the all-ages nights.',
      title: 'The insurance letter',
      body: 'A letter came from the bar\'s insurer this week and the owner would not say what it said, and now the owner wants a word before doors.',
      options: [
        { id: 'ADULTS', label: 'Make it 21 and up this once', likely: 'Keeps the room but locks out the kids.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The kids waited outside and some of them left, but the bar kept you on the calendar.' },
        { id: 'PAY', label: 'Cover the extra cost yourself', likely: 'Costs fifty dollars.',
          effects: [{ op: 'MONEY', amount: -50 }, { op: 'REGULARS', pct: .02 }],
          result: 'The owner took the cash and kept the door open for everyone.' },
        { id: 'MOVE', label: 'Take it to a living room', likely: 'Smaller, with fewer rules and a church lot next door.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A mill village house took the whole bill, and the screened porch was the green room.' }
      ] },

    { id: 'GREENVILLE_SC_DOWNTOWN_CURFEW', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4] },
      telegraph: 'The kids on the list are all under eighteen, and the downtown curfew is enforced on Fridays and Saturdays.',
      title: 'Ten o\'clock and the kids',
      body: 'The show runs past ten in the downtown strip, where police hold anyone under eighteen until a parent comes, and half your crowd is under eighteen. The bar has no earlier slot.',
      options: [
        { id: 'EARLY', label: 'Move doors up and finish before ten', likely: 'Tight, but the kids get a whole bill and a ride home.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The last chord rang at five to ten and every kid made it home, though it felt rushed.' },
        { id: 'HOUSE', label: 'Take the bill to a living room', likely: 'Smaller, and out of the curfew zone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A mill house took the whole bill, and nobody was held at the city building.' },
        { id: 'ACCEPT', label: 'Run it and hope', likely: 'The ones who get picked up never come back.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Two vans of parents waited at the city building and the kids who went home early did not return.' }
      ] },

    { id: 'GREENVILLE_SC_FEST_KICKOFF', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The festival kickoff is Thursday and downtown is already coned off.',
      title: 'The street is closed',
      body: 'Main Street is shut for the festival kickoff and the van is circling the block looking for a legal place to unload, and the band is on the phone.',
      options: [
        { id: 'LATE', label: 'Push doors back an hour', likely: 'They get in, loud and late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .92 }],
          result: 'The van found a curb at last, doors opened an hour late, and the crowd poured in off the street.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Half the crowd is stuck behind the barricades.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The barricades kept half the list out, but the ones who walked in stayed.' }
      ] },

    { id: 'GREENVILLE_SC_DUSK_CALL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [4, 5, 6, 7, 8, 9] },
      telegraph: 'The skatepark show is set for the evening light, and a neighbor has been watching it.',
      title: 'The neighbors call it in',
      body: 'The sun is dropping and the amps are still going, and one neighbor has called twice and city police are on the way.',
      options: [
        { id: 'SHORT', label: 'Cut the last two sets short', likely: 'You keep the park, and the crowd groans.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The last bands got ten minutes each, and nobody got a ticket.' },
        { id: 'MOVE', label: 'Take the bill to a living room', likely: 'Smaller, and out of the light.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .5 }],
          result: 'The crowd followed the vans to a porch, and it ran late and loud.' }
      ] }
  ]
});
