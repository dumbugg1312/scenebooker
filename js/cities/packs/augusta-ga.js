SB.Cities.register('augusta-ga', {
  v: 1,
  slug: 'augusta-ga',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['fort gordon', 'fort eisenhower', 'augusta university', 'savannah river site', 'georgia cyber center', 'augusta chronicle', 'metro spirit', 'augusta today',
           'augusta press', 'augusta business daily', 'wacg', 'the masters', 'masters tournament', 'masters week', 'augusta technical college', 'paine college', 'usc aiken',
           'georgia southern', 'arts in the heart', 'westobou', 'mayfest', 'augusta futurity', 'columbia county fair', 'pedal pub', 'richmond county sheriff', 'plant vogtle',
           'waffle house', 'cook out', 'cheerwine', 'greyhound', 'georgia public broadcasting', 'morris communications', 'beasley', 'vfw', 'american legion', 'gamecock', 'bulldog',
           'lamar street social hall', 'hawk\'s gully hall', 'sand hills rec room', 'the eleventh street garage', 'pinch gut pavilion', 'locks and dams room', 'the fellowship annex',
           'savannah bluff skate hall', 'peach orchard carport', 'the cotton lot', 'wheeler road tool and die', 'thirteenth bridge social club'],
  /* Banned holds the dossier's real institutions and its invented venue names (unchecked). The golf tournament is written only as 'golf week'. */
  blocklist: ['augusta chronicle*', 'metro spirit*', 'waffle house*', 'cook out*', 'fort gordon*', 'westobou*', 'arts in the heart*', 'pedal pub*'],

  blurb: ['A Savannah River city built around an Army post and one golf week in April. Bars will not take the kids, and the last all-ages room folded for lack of a crowd.',
          'A record store carries the heavy nights now, and teenagers drive an hour to Athens or Columbia.'],
  hard: 'Few all-ages rooms, and the bars gate the kids out.',
  region: 'the Savannah River valley',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 },
    { name: 'Charleston', state: 'SC', lat: 32.78, lon: -79.93 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Augusta' },
    { id: 'north-augusta', kind: 'FEEDER', name: 'North Augusta', state: 'SC', minutes: 15, bearing: 70, scene: 100, note: 'A suburb across the river; kids cross the bridge freely.' },
    { id: 'grovetown', kind: 'FEEDER', name: 'Grovetown', minutes: 20, bearing: 280, note: 'A fast-growing base and commuter suburb with skate-punk teenagers.' },
    { id: 'hephzibah', kind: 'FEEDER', name: 'Hephzibah', minutes: 20, bearing: 200, note: 'A small, cheap, working-class town to the south.' },
    { id: 'harlem', kind: 'FEEDER', name: 'Harlem', minutes: 25, bearing: 285, note: 'A small farm and suburb town on I-20.' },
    { id: 'aiken', kind: 'FEEDER', name: 'Aiken', state: 'SC', minutes: 30, bearing: 125, note: 'Horse country and a small campus; a small scene whose kids come to Augusta.', bands: 1 },
    { id: 'edgefield', kind: 'FEEDER', name: 'Edgefield', state: 'SC', minutes: 35, bearing: 35, note: 'Pottery and peach country; teens drive over.' },
    { id: 'thomson', kind: 'FEEDER', name: 'Thomson', minutes: 40, bearing: 275, note: 'A mill and farm county seat, first big exit toward Atlanta.' },
    { id: 'waynesboro', kind: 'FEEDER', name: 'Waynesboro', minutes: 45, bearing: 175, note: 'A farm county seat; kids make the drive for shows.' },
    { id: 'louisville', kind: 'FEEDER', name: 'Louisville', minutes: 50, bearing: 205, note: 'A very small old farm town.' },
    { id: 'barnwell', kind: 'FEEDER', name: 'Barnwell', state: 'SC', minutes: 55, bearing: 150, note: 'A rural town beside the nuclear site across the river.' },
    { id: 'columbia', kind: 'PEER', name: 'Columbia', state: 'SC', minutes: 75, bearing: 75, slug: 'columbia-sc', note: 'The bigger, more serious scene up I-20; most bands play both in one run.' },
    { id: 'athens', kind: 'PEER', name: 'Athens', minutes: 80, bearing: 305, slug: 'athens-ga', note: 'The famous music town, where Augusta kids go to be where the thing is.' },
    { id: 'savannah', kind: 'PEER', name: 'Savannah', minutes: 140, bearing: 140, slug: 'savannah-ga', note: 'A port and art-school city with a different, coastal feel.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Broad Street', route: 'downtown', note: 'The river-side bar strip, torn up by a long street project; the likeliest place for a room and for it to be shut down.' },
    { id: 'olde-town', name: 'Olde Town', route: 'old-side', note: 'Old houses and porches north of Broad Street, gentrifying but patchy, with some of the best cheap old-house rent.' },
    { id: 'the-hill', name: 'Summerville and the Hill', route: 'campus', note: 'Big old houses near the medical campus on the ridge; student rentals and campus rooms.' },
    { id: 'harrisburg', name: 'Harrisburg and Laney-Walker', route: 'work-side', note: 'Old brick blocks, warehouses and church halls east of downtown; a real neighborhood being redeveloped, not an empty frontier.' },
    { id: 'washington-road', name: 'Washington Road, Evans and Martinez', route: 'campus', note: 'The wealthy, fast-growing suburbs where many band kids live: garages, strip units and church youth rooms.' },
    { id: 'gordon-highway', name: 'Gordon Highway and Grovetown', route: 'work-side', note: 'Motels, pawn shops and flex units on the road to the base; soldiers, cheap rent and a lot of attention from the licensing board.' },
    { id: 'south-augusta', name: 'south Augusta', route: 'work-side', note: 'Cheap, working-class and busy with cars along Deans Bridge Road; garages, carports and skate spots.' },
    { id: 'north-augusta-hood', name: 'North Augusta across the river', route: 'town:north-augusta', note: 'A growing riverfront suburb in another state, with a different sheriff and different alcohol rules.' }
  ],

  contacts: ['columbia-sc', 'athens-ga', 'savannah-ga'],

  points: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 500000 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 900000 },
    { name: 'Greenville', state: 'SC', lat: 34.85, lon: -82.4, pop: 70000 },
    { name: 'Charleston', state: 'SC', lat: 32.78, lon: -79.93, pop: 150000 },
    { name: 'Macon', state: 'GA', lat: 32.84, lon: -83.63, pop: 157000 }
  ],
  roads: ['I-20', 'I-520', 'Gordon Highway', 'Deans Bridge Road', 'Washington Road', 'US 25'],

  words: {
    street: ['Broad Street', 'Walton Way', 'Gordon Highway', 'Deans Bridge Road', 'Washington Road', 'Wrightsboro Road', 'Wheeler Road', 'Telfair Street'],
    water: ['the Savannah River', 'the Augusta Canal', 'Butler Creek', 'Lake Thurmond'],
    hood: ['Olde Town', 'Pinch Gut', 'Summerville', 'Harrisburg', 'Laney-Walker', 'Hephzibah', 'Evans', 'Martinez', 'Grovetown'],
    thing: ['carport', 'pecan grove', 'pollen', 'boiled peanuts', 'hash and rice', 'red clay', 'mill village', 'pimento cheese', 'record store', 'wristband', 'all-ages room'],
    weather: ['pollen week', 'afternoon thunderstorm', 'tropical storm remnant']
  }
});
