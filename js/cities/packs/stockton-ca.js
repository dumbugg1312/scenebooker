SB.Cities.register('stockton-ca', {
  v: 1,
  slug: 'stockton-ca',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['amazon', 'amtrak', 'university of the pacific', 'san joaquin delta college', 'delta college', 'csu stanislaus', 'uc davis', 'uc merced',
           'sac state', 'travis air force base', 'travis afb', 'asparagus festival', 'stockton asparagus festival', 'festival of lights',
           'chinese new year parade', 'altamont corridor express', 'stockton arena', 'banner island ballpark', 'bob hope theatre', 'stockton ports',
           'stockton heat', 'stockton kings', 'san joaquin county fair', 'record searchlight', 'the stockton record', 'the slough street social hall',
           'slough street social hall', 'tule fog annex', 'levee road lodge', 'cannery row unit 9', 'the eight mile barn', 'magnolia carport',
           'hammer lane storage row', 'the weber flats garage', 'port road warehouse 14', 'the lumpia room', 'crosstown underpass',
           'charter way swap lot'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real institutions appear only as generic phrases in game text. */
  blocklist: ['university of the pacific*', 'bob hope theatre*', 'stockton ports*', 'stockton heat*', 'asparagus festival*'],

  blurb: ['Stockton shows live in garages and rented halls, scattered across a flat town where everyone drives.',
          'Bands pass through between the Bay and Sacramento, and the best locals drift off to both.'],
  hard: 'Spread-out town, few rooms, and the best locals drift to the Bay.',
  region: 'the Valley',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49 },
    { name: 'Oakland', state: 'CA', lat: 37.80, lon: -122.27 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'San Jose', state: 'CA', lat: 37.34, lon: -121.89 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Stockton' },
    { id: 'lathrop', kind: 'FEEDER', name: 'Lathrop', minutes: 15, bearing: 165, note: 'New tracts and warehouse sprawl; in effect a Stockton annex.' },
    { id: 'lodi', kind: 'FEEDER', name: 'Lodi', minutes: 25, bearing: 355, note: 'A wine and farm town with a small teen scene and a standing rivalry with Stockton.', bands: 2 },
    { id: 'manteca', kind: 'FEEDER', name: 'Manteca', minutes: 25, bearing: 155, note: 'A commuter suburb of big tract homes and garage bands.' },
    { id: 'tracy', kind: 'FEEDER', name: 'Tracy', minutes: 35, bearing: 215, note: 'A logistics and Bay-commuter town; kids drive to Stockton or the Bay.' },
    { id: 'galt', kind: 'FEEDER', name: 'Galt', minutes: 35, bearing: 20, note: 'A small farm town; its kids go to Sacramento more than Stockton.' },
    { id: 'ripon', kind: 'FEEDER', name: 'Ripon and Escalon', minutes: 35, bearing: 140, note: 'Almond, dairy and church country: a few kids with a band and a trailer.' },
    { id: 'oakdale', kind: 'FEEDER', name: 'Oakdale and Riverbank', minutes: 40, bearing: 100, note: 'Cowboy and farm towns where punks are rare and loyal.' },
    { id: 'antioch', kind: 'FEEDER', name: 'Antioch and Brentwood', minutes: 50, bearing: 245, note: 'Bay-edge suburbs; kids go either to Stockton or into the East Bay.' },
    { id: 'rio-vista', kind: 'FEEDER', name: 'Rio Vista and the Delta towns', minutes: 55, bearing: 305, note: 'Tiny river and levee towns: boating and retirees.' },
    { id: 'modesto', kind: 'PEER', name: 'Modesto', minutes: 45, bearing: 160, slug: 'modesto-ca', note: 'The closest peer: the same town with a different chip on its shoulder. Bands and crowds trade all the time.' },
    { id: 'merced', kind: 'PEER', name: 'Merced', minutes: 75, bearing: 150, slug: 'merced-ca', note: 'A farm-valley college town down SR-99.' },
    { id: 'vallejo', kind: 'PEER', name: 'Vallejo', minutes: 75, bearing: 275, slug: 'vallejo-ca', note: 'A Bay-edge port city; occasional crowd trade.' },
    { id: 'fresno', kind: 'PEER', name: 'Fresno', slug: 'fresno', minutes: 105, bearing: 150, scene: 2200, note: 'Bigger but the same Valley kinship; some tours stop at both.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the waterfront', route: 'downtown', note: 'The old center on the channel: government workers by day, dead by night except event nights, slowly being cleaned up.' },
    { id: 'little-manila', name: 'Little Manila and south of downtown', route: 'old-side', note: 'A historic Filipino district and older, poorer blocks with community halls, storefronts and churches.' },
    { id: 'miracle-mile', name: 'the Miracle Mile', route: 'campus', note: 'The old walkable strip of cafes, bars and vintage shops near the university: the closest thing to a scene street.' },
    { id: 'brookside', name: 'the university area and Brookside', route: 'campus', note: 'Leafy streets with big yards and detached garages, students and middle-class families.' },
    { id: 'central-magnolia', name: 'Central and Magnolia', route: 'old-side', note: 'Prewar bungalows with garages, alleys and backyards; cheap, but Bay buyers are arriving.' },
    { id: 'north-stockton', name: 'north Stockton', route: 'work-side', note: 'Safe, boring tract suburbs with a big mall, where teens first play in parents\' garages.' },
    { id: 'weston-ranch', name: 'Weston Ranch', route: 'work-side', note: 'Huge commuter tracts far to the southwest, isolated, with nothing public.' },
    { id: 'port-belt', name: 'the port and industrial belt', route: 'work-side', note: 'Warehouses, rail yards and trucking lots where almost nobody lives; unit shows and generator shows.' }
  ],

  contacts: ['modesto-ca', 'merced-ca', 'vallejo-ca'],

  points: [
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49, pop: 525000 },
    { name: 'Fresno', state: 'CA', lat: 36.74, lon: -119.79, pop: 540000 },
    { name: 'Bakersfield', state: 'CA', lat: 35.37, lon: -119.02, pop: 410000 },
    { name: 'San Jose', state: 'CA', lat: 37.34, lon: -121.89, pop: 1000000 }
  ],
  roads: ['I-5', 'SR-99', 'SR-4', 'I-205', 'SR-120', 'SR-12'],

  words: {
    street: ['Pacific Avenue', 'El Dorado Street', 'Hammer Lane', 'March Lane', 'Charter Way', 'Eight Mile Road', 'Weber Avenue'],
    water: ['the San Joaquin River', 'the Delta', 'the Calaveras River', 'the Stockton Channel'],
    hood: ['Little Manila', 'Miracle Mile', 'Brookside', 'Weston Ranch', 'Lincoln Village', 'Spanos Park', 'Quail Lakes', 'Boggs Tract'],
    thing: ['tule fog', 'swamp cooler', 'levee', 'cannery', 'lumpia', 'almond orchard', 'tract house', 'delta breeze', 'rule sheet', 'group chat', 'backyard', 'hall rental'],
    weather: ['tule fog', 'triple digits', 'smoke season']
  }
});
