SB.Cities.register('daytona-beach-fl', {
  v: 1,
  slug: 'daytona-beach-fl',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['bethune-cookman', 'bethune-cookman university', 'daytona state college', 'embry-riddle', 'embry-riddle aeronautical university', 'ucf daytona beach',
           'daytona international speedway', 'daytona 500', 'speedweeks', 'rolex 24', 'coke zero sugar 400', 'coke zero', 'bike week', 'biketoberfest',
           'daytona beach news-journal', 'news-journal', 'waffle house', 'publix', 'vfw', 'american legion', 'elks', 'orlando weekly',
           'sandspur hall', 'the weekly rate', 'fourth turn social club', 'coquina annex', 'pit wall', 'no vacancy pool court', 'lot nine',
           'wash and fold room', 'brake dust', 'the lanai', 'ridgewood bay seven', 'gate c garage', 'volusia county', 'main street pier',
           'daytona beach bandshell', 'ocean center', 'nascar', 'rideshare', 'uber', 'lyft'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real institutions are written only in generic form. */
  blocklist: ['daytona international*', 'bike week*', 'biketoberfest*', 'news-journal*', 'waffle house*', 'sandspur hall*', 'embry-riddle*', 'bethune*'],

  blurb: ['A tourist town where a show is a bar bill: heavy and pop-punk bands in pubs and a pizza-and-brewery room, between tribute nights.',
          'Race and bike weeks swamp the small shows, and the storms and redevelopment keep taking the cheap buildings.'],
  hard: 'Bar rooms with covers and age limits, and the storms take the cheap buildings.',
  region: 'the Florida coast',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38 },
    { name: 'Jacksonville', state: 'FL', lat: 30.33, lon: -81.66 },
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Miami', state: 'FL', lat: 25.76, lon: -80.19 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Daytona Beach' },
    { id: 'ormond-beach', kind: 'FEEDER', name: 'Ormond Beach', minutes: 15, bearing: 5, note: 'A wealthier, older suburb to the north; some local kids, no scene of its own.' },
    { id: 'port-orange', kind: 'FEEDER', name: 'Port Orange', minutes: 15, bearing: 190, note: 'A big family suburb to the south with small garage-band culture.' },
    { id: 'new-smyrna-beach', kind: 'FEEDER', name: 'New Smyrna Beach', minutes: 25, bearing: 185, note: 'A surf and arts town with an independent streak and some pride.', bands: 2 },
    { id: 'deltona', kind: 'FEEDER', name: 'Deltona', minutes: 35, bearing: 250, note: 'A huge planned bedroom suburb full of young kids with no way to a show.' },
    { id: 'deland', kind: 'FEEDER', name: 'DeLand', minutes: 35, bearing: 265, note: 'A county seat and small college town with an old downtown and a few bands.', bands: 2 },
    { id: 'flagler-beach', kind: 'FEEDER', name: 'Flagler Beach', minutes: 35, bearing: 355, note: 'A small beach town up A1A.' },
    { id: 'edgewater', kind: 'FEEDER', name: 'Edgewater', minutes: 35, bearing: 180, note: 'A quiet working-class town down US 1.' },
    { id: 'palm-coast', kind: 'FEEDER', name: 'Palm Coast', minutes: 45, bearing: 355, note: 'A large planned suburb of retirees and families; no real scene.' },
    { id: 'titusville', kind: 'FEEDER', name: 'Titusville', minutes: 55, bearing: 175, note: 'A Space Coast town tied to the space industry.' },
    { id: 'st-augustine', kind: 'PEER', name: 'St. Augustine', minutes: 70, bearing: 345, scene: 500, note: 'A smaller tourist and arts town that trades kids for weekend shows.' },
    { id: 'palm-bay', kind: 'PEER', name: 'Melbourne and Palm Bay', minutes: 75, bearing: 180, slug: 'palm-bay-fl', note: 'A similar-size Space Coast scene with its own punk and metal; an easy trade of bands.' },
    { id: 'ocala', kind: 'PEER', name: 'Ocala', minutes: 80, bearing: 275, slug: 'ocala-fl', note: 'Horse country with a smaller scene, through the forest on SR 40.' },
    { id: 'gainesville', kind: 'PEER', name: 'Gainesville', minutes: 120, bearing: 310, slug: 'gainesville-fl', note: 'The state\'s best-known college punk town: more a destination than a peer.' }
  ],

  hoods: [
    { id: 'beachside', name: 'the beachside strip', route: 'downtown', note: 'Bars, arcades, tattoo shops and weekly-rate motels on A1A and the boardwalk; cheap in the back streets, priced out near the new condos.' },
    { id: 'seabreeze', name: 'Seabreeze', route: 'downtown', note: 'Older houses, restaurants and small bars on the island with an old-Florida feel.' },
    { id: 'downtown', name: 'downtown and the riverfront', route: 'old-side', note: 'Old brick storefronts at the foot of the main bridge, with ground floors that open and close.' },
    { id: 'midtown', name: 'Midtown', route: 'old-side', note: 'A long-underinvested neighborhood of churches, small shops and real history around the historically Black university. Not a district to treat as cheap space.' },
    { id: 'ridgewood', name: 'the Ridgewood corridor', route: 'work-side', note: 'Strip malls, pawn shops, car lots and block commercial buildings along US 1; cheap bays and practice rooms.' },
    { id: 'speedway', name: 'the speedway and airport zone', route: 'campus', note: 'Chain hotels, parking lots, students and a speedway; few places can host and everything shuts for race weeks.' },
    { id: 'holly-hill', name: 'Holly Hill', route: 'work-side', note: 'A small, rough-edged town just north where garages hold practices and backyard shows.' },
    { id: 'south-suburbs', name: 'the southern suburbs', route: 'campus', note: 'Family suburban streets with garages to the south.' }
  ],

  contacts: ['palm-bay-fl', 'ocala-fl', 'gainesville-fl', 'lakeland-fl'],

  points: [
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38, pop: 310000 },
    { name: 'Jacksonville', state: 'FL', lat: 30.33, lon: -81.66, pop: 950000 },
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46, pop: 400000 },
    { name: 'Savannah', state: 'GA', lat: 32.08, lon: -81.09, pop: 147000 }
  ],
  roads: ['I-95', 'I-4', 'US 1', 'A1A', 'SR 44', 'SR 40'],

  words: {
    street: ['Ridgewood Avenue', 'Seabreeze Boulevard', 'International Speedway Boulevard', 'Beach Street', 'A1A', 'Granada Boulevard'],
    water: ['the Halifax', 'the Intracoastal', 'the Atlantic', 'the Tomoka'],
    hood: ['Seabreeze', 'Midtown', 'Holly Hill', 'Beachside', 'Ormond Beach', 'Port Orange'],
    thing: ['weekly-rate motel', 'carport', 'lanai', 'boiled peanuts', 'Cuban sandwich', 'tiki bar', 'moped', 'pizza stage', 'cover charge', 'tribute night'],
    weather: ['afternoon thunderstorm', 'storm watch', 'humidity']
  }
});
