SB.Cities.register('orlando', {
  v: 1,
  slug: 'orlando',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of central florida', 'ucf', 'rollins college', 'valencia college', 'full sail university', 'orlando magic', 'orlando city', 'orlando pride',
           'solar bears', 'orlando sentinel', 'orlando weekly', 'orlando business journal', 'wesh', 'wftv', 'wkmg', 'spectrum news 13', 'wmfe',
           'central florida public media', 'walt disney world', 'disney', 'universal orlando', 'seaworld', 'legoland', 'epic universe',
           'orange county convention center', 'orange county sheriff', 'orlando police', 'orlando international airport', 'mco', 'kennedy space center', 'nasa',
           'daytona 500', 'gatorland', 'orlando health', 'advent health', 'adventhealth', 'publix', 'darden', 'lockheed martin', 'hurricane charley',
           'hurricane ian', 'hurricane milton', 'hurricane irma', 'hurricane ivan', 'camping world stadium', 'kia center', 'dr. phillips center', 'gay days',
           'waffle house', 'amtrak', 'sunrail',
           'fya fest', 'fya', 'florida underground fest', 'come out with pride', 'cheez-it citrus bowl', 'citrus bowl', 'pop-tarts bowl', 'florida classic',
           'orlando fringe', 'orlando amphitheater', 'megacon', 'spooky empire', 'electric daisy carnival', 'tinker field', 'central florida fair',
           'silver spurs rodeo', 'halloween horror nights', 'howl-o-scream', 'florida film festival', 'orlando film festival', 'sanford porchfest',
           'hannibal square', 'loch haven', 'zombietoberfest', 'orlando museum of art', 'enzian', 'cfpublic', 'punk in the park', 'boardwalk bowl', 'citywalk'],
  blocklist: ['orlando weekly*', 'orlando sentinel*', 'full sail university*', 'gay days*', 'gatorland*', 'epic universe*'],

  blurb: ['A theme-park town where the kids work late and still fill a hardcore pit.',
          'DIY keeps getting priced out of downtown and pops up again in a strip mall or a back yard.'],
  hard: 'Downtown rent pushes rooms into strip malls and houses, and I-4 eats the night.',
  region: 'Central Florida',
  houseType: 'LIVING_ROOM',
  whereGo: [
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46 },
    { name: 'Miami', state: 'FL', lat: 25.76, lon: -80.19 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'A young hardcore generation with packed rooms.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Orlando' },
    { id: 'kissimmee', kind: 'FEEDER', name: 'Kissimmee', minutes: 25, bearing: 190, beyond: 'i4-crawl', note: 'The tourist south. Workers and kids drive up.' },
    { id: 'sanford', kind: 'FEEDER', name: 'Sanford', minutes: 30, bearing: 25, beyond: 'i4-crawl', note: 'A lake town with a few bands.' },
    { id: 'clermont', kind: 'FEEDER', name: 'Clermont', minutes: 35, bearing: 295, beyond: 'i4-crawl', note: 'Hills and suburbs.' },
    { id: 'deltona', kind: 'FEEDER', name: 'Deltona', minutes: 40, bearing: 30, note: 'A commuter suburb.' },
    { id: 'winter-haven', kind: 'FEEDER', name: 'Winter Haven and Lakeland', minutes: 50, bearing: 235, note: 'A middle-sized scene. Kids come up for bigger shows.' },
    { id: 'cocoa', kind: 'FEEDER', name: 'Cocoa', minutes: 55, bearing: 100, note: 'Space Coast kids and bands drive in.' },
    { id: 'daytona', kind: 'FEEDER', name: 'Daytona Beach', minutes: 60, bearing: 40, note: 'A beach town with a bike-week crowd.' },
    { id: 'melbourne', kind: 'PEER', name: 'Melbourne', minutes: 70, bearing: 105, slug: 'palm-bay-fl', note: 'Smaller, down the coast.' },
    { id: 'gainesville', kind: 'PEER', name: 'Gainesville', minutes: 110, bearing: 340, slug: 'gainesville-fl', note: 'A long-running scene with many bands passing through.' }
  ],
  chokepoints: [
    { id: 'i4-crawl', name: 'the I-4 corridor', p: .03 }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Thornton Park', route: 'downtown', note: 'Bars, clubs and rising costs. DIY has been priced out.' },
    { id: 'mills-50', name: 'Mills 50 and Ivanhoe Village', route: 'old-side', note: 'Vietnamese restaurants, old shops and art spaces. One of the more music-friendly pockets.' },
    { id: 'colonial', name: 'the Colonial Drive corridor', route: 'work-side', note: 'Strip malls and old storefronts. A newer room here is a haven for young, feral metal and punk.' },
    { id: 'winter-park', name: 'Winter Park', route: 'campus', note: 'A wealthy college town. Not a punk area, just a few coffeehouses.' },
    { id: 'casselberry', name: 'Casselberry and Sanford', route: 'work-side', note: 'North suburbs. A DIY room here gathered young bands before it burned out.' },
    { id: 'east-orlando', name: 'East Orlando and Alafaya', route: 'campus', note: 'Student apartments and strip malls. A newer DIY space is out east.' },
    { id: 'college-park', name: 'College Park', route: 'old-side', note: 'Old houses near downtown. Backyard shows happen here and the neighbors call.' },
    { id: 'pine-hills', name: 'Pine Hills and Orlo Vista', route: 'work-side', note: 'Cheap rentals on the working-class west side.' },
    { id: 'international-drive', name: 'Kissimmee and International Drive', route: 'work-side', note: 'Hotels and the tourist strip. Workers live in motels and apartments.' },
    { id: 'milk-district', name: 'the Milk District', route: 'old-side', note: 'Old warehouses, salons and bars on the east edge of downtown. Cheap lots with a yard out back and a neighbor who has seen it all.' }
  ],

  rooms: [
    { id: 'park-backyard', kind: 'HOUSE', hood: 'college-park', cap: 40, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [70, 60, 45],
      pressure: 55, start: true, note: 'A backyard and a living room on a slab, with a pit against the walls. The neighbors call it in, early.' },
    { id: 'hills-carport', kind: 'HOUSE', hood: 'pine-hills', cap: 30, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 45, note: 'A carport in a five-person rental. The landlord has a lease clause and the afternoon storm soaks the yard.' },
    { id: 'strip-mall-room', kind: 'DIY', hood: 'colonial', cap: 250, rent: 90, deposit: 0, pa: .6, curfew: 1380, ac: true, sketch: 45, standing: [60, 60, 50],
      pressure: 60, needs: ['VOUCH'], note: 'A big strip-mall unit and a nonprofit all-ages room. It has been pushed out of two lots in a row, and the crowd keeps outgrowing the doors.' },
    { id: 'warehouse-box', kind: 'DIY', hood: 'college-park', cap: 100, rent: 40, deposit: 0, pa: .5, curfew: 1320, ac: false, sketch: 45, standing: [60, 60, 45],
      pressure: 55, needs: ['VOUCH'], note: 'A concrete show box at the end of a warehouse street. Free, BYOB and over by ten because of the noise.' },
    { id: 'storefront-shop', kind: 'SHOP', hood: 'mills-50', cap: 80, pa: .4, curfew: 1320, ac: true, sketch: 10, standing: [65, 65, 70], following: .2,
      note: 'An all-ages hardcore bill in a video and coffee storefront. Fifteen at the door, and the rent is the risk.' },
    { id: 'salon-yard', kind: 'OUTDOOR', hood: 'milk-district', cap: 120, rent: 20, pa: .4, curfew: 1290, sketch: 40, standing: [60, 55, 40],
      note: 'An outdoor hardcore show behind a hair salon, booked by a local promoter. One storm or one complaint ends it.' },
    { id: 'east-lot', kind: 'OUTDOOR', hood: 'east-orlando', cap: 100, rent: 15, pa: .4, curfew: 1320, sketch: 45, standing: [55, 55, 40],
      pressure: 55, note: 'A parking lot behind a DIY space where metal shows set up. A lot is only as safe as its owner\'s mood.' },
    { id: 'pub-back-room', kind: 'BAR', hood: 'mills-50', cap: 150, soundFee: 50, pa: .7, ages: ['A21', 'ALL'], matinee: true, curfew: 1500, ac: true, following: .4, sketch: 20,
      standing: [55, 65, 75], note: 'A pub with a back-room stage and a pit in the middle. Mostly 21 and over, with the odd all-ages benefit and a Sunday brunch bill.' },
    { id: 'punk-bar', kind: 'BAR', hood: 'mills-50', cap: 200, soundFee: 60, pa: .8, ages: ['A21'], curfew: 1560, ac: true, following: .4, sketch: 15,
      standing: [50, 65, 75], pressure: 50, note: 'A punk bar known for its pit. It is a bar, so the kids cannot get in.' },
    { id: 'downtown-club', kind: 'CLUB', hood: 'downtown', cap: 300, houseCosts: 200, split: .8, pa: .9, ages: ['A18', 'A21'], curfew: 1500, ac: true, following: .5, sketch: 15,
      standing: [45, 65, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A rock, punk and metal club on the downtown strip, sometimes all-ages. Rising rents are what end clubs here.' },
    { id: 'suburb-hall', kind: 'HALL', hood: 'casselberry', cap: 120, rent: 120, deposit: 75, pa: .5, curfew: 1320, ac: true, sketch: 10, standing: [55, 60, 60],
      owner: 'HALL_MANAGER', pressure: 50, note: 'A rented hall or church lot in the north suburbs. One fire marshal ends it.' },
    { id: 'warehouse-hall', kind: 'BIG', hood: 'east-orlando', cap: 1500, rent: 2000, deposit: 500, pa: .95, ages: ['ALL'], curfew: 1380, ac: true, sketch: 5, standing: [40, 60, 60],
      owner: 'TALENT_BUYER', notice: 90, needs: ['FULL_BILL'], note: 'A warehouse event space with a yearly hardcore weekend. The room a local band dreams of, not a first booking.' }
  ],

  contacts: ['gainesville-fl', 'tampa', 'palm-bay-fl', 'daytona-beach-fl', 'lakeland-fl'],

  calendar: [
    { id: 'bowl-games', label: 'the winter bowl games', tag: 'game', month: 12, weeks: [4, 5], dows: [4, 5], can: [.85, .80, .80], hoods: ['downtown'], elsewhere: [.97, .95, .95] },
    { id: 'porch-festival', label: 'the porch festival', tag: 'festival', month: 2, week: 4, dows: [5], can: [.85, .85, .85], hoods: ['casselberry'], elsewhere: [1, .97, .97] },
    { id: 'film-weeks', label: 'the film and fringe weeks', tag: 'festival', month: 4, weeks: [2, 3], dows: [3, 4, 5, 6], can: [.90, .88, .88], hoods: ['winter-park', 'downtown'], elsewhere: [1, .97, .97] },
    { id: 'mills-parade', label: 'the Mills 50 parade', tag: 'parade', month: 2, week: 3, dows: [6], can: [.90, .88, .88], hoods: ['mills-50'], elsewhere: [1, 1, 1] },
    { id: 'pride-week', label: 'the downtown pride week', tag: 'festival', month: 10, weeks: [2, 3], dows: [4, 5, 6], can: [.90, .85, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'scare-season', label: 'the theme-park scare season', tag: 'holiday', month: 10, weeks: [1, 4], dows: [3, 4, 5, 6], can: [.90, .88, .88], hoods: ['international-drive'], elsewhere: [.97, .95, .95] },
    { id: 'football-fall', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46, pop: 400000 },
    { name: 'Miami', state: 'FL', lat: 25.76, lon: -80.19, pop: 450000 },
    { name: 'Tallahassee', state: 'FL', lat: 30.44, lon: -84.28, pop: 200000 },
    { name: 'Jacksonville', state: 'FL', lat: 30.33, lon: -81.66, pop: 950000 }
  ],
  roads: ['I-4', 'the Turnpike', 'SR 408', 'SR 417', 'I-95', 'Colonial Drive'],

  words: {
    street: ['Colonial Drive', 'Orange Avenue', 'Semoran Boulevard', 'Orange Blossom Trail', 'International Drive', 'Mills Avenue'],
    water: ['Lake Eola', 'Lake Ivanhoe', 'Lake Underhill'],
    hood: ['Thornton Park', 'Mills 50', 'Ivanhoe Village', 'College Park', 'Pine Hills', 'Winter Park'],
    thing: ['tourist', 'strip mall', 'toll road', 'thunderstorm', 'name tag'],
    weather: ['afternoon thunderstorm', 'storm watch']
  },

  events: [
    { id: 'ORLANDO_I4_BACKUP', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Crews are working on the interstate through the middle of town this week.',
      title: 'The interstate is a parking lot',
      body: 'A wreck on I-4 has the whole corridor backed up the night of your show, and the bands and the kids from the suburbs are stuck.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it, but the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'You moved doors up an hour, and the people who really wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to use the interstate.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The backup never cleared, so the people outside the city stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'It takes two hours of your day, but most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads took the toll roads together.' }
      ] },

    { id: 'ORLANDO_BOWL_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game', months: [12, 1] },
      telegraph: 'Out-of-town fans are filling the hotels, and downtown has a game on every screen.',
      title: 'Bowl weekend downtown',
      body: 'Visiting fans have taken every parking space downtown, and the bar show is going to run thin and angry unless you do something.',
      options: [
        { id: 'LATE', label: 'Push doors back until the game crowd thins out', likely: 'A late start, but the regulars find a way in.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors opened an hour late, and the streets cleared and the room filled up.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Nobody can park, and half the list gives up.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The lots were full by noon, and the room was thin and sour.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new date.' }
      ] },

    { id: 'ORLANDO_SCARE_SHIFT', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [9, 10] },
      telegraph: 'The park hires hundreds of extra scare actors for the season, and half your friends are on the schedule.',
      title: 'Half the band is on shift',
      body: 'The theme-park scare season has the drummer and the singer on the night shift, and they cannot be out before ten.',
      options: [
        { id: 'LATE', label: 'Start late and wait for them', likely: 'A late night, but the whole band plays.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'They came straight from work in half their makeup, and the set was loose and loud.' },
        { id: 'SHORT', label: 'Cut the set short and play on', likely: 'A thin night, but the ones who came are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'A short set with a fill-in drummer, and the people who came did not mind.' }
      ] }
  ]
});
