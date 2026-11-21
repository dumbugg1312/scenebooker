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
           'waffle house', 'amtrak', 'sunrail'],
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
    { id: 'international-drive', name: 'Kissimmee and International Drive', route: 'work-side', note: 'Hotels and the tourist strip. Workers live in motels and apartments.' }
  ],

  contacts: ['gainesville-fl', 'tampa', 'palm-bay-fl'],
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
      body: 'A wreck on I-4 has the whole corridor backed up the night of your show. The bands and the kids from the suburbs are stuck.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to use the interstate.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The backup never cleared. The ones outside the city stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads took the toll roads together. They will remember that.' }
      ] }
  ]
});
