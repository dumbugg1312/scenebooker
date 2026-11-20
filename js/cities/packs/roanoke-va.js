SB.Cities.register('roanoke-va', {
  v: 1,
  slug: 'roanoke-va',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['virginia tech', 'vt', 'hollins university', 'hollins', 'roanoke college', 'radford university', 'virginia western', 'virginia military institute', 'vmi',
           'washington and lee', 'liberty university', 'carilion', 'roanoke star', 'mill mountain star', 'city market', 'history museum', 'grandin theatre',
           'berglund center', 'roanoke civic center', 'salem red sox', 'salem civic center', 'salem fair', 'martinsville speedway', 'd-day memorial',
           'local colors', 'strawberry festival', 'down by downtown', 'festival in the park', 'henry street heritage festival', 'go fest', 'dickens of a christmas',
           'pride in the park', 'blue ridge marathon', 'smith mountain lake', 'amtrak', 'norfolk southern', 'roanoke times', 'wvtf', 'wuvt',
           'caboose room', 'roundhouse annex', 'valley door', 'switchyard hall', 'the star loft', 'norfolk lane basement', 'mill street garage',
           'tinker creek pavilion', 'the brakeman', 'hollins road lodge', 'seven bridges hall', 'the ridge room'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['virginia tech*', 'roanoke times*', 'grandin theatre*', 'carilion*', 'liberty university*', 'blue ridge marathon*', 'berglund*', 'norfolk southern*'],

  blurb: ['A rail town in a mountain bowl under a lit star, small enough that the whole scene fits in one room.',
          'Kids drive in from every valley town, the old heads play the bar bills, and everyone knows who is booking.'],
  hard: 'Few all-ages rooms: bar bills are 21-and-over and the halls want a member to sign you in.',
  region: 'the Blue Ridge',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 },
    { name: 'Asheville', state: 'NC', lat: 35.60, lon: -82.55 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Roanoke' },
    { id: 'salem', kind: 'FEEDER', name: 'Salem', minutes: 10, bearing: 275, pop: 25000, note: 'A small college town next door with a civic center; school bands only.' },
    { id: 'vinton', kind: 'FEEDER', name: 'Vinton', minutes: 10, bearing: 95, note: 'A blue-collar town on the east edge; teenagers come in.' },
    { id: 'bedford', kind: 'FEEDER', name: 'Bedford', minutes: 40, bearing: 85, note: 'A small foothill county seat, rural and conservative.' },
    { id: 'rocky-mount', kind: 'FEEDER', name: 'Rocky Mount and Franklin County', minutes: 45, bearing: 150, note: 'Lake-weekend country; kids drive in because nothing is there.', season: { months: [5, 6, 7, 8, 9], mul: 1.3 } },
    { id: 'blacksburg', kind: 'FEEDER', name: 'Blacksburg', minutes: 45, bearing: 235, note: 'A big public university town with its own scene; the main source of college-age crowds.', bands: 4 },
    { id: 'christiansburg', kind: 'FEEDER', name: 'Christiansburg and Radford', minutes: 55, bearing: 240, note: 'A strip town and a small university town along the interstate.', bands: 1 },
    { id: 'lexington', kind: 'FEEDER', name: 'Lexington', minutes: 55, bearing: 15, note: 'Two small campuses and a small show scene to the north.', bands: 1 },
    { id: 'floyd', kind: 'FEEDER', name: 'Floyd', minutes: 50, bearing: 200, note: 'A mountain town of old-time music; folk, not punk, with a few crossover kids.' },
    { id: 'covington', kind: 'FEEDER', name: 'Covington and Clifton Forge', minutes: 65, bearing: 335, note: 'Depressed paper-mill and rail towns; a few kids drive in.' },
    { id: 'martinsville', kind: 'FEEDER', name: 'Martinsville', minutes: 75, bearing: 145, note: 'A former furniture and textile town with a few bands and a long drive.', bands: 1 },
    { id: 'wytheville', kind: 'FEEDER', name: 'Wytheville and Pulaski', minutes: 80, bearing: 235, note: 'Interstate-junction and mill towns; an occasional crowd.' },
    { id: 'lynchburg', kind: 'PEER', name: 'Lynchburg', minutes: 60, bearing: 80, slug: 'lynchburg-va', note: 'Same size; each thinks the other is more conservative.' },
    { id: 'harrisonburg', kind: 'PEER', name: 'Harrisonburg', minutes: 100, bearing: 25, slug: 'harrisonburg-va', note: 'A university town with a famously active DIY scene for its size.' },
    { id: 'charlottesville', kind: 'PEER', name: 'Charlottesville', minutes: 120, bearing: 55, slug: 'charlottesville-va', note: 'A smaller city with a nicer town and a bigger arts economy.' },
    { id: 'greensboro', kind: 'PEER', name: 'Greensboro', minutes: 130, bearing: 140, slug: 'greensboro-nc', note: 'The closest big metro outside Virginia with an active scene.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the market area', route: 'downtown', note: 'Old brick by the tracks and the market: lofts, 21-and-over bar rooms and the big civic arena.' },
    { id: 'old-southwest', name: 'Old Southwest', route: 'old-side', note: 'Big Victorian houses split into apartments, with basements and carriage houses. The best housing stock for house shows.' },
    { id: 'grandin', name: 'Grandin Village and Raleigh Court', route: 'old-side', note: 'A walkable small-business strip with bungalow streets around it; comfortable, with watchful neighbors.' },
    { id: 'wasena', name: 'Wasena', route: 'old-side', note: 'Small riverside houses and a greenway. Cheaper, with yard shows and a river identity.' },
    { id: 'southeast', name: 'Southeast Roanoke', route: 'work-side', note: 'Working-class brick streets with church halls, corner stores and empty commercial buildings. Cheap and ignored.' },
    { id: 'gainsboro', name: 'Gainsboro and Henry Street', route: 'work-side', note: 'The historic center of Black business and music, cut up by highways. Old halls and churches; treat with care.' },
    { id: 'williamson-road', name: 'the Williamson Road corridor', route: 'work-side', note: 'The old highway strip of motels, taquerias and strip-mall bays. Practice rooms and the occasional all-ages show.' },
    { id: 'salem-side', name: 'Salem and Vinton', route: 'campus', note: 'The suburban towns either side. Where the school-bus kids come from.' }
  ],

  contacts: ['lynchburg-va', 'harrisonburg-va', 'charlottesville-va', 'greensboro-nc', 'johnson-city-tn'],

  points: [
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44, pop: 1370000 },
    { name: 'Danville', state: 'VA', lat: 36.59, lon: -79.40, pop: 42000 },
    { name: 'Bristol', state: 'VA', lat: 36.60, lon: -82.19, pop: 17000 },
    { name: 'Knoxville', state: 'TN', lat: 35.96, lon: -83.92, pop: 870000 }
  ],
  roads: ['I-81', 'I-581', 'US 220', 'US 460', 'US 11', 'the Blue Ridge Parkway'],

  words: {
    street: ['Williamson Road', 'Franklin Road', 'Memorial Avenue', 'Campbell Avenue', 'Main Street'],
    water: ['the Roanoke River', 'Tinker Creek', 'Carvins Cove', 'Back Creek'],
    hood: ['Old Southwest', 'Grandin', 'Raleigh Court', 'Wasena', 'Gainsboro', 'Southeast', 'Vinton', 'Salem'],
    thing: ['railyard', 'Victorian porch', 'bluegrass jam', 'mountain overlook', 'Foursquare', 'caboose', 'fellowship hall', 'brewery patio', 'stone basement'],
    weather: ['mountain fog', 'hurricane remnant', 'summer thunderstorm']
  }
});
