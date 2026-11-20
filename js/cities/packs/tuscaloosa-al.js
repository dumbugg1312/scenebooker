SB.Cities.register('tuscaloosa-al', {
  v: 1,
  slug: 'tuscaloosa-al',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of alabama', 'crimson tide', 'roll tide', 'bama', 'mercedes-benz', 'mercedes', 'stillman college', 'shelton state', 'university of west alabama',
           'amtrak', 'crescent', 'waffle house', 'krystal', 'iron bowl', 'bryant-denny', 'moundville archaeological', 'tuscaloosa news', 'crimson white', 'wvua',
           'alabama public radio', 'mississippi university for women', 'columbus air force base', 'auburn university', 'mississippi state', 'ole miss',
           'tuscaloosa amphitheater', 'vfw', 'american legion', 'april 27', '27 april 2011', 'super outbreak',
           'the fall line room', 'black warrior hall of records', 'druid oak carport', 'greensboro annex', 'the clay cellar', 'hargrove pole barn',
           'cottondale practice units', 'riverbend fellowship hall', 'mcfarland back lot', 'the moundside garage', 'crimson lot', 'the alberta laundry'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The tornado is written only as 'the 2011 tornado' in game text. */
  blocklist: ['crimson white*', 'tuscaloosa news*', 'waffle house*', 'wvua*', 'fall line room*', 'mercedes*'],

  blurb: ['A river college and car-plant city where football and student housing take the real estate and punk lives in the gaps.',
          'The crowd turns over every four years, and everyone dates things before the 2011 tornado or after.'],
  hard: 'Game weekends and student leases make dates and rooms scarce, and May empties the scene.',
  region: 'the Deep South',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.8 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Tuscaloosa' },
    { id: 'northport', kind: 'FEEDER', name: 'Northport', minutes: 10, bearing: 340, note: 'Across the river: an old downtown, porches and cheaper rent. Part of the same scene.' },
    { id: 'cottondale', kind: 'FEEDER', name: 'Holt, Cottondale and Brookwood', minutes: 15, bearing: 85, note: 'Rural-suburban fringe by the interstate; no scene, plenty of garages and pole barns.' },
    { id: 'vance', kind: 'FEEDER', name: 'Vance', minutes: 20, bearing: 75, note: 'A small town built around the car plant; no scene of its own.' },
    { id: 'moundville', kind: 'FEEDER', name: 'Moundville', minutes: 25, bearing: 190, note: 'A small farm and tourism town; its high school kids come for shows.' },
    { id: 'centreville', kind: 'FEEDER', name: 'Centreville and Brent', minutes: 35, bearing: 120, note: 'Small towns whose people commute to Tuscaloosa and Birmingham.' },
    { id: 'eutaw', kind: 'FEEDER', name: 'Eutaw', minutes: 40, bearing: 215, note: 'A small Black Belt county seat in farm country.' },
    { id: 'fayette', kind: 'FEEDER', name: 'Fayette', minutes: 45, bearing: 320, note: 'A small county seat with a couple of kids in a band.' },
    { id: 'reform', kind: 'FEEDER', name: 'Reform and Aliceville', minutes: 50, bearing: 285, note: 'Rural northwest Alabama farm towns along US 82.' },
    { id: 'jasper', kind: 'FEEDER', name: 'Jasper', minutes: 60, bearing: 15, note: 'A coal-country town up AL 69 with a few local bands.' },
    { id: 'columbus-ms', kind: 'FEEDER', name: 'Columbus', state: 'MS', minutes: 70, bearing: 300, note: 'A small city up US 82 in Mississippi with a base nearby; some crossover.' },
    { id: 'starkville', kind: 'PEER', name: 'Starkville', state: 'MS', minutes: 85, bearing: 305, scene: 500, note: 'A university town a quarter the size; bands trade across the state line.' },
    { id: 'meridian', kind: 'PEER', name: 'Meridian', state: 'MS', minutes: 90, bearing: 235, scene: 350, note: 'Smaller and worn down; kids drive over on I-20/59 for shows.' },
    { id: 'montgomery', kind: 'PEER', name: 'Montgomery', state: 'AL', minutes: 105, bearing: 130, slug: 'montgomery-al', note: 'A larger capital with its own circuit, down US 82.' },
    { id: 'auburn', kind: 'PEER', name: 'Auburn', state: 'AL', minutes: 140, bearing: 120, scene: 1800, note: 'The closest peer in size and students; the two towns\' DIY crowds cross more than their football crowds admit.' }
  ],

  hoods: [
    { id: 'strip', name: 'the Strip and campus edge', route: 'campus', note: 'Bars, wing places and student housing; the nightlife you compete with and where flyers get stapled.' },
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'An old brick core by the river with storefronts and upstairs rooms; heating up and getting dearer.' },
    { id: 'northport-side', name: 'Northport', route: 'old-side', note: 'Porches, yards and small houses across the river, cheaper than the Tuscaloosa side.' },
    { id: 'alberta', name: 'Alberta and East Tuscaloosa', route: 'work-side', note: 'The McFarland strip-mall belt: cheap commercial units for practice rooms, rebuilt after the tornado.' },
    { id: 'west-tuscaloosa', name: 'West Tuscaloosa', route: 'old-side', note: 'Older west-side neighborhoods with their own culture, apart from the college-punk crowd.' },
    { id: 'holt', name: 'Holt and Cottondale', route: 'work-side', note: 'Industrial and semi-rural by the interstate; warehouse units and pole barns where nobody complains.' },
    { id: 'midtown', name: 'Midtown and Hillcrest', route: 'campus', note: 'Newer subdivisions and chain stores; parents\' garages and the occasional backyard.' }
  ],

  contacts: ['montgomery-al', 'huntsville-al', 'jackson-ms', 'atlanta'],

  points: [
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.8, pop: 1100000 },
    { name: 'Meridian', state: 'MS', lat: 32.36, lon: -88.7, pop: 40000 },
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07, pop: 1000000 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 6100000 }
  ],
  roads: ['I-20/59', 'I-359', 'US 82', 'US 43', 'AL 69', 'McFarland Boulevard'],

  words: {
    street: ['McFarland Boulevard', 'University Boulevard', 'Greensboro Avenue', 'Highway 82', 'Highway 69'],
    water: ['the Black Warrior', 'the Warrior', 'Lake Tuscaloosa'],
    hood: ['Northport', 'Alberta', 'Holt', 'Cottondale', 'Hillcrest', 'Midtown', 'West Tuscaloosa'],
    thing: ['carport', 'red clay', 'kudzu', 'boiled peanuts', 'pole barn', 'sweet tea', 'student rental', 'porch show', 'game-day traffic', 'practice unit'],
    weather: ['tornado warning', 'humidity']
  }
});
