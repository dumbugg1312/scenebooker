SB.Cities.register('spartanburg-sc', {
  v: 1,
  slug: 'spartanburg-sc',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['wofford', 'wofford college', 'converse university', 'converse college', 'usc upstate', 'spartanburg methodist', 'bmw', 'festifall',
           'dickens of a christmas', 'greek festival', 'hub city hog fest', 'hog fest', 'hub city', 'international festival', 'red white and boom',
           'taste of the backcountry', 'spartanburg criterium', 'music on main', 'hub city farmers market', 'mayfest', 'gibbs stadium',
           'waffle house', 'bojangles', 'cook out', 'zaxby\'s', 'hardee\'s', 'cheerwine', 'amtrak', 'crescent', 'greenville-spartanburg',
           'winthrop university', 'clinton college', 'york tech', 'clemson', 'fort jackson', 'sparkle city',
           'the switchyard', 'hub hall', 'piedmont annex', 'loom room', 'sparkle lot', 'the depot back room', 'depot back room', 'red clay hall',
           'backcountry lodge', 'spindle street garage', 'boiled peanut annex', 'fourth shift'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Colleges and events appear in game text only as generic words. */
  blocklist: ['wofford*', 'converse*', 'hub city*', 'sparkle city*', 'waffle house*', 'cheerwine*', 'switchyard*', 'loom room*'],

  blurb: ['An Upstate mill town where the interstates cross and most bands keep driving to Greenville.',
          'Shows are carports, garages, halls and whatever the mill left. Everyone knows everyone.'],
  hard: 'Bands skip it for Greenville, and the room costs a drive.',
  region: 'the Upstate',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Greenville', state: 'SC', lat: 34.85, lon: -82.4 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Columbia', state: 'SC', lat: 34.0, lon: -81.03 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Spartanburg' },
    { id: 'boiling-springs', kind: 'FEEDER', name: 'Boiling Springs and Moore', minutes: 15, bearing: 340, note: 'Suburbs where many local band members live.' },
    { id: 'duncan', kind: 'FEEDER', name: 'Duncan and Wellford', minutes: 15, bearing: 250, note: 'Suburbs along I-85 toward Greenville.' },
    { id: 'greer', kind: 'FEEDER', name: 'Greer', minutes: 20, bearing: 265, pop: 35308, note: 'A big suburban and commercial town; its people drift to Greenville.' },
    { id: 'inman', kind: 'FEEDER', name: 'Inman', minutes: 20, bearing: 350, pop: 2990, note: 'An old railroad and mill town; a few kids, no scene.' },
    { id: 'landrum', kind: 'FEEDER', name: 'Landrum', minutes: 25, bearing: 315, pop: 2481, note: 'A small foothills town near the North Carolina line with an artsy, horse-country lean.' },
    { id: 'chesnee', kind: 'FEEDER', name: 'Chesnee', minutes: 25, bearing: 55, note: 'A small farm and mill town.' },
    { id: 'cowpens', kind: 'FEEDER', name: 'Cowpens and Pacolet', minutes: 25, bearing: 80, note: 'Small mill and farm towns east on US 221.' },
    { id: 'gaffney', kind: 'FEEDER', name: 'Gaffney', minutes: 30, bearing: 95, pop: 12764, note: 'A peach-country mill and highway town.' },
    { id: 'tryon', kind: 'FEEDER', name: 'Tryon', state: 'NC', minutes: 35, bearing: 335, note: 'A small arts-and-horse foothills village.' },
    { id: 'union', kind: 'FEEDER', name: 'Union', minutes: 45, bearing: 150, pop: 8174, note: 'An old textile county seat, rural.' },
    { id: 'laurens', kind: 'FEEDER', name: 'Laurens', minutes: 45, bearing: 190, note: 'A small mill and farm county seat to the south.' },
    { id: 'gastonia', kind: 'PEER', name: 'Gastonia', state: 'NC', minutes: 60, bearing: 85, scene: 600, note: 'A mill city in Charlotte\'s shadow, up I-85.' },
    { id: 'anderson', kind: 'PEER', name: 'Anderson', minutes: 65, bearing: 240, scene: 500, note: 'A smaller cousin past Greenville.' },
    { id: 'asheville', kind: 'PEER', name: 'Asheville', state: 'NC', minutes: 75, bearing: 335, slug: 'asheville-nc', note: 'Bigger, richer and music-minded; local kids go there for shows.' },
    { id: 'rock-hill', kind: 'PEER', name: 'Rock Hill', minutes: 75, bearing: 100, scene: 700, note: 'A college town living in Charlotte\'s shadow, like this one.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The old square grid with the railroad on its south side: restaurants, breweries, lofts and festivals; licensed bars and storefront rooms.' },
    { id: 'hampton-heights', name: 'Hampton Heights', route: 'old-side', note: 'Big old historic houses northwest of downtown, many split into rentals; porch and house shows, with complaint-prone neighbors.' },
    { id: 'college-corridor', name: 'the college corridor on East Main', route: 'campus', note: 'Two small campuses and the old houses around them; shows come and go with the semester.' },
    { id: 'northside', name: 'the Northside', route: 'work-side', note: 'A long-underinvested neighborhood north of downtown now facing redevelopment; any show here needs care and local trust.' },
    { id: 'mill-villages', name: 'the mill villages', route: 'work-side', note: 'Beaumont, Saxon, Glendale and Valley Falls: small worker houses ringed by mill buildings; yards, carports and practice rooms in old mill space.' },
    { id: 'southside', name: 'the south and west sides', route: 'work-side', note: 'Strip commercial, apartments and light industry toward the interstates; storage-unit jams and generator shows in lots.' },
    { id: 'suburbs', name: 'the suburban ring', route: 'campus', note: 'Subdivision garages and church youth rooms where most of the kids live.' },
    { id: 'upstate-edge', name: 'the Business 85 east side', route: 'campus', note: 'Student apartments and retail around a suburban commuter campus.' }
  ],

  contacts: ['asheville-nc', 'columbia-sc', 'atlanta'],

  points: [
    { name: 'Greenville', state: 'SC', lat: 34.85, lon: -82.4, pop: 70720 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 875000 },
    { name: 'Greer', state: 'SC', lat: 34.94, lon: -82.23, pop: 35308 },
    { name: 'Hendersonville', state: 'NC', lat: 35.32, lon: -82.46, pop: 15000 }
  ],
  roads: ['I-85', 'I-26', 'I-585', 'US 29', 'US 221', 'US 176'],

  words: {
    street: ['Main Street', 'North Church Street', 'East Main', 'Business 85', 'US 221', 'US 176'],
    water: ['the Pacolet', 'Lawson\'s Fork', 'the Tyger'],
    hood: ['Hampton Heights', 'Beaumont', 'Saxon', 'Glendale', 'Valley Falls', 'Northside', 'Boiling Springs', 'Morgan Square', 'the Upstate'],
    thing: ['carport', 'boiled peanuts', 'pimento cheese', 'peach stand', 'mill house', 'sweet tea', 'generator', 'mill building', 'church youth hall', 'slab garage'],
    weather: ['afternoon thunderstorm', 'ice storm']
  }
});
