SB.Cities.register('santa-fe-nm', {
  v: 1,
  slug: 'santa-fe-nm',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['the city different', 'zozobra', 'old man gloom', 'fiestas de santa fe', 'fiestas', 'indian market', 'spanish market', 'spanish colonial market',
           'international folk art market', 'folk art market', 'chamber music festival', 'desert chorale', 'santa fe opera', 'farolito walk',
           'rail runner', 'amtrak', 'southwest chief', 'santa fe trails', 'ksfr', 'santa fe new mexican', 'new mexican', 'pasatiempo', 'santa fe reporter',
           'new mexico magazine', 'green fire times', 'st. john\'s college', 'institute of american indian arts', 'iaia', 'santa fe community college',
           'college of santa fe', 'santa fe university of art and design', 'unm', 'university of new mexico', 'highlands university', 'kirtland air force base',
           'kirtland', 'santa fe high', 'capital high', 'indian school', 'st. michael\'s high', 'franklin miles park', 'fort marcy park', 'meow wolf',
           'los alamos national laboratory',
           'the dry river room', 'dry river room', 'spur line hall', 'second street cold storage', 'the tin roof annex', 'tin roof annex', 'casita nueve',
           'the pinon smoke', 'the piñon smoke', 'ristra house', 'rufina yard', 'the old acequia grange', 'old acequia grange', 'cottonwood post 112',
           'the adobe bell', 'adobe bell', 'siler bay 4', 'vfw', 'american legion'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['zozobra*', 'meow wolf*', 'santa fe opera*', 'rail runner*', 'ksfr*', 'santa fe reporter*', 'indian market*', 'cottonwood post*'],

  blurb: ['Shows happen in yards, dirt lots, warehouse bays and bar back rooms under a huge sky, a few dozen friends at a time.',
          'Touring bands skip town for the bigger city an hour south, so locals fill every bill.'],
  hard: 'Touring bands skip you for the bigger town an hour south.',
  region: 'the high desert',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Albuquerque', state: 'NM', lat: 35.08, lon: -106.65 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Phoenix', state: 'AZ', lat: 33.45, lon: -112.07 },
    { name: 'El Paso', state: 'TX', lat: 31.76, lon: -106.49 },
    { name: 'Tucson', state: 'AZ', lat: 32.22, lon: -110.97 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Santa Fe' },
    { id: 'pojoaque', kind: 'FEEDER', name: 'Pojoaque, Nambé, Tesuque and Chimayó', minutes: 25, bearing: 355, note: 'Pueblo and village communities just north; the Good Friday pilgrimage fills the road.' },
    { id: 'espanola', kind: 'FEEDER', name: 'Española', minutes: 25, bearing: 340, note: 'The first town a local names: lowrider country, proud and poor, with a metal and Chicano punk thread.' },
    { id: 'lamy', kind: 'FEEDER', name: 'Lamy and Galisteo', minutes: 25, bearing: 170, note: 'Tiny rural villages to the south. Few kids, and every one of them drives.' },
    { id: 'madrid', kind: 'FEEDER', name: 'Madrid and Cerrillos', minutes: 35, bearing: 215, note: 'Old coal towns on the Turquoise Trail, now art villages with a rural weirdo crowd.' },
    { id: 'pecos', kind: 'FEEDER', name: 'Pecos', minutes: 35, bearing: 95, note: 'A small village up the river past Glorieta Pass; kids come in for shows.' },
    { id: 'edgewood', kind: 'FEEDER', name: 'Edgewood and Moriarty', minutes: 45, bearing: 200, note: 'Ranch-country commuter towns south on the interstate.' },
    { id: 'los-alamos', kind: 'FEEDER', name: 'Los Alamos', minutes: 50, bearing: 320, note: 'The lab town "up the Hill": well-off, nerdy, with a rock and metal crowd and a rivalry with Santa Fe.' },
    { id: 'bernalillo', kind: 'FEEDER', name: 'Bernalillo', minutes: 50, bearing: 215, note: 'An old river town at the edge of the big city\'s northern suburbs.' },
    { id: 'las-vegas', kind: 'FEEDER', name: 'Las Vegas', state: 'NM', minutes: 60, bearing: 60, note: 'A railroad and college town on the interstate with a small scene of its own.' },
    { id: 'rio-rancho', kind: 'PEER', name: 'Rio Rancho', minutes: 60, bearing: 220, scene: 300, note: 'A huge mesa suburb whose kids mostly go to the big city.' },
    { id: 'taos', kind: 'PEER', name: 'Taos', minutes: 90, bearing: 15, scene: 80, note: 'A small art-colony town north through the canyon, folk-heavy and punk-leaning.' }
  ],

  hoods: [
    { id: 'southside', name: 'the Southside', route: 'work-side', note: 'Big boxes, motels, strip malls and trailer parks along Cerrillos Road. Working-class, cheap by local standards, and tolerated.' },
    { id: 'railyard', name: 'the Railyard', route: 'downtown', note: 'A former rail yard turned arts district. Where all-ages music used to live; now priced out and polished.' },
    { id: 'siler', name: 'Siler and Rufina', route: 'work-side', note: 'Warehouses, auto shops and taprooms southwest of the Railyard. Practice bays and warehouse shows, heating up fast.' },
    { id: 'midtown', name: 'Midtown', route: 'campus', note: 'Empty campus buildings, shabby apartments and rental houses around the closed arts college. In limbo.' },
    { id: 'agua-fria', name: 'Agua Fria', route: 'old-side', note: 'An old farming village with big walled lots, ditches and family compounds. Hands-off, and the best bet for a yard show.' },
    { id: 'casa-solana', name: 'Casa Solana', route: 'old-side', note: 'Quiet postwar ranch houses on the northwest side. Garage shows in a good year, then the neighbors call.' },
    { id: 'plaza', name: 'the Plaza and Canyon Road', route: 'downtown', note: 'The historic core and the wealthy east side. Nothing here is cheap, and a review board polices everything.' },
    { id: 'eldorado', name: 'Eldorado and Rancho Viejo', route: 'work-side', note: 'Retiree subdivisions on the county fringe. Mostly huge lots and somebody\'s parents\' garage.' }
  ],

  contacts: [],

  points: [
    { name: 'Albuquerque', state: 'NM', lat: 35.08, lon: -106.65, pop: 560000 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99, pop: 715000 },
    { name: 'Raton', state: 'NM', lat: 36.9, lon: -104.44, pop: 6000 },
    { name: 'Las Cruces', state: 'NM', lat: 32.31, lon: -106.78, pop: 112000 }
  ],
  roads: ['I-25', 'US 84', 'US 285', 'St. Francis Drive', 'Cerrillos Road', 'NM 14'],

  words: {
    street: ['St. Francis Drive', 'Cerrillos Road', 'Agua Fria Street', 'Airport Road', 'Rodeo Road', 'Paseo de Peralta'],
    water: ['the Santa Fe River', 'the Rio Grande', 'the Pecos River'],
    hood: ['the Railyard', 'Casa Solana', 'Agua Fria', 'Siler', 'Midtown', 'the Southside', 'Eldorado', 'Rancho Viejo'],
    thing: ['arroyo', 'adobe wall', 'green chile', 'breakfast burrito', 'casita', 'lowrider', 'swamp cooler', 'generator', 'dirt lot', 'sopaipilla', 'guest house', 'carport', 'altitude', 'snowy pass'],
    weather: ['monsoon', 'afternoon lightning', 'fire ban', 'dust storm']
  }
});
