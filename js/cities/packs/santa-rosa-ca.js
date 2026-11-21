SB.Cities.register('santa-rosa-ca', {
  v: 1,
  slug: 'santa-rosa-ca',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['the press democrat', 'press democrat', 'north bay bohemian', 'bohemian', 'sonoma county gazette', 'kzst', 'ksro', 'kqsl', 'wine country radio',
           'santa rosa junior college', 'srjc', 'sonoma state university', 'sonoma state', 'university of san francisco', 'empire college', 'cardinal newman',
           'petaluma high', 'smart train', 'tubbs fire', 'kincade fire', 'ghost ship', 'sonoma county fair', 'gravenstein apple fair', 'apple blossom festival',
           'cotati accordion festival', 'egg bowl', 'eggs day', 'petaluma butter', 'butter and eggs', 'luther burbank', 'montgomery village', 'coddingtown',
           'santa rosa plaza', 'hotel la rose', 'joe rodota trail', 'prince memorial greenway', 'travis air force base', 'travis afb', 'keysight', 'kaiser',
           'giants', 'warriors', '49ers', 'nascar', 'indycar', 'graton',
           'the prune dryer', 'prune dryer', 'hop kiln annex', 'the egg candler hall', 'egg candler hall', 'sebastopol road skate & sound', 'sebastopol road skate',
           'laguna pole barn', 'the depot backroom', 'depot backroom', 'fourth street underpass collective', 'roseland feed & fuel', 'roseland feed',
           'piner road unit 7', 'mark west grange', 'the gravel pit rec', 'gravel pit rec', 'montecito carport', 'vfw', 'american legion'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The fire is written only as 'the fire' in game text. */
  blocklist: ['press democrat*', 'north bay bohemian*', 'santa rosa junior*', 'sonoma state*', 'ghost ship*', 'luther burbank*', 'sonoma county fair*', 'kzst*'],

  blurb: ['Wine country with tract-home garages for stages. Everyone drives, and the neighbors have already met the police.',
          'Rebuilt streets mean new neighbors with no patience, and the big city to the south steals the better bills.'],
  hard: 'Garages, no basements, close neighbors, and a big city next door that steals the crowd.',
  region: 'the North Bay',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Oakland', state: 'CA', lat: 37.8, lon: -122.27 },
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Santa Rosa' },
    { id: 'rohnert-park', kind: 'FEEDER', name: 'Rohnert Park and Cotati', minutes: 15, bearing: 175, note: 'The nearest college-town feed: a planned suburb and a plaza town with a campus-driven scene.' },
    { id: 'windsor', kind: 'FEEDER', name: 'Windsor', minutes: 15, bearing: 345, note: 'A well-off commuter suburb with no scene of its own.' },
    { id: 'sebastopol', kind: 'FEEDER', name: 'Sebastopol', minutes: 20, bearing: 260, note: 'A small progressive apple town, hippie flavored; Highway 12 floods at the low spot in winter.' },
    { id: 'healdsburg', kind: 'FEEDER', name: 'Healdsburg', minutes: 25, bearing: 340, note: 'A wine-and-restaurants plaza town; the kids come from the working side.' },
    { id: 'petaluma', kind: 'FEEDER', name: 'Petaluma', minutes: 30, bearing: 170, note: 'Old egg country with its own scene; kids trade back and forth.' },
    { id: 'west-county', kind: 'FEEDER', name: 'Forestville and Guerneville', minutes: 35, bearing: 285, note: 'Redwood river towns; the drive home is dark and winding, and the road floods.' },
    { id: 'sonoma', kind: 'FEEDER', name: 'Sonoma and the Valley of the Moon', minutes: 35, bearing: 130, note: 'A plaza wine town with little scene.' },
    { id: 'cloverdale', kind: 'FEEDER', name: 'Cloverdale', minutes: 45, bearing: 335, note: 'The last small town north; a drive from here is an event.' },
    { id: 'ukiah', kind: 'FEEDER', name: 'Ukiah', minutes: 60, bearing: 340, note: 'The next county\'s seat, with a community college and a small scene. A classic north-of-Cloverdale band.' },
    { id: 'napa', kind: 'PEER', name: 'Napa', minutes: 55, bearing: 105, scene: 250, note: 'A fancier wine tourist city with a working side.' },
    { id: 'vallejo', kind: 'PEER', name: 'Vallejo', state: 'CA', minutes: 65, bearing: 125, slug: 'vallejo-ca', note: 'The grittier, cheaper neighbor across the hills.' },
    { id: 'sacramento', kind: 'PEER', name: 'Sacramento', slug: 'sacramento', minutes: 105, bearing: 80, scene: 900, note: 'A bigger capital city where Santa Rosa kids go for shows.' }
  ],

  hoods: [
    { id: 'railroad-square', name: 'Railroad Square', route: 'downtown', note: 'Old brick warehouses and a depot west of the freeway. Nice bones, rising rents, and the neighbors have lawyers.' },
    { id: 'downtown', name: 'Courthouse Square and downtown', route: 'downtown', note: 'Offices, county buildings, bars and a mall split from the old grid. Daytime only.' },
    { id: 'roseland', name: 'Roseland and the southwest', route: 'work-side', note: 'A young, mostly Latino working neighborhood south of downtown. Parish halls, family yards and the cheapest rents in town.' },
    { id: 'industrial', name: 'the Todd, Dutton and Piner industrial blocks', route: 'work-side', note: 'Auto shops and supply units west of the freeway. Where bands rent practice rooms.' },
    { id: 'college', name: 'the college district', route: 'campus', note: 'Old bungalows and cheap apartments around the junior college. Rentals, roommates and landlords who watch.' },
    { id: 'coffey-park', name: 'Coffey Park', route: 'old-side', note: 'Tract homes on the north side, burned and rebuilt. New houses and new neighbors with low patience.' },
    { id: 'rincon-valley', name: 'Rincon Valley and the east side', route: 'campus', note: '1970s to 1990s suburban tracts and strip malls along Highway 12. Where most of the suburban kids grew up.' },
    { id: 'fountaingrove', name: 'Fountaingrove', route: 'old-side', note: 'Hillside money, mostly burned and rebuilt. Not a show neighborhood; it is where the parents\' money lives.' }
  ],

  contacts: ['vallejo-ca', 'oakland', 'chico-ca'],

  points: [
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42, pop: 810000 },
    { name: 'Ukiah', state: 'CA', lat: 39.15, lon: -123.21, pop: 16600 },
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49, pop: 525000 },
    { name: 'Eureka', state: 'CA', lat: 40.8, lon: -124.16, pop: 26000 }
  ],
  roads: ['US 101', 'Highway 12', 'Highway 116', 'Highway 128', 'Highway 37', 'I-80'],

  words: {
    street: ['Sebastopol Road', 'Mendocino Avenue', 'Fourth Street', 'Santa Rosa Avenue', 'Todd Road', 'Dutton Avenue', 'Piner Road'],
    water: ['the Russian River', 'Santa Rosa Creek', 'the Laguna', 'Mark West Creek'],
    hood: ['Roseland', 'Railroad Square', 'Coffey Park', 'Fountaingrove', 'Rincon Valley', 'Bennett Valley', 'Montgomery'],
    thing: ['garage', 'prune orchard', 'hop kiln', 'tasting room', 'generator', 'carport', 'redwood', 'taqueria', 'creek bed', 'driveway', 'power shutoff', 'flashlight', 'parish hall'],
    weather: ['red flag warning', 'power shutoff', 'smoke day', 'tule fog']
  }
});
