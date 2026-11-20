SB.Cities.register('lafayette-la', {
  v: 1,
  slug: 'lafayette-la',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of louisiana at lafayette', 'university of louisiana', 'ul lafayette', 'louisiana lafayette', 'ragin\' cajuns', 'ragin cajuns', 'the cajundome',
           'cajundome', 'university commons', 'lsu', 'louisiana state university', 'festival international', 'festival international de louisiane',
           'acadiana advocate', 'the advocate', 'daily advertiser', 'the independent', 'the vermilion', 'the current', 'klfy', 'katc', 'wafb', 'kadn', 'kpel',
           'knights of columbus', 'tabasco', 'avery island', 'hurricane laura', 'hurricane rita', 'hurricane katrina', 'katrina', 'frog festival',
           'rayne frog festival', 'crawfish festival', 'breaux bridge crawfish festival', 'chitimacha', 'coushatta', 'amtrak',
           'the cane row', 'cane row', 'slab city garage', 'slab city', 'council 1204 hall', 'council 1204', 'the coulee annex', 'coulee annex',
           'thruway moon lounge', 'the rice dryer', 'pinhook quonset', 'mudbug hall', 'the sugar house', 'atchafalaya shed', 'cypress row lanes',
           'st. mary street carport'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Storms are written only as 'the storm'; the university is 'the university'. */
  blocklist: ['festival international*', 'ragin*', 'knights of columbus*', 'daily advertiser*', 'acadiana advocate*', 'tabasco*', 'cajundome*', 'lsu*'],

  blurb: ['Fiddle and accordion country, so loud is nothing new, but punk lives in carports, yards and rented halls. Rain cancels a show faster than the police do.',
          'Few basements here. Somebody\'s uncle owns a hall and wants a flat fee and no glass, and the bands get fed before load-in.'],
  hard: 'Few basements, heat and rain, and halls that want a flat fee and no glass.',
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

  contacts: ['baton-rouge-la', 'beaumont-tx', 'slidell-la'],

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
  }
});
