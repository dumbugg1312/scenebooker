SB.Cities.register('harrisonburg-va', {
  v: 1,
  slug: 'harrisonburg-va',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['james madison university', 'jmu', 'eastern mennonite university', 'bridgewater college', 'university of virginia', 'uva', 'virginia tech',
           'virginia military institute', 'washington and lee', 'the breeze', 'daily news-record', 'daily news record', 'whsv', 'wxjm', 'wmra',
           'waffle house', 'sheetz', 'wawa', 'cook out', 'parents\' weekend', 'parents weekend', 'blacks run annex', 'the scale house',
           'valley pike parlor', 'switchyard hall', 'granary row', 'the cold room', 'massanutten room', 'feed store back room',
           'shenandoah lodge no. 9', 'the hatch house', 'pike street garage', 'turkey hill grange', 'vfw', 'american legion'],
  /* Dossier institutions and its unchecked invented venue names are banned: research, not content. */
  blocklist: ['jmu*', 'james madison*', 'whsv*', 'wxjm*', 'scale house*', 'hatch house*', 'granary row*', 'switchyard hall*'],

  blurb: ['Students, farm kids and a few lifers share the same basements. When the semester ends, half the scene drives home.',
          'Shows live in rented houses and county halls, and the landlord is the real headliner.'],
  hard: 'Student turnover and strict landlords keep the good rooms short-lived.',
  region: 'the Valley',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Harrisonburg' },
    { id: 'bridgewater', kind: 'FEEDER', name: 'Bridgewater and Dayton', minutes: 15, bearing: 195, note: 'A small college town and a farm town just south; a few students and kids.' },
    { id: 'broadway', kind: 'FEEDER', name: 'Broadway and Timberville', minutes: 20, bearing: 350, note: 'Poultry and farm towns whose high-school kids ride in for shows.' },
    { id: 'elkton', kind: 'FEEDER', name: 'Elkton', minutes: 25, bearing: 90, note: 'A small mill and farm town at the foot of the Blue Ridge.' },
    { id: 'staunton', kind: 'FEEDER', name: 'Staunton', minutes: 35, bearing: 200, note: 'A small arts-minded city with its own music and theater; more peer than feeder.', bands: 2 },
    { id: 'luray', kind: 'FEEDER', name: 'Luray', minutes: 40, bearing: 55, note: 'A tourist town over Massanutten Mountain on US 211.' },
    { id: 'waynesboro', kind: 'FEEDER', name: 'Waynesboro', minutes: 45, bearing: 175, note: 'A blue-collar small city with metal and punk kids.', lean: ['metal', 'hardcore'] },
    { id: 'woodstock', kind: 'FEEDER', name: 'Woodstock and Strasburg', minutes: 50, bearing: 20, note: 'Small Valley towns up I-81; Strasburg leans toward Winchester.' },
    { id: 'moorefield', kind: 'FEEDER', name: 'Moorefield and Petersburg', state: 'WV', minutes: 75, bearing: 305, note: 'Farm and mountain towns; kids cross the mountains on US 33 for shows.' },
    { id: 'charlottesville', kind: 'PEER', name: 'Charlottesville', minutes: 60, bearing: 110, slug: 'charlottesville-va', note: 'Bigger, richer and over the mountain on US 33; the towns trade bands.' },
    { id: 'roanoke', kind: 'PEER', name: 'Roanoke', minutes: 105, bearing: 215, slug: 'roanoke-va', note: 'A larger city down I-81.' },
    { id: 'lynchburg', kind: 'PEER', name: 'Lynchburg', minutes: 120, bearing: 160, slug: 'lynchburg-va', note: 'Bigger and more conservative, with religious schools.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Court Square', route: 'downtown', note: 'Brick storefronts, bars with back rooms and an arts district; priced out for DIY but good for a bar show.' },
    { id: 'east-side', name: 'the east side by campus', route: 'campus', note: 'Student apartment complexes and rental houses on Port Republic Road; thin walls and managed leases.' },
    { id: 'old-town', name: 'Old Town and South Main', route: 'old-side', note: 'Older houses, part rentals; basements and porches, and watchful neighbors.' },
    { id: 'northeast', name: 'the Northeast Neighborhood', route: 'old-side', note: 'A historic Black neighborhood with deep roots; not a student playground.' },
    { id: 'park-view', name: 'Park View', route: 'old-side', note: 'Small houses and church-heavy streets in the northwest; quiet hours are enforced by neighbors.' },
    { id: 'the-pike', name: 'the Pike corridor', route: 'work-side', note: 'Strip malls, motels and immigrant groceries; cheap, ignored and practical.' },
    { id: 'rail-edge', name: 'the rail and plant edge', route: 'work-side', note: 'Warehouses and cold storage; practice rooms and the odd warehouse show, shrinking as they convert.' },
    { id: 'county-edge', name: 'the Rockingham County edge', route: 'work-side', note: 'Farmhouses, barns and fields past the city line; the risk is the sheriff and the neighbors.' }
  ],

  contacts: ['charlottesville-va', 'roanoke-va', 'lynchburg-va', 'hagerstown-md'],

  points: [
    { name: 'Winchester', state: 'VA', lat: 39.19, lon: -78.16, pop: 28000 },
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44, pop: 1300000 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04, pop: 6300000 },
    { name: 'Knoxville', state: 'TN', lat: 35.96, lon: -83.92, pop: 870000 }
  ],
  roads: ['I-81', 'US 11', 'US 33', 'VA 42', 'US 250', 'US 211'],

  words: {
    street: ['Main Street', 'Market Street', 'Port Republic Road', 'Reservoir Street', 'University Boulevard', 'Mount Clinton Pike'],
    water: ['Blacks Run', 'the Shenandoah'],
    hood: ['Old Town', 'Park View', 'Northeast', 'the east side', 'Court Square', 'Dayton', 'Bridgewater'],
    thing: ['poultry house', 'feed mill', 'hay wagon', 'cinder block', 'apple orchard', 'turkey house', 'basement window', 'barn', 'porch', 'coffee shop set'],
    weather: ['valley fog', 'black ice', 'mountain thunderstorm']
  }
});
