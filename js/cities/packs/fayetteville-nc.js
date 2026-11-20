SB.Cities.register('fayetteville-nc', {
  v: 1,
  slug: 'fayetteville-nc',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['fort bragg', 'fort liberty', 'pope field', 'fayetteville state university', 'methodist university', 'fayetteville technical community college',
           'shaw university', 'dogwood festival', 'international folk festival', 'folk festival', '4th fridays', 'fourth fridays', 'market house',
           'fayetteville observer', 'up & coming weekly', 'up and coming weekly', 'carolina league', 'waffle house', 'cook out', 'cookout', 'bojangles',
           'biscuitville', 'cheerwine', 'texas pete', 'walmart', 'fayettenam', 'america\'s can do city', 'all-american city', 'city of dogwoods', 'soldier city',
           'vfw', 'american legion', 'pinestraw annex', 'cross creek cellar', 'the carport at vance drive', 'sandhills social hall', 'mill pond room',
           'parachute row', 'dogwood loading dock', 'hay street backroom', 'cape fear annex', 'the quartermaster', 'slab and pine', 'bragg road storage bay 14'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The base is written only as 'the post' or 'the base'. */
  blocklist: ['fort bragg*', 'fort liberty*', 'dogwood festival*', 'fayetteville observer*', 'up & coming*', 'waffle house*', 'cook out*', 'bojangles*'],

  blurb: ['An Army town where metal benefits in rented halls and a worn-out DIY crew keep the scene going. A bill is a handful of local bands, usually with the same faces in the crowd.',
          'There is no steady all-ages room. The good bands play bigger bills up the road.'],
  hard: 'No steady all-ages room; shows are one-off hall rentals.',
  region: 'the Carolinas',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64 },
    { name: 'Durham', state: 'NC', lat: 35.99, lon: -78.90 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Fayetteville' },
    { id: 'hope-mills', kind: 'FEEDER', name: 'Hope Mills', minutes: 15, bearing: 225, note: 'A lake-and-mill bedroom suburb to the southwest; the first town a local names.' },
    { id: 'spring-lake', kind: 'FEEDER', name: 'Spring Lake', minutes: 20, bearing: 310, note: 'A small town nearly all post-adjacent, soldier-heavy and stretched thin.' },
    { id: 'raeford', kind: 'FEEDER', name: 'Raeford', minutes: 30, bearing: 265, note: 'A farm and base county seat to the west on US 401.' },
    { id: 'dunn', kind: 'FEEDER', name: 'Dunn', minutes: 30, bearing: 15, note: 'An interstate and farm-country town up I-95.' },
    { id: 'lillington', kind: 'FEEDER', name: 'Lillington', minutes: 40, bearing: 340, note: 'A river-and-farm county seat to the north.' },
    { id: 'lumberton', kind: 'FEEDER', name: 'Lumberton', minutes: 40, bearing: 200, note: 'Bigger and poorer, down I-95; flooded often in storms.' },
    { id: 'pembroke', kind: 'FEEDER', name: 'Pembroke', minutes: 45, bearing: 235, note: 'A university town and the center of its own tribal community, with a distinct local culture.' },
    { id: 'sanford', kind: 'FEEDER', name: 'Sanford', minutes: 45, bearing: 330, note: 'A small brick-and-pottery city with a link to the Triangle.' },
    { id: 'southern-pines', kind: 'FEEDER', name: 'Southern Pines and Pinehurst', minutes: 45, bearing: 295, note: 'Golf-resort Sandhills towns; richer kids, the exception to broke.' },
    { id: 'clinton', kind: 'FEEDER', name: 'Clinton', minutes: 45, bearing: 90, note: 'A farm town to the east.' },
    { id: 'elizabethtown', kind: 'FEEDER', name: 'Elizabethtown', minutes: 45, bearing: 150, note: 'A small river town down NC 87.' },
    { id: 'wilmington', kind: 'PEER', name: 'Wilmington', minutes: 90, bearing: 140, slug: 'wilmington-nc', note: 'The cooler coastal town, with a bigger and steadier small-room scene.' },
    { id: 'greenville', kind: 'PEER', name: 'Greenville', minutes: 90, bearing: 65, scene: 800, note: 'An east Carolina college town with its own crowd.' },
    { id: 'greensboro', kind: 'PEER', name: 'Greensboro', minutes: 105, bearing: 325, slug: 'greensboro-nc', note: 'Larger but similar in character, up I-85.' },
    { id: 'columbia', kind: 'PEER', name: 'Columbia', state: 'SC', minutes: 135, bearing: 235, slug: 'columbia-sc', note: 'A fair match in size, down to the southwest.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Hay Street', route: 'downtown', note: 'The old soldier-bar strip, now a managed revival of stages, patios and a ballpark; clean, and tight on rough rooms.' },
    { id: 'haymount', name: 'Haymount', route: 'old-side', note: 'A leafy hill of big old houses near the hospital; the closest thing to a bohemian street, if the neighbors allow it.' },
    { id: 'murchison', name: 'the Murchison Road corridor', route: 'campus', note: 'Cheap ranch houses and apartments around a historic Black university; church halls and campus events.' },
    { id: 'bragg-blvd', name: 'Bragg Boulevard and Ramsey Street', route: 'work-side', note: 'The gate-town strip of pawn shops, tattoo shops and bars; storage-unit practice spaces and constant turnover.' },
    { id: 'west-side', name: 'Raeford Road and Skibo Road', route: 'campus', note: 'Chain-store sprawl and subdivisions where the suburban kid lives with a carport or garage.' },
    { id: 'massey-hill', name: 'Massey Hill and the south side', route: 'work-side', note: 'An old mill neighborhood of small houses and shuttered buildings; backyards and warehouses.' },
    { id: 'eastern', name: 'Eastern Boulevard and the I-95 side', route: 'work-side', note: 'Motels, truck stops and light industry with few neighbors to complain.' }
  ],

  contacts: ['wilmington-nc', 'greensboro-nc', 'columbia-sc', 'durham-nc'],

  points: [
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64, pop: 470000 },
    { name: 'Florence', state: 'SC', lat: 34.20, lon: -79.76, pop: 40000 },
    { name: 'Charleston', state: 'SC', lat: 32.78, lon: -79.93, pop: 150000 },
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44, pop: 230000 }
  ],
  roads: ['I-95', 'I-295', 'US 401', 'NC 24', 'NC 87', 'Raeford Road'],

  words: {
    street: ['Hay Street', 'Bragg Boulevard', 'Ramsey Street', 'Raeford Road', 'Skibo Road', 'Cliffdale Road', 'Murchison Road'],
    water: ['the Cape Fear', 'Cross Creek', 'Hope Mills Lake'],
    hood: ['Haymount', 'Massey Hill', 'Hope Mills', 'Spring Lake', 'Cross Creek'],
    thing: ['carport', 'slab house', 'longleaf pine', 'storage unit', 'dogwood', 'barracks', 'sweet tea', 'rented hall', 'benefit show', 'pub stage', 'newsletter'],
    weather: ['afternoon thunderstorm', 'river flood']
  }
});
