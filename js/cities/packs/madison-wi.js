SB.Cities.register('madison-wi', {
  v: 1,
  slug: 'madison-wi',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of wisconsin', 'university of wisconsin-madison', 'uw-madison', 'uw madison', 'uw health', 'uw-whitewater', 'uw-platteville', 'badgers', 'camp randall',
           'mifflin street block party', 'mifflin', 'mifflin street', 'freakfest', 'great taste of the midwest', 'great taste', 'ironman wisconsin', 'dane county farmers\' market',
           'brat fest', 'orton park festival', 'epic systems', 'capital times', 'wisconsin state journal', 'state journal', 'daily cardinal', 'badger herald',
           'wort', 'wsum', 'packers', 'green bay packers', 'culver\'s', 'spotted cow', 'sconnie', 'madison area technical college', 'edgewood college',
           'the lakeside annex', 'fourth lake hall', 'the yahara cellar', 'bascom basement club', 'the dane street lodge', 'cold frame room', 'the odana pavilion',
           'the square annex loft', 'the greenbush hall', 'the cheddar room', 'the sauk road rec room', 'wingra back porch'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['freakfest*', 'camp randall*', 'great taste*', 'daily cardinal*'],

  blurb: ['Wisconsin\'s capital on an isthmus between two lakes: a bike-and-co-op college town where weird local art counts as a civic good.',
          'Students fill the basements from October to April, then vanish with the leases in May. Rents climb, but the weird-art tradition holds.'],
  hard: 'Under-21 law and the May exodus: all-ages rooms and a summer crowd are scarce.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Milwaukee', state: 'WI', lat: 43.04, lon: -87.91 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Madison' },
    { id: 'sun-prairie', kind: 'FEEDER', name: 'Sun Prairie', minutes: 20, bearing: 60, scene: 50, note: 'A fast-growing suburb to the northeast. Its kids come into town for everything.' },
    { id: 'stoughton', kind: 'FEEDER', name: 'Stoughton', minutes: 25, bearing: 130, note: 'A Norwegian-heritage town to the southeast with a small DIY tradition at best.' },
    { id: 'mount-horeb', kind: 'FEEDER', name: 'Mount Horeb', minutes: 30, bearing: 255, note: 'The first hill town of the Driftless country to the west. Kids drive in for shows.' },
    { id: 'fort-atkinson', kind: 'FEEDER', name: 'Fort Atkinson', minutes: 40, bearing: 105, note: 'A dairy and small-factory town in the shadow of the capital.' },
    { id: 'janesville', kind: 'FEEDER', name: 'Janesville', minutes: 40, bearing: 160, scene: 55, note: 'A working-class town that lost its car plant, with a scene of its own.' },
    { id: 'watertown', kind: 'FEEDER', name: 'Watertown', minutes: 45, bearing: 85, note: 'A German-heritage factory town with high-school bands and some house shows.' },
    { id: 'whitewater', kind: 'FEEDER', name: 'Whitewater', minutes: 45, bearing: 115, scene: 50, note: 'A state-college town with its own student scene, the most self-contained of the ring.' },
    { id: 'portage', kind: 'FEEDER', name: 'Portage', minutes: 45, bearing: 5, note: 'A small river and farm town where the kids come south.' },
    { id: 'beloit', kind: 'FEEDER', name: 'Beloit', minutes: 50, bearing: 175, note: 'A border mill town with a small private college and bands of its own.' },
    { id: 'baraboo', kind: 'FEEDER', name: 'Baraboo', minutes: 60, bearing: 345, note: 'A seasonal tourist town up US 12 near the bluffs.' },
    { id: 'rockford', kind: 'PEER', name: 'Rockford', state: 'IL', minutes: 70, bearing: 180, slug: 'rockford-il', note: 'A bigger working-class neighbor down the interstate: more cousin than rival.' },
    { id: 'green-bay', kind: 'PEER', name: 'Green Bay', state: 'WI', minutes: 135, bearing: 55, slug: 'green-bay-wi', note: 'Football-obsessed and a long way off. Madison people see it as another planet.' },
    { id: 'iowa-city', kind: 'PEER', name: 'Iowa City', state: 'IA', minutes: 165, bearing: 225, slug: 'iowa-city-ia', note: 'Another university town, an obvious partner on the Midwest loop.' },
    { id: 'eau-claire', kind: 'PEER', name: 'Eau Claire', state: 'WI', minutes: 165, bearing: 310, slug: 'eau-claire-wi', note: 'A small city with a big reputation for serious music. The two see each other as the state\'s music towns.' }
  ],

  hoods: [
    { id: 'downtown', name: 'the Square and State Street', route: 'downtown', note: 'Licensed bars, theaters and clubs around the capitol. The door-deal rooms, heavily policed and priced out of DIY.' },
    { id: 'willy-street', name: 'Willy Street and Marquette', route: 'old-side', note: 'Co-ops, bike shops and old houses with basements. The historic heart of house shows, now expensive, with homeowner neighbors.' },
    { id: 'tenney-lapham', name: 'Tenney-Lapham', route: 'old-side', note: 'Old frame houses between the lake and the river. Shared rentals and quiet-ish basements.' },
    { id: 'atwood', name: 'Atwood and Schenk', route: 'work-side', note: 'Bungalows and small shops on the east side, the weird-but-friendly arts crowd, getting family-priced.' },
    { id: 'near-west', name: 'the near west side by the stadium', route: 'campus', note: 'Student rentals and older houses. Gameday parking and the spring street party dominate here.' },
    { id: 'east-washington', name: 'East Washington and the north side', route: 'work-side', note: 'Warehouses and light industry being replaced by apartments. Practice spaces until the owner notices.' },
    { id: 'south-side', name: 'Park Street and the south side', route: 'work-side', note: 'Working-class and immigrant neighborhoods, strip malls and cheaper apartments. Cheap space and tolerant landlords, little scene.' },
    { id: 'west-side', name: 'the west side and the Beltline', route: 'campus', note: 'Shopping malls and subdivisions with big basements, home of the all-ages audience\'s parents.' },
    { id: 'sun-prairie-hood', name: 'Sun Prairie', route: 'town:sun-prairie', note: 'Newer subdivisions and a lot of garages.' }
  ],

  contacts: ['rockford-il', 'iowa-city-ia', 'eau-claire-wi', 'green-bay-wi'],

  points: [
    { name: 'Milwaukee', state: 'WI', lat: 43.04, lon: -87.91, pop: 1570000 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 9500000 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27, pop: 3700000 },
    { name: 'La Crosse', state: 'WI', lat: 43.8, lon: -91.24, pop: 52000 }
  ],
  roads: ['I-90', 'I-94', 'I-39', 'US 151', 'US 12', 'the Beltline'],

  words: {
    street: ['State Street', 'Willy Street', 'Atwood Avenue', 'Park Street', 'Monroe Street', 'East Washington Avenue', 'the Beltline'],
    water: ['Lake Mendota', 'Lake Monona', 'Lake Wingra', 'the Yahara'],
    hood: ['Marquette', 'Tenney-Lapham', 'Schenk-Atwood', 'Greenbush', 'Vilas', 'Bay Creek', 'Allied Drive', 'Hilldale', 'Middleton', 'Verona', 'Fitchburg'],
    thing: ['fish fry', 'cheese curd', 'brat', 'old fashioned', 'studded tire', 'co-op', 'bubbler', 'frozen custard'],
    weather: ['deep freeze', 'lake-effect snow', 'muddy thaw']
  }
});
