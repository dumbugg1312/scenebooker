SB.Cities.register('indianapolis', {
  v: 1,
  slug: 'indianapolis',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['indiana university', 'iupui', 'iu indianapolis', 'butler university', 'university of indianapolis', 'marian university', 'ball state', 'purdue', 'notre dame',
           'indianapolis star', 'indystar', 'nuvo', 'mirror indy', 'indianapolis business journal', 'ibj', 'wish-tv', 'wthr', 'wrtv', 'wfyi', 'indianapolis colts', 'indiana pacers',
           'indianapolis indians', 'indy fuel', 'indianapolis motor speedway', 'indy 500', 'indianapolis 500', 'brickyard 400', 'indiana state fair', 'gen con', 'lucas oil stadium',
           'gainbridge fieldhouse', 'eli lilly', 'elevance', 'cummins', 'fedex', 'allison transmission', 'naval surface warfare center crane', 'fort benjamin harrison',
           'colts', 'pacers', 'monon trail', 'circle centre'],
  blocklist: ['indystar*', 'indianapolis star*', 'nuvo*', 'gen con*', 'indy 500*', 'lucas oil*', 'brickyard 400*'],

  blurb: ['A flat, car-bound state capital wrapped in a ring road, with a young hardcore crowd that carries the all-ages rooms in the old brick strips.',
          'Everyone drives in from the suburbs and leaves right after. Rooms open and close when the landlord sells the block, and the scene spreads thin across the neighborhoods.'],
  hard: 'Kids need rides home to the suburbs, and halls vanish when buildings sell.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Cincinnati', state: 'OH', lat: 39.1, lon: -84.51 },
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83.0 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'Young kids carry all-ages hardcore here and fill the small rooms.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Indianapolis' },
    { id: 'greenwood', kind: 'FEEDER', name: 'Greenwood', minutes: 20, bearing: 185, note: 'A south suburb with garage bands.' },
    { id: 'plainfield', kind: 'FEEDER', name: 'Plainfield', minutes: 20, bearing: 250, note: 'Truck stops and warehouses at the west edge.' },
    { id: 'carmel', kind: 'FEEDER', name: 'Carmel', minutes: 25, bearing: 340, note: 'A wealthy suburb with some pop-punk and emo kids.' },
    { id: 'greenfield', kind: 'FEEDER', name: 'Greenfield', minutes: 25, bearing: 85, note: 'An east county seat.' },
    { id: 'fishers', kind: 'FEEDER', name: 'Fishers', minutes: 30, bearing: 30, note: 'A rich suburb; kids drive in on weekends.' },
    { id: 'noblesville', kind: 'FEEDER', name: 'Noblesville', minutes: 30, bearing: 25, note: 'A fast-growing suburb.' },
    { id: 'franklin', kind: 'FEEDER', name: 'Franklin', minutes: 30, bearing: 190, note: 'A small college town to the south.' },
    { id: 'lebanon', kind: 'FEEDER', name: 'Lebanon', minutes: 35, bearing: 320, note: 'A small town up I-65 with a few kids.' },
    { id: 'bloomington', kind: 'PEER', name: 'Bloomington', minutes: 60, bearing: 210, slug: 'bloomington-in', note: 'A college town with its own house shows.' },
    { id: 'muncie', kind: 'PEER', name: 'Muncie', minutes: 60, bearing: 60, note: 'A smaller scene to the northeast.' },
    { id: 'lafayette', kind: 'PEER', name: 'Lafayette', minutes: 75, bearing: 320, slug: 'lafayette-in', note: 'A campus town with a smaller scene.' }
  ],

  hoods: [
    { id: 'fountain-square', name: 'Fountain Square', route: 'old-side', note: 'An old brick strip southeast of downtown: bars, a bowling alley, record shops. The center of all-ages punk right now.' },
    { id: 'broad-ripple', name: 'Broad Ripple', route: 'downtown', note: 'The old party strip on the canal, with a newer all-ages room in a former bar. The older bars are going.' },
    { id: 'irvington', name: 'Irvington', route: 'old-side', note: 'Old east-side houses and porches. House-show country, and the porches have opinions.' },
    { id: 'garfield-park', name: 'Garfield Park', route: 'old-side', note: 'A south-side park neighborhood with cheap houses and basements.' },
    { id: 'near-east', name: 'Near Eastside', route: 'work-side', note: 'Mixed industry and rowhouse blocks. Warehouse and gallery spaces.' },
    { id: 'mass-ave', name: 'Mass Ave', route: 'downtown', note: 'Theaters and clubs on a diagonal avenue. Pricey for kids.' },
    { id: 'haughville', name: 'Haughville and the Near Westside', route: 'work-side', note: 'Cheap old frame houses beside the rail yards and factories.' },
    { id: 'midtown', name: 'Butler-Tarkington and 34th Street', route: 'campus', note: 'North side by a private campus. A gallery space here has run hardcore matinees.' },
    { id: 'southport', name: 'Southport and Perry Township', route: 'campus', note: 'Suburban south side: garages and strip malls.' }
  ],

  contacts: ['bloomington-in', 'lafayette-in', 'cincinnati', 'chicago', 'louisville'],

  points: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 9500000 },
    { name: 'Cincinnati', state: 'OH', lat: 39.1, lon: -84.51, pop: 2250000 },
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76, pop: 1300000 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83.0, pop: 2150000 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.2, pop: 2800000 }
  ],
  roads: ['I-65', 'I-70', 'I-69', 'I-465', 'I-74'],

  words: {
    street: ['Virginia Avenue', 'Shelby Street', 'College Avenue', 'Washington Street', 'Meridian Street', '10th Street'],
    water: ['the White River', 'Fall Creek', 'the canal'],
    hood: ['Fountain Square', 'Broad Ripple', 'Irvington', 'Garfield Park', 'Haughville', 'Windsor Park', 'Southport'],
    thing: ['porch', 'ring road', 'salamander heater', 'parking lot', 'bowling alley', 'tornado siren'],
    weather: ['tornado watch', 'ice storm']
  },

  events: [
    { id: 'INDIANAPOLIS_SIREN', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [4, 5, 6] },
      telegraph: 'A tornado watch is up for the whole county this week.',
      title: 'The sirens go off mid-set',
      body: 'The tornado sirens start in the middle of the second band. Half the room is looking at their phones, and the host wants everyone in the basement now.',
      options: [
        { id: 'BASEMENT', label: 'Move everyone down to the basement and keep playing', likely: 'Cramped and loud, and nobody leaves.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'REGULARS', pct: .02 }],
          result: 'The set finished by flashlight with the whole crowd packed between the pipes.' },
        { id: 'WAIT', label: 'Stop the show and wait it out', likely: 'The night loses its energy and a lot of kids leave early.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'The sirens ran an hour. By the time they stopped, most of the kids had gone home.' },
        { id: 'MOVE', label: 'Call it and move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] }
  ]
});
