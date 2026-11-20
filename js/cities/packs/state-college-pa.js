SB.Cities.register('state-college-pa', {
  v: 1,
  slug: 'state-college-pa',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['penn state', 'pennsylvania state university', 'beaver stadium', 'blue-white game', 'thon', 'central pennsylvania festival of the arts',
           'centre county grange', 'grange fair', 'grange encampment', 'sheetz', 'cata', 'nittany lions', 'nittany lion', 'whiteout',
           'lock haven university', 'juniata college', 'bucknell', 'bloomsburg university', 'lycoming college', 'penn college', 'little league world series',
           'university of pittsburgh at johnstown', 'happy valley latin festival', 'first night state college', 'fall fest',
           'mount nittany annex', 'the pump house', 'the orchard basement', 'the ridge street rec room', 'nittany valley grange', 'the sub basement',
           'bald eagle fire company social hall', 'the greenhouse room', 'hollow road hall', 'the cheese shop loft'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real institutions appear only as generic phrases in game text. */
  blocklist: ['penn state*', 'beaver stadium*', 'sheetz*', 'nittany lion*', 'bucknell*', 'grange fair*', 'thon*'],

  blurb: ['A huge college town with a small punk pocket, reset by every lease and every football Saturday.',
          'Rooms last a year, then the seniors graduate. Summers are empty.'],
  hard: 'Students leave in summer and football eats the fall Saturdays.',
  region: 'central Pennsylvania',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80.00 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'State College' },
    { id: 'boalsburg', kind: 'FEEDER', name: 'Boalsburg', minutes: 10, bearing: 115, note: 'A historic farm village with few shows of its own.' },
    { id: 'pine-grove-mills', kind: 'FEEDER', name: 'Pine Grove Mills and Port Matilda', minutes: 20, bearing: 255, note: 'Villages to the south and west where a hall show is possible.' },
    { id: 'bellefonte', kind: 'FEEDER', name: 'Bellefonte', minutes: 20, bearing: 50, note: 'An old Victorian county seat with big old buildings: the likeliest cheap rentable hall, and a low-key scene of its own.', bands: 1 },
    { id: 'tyrone', kind: 'FEEDER', name: 'Tyrone', minutes: 40, bearing: 225, note: 'A paper-mill town; the kids drive out to State College.' },
    { id: 'philipsburg', kind: 'FEEDER', name: 'Philipsburg', minutes: 40, bearing: 295, note: 'A former coal and glass town up the road.' },
    { id: 'lewistown', kind: 'FEEDER', name: 'Lewistown', minutes: 45, bearing: 145, note: 'An old industrial county seat ringed by Amish and Mennonite farmland.' },
    { id: 'clearfield', kind: 'FEEDER', name: 'Clearfield', minutes: 50, bearing: 305, note: 'A county seat by the interstate, where kids from the northern corridor come in.' },
    { id: 'lock-haven', kind: 'FEEDER', name: 'Lock Haven', minutes: 50, bearing: 30, note: 'A small college town on the river with a modest scene of its own, and a flood town.', bands: 1 },
    { id: 'huntingdon', kind: 'FEEDER', name: 'Huntingdon', minutes: 55, bearing: 180, note: 'A small college town to the south; a tiny scene likely.' },
    { id: 'altoona', kind: 'PEER', name: 'Altoona', minutes: 45, bearing: 220, scene: 600, note: 'A former railroad city and the nearest peer; bands trade back and forth and it is the cheaper show.' },
    { id: 'williamsport', kind: 'PEER', name: 'Williamsport', minutes: 75, bearing: 55, scene: 450, note: 'A modest scene of its own with two colleges; people drive between the two for shows.' },
    { id: 'johnstown', kind: 'PEER', name: 'Johnstown', minutes: 90, bearing: 240, scene: 350, note: 'A fallen steel town in a flood valley: smaller and grittier.' },
    { id: 'harrisburg', kind: 'PEER', name: 'Harrisburg', minutes: 105, bearing: 115, slug: 'harrisburg-pa', note: 'A bigger state-capital scene, and the way east to the I-81 corridor.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Bars, bookstores and alleys between campus and Beaver Avenue, with tall student apartments replacing small cheap buildings.' },
    { id: 'highlands', name: 'the Highlands', route: 'old-side', note: 'The biggest neighborhood: big old rented houses with basements near campus, a long-time house-show zone tolerated until a landlord or neighbor complains.' },
    { id: 'college-heights', name: 'College Heights and Holmes-Foster', route: 'old-side', note: 'Quiet, expensive blocks of faculty and retirees where neighbors call early.' },
    { id: 'west-end', name: 'the West End', route: 'campus', note: 'Newer apartment complexes, strip commercial and light industrial buildings that rent cheap for practice rooms.' },
    { id: 'south-end', name: 'the South End', route: 'work-side', note: 'Small old houses of townies and older workers, with backyards, garages and the odd porch show.' },
    { id: 'orchard-park', name: 'Orchard Park and Penfield', route: 'campus', note: 'Suburban-style apartments and families toward the borough edge; living-room shows at most.' }
  ],

  contacts: ['harrisburg-pa'],

  points: [
    { name: 'Altoona', state: 'PA', lat: 40.52, lon: -78.39, pop: 44000 },
    { name: 'Williamsport', state: 'PA', lat: 41.24, lon: -77.00, pop: 28000 },
    { name: 'Johnstown', state: 'PA', lat: 40.33, lon: -78.92, pop: 18000 }
  ],
  roads: ['I-99', 'I-80', 'US 322', 'US 220', 'PA 26', 'PA 45'],

  words: {
    street: ['College Avenue', 'Beaver Avenue', 'Allen Street', 'Atherton Street', 'Park Avenue', 'Westerly Parkway'],
    water: ['Spring Creek', 'the Bald Eagle Valley', 'Bald Eagle Creek'],
    hood: ['the Highlands', 'Orchard Park', 'Holmes-Foster', 'College Heights', 'Boalsburg', 'Lemont', 'Pine Grove Mills', 'Park Forest', 'Happy Valley'],
    thing: ['rent by the bedroom', 'tailgate', 'ridge road', 'hollow', 'move-out curb', 'Amish buggy', 'fire company hall', 'lease', 'football Saturday'],
    weather: ['lake effect', 'ridge fog']
  }
});
