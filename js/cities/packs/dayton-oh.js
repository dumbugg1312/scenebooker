SB.Cities.register('dayton-oh', {
  v: 1,
  slug: 'dayton-oh',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  /* The dossier's real institutions and its invented venue names are in banned: research, not content. */
  banned: ['wright-patterson', 'wright-patt', 'wright patterson air force base', 'university of dayton', 'ud arena', 'wright state', 'sinclair community college',
           'wittenberg', 'antioch college', 'cedarville', 'central state university', 'miami university', 'ohio state', 'bengals', 'dayton daily news',
           'dayton city paper', 'wyso', 'hamvention', 'dayton air show', 'first four', 'ncaa', 'dayton dragons', 'montgomery county fair', 'frisch\'s',
           'waffle house', 'taco bell', 'pbr', 'rolling rock', 'dorothy lane market', 'general motors', 'national cash register', 'earlham', 'ball state',
           'ud ghetto', 'gem city', 'birthplace of aviation', 'the levee room', 'conservancy hall', 'the canal street basement', 'great miami social club',
           'aerie 114', 'mad river annex', 'the stillwater', 'wayne avenue rec', 'the delco floor', 'brown street garage', 'the triangle door', 'keowee lanes',
           'american legion', 'vfw', 'knights of columbus', 'moose lodge', 'eagles',
           'dayton daily news', 'greene county fairgrounds', 'greene county fair and expo center', 'vandalia flight fest', 'blue angels', 'dayton celtic festival',
           'celtic fest ohio', 'ohio renaissance festival', 'renaissance festival', 'dayton art institute', 'passport to metroparks', 'dayton pride', 'destination dayton',
           'cultureworks', 'daytonlocal', 'tipp gazette', 'whio', 'bandsintown', 'songkick', 'diyohio', 'dayton international airport', 'fairborn theater',
           'fairborn phoenix foundation', 'dayton police department', 'dayton municipal code', 'ud flyers', 'arrl'],
  blocklist: ['waffle house*', 'dayton daily news*', 'hamvention*', 'dayton dragons*', 'ud arena*', 'frisch*', 'levee room*', 'delco*'],

  blurb: ['A close-knit, mixed scene that moves between basements, a record-store crowd and small-town halls.',
          'Everybody knows the same few organizers, and last year\'s house venue is probably someone\'s apartment now.'],
  hard: 'Rooms come and go, so the bill is only as good as who still has a basement.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83.0 },
    { name: 'Cincinnati', state: 'OH', lat: 39.1, lon: -84.51 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Dayton' },
    { id: 'fairborn', kind: 'FEEDER', name: 'Fairborn', minutes: 15, bearing: 75, pop: 34000, scene: 300, note: 'A commuter-college and base-housing town on the east side.' },
    { id: 'kettering', kind: 'FEEDER', name: 'Kettering and Beavercreek', minutes: 20, bearing: 120, note: 'Big middle-class suburbs: hall shows and high school bands.' },
    { id: 'miamisburg', kind: 'FEEDER', name: 'Miamisburg and Springboro', minutes: 25, bearing: 200, note: 'Church-heavy suburbs to the south.' },
    { id: 'xenia', kind: 'FEEDER', name: 'Xenia', minutes: 25, bearing: 100, pop: 25000, note: 'A county seat with few rooms; kids come to Dayton.' },
    { id: 'yellow-springs', kind: 'FEEDER', name: 'Yellow Springs', minutes: 30, bearing: 65, note: 'A bohemian village with its own small art and music culture.', bands: 2 },
    { id: 'springfield', kind: 'FEEDER', name: 'Springfield', minutes: 30, bearing: 55, pop: 58000, note: 'An old industrial town with a small DIY scene of its own.', bands: 2 },
    { id: 'troy', kind: 'FEEDER', name: 'Troy and Piqua', minutes: 30, bearing: 355, note: 'Small manufacturing and farm towns with teenage bands.' },
    { id: 'middletown', kind: 'FEEDER', name: 'Middletown and Hamilton', minutes: 35, bearing: 195, note: 'Steel and paper towns, rougher and cheaper, closer to Cincinnati.' },
    { id: 'richmond', kind: 'FEEDER', name: 'Richmond', state: 'IN', minutes: 50, bearing: 270, pop: 35000, note: 'A small college and arts town over the state line.' },
    { id: 'greenville', kind: 'FEEDER', name: 'Eaton and Greenville', minutes: 50, bearing: 285, note: 'Farm towns on the western roads; teenage scenes are tiny.' },
    { id: 'muncie', kind: 'PEER', name: 'Muncie', state: 'IN', minutes: 100, bearing: 300, scene: 900, note: 'A college town to the northwest; bands trade.' },
    { id: 'fort-wayne', kind: 'PEER', name: 'Fort Wayne', state: 'IN', minutes: 120, bearing: 330, slug: 'fort-wayne-in', note: 'A similar-size Midwest town up the road.' },
    { id: 'toledo', kind: 'PEER', name: 'Toledo', minutes: 135, bearing: 5, slug: 'toledo-oh', note: 'The way to Detroit up I-75.' },
    { id: 'lexington', kind: 'PEER', name: 'Lexington', state: 'KY', minutes: 140, bearing: 175, slug: 'lexington-ky', note: 'A similar-size scene down I-75.' }
  ],

  hoods: [
    { id: 'oregon', name: 'the Oregon District', route: 'downtown', note: 'The historic brick bar and restaurant strip at the east edge of downtown: club shows, polished and expensive.' },
    { id: 'downtown', name: 'downtown and the riverfront', route: 'downtown', note: 'Converted factories and lofts, a ballpark and a community college; heating up and pricing out DIY.' },
    { id: 'south-park', name: 'South Park and Wayne Avenue', route: 'old-side', note: 'Dense old frame houses and a revived strip; the likeliest modern DIY hub.' },
    { id: 'brown-street', name: 'the student rental blocks south of downtown', route: 'campus', note: 'Crowded rented houses and a bar strip on Brown Street; basement and porch shows on a nine-month cycle, and police are quick.' },
    { id: 'dayton-view', name: 'Dayton View, Grafton Hill and the Triangle', route: 'old-side', note: 'Big old houses on the heights, some grand and some abandoned; large basements.' },
    { id: 'old-north', name: 'Old North Dayton', route: 'work-side', note: 'Small frame houses and corner taverns; garage and basement shows.' },
    { id: 'east-dayton', name: 'East Dayton and Huffman', route: 'work-side', note: 'Modest older houses, industrial remnants and strip malls; cheap and ignored.' },
    { id: 'fairborn', name: 'Fairborn', route: 'town:fairborn', note: 'A commuter-college town east of the city with a restored theater and a nonprofit that keeps it open.' },
    { id: 'west-dayton', name: 'West Dayton', route: 'old-side', note: 'The historic center of the city\'s Black community and its funk tradition; disinvested, slowly rebuilding.' }
  ],

  rooms: [
    { id: 'south-park-basement', kind: 'HOUSE', hood: 'south-park', cap: 50, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 50, start: true, note: 'A basement under an old frame house off Wayne Avenue. Word of mouth only, and a moving day can end it.' },
    { id: 'view-house', kind: 'HOUSE', hood: 'dayton-view', cap: 70, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, sketch: 25, standing: [60, 60, 45],
      pressure: 50, note: 'A big old house on the heights with a roomy basement. Grand, drafty, and half the block is for sale.' },
    { id: 'rental-porch', kind: 'HOUSE', hood: 'brown-street', cap: 60, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [70, 55, 35],
      pressure: 55, note: 'A student rental with a porch and a basement. Full in term, gone in May, and the police are quick.' },
    { id: 'north-gallery', kind: 'DIY', hood: 'old-north', cap: 80, rent: 70, deposit: 0, pa: .5, curfew: 1380, ac: false, sketch: 40, standing: [55, 60, 45],
      pressure: 55, needs: ['VOUCH'], note: 'A collective-run storefront gallery on a corner of the old north side. The fire code and the landlord are the whole threat.' },
    { id: 'skate-lot', kind: 'DIY', hood: 'east-dayton', cap: 100, rent: 40, deposit: 0, pa: .4, curfew: 1380, ac: false, outdoor: true, sketch: 45, standing: [55, 60, 40],
      pressure: 60, note: 'A skatepark and the lot around it on the east side. Nobody gave permission, so one complaint ends the night.' },
    { id: 'record-shop', kind: 'SHOP', hood: 'downtown', cap: 60, pa: .4, curfew: 1260, ac: true, sketch: 5, standing: [70, 70, 75], following: .2,
      note: 'A punk record shop on the Fifth Street corridor. Its hours are the night, and it has been looking at pricier blocks.' },
    { id: 'theater-hall', kind: 'HALL', hood: 'fairborn', cap: 300, rent: 250, deposit: 100, pa: .7, curfew: 1380, ac: true, sketch: 10, standing: [55, 65, 70],
      owner: 'HALL_MANAGER', note: 'A restored old theater run by a nonprofit, with a bar. No standing pit, and the nonprofit has a long list of rules.' },
    { id: 'east-tavern', kind: 'BAR', hood: 'oregon', cap: 200, soundFee: 60, pa: .7, ages: ['ALL', 'A18', 'A21'], matinee: true, curfew: 1530, ac: true, following: .3, sketch: 20,
      standing: [50, 65, 70], note: 'A tavern with a stage at the east edge of downtown. The age policy changes with the night.' },
    { id: 'oregon-club', kind: 'CLUB', hood: 'oregon', cap: 250, houseCosts: 200, split: .8, pa: .9, ages: ['A18'], curfew: 1500, ac: true, following: .6, sketch: 10,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The polished music club on the brick strip. Metal and touring bills, and the security got tighter.' },
    { id: 'river-club', kind: 'CLUB', hood: 'downtown', cap: 300, houseCosts: 150, split: .8, pa: .85, ages: ['ALL'], curfew: 1380, ac: true, following: .5, sketch: 15,
      standing: [50, 70, 70], owner: 'TALENT_BUYER', notice: 35, needs: ['FULL_BILL'], note: 'A mid-size club by the river with an all-ages side room for local bills. Loud nights end at eleven.' },
    { id: 'corner-tavern', kind: 'BAR', hood: 'south-park', cap: 120, soundFee: 40, pa: .6, ages: ['A21'], curfew: 1530, ac: true, following: .3, sketch: 15,
      standing: [50, 65, 70], pressure: 50, note: 'A corner tavern with a small stage. The liquor permit makes it 21 and over after dark.' },
    { id: 'huffman-yard', kind: 'OUTDOOR', hood: 'east-dayton', cap: 100, rent: 10, pa: .4, curfew: 1290, sketch: 35, standing: [60, 55, 40],
      note: 'A yard and a lot out by Huffman. Summer evenings only, and the voice rule and the ten o\'clock sound cap come fast.' }
  ],

  contacts: ['fort-wayne-in', 'toledo-oh', 'lexington-ky', 'columbus', 'cincinnati'],

  calendar: [
    { id: 'air-show', label: 'the air show weekend', tag: 'airshow', month: 6, weeks: [2, 4], dows: [4, 5, 6], can: [.88, .85, .85] },
    { id: 'radio-convention', label: 'the radio convention weekend', tag: 'festival', month: 5, week: 3, dows: [4, 5, 6], can: [.90, .88, .88] },
    { id: 'march-hoops', label: 'the university\'s March basketball', tag: 'game', month: 3, weeks: [1, 3], dows: [2, 3, 4, 5], can: [.90, .92, .92], hoods: ['brown-street', 'downtown'], elsewhere: [1, 1, 1] },
    { id: 'celtic-fest', label: 'the Celtic festival', tag: 'festival', month: 7, week: 3, dows: [4, 5, 6], can: [.92, .88, .88], hoods: ['downtown', 'oregon'], elsewhere: [1, .97, .97] },
    { id: 'museum-fest', label: 'the museum\'s fall beer festival', tag: 'festival', month: 9, weeks: [2, 3], dows: [4, 5, 6], can: [.95, .92, .92] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 7, week: 4, dows: [2, 3, 4, 5, 6], can: [.90, .92, .95] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.88, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.88, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1380, weekend: 1380, inForce: true } },

  events: [
    { id: 'DAYTON_OH_BASEMENT_FLOOD', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [3, 4, 5, 6] },
      telegraph: 'It has rained for three days and the basement on Wayne Avenue has an inch of water by the stairs.',
      title: 'The basement is under water',
      body: 'The spring rain got into the house the week of the radio convention, and half your bill is stuck on the road with the visitors jamming the east side and I-675.',
      options: [
        { id: 'PORCH', label: 'Move the show to the porch and the yard', likely: 'Smaller, wetter, and the neighbors will hear all of it.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .6 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The bands played on the porch with the amps under a tarp. It was small and loud and nobody minded the damp.' },
        { id: 'HOUSE', label: 'Move the whole bill to another house', likely: 'A bigger floor, if anyone still has a dry one.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'A friend on the heights took the bill with a few hours to spare. The floor was dry and packed.' },
        { id: 'WAIT', label: 'Wait for the road to clear', likely: 'A late start, and not everyone stays.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The van got in at ten. You started late and the ones who stayed were glad.' }
      ] },

    { id: 'DAYTON_OH_LOT_SWEEP', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [5, 6, 7, 8, 9] },
      telegraph: 'The east-side skatepark lot is on the bill this weekend, and police are doing sweeps for kids out past curfew.',
      title: 'The eleven o\'clock sweep',
      body: 'The lot show is going well until the voice rule and the under-eighteen curfew arrive together. Half the crowd has to be gone before the last band.',
      options: [
        { id: 'EARLY', label: 'Start early and finish before the curfew', likely: 'A short night, but the whole bill plays.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors at four and done by ten. The kids got their set and got home.' },
        { id: 'INSIDE', label: 'Move it into a house', likely: 'Smaller, and out of sight of the sweep.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'The bill moved to a basement and the floor packed in. Nobody was cited.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The younger half of the crowd will be sent home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The curfew took the kids at eleven. The last band played to the grown-ups.' }
      ] },

    { id: 'DAYTON_OH_AIR_SHOW', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'airshow' },
      telegraph: 'The air show fills every hotel north of the city, and half the bands have cancelled.',
      title: 'The air show takes the bands',
      body: 'Hotels and roads are full for the weekend. The Friday evening companion event has the whole city looking up, and the hall in Fairborn is the only room with an open night.',
      options: [
        { id: 'FAIRBORN', label: 'Take the open night at the theater hall', likely: 'A big room, but the nonprofit has its rules.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'The hall took the bill and the seats filled with people who could not get a hotel room.' },
        { id: 'SHORT', label: 'Run the short bill where you are', likely: 'Thin, but the ones who come are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Two bands and a loose, easy night. The planes were the only thing anyone talked about.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' }
      ] }
  ],

  points: [
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83.0, pop: 905000 },
    { name: 'Cincinnati', state: 'OH', lat: 39.1, lon: -84.51, pop: 310000 },
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16, pop: 880000 },
    { name: 'Lima', state: 'OH', lat: 40.74, lon: -84.11, pop: 36000 }
  ],
  roads: ['I-75', 'I-70', 'I-675', 'US 35', 'US 68'],

  words: {
    street: ['Wayne Avenue', 'Brown Street', 'East Fifth Street', 'Keowee Street', 'Main Street', 'Salem Avenue', 'Third Street'],
    water: ['the Great Miami', 'the Mad River', 'Wolf Creek', 'the river trail'],
    hood: ['the Oregon District', 'South Park', 'Dayton View', 'Grafton Hill', 'Old North Dayton', 'Huffman', 'Dunbar', 'Westwood', 'Kettering', 'Oakwood'],
    thing: ['basement', 'square-cut pizza', 'chili parlor', 'trolley bus', 'levee', 'machine shop', 'party cut', 'record store', 'small-town hall', 'zine'],
    weather: ['tornado watch', 'spring flood', 'lake-effect gray']
  }
});
