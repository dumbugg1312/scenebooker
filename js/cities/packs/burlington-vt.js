SB.Cities.register('burlington-vt', {
  v: 1,
  slug: 'burlington-vt',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['vermont city marathon', 'church street marketplace', 'party on the bricks', 'burlington independence day celebration', 'pride center of vermont', 'femme fest', 'highlight festival', 'bandsintown', 'front porch forum', 'helloburlingtonvt', 'loveburlington', 'vt cynic', 'burlington city arts',
           'university of vermont', 'uvm', 'champlain college', 'saint michael\'s college', 'st. michael\'s college', 'burlington free press',
           'seven days', 'vtdigger', 'north end news', 'wruv', 'wizn', 'woko', 'wptz', 'wcax', 'wfff', 'vermont public', 'green mountain transit',
           'lake champlain transportation', 'dragon boat festival', 'festival of fools', 'vermont brewers festival', 'brewers festival',
           'giant pumpkin regatta', 'south end art hop', 'art hop', 'discover jazz', 'winter is a drag', 'vermont city marathon', 'progressive party',
           'ethan allen express', 'amtrak', 'air national guard', 'vfw', 'american legion', 'elks', 'grange hall', 'the archibald street carport',
           'archibald street carport', 'grange hall cellar', 'the onion city pantry', 'onion city pantry', 'north avenue rink annex',
           'pine hill sugarhouse', 'the beltline bunker', 'beltline bunker', 'intervale barn loft', 'riverside print shop',
           'colchester causeway shed', 'elks back room', 'sunnyside boiler', 'battery row basement'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['uvm*', 'burlington free press*', 'seven days*', 'vermont brewers*', 'festival of fools*', 'champlain college*', 'wruv*', 'north end news*'],

  blurb: ['The best room in town was a condemned city basement, and everybody still talks about it. Now shows run on donation halls and breweries.',
          'Early, all-ages and substance-free, donation at the door. Hardcore carries it, and one person moving away can end a room.'],
  hard: 'Rooms keep closing; you book wherever the scene is squatting this year.',
  region: 'New England',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Montreal', state: 'QC', lat: 45.5, lon: -73.57 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .06, reason: 'Hardcore is the backbone of the all-ages tradition here.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Burlington' },
    { id: 'winooski', kind: 'FEEDER', name: 'Winooski', minutes: 10, bearing: 40, pop: 7997, scene: 120, note: 'The old mill town across the river: young, dense and cheap. Plenty of crossover.' },
    { id: 'essex', kind: 'FEEDER', name: 'Essex Junction', minutes: 15, bearing: 85, pop: 10590, note: 'A suburb of the chip plant. Kids come in for shows.', scene: 60,
      rooms: [
        { id: 'essex-brewery', kind: 'BAR', hood: 'essex-hood', zone: 'essex', cap: 150, ages: ['ALL', 'A21'], matinee: true, curfew: 1320, note: 'A suburban brewery where the heavier bands play. All ages by day, beer and a parking lot at night.' }
      ] },
    { id: 'colchester', kind: 'FEEDER', name: 'Colchester and Milton', minutes: 20, bearing: 20, note: 'Lakeside suburbs with a small college and plenty of garages and storage units.' },
    { id: 'shelburne', kind: 'FEEDER', name: 'Shelburne and Hinesburg', minutes: 20, bearing: 170, note: 'Affluent rural-suburban kids from the big regional high school.' },
    { id: 'waterbury', kind: 'FEEDER', name: 'Waterbury', minutes: 30, bearing: 115, pop: 5331, note: 'A small valley town on the interstate, flooded more than once.', beyond: 'valley-road' },
    { id: 'vergennes', kind: 'FEEDER', name: 'Vergennes', minutes: 35, bearing: 195, pop: 2553, note: 'The smallest city in the state: farms and a few bands.' },
    { id: 'st-albans', kind: 'FEEDER', name: 'St. Albans', minutes: 40, bearing: 15, pop: 6877, note: 'A dairy and railroad town up the interstate with a small scene of its own.' },
    { id: 'barre', kind: 'FEEDER', name: 'Barre', minutes: 50, bearing: 125, pop: 8491, note: 'A tougher granite town with an old labor streak, often called the hardcore side of central Vermont.', beyond: 'valley-road' },
    { id: 'middlebury', kind: 'FEEDER', name: 'Middlebury', minutes: 50, bearing: 190, pop: 9152, note: 'A liberal arts college town with its own scene; the kids sometimes come north.' },
    { id: 'montpelier', kind: 'PEER', name: 'Montpelier', state: 'VT', minutes: 50, bearing: 130, scene: 450, note: 'The small capital and the closest other scene; people drive back and forth.', beyond: 'valley-road' },
    { id: 'plattsburgh', kind: 'PEER', name: 'Plattsburgh', state: 'NY', minutes: 75, bearing: 295, scene: 350, note: 'A college and former base town across the lake.' },
    { id: 'rutland', kind: 'PEER', name: 'Rutland', state: 'VT', minutes: 90, bearing: 180, scene: 400, note: 'A marble town in decline down US 7; bands play both places.' },
    { id: 'portland', kind: 'PEER', name: 'Portland', state: 'ME', minutes: 180, bearing: 100, slug: 'portland-me', note: 'The nearest city of similar size with a real DIY scene; they trade bands, not crowds.' }
  ],

  chokepoints: [{ id: 'valley-road', name: 'I-89 through the valley', p: .03 }],

  hoods: [
    { id: 'downtown', name: 'downtown and Church Street', route: 'downtown', note: 'A pedestrian marketplace between the lake and the hill. Bars, clubs and tourists; priced out for anything unlicensed.' },
    { id: 'old-north-end', name: 'the Old North End', route: 'old-side', note: 'Working-class and immigrant triple-deckers north of downtown. Porch shows, small storefronts and community rooms; heating up fast.' },
    { id: 'south-end', name: 'the South End', route: 'work-side', note: 'Converted warehouses, studios and breweries along the rail line. Lofts and practice rooms, at risk of redevelopment.' },
    { id: 'hill', name: 'the Hill Section', route: 'campus', note: 'Big old Victorians cut into student apartments. Most of the basement shows are here, with landlords and the city fighting over noise.' },
    { id: 'new-north-end', name: 'the New North End', route: 'old-side', note: 'Postwar family streets along the beltline. Garages, carports and parent-tolerated basements; quiet and expensive.' },
    { id: 'winooski-hood', name: 'Winooski mills', route: 'town:winooski', note: 'Old woolen mills turned to apartments and bar-adjacent rooms, across the river and cheaper.' },
    { id: 'south-burlington', name: 'South Burlington strips', route: 'work-side', note: 'Shelburne Road strip malls and storage-unit rows. Bands practice here; parents have garages.' },
    { id: 'essex-hood', name: 'Essex Junction', route: 'town:essex', note: 'A suburb up the road with breweries and parking lots. A ride out of the city.' }
  ],

  contacts: ['portland-me', 'manchester-nh', 'albany-ny', { name: 'Montpelier', state: 'VT', lat: 44.26, lon: -72.58 }],

  rooms: [
    { id: 'hill-cellar', kind: 'HOUSE', hood: 'hill', cap: 60, curfew: 1320, outdoor: false, standing: [70, 60, 45], pressure: 55, start: true, note: 'A stone cellar under a big old Victorian, all ages and substance-free. It lives on one person staying and the neighbors not calling.' },
    { id: 'porch-triple', kind: 'HOUSE', hood: 'old-north-end', cap: 40, curfew: 1320, outdoor: true, pressure: 50, note: 'A triple-decker with a porch and a small yard. Close neighbors and a landlord downstairs.' },
    { id: 'rail-gallery', kind: 'DIY', hood: 'south-end', cap: 120, curfew: 1350, pressure: 60, needs: ['VOUCH'], note: 'A gallery and arts space on the rail line. Rent is climbing and the developers are circling.' },
    { id: 'donation-hall', kind: 'HALL', hood: 'old-north-end', cap: 200, curfew: 1350, rent: 150, deposit: 0, owner: 'HALL_MANAGER', note: 'A rented community hall, donation at the door and substance-free. The new hot spot, but it depends on a landlord and a rental calendar.' },
    { id: 'north-end-bar', kind: 'BAR', hood: 'old-north-end', cap: 120, ages: ['ALL', 'A21'], matinee: true, curfew: 1410, standing: [50, 60, 65], note: 'A small bar with a back-room stage that has taken metal and punk. Insurance keeps squeezing rooms like it.' },
    { id: 'church-bar', kind: 'BAR', hood: 'downtown', cap: 150, ages: ['A21'], curfew: 1470, standing: [45, 60, 70], note: 'A bar on the pedestrian mall. It books punk only on early, small bills.' },
    { id: 'strip-club', kind: 'CLUB', hood: 'south-burlington', cap: 350, ages: ['ALL', 'A18'], curfew: 1380, needs: ['FULL_BILL'], note: 'A big club on the strip with an early all-ages lounge. Ticket prices and a house agenda, not a scene.' },
    { id: 'lake-patio', kind: 'OUTDOOR', hood: 'downtown', cap: 200, curfew: 1080, ac: false, note: 'A free all-ages daytime show on the waterfront. Families mixed in, summer only, and the lake wind.' }
  ],

  calendar: [
    { id: 'marathon', label: 'the city marathon', tag: 'race', month: 5, weeks: [4, 5], dows: [5, 6], can: [0.9, 0.88, 0.88], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'jazz-fest', label: 'the early-summer jazz festival', tag: 'festival', month: 6, week: 1, dows: [3, 4, 5], can: [0.95, 0.9, 0.9], hoods: ['downtown'], elsewhere: [1, 0.97, 0.97] },
    { id: 'fourth', label: 'the Fourth of July fireworks', tag: 'holiday', month: 7, week: 1, dows: [4, 5, 6], can: [0.9, 0.88, 0.88], hoods: ['downtown'], elsewhere: [1, 0.95, 0.95] },
    { id: 'street-festival', label: 'the street-performer festival', tag: 'festival', month: 8, week: 1, dows: [4, 5, 6], can: [0.92, 0.9, 0.9], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'move-in', label: 'college move-in weekend', tag: 'graduation', month: 8, week: 4, dows: [5, 6], can: [1.1, 1.1, 1.05], hoods: ['hill'], elsewhere: [1, 1, 1] },
    { id: 'art-weekend', label: 'the South End art weekend', tag: 'festival', month: 9, week: 1, dows: [4, 5, 6], can: [1.05, 1.08, 1.05], hoods: ['south-end'], elsewhere: [1, 0.97, 0.97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.1] },
    { id: 'nye', label: 'New Year\'s Eve', tag: 'holiday', month: 12, week: 5, dows: [0, 1, 2, 3, 4, 5, 6], can: [0.9, 0.88, 0.88], hoods: ['downtown'], elsewhere: [1, 0.97, 0.97] }
  ],

  rules: { quiet: 1320 },

  points: [
    { name: 'Montreal', state: 'QC', lat: 45.5, lon: -73.57, pop: 1800000 },
    { name: 'Montpelier', state: 'VT', lat: 44.26, lon: -72.58, pop: 8000 },
    { name: 'Albany', state: 'NY', lat: 42.65, lon: -73.76, pop: 100000 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06, pop: 650000 },
    { name: 'Concord', state: 'NH', lat: 43.21, lon: -71.54, pop: 44000 }
  ],
  roads: ['I-89', 'US 7', 'US 2', 'VT 15', 'VT 127', 'I-189'],

  words: {
    street: ['Church Street', 'Colchester Avenue', 'Pine Street', 'North Avenue', 'Shelburne Road', 'Main Street'],
    water: ['Lake Champlain', 'the Winooski River', 'the bike path', 'Shelburne Bay'],
    hood: ['the Old North End', 'the New North End', 'the South End', 'the Hill Section', 'the Intervale', 'Winooski', 'Colchester', 'Burlington'],
    thing: ['creemee', 'cellar', 'maple', 'boiler', 'woodstove', 'bottle-deposit can', 'sugarhouse', 'poutine', 'donation box', 'brewery show', 'all-ages hall', 'benefit fest'],
    weather: ['lake-effect snow', 'mud season', 'nor\'easter', 'black ice'],
    bands: { MIDDLE: ['Mud Season Regulars'], KIDS: ['Cellar Wall'] }
  },

  events: [
    { id: 'BURLINGTON_VT_HILL_NOISE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], calendar: 'graduation' },
      telegraph: 'The Hill is full of students and the neighbors are already complaining.',
      title: 'Ten o\'clock on the Hill',
      body: 'It is move-in weekend, and the cellar is packed with students. The neighbors call the noise line right at ten, and the house is on a quiet-hours warning.',
      options: [
        { id: 'EARLY', label: 'Start early and finish before ten', likely: 'The ones who came get a short, tight night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'You were done at ten sharp, and the street was quiet when the car pulled up.' },
        { id: 'MOVE', label: 'Move the bill to a hall', likely: 'Breaks the plan, and costs a little.',
          effects: [{ op: 'MONEY', amount: -25 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The hall took it for a donation and a handshake, and the crowd followed.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The house takes the heat.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The call came at ten past, and the room emptied before anyone came to the door.' }
      ] },

    { id: 'BURLINGTON_VT_PREMIUM', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], months: [6, 7, 8] },
      telegraph: 'The bar on the north end got a renewal letter from its insurer.',
      title: 'The premium triples',
      body: 'The bar\'s insurer renewed its liquor liability at three times the price in the middle of summer, and the owner will only offer an early all-ages Sunday.',
      options: [
        { id: 'SUNDAY', label: 'Take the early Sunday', likely: 'It\'s smaller, with no drinking.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -120 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'It was an early Sunday with the kids up front and nobody at the bar.' },
        { id: 'CHIP', label: 'Chip in for the owner', likely: 'It costs forty dollars, and the date stays.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'REGULARS', pct: .02 }],
          result: 'You passed the hat, and the owner kept the date.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date, which costs you trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'BURLINGTON_VT_SNOW', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [12, 1, 2, 3], chokepoint: true },
      telegraph: 'A snowstorm is headed up the valley and the interstate will close.',
      title: 'The interstate is shut',
      body: 'Snow has closed the interstate and the feeder towns cannot reach the show. The Winooski crowd walks across the river instead.',
      options: [
        { id: 'SHORT', label: 'Run it with who can walk', likely: 'It\'s a thin night, but the ones who came are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The valley never made it, but the Winooski kids did.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date, which costs you trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the ones who could come, came.' }
      ] }
  ]
});
