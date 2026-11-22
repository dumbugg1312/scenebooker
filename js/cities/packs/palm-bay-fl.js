SB.Cities.register('palm-bay-fl', {
  v: 1,
  slug: 'palm-bay-fl',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['florida tech', 'florida institute of technology', 'eastern florida state college', 'efsc', 'florida today', 'wfit', 'gannett', 'kennedy space center',
           'space force station', 'port canaveral', 'general development', 'hurricane irma', 'irma', 'hurricane nicole', 'hurricane milton', 'waffle house', 'publix',
           'pub subs', 'wawa', 'checkers', 'beef o\'brady\'s', 'sonny\'s bbq', 'tijuana flats', 'vfw', 'american legion', 'space coast', 
           'the lanai', 'cabbage palm hall', 'slab ranch', 'canal nine', 'the platted lot', 'sandspur room', 'port malabar social hall',
           'scrub jay annex', 'the carport annex', 'lagoon road rec', 'the retention pond', 'swale street studios',
           'spacecoast daily', 'space coast daily', 'clickorlando', 'wkmg', 'fox 35', 'orlando weekly', 'brevard live', 'harbor city local', 'black box blackout', 'punk in the park', 'thrash the 321', 'sonic waves', 'spaceport rocketry', 'fred poppe', 'palm bay multicultural festival', 'palm bay holiday light parade', 'palm bay independence day celebration', 'veterans day parade', 'puerto rican day parade', 'space coast harley-davidson', 'spacex', 'blue origin', 'new glenn', 'falcon 9', 'delta iv', 'king center', 'henegar center', 'intracoastal brewing', 'bandsintown', 'eventbrite', 'reverbnation', 'palm bay police department'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real schools, press, chains and storms are written only in generic form; the region is written only as 'the coast'. */
  blocklist: ['florida today*', 'waffle house*', 'cabbage palm*', 'slab ranch*', 'sandspur room*', 'swale street*', 'port malabar social*', 'sonic waves*', 'harbor city local*', 'intracoastal brewing*'],

  blurb: ['A huge, centerless city of platted lots on Florida\'s Atlantic coast, all ranch houses, canals and strip plazas with no walkable core.',
          'Hot and flat, with a carpool and a generator deciding whether anyone plays tonight. The scene lives in garages and carports, and the next town up the coast gets the credit.'],
  hard: 'No walkable core: every kid needs a ride and the neighbors call it in.',
  region: 'Florida',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38 },
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46 },
    { name: 'Gainesville', state: 'FL', lat: 29.65, lon: -82.32 },
    { name: 'Miami', state: 'FL', lat: 25.76, lon: -80.19 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Palm Bay' },
    { id: 'melbourne', kind: 'FEEDER', name: 'Melbourne', minutes: 15, bearing: 5, note: 'The next city up, with a downtown and its own scene; kids move between the two all the time.' },
    { id: 'west-melbourne', kind: 'FEEDER', name: 'West Melbourne', minutes: 15, bearing: 345, note: 'Chain stores and new subdivisions; little scene of its own.' },
    { id: 'malabar', kind: 'FEEDER', name: 'Malabar and Grant-Valkaria', minutes: 15, bearing: 190, note: 'Small semi-rural towns with horse property and acreage: strong yard-party potential, few kids.' },
    { id: 'barefoot-bay', kind: 'FEEDER', name: 'Barefoot Bay and Micco', minutes: 25, bearing: 205, note: 'A huge retirement mobile-home community; essentially no scene.' },
    { id: 'beach-towns', kind: 'FEEDER', name: 'Indialantic and Satellite Beach', minutes: 30, bearing: 60, note: 'Surf and skate beach towns over the causeways; crowds come across and go home early.' },
    { id: 'sebastian', kind: 'FEEDER', name: 'Sebastian', minutes: 30, bearing: 210, note: 'A small fishing and retirement town; mostly a bedroom-band town.' },
    { id: 'cocoa', kind: 'FEEDER', name: 'Cocoa and Rockledge', minutes: 40, bearing: 355, note: 'Older coastal towns with historic village pockets and a history of small music rooms.' },
    { id: 'vero-beach', kind: 'FEEDER', name: 'Vero Beach', minutes: 45, bearing: 200, note: 'A wealthy beach town with a working-class mainland side; a few kids will drive up.' },
    { id: 'titusville', kind: 'FEEDER', name: 'Titusville', minutes: 55, bearing: 350, note: 'A working-class launch-industry city across the water from the cape.' },
    { id: 'port-st-lucie', kind: 'PEER', name: 'Port St. Lucie', minutes: 75, bearing: 190, slug: 'port-st-lucie-fl', note: 'Another platted-lot sprawl city to the south on I-95; trades crowds and bands.' },
    { id: 'lakeland', kind: 'PEER', name: 'Lakeland', minutes: 105, bearing: 295, slug: 'lakeland-fl', note: 'A comparable mid-size inland Florida city.' }
  ],

  hoods: [
    { id: 'central-grid', name: 'the old central grid on Malabar Road', route: 'work-side', note: 'Ranch houses, carports, canals and empty lots laid out in the sixties; cheap and mostly ignored, with rents creeping up.' },
    { id: 'palm-bay-road', name: 'Palm Bay Road and the interstate strip', route: 'downtown', note: 'Chain stores, plazas, car lots and pizza places; businesses open and fail in the same units, and everyone shops here.' },
    { id: 'us-1', name: 'US 1 and the lagoon side', route: 'old-side', note: 'The original settlement strip: older houses with big yards, motels, boat ramps and small commercial buildings.' },
    { id: 'bayside-lakes', name: 'Bayside Lakes and the southwest subdivisions', route: 'campus', note: 'Newer planned subdivisions with association rules and neighbors who call; teenagers here have to be driven to shows.' },
    { id: 'west-edge', name: 'the west edge and the manufactured-home parks', route: 'work-side', note: 'Low density with big yards and outbuildings; far enough out that noise is rarely a problem.' },
    { id: 'southeast', name: 'the southeast fringe toward Turkey Creek', route: 'old-side', note: 'Scrub preserve, creeks and big lots; property-party country.' },
    { id: 'north-border', name: 'the Babcock Street border with Melbourne', route: 'campus', note: 'Apartments, a commuter campus and plazas where the city line blurs.' }
  ],

  contacts: ['port-st-lucie-fl', 'orlando', 'daytona-beach-fl', 'lakeland-fl', 'gainesville-fl'],

  calendar: [
    { id: 'veterans-parade', label: 'the veterans\' parade', tag: 'parade', month: 11, week: 2, dows: [5], can: [.95, .97, 1] },
    { id: 'light-parade', label: 'the holiday light parade', tag: 'parade', month: 12, week: 1, dows: [5], can: [.85, .88, .92] },
    { id: 'multicultural', label: 'the multicultural festival', tag: 'festival', month: 3, week: 4, dows: [5], can: [.93, .95, .97] },
    { id: 'ethnic-parade', label: 'the autumn parade and festival', tag: 'parade', month: 10, week: 4, dows: [5], can: [.97, .97, 1] },
    { id: 'fourth', label: 'the Fourth of July fireworks', tag: 'holiday', month: 7, week: 1, dows: [4, 5, 6], can: [.7, .75, .8] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38, pop: 2700000 },
    { name: 'West Palm Beach', state: 'FL', lat: 26.72, lon: -80.05, pop: 1500000 },
    { name: 'Fort Lauderdale', state: 'FL', lat: 26.12, lon: -80.14, pop: 1900000 },
    { name: 'Jacksonville', state: 'FL', lat: 30.33, lon: -81.66, pop: 1600000 }
  ],
  roads: ['I-95', 'US 1', 'SR 507', 'SR 516', 'SR 514', 'SR 528'],

  words: {
    street: ['Malabar Road', 'Palm Bay Road', 'Babcock Street', 'Minton Road', 'Dixie Highway', 'Emerson Drive'],
    water: ['the Indian River Lagoon', 'Turkey Creek', 'the St. Johns marsh', 'the canal'],
    hood: ['Port Malabar', 'Bayside Lakes', 'Turkey Creek', 'Malabar', 'Grant-Valkaria', 'Micco'],
    thing: ['screened lanai', 'carport', 'canal', 'drainage swale', 'empty lot', 'generator', 'cooler', 'sweet tea', 'Cuban coffee', 'strip plaza', 'practice bay', 'subdivision'],
    weather: ['afternoon thunderstorm', 'storm watch', 'rocket launch', 'humidity']
  }
});
