SB.Cities.register('minneapolis', {
  v: 1,
  slug: 'minneapolis',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of minnesota', 'macalester', 'st. thomas', 'hamline', 'augsburg', 'concordia', 'minneapolis college of art and design', 'mcad', 'walker art center',
           'minnesota state fair', 'twin cities pride', 'may day parade', 'art-a-whirl', 'vikings', 'timberwolves', 'twins', 'minnesota wild', 'minnesota united', 'allianz field',
           'u.s. bank stadium', 'target center', 'target field', 'third precinct', 'green line', 'blue line', 'nice ride', 'the current', 'city pages', 'mpr',
           'jucy lucy', 'juicy lucy', 'matt\'s bar', '5-8 club', 'first avenue', '7th st entry', 'seventh street entry', 'oakland warehouse fire', 'ghost ship',
           'prairie island', 'mille lacs', 'camp ripley', 'vfw', 'american legion', 'polish falcons', 'minnesota nice',
           'the lowry hill annex', 'lowry hill annex', 'ninth avenue sound hall', 'rondo street garage', 'the cold frame', 'cold frame', 'frogtown fellowship hall',
           'dayton\'s bluff cave room', 'bohemian flats social club', 'bohemian flats', 'the brick alley', 'third floor at the grain elevator', 'snelling basement',
           'minnehaha bungalow', 'the skyway lounge', 'polish falcon hall annex', 'eat street back room', 'northeast dovetail'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Annual events are generic in game text. */
  blocklist: ['minnesota state fair*', 'twin cities pride*', 'art-a-whirl*', 'first avenue*', 'jucy lucy*', 'city pages*', 'target center*'],

  blurb: ['Two cities on the Mississippi that act as one market. Basements full of people who have been going to shows for thirty years.',
          'The winter is long and the landlords are watching, and the benefits never stop, so the scene keeps starting over.'],
  hard: 'Landlord notices end houses, and winter and snow tows decide turnout.',
  region: 'the Upper Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'street-punk', d: .05, reason: 'Skins and punks shared bills here for years, and the hardcore crowd still shows up for it.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Minneapolis and St. Paul' },
    { id: 'hastings', kind: 'FEEDER', name: 'Hastings', minutes: 30, bearing: 140, note: 'A river lock town and close-in suburb. A pipeline to south Minneapolis.' },
    { id: 'stillwater', kind: 'FEEDER', name: 'Stillwater', minutes: 35, bearing: 75, note: 'A quiet tourist river town on the St. Croix. Kids come in for all-ages shows.' },
    { id: 'river-falls', kind: 'FEEDER', name: 'River Falls', state: 'WI', minutes: 45, bearing: 105, note: 'A small state-university town across the line with a campus radio crowd. Different state, same market.', bands: 2 },
    { id: 'northfield', kind: 'FEEDER', name: 'Northfield and Faribault', minutes: 55, bearing: 180, note: 'Two colleges and a mill town with real house shows, plus a rural DIY edge down I-35.', bands: 2 },
    { id: 'red-wing', kind: 'FEEDER', name: 'Red Wing', minutes: 60, bearing: 140, note: 'A river town with little for a teenager to do, so the drive north is a rite.' },
    { id: 'st-cloud', kind: 'FEEDER', name: 'St. Cloud', minutes: 60, bearing: 315, note: 'A state-university town with a big Somali community and a tradition of basement and bar shows.', bands: 3 },
    { id: 'hutchinson', kind: 'FEEDER', name: 'Hutchinson', minutes: 60, bearing: 260, note: 'A farm and factory town where kids make the drive for bigger shows.' },
    { id: 'mankato', kind: 'FEEDER', name: 'Mankato', minutes: 80, bearing: 205, note: 'A regional hub with a big state university and a house-show scene of its own. The strongest satellite.', bands: 4 },
    { id: 'rochester', kind: 'PEER', name: 'Rochester', minutes: 90, bearing: 160, scene: 2200, note: 'The clinic city: young medical workers, a community college and a scene of its own.' },
    { id: 'eau-claire', kind: 'PEER', name: 'Eau Claire', state: 'WI', minutes: 90, bearing: 105, slug: 'eau-claire-wi', note: 'A big indie-music reputation. Kids go both ways.' },
    { id: 'winona', kind: 'PEER', name: 'Winona', minutes: 120, bearing: 150, scene: 500, note: 'A bluff-and-river college town with a small, tight, very DIY scene.' },
    { id: 'duluth', kind: 'PEER', name: 'Duluth', minutes: 140, bearing: 30, slug: 'duluth-mn', note: 'A lake port with its own scene. Bands cross both ways, and a winter drive is a real risk.' }
  ],

  hoods: [
    { id: 'powderhorn', name: 'Powderhorn', route: 'old-side', note: 'Big old houses with full basements around a park lake, long-time punk and artist households. Still DIY-friendly, but houses sell and rents climb.' },
    { id: 'phillips', name: 'Phillips', route: 'work-side', note: 'The lowest-income part of the city: a large urban Native community, East African and Latino residents, and old houses. Cheap, with a raw memory of a shooting at a house show.' },
    { id: 'seward', name: 'Seward and Longfellow', route: 'old-side', note: 'Craftsman bungalows and duplexes with co-op and cycling culture. A show house here was lost to repeated police calls.' },
    { id: 'cedar-riverside', name: 'Cedar-Riverside', route: 'downtown', note: 'Dense towers and the Somali commercial center by the river. More community halls than DIY, pressed by new development.' },
    { id: 'dinkytown', name: 'Dinkytown and Southeast', route: 'campus', note: 'Student-rented houses with basements and backyards around the campus. Packed September to April, silent from mid-May.' },
    { id: 'northeast', name: 'Northeast', route: 'work-side', note: 'Old Polish blocks with steeple churches and corner bars, plus an arts district of studios in old industrial buildings.' },
    { id: 'uptown', name: 'Uptown and the Wedge', route: 'downtown', note: 'The old hangout of the first hardcore wave. Priced out and commercial; mostly bars and apartments now.' },
    { id: 'north-loop', name: 'the North Loop', route: 'downtown', note: 'Old warehouse blocks, once home to rock clubs and lofts. Luxury now; the legal clubs are the only shows left.' },
    { id: 'midway', name: 'the Midway and Frogtown', route: 'work-side', note: 'Light industrial blocks along University Avenue in St. Paul: storefronts, repair shops, Hmong and Black businesses. Rents are rising near the light rail.' },
    { id: 'east-side', name: 'the St. Paul East Side', route: 'old-side', note: 'Big old houses cut into units, church halls and post halls above the river. Cheap and forgotten by the Minneapolis side.' }
  ],

  rooms: [
    { id: 'powderhorn-basement', kind: 'HOUSE', hood: 'powderhorn', cap: 60, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [70, 60, 45],
      pressure: 50, start: true, note: 'A dry poured-concrete basement with a side door off the alley. Load-in without crossing a lawn, and a house that has run shows for years.' },
    { id: 'phillips-house', kind: 'HOUSE', hood: 'phillips', cap: 55, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [65, 55, 40],
      pressure: 55, note: 'A punk house with a basement. Everyone is careful about calling the police, whatever happens.' },
    { id: 'seward-duplex', kind: 'HOUSE', hood: 'seward', cap: 45, hostCut: 0, pa: .3, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [65, 55, 40],
      pressure: 55, note: 'A duplex basement. The landlord has gotten notices before, and it shows.' },
    { id: 'campus-house', kind: 'HOUSE', hood: 'dinkytown', cap: 70, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [65, 55, 45],
      pressure: 45, note: 'A student house with a basement. Full from September to April, empty all summer.' },
    { id: 'seward-yard', kind: 'OUTDOOR', hood: 'seward', cap: 70, rent: 0, pa: .4, curfew: 1320, sketch: 25, standing: [60, 55, 40],
      note: 'A shared backyard. A short season, June to September, and a neighbor who knows the number for the police.' },
    { id: 'church-hall', kind: 'HALL', hood: 'northeast', cap: 110, rent: 90, deposit: 0, pa: .5, curfew: 1320, ac: true, sketch: 5, standing: [65, 60, 60],
      owner: 'CHURCH_CONTACT', pressure: 50, note: 'A church hall under a steeple. The manager wants the floor scrubbed like after a fish fry.' },
    { id: 'post-hall', kind: 'HALL', hood: 'east-side', cap: 170, rent: 180, deposit: 75, pa: .6, curfew: 1380, ac: true, sketch: 10, standing: [55, 60, 70],
      owner: 'HALL_MANAGER', note: 'A veterans\' hall above the river. A flat fee, a BYOB rule and a manager with opinions.' },
    { id: 'studio-building', kind: 'DIY', hood: 'northeast', cap: 100, rent: 70, deposit: 0, pa: .5, curfew: 1440, ac: false, sketch: 40, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'The third floor of a rehearsal building. The lease bans events, so every show risks everyone\'s space.' },
    { id: 'midway-storefront', kind: 'DIY', hood: 'midway', cap: 90, rent: 60, deposit: 0, pa: .5, curfew: 1440, ac: false, sketch: 35, standing: [55, 60, 45],
      pressure: 45, needs: ['VOUCH'], note: 'A storefront on University Avenue. Cheap, ignored, and the light rail changes who walks past.' },
    { id: 'records', kind: 'SHOP', hood: 'dinkytown', cap: 45, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'The record shop by campus. In-stores in the afternoon, a long tradition.' },
    { id: 'uptown-bar', kind: 'BAR', hood: 'uptown', cap: 130, soundFee: 50, pa: .7, ages: ['ALL', 'A21'], matinee: true, curfew: 1560, ac: true, following: .3, sketch: 15,
      standing: [45, 65, 70], note: 'A bar with a separate door for kids early, then 21 and over at night. The licensing office is part of your booking.' },
    { id: 'taproom', kind: 'BAR', hood: 'northeast', cap: 100, soundFee: 40, pa: .6, ages: ['ALL', 'A21'], curfew: 1380, ac: true, following: .3, sketch: 10,
      standing: [50, 65, 70], note: 'A taproom in an old industrial building. It wants a quiet band and an early night.' },
    { id: 'club', kind: 'CLUB', hood: 'north-loop', cap: 320, houseCosts: 150, split: .8, pa: .9, ages: ['A21', 'A18'], curfew: 1560, ac: true, following: .6, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The historic downtown club with a main room and a small side stage where young bands cut their teeth. Wants six weeks and a name.' }
  ],

  contacts: ['eau-claire-wi', 'duluth-mn', 'madison-wi', 'des-moines-ia', 'fargo-nd'],

  calendar: [
    { id: 'studio-tour', label: 'the studio tour weekend', tag: 'festival', month: 5, weeks: [2, 3], dows: [4, 5, 6], can: [.95, .92, .92], hoods: ['northeast'], elsewhere: [1, 1, 1] },
    { id: 'pride', label: 'the pride festival', tag: 'festival', month: 6, week: 4, dows: [5, 6], can: [.92, .90, .90] },
    { id: 'fair', label: 'the state fair', tag: 'fair', month: 9, week: 1, dows: [3, 4, 5, 6], can: [.85, .90, .90] },
    { id: 'hockey', label: 'the high school hockey tournament', tag: 'game', month: 3, weeks: [2, 3], dows: [3, 4, 5], can: [.88, .92, .90] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] },
    { id: 'holidays', label: 'the holidays', tag: 'holiday', month: 12, weeks: [4, 5], dows: [0, 1, 2, 3, 4, 5, 6], can: [.80, .85, .90] }
  ],

  rules: { quiet: 1320 },

  points: [
    { name: 'Madison', state: 'WI', lat: 43.07, lon: -89.40, pop: 680000 },
    { name: 'Milwaukee', state: 'WI', lat: 43.04, lon: -87.91, pop: 1570000 },
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93, pop: 970000 }
  ],
  roads: ['I-94', 'I-35W', 'I-35E', 'I-394', 'I-494', 'Highway 61'],

  words: {
    street: ['Lake Street', 'Hennepin Avenue', 'Franklin Avenue', 'Chicago Avenue', 'Minnehaha Avenue', 'Nicollet Avenue', 'University Avenue', 'Snelling Avenue', 'Central Avenue'],
    water: ['the Mississippi', 'Lake Calhoun', 'Powderhorn Lake', 'Minnehaha Creek', 'the St. Croix'],
    hood: ['Powderhorn', 'Phillips', 'Seward', 'Longfellow', 'Cedar-Riverside', 'Dinkytown', 'Marcy-Holmes', 'Northeast', 'Uptown', 'the Wedge', 'Whittier', 'the North Loop',
           'the Midway', 'Frogtown', 'Rondo', 'Dayton\'s Bluff', 'Payne-Phalen', 'West 7th'],
    thing: ['hot dish', 'wild rice soup', 'cheese curds', 'walleye', 'lefse', 'skyway', 'snow emergency', 'alley', 'basement', 'ice fishing house'],
    weather: ['wind chill', 'snow emergency', 'freeze-thaw', 'ice out']
  },

  events: [
    { id: 'MINNEAPOLIS_SNOW_EMERGENCY', when: 'WEEK', tier: 'HARD', weight: 3, cooldown: 35, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'COLD', months: [11, 12, 1, 2, 3] },
      telegraph: 'The city is calling a snow emergency tonight.',
      title: 'A snow emergency on show day',
      body: 'The snow emergency is on. Cars on the wrong side of the street get towed tomorrow, and the van and half your crowd are parked there.',
      options: [
        { id: 'EARLY', label: 'Move doors earlier and tell everyone where to park', likely: 'Most of them move their cars first, but the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'You opened doors an hour early. The cars were on the right side, and the room smelled like wet wool.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'A lot of people stay home rather than risk a tow.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }],
          result: 'The plows came through at ten, and the only people who stayed in were the ones who walked.' },
        { id: 'STAY', label: 'Let everyone sleep over', likely: 'The crowd is smaller, and the floor is full of bodies in the morning.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }, { op: 'REGULARS', pct: .02 }, { op: 'STRESS', d: 1 }],
          result: 'Nobody drove home, and by morning the basement was one big pile of coats.' }
      ] },

    { id: 'MINNEAPOLIS_FAIR_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'fair' },
      telegraph: 'The big fair opens and half of St. Paul is getting ready for it.',
      title: 'The fair has the city',
      body: 'It is fair week. Every parking spot near the fairgrounds is gone, the place is full of people eating things on sticks, and half your bill is working a food stand.',
      options: [
        { id: 'EARLY', label: 'Start early and cap the list', likely: 'The bill is short and the door is easy.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'You opened doors early, and the ones off shift came straight in smelling of fried dough.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The people who can come are few.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Every street near you was parked solid, and the room stayed thin.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'MINNEAPOLIS_LANDLORD_NOTICE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], roomKind: ['HOUSE'] },
      telegraph: 'A neighbor has been calling the police about the house.',
      title: 'The landlord got a notice',
      body: 'The police have sent a nuisance notice to whoever holds the rental license, and the landlord wants the shows gone or the rent doubled. Everyone in the house is a little scared.',
      options: [
        { id: 'MOVE', label: 'Move it to a hall', likely: 'It costs a rental fee and you need a bigger room, but the landlord stops calling.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'MONEY', amount: -60 }],
          result: 'A hall took the bill, and the house kept its license for another month.' },
        { id: 'QUIET', label: 'Keep it small and quiet', likely: 'It\'s an acoustic set and a short list, and the neighbor stops calling.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }, { op: 'ROOM_PRESSURE', d: -10 }],
          result: 'Everyone sat on the floor, and the neighbor never found out it was a show.' },
        { id: 'RUN', label: 'Run it anyway', likely: 'You get a full room, and the landlord finds out.',
          effects: [{ op: 'ROOM_PRESSURE', d: 15 }, { op: 'STRESS', d: 2 }],
          result: 'The room was packed, and in the morning someone left a note on the door.' }
      ] },

    { id: 'MINNEAPOLIS_HALL_KITCHEN', when: 'NIGHT', tier: 'REAL', weight: 1, cooldown: 40, bind: ['show'],
      if: { roomKind: ['HALL'] },
      title: 'The kitchen is a mess',
      body: 'The church hall let you in on one condition: the kitchen stays spotless. Someone ran the sink dry and left it. The hall manager walks in at the end of the night.',
      options: [
        { id: 'CLEAN', label: 'Stay and scrub it yourself', likely: 'It costs an hour of your night, and the hall stays friendly.',
          effects: [{ op: 'HOURS', d: -1, when: 'TODAY' }, { op: 'ROOM_REL', d: 8 }],
          result: 'You were still there with a mop at midnight, and the manager noticed.' },
        { id: 'PAY', label: 'Leave cash for a cleaner', likely: 'It costs twenty dollars, and the hall is fine with it.',
          effects: [{ op: 'MONEY', amount: -20 }],
          result: 'You left twenty dollars in an envelope, and the kitchen was clean by Monday.' },
        { id: 'LEAVE', label: 'Leave it', likely: 'The hall will remember it.',
          effects: [{ op: 'ROOM_REL', d: -12 }, { op: 'ROOM_PRESSURE', d: 8 }],
          result: 'The manager sent a short note, and the next date is not a sure thing.' }
      ] },

    { id: 'MINNEAPOLIS_CABIN_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], months: [5, 6, 7, 8, 9] },
      telegraph: 'The first nice Friday of the year is coming and everyone is talking about the cabin.',
      title: 'Half the scene went up north',
      body: 'It is the first warm weekend, and everyone who has a lake cabin, or a friend with one, left on Thursday, so your show is the only thing in town.',
      options: [
        { id: 'PLAY', label: 'Play it anyway', likely: 'You get a few people and a quiet floor.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }],
          result: 'Eleven people came, and every one of them knew every word.' },
        { id: 'LATER', label: 'Move it a day, when they\'re back', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the sunburned ones came straight from the road.' },
        { id: 'POST', label: 'Post it as a backyard show', likely: 'It\'s smaller but warmer, and a few more neighbors show up.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'REGULARS', pct: .02 }],
          result: 'You put the amp on the back steps, and the sunset was better than the sound.' }
      ] }
  ]
});
