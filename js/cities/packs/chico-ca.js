SB.Cities.register('chico-ca', {
  v: 1,
  slug: 'chico-ca',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['cal state chico', 'california state university, chico', 'chico state', 'csuc', 'wildcats', 'butte college', 'enterprise-record', 'chico enterprise-record',
           'chico news & review', 'news & review', 'the orion', 'kcsc', 'kzfr', 'kzap', 'kpay', 'sierra nevada', 'camp fire', 'park fire', 'pioneer days',
           'wildflower century', 'queen bee festival', 'oktobeefest', 'olive festival', 'ghost ship', 'wallywood', 'b-line', 'coast starlight', 'amtrak',
           'walmart', 'medianews group', 'the huller', 'tule fog annex', 'sandy gulch hall', 'esplanade carport', 'walnut row house', 'nord avenue granary',
           'lindo channel garage', 'the orchard shed', 'bear hole social club', 'skyway quonset', 'park avenue pump room', 'hundred-degree room'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Camp Fire is written only as 'the fire'. */
  blocklist: ['sierra nevada*', 'chico news*', 'enterprise-record*', 'pioneer days*', 'wildflower century*', 'wallywood*'],

  blurb: ['A campus town where a loose booking crew keeps all-ages, sober punk alive on five-dollar doors. Rooms come and go, but the kids keep starting bands.',
          'Summer empties the house shows and fire season fills the sky with smoke.'],
  hard: 'All-ages rooms keep closing, students turn over, and smoke kills whole weekends.',
  region: 'the Valley',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Chico' },
    { id: 'durham', kind: 'FEEDER', name: 'Durham', minutes: 15, bearing: 200, note: 'A farm town close enough to count as part of Chico.' },
    { id: 'forest-ranch', kind: 'FEEDER', name: 'Forest Ranch and the canyon', minutes: 20, bearing: 50, note: 'Wooded foothill roads; kids with long, twisty drives home.' },
    { id: 'paradise', kind: 'FEEDER', name: 'Paradise and Magalia', minutes: 25, bearing: 75, note: 'The ridge towns, rebuilt and tight-knit; many of their kids now live in Chico.' },
    { id: 'oroville', kind: 'FEEDER', name: 'Oroville', minutes: 30, bearing: 165, note: 'The county seat to the south; its kids come north because their town has nothing.' },
    { id: 'gridley', kind: 'FEEDER', name: 'Gridley and Biggs', minutes: 30, bearing: 190, note: 'Rice and orchard towns down the highway, very small.' },
    { id: 'orland', kind: 'FEEDER', name: 'Orland', minutes: 30, bearing: 275, note: 'A farm town out toward the interstate.' },
    { id: 'willows', kind: 'FEEDER', name: 'Willows', minutes: 40, bearing: 270, note: 'A farm and government town, tiny scene.' },
    { id: 'corning', kind: 'FEEDER', name: 'Corning', minutes: 40, bearing: 310, note: 'Olive and orchard country, tiny scene.' },
    { id: 'red-bluff', kind: 'FEEDER', name: 'Red Bluff', minutes: 45, bearing: 330, note: 'A river and rodeo town with a few punk and metal kids.', bands: 1 },
    { id: 'yuba-city', kind: 'PEER', name: 'Yuba City', minutes: 60, bearing: 185, scene: 700, note: 'Flat farmland south on the highway; kids drive up for shows.' },
    { id: 'redding', kind: 'PEER', name: 'Redding', minutes: 75, bearing: 350, scene: 600, note: 'Hotter and more conservative; its bands drive down because it has fewer rooms.' },
    { id: 'davis', kind: 'PEER', name: 'Davis', minutes: 90, bearing: 200, scene: 1200, note: 'The other California college town: richer, with a known house-show scene.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The original grid around the plaza: bars, a theater and a Thursday market. Licensed 21-plus rooms and little else.' },
    { id: 'south-campus', name: 'South Campus', route: 'campus', note: 'Packed student rentals with big yards and carports. Where house shows live, and where police and neighbors push back.' },
    { id: 'avenues', name: 'the Avenues', route: 'old-side', note: 'Shaded old bungalows split into rentals near the park. Backyard shows, until a neighbor calls.' },
    { id: 'barber', name: 'Barber and the southside', route: 'work-side', note: 'Old rail-line streets, warehouses and auto shops. The best bet for a room with a loading door, and it is heating up.' },
    { id: 'chapmantown', name: 'Chapmantown', route: 'work-side', note: 'A lower-income west side with big lots and backyards. Cheaper houses for bands that cannot pay student rent.' },
    { id: 'east-side', name: 'the East 20th strip', route: 'work-side', note: 'A half-empty mall and strip malls with vacant storefronts and a few practice spaces.' },
    { id: 'nord', name: 'Nord Avenue and the north fringe', route: 'old-side', note: 'Orchard lots and farmhouses where the noise carries and the neighbors are far.' }
  ],

  contacts: ['reno-nv', 'modesto-ca', 'santa-rosa-ca'],

  points: [
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49, pop: 520000 },
    { name: 'Redding', state: 'CA', lat: 40.59, lon: -122.39, pop: 94000 },
    { name: 'Davis', state: 'CA', lat: 38.54, lon: -121.74, pop: 66000 },
    { name: 'Medford', state: 'OR', lat: 42.33, lon: -122.87, pop: 85000 },
    { name: 'Eureka', state: 'CA', lat: 40.8, lon: -124.16, pop: 27000 }
  ],
  roads: ['SR 99', 'SR 32', 'I-5', 'SR 70', 'the Skyway'],

  words: {
    street: ['the Esplanade', 'Nord Avenue', 'Park Avenue', 'Mangrove', 'the Skyway', 'East 20th'],
    water: ['Big Chico Creek', 'Lindo Channel', 'Sandy Gulch', 'the Sacramento River'],
    hood: ['South Campus', 'Barber', 'Chapmantown', 'the Avenues', 'Forest Ranch', 'Bidwell Park'],
    thing: ['almond huller', 'walnut orchard', 'tri-tip', 'taqueria', 'swimming hole', 'cruiser bike', 'punk house', 'pizza parlor', 'record store room', 'campus radio'],
    weather: ['tule fog', 'smoke day', 'triple digits']
  }
});
