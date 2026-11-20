SB.Cities.register('lubbock-tx', {
  v: 1,
  slug: 'lubbock-tx',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['texas tech university', 'texas tech', 'lubbock christian university', 'lubbock christian', 'reese air force base', 'reese afb', 'cannon air force base',
           'cannon afb', 'lubbock avalanche-journal', 'avalanche-journal', 'carol of lights', 'panhandle-south plains fair', 'lubbock lights',
           'first friday art trail', 'depot district', 'south plains mall', 'frenship', 'big 12', 'hub city', 'lubbock or leave it', 'marsha sharp',
           'vfw', 'american legion', 'elks', 'wayland baptist',
           'the caliche room', 'playa hall', 'gin street annex', 'the windbreak', 'section line', 'hail damage', 'the feedyard',
           'ogallala social club', 'the dust bowl annex', 'pump jack hall', 'lot 289', 'the cattle guard'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['avalanche-journal*', 'carol of lights*', 'depot district*', 'lubbock lights*', 'hub city*', 'texas tech*'],

  blurb: ['A dead-flat cotton city on the high plains of West Texas, laid out on a numbered grid with a ring road, and hours from anything bigger.',
          'Wind, long drives and few rooms make the shows self-made, in garages and yards. The crowd empties every summer when the students go home.'],
  hard: 'Few rooms, huge distances, and the crowd empties each summer.',
  region: 'West Texas',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.8 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 },
    { name: 'Albuquerque', state: 'NM', lat: 35.08, lon: -106.65 },
    { name: 'Denton', state: 'TX', lat: 33.21, lon: -97.13 },
    { name: 'El Paso', state: 'TX', lat: 31.76, lon: -106.49 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Lubbock' },
    { id: 'wolfforth', kind: 'FEEDER', name: 'Wolfforth', minutes: 15, bearing: 225, note: 'A family suburb to the southwest; suburban teenagers drive in.' },
    { id: 'idalou', kind: 'FEEDER', name: 'Idalou', minutes: 15, bearing: 65, note: 'A tiny farm town; kids drive in.' },
    { id: 'slaton', kind: 'FEEDER', name: 'Slaton', minutes: 20, bearing: 145, note: 'A railroad and farm town.' },
    { id: 'shallowater', kind: 'FEEDER', name: 'Shallowater', minutes: 20, bearing: 330, note: 'A tiny farm town to the northwest.' },
    { id: 'levelland', kind: 'FEEDER', name: 'Levelland', minutes: 35, bearing: 260, note: 'A community-college and oil town; probably a small scene of its own.', bands: 1 },
    { id: 'tahoka', kind: 'FEEDER', name: 'Tahoka', minutes: 35, bearing: 185, note: 'A small farm town to the south.' },
    { id: 'crosbyton', kind: 'FEEDER', name: 'Crosbyton', minutes: 35, bearing: 85, note: 'A tiny farm town east on the caprock.' },
    { id: 'littlefield', kind: 'FEEDER', name: 'Littlefield', minutes: 45, bearing: 295, note: 'A farm town; high-schoolers drive in on weekends.' },
    { id: 'brownfield', kind: 'FEEDER', name: 'Brownfield', minutes: 45, bearing: 220, note: 'A farm and oil town to the southwest.' },
    { id: 'plainview', kind: 'FEEDER', name: 'Plainview', minutes: 50, bearing: 10, note: 'A bigger farm town up I-27 with a Baptist college; a possible scene.' },
    { id: 'post', kind: 'FEEDER', name: 'Post', minutes: 50, bearing: 140, note: 'An old mill and farm town to the southeast.' },
    { id: 'lamesa', kind: 'FEEDER', name: 'Lamesa', minutes: 65, bearing: 190, note: 'A farm and oil town an hour south; a small scene at most.' },
    { id: 'amarillo', kind: 'PEER', name: 'Amarillo', minutes: 120, bearing: 10, slug: 'amarillo-tx', note: 'The nearest peer: windier and more Panhandle, with a friendly rivalry.' },
    { id: 'clovis', kind: 'PEER', name: 'Clovis', state: 'NM', minutes: 105, bearing: 285, scene: 800, note: 'A rail and base town across the state line.' },
    { id: 'abilene', kind: 'PEER', name: 'Abilene', minutes: 165, bearing: 130, scene: 1200, note: 'A churchy college town to the southeast.' },
    { id: 'midland-odessa', kind: 'PEER', name: 'Midland and Odessa', minutes: 140, bearing: 175, scene: 1800, note: 'Oil towns to the south, richer and boom-and-bust, with scenes of their own.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the old depot area', route: 'downtown', note: 'Bars with stages, galleries and older storefronts along the old rail tracks; heating up, with rents and bar-owner interest rising.' },
    { id: 'overton', name: 'Overton and the campus edge', route: 'campus', note: 'Rented houses and student complexes that keep replacing the old bungalows; a drunk crowd that comes for the party, not the band.' },
    { id: 'tech-terrace', name: 'Tech Terrace', route: 'old-side', note: 'Older brick ranch houses south of campus; quiet, with fast noise complaints. Bands rehearse here more than they play.' },
    { id: 'north-central', name: 'the north-central side', route: 'old-side', note: 'Older bungalows with big yards and carports in family neighborhoods; backyard shows work if the block is on board.' },
    { id: 'east-lubbock', name: 'East Lubbock', route: 'work-side', note: 'Warehouse and industrial strips along the canyon and the rail, beside neighborhoods with their own history to respect; cheap and overlooked.' },
    { id: 'mid-century-belt', name: 'the mid-century belt', route: 'work-side', note: 'Working-class ranch houses with garages and big backyards between 34th and 50th; the backbone of house shows.' },
    { id: 'south-suburbs', name: 'the south and southwest suburbs', route: 'campus', note: 'Mall, big boxes and new slab homes; hostile to DIY, but where suburban teenagers come from.' }
  ],

  contacts: ['amarillo-tx'],

  points: [
    { name: 'Amarillo', state: 'TX', lat: 35.22, lon: -101.83, pop: 270000 },
    { name: 'Midland', state: 'TX', lat: 32.0, lon: -102.08, pop: 180000 },
    { name: 'Albuquerque', state: 'NM', lat: 35.08, lon: -106.65, pop: 920000 },
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.8, pop: 7500000 }
  ],
  roads: ['I-27', 'US 62/82', 'US 84', 'US 87', 'Loop 289', 'SH 114'],

  words: {
    street: ['Avenue Q', '19th Street', '34th Street', '50th Street', 'Loop 289', 'Slide Road', 'Indiana Avenue'],
    water: ['Yellow House Draw', 'the playa lakes'],
    hood: ['Overton', 'Tech Terrace', 'Clapp Park', 'Maxey Park', 'Dunbar', 'Wolfforth'],
    thing: ['cotton gin', 'caliche', 'blue norther', 'dust storm', 'playa lake', 'wind turbine', 'breakfast burrito', 'metal building'],
    weather: ['dust storm', 'blue norther', 'wind advisory', 'hail']
  }
});
