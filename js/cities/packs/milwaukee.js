SB.Cities.register('milwaukee', {
  v: 1,
  slug: 'milwaukee',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of wisconsin-milwaukee', 'uwm', 'marquette university', 'marquette', 'milwaukee area technical college', 'matc', 'milwaukee journal sentinel',
           'shepherd express', 'milwaukee record', 'onmilwaukee', 'urban milwaukee', 'milwaukee magazine', 'radio milwaukee', 'wuwm', 'wmse', 'summerfest', 'the big gig',
           'festa italiana', 'german fest', 'wisconsin state fair', 'milwaukee brewers', 'brewers', 'milwaukee bucks', 'harley-davidson', 'harley', 'miller brewing',
           'molson coors', 'pabst', 'northwestern mutual', 'rockwell automation', 'froedtert', 'aurora health', 'johnson controls', 'great lakes naval station',
           'discovery world', 'milwaukee art museum', 'fiserv forum', 'american family field', 'state fair park',
           'henry maier festival park', 'pridefest', 'bastille days', 'irish fest', 'milwaukee irish fest', 'riverwest 24', 'milwaukee metal fest', 'metal fest',
           'uwm post', 'biztimes', 'milwaukee public media', '88nine', 'visit milwaukee', 'american legion'],
  blocklist: ['summerfest*', 'journal sentinel*', 'shepherd express*', 'pabst*', 'harley-davidson*', 'marquette university*', 'wmse*'],

  blurb: ['Basements in Riverwest and bars in Bay View carry a polite, ever-turning emo and hardcore scene. The lake wind cuts across every load-in.',
          'The all-ages crowd turns over almost completely every few years and rebuilds each time. Halls come and go, the kids drive to Chicago for the big ones, and a lease can end a venue overnight.'],
  hard: 'All-ages rooms keep closing, and one lease or ban can end your venue.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 }
  ],

  tilt: [
    { fan: 'emo', band: 'emo', d: .08, reason: 'Emo and screamo kids keep this city loyal to the sound.' },
    { fan: 'hardcore', band: 'hardcore', d: .06, reason: 'A strong hardcore city, with kids and middle-agers both in the room.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Milwaukee' },
    { id: 'west-allis', kind: 'FEEDER', name: 'West Allis', minutes: 15, bearing: 270, note: 'A working-class inner suburb.' },
    { id: 'waukesha', kind: 'FEEDER', name: 'Waukesha', minutes: 25, bearing: 270, note: 'A big suburb; kids drive in.' },
    { id: 'racine', kind: 'FEEDER', name: 'Racine', minutes: 30, bearing: 185, beyond: 'hoan-bridge', note: 'An old factory town with its own small basement scene.' },
    { id: 'port-washington', kind: 'FEEDER', name: 'Port Washington', minutes: 35, bearing: 5, note: 'A small lake town.' },
    { id: 'west-bend', kind: 'FEEDER', name: 'West Bend', minutes: 40, bearing: 320, note: 'Exurban kids with cars.' },
    { id: 'oconomowoc', kind: 'FEEDER', name: 'Oconomowoc', minutes: 40, bearing: 275, note: 'A lake-country suburb.' },
    { id: 'kenosha', kind: 'FEEDER', name: 'Kenosha', minutes: 45, bearing: 185, beyond: 'hoan-bridge', note: 'Halfway to Chicago; kids can go either way.' },
    { id: 'madison', kind: 'PEER', name: 'Madison', minutes: 80, bearing: 270, slug: 'madison-wi', note: 'A campus-driven scene and a regular swap.' },
    { id: 'green-bay', kind: 'PEER', name: 'Green Bay', minutes: 120, bearing: 340, slug: 'green-bay-wi', note: 'Smaller. Bands come through.' }
  ],

  chokepoints: [
    { id: 'hoan-bridge', name: 'the Hoan Bridge', p: .03 }
  ],

  hoods: [
    { id: 'riverwest', name: 'Riverwest', route: 'old-side', note: 'Tight old houses and flats on the river. Artists, cheap rooms, house shows and basements.' },
    { id: 'bay-view', name: 'Bay View', route: 'old-side', note: 'A working-class lake neighborhood turned hip. A gritty punk and metal room there has closed.' },
    { id: 'walkers-point', name: 'Walker\'s Point', route: 'downtown', note: 'Bars and warehouses south of the river, where an all-ages club closed.' },
    { id: 'east-side', name: 'the East Side', route: 'campus', note: 'Student rentals by the university. House venues open and close with each class.' },
    { id: 'brady', name: 'Brady Street and Murray Hill', route: 'downtown', note: 'Bars and shops, with rents rising.' },
    { id: 'near-west', name: 'the Near West Side and Merrill Park', route: 'work-side', note: 'Cheap, old and industrial, with former theaters and halls.' },
    { id: 'cudahy', name: 'Cudahy', route: 'work-side', note: 'A blue-collar lake suburb with a bar-and-hall tradition. A former metal room reopened as all-ages.' },
    { id: 'shorewood', name: 'Shorewood', route: 'campus', note: 'An inner suburb with a village-hall tradition of all-ages metal and hardcore.' },
    { id: 'sherman-park', name: 'Sherman Park', route: 'old-side', note: 'Big old houses on the cheaper west side.' }
  ],

  rooms: [
    { id: 'riverwest-basement', kind: 'HOUSE', hood: 'riverwest', cap: 60, curfew: 1320, ac: false, outdoor: false, pressure: 55, start: true,
      note: 'A duplex basement in Riverwest, dark and sweaty and packed. It lasts until the tenants turn over or a neighbor calls it in.' },
    { id: 'east-side-house', kind: 'HOUSE', hood: 'east-side', cap: 50, curfew: 1320, ac: false, outdoor: false, pressure: 55,
      note: 'A student rental near the university. It runs a year or two, goes quiet, and comes back under new names.' },
    { id: 'bay-view-porch', kind: 'HOUSE', hood: 'bay-view', cap: 40, curfew: 1320, ac: false,
      note: 'A porch and a basement among the old frame flats. Fewer shows than Riverwest, and fewer complaints.' },
    { id: 'gallery-room', kind: 'DIY', hood: 'riverwest', cap: 100, curfew: 1350, ac: false, pressure: 65, needs: ['VOUCH'],
      note: 'An art space in Riverwest. Two like it lost their leases over noise and kids drinking outside, so the landlord is watching.' },
    { id: 'cudahy-club', kind: 'CLUB', hood: 'cudahy', cap: 300, ages: ['ALL'], curfew: 1380, ac: true, following: .5, standing: [50, 70, 70],
      note: 'An old bar-and-grill metal room, reopened artist-owned and mostly all ages, with an arcade. One room carrying the whole all-ages side.' },
    { id: 'east-side-club', kind: 'CLUB', hood: 'east-side', cap: 250, ages: ['ALL'], curfew: 1380, ac: true, following: .4,
      note: 'A newer all-ages concert room with a local feel. A bar nearby, loved by the DIY crowd, has hosted an all-ages night.' },
    { id: 'riverwest-bar', kind: 'BAR', hood: 'riverwest', cap: 100, soundFee: 40, ages: ['A21'], curfew: 1500, ac: true, following: .3, standing: [45, 65, 75],
      note: 'A co-op public house with a small back room and a corner stage. The 21-plus backbone of the punk side.' },
    { id: 'point-bar', kind: 'BAR', hood: 'walkers-point', cap: 150, soundFee: 60, pa: .7, ages: ['A21'], curfew: 1530, ac: true, following: .3,
      note: 'A bar south of the river with a real stage. A gritty punk-and-metal bar in Bay View went dark, and this one watches its step.' },
    { id: 'village-hall', kind: 'HALL', hood: 'shorewood', cap: 250, curfew: 1350, ac: true, pressure: 60, standing: [50, 60, 70],
      note: 'A post hall that used to be the all-ages metal and hardcore home. It held a farewell show, and the town still talks about it.' },
    { id: 'summer-lot', kind: 'OUTDOOR', hood: 'bay-view', cap: 200, curfew: 1290, rent: 15,
      note: 'The yearly summer block party by a bar. DIY bands on a flatbed, and one hot afternoon to get it done.' },
    { id: 'west-hall', kind: 'BIG', hood: 'near-west', cap: 2500, ages: ['ALL'], curfew: 1380, ac: true, following: .8, owner: 'TALENT_BUYER', needs: ['FULL_BILL'],
      note: 'The big old hall on the main west-side street. National hardcore plays it all ages, and a metal weekend takes it over every year.' },
    { id: 'roaster-shop', kind: 'SHOP', hood: 'bay-view', cap: 60, curfew: 1260, ac: true,
      note: 'A coffee roaster with a corner for early sets. Over by nine, and everyone buys a bag.' }
  ],

  contacts: ['madison-wi', 'green-bay-wi', 'chicago', 'minneapolis'],

  calendar: [
    { id: 'lakefront-music', label: 'the lakefront music festival', tag: 'festival', month: 6, weeks: [3, 5], dows: [3, 4, 5, 6], can: [.85, .88, .85], hoods: ['walkers-point', 'brady'], elsewhere: [1, .95, .95] },
    { id: 'french-party', label: 'the downtown street party', tag: 'festival', month: 7, week: 2, dows: [3, 4, 5, 6], can: [.90, .88, .88], hoods: ['walkers-point', 'brady'], elsewhere: [1, .97, .97] },
    { id: 'bike-race', label: 'the 24-hour bike race', tag: 'race', month: 7, week: 4, dows: [4, 5], can: [.88, .85, .85], hoods: ['riverwest'], elsewhere: [1, 1, 1] },
    { id: 'lake-festivals', label: 'the lakefront weekend festivals', tag: 'festival', month: 8, weeks: [2, 4], dows: [4, 5, 6], can: [.92, .90, .90] },
    { id: 'state-fair', label: 'the state fair', tag: 'fair', month: 8, weeks: [1, 2], dows: [3, 4, 5, 6], can: [.90, .92, .92], hoods: ['near-west'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.88, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.88, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1320, weekend: 1380, inForce: true } },

  points: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 9500000 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27, pop: 3760000 },
    { name: 'Rockford', state: 'IL', lat: 42.26, lon: -89.09, pop: 340000 }
  ],
  roads: ['I-94', 'I-43', 'I-794', 'I-41', 'US 41'],

  words: {
    street: ['North Avenue', 'Brady Street', 'Locust Street', 'Kinnickinnic Avenue', 'Water Street', 'Mitchell Street'],
    water: ['Lake Michigan', 'the Milwaukee River', 'the Kinnickinnic'],
    hood: ['Riverwest', 'Bay View', 'Walker\'s Point', 'Merrill Park', 'Cudahy', 'Shorewood', 'Sherman Park'],
    thing: ['fish fry', 'brat', 'tavern', 'lake wind', 'low pipe', 'duplex'],
    weather: ['lake wind', 'ice storm']
  },

  events: [
    { id: 'MILWAUKEE_HOAN_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Crews are working on the lakefront spur this week.',
      title: 'The Hoan Bridge is shut',
      body: 'The Hoan Bridge is closed for a wreck and ice. Every car from the south side and the lake towns is being sent through downtown, and it is not moving.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the bridge.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The bridge stayed shut. The south side stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads took the surface streets together. They\'ll remember that.' }
      ] },

    { id: 'MILWAUKEE_BIKE_RACE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'race' },
      telegraph: 'The all-night bike race is on this weekend and the Riverwest streets are being taped off.',
      title: 'The van cannot get through',
      body: 'The riders have the streets around your house closed for the whole night. The van is at the barricade a block away with the amps still in it.',
      options: [
        { id: 'CARRY', label: 'Carry the gear in by hand', likely: 'Two hours of hauling. The show still happens.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'SHOW_MOD', key: 'lateMin', v: 45 }],
          result: 'Everyone carried a cab and a drum down the closed street. The riders cheered the whole way.' },
        { id: 'MOVE', label: 'Move the bill to a quieter block', likely: 'A smaller house on a street that is open.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'A house two blocks off the course took you in. Tight, but the street was open.' },
        { id: 'ACCEPT', label: 'Run it and let the street crowd come', likely: 'Half the list gives up at the barricade.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Half the list gave up at the tape. The ones who walked in made it loud.' }
      ] },

    { id: 'MILWAUKEE_LAKEFRONT_FRIDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'A big festival on the lakefront fills every downtown bar and parking lot this weekend.',
      title: 'Downtown is spoken for',
      body: 'The lakefront is full and the bars have all the crowd on a Friday. The kids who want something else are looking for a quiet basement in Riverwest.',
      options: [
        { id: 'BASEMENT', label: 'Move the bill to a Riverwest basement', likely: 'Smaller, louder, and the kids who skipped the festival show up.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.1 }],
          result: 'The basement was full by nine, mostly with kids who wanted a break from the crowds.' },
        { id: 'ACCEPT', label: 'Run it as booked', likely: 'The older fans are at the festival.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'Half the usual crowd was on the lakefront. The ones who came stayed for every band.' }
      ] },

    { id: 'MILWAUKEE_RIVERWEST_NOTICE', when: 'WEEK', tier: 'HARD', weight: 1, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 3], months: [4, 5, 6, 7, 8, 9, 10] },
      telegraph: 'A neighbor on the block has been asking about the noise after nine.',
      title: 'The landlord\'s notice',
      body: 'A neighbor called the noise in and the landlord left a notice on the door about fines and people drinking outside. The bill is in two days.',
      options: [
        { id: 'QUIET', label: 'Start early and keep it down', likely: 'Short and tight. The neighbors settle.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors early, done by nine-thirty, and nobody out on the sidewalk. The notice stayed in a drawer.' },
        { id: 'MOVE', label: 'Move it to another house', likely: 'Breaks the date for some. Keeps the landlord calm.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'A friend\'s flat took the bill. Not everyone found the new address.' },
        { id: 'ACCEPT', label: 'Run it and take your chances', likely: 'The landlord may be at the door.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'It went off, but the landlord stood at the top of the stairs for the last two bands.' }
      ] }
  ]
});
