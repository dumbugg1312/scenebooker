SB.Cities.register('vallejo-ca', {
  v: 1,
  slug: 'vallejo-ca',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['six flags', 'six flags discovery kingdom', 'discovery kingdom', 'cal maritime', 'california state university maritime', 'cal poly', 'touro', 'solano community college',
           'vallejo times-herald', 'times-herald', 'vallejo sun', 'open vallejo', 'vallejo community access television', 'vallejo city unified', 'kaiser', 'travis air force base',
           'concord naval weapons station', 'san francisco bay ferry', 'amtrak', 'in-n-out', 'jack in the box', 'mad hatter', 'ghost ship', 'oakland warehouse fire',
           'solano county fair', 'napa valley', 'hiddenbrooke kid', 'vfw', 'american legion',
           'tennessee street hall', 'dry dock annex', 'carquinez carport', 'glen cove clubhouse', 'st. anselm\'s parish hall', 'the heights parlor', 'springs road bowl',
           'hog island garage', 'georgia street back room', 'the fairgrounds lot', 'sandy beach shed',
           'kqed', 'visit vallejo', 'mad hatter holiday festival', 'mad hatter holiday parade', 'pirate festival', 'vallejo juneteenth', 'bay flyway festival', 'vallejo art walk', 'fright fest', 'san francisco bay ferry'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['six flags*', 'times-herald*', 'vallejo sun*', 'open vallejo*', 'in-n-out*', 'cal maritime*', 'touro*'],

  blurb: ['A former Navy shipyard town on the northeast corner of the Bay, with cheap garages, halls and industrial leftovers and a long mixed-up history of its own music.',
          'The scene is small and always short of rooms, because one bridge or one ferry puts the whole Bay Area in reach.'],
  hard: 'Small crowd, noisy neighbors, and the Bay\'s rooms are a ferry or a bridge away.',
  region: 'the Bay Area',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Oakland', state: 'CA', lat: 37.8, lon: -122.27 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Vallejo' },
    { id: 'american-canyon', kind: 'FEEDER', name: 'American Canyon', minutes: 10, bearing: 20, note: 'A newer suburb of warehouses and big-box stores to the north; no scene of its own.' },
    { id: 'benicia', kind: 'FEEDER', name: 'Benicia', minutes: 15, bearing: 110, note: 'The wealthier bedroom town across I-780; the rich neighbor, with a small scene at best.' },
    { id: 'crockett', kind: 'FEEDER', name: 'Crockett, Rodeo and Hercules', minutes: 20, bearing: 205, note: 'Refinery and mill towns across the bridge, tied to the East Bay punk orbit.' },
    { id: 'martinez', kind: 'FEEDER', name: 'Martinez', minutes: 20, bearing: 130, note: 'A county seat across the strait with a few bands.' },
    { id: 'napa', kind: 'FEEDER', name: 'Napa', minutes: 30, bearing: 10, note: 'A tourist and wine town; some local bands, priced out by the money.' },
    { id: 'vacaville', kind: 'FEEDER', name: 'Vacaville', minutes: 35, bearing: 55, note: 'A suburb up I-80 with a fair number of pop-punk and metal kids.' },
    { id: 'petaluma', kind: 'FEEDER', name: 'Petaluma and Novato', minutes: 40, bearing: 300, note: 'Rural-suburban North Bay towns with some active DIY.' },
    { id: 'antioch', kind: 'FEEDER', name: 'Pittsburg and Antioch', minutes: 40, bearing: 110, note: 'Delta suburbs with long commutes and a scene that comes and goes.' },
    { id: 'davis', kind: 'FEEDER', name: 'Davis and Dixon', minutes: 45, bearing: 60, note: 'A university town and its farm neighbor up I-80.' },
    { id: 'fairfield', kind: 'PEER', name: 'Fairfield', minutes: 45, bearing: 55, scene: 500, note: 'The closest peer: a suburb by an Air Force base. People drive both ways.' },
    { id: 'richmond', kind: 'PEER', name: 'Richmond', minutes: 45, bearing: 215, scene: 700, note: 'An industrial and port city of the same weight, with a lot of overlap in crowds.' },
    { id: 'concord', kind: 'PEER', name: 'Concord', minutes: 40, bearing: 150, scene: 500, note: 'A suburb with a train connection; smaller overlap.' },
    { id: 'santa-rosa', kind: 'PEER', name: 'Santa Rosa', minutes: 60, bearing: 330, slug: 'santa-rosa-ca', note: 'The other big North Bay city, up Highway 37 and 101.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the waterfront', route: 'downtown', note: 'Old brick, a ferry terminal and a monthly art walk; vacant storefronts let rooms come and go.' },
    { id: 'heights', name: 'Vallejo Heights', route: 'old-side', note: 'Hilltop Victorians above downtown; big living rooms, few basements, tenants who tolerate noise for a while.' },
    { id: 'mare-island', name: 'Mare Island', route: 'work-side', note: 'The old shipyard across the river: shops, dry docks and warehouses, shrinking under redevelopment.' },
    { id: 'south-vallejo', name: 'South Vallejo and the Sonoma corridor', route: 'work-side', note: 'Dense, working-class and heavily Filipino and Latino; garages, backyards and strip-mall units.' },
    { id: 'glen-cove', name: 'Glen Cove', route: 'old-side', note: 'A quiet marina end by the bridge; a backyard or two.' },
    { id: 'east-hills', name: 'Northgate, Rancho Vallejo and the east hills', route: 'campus', note: 'Newer tract homes and big driveways; commuters, families and suburban teenagers.' },
    { id: 'springs-road', name: 'Springs Road and Tennessee Street', route: 'downtown', note: 'The cross-town arterials of old storefronts, a bowling alley, pizza and taquerias.' },
    { id: 'fairgrounds', name: 'the fairgrounds and Highway 37', route: 'campus', note: 'Big parking lots and event traffic; no rooms, but it warps the roads.' }
  ],

  rooms: [
    { id: 'sonoma-garage', kind: 'HOUSE', hood: 'south-vallejo', cap: 40, hostCut: 0, pa: .4, curfew: 1290, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 55, start: true, note: 'A garage with the door up and a driveway for a lobby. The neighbors are close and one call ends the night.' },
    { id: 'hills-driveway', kind: 'HOUSE', hood: 'east-hills', cap: 60, hostCut: 0, pa: .4, curfew: 1290, ac: false, outdoor: false, sketch: 20, standing: [60, 60, 50],
      pressure: 55, note: 'A tract house with a big driveway and a lot of teenagers. The street is quiet and the block has no patience.' },
    { id: 'springs-shop', kind: 'DIY', hood: 'springs-road', cap: 80, rent: 60, deposit: 0, pa: .5, curfew: 1320, ac: false, sketch: 35, standing: [60, 60, 50],
      pressure: 50, note: 'A storefront turned car-and-art shop that hosts all-ages bills. The organizer is losing money and says so.' },
    { id: 'solano-garage', kind: 'DIY', hood: 'south-vallejo', cap: 100, rent: 80, deposit: 0, pa: .6, curfew: 1320, ac: false, sketch: 35, standing: [55, 60, 45],
      pressure: 50, note: 'A converted auto garage beside a car lot. Mostly other scenes\' nights, so a punk bill is a borrowed date.' },
    { id: 'island-shed', kind: 'DIY', hood: 'mare-island', cap: 150, rent: 90, deposit: 0, pa: .6, curfew: 1320, ac: false, sketch: 50, standing: [50, 60, 40],
      pressure: 65, needs: ['VOUCH'], note: 'An old shop on the shipyard island, big and cold. The fire marshal has been watching warehouses since the Oakland fire.' },
    { id: 'lodge-ballroom', kind: 'HALL', hood: 'downtown', cap: 250, rent: 250, deposit: 100, pa: .5, curfew: 1350, ac: false, sketch: 10, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'A grand upstairs ballroom in an old lodge, with a very high ceiling and a long flight of stairs for the gear. A weak bill disappears in it.' },
    { id: 'top-floor', kind: 'HALL', hood: 'downtown', cap: 120, rent: 150, deposit: 75, pa: .6, ages: ['A21'], curfew: 1380, ac: true, sketch: 15, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'A hall with a speakeasy bar on the top floor and a monthly series. It is a bar floor, so no kids.' },
    { id: 'georgia-lounge', kind: 'BAR', hood: 'downtown', cap: 150, soundFee: 50, pa: .7, ages: ['A21'], curfew: 1470, ac: true, following: .3, sketch: 15, standing: [50, 65, 70],
      note: 'A lounge on Georgia Street that books a punk night now and then. Door deal, drinking crowd, no kids.' },
    { id: 'waterfront-stage', kind: 'OUTDOOR', hood: 'downtown', cap: 300, rent: 25, pa: .5, curfew: 1080, ac: false, outdoor: true, sketch: 30, standing: [60, 60, 55],
      note: 'A park stage on the waterfront for a bands-in-the-park afternoon. Daylight only, and the fog and the wind decide it.' },
    { id: 'fairgrounds-lot', kind: 'BIG', hood: 'fairgrounds', cap: 1000, rent: 1800, deposit: 500, pa: .9, curfew: 1380, ac: false, outdoor: true, sketch: 10, standing: [40, 60, 65],
      owner: 'TALENT_BUYER', notice: 90, needs: ['FULL_BILL'], note: 'A big outdoor lot by the highway where a touring package lands. Not a room a new booker gets.' }
  ],

  contacts: ['santa-rosa-ca', 'oakland', 'sacramento', 'stockton-ca'],

  calendar: [
    { id: 'july-parade', label: 'the Fourth of July parade and waterfront fair', tag: 'parade', month: 7, week: 1, dows: [0, 1, 2, 3, 4, 5, 6], can: [.75, .70, .70], hoods: ['downtown'], elsewhere: [.95, .92, .92] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 6, week: 3, dows: [3, 4, 5, 6], can: [.90, .85, .85], hoods: ['fairgrounds'], elsewhere: [.97, .95, .95] },
    { id: 'holiday-parade', label: 'the winter holiday parade and tree lighting', tag: 'parade', month: 12, week: 1, dows: [5], can: [.85, .85, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.88, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.88, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42, pop: 4700000 },
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49, pop: 2400000 },
    { name: 'Berkeley', state: 'CA', lat: 37.87, lon: -122.27, pop: 125000 },
    { name: 'Reno', state: 'NV', lat: 39.53, lon: -119.81, pop: 250000 }
  ],
  roads: ['I-80', 'I-780', 'Highway 37', 'Highway 29', 'Carquinez Bridge'],

  words: {
    street: ['Georgia Street', 'Tennessee Street', 'Sonoma Boulevard', 'Springs Road', 'Curtola Parkway', 'Broadway'],
    water: ['the Carquinez Strait', 'San Pablo Bay', 'the Napa River'],
    hood: ['Mare Island', 'Glen Cove', 'Vallejo Heights', 'Northgate', 'Rancho Vallejo', 'South Vallejo', 'Benicia', 'Crockett'],
    thing: ['garage', 'lumpia', 'taco truck', 'ferry', 'tule fog', 'dry dock', 'carport', 'rented hall', 'bakery pastry', 'shipyard'],
    weather: ['tule fog', 'bay wind']
  },

  events: [
    { id: 'VALLEJO_CA_PARADE_DAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'The parade route is posted downtown, and the whole waterfront is about to be a fair.',
      title: 'The parade closes the streets',
      body: 'The old parade shuts the main streets all day and the fireworks go off on the waterfront at dark. Your show is in the middle of it, and everyone you know is already down there.',
      options: [
        { id: 'LATE', label: 'Push doors back until the fireworks are over', likely: 'The crowd walks over from the waterfront, late and loud.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 75 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors opened an hour late, and they drifted in from the waterfront with sunburns and sparklers.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Half the list is stuck behind a barricade.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The barricades kept the car crowd away, but the people on foot made it.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the streets were empty and so was the sign-up sheet.' }
      ] },

    { id: 'VALLEJO_CA_FOG_STRANDED', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [11, 12, 1, 2, 3] },
      telegraph: 'Fog is sitting on the strait, and the boats are running late or not at all.',
      title: 'The band is on the wrong side of the water',
      body: 'The fog stopped the ferry and the bridge is jammed. A band from across the Bay is stuck on the other side, and the bill has two of its four acts.',
      options: [
        { id: 'SHORT', label: 'Run the short bill and play on', likely: 'A thin night, but the ones who came are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Two bands played a long, loose night in a room that was half full and warm.' },
        { id: 'WAIT', label: 'Hold the doors and wait for the van', likely: 'A late start, and the crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The van came over the bridge at ten, and you started late but nobody left.' }
      ] },

    { id: 'VALLEJO_CA_CAR_MEET', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The car club is holding a meet in the lot and wants it to run past dark.',
      title: 'The car meet runs long',
      body: 'The custom-car crowd is still in the lot at doors, engines running, and the club president wants to keep the space for the evening.',
      options: [
        { id: 'SHARE', label: 'Let them stay and open the roll-up door', likely: 'A strange, friendly crowd, and a little money for the lot.',
          effects: [{ op: 'MONEY', amount: -25 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.15 }, { op: 'REGULARS', pct: .02 }],
          result: 'The car crowd stood in the door and listened, and two of them asked about the next one.' },
        { id: 'CLEAR', label: 'Ask them to clear out and start on time', likely: 'Fewer people, no trouble.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'They pulled out in a line with a lot of noise, and you started a little late and a little small.' }
      ] }
  ]
});
