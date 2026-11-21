SB.Cities.register('columbus', {
  v: 1,
  slug: 'columbus',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['ohio state university', 'osu', 'ohio state', 'the ohio state university', 'columbus state community college', 'capital university', 'otterbein university', 'the lantern', 'columbus dispatch', 'columbus alive', 'columbus underground', 'columbus blue jackets', 'blue jackets', 'columbus crew', 'ohio state buckeyes', 'buckeyes', 'ohio stadium', 'the horseshoe', 'ohio state fair', 'columbus zoo', 'battelle', 'nationwide insurance', 'l brands', 'wexner medical center', 'nationwide children\'s hospital', 'wosu', 'wbns', 'wcmh', 'wsyx', 'ohio statehouse', 'ohio expo center', 'doo dah parade', 'columbus arts festival', 'rickenbacker', 'wright-patt', 'jeni\'s', 'short north arts district'],
  blocklist: ['columbus dispatch*', 'ohio state*', 'columbus blue jackets*', 'nationwide arena*', 'wexner*', 'columbus underground*'],

  blurb: ['Campus basements and a laundromat hardcore room anchor a growing, inclusive scene around North High Street.',
          'A hardcore revival is running, and landlords keep selling to apartment developers.'],
  hard: 'Football weekends, rising rents and zoning heat keep rooms short-lived.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69 },
    { name: 'Cincinnati', state: 'OH', lat: 39.1, lon: -84.51 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],
  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'A hardcore revival and a hardcore-centered room are documented.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Columbus' },
    { id: 'grove-city', kind: 'FEEDER', name: 'Grove City', minutes: 15, bearing: 195, note: 'Suburban teens.' },
    { id: 'westerville', kind: 'FEEDER', name: 'Westerville', minutes: 20, bearing: 30, note: 'A northern suburb with a small college.' },
    { id: 'dublin', kind: 'FEEDER', name: 'Dublin', minutes: 20, bearing: 320, note: 'A rich suburb; kids with cars.' },
    { id: 'hilliard', kind: 'FEEDER', name: 'Hilliard', minutes: 20, bearing: 290, note: 'A west suburb.' },
    { id: 'delaware', kind: 'FEEDER', name: 'Delaware', minutes: 30, bearing: 5, note: 'A small college town.' },
    { id: 'london', kind: 'FEEDER', name: 'London', minutes: 30, bearing: 255, note: 'A farm town.' },
    { id: 'lancaster', kind: 'FEEDER', name: 'Lancaster', minutes: 35, bearing: 150, note: 'A small factory town.' },
    { id: 'marysville', kind: 'FEEDER', name: 'Marysville', minutes: 35, bearing: 320, note: 'Exurban.' },
    { id: 'newark', kind: 'FEEDER', name: 'Newark', minutes: 40, bearing: 75, note: 'A small town with garage bands.' },
    { id: 'dayton', kind: 'PEER', name: 'Dayton', minutes: 70, bearing: 255, slug: 'dayton-oh', note: 'A scrappy sister scene.' },
    { id: 'athens', kind: 'PEER', name: 'Athens', minutes: 75, bearing: 145, note: 'A small college-town scene, in Ohio.' },
    { id: 'cincinnati', kind: 'PEER', name: 'Cincinnati', minutes: 105, bearing: 230, slug: 'cincinnati', note: 'A similar-size neighbor.' },
    { id: 'akron', kind: 'PEER', name: 'Akron', minutes: 125, bearing: 35, slug: 'akron-oh', note: 'Smaller.' }
  ],

  hoods: [
    { id: 'university', name: 'the University District', route: 'campus', note: 'The student ghetto near the big state university; house shows from pop-punk to hardcore to noise.' },
    { id: 'old-north', name: 'Old North Columbus', route: 'campus', note: 'The North High Street bar strip near campus, where a laundromat bar hosts hardcore and metal.' },
    { id: 'clintonville', name: 'Clintonville', route: 'old-side', note: 'A northern neighborhood of old houses and basements; quieter.' },
    { id: 'short-north', name: 'the Short North', route: 'downtown', note: 'A gentrified arts and bar district north of downtown.' },
    { id: 'franklinton', name: 'Franklinton', route: 'work-side', note: 'West of the river: cheap warehouses and older houses.' },
    { id: 'olde-towne', name: 'Olde Towne East', route: 'old-side', note: 'Victorian mansions turned cheap houses, east of downtown.' },
    { id: 'german-village', name: 'German Village and the Brewery District', route: 'downtown', note: 'Brick and bars south of downtown.' },
    { id: 'hilltop', name: 'Hilltop', route: 'work-side', note: 'The west side; cheap houses.' },
    { id: 'linden', name: 'Linden', route: 'work-side', note: 'The northeast side; low rent and a rowhouse feel.' }
  ],

  contacts: ['dayton-oh', 'cincinnati', 'akron-oh'],

  points: [
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69, pop: 2100000 },
    { name: 'Cincinnati', state: 'OH', lat: 39.1, lon: -84.51, pop: 2300000 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80, pop: 2370000 },
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16, pop: 2200000 }
  ],
  roads: ['I-70', 'I-71', 'I-270', 'I-670', 'High Street', 'Route 23'],

  words: {
    street: ['North High Street', 'Broad Street', 'Summit Street', 'Fourth Street', 'Hudson Street', 'Cleveland Avenue'],
    water: ['the Scioto', 'the Olentangy'],
    hood: ['Clintonville', 'Franklinton', 'Olde Towne East', 'Hilltop', 'Linden', 'Old North'],
    thing: ['laundromat', 'High Street', 'football weekend', 'student ghetto', 'sticky couch', 'copy shop'],
    weather: ['tornado watch', 'ice storm']
  }
});
