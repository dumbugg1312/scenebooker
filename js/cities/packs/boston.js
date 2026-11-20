SB.Cities.register('boston', {
  v: 1,
  slug: 'boston',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['boston university', 'northeastern university', 'northeastern', 'berklee', 'emerson college', 'simmons university', 'wentworth institute',
           'harvard', 'tufts', 'massachusetts institute of technology', 'boston college', 'brandeis', 'umass', 'the crimson', 'vanyaland',
           'boston globe', 'boston herald', 'red sox', 'bruins', 'celtics', 'td garden', 'gillette stadium', 'boston calling', 'head of the charles',
           'boston marathon', 'marathon monday', 'patriots day', 'patriots\' day', 'mbta', 'green line', 'orange line', 'blue line', 'silver line',
           'north station', 'south station', 'dunkin', 'dunkin\'', 'narragansett', 'sam adams', 'samuel adams', 'allston christmas', 'storrowed',
           'rock city', 'station nightclub', 'ghost ship', 'vfw', 'american legion', 'knights of columbus', 'licensing board', 'boston police',
           'joint base cape cod', 'mashpee wampanoag', 'caribbean carnival', 'the brighton ave cellar', 'post 442', 'lower mills parish hall',
           'sullivan yard', 'egleston storefront', 'magoun loading dock', 'neponset social club', 'the fells annex', 'chelsea creek warehouse',
           'the pike underpass sessions', 'kenmore back room', 'harvard ave rec room', 'medford mill studios', 'the charles bank moving company'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The subway is "the subway"; the September 1 move is "move-in weekend". */
  blocklist: ['boston calling*', 'head of the charles*', 'vanyaland*', 'boston globe*', 'dunkin*', 'narragansett*', 'allston christmas*', 'rock city*'],

  blurb: ['A tight old harbor city where hardcore is a family inheritance, played in basements with the address held back until the day.',
          'Landlords and neighbors keep closing them, and every September the houses turn over.'],
  hard: 'Basements get closed by landlords and neighbors; the middle rooms are gone.',
  region: 'New England',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .10, reason: 'A town that was one of the first to build a hardcore scene, and has not forgotten it.' },
    { fan: 'hardcore', band: 'metal', d: .07, reason: 'The heavy festivals pull the same crowd as hardcore.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Boston' },
    { id: 'salem', kind: 'FEEDER', name: 'Salem and Lynn', minutes: 30, bearing: 40, note: 'A tourist and college city and a working-class former shoe city. Small active scenes, both in the city\'s orbit.' },
    { id: 'brockton', kind: 'FEEDER', name: 'Brockton', minutes: 40, bearing: 190, note: 'A working-class shoe city with Cape Verdean and Haitian communities, and a stubborn hardcore and metal presence.' },
    { id: 'lowell', kind: 'FEEDER', name: 'Lowell', minutes: 45, bearing: 320, note: 'An old mill city with a long hardcore and metal tradition and not much else for kids to do.' },
    { id: 'lawrence', kind: 'FEEDER', name: 'Lawrence', minutes: 40, bearing: 340, note: 'A poor, young, mostly Latino mill city. A small scene that rides in on the train.' },
    { id: 'haverhill', kind: 'FEEDER', name: 'Haverhill', minutes: 45, bearing: 350, note: 'A mill and river town on the New Hampshire line. Some hall shows and a good stop for kids from over the border.' },
    { id: 'plymouth', kind: 'FEEDER', name: 'Plymouth and the South Shore', minutes: 65, bearing: 155, beyond: 'southeast-expressway',
      note: 'Tourist town, suburbs and beach towns. Suburban kids with cars and a friend with a hall.' },
    { id: 'fitchburg', kind: 'FEEDER', name: 'Fitchburg', minutes: 65, bearing: 285, note: 'A post-industrial mill city with a state college. Kids drive the highway in carloads.' },
    { id: 'southcoast', kind: 'FEEDER', name: 'Fall River and New Bedford', state: 'MA', minutes: 70, bearing: 190, note: 'Mill and fishing cities with Portuguese and Cape Verdean communities. Small, stubborn scenes that come up in a van.' },
    { id: 'portsmouth', kind: 'FEEDER', name: 'Portsmouth', state: 'NH', minutes: 60, bearing: 5, note: 'A small port and tourist city with a shipyard. Kids cross the line both ways.' },
    { id: 'cape', kind: 'FEEDER', name: 'Cape Cod', minutes: 90, bearing: 140, beyond: 'southeast-expressway',
      note: 'A beach and seasonal-economy region. In winter there is little for the year-round kids to do, so they cross the bridge for shows.',
      season: { months: [6, 7, 8], mul: 1.4 } },
    { id: 'worcester', kind: 'PEER', name: 'Worcester', minutes: 45, bearing: 280, slug: 'worcester-ma',
      note: 'A big hardcore, metal and DIY scene of its own. The big-room cousin, and a rival for the weeknight.' },
    { id: 'providence', kind: 'PEER', name: 'Providence', state: 'RI', minutes: 65, bearing: 215, scene: 6000,
      note: 'An arts and college city with its own DIY tradition. Bands trade shows constantly; the little sibling joke never dies.' },
    { id: 'manchester', kind: 'PEER', name: 'Manchester', state: 'NH', minutes: 60, bearing: 340, slug: 'manchester-nh',
      note: 'A former mill city with cheap liquor over the line and a small active scene.' },
    { id: 'portland-me', kind: 'PEER', name: 'Portland', state: 'ME', minutes: 120, bearing: 15, slug: 'portland-me',
      note: 'A port city with an arts scene and its own DIY world, a natural stop on the way up the coast.' }
  ],

  chokepoints: [
    { id: 'southeast-expressway', name: 'the Southeast Expressway', p: .02 }
  ],

  hoods: [
    { id: 'allston', name: 'Allston and Brighton', route: 'campus', note: 'Brick apartment blocks and chopped-up houses by the university and the Pike. The old home of the scene, now more nostalgia than cheap.' },
    { id: 'cambridge', name: 'Central Square and Inman', route: 'campus', note: 'Across the river: storefront rooms, tiny record shops and community spaces, priced by the two big universities and the labs.' },
    { id: 'somerville', name: 'Somerville', route: 'old-side', note: 'Triple-deckers and old mills full of artists. The most active ground of the last fifteen years, now expensive.' },
    { id: 'jp', name: 'Jamaica Plain', route: 'old-side', note: 'Big old houses and triple-deckers along the subway. A family-and-artist mix that still has punk-adjacent basements.' },
    { id: 'fenway', name: 'Fenway, Kenmore and Mission Hill', route: 'campus', note: 'The old first-generation club strip, now ballpark crowds and student rentals. Mission Hill is cheaper, hilly and full of house shows.' },
    { id: 'dorchester', name: 'Dorchester, Roxbury and Mattapan', route: 'work-side', note: 'The biggest and most mixed neighborhoods: triple-deckers with basements, social halls and church basements. More space, little existing scene.' },
    { id: 'ring', name: 'East Boston, Chelsea, Everett, Malden and Medford', route: 'work-side', note: 'Warehouses and light industry along cheap commercial rents. Where the big semi-legal shows cluster, and where the redevelopment is moving.' },
    { id: 'southie', name: 'South Boston and Quincy', route: 'old-side', note: 'A working-class Irish neighborhood that has gentrified hard, and the old South Shore bar-and-hall tradition.' },
    { id: 'downtown', name: 'Downtown and the waterfront', route: 'downtown', note: 'The old warehouse and loft rooms are priced out and redeveloped. The new waterfront is a joke in scene conversation.' }
  ],

  rooms: [
    { id: 'allston-basement', kind: 'HOUSE', hood: 'allston', cap: 60, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 25, standing: [70, 60, 45],
      pressure: 55, start: true, note: 'A low stone basement under a chopped-up house. One narrow stair, a boiler overhead, and a landlord who lives on the first floor.' },
    { id: 'jp-house', kind: 'HOUSE', hood: 'jp', cap: 50, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 20, standing: [70, 55, 45], pressure: 50,
      note: 'A big old house in Jamaica Plain with a finished cellar. Kind neighbors, if you keep it down.' },
    { id: 'somerville-floor', kind: 'HOUSE', hood: 'somerville', cap: 45, hostCut: 0, pa: .3, curfew: 1380, ac: false, outdoor: false, sketch: 20, standing: [70, 55, 40], pressure: 55,
      note: 'A triple-decker floor. The neighbors above and below are the whole problem.' },
    { id: 'dot-yard', kind: 'OUTDOOR', hood: 'dorchester', cap: 80, pa: .4, curfew: 1380, ac: false, sketch: 30, standing: [60, 55, 45],
      note: 'A backyard behind a triple-decker, with a generator. Summer only, and the city says quiet by eleven.' },
    { id: 'social-hall', kind: 'HALL', hood: 'dorchester', cap: 150, rent: 150, deposit: 75, pa: .6, curfew: 1380, ac: true, sketch: 10, standing: [55, 60, 70],
      owner: 'HALL_MANAGER', note: 'A social club hall with a kitchen and a stage. The key depends on the commander\'s mood, and Tuesday is bingo.' },
    { id: 'parish-basement', kind: 'HALL', hood: 'jp', cap: 100, rent: 80, deposit: 0, pa: .5, curfew: 1320, ac: true, sketch: 5, standing: [65, 60, 60],
      owner: 'CHURCH_CONTACT', pressure: 50, note: 'A parish hall with a stage. No beer, and early.' },
    { id: 'ring-warehouse', kind: 'DIY', hood: 'ring', cap: 180, rent: 100, deposit: 0, pa: .6, curfew: 1440, ac: false, sketch: 55, standing: [55, 60, 45], pressure: 65, needs: ['VOUCH'],
      note: 'A warehouse bay out past the cheap rents. Big, risky and one inspection from over.' },
    { id: 'mill-studios', kind: 'DIY', hood: 'somerville', cap: 100, rent: 70, deposit: 0, pa: .5, curfew: 1380, ac: false, sketch: 40, standing: [55, 60, 45], pressure: 60, needs: ['VOUCH'],
      note: 'An old mill cut into practice rooms and studios, with shows slipped in on weekends. One landlord, one fire inspection.' },
    { id: 'community-room', kind: 'DIY', hood: 'cambridge', cap: 90, rent: 60, deposit: 0, pa: .5, curfew: 1380, ac: true, sketch: 10, standing: [65, 65, 55], pressure: 40,
      note: 'An all-ages room run by an activist group. Benefits first, and the rent is under pressure.' },
    { id: 'records', kind: 'SHOP', hood: 'cambridge', cap: 35, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'A tiny record shop that hosts noise and experimental shows in the afternoon.' },
    { id: 'allston-bar', kind: 'BAR', hood: 'allston', cap: 130, soundFee: 50, pa: .7, ages: ['A18', 'A21'], matinee: true, curfew: 1560, ac: true, following: .3, sketch: 15,
      standing: [50, 65, 70], note: 'A back-room bar with wristbands for the 18-and-up early show. Everyone else is carded.' },
    { id: 'ballpark-club', kind: 'CLUB', hood: 'fenway', cap: 320, houseCosts: 180, split: .8, pa: .9, ages: ['A21', 'A18'], curfew: 1560, ac: true, following: .6, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A real club on the old strip. It wants six weeks and a name, and a night with no home game.' }
  ],

  contacts: ['worcester-ma', 'manchester-nh', 'portland-me', 'new-york', 'new-haven-ct'],

  weather: { preset: 'NORTHEAST', fineMonths: [5, 9, 10], coolMonths: [10],
             storm: { months: [12, 1, 2, 3], peak: [1, 2], perWeek: .02, perWeekPeak: .06 } },

  calendar: [
    { id: 'marathon', label: 'the marathon', tag: 'race', month: 4, week: 3, dows: [0], can: [.80, .70, .80], hoods: ['allston', 'fenway'], elsewhere: [.95, .93, .95] },
    { id: 'regatta', label: 'the rowing regatta weekend', tag: 'festival', month: 10, week: 3, dows: [4, 5, 6], can: [.90, .88, .90], hoods: ['cambridge', 'allston'], elsewhere: [.97, .95, .95] },
    { id: 'movein', label: 'move-in weekend', tag: 'movein', month: 9, week: 1, dows: [4, 5, 6], can: [.82, .90, 1], hoods: ['allston', 'fenway', 'somerville'], elsewhere: [.92, .95, 1] },
    { id: 'graduation', label: 'graduation weekend', tag: 'graduation', month: 5, weeks: [3, 4], dows: [4, 5], can: [.80, .90, 1] },
    { id: 'parade', label: 'the South Boston parade', tag: 'parade', month: 3, week: 3, dows: [6], can: [.90, .85, .85], hoods: ['southie'], elsewhere: [1, 1, 1] },
    { id: 'carnival', label: 'the late-summer carnival', tag: 'festival', month: 8, week: 4, dows: [5], can: [.93, .90, .92], hoods: ['dorchester'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1380 },

  points: [
    { name: 'Providence', state: 'RI', lat: 41.82, lon: -71.41, pop: 1600000 },
    { name: 'Albany', state: 'NY', lat: 42.65, lon: -73.76, pop: 880000 },
    { name: 'Hartford', state: 'CT', lat: 41.76, lon: -72.67, pop: 1200000 },
    { name: 'Montreal', state: 'QC', lat: 45.50, lon: -73.57, pop: 4300000 }
  ],
  roads: ['I-90', 'I-93', 'I-95', 'Route 128', 'I-495', 'Route 3'],

  words: {
    street: ['Brighton Avenue', 'Cambridge Street', 'Centre Street', 'Commonwealth Avenue', 'Mass Ave', 'Storrow Drive', 'Dudley Street', 'Washington Street'],
    water: ['the Charles', 'Neponset', 'Chelsea Creek', 'Jamaica Pond', 'the Esplanade'],
    hood: ['Allston', 'Brighton', 'Central Square', 'Inman Square', 'Union Square', 'Davis Square', 'Jamaica Plain', 'Mission Hill', 'Fields Corner', 'Egleston Square',
           'Uphams Corner', 'Dorchester', 'Roxbury', 'Mattapan', 'East Boston', 'Chelsea', 'Everett', 'Malden', 'Medford', 'Southie', 'Fort Point'],
    thing: ['triple-decker', 'bulkhead', 'boiler', 'rotary', 'packie', 'grinder', 'frappe', 'space saver', 'lawn chair', 'nor\'easter'],
    weather: ['nor\'easter', 'snow emergency', 'black ice', 'humidity', 'tropical remnant'],
    surnames: ['Murphy', 'Sullivan', 'Oliveira', 'Nguyen', 'DaSilva', 'Rossi', 'Duarte', 'Pierre', 'Kowalski']
  },

  events: [
    { id: 'BOSTON_MOVE_IN_TRUCK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'movein' },
      telegraph: 'It is move-in weekend, and every street in the neighborhood is a truck.',
      title: 'A truck is stuck under the bridge',
      body: 'A rented truck has lost its roof under a low bridge on the river road. It is blocking the way to the basement, and the band\'s gear is in the back.',
      options: [
        { id: 'CARRY', label: 'Carry the gear in from the bridge', likely: 'Two hours of your day. The band remembers.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'SHOW_MOD', key: 'lateMin', v: 30 }],
          result: 'Four of you hauled amps up the hill. The first set started late and loud.' },
        { id: 'EARLY', label: 'Cancel the first band and start the second', likely: 'A shorter bill. A grumpy opener.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'The opener was sent home and the rest played a short night.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'BOSTON_ROUTE_CLOSURES', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], calendar: 'race' },
      telegraph: 'The marathon and the afternoon ball game are the same day this year.',
      title: 'The route has the neighborhood',
      body: 'The marathon runs through Kenmore, the ballpark lets out at the same time, and the whole neighborhood is a drunk parade. A daytime show is either packed with strangers or empty because the roads are shut.',
      options: [
        { id: 'OPEN', label: 'Open the doors to the parade', likely: 'Louder crowd, more strangers, more risk.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.1 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'The room filled with people who had never heard of the bands. A few stayed.' },
        { id: 'EARLY', label: 'Run it early before the streets close', likely: 'Most get in. Thin to start.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'lateMin', v: -90 }],
          result: 'Doors at noon. Everybody was home before the crowd poured out.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'A lot of people give up on the closures.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The streets stayed shut. Half the list never found a way in.' }
      ] },

    { id: 'BOSTON_SNOW_EMERGENCY', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [12, 1, 2, 3] },
      telegraph: 'A snow emergency is called for Saturday night.',
      title: 'Everyone has to move their cars',
      body: 'A parking ban means every car on the street is towed by nine, and half the audience has to move before the second band. The neighbors have saved their dug-out spots with lawn chairs.',
      options: [
        { id: 'SHUTTLE', label: 'Pause the show for a car shuffle', likely: 'An hour lost. The crowd stays.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 45 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The set break turned into a parade of cars to the lot. Everyone came back.' },
        { id: 'EARLY', label: 'Start an hour earlier so people can park right', likely: 'Fewer make it. The ones who do stay.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors early, most cars gone by nine. A smaller but warmer room.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The plows had finished by then.' }
      ] },

    { id: 'BOSTON_SOUTH_SHORE_STORM', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], chokepoint: true, months: [12, 1, 2, 3] },
      telegraph: 'A nor\'easter is working its way up the coast.',
      title: 'The nor\'easter has the South Shore',
      body: 'The storm has the expressway and the Route 3 corridor in a stall. The kids from the South Shore and the Cape are not getting in tonight.',
      options: [
        { id: 'ACCEPT', label: 'Run it without them', likely: 'You lose the whole south side of the list.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The road never cleared. The south side stayed home.' },
        { id: 'EARLY', label: 'Start early so they can beat the worst of it', likely: 'Some make it. A thin start.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .7, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'A van from the Cape pulled in at the first chord.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The plows came through overnight.' }
      ] }
  ]
});
