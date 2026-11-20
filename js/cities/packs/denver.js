SB.Cities.register('denver', {
  v: 1,
  slug: 'denver',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['westword', 'denver post', 'denverite', 'axios denver', '5280', 'kgnu', 'great american beer festival', 'denver beer week', 'colfax marathon', 'denver pride',
           'broncos', 'rockies', 'nuggets', 'avalanche', 'empower field', 'coors field', 'coors', 'fort carson', 'air force academy', 'rtd', 'national western', 'stock show',
           'cu boulder', 'cu denver', 'university of colorado', 'colorado state university', 'university of denver', 'regis university', 'school of mines',
           'university of northern colorado', 'uccs', 'auraria campus', 'metropolitan state', 'red rocks', 'ghost ship', 'vfw', 'american legion',
           'the stockyard annex', 'platte bottoms social club', 'hail damage hall', 'curtis & twenty-sixth fellowship hall', 'the smelter room', 'switchyard 9',
           'post 1941', 'chinook hall', 'the mile low', 'bungalow sixteen-twelve', 'elyria feed & seed', 'lariat lanes', 'the beet dump', 'cottonwood basement', 'zinc alley'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Game text says "the big beer festival", "the stock show", "the foothills amphitheater", "the home team". */
  blocklist: ['westword*', 'denver post*', 'denverite*', 'kgnu*', 'great american beer*', 'colfax marathon*', 'denver pride*', 'red rocks*'],

  blurb: ['Sober volunteer rooms and one-night pop-ups keep a hardcore revival alive after the warehouses went.',
          'Benefit bills mix punk, metal and noise, and the old heads who reopen a room for the kids still talk about the fire.'],
  hard: 'Rooms are volunteer-run, and one noise call or rent hike ends them.',
  region: 'the Front Range',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Oakland', state: 'CA', lat: 37.80, lon: -122.27 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'metal', d: .07, reason: 'Mixed benefit bills put hardcore and metal in the same rooms.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Denver' },
    { id: 'golden', kind: 'FEEDER', name: 'Golden', minutes: 25, bearing: 265, note: 'An engineering school and a big brewery at the foot of the hills. A small scene.' },
    { id: 'boulder', kind: 'FEEDER', name: 'Boulder', minutes: 40, bearing: 340, note: 'A rich university town with its own scene and a long punk history. Kids come down on US-36.' },
    { id: 'castle-rock', kind: 'FEEDER', name: 'Castle Rock and Monument', minutes: 40, bearing: 185, beyond: 'i25-snow', note: 'Strip-mall suburbs and garage bands. Kids with cars and a long drive home.' },
    { id: 'evergreen', kind: 'FEEDER', name: 'Evergreen and Idaho Springs', minutes: 45, bearing: 250, beyond: 'i70-mountains', note: 'Mountain bedroom towns with outdoor jobs and almost no scene.' },
    { id: 'longmont', kind: 'FEEDER', name: 'Longmont', minutes: 50, bearing: 350, note: 'A tech and bedroom town with skate culture and house shows.' },
    { id: 'greeley', kind: 'FEEDER', name: 'Greeley', minutes: 65, bearing: 15, note: 'A college, meatpacking and oilfield town. Small, working-class and rough, with crowds who arrive straight from work.' },
    { id: 'loveland', kind: 'FEEDER', name: 'Loveland', minutes: 60, bearing: 355, note: 'A bedroom town with a mall and parks. Little of its own.' },
    { id: 'fort-morgan', kind: 'FEEDER', name: 'Fort Morgan', minutes: 85, bearing: 50, note: 'Sugar beets and meatpacking on the plains. Almost nothing for kids; they drive in.' },
    { id: 'fort-collins', kind: 'PEER', name: 'Fort Collins', minutes: 65, bearing: 355, slug: 'fort-collins-co', note: 'A big university and brewery city, a friendly smaller rival and a dependable touring stop.' },
    { id: 'colorado-springs', kind: 'PEER', name: 'Colorado Springs', minutes: 80, bearing: 185, slug: 'colorado-springs-co', note: 'A military and evangelical city with a strong, rivalrous scene.' },
    { id: 'cheyenne', kind: 'PEER', name: 'Cheyenne', state: 'WY', minutes: 100, bearing: 5, scene: 300, note: 'A small capital with a base and a tiny scene. Wind and ice close the road.' },
    { id: 'pueblo', kind: 'PEER', name: 'Pueblo', minutes: 120, bearing: 185, scene: 500, note: 'A steel city with a scrappy scene of its own.' }
  ],

  chokepoints: [
    { id: 'i70-mountains', name: 'I-70 through the mountains', p: .02 },
    { id: 'i25-snow', name: 'I-25 south through the pass at Monument', p: .015 }
  ],

  hoods: [
    { id: 'rino', name: 'RiNo', route: 'work-side', note: 'Old warehouses along the river and the tracks, once the live-work DIY center. Now breweries, murals and condos; a remnant.' },
    { id: 'five-points', name: 'Five Points', route: 'downtown', note: 'Old brick storefronts and small bars, heating up fast, with light rail through the middle.' },
    { id: 'cap-hill', name: 'Capitol Hill', route: 'old-side', note: 'Dense old apartments and cut-up mansions along Colfax. Cheap, walkable, and where scene people have always lived.' },
    { id: 'sobo', name: 'South Broadway', route: 'old-side', note: 'Record shops, tattoo shops and mid-size bars, with basements behind the strip. The most reliable show corridor, now expensive.' },
    { id: 'santa-fe', name: 'the Santa Fe arts district', route: 'campus', note: 'Galleries and tiny storefronts near the downtown campus. First Friday crowds, and art-washed rents.' },
    { id: 'globeville', name: 'Globeville and Elyria-Swansea', route: 'work-side', note: 'Industrial lots and old stockyard blocks cut up by the freeway. Few neighbors to complain, little transit, and displacement coming.' },
    { id: 'highlands', name: 'the Highlands and Sunnyside', route: 'old-side', note: 'Bungalows with basements and alley garages, now heavy with new townhomes. Gone as a cheap house area.' },
    { id: 'west-colfax', name: 'West Colfax and Lakewood', route: 'work-side', note: 'Motels, strip malls, veterans\' posts and light industry. Cheaper, with basements and suburban teens.' },
    { id: 'aurora', name: 'East Colfax and Aurora', route: 'work-side', note: 'Immigrant communities, strip malls and base families. Cheap and ignored, but hard to reach without a car.' },
    { id: 'englewood', name: 'Englewood and Federal Boulevard', route: 'downtown', note: 'Suburban teen house-show country: garages and strip-mall practice rooms.' }
  ],

  rooms: [
    { id: 'hill-basement', kind: 'HOUSE', hood: 'cap-hill', cap: 40, hostCut: 0, pa: .3, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [70, 60, 45],
      pressure: 50, start: true, note: 'A basement apartment under an old mansion off Colfax. Past ten the noise limit is a ticket.' },
    { id: 'garage', kind: 'HOUSE', hood: 'west-colfax', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 25, standing: [65, 55, 45],
      pressure: 45, note: 'A detached garage off the alley with the door up. Warm months only, and the wind has opinions.' },
    { id: 'englewood-house', kind: 'HOUSE', hood: 'englewood', cap: 60, hostCut: 0, pa: .5, curfew: 1380, ac: false, outdoor: false, sketch: 20, standing: [65, 55, 45],
      pressure: 40, note: 'A suburban-feeling house with a finished basement and parents who work nights.' },
    { id: 'backyard', kind: 'OUTDOOR', hood: 'sobo', cap: 70, rent: 0, pa: .4, curfew: 1320, sketch: 30, standing: [60, 55, 40],
      note: 'A fenced backyard behind the strip. Dry air and mild nights from May to September, until the afternoon hail.' },
    { id: 'post-hall', kind: 'HALL', hood: 'west-colfax', cap: 150, rent: 180, deposit: 60, pa: .6, curfew: 1380, ac: true, sketch: 10, standing: [55, 60, 70],
      owner: 'HALL_MANAGER', note: 'A veterans\' post on West Colfax. A flat fee, folding chairs and a bar nobody can use.' },
    { id: 'church-hall', kind: 'HALL', hood: 'five-points', cap: 90, rent: 70, deposit: 0, pa: .4, curfew: 1320, ac: false, sketch: 5, standing: [65, 60, 60],
      owner: 'CHURCH_CONTACT', pressure: 50, note: 'A church hall for benefit shows. No beer, and the door closes early.' },
    { id: 'live-work', kind: 'DIY', hood: 'rino', cap: 130, rent: 100, deposit: 0, pa: .6, curfew: 1440, ac: false, sketch: 60, standing: [55, 60, 45], pressure: 70,
      needs: ['VOUCH'], note: 'A shared warehouse with people living upstairs. The old Denver format, and what the fire inspectors look for.' },
    { id: 'stockyard-unit', kind: 'DIY', hood: 'globeville', cap: 110, rent: 70, deposit: 0, pa: .5, curfew: 1440, ac: false, sketch: 45, standing: [55, 60, 45], pressure: 60,
      needs: ['VOUCH'], note: 'An industrial unit by the old stockyards. No neighbors, no light, no bus.' },
    { id: 'practice-space', kind: 'DIY', hood: 'aurora', cap: 80, rent: 50, deposit: 0, pa: .5, curfew: 1440, ac: false, sketch: 35, standing: [60, 60, 45], pressure: 50,
      needs: ['VOUCH'], note: 'A rehearsal-room building in Aurora. Last Friday of the month, if the landlord looks away.' },
    { id: 'gallery', kind: 'DIY', hood: 'santa-fe', cap: 70, rent: 80, deposit: 0, pa: .4, curfew: 1380, ac: true, sketch: 25, standing: [60, 60, 50], pressure: 55,
      note: 'A small gallery on the art strip. First Friday brings an art crowd that outnumbers the punks.' },
    { id: 'records', kind: 'SHOP', hood: 'sobo', cap: 40, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'The record store on the strip. In-stores in the afternoon, done by seven.' },
    { id: 'all-ages-bar', kind: 'BAR', hood: 'sobo', cap: 130, soundFee: 50, pa: .7, ages: ['ALL', 'A21'], matinee: true, curfew: 1560, ac: true, following: .3, sketch: 10,
      standing: [50, 65, 70], note: 'A mid-size bar with an early all-ages show and a hand-stamp system for the late one.' },
    { id: 'taproom', kind: 'BAR', hood: 'five-points', cap: 100, soundFee: 40, pa: .6, ages: ['ALL', 'A21'], matinee: true, curfew: 1380, ac: true, following: .2, sketch: 10,
      standing: [50, 65, 70], note: 'A taproom that runs a punk matinee. It wants a quiet band and an early night.' },
    { id: 'club', kind: 'CLUB', hood: 'sobo', cap: 300, houseCosts: 150, split: .8, pa: .9, ages: ['A21', 'A18'], curfew: 1560, ac: true, following: .6, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The legal room that took the load from the warehouses. Wants six weeks and a name.' }
  ],

  contacts: ['fort-collins-co', 'colorado-springs-co', 'boulder-co'],

  calendar: [
    { id: 'livestock', label: 'livestock show weeks', tag: 'fair', month: 1, weeks: [2, 3], dows: [3, 4, 5, 6], can: [.92, .95, .97], hoods: ['globeville'], elsewhere: [1, 1, 1] },
    { id: 'marathon', label: 'marathon weekend', tag: 'race', month: 5, week: 3, dows: [5, 6], can: [.92, .90, .92], hoods: ['cap-hill', 'aurora'], elsewhere: [1, 1, 1] },
    { id: 'pride', label: 'Pride weekend', tag: 'festival', month: 6, week: 4, dows: [5, 6], can: [.95, .92, .95], hoods: ['cap-hill', 'five-points'], elsewhere: [1, 1, 1] },
    { id: 'showcase', label: 'the summer music showcase', tag: 'festival', month: 6, week: 3, dows: [5], can: [.88, .90, .95], hoods: ['sobo'], elsewhere: [.97, .97, 1] },
    { id: 'beer-fest', label: 'the big beer festival', tag: 'festival', month: 10, week: 1, dows: [3, 4, 5], can: [.90, .85, .90], hoods: ['five-points', 'rino'], elsewhere: [.95, .95, .97] },
    { id: 'football-sep', label: 'a home game Sunday', tag: 'game', month: 9, weeks: [1, 5], dows: [6], can: [.90, .88, .95], hoods: ['west-colfax', 'santa-fe'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'a home game Sunday', tag: 'game', month: 10, weeks: [1, 5], dows: [6], can: [.90, .88, .95], hoods: ['west-colfax', 'santa-fe'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1440, inForce: false }, quiet: 1320 },

  points: [
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89, pop: 1260000 },
    { name: 'Kansas City', state: 'MO', lat: 39.10, lon: -94.58, pop: 2200000 },
    { name: 'Albuquerque', state: 'NM', lat: 35.08, lon: -106.65, pop: 920000 },
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93, pop: 970000 }
  ],
  roads: ['I-25', 'I-70', 'I-76', 'I-225', 'US-36', 'Colfax Avenue'],

  words: {
    street: ['Colfax', 'Broadway', 'Federal Boulevard', 'Brighton Boulevard', 'Santa Fe Drive', 'Alameda', 'Sheridan Boulevard', 'Speer'],
    water: ['the South Platte', 'Cherry Creek'],
    hood: ['RiNo', 'Five Points', 'Capitol Hill', 'Baker', 'Highlands', 'Sunnyside', 'Globeville', 'Elyria', 'Sloan\'s Lake', 'Lakewood', 'Aurora', 'Englewood'],
    thing: ['green chile', 'bungalow', 'basement unit', 'alley', 'taproom', 'dispensary', 'hail dent', 'plow lane', 'ski traffic', 'light rail', 'garage door', 'pop-up room', 'benefit show'],
    weather: ['chinook', 'hail', 'wildfire smoke', 'afternoon thunderstorm', 'spring blizzard']
  },

  events: [
    { id: 'DENVER_MARCH_BLIZZARD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [3, 4] },
      telegraph: 'A spring storm is coming up from the south, with a foot of snow in the forecast.',
      title: 'A March blizzard',
      body: 'The plows have closed the interstate and the town is buried. The touring band is stuck in Wyoming and half the crowd cannot find their cars.',
      options: [
        { id: 'MOVE', label: 'Move it a day, once the plows come through', likely: 'Breaks the date. Snow in March melts in two days.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The sun came out and the street was dry by noon.' },
        { id: 'LOCAL', label: 'Run it with the locals only', likely: 'A smaller crowd of people who walked.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }, { op: 'REGULARS', pct: .02 }],
          result: 'The ones within walking distance showed up, and nobody forgot it.' },
        { id: 'CANCEL', label: 'Cancel and eat the cost', likely: 'Costs thirty dollars and some trust.',
          effects: [{ op: 'MONEY', amount: -30 }, { op: 'MOVE_SHOW', dayShift: 7, respect: false }],
          result: 'The show slid a week. The door money did not.' }
      ] },

    { id: 'DENVER_FIRE_TIP', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 4] },
      telegraph: 'Someone has been asking neighbors about the warehouse on your block.',
      title: 'The fire department gets a tip',
      body: 'Someone called in a warehouse show for an unpermitted crowd. A notice is on the door in the morning and the inspector says he will be back this week.',
      options: [
        { id: 'MOVE', label: 'Move the show to a house', likely: 'Smaller, louder and a lot of neighbors.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A basement took the whole bill, and the floor was packed.' },
        { id: 'TRIM', label: 'Cut the crowd to a safe number and keep the show', likely: 'Fewer people through the door.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'You counted heads at the door and held the line. The night was tight.' },
        { id: 'MOVEDAY', label: 'Lay low for a week', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 7, respect: false }],
          result: 'You went quiet and moved it a week. Not everyone could make the new one.' }
      ] },

    { id: 'DENVER_I70_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Snow and a spinout are forecast for the interstates this week.',
      title: 'The interstate is closed',
      body: 'A crash and blowing snow have shut the road in. The people coming in from the mountains and the south are stuck behind it.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors an hour early. The ones who left work early made it.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people behind the closure.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The closure never cleared. The ones outside the city stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads came the long way around together. They will remember that.' }
      ] },

    { id: 'DENVER_GAME_DAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'game' },
      telegraph: 'The home team plays this Sunday and the light rail will be full of orange.',
      title: 'Game day takes the parking',
      body: 'The stadium west of downtown has filled every lot and the trains. Fans in team colors have taken every parking spot within a mile of your room.',
      options: [
        { id: 'EARLY', label: 'Open early and send people to a cheap lot', likely: 'Most get in before the crowds. Thinner than usual.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .92 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors an hour early. The ones who came parked far and walked.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'A lot of people give up on the parking.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The lots stayed full. Half the list never found a place for the car.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] }
  ]
});
