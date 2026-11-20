SB.Cities.register('montgomery-al', {
  v: 1,
  slug: 'montgomery-al',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['maxwell-gunter', 'maxwell gunter', 'maxwell air force base', 'maxwell afb', 'air university', 'hyundai', 'baptist hospital', 'jackson hospital',
           'alabama state university', 'alabama state', 'auburn university at montgomery', 'aum', 'faulkner university', 'huntingdon college', 'tuskegee university',
           'troy university', 'montgomery biscuits', 'iron bowl', 'national fair', 'legacy museum', 'rosa parks museum', 'montgomery advertiser',
           'waffle house', 'chris\' hot dogs', 'vfw', 'american legion', 'elks', 'moose lodge', 'abc board', 'union station',
           'catoma annex', 'two mile hall', 'bell street backroom', 'fairview tarp', 'day street garage', 'sayre street loft', 'coosa street warehouse',
           'lanier carport', 'pill hill parlor', 'mount meigs shop floor', 'wetumpka road bay', 'capitol heights porch'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['montgomery advertiser*', 'hyundai*', 'waffle house*', 'iron bowl*', 'montgomery biscuits*', 'catoma annex*', 'chris\' hot dogs*'],

  blurb: ['A thin scene in a sprawling capital where shows are carports, lodges and bar back rooms.',
          'Everyone drives, nobody has a basement, and a church hall will say yes if it can read the lyrics first.'],
  hard: 'Few all-ages rooms and no walkable core; every show runs on rides.',
  region: 'the Deep South',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.81 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Montgomery' },
    { id: 'pike-road', kind: 'FEEDER', name: 'Pike Road and Millbrook', minutes: 15, bearing: 70, note: 'Fast-growing affluent suburbs. Almost no scene.' },
    { id: 'prattville', kind: 'FEEDER', name: 'Prattville', minutes: 20, bearing: 330, pop: 38000, note: 'Big bedroom suburb across the river. Military families, little scene of its own.' },
    { id: 'wetumpka', kind: 'FEEDER', name: 'Wetumpka', minutes: 25, bearing: 10, pop: 7000, note: 'A small river town up US 231.' },
    { id: 'clanton', kind: 'FEEDER', name: 'Clanton', minutes: 40, bearing: 345, pop: 9000, note: 'A roadside farm town up I-65.' },
    { id: 'tuskegee', kind: 'FEEDER', name: 'Tuskegee', minutes: 40, bearing: 80, pop: 9000, note: 'A small university town on I-85, with college crossover but little punk.' },
    { id: 'greenville', kind: 'FEEDER', name: 'Greenville', minutes: 45, bearing: 205, pop: 7000, note: 'A lumber and farm county seat down I-65.' },
    { id: 'troy', kind: 'FEEDER', name: 'Troy', minutes: 50, bearing: 135, pop: 18000, note: 'A college town to the southeast with some scene.' },
    { id: 'selma', kind: 'FEEDER', name: 'Selma', minutes: 50, bearing: 280, pop: 17500, note: 'A shrinking river town out US 80. Almost no scene.' },
    { id: 'auburn', kind: 'FEEDER', name: 'Auburn and Opelika', minutes: 55, bearing: 75, note: 'A big college town with its own indie and punk crowd; kids go both ways. Opelika is the mill-town neighbor.' },
    { id: 'columbus', kind: 'PEER', name: 'Columbus', state: 'GA', minutes: 90, bearing: 85, slug: 'columbus-ga', note: 'The nearest true peer: similar size, an army town.' },
    { id: 'huntsville', kind: 'PEER', name: 'Huntsville', state: 'AL', minutes: 135, bearing: 355, slug: 'huntsville-al', note: 'A rocket and tech city up I-65. Not an easy drive for a punk show.' },
    { id: 'mobile', kind: 'PEER', name: 'Mobile', state: 'AL', minutes: 160, bearing: 205, slug: 'mobile-al', note: 'A Gulf port with a stronger music identity, down I-65.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the riverfront', route: 'downtown', note: 'Capitol hill to the river: tourists and state workers by day, quiet after dark except on ballgame nights. Old storefronts and vacant upper floors, but landlords want more than DIY can pay.' },
    { id: 'cloverdale', name: 'Cloverdale', route: 'old-side', note: 'Shaded bungalows and a small strip of bars and shops. The old bohemian pocket, now priced up, and the neighbors call the police.' },
    { id: 'midtown', name: 'Midtown, the Garden District and Capitol Heights', route: 'old-side', note: 'Prewar streets east of downtown, patchy: some blocks heating up, some boarded. Rental houses with yards and carports.' },
    { id: 'west-montgomery', name: 'West Montgomery and the Mobile Highway corridor', route: 'work-side', note: 'Largely Black working-class neighborhoods with closed storefronts and big lots. Cheap, under-resourced and not a place to treat as a punk district.' },
    { id: 'centennial-hill', name: 'Centennial Hill', route: 'campus', note: 'The historically Black university neighborhood near downtown. A rare crossover for a show, handled as a campus event and not a scene home.' },
    { id: 'east-montgomery', name: 'East Montgomery', route: 'campus', note: 'The mall, chain and subdivision belt where most kids\' parents live. Strip-mall units and church halls.' },
    { id: 'south-side', name: 'the south and southeast side', route: 'work-side', note: 'Light industry and warehouse bays along the highways, far from neighbors. Practice rooms and generator shows, with fire code the unspoken problem.' }
  ],

  contacts: ['columbus-ga', 'mobile-al', 'huntsville-al', 'tuscaloosa-al'],

  points: [
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.81, pop: 200000 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 500000 },
    { name: 'Dothan', state: 'AL', lat: 31.22, lon: -85.39, pop: 70000 },
    { name: 'Jackson', state: 'MS', lat: 32.3, lon: -90.18, pop: 150000 }
  ],
  roads: ['I-65', 'I-85', 'US 80', 'US 231', 'US 82', 'Eastern Boulevard'],

  words: {
    street: ['Dexter Avenue', 'Fairview Avenue', 'Eastern Boulevard', 'Atlanta Highway', 'Day Street', 'Mobile Highway', 'Vaughn Road'],
    water: ['the Alabama River', 'Catoma Creek'],
    hood: ['Cloverdale', 'Garden District', 'Capitol Heights', 'Centennial Hill', 'Eastdale', 'Eastchase', 'Pike Road', 'Day Street'],
    thing: ['carport', 'crawlspace', 'window unit', 'kudzu', 'fire ant mound', 'church sign', 'boiled peanuts', 'meat-and-three', 'lodge hall', 'drive-thru', 'wristband night', 'pickup truck'],
    weather: ['tornado watch', 'afternoon thunderstorm', 'heat index']
  }
});
