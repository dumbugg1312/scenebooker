SB.Cities.register('hagerstown-md', {
  v: 1,
  slug: 'hagerstown-md',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['hagerstown community college', 'university system of maryland', 'flying boxcars', 'herald-mail', 'the herald-mail', 'western maryland blues fest',
           'interstate bbq festival', 'quad state beer fest', 'augustoberfest', 'hagerstown hispanic festival', 'alsatia mummers parade', 'mummers parade',
           'wilson college', 'hood college', 'shepherd university', 'shenandoah university', 'frederick community college', 'letterkenny army depot',
           'letterkenny', 'fort ritchie', 'air national guard', 'camp david', 'warped tour', 'old bay', 'utz', 'herr\'s', 'tastykake', 'berger cookie',
           'orioles', 'nationals', 'vfw', 'american legion', 'hagerstown regional airport', 'washington county board of license commissioners',
           'the mason-dixon annex', 'ridge street hall', 'the corn crib', 'halfway lanes', 'the old lehman mill loft', 'station nine', 'the quarry room',
           'valley grange no. 11', 'the spring house', 'dual highway pizza & pins', 'the lodge on potomac', 'the breezeway',
           'arcc', 'hccc', 'the maryland theatre', 'maryland theatre', 'hagerstown speedway', 'the fairgrounds at hagerstown', 'washington county agricultural education center',
           'ag center', 'hagerstown roundhouse museum', 'antietam national battlefield', 'antietam battlefield', 'illumination at antietam', 'salute to independence',
           'maryland symphony orchestra', 'maryland international film festival', 'leitersburg bbq festival', 'leitersburg peach festival', 'taste of the valley',
           'bonanza extravaganza', 'shamrocked', 'alsatia club', 'visit hagerstown', 'hagerstown magazine', 'hagerstown suns', 'savage mountain punk festival',
           'washington county free library'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['herald-mail*', 'the herald-mail*', 'flying boxcars*', 'western maryland blues*', 'quad state*', 'alsatia*', 'warped tour*', 'letterkenny*', 'hagerstown speedway*', 'shamrocked*'],

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
    { id: 'smithsburg', kind: 'FEEDER', name: 'Funkstown and Smithsburg', minutes: 15, bearing: 85, scene: 60, note: 'Small towns at the foot of the mountain, a farm and commuter crowd.' },
    { id: 'boonsboro', kind: 'FEEDER', name: 'Boonsboro', minutes: 20, bearing: 110, pop: 3800, note: 'A historic main street and a high school full of kids who drive.' },
    { id: 'waynesboro', kind: 'FEEDER', name: 'Waynesboro', state: 'PA', minutes: 25, bearing: 55, pop: 11000, scene: 70, note: 'An old machinery town across the state line; probably the most active feeder.' },
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
    { id: 'north-end', name: 'Maugansville and the north end', route: 'old-side', note: 'Farmland turning to warehouses and subdivisions. Barns and sheds, far enough out that police rarely care.' },
    { id: 'smithsburg-hood', name: 'Funkstown and Smithsburg', route: 'town:smithsburg', note: 'Small towns at the foot of the mountain. A field, a park pavilion and a farm crowd.' },
    { id: 'waynesboro-hood', name: 'Waynesboro across the state line', route: 'town:waynesboro', note: 'An old machinery town in Pennsylvania. The nearest ongoing all-ages punk room is over here.' }
  ],

  rooms: [
    { id: 'record-shop-stage', kind: 'CLUB', hood: 'downtown', cap: 220, ages: ['ALL', 'A21'], curfew: 1410, ac: true,
      note: 'A stage and a bar in the back of a big record shop in an old car dealership. A business that books for the door, not a scene room.' },
    { id: 'store-corner', kind: 'SHOP', hood: 'downtown', cap: 60, curfew: 1260, ac: true,
      note: 'The back of the record shop in the afternoon. In-store sets, over by nine.' },
    { id: 'south-end-basement', kind: 'HOUSE', hood: 'south-end', cap: 40, curfew: 1320, ac: false, outdoor: false, start: true,
      note: 'A rowhouse basement with one narrow stair. The neighbors are close and the landlord is closer.' },
    { id: 'oak-hill-house', kind: 'HOUSE', hood: 'oak-hill', cap: 50, curfew: 1290, ac: true, outdoor: false,
      note: 'A big old house with a finished basement, held by someone\'s parents. The tolerance wears out.' },
    { id: 'fire-hall', kind: 'HALL', hood: 'downtown', cap: 120, curfew: 1350, ac: true,
      note: 'A rented fire hall or lodge. A member stands at the door and nothing goes on the walls.' },
    { id: 'church-hall', kind: 'HALL', hood: 'oak-hill', cap: 80, curfew: 1290, ac: true,
      note: 'A church hall or a park pavilion. Daytime or early evening only.' },
    { id: 'strip-bar', kind: 'BAR', hood: 'downtown', cap: 120, ages: ['A21'], curfew: 1500, ac: true,
      note: 'The bar on the main strip with a small stage. Cover bands most nights and a punk night once in a while.' },
    { id: 'roadhouse', kind: 'BAR', hood: 'dual-highway', cap: 150, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A roadhouse by the strip with rock and metal covers. The odd original bill gets a night.' },
    { id: 'mill-bay', kind: 'DIY', hood: 'lehmans-mill', cap: 100, curfew: 1350, ac: false,
      note: 'A rented mill or storefront bay. The old mills keep getting bought for conversion.' },
    { id: 'barn-shed', kind: 'OUTDOOR', hood: 'north-end', cap: 80, curfew: 1320, outdoor: true,
      note: 'A barn, a shed or a yard out in the county. Summer only, and far enough that nobody calls.' },
    { id: 'mountain-field', kind: 'OUTDOOR', hood: 'smithsburg-hood', cap: 60, curfew: 1320, outdoor: true,
      note: 'A field or a park up toward the mountain. The weather decides.' },
    { id: 'state-line-room', kind: 'DIY', hood: 'waynesboro-hood', cap: 100, curfew: 1350, ac: false,
      note: 'A cafe room across the state line with all-ages punk and hardcore bills. Twenty-five miles out, and worth the drive.' }
  ],

  contacts: ['harrisburg-pa', 'york-pa', 'baltimore', 'washington-dc', 'lancaster-pa'],

  calendar: [
    { id: 'beer-fest', label: 'the March beer festival', tag: 'festival', month: 3, week: 2, dows: [5], can: [.92, .90, .90] },
    { id: 'blues-fest', label: 'the blues festival', tag: 'festival', month: 5, weeks: [2, 3], dows: [3, 4, 5, 6], can: [.90, .88, .88], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'dirt-track', label: 'race season at the dirt track', tag: 'race', month: 6, weeks: [1, 4], dows: [5], can: [.92, .92, .92] },
    { id: 'fourth', label: 'the Fourth of July night', tag: 'holiday', month: 7, week: 1, dows: [4, 5, 6], can: [.88, .88, .88] },
    { id: 'oktoberfest', label: 'the beer and Oktoberfest weekend', tag: 'festival', month: 8, weeks: [3, 4], dows: [5, 6], can: [.92, .90, .90], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'parade', label: 'the Halloween parade', tag: 'parade', month: 10, week: 4, dows: [5], can: [.85, .85, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 4], dows: [4], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [4], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1320, weekend: 1380, inForce: false } },

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
  },

  events: [
    { id: 'HAGERSTOWN_MD_PARADE_NIGHT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'The parade is Saturday night, and the streets around the square close at dusk.',
      title: 'The square is closed',
      body: 'The streets are shut, the lots are full, and everybody parks on the far side of the square. The main room\'s bill is competing with the parade crowd.',
      options: [
        { id: 'LATE', label: 'Push doors back until the parade is over', likely: 'The ones who care will find you, but it\'s a later night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors went up late, and the parade crowd drifted in with face paint still on.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The kids go to watch the parade.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The kids stayed on the curb, and the regulars walked around the barricades.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date, which costs you trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'HAGERSTOWN_MD_RACE_SATURDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'race' },
      telegraph: 'It is a race Saturday, and half the county is already headed for the track.',
      title: 'The dirt track pulls the county',
      body: 'The track draws half the county\'s cars, so the roadhouse bar is packed and the all-ages bill is empty.',
      options: [
        { id: 'LATE', label: 'Push doors back until the races end', likely: 'The race crowd wanders over, loud and dusty.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors were an hour late, and the track crowd came in smelling of fuel and stayed for two bands.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The kids and the grown-ups are somewhere else.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'It was a thin room, but the ones who came knew every word.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date, which costs you trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the ones who could come, came.' }
      ] },

    { id: 'HAGERSTOWN_MD_HALL_CURFEW', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The kids under sixteen have a curfew, and the shuttle van leaves early.',
      title: 'The hall breaks up at a quarter to eleven',
      body: 'A Friday show at a rented hall is cut short because the younger kids have a curfew and the van that brings them is already idling at the door.',
      options: [
        { id: 'EARLY', label: 'Move the start up and finish before the curfew', likely: 'Most of the kids see the whole bill.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors were early, and the last band finished with a half hour to spare.' },
        { id: 'ACCEPT', label: 'Run it and let them go', likely: 'The kids leave before the last bands.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The van left in the middle of the last set, and the room went half empty.' },
        { id: 'MOVE', label: 'Move the bill to the bar', likely: 'The older crowd stays late, and the kids miss it.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'BAR', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The bar took the bill. The grown-ups stayed late and the kids stayed home.' }
      ] }
  ]
});
