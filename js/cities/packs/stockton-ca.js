SB.Cities.register('stockton-ca', {
  v: 1,
  slug: 'stockton-ca',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['amazon', 'amtrak', 'university of the pacific', 'san joaquin delta college', 'delta college', 'csu stanislaus', 'uc davis', 'uc merced',
           'sac state', 'travis air force base', 'travis afb', 'asparagus festival', 'stockton asparagus festival', 'festival of lights',
           'chinese new year parade', 'altamont corridor express', 'stockton arena', 'banner island ballpark', 'bob hope theatre', 'stockton ports',
           'stockton heat', 'stockton kings', 'san joaquin county fair', 'record searchlight', 'the stockton record', 'the slough street social hall',
           'slough street social hall', 'tule fog annex', 'levee road lodge', 'cannery row unit 9', 'the eight mile barn', 'magnolia carport',
           'hammer lane storage row', 'the weber flats garage', 'port road warehouse 14', 'the lumpia room', 'crosstown underpass',
           'charter way swap lot',
           'san joaquin asparagus festival', 'stockton lighted boat parade', 'lynn hahn', 'delta reflections', 'stockton yacht club', 'stockton holiday parade', 'weber point', 'weber point events center', 'visit stockton', 'stocktonia', 'delta collegian', 'sacramento news and review', 'stockton police', 'port of stockton', 'san joaquin county fairgrounds', 'stockton 99 speedway', 'normandy village', 'stockton unified', 'pacific tigers', 'san joaquin rtd'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real institutions appear only as generic phrases in game text. */
  blocklist: ['university of the pacific*', 'bob hope theatre*', 'stockton ports*', 'stockton heat*', 'asparagus festival*'],

  blurb: ['Stockton shows live in garages and rented halls scattered across a flat town where everyone drives.',
          'Bands pass through between the Bay and Sacramento, and the best locals drift off to both.'],
  hard: 'Spread-out town, few rooms, and the best locals drift to the Bay.',
  region: 'the Valley',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49 },
    { name: 'Oakland', state: 'CA', lat: 37.80, lon: -122.27 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'San Jose', state: 'CA', lat: 37.34, lon: -121.89 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Stockton' },
    { id: 'lathrop', kind: 'FEEDER', name: 'Lathrop', minutes: 15, bearing: 165, note: 'New tracts and warehouse sprawl; in effect a Stockton annex.' },
    { id: 'lodi', kind: 'FEEDER', name: 'Lodi', minutes: 25, bearing: 355, note: 'A wine and farm town with a small teen scene and a standing rivalry with Stockton.', bands: 2 },
    { id: 'manteca', kind: 'FEEDER', name: 'Manteca', minutes: 25, bearing: 155, note: 'A commuter suburb of big tract homes and garage bands.' },
    { id: 'tracy', kind: 'FEEDER', name: 'Tracy', minutes: 35, bearing: 215, note: 'A logistics and Bay-commuter town; kids drive to Stockton or the Bay.' },
    { id: 'galt', kind: 'FEEDER', name: 'Galt', minutes: 35, bearing: 20, note: 'A small farm town; its kids go to Sacramento more than Stockton.' },
    { id: 'ripon', kind: 'FEEDER', name: 'Ripon and Escalon', minutes: 35, bearing: 140, note: 'Almond, dairy and church country: a few kids with a band and a trailer.' },
    { id: 'oakdale', kind: 'FEEDER', name: 'Oakdale and Riverbank', minutes: 40, bearing: 100, note: 'Cowboy and farm towns where punks are rare and loyal.' },
    { id: 'antioch', kind: 'FEEDER', name: 'Antioch and Brentwood', minutes: 50, bearing: 245, note: 'Bay-edge suburbs; kids go either to Stockton or into the East Bay.' },
    { id: 'rio-vista', kind: 'FEEDER', name: 'Rio Vista and the Delta towns', minutes: 55, bearing: 305, note: 'Tiny river and levee towns: boating and retirees.' },
    { id: 'modesto', kind: 'PEER', name: 'Modesto', minutes: 45, bearing: 160, slug: 'modesto-ca', note: 'The closest peer: the same town with a different chip on its shoulder. Bands and crowds trade all the time.' },
    { id: 'merced', kind: 'PEER', name: 'Merced', minutes: 75, bearing: 150, slug: 'merced-ca', note: 'A farm-valley college town down SR-99.' },
    { id: 'vallejo', kind: 'PEER', name: 'Vallejo', minutes: 75, bearing: 275, slug: 'vallejo-ca', note: 'A Bay-edge port city; occasional crowd trade.' },
    { id: 'fresno', kind: 'PEER', name: 'Fresno', slug: 'fresno', minutes: 105, bearing: 150, scene: 2200, note: 'Bigger but the same Valley kinship; some tours stop at both.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the waterfront', route: 'downtown', note: 'The old center on the channel: government workers by day, dead by night except event nights, slowly being cleaned up.' },
    { id: 'little-manila', name: 'Little Manila and south of downtown', route: 'old-side', note: 'A historic Filipino district and older, poorer blocks with community halls, storefronts and churches.' },
    { id: 'miracle-mile', name: 'the Miracle Mile', route: 'campus', note: 'The old walkable strip of cafes, bars and vintage shops near the university: the closest thing to a scene street.' },
    { id: 'brookside', name: 'the university area and Brookside', route: 'campus', note: 'Leafy streets with big yards and detached garages, students and middle-class families.' },
    { id: 'central-magnolia', name: 'Central and Magnolia', route: 'old-side', note: 'Prewar bungalows with garages, alleys and backyards; cheap, but Bay buyers are arriving.' },
    { id: 'north-stockton', name: 'north Stockton', route: 'work-side', note: 'Safe, boring tract suburbs with a big mall, where teens first play in parents\' garages.' },
    { id: 'weston-ranch', name: 'Weston Ranch', route: 'work-side', note: 'Huge commuter tracts far to the southwest, isolated, with nothing public.' },
    { id: 'port-belt', name: 'the port and industrial belt', route: 'work-side', note: 'Warehouses, rail yards and trucking lots where almost nobody lives; unit shows and generator shows.' }
  ],


  rooms: [
    { id: 'magnolia-garage', kind: 'HOUSE', hood: 'central-magnolia', cap: 60, curfew: 1320, outdoor: true, pressure: 55, start: true, note: 'A bungalow garage or backyard on a prewar block. No basements out here, and a landlord whose patience is short.' },
    { id: 'north-garage', kind: 'HOUSE', hood: 'north-stockton', cap: 40, curfew: 1290, pressure: 55, note: 'A tract garage where the teens start. The parents are the real threat.' },
    { id: 'weston-yard', kind: 'HOUSE', hood: 'weston-ranch', cap: 40, curfew: 1290, note: 'A yard in the commuter tracts at the edge of town. Everyone drives far, and the neighbors are tight.' },
    { id: 'river-garage', kind: 'DIY', hood: 'downtown', cap: 150, curfew: 1380, pressure: 60, note: 'An auto garage near the channel that a nonprofit workshop lets bands use. The owner cancels after noise or an ambulance call.' },
    { id: 'strip-storefront', kind: 'DIY', hood: 'north-stockton', cap: 100, curfew: 1320, pressure: 55, needs: ['VOUCH'], note: 'An empty strip-mall storefront, one of the few places young bands can play. It lasts until the unit is rented.' },
    { id: 'tattoo-floor', kind: 'SHOP', hood: 'little-manila', cap: 50, curfew: 1260, note: 'A tattoo shop that lends its floor, until the first complaint.' },
    { id: 'community-hall', kind: 'HALL', hood: 'little-manila', cap: 200, curfew: 1320, ac: true, note: 'A community hall with someone from the building in the room. Hardcore gets banned after one bad night.' },
    { id: 'waterfront-stage', kind: 'OUTDOOR', hood: 'downtown', cap: 300, curfew: 1260, pa: .5, note: 'An outdoor stage by the water, in daylight and park hours, with a permit.' },
    { id: 'mile-bar', kind: 'BAR', hood: 'miracle-mile', cap: 150, ages: ['A21', 'A18'], matinee: true, curfew: 1410, note: 'A bar and cafe on the old strip, the closest thing to a scene street. Eighteen and over early, twenty-one and over late.' },
    { id: 'old-center-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['A18'], curfew: 1440, note: 'An old downtown room that comes alive on event nights. The liquor license and the fights are the risk.' },
    { id: 'port-unit', kind: 'DIY', hood: 'port-belt', cap: 120, curfew: 1410, pressure: 60, needs: ['VOUCH'], note: 'A warehouse unit by the rail yards with a generator and a practice room. The fire marshal and new logistics buildings are eating the space.' },
    { id: 'fair-hall', kind: 'BIG', hood: 'little-manila', cap: 1500, curfew: 1380, note: 'The fairgrounds hall south of downtown. Rented dates, big touring nights only.' }
  ],

  contacts: ['modesto-ca', 'merced-ca', 'vallejo-ca', 'fresno', 'sacramento'],

  calendar: [
    { id: 'spring-festival', label: 'the spring harvest festival', tag: 'festival', month: 4, week: 4, dows: [4, 5, 6], can: [.88, .85, .85], hoods: ['little-manila'], elsewhere: [.97, .95, .95] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 6, weeks: [2, 3], dows: [4, 5, 6], can: [.9, .88, .88], hoods: ['little-manila'], elsewhere: [.97, .95, .95] },
    { id: 'holiday-parade', label: 'the holiday parade and tree lighting', tag: 'parade', month: 12, week: 1, dows: [5], can: [.85, .85, .85], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'boat-parade', label: 'the lighted boat parade', tag: 'parade', month: 12, week: 1, dows: [5], can: [.85, .85, .85], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'fourth', label: 'the Fourth of July', tag: 'holiday', month: 7, week: 1, dows: [4, 5, 6], can: [.9, .9, .88] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.88, .95, .95], hoods: ['brookside', 'miracle-mile'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.88, .95, .95], hoods: ['brookside', 'miracle-mile'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49, pop: 525000 },
    { name: 'Fresno', state: 'CA', lat: 36.74, lon: -119.79, pop: 540000 },
    { name: 'Bakersfield', state: 'CA', lat: 35.37, lon: -119.02, pop: 410000 },
    { name: 'San Jose', state: 'CA', lat: 37.34, lon: -121.89, pop: 1000000 }
  ],
  roads: ['I-5', 'SR-99', 'SR-4', 'I-205', 'SR-120', 'SR-12'],

  words: {
    street: ['Pacific Avenue', 'El Dorado Street', 'Hammer Lane', 'March Lane', 'Charter Way', 'Eight Mile Road', 'Weber Avenue'],
    water: ['the San Joaquin River', 'the Delta', 'the Calaveras River', 'the Stockton Channel'],
    hood: ['Little Manila', 'Miracle Mile', 'Brookside', 'Weston Ranch', 'Lincoln Village', 'Spanos Park', 'Quail Lakes', 'Boggs Tract'],
    thing: ['tule fog', 'swamp cooler', 'levee', 'cannery', 'lumpia', 'almond orchard', 'tract house', 'delta breeze', 'rule sheet', 'group chat', 'backyard', 'hall rental'],
    weather: ['tule fog', 'triple digits', 'smoke season']
  },

  events: [
    { id: 'STOCKTON_CA_PIT_INJURY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'Someone left the last show at the garage in an ambulance, and the owner has stopped answering.',
      title: 'The ambulance and the ban',
      body: 'A pit injury at the river garage ended with an ambulance and a police car, and the owner says that one more call means hardcore is banned from the room.',
      options: [
        { id: 'SOFT', label: 'Run it with a no-pit rule and a floor monitor', likely: 'It\'s calmer, and some of the kids will grumble.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'You walked the floor all night, nobody got hurt, and the owner took your call afterward.' },
        { id: 'MOVE', label: 'Move the bill to a hall', likely: 'The hall will check the bands first.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'MONEY', amount: -50 }],
          result: 'A hall took the bill with a list of rules, and the floor stayed calm.' },
        { id: 'ACCEPT', label: 'Run it as booked', likely: 'If it goes wrong, the room is gone.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'It went fine, though everyone watched the owner the whole night.' } ] },

    { id: 'STOCKTON_CA_SPRING_FESTIVAL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The festival on the south side takes the parking and the cops.',
      title: 'The festival packs the south side',
      body: 'The spring harvest festival fills the south side with families, so a hall show nearby gets either a crowd of walk-ins or no way to get in.',
      options: [
        { id: 'WALKIN', label: 'Open the doors to the festival crowd', likely: 'Strangers and teens drift in, and some of them cause trouble.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.15 }, { op: 'REGULARS', pct: .02 }],
          result: 'Families drifted in from the festival and stayed for two bands.' },
        { id: 'LATE', label: 'Push doors back until the crowds clear', likely: 'The crowd that wants a night out shows up, later than planned.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'You opened doors an hour late, the parking cleared, and the crowd came in happy.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Nobody can park.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The regulars walked a mile, and the rest stayed home.' } ] },

    { id: 'STOCKTON_CA_BOAT_PARADE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'parade', months: [12] },
      telegraph: 'The first Saturday of December is the boat parade, and the waterfront is closed to cars by four.',
      title: 'The boat parade closes the waterfront',
      body: 'Your show at the outdoor stage runs into the parade. The streets close at dusk, and the lights on the boats are better than your bill.',
      options: [
        { id: 'EARLY', label: 'Move the start up and finish by dusk', likely: 'The people who come get a short, tight set.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -120 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'You opened doors at noon and finished by dusk, and the waterfront was yours until the boats came.' },
        { id: 'INSIDE', label: 'Move the bill indoors to the old center', likely: 'It\'s smaller and warmer, and there\'s no parade.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'CLUB', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .8 }],
          result: 'The old center took the bill, and while the street outside was full of boats, the room was full of punks.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The crowd would rather watch the boats.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'Everyone was down at the water.' } ] },

    { id: 'STOCKTON_CA_TULE_FOG', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [12, 1] },
      telegraph: 'Tule fog is down on the Valley, and the freeway signs say to slow to thirty.',
      title: 'The fog turns the crowd back',
      body: 'Tule fog covers the highways from here to Modesto. Half the crowd from the farm towns is turning around, and the band is crawling.',
      options: [
        { id: 'SHORT', label: 'Run a short bill and end early', likely: 'It\'s a thin night, but the people who came are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'It was a short, tight night, and nobody drove home in the worst of it.' },
        { id: 'WAIT', label: 'Hold the doors and wait for the band', likely: 'It starts late, and the crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The van pulled in at ten, and you started late, but nobody left.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and everybody trusts you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could make it came.' } ] }
  ]
});
