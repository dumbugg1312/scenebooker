SB.Cities.register('tampa', {
  v: 1,
  slug: 'tampa',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of south florida', 'usf', 'university of tampa', 'hillsborough community college', 'hccc', 'st. petersburg college', 'eckerd college',
           'tampa bay buccaneers', 'buccaneers', 'bucs', 'tampa bay lightning', 'tampa bay rays', 'tampa bay rowdies', 'rowdies', 'tampa bay times',
           'tampa bay business journal', 'creative loafing', 'wusf', 'wmnf', 'wfla', 'wtsp', 'wfts', 'fox 13', 'gasparilla', 'super bowl', 'florida state fair',
           'macdill air force base', 'macdill', 'central command', 'centcom', 'socom', 'port tampa bay', 'tampa international airport', 'busch gardens',
           'tampa general', 'bayfront health', 'raymond james', 'tropicana field', 'amalie arena', 'hurricane helene', 'hurricane milton', 'hurricane ian',
           'hurricane irma', 'hurricane idalia', 'hillsborough county sheriff', 'tampa police', 'publix', 'amtrak', 'waffle house',
           'gasparilla music festival', 'gasparilla distance classic', 'gasparilla bowl', 'sant yago knight parade', 'guavaween', 'cuban sandwich festival', 'tampa pride',
           'festa italiana', 'tampa bay bbq festival', 'cigar heritage festival', 'raymond james stadium', 'curtis hixon', 'vinoy park', 'live nation', 'axios tampa bay',
           'cl tampa', 'baynews 9', 'bay news 9', 'tampa bay 28', 'abc action news', 'st pete catalyst', 'orlando weekly', 'miami new times'],
  blocklist: ['creative loafing*', 'tampa bay times*', 'gasparilla*', 'busch gardens*', 'macdill*', 'tropicana field*'],

  blurb: ['Two cities across a bay and all-ages shows in skateparks, tattoo shops and courtyards.',
          'Punk, hardcore and metal share bills, and volunteers run the sound and the door.'],
  hard: 'Rooms vanish, and the bridges split the crowd between Tampa and St. Pete.',
  region: 'the Gulf Coast',
  whereGo: [
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38 },
    { name: 'Miami', state: 'FL', lat: 25.76, lon: -80.19 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'Hardcore matinees at the skatepark keep the pit full.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Tampa' },
    { id: 'brandon', kind: 'FEEDER', name: 'Brandon', minutes: 25, bearing: 100, note: 'A large suburb to the east. Kids drive in.' },
    { id: 'clearwater', kind: 'FEEDER', name: 'Clearwater', minutes: 30, bearing: 295, beyond: 'bay-bridges', note: 'Beaches and bands across the bay.' },
    { id: 'largo', kind: 'FEEDER', name: 'Largo and Pinellas Park', minutes: 30, bearing: 255, beyond: 'bay-bridges', note: 'Pinellas suburbs with their own rooms.' },
    { id: 'plant-city', kind: 'FEEDER', name: 'Plant City', minutes: 35, bearing: 70, note: 'Rural east.' },
    { id: 'lakeland', kind: 'FEEDER', name: 'Lakeland', minutes: 50, bearing: 55, note: 'A middle-sized scene.' },
    { id: 'bradenton', kind: 'FEEDER', name: 'Bradenton', minutes: 50, bearing: 195, note: 'South across the bay bridge.' },
    { id: 'spring-hill', kind: 'FEEDER', name: 'Spring Hill and Brooksville', minutes: 55, bearing: 5, note: 'North suburbs. Kids with cars.' },
    { id: 'sarasota', kind: 'PEER', name: 'Sarasota', minutes: 60, bearing: 195, slug: 'sarasota-fl', note: 'A smaller scene down the coast.' },
    { id: 'orlando', kind: 'PEER', name: 'Orlando', minutes: 90, bearing: 55, slug: 'orlando', note: 'Bigger, and bands trade dates.' },
    { id: 'gainesville', kind: 'PEER', name: 'Gainesville', minutes: 150, bearing: 5, slug: 'gainesville-fl', note: 'A long-running scene up I-75.' }
  ],
  chokepoints: [
    { id: 'bay-bridges', name: 'the bay bridges', p: .03 }
  ],

  hoods: [
    { id: 'ybor', name: 'Ybor City', route: 'downtown', note: 'Brick streets, old cigar factories and nightclubs. A courtyard behind a restaurant has hosted all-ages shows.' },
    { id: 'seminole-heights', name: 'Seminole Heights', route: 'old-side', note: 'Bungalows and cheap bars. House-show territory.' },
    { id: 'sulphur-springs', name: 'Sulphur Springs', route: 'work-side', note: 'Working-class north Tampa. A metal and hardcore room opened and closed within two years.' },
    { id: 'west-tampa', name: 'West Tampa', route: 'old-side', note: 'The old Cuban neighborhood and its small shops.' },
    { id: 'downtown', name: 'downtown and Channelside', route: 'downtown', note: 'Towers, port and condos. Nothing for shows.' },
    { id: 'university-area', name: 'the university area and Temple Terrace', route: 'campus', note: 'Students, strip malls and apartment complexes.' },
    { id: 'central-ave', name: 'Central Avenue in St. Pete', route: 'downtown', note: 'Bars and galleries. A hall here hosted benefit shows.' },
    { id: 'dome-industrial', name: 'the industrial park in St. Pete', route: 'work-side', note: 'Warehouse units, one with a multi-purpose room for shows.' },
    { id: 'pinellas-suburbs', name: 'Gulfport, Pinellas Park and Largo', route: 'work-side', note: 'Cheap suburbs with house shows and strip malls.' }
  ],

  rooms: [
    { id: 'seminole-bungalow', kind: 'HOUSE', hood: 'seminole-heights', cap: 60, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 30, standing: [65, 60, 45],
      pressure: 55, start: true, note: 'A bungalow with a front-room stage. No liquor license to worry about, and the neighbors and the landlord decide how long it lasts.' },
    { id: 'ybor-courtyard', kind: 'DIY', hood: 'ybor', cap: 100, rent: 60, deposit: 0, pa: .5, curfew: 1320, ac: false, outdoor: true, sketch: 35, standing: [60, 60, 50],
      pressure: 55, note: 'A courtyard behind a restaurant. Rain sends it indoors and the development push could end it.' },
    { id: 'skate-gallery', kind: 'DIY', hood: 'west-tampa', cap: 150, rent: 70, deposit: 0, pa: .6, curfew: 1350, ac: false, sketch: 35, standing: [65, 65, 60],
      pressure: 50, needs: ['VOUCH'], note: 'The gallery room beside the skatepark: potlucks, matinees and flea markets. One thin night after another and the money stops.' },
    { id: 'skate-lot', kind: 'OUTDOOR', hood: 'west-tampa', cap: 300, rent: 20, pa: .4, curfew: 1200, sketch: 40, standing: [65, 60, 50],
      note: 'The skatepark lot: contests and free afternoon sets, and a rail for the merch table. A storm or the heat ends it.' },
    { id: 'dome-unit', kind: 'DIY', hood: 'dome-industrial', cap: 100, rent: 80, deposit: 0, pa: .6, curfew: 1380, ac: false, sketch: 45, standing: [55, 60, 45],
      pressure: 65, needs: ['VOUCH'], note: 'A warehouse unit across the bay with a multi-purpose room. A fire marshal once walked through and the unit is always one visit from gone.' },
    { id: 'vets-hall', kind: 'HALL', hood: 'university-area', cap: 150, rent: 200, deposit: 100, pa: .5, curfew: 1350, ac: true, sketch: 10, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'A rented veterans-style hall. Hardcore takes it by the night, with a fee and a list of the hall rules.' },
    { id: 'central-shop', kind: 'SHOP', hood: 'central-ave', cap: 50, pa: .4, curfew: 1290, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'A tattoo shop on Central Avenue that does benefit sets. Some parents hesitate at the door.' },
    { id: 'pinellas-garage', kind: 'HOUSE', hood: 'pinellas-suburbs', cap: 40, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: true, sketch: 25, standing: [65, 60, 50],
      pressure: 45, note: 'A garage and a backyard in the cheap ranch-house suburbs. No basements here, so it is the porch or the driveway.' },
    { id: 'springs-bar', kind: 'BAR', hood: 'sulphur-springs', cap: 200, soundFee: 60, pa: .7, ages: ['A21'], curfew: 1500, ac: true, following: .3, sketch: 25, standing: [50, 65, 65],
      pressure: 60, note: 'A bar with a stage that opened to metal and hardcore and lost its lease inside two years.' },
    { id: 'skipper-bar', kind: 'BAR', hood: 'university-area', cap: 250, soundFee: 70, pa: .8, ages: ['ALL', 'A21'], matinee: true, curfew: 1440, ac: true, following: .4, sketch: 25,
      standing: [50, 65, 70], note: 'A bar-club north of the university that books the punk revivals, with the all-ages nights marked.' },
    { id: 'ybor-club', kind: 'CLUB', hood: 'ybor', cap: 350, houseCosts: 200, split: .8, pa: .9, ages: ['A18'], curfew: 1560, ac: true, following: .6, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], pressure: 60, note: 'The last independent club in Ybor, twenty years old and squeezed by rent and a big venue planned nearby.' },
    { id: 'metal-hall', kind: 'BIG', hood: 'university-area', cap: 1500, rent: 1800, deposit: 500, pa: .95, curfew: 1380, ac: true, sketch: 10, standing: [45, 70, 70],
      owner: 'TALENT_BUYER', note: 'The big metal and hardcore room on Nebraska Avenue. Festival days are all ages with a parent for the under-18s.' }
  ],

  contacts: ['sarasota-fl', 'orlando', 'gainesville-fl', 'lakeland-fl'],

  calendar: [
    { id: 'pirate-fest', label: 'the pirate festival parade', tag: 'parade', month: 1, weeks: [4, 5], dows: [5], can: [.8, .8, .8], hoods: ['downtown', 'ybor'], elsewhere: [.95, .93, .93] },
    { id: 'ybor-parade', label: 'the Ybor night parade', tag: 'parade', month: 2, week: 2, dows: [5], can: [.85, .85, .85], hoods: ['ybor'], elsewhere: [1, 1, 1] },
    { id: 'state-fair', label: 'the state fair', tag: 'fair', month: 2, weeks: [1, 2], dows: [3, 4, 5, 6], can: [.78, .85, .9] },
    { id: 'spring-fest', label: 'the sandwich festival and the pride parade', tag: 'festival', month: 3, weeks: [3, 4], dows: [5, 6], can: [.88, .9, .9], hoods: ['ybor'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.88, .95, .95] },
    { id: 'football-dec', label: 'the bowl game', tag: 'game', month: 12, weeks: [3, 4], dows: [5], can: [.88, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1380, weekend: 1445, inForce: false } },
  points: [
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38, pop: 307000 },
    { name: 'Miami', state: 'FL', lat: 25.76, lon: -80.19, pop: 450000 },
    { name: 'Fort Myers', state: 'FL', lat: 26.64, lon: -81.87, pop: 95000 },
    { name: 'Tallahassee', state: 'FL', lat: 30.44, lon: -84.28, pop: 200000 }
  ],
  roads: ['I-275', 'I-4', 'I-75', 'the Selmon Expressway', 'Dale Mabry Highway', 'Fowler Avenue'],

  words: {
    street: ['Dale Mabry Highway', 'Nebraska Avenue', 'Florida Avenue', 'Fowler Avenue', 'Seventh Avenue', 'Central Avenue', '34th Street'],
    water: ['Tampa Bay', 'the Hillsborough River', 'Old Tampa Bay'],
    hood: ['Ybor', 'Seminole Heights', 'Sulphur Springs', 'West Tampa', 'Gulfport', 'Pinellas Park'],
    thing: ['bridge', 'skatepark', 'hurricane', 'pelican', 'snowbird'],
    weather: ['afternoon thunderstorm', 'storm surge']
  },

  events: [
    { id: 'TAMPA_BAY_BRIDGE_BACKUP', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Lanes are closing on the bridges across the bay this week.',
      title: 'The bridge is a parking lot',
      body: 'A wreck on the bay bridge has the whole crossing backed up the night of your show. The St. Pete bands and kids are stuck on the far shore.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the bay.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The bridge never cleared. The ones across the water stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads took the long way round the bay together. They will remember that.' }
      ] },

    { id: 'TAMPA_FIRE_MARSHAL', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 5], months: [1, 2, 3, 4, 5, 6, 9, 10, 11, 12] },
      telegraph: 'The fire marshal has been walking through the warehouses across the bay.',
      title: 'The fire marshal at the unit',
      body: 'A fire marshal and two police cars walk through the warehouse unit in St. Pete during load-in. You have days to find another room.',
      options: [
        { id: 'HOUSE', label: 'Move the whole bill to a house', likely: 'Smaller and louder. Nobody can walk through a house.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A bungalow took the bill with an hour to spare, and the floor was packed.' },
        { id: 'LATE', label: 'Push the show a day and look for a room', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' },
        { id: 'ACCEPT', label: 'Run it and hope', likely: 'The crowd gets thin when sirens show up.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The marshal did not come back, but half the list heard about it and stayed home.' } ] },

    { id: 'TAMPA_PIRATE_PARADE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'A parade is closing the streets downtown this Saturday.',
      title: 'The parade Saturday',
      body: 'The parade fills the streets near the courtyard and bands are stuck behind floats. The crowd is going to come in late.',
      options: [
        { id: 'LATE', label: 'Push doors back until the streets clear', likely: 'The crowd that wants a night out arrives late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. They came in through the side streets, loud and happy.' },
        { id: 'EARLIER', label: 'Move the start up and finish before the closing', likely: 'Most of them get in. A short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors early, done before the streets filled. A short, tight night.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'People are stuck in traffic.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Half the list sat in traffic and gave up.' } ] },

    { id: 'TAMPA_STATE_FAIR', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The state fair has the teenagers and the highways this week.',
      title: 'The fair week',
      body: 'The fair takes the kids to the fairgrounds, jams the highways, and a show in the middle of it looks half empty.',
      options: [
        { id: 'MATINEE', label: 'Make it an early matinee', likely: 'The kids come, and leave for the rides.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.15 }],
          result: 'An early show got the kids before the fairgrounds did. A short, packed night.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Half the list is on the midway.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The regulars came and half the list stayed at the fair.' } ] } ]
});
