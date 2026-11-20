SB.Cities.register('lansing-mi', {
  v: 1,
  slug: 'lansing-mi',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['michigan state university', 'michigan state', 'msu', 'spartan', 'spartans', 'sparrow', 'mclaren', 'general motors',
           'lansing community college', 'auto-owners', 'jackson national', 'dart container', 'reo motor car company', 'ransom e. olds',
           'lansing center', 'common ground music festival', 'lansing jazzfest', 'jazzfest', 'old town bluesfest', 'bluesfest', 'michigan pride',
           'silver bells', 'east lansing art festival', 'great lakes folk festival', 'summer solstice jazz festival', 'mint festival',
           'ionia free fair', 'melonfest', 'alma highland festival', 'alma college', 'central michigan university', 'central michigan',
           'western michigan university', 'greyhound', 'frank lloyd wright', 'state news', 'lansing state journal', 'city pulse',
           'michigan liquor control commission', 'the bumper plant', 'esker street annex', 'sycamore pit', 'slag hall', 'hoist hall',
           'capitol loop lanes', 'ledge road garage', 'st. casimir\'s basement', 'the walkup on franklin', 'local 9 hall',
           'the fabulous acres rec room'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['michigan state*', 'lansing state journal*', 'city pulse*', 'common ground*', 'dart container*', 'auto-owners*', 'lansing center*'],

  blurb: ['Basements near campus carry the scene, and the crowd resets every fall. Bigger cities an hour either way pull the touring bands past.',
          'A basement doubles as somebody\'s laundry room, the sump pump hums, and a landlord\'s email follows the neighbors\' complaint.'],
  hard: 'Students leave in summer, snow hits in winter, and tours skip you.',
  region: 'the Great Lakes',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05 },
    { name: 'Grand Rapids', state: 'MI', lat: 42.96, lon: -85.67 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Lansing' },
    { id: 'grand-ledge', kind: 'FEEDER', name: 'Grand Ledge', minutes: 20, bearing: 270, note: 'A riverside town of sandstone ledges; a few bands and no real room.' },
    { id: 'mason', kind: 'FEEDER', name: 'Mason', minutes: 20, bearing: 175, note: 'The county seat south on US 127; kids come to Lansing for everything.' },
    { id: 'williamston', kind: 'FEEDER', name: 'Williamston', minutes: 20, bearing: 100, note: 'A tiny bedroom town to the east; a handful of kids.' },
    { id: 'charlotte', kind: 'FEEDER', name: 'Charlotte', minutes: 25, bearing: 230, note: 'A farm and commuter county seat.' },
    { id: 'eaton-rapids', kind: 'FEEDER', name: 'Eaton Rapids', minutes: 25, bearing: 205, note: 'A small river town, now a working-class commuter town.' },
    { id: 'st-johns', kind: 'FEEDER', name: 'St. Johns', minutes: 25, bearing: 355, note: 'A farm town to the north.' },
    { id: 'portland', kind: 'FEEDER', name: 'Portland', minutes: 30, bearing: 285, note: 'A tiny farm town off I-96.' },
    { id: 'fowlerville', kind: 'FEEDER', name: 'Fowlerville', minutes: 30, bearing: 95, note: 'Farm kids by the fairgrounds.' },
    { id: 'owosso', kind: 'FEEDER', name: 'Owosso', minutes: 40, bearing: 55, note: 'An old factory town with a few scene-adjacent people.' },
    { id: 'ionia', kind: 'FEEDER', name: 'Ionia', minutes: 45, bearing: 290, note: 'A prison and farm town; kids drive to Lansing or Grand Rapids.' },
    { id: 'jackson', kind: 'PEER', name: 'Jackson', minutes: 45, bearing: 185, scene: 900, note: 'A smaller prison-and-arts town south on US 127 that sees Lansing as the big city.' },
    { id: 'flint', kind: 'PEER', name: 'Flint', minutes: 60, bearing: 65, slug: 'flint-mi', note: 'An auto city with shared industrial history; trades bands and people.' },
    { id: 'ann-arbor', kind: 'PEER', name: 'Ann Arbor', minutes: 60, bearing: 115, slug: 'ann-arbor-mi', note: 'Nearly the same size, with a stronger arts economy: the other Michigan college town.' },
    { id: 'kalamazoo', kind: 'PEER', name: 'Kalamazoo', minutes: 80, bearing: 240, slug: 'kalamazoo-mi', note: 'A university town with a real music presence; people drive for good shows.' }
  ],

  hoods: [
    { id: 'old-town', name: 'Old Town', route: 'downtown', note: 'Restored brick storefronts and galleries on the river; polished, and busy on festival weekends.' },
    { id: 'reo-town', name: 'REO Town', route: 'downtown', note: 'South of downtown along Washington Avenue: studios, arts rooms and old car-works streets slowly being revived.' },
    { id: 'downtown', name: 'downtown and the Capitol', route: 'downtown', note: 'Emptied nightly by state workers who commute home; nearly dead on weekend nights.' },
    { id: 'eastside', name: 'the Eastside', route: 'work-side', note: 'Old frame houses with full basements, working-class families and poor students. Cheap and mostly ignored.' },
    { id: 'westside', name: 'the Westside and Northwest side', route: 'old-side', note: 'Old bungalows, corner stores and church-heavy streets; church basements and small halls.' },
    { id: 'michigan-avenue', name: 'the Michigan Avenue corridor', route: 'work-side', note: 'Strip malls, chains and cheap bars along the city line. Banquet halls and bowling-alley rooms; little DIY.' },
    { id: 'east-lansing', name: 'East Lansing', route: 'campus', note: 'A clean downtown of student bars and rental blocks around the campus; regulated, and the parties draw citations.' },
    { id: 'okemos', name: 'Okemos, Delta Township and Holt', route: 'campus', note: 'Suburbs with parents\' garages and basements; they supply the kids, not the shows.' }
  ],

  contacts: ['flint-mi', 'ann-arbor-mi', 'kalamazoo-mi', 'fort-wayne-in'],

  points: [
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05, pop: 4300000 },
    { name: 'Grand Rapids', state: 'MI', lat: 42.96, lon: -85.67, pop: 1100000 },
    { name: 'Jackson', state: 'MI', lat: 42.25, lon: -84.4, pop: 160000 },
    { name: 'Battle Creek', state: 'MI', lat: 42.32, lon: -85.18, pop: 135000 }
  ],
  roads: ['I-96', 'I-69', 'I-496', 'US 127', 'M-43', 'M-99'],

  words: {
    street: ['Grand River Avenue', 'Michigan Avenue', 'Saginaw Street', 'Washington Avenue', 'Cedar Street', 'Martin Luther King Boulevard'],
    water: ['the Grand River', 'the Red Cedar'],
    hood: ['Old Town', 'REO Town', 'Old Everett', 'Genesee', 'Edgewood', 'Washington Square', 'Frandor', 'Okemos', 'Holt', 'DeWitt'],
    thing: ['party store', 'coney', 'pop', 'basement', 'salt truck', 'Michigan left', 'sump pump', 'laundry room', 'wristband'],
    weather: ['grey sky', 'ice on the road', 'snow day']
  }
});
