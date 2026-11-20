SB.Cities.register('eugene-or', {
  v: 1,
  slug: 'eugene-or',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of oregon', 'oregon ducks', 'oregon state', 'oregon state beavers', 'olcc', 'oregon liquor and cannabis commission',
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

  contacts: ['salem-or', 'bend-or', 'portland', 'olympia-wa'],

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
      ] }
  ]
});
