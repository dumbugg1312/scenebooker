SB.Cities.register('tallahassee-fl', {
  v: 1,
  slug: 'tallahassee-fl',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['florida state university', 'fsu', 'famu', 'florida a&m', 'tallahassee state college', 'tallahassee community college', 'university of florida',
           'valdosta state', 'vsu', 'moody air force base', 'chipola college', 'tallahassee memorial', 'tallahassee democrat', 'starmetro', 'doak campbell',
           'railroad square', 'first friday', 'downtown getdown', 'springtime tallahassee', 'greek food festival', 'wine and food festival', 'asian festival',
           'rose festival', 'watermelon festival', 'cascades park', 'tyndall', 'publix', 'waffle house', 'natty light', 'vfw', 'american legion', 'elks',
           'sinkhole social club', 'tin roof annex', 'cypress knee room', 'canopy road rec hall', 'red clay pavilion', 'capitol hill laundry', 'spanish moss carport',
           'lime sink lanes', 'tupelo mill annex', 'lafayette street garage', 'weeping oak hall', 'lake bradford boat barn',
           'leon county', 'leon county sheriff', 'tallahassee police', 'florida state university seminoles', 'seminoles', 'florida a&m university', 'rattlers',
           'famu homecoming', 'fsu homecoming', 'homecoming live', 'donald l. tucker civic center', 'tucker civic center', 'wfsu', 'tallahassee magazine', 'inweekly',
           '850 business magazine', 'visit tallahassee', 'florida flambeau', 'famuan', 'tallahassee film festival', 'springtime 10k', 'market days', 'kleman plaza',
           'all saints district', 'collegetown', 'hurricane michael', 'hurricane helene', 'tropical storm alberto'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['railroad square*', 'doak campbell*', 'tallahassee democrat*', 'starmetro*', 'publix*', 'waffle house*'],

  blurb: ['Students fill the room in term and vanish in summer, so the scene rebuilds itself every fall.',
          'A capital with a big campus and no basements: porches, garages and bar back rooms carry the shows.'],
  hard: 'Football Saturdays, summer exodus and few rooms that will take a punk bill.',
  region: 'north Florida',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Jacksonville', state: 'FL', lat: 30.33, lon: -81.66 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38 },
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Tallahassee' },
    { id: 'havana', kind: 'FEEDER', name: 'Havana', minutes: 20, bearing: 330, note: 'An antique-shop town on the way to Lake Talquin. A tiny scene, if any.' },
    { id: 'crawfordville', kind: 'FEEDER', name: 'Crawfordville', minutes: 30, bearing: 200, note: 'The county seat toward the Gulf. Boaters and families, no scene.' },
    { id: 'quincy', kind: 'FEEDER', name: 'Quincy', minutes: 30, bearing: 300, note: 'An old farm town to the west. Church and gospel spaces more than punk.' },
    { id: 'monticello', kind: 'FEEDER', name: 'Monticello', minutes: 30, bearing: 75, note: 'Tiny and historic, east on US 90.' },
    { id: 'thomasville', kind: 'FEEDER', name: 'Thomasville', state: 'GA', minutes: 40, bearing: 35, note: 'Plantation-money town up US 319, across the Georgia line.' },
    { id: 'gulf-villages', kind: 'FEEDER', name: 'Panacea, St. Marks and Sopchoppy', minutes: 40, bearing: 180, note: 'Gulf fishing villages. No scene.' },
    { id: 'chattahoochee', kind: 'FEEDER', name: 'Chattahoochee', minutes: 45, bearing: 295, note: 'A hospital-and-prison town, tiny.' },
    { id: 'madison', kind: 'FEEDER', name: 'Madison', minutes: 50, bearing: 90, note: 'A small north Florida farm town on I-10.' },
    { id: 'perry', kind: 'FEEDER', name: 'Perry', minutes: 60, bearing: 120, note: 'A timber and paper-mill town in a hard-hit Gulf county.' },
    { id: 'marianna', kind: 'FEEDER', name: 'Marianna', minutes: 75, bearing: 290, note: 'Caverns, farms and a college nearby, up I-10 to the west.' },
    { id: 'valdosta', kind: 'FEEDER', name: 'Valdosta', state: 'GA', minutes: 80, bearing: 65, note: 'A college and base town, larger than the others on the list.' },
    { id: 'apalachicola', kind: 'FEEDER', name: 'Apalachicola', minutes: 85, bearing: 220, note: 'An oyster and tourist town down US 98.' },
    { id: 'gainesville', kind: 'PEER', name: 'Gainesville', minutes: 130, bearing: 115, slug: 'gainesville-fl',
      note: 'The nearest equal, with the bigger punk name. People drive across for its fall festival.' },
    { id: 'panama-city', kind: 'PEER', name: 'Panama City', minutes: 110, bearing: 257, scene: 500, note: 'A beach-and-base town still rebuilding after the big storm of 2018.' },
    { id: 'fort-walton', kind: 'PEER', name: 'Fort Walton Beach', minutes: 170, bearing: 270, slug: 'fort-walton-beach-fl', note: 'A small Gulf Coast scene, west past Panama City.' },
    { id: 'pensacola', kind: 'PEER', name: 'Pensacola', minutes: 180, bearing: 270, slug: 'pensacola', note: 'Smaller than this town but with a bigger Gulf-coast punk and metal sense. Bands play both.' },
    { id: 'albany', kind: 'PEER', name: 'Albany', state: 'GA', minutes: 100, bearing: 5, scene: 250, note: 'A lower-tier trading partner up in Georgia.' },
    { id: 'dothan', kind: 'PEER', name: 'Dothan', state: 'AL', minutes: 120, bearing: 309, scene: 250, note: 'A lower-tier trading partner, northwest over the line.' }
  ],

  hoods: [
    { id: 'gaines', name: 'Gaines Street', route: 'downtown', note: 'Old warehouse and rail-yard blocks south of the university, turned into bars, student apartments and an arts district. Heating up, then priced out.' },
    { id: 'tennessee', name: 'Tennessee Street', route: 'campus', note: 'The strip west of campus: bars, pawn shops, motels, taquerias and cheap strip-mall units.' },
    { id: 'midtown', name: 'Midtown and Lake Ella', route: 'old-side', note: 'North of the strip on Monroe Street: cafes, a small lake and older houses. Young professionals and grad students; priced up.' },
    { id: 'frenchtown', name: 'Frenchtown', route: 'old-side', note: 'The oldest historically Black neighborhood in the state: small houses, corner stores and church halls. A newcomer needs real relationships.' },
    { id: 'bond', name: 'Bond and Callen', route: 'campus', note: 'South of downtown around the historically Black university. Its own music culture, mostly separate from rock shows.' },
    { id: 'southwood', name: 'Southwood and Capital Circle', route: 'work-side', note: 'The planned-suburb and strip-mall belt to the southeast: chains, apartments, industrial parks and church halls.' },
    { id: 'northside', name: 'Killearn, Bradfordville and Lake Jackson', route: 'campus', note: 'Big lots and subdivisions north on Thomasville Road: garages, backyards and teenagers living at home.' },
    { id: 'woodville', name: 'Woodville Highway', route: 'work-side', note: 'Cheap rent, trailers and pole barns heading south toward the Gulf. Ignored.' }
  ],

  rooms: [
    { id: 'northside-carport', kind: 'HOUSE', hood: 'northside', cap: 40, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: true, sketch: 25, standing: [65, 60, 50],
      pressure: 50, start: true, note: 'A carport on a big northside lot with a bug zapper and a neighbor who calls. Small kids and a host who worries about liability.' },
    { id: 'tennessee-yard', kind: 'HOUSE', hood: 'tennessee', cap: 120, hostCut: 0, pa: .5, curfew: 1380, ac: false, outdoor: true, sketch: 40, standing: [70, 55, 35],
      pressure: 60, note: 'A big backyard west of campus. Three hundred students come for the party and half never face the stage, and the street calls it in fast.' },
    { id: 'frenchtown-porch', kind: 'HOUSE', hood: 'frenchtown', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 20, standing: [55, 60, 35],
      pressure: 50, note: 'A porch on an old single-story block. A newcomer needs the neighbors on their side first.' },
    { id: 'gaines-warehouse', kind: 'DIY', hood: 'gaines', cap: 150, rent: 80, deposit: 0, pa: .6, ages: ['A18'], curfew: 1440, ac: false, sketch: 45, standing: [55, 60, 45],
      pressure: 65, needs: ['VOUCH'], note: 'A warehouse in the rail-yard blocks. The last two stages on this corridor came down for student apartments.' },
    { id: 'arts-park-shop', kind: 'SHOP', hood: 'gaines', cap: 60, pa: .4, curfew: 1290, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'The record shop by the arts park, with a gallery wall of old flyers. Afternoon sets, over by dinner.' },
    { id: 'midtown-bar', kind: 'BAR', hood: 'midtown', cap: 100, soundFee: 50, pa: .6, ages: ['A21'], curfew: 1500, ac: true, following: .3, sketch: 15, standing: [50, 65, 70],
      pressure: 50, note: 'A back-room stage on the trendy strip. Two of its neighbors closed in a year and the owner is jumpy.' },
    { id: 'gaines-club', kind: 'CLUB', hood: 'gaines', cap: 250, houseCosts: 150, split: .8, pa: .9, ages: ['A18'], curfew: 1470, ac: true, following: .6, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'Forty years old and mostly 18-plus. The one real club room for a touring bill.' },
    { id: 'tennessee-bar', kind: 'BAR', hood: 'tennessee', cap: 150, soundFee: 60, pa: .7, ages: ['A18'], curfew: 1470, ac: true, following: .3, sketch: 25, standing: [50, 65, 65],
      note: 'A stage on the strip with wristband nights for the pop-punk and emo kids, and metal on the others.' },
    { id: 'southwood-hall', kind: 'HALL', hood: 'southwood', cap: 200, rent: 180, deposit: 75, pa: .5, curfew: 1320, ac: true, sketch: 10, standing: [60, 60, 65],
      owner: 'CHURCH_CONTACT', note: 'A fellowship hall in the suburban belt. All ages, no beer, out by ten, and nobody is sure it likes punk.' },
    { id: 'woodville-barn', kind: 'OUTDOOR', hood: 'woodville', cap: 80, rent: 15, pa: .4, curfew: 1260, sketch: 40, standing: [60, 55, 45],
      note: 'A pole barn on the road to the Gulf. Cheap, and the afternoon thunderstorm cancels it half the time.' },
    { id: 'arena', kind: 'BIG', hood: 'gaines', cap: 12000, pa: 1, curfew: 1380, ac: true, sketch: 5, standing: [40, 70, 70], owner: 'TALENT_BUYER',
      note: 'The arena downtown. One big date a year, and it is not for locals.' }
  ],

  contacts: ['gainesville-fl', 'pensacola', 'fort-walton-beach-fl', 'jacksonville'],

  calendar: [
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 4], dows: [5], can: [.8, .9, .9] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [5], can: [.8, .9, .9] },
    { id: 'homecoming', label: 'homecoming weekend', tag: 'holiday', month: 10, week: 4, dows: [4, 5, 6], can: [.75, .8, .85], hoods: ['bond', 'gaines', 'tennessee'], elsewhere: [.95, .95, .95] },
    { id: 'spring-parade', label: 'the spring parade weekend', tag: 'parade', month: 3, weeks: [4, 5], dows: [5], can: [.85, .85, .85], hoods: ['gaines', 'tennessee'], elsewhere: [.95, .95, .95] },
    { id: 'downtown-fest', label: 'the downtown fall festival', tag: 'festival', month: 10, week: 2, dows: [4, 5, 6], can: [.92, .9, .9], hoods: ['gaines'], elsewhere: [1, 1, 1] },
    { id: 'graduation', label: 'graduation weekend', tag: 'graduation', month: 4, weeks: [1, 2], dows: [5, 6], can: [.8, .88, .9] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1440, weekend: 1441, inForce: false } },

  points: [
    { name: 'Jacksonville', state: 'FL', lat: 30.33, lon: -81.66, pop: 1700000 },
    { name: 'Panama City', state: 'FL', lat: 30.16, lon: -85.66, pop: 200000 },
    { name: 'Valdosta', state: 'GA', lat: 30.83, lon: -83.28, pop: 150000 },
    { name: 'Dothan', state: 'AL', lat: 31.22, lon: -85.39, pop: 150000 },
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38, pop: 2700000 },
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46, pop: 3200000 }
  ],
  roads: ['I-10', 'US 90', 'US 27', 'US 319', 'Capital Circle', 'US 98'],

  words: {
    street: ['Gaines Street', 'Tennessee Street', 'Monroe Street', 'Thomasville Road', 'Capital Circle', 'Apalachee Parkway', 'Woodville Highway', 'Mahan Drive',
             'Macomb Street', 'Meridian Road', 'Crawfordville Road'],
    water: ['Lake Ella', 'Lake Jackson', 'Lake Talquin'],
    hood: ['Midtown', 'Frenchtown', 'Bond', 'Callen', 'Southwood', 'Killearn', 'Bradfordville', 'Woodville'],
    thing: ['sinkhole', 'red clay', 'spanish moss', 'canopy road', 'boiled peanuts', 'mullet dip', 'screened porch', 'carport', 'bug zapper', 'live oak', 'fellowship hall'],
    weather: ['afternoon thunderstorm']
  },

  events: [
    { id: 'TALLAHASSEE_FL_GAME_DAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'A home game is Saturday, and the roads, hotels and bars are already full.',
      title: 'The football Saturday',
      body: 'The stadium eats the whole town. A marching band is parked across your load-in, and nobody books against this day.',
      options: [
        { id: 'LATE', label: 'Push doors back until the game traffic clears', likely: 'The crowd that wants a night out arrives late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors were an hour late, and they came in from the bars, loud and happy.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the game.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The casual crowd stayed home or in the stands, and the regulars came.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date, which costs you trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' } ] },

    { id: 'TALLAHASSEE_FL_PARTY_YARD', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [9, 10, 11, 2, 3, 4] },
      telegraph: 'A student house on Tennessee Street is throwing a yard party the same night.',
      title: 'The big yard party',
      body: 'Three hundred students are headed to a backyard west of campus for the party. Half of your list has never heard your band and will stand at the back of that yard.',
      options: [
        { id: 'LATE', label: 'Start late and catch the overflow', likely: 'The party spills out around midnight.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors were late, and a tired, loud crowd walked in from the yard at midnight.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'Half the list is somewhere else.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The regulars came, and the party crowd stayed at the party.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date, which costs you trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the ones who could come, came.' } ] },

    { id: 'TALLAHASSEE_FL_THUNDER', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [6, 7, 8, 9] },
      telegraph: 'The afternoon thunderstorms are coming in hard this week.',
      title: 'The afternoon storm',
      body: 'A storm parks over the south side by four every day, and your outdoor show is a puddle of mud and cords.',
      options: [
        { id: 'INDOORS', label: 'Move it into a garage', likely: 'It\'s smaller and louder, and dry.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A garage took the bill with an hour to spare, and the floor was packed.' },
        { id: 'WAIT', label: 'Hold the doors and see if it clears', likely: 'It starts late, and the crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The sky broke at nine, and you started late and nobody left.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'People hate a muddy field.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'Half the list stayed home rather than stand in the mud.' } ] },

    { id: 'TALLAHASSEE_FL_FLYER_WALL', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 4], months: [1, 2, 3, 4, 5, 9, 10, 11] },
      telegraph: 'A gallery by the arts park is opening an exhibit of old punk flyers this Friday.',
      title: 'The flyer-wall opening',
      body: 'The old heads are coming to the gallery to look at thirty years of flyers, and then the kids will ask what you play.',
      options: [
        { id: 'PLUG', label: 'Hand out cards at the opening and bring them over', likely: 'You get two crowds in one night, and a long walk.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.15 }, { op: 'REGULARS', pct: .02 }],
          result: 'The old heads were first in the door and the kids came after, and it felt like a room that had always been there.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'You are up against a good reason to stay out.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .92 }],
          result: 'A few skipped you for the gallery, and the rest came as planned.' } ] } ]
});
