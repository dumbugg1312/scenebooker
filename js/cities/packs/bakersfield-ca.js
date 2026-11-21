SB.Cities.register('bakersfield-ca', {
  v: 1,
  slug: 'bakersfield-ca',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['california state university bakersfield', 'csub', 'bakersfield college', 'cal state bakersfield', 'the bakersfield californian', 'bakersfield californian',
           'kget', 'kern county', 'kernfm', 'kbak', 'kgot', 'kern river', 'kern county fair', 'kern county museum', 'edwards air force base', 'china lake',
           'naval air weapons station china lake', 'chevron', 'aera energy', 'berry petroleum', 'california resources corporation', 'grimmway farms', 'wonderful company',
           'wonderful pistachios', 'kaiser permanente', 'san joaquin community hospital', 'adventist health', 'bakersfield condors', 'condors', 'bakersfield blaze',
           'bakersfield speedway', 'bakersfield sound', 'bakersfield fire', 'tejon ranch', 'hurricane hilary'],
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
        { id: 'EARLIER', label: 'Move the show an hour earlier, before it settles in', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors moved up an hour. Most beat the worst of it.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'Anyone from the farm towns stays home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The fog never lifted. Only the ones who could walk came.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] }
  ]
});
