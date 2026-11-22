SB.Cities.register('provo-ut', {
  v: 1,
  slug: 'provo-ut',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['byu', 'brigham young university', 'uvu', 'utah valley university', 'honor code', 'lds', 'latter-day saints', 'church of jesus christ',
           'general conference', 'vivint', 'qualtrics', 'silicon slopes', 'frontrunner', 'uvx', 'uta', 'amtrak', 'california zephyr', 'kbyu', 'kenz', 'kxrk',
           'america\'s freedom festival', 'freedom festival', 'stadium of fire', 'festival latinoamericano', 'provo pride', 'utah valley marathon',
           'snow college', 'weber state', 'utah state university', 'university of utah', 'hill air force base', 'camp williams', 'tooele army depot',
           'dirty soda', 'fry sauce', 'maeser grange', 'fourth west hall', 'sego annex', 'the quiet hour', 'lakeview roller & skate', 'lakeview roller',
           'y-side garage', 'cottonwood back room', 'temple view carport', 'orchard storage unit', 'deseret warehouse 9', 'fry sauce pizza & games',
           'gilsonite room',
           'provo music magazine', 'daily universe', 'herald extra', 'daily herald', 'deseret news', 'salt lake tribune', 'slug mag', 'city weekly', 'visit utah',
           'kerrang', 'rooftop concert series', 'oremfest', 'bluegrassroots', 'balloon fest', 'freedom run', 'grand parade', 'freedom days', 'pioneer day',
           'provo city half marathon', 'carnaval boliviano', 'utah county fair', 'thanksgiving point', 'scera park', 'city center park', 'university place',
           'nu skin plaza', 'nuskin', 'lavell edwards', 'ksl'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['byu*', 'brigham young*', 'freedom festival*', 'stadium of fire*', 'deseret*', 'vivint*', 'qualtrics*', 'frontrunner*'],

  blurb: ['Dry, young and polite: shows run on soda, basements and an all-ages room that never serves beer.',
          'The crowd turns over every few years, as kids graduate, marry or leave on missions, and nobody plays Sunday.'],
  hard: 'Dry rooms, Sunday dead, and the students vanish in April.',
  region: 'the Wasatch Front',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Las Vegas', state: 'NV', lat: 36.17, lon: -115.14 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Provo' },
    { id: 'orem', kind: 'FEEDER', name: 'Orem', minutes: 15, bearing: 20, scene: 600, note: 'The other half of the scene: strip malls, a big commuter campus, suburban kids and practice rooms.' },
    { id: 'springville', kind: 'FEEDER', name: 'Springville', minutes: 15, bearing: 165, note: 'Skate and garage kids in a small suburban town to the south.' },
    { id: 'spanish-fork', kind: 'FEEDER', name: 'Spanish Fork', minutes: 20, bearing: 155, note: 'Suburban and farm-edge; kids drive up the freeway.' },
    { id: 'american-fork', kind: 'FEEDER', name: 'American Fork and Pleasant Grove', minutes: 20, bearing: 355, note: 'A fast-growing tech-suburb strip to the north.' },
    { id: 'payson', kind: 'FEEDER', name: 'Payson', minutes: 25, bearing: 160, note: 'A small farm and church town.' },
    { id: 'nephi', kind: 'FEEDER', name: 'Nephi', minutes: 45, bearing: 175, note: 'A farm town in the next valley south.' },
    { id: 'heber', kind: 'FEEDER', name: 'Heber City', minutes: 40, bearing: 60, note: 'Up the canyon; ski-resort staff live here. Probably a handful of bands.', bands: 1 },
    { id: 'ephraim', kind: 'FEEDER', name: 'Ephraim', minutes: 80, bearing: 175, note: 'A small college town far to the south; some kids with a band.' },
    { id: 'price', kind: 'FEEDER', name: 'Price', minutes: 85, bearing: 110, note: 'A coal and rail town over the pass, with a small college branch.' },
    { id: 'ogden', kind: 'PEER', name: 'Ogden', minutes: 70, bearing: 350, slug: 'ogden-ut', note: 'An older, grittier railroad town up the freeway, past Salt Lake.' },
    { id: 'logan', kind: 'PEER', name: 'Logan', minutes: 125, bearing: 5, scene: 600, note: 'A college town in the far north valley with the same church-heavy culture.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Old brick on Center Street and University Avenue: dry all-ages rooms, galleries and record shops, with storefront rent as the pressure.' },
    { id: 'student-grid', name: 'the student grid by campus', route: 'campus', note: 'Small old houses and apartment blocks rented to students. Basements, but landlords and housing contracts bite.' },
    { id: 'west-provo', name: 'west Provo', route: 'work-side', note: 'Cheap working-class streets with yards and detached garages. The best fit for backyard and garage shows.' },
    { id: 'southwest-provo', name: 'the I-15 business strip', route: 'work-side', note: 'Warehouses, business parks and big-box lots. Practice spaces and quiet one-night rooms, with few neighbors.' },
    { id: 'east-bench', name: 'the east bench', route: 'old-side', note: 'Wealthy foothill streets with finished basements. Few shows, but the comfortable kids who fund the scene live here.' },
    { id: 'lakeview', name: 'Lakeview and the lake edge', route: 'old-side', note: 'Flat new subdivisions and farmland toward Utah Lake. Quiet and lonely.' },
    { id: 'orem-state-st', name: 'Orem and the State Street strip', route: 'town:orem', note: 'Strip malls, skate culture and industrial-lot practice rooms. Less watched than Provo and less seasonal.' }
  ],

  rooms: [
    { id: 'grid-basement', kind: 'HOUSE', hood: 'student-grid', cap: 40, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, sketch: 20, standing: [70, 60, 45],
      pressure: 55, start: true, note: 'A basement in an old student rental, with the landlord upstairs. The housing contract and the noise code are both listening.' },
    { id: 'west-yard', kind: 'HOUSE', hood: 'west-provo', cap: 60, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: true, sketch: 25, standing: [65, 60, 45],
      pressure: 45, note: 'A backyard and a detached garage on a working-class lot. More room than the grid, and the yard is a summer-only idea.' },
    { id: 'main-storefront', kind: 'DIY', hood: 'downtown', cap: 80, rent: 70, deposit: 0, pa: .5, curfew: 1380, ac: false, sketch: 40, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'An old brick storefront on the avenue. All ages and cheap, and it lives or dies on the next rent.' },
    { id: 'business-unit', kind: 'DIY', hood: 'southwest-provo', cap: 100, rent: 60, deposit: 0, pa: .6, curfew: 1380, ac: false, sketch: 45, standing: [55, 60, 45],
      pressure: 55, needs: ['VOUCH'], note: 'A practice-space unit in a business park. No neighbors, one night at a time, and a fire marshal who might drive by.' },
    { id: 'orem-warehouse', kind: 'DIY', hood: 'orem-state-st', cap: 250, rent: 90, deposit: 0, pa: .7, curfew: 1380, ac: false, sketch: 50, standing: [50, 60, 40],
      pressure: 65, needs: ['VOUCH'], note: 'A converted warehouse in Orem that took the place of the all-ages rooms that closed before it. Everyone knows it could go too.' },
    { id: 'record-shop', kind: 'SHOP', hood: 'downtown', cap: 50, pa: .4, curfew: 1170, ac: true, sketch: 5, standing: [70, 70, 75], following: .2,
      note: 'The record shop downtown. Afternoon in-stores, soda and a hard stop before dinner.' },
    { id: 'gallery-club', kind: 'CLUB', hood: 'downtown', cap: 300, houseCosts: 150, split: .8, pa: .9, ages: ['ALL'], curfew: 1380, ac: true, following: .5, sketch: 10,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The dry all-ages gallery club. Doors at eight, no beer, and indie bills far more often than punk.' },
    { id: 'ward-hall', kind: 'HALL', hood: 'west-provo', cap: 150, rent: 100, deposit: 50, pa: .5, curfew: 1320, ac: true, sketch: 5, standing: [60, 60, 60],
      owner: 'CHURCH_CONTACT', pressure: 45, note: 'A cultural hall in a church building. Plenty of room, and the host decides what counts as too loud.' },
    { id: 'lot-park', kind: 'OUTDOOR', hood: 'southwest-provo', cap: 120, rent: 15, pa: .4, curfew: 1170, sketch: 35, standing: [60, 55, 40],
      note: 'A skatepark and an empty lot by the freeway. Summer evenings only, and the parks close at eleven.' }
  ],

  contacts: ['ogden-ut', 'salt-lake-city', 'boise-id'],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1380, weekend: 1380, inForce: false } },

  calendar: [
    { id: 'july-fourth', label: 'the Fourth of July week', tag: 'festival', month: 7, week: 1, dows: [3, 4, 5, 6], can: [.85, .80, .80], hoods: ['downtown', 'student-grid'], elsewhere: [.95, .92, .92] },
    { id: 'july-24', label: 'the July 24th state holiday weekend', tag: 'holiday', month: 7, week: 4, dows: [4, 5], can: [.85, .85, .85] },
    { id: 'half-marathon', label: 'the spring half marathon', tag: 'race', month: 5, week: 1, dows: [5], can: [.93, .90, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'conference-apr', label: 'the church conference weekend', tag: 'holiday', month: 4, week: 1, dows: [5, 6], can: [.70, .75, .75] },
    { id: 'conference-oct', label: 'the church conference weekend', tag: 'holiday', month: 10, week: 1, dows: [5, 6], can: [.70, .75, .75] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.85, .95, .95], hoods: ['student-grid'], elsewhere: [.95, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.85, .95, .95], hoods: ['student-grid'], elsewhere: [.95, 1, 1] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 5], dows: [5], can: [.85, .95, .95], hoods: ['student-grid'], elsewhere: [.95, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89, pop: 1200000 },
    { name: 'Provo Canyon', state: 'UT', lat: 40.33, lon: -111.55, pop: 2000 },
    { name: 'St. George', state: 'UT', lat: 37.10, lon: -113.58, pop: 100000 },
    { name: 'Las Vegas', state: 'NV', lat: 36.17, lon: -115.14, pop: 2300000 }
  ],
  roads: ['I-15', 'US 89', 'US 189', 'US 6', 'University Avenue', 'Center Street'],

  words: {
    street: ['University Avenue', 'Center Street', 'State Street', 'Freedom Boulevard', 'University Parkway'],
    water: ['Utah Lake', 'Provo River', 'Provo Canyon', 'Rock Canyon'],
    hood: ['Joaquin', 'Maeser', 'Franklin', 'Lakeview', 'Riverwoods', 'Provo Bay'],
    thing: ['basement', 'cream soda', 'cultural hall', 'ward building', 'returned missionary', 'inversion', 'foothill', 'soda run', 'finished basement', 'skatepark'],
    weather: ['inversion', 'dry heat', 'canyon wind']
  },

  events: [
    { id: 'PROVO_UT_JULY_FOURTH', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival', months: [7] },
      telegraph: 'The holiday week is on: a parade, a balloon morning and fireworks that close half of downtown.',
      title: 'Downtown is closed for the Fourth',
      body: 'Roads are shut around the park, every lot is taken and the whole valley is out in lawn chairs. Your show is in the same half mile.',
      options: [
        { id: 'LATE', label: 'Push doors back until the fireworks are over', likely: 'The kids come in after, loud and sunburned.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. The crowd walked over from the fireworks with their folding chairs.' },
        { id: 'ACCEPT', label: 'Run it as planned and let them find parking', likely: 'Half the list gives up on the roads.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The ones who walked made it. The ones who drove are still circling.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'PROVO_UT_WAREHOUSE_GONE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'Word is out that the big warehouse in Orem has stopped booking, and nobody knows where its crowd will go.',
      title: 'The warehouse crowd shows up at your door',
      body: 'A couple of hundred kids who used to fill the Orem warehouse heard there was a show tonight. Your room holds a quarter of them, the noise rule is ten o\'clock, and the council just tightened it.',
      options: [
        { id: 'TURN', label: 'Cap the door and turn the rest away', likely: 'Fair, and the line on the sidewalk is a risk of its own.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .6 }, { op: 'REGULARS', pct: .02 }],
          result: 'You held the line at the door. The ones inside got a good night, and the ones outside got the address for next time.' },
        { id: 'MOVE', label: 'Move the whole bill to a bigger basement', likely: 'Smaller and louder, with more neighbors to hear it.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'A bigger basement across town took the bill. Half the line followed the van.' },
        { id: 'ACCEPT', label: 'Let them all in and watch the clock', likely: 'A packed night, and the neighbors will call.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.15 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Wall to wall, with the windows sweating. The neighbors called at ten.' }
      ] },

    { id: 'PROVO_UT_GAME_DAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'A home game is on Saturday, and the grid will be wall to wall with fans by noon.',
      title: 'The stadium takes the street',
      body: 'Every curb near campus is taken by noon. The basement show tonight has no parking, a late start and a hard stop at ten.',
      options: [
        { id: 'LATE', label: 'Start late and play short', likely: 'The crowd that wants a night out shows up.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late, bands trimmed to fit before ten.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the game.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The casual crowd stayed home. The regulars walked in from three blocks away.' }
      ] }
  ]
});
