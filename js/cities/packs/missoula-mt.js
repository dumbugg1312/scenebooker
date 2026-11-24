SB.Cities.register('missoula-mt', {
  v: 1,
  slug: 'missoula-mt',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['missoula downtown partnership', 'downtown missoula partnership', 'destination missoula', 'caras park', 'zootown music festival', 'missoula pride', 'missoula marathon', 'missoula paddleheads', 'paddleheads', 'kettlehouse amphitheater', 'brawl of the wild', 'bobcat stadium', 'big sky conference', 'gogriz', 'adams center', 'missoula county fairgrounds', 'missoula county fair', 'western montana fair', 'poverello center', 'nbc montana', 'kgvo', 'kmpt', 'kfgm', '96.3 the blaze', '107.5 zoo fm', 'visit montana', 'university of montana', 'griz', 'grizzlies', 'montana state', 'montana state university', 'bobcats', 'washington-grizzly stadium',
           'grizzly stadium', 'kbga', 'kufm', 'montana public radio', 'missoulian', 'missoula current', 'montana kaimin', 'kaimin',
           'missoula independent', 'montana rail link', 'bnsf', 'river city roots festival', 'roots festival', 'first friday', 'garden city brewfest',
           'brewfest', 'maggotfest', 'international wildlife film festival', 'big sky documentary film festival', 'montana book festival',
           'mountain line', 'jefferson lines', 'amtrak', 'malmstrom', 'malmstrom air force base', 'salish kootenai college', 'carroll college',
           'montana tech', 'missoula college', 'vfw', 'american legion', 'elks', 'eagles', 'knights of columbus', 'the slackwater hall',
           'tamarack annex', 'the switchyard', 'orchard row garage', 'bonner millyard shed', 'the pinecone pantry', 'eighth street lanes',
           'the sentinel room', 'greenough carport', 'the brakeman\'s parlor', 'fort flats basement', 'the lolo pass lodge'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['missoulian*', 'kbga*', 'kufm*', 'montana kaimin*', 'river city roots*', 'maggotfest*', 'washington-grizzly*', 'garden city brewfest*'],

  blurb: ['A mountain-valley college town in folk and roots country, with a punk thread running through it. There are early all-ages taproom slots, and then basements across the river.',
          'Students fill the rooms from fall to spring and vanish by May, and summer means yards, smoke and long drives.'],
  hard: 'Tours skip the state, the crowd vanishes every May, and summer smoke cancels yards.',
  region: 'the northern Rockies',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Spokane', state: 'WA', lat: 47.66, lon: -117.43 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Missoula' },
    { id: 'lolo', kind: 'FEEDER', name: 'Lolo', minutes: 15, bearing: 190, note: 'An unincorporated suburb to the south. Its kids are basically Missoula kids.' },
    { id: 'frenchtown', kind: 'FEEDER', name: 'Frenchtown', minutes: 20, bearing: 285, note: 'A former mill town west on the interstate with a rural lean.' },
    { id: 'arlee', kind: 'FEEDER', name: 'Arlee', minutes: 30, bearing: 345, note: 'A small town on the reservation to the north, with powwow life nearby.' },
    { id: 'stevensville', kind: 'FEEDER', name: 'Stevensville', minutes: 35, bearing: 185, note: 'An old mission town in the Bitterroot with farms and acreage.' },
    { id: 'hamilton', kind: 'FEEDER', name: 'Hamilton', minutes: 60, bearing: 190, note: 'The valley\'s main town, conservative and outdoorsy. Its teens come north for shows.' },
    { id: 'superior', kind: 'FEEDER', name: 'Superior', minutes: 60, bearing: 275, note: 'A very small old mining and logging county seat to the west.' },
    { id: 'seeley-lake', kind: 'FEEDER', name: 'Seeley Lake', minutes: 60, bearing: 30, note: 'A lake and logging town, snowed in half the year.' },
    { id: 'ronan', kind: 'FEEDER', name: 'Ronan and Polson', minutes: 65, bearing: 355, note: 'Reservation farm and lake towns up US 93, with school-sports social lives.' },
    { id: 'deer-lodge', kind: 'FEEDER', name: 'Deer Lodge', minutes: 75, bearing: 105, note: 'A ranching town tied to the state prison.' },
    { id: 'helena', kind: 'PEER', name: 'Helena', state: 'MT', minutes: 110, bearing: 85, note: 'The state capital. Bands pair it with Missoula as a two-night run.' },
    { id: 'butte', kind: 'PEER', name: 'Butte', state: 'MT', minutes: 120, bearing: 105, note: 'An old mining town, tough and proud. A trading partner for shows and bands.' },
    { id: 'kalispell', kind: 'PEER', name: 'Kalispell', state: 'MT', minutes: 135, bearing: 355, note: 'A smaller, more conservative gateway town to the north.' },
    { id: 'bozeman', kind: 'PEER', name: 'Bozeman', state: 'MT', minutes: 180, bearing: 110, slug: 'bozeman-mt', note: 'Bigger, richer and a real rival. The next stop east on the interstate.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown on the south bank', route: 'downtown', note: 'Bars, taprooms, galleries and a riverfront park along Higgins. Licensed rooms that go all-ages early, and priced out for anything cheap or loud.' },
    { id: 'northside', name: 'the Northside', route: 'old-side', note: 'Old railroad houses on small lots across the river, cut off by the tracks and the interstate. Historically the punk-house neighborhood, now gentrifying.' },
    { id: 'westside', name: 'the Westside', route: 'work-side', note: 'Smaller older houses, many rentals, near the rail line. Basements and shared houses, still relatively cheap.' },
    { id: 'university', name: 'the University District and the Hip Strip', route: 'campus', note: 'Student rentals, cafes, record and thrift shops under the mountain. Full in the school year, empty in summer, with party enforcement.' },
    { id: 'southside', name: 'the Southside and Orchard Homes', route: 'old-side', note: 'Older streets and river-flat lots with gardens, outbuildings and garages. Cheap and ignored, but being built over.' },
    { id: 'reserve', name: 'Reserve Street and the Wye', route: 'work-side', note: 'Big-box strips and light-industrial units at the west edge of town. Practice rooms and a generator-and-warehouse show or two.' },
    { id: 'rattlesnake', name: 'the Rattlesnake', route: 'old-side', note: 'Leafy and quiet with many homeowners. No shows, and a source of noise complaints.' },
    { id: 'east-missoula', name: 'East Missoula', route: 'work-side', note: 'A flood-prone river-bottom community with old bars and cheaper rent, under the county sheriff rather than city police.' }
  ],

  rooms: [
    { id: 'northside-house', kind: 'HOUSE', hood: 'northside', cap: 60, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [70, 60, 45],
      pressure: 50, start: true, note: 'A long-running house with padded plywood inserts for the windows. The schedule ebbs and flows, and it goes dark for stretches.' },
    { id: 'university-house', kind: 'HOUSE', hood: 'university', cap: 40, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [75, 55, 35],
      pressure: 60, note: 'A student rental under the mountain. Packed in the school year, empty in summer, and the party police know the block.' },
    { id: 'arts-center', kind: 'DIY', hood: 'downtown', cap: 250, curfew: 1380, ac: true, sketch: 30, standing: [60, 60, 60],
      pressure: 45, note: 'A non-profit arts center in the old core. The main all-ages stage for touring bills and benefits, shared with a crowded community calendar.' },
    { id: 'tool-library', kind: 'DIY', hood: 'southside', cap: 80, curfew: 1320, ac: false, sketch: 25, standing: [65, 65, 55],
      pressure: 40, note: 'A tool library and skill-share hub on the near south side. All ages, no one turned away for money, and it runs on volunteers.' },
    { id: 'post-hall', kind: 'HALL', hood: 'westside', cap: 200, rent: 200, deposit: 75, pa: .6, curfew: 1380, ac: true, sketch: 15, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'An old post hall on the Westside grid, rented by the night. It has seen a late-night set, and the new promoters have noticed.' },
    { id: 'skate-shop', kind: 'SHOP', hood: 'university', cap: 50, curfew: 1260, ac: false, sketch: 10, standing: [70, 70, 75],
      note: 'A skate shop on the Hip Strip. Short sets after closing, stuffed at fifty.' },
    { id: 'heavy-bar', kind: 'BAR', hood: 'downtown', cap: 150, soundFee: 50, pa: .7, ages: ['A21'], curfew: 1500, ac: true, following: .3, sketch: 20,
      standing: [50, 65, 70], note: 'A heavy-music bar on the downtown side streets. Bar-sized stage, and no minors in the room.' },
    { id: 'downtown-club', kind: 'CLUB', hood: 'downtown', cap: 350, houseCosts: 150, split: .8, pa: .9, ages: ['A18'], curfew: 1500, ac: true, following: .5, sketch: 10,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The downtown club where local bands get a real stage. The same group runs the big theater next door.' },
    { id: 'old-theater', kind: 'BIG', hood: 'downtown', cap: 1100, rent: 2000, deposit: 500, pa: .95, curfew: 1380, ac: true, sketch: 5, standing: [40, 70, 75],
      owner: 'TALENT_BUYER', notice: 84, needs: ['FULL_BILL'], note: 'A restored downtown theater, one promoter\'s world. Locals open only by invitation.' }
  ],

  contacts: ['bozeman-mt', 'spokane-wa', 'boise-id'],

  calendar: [
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 4], dows: [5], can: [.85, .95, .95], hoods: ['university', 'downtown'], elsewhere: [.97, .97, .97] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [5], can: [.85, .95, .95], hoods: ['university', 'downtown'], elsewhere: [.97, .97, .97] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 3], dows: [5], can: [.85, .95, .95], hoods: ['university', 'downtown'], elsewhere: [.97, .97, .97] },
    { id: 'roots-weekend', label: 'the downtown street festival', tag: 'festival', month: 8, weeks: [3, 4], dows: [4, 5], can: [.85, .85, .80], hoods: ['downtown'], elsewhere: [.95, .95, .95] },
    { id: 'pride-marathon', label: 'pride and marathon weekend', tag: 'parade', month: 6, weeks: [2, 3], dows: [5, 6], can: [.90, .90, .88], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'graduation', label: 'graduation weekend', tag: 'graduation', month: 5, week: 2, dows: [4, 5, 6], can: [.80, .85, .85], hoods: ['university'], elsewhere: [.92, .92, .92] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Spokane', state: 'WA', lat: 47.66, lon: -117.43, pop: 590000 },
    { name: 'Billings', state: 'MT', lat: 45.78, lon: -108.5, pop: 185000 },
    { name: 'Coeur d\'Alene', state: 'ID', lat: 47.68, lon: -116.78, pop: 55000 },
    { name: 'Great Falls', state: 'MT', lat: 47.5, lon: -111.3, pop: 60000 }
  ],
  roads: ['I-90', 'US 93', 'US 12', 'Highway 200', 'Lookout Pass'],

  words: {
    street: ['Higgins Avenue', 'Broadway', 'Front Street', 'Reserve Street', 'South Higgins', 'Orange Street'],
    water: ['the Clark Fork', 'the Bitterroot', 'the Blackfoot', 'Rattlesnake Creek'],
    hood: ['the Northside', 'the Westside', 'the Southside', 'Orchard Homes', 'Franklin to the Fort', 'the Wye', 'the Rattlesnake', 'East Missoula', 'Lolo', 'Frenchtown'],
    thing: ['huckleberry shake', 'taproom', 'float trip', 'generator', 'gravel bar', 'elk burger', 'bear spray', 'porch', 'river trail', 'mountain pass', 'chains', 'graduation weekend'],
    weather: ['wildfire smoke', 'winter inversion', 'snow on the pass']
  },

  events: [
    { id: 'MISSOULA_MT_ROOTS_CLOSURES', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'festival' },
      telegraph: "The festival weekend is closing the downtown streets, and the barricades go up Friday.",
      title: "The streets are closed",
      body: "The street festival has shut down the downtown streets, and the kids are standing outside the all-ages room with no place to park and no way in.",
      options: [
        { id: 'EARLY', label: "Open early and tell everyone where to park", likely: "Most get in before the barricades. Thinner than usual.",
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.92 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: "You opened doors an hour early, and the people who came walked in from across the river." },
        { id: 'PORCH', label: "Move the show to a porch across the river", likely: "It's smaller and louder, and nobody needs a parking spot.",
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: "A porch on the Northside took the whole bill, and the street was packed." },
        { id: 'ACCEPT', label: "Run it and take what you get", likely: "A lot of people give up because of the closures.",
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.75 }],
          result: "The streets stayed shut, and half the list never got near the door." }
      ] },

    { id: 'MISSOULA_MT_PASS_LATE', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [11, 12, 1, 2, 3] },
      telegraph: "Chains are required on the pass, and the touring band is somewhere on it.",
      title: "The band is late over the pass",
      body: "The touring band is crawling over the mountain pass behind a plow. The arts room is filling, but the bar down the street has stolen the heavy fans.",
      options: [
        { id: 'SHORT', label: "Start with the locals and play on", likely: "It's a thin start, but the crowd waits.",
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: "The locals played long and loose, and the van showed up for the last hour." },
        { id: 'WAIT', label: "Hold the doors and wait for them", likely: "It means a late start, and the crowd gets restless.",
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }],
          result: "The van pulled in at ten, and you started late, but nobody left." },
        { id: 'MOVE', label: "Move it a day", likely: "It breaks the date, and the bands lose some trust in you.",
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: "You moved it a day, and not everyone could make the new one." }
      ] },

    { id: 'MISSOULA_MT_SMOKE', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [7, 8, 9] },
      telegraph: "The wildfire smoke is thick in the valley, and the air quality is at its worst.",
      title: "The smoke closes the outdoor show",
      body: "The air is unsafe to breathe, so the skatepark show is off. The band wants to load into the derby space downtown, and the derby team wants the floor at nine.",
      options: [
        { id: 'INSIDE', label: "Load into the substance-free derby space", likely: "It's smaller and cleaner, with a hard curfew at nine.",
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'DIY', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }, { op: 'SHOW_MOD', key: 'lateMin', v: -120 }],
          result: "The bands played an early, tight set and cleared the floor by nine." },
        { id: 'SHORT', label: "Play outside and take the cough", likely: "The kids with masks come.",
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.7 }],
          result: "The haze was orange, and half the list stayed home and the rest wore masks." },
        { id: 'MOVE', label: "Move it a day", likely: "It breaks the date, and the bands lose some trust in you.",
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: "You moved it a day, and not everyone could make the new one." }
      ] }
  ]
});
