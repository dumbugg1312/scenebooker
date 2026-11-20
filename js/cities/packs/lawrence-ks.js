SB.Cities.register('lawrence-ks', {
  v: 1,
  slug: 'lawrence-ks',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of kansas', 'haskell indian nations university', 'haskell', 'kansas relays', 'ku on wheels', 'kjhk', 'kanu', 'lawrence journal-world', 'university daily kansan',
           'kansas city star', 'busch light', 'coors', 'kansas city chiefs', 'kansas city royals', 'jayhawks', 'k-state', 'kansas state university', 'university of missouri', 'mizzou',
           'fort riley', 'prairie band potawatomi', 'warehouse arts district', 'rock chalk', 'final four', 'vfw', 'american legion', 'eagles lodge',
           'the limestone annex', 'burcham street hall', 'haw street garage', 'the dutch elm room', 'sunflower cellar', 'kaw bottoms annex', 'vermont street loft',
           'the lecompton room', 'quarry hall', 'delaware street garage', 'pawnee basement', 'wakarusa hall'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['university of kansas*', 'haskell*', 'kansas relays*', 'lawrence journal*', 'university daily*', 'jayhawk*', 'kjhk*'],

  blurb: ['A college town under a ridge called the Hill, where the crowd graduates every four years and the basement scene starts over each fall.',
          'Forty minutes from Kansas City, so bands play one night here or skip it. Downtown bars are the ceiling; houses and East Lawrence rooms are the floor.'],
  hard: 'The crowd and the organizers graduate, summers are empty, and landlords keep selling.',
  region: 'the Plains',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Kansas City', state: 'MO', lat: 39.1, lon: -94.58 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Lawrence' },
    { id: 'lecompton', kind: 'FEEDER', name: 'Lecompton', minutes: 10, bearing: 290, note: 'A historic hamlet to the west; a few kids at most.' },
    { id: 'eudora', kind: 'FEEDER', name: 'Eudora', minutes: 15, bearing: 90, note: 'A bedroom town on K-10; kids come to Lawrence for everything.' },
    { id: 'tonganoxie', kind: 'FEEDER', name: 'Tonganoxie', minutes: 20, bearing: 60, note: 'A commuter town toward Kansas City; its kids drive to shows.' },
    { id: 'baldwin-city', kind: 'FEEDER', name: 'Baldwin City', minutes: 25, bearing: 190, note: 'A small college town with a handful of kids.' },
    { id: 'perry', kind: 'FEEDER', name: 'Perry and Oskaloosa', minutes: 25, bearing: 335, note: 'Lake and farm towns north; teenage bands who drive in on weekends.' },
    { id: 'johnson-county', kind: 'FEEDER', name: 'Shawnee and Olathe', minutes: 40, bearing: 85, pop: 130000, note: 'Big affluent suburbs: kids with cars and money who think of Lawrence as the cool town.' },
    { id: 'ottawa', kind: 'FEEDER', name: 'Ottawa', minutes: 40, bearing: 190, note: 'A small college and farm town down US 59 with its own small scene.' },
    { id: 'leavenworth', kind: 'FEEDER', name: 'Leavenworth', minutes: 50, bearing: 45, note: 'An army and prison river town; some DIY.' },
    { id: 'topeka', kind: 'FEEDER', name: 'Topeka', minutes: 30, bearing: 265, scene: 900, note: 'The cheaper, duller capital to the west; its kids look to Lawrence.' },
    { id: 'manhattan', kind: 'PEER', name: 'Manhattan', minutes: 70, bearing: 285, scene: 700, note: 'A university town and old sports rival; the trade runs mostly toward Lawrence.' },
    { id: 'columbia', kind: 'PEER', name: 'Columbia', state: 'MO', minutes: 135, bearing: 95, slug: 'columbia-mo', note: 'A sibling university town two hours east on I-70.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Massachusetts Street', route: 'downtown', note: 'Bars, shops and the main touring rooms; stable and expensive, the place DIY bands graduate to.' },
    { id: 'east-lawrence', name: 'East Lawrence', route: 'old-side', note: 'Small frame houses, rail-side warehouses and studios; longtime residents, artists and bartenders. The heart of the house and warehouse shows.' },
    { id: 'oread', name: 'Oread', route: 'campus', note: 'Old houses cut into student rentals around the Hill, most heavily policed and being rebuilt as luxury student apartments.' },
    { id: 'old-west', name: 'Old West Lawrence', route: 'old-side', note: 'Big old houses with stone basements, many of them rentals; steady and expensive, and owner-occupied streets complain.' },
    { id: 'north-lawrence', name: 'North Lawrence', route: 'work-side', note: 'Across the river: cheap, flood-prone, with warehouses, rail and farm-supply buildings.' },
    { id: 'south-lawrence', name: 'South Lawrence and 23rd Street', route: 'work-side', note: 'Strip malls, duplexes and service workers; cheap apartments and a few practice units.' },
    { id: 'west-lawrence', name: 'West Lawrence', route: 'campus', note: 'Newer subdivisions along Iowa Street where the parents live; garages and finished basements, no rooms.' },
    { id: 'brook-creek', name: 'Brook Creek and the middle neighborhoods', route: 'old-side', note: 'Older small-lot houses east and south of downtown; where many band members actually live.' }
  ],

  contacts: ['columbia-mo', 'wichita-ks', 'springfield-mo'],

  points: [
    { name: 'Kansas City', state: 'MO', lat: 39.1, lon: -94.58, pop: 2200000 },
    { name: 'Topeka', state: 'KS', lat: 39.05, lon: -95.68, pop: 125000 },
    { name: 'Manhattan', state: 'KS', lat: 39.18, lon: -96.57, pop: 54000 },
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93, pop: 970000 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.2, pop: 2800000 }
  ],
  roads: ['I-70', 'K-10', 'US 59', 'US 40', 'US 24', 'the Kansas Turnpike'],

  words: {
    street: ['Massachusetts Street', 'Iowa Street', 'Vermont Street', 'Sixth Street', 'Ninth Street', '23rd Street', 'Clinton Parkway'],
    water: ['the Kaw', 'the Wakarusa', 'Clinton Lake'],
    hood: ['East Lawrence', 'North Lawrence', 'Oread', 'Old West Lawrence', 'Pinckney', 'Brook Creek', 'Barker', 'Hillcrest'],
    thing: ['burnt ends', 'stone basement', 'porch couch', 'the Hill', 'moving truck', 'biscuits and gravy', 'moving curb', 'student radio', 'shelter corner', 'one-stair basement', 'moving curb', 'student radio', 'shelter corner', 'one-stair basement'],
    weather: ['tornado watch', 'ice storm', 'Kaw flood']
  }
});
