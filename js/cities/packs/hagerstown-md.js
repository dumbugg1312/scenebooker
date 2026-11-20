SB.Cities.register('hagerstown-md', {
  v: 1,
  slug: 'hagerstown-md',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['hagerstown community college', 'university system of maryland', 'flying boxcars', 'herald-mail', 'the herald-mail', 'western maryland blues fest',
           'interstate bbq festival', 'quad state beer fest', 'augustoberfest', 'hagerstown hispanic festival', 'alsatia mummers parade', 'mummers parade',
           'wilson college', 'hood college', 'shepherd university', 'shenandoah university', 'frederick community college', 'letterkenny army depot',
           'letterkenny', 'fort ritchie', 'air national guard', 'camp david', 'warped tour', 'old bay', 'utz', 'herr\'s', 'tastykake', 'berger cookie',
           'orioles', 'nationals', 'vfw', 'american legion', 'hagerstown regional airport', 'washington county board of license commissioners',
           'the mason-dixon annex', 'ridge street hall', 'the corn crib', 'halfway lanes', 'the old lehman mill loft', 'station nine', 'the quarry room',
           'valley grange no. 11', 'the spring house', 'dual highway pizza & pins', 'the lodge on potomac', 'the breezeway'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['herald-mail*', 'the herald-mail*', 'flying boxcars*', 'western maryland blues*', 'quad state*', 'alsatia*', 'warped tour*', 'letterkenny*'],

  blurb: ['Two interstates cross here, so bands pass through whether or not anyone has booked them. Rooms are borrowed halls and basements, nothing permanent.',
          'The same few dozen people come out, and half of them drive in from the next town over. The hall member at the door has opinions about the stage.'],
  hard: 'Few rooms, a small crowd, and the good hall costs more than the door makes.',
  region: 'the Mid-Atlantic',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -79.99 },
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Hagerstown' },
    { id: 'williamsport', kind: 'FEEDER', name: 'Williamsport', minutes: 10, bearing: 215, pop: 2100, note: 'A river and canal town just southwest; a few kids and no scene of its own.' },
    { id: 'smithsburg', kind: 'FEEDER', name: 'Funkstown and Smithsburg', minutes: 15, bearing: 85, note: 'Small towns at the foot of the mountain, a farm and commuter crowd.' },
    { id: 'boonsboro', kind: 'FEEDER', name: 'Boonsboro', minutes: 20, bearing: 110, pop: 3800, note: 'A historic main street and a high school full of kids who drive.' },
    { id: 'waynesboro', kind: 'FEEDER', name: 'Waynesboro', state: 'PA', minutes: 25, bearing: 55, pop: 11000, note: 'An old machinery town across the state line; probably the most active feeder.' },
    { id: 'hancock', kind: 'FEEDER', name: 'Clear Spring and Hancock', minutes: 25, bearing: 275, note: 'Farm and canal towns to the west, along the narrowest part of the state.' },
    { id: 'martinsburg', kind: 'FEEDER', name: 'Martinsburg', state: 'WV', minutes: 30, bearing: 210, pop: 19000, note: 'A cheaper, rougher railroad town across the river; its kids and Hagerstown\'s overlap most.' },
    { id: 'chambersburg', kind: 'FEEDER', name: 'Chambersburg', state: 'PA', minutes: 35, bearing: 10, pop: 22000, note: 'A farm town and small college with a small scene of its own.' },
    { id: 'frederick', kind: 'FEEDER', name: 'Frederick', minutes: 35, bearing: 120, scene: 300, note: 'The bigger, wealthier town to the southeast, with better and pricier rooms; where restless kids move.' },
    { id: 'shepherdstown', kind: 'FEEDER', name: 'Shepherdstown', state: 'WV', minutes: 35, bearing: 190, pop: 1500, note: 'A small arts-leaning college town on the river.' },
    { id: 'gettysburg', kind: 'FEEDER', name: 'Gettysburg', state: 'PA', minutes: 50, bearing: 60, pop: 7100, note: 'A college and battlefield-tourism town to the northeast.' },
    { id: 'winchester', kind: 'PEER', name: 'Winchester', state: 'VA', minutes: 55, bearing: 195, scene: 500, note: 'A bigger tourist and university town down the interstate.' },
    { id: 'harrisburg', kind: 'PEER', name: 'Harrisburg', state: 'PA', minutes: 70, bearing: 45, slug: 'harrisburg-pa', note: 'People drive up the interstate for shows.' },
    { id: 'cumberland', kind: 'PEER', name: 'Cumberland', minutes: 80, bearing: 270, scene: 250, note: 'A shrinking industrial city to the west with its own small scene.' },
    { id: 'york', kind: 'PEER', name: 'York', state: 'PA', minutes: 90, bearing: 70, slug: 'york-pa', note: 'Another Pennsylvania town people drive to for shows.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the square', route: 'downtown', note: 'Historic brick around the central square, a restored theater, bars and a lot of empty upper floors. The only place a rented room is plausible.' },
    { id: 'south-end', name: 'the South End', route: 'old-side', note: 'Rowhouses and old frame houses toward Williamsport. Basements and porches; cheap and ignored.' },
    { id: 'oak-hill', name: 'Oak Hill and City Park', route: 'campus', note: 'Big old houses by the park lake. Quiet and quietly pricey; church basements and pavilions.' },
    { id: 'lehmans-mill', name: 'Lehman\'s Mill and the old mill district', route: 'work-side', note: 'Brick mills among rowhouses and light industry: the nearest thing to a warehouse district, and the first to be bought for conversion.' },
    { id: 'dual-highway', name: 'Dual Highway and Halfway', route: 'work-side', note: 'The strip-mall belt on the old National Road: pizza places, bowling lanes, and vacant big-box units, the one huge cheap space in town.' },
    { id: 'north-end', name: 'Maugansville and the north end', route: 'old-side', note: 'Farmland turning to warehouses and subdivisions. Barns and sheds, far enough out that police rarely care.' }
  ],

  contacts: ['harrisburg-pa', 'york-pa', 'lancaster-pa', { name: 'Frederick', state: 'MD', lat: 39.41, lon: -77.41 }],

  points: [
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61, pop: 585000 },
    { name: 'Frederick', state: 'MD', lat: 39.41, lon: -77.41, pop: 78000 },
    { name: 'Winchester', state: 'VA', lat: 39.19, lon: -78.16, pop: 28000 },
    { name: 'Martinsburg', state: 'WV', lat: 39.46, lon: -77.96, pop: 19000 },
    { name: 'Cumberland', state: 'MD', lat: 39.65, lon: -78.76, pop: 19000 }
  ],
  roads: ['I-81', 'I-70', 'US 40', 'US 11', 'US 340', 'Dual Highway'],

  words: {
    street: ['Dual Highway', 'Potomac Street', 'Washington Street', 'Antietam Street', 'US 40', 'US 11'],
    water: ['the Potomac', 'the Antietam', 'the Conococheague'],
    hood: ['Oak Hill', 'Lehman\'s Mill', 'Halfway', 'Maugansville', 'Funkstown', 'Williamsport', 'Potomac-Broadway'],
    thing: ['fire hall', 'basement', 'orchard', 'pepperoni roll', 'scrapple', 'barn', 'warehouse', 'pole shed', 'hall wall', 'narrow stair'],
    weather: ['ice on the mountain', 'summer thunderstorm']
  }
});
