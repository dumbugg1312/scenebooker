SB.Cities.register('ann-arbor-mi', {
  v: 1,
  slug: 'ann-arbor-mi',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of michigan', 'michigan daily', 'michigan stadium', 'eastern michigan university', 'eastern michigan', 'emu', 'michigan state', 'ohio state', 'the big house',
           'hash bash', 'ann arbor art fair', 'art fair', 'ann arbor observer', 'ann arbor district library', 'wemu', 'wcbn', 'theride', 'washtenaw community college',
           'ann arbor police', 'metro times', 'maize and blue', 'tree town', 'elks', 'elks lodge', 'masonic', 'grotto',
           'lower town annex', 'fuller road grange', 'hoover street co-op', 'the spin cycle', 'whitmore lake rod and gun hall', 'the frog island annex', 'kingsley lodge hall',
           'the maple road roller barn', 'the stadium boulevard storage', 'the packard pit', 'the depot siding', 'saline road skate barn'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The university, the stadium, the art fair and the spring rally are translated in game text. */
  blocklist: ['university of michigan*', 'michigan daily*', 'ann arbor art fair*', 'hash bash*', 'wcbn*', 'wemu*', 'ann arbor observer*', 'michigan stadium*'],

  blurb: ['Co-op rooms and fraternity basements keep it going, but every spring the organizers graduate and the rooms change hands.',
          'The room is found by asking, not by posting. Rents push the rougher shows east to Ypsilanti, and Detroit pulls the bands away.'],
  hard: 'Rooms and organizers vanish every spring with the student calendar.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  tilt: [
    { fan: 'emo', band: 'indie', d: .06, reason: 'Basement emo and math-rock bills draw the same student crowd.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Ann Arbor' },
    { id: 'ypsilanti', kind: 'FEEDER', name: 'Ypsilanti', minutes: 15, bearing: 100, scene: 600, bands: 5,
      note: 'The cheaper, rougher, working-class twin. Houses with big basements; much of what counts as the scene lives here.' },
    { id: 'saline', kind: 'FEEDER', name: 'Saline', minutes: 20, bearing: 175, note: 'An affluent little exurb. Kids drive in; no scene of its own.' },
    { id: 'dexter', kind: 'FEEDER', name: 'Dexter', minutes: 20, bearing: 300, note: 'A commuter village. High-school kids who want a show come to town.' },
    { id: 'plymouth', kind: 'FEEDER', name: 'Plymouth, Northville and Canton', minutes: 25, bearing: 75, note: 'Dense suburbs. Kids here see shows in both Ann Arbor and Detroit.' },
    { id: 'chelsea', kind: 'FEEDER', name: 'Chelsea', minutes: 25, bearing: 285, note: 'A small arts-and-festival town. A few kids come in for punk.' },
    { id: 'milan', kind: 'FEEDER', name: 'Milan', minutes: 25, bearing: 155, note: 'A farm-and-factory town. A teenager drives half an hour to see a band.' },
    { id: 'brighton', kind: 'FEEDER', name: 'Brighton and Howell', minutes: 35, bearing: 5, note: 'Rural and conservative exurbs up US-23. They send teenagers down the road.' },
    { id: 'jackson', kind: 'FEEDER', name: 'Jackson', minutes: 40, bearing: 270, note: 'A prison town with a shrinking industrial base. It sends some bands and kids east.' },
    { id: 'monroe', kind: 'FEEDER', name: 'Monroe', minutes: 40, bearing: 140, note: 'A river-and-industry town on the lake. Its punk kids drive to Ann Arbor or Toledo.' },
    { id: 'adrian', kind: 'FEEDER', name: 'Tecumseh and Adrian', minutes: 45, bearing: 215, note: 'Small college and farm towns. The local punk kids make the drive.' },
    { id: 'toledo', kind: 'PEER', name: 'Toledo', state: 'OH', minutes: 45, bearing: 160, slug: 'toledo-oh', note: 'Across the Ohio line, where tours on the Chicago-Cleveland road pass through.' },
    { id: 'lansing', kind: 'PEER', name: 'Lansing and East Lansing', minutes: 60, bearing: 330, slug: 'lansing-mi', note: 'The capital and a huge rival university town. A competitive, jokey rivalry.' },
    { id: 'flint', kind: 'PEER', name: 'Flint', minutes: 60, bearing: 20, slug: 'flint-mi', note: 'Smaller and harder, post-industrial. Its people drive here for what Flint lacks.' },
    { id: 'kalamazoo', kind: 'PEER', name: 'Kalamazoo', minutes: 90, bearing: 265, slug: 'kalamazoo-mi', note: 'A college and paper-mill city with a long punk tradition, on the road to Chicago.' }
  ],

  hoods: [
    { id: 'central-campus', name: 'Central Campus and South University', route: 'campus', note: 'The densest, priciest student blocks: high-rises, bars and burrito places. Almost no basement shows. The place the scene is not.' },
    { id: 'packard-tappan', name: 'East Packard, Tappan and the Hill', route: 'campus', note: 'Old wood-frame rentals with full basements, porches and a house-party economy. Most of the student house shows and most of the police attention.' },
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Bars, a record store, a few old rooms and a lot of new glass. Nothing cheap is left.' },
    { id: 'kerrytown', name: 'Kerrytown and the Old West Side', route: 'old-side', note: 'Leafy, expensive, owner-occupied and historic. Quiet-neighbor country with the odd church hall.' },
    { id: 'water-hill', name: 'Water Hill and the Northside', route: 'old-side', note: 'Early-1900s houses on a hill with a rotating roster of housemates and its own spring music day.' },
    { id: 'west-side', name: 'the west side', route: 'work-side', note: 'Plain postwar houses, strip plazas and a few fraternal lodges set back from the road. Cheaper, ignored and useful.' },
    { id: 'ypsi-depot', name: 'Depot Town and downtown Ypsilanti', route: 'town:ypsilanti', note: 'Old railroad brick, a converted garage, a coffee-and-tap house. Cheap and gritty, and slowly gentrifying.' },
    { id: 'ypsi-college', name: 'Cross Street and the college edge in Ypsilanti', route: 'town:ypsilanti', note: 'Old two-story houses with basements and yards, rents far below Ann Arbor. The realistic home of the basement circuit.' }
  ],

  rooms: [
    { id: 'packard-basement', kind: 'HOUSE', hood: 'packard-tappan', cap: 50, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 25, standing: [70, 60, 45],
      pressure: 55, start: true, note: 'A rental basement in the Hill. Low ceiling, one narrow stair, and a house full of students who will be gone by May.' },
    { id: 'coop-house', kind: 'HOUSE', hood: 'downtown', cap: 55, hostCut: 0, pa: .4, curfew: 1380, outdoor: false, sketch: 20, standing: [70, 60, 50], pressure: 50,
      note: 'A co-op house above a record store with a big old room. A handful of shows a year, and the housemates worry turnover will kill it.' },
    { id: 'hill-house', kind: 'HOUSE', hood: 'water-hill', cap: 40, hostCut: 0, pa: .3, curfew: 1380, outdoor: false, sketch: 20, standing: [65, 55, 45], pressure: 45,
      note: 'A house on the hill with a rotating roster of housemates and a porch.' },
    { id: 'ypsi-house', kind: 'HOUSE', hood: 'ypsi-college', cap: 60, hostCut: 0, pa: .4, curfew: 1380, outdoor: false, sketch: 25, standing: [75, 55, 40], pressure: 45,
      note: 'A big rented two-story with a basement and a yard. Cheap, and the neighbors are used to it.' },
    { id: 'summer-yard', kind: 'OUTDOOR', hood: 'packard-tappan', cap: 70, rent: 0, pa: .3, curfew: 1320, sketch: 30, standing: [65, 55, 40],
      note: 'A backyard in the warm months. Gone by October.' },
    { id: 'west-lodge', kind: 'HALL', hood: 'west-side', cap: 200, rent: 150, deposit: 50, pa: .6, curfew: 1440, ac: true, sketch: 10, standing: [55, 60, 70],
      owner: 'HALL_MANAGER', note: 'A fraternal lodge on the west side. Free parking and a full kitchen, but it wants the older members to get their bar crowd first.' },
    { id: 'lodge-bar', kind: 'BAR', hood: 'west-side', cap: 100, soundFee: 40, pa: .5, ages: ['A21', 'A18'], curfew: 1500, ac: true, following: .2, sketch: 15, standing: [50, 60, 70],
      note: 'A lodge basement bar with irregular shows. A licensed room, so minors leave early.' },
    { id: 'cellar', kind: 'DIY', hood: 'downtown', cap: 70, rent: 60, deposit: 0, pa: .4, curfew: 1380, ac: false, sketch: 45, standing: [60, 60, 45], pressure: 60,
      needs: ['VOUCH'], note: 'An old cellar found by asking around, not by listings. About seventy people, one exit.' },
    { id: 'depot-garage', kind: 'DIY', hood: 'ypsi-depot', cap: 125, rent: 80, deposit: 0, pa: .6, curfew: 1380, ac: false, sketch: 50, standing: [60, 60, 40], pressure: 65,
      needs: ['VOUCH'], note: 'A former garage in Depot Town. Plan for 125 and four hundred show up, and the fire code decides how it ends.' },
    { id: 'tap-house', kind: 'BAR', hood: 'ypsi-depot', cap: 60, soundFee: 20, pa: .4, ages: ['ALL', 'A21'], matinee: true, curfew: 1440, ac: true, following: .2, sketch: 10,
      standing: [55, 65, 70], note: 'A coffee-and-tap house with a small stage. Under 21 early, then a bar.' },
    { id: 'youth-room', kind: 'HALL', hood: 'downtown', cap: 300, rent: 200, deposit: 50, pa: .7, ages: ['ALL'], curfew: 1320, ac: true, sketch: 5, standing: [70, 65, 60],
      owner: 'HALL_MANAGER', pressure: 45, note: 'A teen-run, all-ages room with chaperones and a curfew. The most important all-ages room in town.' },
    { id: 'records', kind: 'SHOP', hood: 'downtown', cap: 40, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'The record store downtown. Afternoon in-stores, no beer, over by seven.' },
    { id: 'club', kind: 'CLUB', hood: 'downtown', cap: 300, houseCosts: 160, split: .8, pa: .9, ages: ['A21', 'A18'], curfew: 1560, ac: true, following: .6, sketch: 10,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The downtown room that books real bills. Wants six weeks and a name.' }
  ],

  contacts: ['toledo-oh', 'lansing-mi', 'flint-mi', 'kalamazoo-mi'],

  calendar: [
    { id: 'football-sep', label: 'home football Saturday', tag: 'game', month: 9, weeks: [1, 4], dows: [5], can: [.80, .85, .90], hoods: ['central-campus', 'packard-tappan', 'downtown'], elsewhere: [.95, .97, .97] },
    { id: 'football-oct', label: 'home football Saturday', tag: 'game', month: 10, weeks: [3, 4], dows: [5], can: [.80, .85, .90], hoods: ['central-campus', 'packard-tappan', 'downtown'], elsewhere: [.95, .97, .97] },
    { id: 'football-nov', label: 'home football Saturday', tag: 'game', month: 11, weeks: [1, 3], dows: [5], can: [.80, .85, .90], hoods: ['central-campus', 'packard-tappan', 'downtown'], elsewhere: [.95, .97, .97] },
    { id: 'street-fair', label: 'the summer street fair', tag: 'streetfair', month: 7, week: 3, dows: [3, 4, 5], can: [.75, .80, .85], hoods: ['downtown', 'central-campus'], elsewhere: [.95, .95, .95] },
    { id: 'spring-rally', label: 'the spring campus rally weekend', tag: 'festival', month: 4, week: 1, dows: [4, 5], can: [.90, .90, .95], hoods: ['downtown', 'central-campus'], elsewhere: [1, 1, 1] },
    { id: 'commencement', label: 'graduation weekend', tag: 'graduation', month: 5, week: 1, dows: [4, 5, 6], can: [.50, .90, 1] },
    { id: 'move-out', label: 'move-out week', tag: 'graduation', month: 4, week: 5, dows: [3, 4, 5], can: [.70, .90, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320 },

  points: [
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05, pop: 630000 },
    { name: 'Grand Rapids', state: 'MI', lat: 42.96, lon: -85.67, pop: 200000 },
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69, pop: 370000 }
  ],
  roads: ['I-94', 'US 23', 'M-14', 'I-96', 'US 12'],

  words: {
    street: ['Packard Street', 'Washtenaw Avenue', 'Michigan Avenue', 'Maple Road', 'Jackson Avenue', 'Liberty Street', 'Main Street', 'Broadway', 'Pontiac Trail', 'Church Street', 'Huron Street', 'Stadium Boulevard', 'Cross Street'],
    water: ['the Huron', 'Barton Pond', 'Ford Lake'],
    hood: ['Kerrytown', 'Water Hill', 'the Old West Side', 'the Northside', 'Depot Town', 'the Hill', 'Tappan', 'East Packard', 'Normal Park', 'South University', 'Whitmore Lake'],
    thing: ['co-op', 'party store', 'basement stair', 'coney', 'pop', 'freighter', 'squirrel', 'parking permit', 'burrito', 'fraternity basement', 'open mic', 'lodge hall'],
    weather: ['lake effect', 'freezing rain', 'slush', 'the thaw'],
    surnames: ['Kowalski', 'Schmidt', 'Miller', 'Kim', 'Patel', 'Johnson', 'Okafor', 'Hernandez', 'Nowak', 'Weber']
  },

  events: [
    { id: 'ANN_ARBOR_MI_FOOTBALL_SATURDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'There is a home game on your night and the stadium is a mile away.',
      title: 'The stadium has the town',
      body: 'Parking is gone, the main road south is one-way after the game and the crowds are drunk and loud. Anyone who wants to reach the show has to cross it.',
      options: [
        { id: 'EARLY', label: 'Open early and tell everyone where to park', likely: 'Most get in before the game lets out. A thin start.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors an hour early. The ones who came parked a mile out and walked.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'A lot of people give up on the traffic.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The streets were a parking lot. Half the list stayed home.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'ANN_ARBOR_MI_STREET_FAIR', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'streetfair' },
      telegraph: 'The street fair takes over thirty blocks this week and every hotel is full.',
      title: 'Every street is tents',
      body: 'The fair has downtown and campus, and the band has nowhere to sleep. Parking is gone and the crowd cannot get near the center.',
      options: [
        { id: 'FLOOR', label: 'Find the band a floor and move the show out of the center', likely: 'Smaller and farther out. They sleep.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'A co-op housemate gave up the front room. The band remembered.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'A lot of people give up on the crowds.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The fair had everyone. You played to a handful.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The tents were down by then.' }
      ] },

    { id: 'ANN_ARBOR_MI_COMMENCEMENT', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'graduation' },
      telegraph: 'Graduation is this weekend and the whole town is about to empty.',
      title: 'The town is a ghost town',
      body: 'Three thousand students are gone, hotels cost double and your headliner is about to play to fourteen people and one visiting parent.',
      options: [
        { id: 'LOCALS', label: 'Call the old regulars and the Ypsilanti kids', likely: 'A small room, but a real one.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }, { op: 'HOURS', d: -2, when: 'TODAY' }],
          result: 'The ones who stayed all year came. A short, happy night.' },
        { id: 'ACCEPT', label: 'Play to whoever is left', likely: 'A very thin room.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }],
          result: 'Fourteen people and a parent. The band was kind about it.' },
        { id: 'MOVE', label: 'Move it a week', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 7, respect: false }],
          result: 'You moved it a week. The ones who came back were the ones you wanted.' }
      ] },

    { id: 'ANN_ARBOR_MI_THAW', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 2], months: [12, 1, 2, 3] },
      telegraph: 'An ice storm is coming and US-23 and I-94 will crawl.',
      title: 'The ice storm',
      body: 'Freezing rain has shut US-23 and I-94 and the headliner is stranded in Jackson. The openers can play long, but the room is thin.',
      options: [
        { id: 'WAIT', label: 'Let the openers play long and wait for them', likely: 'A late start and a restless room.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The openers filled the time. The headliner walked in at eleven.' },
        { id: 'RIDES', label: 'Send someone out to fetch them', likely: 'Two hours of your day. They make it.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'SHOW_MOD', key: 'lateMin', v: 45 }, { op: 'REGULARS', pct: .02 }],
          result: 'You drove out on the slush and brought them in. They remember that.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The roads were clear by then.' }
      ] }
  ]
});
