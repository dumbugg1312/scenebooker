SB.Cities.register('kennewick-wa', {
  v: 1,
  slug: 'kennewick-wa',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['hanford', 'hanford site', 'pacific northwest national laboratory', 'tri-city herald', 'tri city herald', 'kndu', 'kepr', 'northwest public radio',
           'ben franklin transit', 'tri-city americans', 'toyota center', 'columbia basin college', 'washington state university', 'wsu', 'tri-cities campus',
           'columbia center mall', 'vista field', 'taco time', 'amtrak', 'empire builder', 'water follies', 'hydroplane races', 'unlimited hydroplane',
           'benton franklin fair', 'kennewick man', 'uber', 'mount st. helens',
           'sagebrush grange hall', 'the blue span annex', 'blue span annex', 'ninth avenue carport', 'irrigation ditch room', 'basalt records & repair',
           'basalt records', 'the net shed', 'ridge road pole barn', 'desert rose roller rink', 'columbia dry dock hall', 'the wye room',
           'lamplight mattress outlet', 'fairgrounds building c'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The nuclear site is written only as 'the site' or 'the cleanup'. */
  blocklist: ['hanford*', 'tri-city herald*', 'tri-city americans*', 'taco time*', 'columbia basin college*', 'water follies*', 'northwest public radio*', 'kennewick man*'],

  blurb: ['The biggest of three river cities where the Columbia, Snake and Yakima meet, all wide arterials, hot wind and steady contractor paychecks from the nuclear cleanup.',
          'Every show is a ride problem. Summer heat and wind push things into garages, halls and backyards, and the river bridges are the real border.'],
  hard: 'Off every tour route, and nobody gets to a show without a ride.',
  region: 'the Northwest',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Spokane', state: 'WA', lat: 47.66, lon: -117.43 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Boise', state: 'ID', lat: 43.62, lon: -116.2 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Kennewick' },
    { id: 'pasco', kind: 'FEEDER', name: 'Pasco', minutes: 10, bearing: 20, note: 'Across the river: young, mostly Latino and growing, with cheaper warehouse space.' },
    { id: 'richland', kind: 'FEEDER', name: 'Richland', minutes: 10, bearing: 310, note: 'The orderly, affluent third city with a branch campus and a skatepark.' },
    { id: 'west-richland', kind: 'FEEDER', name: 'West Richland', minutes: 15, bearing: 295, note: 'A commuter suburb of Richland with no scene of its own.' },
    { id: 'benton-city', kind: 'FEEDER', name: 'Benton City', minutes: 25, bearing: 295, note: 'A small farm and wine town up the Yakima; a few kids drive in.' },
    { id: 'prosser', kind: 'FEEDER', name: 'Prosser', minutes: 35, bearing: 270, note: 'An agricultural county seat; a handful of kids and one or two garages.' },
    { id: 'hermiston', kind: 'FEEDER', name: 'Hermiston', state: 'OR', minutes: 35, bearing: 185, note: 'A farm and logistics town across the river in Oregon; its kids cross for a bigger show.' },
    { id: 'sunnyside', kind: 'FEEDER', name: 'Sunnyside and Grandview', minutes: 50, bearing: 275, note: 'Young, mostly Latino farm towns down I-82.' },
    { id: 'othello', kind: 'FEEDER', name: 'Othello', minutes: 50, bearing: 5, note: 'A young potato-processing town to the north.' },
    { id: 'walla-walla', kind: 'FEEDER', name: 'Walla Walla', minutes: 60, bearing: 100, note: 'A wine town with two colleges and a real college music scene; a swap partner as much as a feeder.' },
    { id: 'yakima', kind: 'PEER', name: 'Yakima', minutes: 75, bearing: 290, slug: 'yakima-wa', note: 'Almost the same size, up I-82; a revived downtown and the closest equal.' },
    { id: 'spokane', kind: 'PEER', name: 'Spokane', minutes: 140, bearing: 40, slug: 'spokane-wa', note: 'Much bigger, with the nearest real punk scene; the next step up.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Kennewick', route: 'downtown', note: 'The old core by the river: low brick buildings, empty storefronts and slowly rising rents.' },
    { id: 'columbia-drive', name: 'Columbia Drive and the riverfront', route: 'work-side', note: 'Light industrial units and old motels turning into wine and artisan projects; getting pricier.' },
    { id: 'vista', name: 'Vista and the arena district', route: 'campus', note: 'New construction on a closed airfield beside the hockey arena; big-crowd traffic, little room for shows.' },
    { id: 'columbia-center', name: 'the Columbia Center strip', route: 'work-side', note: 'The mall and big-box strips, where kids hang out and vacant suites come up.' },
    { id: 'old-kennewick', name: 'central Kennewick', route: 'old-side', note: 'Mid-century bungalows with detached garages; the likeliest home of backyard shows.' },
    { id: 'southridge', name: 'Southridge', route: 'campus', note: 'New tract sprawl on the ridge: families and finished basements, more cars than rooms.' },
    { id: 'west-kennewick', name: 'the golf-course tracts', route: 'campus', note: 'Pricey, quiet planned housing; nobody wants a drum kit here.' }
  ],

  contacts: ['yakima-wa', 'spokane-wa'],

  points: [
    { name: 'Yakima', state: 'WA', lat: 46.6, lon: -120.51, pop: 250000 },
    { name: 'Spokane', state: 'WA', lat: 47.66, lon: -117.43, pop: 590000 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33, pop: 4000000 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68, pop: 2500000 }
  ],
  roads: ['I-82', 'US 395', 'SR 240', 'I-182', 'I-84', 'US 12'],

  words: {
    street: ['Columbia Drive', 'Clearwater Avenue', 'Highway 395', 'Highway 240'],
    water: ['the Columbia', 'the Snake', 'the Yakima', 'the Blue Bridge', 'the Cable Bridge'],
    hood: ['Southridge', 'Vista', 'Clover Island', 'Canyon Lakes', 'East Pasco', 'Columbia Park'],
    thing: ['tumbleweed', 'sagebrush', 'tater tots', 'drive-through espresso', 'taqueria', 'carport', 'wind gust', 'tarp', 'strip-mall suite', 'bridge closure'],
    weather: ['hundred-degree afternoon', 'wind advisory', 'dust storm']
  }
});
