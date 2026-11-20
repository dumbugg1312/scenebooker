SB.Cities.register('kalamazoo-mi', {
  v: 1,
  slug: 'kalamazoo-mi',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['western michigan university', 'western michigan', 'wmu', 'broncos', 'kalamazoo college', 'k college', 'kvcc', 'kalamazoo valley', 'davenport university',
           'michigan state', 'msu', 'notre dame', 'hope college', 'pfizer', 'stryker', 'perrigo', 'kellogg', 'kellogg\'s', 'kalamazoo gazette', 'mlive', 'amtrak', 'greyhound',
           'indian trails', 'kalamazoo metro', 'new year\'s fest', 'art hop', 'kalamazoo beer week', 'bell\'s', 'bell\'s brewery', 'eccentric day', 'kalamazoo marathon',
           'medieval congress', 'international congress on medieval studies', 'waldo stadium', 'lawson arena', 'faygo', 'vernors', 'fort custer', 'pokagon', 'wolverine corridor',
           'the paper annex', 'paper annex', 'stove works hall', 'celery row', 'the gull road basement', 'red arrow lounge', 'checker cab garage', 'the mill race room',
           'oakland drive rec', 'sunset lake pavilion hall', 'the promise room', 'burdick street loft', 'third shift social hall'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The universities, the plants, the festivals and the paper are written only in generic form. */
  blocklist: ['kalamazoo gazette*', 'art hop*', 'new year\'s fest*', 'pfizer*', 'stryker*'],

  blurb: ['A paper-mill and pharmaceutical town on I-94, halfway between Detroit and Chicago, with a pedestrian mall downtown and a big state university on the hill.',
          'Students pour in every fall and leave every spring, so bands and rooms turn over every few years.'],
  hard: 'Bands and rooms turn over every few years as graduates leave for Chicago or Grand Rapids.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Grand Rapids', state: 'MI', lat: 42.96, lon: -85.67 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Kalamazoo' },
    { id: 'portage', kind: 'FEEDER', name: 'Portage', minutes: 10, bearing: 180, pop: 48900, note: 'The adjacent suburb: the kids who drive in are the suburban base of the scene.' },
    { id: 'galesburg', kind: 'FEEDER', name: 'Galesburg and Augusta', minutes: 20, bearing: 100, note: 'Small mill and farm towns east on M-96; no scene of their own.' },
    { id: 'vicksburg', kind: 'FEEDER', name: 'Vicksburg', minutes: 20, bearing: 185, note: 'A village on a small lake south on US-131; bored small-town kids.' },
    { id: 'battle-creek', kind: 'FEEDER', name: 'Battle Creek', minutes: 25, bearing: 80, pop: 52700, bands: 2, note: 'The smaller, sleepier sibling east on I-94; crowds trade both ways.' },
    { id: 'plainwell', kind: 'FEEDER', name: 'Plainwell and Otsego', minutes: 25, bearing: 340, note: 'Paper-mill river towns north on US-131 with the odd garage band.' },
    { id: 'paw-paw', kind: 'FEEDER', name: 'Paw Paw', minutes: 25, bearing: 260, note: 'Wine and grape country west on I-94; a few kids.' },
    { id: 'allegan', kind: 'FEEDER', name: 'Allegan', minutes: 35, bearing: 320, note: 'A farm and factory county seat to the northwest.' },
    { id: 'marshall', kind: 'FEEDER', name: 'Marshall', minutes: 40, bearing: 95, note: 'A historic-downtown town whose people mostly commute east.' },
    { id: 'three-rivers', kind: 'FEEDER', name: 'Three Rivers', minutes: 40, bearing: 195, note: 'Farm and factory kids who come up for shows.' },
    { id: 'hastings', kind: 'FEEDER', name: 'Hastings', minutes: 45, bearing: 25, note: 'A rural county seat on the Thornapple; rural kids.' },
    { id: 'sturgis', kind: 'FEEDER', name: 'Sturgis', minutes: 50, bearing: 190, note: 'A factory town near the Indiana line with a band or two.' },
    { id: 'south-haven', kind: 'FEEDER', name: 'South Haven', minutes: 50, bearing: 280, note: 'A Lake Michigan resort town, dead in winter and packed in summer; kids drive east.', season: { months: [6, 7, 8], mul: 1.4 } },
    { id: 'south-bend', kind: 'PEER', name: 'South Bend', state: 'IN', minutes: 80, bearing: 225, slug: 'south-bend-in', note: 'Michiana: a bigger college and arts scene whose bands cross the line.' },
    { id: 'lansing', kind: 'PEER', name: 'Lansing', minutes: 85, bearing: 55, slug: 'lansing-mi', note: 'A friendly-rival college-and-capital scene to the northeast.' },
    { id: 'ann-arbor', kind: 'PEER', name: 'Ann Arbor', minutes: 105, bearing: 85, slug: 'ann-arbor-mi', note: 'The next college town east on I-94, on the road to Detroit.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Mall', route: 'downtown', note: 'Old brick blocks around a pedestrian mall: licensed club rooms, bars, a rail hub, and steady redevelopment.' },
    { id: 'vine', name: 'Vine', route: 'old-side', note: 'Old houses chopped into student and artist rentals: basements and porches, heating up fast.' },
    { id: 'oakland-winchell', name: 'Oakland-Winchell and the hill', route: 'campus', note: 'Dense student rentals around the university: house shows in the school year and the heaviest police attention in town.' },
    { id: 'edison', name: 'Edison and the south side', route: 'work-side', note: 'Working-class streets with light industry: garage, shop and basement shows, and warehouse practice rooms.' },
    { id: 'eastside', name: 'the Eastside', route: 'work-side', note: 'Cheap and ignored, with shuttered factory buildings and backyards.' },
    { id: 'northside', name: 'the Northside', route: 'old-side', note: 'A historically Black neighborhood of church halls and community buildings, with reinvestment arriving unevenly; not a place to treat as a cheap punk district.' },
    { id: 'westnedge-strip', name: 'Westnedge and the Portage Road strip', route: 'campus', note: 'Commercial strips, apartments and rentable halls on the suburban edge; kids come from here, shows rarely happen here.' }
  ],

  contacts: ['south-bend-in', 'lansing-mi', 'ann-arbor-mi', 'flint-mi'],

  points: [
    { name: 'Grand Rapids', state: 'MI', lat: 42.96, lon: -85.67, pop: 1160000 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 2700000 },
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05, pop: 4300000 },
    { name: 'Holland', state: 'MI', lat: 42.79, lon: -86.11, pop: 34000 }
  ],
  roads: ['I-94', 'US 131', 'M-43', 'M-96', 'Gull Road', 'Red Arrow Highway'],

  words: {
    street: ['Westnedge Avenue', 'Michigan Avenue', 'Portage Street', 'Gull Road', 'Stadium Drive', 'Oakland Drive', 'Burdick Street', 'Red Arrow Highway'],
    water: ['the Kalamazoo River', 'Sunset Lake', 'Lake Michigan', 'Axtell Creek'],
    hood: ['Vine', 'Edison', 'Oakland-Winchell', 'Stuart', 'Westnedge Hill', 'Oshtemo', 'Eastside', 'Northside', 'the Mall'],
    thing: ['coney', 'celery', 'paper mill', 'basement', 'lake-effect', 'pop', 'trolley', 'Michigan left', 'last call', 'move-out week'],
    weather: ['lake effect', 'gray winter', 'spring thaw', 'tornado watch']
  }
});
