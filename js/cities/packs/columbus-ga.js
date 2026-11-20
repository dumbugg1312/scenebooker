SB.Cities.register('columbus-ga', {
  v: 1,
  slug: 'columbus-ga',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  /* The dossier's real institutions and its invented venue names are in banned: research, not content. */
  banned: ['fort benning', 'benning', 'fort moore', 'aflac', 'global payments', 'tsys', 'columbus state university', 'columbus state', 'csu',
           'columbus technical college', 'auburn university', 'springer opera house', 'rivercenter', 'riverwalk', 'uptown columbus', 'synovus park',
           'eagle & phenix', 'eagle and phenix', 'national infantry museum', 'peachtree mall', 'columbus park crossing', 'american legion', 'vfw',
           'waffle house', 'greyhound', 'amtrak', 'metra', 'ledger-enquirer', 'columbus times', 'tid bits', 'the bayonet', 'the uproar', 'wcug',
           'wjsp', 'wtgz', 'wvrk', 'wrcg', 'wrbl', 'wtvm', 'riverfest', 'myspace', 'fort rucker', 'fort novosel', 'maxwell air force base',
           'lowell of the south', 'scrambled dog', 'peach belt', 'the lintworks', 'mill pond hall', 'the fountain lot', 'whitewater room',
           'victory drive skate and roll', 'the tenth street carport', 'weracoba shed', 'post 411 hall', 'the bibb annex',
           'back room at the laundromat', 'chehaw street storage unit 14', 'the wynnton hill garage'],
  blocklist: ['waffle house*', 'ledger-enquirer*', 'riverfest*', 'lintworks*', 'springer*', 'aflac*'],

  blurb: ['A Georgia army city on the Chattahoochee, across the bridges from Alabama, where soldiers, students and suburban kids share one strip-mall map.',
          'The scene is small and leans on a few rooms, so every closing resets it.'],
  hard: 'A few rooms carry everything, and a closed room resets the scene.',
  region: 'the Deep South',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.81 },
    { name: 'Savannah', state: 'GA', lat: 32.08, lon: -81.09 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Columbus' },
    { id: 'phenix-city', kind: 'FEEDER', name: 'Phenix City', state: 'AL', minutes: 10, bearing: 265, pop: 38800, scene: 300, note: 'Right across the river; kids cross the bridges for shows.' },
    { id: 'cusseta', kind: 'FEEDER', name: 'Cusseta and the base road', minutes: 25, bearing: 160, note: 'Soldiers and families; no scene of its own, but the audience churns through.' },
    { id: 'hamilton', kind: 'FEEDER', name: 'Hamilton and Harris County', minutes: 30, bearing: 20, note: 'Wealthier exurbs; teenagers with cars.' },
    { id: 'opelika', kind: 'FEEDER', name: 'Opelika', state: 'AL', minutes: 35, bearing: 290, note: 'A rail and mill town with a small downtown and some live music.' },
    { id: 'auburn', kind: 'FEEDER', name: 'Auburn', state: 'AL', minutes: 45, bearing: 295, note: 'A big campus; kids and bands come down.', bands: 3 },
    { id: 'talbotton', kind: 'FEEDER', name: 'Talbotton', minutes: 45, bearing: 70, note: 'Tiny farm town; a few kids at most.' },
    { id: 'lagrange', kind: 'FEEDER', name: 'LaGrange', minutes: 60, bearing: 20, note: 'A mill town with a small college and a scene of its own.', bands: 1 },
    { id: 'americus', kind: 'FEEDER', name: 'Americus', minutes: 60, bearing: 115, note: 'A quiet college town; a handful of kids drive up.' },
    { id: 'tuskegee', kind: 'FEEDER', name: 'Tuskegee', state: 'AL', minutes: 60, bearing: 265, note: 'A historic university town; seldom a punk draw.' },
    { id: 'montgomery', kind: 'PEER', name: 'Montgomery', state: 'AL', minutes: 90, bearing: 265, slug: 'montgomery-al', note: 'The closest peer in size: a different state and a capital.' },
    { id: 'albany', kind: 'PEER', name: 'Albany', minutes: 80, bearing: 165, scene: 500, note: 'The smaller sibling down GA-520.' },
    { id: 'macon', kind: 'PEER', name: 'Macon', minutes: 105, bearing: 75, scene: 900, note: 'The other fall-line city; the two compete to be second.' },
    { id: 'tallahassee', kind: 'PEER', name: 'Tallahassee', state: 'FL', minutes: 180, bearing: 190, slug: 'tallahassee-fl', note: 'Two universities and an occasional trade.' }
  ],

  hoods: [
    { id: 'uptown', name: 'Uptown', route: 'downtown', note: 'The river side of downtown: licensed bars and clubs, old industrial buildings and noise complaints from new apartments.' },
    { id: 'wynnton', name: 'Wynnton, Dinglewood and Midtown', route: 'old-side', note: 'Big old houses on the ridge with large lots; quiet, and policed by neighbors.' },
    { id: 'lakebottom', name: 'Lakebottom and Rose Hill', route: 'old-side', note: 'Bungalow streets round the park: teachers, artists and renters with backyards.' },
    { id: 'bibb-city', name: 'Bibb City', route: 'work-side', note: 'A mill village on the river, cheap and forgotten, with small mill houses and loud porches.' },
    { id: 'victory-drive', name: 'South Columbus and Victory Drive', route: 'work-side', note: 'Pawn shops, tattoo parlors and cheap motels on the road to the post.' },
    { id: 'north-east', name: 'North and East Columbus', route: 'campus', note: 'Sprawl: chain restaurants, church campuses and the commuter campus. Where most teenagers live.' },
    { id: 'phenix-side', name: 'Phenix City', route: 'town:phenix-city', note: 'The Alabama side, with different laws and less infrastructure.' }
  ],

  contacts: ['montgomery-al', 'tallahassee-fl', 'augusta-ga'],

  points: [
    { name: 'Macon', state: 'GA', lat: 32.84, lon: -83.63, pop: 157000 },
    { name: 'Albany', state: 'GA', lat: 31.58, lon: -84.16, pop: 70000 },
    { name: 'Athens', state: 'GA', lat: 33.96, lon: -83.38, pop: 127000 },
    { name: 'Dothan', state: 'AL', lat: 31.22, lon: -85.39, pop: 71000 }
  ],
  roads: ['I-185', 'US 80', 'US 27', 'US 280', 'GA 520', 'I-85'],

  words: {
    street: ['Victory Drive', 'Veterans Parkway', 'Macon Road', 'Wynnton Road', 'Broadway', 'Whittlesey Road', 'Manchester Expressway'],
    water: ['the Chattahoochee', 'the river', 'Lake Oliver'],
    hood: ['Uptown', 'Wynnton', 'Dinglewood', 'Midtown', 'Lakebottom', 'Rose Hill', 'Bibb City', 'Phenix City', 'Cusseta'],
    thing: ['red clay', 'mill house', 'boiled peanuts', 'sweet tea', 'carport', 'bridge traffic', 'open mic', 'record store', 'paint cans', 'pool table'],
    weather: ['heat index', 'tornado watch']
  }
});
