SB.Cities.register('bend-or', {
  v: 1,
  slug: 'bend-or',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['les schwab', 'cascades east transit', 'deschutes county fair', 'deschutes county fair and expo center', 'jefferson county fair', 'sisters rodeo',
           'sisters folk festival', 'sisters quilt show', 'quilt show', 'pole pedal paddle', 'golden gloves', 'bend film festival', 'bend film',
           'central oregon community college', 'cocc', 'oregon state university-cascades', 'osu-cascades', 'osu cascades', 'coast starlight', 'amtrak',
           'redmond municipal airport', 'smokejumper base', 'old mill district', 'old mill amphitheater', 'bend parkway', 'oktoberfest', 'brewfest',
           'the cinder annex', 'cinder annex', 'pumice hall', 'mill stack social', 'the rimrock shed', 'rimrock shed', 'third street banquet room',
           'obsidian carport', 'the lava cutbank', 'lava cutbank', 'boyd acres bay 4', 'juniper flats clubhouse', 'the snowline garage', 'snowline garage',
           'the parkway underpass lot', 'pilot butte grange annex', 'warm springs indian reservation', 'confederated tribes'],
  /* The dossier's invented venue names are banned too: research, not content, unchecked. */
  blocklist: ['les schwab*', 'cascades east*', 'deschutes county fair*', 'cinder annex*', 'pumice hall*', 'mill stack*', 'obsidian carport*'],

  blurb: ['A few promoters keep punk and metal alive in bars, warehouses and backyards, and the same faces show up at every show.',
          'Rents doubled, rooms vanish, and the cheap buildings keep turning into taprooms. Neighbors and landlords shut warehouses fast.'],
  hard: 'Few all-ages rooms, and neighbors and landlords shut warehouses fast.',
  region: 'the high desert',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Eugene', state: 'OR', lat: 44.05, lon: -123.09 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 },
    { name: 'Boise', state: 'ID', lat: 43.62, lon: -116.2 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Bend' },
    { id: 'sunriver', kind: 'FEEDER', name: 'Sunriver', minutes: 20, bearing: 190, pop: 2023, note: 'A resort community; teenagers come from staff housing and second homes.' },
    { id: 'redmond', kind: 'FEEDER', name: 'Redmond', minutes: 20, bearing: 15, pop: 33274, note: 'The closest cousin: cheaper, flatter and more working-class, with a small scene of its own.' },
    { id: 'terrebonne', kind: 'FEEDER', name: 'Terrebonne and Culver', minutes: 30, bearing: 10, pop: 3000, note: 'Tiny ranch and farm towns up US 97 that send a handful of kids.' },
    { id: 'sisters', kind: 'FEEDER', name: 'Sisters', minutes: 30, bearing: 320, pop: 3064, note: 'A tourist cowboy town with few teenagers but a full high school.' },
    { id: 'la-pine', kind: 'FEEDER', name: 'La Pine', minutes: 35, bearing: 185, pop: 2512, note: 'A strung-out, poor highway town; the broke and bored kids drive up from here.' },
    { id: 'prineville', kind: 'FEEDER', name: 'Prineville', minutes: 45, bearing: 80, pop: 10700, note: 'A ranch and mill county seat; rough to Bend kids, and it thinks Bend is snobs.' },
    { id: 'madras', kind: 'FEEDER', name: 'Madras', minutes: 50, bearing: 5, pop: 7456, note: 'A wheat-country county seat with a community college campus.' },
    { id: 'warm-springs', kind: 'FEEDER', name: 'Warm Springs', minutes: 70, bearing: 350, pop: 2435, note: 'A reservation community with its own youth culture, not a suburb of Bend.' },
    { id: 'eugene', kind: 'PEER', name: 'Eugene', state: 'OR', minutes: 165, bearing: 255, slug: 'eugene-or', note: 'Down the hill over the pass: the nearest real music scene, a summer drive.' },
    { id: 'salem', kind: 'PEER', name: 'Salem', state: 'OR', minutes: 160, bearing: 295, slug: 'salem-or', note: 'A capital and farm town over the pass; less of a music destination.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Old Bend', route: 'downtown', note: 'Bars, restaurants and tourists along the river. Rents and neighbors rule out loud all-ages rooms.' },
    { id: 'old-mill', name: 'the old mill site', route: 'downtown', note: 'The redeveloped mill land with shops and a big summer amphitheater. The anti-punk space.' },
    { id: 'westside', name: 'the Westside', route: 'campus', note: 'Wealthy, wooded and quiet, with the college campuses and fast noise complaints.' },
    { id: 'third-street', name: 'Third Street and the east strip', route: 'work-side', note: 'Motels, auto shops and old strip malls, now filling with taprooms. The best fit for shop and garage shows.' },
    { id: 'boyd-acres', name: 'Boyd Acres and the northeast', route: 'work-side', note: 'Light industrial units, tract houses and storage units: where practice space would be.' },
    { id: 'pilot-butte', name: 'Pilot Butte and the east side', route: 'old-side', note: 'Older ranch houses, lower rent and backyards, mixed working-class and transplants.' },
    { id: 'southeast', name: 'Southeast Bend and the big-box strip', route: 'old-side', note: 'Newer subdivisions and apartment complexes where service workers live now.' }
  ],

  contacts: ['eugene-or', 'salem-or', 'portland', 'boise-id'],

  points: [
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68, pop: 2500000 },
    { name: 'Klamath Falls', state: 'OR', lat: 42.22, lon: -121.78, pop: 21813 },
    { name: 'Burns', state: 'OR', lat: 43.59, lon: -119.05, pop: 2730 },
    { name: 'Corvallis', state: 'OR', lat: 44.56, lon: -123.26, pop: 59922 },
    { name: 'The Dalles', state: 'OR', lat: 45.59, lon: -121.18, pop: 16010 }
  ],
  roads: ['US 97', 'US 20', 'OR 126', 'US 26', 'Santiam Pass'],

  words: {
    street: ['Third Street', 'US 97', 'US 20', 'Century Drive', 'Greenwood Avenue'],
    water: ['the Deschutes', 'Mirror Pond'],
    hood: ['Awbrey Butte', 'Boyd Acres', 'Larkspur', 'Old Farm', 'Pilot Butte', 'Tumalo', 'Westside', 'Eastside'],
    thing: ['pumice', 'juniper', 'taproom', 'food cart', 'roundabout', 'Subaru', 'woodstove', 'cinder cone', 'warehouse', 'tattoo shop', 'rehearsal space'],
    weather: ['wildfire smoke', 'pass closure', 'black ice']
  }
});
