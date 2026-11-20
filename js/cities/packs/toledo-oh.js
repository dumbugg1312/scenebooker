SB.Cities.register('toledo-oh', {
  v: 1,
  slug: 'toledo-oh',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['owens-illinois', 'owens illinois', 'libbey', 'owens corning', 'jeep', 'toledo war', 'mud hens', 'toledo walleye', 'university of toledo',
           'bowling green state university', 'bgsu', 'owens community college', 'lourdes university', 'ohio state', 'toledo blade', 'wxut', 'wbgu',
           'marco\'s', 'marco\'s pizza', 'packo', 'tony packo', 'vfw', 'american legion', 'eastern michigan', 'michigan state', 'marathon petroleum',
           'cullet hall', 'the annealer', 'lagrange social club', 'ten mile basement', 'the float line', 'birmingham turners hall', 'marsh road garage',
           'bay view legion post 412', 'tin roof sundries', 'the batch house', 'craft street annex', 'perch dinner hall'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['toledo blade*', 'mud hens*', 'cullet hall*', 'packo*'],

  blurb: ["Detroit's quiet neighbor, where the shows are small and the basements are damp.",
          'Bands here do it themselves because nobody else will, and the road mostly skips them.'],
  hard: 'A fill date between bigger cities; rooms are patchy and short-lived.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05 },
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83.0 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Toledo' },
    { id: 'bowling-green', kind: 'FEEDER', name: 'Bowling Green', minutes: 25, bearing: 190, note: 'A university town just down I-75 with its own small scene; kids go both ways.' },
    { id: 'monroe', kind: 'FEEDER', name: 'Monroe', state: 'MI', minutes: 30, bearing: 10, note: 'A factory and river town in Michigan; its kids look to Toledo and Detroit.' },
    { id: 'wauseon', kind: 'FEEDER', name: 'Wauseon and Archbold', minutes: 45, bearing: 265, note: 'Farm country to the west; almost no scene.' },
    { id: 'fremont', kind: 'FEEDER', name: 'Fremont', minutes: 45, bearing: 110, note: 'A small manufacturing town to the southeast.' },
    { id: 'port-clinton', kind: 'FEEDER', name: 'Port Clinton', minutes: 50, bearing: 95, note: 'A lake and ferry town; busy in summer, quiet otherwise.', season: { months: [6, 7, 8], mul: 1.3 } },
    { id: 'adrian', kind: 'FEEDER', name: 'Adrian', state: 'MI', minutes: 50, bearing: 315, note: 'A small college town with some arts life.' },
    { id: 'findlay', kind: 'FEEDER', name: 'Findlay', minutes: 50, bearing: 185, note: 'An oil company town with a small college and a little scene.' },
    { id: 'defiance', kind: 'FEEDER', name: 'Defiance and Napoleon', minutes: 60, bearing: 230, note: 'River towns up the Maumee with a college and a few bands.' },
    { id: 'sandusky', kind: 'FEEDER', name: 'Sandusky', minutes: 60, bearing: 90, note: 'A lakeshore tourist town with a modest scene and seasonal work.', season: { months: [6, 7, 8], mul: 1.3 } },
    { id: 'ann-arbor', kind: 'PEER', name: 'Ann Arbor', state: 'MI', minutes: 50, bearing: 350, slug: 'ann-arbor-mi', note: 'The college and music town up US 23; the pull and the bigger bills.' },
    { id: 'fort-wayne', kind: 'PEER', name: 'Fort Wayne', state: 'IN', minutes: 105, bearing: 240, slug: 'fort-wayne-in', note: 'A similar industrial city west on US 24, a common stop for bands.' },
    { id: 'akron', kind: 'PEER', name: 'Akron', minutes: 135, bearing: 110, slug: 'akron-oh', note: 'A longer tradition east on the turnpike; Toledo bands go play and envy it.' },
    { id: 'dayton', kind: 'PEER', name: 'Dayton', minutes: 135, bearing: 190, slug: 'dayton-oh', note: 'Same Rust Belt history, down I-75.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the warehouse district', route: 'downtown', note: 'Old brick warehouses, a few lofts and a bar strip on the river; patchy and empty after dark.' },
    { id: 'old-west-end', name: 'the Old West End', route: 'old-side', note: 'Tall Victorian houses cut into apartments, with big basements and porches. Students and artists.' },
    { id: 'uptown', name: 'Uptown', route: 'downtown', note: 'Converted storefronts and galleries north of the core; small gallery shows.' },
    { id: 'east-toledo', name: 'East Toledo and Birmingham', route: 'work-side', note: 'Across the river: refinery-side, blue-collar, cheap. Basements, garages and corner bars.' },
    { id: 'north-toledo', name: 'North Toledo and Lagrange', route: 'work-side', note: 'Old Polish blocks with social halls, churches and vacant lots near the assembly plant.' },
    { id: 'west-toledo', name: 'West Toledo and Sylvania Avenue', route: 'campus', note: 'Student rentals and strip malls around the university; the main student crowd.' },
    { id: 'junction', name: 'Junction and the near south side', route: 'work-side', note: 'Older neighborhoods with many vacant lots and the cheapest basements.' },
    { id: 'point-place', name: 'Point Place', route: 'old-side', note: 'A bay-side boating neighborhood; bar and marina shows, mostly summer.' }
  ],

  contacts: ['ann-arbor-mi', 'fort-wayne-in', 'akron-oh', 'dayton-oh'],

  points: [
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05, pop: 4300000 },
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69, pop: 2000000 },
    { name: 'Lansing', state: 'MI', lat: 42.73, lon: -84.55, pop: 540000 },
    { name: 'Lima', state: 'OH', lat: 40.74, lon: -84.11, pop: 100000 }
  ],
  roads: ['I-75', 'I-80/90', 'I-280', 'I-475', 'US 23', 'US 24'],

  words: {
    street: ['Sylvania Avenue', 'Dorr Street', 'Monroe Street', 'Detroit Avenue', 'Front Street'],
    water: ['the Maumee', 'Maumee Bay', 'Lake Erie'],
    hood: ['the Old West End', 'Uptown', 'Birmingham', 'Lagrange', 'Junction', 'Point Place', 'Sylvania', 'Maumee', 'Perrysburg', 'Oregon', 'Rossford'],
    thing: ['coney dog', 'lake perch', 'sump pump', 'cullet', 'turnpike', 'pallet', 'borrowed truck', 'perch dinner', 'fraternal hall'],
    weather: ['lake effect', 'ice storm']
  }
});
