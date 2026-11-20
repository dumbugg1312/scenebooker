SB.Cities.register('gainesville-fl', {
  v: 1,
  slug: 'gainesville-fl',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of florida', 'uf health', 'shands', 'santa fe college', 'florida gators', 'gator football', 'blender magazine', 'downtown festival and art show',
           'spring arts festival', 'hoggetowne', 'hoggetowne medieval faire', 'gatorade', 'publix', 'waffle house', 'regional transit system', 'amtrak',
           'seaboard air line', 'vfw', 'american legion', 'florida national guard', 'camp blanding', 'dbpr',
           'sinkhole annex', 'orange heights hall', 'tumblin slab', 'depot ave tire and lube', 'lake alice storage', 'carport embassy', 'newnans boat barn',
           'kanapaha gravel lot', 'sweetwater laundromat', 'the retention pond', 'hawthorne road feed store', 'live oak room'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The big fall festival is 'the big underground festival' in game text. */
  blocklist: ['hoggetowne*', 'gatorade*', 'publix*', 'waffle house*', 'sinkhole annex*', 'live oak room*', 'carport embassy*', 'sweetwater laundromat*'],

  blurb: ['A big university town in the spring-fed live-oak country of north Florida, where a fresh crowd of eighteen-year-olds arrives every August and the cheap rent never quite lasts.',
          'Everyone seems to be in a band and half of them run a house. Old heads say the peak was the nineties, kids say it is better now, and one weekend a year the whole underground comes to town.'],
  hard: 'Rooms open and close every year, the crowd turns over every four years and student towers eat the cheap blocks.',
  region: 'north Florida',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Jacksonville', state: 'FL', lat: 30.33, lon: -81.66 },
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38 },
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Gainesville' },
    { id: 'alachua', kind: 'FEEDER', name: 'Alachua', minutes: 15, bearing: 325, note: 'A farm town just north on US 441 with a small scene of its own.' },
    { id: 'newberry', kind: 'FEEDER', name: 'Newberry', minutes: 20, bearing: 260, note: 'A bedroom town of farms and subdivisions. Kids drive in.' },
    { id: 'micanopy', kind: 'FEEDER', name: 'Micanopy', minutes: 20, bearing: 190, note: 'A tiny historic town on the prairie. A few kids, no scene.' },
    { id: 'archer', kind: 'FEEDER', name: 'Archer', minutes: 20, bearing: 240, note: 'Rural farm country to the southwest. They come for the big nights.' },
    { id: 'high-springs', kind: 'FEEDER', name: 'High Springs', minutes: 25, bearing: 315, note: 'A river town of springs and antique shops with a few kids in bands.' },
    { id: 'hawthorne', kind: 'FEEDER', name: 'Hawthorne', minutes: 25, bearing: 100, note: 'A small town out the east road. Cheap, quiet and a long way from anything.' },
    { id: 'starke', kind: 'FEEDER', name: 'Starke', minutes: 35, bearing: 40, note: 'A county seat in prison and training-camp country. A few kids, and they drive.' },
    { id: 'williston', kind: 'FEEDER', name: 'Williston', minutes: 35, bearing: 220, note: 'Farm town to the southwest. Nothing for teenagers.' },
    { id: 'lake-city', kind: 'FEEDER', name: 'Lake City', minutes: 45, bearing: 350, note: 'An interstate crossroads with a small college and a little scene.' },
    { id: 'palatka', kind: 'FEEDER', name: 'Palatka', minutes: 50, bearing: 75, note: 'A paper-mill river town with a small DIY presence.' },
    { id: 'ocala', kind: 'PEER', name: 'Ocala', minutes: 45, bearing: 200, slug: 'ocala-fl', note: 'Horse country and the little cousin: a growing small punk scene one night away.' },
    { id: 'jacksonville', kind: 'PEER', name: 'Jacksonville', minutes: 90, bearing: 40, scene: 5000, note: 'A long-time band-trading partner and the bigger place bands move to.' },
    { id: 'tallahassee', kind: 'PEER', name: 'Tallahassee', minutes: 135, bearing: 295, slug: 'tallahassee-fl', note: 'The real peer: a capital college town with its own scene, and a football rivalry that is also a social one.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The old core around the plaza: bars, restaurants and storefronts. Grad students and bar workers; more expensive every year and not kind to a no-money all-ages show.' },
    { id: 'midtown', name: 'Midtown', route: 'campus', note: 'The bar and student-apartment belt between downtown and campus. Loud and eighteen to twenty-two; the house shows hide on the side streets.' },
    { id: 'duckpond', name: 'the Duckpond', route: 'old-side', note: 'Old houses, big oaks and older neighbors close to downtown. One complaint from shut down.' },
    { id: 'pleasant-street', name: 'Pleasant Street', route: 'old-side', note: 'Old frame houses near the center, long ignored and now squeezed by redevelopment next door. Shows here carry neighborhood politics.' },
    { id: 'depot', name: 'the Depot and rail district', route: 'work-side', note: 'Warehouses, rail spurs and old industrial buildings southeast of downtown. The best warehouse candidates, and first in line for breweries and condos.' },
    { id: 'southwest', name: 'Southwest and Archer Road', route: 'campus', note: 'Student-apartment sprawl and big-box retail. Clubhouses and parking lots, and management that shuts everything down.' },
    { id: 'northwest', name: 'Northwest and Millhopper', route: 'campus', note: 'Subdivisions of block ranch houses with garages and carports on bigger lots. Far from complaints, far from campus.' },
    { id: 'eastside', name: 'the Eastside', route: 'work-side', note: 'Cheaper, older housing and rural stretches out toward Newnans Lake and Hawthorne Road. Barns, sheds and yards; cheap and ignored.' }
  ],

  rooms: [
    { id: 'nw-carport', kind: 'HOUSE', hood: 'northwest', cap: 45, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: true, sketch: 20, standing: [70, 60, 45],
      pressure: 40, start: true, note: 'A carport on a block ranch house in a quiet subdivision. Generator weather in the storm months; the first room the player gets.' },
    { id: 'student-porch', kind: 'HOUSE', hood: 'midtown', cap: 40, hostCut: 0, pa: .3, curfew: 1380, ac: false, outdoor: false, sketch: 25, standing: [65, 55, 40],
      pressure: 55, note: 'A rented house on a side street in Midtown. The lease ends in summer, and the neighbors have heard it all.' },
    { id: 'duckpond-living', kind: 'HOUSE', hood: 'duckpond', cap: 30, hostCut: 0, pa: .3, curfew: 1320, ac: true, outdoor: false, sketch: 15, standing: [60, 55, 50],
      pressure: 65, note: 'A living room in an old house near downtown. Small, hot and one complaint from over.' },
    { id: 'east-yard', kind: 'OUTDOOR', hood: 'eastside', cap: 80, rent: 0, pa: .4, curfew: 1380, sketch: 30, standing: [60, 55, 40], lowLying: true,
      note: 'A big yard and a shed out the east road. Afternoon thunderstorms are the booker\'s enemy.' },
    { id: 'apartment-clubhouse', kind: 'HALL', hood: 'southwest', cap: 100, rent: 100, deposit: 100, pa: .4, curfew: 1320, ac: true, sketch: 10, standing: [50, 55, 55],
      owner: 'HALL_MANAGER', pressure: 55, note: 'A leasing-office clubhouse in an apartment complex. Air conditioning, and a manager who reads every rule twice.' },
    { id: 'depot-warehouse', kind: 'DIY', hood: 'depot', cap: 130, rent: 80, deposit: 0, pa: .6, curfew: 1440, ac: false, sketch: 45, standing: [55, 60, 45], pressure: 60,
      needs: ['VOUCH'], note: 'A bay in an old rail-district warehouse. Hot in summer; the developers are closing in.' },
    { id: 'records', kind: 'SHOP', hood: 'downtown', cap: 40, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'The record store off the plaza. Afternoon sets, over by seven.' },
    { id: 'downtown-bar', kind: 'BAR', hood: 'downtown', cap: 120, soundFee: 50, pa: .7, ages: ['ALL', 'A21'], matinee: true, curfew: 1560, ac: true, following: .3, sketch: 15,
      standing: [45, 65, 70], note: 'A bar with a stage and an eighteen-and-over wristband night. Over-twenty-one late.' },
    { id: 'midtown-club', kind: 'CLUB', hood: 'midtown', cap: 260, houseCosts: 140, split: .8, pa: .9, ages: ['A21', 'A18'], curfew: 1560, ac: true, following: .6, sketch: 10,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 35, needs: ['FULL_BILL'], note: 'The legal room that wants a name and a few weeks of notice.' }
  ],

  contacts: ['ocala-fl', 'tallahassee-fl'],

  calendar: [
    { id: 'underground-fest', label: 'the big underground festival weekend', tag: 'festival', month: 10, weeks: [4, 5], dows: [3, 4, 5, 6], can: [1.1, 1.15, 1.05], hoods: ['downtown', 'midtown'], elsewhere: [.95, .95, 1] },
    { id: 'football-sep', label: 'a home football Saturday', tag: 'game', month: 9, weeks: [2, 4], dows: [5], can: [.78, .85, .90], hoods: ['midtown', 'southwest', 'downtown'], elsewhere: [.92, .95, .97] },
    { id: 'football-oct', label: 'a home football Saturday', tag: 'game', month: 10, weeks: [1, 3], dows: [5], can: [.78, .85, .90], hoods: ['midtown', 'southwest', 'downtown'], elsewhere: [.92, .95, .97] },
    { id: 'football-nov', label: 'a home football Saturday', tag: 'game', month: 11, weeks: [1, 3], dows: [5], can: [.78, .85, .90], hoods: ['midtown', 'southwest', 'downtown'], elsewhere: [.92, .95, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] }
  ],

  points: [
    { name: 'Jacksonville', state: 'FL', lat: 30.33, lon: -81.66, pop: 1700000 },
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38, pop: 2700000 },
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46, pop: 3300000 },
    { name: 'St. Augustine', state: 'FL', lat: 29.9, lon: -81.31, pop: 15000 }
  ],
  roads: ['I-75', 'US 441', 'SR 24', 'SR 26', 'US 301', 'SR 20'],

  words: {
    street: ['University Avenue', '13th Street', 'Archer Road', 'Newberry Road', 'Hawthorne Road', 'Main Street', 'Williston Road'],
    water: ['Paynes Prairie', 'Lake Alice', 'Newnans Lake'],
    hood: ['Midtown', 'the Duckpond', 'Pleasant Street', 'Porters', 'Millhopper', 'Haile Plantation', 'the Depot'],
    thing: ['carport', 'retention pond', 'live oak', 'cinder block', 'screened porch', 'generator', 'listings page', 'band house', 'lease', 'boiled peanuts', 'sweet tea'],
    weather: ['afternoon thunderstorm', 'heat index', 'hurricane remnant'],
    surnames: ['Whitfield', 'Brooks', 'Alvarez', 'Nguyen', 'Jenkins', 'Patel', 'Garcia', 'Thomas', 'Hendry']
  },

  events: [
    { id: 'GAINESVILLE_FL_ROOM_MOVES', when: 'WEEK', tier: 'HARD', weight: 1, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 4] },
      telegraph: 'The new room is already looking for another space.',
      title: 'The new room moved again',
      body: 'The DIY room that opened last month in a rented unit has moved to a new unit across town. The listings page still has the old address, and the person who keeps it is never wrong.',
      options: [
        { id: 'SPREAD', label: 'Text everybody the new address yourself', likely: 'An hour of your day. Most of them find it.',
          effects: [{ op: 'HOURS', d: -1, when: 'TODAY' }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Everyone got the new address. A few still drove to the old one first.' },
        { id: 'TRUST', label: 'Trust the listings page to catch up', likely: 'A lot of people go to the wrong door.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The page was fixed at nine. By then half the list had gone home.' }
      ] },

    { id: 'GAINESVILLE_FL_STORM_CARPORT', when: 'WEEK', tier: 'HARD', weight: 3, cooldown: 25, bind: ['show'],
      if: { daysOut: [0, 2], weather: 'RAIN', months: [6, 7, 8, 9] },
      telegraph: 'The afternoon sky has gone green again.',
      title: 'The yard is under water',
      body: 'A thunderstorm has flooded the backyard slab an hour before doors, and the generator is sitting in a puddle. Everyone is going to have to fit under the carport.',
      options: [
        { id: 'CRAM', label: 'Cram everybody under the carport', likely: 'Smaller, louder and wetter. The ones who stay will not forget it.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .6 }, { op: 'REGULARS', pct: .02 }],
          result: 'Sixty people under a tin roof. The rain was louder than the drummer.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' },
        { id: 'SKIP', label: 'Run it on the porch and take what comes', likely: 'A thin crowd and a wet floor.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'A handful sat on the steps and watched the water run down the street.' }
      ] },

    { id: 'GAINESVILLE_FL_GAME_SATURDAY', when: 'WEEK', tier: 'REAL', weight: 3, cooldown: 20, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'Home football Saturday: 13th Street will be a parking lot by noon.',
      title: 'The whole town is at the game',
      body: 'It is a home football Saturday, and the whole city is in orange and blue. Nobody can park near campus, and half of your list is deciding between the stadium and your show.',
      options: [
        { id: 'LATE', label: 'Push the doors back after the game', likely: 'The ones who come after the final whistle are loud.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors at ten. The post-game crowd showed up in a good mood and a bad condition.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'Thin early, and parking is a fight.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The opener played to the sound guy and a dog.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'GAINESVILLE_FL_FEST_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'festival' },
      telegraph: 'The whole underground is coming to town this weekend.',
      title: 'The festival is in town',
      body: 'The big underground festival has dozens of bands playing every bar in town, and a touring band wants a day show at your place between their stage times.',
      options: [
        { id: 'STACK', label: 'Stack the sets, one every hour', likely: 'A packed yard all afternoon. Everyone is worn out.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.3 }, { op: 'HOURS', d: -3, when: 'TODAY' }],
          result: 'Sets every hour from noon. The neighbors stopped counting around four.' },
        { id: 'ONE', label: 'Just the one touring band, short and loud', likely: 'A solid crowd and no mess.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.15 }],
          result: 'Twenty minutes and a sweaty crowd. Then they were gone to the next one.' },
        { id: 'PASS', label: 'Stay out of it', likely: 'Your regulars go to the bars. Quiet weekend.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'Your place stayed quiet. Everybody you know was somewhere else.' }
      ] },

    { id: 'GAINESVILLE_FL_LANDLORD_SELLS', when: 'WEEK', tier: 'HARD', weight: 1, cooldown: 80, bind: ['show'],
      if: { daysOut: [0, 6] },
      telegraph: 'There is a survey stake in the yard next door.',
      title: 'The lot has been sold',
      body: 'The landlord has sold to a developer building student apartments, and the new owner wants the house empty by the end of the lease. This is the last good summer for this room.',
      options: [
        { id: 'LAST', label: 'Throw a last show and make it count', likely: 'A big, sentimental crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.2 }, { op: 'REGULARS', pct: .02 }],
          result: 'Everybody who ever played there came back. The floor held, just.' },
        { id: 'QUIET', label: 'Keep it quiet and keep the date', likely: 'No change, no goodwill.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1 }],
          result: 'A normal night in a house that was already gone.' }
      ] }
  ]
});
