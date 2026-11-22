SB.Cities.register('boise-id', {
  v: 1,
  slug: 'boise-id',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['boise state', 'boise state university', 'bsu', 'broncos', 'bronco stadium', 'albertsons stadium', 'basque block', 'basque museum', 'bodo',
           'bogus basin', 'mountain home air force base', 'idaho air national guard', 'boise pride', 'northwest nazarene university', 'nnu',
           'college of idaho', 'treefort', 'treefort music fest', 'idaho statesman', 'boise weekly', 'western idaho fair', 'ada county fair',
           'national oldtime fiddlers', 'jaialdi', 'famous idaho potato bowl', 'idaho potato bowl', 'camel\'s back park', 'idaho capitol',
           'the inversion room', 'inversion room', 'chinden annex', 'sugar beet hall', 'lemhi street basement', 'cole road grange',
           'sagebrush social club', 'the settlers canal collective', 'settlers canal collective', 'eighth ward rec hall', 'basin street lanes',
           'the spud cellar', 'spud cellar', 'orchard pawn annex', 'foothills fruit stand',
           'ann morrison park', 'julia davis park', 'expo idaho', 'idaho fair', 'pac-12', 'boise state public radio', 'kivi', 'kivitv', 'listen boise',
           'visit boise', 'downtown boise', 'bandsintown', 'songkick', 'jambase', 'out x out', 'soundfly', 'flypaper', 'b-amp',
           'boise all-ages movement project', 'dodiy', 'idaho state police', 'gowen field'],
  /* The dossier's invented venue names are banned too: research, not content, unchecked. The university appears only as 'the university'. */
  blocklist: ['boise state*', 'treefort*', 'idaho statesman*', 'boise weekly*', 'basque block*', 'sugar beet hall*', 'inversion room*'],

  blurb: ['Idaho\'s capital in a high-desert river valley, with a small, stubborn underground where hardcore, grind and death metal share bills. Houses are the backbone; a big festival gets the spotlight.',
          'Every band has a Portland or Seattle someday, and a show that runs past eleven brings the cops.'],
  hard: 'Almost nowhere is all-ages, and the cops come at eleven.',
  region: 'the Mountain West',
  houseType: 'BASEMENT',
  tilt: [
    { fan: 'hardcore', band: 'metal', d: .08, reason: 'Hardcore, grind and death metal share one bill and one crowd.' },
    { fan: 'metal', band: 'hardcore', d: .08, reason: 'Hardcore, grind and death metal share one bill and one crowd.' }
  ],
  whereGo: [
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Boise' },
    { id: 'meridian', kind: 'FEEDER', name: 'Meridian', minutes: 20, bearing: 285, pop: 120000, scene: 80, note: 'A fast-growing suburb of new subdivisions and big churches; a deep well of teenage bands.',
      rooms: [{ id: 'church-hall', kind: 'HALL', hood: 'meridian', cap: 150, rent: 150, deposit: 50, pa: .5, curfew: 1320, ac: true, sketch: 5, standing: [60, 60, 60], owner: 'CHURCH_CONTACT', pressure: 45, note: 'A church hall in a suburb of new subdivisions. All ages, no beer, and out by ten.' }] },
    { id: 'nampa', kind: 'FEEDER', name: 'Nampa', minutes: 25, bearing: 270, pop: 100000, scene: 70, note: 'A farm and railroad town with a real separate scene and a chip on its shoulder about Boise.',
      rooms: [{ id: 'nampa-garage', kind: 'HOUSE', hood: 'nampa', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45], pressure: 50, note: 'A garage and a back yard in Nampa, on a west-valley circuit of its own. The kids drive in and the parents have opinions.' }] },
    { id: 'eagle', kind: 'FEEDER', name: 'Eagle and Star', minutes: 25, bearing: 315, note: 'Wealthy suburbs with no scene; the kids drive in.' },
    { id: 'kuna', kind: 'FEEDER', name: 'Kuna', minutes: 25, bearing: 245, pop: 25000, note: 'A farm-suburb mix with skate and garage kids.' },
    { id: 'caldwell', kind: 'FEEDER', name: 'Caldwell', minutes: 30, bearing: 275, pop: 60000, note: 'A farm town with a small college and a small DIY scene around the old downtown.' },
    { id: 'emmett', kind: 'FEEDER', name: 'Emmett', minutes: 45, bearing: 320, pop: 7000, note: 'A fruit and farm town up the Payette valley with a few high-school bands.' },
    { id: 'idaho-city', kind: 'FEEDER', name: 'Idaho City and Horseshoe Bend', minutes: 45, bearing: 30, note: 'Tiny old mining towns in the forest: a few kids and the odd bonfire show.' },
    { id: 'mountain-home', kind: 'FEEDER', name: 'Mountain Home', minutes: 55, bearing: 115, pop: 14000, note: 'A base town that cycles in young airmen; they depend on Boise for anything cultural.' },
    { id: 'ontario', kind: 'FEEDER', name: 'Ontario', state: 'OR', minutes: 55, bearing: 290, pop: 11000, note: 'The Oregon border town; bands there sometimes play both states.' },
    { id: 'payette', kind: 'FEEDER', name: 'Payette, Fruitland and Weiser', minutes: 70, bearing: 305, note: 'Small farm towns on the Snake River with weak scenes; teenagers drive.' },
    { id: 'twin-falls', kind: 'PEER', name: 'Twin Falls', state: 'ID', minutes: 120, bearing: 105, scene: 400, note: 'The farm and dairy hub two hours east with its own punk scene; its kids drive to Boise for touring bands.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The bar, hotel and office core. Almost all paid venues now; cranes, condos and noise complaints.' },
    { id: 'north-end', name: 'the North End', route: 'old-side', note: 'Tall trees, bungalows and basements: the old punk-house ground, now very expensive with quick calls to police.' },
    { id: 'bench', name: 'the Bench', route: 'work-side', note: 'The raised terrace south of downtown: older ranch houses, garages and strip malls.' },
    { id: 'east-end', name: 'the East End and the campus', route: 'campus', note: 'The university edge with student rentals and a river path.' },
    { id: 'garden-city', name: 'Garden City', route: 'work-side', note: 'A small separate city along the river with cheap warehouses and old industrial lots.' },
    { id: 'west-boise', name: 'West Boise and Fairview Avenue', route: 'old-side', note: 'Wide car-oriented streets, apartment complexes and big-box shopping.' },
    { id: 'nampa', name: 'Nampa', route: 'town:nampa', note: 'Garages and yards in a farm and railroad town of its own. Kids drive in to Boise and Boise kids rarely drive out.' },
    { id: 'meridian', name: 'Meridian', route: 'town:meridian', note: 'New subdivisions and big church halls west of the city. Plenty of teenagers, parents who drive them, and no bars at all.' },
    { id: 'west-valley', name: 'Nampa and Caldwell', route: 'work-side', note: 'The west valley: garages, downtown storefronts and church rooms.' }
  ],

  rooms: [
    { id: 'north-end-basement', kind: 'HOUSE', hood: 'north-end', cap: 60, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 55, start: true, note: 'A basement under an old bungalow on the North End. It has run on and off for years, and the neighbors have the police on speed dial.' },
    { id: 'upstairs-bar', kind: 'BAR', hood: 'downtown', cap: 200, soundFee: 60, pa: .7, ages: ['A21'], curfew: 1410, ac: true, following: .3, sketch: 20, standing: [50, 65, 70],
      note: 'A second-floor stage above a bar downtown. Everyone loves the room, and nobody under twenty-one gets up the stairs.' },
    { id: 'heavy-club', kind: 'CLUB', hood: 'downtown', cap: 350, houseCosts: 220, split: .8, pa: .9, ages: ['ALL'], curfew: 1380, ac: true, following: .6, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A heavy rock club that put punk, death metal and grind on the same bill, and dropped its age limit to do it.' },
    { id: 'concert-hall', kind: 'BIG', hood: 'downtown', cap: 1000, rent: 1800, deposit: 500, pa: .95, ages: ['ALL'], curfew: 1380, ac: true, following: .7, sketch: 5, standing: [40, 70, 70],
      owner: 'TALENT_BUYER', notice: 84, note: 'A big downtown hall for touring hardcore packages. Minors need a guardian note at the door.' },
    { id: 'record-shop', kind: 'SHOP', hood: 'bench', cap: 60, pa: .4, curfew: 1290, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'A record store on the Bench. Doors at seven, music at seven-thirty, and out before the store closes.' },
    { id: 'social-club-basement', kind: 'DIY', hood: 'downtown', cap: 150, rent: 80, deposit: 0, pa: .6, curfew: 1380, ac: false, sketch: 35, standing: [60, 60, 50],
      pressure: 50, note: 'A basement under a downtown social club, the nearest thing the town has to a permanent all-ages stage. The flea market upstairs is the landlord.' },
    { id: 'garden-city-bay', kind: 'DIY', hood: 'garden-city', cap: 120, rent: 70, deposit: 0, pa: .5, curfew: 1380, ac: false, sketch: 50, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'A cheap bay in an old industrial lot by the river. One door, no exits to speak of, and a developer buying the block.' },
    { id: 'river-pavilion', kind: 'OUTDOOR', hood: 'east-end', cap: 300, rent: 25, pa: .4, curfew: 1260, sketch: 30, standing: [60, 55, 40],
      note: 'A pavilion by the river path in the summer. Smoke from the August fires can cancel it the same day.' }
  ],

  contacts: ['portland', 'bend-or', 'spokane-wa', 'ogden-ut', 'salt-lake-city'],

  calendar: [
    { id: 'big-music-fest', label: 'the big downtown music festival', tag: 'festival', month: 3, week: 4, dows: [3, 4, 5, 6], can: [.88, .85, .85], hoods: ['downtown', 'east-end'], elsewhere: [1, .97, .97] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [2, 4], dows: [5], can: [.85, .95, .95], hoods: ['east-end', 'downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [5], can: [.85, .95, .95], hoods: ['east-end', 'downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [2, 4], dows: [5], can: [.85, .95, .95], hoods: ['east-end', 'downtown'], elsewhere: [1, 1, 1] },
    { id: 'parade-weekend', label: 'the September parade weekend', tag: 'parade', month: 9, week: 3, dows: [4, 5, 6], can: [.95, .92, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'the-fair', label: 'the fair', tag: 'fair', month: 8, weeks: [3, 4], dows: [4, 5, 6], can: [.92, .88, .88], hoods: ['garden-city', 'west-boise'], elsewhere: [1, .97, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1380, curfewMinors: { weeknight: 1440, weekend: 1440, inForce: false } },

  points: [
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89, pop: 1200000 },
    { name: 'Twin Falls', state: 'ID', lat: 42.56, lon: -114.46, pop: 55000 },
    { name: 'Pocatello', state: 'ID', lat: 42.87, lon: -112.45, pop: 56000 },
    { name: 'Pendleton', state: 'OR', lat: 45.67, lon: -118.79, pop: 17000 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68, pop: 2500000 }
  ],
  roads: ['I-84', 'I-184', 'ID-55', 'US 20', 'US 95', 'I-86'],

  words: {
    street: ['State Street', 'Chinden', 'Fairview Avenue', 'Overland Road', 'Cole Road', 'Vista Avenue', 'Warm Springs Avenue', 'I-184'],
    water: ['the Boise River', 'the Snake River'],
    hood: ['the North End', 'Hyde Park', 'the Bench', 'the East End', 'Garden City', 'the Foothills', 'Hulls Gulch'],
    thing: ['sagebrush', 'potato', 'canal', 'foothill trail', 'river float', 'carport', 'sugar beet', 'guardian note', 'flea market'],
    weather: ['inversion', 'wildfire smoke', 'dry heat']
  },

  events: [
    { id: 'BOISE_ID_ELEVEN_O_CLOCK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [5, 6, 7, 8, 9] },
      telegraph: 'A neighbor on the block has already said the word "eleven" twice this week.',
      title: 'The cops come at eleven',
      body: 'The noise rule bites after 11, and a patrol car has been idling at the end of the block since the second band. The headliner is not on yet.',
      options: [
        { id: 'MOVEUP', label: 'Cut the changeovers and start the headliner now', likely: 'A rushed set. Everyone hears it before the lights come.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -30 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The headliner went on early and short. The patrol car left at ten past eleven.' },
        { id: 'TURNDOWN', label: 'Turn it down and keep going', likely: 'Quieter. A few leave.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The amps came down a notch. The room leaned in and the car stayed at the end of the block.' },
        { id: 'END', label: 'Call it early and keep the peace', likely: 'The headliner is sore. The kids are angrier.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -2 }, { op: 'REGULARS', pct: -.01 }],
          result: 'You shut it down at ten to eleven. The kids were angry for a week.' }
      ] },

    { id: 'BOISE_ID_FEST_BUMP', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The big festival is in town and every downtown room has an out-of-town name on the marquee.',
      title: 'The festival bumps your bill',
      body: 'The room that was holding your all-ages night has given the date to a touring band for the festival. The only room with a floor and a power outlet that can hold half your crowd is a basement under a social club.',
      options: [
        { id: 'BASEMENT', label: 'Take the basement under the club', likely: 'Half the room, twice the noise.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'DIY', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .5 }],
          result: 'The basement held half of what the club would have, and every one of them stayed to the end.' },
        { id: 'MOVE', label: 'Move it a day, after the festival', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The festival crowd was gone and the locals came back.' },
        { id: 'ACCEPT', label: 'Run it where it is and take what you get', likely: 'The festival takes the casual crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The festival ate the casual crowd. The die-hards came.' }
      ] },

    { id: 'BOISE_ID_SMOKE_DAY', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [8, 9] },
      telegraph: 'The sky has been orange since Tuesday and the app says the air is unhealthy.',
      title: 'Smoke over the river',
      body: 'Wildfire smoke has settled into the valley and the riverside show is not going to happen. The band asks about a garage in Nampa, twenty-five minutes away.',
      options: [
        { id: 'NAMPA', label: 'Move it to the garage in Nampa', likely: 'Small and far, but indoors and loud.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'Twenty-five minutes of highway and a hot garage with the door shut. It went well.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. The smoke may stay.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The smoke stayed, and some of the crowd stayed home.' },
        { id: 'ACCEPT', label: 'Run it anyway', likely: 'People stay inside.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'A thin crowd in masks. The band played to the ones who came.' }
      ] },

    { id: 'BOISE_ID_FAIR_WEEK', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The fair is on all weekend, and the grandstand has a loud rock show on Saturday.',
      title: 'The fair drains the west side',
      body: 'A grandstand rock show has half the west side at the fairgrounds, and the police are on every corner in Garden City. Your bay has one door.',
      options: [
        { id: 'LATE', label: 'Push doors back until the grandstand lets out', likely: 'The crowd that wants more shows up late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. The fair crowd came in loud and not ready to go home.' },
        { id: 'SMALL', label: 'Cap it small and keep the door clear', likely: 'Safer. Fewer people.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .6 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'You held the line at the door and the bay stayed breathable.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the fair.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The casual crowd stayed at the fair. The regulars came.' }
      ] }
  ]
});
