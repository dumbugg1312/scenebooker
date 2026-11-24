SB.Cities.register('bakersfield-ca', {
  v: 1,
  slug: 'bakersfield-ca',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['california state university bakersfield', 'csub', 'bakersfield college', 'cal state bakersfield', 'the bakersfield californian', 'bakersfield californian',
           'kget', 'kern county', 'kernfm', 'kbak', 'kgot', 'kern river', 'kern county fair', 'kern county museum', 'edwards air force base', 'china lake',
           'naval air weapons station china lake', 'chevron', 'aera energy', 'berry petroleum', 'california resources corporation', 'grimmway farms', 'wonderful company',
           'wonderful pistachios', 'kaiser permanente', 'san joaquin community hospital', 'adventist health', 'bakersfield condors', 'condors', 'bakersfield blaze',
           'bakersfield speedway', 'bakersfield sound', 'bakersfield fire', 'tejon ranch', 'hurricane hilary',
           'kern county fair and rodeo', 'kern county fairgrounds', 'california pro rodeos', 'prca', 'kero', '23abc', 'turnto23', 'visit bakersfield',
           'mechanics bank arena', 'mechanics bank theater', 'rabobank arena', 'bakersfield christmas parade', 'kern high school district',
           'kern county sheriff', 'bakersfield police department', 'bpd', 'old kern', 'fall home show', 'bakersfield rodeo'],
  blocklist: ['bakersfield californian*', 'bakersfield sound*', 'kern county fair*', 'bakersfield condors*', 'chevron oil*'],

  blurb: ['A hot oil-and-farm city at the bottom of the valley, where a boxing gym and a house or two have carried the hardcore.',
          'When a room closes, the scene waits for the next one, and the drive to anywhere is long.'],
  hard: 'Few rooms, brutal heat and tule fog, and anything bigger is ninety minutes away.',
  region: 'the Central Valley',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'Fresno', state: 'CA', lat: 36.74, lon: -119.79 },
    { name: 'San Luis Obispo', state: 'CA', lat: 35.28, lon: -120.66 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Bakersfield' },
    { id: 'oildale', kind: 'FEEDER', name: 'Oildale', minutes: 10, bearing: 5, note: 'Across the dry river: kids and old houses.' },
    { id: 'shafter', kind: 'FEEDER', name: 'Shafter', minutes: 25, bearing: 320, note: 'A farm town to the northwest with a small crowd.' },
    { id: 'wasco', kind: 'FEEDER', name: 'Wasco', minutes: 25, bearing: 330, note: 'A farm town of field workers\' families.' },
    { id: 'arvin', kind: 'FEEDER', name: 'Arvin', minutes: 25, bearing: 130, note: 'A farm town to the southeast.' },
    { id: 'mcfarland', kind: 'FEEDER', name: 'McFarland', minutes: 30, bearing: 340, note: 'A farm town on the 99. Kids come in on weekends.' },
    { id: 'delano', kind: 'FEEDER', name: 'Delano', minutes: 40, bearing: 335, note: 'A farm town with a big Filipino and Latino history.' },
    { id: 'taft', kind: 'FEEDER', name: 'Taft', minutes: 40, bearing: 250, note: 'An oilfield town out through the west-side fields.' },
    { id: 'tehachapi', kind: 'FEEDER', name: 'Tehachapi', minutes: 50, bearing: 105, note: 'A mountain town up the 58: wind farms and cold nights.' },
    { id: 'visalia', kind: 'PEER', name: 'Visalia', minutes: 90, bearing: 5, slug: 'visalia-ca', note: 'A small college town with a scene of its own.' },
    { id: 'lancaster', kind: 'PEER', name: 'Lancaster and Palmdale', minutes: 90, bearing: 140, scene: 400, note: 'Desert high country over the mountains on the 14.' },
    { id: 'fresno', kind: 'PEER', name: 'Fresno', minutes: 105, bearing: 340, slug: 'fresno', note: 'A bigger Valley scene with a longer record.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Bakersfield', route: 'downtown', note: 'The bars and restaurants of the old core and the Mill Creek strip, with a few rooms for touring acts.' },
    { id: 'old-town-kern', name: 'Old Town Kern', route: 'old-side', note: 'Worn bungalows and antique stores east of downtown.' },
    { id: 'westchester', name: 'Westchester', route: 'old-side', note: 'Older houses west of downtown, near the college and the hospital.' },
    { id: 'east-bakersfield', name: 'East Bakersfield', route: 'work-side', note: 'A working-class Latino and Dust Bowl neighborhood with a history of garage and gym shows.' },
    { id: 'oildale-hood', name: 'Oildale', route: 'work-side', note: 'Oilfield and blue-collar, with trailers and small houses across the river.' },
    { id: 'southwest', name: 'southwest Bakersfield', route: 'campus', note: 'Newer tracts and big schools. No rooms.' },
    { id: 'northwest', name: 'northwest Bakersfield', route: 'campus', note: 'New subdivisions along the 99, with trails and churches.' },
    { id: 'rosedale', name: 'Rosedale', route: 'campus', note: 'The far west edge: new houses and farmland.' }
  ],

  rooms: [
    { id: 'east-garage', kind: 'HOUSE', hood: 'east-bakersfield', cap: 50, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, sketch: 25, standing: [70, 60, 45],
      pressure: 55, start: true, note: 'A garage behind a lived-in house, punk and hardcore only. One noise call or one housemate leaving ends it.' },
    { id: 'oildale-garage', kind: 'HOUSE', hood: 'oildale-hood', cap: 40, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, sketch: 30, standing: [65, 60, 45],
      pressure: 55, note: 'A garage in an old house across the river. Kids come from the farm towns, and the deputies know the street.' },
    { id: 'industrial-hall', kind: 'DIY', hood: 'east-bakersfield', cap: 150, rent: 70, deposit: 0, pa: .6, curfew: 1380, ac: false, sketch: 45, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'A warehouse room on the old industrial blocks. Loud as you like, with a landlord who may have other plans.' },
    { id: 'boxing-gym', kind: 'DIY', hood: 'east-bakersfield', cap: 100, rent: 60, deposit: 0, pa: .5, curfew: 1380, ac: false, sketch: 40, standing: [60, 60, 50],
      pressure: 50, needs: ['VOUCH'], note: 'A gym with the ring ropes pushed back. One bad night or one sale and it is gone.' },
    { id: 'banquet-hall', kind: 'HALL', hood: 'east-bakersfield', cap: 250, rent: 250, deposit: 100, pa: .6, curfew: 1320, ac: true, sketch: 10, standing: [55, 60, 70],
      owner: 'HALL_MANAGER', note: 'A rented banquet hall. Money up front, all ages, and a staff person watching the door.' },
    { id: 'creek-bar', kind: 'BAR', hood: 'downtown', cap: 200, soundFee: 50, pa: .7, ages: ['A21'], curfew: 1560, ac: true, following: .3, sketch: 20,
      standing: [50, 65, 70], note: 'A pizza-and-pub room on the Mill Creek strip with a back stage. The cover goes to the bar.' },
    { id: 'theater-club', kind: 'CLUB', hood: 'downtown', cap: 350, houseCosts: 200, split: .8, pa: .9, ages: ['A18'], curfew: 1440, ac: true, following: .6, sketch: 10,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 56, needs: ['FULL_BILL'], note: 'An old theater room with a real stage and a hard-set end time. Package tours stop here.' },
    { id: 'brewery-hall', kind: 'CLUB', hood: 'east-bakersfield', cap: 300, houseCosts: 180, split: .8, pa: .85, ages: ['ALL', 'A21'], curfew: 1380, ac: true, following: .5, sketch: 10,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 56, needs: ['FULL_BILL'], note: 'A taproom with a big stage near the fairgrounds. All-ages doors for the big names, 21-plus otherwise.' },
    { id: 'downtown-arena', kind: 'BIG', hood: 'downtown', cap: 1500, rent: 2200, deposit: 500, pa: 1, ages: ['ALL'], curfew: 1380, ac: true, sketch: 5, standing: [40, 70, 70],
      notice: 100, note: 'The arena and theater complex. A booking-agent room, and a local band gets it only as a sold-out dream opener.' },
    { id: 'river-pavilion', kind: 'OUTDOOR', hood: 'westchester', cap: 80, rent: 10, pa: .4, curfew: 1260, sketch: 30, standing: [60, 55, 40],
      note: 'A pavilion by the dry river bed. A daytime fill-in with no power and no permit.' }
  ],

  contacts: ['visalia-ca', 'fresno', 'los-angeles', 'san-luis-obispo-ca', 'santa-barbara-ca'],

  calendar: [
    { id: 'county-fair', label: 'the county fair and rodeo', tag: 'fair', month: 9, weeks: [4, 5], dows: [4, 5, 6], can: [.90, .85, .85], hoods: ['east-bakersfield'], elsewhere: [.97, .94, .94] },
    { id: 'county-fair-oct', label: 'the county fair and rodeo', tag: 'fair', month: 10, week: 1, dows: [4, 5, 6], can: [.90, .85, .85], hoods: ['east-bakersfield'], elsewhere: [.97, .94, .94] },
    { id: 'college-rodeo', label: 'the college rodeo', tag: 'fair', month: 11, week: 2, dows: [5, 6], can: [.95, .92, .92], hoods: ['east-bakersfield'], elsewhere: [1, 1, 1] },
    { id: 'christmas-parade', label: 'the downtown Christmas parade', tag: 'parade', month: 12, week: 1, dows: [3], can: [.90, .88, .88], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-9', label: 'home football', tag: 'game', month: 9, weeks: [1, 4], dows: [4], can: [.85, .95, .95] },
    { id: 'football-10', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [4], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1320, weekend: 1320, inForce: false } },

  points: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24, pop: 3900000 },
    { name: 'Fresno', state: 'CA', lat: 36.74, lon: -119.79, pop: 540000 },
    { name: 'Palmdale', state: 'CA', lat: 34.58, lon: -118.12, pop: 170000 },
    { name: 'San Luis Obispo', state: 'CA', lat: 35.28, lon: -120.66, pop: 47000 }
  ],
  roads: ['Highway 99', 'the 58', 'the 5', 'the Grapevine', 'Highway 178'],

  words: {
    street: ['Chester Avenue', 'Truxtun Avenue', 'Union Avenue', 'Stockdale Highway', 'California Avenue', 'Ming Avenue'],
    water: ['the dry river bed'],
    hood: ['Oildale', 'East Bakersfield', 'Old Town', 'Westchester', 'Rosedale'],
    thing: ['pumpjack', 'tule fog', 'grapevine', 'boxing ring', 'pickup', 'almond orchard'],
    weather: ['tule fog', 'triple digits']
  },

  events: [
    { id: 'BAKERSFIELD_CA_TULE_FOG', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [11, 12, 1, 2] },
      telegraph: 'The fog has been sitting on the valley floor all week.',
      title: 'Tule fog on the 99',
      body: 'The fog is so thick the highway crawls at thirty. The kids from the farm towns and the band are all on the road in it, and nobody can see a taillight.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier, before it settles in', likely: 'Most of them make it, but the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'You moved doors up an hour, and most people beat the worst of it.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'Anyone from the farm towns stays home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The fog never lifted, so only the ones who could walk came.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'BAKERSFIELD_CA_FAIR_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The fair is in town. Motels are full and the streets near the east side are blocked.',
      title: 'Fair week on the east side',
      body: 'The motels are sold out, the parking is blocked, and a rodeo crowd is walking past the gym. The show nearby can pull the wrong audience, or a few of the right one.',
      options: [
        { id: 'EARLY', label: 'Start early, before the crowd fills the street', likely: 'Your people get in, and it\'s short and loud.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'You opened doors early, and your crowd was in before the streets closed.' },
        { id: 'ACCEPT', label: 'Run it and see who wanders over', likely: 'Some rodeo kids come in, and some regulars cannot park.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'REGULARS', pct: .02 }],
          result: 'A few rodeo kids stayed past the first band, and the regulars parked half a mile away.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'BAKERSFIELD_CA_HOME_BY_TEN', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The hall show lets out near ten, and the under-eighteen crowd has to go straight home.',
      title: 'Straight home',
      body: 'Anyone under eighteen who is still out after ten can be cited, and the parents can be cited too. The last band is going to play to half the room.',
      options: [
        { id: 'EARLY', label: 'Start early so every band plays before ten', likely: 'The whole bill gets heard, but it\'s an early night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'You opened doors early, and every band played to a full room and the kids were home on time.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The last band loses the younger half.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The kids drifted out at ten, and the headliner played to the older heads.' }
      ] }
  ]
});
