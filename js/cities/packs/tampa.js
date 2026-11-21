SB.Cities.register('tampa', {
  v: 1,
  slug: 'tampa',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of south florida', 'usf', 'university of tampa', 'hillsborough community college', 'hccc', 'st. petersburg college', 'eckerd college',
           'tampa bay buccaneers', 'buccaneers', 'bucs', 'tampa bay lightning', 'tampa bay rays', 'tampa bay rowdies', 'rowdies', 'tampa bay times',
           'tampa bay business journal', 'creative loafing', 'wusf', 'wmnf', 'wfla', 'wtsp', 'wfts', 'fox 13', 'gasparilla', 'super bowl', 'florida state fair',
           'macdill air force base', 'macdill', 'central command', 'centcom', 'socom', 'port tampa bay', 'tampa international airport', 'busch gardens',
           'tampa general', 'bayfront health', 'raymond james', 'tropicana field', 'amalie arena', 'hurricane helene', 'hurricane milton', 'hurricane ian',
           'hurricane irma', 'hurricane idalia', 'hillsborough county sheriff', 'tampa police', 'publix', 'amtrak', 'waffle house'],
  blocklist: ['creative loafing*', 'tampa bay times*', 'gasparilla*', 'busch gardens*', 'macdill*', 'tropicana field*'],

  blurb: ['Two cities across a bay and all-ages shows in skateparks, tattoo shops and courtyards.',
          'Punk, hardcore and metal share bills, and volunteers run the sound and the door.'],
  hard: 'Rooms vanish, and the bridges split the crowd between Tampa and St. Pete.',
  region: 'the Gulf Coast',
  whereGo: [
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38 },
    { name: 'Miami', state: 'FL', lat: 25.76, lon: -80.19 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'Hardcore matinees at the skatepark keep the pit full.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Tampa' },
    { id: 'brandon', kind: 'FEEDER', name: 'Brandon', minutes: 25, bearing: 100, note: 'A large suburb to the east. Kids drive in.' },
    { id: 'clearwater', kind: 'FEEDER', name: 'Clearwater', minutes: 30, bearing: 295, beyond: 'bay-bridges', note: 'Beaches and bands across the bay.' },
    { id: 'largo', kind: 'FEEDER', name: 'Largo and Pinellas Park', minutes: 30, bearing: 255, beyond: 'bay-bridges', note: 'Pinellas suburbs with their own rooms.' },
    { id: 'plant-city', kind: 'FEEDER', name: 'Plant City', minutes: 35, bearing: 70, note: 'Rural east.' },
    { id: 'lakeland', kind: 'FEEDER', name: 'Lakeland', minutes: 50, bearing: 55, note: 'A middle-sized scene.' },
    { id: 'bradenton', kind: 'FEEDER', name: 'Bradenton', minutes: 50, bearing: 195, note: 'South across the bay bridge.' },
    { id: 'spring-hill', kind: 'FEEDER', name: 'Spring Hill and Brooksville', minutes: 55, bearing: 5, note: 'North suburbs. Kids with cars.' },
    { id: 'sarasota', kind: 'PEER', name: 'Sarasota', minutes: 60, bearing: 195, slug: 'sarasota-fl', note: 'A smaller scene down the coast.' },
    { id: 'orlando', kind: 'PEER', name: 'Orlando', minutes: 90, bearing: 55, slug: 'orlando', note: 'Bigger, and bands trade dates.' },
    { id: 'gainesville', kind: 'PEER', name: 'Gainesville', minutes: 150, bearing: 5, slug: 'gainesville-fl', note: 'A long-running scene up I-75.' }
  ],
  chokepoints: [
    { id: 'bay-bridges', name: 'the bay bridges', p: .03 }
  ],

  hoods: [
    { id: 'ybor', name: 'Ybor City', route: 'downtown', note: 'Brick streets, old cigar factories and nightclubs. A courtyard behind a restaurant has hosted all-ages shows.' },
    { id: 'seminole-heights', name: 'Seminole Heights', route: 'old-side', note: 'Bungalows and cheap bars. House-show territory.' },
    { id: 'sulphur-springs', name: 'Sulphur Springs', route: 'work-side', note: 'Working-class north Tampa. A metal and hardcore room opened and closed within two years.' },
    { id: 'west-tampa', name: 'West Tampa', route: 'old-side', note: 'The old Cuban neighborhood and its small shops.' },
    { id: 'downtown', name: 'downtown and Channelside', route: 'downtown', note: 'Towers, port and condos. Nothing for shows.' },
    { id: 'university-area', name: 'the university area and Temple Terrace', route: 'campus', note: 'Students, strip malls and apartment complexes.' },
    { id: 'central-ave', name: 'Central Avenue in St. Pete', route: 'downtown', note: 'Bars and galleries. A hall here hosted benefit shows.' },
    { id: 'dome-industrial', name: 'the industrial park in St. Pete', route: 'work-side', note: 'Warehouse units, one with a multi-purpose room for shows.' },
    { id: 'pinellas-suburbs', name: 'Gulfport, Pinellas Park and Largo', route: 'work-side', note: 'Cheap suburbs with house shows and strip malls.' }
  ],

  contacts: ['sarasota-fl', 'orlando', 'gainesville-fl', 'lakeland-fl'],
  points: [
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38, pop: 307000 },
    { name: 'Miami', state: 'FL', lat: 25.76, lon: -80.19, pop: 450000 },
    { name: 'Fort Myers', state: 'FL', lat: 26.64, lon: -81.87, pop: 95000 },
    { name: 'Tallahassee', state: 'FL', lat: 30.44, lon: -84.28, pop: 200000 }
  ],
  roads: ['I-275', 'I-4', 'I-75', 'the Selmon Expressway', 'Dale Mabry Highway', 'Fowler Avenue'],

  words: {
    street: ['Dale Mabry Highway', 'Nebraska Avenue', 'Florida Avenue', 'Fowler Avenue', 'Seventh Avenue', 'Central Avenue', '34th Street'],
    water: ['Tampa Bay', 'the Hillsborough River', 'Old Tampa Bay'],
    hood: ['Ybor', 'Seminole Heights', 'Sulphur Springs', 'West Tampa', 'Gulfport', 'Pinellas Park'],
    thing: ['bridge', 'skatepark', 'hurricane', 'pelican', 'snowbird'],
    weather: ['afternoon thunderstorm', 'storm surge']
  },

  events: [
    { id: 'TAMPA_BAY_BRIDGE_BACKUP', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Lanes are closing on the bridges across the bay this week.',
      title: 'The bridge is a parking lot',
      body: 'A wreck on the bay bridge has the whole crossing backed up the night of your show. The St. Pete bands and kids are stuck on the far shore.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the bay.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The bridge never cleared. The ones across the water stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads took the long way round the bay together. They will remember that.' }
      ] }
  ]
});
