SB.Cities.register('fayetteville-ar', {
  v: 1,
  slug: 'fayetteville-ar',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of arkansas', 'razorback', 'razorbacks', 'razorback stadium', 'razorback baseball', 'woo pig sooie', 'calling the hogs',
           'the hogs', 'walmart', 'tyson', 'j.b. hunt', 'jb hunt', 'bikes, blues and bbq', 'bikes blues and bbq', 'arkansas democrat-gazette',
           'democrat-gazette', 'fayetteville flyer', 'arkansas traveler', 'northeastern state university', 'cherokee nation', 'fort chaffee',
           'crystal bridges', 'razorback greenway', 'arkansas abc', 'american legion', 'vfw', 'the dogtrot', 'low water crossing', 'persimmon hall',
           'the cistern', 'frisco grain', 'boston mountain social club', 'dewberry annex', 'sassafras hall', 'lot 49', 'the hickory room',
           'pocket knife hall'],
  /* The dossier's twelve invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['razorback*', 'bikes blues*', 'walmart*', 'democrat-gazette*', 'fayetteville flyer*', 'arkansas traveler*'],

  blurb: ['A hill town that lost its main DIY room, so shows move from a veterans hall to a hilltop to a bar back room. Hardcore, doom and emo share bills for kids in a scene that is rebuilding.',
          'A few small crews book under different names. Many nights are free or by donation, and often all ages.'],
  hard: 'No steady room; booking means piecing together borrowed halls and 21+ bars.',
  region: 'the Ozarks',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Little Rock', state: 'AR', lat: 34.75, lon: -92.29 },
    { name: 'Tulsa', state: 'OK', lat: 36.15, lon: -95.99 },
    { name: 'Kansas City', state: 'MO', lat: 39.10, lon: -94.58 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'metal', d: .07, reason: 'Hardcore and sludge share bills and crowds here.' },
    { fan: 'emo', band: 'hardcore', d: .06, reason: 'Emo and hardcore bands play the same all-ages bills.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Fayetteville' },
    { id: 'farmington', kind: 'FEEDER', name: 'Farmington', minutes: 10, bearing: 255, note: 'A fast-growing bedroom suburb; its high-school kids call Fayetteville town.' },
    { id: 'elkins', kind: 'FEEDER', name: 'Elkins', minutes: 15, bearing: 100, note: 'Tiny and rural; a few kids with cars.' },
    { id: 'prairie-grove', kind: 'FEEDER', name: 'Prairie Grove', minutes: 20, bearing: 235, note: 'A small farm town; teens drive in on US 62.' },
    { id: 'south-hills', kind: 'FEEDER', name: 'Greenland, Lincoln and West Fork', minutes: 20, bearing: 195, note: 'Small hill-country towns where a cousin drives you.' },
    { id: 'springdale', kind: 'FEEDER', name: 'Springdale', minutes: 20, bearing: 5, scene: 150, note: 'A big poultry-industry town with a large young population and its own church and community scenes.' },
    { id: 'rogers', kind: 'FEEDER', name: 'Rogers', minutes: 30, bearing: 10, note: 'A retail suburb; kids come south to Fayetteville.' },
    { id: 'bentonville', kind: 'FEEDER', name: 'Bentonville', minutes: 35, bearing: 15, note: 'Corporate money and a polite funded music culture; the punk kids drive south.' },
    { id: 'huntsville', kind: 'FEEDER', name: 'Huntsville', minutes: 40, bearing: 95, note: 'A rural county seat on US 412; the odd kid drives in.' },
    { id: 'siloam-springs', kind: 'FEEDER', name: 'Siloam Springs', state: 'AR', minutes: 40, bearing: 295, note: 'A small college town at the Oklahoma line; kids cross over for shows.' },
    { id: 'eureka-springs', kind: 'FEEDER', name: 'Eureka Springs', minutes: 60, bearing: 80, note: 'A tourist and arts town with a weird, welcoming crowd and high rents.', season: { months: [5, 6, 7, 8, 9, 10], mul: 1.3 } },
    { id: 'fort-smith', kind: 'PEER', name: 'Fort Smith', minutes: 60, bearing: 175, scene: 500, note: 'A rougher, cheaper river and rail town with a scrappier metal and hardcore crowd.' },
    { id: 'joplin', kind: 'PEER', name: 'Joplin', state: 'MO', minutes: 90, bearing: 40, scene: 250, note: 'A smaller blue-collar town; a pass-through on tours.' },
    { id: 'tulsa', kind: 'PEER', name: 'Tulsa', slug: 'tulsa', state: 'OK', minutes: 120, bearing: 285, scene: 1200, note: 'The nearest big music town; touring bands pick it and skip you.' },
    { id: 'springfield', kind: 'PEER', name: 'Springfield', state: 'MO', minutes: 150, bearing: 55, slug: 'springfield-mo', note: 'The other Ozarks college city, with a deep punk and hardcore tradition.' }
  ],

  hoods: [
    { id: 'dickson', name: 'Dickson and the campus edge', route: 'downtown', note: 'The big bar strip below the campus ridge: 21 and over, student housing and game-day crowds.' },
    { id: 'square', name: 'the Square', route: 'downtown', note: 'Old brick storefronts around the courthouse, now bars, coffee and galleries; the priciest rents a punk can still bike to.' },
    { id: 'wilson-park', name: 'Wilson Park and Mount Nord', route: 'old-side', note: 'Old bungalows cut into student rentals; the classic house-show streets, and the neighbors who complain.' },
    { id: 'walker-park', name: 'Walker Park and the south side', route: 'work-side', note: 'Warehouses, duplexes and practice spaces by the old rail line; cheap, and turning into the next place to cost more.' },
    { id: 'mission', name: 'Mission Boulevard and the strip malls', route: 'work-side', note: 'Aging strip malls, motels and light industry; landlords who do not ask questions.' },
    { id: 'north-college', name: 'North College Avenue', route: 'old-side', note: 'Old shopping centers and cheap shop units north of the Square, slowly giving way to apartments.' },
    { id: 'wedington', name: 'Wedington Drive and west Fayetteville', route: 'campus', note: 'Subdivisions, big-box stores and new apartments; all-ages kids but no culture of local rooms.' },
    { id: 'sequoyah', name: 'Mount Sequoyah', route: 'campus', note: 'A steep, expensive hillside of professors and retirees; a skyline landmark, not a venue district.' }
  ],

  contacts: ['springfield-mo', 'little-rock-ar'],

  points: [
    { name: 'Fort Smith', state: 'AR', lat: 35.39, lon: -94.40, pop: 89000 },
    { name: 'Joplin', state: 'MO', lat: 37.08, lon: -94.51, pop: 51000 },
    { name: 'Tulsa', state: 'OK', lat: 36.15, lon: -95.99, pop: 413000 },
    { name: 'Memphis', state: 'TN', lat: 35.15, lon: -90.05, pop: 630000 }
  ],
  roads: ['I-49', 'US 71', 'US 62', 'US 412', 'Highway 16'],

  words: {
    street: ['Dickson', 'College Avenue', 'Mission Boulevard', 'Wedington Drive', 'School Avenue', 'Highway 16'],
    water: ['Lake Fayetteville', 'the White River', 'Lake Wedington'],
    hood: ['Wilson Park', 'Mount Nord', 'Walker Park', 'Mount Sequoyah', 'the Square'],
    thing: ['cheese dip', 'daylight basement', 'steep driveway', 'poultry truck', 'feed store', 'sweet tea', 'veterans hall', 'toy drive', 'hilltop', 'trail'],
    weather: ['ice storm', 'tornado watch']
  }
});
