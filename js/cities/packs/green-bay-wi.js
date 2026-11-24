SB.Cities.register('green-bay-wi', {
  v: 1,
  slug: 'green-bay-wi',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['green bay press-gazette', 'press-gazette', 'fox 11', 'nbc26', 'wisconsin public radio', 'discover green bay', 'downtown green bay inc', 'green bay police department', 'gbpd', 'artfest', 'fridays on the fox', 'grooves on the green', 'ignight', 'hagemeister park', 'green bay botanical garden', 'billie kress amphitheater', 'wings of freedom', 'tattoo fest', 'titletown district', 'wisconsin state statutes', 'green bay packers', 'packers', 'lambeau field', 'lambeau', 'titletown', 'packerland', 'uw-green bay', 'uwgb', 'university of wisconsin-green bay',
           'st. norbert college', 'northeastern wisconsin technical college', 'nwtc', 'kwik trip', 'spotted cow', 'cellcom', 'brown county fair', 'eaa',
           'airventure', 'chicago bears', 'minnesota vikings', 'vikings', 'knights of columbus', 'vfw', 'american legion', 'cheesehead',
           'brown county back room', 'the booyah hall', 'fox street annex', 'packerland pole barn', 'slough road garage', 'mason bridge loft', 'third ward lanes',
           'curd & kettle', 'the belgian pie basement', 'kwik stop back lot', 'lakeshore legion hall', 'the draw bridge room'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['packers*', 'lambeau*', 'kwik trip*', 'uwgb*', 'st. norbert*', 'spotted cow*', 'titletown*'],

  blurb: ['A Wisconsin paper, packaging and shipping city at the head of the bay where the river meets the lake, where football and taverns set the whole calendar.',
          'Most rooms are bars with a stage in back, so the all-ages scene lives in basements, parish halls and pole sheds and works around the home-game calendar. Kids drive in from the farm towns, and bands are usually on a detour.'],
  hard: 'Football Sundays, 21+ bars and long winter drives off the tour axis.',
  region: 'the Great Lakes',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Milwaukee', state: 'WI', lat: 43.04, lon: -87.91 },
    { name: 'Madison', state: 'WI', lat: 43.07, lon: -89.40 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Green Bay' },
    { id: 'de-pere', kind: 'FEEDER', name: 'De Pere', minutes: 10, bearing: 195, pop: 25000, note: 'A walkable river city to the south with a small college and student houses.' },
    { id: 'pulaski', kind: 'FEEDER', name: 'Pulaski', minutes: 25, bearing: 315, note: 'A Polish-heritage farm town to the northwest.' },
    { id: 'seymour', kind: 'FEEDER', name: 'Seymour, Denmark and Brillion', minutes: 25, bearing: 245, note: 'Dairy and farm towns whose teens have cars and garage bands.' },
    { id: 'oconto', kind: 'FEEDER', name: 'Oconto', minutes: 30, bearing: 15, note: 'A small bay-shore town up the highway; no known scene.' },
    { id: 'appleton', kind: 'FEEDER', name: 'Appleton and the Fox Cities', minutes: 35, bearing: 215, scene: 400, note: 'A bigger college and arts-leaning neighbor with a scene of its own; Green Bay is the blue-collar rival.',
      rooms: [
        { id: 'fox-cities-basement', kind: 'DIY', hood: 'appleton-hood', zone: 'appleton', cap: 60, pa: .4, curfew: 1350, ac: false, outdoor: false, pressure: 50,
          note: 'A basement in the Fox Cities where the punk and hardcore shows are said to live. Green Bay kids drive thirty-five minutes for it.' }
      ] },
    { id: 'manitowoc', kind: 'FEEDER', name: 'Manitowoc and Two Rivers', minutes: 40, bearing: 150, note: 'Lakeshore shipbuilding and factory towns to the southeast.' },
    { id: 'shawano', kind: 'FEEDER', name: 'Shawano', minutes: 40, bearing: 285, note: 'A farm and lake town to the west; its teens drive east for shows.' },
    { id: 'oshkosh', kind: 'FEEDER', name: 'Oshkosh', minutes: 50, bearing: 200, note: 'A university town down the interstate.' },
    { id: 'sturgeon-bay', kind: 'FEEDER', name: 'Sturgeon Bay and Door County', minutes: 55, bearing: 55, note: 'Tourist and shipyard towns, very seasonal.', season: { months: [6, 7, 8, 9], mul: 1.5 } },
    { id: 'marinette', kind: 'FEEDER', name: 'Marinette', minutes: 60, bearing: 25, note: 'A mill and border town facing the Michigan peninsula, with a little scene of its own.' },
    { id: 'sheboygan', kind: 'PEER', name: 'Sheboygan', minutes: 60, bearing: 160, scene: 300, note: 'A lakeshore city down I-43.' },
    { id: 'fond-du-lac', kind: 'PEER', name: 'Fond du Lac', minutes: 70, bearing: 190, scene: 300, note: 'A lake and factory city at the south end of the big lake.' },
    { id: 'wausau', kind: 'PEER', name: 'Wausau', minutes: 105, bearing: 280, scene: 300, note: 'A paper and insurance city to the west.' },
    { id: 'marquette', kind: 'PEER', name: 'Marquette', state: 'MI', minutes: 170, bearing: 340, scene: 250, note: 'A university town on the far shore of the Upper Peninsula.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Washington Street', route: 'downtown', note: 'Bars, restaurants, the arena and the riverfront. Mostly 21 and over, poor for houses, slowly filling with apartments.' },
    { id: 'broadway', name: 'the Broadway District', route: 'downtown', note: 'Old brick storefronts and riverfront warehouses north of downtown. The best candidate for storefront and warehouse rooms; risk of being priced out.' },
    { id: 'east-side', name: 'the east side', route: 'old-side', note: 'Tree-lined duplexes and upper flats with real basements and porches. Students and service workers; quiet and cheap-ish.' },
    { id: 'west-side', name: 'the near west side', route: 'old-side', note: 'Working-class streets, corner bars and parish halls. Cheap, ignored, and full of basements.' },
    { id: 'ashwaubenon', name: 'Ashwaubenon and the stadium strip', route: 'work-side', note: 'Chain hotels, big-box retail and strip-mall units. Garages and practice spaces, wrecked by game days.' },
    { id: 'de-pere-hood', name: 'De Pere', route: 'campus', note: 'A small college city on both banks of the river with student houses near campus.' },
    { id: 'allouez', name: 'Allouez', route: 'work-side', note: 'A quiet older suburb to the south with a few basements and higher rent.' },
    { id: 'bay-campus', name: 'the bay-shore campus', route: 'campus', note: 'A university on a bluff at the edge of town. Dorms and apartments; far out for kids without cars.' },
    { id: 'appleton-hood', name: 'Appleton and the Fox Cities', route: 'town:appleton', note: 'A bigger college and arts neighbor up the river, where the basement punk shows are said to live.' }
  ],

  rooms: [
    { id: 'east-side-basement', kind: 'HOUSE', hood: 'east-side', cap: 40, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, pressure: 55, start: true,
      note: 'A basement under an old duplex on the east side, found by word of mouth. One noise complaint ends it.' },
    { id: 'de-pere-house', kind: 'HOUSE', hood: 'de-pere-hood', cap: 50, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, pressure: 50,
      note: 'A student house across the river. Packed in term and empty from May to August.' },
    { id: 'broadway-storefront', kind: 'DIY', hood: 'broadway', cap: 80, pa: .5, curfew: 1320, ac: false, pressure: 55,
      note: 'An old brick storefront in the revival district. Cheap for now, and the rent is climbing.' },
    { id: 'record-shop', kind: 'SHOP', hood: 'broadway', cap: 60, ages: ['ALL'], curfew: 1260, ac: true,
      note: 'A record-and-oddities shop that clears the floor for punk shows. A lease, not a license, so it ends early.' },
    { id: 'parish-hall', kind: 'HALL', hood: 'west-side', cap: 150, ages: ['ALL'], curfew: 1320, ac: true,
      note: 'A parish hall on the near west side, rented by the night. Sometimes a raffle comes with it, and a cash bar.' },
    { id: 'broadway-bar', kind: 'BAR', hood: 'broadway', cap: 250, ages: ['A21'], curfew: 1500, ac: true, matinee: true,
      note: 'A long-running stage room on the Broadway strip under a newer owner. Underage only early, if the owner says so.' },
    { id: 'tracks-hall', kind: 'CLUB', hood: 'broadway', cap: 300, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A restored music hall by the tracks that books touring bands. Bar rules apply and the house wants a bill.' },
    { id: 'brewery-club', kind: 'CLUB', hood: 'downtown', cap: 400, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A new mid-size room in an old brewery building, aimed at the gap between small rooms and big ones.' },
    { id: 'washington-bar', kind: 'BAR', hood: 'downtown', cap: 150, ages: ['A21'], curfew: 1560, ac: true, pressure: 50,
      note: 'A bar on the late block downtown. The police watch the sidewalk for kids after curfew.' },
    { id: 'riverfront-stage', kind: 'OUTDOOR', hood: 'downtown', cap: 500, ages: ['ALL'], curfew: 1260, rent: 25,
      note: 'A park stage on the riverfront. Permitted, polite and summer only, with the whole city invited.' },
    { id: 'stadium-plaza', kind: 'BIG', hood: 'ashwaubenon', cap: 3000, ages: ['ALL'], curfew: 1380, ac: true,
      note: 'The hotels, the arena and a nightlife plaza by the stadium. Touring only, and game days eat the whole strip.' }
  ],

  contacts: ['madison-wi', 'eau-claire-wi', 'duluth-mn', 'milwaukee', { name: 'Appleton', state: 'WI', lat: 44.26, lon: -88.42 }],

  calendar: [
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 4], dows: [6], can: [0.8, 0.85, 0.85], hoods: ['ashwaubenon', 'downtown'], elsewhere: [.92,.92,.92] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [6], can: [0.8, 0.85, 0.85], hoods: ['ashwaubenon', 'downtown'], elsewhere: [.92,.92,.92] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 4], dows: [6], can: [0.8, 0.85, 0.85], hoods: ['ashwaubenon', 'downtown'], elsewhere: [.92,.92,.92] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 8, week: 3, dows: [4, 5, 6], can: [0.88, 0.85, 0.88] },
    { id: 'art-fair', label: 'the downtown art fair', tag: 'festival', month: 8, week: 4, dows: [5, 6], can: [0.92, 0.9, 0.9], hoods: ['downtown', 'broadway'], elsewhere: [1,1,1] },
    { id: 'summer-fridays', label: 'the free Friday summer concerts', tag: 'festival', month: 7, week: 2, dows: [4], can: [0.9, 0.95, 1], hoods: ['downtown', 'broadway'], elsewhere: [1,1,1] },
    { id: 'st-pats', label: 'St. Patrick\'s weekend', tag: 'holiday', month: 3, weeks: [2, 3], dows: [4, 5], can: [1.05, 1.1, 1.05], hoods: ['downtown'], elsewhere: [.95,.95,.95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.1] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1320, weekend: 1320, inForce: true } },

  points: [
    { name: 'Milwaukee', state: 'WI', lat: 43.04, lon: -87.91, pop: 570000 },
    { name: 'Appleton', state: 'WI', lat: 44.26, lon: -88.42, pop: 75000 },
    { name: 'Oshkosh', state: 'WI', lat: 44.02, lon: -88.54, pop: 66000 },
    { name: 'Marquette', state: 'MI', lat: 46.54, lon: -87.40, pop: 21000 },
    { name: 'Wausau', state: 'WI', lat: 44.96, lon: -89.63, pop: 39000 }
  ],
  roads: ['I-43', 'US 41', 'WI 29', 'WI 57', 'WI 32', 'WI 54'],

  words: {
    street: ['Washington Street', 'Broadway', 'Mason Street', 'Monroe Avenue', 'Main Street', 'Velp Avenue'],
    water: ['the Fox River', 'the bay', 'Lake Michigan', 'Duck Creek'],
    hood: ['the east side', 'the west side', 'Allouez', 'Ashwaubenon', 'De Pere', 'Astor', 'Navarino'],
    thing: ['fish fry', 'bar pizza', 'cheese curds', 'brat', 'booyah', 'pole barn', 'parish hall', 'custard stand', 'draw bridge', 'carpool'],
    weather: ['lake-effect snow', 'January cold']
  },

  events: [
    { id: 'GREEN_BAY_WI_GAME_THURSDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'A home game is on Sunday, and the pep rally takes over downtown on Thursday afternoon.',
      title: 'The football-weekend squeeze',
      body: 'A hall show on the near west side lands on game week. The rally eats downtown, every sober driver is hired as a shuttle, and the hotels are full.',
      options: [
        { id: 'LATE', label: 'Push doors back until the traffic clears', likely: 'The crowd that wants a night out shows up, later than planned.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'You opened doors an hour late, and the people who came were loud and happy.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd has other plans.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The casual crowd stayed in, and the regulars came.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date, and the bands trust you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'GREEN_BAY_WI_FEBRUARY_SNOW', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [12, 1, 2, 3] },
      telegraph: 'The county road is drifting shut, and the farm-town kids are an hour out.',
      title: 'The county road closes',
      body: 'A snow squall shut the county road the day of the basement show. The farm-town kids can\'t get in, and the van from the north is two hours late.',
      options: [
        { id: 'SHORT', label: 'Run the short bill and play on', likely: 'It\'s a thin night, but the people who came are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Two bands played a long, loose night in a basement that was half full and warm.' },
        { id: 'WAIT', label: 'Hold the doors and wait for the van', likely: 'It starts late, and the crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 120 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The van pulled in at ten, and you started late, but nobody left.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and everybody trusts you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could make it came.' }
      ] },

    { id: 'GREEN_BAY_WI_CURFEW_WALK', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'City police cited a kid for curfew on the bar block last month, and the all-ages set ends at ten.',
      title: 'The curfew walk',
      body: 'A kid on the downtown bar block was cited for curfew at ten, right after the all-ages set let out, and parents have started calling.',
      options: [
        { id: 'EARLY', label: 'End the night early and walk the crowd to their rides', likely: 'It\'s short and safe, and the parents notice.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The show was done by nine-thirty, with a line of parents at the door.' },
        { id: 'BASEMENT', label: 'Move the bill off the bar block to a basement', likely: 'It\'s smaller and out of sight.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A basement took the bill, and it was loud, packed and out of sight.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'Some parents keep their kids home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'A few kids stayed in rather than risk the sidewalk.' }
      ] }
  ]
});
