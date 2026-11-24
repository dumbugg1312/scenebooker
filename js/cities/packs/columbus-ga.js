SB.Cities.register('columbus-ga', {
  v: 1,
  slug: 'columbus-ga',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  /* The dossier's real institutions and its invented venue names are in banned: research, not content. */
  banned: ['fort benning', 'benning', 'fort moore', 'aflac', 'global payments', 'tsys', 'columbus state university', 'columbus state', 'csu',
           'columbus technical college', 'auburn university', 'springer opera house', 'rivercenter', 'riverwalk', 'uptown columbus', 'synovus park',
           'eagle & phenix', 'eagle and phenix', 'national infantry museum', 'peachtree mall', 'columbus park crossing', 'american legion', 'vfw',
           'waffle house', 'greyhound', 'amtrak', 'metra', 'ledger-enquirer', 'columbus times', 'tid bits', 'the bayonet', 'the uproar', 'wcug',
           'wjsp', 'wtgz', 'wvrk', 'wrcg', 'wrbl', 'wtvm', 'riverfest', 'myspace', 'fort rucker', 'fort novosel', 'maxwell air force base',
           'lowell of the south', 'scrambled dog', 'peach belt', 'the lintworks', 'mill pond hall', 'the fountain lot', 'whitewater room',
           'victory drive skate and roll', 'the tenth street carport', 'weracoba shed', 'post 411 hall', 'the bibb annex',
           'back room at the laundromat', 'chehaw street storage unit 14', 'the wynnton hill garage',
           'fountain city classic', 'pig jig', 'always uptown', 'aj mcclung', 'mcclung stadium', 'the columbite', 'columbus navigator', 'wltz', 'artsfest',
           'friday night concert series', 'woodruff park', 'georgia hockey', 'ledger enquirer', 'columbus civic center'],
  blocklist: ['waffle house*', 'ledger-enquirer*', 'riverfest*', 'lintworks*', 'springer*', 'aflac*', 'fountain city classic*', 'columbus navigator*'],

  blurb: ['A Georgia army city on the Chattahoochee, across the bridges from Alabama, where soldiers, students and suburban kids share one strip-mall map.',
          'The scene is small and leans on a few rooms, so every closing resets it.'],
  hard: 'A few rooms carry everything, and a closed room resets the scene.',
  region: 'the Deep South',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.81 },
    { name: 'Savannah', state: 'GA', lat: 32.08, lon: -81.09 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Columbus' },
    { id: 'phenix-city', kind: 'FEEDER', name: 'Phenix City', state: 'AL', minutes: 10, bearing: 265, pop: 38800, scene: 300, note: 'Right across the river; kids cross the bridges for shows.' },
    { id: 'cusseta', kind: 'FEEDER', name: 'Cusseta and the base road', minutes: 25, bearing: 160, note: 'Soldiers and families; no scene of its own, but the audience churns through.' },
    { id: 'hamilton', kind: 'FEEDER', name: 'Hamilton and Harris County', minutes: 30, bearing: 20, note: 'Wealthier exurbs; teenagers with cars.' },
    { id: 'opelika', kind: 'FEEDER', name: 'Opelika', state: 'AL', minutes: 35, bearing: 290, note: 'A rail and mill town with a small downtown and some live music.' },
    { id: 'auburn', kind: 'FEEDER', name: 'Auburn', state: 'AL', minutes: 45, bearing: 295, note: 'A big campus; kids and bands come down.', bands: 3 },
    { id: 'talbotton', kind: 'FEEDER', name: 'Talbotton', minutes: 45, bearing: 70, note: 'Tiny farm town; a few kids at most.' },
    { id: 'lagrange', kind: 'FEEDER', name: 'LaGrange', minutes: 60, bearing: 20, note: 'A mill town with a small college and a scene of its own.', bands: 1 },
    { id: 'americus', kind: 'FEEDER', name: 'Americus', minutes: 60, bearing: 115, note: 'A quiet college town; a handful of kids drive up.' },
    { id: 'tuskegee', kind: 'FEEDER', name: 'Tuskegee', state: 'AL', minutes: 60, bearing: 265, note: 'A historic university town; seldom a punk draw.' },
    { id: 'montgomery', kind: 'PEER', name: 'Montgomery', state: 'AL', minutes: 90, bearing: 265, slug: 'montgomery-al', note: 'The closest peer in size: a different state and a capital.' },
    { id: 'albany', kind: 'PEER', name: 'Albany', minutes: 80, bearing: 165, scene: 500, note: 'The smaller sibling down GA-520.' },
    { id: 'macon', kind: 'PEER', name: 'Macon', minutes: 105, bearing: 75, scene: 900, note: 'The other fall-line city; the two compete to be second.' },
    { id: 'tallahassee', kind: 'PEER', name: 'Tallahassee', state: 'FL', minutes: 180, bearing: 190, slug: 'tallahassee-fl', note: 'Two universities and an occasional trade.' }
  ],

  hoods: [
    { id: 'uptown', name: 'Uptown', route: 'downtown', note: 'The river side of downtown: licensed bars and clubs, old industrial buildings and noise complaints from new apartments.' },
    { id: 'wynnton', name: 'Wynnton, Dinglewood and Midtown', route: 'old-side', note: 'Big old houses on the ridge with large lots; quiet, and policed by neighbors.' },
    { id: 'lakebottom', name: 'Lakebottom and Rose Hill', route: 'old-side', note: 'Bungalow streets round the park: teachers, artists and renters with backyards.' },
    { id: 'bibb-city', name: 'Bibb City', route: 'work-side', note: 'A mill village on the river, cheap and forgotten, with small mill houses and loud porches.' },
    { id: 'victory-drive', name: 'South Columbus and Victory Drive', route: 'work-side', note: 'Pawn shops, tattoo parlors and cheap motels on the road to the post.' },
    { id: 'north-east', name: 'North and East Columbus', route: 'campus', note: 'Sprawl: chain restaurants, church campuses and the commuter campus. Where most teenagers live.' },
    { id: 'phenix-side', name: 'Phenix City', route: 'town:phenix-city', note: 'The Alabama side, with different laws and less infrastructure.' }
  ],

  rooms: [
    { id: 'lakebottom-yard', kind: 'HOUSE', hood: 'lakebottom', cap: 40, curfew: 1320, ac: false, outdoor: true, start: true,
      note: 'A rented bungalow with a back yard and a carport. Slab floor, no basement, and one neighbor with a phone.' },
    { id: 'mill-porch', kind: 'HOUSE', hood: 'bibb-city', cap: 50, curfew: 1380, ac: false, outdoor: true, pressure: 55,
      note: 'A small mill house with a loud porch. Cheap and forgotten, but the lots are tight and the neighbors are close.' },
    { id: 'donor-room', kind: 'DIY', hood: 'north-east', cap: 120, ages: ['ALL'], curfew: 1380, ac: true, pressure: 55,
      note: 'A donation-run room in a big old building: couches, pool tables, a small stage at the far end and a weekly open mic. It lives on one organizer and one landlord.' },
    { id: 'record-store', kind: 'SHOP', hood: 'uptown', cap: 100, curfew: 1350, ac: true,
      note: 'An independent record store with a back room that closes the shop for shows. Five to fifteen at the door, doors early, done by ten-thirty.' },
    { id: 'stage-bar', kind: 'BAR', hood: 'uptown', cap: 150, curfew: 1500, ac: true,
      note: 'A restaurant bar with a second-floor listening room. Free nights in the week, covers on weekends, and new apartments next door.' },
    { id: 'club', kind: 'CLUB', hood: 'uptown', cap: 300, ages: ['A18'], curfew: 1470, ac: true, pressure: 50,
      note: 'The standing room for touring bands. Soldiers and students pack it, and the base keeps a list of rooms that are off limits.' },
    { id: 'fellowship-hall', kind: 'HALL', hood: 'north-east', cap: 150, curfew: 1320, ac: true,
      note: 'A church fellowship hall or a veterans\' post. The rent is cheap and the older members can veto a loud night.' },
    { id: 'street-stage', kind: 'OUTDOOR', hood: 'uptown', cap: 500, curfew: 1320, ac: false, outdoor: true, pressure: 50,
      note: 'A closed-off block with a stage on fall Fridays. Free, all ages and family-friendly, and punk gets in only as a one-off.' },
    { id: 'victory-storefront', kind: 'DIY', hood: 'victory-drive', cap: 80, curfew: 1380, ac: false, pressure: 55,
      note: 'A storefront behind the pawn shops and motels. Cheap and loud, and the fire marshal is the threat.' },
    { id: 'harris-land', kind: 'OUTDOOR', hood: 'north-east', cap: 60, curfew: 1560, ac: false, outdoor: true,
      note: 'A generator show on somebody\'s cousin\'s land. All night if the weather holds, and a long drive home.' },
    { id: 'arena', kind: 'BIG', hood: 'uptown', cap: 3000, curfew: 1380, ac: true,
      note: 'The city arena books package tours. Far from DIY, and a local band gets on the bill only through a miracle.' }
  ],

  contacts: ['montgomery-al', 'tallahassee-fl', 'atlanta', 'birmingham', 'augusta-ga'],

  calendar: [
    { id: 'rivalry', label: 'the big rivalry football weekend', tag: 'game', month: 11, week: 2, dows: [4, 5], can: [.85, .80, .80], hoods: ['uptown'], elsewhere: [.92, .90, .90] },
    { id: 'river-fest', label: 'the spring river music festival', tag: 'festival', month: 5, week: 1, dows: [4, 5], can: [.90, .85, .85], hoods: ['uptown'], elsewhere: [1, .97, .97] },
    { id: 'july-fourth', label: 'the Fourth of July fireworks', tag: 'holiday', month: 7, week: 1, dows: [4, 5], can: [.90, .88, .88], hoods: ['uptown'], elsewhere: [1, .97, .97] },
    { id: 'fall-uptown', label: 'the fall Uptown festival', tag: 'festival', month: 9, weeks: [3, 4], dows: [5], can: [.92, .88, .88], hoods: ['uptown'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.88, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.88, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1260, weekend: 1260, inForce: false } },

  points: [
    { name: 'Macon', state: 'GA', lat: 32.84, lon: -83.63, pop: 157000 },
    { name: 'Albany', state: 'GA', lat: 31.58, lon: -84.16, pop: 70000 },
    { name: 'Athens', state: 'GA', lat: 33.96, lon: -83.38, pop: 127000 },
    { name: 'Dothan', state: 'AL', lat: 31.22, lon: -85.39, pop: 71000 }
  ],
  roads: ['I-185', 'US 80', 'US 27', 'US 280', 'GA 520', 'I-85'],

  words: {
    street: ['Victory Drive', 'Veterans Parkway', 'Macon Road', 'Wynnton Road', 'Broadway', 'Whittlesey Road', 'Manchester Expressway'],
    water: ['the Chattahoochee', 'the river', 'Lake Oliver'],
    hood: ['Uptown', 'Wynnton', 'Dinglewood', 'Midtown', 'Lakebottom', 'Rose Hill', 'Bibb City', 'Phenix City', 'Cusseta'],
    thing: ['red clay', 'mill house', 'boiled peanuts', 'sweet tea', 'carport', 'bridge traffic', 'open mic', 'record store', 'paint cans', 'pool table'],
    weather: ['heat index', 'tornado watch']
  },
  events: [
    { id: 'COLUMBUS_GA_NEIGHBOR_CALL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'A neighbor on the block has been standing at the fence with a phone.',
      title: 'Audible from the property line',
      body: 'The city code makes anything you can hear from the property line a violation after ten, a neighbor knows it, and it is Saturday.',
      options: [
        { id: 'EARLY', label: 'Start early and be done by ten', likely: 'Most of them make it, but it\'s a short, tight night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors early and the last chord at ten sharp, and nobody called.' },
        { id: 'QUIET', label: 'Turn it down and play it acoustic', likely: 'A strange, quiet night, and the people who came are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Everybody played quiet sets on the porch, and the neighbor stayed inside.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The call comes, and maybe the cops do too.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The call came at ten-fifteen, and half the room left before the second knock.' }
      ] },

    { id: 'COLUMBUS_GA_RIVALRY_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'The hotels are full and the big game is on Saturday.',
      title: 'The whole town is at the game',
      body: 'Hotels are full, Uptown is closed to traffic, and half the all-ages crowd has a ticket to the stadium, and your show is on the same night.',
      options: [
        { id: 'LATE', label: 'Push doors back until the game lets out', likely: 'The crowd that wants a night out shows up, later than planned.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors opened an hour late, and they came in loud from the game.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the stadium.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The casual crowd stayed at the game, but the regulars came.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new date.' }
      ] },

    { id: 'COLUMBUS_GA_UPTOWN_CURFEW', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [6, 7, 8, 9] },
      telegraph: 'The council is talking about extending the Uptown curfew for kids.',
      title: 'The curfew catches a carload',
      body: 'A curfew for unsupervised minors covers the blocks around the record store, and a carload of sixteen-year-olds is headed for the back room at nine-thirty.',
      options: [
        { id: 'EARLY', label: 'Move the start up so they are inside by nine', likely: 'Most make it, but the start is thin.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .92 }],
          result: 'Doors opened an hour early, and the kids were inside before the patrol came by.' },
        { id: 'HOLD', label: 'Hold them inside until a parent comes', likely: 'Costs two hours of your night, and nobody gets cited.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'You kept them in the back room and called every parent.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The young ones stay home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The curfew scared off the youngest, and the room ran old.' }
      ] }
  ]
});
