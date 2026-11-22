SB.Cities.register('grand-rapids', {
  v: 1,
  slug: 'grand-rapids',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['grand valley state university', 'gvsu', 'calvin university', 'calvin college', 'aquinas college', 'davenport university', 'grand rapids community college', 'grcc',
           'western michigan university', 'michigan state', 'mlive', 'grand rapids press', 'rapidian', 'wzzm', 'woodtv', 'wood tv', 'whtc', 'grand rapids griffins',
           'west michigan whitecaps', 'grand rapids drive', 'artprize', 'beer city', 'amway', 'steelcase', 'herman miller', 'meijer', 'spectrum health', 'corewell health',
           'gerald ford', 'ford museum', 'van andel arena', 'devos place', 'frederik meijer gardens', 'founders brewing', 'bell\'s', 'bells brewery', 'griffins', 'west michigan whitecaps',
           'pulaski days', 'art prize', 'calder plaza', 'local spins', 'revue west michigan', 'wgrd', 'wrkr', 'lanthorn', 'calvin chimes', 'wgvu', 'fox 17',
           'experience grand rapids', 'experiencegr', 'return to the river', 'breakaway music festival', 'hollyhock lane parade', 'acrisure amphitheater', 'bandsintown',
           'songkick', 'michigan liquor control commission', 'grpd', 'grand rapids police department', 'localwiki', 'taco & tequila fest'],
  blocklist: ['mlive*', 'artprize*', 'founders brewing*', 'meijer*', 'grand rapids press*', 'steelcase*', 'amway*'],

  blurb: ['A church-quiet West Michigan city on the river, with a loud hardcore youth scene underneath. Whether an all-ages hall is open decides whether the scene runs hot or cold.',
          'When the hall closes everything falls back to shared houses on the near west and southeast sides, and the neighbors are polite and call the city.'],
  hard: 'Few all-ages rooms, lake-effect snow, and church-minded neighbors.',
  region: 'the Great Lakes',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05 },
    { name: 'Ann Arbor', state: 'MI', lat: 42.28, lon: -83.74 },
    { name: 'Milwaukee', state: 'WI', lat: 43.04, lon: -87.91 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'Hardcore needs an all-ages hall, and when one is open the kids fill it.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Grand Rapids' },
    { id: 'wyoming', kind: 'FEEDER', name: 'Wyoming', minutes: 10, bearing: 200, note: 'A south suburb of strip malls and garages.' },
    { id: 'kentwood', kind: 'FEEDER', name: 'Kentwood', minutes: 15, bearing: 150, note: 'A southeast suburb.' },
    { id: 'grandville', kind: 'FEEDER', name: 'Grandville', minutes: 15, bearing: 215, note: 'A suburb to the southwest.' },
    { id: 'rockford', kind: 'FEEDER', name: 'Rockford', minutes: 20, bearing: 5, note: 'A wealthy north suburb.' },
    { id: 'holland', kind: 'FEEDER', name: 'Holland and Zeeland', minutes: 30, bearing: 235, note: 'Conservative lakeshore church towns. Kids drive in for shows, some without telling anyone.' },
    { id: 'greenville', kind: 'FEEDER', name: 'Greenville', minutes: 35, bearing: 45, note: 'A small town to the north.' },
    { id: 'muskegon', kind: 'FEEDER', name: 'Muskegon', minutes: 40, bearing: 295, note: 'A lake port with metal and punk kids.' },
    { id: 'kalamazoo', kind: 'PEER', name: 'Kalamazoo', minutes: 60, bearing: 200, slug: 'kalamazoo-mi', note: 'A house-show scene that polices its own safety.' },
    { id: 'lansing', kind: 'PEER', name: 'Lansing', minutes: 70, bearing: 105, slug: 'lansing-mi', note: 'A mid-size scene to the east.' }
  ],

  hoods: [
    { id: 'heritage-hill', name: 'Heritage Hill', route: 'old-side', note: 'Big old Victorians cut into apartments near downtown. Shared houses.' },
    { id: 'eastown', name: 'Eastown', route: 'old-side', note: 'A small business strip of bars and shops. The weirdo and punk kids hang here.' },
    { id: 'wealthy-street', name: 'Wealthy Street and the Southeast Side', route: 'old-side', note: 'Old houses and shops, cheap-ish.' },
    { id: 'division', name: 'Division Avenue South', route: 'work-side', note: 'An old commercial strip with a hardcore youth space that reopened to lines around the block.' },
    { id: 'west-side', name: 'the West Side', route: 'work-side', note: 'Old Polish and working-class blocks of small houses. House-venue turf.' },
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Bars, big concert halls and hotels. Expensive.' },
    { id: 'creston', name: 'Creston', route: 'work-side', note: 'North-side neighborhood with cheap houses.' },
    { id: 'garfield-park', name: 'Garfield Park', route: 'old-side', note: 'A quiet residential neighborhood on the south side, with a church on every other corner.' },
    { id: 'walker', name: 'Walker and Wyoming', route: 'campus', note: 'Suburban strip towns: garages and a few church halls.' }
  ],

  rooms: [
    { id: 'west-house', kind: 'HOUSE', hood: 'west-side', cap: 60, curfew: 1350, ac: false, outdoor: false, pressure: 50, start: true,
      note: 'A basement under an old frame house on the near west side. It is the fallback whenever no hall is open, and the neighbors call the city.' },
    { id: 'wealthy-house', kind: 'HOUSE', hood: 'wealthy-street', cap: 50, curfew: 1320, ac: false, outdoor: false, pressure: 55,
      note: 'A shared rental with a porch and a basement on the southeast side. The landlord keeps raising the rent.' },
    { id: 'creston-coop', kind: 'DIY', hood: 'creston', cap: 150, curfew: 1380, ac: false, pressure: 55,
      note: 'A volunteer-run, drug-free and alcohol-free art-and-music co-op in a unit of a commercial building. It has been forced out before when the building changed hands.' },
    { id: 'division-club', kind: 'DIY', hood: 'division', cap: 250, curfew: 1380, ac: true, pressure: 60,
      note: 'An all-ages hardcore and metal club on the south Division strip, run by one owner. It can be open or shut, and the whole scene goes with it.' },
    { id: 'garfield-hall', kind: 'HALL', hood: 'garfield-park', cap: 120, curfew: 1350, ac: true, owner: 'CHURCH_CONTACT', pressure: 55,
      note: 'An all-ages room in a church building, with loud basement-style shows booked by one person. The church is patient, and the neighbors less so.' },
    { id: 'firehouse', kind: 'DIY', hood: 'west-side', cap: 100, curfew: 1380, ac: false, pressure: 50, needs: ['VOUCH'],
      note: 'An old firehouse space that calls itself the longest-running DIY room in town. Check that the door is still open before you lean on it.' },
    { id: 'eastown-bar', kind: 'BAR', hood: 'eastown', cap: 120, curfew: 1500, ac: true,
      note: 'A bar on the Eastown strip with a back-room stage and weeknight punk. Twenty-one and over, which leaves the kids on the sidewalk.' },
    { id: 'west-bar', kind: 'BAR', hood: 'west-side', cap: 150, curfew: 1500, ac: true,
      note: 'A west-side bar with a stage. Rooms like it keep closing when the costs go up.' },
    { id: 'downtown-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['ALL', 'A18'], curfew: 1470, ac: true,
      note: 'The commercial club on Commerce Avenue, with a monthly metal night and touring bills. The step up from the hall.' },
    { id: 'river-hall', kind: 'BIG', hood: 'downtown', cap: 900, ages: ['ALL'], curfew: 1380, ac: true,
      note: 'The big downtown room that takes the national tours. The goal, and the bill that comes with it.' },
    { id: 'strip-garage', kind: 'OUTDOOR', hood: 'walker', cap: 80, curfew: 1260, outdoor: true,
      note: 'A garage and a driveway in a strip suburb. Summer only, and out by nine.' }
  ],

  contacts: ['kalamazoo-mi', 'lansing-mi', 'ann-arbor-mi', 'chicago', 'milwaukee'],

  calendar: [
    { id: 'art-competition', label: 'the big art competition', tag: 'festival', month: 9, weeks: [3, 4], dows: [3, 4, 5, 6], can: [.90, .85, .85], hoods: ['downtown', 'division'], elsewhere: [1, .97, .97] },
    { id: 'polish-parade', label: 'the West Side parade weekend', tag: 'parade', month: 9, week: 4, dows: [5], can: [.85, .90, .90], hoods: ['west-side'], elsewhere: [1, 1, 1] },
    { id: 'arts-fest', label: 'the downtown arts festival', tag: 'festival', month: 6, week: 1, dows: [4, 5, 6], can: [.92, .88, .88], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'pride', label: 'the downtown Pride festival', tag: 'festival', month: 6, week: 4, dows: [5], can: [.95, .95, .92], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'fourth', label: 'the Fourth of July fireworks', tag: 'holiday', month: 7, week: 1, dows: [0, 1, 2, 3, 4, 5, 6], can: [.90, .90, .92], hoods: ['downtown'], elsewhere: [.95, .95, .95] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 2], dows: [4, 5], can: [.88, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 3], dows: [4, 5], can: [.88, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1380, inForce: true } },

  points: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 9500000 },
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05, pop: 4390000 },
    { name: 'Milwaukee', state: 'WI', lat: 43.04, lon: -87.91, pop: 1575000 },
    { name: 'Muskegon', state: 'MI', lat: 43.23, lon: -86.25, pop: 175000 }
  ],
  roads: ['US-131', 'I-96', 'I-196', 'M-6', 'I-94'],

  words: {
    street: ['Division Avenue', 'Wealthy Street', 'Fulton Street', 'Michigan Street', 'Leonard Street', 'Eastern Avenue'],
    water: ['the Grand River'],
    hood: ['Heritage Hill', 'Eastown', 'Creston', 'the West Side', 'Wyoming', 'Kentwood', 'Walker'],
    thing: ['lake-effect', 'church hall', 'shovel', 'firehouse', 'Sunday service'],
    weather: ['lake-effect snow', 'whiteout']
  },

  events: [
    { id: 'GRAND_RAPIDS_WHITEOUT', when: 'WEEK', tier: 'HARD', weight: 3, cooldown: 35, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'COLD', months: [11, 12, 1, 2, 3] },
      telegraph: 'A lake-effect band is parked over the west side all week.',
      title: 'A whiteout on show day',
      body: 'The lake-effect snow has the van windows buried and the highway down to one lane. The host is still out shoveling the driveway for load-in.',
      options: [
        { id: 'EARLY', label: 'Move doors earlier so people can beat the worst of it', likely: 'Most make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Doors an hour early. Everyone who came was stamping snow off their boots.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'A lot of the lakeshore kids never make it in.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }],
          result: 'The road never cleared. The room was the ones who could walk.' },
        { id: 'STAY', label: 'Let everyone sleep over', likely: 'Smaller crowd, and a floor full of bodies in the morning.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }, { op: 'REGULARS', pct: .02 }, { op: 'STRESS', d: 1 }],
          result: 'Nobody drove home. By morning the basement was one big pile of coats.' }
      ] },

    { id: 'GRAND_RAPIDS_HALL_GONE', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 4] },
      telegraph: 'The all-ages hall has a notice on the door, and the kids are already texting each other about it.',
      title: 'The hall gave up its building',
      body: 'The one all-ages room is out of its space, and your show is on its calendar. You have a few days to find a basement before the kids find out the hard way.',
      options: [
        { id: 'HOUSE', label: 'Move the bill to a basement on the west side', likely: 'Smaller and louder, with neighbors a wall away.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A basement took the bill with a day to spare, and the floor was packed to the stairs.' },
        { id: 'WAIT', label: 'Hold the date and wait for a new room', likely: 'Half the kids give up and stay home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }, { op: 'SHOW_MOD', key: 'lateMin', v: 45 }],
          result: 'The word went around late. The ones who found you were the ones who always do.' },
        { id: 'MOVE', label: 'Move the show a week', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 7, respect: false }],
          result: 'You pushed it a week. A few bands could not make the new date.' }
      ] },

    { id: 'GRAND_RAPIDS_PARADE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'The street signs on Fulton are bagged for the parade, and the west side will be shut by noon.',
      title: 'The parade closes the street',
      body: 'The whole west side is blocked off for the parade. Load-in means carrying amps four blocks, and the house next to the social hall is already getting calls about the noise.',
      options: [
        { id: 'LATE', label: 'Push doors back until the street reopens', likely: 'The crowd that wants a night out shows up. Later than planned.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. The parade crowd drifted in, loud and happy.' },
        { id: 'CARRY', label: 'Carry the gear in by hand and run it as planned', likely: 'Sore backs, a thin first hour.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 30 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Four blocks with an amp on every shoulder. The show started late and went well.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] }
  ]
});
