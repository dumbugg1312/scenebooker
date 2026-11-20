SB.Cities.register('trenton-nj', {
  v: 1,
  slug: 'trenton-nj',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['nj transit', 'njt', 'septa', 'amtrak', 'wawa', 'quickchek', 'rutgers', 'princeton university', 'rider university', 'the college of new jersey',
           'mercer county community college', 'the trentonian', 'trentonian', 'trenton times', 'times of trenton', 'roebling', 'roebling works', 'trenton makes',
           'joint base mcguire-dix-lakehurst', 'mcguire', 'fort dix', 'ghost ship', 'river line', 'taylor ham', 'vfw', 'american legion', 'washington crossing',
           'crossing the delaware', 'guatemalan independence', 'assunpink annex', 'wire rope hall', 'feeder canal social club', 'sixth ward hall',
           'pottery row basement', 'the hard roll room', 'lamberton hall', 'the burg bocce club', 'switchyard lanes', 'the kaiser crust', 'hiltonia carport',
           'delaware rubber works'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['trentonian*', 'trenton times*', 'wawa*', 'quickchek*', 'wire rope hall*', 'lamberton hall*', 'rutgers*', 'septa*'],

  blurb: ["New Jersey's capital on the Delaware: rowhouse basements, a downtown that empties at five, and suburbs that make more bands than the city.",
          'A midpoint between two huge scenes, so bands pass through and the ambitious ones leave.'],
  hard: 'Midpoint stop; bands skip it for the big cities either side.',
  region: 'the Northeast Corridor',
  houseType: 'ROWHOUSE',
  whereGo: [
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Trenton' },
    { id: 'hamilton', kind: 'FEEDER', name: 'Hamilton', minutes: 10, bearing: 140, note: 'A huge ranch-house suburb next door; most of the kids and bands come from here.' },
    { id: 'ewing', kind: 'FEEDER', name: 'Ewing and Lawrence', minutes: 10, bearing: 330, note: 'Suburbs with a state college and a private university; basements and student crowds.' },
    { id: 'bordentown', kind: 'FEEDER', name: 'Bordentown', minutes: 15, bearing: 160, note: 'A small old river town down US 130 with a little scene.' },
    { id: 'levittown', kind: 'FEEDER', name: 'Yardley, Morrisville and Levittown', state: 'PA', minutes: 20, bearing: 215, note: 'Pennsylvania suburbs across the river; big overlap with Trenton crowds.' },
    { id: 'pennington', kind: 'FEEDER', name: 'Pennington and Hopewell', minutes: 20, bearing: 340, note: 'Wealthy small towns of bored private-school and rural kids.' },
    { id: 'hightstown', kind: 'FEEDER', name: 'Hightstown and East Windsor', minutes: 25, bearing: 80, note: 'A small borough and its suburb to the east.' },
    { id: 'lambertville', kind: 'FEEDER', name: 'Lambertville and New Hope', minutes: 25, bearing: 320, note: 'A tiny arts-and-antiques river town pair.' },
    { id: 'mount-holly', kind: 'FEEDER', name: 'Mount Holly and Burlington', minutes: 30, bearing: 185, note: 'Small county-seat and river towns to the south.' },
    { id: 'wrightstown', kind: 'FEEDER', name: 'Wrightstown and Pemberton', minutes: 30, bearing: 125, note: 'Base towns: young enlisted people with weekends.' },
    { id: 'freehold', kind: 'FEEDER', name: 'Freehold', minutes: 35, bearing: 100, note: 'A big suburban and horse-farm county seat toward the shore.' },
    { id: 'flemington', kind: 'FEEDER', name: 'Flemington', minutes: 40, bearing: 350, note: 'A small county seat in farm country.' },
    { id: 'toms-river', kind: 'FEEDER', name: 'Toms River and Brick', minutes: 50, bearing: 120, note: 'A large shore suburb with strong bands; kids drive inland for shows.' },
    { id: 'camden', kind: 'PEER', name: 'Camden', minutes: 45, bearing: 210, scene: 600, note: 'A poor city in Philadelphia\'s shadow; the two towns share some crowds.' },
    { id: 'new-brunswick', kind: 'PEER', name: 'New Brunswick', minutes: 45, bearing: 45, scene: 1500, note: 'A big university town with a long basement tradition; Trenton kids go there more than the reverse.' },
    { id: 'wilmington-de', kind: 'PEER', name: 'Wilmington', state: 'DE', minutes: 70, bearing: 225, scene: 700, note: 'A smaller post-industrial city down I-95.' },
    { id: 'allentown', kind: 'PEER', name: 'Allentown', state: 'PA', minutes: 75, bearing: 335, slug: 'allentown-pa', note: 'A post-industrial peer up I-78 with its own scene.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Mill Hill', route: 'downtown', note: 'Government offices and old brick rowhouses by the creek; dead after work hours.' },
    { id: 'chambersburg', name: 'Chambersburg', route: 'old-side', note: 'Rowhouses, social clubs and parish halls; once Italian, now heavily Latino. Church halls and basements.' },
    { id: 'north-trenton', name: 'North Trenton and Five Points', route: 'work-side', note: 'Mixed rowhouses and small commercial space toward Route 1; cheap and mostly ignored.' },
    { id: 'east-trenton', name: 'East Trenton', route: 'work-side', note: 'Working-class blocks with many vacant houses and empty buildings; hard on out-of-town kids.' },
    { id: 'west-trenton', name: 'West Trenton and Cadwalader Heights', route: 'old-side', note: 'The quiet, leafy side with big old houses, porches and a park.' },
    { id: 'hiltonia', name: 'Hiltonia and Villa Park', route: 'old-side', note: 'Twins and single houses along the township line; yards, garages and basements.' },
    { id: 'riverfront', name: 'the riverfront and station', route: 'downtown', note: 'Ballpark, arena and trains: a pass-through place where game days snarl parking.' },
    { id: 'hamilton-side', name: 'Hamilton and Ewing, over the line', route: 'campus', note: 'Finished basements, two-car garages and the college side of the suburbs.' }
  ],

  contacts: ['philadelphia', 'new-york', 'allentown-pa', 'reading-pa'],

  points: [
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17, pop: 6200000 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01, pop: 20000000 },
    { name: 'Asbury Park', state: 'NJ', lat: 40.22, lon: -74.01, pop: 15000 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61, pop: 2800000 }
  ],
  roads: ['I-95', 'I-295', 'US 1', 'Route 29', 'Route 33', 'NJ Turnpike'],

  words: {
    street: ['Route 29', 'Route 33', 'Route 130', 'Calhoun Street', 'Hamilton Avenue', 'Broad Street'],
    water: ['the Delaware', 'the Assunpink', 'the Delaware and Raritan Canal'],
    hood: ['Chambersburg', 'Mill Hill', 'Cadwalader Heights', 'Hiltonia', 'Villa Park', 'Five Points', 'Hamilton', 'Ewing'],
    thing: ['tomato pie', 'pork roll', 'jughandle', 'row house', 'twin', 'social club', 'hoagie', 'sub', 'social-club hall', 'toll bridge', 'flooded basement', 'finals week'],
    weather: ['nor\'easter', 'humidity']
  }
});
