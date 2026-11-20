SB.Cities.register('colorado-springs-co', {
  v: 1,
  slug: 'colorado-springs-co',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['air force academy', 'fort carson', 'peterson', 'schriever', 'cheyenne mountain complex', 'norad', 'colorado college', 'uccs', 'pikes peak state college',
           'colorado technical university', 'broadmoor', 'garden of the gods', 'pikes peak international hill climb', 'pikes peak ascent', 'hill climb',
           'labor day lift off', 'pridefest', 'galaxyfest', 'waldo canyon', 'black forest fire', 'focus on the family', 'colorado state university',
           'cheyenne cutoff', 'bijou annex', 'ute pass grange', 'garden level', 'hancock hall', 'monument creek rec room', 'platte avenue laundromat',
           'tejon tuxedo', 'fillmore fallout', 'red rock carport', 'peterson road pump house', 'old quarry room'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The two big fires are written only as 'the fires'. */
  blocklist: ['fort carson*', 'air force academy*', 'colorado college*', 'garden of the gods*', 'pikes peak international*', 'broadmoor*', 'uccs*'],

  blurb: ['Heavy bands and a record-store stage carry this sprawled military town. Rooms are few and tend to vanish fast.',
          'The pits are real, the crowd is thin, and Denver is an hour north. Fire marshals end more spaces than rent does.'],
  hard: 'Few rooms, thin crowds, and Denver siphons the draw.',
  region: 'the Front Range',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Albuquerque', state: 'NM', lat: 35.08, lon: -106.65 },
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'metal', d: .06, reason: 'Punk and metal share bills and festival lineups here.' },
    { fan: 'metal', band: 'hardcore', d: .06, reason: 'Punk and metal share bills and festival lineups here.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Colorado Springs' },
    { id: 'manitou', kind: 'FEEDER', name: 'Manitou Springs', minutes: 10, bearing: 285, note: 'A small artsy tourist town at the mouth of the pass, with Victorian houses and steep streets.' },
    { id: 'fountain', kind: 'FEEDER', name: 'Fountain and Widefield', minutes: 15, bearing: 190, note: 'Army suburbs to the south; transient and young, with garages and driveways.' },
    { id: 'monument', kind: 'FEEDER', name: 'Monument and Palmer Lake', minutes: 25, bearing: 355, note: 'Affluent bedroom towns over the hill; the teens come down.' },
    { id: 'falcon', kind: 'FEEDER', name: 'Falcon and Peyton', minutes: 30, bearing: 75, note: 'Exurban and ranch country to the east.' },
    { id: 'woodland-park', kind: 'FEEDER', name: 'Woodland Park', minutes: 40, bearing: 290, note: 'A small mountain town; teens drive down the pass for shows.' },
    { id: 'castle-rock', kind: 'FEEDER', name: 'Castle Rock', minutes: 45, bearing: 5, note: 'A fast-growing suburb that looks to Denver more than to the Springs.' },
    { id: 'florissant', kind: 'FEEDER', name: 'Florissant and Divide', minutes: 50, bearing: 280, note: 'Mountain hamlets with a handful of kids.' },
    { id: 'canon-city', kind: 'FEEDER', name: 'Cañon City', minutes: 55, bearing: 230, note: 'A prison and canyon-tourism town with a modest scene.' },
    { id: 'cripple-creek', kind: 'FEEDER', name: 'Cripple Creek', minutes: 60, bearing: 255, note: 'A small casino town up in the mountains.' },
    { id: 'pueblo', kind: 'PEER', name: 'Pueblo', minutes: 45, bearing: 180, scene: 1000, note: 'A poorer steel city down the interstate that calls itself the real working town.' },
    { id: 'boulder', kind: 'PEER', name: 'Boulder', minutes: 100, bearing: 350, slug: 'boulder-co', note: 'A college town on the way up; it thinks the Springs is square.' },
    { id: 'fort-collins', kind: 'PEER', name: 'Fort Collins', minutes: 135, bearing: 0, slug: 'fort-collins-co', note: 'A college and brewery town with a DIY scene; bands trade, crowds do not.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'A flat grid east of the creek: bars, restaurants, old commercial buildings and a few small stages. Licensed shows.' },
    { id: 'old-colorado-city', name: 'Old Colorado City and the Westside', route: 'old-side', note: 'A historic strip of shops and bars toward the mountains, with working-class cottages behind it.' },
    { id: 'old-north-end', name: 'the Old North End', route: 'campus', note: 'Big old houses split into student and young-adult rentals, many with basements. House shows in principle.' },
    { id: 'southeast', name: 'the southeast side', route: 'work-side', note: 'Cheap, diverse, military-adjacent ranch houses and strip malls along Academy and Hancock. Garages.' },
    { id: 'ivywild', name: 'Ivywild and the near south side', route: 'old-side', note: 'Bungalows and repurposed old school and bakery buildings just south of downtown.' },
    { id: 'north-side', name: 'Briargate and the north side', route: 'campus', note: 'Newer subdivisions, big boxes and big churches. Enormous numbers of teenagers and few rooms; church youth rooms are the all-ages option.' },
    { id: 'fort-side', name: 'the south side by the post', route: 'work-side', note: 'Army families and transient renters along the interstate and Highway 85.' }
  ],

  contacts: ['denver', 'boulder-co', 'fort-collins-co', 'santa-fe-nm'],

  points: [
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99, pop: 715000 },
    { name: 'Pueblo', state: 'CO', lat: 38.25, lon: -104.61, pop: 112000 },
    { name: 'Albuquerque', state: 'NM', lat: 35.08, lon: -106.65, pop: 560000 },
    { name: 'Trinidad', state: 'CO', lat: 37.17, lon: -104.5, pop: 8000 },
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89, pop: 200000 }
  ],
  roads: ['I-25', 'US 24', 'Powers Boulevard', 'Academy Boulevard', 'Highway 83'],

  words: {
    street: ['Tejon', 'Nevada Avenue', 'Colorado Avenue', 'Academy Boulevard', 'Platte Avenue', 'Powers Boulevard', 'Cimarron'],
    water: ['Monument Creek', 'Fountain Creek', 'Ute Pass'],
    hood: ['Old Colorado City', 'Old North End', 'Ivywild', 'Briargate', 'Manitou Springs', 'Black Forest'],
    thing: ['church youth room', 'basement', 'hail dent', 'snow shovel', 'chain-up', 'ranch house', 'record store stage', 'warehouse space', 'pit', 'earplugs'],
    weather: ['hail', 'altitude', 'monument hill closure']
  }
});
