SB.Cities.register('lawrence-ks', {
  v: 1,
  slug: 'lawrence-ks',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of kansas', 'haskell indian nations university', 'haskell', 'kansas relays', 'ku on wheels', 'kjhk', 'kanu', 'lawrence journal-world', 'university daily kansan',
           'kansas city star', 'busch light', 'coors', 'kansas city chiefs', 'kansas city royals', 'jayhawks', 'k-state', 'kansas state university', 'university of missouri', 'mizzou',
           'fort riley', 'prairie band potawatomi', 'warehouse arts district', 'rock chalk', 'final four', 'vfw', 'american legion', 'eagles lodge',
           'the limestone annex', 'burcham street hall', 'haw street garage', 'the dutch elm room', 'sunflower cellar', 'kaw bottoms annex', 'vermont street loft',
           'the lecompton room', 'quarry hall', 'delaware street garage', 'pawnee basement', 'wakarusa hall',
           'free state festival', 'lawrence arts center', 'lawrence busker festival', 'busker festival', 'lawrence field day fest', 'field day fest', 'kansas state fiddling and picking championships', 'st. patrick\'s day parade', 'summerfest', 'douglas county fairgrounds', 'ku daily kansan', 'daily kansan', 'ljworld', 'lawrence times', 'kcur', 'iheartlocalmusic', 'bandcamp daily', 'kansas city public radio', 'lawrence downtown association', 'explore lawrence', 'lawrence police department', 'ku buddy', 'kansas department of revenue', 'lawrence business magazine', 'autumn harvest festival'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['university of kansas*', 'haskell*', 'kansas relays*', 'lawrence journal*', 'university daily*', 'jayhawk*', 'kjhk*'],

  blurb: ['A college town under a ridge called the Hill, where the crowd graduates every four years and the basement scene starts over each fall.',
          'Forty minutes from Kansas City, so bands play one night here or skip it. Downtown bars are the ceiling; houses and East Lawrence rooms are the floor.'],
  hard: 'The crowd and the organizers graduate, summers are empty, and landlords keep selling.',
  region: 'the Plains',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Kansas City', state: 'MO', lat: 39.1, lon: -94.58 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Lawrence' },
    { id: 'lecompton', kind: 'FEEDER', name: 'Lecompton', minutes: 10, bearing: 290, note: 'A historic hamlet to the west; a few kids at most.' },
    { id: 'eudora', kind: 'FEEDER', name: 'Eudora', minutes: 15, bearing: 90, note: 'A bedroom town on K-10; kids come to Lawrence for everything.' },
    { id: 'tonganoxie', kind: 'FEEDER', name: 'Tonganoxie', minutes: 20, bearing: 60, note: 'A commuter town toward Kansas City; its kids drive to shows.' },
    { id: 'baldwin-city', kind: 'FEEDER', name: 'Baldwin City', minutes: 25, bearing: 190, note: 'A small college town with a handful of kids.' },
    { id: 'perry', kind: 'FEEDER', name: 'Perry and Oskaloosa', minutes: 25, bearing: 335, note: 'Lake and farm towns north; teenage bands who drive in on weekends.' },
    { id: 'johnson-county', kind: 'FEEDER', name: 'Shawnee and Olathe', minutes: 40, bearing: 85, pop: 130000, note: 'Big affluent suburbs: kids with cars and money who think of Lawrence as the cool town.' },
    { id: 'ottawa', kind: 'FEEDER', name: 'Ottawa', minutes: 40, bearing: 190, note: 'A small college and farm town down US 59 with its own small scene.' },
    { id: 'leavenworth', kind: 'FEEDER', name: 'Leavenworth', minutes: 50, bearing: 45, note: 'An army and prison river town; some DIY.' },
    { id: 'topeka', kind: 'FEEDER', name: 'Topeka', minutes: 30, bearing: 265, scene: 900, note: 'The cheaper, duller capital to the west; its kids look to Lawrence.' },
    { id: 'manhattan', kind: 'PEER', name: 'Manhattan', minutes: 70, bearing: 285, scene: 700, note: 'A university town and old sports rival; the trade runs mostly toward Lawrence.' },
    { id: 'columbia', kind: 'PEER', name: 'Columbia', state: 'MO', minutes: 135, bearing: 95, slug: 'columbia-mo', note: 'A sibling university town two hours east on I-70.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Massachusetts Street', route: 'downtown', note: 'Bars, shops and the main touring rooms; stable and expensive, the place DIY bands graduate to.' },
    { id: 'east-lawrence', name: 'East Lawrence', route: 'old-side', note: 'Small frame houses, rail-side warehouses and studios; longtime residents, artists and bartenders. The heart of the house and warehouse shows.' },
    { id: 'oread', name: 'Oread', route: 'campus', note: 'Old houses cut into student rentals around the Hill, most heavily policed and being rebuilt as luxury student apartments.' },
    { id: 'old-west', name: 'Old West Lawrence', route: 'old-side', note: 'Big old houses with stone basements, many of them rentals; steady and expensive, and owner-occupied streets complain.' },
    { id: 'north-lawrence', name: 'North Lawrence', route: 'work-side', note: 'Across the river: cheap, flood-prone, with warehouses, rail and farm-supply buildings.' },
    { id: 'south-lawrence', name: 'South Lawrence and 23rd Street', route: 'work-side', note: 'Strip malls, duplexes and service workers; cheap apartments and a few practice units.' },
    { id: 'west-lawrence', name: 'West Lawrence', route: 'campus', note: 'Newer subdivisions along Iowa Street where the parents live; garages and finished basements, no rooms.' },
    { id: 'brook-creek', name: 'Brook Creek and the middle neighborhoods', route: 'old-side', note: 'Older small-lot houses east and south of downtown; where many band members actually live.' }
  ],

  contacts: ['columbia-mo', 'wichita-ks', 'kansas-city', 'springfield-mo'],

  rooms: [
    { id: 'brook-basement', kind: 'HOUSE', hood: 'brook-creek', cap: 50, curfew: 1320, ac: false, outdoor: false, pressure: 55, start: true,
      note: 'A rented basement run by whoever is a junior this year. One noise call ends the night, and a graduation ends the room.' },
    { id: 'oread-basement', kind: 'HOUSE', hood: 'oread', cap: 60, ages: ['A18'], curfew: 1320, ac: false, outdoor: false, pressure: 65,
      note: 'A student basement on the most policed block in town. Landlord letters come with the noise calls.' },
    { id: 'east-pop-up', kind: 'HOUSE', hood: 'east-lawrence', cap: 40, curfew: 1350, ac: false, outdoor: false, pressure: 50,
      note: 'A pop-up room in a frame house, run by friends. It lasts a school year or two.' },
    { id: 'schoolhouse', kind: 'DIY', hood: 'north-lawrence', cap: 120, curfew: 1350, ac: false, lowLying: true, standing: [60, 60, 45], pressure: 55,
      note: 'An old schoolhouse across the river with the basement for a stage. The only real all-ages room, on flood-prone ground with an owner who pays a tax bill.' },
    { id: 'rail-warehouse', kind: 'DIY', hood: 'east-lawrence', cap: 100, curfew: 1380, ac: false, pressure: 55, needs: ['VOUCH'],
      note: 'A rail-side warehouse with a loading door. Loud and cheap, until the building is sold for redevelopment.' },
    { id: 'creek-yard', kind: 'OUTDOOR', hood: 'brook-creek', cap: 80, curfew: 1290, ac: false, outdoor: true,
      note: 'A porch and a backyard in May and September. Neighbors, storms and heat decide it.' },
    { id: 'record-shop', kind: 'SHOP', hood: 'downtown', cap: 60, curfew: 1140, ac: true,
      note: 'The record shop on Massachusetts Street. An in-store set on a Saturday afternoon, no bar and no money.' },
    { id: 'stage-bar', kind: 'BAR', hood: 'downtown', cap: 150, ages: ['A21'], curfew: 1500, ac: true, following: .3,
      note: 'A small-stage bar that has been open for decades. Reliable pay, twenty-one and over most nights.' },
    { id: 'main-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['A18'], curfew: 1470, ac: true, owner: 'TALENT_BUYER', needs: ['FULL_BILL'],
      note: 'The ceiling for local bands, booked by the house. A DIY band gets a Sunday or an opener slot.' }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1470, inForce: false } },

  calendar: [
    { id: 'street-festival', label: 'the street-performer festival', tag: 'festival', month: 5, week: 4, dows: [4, 5, 6], can: [.88, .85, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'arts-film', label: 'the arts-and-film festival', tag: 'festival', month: 6, week: 4, dows: [4, 5, 6], can: [.90, .88, .88], hoods: ['downtown', 'north-lawrence'], elsewhere: [1, 1, 1] },
    { id: 'semester-start', label: 'move-in week', tag: 'holiday', month: 8, weeks: [3, 4], dows: [4, 5, 6], can: [1.05, 1.08, 1.05], hoods: ['oread', 'brook-creek'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 3], dows: [5], can: [.88, .95, .95], hoods: ['downtown', 'oread'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [2, 4], dows: [5], can: [.88, .95, .95], hoods: ['downtown', 'oread'], elsewhere: [1, 1, 1] },
    { id: 'basketball', label: 'home basketball', tag: 'game', month: 2, weeks: [1, 3], dows: [1, 5], can: [.85, .92, .92], hoods: ['downtown'], elsewhere: [.95, .97, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Kansas City', state: 'MO', lat: 39.1, lon: -94.58, pop: 2200000 },
    { name: 'Topeka', state: 'KS', lat: 39.05, lon: -95.68, pop: 125000 },
    { name: 'Manhattan', state: 'KS', lat: 39.18, lon: -96.57, pop: 54000 },
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93, pop: 970000 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.2, pop: 2800000 }
  ],
  roads: ['I-70', 'K-10', 'US 59', 'US 40', 'US 24', 'the Kansas Turnpike'],

  words: {
    street: ['Massachusetts Street', 'Iowa Street', 'Vermont Street', 'Sixth Street', 'Ninth Street', '23rd Street', 'Clinton Parkway'],
    water: ['the Kaw', 'the Wakarusa', 'Clinton Lake'],
    hood: ['East Lawrence', 'North Lawrence', 'Oread', 'Old West Lawrence', 'Pinckney', 'Brook Creek', 'Barker', 'Hillcrest'],
    thing: ['burnt ends', 'stone basement', 'porch couch', 'the Hill', 'moving truck', 'biscuits and gravy', 'moving curb', 'student radio', 'shelter corner', 'one-stair basement', 'moving curb', 'student radio', 'shelter corner', 'one-stair basement'],
    weather: ['tornado watch', 'ice storm', 'Kaw flood']
  },

  events: [
    { id: 'LAWRENCE_KS_NUISANCE_HOUSE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4] },
      telegraph: 'The neighbor across the street has been calling the cops again.',
      title: 'The third call this year',
      body: 'A neighbor in an old house has called the police for the third time this year, and the landlord says the house will be declared a nuisance. This could be the last show there.',
      options: [
        { id: 'MOVE_YARD', label: 'Move the show to a basement across town', likely: 'It\'s smaller and louder, and nobody on that street knows you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: 0.6 }],
          result: 'A basement across town took the bill. It was packed, and nobody called anyone.' },
        { id: 'EARLY', label: 'Start early and end by nine', likely: 'The neighbor sleeps, but it\'s a short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }],
          result: 'You were done by nine, and the neighbor stayed quiet, and so did the house.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The neighbor has a phone.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }],
          result: 'The police showed up at ten, the room emptied, and the house was marked.' }
      ] },

    { id: 'LAWRENCE_KS_STREET_FESTIVAL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'festival' },
      telegraph: 'The street festival is the same weekend and every block downtown will be closed.',
      title: 'The street is closed',
      body: 'Massachusetts Street is full of a street festival, the blocks are closed and the van cannot load. The crowd is out there, just not coming to the show.',
      options: [
        { id: 'LATE', label: 'Push doors back until the street thins', likely: 'It\'s late, but the crowd comes in off the street.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.15 }],
          result: 'You opened doors late and the street crowd drifted in, and it was a loud, happy night.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The van has to find a spot a mile away.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.85 }],
          result: 'You carried the amps a mile, and the people who came were glad to be inside.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the street was empty and so was the room.' }
      ] },

    { id: 'LAWRENCE_KS_FLOOD_WATCH', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [4, 5, 6] },
      telegraph: 'Rain all week and the basement across the river has water on the floor.',
      title: 'Water on the basement floor',
      body: 'The old schoolhouse basement floods in spring, so the show has to go somewhere dry. Then a tornado watch rolls in and forty kids end up in a cellar.',
      options: [
        { id: 'YARD', label: 'Move the bill to the yard behind it', likely: 'It\'s dry, if the sky holds.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: 0.8 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }],
          result: 'The yard held until the watch came in, and then everybody went to the cellar and finished the night there.' },
        { id: 'SHORT', label: 'Cut the bill and run it upstairs', likely: 'It\'s a small room and a short night.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.7 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'It was two bands upstairs, shoulder to shoulder, and nobody minded.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date and costs you some trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the water went down and some of them came back.' }
      ] }
  ]
});
