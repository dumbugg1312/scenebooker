SB.Cities.register('cedar-rapids-ia', {
  v: 1,
  slug: 'cedar-rapids-ia',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['quaker oats', 'collins aerospace', 'aegon', 'crst', 'pepsico', 'pepsi', 'kirkwood', 'kirkwood community college', 'coe college',
           'mount mercy', 'mount mercy university', 'cornell college', 'university of iowa', 'hawkeyes', 'hawkeye', 'iowa state', 'cyclones',
           'university of northern iowa', 'the gazette', 'cedar rapids gazette', 'kgan', 'kcrg', 'kfxa', 'iheart', 'iheartmedia', 'townsquare',
           'cedar rapids kernels', 'kernels', 'roughriders', 'fifth season races', 'city of five seasons', 'five seasons', 'city of five smells',
           'five smells', 'alliant energy', 'unitypoint', 'john deere', 'deere', 'meskwaki', 'maid-rite', 'maid rite', 'cedar rapids transit',
           '380 express', 'vfw', 'american legion', 'legion post', 'czech and slovak museum', 'national czech', 'the derecho',
           'the fifth season annex', 'fifth season annex', 'bohemian hall back room', 'the mill smell', 'third street carport',
           'st. wenceslas fellowship hall', 'wenceslas', 'the skywalk level', 'collins road unit 14', 'cedar bend basement', 'the derecho room',
           'linn county legion post 0', 'five smells records'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['quaker oats*', 'five seasons*', 'five smells*', 'fifth season*', 'roughriders*', 'wenceslas*'],

  blurb: ['A small DIY room that keeps moving and a loud, loyal metal crowd, with Iowa City twenty miles down the interstate.',
          'Door takes are small, the promoter knows everybody, and the summer metal fest is the one weekend the whole scene shows up.'],
  hard: 'Small crowds and a room that keeps moving make routing risky, and the cool neighbor is twenty miles south.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Iowa City', state: 'IA', lat: 41.66, lon: -91.53 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 },
    { name: 'Des Moines', state: 'IA', lat: 41.59, lon: -93.62 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Cedar Rapids' },
    { id: 'marion', kind: 'FEEDER', name: 'Marion and Hiawatha', minutes: 10, bearing: 40, note: 'Growing suburbs just northeast along the interstate; no scene of their own, but parents and kids.' },
    { id: 'mount-vernon', kind: 'FEEDER', name: 'Mount Vernon and Lisbon', minutes: 20, bearing: 95, note: 'A small college town on US 30 with a little house-show and radio crowd.', bands: 1 },
    { id: 'center-point', kind: 'FEEDER', name: 'Center Point, Urbana and Brandon', minutes: 25, bearing: 330, note: 'Farm and commuter towns up the interstate; kids come in by car.' },
    { id: 'iowa-city', kind: 'FEEDER', name: 'Iowa City and Coralville', minutes: 30, bearing: 190, note: 'The bigger, cooler sibling: it takes the all-ages crowd and the first Iowa date.', bands: 4 },
    { id: 'vinton', kind: 'FEEDER', name: 'Vinton', minutes: 35, bearing: 305, note: 'A county-seat farm town up US 218.' },
    { id: 'anamosa', kind: 'FEEDER', name: 'Anamosa', minutes: 35, bearing: 70, note: 'A small town east on US 151, known for its prison.' },
    { id: 'tipton', kind: 'FEEDER', name: 'Tipton', minutes: 40, bearing: 120, note: 'A farm town southeast toward the Quad Cities.' },
    { id: 'monticello', kind: 'FEEDER', name: 'Monticello', minutes: 45, bearing: 55, note: 'A small town northeast on US 151.' },
    { id: 'belle-plaine', kind: 'FEEDER', name: 'Belle Plaine and Marengo', minutes: 45, bearing: 245, note: 'Farm towns west along US 30.' },
    { id: 'waterloo', kind: 'PEER', name: 'Waterloo and Cedar Falls', minutes: 65, bearing: 340, scene: 1100, note: 'A factory town and its college twin, up the interstate; Cedar Falls has an old underground scene.' },
    { id: 'dubuque', kind: 'PEER', name: 'Dubuque', minutes: 85, bearing: 55, scene: 700, note: 'A hilly Mississippi river town up US 151.' },
    { id: 'quad-cities', kind: 'PEER', name: 'the Quad Cities', minutes: 90, bearing: 105, slug: 'davenport-ia', note: 'The river cities east: they trade bands with this town.' },
    { id: 'des-moines', kind: 'PEER', name: 'Des Moines', minutes: 130, bearing: 260, slug: 'des-moines-ia', note: 'The state capital, a real trade partner on the road west.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Second Avenue', route: 'downtown', note: 'Bars with stages on the island and along the river, skywalks above; quiet and office-heavy at night.' },
    { id: 'czech-village', name: 'Czech Village', route: 'old-side', note: 'A flooded-and-rebuilt heritage strip of bakeries and storefronts along 16th Avenue SW; tourism-leaning.' },
    { id: 'newbo', name: 'NewBo', route: 'downtown', note: 'Old brick industrial blocks turned to market, breweries and lofts; the heating-up part of town and the opposite of cheap.' },
    { id: 'kingston', name: 'Kingston and the west bank', route: 'old-side', note: 'Older small houses near the river, annexed long ago, still recovering from the flood.' },
    { id: 'wellington-heights', name: 'Wellington Heights and Oakhill Jackson', route: 'work-side', note: 'Cheap old working-class streets close to downtown: porches, backyards and corner storefronts.' },
    { id: 'moundview', name: 'Moundview and Kenwood Park', route: 'work-side', note: 'Steady postwar housing in the northeast: basements, garages and strip-road pizza rooms.' },
    { id: 'collins-road', name: 'the Collins Road strip', route: 'campus', note: 'Office campuses and big-box retail at the interstate, with empty strip-mall units that make practice rooms.' },
    { id: 'college-hill', name: 'the college blocks', route: 'campus', note: 'A small urban campus and its rentals; a thin student crowd.' }
  ],

  contacts: ['iowa-city-ia', 'davenport-ia', 'des-moines-ia'],

  points: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 9400000 },
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93, pop: 970000 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27, pop: 3700000 },
    { name: 'Waterloo', state: 'IA', lat: 42.49, lon: -92.34, pop: 67000 },
    { name: 'Dubuque', state: 'IA', lat: 42.5, lon: -90.66, pop: 60000 }
  ],
  roads: ['I-380', 'I-80', 'US 30', 'US 151', 'US 218', 'Iowa 100'],

  words: {
    street: ['First Avenue', 'Second Avenue', 'Collins Road', '16th Avenue SW', 'Seventh Avenue', 'Mays Island'],
    water: ['the Cedar River', 'the Cedar'],
    hood: ['Czech Village', 'NewBo', 'New Bohemia', 'Kingston', 'Wellington Heights', 'Oakhill Jackson', 'Moundview', 'Noelridge', 'Kenwood Park', 'Mays Island', 'Marion'],
    thing: ['skywalk', 'sandbag', 'kolache', 'tenderloin', 'grain elevator', 'sump pump', 'tornado siren', 'donation jar', 'raffle', 'hall rental', 'metal fest'],
    weather: ['river crest', 'windstorm']
  }
});
