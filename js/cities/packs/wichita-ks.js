SB.Cities.register('wichita-ks', {
  v: 1,
  slug: 'wichita-ks',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['wichita state university', 'wichita state', 'friends university', 'newman university', 'bethel college', 'kansas wesleyan', 'emporia state',
           'university of kansas', 'kansas state', 'k-state', 'mcconnell air force base', 'mcconnell afb', 'mcconnell', 'textron', 'cessna', 'beechcraft',
           'learjet', 'koch industries', 'boeing', 'pizza hut', 'spangles', 'freddy\'s', 'quiktrip', 'kwik shop', 'waffle house', 'wichita eagle',
           'the sunflower', 'splurge', 'river festival', 'tallgrass film festival', 'walnut valley festival', 'national baseball congress', 'kansas state fair',
           'amtrak', 'greyhound', 'vfw', 'american legion', 'doo dah', 'black arts festival',
           'the ninth street annex', 'ninth street annex', 'hydraulic hall', 'wheatline garage', 'the salt cellar', 'fairmount porch',
           'the keeper\'s basement', 'north market backroom', 'chisholm annex', 'planeview carport', 'the lineman\'s hall',
           'oakdale roller rink back room', 'the little river room'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['wichita state*', 'wichita eagle*', 'textron*', 'pizza hut*', 'spangles*', 'river festival*', 'hydraulic hall*'],

  blurb: ['The Air Capital of the World on the flat Kansas plain, an aircraft-plant and meatpacking city of long arterials, ranch houses and cheap rent.',
          'Shows hide in garages and church halls, you park on a lawn, and the storm decides the night.'],
  hard: 'Bands skip the stop; rooms are spread out and need a car.',
  region: 'the Plains',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Kansas City', state: 'MO', lat: 39.10, lon: -94.58 },
    { name: 'Oklahoma City', state: 'OK', lat: 35.47, lon: -97.52 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.80 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Wichita' },
    { id: 'derby', kind: 'FEEDER', name: 'Derby', minutes: 20, bearing: 160, pop: 25000, note: 'A big suburb by the base; a few bands, but most kids come into town.' },
    { id: 'andover', kind: 'FEEDER', name: 'Andover and Augusta', minutes: 25, bearing: 65, note: 'Bedroom suburbs and a small oil-and-aircraft town, sports-driven.' },
    { id: 'newton', kind: 'FEEDER', name: 'Newton', minutes: 30, bearing: 10, pop: 19000, note: 'A railroad and Mennonite-heritage town up I-135 with a small music scene.' },
    { id: 'el-dorado', kind: 'FEEDER', name: 'El Dorado', minutes: 35, bearing: 80, pop: 13000, note: 'An oil town with a reservoir and a community college.' },
    { id: 'winfield', kind: 'FEEDER', name: 'Winfield', minutes: 45, bearing: 175, pop: 11777, note: 'A small college town. The bluegrass festival weekend in September is a bad one for punk.' },
    { id: 'hutchinson', kind: 'FEEDER', name: 'Hutchinson', minutes: 50, bearing: 330, pop: 40006, note: 'The salt town, with its own music community and a community college.' },
    { id: 'arkansas-city', kind: 'FEEDER', name: 'Arkansas City', minutes: 50, bearing: 185, pop: 12000, note: 'A working-class town by the Oklahoma line; kids drive in.' },
    { id: 'mcpherson', kind: 'FEEDER', name: 'McPherson', minutes: 60, bearing: 355, pop: 14000, note: 'A refinery town with a small college and little scene.' },
    { id: 'salina', kind: 'FEEDER', name: 'Salina', minutes: 75, bearing: 350, pop: 46000, note: 'A small scene of its own, and a midpoint for tours toward Denver.' },
    { id: 'emporia', kind: 'FEEDER', name: 'Emporia', minutes: 80, bearing: 50, pop: 24139, note: 'A real college town on the edge of the Flint Hills, with a counterpart scene.' },
    { id: 'topeka', kind: 'PEER', name: 'Topeka', minutes: 120, bearing: 55, scene: 800, note: 'A state capital that is more government than music; the two cities mostly ignore each other.' },
    { id: 'lawrence', kind: 'PEER', name: 'Lawrence', minutes: 150, bearing: 60, slug: 'lawrence-ks', note: 'The state\'s best-known college and music town. Wichita bands look up to it.' },
    { id: 'tulsa', kind: 'PEER', name: 'Tulsa', state: 'OK', minutes: 165, bearing: 120, scene: 2500, note: 'A natural destination for bands and kids who outgrow Wichita.' }
  ],

  hoods: [
    { id: 'old-town', name: 'Old Town and downtown', route: 'downtown', note: 'A rebuilt warehouse district of bars, lofts and a ballpark. Everything is priced and licensed, so it is poor ground for DIY.' },
    { id: 'delano', name: 'Delano', route: 'downtown', note: 'The west-bank strip across the river: small bars and shops with older houses behind. Heating up, with house shows in the blocks behind.' },
    { id: 'college-hill', name: 'College Hill', route: 'old-side', note: 'Leafy older brick houses with basements and porches east of downtown, favored by students and creatives. Slowly gentrifying.' },
    { id: 'fairmount', name: 'Fairmount and the campus side', route: 'campus', note: 'Student rentals, old foursquare houses and apartment blocks in the northeast around the university.' },
    { id: 'riverside', name: 'Riverside and Midtown', route: 'old-side', note: 'Older houses with yards north of downtown on both banks. Cheap in parts, nicer near the park.' },
    { id: 'planeview', name: 'Planeview and the southeast', route: 'work-side', note: 'Post-war aircraft-worker housing of ranch houses with carports and detached garages. Cheap and ignored.' },
    { id: 'north-industrial', name: 'the north and south industrial edges', route: 'work-side', note: 'Cheap warehouse and light-industrial units used for practice rooms and the odd unpermitted event.' },
    { id: 'west-kellogg', name: 'the west side and the Kellogg strip', route: 'campus', note: 'Newer subdivisions and strip malls where the money is and basements are rarest.' }
  ],

  contacts: ['lawrence-ks'],

  points: [
    { name: 'Kansas City', state: 'MO', lat: 39.10, lon: -94.58, pop: 510000 },
    { name: 'Oklahoma City', state: 'OK', lat: 35.47, lon: -97.52, pop: 700000 },
    { name: 'Tulsa', state: 'OK', lat: 36.15, lon: -95.99, pop: 410000 },
    { name: 'Topeka', state: 'KS', lat: 39.05, lon: -95.68, pop: 125000 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99, pop: 715000 }
  ],
  roads: ['I-35', 'I-135', 'I-235', 'Kellogg', 'US 81', 'K-96'],

  words: {
    street: ['Kellogg', 'Douglas Avenue', 'Broadway', 'Hillside', 'Oliver', 'Rock Road', 'Seneca', 'Woodlawn'],
    water: ['the Arkansas River', 'the Little Arkansas'],
    hood: ['Delano', 'Old Town', 'College Hill', 'Fairmount', 'Riverside', 'Planeview', 'Hydraulic', 'Oaklawn'],
    thing: ['carport', 'pop', 'bierock', 'storm siren', 'shift change', 'wheat field', 'turnpike', 'loose-meat sandwich', 'church hall', 'lawn parking', 'custard'],
    weather: ['tornado warning', 'hail', 'ice storm', 'wind', 'pollen']
  }
});
