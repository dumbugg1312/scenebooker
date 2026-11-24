SB.Cities.register('kalamazoo-mi', {
  v: 1,
  slug: 'kalamazoo-mi',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['western michigan university', 'western michigan', 'wmu', 'broncos', 'kalamazoo college', 'k college', 'kvcc', 'kalamazoo valley', 'davenport university',
           'michigan state', 'msu', 'notre dame', 'hope college', 'pfizer', 'stryker', 'perrigo', 'kellogg', 'kellogg\'s', 'kalamazoo gazette', 'mlive', 'amtrak', 'greyhound',
           'indian trails', 'kalamazoo metro', 'new year\'s fest', 'art hop', 'kalamazoo beer week', 'bell\'s', 'bell\'s brewery', 'eccentric day', 'kalamazoo marathon',
           'medieval congress', 'international congress on medieval studies', 'waldo stadium', 'lawson arena', 'faygo', 'vernors', 'fort custer', 'pokagon', 'wolverine corridor',
           'the paper annex', 'paper annex', 'stove works hall', 'celery row', 'the gull road basement', 'red arrow lounge', 'checker cab garage', 'the mill race room',
           'oakland drive rec', 'sunset lake pavilion hall', 'the promise room', 'burdick street loft', 'third shift social hall',
           'wmuk', 'impact 89fm', 'wkzo', 'wkfr', 'discover kalamazoo', 'kalamazoo public safety', 'michigan liquor control commission', 'mlcc', 'zeigler kalamazoo marathon',
           'jumpstart weekend', 'kalamazoo institute of arts', 'canadiana fest', 'kalamazoo pride', 'outfront kalamazoo', 'caribbean festival', 'kalamazoo valley blues festival',
           'gilmore piano festival', 'radfest', 'state theatre', 'vine neighborhood association', 'arcadia creek festival place', 'michigan metal fest', 'second wave',
           'second wave media', 'local spins', 'craft beverage week', 'oberon day'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The universities, the plants, the festivals and the paper are written only in generic form. */
  blocklist: ['kalamazoo gazette*', 'art hop*', 'new year\'s fest*', 'pfizer*', 'stryker*'],

  blurb: ['A paper-mill and pharmaceutical town on I-94, halfway between Detroit and Chicago, with a pedestrian mall downtown and a big state university on the hill.',
          'Students pour in every fall and leave every spring, so bands and rooms turn over every few years.'],
  hard: 'Bands and rooms turn over every few years as graduates leave for Chicago or Grand Rapids.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Grand Rapids', state: 'MI', lat: 42.96, lon: -85.67 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Kalamazoo' },
    { id: 'portage', kind: 'FEEDER', name: 'Portage', minutes: 10, bearing: 180, pop: 48900, note: 'The adjacent suburb: the kids who drive in are the suburban base of the scene.' },
    { id: 'galesburg', kind: 'FEEDER', name: 'Galesburg and Augusta', minutes: 20, bearing: 100, note: 'Small mill and farm towns east on M-96; no scene of their own.' },
    { id: 'vicksburg', kind: 'FEEDER', name: 'Vicksburg', minutes: 20, bearing: 185, note: 'A village on a small lake south on US-131; bored small-town kids.' },
    { id: 'battle-creek', kind: 'FEEDER', name: 'Battle Creek', minutes: 25, bearing: 80, pop: 52700, bands: 2, note: 'The smaller, sleepier sibling east on I-94; crowds trade both ways.' },
    { id: 'plainwell', kind: 'FEEDER', name: 'Plainwell and Otsego', minutes: 25, bearing: 340, note: 'Paper-mill river towns north on US-131 with the odd garage band.' },
    { id: 'paw-paw', kind: 'FEEDER', name: 'Paw Paw', minutes: 25, bearing: 260, note: 'Wine and grape country west on I-94; a few kids.' },
    { id: 'allegan', kind: 'FEEDER', name: 'Allegan', minutes: 35, bearing: 320, note: 'A farm and factory county seat to the northwest.' },
    { id: 'marshall', kind: 'FEEDER', name: 'Marshall', minutes: 40, bearing: 95, note: 'A historic-downtown town whose people mostly commute east.' },
    { id: 'three-rivers', kind: 'FEEDER', name: 'Three Rivers', minutes: 40, bearing: 195, note: 'Farm and factory kids who come up for shows.' },
    { id: 'hastings', kind: 'FEEDER', name: 'Hastings', minutes: 45, bearing: 25, note: 'A rural county seat on the Thornapple; rural kids.' },
    { id: 'sturgis', kind: 'FEEDER', name: 'Sturgis', minutes: 50, bearing: 190, note: 'A factory town near the Indiana line with a band or two.' },
    { id: 'south-haven', kind: 'FEEDER', name: 'South Haven', minutes: 50, bearing: 280, note: 'A Lake Michigan resort town, dead in winter and packed in summer; kids drive east.', season: { months: [6, 7, 8], mul: 1.4 } },
    { id: 'south-bend', kind: 'PEER', name: 'South Bend', state: 'IN', minutes: 80, bearing: 225, slug: 'south-bend-in', note: 'Michiana: a bigger college and arts scene whose bands cross the line.' },
    { id: 'lansing', kind: 'PEER', name: 'Lansing', minutes: 85, bearing: 55, slug: 'lansing-mi', note: 'A friendly-rival college-and-capital scene to the northeast.' },
    { id: 'ann-arbor', kind: 'PEER', name: 'Ann Arbor', minutes: 105, bearing: 85, slug: 'ann-arbor-mi', note: 'The next college town east on I-94, on the road to Detroit.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Mall', route: 'downtown', note: 'Old brick blocks around a pedestrian mall: licensed club rooms, bars, a rail hub, and steady redevelopment.' },
    { id: 'vine', name: 'Vine', route: 'old-side', note: 'Old houses chopped into student and artist rentals: basements and porches, heating up fast.' },
    { id: 'oakland-winchell', name: 'Oakland-Winchell and the hill', route: 'campus', note: 'Dense student rentals around the university: house shows in the school year and the heaviest police attention in town.' },
    { id: 'edison', name: 'Edison and the south side', route: 'work-side', note: 'Working-class streets with light industry: garage, shop and basement shows, and warehouse practice rooms.' },
    { id: 'eastside', name: 'the Eastside', route: 'work-side', note: 'Cheap and ignored, with shuttered factory buildings and backyards.' },
    { id: 'northside', name: 'the Northside', route: 'old-side', note: 'A historically Black neighborhood of church halls and community buildings, with reinvestment arriving unevenly; not a place to treat as a cheap punk district.' },
    { id: 'milwood', name: 'Milwood', route: 'old-side', note: 'Quiet family streets of small houses and garages south of downtown. Porch lights go on early.' },
    { id: 'westnedge-strip', name: 'Westnedge and the Portage Road strip', route: 'campus', note: 'Commercial strips, apartments and rentable halls on the suburban edge; kids come from here, shows rarely happen here.' }
  ],

  rooms: [
    { id: 'vine-house', kind: 'HOUSE', hood: 'vine', cap: 60, curfew: 1320, ac: false, outdoor: false, pressure: 50, start: true,
      note: 'A drafty old basement in Vine. The address goes out by word of mouth, the host tells the neighbors ahead, and the bill is three locals and one touring band.' },
    { id: 'vine-house-two', kind: 'HOUSE', hood: 'vine', cap: 40, curfew: 1380, ac: false, outdoor: false, pressure: 55,
      note: 'A second house in Vine run by one booker. Packed every time, and one housemate moving out would end it.' },
    { id: 'hill-basement', kind: 'HOUSE', hood: 'oakland-winchell', cap: 50, curfew: 1410, ac: false, outdoor: false, pressure: 60,
      note: 'A student-rental basement on the hill. Good in the school year, dead in the summer, and the lease may not renew.' },
    { id: 'milwood-garage', kind: 'DIY', hood: 'milwood', cap: 100, curfew: 1350, ac: false, pressure: 45,
      note: 'A three-car garage at a family home. Posted rules, a volunteer on the door, the big door shut for the neighbors, and an oven by August.' },
    { id: 'mall-hall', kind: 'DIY', hood: 'downtown', cap: 120, curfew: 1350, ac: true, pressure: 45,
      note: 'A storefront hall at the north end of the Mall for punk and performance art. The crowd runs older, and the rent depends on grants.' },
    { id: 'edison-bar', kind: 'BAR', hood: 'edison', cap: 120, curfew: 1500, ac: true,
      note: 'A rough little dive bar on the south side. Metal, punk and weird nights, small covers, and an owner who does not want to be the metal place.' },
    { id: 'beer-garden', kind: 'BAR', hood: 'downtown', cap: 250, ages: ['A18'], curfew: 1410, ac: true,
      note: 'A brewery cafe and beer garden that runs eighteen-plus standing-room nights. Package bills fit here.' },
    { id: 'north-hall', kind: 'HALL', hood: 'northside', cap: 150, curfew: 1320, ac: true, owner: 'CHURCH_CONTACT',
      note: 'A rentable church hall that is the all-ages fallback when a house burns. Ask first, pay the fee, and be gone by ten.' },
    { id: 'strip-shop', kind: 'SHOP', hood: 'westnedge-strip', cap: 50, ac: true,
      note: 'A shop on the strip with a small PA. Afternoon sets, over by seven.' },
    { id: 'vine-lawn', kind: 'OUTDOOR', hood: 'vine', cap: 60, curfew: 1260, outdoor: true,
      note: 'A co-op lawn in Vine. May through September, and out by nine.' },
    { id: 'downtown-club', kind: 'CLUB', hood: 'downtown', cap: 300, curfew: 1530, ac: true,
      note: 'A licensed downtown club, mostly cover bands and DJs with the odd original bill. Rooms like it have closed.' }
  ],

  contacts: ['south-bend-in', 'lansing-mi', 'ann-arbor-mi', 'grand-rapids', 'chicago'],

  calendar: [
    { id: 'summer-fests', label: 'the summer arts and Pride weekend', tag: 'festival', month: 6, week: 1, dows: [4, 5, 6], can: [.90, .85, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'blues-fest', label: 'the blues festival', tag: 'festival', month: 7, week: 2, dows: [4, 5], can: [.93, .90, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'marathon', label: 'marathon weekend', tag: 'race', month: 4, week: 4, dows: [5, 6], can: [.92, .90, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.85, .95, .95], hoods: ['oakland-winchell'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.85, .95, .95], hoods: ['oakland-winchell'], elsewhere: [1, 1, 1] },
    { id: 'move-out', label: 'graduation and move-out', tag: 'graduation', month: 5, weeks: [1, 2], dows: [4, 5, 6], can: [.80, .85, .85], hoods: ['vine', 'oakland-winchell'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] },
    { id: 'new-year', label: "New Year's Eve", tag: 'holiday', month: 12, week: 5, dows: [0, 1, 2, 3, 4, 5, 6], can: [.85, .90, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] }
  ],

  rules: { curfewMinors: { weeknight: 1440, weekend: 1440, inForce: false } },

  points: [
    { name: 'Grand Rapids', state: 'MI', lat: 42.96, lon: -85.67, pop: 1160000 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 2700000 },
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05, pop: 4300000 },
    { name: 'Holland', state: 'MI', lat: 42.79, lon: -86.11, pop: 34000 }
  ],
  roads: ['I-94', 'US 131', 'M-43', 'M-96', 'Gull Road', 'Red Arrow Highway'],

  words: {
    street: ['Westnedge Avenue', 'Michigan Avenue', 'Portage Street', 'Gull Road', 'Stadium Drive', 'Oakland Drive', 'Burdick Street', 'Red Arrow Highway'],
    water: ['the Kalamazoo River', 'Sunset Lake', 'Lake Michigan', 'Axtell Creek'],
    hood: ['Vine', 'Edison', 'Oakland-Winchell', 'Stuart', 'Westnedge Hill', 'Oshtemo', 'Eastside', 'Northside', 'the Mall'],
    thing: ['coney', 'celery', 'paper mill', 'basement', 'lake-effect', 'pop', 'trolley', 'Michigan left', 'last call', 'move-out week'],
    weather: ['lake effect', 'gray winter', 'spring thaw', 'tornado watch']
  },

  events: [
    { id: 'KALAMAZOO_MI_GARAGE_HEAT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [6, 7, 8, 9] },
      telegraph: 'The forecast says ninety and wet all week, and the garage has one door.',
      title: 'The garage is an oven',
      body: 'The big door has to stay shut for the two close neighbors, the air does not move, and the crowd is already spilling into the street just as one of them steps onto the porch.',
      options: [
        { id: 'DOOR', label: 'Open the door and take the complaint', likely: 'Cooler and louder, with the porch watching.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .95 }, { op: 'STRESS', d: 1 }],
          result: 'The door went up and the street filled, and the neighbor made one call, which was polite.' },
        { id: 'SHORT', label: 'Short sets and breaks outside', likely: 'A choppy night, but nobody faints.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Every band played twenty minutes and then everybody spent ten out in the yard, and it was slow and sweaty and friendly.' },
        { id: 'ACCEPT', label: 'Shut it and sweat', likely: 'Half the room goes home early.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The room emptied by the second band, and the people who stayed were soaked.' }
      ] },

    { id: 'KALAMAZOO_MI_MALL_FESTIVAL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The Mall is roped off for the weekend, and the strollers are already out.',
      title: 'The Mall is full of strollers',
      body: 'A festival has the pedestrian mall packed just as the hall wants to load in a loud band, and there is nowhere to park because the street is a crowd.',
      options: [
        { id: 'LATE', label: 'Start late, after the crowds thin out', likely: 'The night crowd comes, later than planned.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 75 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors were at nine, and the festival crowd drifted in and some of them stayed.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Gear carried through a crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'Amps went through the crowd on a hand truck, and the room was thin but the night was fine.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new date.' }
      ] },

    { id: 'KALAMAZOO_MI_HOMECOMING', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'It is homecoming weekend, and the hill is wall to wall with police and drunks.',
      title: 'Homecoming on the hill',
      body: 'Police are parked on every corner of the hill, and a bar crowd is wandering the blocks looking for any open door. A house show near campus is going to get a visit one way or the other.',
      options: [
        { id: 'EARLY', label: 'Start early and be done by ten', likely: 'Most of the real crowd makes it.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors early and the last chord by ten, and the only visitor was a cop who waved.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'A drunk crowd and a patrol car.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.1 }, { op: 'STRESS', d: 1 }],
          result: 'Strangers poured in from the street, and the room was packed and the host was nervous.' },
        { id: 'MOVE', label: 'Move it off the hill to a hall', likely: 'Safer, smaller, and someone owes a favor.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .8 }],
          result: 'A church hall took the bill, and it was quiet outside and loud inside.' }
      ] },

    { id: 'KALAMAZOO_MI_SNOW_RUN', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [11, 12, 1, 2, 3] },
      telegraph: 'A snow band is sitting on the highway between Chicago and Kalamazoo.',
      title: 'The tour van is stuck in the snow',
      body: 'The touring band is crawling in two hours late, and the house has to decide whether to run past its quiet line.',
      options: [
        { id: 'WAIT', label: 'Hold the doors and wait for them', likely: 'A late start, and the crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 120 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The van pulled in at ten-thirty, and the neighbors got an apology in the morning.' },
        { id: 'LOCALS', label: 'Start with the locals and fit the headliner in last', likely: 'A shorter set, and a happy room.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'The locals stretched their sets and the headliner played twenty minutes to a full basement.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could make it came.' }
      ] }
  ]
});
