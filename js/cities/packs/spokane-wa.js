SB.Cities.register('spokane-wa', {
  v: 1,
  slug: 'spokane-wa',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['gonzaga university', 'gonzaga', 'whitworth', 'eastern washington university', 'washington state university', 'wsu', 'fairchild air force base',
           'fairchild', 'bloomsday', 'lilac festival', 'torchlight parade', 'hoopfest', 'pig out in the park', 'hillyard festival',
           'interstate fair', 'spokane county interstate fair', 'amtrak', 'great northern railway', 'creative by nature', 'lilac city', 'hooptown usa',
           'spokesman-review', 'spokesman review', 'inlander', 'kyrs', 'spokane indians', 'spokane chiefs', 'vfw', 'american legion',
           'the rail spur hall', 'rail spur hall', 'havana street annex', 'fourth floor fellowship hall', 'the grain elevator room', 'grain elevator room',
           'latah creek grange', 'the falls basement', 'marshall street rec', 'the interstate room', 'lilac lane lodge', 'the viaduct shop',
           'lilac bloomsday run', 'armed forces torchlight parade', 'spokane hoopfest association', 'spokane arena', 'spokane transit authority', 'spokane tribe resort',
           'spokane live', 'spokane entertainment district', 'spokane county fair and expo center', 'spokane city council', 'crucial times fest', 'sonic solstice',
           'punk rock flea market', 'punk palouse fest', 'geekfest', 'decolonise fest', 'kxly', 'krem', 'khq', 'spokane rising', 'spokane historical society',
           'wslcb', 'spokane county juvenile court', 'spokane police', 'nevada heights',
           'market street back room', 'the basalt hall'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Colleges, events and the weekly paper appear in game text only as generic words. */
  blocklist: ['gonzaga*', 'spokesman*', 'inlander*', 'hoopfest*', 'bloomsday*', 'lilac festival*', 'latah creek grange*', 'viaduct shop*'],

  blurb: ['It\'s a long drive from anywhere. The good rooms are borrowed halls and basements, and nobody keeps a room for long.',
          'All-ages rooms are scarce and the next big city is over the mountains, so a show feels like an event.'],
  hard: 'Few all-ages rooms, and the ones that exist keep disappearing.',
  region: 'the Inland Northwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Missoula', state: 'MT', lat: 46.87, lon: -113.99 },
    { name: 'Boise', state: 'ID', lat: 43.62, lon: -116.2 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Spokane' },
    { id: 'valley', kind: 'FEEDER', name: 'Spokane Valley and Liberty Lake', minutes: 15, bearing: 90, pop: 103000, note: 'The big east suburb, its own city; industrial units, halls and a lot of audience kids who need a ride.' },
    { id: 'airway-heights', kind: 'FEEDER', name: 'Airway Heights and Medical Lake', minutes: 15, bearing: 250, note: 'Casino, prison and base-adjacent towns west on US 2; military families.' },
    { id: 'cheney', kind: 'FEEDER', name: 'Cheney', minutes: 20, bearing: 230, pop: 13255, note: 'A state-college town on I-90 with a scene that comes and goes with the semester.', bands: 2 },
    { id: 'post-falls', kind: 'FEEDER', name: 'Post Falls and Rathdrum', state: 'ID', minutes: 25, bearing: 80, note: 'Fast-growing suburban Idaho towns; younger, more conservative kids and fewer rooms.' },
    { id: 'deer-park', kind: 'FEEDER', name: 'Deer Park', minutes: 30, bearing: 350, note: 'A small farm and bedroom town up US 395; kids drive in.' },
    { id: 'coeur-d-alene', kind: 'FEEDER', name: 'Coeur d\'Alene', state: 'ID', minutes: 40, bearing: 85, pop: 54628, note: 'A lake resort and retiree town; its own all-ages options are limited, so kids drive west.' },
    { id: 'newport', kind: 'FEEDER', name: 'Newport', minutes: 55, bearing: 25, note: 'A small rural town on US 2 near the Idaho line; no scene.' },
    { id: 'silver-valley', kind: 'FEEDER', name: 'Kellogg and Wallace', state: 'ID', minutes: 70, bearing: 100, note: 'Old mining towns in the Silver Valley; a few kids make the trip.' },
    { id: 'sandpoint', kind: 'FEEDER', name: 'Sandpoint', state: 'ID', minutes: 90, bearing: 40, note: 'A lake and ski town with an arts reputation and a small scene of its own.', bands: 1 },
    { id: 'pullman', kind: 'PEER', name: 'Pullman and Moscow', state: 'WA', minutes: 85, bearing: 175, scene: 1500, note: 'Two twin university towns across the Idaho line; crowds trade both ways on the college calendar.' },
    { id: 'tri-cities', kind: 'PEER', name: 'the Tri-Cities', minutes: 140, bearing: 190, slug: 'kennewick-wa', note: 'A desert metro of agriculture and nuclear work; trades some bands.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The brick core on the south bank of the river: mid-sized rooms with bars, vacant storefronts and basements, rents climbing on the best blocks.' },
    { id: 'east-central', name: 'East Central and the Sprague corridor', route: 'work-side', note: 'The working-class east side south of the river: old houses with basements, antiques and bars on Sprague, being priced up.' },
    { id: 'brownes-addition', name: 'Browne\'s Addition', route: 'old-side', note: 'Huge old mansions cut into apartments west of downtown; renters, big rooms for house shows, and noise complaints.' },
    { id: 'west-central', name: 'West Central', route: 'work-side', note: 'The modest, cheap north-bank neighborhood across the river; the new condo bluff beside it is priced out of shows.' },
    { id: 'hillyard', name: 'Hillyard', route: 'work-side', note: 'A former railroad town in the northeast corner with old rail-worker houses and a rough reputation; cheap and murals.' },
    { id: 'north-bank', name: 'Logan and the north-bank university area', route: 'campus', note: 'Student rentals and older houses by the Jesuit university; house shows draw noise complaints from neighbors.' },
    { id: 'south-hill', name: 'the South Hill', route: 'old-side', note: 'The big residential plateau south of downtown: grand old houses and ordinary middle-class streets; real basements, but priced up.' },
    { id: 'the-valley', name: 'the Valley', route: 'campus', note: 'Strip malls, light industry and chain restaurants east of Havana Street; shop rooms, halls and carports for shows.' }
  ],

  rooms: [
    { id: 'north-garage', kind: 'HOUSE', hood: 'north-bank', cap: 50, curfew: 1320, ac: false, outdoor: false, pressure: 55, start: true,
      note: 'A garage turned into a practice room and a show room, run by a couple from their own lot. One neighbor call or a landlord ends it.' },
    { id: 'sprague-basement', kind: 'HOUSE', hood: 'east-central', cap: 40, curfew: 1320, ac: false, outdoor: false, pressure: 55,
      note: 'A basement in an old frame house. The fire count and the neighbors are the risk.' },
    { id: 'mansion-flat', kind: 'HOUSE', hood: 'brownes-addition', cap: 60, curfew: 1320, ac: false, outdoor: false, pressure: 55,
      note: 'A big-roomed apartment in a cut-up mansion. Loud, with close neighbors and a lot of tenant turnover.' },
    { id: 'shop-lot', kind: 'DIY', hood: 'south-hill', cap: 150, curfew: 1320, ac: false, outdoor: true, pressure: 50,
      note: 'A storefront and its lot, used for daytime outdoor sets. The weather and the shop lease decide it.' },
    { id: 'reception-hall', kind: 'HALL', hood: 'north-bank', cap: 300, rent: 15, deposit: 0, curfew: 1380, ac: true, owner: 'HALL_MANAGER',
      note: 'A former church turned reception hall, rented by the night. It runs on the owner saying yes.' },
    { id: 'east-end-room', kind: 'DIY', hood: 'downtown', cap: 200, curfew: 1380, ac: true, standing: [60, 65, 65],
      note: 'A new all-ages room with a cafe bar and good sound. A fair size for visiting bands.' },
    { id: 'old-all-ages', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['ALL'], curfew: 1380, ac: true, notice: 56, needs: ['FULL_BILL'], pressure: 60,
      note: 'A long-closed all-ages room being brought back on crowdfunding. The sprinkler bill has blocked it so far.' },
    { id: 'concert-hall', kind: 'CLUB', hood: 'downtown', cap: 400, ages: ['ALL'], curfew: 1380, ac: true, notice: 56, pressure: 60,
      note: 'A ticketed hall that books all-ages hardcore and metal. It shut once over violence, so it is a fragile step up.' },
    { id: 'sprague-bar', kind: 'BAR', hood: 'east-central', cap: 150, ages: ['A21'], curfew: 1530, ac: true,
      note: 'A bar with a stage that has to keep minors out. It books the twenty-one-plus metal and punk bills.' },
    { id: 'parkade', kind: 'OUTDOOR', hood: 'downtown', cap: 500, curfew: 1260, rent: 0, pressure: 55,
      note: 'A parking garage that turns into a market with bands for a weekend. The weather and the park hours decide it.' },
    { id: 'arena-big', kind: 'BIG', hood: 'downtown', cap: 1000, curfew: 1380,
      note: 'The arena and a resort hall out on the reservation, where package tours play. A big step above DIY.' },
    { id: 'rail-hall', kind: 'HALL', hood: 'hillyard', cap: 120, curfew: 1320, ac: false, pressure: 50,
      note: 'A union hall in the old rail neighborhood, rented by the night. The kitchen bar has to stay locked.' }
  ],

  contacts: ['kennewick-wa', 'missoula-mt', 'yakima-wa', 'seattle'],

  calendar: [
    { id: 'road-race', label: 'the road race', tag: 'race', month: 5, week: 1, dows: [6], can: [.95, .92, .92] },
    { id: 'spring-parade', label: 'the spring festival parade', tag: 'parade', month: 5, week: 3, dows: [5], can: [.85, .80, .80], hoods: ['downtown'], elsewhere: [.97, .95, .95] },
    { id: 'street-hoops', label: 'the street basketball weekend', tag: 'festival', month: 6, week: 4, dows: [5, 6], can: [.88, .85, .85], hoods: ['downtown'], elsewhere: [.97, .95, .95] },
    { id: 'flea-market', label: 'the flea market weekend', tag: 'festival', month: 8, week: 1, dows: [4, 5, 6], can: [.95, .92, .92], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 9, weeks: [2, 3], dows: [3, 4, 5, 6], can: [.90, .88, .88], hoods: ['the-valley'], elsewhere: [.97, .95, .95] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.88, .97, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.88, .97, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320 },


  points: [
    { name: 'Missoula', state: 'MT', lat: 46.87, lon: -113.99, pop: 75000 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33, pop: 750000 },
    { name: 'Wenatchee', state: 'WA', lat: 47.42, lon: -120.31, pop: 35000 },
    { name: 'Lewiston', state: 'ID', lat: 46.42, lon: -117.02, pop: 34000 }
  ],
  roads: ['I-90', 'US 2', 'US 395', 'US 195', 'Division Street'],

  words: {
    street: ['Division Street', 'Sprague Avenue', 'Monroe Street', 'Hamilton Street', 'Market Street', 'Havana Street', 'Sunset Boulevard'],
    water: ['the Spokane River', 'Latah Creek', 'the falls', 'Medical Lake'],
    hood: ['Browne\'s Addition', 'Hillyard', 'East Central', 'West Central', 'Peaceful Valley', 'the South Hill', 'Logan', 'the Valley', 'the Y'],
    thing: ['basement', 'espresso stand', 'wildfire smoke', 'pickup truck', 'huckleberry', 'woodstove', 'chains', 'fellowship hall', 'practice space'],
    weather: ['smoke season', 'hard freeze', 'pass closure']
  },

  events: [
    { id: 'SPOKANE_WA_PARADE_NIGHT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], calendar: 'parade' },
      telegraph: 'The parade is Saturday, and the city shuts the downtown streets at a quarter to eight.',
      title: 'No van within six blocks',
      body: 'The parade has every downtown street closed by a quarter to eight. A band can\'t get a van within six blocks of the room, and the load-in is a long walk.',
      options: [
        { id: 'EARLY', label: 'Load in before the streets close', likely: 'It\'s a scramble, and the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Everything was in by seven, and the crowd came in on foot, a little late.' },
        { id: 'CARRY', label: 'Carry the gear in by hand', likely: 'It\'s slow, and the bands will remember it.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'You carried amps six blocks on foot, and the set started late and loose.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date, and the bands trust you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'SPOKANE_WA_PASS_SNOW', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [11, 12, 1, 2, 3] },
      telegraph: 'The pass is closing for snow, and a band from over the mountain is on it.',
      title: 'The pass is closed',
      body: 'A band booked from Missoula is stuck behind a pass closure, and the bill has to be rebuilt from locals before doors.',
      options: [
        { id: 'LOCALS', label: 'Rebuild the bill from local bands', likely: 'It\'s a thinner night with a hometown feel.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Three local bands filled in, and the room was half full and loud.' },
        { id: 'WAIT', label: 'Hold the doors and wait for them', likely: 'It starts late, and the crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The van made it at ten, and you started late, but nobody left.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and everybody trusts you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could make it came.' }
      ] },

    { id: 'SPOKANE_WA_NEIGHBOR_CALL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'A neighbor on the block has already said the music carries across the fence.',
      title: 'The fifty-foot call',
      body: 'A neighbor calls the sound rule on a north-side garage show, and you can cut the set to unplugged or move the whole night into the practice room.',
      options: [
        { id: 'QUIET', label: 'Cut to unplugged', likely: 'It\'s quiet, and not what they came for.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'It was a soft, strange night under the porch light, and the people who stayed liked it.' },
        { id: 'INSIDE', label: 'Move it into the practice room', likely: 'It\'s smaller and louder, and out of earshot.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'You packed the practice room, and nobody outside could hear it.' },
        { id: 'ACCEPT', label: 'Run it and take the warning', likely: 'A second call ends it for good.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The officer came at ten, and you finished the set with the amps turned down.' }
      ] }
  ]
});
