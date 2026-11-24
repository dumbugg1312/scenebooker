SB.Cities.register('peoria-il', {
  v: 1,
  slug: 'peoria-il',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['peoria civic center', 'civic center', 'wcbu', 'wglt', 'peoria public radio', 'riverbender', 'peoria magazine', 'bandsintown', 'yule like peoria', 'peoria st. patrick\'s day parade', 'discover peoria', 'bradley braves', 'peoria rivermen', 'rivermen', 'bandcamp daily', 'jambase', 'songkick', 'grindkit', 'caterpillar', 'bradley university', 'bradley', 'illinois central college', 'peoria journal star', 'journal star',
           'heart of illinois fair', 'steamboat classic', 'santa claus parade', 'fiesta en el rio', 'peoria irish fest', 'peoria art guild',
           'marigold festival', 'hog days', 'pumpkin festival', 'festival of lights', 'railroad days', 'bnsf', 'amtrak', 'greyhound', 'steak n shake',
           'culver\'s', 'casey\'s', 'busch light', 'miller lite', 'pabst', 'illinois state university', 'western illinois university', 'knox college',
           'eureka college', 'murray baker bridge', 'rock island greenway', 'will it play in peoria', 'vfw', 'american legion', 'elks', 'moose lodge',
           'knights of columbus', 'cardinals', 'cubs', 'peoria chiefs', 'chiefs', 'the bluff street annex', 'lock and dam hall',
           'river bottom social club', 'the holt street garage', 'grandview pavilion', 'distillers\' row back room',
           'the knoxville avenue roller rink', 'glen oak shelter house', 'pabst lane basement', 'the sixth ward hall', 'marigold lanes',
           'the tazewell street carport'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['journal star*', 'steamboat classic*', 'steak n shake*', 'caterpillar*', 'pumpkin festival*', 'santa claus parade*'],

  blurb: ['A river city of bluffs, hospitals and heavy machinery in the middle of Illinois, where kids from every farm town and suburb around come when they want to go out.',
          'The rooms are full of regulars who all know who is playing and who is late. Basements, halls and bar back rooms carry the shows, and the ambitious ones leave for Chicago.'],
  hard: 'A fill-date town: bands only come on slow weeknights.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.2 },
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Peoria' },
    { id: 'east-peoria', kind: 'FEEDER', name: 'East Peoria', minutes: 5, bearing: 95, scene: 120, note: 'Across the river on the interstate bridge: plant families, a casino, and garages. Kids come over for everything.' },
    { id: 'pekin', kind: 'FEEDER', name: 'Pekin', minutes: 15, bearing: 180, note: 'The second city of the metro, with its own garage bands and a long rivalry with Peoria.' },
    { id: 'washington', kind: 'FEEDER', name: 'Washington', minutes: 20, bearing: 95, note: 'A fast-growing bedroom suburb with a downtown square; basement-band kids.' },
    { id: 'morton', kind: 'FEEDER', name: 'Morton', minutes: 20, bearing: 125, note: 'A church-and-football suburb southeast near the interstate.' },
    { id: 'chillicothe', kind: 'FEEDER', name: 'Chillicothe', minutes: 25, bearing: 10, note: 'A small river town to the north. Kids drive down for shows.' },
    { id: 'eureka', kind: 'FEEDER', name: 'Eureka', minutes: 30, bearing: 85, note: 'A county seat with a small college crowd.' },
    { id: 'canton', kind: 'FEEDER', name: 'Canton', minutes: 40, bearing: 235, note: 'A factory town with a community college branch.' },
    { id: 'galesburg', kind: 'FEEDER', name: 'Galesburg', minutes: 50, bearing: 295, note: 'A railroad town with two colleges and a small scene of its own, partly college-driven.' },
    { id: 'kewanee', kind: 'FEEDER', name: 'Kewanee', minutes: 60, bearing: 320, note: 'A hog-and-boiler town that lost its factory. Few shows of its own.' },
    { id: 'macomb', kind: 'FEEDER', name: 'Macomb', minutes: 80, bearing: 255, note: 'A state-university town with a real scene of its own; the crowd travels both ways.' },
    { id: 'bloomington-normal', kind: 'PEER', name: 'Bloomington and Normal', minutes: 45, bearing: 100, note: 'The closest peer: a bigger, cleaner, richer college crowd. Bands trade both ways, often on Fridays.' },
    { id: 'springfield', kind: 'PEER', name: 'Springfield', minutes: 70, bearing: 185, note: 'The state capital: a government town of about the same size.' },
    { id: 'champaign', kind: 'PEER', name: 'Champaign and Urbana', minutes: 80, bearing: 120, slug: 'champaign-il', note: 'A big flagship university and a bigger scene; a draw for Peoria kids and an obvious rival.' },
    { id: 'quad-cities', kind: 'PEER', name: 'The Quad Cities', minutes: 90, bearing: 305, slug: 'davenport-ia', note: 'The other river town across the Iowa line, and the natural tour partner on the interstate.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the riverfront warehouse district', route: 'downtown', note: 'Brick warehouses, bars with a stage and a big arena complex on the flat strip below the bluffs. Getting priced against DIY.' },
    { id: 'west-bluff', name: 'the West Bluff and the campus area', route: 'campus', note: 'Old big houses cut into apartments, fourplexes and a student strip. The likeliest home for a basement or porch show.' },
    { id: 'east-bluff', name: 'the East Bluff', route: 'old-side', note: 'Large old houses and working-class blocks around the big park, some of it blighted. House shows and the odd church hall.' },
    { id: 'north-side', name: 'the North Side, Averyville and North Valley', route: 'work-side', note: 'Poorer river-bottom blocks of warehouses, auto shops and corner bars. Cheap and ignored, but the police notice.' },
    { id: 'south-side', name: 'the South Side near the hospital district', route: 'old-side', note: 'Small wood-frame homes, storefront churches and taverns. Halls and tavern back rooms; the hospital keeps buying blocks.' },
    { id: 'peoria-heights', name: 'Peoria Heights', route: 'downtown', note: 'A separate village on the bluff with a small bar strip and its own rules.' },
    { id: 'east-peoria-hood', name: 'East Peoria', route: 'work-side', note: 'Across the river: basements and garages in blue-collar blocks. A band from here is from across the river.' },
    { id: 'west-edge', name: 'West Peoria and Bartonville', route: 'work-side', note: 'Older houses with lots of garages and cheap rents, for people who commute to the plant.' },
    { id: 'east-peoria-town', name: 'East Peoria', route: 'town:east-peoria', note: 'Across the river in its own town: basements and garages in blue-collar blocks. A band from here is from across the river.' }
  ],

  rooms: [
    { id: 'bluff-house', kind: 'HOUSE', hood: 'west-bluff', cap: 60, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, standing: [70, 60, 45],
      pressure: 50, start: true, note: 'An ordinary-looking house near the campus that its owner bought to host shows. The neighbors and the owner\'s lease are the only clock.' },
    { id: 'river-house', kind: 'HOUSE', hood: 'east-peoria-town', cap: 40, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, standing: [65, 60, 45],
      pressure: 50, note: 'A garage and a basement across the river in a blue-collar block. Parents upstairs, and everyone out by ten.' },
    { id: 'garage-house', kind: 'HOUSE', hood: 'west-edge', cap: 35, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, rent: 0, standing: [65, 60, 50],
      pressure: 45, note: 'An old house with a big garage and a cheap rent. It all ends the day the landlord sells.' },
    { id: 'borrowed-room', kind: 'DIY', hood: 'east-bluff', cap: 100, pa: .5, curfew: 1350, ac: false, sketch: 45, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'A side room somebody has the key to. Teens in this town have always borrowed rooms, and the insurer and the fire marshal are the ones who notice.' },
    { id: 'south-hall', kind: 'HALL', hood: 'south-side', cap: 150, pa: .5, curfew: 1320, ac: true, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'A veterans\'-type hall rented by the night. It needs a member to vouch and a deposit, and it can say no next time.' },
    { id: 'record-shop', kind: 'SHOP', hood: 'downtown', cap: 60, pa: .4, curfew: 1260, ac: true, standing: [65, 65, 75], following: .2,
      note: 'A store with a cleared floor where the old punk shop used to be. Over by nine, and the era is past, so this one is a fresh start.' },
    { id: 'skate-yard', kind: 'OUTDOOR', hood: 'north-side', cap: 80, rent: 10, pa: .4, curfew: 1230, standing: [60, 55, 45],
      note: 'A skatepark or a backyard in daylight. The weather and the park rules decide whether it happens.' },
    { id: 'heights-bar', kind: 'BAR', hood: 'peoria-heights', cap: 200, soundFee: 50, pa: .7, ages: ['A21'], curfew: 1500, ac: true, following: .3, standing: [50, 65, 70],
      note: 'A bar and pizza room on the bluff strip that runs punk bills and all-day fests. Twenty-one and up, so the kids stay home.' },
    { id: 'strip-bar', kind: 'BAR', hood: 'downtown', cap: 120, soundFee: 50, pa: .6, ages: ['A21'], curfew: 1500, ac: true, following: .3, standing: [45, 65, 70],
      note: 'A downtown bar with a stage and punk nights. It shares its Friday with whatever the arena is doing.' },
    { id: 'old-theater', kind: 'CLUB', hood: 'downtown', cap: 600, houseCosts: 200, split: .8, pa: .9, ages: ['ALL'], curfew: 1380, ac: true, following: .6, standing: [45, 70, 70],
      owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A restored downtown theater, the best local-band stage in town. It has changed owners before and wants a name on the bill.' }
  ],
  contacts: ['champaign-il', 'davenport-ia', 'rockford-il', 'chicago', 'st-louis'],

  calendar: [
    { id: 'river-race', label: 'the river race weekend', tag: 'race', month: 6, week: 1, dows: [4, 5], can: [.88, .85, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 7, weeks: [2, 3], dows: [3, 4, 5, 6], can: [.92, .90, .90] },
    { id: 'irish-weekend', label: 'the Irish festival', tag: 'festival', month: 8, weeks: [4, 5], dows: [4, 5, 6], can: [.90, .88, .88], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'march-parade', label: 'the March parade', tag: 'parade', month: 3, week: 3, dows: [5], can: [.90, .90, .88], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'holiday-parade', label: 'the holiday parade', tag: 'parade', month: 11, week: 4, dows: [4, 5], can: [.90, .92, .95], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1380, weekend: 1440, inForce: true } },

  points: [
    { name: 'Bloomington', state: 'IL', lat: 40.48, lon: -88.99, pop: 131000 },
    { name: 'Springfield', state: 'IL', lat: 39.8, lon: -89.65, pop: 114000 },
    { name: 'Decatur', state: 'IL', lat: 39.84, lon: -88.95, pop: 70000 },
    { name: 'Galesburg', state: 'IL', lat: 40.95, lon: -90.37, pop: 30000 }
  ],
  roads: ['I-74', 'I-474', 'I-155', 'US 150', 'US 24', 'IL 29'],

  words: {
    street: ['Knoxville Avenue', 'War Memorial Drive', 'Farmington Road', 'University Street', 'Main Street', 'Adams Street'],
    water: ['the Illinois River', 'Peoria Lake', 'Spring Creek'],
    hood: ['Averyville', 'North Valley', 'West Bluff', 'East Bluff', 'Peoria Heights', 'Bartonville', 'West Peoria', 'Glen Oak', 'Grandview Drive'],
    thing: ['tenderloin', 'square-cut pizza', 'parish hall', 'bluff', 'river bottom', 'grain elevator', 'shift change', 'parent\'s basement', 'van breakdown'],
    weather: ['tornado watch', 'ice storm', 'river flood']
  },

  events: [
    { id: 'PEORIA_IL_PARADE_LOADIN', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'There\'s a parade downtown the day your bill loads in, and the cones are already out.',
      title: 'The parade closes the street',
      body: 'The streets below the bluff are shut for the parade, so the van has to park up on the hill and carry the gear down on foot, and the bands are not happy about the stairs.',
      options: [
        { id: 'CARRY', label: 'Carry it all down the hill', likely: 'It takes two hours of your day, and the crowd comes out of the parade early.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.05 }],
          result: 'You and the drummer hauled the amps down in relays, and the parade crowd drifted in as it let out.' },
        { id: 'LATE', label: 'Push doors back until the street opens', likely: 'It starts late, and the early crowd goes home.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 75 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The street reopened at dark, and you started late, and the people who waited were loud about it.' },
        { id: 'ACCEPT', label: 'Run it as planned and eat the mess', likely: 'Half the bill arrives sweaty and angry.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The first band went on twenty minutes late and played like they were still carrying the drums.' }
      ] },

    { id: 'PEORIA_IL_FAIR_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'It\'s fair week out on the edge of town, and every kid you know has a ride ticket.',
      title: 'Fair week empties the bluff',
      body: 'It\'s a mid-week house show in fair week, and the East Bluff kids are all out at the fairgrounds. You expected a full basement and you\'re looking at half of one.',
      options: [
        { id: 'SMALL', label: 'Run it small and loose', likely: 'You get half the crowd you wanted, and a good night for the people who come.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'Twenty people in a basement built for sixty, and the best set of the month.' },
        { id: 'LATER', label: 'Start late and catch them after the rides close', likely: 'It\'s a later night, and some of the fair comes by.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'You opened doors an hour late, and the kids came straight from the fair with their hands still sticky.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and the bands trust you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'PEORIA_IL_RACE_FRIDAY', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 3], calendar: 'race' },
      telegraph: 'The race weekend pre-party is Friday, and the downtown bars are already taking reservations.',
      title: 'The pre-party crowd is not your crowd',
      body: 'The downtown bars are full of people in matching shirts who came for the race, and they are annoyed by a loud band in the corner. The owner is nervous about the complaints.',
      options: [
        { id: 'EARLY', label: 'Move the loud part up before they get drunk', likely: 'It\'s a shorter night, and the owner relaxes.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'You got the loud bands on before nine, and the pre-party crowd barely noticed.' },
        { id: 'PAY', label: 'Buy the bartender a round and keep the volume up', likely: 'It costs a little, and the night goes ahead.',
          effects: [{ op: 'MONEY', amount: -30 }, { op: 'REGULARS', pct: .02 }],
          result: 'You bought a round for the bar and promised to turn it down at eleven, and the punks and the racers shared a room.' },
        { id: 'ACCEPT', label: 'Run it and ignore the stares', likely: 'Some of them leave.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Two tables of racers left mid-song, and the rest of the room got louder.' }
      ] }
  ]
});
