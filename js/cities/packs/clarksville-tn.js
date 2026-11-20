SB.Cities.register('clarksville-tn', {
  v: 1,
  slug: 'clarksville-tn',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['fort campbell', 'the 101st', '101st airborne', 'austin peay', 'apsu', 'trane', 'amazon', 'fedex', 'google', 'hankook', 'bridgestone', 'vfw',
           'dodea', 'nashville international', 'outlaw field', 'ringgold mill', 'l&n station', 'wilma rudolph', 'western kentucky university', 'wku',
           'mtsu', 'middle tennessee state', 'tennessee tech', 'corvette plant', 'a. o. smith', 'chitlin\' circuit', 'strawberry alley',
           'red river annex', 'hilldale hall', 'dunbar door', 'depot back room', 'ringgold loading dock', 'fort boulevard unit 9', 'redbud lodge',
           'highland rim skate and supply', 'palmyra road barn', 'quarter-mile carport', 'st. bethlehem grange', 'strawberry row basement'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Tornadoes are written only as 'the tornado'. */
  blocklist: ['fort campbell*', 'austin peay*', 'strawberry alley*', 'ringgold mill*', 'wilma rudolph*'],

  blurb: ['A base-town scene of a few bands and no home room, always half-watching Nashville down the interstate. Shows live on bar stages, brewery patios and local-music days.',
          'Every few years a new batch of soldiers and students arrives, and the ones who play move on just as fast.'],
  hard: 'No all-ages room, and members keep rotating out to move orders and Nashville.',
  region: 'the Cumberland',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76 },
    { name: 'Memphis', state: 'TN', lat: 35.15, lon: -90.05 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Clarksville' },
    { id: 'oak-grove', kind: 'FEEDER', name: 'Oak Grove', state: 'KY', minutes: 15, bearing: 5, note: 'A young border town beside the post; its kids come to Clarksville for everything.' },
    { id: 'pleasant-view', kind: 'FEEDER', name: 'Pleasant View', minutes: 25, bearing: 150, note: 'A small bedroom community with no scene of its own.' },
    { id: 'hopkinsville', kind: 'FEEDER', name: 'Hopkinsville', state: 'KY', minutes: 30, bearing: 350, note: 'A farm and base town across the line with a few bands and strip rooms.', bands: 2 },
    { id: 'ashland-city', kind: 'FEEDER', name: 'Ashland City', minutes: 35, bearing: 140, note: 'A river and lake town; its kids split between Clarksville and Nashville.' },
    { id: 'springfield', kind: 'FEEDER', name: 'Springfield', minutes: 35, bearing: 95, note: 'A tobacco and commuter town on the Nashville edge.' },
    { id: 'dickson', kind: 'FEEDER', name: 'Dickson', minutes: 45, bearing: 190, note: 'A railroad town in the Nashville orbit with a small scene.', bands: 1 },
    { id: 'dover', kind: 'FEEDER', name: 'Dover', minutes: 45, bearing: 265, note: 'A rural county seat out by the lakes.' },
    { id: 'cadiz', kind: 'FEEDER', name: 'Cadiz', state: 'KY', minutes: 45, bearing: 310, note: 'A small lake-country seat across the line.' },
    { id: 'russellville', kind: 'FEEDER', name: 'Russellville', state: 'KY', minutes: 50, bearing: 40, note: 'A farm and factory town up US 79.' },
    { id: 'bowling-green', kind: 'PEER', name: 'Bowling Green', state: 'KY', minutes: 75, bearing: 55, scene: 1400, note: 'A college and factory town on the Nashville edge; the natural peer.' },
    { id: 'murfreesboro', kind: 'PEER', name: 'Murfreesboro', minutes: 80, bearing: 130, scene: 2200, note: 'A bigger college scene through Nashville; bands trade both ways.' },
    { id: 'paducah', kind: 'PEER', name: 'Paducah', state: 'KY', minutes: 90, bearing: 305, scene: 600, note: 'A river arts town and occasional tour stop.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'A rebuilt grid above the river bluff: restaurants, bars, a riverfront park and festivals. Brick storefronts that a landlord eyes.' },
    { id: 'campus-edge', name: 'the campus edge', route: 'campus', note: 'Aging rental houses around the university, with porches and a few basements. House shows and student events.' },
    { id: 'madison-street', name: 'North Clarksville and Madison Street', route: 'old-side', note: 'The older north side toward the Kentucky line: ranch houses, cheap rentals and trailer parks. Hit hard by the last tornado.' },
    { id: 'highway-strip', name: 'the Highway 41A strip', route: 'work-side', note: 'Four lanes of chain restaurants, pawn shops, vape shops and vacant strip units on the road to the post. Anonymous rooms.' },
    { id: 'east-side', name: 'Rossview and the east side', route: 'campus', note: 'New subdivisions and big boxes. Big garages, strict neighbors, and soldiers\' families.' },
    { id: 'st-bethlehem', name: 'St. Bethlehem and New Providence', route: 'work-side', note: 'Cheap riverside and interstate-corner streets with backyards, sheds and barns.' },
    { id: 'hilldale', name: 'Hilldale and Cumberland Heights', route: 'old-side', note: 'Older homeowners and church halls to the south. Quiet, and aging.' }
  ],

  contacts: ['chattanooga-tn', 'johnson-city-tn', 'evansville-in'],

  points: [
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78, pop: 690000 },
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76, pop: 630000 },
    { name: 'Memphis', state: 'TN', lat: 35.15, lon: -90.05, pop: 630000 },
    { name: 'Evansville', state: 'IN', lat: 37.97, lon: -87.57, pop: 117000 },
    { name: 'Murfreesboro', state: 'TN', lat: 35.85, lon: -86.39, pop: 153000 }
  ],
  roads: ['I-24', 'US 79', 'US 41A', 'SR 12', 'SR 76'],

  words: {
    street: ['Madison Street', 'Franklin Street', 'Public Square', 'College Street', 'Trenton Road', 'US 41A'],
    water: ['the Red River', 'the Cumberland', 'Dunbar Cave', 'Lake Barkley'],
    hood: ['Ringgold', 'Rossview', 'Sango', 'St. Bethlehem', 'New Providence', 'Hilldale', 'Cumberland Heights', 'Oak Grove'],
    thing: ['pawn shop', 'strip mall', 'dark-fired tobacco', 'cinder-block bathroom', 'storm cellar', 'pickup', 'brewery patio', 'bar stage', 'move order', 'warehouse room'],
    weather: ['tornado warning', 'river flood']
  }
});
