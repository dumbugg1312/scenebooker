SB.Cities.register('salem-or', {
  v: 1,
  slug: 'salem-or',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['willamette university', 'corban university', 'chemeketa community college', 'chemeketa', 'western oregon university',
           'oregon state university', 'oregon state fair', 'state fair', 'salem art fair', 'world beat festival', 'bite of salem',
           'salem capital pride', 'keizerfest', 'statesman journal', 'capital press', 'salem business journal', 'salem magazine', 'cherriots',
           'amtrak', 'coast starlight', 'amtrak cascades', 'greyhound', 'olcc', 'chemawa indian school', 'confederated tribes of the grand ronde',
           'oregon ducks', 'oregon beavers', 'cherry city', 'salem depot', 'labor day fires', 'orchard row hall', 'hop kiln room', 'prune dryer',
           'pringle creek carport', 'slough street studio', 'lodge 41', 'the bypass lot', 'mill race garage', 'eola hill shop', 'third gear garage',
           'cannery annex', 'lancaster laundromat loft'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['statesman journal*', 'willamette university*', 'cherriots*', 'oregon state fair*', 'keizerfest*', 'capital press*'],

  blurb: ['A capital with no scene on paper, where garages and halls fill when kids drive in from the farm towns.',
          'Government quiet downtown at night, and the big city is an hour up the road.'],
  hard: 'Quiet, spread out, and overshadowed by the city to the north.',
  region: 'the Valley',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Salem' },
    { id: 'keizer', kind: 'FEEDER', name: 'Keizer', minutes: 10, bearing: 5, note: 'A suburb just north across the river. Its teenagers are Salem teenagers, and the garages are here.' },
    { id: 'monmouth', kind: 'FEEDER', name: 'Monmouth and Independence', minutes: 20, bearing: 260, note: 'A college town and its river twin to the west, dry for decades; students drive in for shows.' },
    { id: 'silverton', kind: 'FEEDER', name: 'Silverton', minutes: 25, bearing: 70, note: 'A farm and tourist town in the foothills with a small school-band scene.' },
    { id: 'woodburn', kind: 'FEEDER', name: 'Woodburn', minutes: 25, bearing: 20, note: 'A mostly Latino farm-labor town on I-5 that may have its own punk and hardcore audience.' },
    { id: 'dallas', kind: 'FEEDER', name: 'Dallas', minutes: 25, bearing: 265, note: 'A forestry and farm county seat to the west.' },
    { id: 'stayton', kind: 'FEEDER', name: 'Stayton', minutes: 30, bearing: 110, note: 'A mill and farm town up the canyon road; kids drive down.' },
    { id: 'albany', kind: 'FEEDER', name: 'Albany', minutes: 30, bearing: 195, note: 'A rail and metals town on I-5 with a historic downtown and a small scene of its own.' },
    { id: 'corvallis', kind: 'FEEDER', name: 'Corvallis', minutes: 45, bearing: 215, note: 'A university town with much better music infrastructure; crowds trade both ways.' },
    { id: 'mill-city', kind: 'FEEDER', name: 'Mill City', minutes: 45, bearing: 100, note: 'A tiny timber town in the canyon, scarred by fire.' },
    { id: 'eugene', kind: 'PEER', name: 'Eugene', minutes: 60, bearing: 190, slug: 'eugene-or', note: 'An hour south on I-5: the university town with the real punk history. The obvious trading partner.' },
    { id: 'vancouver', kind: 'PEER', name: 'Vancouver', state: 'WA', minutes: 70, bearing: 5, note: 'Across the Columbia, nearly a Portland suburb.' },
    { id: 'olympia', kind: 'PEER', name: 'Olympia', state: 'WA', minutes: 150, bearing: 340, slug: 'olympia-wa', note: 'Up I-5 past Portland, an occasional tour exchange.' },
    { id: 'bend', kind: 'PEER', name: 'Bend', minutes: 150, bearing: 100, slug: 'bend-or', note: 'Over the Cascades on the canyon highway: a rich resort town in a different world.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Salem', route: 'downtown', note: 'The capitol, bank buildings and the riverfront: busy with state workers at lunch and empty at night. A few bars and the odd storefront.' },
    { id: 'west-salem', name: 'West Salem', route: 'work-side', note: 'Across the river bridges, with its own high school, strip malls and subdivisions. Better for a garage or basement than a venue.' },
    { id: 'north-salem', name: 'North Salem and Highland', route: 'old-side', note: 'Older bungalows with basements, cheap rents, and the fairgrounds and the prison close by. Ignored and a little rough.' },
    { id: 'lancaster', name: 'East Salem and Lancaster Drive', route: 'work-side', note: 'Strip malls, apartment blocks, auto shops and warehouse bays in a mostly Latino working-class district. The cheapest space in town.' },
    { id: 'south-salem', name: 'South Salem', route: 'campus', note: 'Newer subdivisions and finished basements, parents with space and neighbors with rules.' },
    { id: 'sunnyslope', name: 'Sunnyslope and the park side', route: 'old-side', note: 'Leafy and more prosperous, good for backyard parties and park events, not for venues.' },
    { id: 'keizer-side', name: 'Keizer', route: 'work-side', note: 'The big suburb north of the river: garages, basements and all-ages shows in somebody\'s house.' }
  ],

  contacts: ['eugene-or', 'olympia-wa', 'bend-or'],

  points: [
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68, pop: 650000 },
    { name: 'Eugene', state: 'OR', lat: 44.05, lon: -123.09, pop: 177000 },
    { name: 'Corvallis', state: 'OR', lat: 44.56, lon: -123.26, pop: 61000 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33, pop: 740000 }
  ],
  roads: ['I-5', 'Highway 99E', 'Highway 22', 'Highway 221', 'Highway 213'],

  words: {
    street: ['Commercial Street', 'Lancaster Drive', 'River Road', 'Highway 99E', 'Highway 22'],
    water: ['the Willamette', 'the river'],
    hood: ['West Salem', 'Highland', 'Northgate', 'Sunnyslope', 'Hayesville', 'Four Corners', 'Keizer', 'Grant'],
    thing: ['taco truck', 'grange hall', 'filbert orchard', 'hop field', 'cannery', 'teriyaki shop', 'garage canopy', 'marionberry stand', 'church hall', 'canopy'],
    weather: ['week of rain', 'wildfire smoke', 'ice storm']
  }
});
