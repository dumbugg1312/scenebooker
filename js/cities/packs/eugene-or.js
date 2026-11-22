SB.Cities.register('eugene-or', {
  v: 1,
  slug: 'eugene-or',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['saturday market', 'oregon bach festival', 'bach festival', 'oregon aloha festival', 'prefontaine classic', 'hayward field', 'autzen stadium', 'autzen', 'lane events center', 'lookout eugene-springfield', 'lookout eugene', 'opb', 'katu', 'eugene police department', 'social host ordinance', 'civil war game', 'alton baker park', 'frohnmayer bridge', 'ferry street bridge', 'riverfront district',
           'university of oregon', 'oregon ducks', 'oregon state', 'oregon state beavers', 'olcc', 'oregon liquor and cannabis commission',
           'peacehealth', '4j', 'lane community college', 'lane transit district', 'emx', 'bushnell university', 'eugene weekly', 'register-guard',
           'the register-guard', 'daily emerald', 'kwva', 'klcc', 'krvm', 'jefferson public radio', 'oregon country fair', 'eugene celebration',
           'whiteaker block party', 'track town', 'track town usa', 'world athletics championships', 'olympic trials', 'amtrak', 'amtrak cascades',
           'coast starlight', 'greyhound', 'holiday farm fire', 'oregon shakespeare festival', 'food not bombs', 'copwatch', 'vfw', 'american legion',
           'millrace annex', 'fern ridge grange', 'beltline bowl', 'skinner street garage', 'amazon channel hall', 'seed house',
           'willamette rail shed', 'pisgah room', 'ferry street unit b', 'grass seed hall', 'ninth street annex'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['university of oregon*', 'eugene weekly*', 'oregon country fair*', 'register-guard*', 'track town*', 'emx*', 'klcc*', 'peacehealth*'],

  blurb: ['A college town where house shows are the engine and hosts knock on neighbors\' doors first. Punk is no longer the loudest sound in town, but the habit is old and stubborn, and hardcore and grind bills still fill yards and small rooms.',
          'The police answer noise calls fast, and bars are 21 and over. The good nights are the quiet ones.'],
  hard: 'Noise complaints end house shows fast, and all-ages rooms are few.',
  region: 'the Northwest',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 },
    { name: 'Oakland', state: 'CA', lat: 37.80, lon: -122.27 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Eugene' },
    { id: 'springfield', kind: 'FEEDER', name: 'Springfield', minutes: 10, bearing: 70, pop: 61851, note: 'The cheaper, rougher twin across the river, with warehouses, storefronts and old ranch houses.', bands: 2 },
    { id: 'creswell', kind: 'FEEDER', name: 'Creswell', minutes: 20, bearing: 175, note: 'A small bedroom town and farm country to the south.' },
    { id: 'junction-city', kind: 'FEEDER', name: 'Junction City', minutes: 20, bearing: 345, note: 'A grass-seed farm town up the valley; kids come to Eugene.' },
    { id: 'veneta', kind: 'FEEDER', name: 'Veneta and Elmira', minutes: 25, bearing: 290, note: 'Rural lake country west on the highway; back-forty generator shows in summer.' },
    { id: 'cottage-grove', kind: 'FEEDER', name: 'Cottage Grove', minutes: 30, bearing: 190, note: 'A former timber town with working-class families and a small DIY presence at best.' },
    { id: 'albany', kind: 'FEEDER', name: 'Albany', minutes: 40, bearing: 350, scene: 150, note: 'A mill and manufacturing town up I-5; kids drive down for shows.' },
    { id: 'oakridge', kind: 'FEEDER', name: 'Oakridge', minutes: 50, bearing: 110, note: 'A tiny timber town turned mountain-bike stop in the Cascades.' },
    { id: 'florence', kind: 'FEEDER', name: 'Florence', minutes: 60, bearing: 280, note: 'A coastal retiree and tourist town; some surf and skate kids drive in.' },
    { id: 'corvallis', kind: 'PEER', name: 'Corvallis', minutes: 45, bearing: 355, scene: 700, note: 'The other college town: smaller, calmer, and a friendly rival. People trade shows both ways.' },
    { id: 'salem', kind: 'PEER', name: 'Salem', minutes: 75, bearing: 5, slug: 'salem-or', note: 'The state capital, about Eugene\'s size, with fewer shows; its kids drive to Portland or Eugene.' },
    { id: 'bend', kind: 'PEER', name: 'Bend', minutes: 120, bearing: 85, slug: 'bend-or', note: 'Outdoors and money over the pass; a good draw for touring bands, but the mountain roads close in winter.' }
  ],

  hoods: [
    { id: 'whiteaker', name: 'the Whiteaker', route: 'old-side', note: 'Working-class, arts and activist blocks northwest of downtown. Taverns with stages, houses with big yards, and the obvious punk neighborhood, now being priced up by new restaurants.' },
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Bars, storefronts and a few mid-size clubs. Mostly 21 and over, with storefront rents that are high and long arguments about street life.' },
    { id: 'campus', name: 'the campus edge', route: 'campus', note: 'Student bungalows, co-op houses and a cheap-eats strip. Busy during term, empty in summer, and being replaced by big apartment blocks.' },
    { id: 'near-west', name: 'Friendly and the near west', route: 'old-side', note: 'Craftsman houses, gardens and co-ops west of downtown. House and garage shows, and quiet neighbors who call it in.' },
    { id: 'west-eugene', name: 'West Eugene and Trainsong', route: 'work-side', note: 'Rail yards, auto shops, metal buildings and manufactured-home parks along the old highway. Practice spaces and warehouse rooms, cheap and mostly ignored.' },
    { id: 'river-road', name: 'River Road and Santa Clara', route: 'campus', note: 'Car-oriented suburbs north of the river: ranch houses with garages, big-box stores and the kids from the burbs.' }
  ],

  rooms: [
    { id: 'near-west-house', kind: 'HOUSE', hood: 'near-west', cap: 60, curfew: 1290, ac: false, outdoor: false, pressure: 50, start: true,
      note: 'A living room and garage on a quiet craftsman block. The host knocks on doors first, and the neighbors still call it in.' },
    { id: 'campus-coop', kind: 'HOUSE', hood: 'campus', cap: 80, curfew: 1305, ac: false, outdoor: false, pressure: 55,
      note: 'A co-op house with a garage and a long history of shows. The students leave every June and the landlord worries all year.' },
    { id: 'whiteaker-yard', kind: 'HOUSE', hood: 'whiteaker', cap: 120, curfew: 1305, ac: false, outdoor: true, pressure: 65,
      note: 'A big backyard house, the one everybody wants. One like it ended after three shows of three hundred people.' },
    { id: 'river-yard', kind: 'OUTDOOR', hood: 'river-road', cap: 100, curfew: 1260, ac: false, outdoor: true,
      note: 'A suburban backyard and garage on a big lot. Dry months only, and tarps the rest of the year.' },
    { id: 'resale-shop', kind: 'SHOP', hood: 'west-eugene', cap: 150, curfew: 1320, pa: 0.5, ac: false, standing: [65, 65, 70],
      note: 'A resale store that turns into a warehouse music room at night. All ages, and the neighbors are industrial.' },
    { id: 'trainsong-bay', kind: 'DIY', hood: 'west-eugene', cap: 100, curfew: 1320, ac: false, pressure: 55, needs: ['VOUCH'],
      note: 'A practice bay in a metal building by the rail yard. Cheap and mostly ignored, until the fire marshal reads the occupancy.' },
    { id: 'corner-cafe', kind: 'SHOP', hood: 'whiteaker', cap: 120, curfew: 1290, pa: 0.5, ac: true, standing: [65, 65, 70],
      note: 'A coffee shop with a lot and a corner stage that books heavy bills. It keeps them short and early.' },
    { id: 'community-hall', kind: 'HALL', hood: 'downtown', cap: 150, curfew: 1260, rent: 150, ac: true,
      note: 'A rented community space with a church attached. Acoustic bills are fine, and loud ones only for a benefit.' },
    { id: 'riverfront-lot', kind: 'OUTDOOR', hood: 'downtown', cap: 250, curfew: 1140, rent: 20, ac: false, outdoor: true, pressure: 45,
      note: 'A downtown lot for a summer daytime bill, run by a benefit collective. It needs a permit, and it is over by seven.' },
    { id: 'whiteaker-bar', kind: 'BAR', hood: 'whiteaker', cap: 200, soundFee: 60, ages: ['A21'], curfew: 1410, ac: true, following: 0.3,
      note: 'A tavern with a stage on the Whiteaker strip. The longest-running one has just closed ahead of a building sale.' },
    { id: 'back-stage-bar', kind: 'BAR', hood: 'downtown', cap: 150, soundFee: 50, ages: ['ALL', 'A21'], matinee: true, curfew: 1440, ac: true, following: 0.3,
      note: 'A bar with a back stage that lets kids in until nine, and then it goes 21 and over.' },
    { id: 'music-hall', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['A21'], curfew: 1410, ac: true, following: 0.5,
      note: 'A mid-size music hall that keeps undergrads out. Hard to book for punk, and rooms like it are closing.' }
  ],

  contacts: ['salem-or', 'bend-or', 'portland', 'olympia-wa'],

  calendar: [
    { id: 'country-fair', label: 'the country fair', tag: 'festival', month: 7, week: 2, dows: [4, 5, 6], can: [0.85, 0.8, 0.8] },
    { id: 'track-meet', label: 'track meet weekend', tag: 'race', month: 6, weeks: [1, 4], dows: [3, 4, 5], can: [0.92, 0.9, 0.9], hoods: ['downtown', 'campus'], elsewhere: [1, 1, 1] },
    { id: 'graduation', label: 'graduation weekend', tag: 'graduation', month: 6, week: 2, dows: [4, 5], can: [0.85, 0.85, 0.9], hoods: ['campus'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [0.8, 0.95, 0.95], hoods: ['campus', 'downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [0.8, 0.95, 0.95], hoods: ['campus', 'downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 5], dows: [5], can: [0.8, 0.95, 0.95], hoods: ['campus', 'downtown'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.1] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1440, weekend: 1440, inForce: false } },

  points: [
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68, pop: 650000 },
    { name: 'Corvallis', state: 'OR', lat: 44.56, lon: -123.26, pop: 60000 },
    { name: 'Medford', state: 'OR', lat: 42.33, lon: -122.87, pop: 85000 },
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49, pop: 525000 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33, pop: 750000 }
  ],
  roads: ['I-5', 'OR 126', 'OR 99', 'OR 569', 'OR 58', 'US 20'],

  words: {
    street: ['Willamette Street', 'Franklin Boulevard', 'River Road', 'Blair Boulevard', 'Highway 99', 'Beltline', 'Delta Highway'],
    water: ['the Willamette', 'Fern Ridge Lake', 'the Mill Race'],
    hood: ['the Whiteaker', 'Friendly', 'Trainsong', 'Santa Clara', 'River Road', 'Skinner Butte', 'Springfield'],
    thing: ['co-op house', 'bike lane', 'food cart', 'marionberry', 'kombucha', 'porch', 'tarp', 'crawlspace', 'backyard', 'tarp', 'potluck', 'benefit'],
    weather: ['drizzle', 'wildfire smoke', 'ice storm']
  },

  events: [
    { id: 'EUGENE_OR_WET_YARD', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [10, 11, 12, 1, 2, 3, 4] },
      telegraph: 'A week of steady drizzle is settling over the valley.',
      title: 'The yard is a swamp',
      body: 'The host planned the show for the backyard, and the backyard is mud. Wet months push everything under tarps or into the garage, and the neighbors are already watching.',
      options: [
        { id: 'TARPS', label: 'String tarps over the yard and play on', likely: 'Costs a little. Cold, damp and loud.',
          effects: [{ op: 'MONEY', amount: -25 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The tarps held. The crowd stood in a steady drip and played along.' },
        { id: 'GARAGE', label: 'Pack it into the garage', likely: 'Smaller and louder, with the neighbors a wall away.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'The garage took the bill. It was shoulder to shoulder and the door stayed shut.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The sky cleared up and half the list had other plans.' }
      ] },

    { id: 'EUGENE_OR_NOISE_CALL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 2], months: [9, 10, 11, 3, 4, 5, 6] },
      telegraph: 'Two neighbors on the street know about the show, and the one on the left was never asked.',
      title: 'The call at twenty past nine',
      body: 'The host knocked on doors and left a note on the porch, but the neighbor on the left never got one. A police call comes in at 9:20 with the first band still on.',
      options: [
        { id: 'KNOCK', label: 'Go knock on the door and apologize', likely: 'Costs a little and buys some goodwill. The crowd sees you leave.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }, { op: 'REGULARS', pct: .02 }],
          result: 'The neighbor got a plate of cookies and a promise. The police car rolled on.' },
        { id: 'SHORT', label: 'Cut the bill short and clear out', likely: 'Safe for the host. A thin, early night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.85 }],
          result: 'You stopped after two bands. Nobody argued, and the host kept the house.' },
        { id: 'ACCEPT', label: 'Keep playing and hope', likely: 'Risks a citation for the host.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.75 }],
          result: 'The third band played to a quiet street, and the host got a warning in the morning.' }
      ] },

    { id: 'EUGENE_OR_GAME_SATURDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'A home game is on Saturday, and cones are going up on the bridges.',
      title: 'Football Saturday',
      body: 'Tens of thousands are coming into town for the game. No parking within a mile of campus, and half your usual crowd is stuck in the cone patterns on the bridges.',
      options: [
        { id: 'LATE', label: 'Push doors back until the traffic clears', likely: 'The crowd that gets through still wants a night out.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.95 }],
          result: 'Doors an hour late. The ones who got across came in loud and tired.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is in traffic.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }],
          result: 'The bridges stayed jammed. The regulars walked in.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] }
  ]
});
