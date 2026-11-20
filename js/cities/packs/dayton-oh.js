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
           'american legion', 'vfw', 'knights of columbus', 'moose lodge', 'eagles'],
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
    { id: 'fairborn', kind: 'FEEDER', name: 'Fairborn', minutes: 15, bearing: 75, pop: 34000, note: 'A commuter-college and base-housing town on the east side.' },
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
    { id: 'west-dayton', name: 'West Dayton', route: 'old-side', note: 'The historic center of the city\'s Black community and its funk tradition; disinvested, slowly rebuilding.' }
  ],

  contacts: ['fort-wayne-in', 'toledo-oh', 'lexington-ky', 'bloomington-in'],

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
