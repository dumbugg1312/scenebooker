SB.Cities.register('augusta-ga', {
  v: 1,
  slug: 'augusta-ga',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['fort gordon', 'fort eisenhower', 'augusta university', 'savannah river site', 'georgia cyber center', 'augusta chronicle', 'metro spirit', 'augusta today',
           'augusta press', 'augusta business daily', 'wacg', 'the masters', 'masters tournament', 'masters week', 'augusta technical college', 'paine college', 'usc aiken',
           'georgia southern', 'arts in the heart', 'westobou', 'mayfest', 'augusta futurity', 'columbia county fair', 'pedal pub', 'richmond county sheriff', 'plant vogtle',
           'waffle house', 'cook out', 'cheerwine', 'greyhound', 'georgia public broadcasting', 'morris communications', 'beasley', 'vfw', 'american legion', 'gamecock', 'bulldog',
           'lamar street social hall', 'hawk\'s gully hall', 'sand hills rec room', 'the eleventh street garage', 'pinch gut pavilion', 'locks and dams room', 'the fellowship annex',
           'savannah bluff skate hall', 'peach orchard carport', 'the cotton lot', 'wheeler road tool and die', 'thirteenth bridge social club',
           'wrdw', 'wrdw news', 'visit augusta', 'visitaugusta', 'greater augusta arts council', 'augusta exchange club fairgrounds', 'exchange club fairgrounds',
           'greek fest', 'augusta greek festival', 'holy trinity greek orthodox', 'jack-o-lantern jubilee', 'foodees fest', 'tanger outlets', 'richmond county juvenile court',
           'augusta jaguars', 'augusta jags', 'hurricane helene', 'georgia department of revenue'],
  /* Banned holds the dossier's real institutions and its invented venue names (unchecked). The golf tournament is written only as 'golf week'. */
  blocklist: ['augusta chronicle*', 'metro spirit*', 'waffle house*', 'cook out*', 'fort gordon*', 'westobou*', 'arts in the heart*', 'pedal pub*'],

  blurb: ['A Savannah River city built around an Army post and one golf week in April. Bars will not take the kids, and the last all-ages room folded for lack of a crowd.',
          'A record store carries the heavy nights now, and teenagers drive an hour to Athens or Columbia.'],
  hard: 'Few all-ages rooms, and the bars gate the kids out.',
  region: 'the Savannah River valley',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 },
    { name: 'Charleston', state: 'SC', lat: 32.78, lon: -79.93 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Augusta' },
    { id: 'north-augusta', kind: 'FEEDER', name: 'North Augusta', state: 'SC', minutes: 15, bearing: 70, scene: 100, note: 'A suburb across the river; kids cross the bridge freely.' },
    { id: 'grovetown', kind: 'FEEDER', name: 'Grovetown', minutes: 20, bearing: 280, note: 'A fast-growing base and commuter suburb with skate-punk teenagers.' },
    { id: 'hephzibah', kind: 'FEEDER', name: 'Hephzibah', minutes: 20, bearing: 200, note: 'A small, cheap, working-class town to the south.' },
    { id: 'harlem', kind: 'FEEDER', name: 'Harlem', minutes: 25, bearing: 285, note: 'A small farm and suburb town on I-20.' },
    { id: 'aiken', kind: 'FEEDER', name: 'Aiken', state: 'SC', minutes: 30, bearing: 125, note: 'Horse country and a small campus; a small scene whose kids come to Augusta.', bands: 1 },
    { id: 'edgefield', kind: 'FEEDER', name: 'Edgefield', state: 'SC', minutes: 35, bearing: 35, note: 'Pottery and peach country; teens drive over.' },
    { id: 'thomson', kind: 'FEEDER', name: 'Thomson', minutes: 40, bearing: 275, note: 'A mill and farm county seat, first big exit toward Atlanta.' },
    { id: 'waynesboro', kind: 'FEEDER', name: 'Waynesboro', minutes: 45, bearing: 175, note: 'A farm county seat; kids make the drive for shows.' },
    { id: 'louisville', kind: 'FEEDER', name: 'Louisville', minutes: 50, bearing: 205, note: 'A very small old farm town.' },
    { id: 'barnwell', kind: 'FEEDER', name: 'Barnwell', state: 'SC', minutes: 55, bearing: 150, note: 'A rural town beside the nuclear site across the river.' },
    { id: 'columbia', kind: 'PEER', name: 'Columbia', state: 'SC', minutes: 75, bearing: 75, slug: 'columbia-sc', note: 'The bigger, more serious scene up I-20; most bands play both in one run.' },
    { id: 'athens', kind: 'PEER', name: 'Athens', minutes: 80, bearing: 305, slug: 'athens-ga', note: 'The famous music town, where Augusta kids go to be where the thing is.' },
    { id: 'savannah', kind: 'PEER', name: 'Savannah', minutes: 140, bearing: 140, slug: 'savannah-ga', note: 'A port and art-school city with a different, coastal feel.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Broad Street', route: 'downtown', note: 'The river-side bar strip, torn up by a long street project; the likeliest place for a room and for it to be shut down.' },
    { id: 'olde-town', name: 'Olde Town', route: 'old-side', note: 'Old houses and porches north of Broad Street, gentrifying but patchy, with some of the best cheap old-house rent.' },
    { id: 'the-hill', name: 'Summerville and the Hill', route: 'campus', note: 'Big old houses near the medical campus on the ridge; student rentals and campus rooms.' },
    { id: 'harrisburg', name: 'Harrisburg and Laney-Walker', route: 'work-side', note: 'Old brick blocks, warehouses and church halls east of downtown; a real neighborhood being redeveloped, not an empty frontier.' },
    { id: 'washington-road', name: 'Washington Road, Evans and Martinez', route: 'campus', note: 'The wealthy, fast-growing suburbs where many band kids live: garages, strip units and church youth rooms.' },
    { id: 'gordon-highway', name: 'Gordon Highway and Grovetown', route: 'work-side', note: 'Motels, pawn shops and flex units on the road to the base; soldiers, cheap rent and a lot of attention from the licensing board.' },
    { id: 'south-augusta', name: 'south Augusta', route: 'work-side', note: 'Cheap, working-class and busy with cars along Deans Bridge Road; garages, carports and skate spots.' },
    { id: 'north-augusta-hood', name: 'North Augusta across the river', route: 'town:north-augusta', note: 'A growing riverfront suburb in another state, with a different sheriff and different alcohol rules.' }
  ],

  rooms: [
    { id: 'south-carport', kind: 'HOUSE', hood: 'south-augusta', cap: 40, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: true, sketch: 25, standing: [65, 60, 50],
      pressure: 45, start: true, note: 'A carport off Deans Bridge Road with a generator and a cooler. The cheap start for a new booker.' },
    { id: 'olde-town-porch', kind: 'HOUSE', hood: 'olde-town', cap: 50, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: true, sketch: 25, standing: [60, 60, 45],
      pressure: 55, note: 'An old frame house with a porch. Cheap rent, and the new downtown housing nearby brings complaints.' },
    { id: 'evans-garage', kind: 'HOUSE', hood: 'washington-road', cap: 60, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [65, 60, 50],
      pressure: 55, note: 'A garage in the suburbs where the band kids live. Parents hold the key and deputies answer fast.' },
    { id: 'record-store', kind: 'SHOP', hood: 'downtown', cap: 200, pa: .5, curfew: 1380, ac: true, sketch: 10, standing: [70, 70, 80], following: .3,
      note: 'A record store whose back wall is the stage. Touring hardcore bills came through, and it all rests on one owner and one crowd.' },
    { id: 'cafe-room', kind: 'CLUB', hood: 'downtown', cap: 200, houseCosts: 120, split: .8, pa: .7, curfew: 1380, ac: true, following: .4, sketch: 20,
      standing: [55, 65, 65], owner: 'TALENT_BUYER', notice: 28, needs: ['FULL_BILL'], note: 'A cafe and bar room with hardcore-leaning bills. Whether it takes kids is whatever the night says.' },
    { id: 'broad-bar', kind: 'BAR', hood: 'downtown', cap: 150, soundFee: 60, pa: .7, ages: ['A21'], curfew: 1500, ac: true, following: .3, sketch: 20, standing: [50, 65, 70],
      pressure: 60, note: 'A stage on the Broad Street strip. The commission can pull a license, and the street is torn up by construction.' },
    { id: 'metal-pub', kind: 'BAR', hood: 'downtown', cap: 120, soundFee: 40, pa: .6, ages: ['ALL'], matinee: true, curfew: 1380, ac: true, following: .3, sketch: 20, standing: [55, 65, 70],
      note: 'A pub with a free old-school metal night. The cheapest bill in town and the only bar that lets the kids in.' },
    { id: 'brick-hall', kind: 'HALL', hood: 'harrisburg', cap: 150, rent: 180, deposit: 75, pa: .5, curfew: 1320, ac: true, sketch: 10, standing: [60, 60, 65],
      owner: 'HALL_MANAGER', note: 'A brick post hall east of downtown. Rented by the night with a deposit and a chaperone.' },
    { id: 'gordon-unit', kind: 'DIY', hood: 'gordon-highway', cap: 120, rent: 60, deposit: 0, pa: .5, curfew: 1320, ac: false, sketch: 45, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'A flex unit on the road to the base. The rent is cheap and the licensing board already watches this road.' },
    { id: 'river-diy', kind: 'DIY', hood: 'north-augusta-hood', cap: 100, rent: 50, deposit: 0, pa: .5, curfew: 1320, ac: false, sketch: 35, standing: [60, 60, 50],
      pressure: 50, needs: ['VOUCH'], note: 'A space across the river. Another state, another sheriff, and kids who cross the bridge freely.' },
    { id: 'successor-room', kind: 'CLUB', hood: 'downtown', cap: 250, houseCosts: 150, split: .8, pa: .8, ages: ['ALL'], curfew: 1380, ac: true, following: .4, sketch: 15,
      standing: [50, 70, 65], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], pressure: 65, note: 'The long-shot all-ages room. The last one folded on thin turnout, and this one dies the same way.' },
    { id: 'skate-spot', kind: 'OUTDOOR', hood: 'south-augusta', cap: 60, rent: 10, pa: .4, curfew: 1200, sketch: 40, standing: [60, 55, 45],
      note: 'A skate spot with cars all around it. July and August heat empties it, and it ends at dusk.' }
  ],

  contacts: ['columbia-sc', 'athens-ga', 'savannah-ga', 'greenville-sc'],

  calendar: [
    { id: 'golf-week', label: 'golf week', tag: 'festival', month: 4, week: 1, dows: [0, 1, 2, 3, 4, 5, 6], can: [.5, .5, .5], hoods: ['downtown', 'washington-road'], elsewhere: [.8, .8, .8] },
    { id: 'arts-fest', label: 'the arts festival', tag: 'festival', month: 9, week: 3, dows: [4, 5, 6], can: [.9, .85, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'pumpkin-fest', label: 'the riverside pumpkin festival', tag: 'festival', month: 10, week: 4, dows: [4, 5], can: [.85, .85, .85], hoods: ['north-augusta-hood'], elsewhere: [.95, .92, .92] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.9, .95, .95] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 5], dows: [5], can: [.9, .95, .95] },
    { id: 'xmas-parade', label: 'the Christmas parade', tag: 'parade', month: 12, weeks: [1, 2], dows: [5], can: [.85, .85, .85], hoods: ['downtown'], elsewhere: [.97, .97, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1440, inForce: true } },

  points: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 500000 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 900000 },
    { name: 'Greenville', state: 'SC', lat: 34.85, lon: -82.4, pop: 70000 },
    { name: 'Charleston', state: 'SC', lat: 32.78, lon: -79.93, pop: 150000 },
    { name: 'Macon', state: 'GA', lat: 32.84, lon: -83.63, pop: 157000 }
  ],
  roads: ['I-20', 'I-520', 'Gordon Highway', 'Deans Bridge Road', 'Washington Road', 'US 25'],

  words: {
    street: ['Broad Street', 'Walton Way', 'Gordon Highway', 'Deans Bridge Road', 'Washington Road', 'Wrightsboro Road', 'Wheeler Road', 'Telfair Street'],
    water: ['the Savannah River', 'the Augusta Canal', 'Butler Creek', 'Lake Thurmond'],
    hood: ['Olde Town', 'Pinch Gut', 'Summerville', 'Harrisburg', 'Laney-Walker', 'Hephzibah', 'Evans', 'Martinez', 'Grovetown'],
    thing: ['carport', 'pecan grove', 'pollen', 'boiled peanuts', 'hash and rice', 'red clay', 'mill village', 'pimento cheese', 'record store', 'wristband', 'all-ages room'],
    weather: ['pollen week', 'afternoon thunderstorm', 'tropical storm remnant']
  },

  events: [
    { id: 'AUGUSTA_GA_GOLF_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 6], calendar: 'festival', months: [4] },
      telegraph: 'Golf week is here and every cheap room and parking space in town has a price on it.',
      title: 'Golf week',
      body: 'Every hotel room is sold and half the local musicians are working the tournament or out of town. You booked a bill for the people who left.',
      options: [
        { id: 'SHORT', label: 'Run a short bill of whoever is left', likely: 'A thin night, but the ones who stayed are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Two bands and a long, loose night for the ones who stayed in town.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'Everyone you know is working.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }],
          result: 'The room was mostly bands and their friends.' } ] },

    { id: 'AUGUSTA_GA_CURFEW_SWEEP', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The sheriff is talking about a curfew sweep this weekend.',
      title: 'The curfew sweep',
      body: 'Deputies are picking up minors after midnight and a parent has to come get them. The ride home for the kids on your bill just became your problem.',
      options: [
        { id: 'EARLY', label: 'End the show before the curfew', likely: 'Most of them get home in time. A short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors early, done before the cutoff. The kids went home on time.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get home.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads drove the kids home in a convoy. Their parents noticed.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Parents get nervous.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Half the list stayed home rather than risk a call from the deputies.' } ] },

    { id: 'AUGUSTA_GA_STORM_REMNANT', when: 'WEEK', tier: 'HARD', weight: 1, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 3], months: [8, 9, 10] },
      telegraph: 'The remnants of a tropical storm are heading up the river valley.',
      title: 'The storm remnant',
      body: 'The power is out for days. A garage show would run on a generator and an extension cord.',
      options: [
        { id: 'GENERATOR', label: 'Run it on the generator', likely: 'Loud, dark and short on sound.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The generator coughed through the set and the room was lit by phones.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' } ] } ]
});
