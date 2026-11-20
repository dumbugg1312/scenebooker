SB.Cities.register('utica-ny', {
  v: 1,
  slug: 'utica-ny',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['observer-dispatch', 'observer dispatch', 'boilermaker', 'utica club', 'matt brewery', 'f.x. matt', 'colgate', 'hamilton college', 'suny poly', 'suny polytechnic',
           'mohawk valley community college', 'utica university', 'utica college', 'fort drum', 'griffiss', 'utica comets', 'utica city fc', 'adirondack bank center',
           'oneida nation', 'turning stone', 'vfw', 'american legion', 'elks', 'state liquor authority',
           'canal street annex', 'hillside social club', 'polish hall annex', 'st. casimir\'s undercroft', 'the knit mill loft', 'harbor flats', 'oneida square parlor',
           'the double on rutger', 'bagg\'s back room', 'the parkway garage', 'mohawk valley hall of mirrors', 'the tomato pie basement', 'the black river grange'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['observer-dispatch*', 'boilermaker*', 'utica club*', 'canal street annex*', 'colgate*', 'turning stone*'],

  blurb: ['A small old mill city on the Mohawk and the old canal, with cheap rent, tall wooden doubles with basements, and a bar or social club on every corner.',
          'Half-empty downtown, long winters, and the young leave at eighteen for bigger towns an hour either way.'],
  hard: 'Few all-ages rooms, and snow and bigger cities nearby thin the crowd.',
  region: 'the Mohawk Valley',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Albany', state: 'NY', lat: 42.65, lon: -73.76 },
    { name: 'Syracuse', state: 'NY', lat: 43.05, lon: -76.15 },
    { name: 'Rochester', state: 'NY', lat: 43.16, lon: -77.61 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Utica' },
    { id: 'new-hartford', kind: 'FEEDER', name: 'New Hartford', minutes: 10, bearing: 190, note: 'The wealthier suburb to the south; backyards and finished basements.' },
    { id: 'whitesboro', kind: 'FEEDER', name: 'Whitesboro and Oriskany', minutes: 10, bearing: 285, note: 'Mill-village suburbs to the west.' },
    { id: 'clinton', kind: 'FEEDER', name: 'Clinton', minutes: 15, bearing: 235, note: 'A small college town; kids come in for shows.' },
    { id: 'rome', kind: 'FEEDER', name: 'Rome', minutes: 20, bearing: 295, note: 'A smaller city up the valley with a little scene and a friendly rivalry.' },
    { id: 'herkimer', kind: 'FEEDER', name: 'Herkimer and Ilion', minutes: 20, bearing: 110, note: 'Factory and river towns with a community college.' },
    { id: 'little-falls', kind: 'FEEDER', name: 'Little Falls', minutes: 30, bearing: 95, note: 'An old mill town in the gorge with an artsy small-town edge.' },
    { id: 'oneida', kind: 'FEEDER', name: 'Oneida and Canastota', minutes: 35, bearing: 255, note: 'Small cities and farm towns to the west.' },
    { id: 'boonville', kind: 'FEEDER', name: 'Boonville', minutes: 40, bearing: 345, note: 'Dairy and logging country in the Adirondack foothills.' },
    { id: 'hamilton', kind: 'FEEDER', name: 'Hamilton', minutes: 40, bearing: 215, note: 'A university village to the south; students are a possible crowd.' },
    { id: 'syracuse', kind: 'PEER', name: 'Syracuse', minutes: 55, bearing: 265, slug: 'syracuse-ny', note: 'The big neighbor on the Thruway; Utica loses its bands and kids to it.' },
    { id: 'schenectady', kind: 'PEER', name: 'Schenectady', minutes: 70, bearing: 100, scene: 700, note: 'A similar-size city on the way to Albany.' },
    { id: 'binghamton', kind: 'PEER', name: 'Binghamton', minutes: 75, bearing: 190, scene: 900, note: 'A university city down Route 12; a plausible two-way trade.' },
    { id: 'ithaca', kind: 'PEER', name: 'Ithaca', minutes: 95, bearing: 230, slug: 'ithaca-ny', note: 'A college and arts town to the southwest.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Bagg\'s Square', route: 'downtown', note: 'Old brick by the canal harbor: bars, theaters and a thin crowd; empty upstairs rooms.' },
    { id: 'cornhill', name: 'Cornhill', route: 'old-side', note: 'The oldest hillside neighborhood: dense wood-frame houses, cheap, with students, artists and refugee families.' },
    { id: 'east-utica', name: 'East Utica', route: 'work-side', note: 'Old Polish and Italian blocks of corner bars, church halls and ethnic social clubs.' },
    { id: 'west-utica', name: 'West Utica', route: 'work-side', note: 'Older Italian side: two-families, garages and old mill buildings.' },
    { id: 'south-utica', name: 'Oneida Square and South Utica', route: 'old-side', note: 'Big Victorian houses cut into apartments, with churches and halls.' },
    { id: 'parkway', name: 'the Parkway and North Utica', route: 'campus', note: 'Leafier and residential, with backyards and a college on the outskirts.' },
    { id: 'new-hartford-side', name: 'New Hartford and Whitesboro', route: 'campus', note: 'The suburban edge most people mean when they say they are from Utica.' }
  ],

  contacts: ['syracuse-ny', 'ithaca-ny'],

  points: [
    { name: 'Albany', state: 'NY', lat: 42.65, lon: -73.76, pop: 900000 },
    { name: 'Buffalo', state: 'NY', lat: 42.89, lon: -78.88, pop: 1100000 },
    { name: 'Watertown', state: 'NY', lat: 43.97, lon: -75.91, pop: 120000 },
    { name: 'Binghamton', state: 'NY', lat: 42.1, lon: -75.91, pop: 250000 }
  ],
  roads: ['I-90', 'I-790', 'NY 12', 'NY 5S', 'NY 49', 'Genesee Street'],

  words: {
    street: ['Genesee Street', 'Oneida Square', 'Memorial Parkway', 'Whitesboro Street', 'Bleecker Street'],
    water: ['the Mohawk', 'the canal', 'the Barge Canal'],
    hood: ['Cornhill', 'East Utica', 'West Utica', 'Bagg\'s Square', 'New Hartford', 'Whitesboro', 'Yorkville'],
    thing: ['chicken riggies', 'tomato pie', 'half-moon cookie', 'utica greens', 'double', 'social club', 'bocce', 'snowbank', 'club hall', 'lake-effect'],
    weather: ['lake effect', 'nor\'easter']
  }
});
