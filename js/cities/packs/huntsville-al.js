SB.Cities.register('huntsville-al', {
  v: 1,
  slug: 'huntsville-al',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['redstone arsenal', 'redstone', 'marshall space flight center', 'space command', 'nasa', 'von braun', 'space and rocket center', 'cummings research park',
           'university of alabama in huntsville', 'uah', 'alabama a&m', 'athens state university', 'calhoun community college', 'university of north alabama',
           'auburn university', 'panoply arts festival', 'panoply', 'cigar box guitar festival', 'galaxy of lights', 'week of welcome', 'huntsville times',
           'al.com', 'alabama media group', 'midcity district', 'midcity', 'bridge street town centre', 'lowe mill', 'dallas mill', 'lincoln mill',
           'browns ferry', 'oktoberfest', 'scottsboro boys', 'unclaimed baggage', 'trash pandas', 'huntsville havoc', 'krystal', 'whataburger', 'taco bell',
           'waffle house', 'super outbreak', 'vfw', 'american legion', 'moose lodge', 'elks',
           'the spindle room', 'pratt avenue hall', 'cotton row social', 'saturn slab', 'the depot annex', 'tennessee valley rec room', 'monte vista basement',
           'the slow water club', 'huntsville highway bowl-o-rama', 'gate nine', 'the rocket shed', 'big spring lanes',
           'von braun center', 'orion amphitheater', 'mars music hall', 'stovehouse', 'tangled string', 'undertow shows', 'mad malts', 'shagnasty\'s',
           'sluice fanzine', 'sluice fest', 'harlow\'s', 'rocket city honky tonk', 'crossroads music hall', 'merchants alley', 'open bottle', 'beer hog',
           'hvilleblast', 'huntsville blast', 'axios', 'hypebot', 'wlrh', 'wvuafm', 'tinsel trail', 'taste of huntsville', 'taste of soul', 'big spring park',
           'huntsville botanical garden', 'rocket city trash pandas', 'national guard armory'],
  /* Dossier institutions and its unchecked invented venue names are banned: research, not content. */
  blocklist: ['lowe mill*', 'dallas mill*', 'redstone*', 'huntsville times*', 'spindle room*', 'rocket shed*', 'saturn slab*', 'gate nine*'],

  blurb: ['A show here is run by bored, well-equipped kids with cars and good gear, in a city of engineers and contractors.',
          'It is small and scattered across garages, strip-mall bays and church halls, and it quietly rebuilds every few years.'],
  hard: 'Cheap rooms get redeveloped, football Saturdays empty the room, and drummers transfer away each summer.',
  region: 'the Tennessee Valley',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.81 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Huntsville' },
    { id: 'madison', kind: 'FEEDER', name: 'Madison', minutes: 15, bearing: 275, scene: 70, note: 'A fast-growing suburb the city surrounds; arsenal families and teenagers who drive in.',
      rooms: [{ id: 'madison-club', kind: 'CLUB', hood: 'madison-hood', cap: 300, ages: ['A18'], curfew: 1440, ac: true,
      note: 'A suburban club room with a young crowd. The drive out is its limit.' }] },
    { id: 'decatur', kind: 'FEEDER', name: 'Decatur', minutes: 30, bearing: 255, note: 'A river town on the lake with a small scene and a long shared history.', bands: 2 },
    { id: 'athens', kind: 'FEEDER', name: 'Athens', minutes: 30, bearing: 280, note: 'A county seat on US 72; kids drive over on Fridays.' },
    { id: 'hartselle', kind: 'FEEDER', name: 'Hartselle', minutes: 35, bearing: 230, note: 'A churchy suburb south of the river on I-565.' },
    { id: 'arab', kind: 'FEEDER', name: 'Arab', minutes: 40, bearing: 170, note: 'A small mountaintop town of football and church.' },
    { id: 'fayetteville', kind: 'FEEDER', name: 'Fayetteville', state: 'TN', minutes: 40, bearing: 5, note: 'A Tennessee farm town whose kids pick Huntsville over Nashville for the shorter drive.' },
    { id: 'guntersville', kind: 'FEEDER', name: 'Guntersville', minutes: 45, bearing: 150, note: 'A lake town of boaters and retirees; little scene.' },
    { id: 'scottsboro', kind: 'FEEDER', name: 'Scottsboro', minutes: 55, bearing: 100, note: 'A small river county seat to the east.' },
    { id: 'cullman', kind: 'FEEDER', name: 'Cullman', minutes: 60, bearing: 200, note: 'A conservative farm and small-city town; its teenagers drive an hour for a show.' },
    { id: 'albertville', kind: 'FEEDER', name: 'Albertville and Boaz', minutes: 60, bearing: 145, note: 'Poultry towns on Sand Mountain; regional Mexican music is bigger than rock.' },
    { id: 'shoals', kind: 'PEER', name: 'Florence and Muscle Shoals', minutes: 70, bearing: 265, scene: 1200, note: 'The Shoals: a real music scene of its own that trades shows both ways.' },
    { id: 'birmingham', kind: 'PEER', name: 'Birmingham', slug: 'birmingham', minutes: 110, bearing: 200, scene: 3500, note: 'Older, grittier and more musical; the city Huntsville measures itself against.' },
    { id: 'chattanooga', kind: 'PEER', name: 'Chattanooga', minutes: 110, bearing: 90, slug: 'chattanooga-tn', note: 'A similar-size peer with more small rooms and a natural next tour stop.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the old square', route: 'downtown', note: 'Bars, restaurants and apartments around the square and the spring park, with events programmed by the city.' },
    { id: 'five-points', name: 'Five Points and Old Town', route: 'old-side', note: 'Old houses near the foot of the mountain; the nearest thing to a bohemian neighborhood, with close neighbors.' },
    { id: 'mill-village', name: 'the Triana Boulevard mill village', route: 'work-side', note: 'A southwest cotton-mill neighborhood of small houses, studios and artist space.' },
    { id: 'northwest-mills', name: 'the northwest mill belt', route: 'work-side', note: 'Mill villages and big industrial buildings, converted lofts and bungalows.' },
    { id: 'campus', name: 'the university and Sparkman Drive', route: 'campus', note: 'A midsize city campus with student apartments and fast food stretching toward I-565.' },
    { id: 'normal', name: 'Normal', route: 'old-side', note: 'The historically Black university community on the north side; its music is band, gospel and hip-hop, a different audience to treat with care.' },
    { id: 'strips', name: 'the University Drive and Parkway strips', route: 'campus', note: 'Chains and strip centers where a cheap unit or a pizza back room is where a show actually ends up.' },
    { id: 'west-suburbs', name: 'Madison, Hampton Cove and the research corridor', route: 'campus', note: 'Affluent suburbs with big garages and homeowners\' associations.' },
    { id: 'madison-hood', name: 'Madison', route: 'town:madison', note: 'The suburb next door: bars that book small touring and local acts for a young crowd, and a drive home.' }
  ],

  rooms: [
    { id: 'porch-carport', kind: 'HOUSE', hood: 'five-points', cap: 40, curfew: 1320, pressure: 55, start: true,
      note: 'A porch and carport among close old houses. A neighbor and the ten o\'clock line end it, and the heat and storms pick the date.' },
    { id: 'mill-yard', kind: 'HOUSE', hood: 'mill-village', cap: 50, curfew: 1320, pressure: 45,
      note: 'A yard and a garage in a mill village near the artist studios. Dry, and the landlord is touchy.' },
    { id: 'big-garage', kind: 'HOUSE', hood: 'west-suburbs', cap: 60, curfew: 1350, pressure: 55,
      note: 'A huge garage with good gear and the parents home. An association complaint ends it, and a transfer takes the drummer.' },
    { id: 'mill-collective', kind: 'DIY', hood: 'northwest-mills', cap: 100, curfew: 1380, pressure: 55, needs: ['VOUCH'],
      note: 'A collective booking house in the mill belt. The lease and the fire marshal are always one visit away.' },
    { id: 'strip-bay', kind: 'DIY', hood: 'strips', cap: 120, curfew: 1380, pressure: 55,
      note: 'A rented strip-center bay with a small stage. Fine until the lease comes up for renewal.' },
    { id: 'coffee-shop', kind: 'SHOP', hood: 'downtown', cap: 40, curfew: 1260, ac: true,
      note: 'A coffee shop near the square that does all-ages sets early. Quiet, short, and no amps turned up.' },
    { id: 'church-hall', kind: 'HALL', hood: 'campus', cap: 150, curfew: 1320, ac: true, owner: 'CHURCH_CONTACT', pressure: 45,
      note: 'A church youth hall for rent. No cursing, no beer, and the youth minister reads the set list.' },
    { id: 'sports-bar', kind: 'BAR', hood: 'strips', cap: 250, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A sports bar that does punk and metal nights. Football Saturdays kill the room.' },
    { id: 'square-bar', kind: 'BAR', hood: 'downtown', cap: 200, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A stage bar in the entertainment district. The city programs events and takes the parking.' },
    { id: 'mill-lawn', kind: 'OUTDOOR', hood: 'northwest-mills', cap: 250, curfew: 1320, pressure: 45,
      note: 'A loading dock and lawn at an old mill turned to studios. Rain, noise rules and the mill\'s own programming decide.' },
    { id: 'civic-hall', kind: 'BIG', hood: 'downtown', cap: 2000, ages: ['ALL'], curfew: 1380, ac: true,
      note: 'The big civic hall the touring bands play. Between this and a garage there is nothing, so local bands age out.' }
  ],

  contacts: ['chattanooga-tn', 'birmingham', 'nashville', 'tuscaloosa-al'],

  calendar: [
    { id: 'arts-fest', label: 'the arts festival', tag: 'festival', month: 4, week: 4, dows: [4, 5, 6], can: [.90, .85, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'guitar-fest', label: 'the guitar weekend', tag: 'festival', month: 6, week: 2, dows: [4, 5, 6], can: [.95, .90, .92], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'food-fest', label: 'the food festival', tag: 'festival', month: 10, week: 2, dows: [5, 6], can: [.92, .90, .90] },
    { id: 'welcome-week', label: 'the university\'s welcome week', tag: 'holiday', month: 8, weeks: [3, 4], dows: [3, 4, 5], can: [1.05, 1.10, 1.08], hoods: ['campus'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.85, .95, .95] },
    { id: 'rivalry-week', label: 'rivalry weekend', tag: 'game', month: 11, weeks: [3, 5], dows: [5], can: [.75, .90, .90] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.81, pop: 1100000 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78, pop: 2000000 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 6100000 },
    { name: 'Florence', state: 'AL', lat: 34.8, lon: -87.68, pop: 40000 }
  ],
  roads: ['I-565', 'US 72', 'US 231', 'US 431', 'I-65', 'AL 53'],

  words: {
    street: ['Memorial Parkway', 'University Drive', 'Governors Drive', 'Holmes Avenue', 'Sparkman Drive', 'Triana Boulevard'],
    water: ['the Tennessee River', 'Big Spring', 'Wheeler Lake', 'Monte Sano'],
    hood: ['Five Points', 'Old Town', 'Twickenham', 'Normal', 'Hampton Cove', 'Madison', 'Lincoln Village'],
    thing: ['meat-and-three', 'white barbecue sauce', 'hush puppy', 'carport', 'mill village', 'tornado siren', 'rocket', 'strip-mall bay', 'church youth hall', 'practice bay', 'garage fan'],
    weather: ['tornado watch', 'humid', 'afternoon thunderstorm']
  },

  events: [
    { id: 'HUNTSVILLE_AL_RIVALRY_SATURDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'It is a big football Saturday and every bar in town is already full.',
      title: 'The football Saturday',
      body: 'Every bar is packed and every porch light is on. Your house show is the only thing open that is not a television.',
      options: [
        { id: 'LATE', label: 'Push doors back until the game is over', likely: 'The ones who want a night out come late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. They came in from the bars, loud and happy.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd stays home with the game.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The casual crowd stayed on the couch. The regulars came.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'HUNTSVILLE_AL_SIREN', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [4, 5] },
      telegraph: 'The forecast says severe storms Saturday evening, with the sirens likely.',
      title: 'The siren goes off',
      body: 'A warning sounds in the middle of the second band. The whole room is crowded into the hall closet and the bathroom with the amp still on.',
      options: [
        { id: 'WAIT', label: 'Wait it out and play on after', likely: 'A late start. Most of them stay.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'An hour in the hallway, then the lights came back and the band finished.' },
        { id: 'SHORT', label: 'Cut the bill short and send everyone home', likely: 'A thin night, and nobody on the road in it.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Two bands, a lot of nervous laughing, and everyone home before the hail.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' }
      ] },

    { id: 'HUNTSVILLE_AL_FESTIVAL_PARKING', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The festival downtown ends at ten and the parking is already gone.',
      title: 'The van is blocked in',
      body: 'The festival has taken every space within a mile of the room, and the band\'s van is boxed in behind the stage.',
      options: [
        { id: 'EARLY', label: 'Move the show earlier and load out before the crowd', likely: 'A short night. Nobody boxed in.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors early. The van was out before the street filled.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads came in together from the edge of town. They\'ll remember that.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'People circle for an hour and give up.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Half the list never found a place to park.' }
      ] }
  ]
});
