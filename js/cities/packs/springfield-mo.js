SB.Cities.register('springfield-mo', {
  v: 1,
  slug: 'springfield-mo',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['missouri state university', 'missouri state', 'drury university', 'drury', 'bass pro shops', 'bass pro', 'o\'reilly auto parts', 'o\'reilly',
           'assemblies of god', 'ozark empire fair', 'route 66 festival', 'first friday', 'first friday art walk', 'springfield cardinals', 'hammons field',
           'springfield news-leader', 'news-leader', 'ksmu', 'coxhealth', 'cox health', 'mercy springfield', 'fort leonard wood', 'silver dollar city',
           'dickerson park zoo', 'galloway village',
           'the sinkhole social hall', 'sinkhole social hall', 'frisco spur annex', 'karst room', 'mother road mercantile', 'galloway creek co-op',
           'north side freight door', 'greene county grange hall', 'fulbright dry goods', 'lot 417', 'boone street basement', 'the cattle exchange',
           'rail yard rec hall'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real institutions appear only as generic phrases in game text. */
  blocklist: ['bass pro*', 'o\'reilly*', 'missouri state*', 'drury*', 'ozark empire*', 'first friday*', 'springfield cardinals*', 'coxhealth*'],

  blurb: ['Old rentals on the hills, halls and church basements. The scene empties and refills with each new class of sixteen-year-olds.',
          'Everyone drives. A show with no driver is a show nobody can leave.'],
  hard: 'Few all-ages rooms, and everyone needs a ride home.',
  region: 'the Ozarks',
  whereGo: [
    { name: 'Kansas City', state: 'MO', lat: 39.10, lon: -94.58 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.20 },
    { name: 'Tulsa', state: 'OK', lat: 36.15, lon: -95.99 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Springfield' },
    { id: 'republic', kind: 'FEEDER', name: 'Republic', minutes: 20, bearing: 250, note: 'A western bedroom suburb with little scene; it sends kids.' },
    { id: 'willard', kind: 'FEEDER', name: 'Willard', minutes: 20, bearing: 335, note: 'A small bedroom town to the northwest.' },
    { id: 'nixa', kind: 'FEEDER', name: 'Nixa', minutes: 20, bearing: 195, note: 'A fast-growing school-district suburb; few bands, many kids.' },
    { id: 'ozark', kind: 'FEEDER', name: 'Ozark', minutes: 20, bearing: 170, note: 'A county seat and suburb up US 65, much like Nixa.' },
    { id: 'bolivar', kind: 'FEEDER', name: 'Bolivar', minutes: 35, bearing: 355, note: 'A small church-college town; a few kids drive in.' },
    { id: 'monett', kind: 'FEEDER', name: 'Monett and Aurora', minutes: 40, bearing: 240, note: 'Farm and poultry towns to the southwest.' },
    { id: 'lebanon', kind: 'FEEDER', name: 'Lebanon', minutes: 40, bearing: 75, note: 'A farm and highway town on I-44; teens drive in.' },
    { id: 'branson', kind: 'FEEDER', name: 'Branson', minutes: 55, bearing: 180, note: 'A tourist town whose show workers drive up for something real after their last set.', season: { months: [5, 6, 7, 8, 9, 10], mul: 1.3 } },
    { id: 'joplin', kind: 'PEER', name: 'Joplin', minutes: 70, bearing: 255, scene: 700, note: 'The smaller sibling to the west on I-44, and a close trading partner.' },
    { id: 'fayetteville', kind: 'PEER', name: 'Fayetteville', state: 'AR', minutes: 120, bearing: 235, slug: 'fayetteville-ar', note: 'A college town with a much bigger live-music culture; the natural rival and trade partner.' },
    { id: 'columbia', kind: 'PEER', name: 'Columbia', minutes: 150, bearing: 35, slug: 'columbia-mo', note: 'Another mid-size college-town scene up the road.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the square', route: 'downtown', note: 'Bars, lofts and old theaters around the courthouse square. Priced up and polished; mostly 21 and over.' },
    { id: 'c-street', name: 'Commercial Street', route: 'old-side', note: 'A revived brick railroad strip of studios and small businesses, with poorer blocks beyond it to the north.' },
    { id: 'midtown', name: 'Midtown and Walnut Street', route: 'old-side', note: 'Old bungalows and big rental houses on porch-lined streets. The likeliest place for a house venue to last.' },
    { id: 'rountree', name: 'Rountree and the campus streets', route: 'campus', note: 'Student duplexes and small old houses that churn every year as landlords buy up and renovate.' },
    { id: 'grant-avenue', name: 'Grant Avenue and the south-central streets', route: 'work-side', note: 'Cheap, ignored older housing with garages and carports.' },
    { id: 'glenstone', name: 'the Glenstone strip', route: 'work-side', note: 'Big-box retail, storage units, roller rinks and event halls; the practice rooms are here and so are bored suburban teenagers.' },
    { id: 'kansas-expressway', name: 'the west side along Kansas Expressway', route: 'campus', note: 'New subdivisions and big churches. No music infrastructure, but it supplies the audience.' },
    { id: 'rail-yards', name: 'the north rail yards and airport', route: 'work-side', note: 'Warehouses with few neighbors and generator-friendly lots, often watched by police.' }
  ],

  contacts: ['fayetteville-ar', 'columbia-mo'],

  points: [
    { name: 'Kansas City', state: 'MO', lat: 39.10, lon: -94.58, pop: 510000 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.20, pop: 300000 },
    { name: 'Tulsa', state: 'OK', lat: 36.15, lon: -95.99, pop: 410000 },
    { name: 'Joplin', state: 'MO', lat: 37.08, lon: -94.51, pop: 52000 }
  ],
  roads: ['I-44', 'US 65', 'US 60', 'US 160', 'Route 13', 'Route 66'],

  words: {
    street: ['Glenstone Avenue', 'Kansas Expressway', 'Walnut Street', 'Commercial Street', 'Grant Avenue', 'St. Louis Street', 'College Street'],
    water: ['Galloway Creek', 'the James River', 'Lake Springfield'],
    hood: ['Rountree', 'Midtown', 'C-Street', 'Park Central Square', 'Grant Beach'],
    thing: ['cashew chicken', 'sinkhole', 'ice storm', 'church potluck', 'limestone', 'storm siren', 'tick', 'fellowship hall', 'finals week'],
    weather: ['ice storm', 'tornado watch', 'storm siren']
  }
});
