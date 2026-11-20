SB.Cities.register('burlington-vt', {
  v: 1,
  slug: 'burlington-vt',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of vermont', 'uvm', 'champlain college', 'saint michael\'s college', 'st. michael\'s college', 'burlington free press',
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
    { id: 'essex', kind: 'FEEDER', name: 'Essex Junction', minutes: 15, bearing: 85, pop: 10590, note: 'A suburb of the chip plant. Kids come in for shows.' },
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
    { id: 'south-burlington', name: 'South Burlington strips', route: 'work-side', note: 'Shelburne Road strip malls and storage-unit rows. Bands practice here; parents have garages.' }
  ],

  contacts: ['portland-me', 'manchester-nh', { name: 'Montpelier', state: 'VT', lat: 44.26, lon: -72.58 }],

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
  }
});
