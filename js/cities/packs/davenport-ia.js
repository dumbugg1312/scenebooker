SB.Cities.register('davenport-ia', {
  v: 1,
  slug: 'davenport-ia',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  /* The dossier's real institutions and its invented venue names are in banned: research, not content. */
  banned: ['rock island arsenal', 'arsenal', 'john deere', 'deere', 'hy-vee', 'von maur', 'lee enterprises', 'happy joe\'s', 'st. ambrose university', 'st. ambrose',
           'palmer college', 'augustana college', 'black hawk college', 'western illinois university', 'university of iowa', 'hawkeyes', 'hawkeye',
           'iowa hawkeyes', 'quad city river bandits', 'river bandits', 'bix beiderbecke', 'bix 7', 'bix', 'great mississippi valley fair',
           'mississippi valley blues festival', 'river roots live', 'american legion', 'vfw', 'the levee room', 'locks and dam social club',
           'hamburg hardware basement', 'post 4417', 'the floodplain', 'duck creek mill room', 'kimberly road roller rink annex', 'the pearl button annex',
           'bridge approach', 'north park loading dock', 'credit island boathouse', 'st. boniface parish hall', 'quad city times', 'quad-city times'],
  blocklist: ['hy-vee*', 'von maur*', 'happy joe*', 'river roots*', 'levee room*', 'floodplain*'],

  blurb: ['Two banks, one small crowd. Shows are bar rooms and reunions, with a few old lifers and a few kids.',
          'Metal packs the big rooms and punk lives on label nights. The old basement days live mostly in memory.'],
  hard: 'Rooms come and go, and the best crowds split across the river.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 },
    { name: 'Des Moines', state: 'IA', lat: 41.59, lon: -93.62 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'metal', d: .07, reason: 'Metalcore and hardcore-metal bills fill the big rooms and draw the kids.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Davenport' },
    { id: 'bettendorf', kind: 'FEEDER', name: 'Bettendorf', minutes: 10, bearing: 80, note: 'The richer suburb next door with a big high school and little DIY.' },
    { id: 'walcott', kind: 'FEEDER', name: 'Wilton and Walcott', minutes: 20, bearing: 285, note: 'A farm town and a truck-stop town along the interstate.' },
    { id: 'muscatine', kind: 'FEEDER', name: 'Muscatine', minutes: 30, bearing: 250, pop: 23000, note: 'A factory and food-processing river town with a small scene on and off.' },
    { id: 'dewitt', kind: 'FEEDER', name: 'DeWitt', minutes: 30, bearing: 30, note: 'Farm and commuter town up US 61.' },
    { id: 'geneseo', kind: 'FEEDER', name: 'Geneseo', state: 'IL', minutes: 30, bearing: 100, note: 'A commuter-farm town whose high school supplies bands.', bands: 1 },
    { id: 'clinton', kind: 'FEEDER', name: 'Clinton', minutes: 50, bearing: 40, pop: 24000, note: 'A struggling river and industry town; the shows are small.' },
    { id: 'maquoketa', kind: 'FEEDER', name: 'Maquoketa', minutes: 55, bearing: 15, note: 'A small farm town up US 61.' },
    { id: 'galesburg', kind: 'FEEDER', name: 'Galesburg', state: 'IL', minutes: 60, bearing: 150, pop: 30000, note: 'A railroad and college town with a small scene.', bands: 1 },
    { id: 'iowa-city', kind: 'PEER', name: 'Iowa City', minutes: 50, bearing: 275, slug: 'iowa-city-ia', note: 'Smaller, but the better-known scene; it steals both crowds and tours.' },
    { id: 'cedar-rapids', kind: 'PEER', name: 'Cedar Rapids', minutes: 75, bearing: 300, slug: 'cedar-rapids-ia', note: 'Slightly larger; bands and crowds trade both ways.' },
    { id: 'peoria', kind: 'PEER', name: 'Peoria', state: 'IL', minutes: 105, bearing: 135, slug: 'peoria-il', note: 'A similar river and industry town down I-74.' },
    { id: 'rockford', kind: 'PEER', name: 'Rockford', state: 'IL', minutes: 120, bearing: 80, slug: 'rockford-il', note: 'Slightly bigger with a similar working-class identity.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the riverfront', route: 'downtown', note: 'Old brick blocks with bars below and apartments above; quiet on weeknights, and the river is the threat.' },
    { id: 'hamburg', name: 'Hamburg and the hill', route: 'old-side', note: 'The old German district: big brick houses cut into apartments, church halls and basements.' },
    { id: 'east-end', name: 'East Davenport and the east end', route: 'old-side', note: 'A charming river strip and tidy homes. Priced up and noise-averse; shows here are one-offs.' },
    { id: 'central', name: 'Central and the park district', route: 'old-side', note: 'Large old houses, some grand and some tired, around a big park. Cheap in places.' },
    { id: 'west-end', name: 'the West End', route: 'work-side', note: 'Warehouses, taverns and small houses with big yards and basements. Cheap and ignored, which is why it works.' },
    { id: 'kimberly', name: 'Northwest and Kimberly Road', route: 'campus', note: 'Malls, big boxes and subdivisions: suburban kids, skate parks and pizza-place back rooms.' },
    { id: 'north-davenport', name: 'North Davenport and Duck Creek', route: 'work-side', note: 'Plants, rail and light industry; practice spaces in old buildings.' },
    { id: 'across-river', name: 'Rock Island and Moline', route: 'downtown', note: 'The Illinois bank, with its own bar districts and rules; many shows land here.' }
  ],

  contacts: ['iowa-city-ia', 'cedar-rapids-ia', 'peoria-il', 'rockford-il'],

  points: [
    { name: 'Des Moines', state: 'IA', lat: 41.59, lon: -93.62, pop: 214000 },
    { name: 'Dubuque', state: 'IA', lat: 42.5, lon: -90.66, pop: 59000 },
    { name: 'Madison', state: 'WI', lat: 43.07, lon: -89.4, pop: 270000 },
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93, pop: 485000 }
  ],
  roads: ['I-80', 'I-74', 'I-280', 'US 61', 'US 67', 'Locust Street'],

  words: {
    street: ['Brady Street', 'Locust Street', 'Kimberly Road', 'Rockingham Road', 'Harrison Street', 'Division Street'],
    water: ['the Mississippi', 'Duck Creek', 'Credit Island'],
    hood: ['Hamburg', 'East Davenport', 'the West End', 'Fairmount', 'North Park', 'Rock Island', 'Moline', 'Bettendorf', 'Le Claire'],
    thing: ['tenderloin', 'loose meat', 'barge', 'lock and dam', 'foursquare', 'tow boat', 'grain elevator', 'arts bar', 'crowd-funding drive', 'barn show'],
    weather: ['river stage', 'tornado siren', 'wind chill']
  }
});
