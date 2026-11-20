SB.Cities.register('flint-mi', {
  v: 1,
  slug: 'flint-mi',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['general motors', 'buick', 'buick city', 'chevrolet', 'ac spark plug', 'fisher body', 'uaw', 'back to the bricks', 'the crim', 'crim',
           'um-flint', 'university of michigan-flint', 'university of michigan', 'kettering university', 'mott community college', 'michigan state', 'central michigan',
           'detroit lions', 'detroit pistons', 'detroit tigers', 'firebirds', 'mlive', 'faygo', 'vernors', 'vfw', 'american legion', 'knights of columbus',
           'local 40 annex', 'the sit-down room', 'carriage house social', 'dort street garage', 'the party store back room', 'chevy flats', 'crooked elm hall',
           'north end lot', 'the spark plug room', 'kearsley basement', 'longway unit b', 'the coney annex'],
  /* The dossier's twelve invented venue names are in banned: research, not content, unchecked. The water crisis is written only as 'the water'. */
  blocklist: ['general motors*', 'buick*', 'chevrolet*', 'ac spark plug*', 'back to the bricks*', 'faygo*', 'mlive*', 'kettering university*'],

  blurb: ['A scene held together by one stubborn all-ages club that keeps changing buildings. The crowd is loyal and the pits are policed.',
          'Reunion shows for old local bands draw more than any touring act, and benefit bills are a regular kind of night.'],
  hard: 'One strict all-ages room; the heavier bands have nowhere else to go',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05 },
    { name: 'Ann Arbor', state: 'MI', lat: 42.28, lon: -83.74 },
    { name: 'Grand Rapids', state: 'MI', lat: 42.96, lon: -85.67 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Flint' },
    { id: 'grand-blanc', kind: 'FEEDER', name: 'Grand Blanc', minutes: 15, bearing: 170, note: 'A prosperous suburb to the south; kids with cars and gear, and some basement bands.' },
    { id: 'davison', kind: 'FEEDER', name: 'Davison', minutes: 15, bearing: 50, note: 'A working-class exurb to the northeast; few shows of its own.' },
    { id: 'flushing', kind: 'FEEDER', name: 'Flushing', minutes: 15, bearing: 285, note: 'A river suburb to the west with a small scene.' },
    { id: 'fenton', kind: 'FEEDER', name: 'Fenton', minutes: 20, bearing: 155, note: 'A small, affluent lake town with pop-punk and garage kids.' },
    { id: 'swartz-creek', kind: 'FEEDER', name: 'Swartz Creek and Durand', minutes: 20, bearing: 260, note: 'Suburb and railroad town out I-69.' },
    { id: 'lapeer', kind: 'FEEDER', name: 'Lapeer', minutes: 30, bearing: 100, note: 'A farm and county-seat town with some metal and punk.' },
    { id: 'frankenmuth', kind: 'FEEDER', name: 'Frankenmuth', minutes: 35, bearing: 345, note: 'A tourist town with few shows; its kids drive in.' },
    { id: 'owosso', kind: 'FEEDER', name: 'Owosso', minutes: 40, bearing: 265, note: 'A small manufacturing town with a small scene.' },
    { id: 'caro', kind: 'FEEDER', name: 'Caro', minutes: 45, bearing: 40, note: 'A farm town in the Thumb; likely no scene, kids come to Flint.' },
    { id: 'bay-city', kind: 'FEEDER', name: 'Bay City and Midland', minutes: 55, bearing: 350, note: 'A port town and a chemical town to the north; Bay City has bills of its own.' },
    { id: 'saginaw', kind: 'PEER', name: 'Saginaw', minutes: 40, bearing: 345, scene: 700, note: 'Smaller, rougher, the same decline; the same town with fewer rooms.' },
    { id: 'lansing', kind: 'PEER', name: 'Lansing', minutes: 60, bearing: 265, slug: 'lansing-mi', note: 'The capital and a big university next door; more shows and more money.' },
    { id: 'toledo', kind: 'PEER', name: 'Toledo', state: 'OH', minutes: 100, bearing: 165, slug: 'toledo-oh', note: 'A fellow factory town down US 23.' },
    { id: 'kalamazoo', kind: 'PEER', name: 'Kalamazoo', minutes: 135, bearing: 255, slug: 'kalamazoo-mi', note: 'A college city at the far edge of a day trip.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'A slowly reviving core of a market, restaurants and lofts by the river; arts rooms more than true DIY.' },
    { id: 'carriage-town', name: 'Carriage Town', route: 'old-side', note: 'Old Victorians, carriage houses and brick industrial buildings by the rail yard; where artists and cheap warehouse space gathered.' },
    { id: 'cultural-center', name: 'the cultural center east of downtown', route: 'campus', note: 'Museums, a community college and an auditorium; good for sanctioned all-ages nights, poor for DIY.' },
    { id: 'northside', name: 'the north side', route: 'work-side', note: 'Block after block of vacant lots and surviving bungalows; cheap, ignored and loud-tolerant, with real safety worries.' },
    { id: 'eastside', name: 'the east side', route: 'work-side', note: 'Working-class bungalows, strip malls and party stores along Dort Highway; hall and church-basement territory.' },
    { id: 'mott-park', name: 'Mott Park and the west side', route: 'old-side', note: 'An older, intact neighborhood of homeowners and students; backyard and basement shows, and neighbors who call.' },
    { id: 'south-side', name: 'the south side toward Grand Blanc', route: 'campus', note: 'Poor blocks by the city line giving way to richer suburbs; where suburban kids begin.' },
    { id: 'inner-ring', name: 'Flint Township, Burton and Mount Morris', route: 'campus', note: 'Strip malls, posts, church halls and garages; where many suburban all-ages shows really happen.' }
  ],

  contacts: ['lansing-mi', 'toledo-oh', 'ann-arbor-mi', 'kalamazoo-mi'],

  points: [
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05, pop: 640000 },
    { name: 'Port Huron', state: 'MI', lat: 42.97, lon: -82.43, pop: 30000 },
    { name: 'Mount Pleasant', state: 'MI', lat: 43.60, lon: -84.77, pop: 26000 },
    { name: 'Jackson', state: 'MI', lat: 42.25, lon: -84.40, pop: 31000 }
  ],
  roads: ['I-75', 'I-69', 'I-475', 'US 23', 'M-21'],

  words: {
    street: ['Saginaw Street', 'Dort Highway', 'Court Street', 'Corunna Road', 'Fenton Road', 'Bristol Road'],
    water: ['the Flint River', 'Swartz Creek', 'Thread Lake'],
    hood: ['Carriage Town', 'Grand Traverse', 'Mott Park', 'Civic Park', 'Beecher', 'Flint Township'],
    thing: ['party store', 'coney', 'vacant lot', 'furnace', 'storm door', 'pop', 'land bank', 'no-moshing sign', 'reunion show', 'benefit bill'],
    weather: ['lake-effect snow', 'ice storm', 'road salt']
  }
});
