SB.Cities.register('missoula-mt', {
  v: 1,
  slug: 'missoula-mt',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of montana', 'griz', 'grizzlies', 'montana state', 'montana state university', 'bobcats', 'washington-grizzly stadium',
           'grizzly stadium', 'kbga', 'kufm', 'montana public radio', 'missoulian', 'missoula current', 'montana kaimin', 'kaimin',
           'missoula independent', 'montana rail link', 'bnsf', 'river city roots festival', 'roots festival', 'first friday', 'garden city brewfest',
           'brewfest', 'maggotfest', 'international wildlife film festival', 'big sky documentary film festival', 'montana book festival',
           'mountain line', 'jefferson lines', 'amtrak', 'malmstrom', 'malmstrom air force base', 'salish kootenai college', 'carroll college',
           'montana tech', 'missoula college', 'vfw', 'american legion', 'elks', 'eagles', 'knights of columbus', 'the slackwater hall',
           'tamarack annex', 'the switchyard', 'orchard row garage', 'bonner millyard shed', 'the pinecone pantry', 'eighth street lanes',
           'the sentinel room', 'greenough carport', 'the brakeman\'s parlor', 'fort flats basement', 'the lolo pass lodge'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['missoulian*', 'kbga*', 'kufm*', 'montana kaimin*', 'river city roots*', 'maggotfest*', 'washington-grizzly*', 'garden city brewfest*'],

  blurb: ['A mountain-valley college town in a folk and roots country, with a punk thread running through it. Early all-ages taproom slots, then basements across the river.',
          'Students fill the rooms from fall to spring and vanish by May. Summer means yards, smoke and long drives.'],
  hard: 'Tours skip the state, the crowd vanishes every May, and summer smoke cancels yards.',
  region: 'the northern Rockies',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Spokane', state: 'WA', lat: 47.66, lon: -117.43 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Missoula' },
    { id: 'lolo', kind: 'FEEDER', name: 'Lolo', minutes: 15, bearing: 190, note: 'An unincorporated suburb to the south. Its kids are basically Missoula kids.' },
    { id: 'frenchtown', kind: 'FEEDER', name: 'Frenchtown', minutes: 20, bearing: 285, note: 'A former mill town west on the interstate with a rural lean.' },
    { id: 'arlee', kind: 'FEEDER', name: 'Arlee', minutes: 30, bearing: 345, note: 'A small town on the reservation to the north, with powwow life nearby.' },
    { id: 'stevensville', kind: 'FEEDER', name: 'Stevensville', minutes: 35, bearing: 185, note: 'An old mission town in the Bitterroot with farms and acreage.' },
    { id: 'hamilton', kind: 'FEEDER', name: 'Hamilton', minutes: 60, bearing: 190, note: 'The valley\'s main town, conservative and outdoorsy. Its teens come north for shows.' },
    { id: 'superior', kind: 'FEEDER', name: 'Superior', minutes: 60, bearing: 275, note: 'A very small old mining and logging county seat to the west.' },
    { id: 'seeley-lake', kind: 'FEEDER', name: 'Seeley Lake', minutes: 60, bearing: 30, note: 'A lake and logging town, snowed in half the year.' },
    { id: 'ronan', kind: 'FEEDER', name: 'Ronan and Polson', minutes: 65, bearing: 355, note: 'Reservation farm and lake towns up US 93, with school-sports social lives.' },
    { id: 'deer-lodge', kind: 'FEEDER', name: 'Deer Lodge', minutes: 75, bearing: 105, note: 'A ranching town tied to the state prison.' },
    { id: 'helena', kind: 'PEER', name: 'Helena', state: 'MT', minutes: 110, bearing: 85, note: 'The state capital. Bands pair it with Missoula as a two-night run.' },
    { id: 'butte', kind: 'PEER', name: 'Butte', state: 'MT', minutes: 120, bearing: 105, note: 'An old mining town, tough and proud. A trading partner for shows and bands.' },
    { id: 'kalispell', kind: 'PEER', name: 'Kalispell', state: 'MT', minutes: 135, bearing: 355, note: 'A smaller, more conservative gateway town to the north.' },
    { id: 'bozeman', kind: 'PEER', name: 'Bozeman', state: 'MT', minutes: 180, bearing: 110, slug: 'bozeman-mt', note: 'Bigger, richer and a real rival. The next stop east on the interstate.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown on the south bank', route: 'downtown', note: 'Bars, taprooms, galleries and a riverfront park along Higgins. Licensed rooms that go all-ages early, and priced out for anything cheap or loud.' },
    { id: 'northside', name: 'the Northside', route: 'old-side', note: 'Old railroad houses on small lots across the river, cut off by the tracks and the interstate. Historically the punk-house neighborhood, now gentrifying.' },
    { id: 'westside', name: 'the Westside', route: 'work-side', note: 'Smaller older houses, many rentals, near the rail line. Basements and shared houses, still relatively cheap.' },
    { id: 'university', name: 'the University District and the Hip Strip', route: 'campus', note: 'Student rentals, cafes, record and thrift shops under the mountain. Full in the school year, empty in summer, with party enforcement.' },
    { id: 'southside', name: 'the Southside and Orchard Homes', route: 'old-side', note: 'Older streets and river-flat lots with gardens, outbuildings and garages. Cheap and ignored, but being built over.' },
    { id: 'reserve', name: 'Reserve Street and the Wye', route: 'work-side', note: 'Big-box strips and light-industrial units at the west edge of town. Practice rooms and a generator-and-warehouse show or two.' },
    { id: 'rattlesnake', name: 'the Rattlesnake', route: 'old-side', note: 'Leafy and quiet with many homeowners. No shows, and a source of noise complaints.' },
    { id: 'east-missoula', name: 'East Missoula', route: 'work-side', note: 'A flood-prone river-bottom community with old bars and cheaper rent, under the county sheriff rather than city police.' }
  ],

  contacts: ['bozeman-mt', 'spokane-wa'],

  points: [
    { name: 'Spokane', state: 'WA', lat: 47.66, lon: -117.43, pop: 590000 },
    { name: 'Billings', state: 'MT', lat: 45.78, lon: -108.5, pop: 185000 },
    { name: 'Coeur d\'Alene', state: 'ID', lat: 47.68, lon: -116.78, pop: 55000 },
    { name: 'Great Falls', state: 'MT', lat: 47.5, lon: -111.3, pop: 60000 }
  ],
  roads: ['I-90', 'US 93', 'US 12', 'Highway 200', 'Lookout Pass'],

  words: {
    street: ['Higgins Avenue', 'Broadway', 'Front Street', 'Reserve Street', 'South Higgins', 'Orange Street'],
    water: ['the Clark Fork', 'the Bitterroot', 'the Blackfoot', 'Rattlesnake Creek'],
    hood: ['the Northside', 'the Westside', 'the Southside', 'Orchard Homes', 'Franklin to the Fort', 'the Wye', 'the Rattlesnake', 'East Missoula', 'Lolo', 'Frenchtown'],
    thing: ['huckleberry shake', 'taproom', 'float trip', 'generator', 'gravel bar', 'elk burger', 'bear spray', 'porch', 'river trail', 'mountain pass', 'chains', 'graduation weekend'],
    weather: ['wildfire smoke', 'winter inversion', 'snow on the pass']
  }
});
