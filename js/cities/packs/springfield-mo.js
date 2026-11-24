SB.Cities.register('springfield-mo', {
  v: 1,
  slug: 'springfield-mo',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['missouri state university', 'missouri state', 'drury university', 'drury', 'bass pro shops', 'bass pro', 'o\'reilly auto parts', 'o\'reilly',
           'assemblies of god', 'ozark empire fair', 'route 66 festival', 'first friday', 'first friday art walk', 'springfield cardinals', 'hammons field',
           'springfield news-leader', 'news-leader', 'ksmu', 'coxhealth', 'cox health', 'mercy springfield', 'fort leonard wood', 'silver dollar city',
           'dickerson park zoo', 'galloway village',
           'the sinkhole social hall', 'sinkhole social hall', 'frisco spur annex', 'karst room', 'mother road mercantile', 'galloway creek co-op',
           'north side freight door', 'greene county grange hall', 'fulbright dry goods', 'lot 417', 'boone street basement', 'the cattle exchange',
           'rail yard rec hall',
           'evangel', 'evangel university', 'krps', 'springfield business journal', 'plaster stadium', 'wonders of wildlife', 'artsfest',
           'birthplace of route 66', 'springfield police department', 'missouri state bears'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real institutions appear only as generic phrases in game text. */
  blocklist: ['bass pro*', 'o\'reilly*', 'missouri state*', 'drury*', 'ozark empire*', 'first friday*', 'springfield cardinals*', 'coxhealth*'],

  blurb: ['Old rentals on the hills, halls and church basements. The scene empties and refills with each new class of sixteen-year-olds.',
          'Everyone drives, and a show with no driver is one nobody can leave.'],
  hard: 'Few all-ages rooms, and everyone needs a ride home.',
  region: 'the Ozarks',
  whereGo: [
    { name: 'Kansas City', state: 'MO', lat: 39.10, lon: -94.58 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.20 },
    { name: 'Tulsa', state: 'OK', lat: 36.15, lon: -95.99 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Springfield' },
    { id: 'republic', kind: 'FEEDER', name: 'Republic', minutes: 20, bearing: 250, note: 'A western bedroom suburb with little scene; it sends kids.' },
    { id: 'willard', kind: 'FEEDER', name: 'Willard', minutes: 20, bearing: 335, note: 'A small bedroom town to the northwest.' },
    { id: 'nixa', kind: 'FEEDER', name: 'Nixa', minutes: 20, bearing: 195, note: 'A fast-growing school-district suburb; few bands, many kids.' },
    { id: 'ozark', kind: 'FEEDER', name: 'Ozark', minutes: 20, bearing: 170, note: 'A county seat and suburb up US 65, much like Nixa.' },
    { id: 'bolivar', kind: 'FEEDER', name: 'Bolivar', minutes: 35, bearing: 355, note: 'A small church-college town; a few kids drive in.' },
    { id: 'monett', kind: 'FEEDER', name: 'Monett and Aurora', minutes: 40, bearing: 240, note: 'Farm and poultry towns to the southwest.' },
    { id: 'lebanon', kind: 'FEEDER', name: 'Lebanon', minutes: 40, bearing: 75, note: 'A farm and highway town on I-44; teens drive in.' },
    { id: 'branson', kind: 'FEEDER', name: 'Branson', minutes: 55, bearing: 180, note: 'A tourist town whose show workers drive up for something real after their last set.', season: { months: [5, 6, 7, 8, 9, 10], mul: 1.3 } },
    { id: 'joplin', kind: 'PEER', name: 'Joplin', minutes: 70, bearing: 255, scene: 700, note: 'The smaller sibling to the west on I-44, and a close trading partner.' },
    { id: 'fayetteville', kind: 'PEER', name: 'Fayetteville', state: 'AR', minutes: 120, bearing: 235, slug: 'fayetteville-ar', note: 'A college town with a much bigger live-music culture; the natural rival and trade partner.' },
    { id: 'columbia', kind: 'PEER', name: 'Columbia', minutes: 150, bearing: 35, slug: 'columbia-mo', note: 'Another mid-size college-town scene up the road.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the square', route: 'downtown', note: 'Bars, lofts and old theaters around the courthouse square. Priced up and polished; mostly 21 and over.' },
    { id: 'c-street', name: 'Commercial Street', route: 'old-side', note: 'A revived brick railroad strip of studios and small businesses, with poorer blocks beyond it to the north.' },
    { id: 'midtown', name: 'Midtown and Walnut Street', route: 'old-side', note: 'Old bungalows and big rental houses on porch-lined streets. The likeliest place for a house venue to last.' },
    { id: 'rountree', name: 'Rountree and the campus streets', route: 'campus', note: 'Student duplexes and small old houses that churn every year as landlords buy up and renovate.' },
    { id: 'grant-avenue', name: 'Grant Avenue and the south-central streets', route: 'work-side', note: 'Cheap, ignored older housing with garages and carports.' },
    { id: 'glenstone', name: 'the Glenstone strip', route: 'work-side', note: 'Big-box retail, storage units, roller rinks and event halls; the practice rooms are here and so are bored suburban teenagers.' },
    { id: 'kansas-expressway', name: 'the west side along Kansas Expressway', route: 'campus', note: 'New subdivisions and big churches. No music infrastructure, but it supplies the audience.' },
    { id: 'rail-yards', name: 'the north rail yards and airport', route: 'work-side', note: 'Warehouses with few neighbors and generator-friendly lots, often watched by police.' }
  ],

  rooms: [
    { id: 'midtown-basement', kind: 'HOUSE', hood: 'midtown', cap: 40, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, sketch: 25, standing: [70, 60, 45],
      pressure: 55, start: true, note: 'An unfinished basement under a rental house. Roommates run the door, nobody has a license, and the landlord does not know.' },
    { id: 'rountree-house', kind: 'HOUSE', hood: 'rountree', cap: 30, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, sketch: 20, standing: [65, 60, 45],
      pressure: 55, note: 'A small student rental with closer quarters. Full in term, empty in the long breaks, and it gets sold when the lease turns over.' },
    { id: 'living-room', kind: 'HOUSE', hood: 'midtown', cap: 25, hostCut: 0, pa: .4, curfew: 1320, ac: true, outdoor: false, sketch: 10, standing: [70, 65, 60],
      pressure: 40, note: 'A living-room set in a member\'s home. Quiet, seated and mixed with other scenes, and over by ten.' },
    { id: 'c-street-store', kind: 'DIY', hood: 'c-street', cap: 150, rent: 60, deposit: 0, pa: .5, curfew: 1380, ac: false, sketch: 35, standing: [55, 60, 45],
      pressure: 50, needs: ['VOUCH'], note: 'A brick storefront on the railroad strip, run by local musicians. It lives on door money and donations.' },
    { id: 'listening-room', kind: 'DIY', hood: 'downtown', cap: 20, rent: 30, deposit: 0, pa: .4, curfew: 1290, ac: true, seated: true, sketch: 5, standing: [65, 65, 70],
      pressure: 45, note: 'An alcohol-free nonprofit room with about twenty seats. Rent is the threat, and nobody moshes here.' },
    { id: 'rented-hall', kind: 'HALL', hood: 'glenstone', cap: 300, rent: 300, deposit: 100, pa: .6, curfew: 1350, ac: true, sketch: 15, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'A commercial hall rented by the night. All ages, but picky about gear and fights, and it costs.' },
    { id: 'glenstone-lot', kind: 'OUTDOOR', hood: 'glenstone', cap: 80, rent: 10, pa: .4, curfew: 1320, sketch: 35, standing: [60, 55, 40],
      note: 'A skate spot and a big-box lot on the strip. Warm-weather afternoons only, until security shows up.' },
    { id: 'square-bar', kind: 'BAR', hood: 'downtown', cap: 250, soundFee: 60, pa: .7, ages: ['A21'], curfew: 1500, ac: true, following: .3, sketch: 15,
      standing: [50, 65, 70], note: 'A licensed bar by the square with a real stage. Door and a cut, 21 and over, and fewer of these every year.' },
    { id: 'brewery-yard', kind: 'BAR', hood: 'rountree', cap: 120, soundFee: 40, pa: .6, ages: ['A21'], curfew: 1440, ac: false, following: .2, sketch: 10,
      standing: [55, 65, 75], note: 'A beer-garden stage by the campus streets. Free weekly music, five or ten dollars for the rest, and quiet on weeknights.' },
    { id: 'multi-stage', kind: 'CLUB', hood: 'downtown', cap: 350, houseCosts: 150, split: .8, pa: .9, ages: ['A18'], curfew: 1410, ac: true, following: .6, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The downtown complex touring bands expect. Costs and a sound curfew, and it wants a draw.' },
    { id: 'metal-room', kind: 'BIG', hood: 'downtown', cap: 850, rent: 1500, deposit: 500, pa: .95, ages: ['ALL'], curfew: 1380, ac: true, following: .6, sketch: 5,
      standing: [40, 70, 70], note: 'A newer downtown room for all-ages metal and post-hardcore, doors at six. Local bands only open.' },
    { id: 'old-auditorium', kind: 'BIG', hood: 'downtown', cap: 3200, rent: 2200, deposit: 500, pa: 1, ages: ['ALL'], curfew: 1380, ac: true, following: .8, sketch: 2,
      standing: [35, 70, 70], note: 'A historic auditorium that seats thousands. A local band gets in here only by luck.' }
  ],

  contacts: ['fayetteville-ar', 'columbia-mo', 'tulsa', 'kansas-city', 'st-louis'],

  calendar: [
    { id: 'square-festival', label: 'the old-highway festival', tag: 'festival', month: 8, week: 1, dows: [4, 5], can: [.92, .88, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 8, week: 1, dows: [3, 4, 5, 6], can: [.95, .92, .90], hoods: ['rail-yards'], elsewhere: [1, .97, .97] },
    { id: 'walnut-festival', label: 'the spring art festival', tag: 'festival', month: 5, weeks: [2, 3], dows: [5, 6], can: [.92, .88, .85], hoods: ['midtown'], elsewhere: [1, 1, .97] },
    { id: 'brick-festival', label: 'the fall brick-street festival', tag: 'festival', month: 10, week: 4, dows: [5, 6], can: [.90, .88, .85], hoods: ['c-street'], elsewhere: [1, .97, .97] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [2, 4], dows: [5], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 3], dows: [5], can: [.85, .95, .95] },
    { id: 'christmas-parade', label: 'the Christmas parade', tag: 'parade', month: 11, week: 3, dows: [5], can: [.88, .92, .95], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1380 },


  points: [
    { name: 'Kansas City', state: 'MO', lat: 39.10, lon: -94.58, pop: 510000 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.20, pop: 300000 },
    { name: 'Tulsa', state: 'OK', lat: 36.15, lon: -95.99, pop: 410000 },
    { name: 'Joplin', state: 'MO', lat: 37.08, lon: -94.51, pop: 52000 }
  ],
  roads: ['I-44', 'US 65', 'US 60', 'US 160', 'Route 13', 'Route 66'],

  words: {
    street: ['Glenstone Avenue', 'Kansas Expressway', 'Walnut Street', 'Commercial Street', 'Grant Avenue', 'St. Louis Street', 'College Street'],
    water: ['Galloway Creek', 'the James River', 'Lake Springfield'],
    hood: ['Rountree', 'Midtown', 'C-Street', 'Park Central Square', 'Grant Beach'],
    thing: ['cashew chicken', 'sinkhole', 'ice storm', 'church potluck', 'limestone', 'storm siren', 'tick', 'fellowship hall', 'finals week'],
    weather: ['ice storm', 'tornado watch', 'storm siren']
  },

  events: [
    { id: 'SPRINGFIELD_MO_BRICK_FESTIVAL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The railroad strip is putting up barricades for a festival weekend.',
      title: 'The strip is a street party',
      body: 'A festival has closed the brick street for the weekend. The crowd is out in costumes and the parking is gone. Your show is two doors down from all of it.',
      options: [
        { id: 'STEAL', label: 'Leave the door open and take the walk-ins', likely: 'They\'re drunk and curious, and some of them stay.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.15 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Half the room was strangers in costumes, and it was loud, friendly and a little messy.' },
        { id: 'EARLY', label: 'Start early and finish before the crowd peaks', likely: 'The regulars get in, but it\'s a short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'You were done before the street filled, and the regulars loaded out in peace.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'Nobody can park.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The lane was blocked and half the list gave up circling.' }
      ] },

    { id: 'SPRINGFIELD_MO_QUIET_HOUR', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [4, 5, 6, 7, 8, 9, 10] },
      telegraph: 'A neighbor of the basement was seen writing down plates last weekend.',
      title: 'Eleven oh four',
      body: 'The last band runs long in the midtown basement. The quiet hour is the city\'s, not the landlord\'s, and a neighbor has the police line on speed dial.',
      options: [
        { id: 'CUT', label: 'Pull the plug at eleven', likely: 'It\'s a short last set, and nobody gets in trouble.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The last band got half a set and a loud cheer for stopping.' },
        { id: 'ACOUSTIC', label: 'Unplug and finish quietly', likely: 'A strange, good ending.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'They finished on one guitar and a floor tom with a towel on it.' },
        { id: 'RISK', label: 'Keep going', likely: 'Maybe the cops come, and maybe they don\'t.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.15 }, { op: 'MONEY', amount: -40 }],
          result: 'Two cruisers came at 11:04 and left a warning and a fine, and the host was not happy.' }
      ] },

    { id: 'SPRINGFIELD_MO_GAME_NIGHT', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'A national hardcore bill is in town on game night, and the home team plays the same evening.',
      title: 'The kids split',
      body: 'A touring all-ages bill is at the downtown hall and the home game is on the other side of town. Your local bill is caught in the middle.',
      options: [
        { id: 'LATE', label: 'Push doors back until both are over', likely: 'The ones who want more come after.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors opened an hour late, and the overflow from the big show found you.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'A packed floor or a half-empty one.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The kids split, and the locals who opened played to the ones who stayed.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new date.' }
      ] }
  ]
});
