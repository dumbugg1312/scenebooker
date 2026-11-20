SB.Cities.register('spokane-wa', {
  v: 1,
  slug: 'spokane-wa',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['gonzaga university', 'gonzaga', 'whitworth', 'eastern washington university', 'washington state university', 'wsu', 'fairchild air force base',
           'fairchild', 'bloomsday', 'lilac festival', 'torchlight parade', 'hoopfest', 'pig out in the park', 'hillyard festival',
           'interstate fair', 'spokane county interstate fair', 'amtrak', 'great northern railway', 'creative by nature', 'lilac city', 'hooptown usa',
           'spokesman-review', 'spokesman review', 'inlander', 'kyrs', 'spokane indians', 'spokane chiefs', 'vfw', 'american legion',
           'the rail spur hall', 'rail spur hall', 'havana street annex', 'fourth floor fellowship hall', 'the grain elevator room', 'grain elevator room',
           'latah creek grange', 'the falls basement', 'marshall street rec', 'the interstate room', 'lilac lane lodge', 'the viaduct shop',
           'market street back room', 'the basalt hall'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Colleges, events and the weekly paper appear in game text only as generic words. */
  blocklist: ['gonzaga*', 'spokesman*', 'inlander*', 'hoopfest*', 'bloomsday*', 'lilac festival*', 'latah creek grange*', 'viaduct shop*'],

  blurb: ['A long drive from anywhere. The good rooms are borrowed halls and basements, and nobody keeps a room for long.',
          'All-ages rooms are scarce, the next big city is over the mountains, and a show feels like an event.'],
  hard: 'Few all-ages rooms, and the ones that exist keep disappearing.',
  region: 'the Inland Northwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Missoula', state: 'MT', lat: 46.87, lon: -113.99 },
    { name: 'Boise', state: 'ID', lat: 43.62, lon: -116.2 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Spokane' },
    { id: 'valley', kind: 'FEEDER', name: 'Spokane Valley and Liberty Lake', minutes: 15, bearing: 90, pop: 103000, note: 'The big east suburb, its own city; industrial units, halls and a lot of audience kids who need a ride.' },
    { id: 'airway-heights', kind: 'FEEDER', name: 'Airway Heights and Medical Lake', minutes: 15, bearing: 250, note: 'Casino, prison and base-adjacent towns west on US 2; military families.' },
    { id: 'cheney', kind: 'FEEDER', name: 'Cheney', minutes: 20, bearing: 230, pop: 13255, note: 'A state-college town on I-90 with a scene that comes and goes with the semester.', bands: 2 },
    { id: 'post-falls', kind: 'FEEDER', name: 'Post Falls and Rathdrum', state: 'ID', minutes: 25, bearing: 80, note: 'Fast-growing suburban Idaho towns; younger, more conservative kids and fewer rooms.' },
    { id: 'deer-park', kind: 'FEEDER', name: 'Deer Park', minutes: 30, bearing: 350, note: 'A small farm and bedroom town up US 395; kids drive in.' },
    { id: 'coeur-d-alene', kind: 'FEEDER', name: 'Coeur d\'Alene', state: 'ID', minutes: 40, bearing: 85, pop: 54628, note: 'A lake resort and retiree town; its own all-ages options are limited, so kids drive west.' },
    { id: 'newport', kind: 'FEEDER', name: 'Newport', minutes: 55, bearing: 25, note: 'A small rural town on US 2 near the Idaho line; no scene.' },
    { id: 'silver-valley', kind: 'FEEDER', name: 'Kellogg and Wallace', state: 'ID', minutes: 70, bearing: 100, note: 'Old mining towns in the Silver Valley; a few kids make the trip.' },
    { id: 'sandpoint', kind: 'FEEDER', name: 'Sandpoint', state: 'ID', minutes: 90, bearing: 40, note: 'A lake and ski town with an arts reputation and a small scene of its own.', bands: 1 },
    { id: 'pullman', kind: 'PEER', name: 'Pullman and Moscow', state: 'WA', minutes: 85, bearing: 175, scene: 1500, note: 'Two twin university towns across the Idaho line; crowds trade both ways on the college calendar.' },
    { id: 'tri-cities', kind: 'PEER', name: 'the Tri-Cities', minutes: 140, bearing: 190, slug: 'kennewick-wa', note: 'A desert metro of agriculture and nuclear work; trades some bands.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The brick core on the south bank of the river: mid-sized rooms with bars, vacant storefronts and basements, rents climbing on the best blocks.' },
    { id: 'east-central', name: 'East Central and the Sprague corridor', route: 'work-side', note: 'The working-class east side south of the river: old houses with basements, antiques and bars on Sprague, being priced up.' },
    { id: 'brownes-addition', name: 'Browne\'s Addition', route: 'old-side', note: 'Huge old mansions cut into apartments west of downtown; renters, big rooms for house shows, and noise complaints.' },
    { id: 'west-central', name: 'West Central', route: 'work-side', note: 'The modest, cheap north-bank neighborhood across the river; the new condo bluff beside it is priced out of shows.' },
    { id: 'hillyard', name: 'Hillyard', route: 'work-side', note: 'A former railroad town in the northeast corner with old rail-worker houses and a rough reputation; cheap and murals.' },
    { id: 'north-bank', name: 'Logan and the north-bank university area', route: 'campus', note: 'Student rentals and older houses by the Jesuit university; house shows draw noise complaints from neighbors.' },
    { id: 'south-hill', name: 'the South Hill', route: 'old-side', note: 'The big residential plateau south of downtown: grand old houses and ordinary middle-class streets; real basements, but priced up.' },
    { id: 'the-valley', name: 'the Valley', route: 'campus', note: 'Strip malls, light industry and chain restaurants east of Havana Street; shop rooms, halls and carports for shows.' }
  ],

  contacts: ['missoula-mt', 'boise-id', 'bozeman-mt', 'yakima-wa'],

  points: [
    { name: 'Missoula', state: 'MT', lat: 46.87, lon: -113.99, pop: 75000 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33, pop: 750000 },
    { name: 'Wenatchee', state: 'WA', lat: 47.42, lon: -120.31, pop: 35000 },
    { name: 'Lewiston', state: 'ID', lat: 46.42, lon: -117.02, pop: 34000 }
  ],
  roads: ['I-90', 'US 2', 'US 395', 'US 195', 'Division Street'],

  words: {
    street: ['Division Street', 'Sprague Avenue', 'Monroe Street', 'Hamilton Street', 'Market Street', 'Havana Street', 'Sunset Boulevard'],
    water: ['the Spokane River', 'Latah Creek', 'the falls', 'Medical Lake'],
    hood: ['Browne\'s Addition', 'Hillyard', 'East Central', 'West Central', 'Peaceful Valley', 'the South Hill', 'Logan', 'the Valley', 'the Y'],
    thing: ['basement', 'espresso stand', 'wildfire smoke', 'pickup truck', 'huckleberry', 'woodstove', 'chains', 'fellowship hall', 'practice space'],
    weather: ['smoke season', 'hard freeze', 'pass closure']
  }
});
