SB.Cities.register('peoria-il', {
  v: 1,
  slug: 'peoria-il',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['caterpillar', 'bradley university', 'bradley', 'illinois central college', 'peoria journal star', 'journal star',
           'heart of illinois fair', 'steamboat classic', 'santa claus parade', 'fiesta en el rio', 'peoria irish fest', 'peoria art guild',
           'marigold festival', 'hog days', 'pumpkin festival', 'festival of lights', 'railroad days', 'bnsf', 'amtrak', 'greyhound', 'steak n shake',
           'culver\'s', 'casey\'s', 'busch light', 'miller lite', 'pabst', 'illinois state university', 'western illinois university', 'knox college',
           'eureka college', 'murray baker bridge', 'rock island greenway', 'will it play in peoria', 'vfw', 'american legion', 'elks', 'moose lodge',
           'knights of columbus', 'cardinals', 'cubs', 'peoria chiefs', 'chiefs', 'the bluff street annex', 'lock and dam hall',
           'river bottom social club', 'the holt street garage', 'grandview pavilion', 'distillers\' row back room',
           'the knoxville avenue roller rink', 'glen oak shelter house', 'pabst lane basement', 'the sixth ward hall', 'marigold lanes',
           'the tazewell street carport'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['journal star*', 'steamboat classic*', 'steak n shake*', 'caterpillar*', 'pumpkin festival*', 'santa claus parade*'],

  blurb: ['A river city of bluffs, hospitals and heavy machinery in the middle of Illinois, where kids from every farm town and suburb around come when they want to go out.',
          'A room of regulars who all know who is playing and who is late. Basements, halls and bar back rooms carry the shows, and the ambitious ones leave for Chicago.'],
  hard: 'A fill-date town: bands only come on slow weeknights.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.2 },
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Peoria' },
    { id: 'east-peoria', kind: 'FEEDER', name: 'East Peoria', minutes: 5, bearing: 95, note: 'Across the river on the interstate bridge: plant families, a casino, and garages. Kids come over for everything.' },
    { id: 'pekin', kind: 'FEEDER', name: 'Pekin', minutes: 15, bearing: 180, note: 'The second city of the metro, with its own garage bands and a long rivalry with Peoria.' },
    { id: 'washington', kind: 'FEEDER', name: 'Washington', minutes: 20, bearing: 95, note: 'A fast-growing bedroom suburb with a downtown square; basement-band kids.' },
    { id: 'morton', kind: 'FEEDER', name: 'Morton', minutes: 20, bearing: 125, note: 'A church-and-football suburb southeast near the interstate.' },
    { id: 'chillicothe', kind: 'FEEDER', name: 'Chillicothe', minutes: 25, bearing: 10, note: 'A small river town to the north. Kids drive down for shows.' },
    { id: 'eureka', kind: 'FEEDER', name: 'Eureka', minutes: 30, bearing: 85, note: 'A county seat with a small college crowd.' },
    { id: 'canton', kind: 'FEEDER', name: 'Canton', minutes: 40, bearing: 235, note: 'A factory town with a community college branch.' },
    { id: 'galesburg', kind: 'FEEDER', name: 'Galesburg', minutes: 50, bearing: 295, note: 'A railroad town with two colleges and a small scene of its own, partly college-driven.' },
    { id: 'kewanee', kind: 'FEEDER', name: 'Kewanee', minutes: 60, bearing: 320, note: 'A hog-and-boiler town that lost its factory. Few shows of its own.' },
    { id: 'macomb', kind: 'FEEDER', name: 'Macomb', minutes: 80, bearing: 255, note: 'A state-university town with a real scene of its own; the crowd travels both ways.' },
    { id: 'bloomington-normal', kind: 'PEER', name: 'Bloomington and Normal', minutes: 45, bearing: 100, note: 'The closest peer: a bigger, cleaner, richer college crowd. Bands trade both ways, often on Fridays.' },
    { id: 'springfield', kind: 'PEER', name: 'Springfield', minutes: 70, bearing: 185, note: 'The state capital: a government town of about the same size.' },
    { id: 'champaign', kind: 'PEER', name: 'Champaign and Urbana', minutes: 80, bearing: 120, slug: 'champaign-il', note: 'A big flagship university and a bigger scene; a draw for Peoria kids and an obvious rival.' },
    { id: 'quad-cities', kind: 'PEER', name: 'The Quad Cities', minutes: 90, bearing: 305, slug: 'davenport-ia', note: 'The other river town across the Iowa line, and the natural tour partner on the interstate.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the riverfront warehouse district', route: 'downtown', note: 'Brick warehouses, bars with a stage and a big arena complex on the flat strip below the bluffs. Getting priced against DIY.' },
    { id: 'west-bluff', name: 'the West Bluff and the campus area', route: 'campus', note: 'Old big houses cut into apartments, fourplexes and a student strip. The likeliest home for a basement or porch show.' },
    { id: 'east-bluff', name: 'the East Bluff', route: 'old-side', note: 'Large old houses and working-class blocks around the big park, some of it blighted. House shows and the odd church hall.' },
    { id: 'north-side', name: 'the North Side, Averyville and North Valley', route: 'work-side', note: 'Poorer river-bottom blocks of warehouses, auto shops and corner bars. Cheap and ignored, but the police notice.' },
    { id: 'south-side', name: 'the South Side near the hospital district', route: 'old-side', note: 'Small wood-frame homes, storefront churches and taverns. Halls and tavern back rooms; the hospital keeps buying blocks.' },
    { id: 'peoria-heights', name: 'Peoria Heights', route: 'downtown', note: 'A separate village on the bluff with a small bar strip and its own rules.' },
    { id: 'east-peoria-hood', name: 'East Peoria', route: 'work-side', note: 'Across the river: basements and garages in blue-collar blocks. A band from here is from across the river.' },
    { id: 'west-edge', name: 'West Peoria and Bartonville', route: 'work-side', note: 'Older houses with lots of garages and cheap rents, for people who commute to the plant.' }
  ],

  contacts: ['champaign-il', 'davenport-ia', 'rockford-il', 'chicago'],

  points: [
    { name: 'Bloomington', state: 'IL', lat: 40.48, lon: -88.99, pop: 131000 },
    { name: 'Springfield', state: 'IL', lat: 39.8, lon: -89.65, pop: 114000 },
    { name: 'Decatur', state: 'IL', lat: 39.84, lon: -88.95, pop: 70000 },
    { name: 'Galesburg', state: 'IL', lat: 40.95, lon: -90.37, pop: 30000 }
  ],
  roads: ['I-74', 'I-474', 'I-155', 'US 150', 'US 24', 'IL 29'],

  words: {
    street: ['Knoxville Avenue', 'War Memorial Drive', 'Farmington Road', 'University Street', 'Main Street', 'Adams Street'],
    water: ['the Illinois River', 'Peoria Lake', 'Spring Creek'],
    hood: ['Averyville', 'North Valley', 'West Bluff', 'East Bluff', 'Peoria Heights', 'Bartonville', 'West Peoria', 'Glen Oak', 'Grandview Drive'],
    thing: ['tenderloin', 'square-cut pizza', 'parish hall', 'bluff', 'river bottom', 'grain elevator', 'shift change', 'parent\'s basement', 'van breakdown'],
    weather: ['tornado watch', 'ice storm', 'river flood']
  }
});
