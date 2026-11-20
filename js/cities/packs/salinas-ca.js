SB.Cities.register('salinas-ca', {
  v: 1,
  slug: 'salinas-ca',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['hartnell college', 'hartnell', 'csumb', 'cal state monterey bay', 'california state university monterey bay', 'fort ord',
           'presidio of monterey', 'defense language institute', 'california rodeo salinas', 'california rodeo', 'big week', 'kiddie kapers',
           'el grito', 'ciclovia', 'salinas asian festival', 'first fridays', 'founders day', 'california international airshow', 'garlic festival',
           'strawberry festival', 'salinas union high school district', 'steinbeck house', 'steinbeck museum', 'national steinbeck center', 'amtrak',
           'coast starlight', 'greyhound', 'mst', 'monterey-salinas transit', 'oakland warehouse fire', 'ghost ship', 'ucsc', 'uc santa cruz',
           'university of california santa cruz', 'salad bowl of the world', 'the lettuce shed', 'sycamore hall', 'chinatown annex',
           'the packing house', 'gabilan street garage', 'fog line', 'the cold storage', 'rincon lot', 'boronda backyard', 'the sanjon',
           'artichoke room'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['hartnell*', 'california rodeo*', 'el grito*', 'csumb*', 'fort ord*', 'ciclovia*'],

  blurb: ['Backyards and rented halls carry the shows here, and everyone\'s cousin is in the crowd.',
          'Salinas bands play outward to the coast and the Bay more than anyone plays in.'],
  hard: 'Few all-ages rooms, strict landlords, and no one booking through.',
  region: 'the Central Coast',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'San Jose', state: 'CA', lat: 37.34, lon: -121.89 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Oakland', state: 'CA', lat: 37.8, lon: -122.27 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Salinas' },
    { id: 'castroville', kind: 'FEEDER', name: 'Castroville', minutes: 10, bearing: 305, note: 'A small artichoke-farm town, mostly Latino. Backyard scale at most.' },
    { id: 'gonzales', kind: 'FEEDER', name: 'Gonzales', minutes: 20, bearing: 150, note: 'A tiny farm town down US 101.' },
    { id: 'marina', kind: 'FEEDER', name: 'Marina', minutes: 25, bearing: 285, note: 'A former army-base town by the dunes, with a university and many veterans.' },
    { id: 'seaside', kind: 'FEEDER', name: 'Seaside', minutes: 25, bearing: 275, note: 'A working-class, military-linked town toward the Peninsula.' },
    { id: 'soledad', kind: 'FEEDER', name: 'Soledad', minutes: 25, bearing: 150, note: 'A farm town and prison town in the valley; backyard shows only.' },
    { id: 'monterey', kind: 'FEEDER', name: 'Monterey and Pacific Grove', minutes: 25, bearing: 255, note: 'Tourist money and military schools over the hill; small and transient.' },
    { id: 'greenfield', kind: 'FEEDER', name: 'Greenfield', minutes: 35, bearing: 150, note: 'A young, mostly Latino farm town where kids have no room of their own.' },
    { id: 'watsonville', kind: 'FEEDER', name: 'Watsonville', minutes: 40, bearing: 330, note: 'A berry town north on the coast road, likely with its own scene and more rooms.' },
    { id: 'hollister', kind: 'FEEDER', name: 'Hollister', minutes: 45, bearing: 35, note: 'A farm town in the next county, with a motorcycle history.' },
    { id: 'gilroy', kind: 'FEEDER', name: 'Gilroy', minutes: 45, bearing: 355, note: 'A garlic town and Silicon Valley bedroom community.' },
    { id: 'santa-cruz', kind: 'PEER', name: 'Santa Cruz', minutes: 55, bearing: 325, slug: 'santa-cruz-ca', note: 'Over the hill: the real exchange partner. Salinas kids go there for shows; few come back.' },
    { id: 'san-luis-obispo', kind: 'PEER', name: 'San Luis Obispo', minutes: 135, bearing: 160, slug: 'san-luis-obispo-ca', note: 'Two hours south on US 101: a college town on the same coast route.' },
    { id: 'modesto', kind: 'PEER', name: 'Modesto', minutes: 150, bearing: 55, slug: 'modesto-ca', note: 'Over the pass into the Central Valley; the two trade little.' }
  ],

  hoods: [
    { id: 'alisal', name: 'Alisal and East Salinas', route: 'old-side', note: 'Dense, working-class and immigrant blocks with taquerias and swap meets. The biggest crowd of teenagers in town, and the most attention from neighbors and police.' },
    { id: 'oldtown', name: 'Oldtown and downtown', route: 'downtown', note: 'A Victorian and Art Deco core with galleries, a theater and a few bars. Polished, with little tolerance for noise after ten.' },
    { id: 'chinatown', name: 'Chinatown and the tracks', route: 'work-side', note: 'Old brick and warehouses north of downtown. Cheap and ignored, and where patience for crowds runs out fastest.' },
    { id: 'north-main', name: 'North Main and the rodeo grounds', route: 'work-side', note: 'Big lots that are the center of the city one week in July and industrial strip the rest of the year.' },
    { id: 'north-salinas', name: 'North Salinas', route: 'campus', note: 'Tract homes with two-car garages, a mall and big-box strips. Where kids with cars and allowances live.' },
    { id: 'west-salinas', name: 'West Salinas and Boronda', route: 'campus', note: 'Newer tract housing west of the freeway, quiet and car-dependent.' },
    { id: 'south-salinas', name: 'South Salinas and Maple Park', route: 'work-side', note: 'Older, lower-income blocks toward the freight corridor, with industrial buildings along the tracks.' }
  ],

  contacts: ['santa-cruz-ca', 'san-luis-obispo-ca', 'modesto-ca'],

  points: [
    { name: 'San Jose', state: 'CA', lat: 37.34, lon: -121.89, pop: 1000000 },
    { name: 'Santa Cruz', state: 'CA', lat: 36.97, lon: -122.03, pop: 63000 },
    { name: 'Monterey', state: 'CA', lat: 36.6, lon: -121.89, pop: 28000 },
    { name: 'Paso Robles', state: 'CA', lat: 35.63, lon: -120.69, pop: 31000 }
  ],
  roads: ['US 101', 'Highway 68', 'Highway 183', 'Highway 156', 'Highway 1'],

  words: {
    street: ['Alisal Street', 'Main Street', 'Highway 101', 'Highway 68', 'Highway 183'],
    water: ['the Salinas River', 'the riverbed'],
    hood: ['Alisal', 'Oldtown', 'Chinatown', 'Harden Ranch', 'Santa Rita', 'Boronda', 'Laurelwood', 'Maple Park', 'Sherwood Gardens', 'the East Side'],
    thing: ['taco truck', 'lettuce field', 'packing shed', 'panaderia', 'garage', 'strawberry stand', 'crate label', 'quinceanera hall', 'storage unit', 'rented banquet hall', 'driveway'],
    weather: ['fog bank', 'afternoon wind', 'winter rain']
  }
});
