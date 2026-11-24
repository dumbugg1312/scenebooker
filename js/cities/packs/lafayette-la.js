SB.Cities.register('lafayette-la', {
  v: 1,
  slug: 'lafayette-la',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of louisiana at lafayette', 'university of louisiana', 'ul lafayette', 'louisiana lafayette', 'ragin\' cajuns', 'ragin cajuns', 'the cajundome',
           'cajundome', 'university commons', 'lsu', 'louisiana state university', 'festival international', 'festival international de louisiane',
           'acadiana advocate', 'the advocate', 'daily advertiser', 'the independent', 'the vermilion', 'the current', 'klfy', 'katc', 'wafb', 'kadn', 'kpel',
           'knights of columbus', 'tabasco', 'avery island', 'hurricane laura', 'hurricane rita', 'hurricane katrina', 'katrina', 'frog festival',
           'rayne frog festival', 'crawfish festival', 'breaux bridge crawfish festival', 'chitimacha', 'coushatta', 'amtrak',
           'the cane row', 'cane row', 'slab city garage', 'slab city', 'council 1204 hall', 'council 1204', 'the coulee annex', 'coulee annex',
           'thruway moon lounge', 'the rice dryer', 'pinhook quonset', 'mudbug hall', 'the sugar house', 'atchafalaya shed', 'cypress row lanes',
           'st. mary street carport',
           'festivals acadiens et creoles', 'cajun field', 'vermilionville', 'international rice festival', 'mamou cajun music festival',
           'international cajun-zydeco festival', 'arnaudville etouffee festival', 'lafayette travel', 'lafayettetravel', 'lafayette consolidated government',
           'lafayette police department', 'daily reveille', 'kpel 96.5', 'yellow scene', '64 parishes', 'acadiana center for the arts', 'the great flood of 2016',
           'louisiana illuminator', 'noladiy', 'bandsintown', 'songkick'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Storms are written only as 'the storm'; the university is 'the university'. */
  blocklist: ['festival international*', 'ragin*', 'knights of columbus*', 'daily advertiser*', 'acadiana advocate*', 'tabasco*', 'cajundome*', 'lsu*', 'vermilionville*', 'yellow scene*'],

  blurb: ['Fiddle and accordion country, so loud is nothing new, but punk lives in carports, yards and rented halls. Rain cancels a show faster than the police do.',
          'Nobody has a basement here. Somebody\'s uncle owns a hall and wants a flat fee and no glass, and the bands get fed before load-in.'],
  hard: 'No basements, heat and rain, and halls that want a flat fee and no glass.',
  region: 'the Gulf',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07 },
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 },
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.8 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Lafayette' },
    { id: 'scott', kind: 'FEEDER', name: 'Scott', minutes: 10, bearing: 275, note: 'A bedroom town and boudin stop on I-10; kids with cars.' },
    { id: 'carencro', kind: 'FEEDER', name: 'Carencro', minutes: 15, bearing: 10, note: 'A northern suburb with a football-mad high school.' },
    { id: 'broussard', kind: 'FEEDER', name: 'Broussard and Youngsville', minutes: 20, bearing: 168, note: 'The fast-growing new-money suburbs to the south; subdivisions and strip malls.' },
    { id: 'breaux-bridge', kind: 'FEEDER', name: 'Breaux Bridge', minutes: 20, bearing: 60, note: 'A small Cajun town tied closely to Lafayette, with a deep music tradition.' },
    { id: 'rayne', kind: 'FEEDER', name: 'Rayne', minutes: 20, bearing: 280, note: 'A small farm town; high-school kids cross over for shows.' },
    { id: 'crowley', kind: 'FEEDER', name: 'Crowley', minutes: 30, bearing: 275, note: 'A rice and farm town with a few bars; people drive east for shows.' },
    { id: 'new-iberia', kind: 'FEEDER', name: 'New Iberia', minutes: 35, bearing: 135, note: 'A mid-sized sugar town with a small rock crowd that drives to Lafayette.' },
    { id: 'abbeville', kind: 'FEEDER', name: 'Abbeville', minutes: 35, bearing: 195, note: 'A shrimp and fishing town on the coast side.' },
    { id: 'opelousas', kind: 'FEEDER', name: 'Opelousas', minutes: 40, bearing: 355, note: 'A historic zydeco town with a deep music tradition; punk overlap is thin.' },
    { id: 'eunice', kind: 'FEEDER', name: 'Eunice', minutes: 55, bearing: 330, note: 'A prairie town with a small campus and a community-college crowd.' },
    { id: 'baton-rouge', kind: 'PEER', name: 'Baton Rouge', minutes: 65, bearing: 75, slug: 'baton-rouge-la', note: 'Across the swamp bridge on I-10: bigger, with its own scene; the two trade bands constantly.' },
    { id: 'lake-charles', kind: 'PEER', name: 'Lake Charles', minutes: 70, bearing: 275, scene: 800, note: 'A smaller refinery and casino town to the west that trades bands both ways.' },
    { id: 'houma', kind: 'PEER', name: 'Houma', minutes: 85, bearing: 120, scene: 600, note: 'An oilfield and bayou town; its kids make the drive in both directions.' },
    { id: 'beaumont', kind: 'PEER', name: 'Beaumont', state: 'TX', minutes: 120, bearing: 275, slug: 'beaumont-tx', note: 'A hard-edged petrochemical town across the Texas line.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Lafayette', route: 'downtown', note: 'Two-story brick blocks around the old center: bars, restaurants and festival streets.' },
    { id: 'freetown', name: 'Freetown and Port Rico', route: 'old-side', note: 'Historic neighborhood of shotgun houses and corner stores; yards, porches and small halls.' },
    { id: 'johnston', name: 'Johnston Street and the university area', route: 'campus', note: 'Student rentals, cheap eats, bars and tattoo shops along the main strip.' },
    { id: 'pinhook', name: 'Pinhook Road and Moss Street', route: 'old-side', note: 'Older oak-lined streets along the bayou with big yards and carports.' },
    { id: 'thruway', name: 'the Evangeline Thruway corridor', route: 'work-side', note: 'Rail yards, auto shops, warehouses and oilfield lots; the load-in-friendly rooms.' },
    { id: 'north-side', name: 'north Lafayette', route: 'old-side', note: 'Older commercial strips and church halls in a long-standing Black community; punk overlap is thin.' },
    { id: 'oil-center', name: 'the Oil Center', route: 'work-side', note: 'A midcentury office and medical district; empty after dark.' },
    { id: 'south-side', name: 'the new south side', route: 'campus', note: 'New subdivisions and big churches heading toward Youngsville; garages and driveways.' }
  ],

  rooms: [
    { id: 'pinhook-carport', kind: 'HOUSE', hood: 'pinhook', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 20, standing: [65, 60, 50],
      pressure: 45, start: true, note: 'A carport and a shaded yard behind an older bayou-side house. Rain cancels it, and the sound limit stops at the property line.' },
    { id: 'freetown-porch', kind: 'HOUSE', hood: 'freetown', cap: 60, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 25, standing: [65, 60, 45],
      pressure: 55, note: 'A porch and yard show on a block of small lots in an old neighborhood. The neighbors are close, and one complaint ends it.' },
    { id: 'avalon-house', kind: 'HOUSE', hood: 'johnston', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [70, 55, 40],
      pressure: 50, note: 'A house on the older streets by the university, where the queer-punk bills used to be. It might still be going.' },
    { id: 'freetown-hall', kind: 'HALL', hood: 'freetown', cap: 120, rent: 200, deposit: 100, pa: .5, curfew: 1350, ac: true, sketch: 10, standing: [60, 60, 65],
      owner: 'HALL_MANAGER', note: 'A dance hall rented for a flat fee, with no glass. The owner is somebody\'s uncle and can change his mind.' },
    { id: 'thruway-bay', kind: 'SHOP', hood: 'thruway', cap: 80, rent: 60, pa: .5, curfew: 1380, ac: false, sketch: 35, standing: [55, 60, 45],
      pressure: 55, needs: ['VOUCH'], note: 'A shop bay in an industrial strip. Load-in is easy, and the landlord is the only threat.' },
    { id: 'feed-club', kind: 'CLUB', hood: 'downtown', cap: 300, houseCosts: 150, split: .8, pa: .9, ages: ['ALL', 'A18'], curfew: 1380, ac: true, following: .5, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A converted feed-and-seed building that books heavy bills, all-ages metal included, with a wristband at the door.' },
    { id: 'strip-bar', kind: 'BAR', hood: 'johnston', cap: 150, soundFee: 50, pa: .6, ages: ['A18', 'A21'], curfew: 1440, ac: true, following: .3, sketch: 20, standing: [50, 65, 70],
      note: 'A bar with a back stage on the main strip. The student crowd comes with the term and leaves with it.' },
    { id: 'freetown-bar', kind: 'BAR', hood: 'freetown', cap: 200, soundFee: 50, pa: .7, ages: ['A18', 'A21'], curfew: 1440, ac: true, following: .3, sketch: 20, standing: [50, 65, 70],
      note: 'A music bar in the old neighborhood that books heavy locals and touring acts.' },
    { id: 'downtown-bar', kind: 'BAR', hood: 'downtown', cap: 100, soundFee: 50, pa: .6, ages: ['A21'], curfew: 1470, ac: true, following: .3, sketch: 15, standing: [45, 65, 75],
      pressure: 45, note: 'A small downtown bar that books weeknight punk and works the door by age. Rooms like it open and close every few years.' },
    { id: 'park-pavilion', kind: 'OUTDOOR', hood: 'johnston', cap: 150, rent: 20, pa: .4, curfew: 1260, sketch: 35, standing: [60, 55, 45],
      note: 'A pavilion or park lot by the university, daylight only. Heat, thunderstorms and the festival calendar decide it.' }
  ],

  contacts: ['baton-rouge-la', 'beaumont-tx', 'new-orleans-la', 'slidell-la'],

  calendar: [
    { id: 'mardi-gras', label: 'the Mardi Gras weeks', tag: 'parade', month: 2, weeks: [1, 2], dows: [4, 5, 6], can: [.85, .80, .80], hoods: ['downtown', 'johnston'], elsewhere: [.95, .92, .92] },
    { id: 'spring-street-fest', label: 'the spring downtown festival', tag: 'festival', month: 4, week: 4, dows: [2, 3, 4, 5, 6], can: [.80, .75, .75], hoods: ['downtown'], elsewhere: [.92, .90, .90] },
    { id: 'cajun-music-fest', label: 'the Cajun music weekend', tag: 'festival', month: 10, week: 2, dows: [4, 5, 6], can: [.92, .88, .88], hoods: ['johnston'], elsewhere: [1, .97, .97] },
    { id: 'farm-town-fest', label: 'the farm-town festival', tag: 'festival', month: 10, week: 3, dows: [3, 4, 5, 6], can: [.95, .93, .93] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.85, .95, .95], hoods: ['johnston'], elsewhere: [.95, .97, .97] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.85, .95, .95], hoods: ['johnston'], elsewhere: [.95, .97, .97] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 3], dows: [5], can: [.85, .95, .95], hoods: ['johnston'], elsewhere: [.95, .97, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1440, inForce: true } },

  points: [
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07, pop: 1000000 },
    { name: 'Baton Rouge', state: 'LA', lat: 30.45, lon: -91.15, pop: 870000 },
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37, pop: 7500000 },
    { name: 'Lake Charles', state: 'LA', lat: 30.23, lon: -93.22, pop: 215000 }
  ],
  roads: ['I-10', 'I-49', 'US 90', 'US 167', 'LA 182', 'LA 94'],

  words: {
    street: ['the Evangeline Thruway', 'Johnston Street', 'Pinhook Road', 'Moss Street', 'Jefferson Street', 'Ambassador Caffery'],
    water: ['the bayou', 'Bayou Teche', 'the Atchafalaya', 'the coulee'],
    hood: ['Freetown', 'Port Rico', 'the Oil Center', 'Youngsville', 'Broussard', 'Carencro', 'Scott'],
    thing: ['boudin', 'cracklins', 'plate lunch', 'daiquiri drive-through', 'sno-ball', 'crawfish boil', 'oilfield rotation', 'carport', 'rented hall', 'pot of gumbo', 'wristband night'],
    weather: ['afternoon thunderstorm', 'tropical storm', 'storm watch']
  },

  events: [
    { id: 'LAFAYETTE_LA_CARPORT_FLOOD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [6, 7, 8, 9, 10] },
      telegraph: 'A slow storm is stalled over the coast and the coulees are rising.',
      title: 'The carport is a pond',
      body: 'A thunderstorm has drowned the yard and the street out front is under water. The van is stuck two blocks away and the bill needs a roof.',
      options: [
        { id: 'HALL', label: 'Move the whole bill to a rented hall', likely: 'A flat fee and no glass, but dry.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'MONEY', amount: -80 }],
          result: 'The hall owner opened the doors with an hour to spare, and it was dry and the floor was full.' },
        { id: 'MOVE', label: 'Move it a day, once the water goes down', likely: 'It breaks the date, and everyone trusts you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the ones who could come came.' },
        { id: 'ACCEPT', label: 'Run it under the carport roof', likely: 'Wet, loud and thin.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'Everyone stood in a corner under the tin, and the ones who came stayed.' }
      ] },

    { id: 'LAFAYETTE_LA_FESTIVAL_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The festival is closing the downtown streets for days and everyone is in town.',
      title: 'The streets are closed',
      body: 'Parking is gone and the downtown streets are full of people with nowhere to go after dark. Your bar bill is stuck behind the barricades, but the crowd is already in town and wants a loud late night.',
      options: [
        { id: 'LATE', label: 'Start late and play to the festival crowd', likely: 'Everyone is downtown anyway, so it\'s a late night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 75 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.05 }],
          result: 'Doors opened late, and the festival let out loud and drunk and the room was full.' },
        { id: 'ACCEPT', label: 'Run it as planned and tell people where to park', likely: 'Some give up on the barricades.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'People walked eight blocks with their gear, and half the list made it.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new date.' }
      ] },

    { id: 'LAFAYETTE_LA_CURFEW_PUSH', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [5, 6, 7, 8] },
      telegraph: 'City police are stressing the juvenile curfew again this summer.',
      title: 'The curfew push',
      body: 'Police stopped kids walking home from an all-ages hall show at ten past eleven on a weeknight. The parents are angry, and now they are coming to the next one.',
      options: [
        { id: 'EARLY', label: 'End by ten-thirty and walk the kids to their rides', likely: 'It\'s a shorter night, and the parents relax.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'You were done by ten-thirty, with parents waiting at the curb.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Some of the kids stay home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The younger ones were kept home, and the rest came and left early.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new date.' }
      ] }
  ]
});
