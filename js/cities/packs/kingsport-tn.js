SB.Cities.register('kingsport-tn', {
  v: 1,
  slug: 'kingsport-tn',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['eastman chemical', 'eastman', 'holston army ammunition plant', 'holston army', 'bae systems', 'lincoln memorial university', 'northeast state',
           'east tennessee state university', 'etsu', 'milligan', 'tusculum', 'university of virginia\'s college at wise', 'college at wise',
           'pal\'s sudden service', 'pal\'s', 'waffle house', 'hardee\'s', 'mountain dew', 'fun fest', 'santa train', 'rhythm and roots', 'bristol motor speedway',
           'kingsport times-news', 'times-news', 'wkpt', 'whhg', 'whgg', 'dobyns-bennett', 'dobyns bennett', 'creeper trail', 'barter theatre', 'model city',
           'the fellowship annex', 'fellowship annex', 'circle room', 'holston door', 'model city hall of records', 'the fourth shift', 'fourth shift',
           'long island social club', 'warrior\'s carport', 'lee highway roller rink', 'the pressroom at stone drive', 'greenbelt pavilion annex',
           'cliffside upstairs', 'the derby lanes', 'derby lanes'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The chemical plant is written only as 'the plant'. */
  blocklist: ['waffle house*', 'hardee*', 'dobyns*', 'fun fest*', 'santa train*', 'east tennessee state*'],

  blurb: ['A planned company town in the East Tennessee mountains where the big chemical plant sets the shifts and the church steeples set the skyline.',
          'Shows live in garages, church halls and one patient parent\'s carport. Kids drive to the college town for bigger nights and come home loyal.'],
  hard: 'Small crowd, no campus, and the bigger town down the road takes your night.',
  region: 'Appalachia',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Knoxville', state: 'TN', lat: 35.96, lon: -83.92 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Kingsport' },
    { id: 'mount-carmel', kind: 'FEEDER', name: 'Mount Carmel', minutes: 10, bearing: 270, note: 'A small town bordering Kingsport on the west; different police, same crowd.' },
    { id: 'church-hill', kind: 'FEEDER', name: 'Church Hill', minutes: 15, bearing: 265, note: 'A bedroom town up US 11W.' },
    { id: 'gate-city', kind: 'FEEDER', name: 'Gate City', state: 'VA', minutes: 15, bearing: 350, note: 'A tiny Virginia county seat across the line with a hollowed-out downtown.' },
    { id: 'bristol', kind: 'FEEDER', name: 'Bristol', minutes: 25, bearing: 80, note: 'A town split by the state line; kids cross both ways.' },
    { id: 'johnson-city', kind: 'FEEDER', name: 'Johnson City', minutes: 25, bearing: 150, slug: 'johnson-city-tn', note: 'The nearest college town, where the bigger scene is and where touring bands stop first.' },
    { id: 'rogersville', kind: 'FEEDER', name: 'Rogersville', minutes: 40, bearing: 250, note: 'An old county seat, farm and small-town.' },
    { id: 'elizabethton', kind: 'FEEDER', name: 'Elizabethton', minutes: 35, bearing: 115, note: 'A former mill town with a few devoted kids.' },
    { id: 'abingdon', kind: 'FEEDER', name: 'Abingdon', state: 'VA', minutes: 40, bearing: 65, note: 'An arts and tourist town more than a punk one.' },
    { id: 'greeneville', kind: 'FEEDER', name: 'Greeneville', minutes: 60, bearing: 215, note: 'An old Appalachian county seat with a small college nearby.' },
    { id: 'morristown', kind: 'PEER', name: 'Morristown', minutes: 60, bearing: 235, scene: 600, note: 'An industrial town with a similar feel; a plausible trading partner.' },
    { id: 'asheville', kind: 'PEER', name: 'Asheville', state: 'NC', minutes: 105, bearing: 150, slug: 'asheville-nc', note: 'Over the mountains on I-26: a famous scene, more a draw than an equal.' },
    { id: 'roanoke', kind: 'PEER', name: 'Roanoke', state: 'VA', minutes: 150, bearing: 70, slug: 'roanoke-va', note: 'Up I-81 in Virginia; a long drive but a real stop on the circuit.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Kingsport', route: 'downtown', note: 'The tidy planned center: nicest, most policed, and less tolerant of loud shows.' },
    { id: 'riverfront', name: 'the riverfront and Cliffside', route: 'work-side', note: 'Plant fences, parks and trails along the river, with warehouse and light-industrial units.' },
    { id: 'lynn-garden', name: 'Lynn Garden', route: 'old-side', note: 'Working-class streets of small old houses to the northeast; backyards and garages.' },
    { id: 'colonial-heights', name: 'Colonial Heights', route: 'campus', note: 'Suburban sprawl by the interstate: motels, chain stops, garages and older basements.' },
    { id: 'stone-drive', name: 'the Stone Drive strip', route: 'work-side', note: 'Dying retail strips where vacant units could be cheap practice or show space.' },
    { id: 'orebank', name: 'Orebank and Fairacres', route: 'old-side', note: 'Ordinary mixed-age streets with carports and close neighbors.' },
    { id: 'bloomingdale', name: 'Bloomingdale and the county edge', route: 'campus', note: 'Rural-suburban land, barns and yards with no neighbors in earshot.' }
  ],

  contacts: ['johnson-city-tn', 'asheville-nc', 'roanoke-va'],

  points: [
    { name: 'Knoxville', state: 'TN', lat: 35.96, lon: -83.92, pop: 900000 },
    { name: 'Asheville', state: 'NC', lat: 35.6, lon: -82.55, pop: 470000 },
    { name: 'Roanoke', state: 'VA', lat: 37.27, lon: -79.94, pop: 315000 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 2700000 }
  ],
  roads: ['I-26', 'I-81', 'US 23', 'US 11W', 'I-181'],

  words: {
    street: ['Stone Drive', 'Fort Henry Drive', 'Broad Street', 'Lee Highway', 'the Quillen Parkway'],
    water: ['the Holston', 'the South Fork', 'Boone Lake'],
    hood: ['Lynn Garden', 'Colonial Heights', 'Orebank', 'Fairacres', 'Cliffside', 'Allandale', 'Bloomingdale', 'Riverview'],
    thing: ['shift change', 'pinto beans and cornbread', 'drive-through', 'church camp', 'fellowship hall', 'stack', 'greenbelt', 'carpool', 'football Friday'],
    weather: ['mountain fog', 'ice storm']
  }
});
