SB.Cities.register('cheyenne-wy', {
  v: 1,
  slug: 'cheyenne-wy',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of wyoming', 'wyoming cowboys', 'laramie county community college', 'lccc', 'wyoming tribune eagle', 'wyoming tribune-eagle',
           'cowboy state daily', 'wyoming public media', 'wyoming news', 'cheyenne frontier days', 'frontier days', 'daddy of em all', 'daddy of \'em all',
           'warren air force base', 'f.e. warren', 'warren afb', 'f. e. warren', 'union pacific', 'cheyenne depot', 'wyoming state capitol',
           'wyoming state museum', 'cheyenne botanic gardens', 'cheyenne civic center', 'cheyenne wind', 'cheyenne regional medical center',
           'cheyenne frontier', 'wyoming air national guard', 'tallgrass', 'microsoft', 'black hills energy', 'cheyenne gold and silver',
           'wyoming highway patrol', 'laramie county school district', 'east high', 'central high', 'south high', 'cheyenne little theater',
           'wyoming department of transportation', 'wydot', 'cheyenne mountain', 'cheyenne river', 'cheyenne river sioux', 'cheyenne nation', 'cheyenne tribe',
           'rocky mountain emo', 'kum & go', 'little america', 'cheyenne east high',
           'wake up wyo', 'kowb', 'westword', 'songkick', 'bandsintown', 'laramie county fair', 'wyoming state fair', 'old west museum',
           'atlas theater', 'archer complex', 'event center at archer', 'lions park', 'wyoming liquor division', 'cheyenne police department',
           'laramie county', 'red rocks', 'ball arena', 'ogden theatre', 'cheyenne depot plaza', 'fridays on the plaza'],
  blocklist: ['frontier days*', 'warren air force*', 'union pacific*', 'tribune eagle*', 'cowboy state*', 'wyoming cowboys*'],

  blurb: ['A small capital on a high, windy plain at the Colorado line, where the same sixty people come to every show and the address arrives by text.',
          'Metal and punk share rooms and ages mix, and a mom stands at the back with ear protection on her kid. Bands drive in from Colorado.'],
  hard: 'Blizzards close the interstate, the hidden room holds sixty, and the kids leave.',
  region: 'the high plains',
  whereGo: [
    { name: 'Fort Collins', state: 'CO', lat: 40.55, lon: -105.06 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Casper', state: 'WY', lat: 42.87, lon: -106.31 }
  ],

  tilt: [
    { fan: 'metal', band: 'metal', d: .08, reason: 'Teens booked metal shows in the park for years, and the old heads never stopped coming.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Cheyenne' },
    { id: 'burns', kind: 'FEEDER', name: 'Burns', minutes: 25, bearing: 70, note: 'A tiny farm town; a few kids drive in.' },
    { id: 'carpenter', kind: 'FEEDER', name: 'Carpenter', minutes: 25, bearing: 90, note: 'A hamlet; one or two carloads at most.' },
    { id: 'wellington', kind: 'FEEDER', name: 'Wellington', state: 'CO', minutes: 40, bearing: 195, note: 'The edge of the Front Range; bands more than kids.' },
    { id: 'pine-bluffs', kind: 'FEEDER', name: 'Pine Bluffs', minutes: 40, bearing: 100, note: 'A small border town; kids come in for anything.' },
    { id: 'albin', kind: 'FEEDER', name: 'Albin', minutes: 45, bearing: 85, note: 'Tiny; few people.' },
    { id: 'chugwater', kind: 'FEEDER', name: 'Chugwater', minutes: 50, bearing: 340, note: 'A ranch town; rarely.' },
    { id: 'kimball', kind: 'FEEDER', name: 'Kimball', state: 'NE', minutes: 55, bearing: 115, note: 'The Nebraska panhandle; odd bands, few fans.' },
    { id: 'wheatland', kind: 'FEEDER', name: 'Wheatland', minutes: 70, bearing: 340, note: 'A little bigger, with a small bar scene of its own; kids drive down on weekends.' },
    { id: 'fort-collins', kind: 'PEER', name: 'Fort Collins', state: 'CO', minutes: 45, bearing: 200, slug: 'fort-collins-co', note: 'A much bigger college scene and the natural next night on a tour.' },
    { id: 'laramie', kind: 'PEER', name: 'Laramie', minutes: 50, bearing: 285, slug: 'laramie-wy', note: 'A college town with a stable collective-run hall and bigger weeknight crowds.' },
    { id: 'greeley', kind: 'PEER', name: 'Greeley', state: 'CO', minutes: 70, bearing: 175, slug: 'greeley-co', note: 'Mid-size, with small punk and metal pockets.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the depot district', route: 'downtown', note: 'Brick storefronts, western-wear shops and a few bars. The small rooms hide in unmarked storefronts.' },
    { id: 'capitol-avenue', name: 'Capitol Avenue', route: 'old-side', note: 'Old houses, offices and churches near the capitol. Quiet, with older renters and some basements.' },
    { id: 'south-side', name: 'the south side', route: 'work-side', note: 'Cheap rentals, rail yards and warehouses along the tracks. The likeliest place for a loud room nobody minds.' },
    { id: 'westridge', name: 'Westridge', route: 'campus', note: 'Newer subdivisions and strip malls. Suburban teens who get driven to shows.' },
    { id: 'east-side', name: 'east Cheyenne by the airport', route: 'work-side', note: 'Trailers, shops and storage units. Cheap space and a long drive.' },
    { id: 'college', name: 'around the community college', route: 'campus', note: 'Students and commuters in apartments, a fair crowd of 18 to 22s.' },
    { id: 'park-side', name: 'by the fairgrounds park', route: 'old-side', note: 'Big open lots and a park where kids once ran all-ages metal shows.' },
    { id: 'base-side', name: 'the base side', route: 'work-side', note: 'Young enlisted families and single airmen in rentals: bored 19 to 25s with a paycheck.' }
  ],

  rooms: [
    { id: 'capitol-basement', kind: 'HOUSE', hood: 'capitol-avenue', cap: 30, curfew: 1320, ac: false, outdoor: false, pressure: 55, start: true,
      note: 'A basement under an old frame house near the capitol. The address goes out by text, and one neighbor is a phone call from ending it.' },
    { id: 'hidden-storefront', kind: 'DIY', hood: 'downtown', cap: 60, curfew: 1380, rent: 0, standing: [60, 60, 45], pressure: 60, needs: ['VOUCH'],
      note: 'An unmarked storefront the size of a closet, run by one promoter. The door money goes to the bands, and the address stays private.' },
    { id: 'record-shop', kind: 'SHOP', hood: 'capitol-avenue', cap: 40, curfew: 1260, ac: true,
      note: 'A record store that has hosted afternoon sets for years. Whether it still does depends on who owns it this year.' },
    { id: 'rock-bar', kind: 'BAR', hood: 'downtown', cap: 150, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A rock bar with a stage that books a few punk and metal bills. Twenty-one and over, so the teenagers wait outside.' },
    { id: 'theater-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['ALL'], curfew: 1380, ac: true, houseCosts: 200,
      note: 'An old theater turned music room, open floor and a bar. It costs a rental and a bar tab, and all ages can come.' },
    { id: 'fairground-hall', kind: 'HALL', hood: 'park-side', cap: 120, curfew: 1320, rent: 200, ac: true,
      note: 'An exhibit hall by the fairgrounds. Fine for a daytime all-ages bill, and booked solid in rodeo season.' },
    { id: 'park-pavilion', kind: 'OUTDOOR', hood: 'park-side', cap: 80, curfew: 1200, rent: 15,
      note: 'A pavilion in the park, where kids once ran metal shows. Good weather only, and the wind and hail decide.' },
    { id: 'civic-hall', kind: 'BIG', hood: 'park-side', cap: 1500, curfew: 1380, ac: true,
      note: 'A civic hall off the interstate. Not for punk unless a tour happens to be routed through.' },
    { id: 'rail-bar', kind: 'BAR', hood: 'south-side', cap: 100, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A big barn of a bar by the rail yards. Country on most nights, and a punk bill now and then if you ask.' }
  ],

  contacts: ['laramie-wy', 'fort-collins-co', 'greeley-co', 'casper-wy', 'denver'],

  calendar: [
    { id: 'rodeo-week', label: 'the big rodeo week', tag: 'fair', month: 7, weeks: [3, 4], dows: [3, 4, 5, 6], can: [.85, .80, .80], hoods: ['downtown'], elsewhere: [.95, .92, .92] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 8, week: 1, dows: [2, 3, 4, 5], can: [.90, .88, .88], hoods: ['park-side'], elsewhere: [1, .97, .97] },
    { id: 'plaza-concerts', label: 'the free Friday concerts', tag: 'festival', month: 7, weeks: [1, 4], dows: [4], can: [.92, .90, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'early-summer-fest', label: 'the early-summer festival weekend', tag: 'festival', month: 6, weeks: [2, 3], dows: [5, 6], can: [.92, .90, .90], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'christmas-parade', label: 'the Christmas parade', tag: 'parade', month: 11, weeks: [4, 5], dows: [5], can: [.85, .88, .88], hoods: ['downtown', 'capitol-avenue'], elsewhere: [1, .97, .97] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1500, inForce: false } },

  points: [
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99, pop: 3050000 },
    { name: 'Casper', state: 'WY', lat: 42.87, lon: -106.31, pop: 80000 },
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89, pop: 1200000 },
    { name: 'North Platte', state: 'NE', lat: 41.12, lon: -100.77, pop: 23000 }
  ],
  roads: ['I-25', 'I-80', 'US 85', 'US 30', 'US 87'],

  words: {
    street: ['Capitol Avenue', 'Lincolnway', 'Dell Range Boulevard', 'Central Avenue', 'Pershing Boulevard'],
    water: ['Crow Creek', 'Sherman Hill'],
    hood: ['Westridge', 'South Cheyenne', 'East Cheyenne', 'Frontier Park'],
    thing: ['wind', 'depot', 'donation jar', 'tailgate', 'cowboy boots', 'hail'],
    weather: ['wind advisory', 'blizzard closure', 'hail']
  },

  events: [
    { id: 'CHEYENNE_WY_BLIZZARD_CLOSURE', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'COLD', months: [10, 11, 12, 1, 2, 3, 4, 5] },
      telegraph: 'The forecast says blizzard, and the wind rule has the interstate shut to vans.',
      title: 'The interstate is closed',
      body: 'A blizzard has closed the interstate on both sides of town the night of your show. The second band is stuck in Colorado, and half the kids won\'t risk the drive.',
      options: [
        { id: 'MOVE', label: 'Move it a day, once the road opens', likely: 'It breaks the date, and the bands trust you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could still make it came.' },
        { id: 'LOCALS', label: 'Run it with the locals who can walk there', likely: 'You get a short bill and a small room.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .4 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Two local bands played long sets to the people who lived nearby.' },
        { id: 'ACCEPT', label: 'Play on and take what you get', likely: 'Most of the crowd stays home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }],
          result: 'The wind rocked the building all night, and the people who came stayed late.' }
      ] },

    { id: 'CHEYENNE_WY_RODEO_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'Every hotel in town is full, and the parade closes the avenues the morning of your show.',
      title: 'The rodeo week takes the town',
      body: 'Every hotel room and parking lot is taken, a parade shuts the main avenues, and the address text will go out late. The out-of-town crowd is looking for a night out.',
      options: [
        { id: 'LATE', label: 'Push doors back and text the address after the parade', likely: 'The people who find it come, later than planned.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The address went out at dusk, and a crowd of locals and strangers filled the room.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Half your people can\'t park.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The regulars walked in from six blocks away, and nobody else found it.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and the bands trust you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'CHEYENNE_WY_WIND_LOADIN', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 2] },
      telegraph: 'There\'s a wind advisory, and the downtown street is empty and dark by ten.',
      title: 'The wind takes the van door',
      body: 'A gust catches the van door while the band loads in at the unmarked storefront. The door is bent, the street is empty, and the headliner is rattled.',
      options: [
        { id: 'FIX', label: 'Tie it shut and load in anyway', likely: 'It starts late, but the show goes on.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 45 }],
          result: 'Rope and a ratchet strap held the door, and the set started late and nobody minded.' },
        { id: 'SHORT', label: 'Cut the set and let them rest', likely: 'It\'s a shorter night, and it asks less of the room.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'It was a short, loose set, with the kids standing close and the wind howling outside.' },
        { id: 'ACCEPT', label: 'Play on and take what you get', likely: 'Some of the crowd stays in the car.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The wind was loud and so was the band, and the people inside stayed late.' }
      ] }
  ]
});