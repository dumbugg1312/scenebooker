SB.Cities.register('charlottesville-va', {
  v: 1,
  slug: 'charlottesville-va',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of virginia', 'uva', 'the cavaliers', 'wahoos', 'hoos', 'hokies', 'virginia tech', 'james madison university', 'jmu', 'cavalier daily', 'the daily progress', 'daily progress',
           'c-ville weekly', 'charlottesville tomorrow', 'wtju', 'wnrn', 'foxfield', 'foxfield races', 'virginia film festival', 'virginia festival of the book', 'first night virginia',
           'mary baldwin', 'longwood university', 'piedmont virginia community college', 'liberty university', 'csx', 'norfolk southern', 'amtrak', 'vfw', 'american legion',
           'waffle house', 'wawa', 'sheetz', 'virginia abc', 'unite the right', 'vinegar hill',
           'the carlton boiler room', 'meadowbrook lanes', 'the piedmont feed annex', 'rivanna grange hall', 'hydraulic road glass and mirror', 'the seminole trail rink',
           'locust alley laundromat', 'the ridge street cannery', 'shamrock road fellowship hall', 'the mulberry ave annex', 'free bridge tire and wheel', 'the preston plaza warehouse',
           'fridays after 5', 'cville right now', 'c-ville', 'ting pavilion', 'scott stadium', 'virginia athletics', 'virginia sports', 'visit charlottesville',
           'wxtj', 'charlottesville police department', 'loop de\'ville', 'loop de ville', 'rivanna roots', 'charlottesville arts festival',
           'scottsville fridays on the canal', 'steeplechase', 'issuu', 'spin magazine', 'wmra'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The 2017 events are never written in game text. */
  blocklist: ['uva*', 'foxfield*', 'cavalier daily*', 'c-ville*', 'wtju*', 'wnrn*', 'waffle house*', 'sheetz*'],

  blurb: ['Shows live in student houses and Sunday matinees, and the address travels by word of mouth.',
          'The best house closed in 2020, and the town\'s money makes the next one hard to keep.'],
  hard: 'Houses turn over with every August lease, and the clubs want an older crowd.',
  region: 'the Piedmont',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Charlottesville' },
    { id: 'crozet', kind: 'FEEDER', name: 'Crozet', minutes: 20, bearing: 270, note: 'A commuter village at the foot of the mountains with breweries and orchards.' },
    { id: 'scottsville', kind: 'FEEDER', name: 'Scottsville', minutes: 25, bearing: 195, note: 'A tiny river town south on VA 20; kids from the south county.' },
    { id: 'waynesboro', kind: 'FEEDER', name: 'Waynesboro', minutes: 30, bearing: 280, note: 'An old mill town over the mountain with a small teenage DIY scene.', bands: 2 },
    { id: 'palmyra', kind: 'FEEDER', name: 'Palmyra and the lake suburb', minutes: 30, bearing: 100, note: 'A retiree and commuter suburb southeast; kids drive in.' },
    { id: 'stanardsville', kind: 'FEEDER', name: 'Stanardsville and Greene County', minutes: 30, bearing: 5, note: 'Rural country north on US 29.' },
    { id: 'orange', kind: 'FEEDER', name: 'Orange', minutes: 35, bearing: 40, note: 'A small county seat in horse country.' },
    { id: 'louisa', kind: 'FEEDER', name: 'Louisa', minutes: 35, bearing: 85, note: 'Farm and bedroom country to the east.' },
    { id: 'staunton', kind: 'FEEDER', name: 'Staunton', minutes: 40, bearing: 285, note: 'A valley small city with an arts downtown and some DIY.', bands: 2 },
    { id: 'lovingston', kind: 'FEEDER', name: 'Lovingston and Nelson County', minutes: 40, bearing: 215, note: 'Orchards, breweries and mountain roads; kids come in for shows.' },
    { id: 'culpeper', kind: 'FEEDER', name: 'Culpeper', minutes: 45, bearing: 55, note: 'A farm and commuter town edging toward the capital\'s exurbs.', bands: 1 },
    { id: 'harrisonburg', kind: 'PEER', name: 'Harrisonburg', minutes: 65, bearing: 315, slug: 'harrisonburg-va', note: 'A cheaper valley college town with more basements; Charlottesville is the fancy one.' },
    { id: 'lynchburg', kind: 'PEER', name: 'Lynchburg', minutes: 70, bearing: 215, slug: 'lynchburg-va', note: 'The church-heavy conservative neighbor down US 29.' },
    { id: 'roanoke', kind: 'PEER', name: 'Roanoke', minutes: 105, bearing: 235, slug: 'roanoke-va', note: 'A gritty rail city, the rougher cousin.' },
    { id: 'blacksburg', kind: 'PEER', name: 'Blacksburg and Christiansburg', minutes: 135, bearing: 245, scene: 1100, note: 'A big technical-college town with a real DIY culture.' }
  ],

  hoods: [
    { id: 'the-corner', name: 'the Corner and the Rugby Road streets', route: 'campus', note: 'Student bars and rental houses behind them; houses turn over every August and policing is tight.' },
    { id: 'downtown-mall', name: 'the Downtown Mall', route: 'downtown', note: 'An eight-block brick pedestrian street of clubs, theaters and cafes; any room here is a business.' },
    { id: 'belmont', name: 'Belmont', route: 'old-side', note: 'Small frame houses up the hill from the rail line, now restaurants and new neighbors; heating up fast.' },
    { id: 'fifeville', name: 'Fifeville and Tenth and Page', route: 'work-side', note: 'Historically Black working-class blocks near the hospital, being squeezed from both sides; shows need care here.' },
    { id: 'starr-hill', name: 'Starr Hill and West Main', route: 'downtown', note: 'The strip between downtown and the campus: old houses, a brewery, a depot and an arts district; priced out.' },
    { id: 'preston', name: 'Preston Avenue and Rose Hill', route: 'work-side', note: 'Warehouses, auto shops and old lots: the likeliest place for rehearsal rooms and cheap-ish space.' },
    { id: 'woolen-mills', name: 'Woolen Mills and the Rivanna', route: 'old-side', note: 'A quiet riverside neighborhood by a shuttered mill: backyard shows and flood risk.' },
    { id: 'pantops-29', name: 'Pantops and the US 29 corridor', route: 'campus', note: 'Strip malls, apartments and industrial parks in the county where working renters live; practice rooms and parking lots.' }
  ],

  contacts: ['harrisonburg-va', 'lynchburg-va', 'roanoke-va', 'richmond'],

  rooms: [
    { id: 'corner-house', kind: 'HOUSE', hood: 'the-corner', cap: 60, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, sketch: 20, standing: [75, 55, 40],
      pressure: 55, start: true, note: 'A living room and basement in a shared student rental. The address goes by message, and the August lease ends it all.' },
    { id: 'activist-house', kind: 'HOUSE', hood: 'belmont', cap: 50, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, sketch: 20, standing: [70, 60, 45],
      pressure: 50, note: 'A rented house run by a few friends. Ten dollars at the door, all of it to the bands, and one landlord between it and the end.' },
    { id: 'fifeville-basement', kind: 'HOUSE', hood: 'fifeville', cap: 40, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 45, note: 'A basement in an old frame house on a slope. It works until a new neighbor or a new owner shows up.' },
    { id: 'mills-yard', kind: 'HOUSE', hood: 'woolen-mills', cap: 70, hostCut: 0, pa: .4, curfew: 1290, ac: false, outdoor: true, sketch: 30, standing: [65, 55, 40],
      pressure: 55, note: 'A backyard in the quiet riverside blocks. Rain and the river flood it out, and the police have said loud is loud even without a complaint.' },
    { id: 'preston-warehouse', kind: 'DIY', hood: 'preston', cap: 100, rent: 70, deposit: 0, pa: .6, curfew: 1380, ac: false, sketch: 45, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'A rehearsal-space building with a loading bay. The cheapest room left, and the fire code is the whole worry.' },
    { id: 'mall-shop', kind: 'SHOP', hood: 'downtown-mall', cap: 60, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'A record shop on the brick mall. A day slot, kids home for dinner, and the van can park on the closed street.' },
    { id: 'corner-bar', kind: 'BAR', hood: 'the-corner', cap: 120, soundFee: 40, pa: .6, ages: ['A21'], curfew: 1590, ac: true, following: .3, sketch: 15,
      standing: [45, 65, 75], note: 'A student bar with a stage on the Corner. It wants a drinking crowd and takes a bill that can bring one.' },
    { id: 'music-hall', kind: 'CLUB', hood: 'downtown-mall', cap: 300, houseCosts: 150, split: .8, pa: .9, ages: ['ALL', 'A18'], matinee: true, curfew: 1380, ac: true, following: .6, sketch: 10,
      standing: [50, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The cafe and music hall on the mall. The Sunday matinee is the all-ages door, and the night shows want an older crowd.' },
    { id: 'starr-club', kind: 'CLUB', hood: 'starr-hill', cap: 250, houseCosts: 150, split: .8, pa: .85, ages: ['A18'], curfew: 1410, ac: true, following: .5, sketch: 10,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 56, needs: ['FULL_BILL'], note: 'A touring-band club between the mall and the campus. The town\'s money makes it a business first.' }
  ],

  calendar: [
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.85, .95, .95], hoods: ['the-corner', 'pantops-29'], elsewhere: [.95, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.85, .95, .95], hoods: ['the-corner', 'pantops-29'], elsewhere: [.95, 1, 1] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 5], dows: [5], can: [.85, .95, .95], hoods: ['the-corner', 'pantops-29'], elsewhere: [.95, 1, 1] },
    { id: 'horse-races-apr', label: 'the spring horse races', tag: 'race', month: 4, week: 4, dows: [5], can: [.85, .85, .85] },
    { id: 'horse-races-oct', label: 'the fall horse races', tag: 'race', month: 10, week: 1, dows: [5], can: [.85, .85, .85] },
    { id: 'summer-concerts', label: 'the free downtown summer concert series', tag: 'festival', month: 8, weeks: [2, 4], dows: [4], can: [.90, .88, .88], hoods: ['downtown-mall', 'starr-hill'], elsewhere: [1, .97, .97] },
    { id: 'move-in', label: 'move-in weekend', tag: 'graduation', month: 8, weeks: [3, 4], dows: [4, 5, 6], can: [.90, .90, .90], hoods: ['the-corner'], elsewhere: [1, .97, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1440, weekend: 1500, inForce: false } },

  points: [
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44, pop: 230000 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04, pop: 700000 },
    { name: 'Fredericksburg', state: 'VA', lat: 38.3, lon: -77.46, pop: 28000 },
    { name: 'Winchester', state: 'VA', lat: 39.19, lon: -78.16, pop: 28000 },
    { name: 'Asheville', state: 'NC', lat: 35.6, lon: -82.55, pop: 95000 }
  ],
  roads: ['I-64', 'US 29', 'US 250', 'VA 20', 'I-81'],

  words: {
    street: ['Rugby Road', 'University Avenue', 'Main Street', 'Preston Avenue', 'Ridge Street', 'Hydraulic Road', 'Rio Road', 'Emmet Street', 'Seminole Trail'],
    water: ['the Rivanna', 'the Rivanna River', 'the James'],
    hood: ['the Corner', 'Belmont', 'Fifeville', 'Starr Hill', 'Rose Hill', 'Woolen Mills', 'Pantops', 'Zion Crossroads', 'Ix'],
    thing: ['apple cider', 'orchard', 'brewery', 'cideries', 'brick', 'country ham', 'biscuit', 'walkout basement', 'matinee', 'student radio', 'lease', 'zine'],
    weather: ['pollen', 'Afton fog', 'ice storm']
  },

  events: [
    { id: 'CHARLOTTESVILLE_VA_GAME_DAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'A home game is on Saturday, and the stadium streets will be closed hours before kickoff.',
      title: 'The stadium traffic backs up the road',
      body: 'Traffic from the game has cut the county road, and half the kids are stuck or late. Your basement show is three blocks from the closed streets.',
      options: [
        { id: 'LATE', label: 'Push doors back until the traffic clears', likely: 'The crowd that gets through is loud and happy.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors were an hour late, and the kids who got through the traffic came in cold and ready.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is stuck in the jam.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The jam kept half the list home, and the regulars walked in.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date, which costs you trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'CHARLOTTESVILLE_VA_YARD_CALL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [4, 5, 6, 7, 8, 9, 10] },
      telegraph: 'A new neighbor on the riverside street has already asked the host what time this ends.',
      title: 'The yard show gets a call at five of ten',
      body: 'The yard in the quiet riverside blocks is full, and a neighbor called it in just before ten. The city has pulled live music from this neighborhood before, and the host knows it.',
      options: [
        { id: 'EARLY', label: 'Stop at ten and clear the yard', likely: 'It\'s a short night, and the host keeps the lease.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The last band cut the set and the yard was empty by ten past, and the host nodded.' },
        { id: 'INSIDE', label: 'Move the last bands into a basement across town', likely: 'Most of them follow, and it costs a van run.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A basement took the last two bands. It was louder and smaller, and nobody called.' },
        { id: 'ACCEPT', label: 'Play on and take the warning', likely: 'The next call is a fine, and the host might say no.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }, { op: 'REGULARS', pct: -.01 }],
          result: 'You played on and the officer wrote a warning, and the host is not sure about next summer.' }
      ] },

    { id: 'CHARLOTTESVILLE_VA_MALL_CROWD', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival', months: [7, 8, 9] },
      telegraph: 'The free concert on the mall starts at five-thirty, and the van has to cross it.',
      title: 'The mall is full for the free concert',
      body: 'The brick street is closed for the evening crowd, and your load-in van is sitting at the end of it with the drums. The matinee crowd would have to push through to get to the hall.',
      options: [
        { id: 'LATE', label: 'Push doors back until the van gets in', likely: 'It starts late, but the room fills.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .92 }],
          result: 'The van crept through at six. Doors were an hour late, and the room still filled.' },
        { id: 'CARRY', label: 'Hand-carry the gear down the side street', likely: 'It costs a couple of hours of your day, and nobody waits.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Six people and a hand truck made two trips, and the drummer still owes everyone a drink.' },
        { id: 'ACCEPT', label: 'Run it as planned and let the crowd sort itself', likely: 'The concert pulls people the other way.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The free concert took the crowd, and the ones who came for the bands got a good night.' }
      ] }
  ]
});
