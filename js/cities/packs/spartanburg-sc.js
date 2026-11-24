SB.Cities.register('spartanburg-sc', {
  v: 1,
  slug: 'spartanburg-sc',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['wofford', 'wofford college', 'converse university', 'converse college', 'usc upstate', 'spartanburg methodist', 'bmw', 'festifall',
           'dickens of a christmas', 'greek festival', 'hub city hog fest', 'hog fest', 'hub city', 'international festival', 'red white and boom',
           'taste of the backcountry', 'spartanburg criterium', 'music on main', 'hub city farmers market', 'mayfest', 'gibbs stadium',
           'waffle house', 'bojangles', 'cook out', 'zaxby\'s', 'hardee\'s', 'cheerwine', 'amtrak', 'crescent', 'greenville-spartanburg',
           'winthrop university', 'clinton college', 'york tech', 'clemson', 'fort jackson', 'sparkle city',
           'the switchyard', 'hub hall', 'piedmont annex', 'loom room', 'sparkle lot', 'the depot back room', 'depot back room', 'red clay hall',
           'backcountry lodge', 'spindle street garage', 'boiled peanut annex', 'fourth shift',
           'spartanburg herald-journal', 'herald-journal', 'spartan weekly', 'fox carolina', 'greenville news', 'visit spartanburg', 'experience spartanburg',
           'hub city brew fest', 'shenanigans on the square', 'spring fling', 'criterium', 'cribbs burger cookoff', 'jaycees christmas parade', 'parade of nations',
           'spartanburg international festival', 'spartanburg memorial auditorium', 'memorial auditorium', 'chapman cultural center', 'bon secours wellness arena',
           'peace center', 'coach music factory', 'sc venue crisis', 'spartanburg community college', 'sccsc', 'spartanburg bmx'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Colleges and events appear in game text only as generic words. */
  blocklist: ['wofford*', 'converse*', 'hub city*', 'sparkle city*', 'waffle house*', 'cheerwine*', 'switchyard*', 'loom room*'],

  blurb: ['An Upstate mill town where the interstates cross and most bands keep driving to Greenville.',
          'Shows are in carports, garages, halls and whatever the mill left, and everyone knows everyone.'],
  hard: 'Bands skip it for Greenville, and the room costs a drive.',
  region: 'the Upstate',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Greenville', state: 'SC', lat: 34.85, lon: -82.4 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Columbia', state: 'SC', lat: 34.0, lon: -81.03 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Spartanburg' },
    { id: 'boiling-springs', kind: 'FEEDER', name: 'Boiling Springs and Moore', minutes: 15, bearing: 340, note: 'Suburbs where many local band members live.' },
    { id: 'duncan', kind: 'FEEDER', name: 'Duncan and Wellford', minutes: 15, bearing: 250, note: 'Suburbs along I-85 toward Greenville.' },
    { id: 'greer', kind: 'FEEDER', name: 'Greer', minutes: 20, bearing: 265, pop: 35308, note: 'A big suburban and commercial town; its people drift to Greenville.' },
    { id: 'inman', kind: 'FEEDER', name: 'Inman', minutes: 20, bearing: 350, pop: 2990, note: 'An old railroad and mill town; a few kids, no scene.' },
    { id: 'landrum', kind: 'FEEDER', name: 'Landrum', minutes: 25, bearing: 315, pop: 2481, note: 'A small foothills town near the North Carolina line with an artsy, horse-country lean.' },
    { id: 'chesnee', kind: 'FEEDER', name: 'Chesnee', minutes: 25, bearing: 55, note: 'A small farm and mill town.' },
    { id: 'cowpens', kind: 'FEEDER', name: 'Cowpens and Pacolet', minutes: 25, bearing: 80, note: 'Small mill and farm towns east on US 221.' },
    { id: 'gaffney', kind: 'FEEDER', name: 'Gaffney', minutes: 30, bearing: 95, pop: 12764, note: 'A peach-country mill and highway town.' },
    { id: 'tryon', kind: 'FEEDER', name: 'Tryon', state: 'NC', minutes: 35, bearing: 335, note: 'A small arts-and-horse foothills village.' },
    { id: 'union', kind: 'FEEDER', name: 'Union', minutes: 45, bearing: 150, pop: 8174, note: 'An old textile county seat, rural.' },
    { id: 'laurens', kind: 'FEEDER', name: 'Laurens', minutes: 45, bearing: 190, note: 'A small mill and farm county seat to the south.' },
    { id: 'gastonia', kind: 'PEER', name: 'Gastonia', state: 'NC', minutes: 60, bearing: 85, scene: 600, note: 'A mill city in Charlotte\'s shadow, up I-85.' },
    { id: 'anderson', kind: 'PEER', name: 'Anderson', minutes: 65, bearing: 240, scene: 500, note: 'A smaller cousin past Greenville.' },
    { id: 'asheville', kind: 'PEER', name: 'Asheville', state: 'NC', minutes: 75, bearing: 335, slug: 'asheville-nc', note: 'Bigger, richer and music-minded; local kids go there for shows.' },
    { id: 'rock-hill', kind: 'PEER', name: 'Rock Hill', minutes: 75, bearing: 100, scene: 700, note: 'A college town living in Charlotte\'s shadow, like this one.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The old square grid with the railroad on its south side: restaurants, breweries, lofts and festivals; licensed bars and storefront rooms.' },
    { id: 'hampton-heights', name: 'Hampton Heights', route: 'old-side', note: 'Big old historic houses northwest of downtown, many split into rentals; porch and house shows, with complaint-prone neighbors.' },
    { id: 'college-corridor', name: 'the college corridor on East Main', route: 'campus', note: 'Two small campuses and the old houses around them; shows come and go with the semester.' },
    { id: 'northside', name: 'the Northside', route: 'work-side', note: 'A long-underinvested neighborhood north of downtown now facing redevelopment; any show here needs care and local trust.' },
    { id: 'mill-villages', name: 'the mill villages', route: 'work-side', note: 'Beaumont, Saxon, Glendale and Valley Falls: small worker houses ringed by mill buildings; yards, carports and practice rooms in old mill space.' },
    { id: 'southside', name: 'the south and west sides', route: 'work-side', note: 'Strip commercial, apartments and light industry toward the interstates; storage-unit jams and generator shows in lots.' },
    { id: 'suburbs', name: 'the suburban ring', route: 'campus', note: 'Subdivision garages and church youth rooms where most of the kids live.' },
    { id: 'upstate-edge', name: 'the Business 85 east side', route: 'campus', note: 'Student apartments and retail around a suburban commuter campus.' }
  ],

  rooms: [
    { id: 'ring-garage', kind: 'HOUSE', hood: 'suburbs', cap: 40, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [65, 60, 50],
      pressure: 45, start: true, note: 'A carport and garage in a subdivision, run off extension cords. Real basements are rare, and the neighbors are close.' },
    { id: 'heights-porch', kind: 'HOUSE', hood: 'hampton-heights', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [65, 60, 45],
      pressure: 55, note: 'A big old house split into rentals, with a porch and a front-room stage. A historic block with neighbors who call.' },
    { id: 'mill-yard', kind: 'HOUSE', hood: 'mill-villages', cap: 60, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: true, sketch: 25, standing: [65, 60, 50],
      pressure: 40, note: 'A worker house with a big yard and a carport. Easy neighbors, until a summer storm rolls in.' },
    { id: 'mill-bay', kind: 'DIY', hood: 'mill-villages', cap: 80, rent: 60, deposit: 0, pa: .5, curfew: 1380, ac: false, sketch: 40, standing: [55, 60, 45],
      pressure: 55, needs: ['VOUCH'], note: 'A practice room in an old mill building. The owner is hard to reach and the developers are not.' },
    { id: 'storage-jam', kind: 'DIY', hood: 'southside', cap: 50, rent: 40, deposit: 0, pa: .5, curfew: 1350, ac: false, sketch: 35, standing: [55, 60, 45],
      pressure: 55, needs: ['VOUCH'], note: 'A warehouse bay by the interstate. Cheap, loud, and the fire marshal hears about anything that charges at the door.' },
    { id: 'civic-hall', kind: 'HALL', hood: 'downtown', cap: 150, rent: 150, deposit: 75, pa: .6, curfew: 1320, ac: true, sketch: 10, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'A rented lodge-style hall off the square. No beer, no late nights, and a board that wants to hear the amps first.' },
    { id: 'square-lot', kind: 'OUTDOOR', hood: 'downtown', cap: 100, rent: 15, pa: .4, curfew: 1260, ac: false, outdoor: true, sketch: 30, standing: [60, 55, 45],
      note: 'A side lot off the downtown square where the weekly outdoor music runs in season. Parking and a permit are the squeeze.' },
    { id: 'brewery-bar', kind: 'BAR', hood: 'downtown', cap: 120, soundFee: 50, pa: .7, ages: ['ALL', 'A21'], matinee: true, curfew: 1410, ac: true, following: .3, sketch: 15, standing: [50, 65, 70],
      note: 'A downtown stage that leans toward roots and covers. An early all-ages slot is possible if you ask nicely.' },
    { id: 'rock-club', kind: 'CLUB', hood: 'southside', cap: 300, houseCosts: 200, split: .8, pa: .9, ages: ['A21'], curfew: 1440, ac: true, following: .5, sketch: 15, standing: [45, 70, 65],
      owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], pressure: 60, note: 'A stripped-down rock, punk and metal club off the interstate, same owner for decades. Mostly 21 and up, and nobody can say if it is still open.' },
    { id: 'civic-theater', kind: 'BIG', hood: 'downtown', cap: 2000, rent: 2000, deposit: 500, pa: 1, curfew: 1380, ac: true, sketch: 5, standing: [40, 70, 70],
      note: 'The civic hall and theater complex downtown. Punk gets in as an opener on a package, never as a booker\'s room.' },
    { id: 'main-shop', kind: 'SHOP', hood: 'college-corridor', cap: 40, pa: .4, curfew: 1260, ac: true, sketch: 5, standing: [65, 65, 70], following: .15,
      note: 'A storefront on East Main by the two campuses. In-store sets in the afternoon, here and gone with the semesters.' }
  ],

  contacts: ['greenville-sc', 'asheville-nc', 'columbia-sc', 'charlotte', 'atlanta'],

  calendar: [
    { id: 'march-party', label: 'the March street party', tag: 'festival', month: 3, week: 3, dows: [5], can: [.85, .88, .90], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'bike-race', label: 'the spring bike race weekend', tag: 'race', month: 5, weeks: [2, 3], dows: [4, 5], can: [.88, .90, .92], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'fourth-night', label: 'the Fourth of July night', tag: 'holiday', month: 7, week: 1, dows: [3, 4, 5, 6], can: [.80, .82, .85] },
    { id: 'beer-fest', label: 'the autumn beer weekend', tag: 'festival', month: 9, week: 2, dows: [5], can: [.88, .90, .92], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'intl-fest', label: 'the autumn world-foods weekend', tag: 'festival', month: 10, week: 1, dows: [5], can: [.88, .90, .92], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'xmas-weekend', label: 'the winter Christmas weekend and parade', tag: 'parade', month: 12, week: 1, dows: [4, 5], can: [.80, .85, .88], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4, 5], can: [.90, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4, 5], can: [.90, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Greenville', state: 'SC', lat: 34.85, lon: -82.4, pop: 70720 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 875000 },
    { name: 'Greer', state: 'SC', lat: 34.94, lon: -82.23, pop: 35308 },
    { name: 'Hendersonville', state: 'NC', lat: 35.32, lon: -82.46, pop: 15000 }
  ],
  roads: ['I-85', 'I-26', 'I-585', 'US 29', 'US 221', 'US 176'],

  words: {
    street: ['Main Street', 'North Church Street', 'East Main', 'Business 85', 'US 221', 'US 176'],
    water: ['the Pacolet', 'Lawson\'s Fork', 'the Tyger'],
    hood: ['Hampton Heights', 'Beaumont', 'Saxon', 'Glendale', 'Valley Falls', 'Northside', 'Boiling Springs', 'Morgan Square', 'the Upstate'],
    thing: ['carport', 'boiled peanuts', 'pimento cheese', 'peach stand', 'mill house', 'sweet tea', 'generator', 'mill building', 'church youth hall', 'slab garage'],
    weather: ['afternoon thunderstorm', 'ice storm']
  },

  events: [
    { id: 'SPARTANBURG_SC_CHAPERONE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 6] },
      telegraph: 'The club will only run the all-ages bill if a parent stays for the whole night.',
      title: 'Someone\'s mother has to stay',
      body: 'The all-ages punk bill needs a grown-up in the room from doors to last chord. You have the bands and the PA but not a single chaperone.',
      options: [
        { id: 'FIND', label: 'Call every parent you know', likely: 'It costs a day of favors, and a few of them stay.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 30 }, { op: 'REGULARS', pct: .01 }],
          result: 'A mother with a folding chair watched the whole bill and left with a free shirt.' },
        { id: 'ADULTS', label: 'Make it 21 and up this once', likely: 'It\'s easy, and it locks out the kids.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'The kids waited out front, and some of them went home.' },
        { id: 'HOUSE', label: 'Take it to a garage', likely: 'It\'s smaller, and there\'s no chaperone rule.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A slab garage took the bill, extension cords and all.' }
      ] },

    { id: 'SPARTANBURG_SC_XMAS_GRID', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade', months: [11, 12] },
      telegraph: 'The tree lighting and parade close the downtown grid on the first weekend of December.',
      title: 'The grid is closed',
      body: 'The tree lighting, market and parade have shut the streets around the hall. Parking is gone, and half your crowd is walking in from the interstate.',
      options: [
        { id: 'EARLY', label: 'Start at five and finish early', likely: 'The parade crowd drifts in, and it\'s a short bill.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -120 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'You opened doors at five, and the parade crowd wandered in and stayed for two bands.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Half the list gives up on parking.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'The regulars walked a mile in the cold, and nobody else came.' }
      ] },

    { id: 'SPARTANBURG_SC_STORM_POWER', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [6, 7, 8, 9] },
      telegraph: 'A carport show is booked, and the afternoon sky is turning green.',
      title: 'The power goes out',
      body: 'A summer thunderstorm took the power in the middle of the second set. The whole crowd is jammed into a neighbor\'s garage, and the amps are dead.',
      options: [
        { id: 'GENERATOR', label: 'Run it off the generator', likely: 'It costs thirty dollars and an hour.',
          effects: [{ op: 'MONEY', amount: -30 }, { op: 'SHOW_MOD', key: 'lateMin', v: 60 }],
          result: 'The generator coughed and caught, and the crowd cheered, though the neighbors didn\'t.' },
        { id: 'UNPLUGGED', label: 'Play it unplugged in the garage', likely: 'It\'s quiet and small and strangely good.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'REGULARS', pct: .01 }],
          result: 'Three bands played acoustic by flashlight, and nobody wanted to leave.' }
      ] }
  ]
});
